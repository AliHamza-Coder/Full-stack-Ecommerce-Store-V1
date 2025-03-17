import type { SchemaComposer } from 'graphql-compose';
import { ObjectTypeComposer } from 'graphql-compose';
import { GraphQLService } from '../index.js';
import { type InconsistentFields, type Schema } from './index.js';
export declare function getWritableTypes(gql: GraphQLService, schemaComposer: SchemaComposer, schema: Schema, inconsistentFields: InconsistentFields, ReadCollectionTypes: Record<string, ObjectTypeComposer<any, any>>): {
    CreateCollectionTypes: Record<string, ObjectTypeComposer<any, any>>;
    UpdateCollectionTypes: Record<string, ObjectTypeComposer<any, any>>;
    DeleteCollectionTypes: Record<string, ObjectTypeComposer<any, any>>;
};
