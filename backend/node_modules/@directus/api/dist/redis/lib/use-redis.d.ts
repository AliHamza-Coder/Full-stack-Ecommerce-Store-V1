import { Redis } from 'ioredis';
/**
 * Memoization cache for useRedis
 *
 * @see {@link useRedis}
 */
export declare const _cache: {
    redis: Redis | undefined;
};
/**
 * Access the globally shared Redis instance
 * Creates new Redis instance on first invocation
 *
 * @returns Globally shared Redis instance
 */
export declare const useRedis: () => Redis;
