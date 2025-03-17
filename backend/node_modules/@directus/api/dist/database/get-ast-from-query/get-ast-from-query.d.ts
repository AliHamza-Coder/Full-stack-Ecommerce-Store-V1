/**
 * Generate an AST based on a given collection and query
 */
import type { Accountability, Query, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AST } from '../../types/index.js';
export interface GetAstFromQueryOptions {
    collection: string;
    query: Query;
    accountability: Accountability | null;
}
export interface GetAstFromQueryContext {
    knex: Knex;
    schema: SchemaOverview;
}
export declare function getAstFromQuery(options: GetAstFromQueryOptions, context: GetAstFromQueryContext): Promise<AST>;
