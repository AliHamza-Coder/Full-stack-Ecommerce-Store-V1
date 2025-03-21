import type { Item, PrimaryKey } from '@directus/types';
import type { AbstractServiceOptions, MutationOptions } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class AccessService extends ItemsService {
    constructor(options: AbstractServiceOptions);
    private clearCaches;
    createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    updateMany(keys: PrimaryKey[], data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]>;
}
