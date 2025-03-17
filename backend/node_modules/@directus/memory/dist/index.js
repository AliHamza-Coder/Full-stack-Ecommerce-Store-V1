// src/bus/lib/local.ts
var BusLocal = class {
  handlers;
  constructor(_config) {
    this.handlers = {};
  }
  async publish(channel, payload) {
    this.handlers[channel]?.forEach((callback) => {
      try {
        callback(payload);
      } catch {
      }
    });
  }
  async subscribe(channel, callback) {
    const set = this.handlers[channel] ?? /* @__PURE__ */ new Set();
    set.add(callback);
    this.handlers[channel] = set;
  }
  async unsubscribe(channel, callback) {
    this.handlers[channel]?.delete(callback);
  }
};

// src/utils/buffer-to-uint8array.ts
var bufferToUint8Array = (buffer) => new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);

// src/utils/compress.ts
import { promisify } from "node:util";
import { gunzip as gunzipCallback, gzip as gzipCallback } from "node:zlib";
var gzip = promisify(gzipCallback);
var gunzip = promisify(gunzipCallback);
var compress = async (input) => {
  const buffer = await gzip(input);
  return bufferToUint8Array(buffer);
};
var decompress = async (input) => {
  const buffer = await gunzip(input);
  return bufferToUint8Array(buffer);
};

// src/utils/is-compressed.ts
var isCompressed = (array) => {
  if (array.byteLength < 19) {
    return false;
  }
  return array[0] === 31 && array[1] === 139 && array[2] === 8;
};

// src/utils/serialize.ts
import { parseJSON } from "@directus/utils";

// src/utils/string-to-uint8array.ts
var encoder = new TextEncoder();
var stringToUint8Array = (val) => encoder.encode(val);

// src/utils/uint8array-to-string.ts
var decoder = new TextDecoder();
var uint8ArrayToString = (val) => decoder.decode(val);

// src/utils/serialize.ts
var serialize = (val) => {
  const valueString = JSON.stringify(val);
  return stringToUint8Array(valueString);
};
var deserialize = (val) => {
  const valueString = uint8ArrayToString(val);
  return parseJSON(valueString);
};

// src/utils/uint8array-to-buffer.ts
import { Buffer } from "node:buffer";
var uint8ArrayToBuffer = (array) => Buffer.from(array);

// src/utils/with-namespace.ts
var withNamespace = (key, namespace) => `${namespace}:${key}`;

// src/bus/lib/redis.ts
var BusRedis = class {
  pub;
  sub;
  namespace;
  compression;
  compressionMinSize;
  handlers;
  constructor(config) {
    this.namespace = config.namespace;
    this.pub = config.redis;
    this.sub = config.redis.duplicate();
    this.sub.on("messageBuffer", (channel, message) => this.messageBufferHandler(channel, message));
    this.compression = config.compression ?? true;
    this.compressionMinSize = config.compressionMinSize ?? 1e3;
    this.handlers = {};
  }
  async publish(channel, message) {
    let binaryArray = serialize(message);
    if (this.compression === true && binaryArray.byteLength >= this.compressionMinSize) {
      binaryArray = await compress(binaryArray);
    }
    await this.pub.publish(withNamespace(channel, this.namespace), uint8ArrayToBuffer(binaryArray));
  }
  async subscribe(channel, callback) {
    const namespaced = withNamespace(channel, this.namespace);
    const existingSet = this.handlers[namespaced];
    if (existingSet === void 0) {
      const set = /* @__PURE__ */ new Set();
      set.add(callback);
      this.handlers[namespaced] = set;
      await this.sub.subscribe(namespaced);
    } else {
      existingSet.add(callback);
    }
  }
  async unsubscribe(channel, callback) {
    const namespaced = withNamespace(channel, this.namespace);
    const set = this.handlers[namespaced];
    if (set === void 0) {
      return;
    }
    set.delete(callback);
    if (set.size === 0) {
      delete this.handlers[namespaced];
      await this.sub.unsubscribe(namespaced);
    }
  }
  /**
   * To avoid adding unnecessary active handles in node, we have 1 listener for all messages from
   * Redis, and call the individual registered callbacks from the handlers object
   *
   * @NOTE this method expects the namespaced channel name
   *
   * @param channel The namespaced channel the message was sent in
   * @param message Buffer of the message value that was sent in the given channel
   */
  async messageBufferHandler(channel, message) {
    const namespaced = uint8ArrayToString(bufferToUint8Array(channel));
    if (namespaced in this.handlers === false) {
      return;
    }
    let binaryArray = bufferToUint8Array(message);
    if (this.compression === true && isCompressed(binaryArray)) {
      binaryArray = await decompress(binaryArray);
    }
    const deserialized = deserialize(binaryArray);
    this.handlers[namespaced]?.forEach((callback) => callback(deserialized));
  }
};

