import type { NumericType, NumericValue } from '@directus/types';
import type { Knex } from 'knex';
import { DatabaseHelper } from '../types.js';
export type NumberInfo = {
    type: NumericType;
    precision: number | null;
    scale: number | null;
};
export declare abstract class NumberDatabaseHelper extends DatabaseHelper {
    addSearchCondition(dbQuery: Knex.QueryBuilder, collection: string, name: string, value: NumericValue, logical: 'and' | 'or'): Knex.QueryBuilder;
    isNumberValid(_value: NumericValue, _info: NumberInfo): boolean;
}
