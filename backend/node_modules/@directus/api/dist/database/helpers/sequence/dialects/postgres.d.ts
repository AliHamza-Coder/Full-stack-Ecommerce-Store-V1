import type { Knex } from 'knex';
import { AutoSequenceHelper } from '../types.js';
export declare class AutoIncrementHelperPostgres extends AutoSequenceHelper {
    /**
     * Resets the auto increment sequence based on the max value of the PK column.
     * The sequence name is determined using a sub query.
     *
     * The table name value for getting the sequence name needs to be escaped explicitly,
     * otherwise PostgreSQL would throw an error for capitalized table names saying "relation x does not exist".
     */
    resetAutoIncrementSequence(table: string, column: string): Promise<Knex.Raw | void>;
}
