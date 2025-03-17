import { type Bus } from '@directus/memory';
export declare const _cache: {
    bus: Bus | undefined;
};
/**
 * Returns globally shared message bus. If Redis is available, will use a redis-driven pub/sub bus.
 * Otherwise will default to a local-only bus.
 */
export declare const useBus: () => Bus;
