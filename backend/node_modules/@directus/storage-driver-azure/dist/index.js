// src/index.ts
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { normalizePath } from "@directus/utils";
import { join } from "node:path";
import { finished } from "node:stream/promises";
var MAXIMUM_CHUNK_SIZE = 104857600;
var DriverAzure = class {
  containerClient;
  signedCredentials;
  root;
  constructor(config) {
    this.signedCredentials = new StorageSharedKeyCredential(config.accountName, config.accountKey);
    const client = new BlobServiceClient(
      config.endpoint ?? `https://${config.accountName}.blob.core.windows.net`,
      this.signedCredentials
    );
    this.containerClient = client.getContainerClient(config.containerName);
    this.root = config.root ? normalizePath(config.root, { removeLeading: true }) : "";
    if (config.tus?.enabled && config.tus.chunkSize && config.tus.chunkSize > MAXIMUM_CHUNK_SIZE) {
      throw new Error("Invalid chunkSize provided");
    }
  }
  fullPath(filepath) {
    return normalizePath(join(this.root, filepath));
  }
  async read(filepath, options) {
    const { range } = options || {};
    const { readableStreamBody } = await this.containerClient.getBlobClient(this.fullPath(filepath)).download(range?.start, range?.end ? range.end - (range.start || 0) + 1 : void 0);
    if (!readableStreamBody) {
      throw new Error(`No stream returned for file "${filepath}"`);
    }
    return readableStreamBody;
  }
  async write(filepath, content, type = "application/octet-stream") {
    const blockBlobClient = this.containerClient.getBlockBlobClient(this.fullPath(filepath));
    await blockBlobClient.uploadStream(content, void 0, void 0, {
      blobHTTPHeaders: { blobContentType: type }
    });
  }
  async delete(filepath) {
    await this.containerClient.getBlockBlobClient(this.fullPath(filepath)).deleteIfExists();
  }
  async stat(filepath) {
    const props = await this.containerClient.getBlobClient(this.fullPath(filepath)).getProperties();
    return {
      size: props.contentLength,
      modified: props.lastModified
    };
  }
  async exists(filepath) {
    return await this.containerClient.getBlockBlobClient(this.fullPath(filepath)).exists();
  }
  async move(src, dest) {
    await this.copy(src, dest);
    await this.containerClient.getBlockBlobClient(this.fullPath(src)).deleteIfExists();
  }
  async copy(src, dest) {
    const source = this.containerClient.getBlockBlobClient(this.fullPath(src));
    const target = this.containerClient.getBlockBlobClient(this.fullPath(dest));
    const poller = await target.beginCopyFromURL(source.url);
    await poller.pollUntilDone();
  }
  async *list(prefix = "") {
    const blobs = this.containerClient.listBlobsFlat({
      prefix: this.fullPath(prefix)
    });
    for await (const blob of blobs) {
      yield blob.name.substring(this.root.length);
    }
  }
  get tusExtensions() {
    return ["creation", "termination", "expiration"];
  }
  async createChunkedUpload(filepath, context) {
    await this.containerClient.getAppendBlobClient(this.fullPath(filepath)).createIfNotExists();
    return context;
  }
  async writeChunk(filepath, content, offset, _context) {
    const client = this.containerClient.getAppendBlobClient(this.fullPath(filepath));
    let bytesUploaded = offset || 0;
    const chunks = [];
    content.on("data", (chunk2) => {
      bytesUploaded += chunk2.length;
      chunks.push(chunk2);
    });
    await finished(content);
    const chunk = Buffer.concat(chunks);
    if (chunk.length > 0) {
      await client.appendBlock(chunk, chunk.length);
    }
    return bytesUploaded;
  }
  async finishChunkedUpload(_filepath, _context) {
  }
  async deleteChunkedUpload(filepath, _context) {
    await this.delete(filepath);
  }
};
var index_default = DriverAzure;
export {
  DriverAzure,
  index_default as default
};
