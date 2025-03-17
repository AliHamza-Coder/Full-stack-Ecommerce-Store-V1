import { DateHelper } from '../types.js';
export declare class DateHelperOracle extends DateHelper {
    parse(date: string | Date): string;
    fieldFlagForField(fieldType: string): string;
}
