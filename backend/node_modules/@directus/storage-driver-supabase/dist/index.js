// src/index.ts
import { DEFAULT_CHUNK_SIZE } from "@directus/constants";
import { normalizePath } from "@directus/utils";
import { StorageClient } from "@supabase/storage-js";
import { join } from "node:path";
import { Readable } from "node:stream";
import * as tus from "tus-js-client";
import { fetch } from "undici";
var DriverSupabase = class {
  config;
  client;
  bucket;
  // TUS specific members
  preferredChunkSize;
  constructor(config) {
    this.config = {
      ...config,
      root: normalizePath(config.root ?? "", { removeLeading: true })
    };
    this.preferredChunkSize = this.config.tus?.chunkSize ?? DEFAULT_CHUNK_SIZE;
    this.client = this.getClient();
    this.bucket = this.getBucket();
  }
  get endpoint() {
    return this.config.endpoint ?? `https://${this.config.projectId}.supabase.co/storage/v1`;
  }
  getClient() {
    if (!this.config.projectId && !this.config.endpoint) {
      throw new Error("`project_id` or `endpoint` is required");
    }
    if (!this.config.serviceRole) {
      throw new Error("`service_role` is required");
    }
    return new StorageClient(this.endpoint, {
      apikey: this.config.serviceRole,
      Authorization: `Bearer ${this.config.serviceRole}`
    });
  }
  getBucket() {
    if (!this.config.bucket) {
      throw new Error("`bucket` is required");
    }
    return this.client.from(this.config.bucket);
  }
  fullPath(filepath) {
    const path = join(this.config.root, filepath);
    if (path === ".") return "";
    return normalizePath(path);
  }
  getAuthenticatedUrl(filepath) {
    return `${this.endpoint}/${join("object/authenticated", this.config.bucket, this.fullPath(filepath))}`;
  }
  getResumableUrl() {
    return `${this.endpoint}/upload/resumable`;
  }
  async read(filepath, options) {
    const { range } = options || {};
    const requestInit = { method: "GET" };
    requestInit.headers = {
      Authorization: `Bearer ${this.config.serviceRole}`
    };
    if (range) {
      requestInit.headers["Range"] = `bytes=${range.start ?? ""}-${range.end ?? ""}`;
    }
    const response = await fetch(this.getAuthenticatedUrl(filepath), requestInit);
    if (response.status >= 400 || !response.body) {
      throw new Error(`No stream returned for file "${filepath}"`);
    }
    return Readable.fromWeb(response.body);
  }
  async stat(filepath) {
    const { data, error } = await this.bucket.list(this.config.root, {
      search: filepath,
      limit: 1
    });
    if (error || data.length === 0) {
      throw new Error("File not found");
    }
    return {
      size: data[0]?.metadata["contentLength"] ?? 0,
      modified: new Date(data[0]?.metadata["lastModified"] || null)
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
    await this.bucket.move(this.fullPath(src), this.fullPath(dest));
  }
  async copy(src, dest) {
    await this.bucket.copy(this.fullPath(src), this.fullPath(dest));
  }
  async write(filepath, content, type) {
    await this.bucket.upload(this.fullPath(filepath), content, {
      contentType: type ?? "",
      cacheControl: "3600",
      upsert: true,
      duplex: "half"
    });
  }
  async delete(filepath) {
    await this.bucket.remove([this.fullPath(filepath)]);
  }
  list(prefix = "") {
    const fullPrefix = this.fullPath(prefix);
    return this.listGenerator(fullPrefix);
  }
  async *listGenerator(prefix) {
    const limit = 1e3;
    let offset = 0;
    let itemCount = 0;
    const isDirectory = prefix.endsWith("/");
    const prefixDirectory = isDirectory ? prefix : dirname(prefix);
    const search = isDirectory ? "" : prefix.split("/").pop() ?? "";
    do {
      const { data, error } = await this.bucket.list(prefixDirectory, {
        limit,
        offset,
        search
      });
      if (!data || error) {
        break;
      }
      itemCount = data.length;
      offset += itemCount;
      for (const item of data) {
        const filePath = normalizePath(join(prefixDirectory, item.name));
        if (item.id !== null) {
          yield filePath.substring(this.config.root ? this.config.root.length + 1 : 0);
        } else {
          yield* this.listGenerator(`${filePath}/`);
        }
      }
    } while (itemCount === limit);
  }
  get tusExtensions() {
    return ["creation", "termination", "expiration"];
  }
  async createChunkedUpload(_filepath, context) {
    return context;
  }
  async writeChunk(filepath, content, offset, context) {
    let bytesUploaded = offset || 0;
    const metadata = {
      bucketName: this.config.bucket,
      objectName: this.fullPath(filepath),
      contentType: context.metadata["type"] ?? "image/png",
      cacheControl: "3600"
    };
    await new Promise((resolve, reject) => {
      const upload = new tus.Upload(content, {
        endpoint: this.getResumableUrl(),
        // @ts-expect-error
        fileReader: new FileReader(),
        headers: {
          Authorization: `Bearer ${this.config.serviceRole}`,
          "x-upsert": "true"
        },
        metadata,
        chunkSize: this.preferredChunkSize,
        uploadSize: context.size,
        retryDelays: null,
        onError(error) {
          reject(error);
        },
        onChunkComplete: function(chunkSize) {
          bytesUploaded += chunkSize;
          resolve(null);
        },
        onSuccess() {
          resolve(null);
        },
        onUploadUrlAvailable() {
          if (!context.metadata["upload-url"]) {
            context.metadata["upload-url"] = upload.url;
          }
        }
      });
      if (context.metadata["upload-url"]) {
        upload.resumeFromPreviousUpload({
          size: context.size,
          creationTime: context.metadata["creation_date"],
          metadata,
          uploadUrl: context.metadata["upload-url"]
        });
      }
      upload.start();
    });
    return bytesUploaded;
  }
  async finishChunkedUpload(_filepath, _context) {
  }
  async deleteChunkedUpload(filepath, _context) {
    await this.delete(filepath);
  }
};
var index_default = DriverSupabase;
function dirname(path) {
  return path.split("/").slice(0, -1).join("/");
}
var StreamSource2 = class extends tus.StreamSource {
  _streamEnded = false;
  // @ts-expect-error
  async slice(start, end) {
    if (this._streamEnded) return null;
    this._streamEnded = true;
    return super.slice(0, end - start);
  }
};
var FileReader = class {
  async openFile(input, _) {
    return new StreamSource2(input);
  }
};
export {
  DriverSupabase,
  index_default as default
};
