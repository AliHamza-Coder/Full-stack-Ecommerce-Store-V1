// src/index.ts
import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CopyObjectCommand,
  CreateMultipartUploadCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  ListPartsCommand,
  S3Client,
  UploadPartCommand
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { normalizePath } from "@directus/utils";
import { isReadableStream } from "@directus/utils/node";
import { Semaphore } from "@shopify/semaphore";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { ERRORS, StreamSplitter, TUS_RESUMABLE } from "@tus/utils";
import ms from "ms";
import fs, { promises as fsProm } from "node:fs";
import { Agent as HttpAgent } from "node:http";
import { Agent as HttpsAgent } from "node:https";
import os from "node:os";
import { join } from "node:path";
import { promises as streamProm } from "node:stream";
var DriverS3 = class {
  config;
  client;
  root;
  // TUS specific members
  partUploadSemaphore;
  preferredPartSize;
  maxMultipartParts = 1e4;
  minPartSize = 5242880;
  // 5MiB
  maxUploadSize = 5497558138880;
  // 5TiB
  constructor(config) {
    this.config = config;
    this.client = this.getClient();
    this.root = this.config.root ? normalizePath(this.config.root, { removeLeading: true }) : "";
    this.preferredPartSize = config.tus?.chunkSize ?? this.minPartSize;
    this.partUploadSemaphore = new Semaphore(60);
  }
  getClient() {
    const connectionTimeout = ms(String(this.config.connectionTimeout ?? 5e3));
    const socketTimeout = ms(String(this.config.socketTimeout ?? 12e4));
    const maxSockets = this.config.maxSockets ?? 500;
    const keepAlive = this.config.keepAlive ?? true;
    const s3ClientConfig = {
      requestHandler: new NodeHttpHandler({
        connectionTimeout,
        socketTimeout,
        httpAgent: new HttpAgent({ maxSockets, keepAlive }),
        httpsAgent: new HttpsAgent({ maxSockets, keepAlive })
      })
    };
    if (this.config.key && !this.config.secret || this.config.secret && !this.config.key) {
      throw new Error("Both `key` and `secret` are required when defined");
    }
    if (this.config.key && this.config.secret) {
      s3ClientConfig.credentials = {
        accessKeyId: this.config.key,
        secretAccessKey: this.config.secret
      };
    }
    if (this.config.endpoint) {
      const protocol = this.config.endpoint.startsWith("http://") ? "http:" : "https:";
      const hostname = this.config.endpoint.replace("https://", "").replace("http://", "");
      s3ClientConfig.endpoint = {
        hostname,
        protocol,
        path: "/"
      };
    }
    if (this.config.region) {
      s3ClientConfig.region = this.config.region;
    }
    if (this.config.forcePathStyle !== void 0) {
      s3ClientConfig.forcePathStyle = this.config.forcePathStyle;
    }
    return new S3Client(s3ClientConfig);
  }
  fullPath(filepath) {
    return normalizePath(join(this.root, filepath));
  }
  async read(filepath, options) {
    const { range } = options ?? {};
    const commandInput = {
      Key: this.fullPath(filepath),
      Bucket: this.config.bucket
    };
    if (range) {
      commandInput.Range = `bytes=${range.start ?? ""}-${range.end ?? ""}`;
    }
    const { Body: stream2 } = await this.client.send(new GetObjectCommand(commandInput));
    if (!stream2 || !isReadableStream(stream2)) {
      throw new Error(`No stream returned for file "${filepath}"`);
    }
    return stream2;
  }
  async stat(filepath) {
    const { ContentLength, LastModified } = await this.client.send(
      new HeadObjectCommand({
        Key: this.fullPath(filepath),
        Bucket: this.config.bucket
      })
    );
    return {
      size: ContentLength,
      modified: LastModified
    };
  }
  async exists(filepath) {
    try {
      await this.stat(filepath);
      return true;
    } catch {
      return false;
    }
  }
  async move(src, dest) {
    await this.copy(src, dest);
    await this.delete(src);
  }
  async copy(src, dest) {
    const params = {
      Key: this.fullPath(dest),
      Bucket: this.config.bucket,
      CopySource: `/${this.config.bucket}/${this.fullPath(src)}`
    };
    if (this.config.serverSideEncryption) {
      params.ServerSideEncryption = this.config.serverSideEncryption;
    }
    if (this.config.acl) {
      params.ACL = this.config.acl;
    }
    await this.client.send(new CopyObjectCommand(params));
  }
  async write(filepath, content, type) {
    const params = {
      Key: this.fullPath(filepath),
      Body: content,
      Bucket: this.config.bucket
    };
    if (type) {
      params.ContentType = type;
    }
    if (this.config.acl) {
      params.ACL = this.config.acl;
    }
    if (this.config.serverSideEncryption) {
      params.ServerSideEncryption = this.config.serverSideEncryption;
    }
    const upload = new Upload({
      client: this.client,
      params
    });
    await upload.done();
  }
  async delete(filepath) {
    await this.client.send(new DeleteObjectCommand({ Key: this.fullPath(filepath), Bucket: this.config.bucket }));
  }
  async *list(prefix = "") {
    let Prefix = this.fullPath(prefix);
    if (Prefix === ".") Prefix = "";
    let continuationToken = void 0;
    do {
      const listObjectsV2CommandInput = {
        Bucket: this.config.bucket,
        Prefix,
        MaxKeys: 1e3
      };
      if (continuationToken) {
        listObjectsV2CommandInput.ContinuationToken = continuationToken;
      }
      const response = await this.client.send(new ListObjectsV2Command(listObjectsV2CommandInput));
      continuationToken = response.NextContinuationToken;
      if (response.Contents) {
        for (const object of response.Contents) {
          if (!object.Key) continue;
          const isDir = object.Key.endsWith("/");
          if (isDir) continue;
          yield object.Key.substring(this.root.length);
        }
      }
    } while (continuationToken);
  }
  // TUS implementation based on https://github.com/tus/tus-node-server
  get tusExtensions() {
    return ["creation", "termination", "expiration"];
  }
  async createChunkedUpload(filepath, context) {
    const command = new CreateMultipartUploadCommand({
      Bucket: this.config.bucket,
      Key: this.fullPath(filepath),
      Metadata: { "tus-version": TUS_RESUMABLE },
      ...context.metadata?.["contentType"] ? {
        ContentType: context.metadata["contentType"]
      } : {},
      ...context.metadata?.["cacheControl"] ? {
        CacheControl: context.metadata["cacheControl"]
      } : {}
    });
    const res = await this.client.send(command);
    context.metadata["upload-id"] = res.UploadId;
    return context;
  }
  async deleteChunkedUpload(filepath, context) {
    const key = this.fullPath(filepath);
    try {
      const { "upload-id": uploadId } = context.metadata;
      if (uploadId) {
        await this.client.send(
          new AbortMultipartUploadCommand({
            Bucket: this.config.bucket,
            Key: key,
            UploadId: uploadId
          })
        );
      }
    } catch (error) {
      if (error?.code && ["NotFound", "NoSuchKey", "NoSuchUpload"].includes(error.Code)) {
        throw ERRORS.FILE_NOT_FOUND;
      }
      throw error;
    }
    await this.client.send(
      new DeleteObjectsCommand({
        Bucket: this.config.bucket,
        Delete: {
          Objects: [{ Key: key }]
        }
      })
    );
  }
  async finishChunkedUpload(filepath, context) {
    const key = this.fullPath(filepath);
    const uploadId = context.metadata["upload-id"];
    const size = context.size;
    const chunkSize = this.calcOptimalPartSize(size);
    const expectedParts = Math.ceil(size / chunkSize);
    let parts = await this.retrieveParts(key, uploadId);
    let retries = 0;
    while (parts.length !== expectedParts && retries < 3) {
      ++retries;
      await new Promise((resolve) => setTimeout(resolve, 500 * retries));
      parts = await this.retrieveParts(key, uploadId);
    }
    if (parts.length !== expectedParts) {
      throw {
        status_code: 500,
        body: "Failed to upload all parts to S3."
      };
    }
    await this.finishMultipartUpload(key, uploadId, parts);
  }
  async writeChunk(filepath, content, offset, context) {
    const key = this.fullPath(filepath);
    const uploadId = context.metadata["upload-id"];
    const size = context.size;
    const parts = await this.retrieveParts(key, uploadId);
    const partNumber = parts.length > 0 ? parts[parts.length - 1].PartNumber : 0;
    const nextPartNumber = partNumber + 1;
    const requestedOffset = offset;
    const bytesUploaded = await this.uploadParts(key, uploadId, size, content, nextPartNumber, offset);
    return requestedOffset + bytesUploaded;
  }
  async uploadPart(key, uploadId, readStream, partNumber) {
    const data = await this.client.send(
      new UploadPartCommand({
        Bucket: this.config.bucket,
        Key: key,
        UploadId: uploadId,
        PartNumber: partNumber,
        Body: readStream
      })
    );
    return data.ETag;
  }
  async uploadParts(key, uploadId, size, readStream, currentPartNumber, offset) {
    const promises = [];
    let pendingChunkFilepath = null;
    let bytesUploaded = 0;
    let permit = void 0;
    const splitterStream = new StreamSplitter({
      chunkSize: this.calcOptimalPartSize(size),
      directory: os.tmpdir()
    }).on("beforeChunkStarted", async () => {
      permit = await this.partUploadSemaphore.acquire();
    }).on("chunkStarted", (filepath) => {
      pendingChunkFilepath = filepath;
    }).on("chunkFinished", ({ path, size: partSize }) => {
      pendingChunkFilepath = null;
      const partNumber = currentPartNumber++;
      const acquiredPermit = permit;
      offset += partSize;
      const isFinalPart = size === offset;
      const deferred = new Promise(async (resolve, reject) => {
        try {
          const readable = fs.createReadStream(path);
          readable.on("error", reject);
          if (partSize >= this.minPartSize || isFinalPart) {
            await this.uploadPart(key, uploadId, readable, partNumber);
            bytesUploaded += partSize;
          } else {
          }
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          fsProm.rm(path).catch(() => {
          });
          acquiredPermit?.release();
        }
      });
      promises.push(deferred);
    }).on("chunkError", () => {
      permit?.release();
    });
    try {
      await streamProm.pipeline(readStream, splitterStream);
    } catch (error) {
      if (pendingChunkFilepath !== null) {
        try {
          await fsProm.rm(pendingChunkFilepath);
        } catch {
        }
      }
      promises.push(Promise.reject(error));
    } finally {
      await Promise.all(promises);
    }
    return bytesUploaded;
  }
  async retrieveParts(key, uploadId, partNumberMarker) {
    const data = await this.client.send(
      new ListPartsCommand({
        Bucket: this.config.bucket,
        Key: key,
        UploadId: uploadId,
        PartNumberMarker: partNumberMarker
      })
    );
    let parts = data.Parts ?? [];
    if (data.IsTruncated) {
      const rest = await this.retrieveParts(key, uploadId, data.NextPartNumberMarker);
      parts = [...parts, ...rest];
    }
    if (!partNumberMarker) {
      parts.sort((a, b) => a.PartNumber - b.PartNumber);
    }
    return parts;
  }
  async finishMultipartUpload(key, uploadId, parts) {
    const command = new CompleteMultipartUploadCommand({
      Bucket: this.config.bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts.map((part) => {
          return {
            ETag: part.ETag,
            PartNumber: part.PartNumber
          };
        })
      }
    });
    const response = await this.client.send(command);
    return response.Location;
  }
  calcOptimalPartSize(size) {
    if (size === void 0) {
      size = this.maxUploadSize;
    }
    let optimalPartSize;
    if (size <= this.preferredPartSize) {
      optimalPartSize = size;
    } else if (size <= this.preferredPartSize * this.maxMultipartParts) {
      optimalPartSize = this.preferredPartSize;
    } else {
      optimalPartSize = Math.ceil(size / this.maxMultipartParts);
    }
    return optimalPartSize;
  }
};
var index_default = DriverS3;
export {
  DriverS3,
  index_default as default
};
