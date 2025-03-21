import { getFlowManager } from '../flows.js';
import { ItemsService } from './items.js';
export class FlowsService extends ItemsService {
    constructor(options) {
        super('directus_flows', options);
    }
    async createOne(data, opts) {
        const result = await super.createOne(data, opts);
        const flowManager = getFlowManager();
        await flowManager.reload();
        return result;
    }
    async updateMany(keys, data, opts) {
        const result = await super.updateMany(keys, data, opts);
        const flowManager = getFlowManager();
        await flowManager.reload();
        return result;
    }
    async deleteMany(keys, opts) {
        // this is to prevent foreign key constraint error on directus_operations resolve/reject during cascade deletion
        await this.knex('directus_operations').update({ resolve: null, reject: null }).whereIn('flow', keys);
        const result = await super.deleteMany(keys, opts);
        const flowManager = getFlowManager();
        await flowManager.reload();
        return result;
    }
}
