import type { Knex } from 'knex';
import { DatabaseHelper } from '../types.js';
export declare class AutoSequenceHelper extends DatabaseHelper {
    resetAutoIncrementSequence(_table: string, _column: string): Promise<Knex.Raw | void>;
}
