import { ErrorCode, createError } from '@directus/errors';
import { useBus } from '../bus/index.js';
import { useLogger } from '../logger/index.js';
import { ItemsService } from './items.js';
const logger = useLogger();
export class WebhooksService extends ItemsService {
    messenger;
    errorDeprecation;
    constructor(options) {
        super('directus_webhooks', options);
        this.messenger = useBus();
        this.errorDeprecation = new (createError(ErrorCode.MethodNotAllowed, 'Webhooks are deprecated, use Flows instead', 405))();
        logger.warn('Webhooks are deprecated and the WebhooksService will be removed in an upcoming release. Creating/Updating Webhooks is disabled, use Flows instead');
    }
    async createOne() {
        throw this.errorDeprecation;
    }
    async createMany() {
        throw this.errorDeprecation;
    }
    async updateBatch() {
        throw this.errorDeprecation;
    }
    async updateMany() {
        throw this.errorDeprecation;
    }
    async deleteMany(keys, opts) {
        const result = await super.deleteMany(keys, opts);
        this.messenger.publish('webhooks', { type: 'reload' });
        return result;
    }
}
