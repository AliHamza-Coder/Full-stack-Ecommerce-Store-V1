import type { Query, SchemaOverview } from '@directus/types';
import type { CollectionKey, FieldKey, FieldMap } from '../types.js';
export declare function extractFieldsFromQuery(collection: CollectionKey, query: Query, fieldMap: FieldMap, schema: SchemaOverview, pathPrefix?: FieldKey[]): void;
