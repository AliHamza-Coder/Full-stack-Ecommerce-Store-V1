import { NumberDatabaseHelper } from '../types.js';
import { maybeStringifyBigInt } from '../utils/maybe-stringify-big-int.js';
import { numberInRange } from '../utils/number-in-range.js';
export class NumberHelperMSSQL extends NumberDatabaseHelper {
    addSearchCondition(dbQuery, collection, name, value, logical) {
        return dbQuery[logical].where({ [`${collection}.${name}`]: maybeStringifyBigInt(value) });
    }
    isNumberValid(value, info) {
        return numberInRange(value, info);
    }
}
