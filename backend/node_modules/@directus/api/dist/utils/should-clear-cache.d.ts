import type Keyv from 'keyv';
import type { MutationOptions } from '../types/items.js';
/**
 * Check whether cache should be cleared
 *
 * @param cache Cache instance
 * @param opts Mutation options
 * @param collection Collection name to check if cache purging should be ignored
 */
export declare function shouldClearCache(cache: Keyv<any> | null, opts?: MutationOptions, collection?: string): cache is Keyv<any>;
