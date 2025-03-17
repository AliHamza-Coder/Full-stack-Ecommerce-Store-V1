import { ForbiddenError } from '@directus/errors';
import { uniq } from 'lodash-es';
import { clearSystemCache } from '../cache.js';
import { fetchPermissions } from '../permissions/lib/fetch-permissions.js';
import { fetchPolicies } from '../permissions/lib/fetch-policies.js';
import { withAppMinimalPermissions } from '../permissions/lib/with-app-minimal-permissions.js';
import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';
import { ItemsService } from './items.js';
export class PermissionsService extends ItemsService {
    constructor(options) {
        super('directus_permissions', options);
    }
    async clearCaches(opts) {
        await clearSystemCache({ autoPurgeCache: opts?.autoPurgeCache });
        if (this.cache && opts?.autoPurgeCache !== false) {
            await this.cache.clear();
        }
    }
    async readByQuery(query, opts) {
        const result = (await super.readByQuery(query, opts));
        return withAppMinimalPermissions(this.accountability, result, query.filter);
    }
    async createOne(data, opts) {
        const res = await super.createOne(data, opts);
        await this.clearCaches(opts);
        return res;
    }
    async createMany(data, opts) {
        const res = await super.createMany(data, opts);
        await this.clearCaches(opts);
        return res;
    }
    async updateBatch(data, opts) {
        const res = await super.updateBatch(data, opts);
        await this.clearCaches(opts);
        return res;
    }
    async updateMany(keys, data, opts) {
        const res = await super.updateMany(keys, data, opts);
        await this.clearCaches(opts);
        return res;
    }
    async upsertMany(payloads, opts) {
        const res = await super.upsertMany(payloads, opts);
        await this.clearCaches(opts);
        return res;
    }
    async deleteMany(keys, opts) {
        const res = await super.deleteMany(keys, opts);
        await this.clearCaches(opts);
        return res;
    }
    async getItemPermissions(collection, primaryKey) {
        if (!this.accountability?.user)
            throw new ForbiddenError();
        if (this.accountability?.admin) {
            return {
                update: { access: true },
                delete: { access: true },
                share: { access: true },
            };
        }
        const itemPermissions = {
            update: { access: false },
            delete: { access: false },
            share: { access: false },
        };
        let updateAction = 'update';
        const schema = this.schema.collections[collection];
        if (schema?.singleton) {
            const itemsService = new ItemsService(collection, {
                knex: this.knex,
                schema: this.schema,
            });
            const query = {
                fields: [schema.primary],
                limit: 1,
            };
            try {
                const result = await itemsService.readByQuery(query);
                if (!result[0])
                    updateAction = 'create';
            }
            catch {
                updateAction = 'create';
            }
        }
        await Promise.all(Object.keys(itemPermissions).map((key) => {
            const action = key;
            const checkAction = action === 'update' ? updateAction : action;
            if (!this.accountability) {
                itemPermissions[action].access = true;
                return Promise.resolve();
            }
            const opts = {
                accountability: this.accountability,
                action: checkAction,
                collection,
            };
            if (primaryKey) {
                opts.primaryKeys = [primaryKey];
            }
            return validateAccess(opts, {
                schema: this.schema,
                knex: this.knex,
            })
                .then(() => (itemPermissions[action].access = true))
                .catch(() => { });
        }));
        if (schema?.singleton && itemPermissions.update.access) {
            const context = { schema: this.schema, knex: this.knex };
            const policies = await fetchPolicies(this.accountability, context);
            const permissions = await fetchPermissions({ policies, accountability: this.accountability, action: updateAction, collections: [collection] }, context);
            let fields = [];
            let presets = {};
            for (const permission of permissions) {
                if (permission.fields && fields[0] !== '*') {
                    fields = uniq([...fields, ...permission.fields]);
                    if (fields.includes('*')) {
                        fields = ['*'];
                    }
                }
                if (permission.presets) {
                    presets = { ...(presets ?? {}), ...permission.presets };
                }
            }
            itemPermissions.update.fields = fields;
            itemPermissions.update.presets = presets;
        }
        return itemPermissions;
    }
}
