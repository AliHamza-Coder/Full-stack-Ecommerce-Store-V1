import { SchemaComposer } from 'graphql-compose';
import type { GraphQLParams } from '../../../types/index.js';
import { GraphQLService } from '../index.js';
/**
 * Globally available mutations
 */
export declare function globalResolvers(gql: GraphQLService, schemaComposer: SchemaComposer<GraphQLParams['contextValue']>): void;
