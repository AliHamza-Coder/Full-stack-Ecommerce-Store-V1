import type { NumericValue } from '@directus/types';
import type { Knex } from 'knex';
import { NumberDatabaseHelper, type NumberInfo } from '../types.js';
export declare class NumberHelperMSSQL extends NumberDatabaseHelper {
    addSearchCondition(dbQuery: Knex.QueryBuilder, collection: string, name: string, value: NumericValue, logical: 'and' | 'or'): Knex.QueryBuilder;
    isNumberValid(value: NumericValue, info: NumberInfo): boolean;
}
