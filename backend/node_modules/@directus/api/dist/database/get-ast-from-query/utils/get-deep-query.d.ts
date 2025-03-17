/**
 * Convert Deep query object to regular query object by ignoring all nested fields and returning the
 * `_` prefixed fields as top level query fields
 *
 * @example
 *
 * ```js
 * getDeepQuery({
 *   _sort: ['a']
 * });
 * // => { sort: ['a'] }
 * ```
 */
export declare function getDeepQuery(query: Record<string, any>): Record<string, any>;
