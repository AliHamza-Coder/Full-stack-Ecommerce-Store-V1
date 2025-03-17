import type { SchemaComposer } from 'graphql-compose';
import { ObjectTypeComposer } from 'graphql-compose';
import { type GQLScope } from '../index.js';
import { type InconsistentFields, type Schema } from './index.js';
/**
 * Construct an object of types for every collection, using the permitted fields per action type
 * as it's fields.
 */
export declare function getTypes(schemaComposer: SchemaComposer, scope: GQLScope, schema: Schema, inconsistentFields: InconsistentFields, action: 'read' | 'create' | 'update' | 'delete'): {
    CollectionTypes: Record<string, ObjectTypeComposer<any, any>>;
    VersionTypes: Record<string, ObjectTypeComposer<any, any>>;
};
