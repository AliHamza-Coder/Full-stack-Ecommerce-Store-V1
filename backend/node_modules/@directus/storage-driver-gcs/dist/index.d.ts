import { TusDriver, ReadOptions, ChunkedUploadContext } from '@directus/storage';
import { Readable } from 'node:stream';

type DriverGCSConfig = {
    root?: string;
    bucket: string;
    apiEndpoint?: string;
    tus?: {
        enabled: boolean;
        chunkSize?: number;
    };
};
declare class DriverGCS implements TusDriver {
    private root;
    private bucket;
    private readonly preferredChunkSize;
    constructor(config: DriverGCSConfig);
    private fullPath;
    private file;
    read(filepath: string, options?: ReadOptions): Promise<Readable>;
    write(filepath: string, content: Readable): Promise<void>;
    delete(filepath: string): Promise<void>;
    stat(filepath: string): Promise<{
        size: number;
        modified: Date;
    }>;
    exists(filepath: string): Promise<boolean>;
    move(src: string, dest: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    list(prefix?: string): AsyncGenerator<string, void, unknown>;
    get tusExtensions(): string[];
    createChunkedUpload(filepath: string, context: ChunkedUploadContext): Promise<ChunkedUploadContext>;
    writeChunk(filepath: string, content: Readable, offset: number, context: ChunkedUploadContext): Promise<number>;
    finishChunkedUpload(_filepath: string, _context: ChunkedUploadContext): Promise<void>;
    deleteChunkedUpload(filepath: string, _context: ChunkedUploadContext): Promise<void>;
}

export { DriverGCS, type DriverGCSConfig, DriverGCS as default };
