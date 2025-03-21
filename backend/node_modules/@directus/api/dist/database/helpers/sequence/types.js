import { DatabaseHelper } from '../types.js';
export class AutoSequenceHelper extends DatabaseHelper {
    async resetAutoIncrementSequence(_table, _column) {
        return;
    }
}
