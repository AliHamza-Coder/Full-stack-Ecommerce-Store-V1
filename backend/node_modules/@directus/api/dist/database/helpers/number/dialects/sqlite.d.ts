import type { NumericValue } from '@directus/types';
import type { Knex } from 'knex';
import { NumberDatabaseHelper } from '../types.js';
export declare class NumberHelperSQLite extends NumberDatabaseHelper {
    addSearchCondition(dbQuery: Knex.QueryBuilder, collection: string, name: string, value: NumericValue, logical: 'and' | 'or'): Knex.QueryBuilder;
}
