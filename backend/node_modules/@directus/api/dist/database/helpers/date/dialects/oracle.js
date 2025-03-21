import { DateHelper } from '../types.js';
export class DateHelperOracle extends DateHelper {
    // Required to handle timezoned offset
    parse(date) {
        if (!date) {
            return date;
        }
        if (date instanceof Date) {
            return String(date.toISOString());
        }
        // Return YY-MM-DD as is for date support
        if (date.length <= 10 && date.includes('-')) {
            return date;
        }
        return String(new Date(date).toISOString());
    }
    fieldFlagForField(fieldType) {
        switch (fieldType) {
            case 'dateTime':
                return 'cast-datetime';
            default:
                return '';
        }
    }
}
