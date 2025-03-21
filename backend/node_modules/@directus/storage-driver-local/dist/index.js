// src/index.ts
import fsProm from "fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { access, copyFile, mkdir, opendir, rename, stat, unlink } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import stream from "node:stream";
import { pipeline } from "node:stream/promises";
var DriverLocal = class {
  root;
  constructor(config) {
    this.root = resolve(config.root);
  }
  fullPath(filepath) {
    return join(this.root, join(sep, filepath));
  }
  /**
   * Ensures that the directory exists. If it doesn't, it's created.
   */
  async ensureDir(dirpath) {
    await mkdir(dirpath, { recursive: true });
  }
  async read(filepath, options) {
    const { range } = options || {};
    const stream_options = {};
    if (range?.start) {
      stream_options.start = range.start;
    }
    if (range?.end) {
      stream_options.end = range.end;
    }
    return createReadStream(this.fullPath(filepath), stream_options);
  }
  async stat(filepath) {
    const statRes = await stat(this.fullPath(filepath));
    if (!statRes) {
      throw new Error(`File "${filepath}" doesn't exist.`);
    }
    return {
      size: statRes.size,
      modified: statRes.mtime
    };
  }
  async exists(filepath) {
    return access(this.fullPath(filepath)).then(() => true).catch(() => false);
  }
  async move(src, dest) {
    const fullSrc = this.fullPath(src);
    const fullDest = this.fullPath(dest);
    await this.ensureDir(dirname(fullDest));
    await rename(fullSrc, fullDest);
  }
  async copy(src, dest) {
    const fullSrc = this.fullPath(src);
    const fullDest = this.fullPath(dest);
    await this.ensureDir(dirname(fullDest));
    await copyFile(fullSrc, fullDest);
  }
  async write(filepath, content) {
    const fullPath = this.fullPath(filepath);
    await this.ensureDir(dirname(fullPath));
    const writeStream = createWriteStream(fullPath);
    await pipeline(content, writeStream);
  }
  async delete(filepath) {
    const fullPath = this.fullPath(filepath);
    await unlink(fullPath);
  }
  list(prefix = "") {
    const fullPrefix = this.fullPath(prefix);
    return this.listGenerator(fullPrefix);
  }
  async *listGenerator(prefix) {
    const prefixDirectory = prefix.endsWith(sep) ? prefix : dirname(prefix);
    const directory = await opendir(prefixDirectory);
    for await (const file of directory) {
      const fileName = join(prefixDirectory, file.name);
      if (fileName.toLowerCase().startsWith(prefix.toLowerCase()) === false) continue;
      if (file.isFile()) {
        yield relative(this.root, fileName);
      }
      if (file.isDirectory()) {
        yield* this.listGenerator(join(fileName, sep));
      }
    }
  }
  get tusExtensions() {
    return ["creation", "termination", "expiration"];
  }
  async createChunkedUpload(filepath, context) {
    const fullPath = this.fullPath(filepath);
    await this.ensureDir(dirname(fullPath));
    await fsProm.writeFile(fullPath, "");
    return context;
  }
  async deleteChunkedUpload(filepath, _context) {
    await this.delete(filepath);
  }
  async finishChunkedUpload(_filepath, _context) {
  }
  async writeChunk(filepath, content, offset, _context) {
    const fullPath = this.fullPath(filepath);
    const writeable = await fsProm.open(fullPath, "r+").then(
      (file) => file.createWriteStream({
        start: offset
      })
    );
    let bytes_received = 0;
    const transform = new stream.Transform({
      transform(chunk, _, callback) {
        bytes_received += chunk.length;
        callback(null, chunk);
      }
    });
    return new Promise((resolve2, reject) => {
      stream.pipeline(content, transform, writeable, (err) => {
        if (err) {
          return reject();
        }
        offset += bytes_received;
        return resolve2(offset);
      });
    }).then(async (offset2) => {
      return offset2;
    });
  }
};
var index_default = DriverLocal;
export {
  DriverLocal,
  index_default as default
};
