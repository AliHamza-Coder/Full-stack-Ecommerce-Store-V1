import { getSimpleHash } from '@directus/utils';
import { useCache } from '../cache.js';
/**
 * The `pick` parameter can be used to stabilize cache keys, by only using a subset of the available parameters and
 * ensuring key order.
 *
 * If the `pick` function is provided, we pass the picked result to the handler, in order for TypeScript to ensure that
 * the function only relies on the parameters that are used for generating the cache key.
 *
 * @NOTE only uses the first parameter for memoization
 */
export function withCache(namespace, handler, prepareArg) {
    const cache = useCache();
    return (async (arg0, ...args) => {
        arg0 = prepareArg ? prepareArg(arg0) : arg0;
        const key = namespace + '-' + getSimpleHash(JSON.stringify(arg0));
        const cached = await cache.get(key);
        if (cached !== undefined) {
            return cached;
        }
        const res = await handler(arg0, ...args);
        cache.set(key, res);
        return res;
    });
}
