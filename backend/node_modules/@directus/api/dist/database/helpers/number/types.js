import { DatabaseHelper } from '../types.js';
export class NumberDatabaseHelper extends DatabaseHelper {
    addSearchCondition(dbQuery, collection, name, value, logical) {
        return dbQuery[logical].where({ [`${collection}.${name}`]: value });
    }
    isNumberValid(_value, _info) {
        return true;
    }
}
