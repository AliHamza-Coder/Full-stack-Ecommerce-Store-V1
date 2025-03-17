import { useEnv } from '@directus/env';
/**
 * Check whether cache should be cleared
 *
 * @param cache Cache instance
 * @param opts Mutation options
 * @param collection Collection name to check if cache purging should be ignored
 */
export function shouldClearCache(cache, opts, collection) {
    const env = useEnv();
    if (env['CACHE_AUTO_PURGE']) {
        if (collection && env['CACHE_AUTO_PURGE_IGNORE_LIST'].includes(collection)) {
            return false;
        }
        if (cache && opts?.autoPurgeCache !== false) {
            return true;
        }
    }
    return false;
}
