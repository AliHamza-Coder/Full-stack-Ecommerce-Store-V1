import type { Accountability, Item as AnyItem, PermissionsAction, PrimaryKey, Query, SchemaOverview } from '@directus/types';
import type Keyv from 'keyv';
import type { Knex } from 'knex';
import type { AbstractService, AbstractServiceOptions, MutationOptions } from '../types/index.js';
export type QueryOptions = {
    stripNonRequested?: boolean;
    permissionsAction?: PermissionsAction;
    emitEvents?: boolean;
};
export type MutationTracker = {
    trackMutations: (count: number) => void;
    getCount: () => number;
};
export declare class ItemsService<Item extends AnyItem = AnyItem, Collection extends string = string> implements AbstractService {
    collection: Collection;
    knex: Knex;
    accountability: Accountability | null;
    eventScope: string;
    schema: SchemaOverview;
    cache: Keyv<any> | null;
    constructor(collection: Collection, options: AbstractServiceOptions);
    /**
     * Create a fork of the current service, allowing instantiation with different options.
     */
    private fork;
    createMutationTracker(initialCount?: number): MutationTracker;
    getKeysByQuery(query: Query): Promise<PrimaryKey[]>;
    /**
     * Create a single new item.
     */
    createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Create multiple new items at once. Inserts all provided records sequentially wrapped in a transaction.
     *
     * Uses `this.createOne` under the hood.
     */
    createMany(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Get items by query.
     */
    readByQuery(query: Query, opts?: QueryOptions): Promise<Item[]>;
    /**
     * Get single item by primary key.
     *
     * Uses `this.readByQuery` under the hood.
     */
    readOne(key: PrimaryKey, query?: Query, opts?: QueryOptions): Promise<Item>;
    /**
     * Get multiple items by primary keys.
     *
     * Uses `this.readByQuery` under the hood.
     */
    readMany(keys: PrimaryKey[], query?: Query, opts?: QueryOptions): Promise<Item[]>;
    /**
     * Update multiple items by query.
     *
     * Uses `this.updateMany` under the hood.
     */
    updateByQuery(query: Query, data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Update a single item by primary key.
     *
     * Uses `this.updateMany` under the hood.
     */
    updateOne(key: PrimaryKey, data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Update multiple items in a single transaction.
     *
     * Uses `this.updateOne` under the hood.
     */
    updateBatch(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Update many items by primary key, setting all items to the same change.
     */
    updateMany(keys: PrimaryKey[], data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Upsert a single item.
     *
     * Uses `this.createOne` / `this.updateOne` under the hood.
     */
    upsertOne(payload: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Upsert many items.
     *
     * Uses `this.upsertOne` under the hood.
     */
    upsertMany(payloads: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Delete multiple items by query.
     *
     * Uses `this.deleteMany` under the hood.
     */
    deleteByQuery(query: Query, opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Delete a single item by primary key.
     *
     * Uses `this.deleteMany` under the hood.
     */
    deleteOne(key: PrimaryKey, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Delete multiple items by primary key.
     */
    deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Read/treat collection as singleton.
     */
    readSingleton(query: Query, opts?: QueryOptions): Promise<Partial<Item>>;
    /**
     * Upsert/treat collection as singleton.
     *
     * Uses `this.createOne` / `this.updateOne` under the hood.
     */
    upsertSingleton(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
}
