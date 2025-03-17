/**
 * The `pick` parameter can be used to stabilize cache keys, by only using a subset of the available parameters and
 * ensuring key order.
 *
 * If the `pick` function is provided, we pass the picked result to the handler, in order for TypeScript to ensure that
 * the function only relies on the parameters that are used for generating the cache key.
 *
 * @NOTE only uses the first parameter for memoization
 */
export declare function withCache<F extends (arg0: Arg0, ...args: any[]) => R, R, Arg0 = Parameters<F>[0]>(namespace: string, handler: F, prepareArg?: (arg0: Arg0) => Arg0): F;
