import type { PrimaryKey, SchemaOverview } from '@directus/types';
/**
 * Validate keys based on its type
 */
export declare function validateKeys(schema: SchemaOverview, collection: string, keyField: string, keys: PrimaryKey | PrimaryKey[]): void;
