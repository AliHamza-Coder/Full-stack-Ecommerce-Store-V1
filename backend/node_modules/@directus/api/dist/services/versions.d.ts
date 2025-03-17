import type { Item, PrimaryKey, Query } from '@directus/types';
import type { AbstractServiceOptions, MutationOptions } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class VersionsService extends ItemsService {
    constructor(options: AbstractServiceOptions);
    private validateCreateData;
    getMainItem(collection: string, item: PrimaryKey, query?: Query): Promise<Item>;
    verifyHash(collection: string, item: PrimaryKey, hash: string): Promise<{
        outdated: boolean;
        mainHash: string;
    }>;
    getVersionSaves(key: string, collection: string, item: string | undefined): Promise<Partial<Item>[] | null>;
    createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    createMany(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    updateMany(keys: PrimaryKey[], data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    save(key: PrimaryKey, data: Partial<Item>): Promise<Partial<Item>>;
    promote(version: PrimaryKey, mainHash: string, fields?: string[]): Promise<PrimaryKey>;
}
