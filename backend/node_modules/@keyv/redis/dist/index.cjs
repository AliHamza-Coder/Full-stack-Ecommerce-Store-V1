"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_events = __toESM(require("events"), 1);
var import_ioredis = __toESM(require("ioredis"), 1);
var KeyvRedis = class extends import_events.default {
  ttlSupport = true;
  namespace;
  opts;
  redis;
  constructor(uri, options) {
    super();
    this.opts = {};
    this.opts.useRedisSets = true;
    this.opts.dialect = "redis";
    if (typeof uri !== "string" && uri.options && ("family" in uri.options || uri.isCluster)) {
      this.redis = uri;
    } else {
      options = { ...typeof uri === "string" ? { uri } : uri, ...options };
      this.redis = new import_ioredis.default(options.uri, options);
    }
    if (options !== void 0 && options.useRedisSets === false) {
      this.opts.useRedisSets = false;
    }
    this.redis.on("error", (error) => this.emit("error", error));
  }
  _getNamespace() {
    return `namespace:${this.namespace}`;
  }
  _getKeyName = (key) => {
    if (!this.opts.useRedisSets) {
      return `sets:${this._getNamespace()}:${key}`;
    }
    return key;
  };
  async get(key) {
    key = this._getKeyName(key);
    const value = await this.redis.get(key);
    if (value === null) {
      return void 0;
    }
    return value;
  }
  async getMany(keys) {
    keys = keys.map(this._getKeyName);
    return this.redis.mget(keys);
  }
  async set(key, value, ttl) {
    if (value === void 0) {
      return void 0;
    }
    key = this._getKeyName(key);
    const set = async (redis) => {
      if (typeof ttl === "number") {
        await redis.set(key, value, "PX", ttl);
      } else {
        await redis.set(key, value);
      }
    };
    if (this.opts.useRedisSets) {
      const trx = await this.redis.multi();
      await set(trx);
      await trx.sadd(this._getNamespace(), key);
      await trx.exec();
    } else {
      await set(this.redis);
    }
  }
  async delete(key) {
    key = this._getKeyName(key);
    let items = 0;
    const unlink = async (redis) => redis.unlink(key);
    if (this.opts.useRedisSets) {
      const trx = this.redis.multi();
      await unlink(trx);
      await trx.srem(this._getNamespace(), key);
      const r = await trx.exec();
      items = r[0][1];
    } else {
      items = await unlink(this.redis);
    }
    return items > 0;
  }
  async deleteMany(keys) {
    const deletePromises = keys.map(async (key) => this.delete(key));
    const results = await Promise.allSettled(deletePromises);
    return results.every((result) => result.value);
  }
  async clear() {
    if (this.opts.useRedisSets) {
      const keys = await this.redis.smembers(this._getNamespace());
      if (keys.length > 0) {
        await Promise.all([
          this.redis.unlink([...keys]),
          this.redis.srem(this._getNamespace(), [...keys])
        ]);
      }
    } else {
      const pattern = `sets:${this._getNamespace()}:*`;
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.unlink(keys);
      }
    }
  }
  async *iterator(namespace) {
    const scan = this.redis.scan.bind(this.redis);
    const get = this.redis.mget.bind(this.redis);
    let cursor = "0";
    do {
      const [curs, keys] = await scan(cursor, "MATCH", `${namespace}:*`);
      cursor = curs;
      if (keys.length > 0) {
        const values = await get(keys);
        for (const [i] of keys.entries()) {
          const key = keys[i];
          const value = values[i];
          yield [key, value];
        }
      }
    } while (cursor !== "0");
  }
  async has(key) {
    const value = await this.redis.exists(key);
    return value !== 0;
  }
  async disconnect() {
    return this.redis.disconnect();
  }
};
var src_default = KeyvRedis;
