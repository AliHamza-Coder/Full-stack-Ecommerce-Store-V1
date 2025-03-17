import * as fs from 'fs';
import { TusDriver, ReadOptions, ChunkedUploadContext } from '@directus/storage';
import { Readable } from 'node:stream';

type DriverLocalConfig = {
    root: string;
};
declare class DriverLocal implements TusDriver {
    private readonly root;
    constructor(config: DriverLocalConfig);
    private fullPath;
    /**
     * Ensures that the directory exists. If it doesn't, it's created.
     */
    private ensureDir;
    read(filepath: string, options?: ReadOptions): Promise<fs.ReadStream>;
    stat(filepath: string): Promise<{
        size: number;
        modified: Date;
    }>;
    exists(filepath: string): Promise<boolean>;
    move(src: string, dest: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    write(filepath: string, content: Readable): Promise<void>;
    delete(filepath: string): Promise<void>;
    list(prefix?: string): AsyncGenerator<string, any, any>;
    private listGenerator;
    get tusExtensions(): string[];
    createChunkedUpload(filepath: string, context: ChunkedUploadContext): Promise<ChunkedUploadContext>;
    deleteChunkedUpload(filepath: string, _context: ChunkedUploadContext): Promise<void>;
    finishChunkedUpload(_filepath: string, _context: ChunkedUploadContext): Promise<void>;
    writeChunk(filepath: string, content: Readable, offset: number, _context: ChunkedUploadContext): Promise<number>;
}

export { DriverLocal, type DriverLocalConfig, DriverLocal as default };
