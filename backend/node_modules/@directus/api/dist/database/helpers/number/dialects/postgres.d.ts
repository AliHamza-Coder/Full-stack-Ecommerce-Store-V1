import type { NumericValue } from '@directus/types';
import { NumberDatabaseHelper, type NumberInfo } from '../types.js';
export declare class NumberHelperPostgres extends NumberDatabaseHelper {
    isNumberValid(value: NumericValue, info: NumberInfo): boolean;
}
