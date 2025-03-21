import { type Kv } from '@directus/memory';
export declare const _cache: {
    lock: Kv | undefined;
};
/**
 * Returns globally shared lock kv instance.
 */
export declare const useLock: () => Kv;
