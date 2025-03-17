import { useEnv } from '@directus/env';
import { GraphQLSchema } from 'graphql';
import LRUMapDefault from 'mnemonist/lru-map.js';
import { useBus } from '../../bus/index.js';
// Workaround for misaligned types in mnemonist package exports
const LRUMap = LRUMapDefault;
const env = useEnv();
const bus = useBus();
export const cache = new LRUMap(Number(env['GRAPHQL_SCHEMA_CACHE_CAPACITY'] ?? 100));
bus.subscribe('schemaChanged', () => {
    cache.clear();
});
