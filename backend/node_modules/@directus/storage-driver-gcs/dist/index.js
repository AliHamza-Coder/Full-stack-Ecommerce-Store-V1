// src/index.ts
import { DEFAULT_CHUNK_SIZE } from "@directus/constants";
import { normalizePath } from "@directus/utils";
import { Storage } from "@google-cloud/storage";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";
var MINIMUM_CHUNK_SIZE = 262144;
var DriverGCS = class {
  root;
  bucket;
  // TUS specific members
  preferredChunkSize;
  constructor(config) {
    const { bucket, root, tus, ...storageOptions } = config;
    this.root = root ? normalizePath(root, { removeLeading: true }) : "";
    const storage = new Storage(storageOptions);
    this.bucket = storage.bucket(bucket);
    this.preferredChunkSize = tus?.chunkSize || DEFAULT_CHUNK_SIZE;
    if (tus?.enabled && (this.preferredChunkSize < MINIMUM_CHUNK_SIZE || Math.log2(this.preferredChunkSize) % 1 !== 0)) {
      throw new Error("Invalid chunkSize provided");
    }
  }
  fullPath(filepath) {
    return normalizePath(join(this.root, filepath));
  }
  file(filepath) {
    return this.bucket.file(filepath);
  }
  async read(filepath, options) {
    const { range } = options || {};
    const stream_options = {};
    if (range?.start) stream_options.start = range.start;
    if (range?.end) stream_options.end = range.end;
    return this.file(this.fullPath(filepath)).createReadStream(stream_options);
  }
  async write(filepath, content) {
    const file = this.file(this.fullPath(filepath));
    const stream = file.createWriteStream({ resumable: false });
    await pipeline(content, stream);
  }
  async delete(filepath) {
    await this.file(this.fullPath(filepath)).delete();
  }
  async stat(filepath) {
    const [{ size, updated }] = await this.file(this.fullPath(filepath)).getMetadata();
    return { size, modified: new Date(updated) };
  }
  async exists(filepath) {
    return (await this.file(this.fullPath(filepath)).exists())[0];
  }
  async move(src, dest) {
    await this.file(this.fullPath(src)).move(this.file(this.fullPath(dest)));
  }
  async copy(src, dest) {
    await this.file(this.fullPath(src)).copy(this.file(this.fullPath(dest)));
  }
  async *list(prefix = "") {
    let query = {
      prefix: this.fullPath(prefix),
      autoPaginate: false,
      maxResults: 500
    };
    while (query) {
      const [files, nextQuery] = await this.bucket.getFiles(query);
      for (const file of files) {
        yield file.name.substring(this.root.length);
      }
      query = nextQuery;
    }
  }
  get tusExtensions() {
    return ["creation", "termination", "expiration"];
  }
  async createChunkedUpload(filepath, context) {
    const file = this.file(this.fullPath(filepath));
    const [uri] = await file.createResumableUpload();
    context.metadata["uri"] = uri;
    return context;
  }
  async writeChunk(filepath, content, offset, context) {
    const file = this.file(this.fullPath(filepath));
    const stream = file.createWriteStream({
      chunkSize: this.preferredChunkSize,
      uri: context.metadata["uri"],
      offset,
      isPartialUpload: true,
      resumeCRC32C: context.metadata["hash"],
      metadata: {
        contentLength: context.size || 0
      }
    });
    stream.on("crc32c", (hash) => {
      context.metadata["hash"] = hash;
    });
    let bytesUploaded = offset || 0;
    content.on("data", (chunk) => {
      bytesUploaded += chunk.length;
    });
    await pipeline(content, stream);
    return bytesUploaded;
  }
  async finishChunkedUpload(_filepath, _context) {
  }
  async deleteChunkedUpload(filepath, _context) {
    await this.delete(filepath);
  }
};
var index_default = DriverGCS;
export {
  DriverGCS,
  index_default as default
};
