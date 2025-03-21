import type { Query } from '@directus/types';
/**
 * Converts the passed Query object into a unique list of path arrays, for example:
 *
 * ```
 * [
 * 	['author', 'age'],
 * 	['category']
 * ]
 * ```
 */
export declare function extractPathsFromQuery(query: Query): {
    paths: string[][];
    readOnlyPaths: string[][];
};
