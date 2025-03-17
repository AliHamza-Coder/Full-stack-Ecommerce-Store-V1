import { Redis } from 'ioredis';

interface BusConfigAbstract {
    /**
     * Where the messages are sent through
     *
     * `local` - Local memory. Only intended for single-process instances.
     * `redis` - Redis instance
     */
    type: 'local' | 'redis';
}
interface BusConfigLocal extends BusConfigAbstract {
    type: 'local';
}
interface BusConfigRedis extends BusConfigAbstract {
    type: 'redis';
    /**
     * Used to prefix the keys in Redis
     */
    namespace: string;
    /**
     * Enable Gzip compression
     *
     * @default true
     */
    compression?: boolean;
    /**
     * Minimum byte size of the value before compression is enabled.
     *
     * There's a trade-off in size versus time spent compressing values with Gzip. For values lower
     * than ~1k in byte size, the juice isn't worth the squeeze
     *
     * @default 1000
     */
    compressionMinSize?: number;
    /**
     * Existing or new Redis connection to use with this memory class
     */
    redis: Redis;
}
type BusConfig = BusConfigLocal | BusConfigRedis;

type MessageHandler<T = unknown> = (payload: T) => void;
interface Bus {
    /**
     * Publish a message to subscribed clients in the given channel
     *
     * @param channel Channel to publish to
     * @param payload Value to send to the subscribed clients
     */
    publish<T = unknown>(channel: string, payload: T): Promise<void>;
    /**
     * Subscribe to messages in the given channel
     *
     * @param channel Channel to subscribe to
     * @param callback Payload that was published to the given channel
     */
    subscribe<T = unknown>(channel: string, callback: MessageHandler<T>): Promise<void>;
    /**
     * Unsubscribe from a channel
     *
     * @param channel Channel to unsubscribe from
     * @param callback Callback to remove from the stack
     */
    unsubscribe<T = unknown>(channel: string, callback: MessageHandler<T>): Promise<void>;
}

declare class BusLocal implements Bus {
    private handlers;
    constructor(_config: Omit<BusConfigLocal, 'type'>);
    publish<T = unknown>(channel: string, payload: T): Promise<void>;
    subscribe<T = unknown>(channel: string, callback: MessageHandler<T>): Promise<void>;
    unsubscribe<T = unknown>(channel: string, callback: MessageHandler<T>): Promise<void>;
}

declare class BusRedis implements Bus {
    private pub;
    private sub;
    private namespace;
    private compression;
    private compressionMinSize;
    private handlers;
    constructor(config: Omit<BusConfigRedis, 'type'>);
    publish<T = unknown>(channel: string, message: T): Promise<void>;
    subscribe<T = unknown>(channel: string, callback: MessageHandler<T>): Promise<void>;
    unsubscribe<T = unknown>(channel: string, callback: MessageHandler<T>): Promise<void>;
    /**
     * To avoid adding unnecessary active handles in node, we have 1 listener for all messages from
     * Redis, and call the individual registered callbacks from the handlers object
     *
     * @NOTE this method expects the namespaced channel name
     *
     * @param channel The namespaced channel the message was sent in
     * @param message Buffer of the message value that was sent in the given channel
     */
    private messageBufferHandler;
}

declare const createBus: (config: BusConfig) => BusLocal | BusRedis;

interface CacheConfigAbstract {
    /**
     * Where the data is stored
     *
     * `local` - Local memory
     * `redis` - Redis instance
     * `multi` - Multi-stage cache. In-memory as L1, Redis as L2
     */
    type: 'local' | 'redis' | 'multi';
}
interface CacheConfigLocal extends CacheConfigAbstract {
    type: 'local';
    /**
     * Maximum number of keys to store in the cache
     */
    maxKeys?: number;
}
interface CacheConfigRedis extends CacheConfigAbstract {
    type: 'redis';
    /**
     * Used to prefix the keys
     */
    namespace: string;
    /**
     * Enable Gzip compression
     *
     * @default true
     */
    compression?: boolean;
    /**
     * Minimum byte size of the value before compression is enabled.
     *
     * There's a trade-off in size versus time spent compressing values with Gzip. For values lower
     * than ~1k in byte size, the juice isn't worth the squeeze
     *
     * @default 1000
     */
    compressionMinSize?: number;
    /**
     * Existing or new Redis connection to use with this memory class
     */
    redis: Redis;
}
interface CacheConfigMulti extends CacheConfigAbstract {
    type: 'multi';
    /**
     * Configuration for the L1 cache
     */
    local: Omit<CacheConfigLocal, 'type'>;
    /**
     * Configuration for the L2 cache
     */
    redis: Omit<CacheConfigRedis, 'type'>;
}
type CacheConfig = CacheConfigLocal | CacheConfigRedis | CacheConfigMulti;

