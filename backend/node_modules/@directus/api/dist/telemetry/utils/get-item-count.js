import {} from 'knex';
import pLimit from 'p-limit';
/**
 * Get the item count of the given task in the given database
 * @param db Knex instance to count against
 * @param task Task to count rows for
 * @returns Collection name and count
 */
export const countCollection = async (db, task) => {
    const query = db.count('*', { as: 'count' }).from(task.collection);
    if (task.where) {
        query.where(...task.where);
    }
    const count = await query.first();
    return { collection: task.collection, count: Number(count?.['count'] ?? 0) };
};
/**
 * Merge the given collection count in the object accumulator
 * Intended for use with .reduce()
 * @param acc Accumulator
 * @param value Current collection count object in array
 * @returns Updated accumulator
 */
export const mergeResults = (acc, value) => {
    acc[value.collection] = value.count;
    return acc;
};
/**
 * Get an object of item counts for the given tasks
 * @param db Database instance to get counts in
 * @param tasks Array of tasks to get count for
 */
export const getItemCount = async (db, tasks) => {
    // Counts can be a little heavy if the table is very large, so we'll only ever execute 3 of these
    // queries simultaneously to not overload the database
    const limit = pLimit(3);
    const calls = tasks.map((task) => limit(countCollection, db, task));
    const results = await Promise.all(calls);
    return results.reduce(mergeResults, {});
};
