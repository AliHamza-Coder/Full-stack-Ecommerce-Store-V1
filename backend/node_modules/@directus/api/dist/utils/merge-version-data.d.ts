import type { Item, SchemaOverview } from '@directus/types';
export declare function mergeVersionsRaw(item: Item, versionData: Partial<Item>[]): Item;
export declare function mergeVersionsRecursive(item: Item, versionData: Item[], collection: string, schema: SchemaOverview): Item;