interface Cache {
    /**
     * Get the cached value by key. Returns undefined if the key doesn't exist in the cache
     *
     * @param key Key to retrieve from the cache
     * @returns Cached value, or undefined if key doesn't exist
     */
    get<T = unknown>(key: string): Promise<T | undefined>;
    /**
     * Save the given value to the cache
     *
     * @param key Key to save in the cache
     * @param value Value to save to the cache. Can be any JavaScript primitive, plain object, or array
     */
    set<T = unknown>(key: string, value: T): Promise<void>;
    /**
     * Remove the given key from the cache
     *
     * @param key Key to remove from the cache
     */
    delete(key: string): Promise<void>;
    /**
     * Check if a given key exists in the cache
     *
     * @param key Key to check
     */
    has(key: string): Promise<boolean>;
    /**
     * Remove all keys from the cache
     */
    clear(): Promise<void>;
}

declare class CacheLocal implements Cache {
    private store;
    constructor(config: Omit<CacheConfigLocal, 'type'>);
    get<T = unknown>(key: string): Promise<T | undefined>;
    set(key: string, value: unknown): Promise<void>;
    delete(key: string): Promise<void>;
    has(key: string): Promise<boolean>;
    clear(): Promise<void>;
}

declare class CacheRedis implements Cache {
    private store;
    constructor(config: Omit<CacheConfigRedis, 'type'>);
    get<T = unknown>(key: string): Promise<T | undefined>;
    set<T = unknown>(key: string, value: T): Promise<void>;
    delete(key: string): Promise<void>;
    has(key: string): Promise<boolean>;
    clear(): Promise<void>;
}

declare const CACHE_CHANNEL_KEY = "multi-cache";
type CacheMultiMessageClear = {
    type: 'clear';
    /** Process this message came from */
    origin: string;
    /**
     * Key to clear from the local memory
     * Will clear all keys when left undefined
     */
    key?: string;
};
declare class CacheMulti implements Cache {
    processId: string;
    local: CacheLocal;
    redis: CacheRedis;
    bus: Bus;
    constructor(config: Omit<CacheConfigMulti, 'type'>);
    get<T = unknown>(key: string): Promise<T | undefined>;
    set(key: string, value: unknown): Promise<void>;
    delete(key: string): Promise<void>;
    has(key: string): Promise<boolean>;
    private clearOthers;
    clear(): Promise<void>;
    private onMessageClear;
}

declare const createCache: (config: CacheConfig) => CacheLocal | CacheRedis | CacheMulti;

declare const defineCache: (config: CacheConfig) => () => Cache;

interface ExtendedRedis extends Redis {
    setMax(key: string, value: number): Promise<number>;
}
interface KvConfigAbstract {
    /**
     * Where the data is stored
     *
     * `local` - Local memory
     * `redis` - Redis instance
     */
    type: 'local' | 'redis';
}
interface KvConfigLocal extends KvConfigAbstract {
    type: 'local';
    /**
     * Maximum number of keys in the store
     */
    maxKeys?: number;
}
interface KvConfigRedis extends KvConfigAbstract {
    type: 'redis';
    /**
     * Used to prefix the keys
     */
    namespace: string;
    /**
     * Enable Gzip compression
     *
     * @default true
     */
    compression?: boolean;
    /**
     * Minimum byte size of the value before compression is enabled.
     *
     * There's a trade-off in size versus time spent compressing values with Gzip. For values lower
     * than ~1k in byte size, the juice isn't worth the squeeze
     *
     * @default 1000
     */
    compressionMinSize?: number;
    /**
     * Existing or new Redis connection to use with this memory class
     */
    redis: Redis | ExtendedRedis;
}
type KvConfig = KvConfigLocal | KvConfigRedis;

interface Kv {
    /**
     * Get the stored value by key. Returns undefined if the key doesn't exist in the store
     *
     * @param key Key to retrieve from the store
     * @returns Stored value, or undefined if key doesn't exist
     */
    get<T = unknown>(key: string): Promise<T | undefined>;
    /**
     * Save the given value to the store
     *
     * @param key Key to save in the store
     * @param value Value to save to the store. Can be any JavaScript primitive, plain object, or array
     */
    set<T = unknown>(key: string, value: T): Promise<void>;
    /**
     * Remove the given key from the store
     *
     * @param key Key to remove from the store
     */
    delete(key: string): Promise<void>;
    /**
     * Check if a given key exists in the store
     *
     * @param key Key to check
     */
    has(key: string): Promise<boolean>;
    /**
     * Increment the given stored value by the given amount
     *
     * @param key Key to increment in the store
     * @param [amount=1] Amount to increment. Defaults to 1
     * @returns Updated value
     */
    increment(key: string, amount?: number): Promise<number>;
    /**
     * Save the given value to the store if the given value is larger than the existing value
     *
     * @param key Key to save in the store
     * @param value Number to save to the store if it's bigger than the current value
     * @returns Whether or not the given value was saved
     */
    setMax(key: string, value: number): Promise<boolean>;
    /**
     * Remove all keys from the kv store
     */
    clear(): Promise<void>;
}

