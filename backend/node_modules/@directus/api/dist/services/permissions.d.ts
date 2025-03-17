import type { Item, ItemPermissions, PrimaryKey, Query } from '@directus/types';
import type { AbstractServiceOptions, MutationOptions } from '../types/index.js';
import type { QueryOptions } from './items.js';
import { ItemsService } from './items.js';
export declare class PermissionsService extends ItemsService {
    constructor(options: AbstractServiceOptions);
    private clearCaches;
    readByQuery(query: Query, opts?: QueryOptions): Promise<Partial<Item>[]>;
    createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    createMany(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    updateBatch(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    updateMany(keys: PrimaryKey[], data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    upsertMany(payloads: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    getItemPermissions(collection: string, primaryKey?: string): Promise<ItemPermissions>;
}
