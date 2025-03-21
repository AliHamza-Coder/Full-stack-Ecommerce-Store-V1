import { ForbiddenError, InvalidPayloadError } from '@directus/errors';
import { ItemsService } from './items.js';
export class RevisionsService extends ItemsService {
    constructor(options) {
        super('directus_revisions', options);
    }
    async revert(pk) {
        const revision = await super.readOne(pk);
        if (!revision)
            throw new ForbiddenError();
        if (!revision['data'])
            throw new InvalidPayloadError({ reason: `Revision doesn't contain data to revert to` });
        const service = new ItemsService(revision['collection'], {
            accountability: this.accountability,
            knex: this.knex,
            schema: this.schema,
        });
        await service.updateOne(revision['item'], revision['data']);
    }
    setDefaultOptions(opts) {
        if (!opts) {
            return { autoPurgeCache: false, bypassLimits: true };
        }
        if (!('autoPurgeCache' in opts)) {
            opts.autoPurgeCache = false;
        }
        if (!('bypassLimits' in opts)) {
            opts.bypassLimits = true;
        }
        return opts;
    }
    async createOne(data, opts) {
        return super.createOne(data, this.setDefaultOptions(opts));
    }
    async createMany(data, opts) {
        return super.createMany(data, this.setDefaultOptions(opts));
    }
    async updateOne(key, data, opts) {
        return super.updateOne(key, data, this.setDefaultOptions(opts));
    }
    async updateMany(keys, data, opts) {
        return super.updateMany(keys, data, this.setDefaultOptions(opts));
    }
}