declare class KvLocal implements Kv {
    private store;
    constructor(config: Omit<KvConfigLocal, 'type'>);
    get<T = unknown>(key: string): Promise<T | undefined>;
    set(key: string, value: unknown): Promise<void>;
    delete(key: string): Promise<void>;
    has(key: string): Promise<boolean>;
    increment(key: string, amount?: number): Promise<number>;
    setMax(key: string, value: number): Promise<boolean>;
    clear(): Promise<void>;
}

declare const SET_MAX_SCRIPT = "\n  local key = KEYS[1]\n  local value = tonumber(ARGV[1])\n\n  if redis.call(\"EXISTS\", key) == 1 then\n    local oldValue = tonumber(redis.call('GET', key))\n\n    if value <= oldValue then\n      return false\n    end\n  end\n\n  redis.call('SET', key, value)\n\n  return true\n";
declare class KvRedis implements Kv {
    private redis;
    private namespace;
    private compression;
    private compressionMinSize;
    constructor(config: Omit<KvConfigRedis, 'type'>);
    get<T = unknown>(key: string): Promise<T | undefined>;
    set<T = unknown>(key: string, value: T): Promise<void>;
    delete(key: string): Promise<void>;
    has(key: string): Promise<boolean>;
    increment(key: string, amount?: number): Promise<number>;
    setMax(key: string, value: number): Promise<boolean>;
    clear(): Promise<void>;
}

declare const createKv: (config: KvConfig) => KvLocal | KvRedis;

interface LimiterConfigAbstract {
    /**
     * Where the limit consumption is tracked
     *
     * `local` - Local memory. Only intended for single-process instances.
     * `redis` - Redis instance
     */
    type: 'local' | 'redis';
    duration: number;
    points: number;
}
interface LimiterConfigLocal extends LimiterConfigAbstract {
    type: 'local';
}
interface LimiterConfigRedis extends LimiterConfigAbstract {
    type: 'redis';
    /**
     * Used to prefix the keys in Redis
     */
    namespace: string;
    /**
     * Existing or new Redis connection to use with this memory class
     */
    redis: Redis;
}
type LimiterConfig = LimiterConfigLocal | LimiterConfigRedis;

interface Limiter {
    /**
     * Consume a point for the given key
     *
     * @param key IP address, URL path, or any other string
     */
    consume(key: string): Promise<void>;
    /**
     * Delete the tracked information for a given key
     *
     * @param key IP address, URL path, or any other string
     */
    delete(key: string): Promise<void>;
}

declare class LimiterLocal implements Limiter {
    private limiter;
    private points;
    constructor(config: Omit<LimiterConfigLocal, 'type'>);
    consume(key: string): Promise<void>;
    delete(key: string): Promise<void>;
}

declare class LimiterRedis implements Limiter {
    private limiter;
    private points;
    constructor(config: Omit<LimiterConfigRedis, 'type'>);
    consume(key: string): Promise<void>;
    delete(key: string): Promise<void>;
}

declare const createLimiter: (config: LimiterConfig) => LimiterLocal | LimiterRedis;

export { type Bus, type BusConfig, type BusConfigAbstract, type BusConfigLocal, type BusConfigRedis, BusLocal, BusRedis, CACHE_CHANNEL_KEY, type Cache, type CacheConfig, type CacheConfigAbstract, type CacheConfigLocal, type CacheConfigMulti, type CacheConfigRedis, CacheLocal, CacheMulti, type CacheMultiMessageClear, CacheRedis, type ExtendedRedis, type Kv, type KvConfig, type KvConfigAbstract, type KvConfigLocal, type KvConfigRedis, KvLocal, KvRedis, type Limiter, type LimiterConfig, type LimiterConfigAbstract, type LimiterConfigLocal, type LimiterConfigRedis, LimiterLocal, LimiterRedis, type MessageHandler, SET_MAX_SCRIPT, createBus, createCache, createKv, createLimiter, defineCache };
