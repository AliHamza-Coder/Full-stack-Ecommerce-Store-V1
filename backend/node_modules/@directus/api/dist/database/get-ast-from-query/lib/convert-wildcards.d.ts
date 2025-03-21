import type { Accountability, Query, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
export interface ConvertWildcardsOptions {
    parentCollection: string;
    fields: string[];
    query: Query;
    accountability: Accountability | null;
}
export interface ConvertWildCardsContext {
    schema: SchemaOverview;
    knex: Knex;
}
export declare function convertWildcards(options: ConvertWildcardsOptions, context: ConvertWildCardsContext): Promise<string[]>;
