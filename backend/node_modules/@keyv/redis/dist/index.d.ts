import EventEmitter from 'events';
import { KeyvStoreAdapter, StoredData } from 'keyv';
import { Redis, Cluster } from 'ioredis';

type KeyvRedisOptions = {
    [K in keyof Redis]?: Redis[K];
} & {
    uri?: string;
    dialect?: string;
    useRedisSets?: boolean;
};
type KeyvUriOptions = string | KeyvRedisOptions | Redis | Cluster;

declare class KeyvRedis extends EventEmitter implements KeyvStoreAdapter {
    ttlSupport: boolean;
    namespace?: string;
    opts: Record<string, unknown>;
    redis: any;
    constructor(uri: KeyvRedisOptions | KeyvUriOptions, options?: KeyvRedisOptions);
    _getNamespace(): string;
    _getKeyName: (key: string) => string;
    get<Value>(key: string): Promise<StoredData<Value> | undefined>;
    getMany<Value>(keys: string[]): Promise<Array<StoredData<Value | undefined>>>;
    set(key: string, value: any, ttl?: number): Promise<undefined>;
    delete(key: string): Promise<boolean>;
    deleteMany(keys: string[]): Promise<boolean>;
    clear(): Promise<void>;
    iterator(namespace?: string): AsyncGenerator<any[], void, unknown>;
    has(key: string): Promise<boolean>;
    disconnect(): Promise<any>;
}

export { KeyvRedis as default };
