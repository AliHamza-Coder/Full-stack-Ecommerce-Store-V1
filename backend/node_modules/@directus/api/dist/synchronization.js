import { useEnv } from '@directus/env';
import { Redis } from 'ioredis';
import { getConfigFromEnv } from './utils/get-config-from-env.js';
let synchronizationManager;
function getSynchronizationManager() {
    if (synchronizationManager)
        return synchronizationManager;
    const env = useEnv();
    if (env['SYNCHRONIZATION_STORE'] === 'redis') {
        synchronizationManager = new SynchronizationManagerRedis();
    }
    else {
        synchronizationManager = new SynchronizationManagerMemory();
    }
    return synchronizationManager;
}
class SynchronizationManagerMemory {
    store;
    constructor() {
        this.store = {};
    }
    async set(key, value) {
        this.setSync(key, value);
    }
    async get(key) {
        return this.getSync(key);
    }
    async delete(key) {
        this.deleteSync(key);
    }
    async exists(key) {
        return this.existsSync(key);
    }
    async setGreaterThan(key, value) {
        if (this.existsSync(key)) {
            const oldValue = Number(this.getSync(key));
            if (value <= oldValue) {
                return false;
            }
        }
        this.setSync(key, value);
        return true;
    }
    setSync(key, value) {
        this.store[key] = String(value);
    }
    getSync(key) {
        return this.store[key] ?? null;
    }
    deleteSync(key) {
        delete this.store[key];
    }
    existsSync(key) {
        return key in this.store;
    }
}
const SET_GREATER_THAN_SCRIPT = `
  local key = KEYS[1]
  local value = tonumber(ARGV[1])

  if redis.call("EXISTS", key) == 1 then
    local oldValue = tonumber(redis.call('GET', key))

    if value <= oldValue then
      return false
    end
  end

  redis.call('SET', key, value)

  return true
`;
class SynchronizationManagerRedis {
    namespace;
    client;
    constructor() {
        const env = useEnv();
        const config = getConfigFromEnv('REDIS');
        this.client = new Redis(env['REDIS'] ?? config);
        this.namespace = env['SYNCHRONIZATION_NAMESPACE'] ?? 'directus-sync';
        this.client.defineCommand('setGreaterThan', {
            numberOfKeys: 1,
            lua: SET_GREATER_THAN_SCRIPT,
        });
    }
    async set(key, value) {
        await this.client.set(this.getNamespacedKey(key), value);
    }
    get(key) {
        return this.client.get(this.getNamespacedKey(key));
    }
    async delete(key) {
        await this.client.del(this.getNamespacedKey(key));
    }
    async exists(key) {
        const doesExist = await this.client.exists(this.getNamespacedKey(key));
        return doesExist === 1;
    }
    async setGreaterThan(key, value) {
        const client = this.client;
        const wasSet = await client.setGreaterThan(this.getNamespacedKey(key), value);
        return wasSet === 1;
    }
    getNamespacedKey(key) {
        return `${this.namespace}:${key}`;
    }
}
export class SynchronizedClock {
    key;
    synchronizationManager;
    constructor(id) {
        this.key = `clock:${id}`;
        this.synchronizationManager = getSynchronizationManager();
    }
    async set(timestamp) {
        const wasSet = await this.synchronizationManager.setGreaterThan(this.key, timestamp);
        return wasSet;
    }
    async reset() {
        await this.synchronizationManager.delete(this.key);
    }
}