// src/bus/lib/create.ts
var createBus = (config) => {
  if (config.type === "local") {
    return new BusLocal(config);
  }
  if (config.type === "redis") {
    return new BusRedis(config);
  }
  throw new Error(`Invalid Bus configuration: Type does not exist.`);
};

// src/kv/lib/local.ts
import { LRUCache } from "lru-cache";
var KvLocal = class {
  store;
  constructor(config) {
    if ("maxKeys" in config) {
      this.store = new LRUCache({
        max: config.maxKeys
      });
    } else {
      this.store = /* @__PURE__ */ new Map();
    }
  }
  async get(key) {
    const value = this.store.get(key);
    if (value !== void 0) {
      return deserialize(value);
    }
    return void 0;
  }
  async set(key, value) {
    const serialized = serialize(value);
    this.store.set(key, serialized);
  }
  async delete(key) {
    this.store.delete(key);
  }
  async has(key) {
    return this.store.has(key);
  }
  async increment(key, amount = 1) {
    const currentVal = await this.get(key) ?? 0;
    if (typeof currentVal !== "number") {
      throw new Error(`The value for key "${key}" is not a number.`);
    }
    const newVal = currentVal + amount;
    await this.set(key, newVal);
    return newVal;
  }
  async setMax(key, value) {
    const currentVal = await this.get(key) ?? 0;
    if (typeof currentVal !== "number") {
      throw new Error(`The value for key "${key}" is not a number.`);
    }
    if (currentVal > value) {
      return false;
    }
    await this.set(key, value);
    return true;
  }
  async clear() {
    this.store.clear();
  }
};

