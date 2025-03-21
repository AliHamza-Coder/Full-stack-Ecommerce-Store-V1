import type { Knex } from 'knex';
import type { Sql } from '../types.js';
export type PrepQueryParamsOptions = {
    format(index: number): string;
};
/**
 * Preprocess a SQL query, such that repeated binding values are bound to the same binding index.
 **/
export declare function prepQueryParams(queryParams: (Partial<Sql> & Pick<Sql, 'sql'>) | string, options: PrepQueryParamsOptions): {
    sql: string;
    bindings: Knex.Value[];
};
