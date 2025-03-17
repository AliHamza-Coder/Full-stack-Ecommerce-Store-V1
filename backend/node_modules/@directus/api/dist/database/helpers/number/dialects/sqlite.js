import { NumberDatabaseHelper } from '../types.js';
import { maybeStringifyBigInt } from '../utils/maybe-stringify-big-int.js';
export class NumberHelperSQLite extends NumberDatabaseHelper {
    addSearchCondition(dbQuery, collection, name, value, logical) {
        return dbQuery[logical].where({ [`${collection}.${name}`]: maybeStringifyBigInt(value) });
    }
}
