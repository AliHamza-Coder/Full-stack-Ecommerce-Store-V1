import { Redis } from 'ioredis';
/**
 * Create a new Redis instance based on the global env configuration
 *
 * @returns New Redis instance based on global configuration
 */
export declare const createRedis: () => Redis;
