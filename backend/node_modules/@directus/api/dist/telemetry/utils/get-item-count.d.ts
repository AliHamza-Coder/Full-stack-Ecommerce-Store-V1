import { type Knex } from 'knex';
export interface CollectionCount {
    collection: string;
    count: number;
}
export interface CollectionCountTask {
    collection: string;
    where?: readonly [string, string, string | boolean | number];
}
/**
 * Get the item count of the given task in the given database
 * @param db Knex instance to count against
 * @param task Task to count rows for
 * @returns Collection name and count
 */
export declare const countCollection: (db: Knex, task: CollectionCountTask) => Promise<CollectionCount>;
/**
 * Merge the given collection count in the object accumulator
 * Intended for use with .reduce()
 * @param acc Accumulator
 * @param value Current collection count object in array
 * @returns Updated accumulator
 */
export declare const mergeResults: (acc: Record<string, number>, value: CollectionCount) => Record<string, number>;
/**
 * Get an object of item counts for the given tasks
 * @param db Database instance to get counts in
 * @param tasks Array of tasks to get count for
 */
export declare const getItemCount: <T extends readonly CollectionCountTask[]>(db: Knex, tasks: T) => Promise<Record<T[number]["collection"], number>>;
