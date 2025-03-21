import type { Policy, PrimaryKey } from '@directus/types';
import type { AbstractServiceOptions, MutationOptions } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class PoliciesService extends ItemsService<Policy> {
    constructor(options: AbstractServiceOptions);
    private clearCaches;
    private isIpAccessValid;
    private assertValidIpAccess;
    createOne(data: Partial<Policy>, opts?: MutationOptions): Promise<PrimaryKey>;
    updateMany(keys: PrimaryKey[], data: Partial<Policy>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]>;
}
