import type { Item, PrimaryKey } from '@directus/types';
import type { MutationOptions } from '../types/items.js';
import type { AbstractServiceOptions } from '../types/services.js';
import { ItemsService } from './items.js';
export declare class TranslationsService extends ItemsService {
    constructor(options: AbstractServiceOptions);
    private translationKeyExists;
    createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    updateMany(keys: PrimaryKey[], data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
}
