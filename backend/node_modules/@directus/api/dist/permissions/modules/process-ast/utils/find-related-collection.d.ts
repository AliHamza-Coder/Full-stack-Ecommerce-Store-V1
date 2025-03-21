import type { SchemaOverview } from '@directus/types';
import type { CollectionKey, FieldKey } from '../types.js';
export declare function findRelatedCollection(collection: CollectionKey, field: FieldKey, schema: SchemaOverview): CollectionKey | null;