// src/kv/lib/redis.ts
var SET_MAX_SCRIPT = `
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
var KvRedis = class {
  redis;
  namespace;
  compression;
  compressionMinSize;
  constructor(config) {
    if ("setMax" in config.redis === false) {
      config.redis.defineCommand("setMax", {
        numberOfKeys: 1,
        lua: SET_MAX_SCRIPT
      });
    }
    this.redis = config.redis;
    this.namespace = config.namespace;
    this.compression = config.compression ?? true;
    this.compressionMinSize = config.compressionMinSize ?? 1e3;
  }
  async get(key) {
    const value = await this.redis.getBuffer(withNamespace(key, this.namespace));
    if (value === null) {
      return void 0;
    }
    let binaryArray = bufferToUint8Array(value);
    if (this.compression === true && isCompressed(binaryArray)) {
      binaryArray = await decompress(binaryArray);
    }
    return deserialize(binaryArray);
  }
  async set(key, value) {
    if (typeof value === "number") {
      await this.redis.set(withNamespace(key, this.namespace), value);
    } else {
      let binaryArray = serialize(value);
      if (this.compression === true && binaryArray.byteLength >= this.compressionMinSize) {
        binaryArray = await compress(binaryArray);
      }
      await this.redis.set(withNamespace(key, this.namespace), uint8ArrayToBuffer(binaryArray));
    }
  }
  async delete(key) {
    await this.redis.unlink(withNamespace(key, this.namespace));
  }
  async has(key) {
    const exists = await this.redis.exists(withNamespace(key, this.namespace));
    return exists !== 0;
  }
  async increment(key, amount = 1) {
    return await this.redis.incrby(withNamespace(key, this.namespace), amount);
  }
  async setMax(key, value) {
    const wasSet = await this.redis.setMax(withNamespace(key, this.namespace), value);
    return wasSet !== 0;
  }
  async clear() {
    const keysStream = this.redis.scanStream({
      match: withNamespace("*", this.namespace)
    });
    const pipeline = this.redis.pipeline();
    for await (const keys of keysStream) {
      pipeline.unlink(keys);
    }
    await pipeline.exec();
  }
};

// src/kv/lib/create.ts
var createKv = (config) => {
  if (config.type === "local") {
    return new KvLocal(config);
  }
  if (config.type === "redis") {
    return new KvRedis(config);
  }
  throw new Error(`Invalid KV configuration: Type does not exist.`);
};

// src/cache/lib/local.ts
var CacheLocal = class {
  store;
  constructor(config) {
    this.store = createKv({ type: "local", ...config });
  }
  async get(key) {
    return await this.store.get(key);
  }
  async set(key, value) {
    return await this.store.set(key, value);
  }
  async delete(key) {
    await this.store.delete(key);
  }
  async has(key) {
    return await this.store.has(key);
  }
  async clear() {
    await this.store.clear();
  }
};

// src/cache/lib/multi.ts
import { processId } from "@directus/utils/node";

// src/cache/lib/redis.ts
var CacheRedis = class {
  store;
  constructor(config) {
    this.store = createKv({ type: "redis", ...config });
  }
  async get(key) {
    return await this.store.get(key);
  }
  async set(key, value) {
    return await this.store.set(key, value);
  }
  async delete(key) {
    return await this.store.delete(key);
  }
  async has(key) {
    return await this.store.has(key);
  }
  async clear() {
    await this.store.clear();
  }
};

// src/cache/lib/multi.ts
var CACHE_CHANNEL_KEY = "multi-cache";
var CacheMulti = class {
  processId = processId();
  local;
  redis;
  bus;
  constructor(config) {
    this.local = new CacheLocal(config.local);
    this.redis = new CacheRedis(config.redis);
    this.bus = createBus({ type: "redis", redis: config.redis.redis, namespace: config.redis.namespace });
    this.bus.subscribe(CACHE_CHANNEL_KEY, (payload) => this.onMessageClear(payload));
  }
  async get(key) {
    const local = await this.local.get(key);
    if (local !== void 0) {
      return local;
    }
    return await this.redis.get(key);
  }
  async set(key, value) {
    await Promise.all([this.local.set(key, value), this.redis.set(key, value)]);
    await this.clearOthers(key);
  }
  async delete(key) {
    await Promise.all([this.local.delete(key), this.redis.delete(key)]);
    await this.clearOthers(key);
  }
  async has(key) {
    return await this.redis.has(key);
  }
  async clearOthers(key) {
    await this.bus.publish(CACHE_CHANNEL_KEY, {
      type: "clear",
      key,
      origin: this.processId
    });
  }
  async clear() {
    await Promise.all([this.local.clear(), this.redis.clear()]);
    await this.clearOthers();
  }
  async onMessageClear(payload) {
    if (payload.origin === this.processId) return;
    if (payload.key !== void 0) {
      await this.local.delete(payload.key);
    } else {
      await this.local.clear();
    }
  }
};

// src/cache/lib/create.ts
var createCache = (config) => {
  if (config.type === "local") {
    return new CacheLocal(config);
  }
  if (config.type === "redis") {
    return new CacheRedis(config);
  }
  if (config.type === "multi") {
    return new CacheMulti(config);
  }
  throw new Error(`Invalid Cache configuration: Type does not exist.`);
};

// src/cache/lib/define.ts
var defineCache = (config) => {
  let cache;
  const useCache = () => {
    if (cache) return cache;
    cache = createCache(config);
    return cache;
  };
  return useCache;
};

// src/limiter/lib/local.ts
import { RateLimiterMemory } from "rate-limiter-flexible";

// src/limiter/utils/consume.ts
import { HitRateLimitError } from "@directus/errors";
var consume = async (limiter, key, availablePoints) => {
  try {
    await limiter.consume(key);
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    const { msBeforeNext } = err;
    throw new HitRateLimitError({
      limit: availablePoints,
      // as far as I understand from the rate-limiter-flexible docs, msBeforeNext is never
      // undefined. Might be a type error in their exported types.
      reset: new Date(Date.now() + msBeforeNext)
    });
  }
};

// src/limiter/lib/local.ts
var LimiterLocal = class {
  limiter;
  points;
  constructor(config) {
    this.limiter = new RateLimiterMemory({
      duration: config.duration,
      points: config.points
    });
    this.points = config.points;
  }
  async consume(key) {
    return await consume(this.limiter, key, this.points);
  }
  async delete(key) {
    await this.limiter.delete(key);
  }
};

// src/limiter/lib/redis.ts
import { RateLimiterRedis } from "rate-limiter-flexible";
var LimiterRedis = class {
  limiter;
  points;
  constructor(config) {
    this.limiter = new RateLimiterRedis({
      storeClient: config.redis,
      keyPrefix: config.namespace,
      points: config.points,
      duration: config.duration
    });
    this.points = config.points;
  }
  async consume(key) {
    return await consume(this.limiter, key, this.points);
  }
  async delete(key) {
    await this.limiter.delete(key);
  }
};

// src/limiter/lib/create.ts
var createLimiter = (config) => {
  if (config.type === "local") {
    return new LimiterLocal(config);
  }
  if (config.type === "redis") {
    return new LimiterRedis(config);
  }
  throw new Error(`Invalid Limiter configuration: Type does not exist.`);
};
export {
  BusLocal,
  BusRedis,
  CACHE_CHANNEL_KEY,
  CacheLocal,
  CacheMulti,
  CacheRedis,
  KvLocal,
  KvRedis,
  LimiterLocal,
  LimiterRedis,
  SET_MAX_SCRIPT,
  createBus,
  createCache,
  createKv,
  createLimiter,
  defineCache
};
