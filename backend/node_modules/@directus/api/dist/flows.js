import { Action } from '@directus/constants';
import { useEnv } from '@directus/env';
import { ForbiddenError } from '@directus/errors';
import { isSystemCollection } from '@directus/system-data';
import { applyOptionsData, getRedactedString, isValidJSON, parseJSON, toArray } from '@directus/utils';
import { pick } from 'lodash-es';
import { get } from 'micromustache';
import { useBus } from './bus/index.js';
import getDatabase from './database/index.js';
import emitter from './emitter.js';
import { useLogger } from './logger/index.js';
import { ActivityService } from './services/activity.js';
import { FlowsService } from './services/flows.js';
import * as services from './services/index.js';
import { RevisionsService } from './services/revisions.js';
import { constructFlowTree } from './utils/construct-flow-tree.js';
import { getSchema } from './utils/get-schema.js';
import { JobQueue } from './utils/job-queue.js';
import { mapValuesDeep } from './utils/map-values-deep.js';
import { redactObject } from './utils/redact-object.js';
import { scheduleSynchronizedJob, validateCron } from './utils/schedule.js';
let flowManager;
export function getFlowManager() {
    if (flowManager) {
        return flowManager;
    }
    flowManager = new FlowManager();
    return flowManager;
}
const TRIGGER_KEY = '$trigger';
const ACCOUNTABILITY_KEY = '$accountability';
const LAST_KEY = '$last';
const ENV_KEY = '$env';
class FlowManager {
    isLoaded = false;
    operations = new Map();
    triggerHandlers = [];
    operationFlowHandlers = {};
    webhookFlowHandlers = {};
    reloadQueue;
    envs;
    constructor() {
        const env = useEnv();
        const logger = useLogger();
        this.reloadQueue = new JobQueue();
        this.envs = env['FLOWS_ENV_ALLOW_LIST'] ? pick(env, toArray(env['FLOWS_ENV_ALLOW_LIST'])) : {};
        const messenger = useBus();
        messenger.subscribe('flows', (event) => {
            if (event['type'] === 'reload') {
                this.reloadQueue.enqueue(async () => {
                    if (this.isLoaded) {
                        await this.unload();
                        await this.load();
                    }
                    else {
                        logger.warn('Flows have to be loaded before they can be reloaded');
                    }
                });
            }
        });
    }
    async initialize() {
        if (!this.isLoaded) {
            await this.load();
        }
    }
    async reload() {
        const messenger = useBus();
        messenger.publish('flows', { type: 'reload' });
    }
    addOperation(id, operation) {
        this.operations.set(id, operation);
    }
    removeOperation(id) {
        this.operations.delete(id);
    }
    async runOperationFlow(id, data, context) {
        const logger = useLogger();
        if (!(id in this.operationFlowHandlers)) {
            logger.warn(`Couldn't find operation triggered flow with id "${id}"`);
            return null;
        }
        const handler = this.operationFlowHandlers[id];
        return handler(data, context);
    }
    async runWebhookFlow(id, data, context) {
        const logger = useLogger();
        if (!(id in this.webhookFlowHandlers)) {
            logger.warn(`Couldn't find webhook or manual triggered flow with id "${id}"`);
            throw new ForbiddenError();
        }
        const handler = this.webhookFlowHandlers[id];
        return handler(data, context);
    }
    async load() {
        const logger = useLogger();
        const flowsService = new FlowsService({ knex: getDatabase(), schema: await getSchema() });
        const flows = await flowsService.readByQuery({
            filter: { status: { _eq: 'active' } },
            fields: ['*', 'operations.*'],
            limit: -1,
        });
        const flowTrees = flows.map((flow) => constructFlowTree(flow));
        for (const flow of flowTrees) {
            if (flow.trigger === 'event') {
                let events = [];
                if (flow.options?.['scope']) {
                    events = toArray(flow.options['scope'])
                        .map((scope) => {
                        if (['items.create', 'items.update', 'items.delete'].includes(scope)) {
                            if (!flow.options?.['collections'])
                                return [];
                            return toArray(flow.options['collections']).map((collection) => {
                                if (isSystemCollection(collection)) {
                                    const action = scope.split('.')[1];
                                    return collection.substring(9) + '.' + action;
                                }
                                return `${collection}.${scope}`;
                            });
                        }
                        return scope;
                    })
                        .flat();
                }
                if (flow.options['type'] === 'filter') {
                    const handler = (payload, meta, context) => this.executeFlow(flow, { payload, ...meta }, {
                        accountability: context['accountability'],
                        database: context['database'],
                        getSchema: context['schema'] ? () => context['schema'] : getSchema,
                    });
                    events.forEach((event) => emitter.onFilter(event, handler));
                    this.triggerHandlers.push({
                        id: flow.id,
                        events: events.map((event) => ({ type: 'filter', name: event, handler })),
                    });
                }
                else if (flow.options['type'] === 'action') {
                    const handler = (meta, context) => this.executeFlow(flow, meta, {
                        accountability: context['accountability'],
                        database: getDatabase(),
                        getSchema: context['schema'] ? () => context['schema'] : getSchema,
                    });
                    events.forEach((event) => emitter.onAction(event, handler));
                    this.triggerHandlers.push({
                        id: flow.id,
                        events: events.map((event) => ({ type: 'action', name: event, handler })),
                    });
                }
            }
            else if (flow.trigger === 'schedule') {
                if (validateCron(flow.options['cron'])) {
                    const job = scheduleSynchronizedJob(flow.id, flow.options['cron'], async () => {
                        try {
                            await this.executeFlow(flow);
                        }
                        catch (error) {
                            logger.error(error);
                        }
                    });
                    this.triggerHandlers.push({ id: flow.id, events: [{ type: flow.trigger, job }] });
                }
                else {
                    logger.warn(`Couldn't register cron trigger. Provided cron is invalid: ${flow.options['cron']}`);
                }
            }
            else if (flow.trigger === 'operation') {
                const handler = (data, context) => this.executeFlow(flow, data, context);
                this.operationFlowHandlers[flow.id] = handler;
            }
            else if (flow.trigger === 'webhook') {
                const method = flow.options?.['method'] ?? 'GET';
                const handler = async (data, context) => {
                    let cacheEnabled = true;
                    if (method === 'GET') {
                        cacheEnabled = flow.options['cacheEnabled'] !== false;
                    }
                    if (flow.options['async']) {
                        this.executeFlow(flow, data, context);
                        return { result: undefined, cacheEnabled };
                    }
                    else {
                        return { result: await this.executeFlow(flow, data, context), cacheEnabled };
                    }
                };
                // Default return to $last for webhooks
                flow.options['return'] = flow.options['return'] ?? '$last';
                this.webhookFlowHandlers[`${method}-${flow.id}`] = handler;
            }
            else if (flow.trigger === 'manual') {
                const handler = async (data, context) => {
                    const enabledCollections = flow.options?.['collections'] ?? [];
                    const targetCollection = data?.['body'].collection;
                    if (!targetCollection) {
                        logger.warn(`Manual trigger requires "collection" to be specified in the payload`);
                        throw new ForbiddenError();
                    }
                    if (enabledCollections.length === 0) {
                        logger.warn(`There is no collections configured for this manual trigger`);
                        throw new ForbiddenError();
                    }
                    if (!enabledCollections.includes(targetCollection)) {
                        logger.warn(`Specified collection must be one of: ${enabledCollections.join(', ')}.`);
                        throw new ForbiddenError();
                    }
                    if (flow.options['async']) {
                        this.executeFlow(flow, data, context);
                        return { result: undefined };
                    }
                    else {
                        return { result: await this.executeFlow(flow, data, context) };
                    }
                };
                // Default return to $last for manual
                flow.options['return'] = '$last';
                this.webhookFlowHandlers[`POST-${flow.id}`] = handler;
            }
        }
        this.isLoaded = true;
    }
    async unload() {
        for (const trigger of this.triggerHandlers) {
            for (const event of trigger.events) {
                switch (event.type) {
                    case 'filter':
                        emitter.offFilter(event.name, event.handler);
                        break;
                    case 'action':
                        emitter.offAction(event.name, event.handler);
                        break;
                    case 'schedule':
                        await event.job.stop();
                        break;
                }
            }
        }
        this.triggerHandlers = [];
        this.operationFlowHandlers = {};
        this.webhookFlowHandlers = {};
        this.isLoaded = false;
    }
    async executeFlow(flow, data = null, context = {}) {
        const database = context['database'] ?? getDatabase();
        const schema = context['schema'] ?? (await getSchema({ database }));
        const keyedData = {
            [TRIGGER_KEY]: data,
            [LAST_KEY]: data,
            [ACCOUNTABILITY_KEY]: context?.['accountability'] ?? null,
            [ENV_KEY]: this.envs,
        };
        let nextOperation = flow.operation;
        let lastOperationStatus = 'unknown';
        const steps = [];
        while (nextOperation !== null) {
            const { successor, data, status, options } = await this.executeOperation(nextOperation, keyedData, context);
            keyedData[nextOperation.key] = data;
            keyedData[LAST_KEY] = data;
            lastOperationStatus = status;
            steps.push({ operation: nextOperation.id, key: nextOperation.key, status, options });
            nextOperation = successor;
        }
        if (flow.accountability !== null) {
            const activityService = new ActivityService({
                knex: database,
                schema: schema,
            });
            const accountability = context?.['accountability'];
            const activity = await activityService.createOne({
                action: Action.RUN,
                user: accountability?.user ?? null,
                collection: 'directus_flows',
                ip: accountability?.ip ?? null,
                user_agent: accountability?.userAgent ?? null,
                origin: accountability?.origin ?? null,
                item: flow.id,
            });
            if (flow.accountability === 'all') {
                const revisionsService = new RevisionsService({
                    knex: database,
                    schema: schema,
                });
                await revisionsService.createOne({
                    activity: activity,
                    collection: 'directus_flows',
                    item: flow.id,
                    data: {
                        steps: steps.map((step) => redactObject(step, { values: this.envs }, getRedactedString)),
                        data: redactObject(keyedData, {
                            keys: [
                                ['**', 'headers', 'authorization'],
                                ['**', 'headers', 'cookie'],
                                ['**', 'query', 'access_token'],
                                ['**', 'payload', 'password'],
                            ],
                            values: this.envs,
                        }, getRedactedString),
                    },
                });
            }
        }
        if (flow.trigger === 'event' && flow.options['type'] === 'filter' && lastOperationStatus === 'reject') {
            throw keyedData[LAST_KEY];
        }
        if (flow.options['return'] === '$all') {
            return keyedData;
        }
        else if (flow.options['return']) {
            return get(keyedData, flow.options['return']);
        }
        return undefined;
    }
    async executeOperation(operation, keyedData, context = {}) {
        const logger = useLogger();
        if (!this.operations.has(operation.type)) {
            logger.warn(`Couldn't find operation ${operation.type}`);
            return { successor: null, status: 'unknown', data: null, options: null };
        }
        const handler = this.operations.get(operation.type);
        const options = applyOptionsData(operation.options, keyedData);
        try {
            let result = await handler(options, {
                services,
                env: useEnv(),
                database: getDatabase(),
                logger,
                getSchema,
                data: keyedData,
                accountability: null,
                ...context,
            });
            // Validate that the operations result is serializable and thus catching the error inside the flow execution
            JSON.stringify(result ?? null);
            // JSON structures don't allow for undefined values, so we need to replace them with null
            // Otherwise the applyOptionsData function will not work correctly on the next operation
            if (typeof result === 'object' && result !== null) {
                result = mapValuesDeep(result, (_, value) => (value === undefined ? null : value));
            }
            return { successor: operation.resolve, status: 'resolve', data: result ?? null, options };
        }
        catch (error) {
            let data;
            if (error instanceof Error) {
                // Don't expose the stack trace to the next operation
                delete error.stack;
                data = error;
            }
            else if (typeof error === 'string') {
                // If the error is a JSON string, parse it and use that as the error data
                data = isValidJSON(error) ? parseJSON(error) : error;
            }
            else {
                // If error is plain object, use this as the error data and otherwise fallback to null
                data = error ?? null;
            }
            return {
                successor: operation.reject,
                status: 'reject',
                data,
                options,
            };
        }
    }
}
