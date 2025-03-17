import { type DirectusError } from '@directus/errors';
import type { Bus } from '@directus/memory';
import type { PrimaryKey } from '@directus/types';
import type { AbstractServiceOptions, MutationOptions, Webhook } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class WebhooksService extends ItemsService<Webhook> {
    messenger: Bus;
    errorDeprecation: DirectusError;
    constructor(options: AbstractServiceOptions);
    createOne(): Promise<PrimaryKey>;
    createMany(): Promise<PrimaryKey[]>;
    updateBatch(): Promise<PrimaryKey[]>;
    updateMany(): Promise<PrimaryKey[]>;
    deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]>;
}
