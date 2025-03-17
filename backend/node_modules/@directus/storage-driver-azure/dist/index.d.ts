import { TusDriver, ReadOptions, ChunkedUploadContext } from '@directus/storage';
import { Readable } from 'node:stream';

type DriverAzureConfig = {
    containerName: string;
    accountName: string;
    accountKey: string;
    root?: string;
    endpoint?: string;
    tus?: {
        enabled: boolean;
        chunkSize?: number;
    };
};
declare class DriverAzure implements TusDriver {
    private containerClient;
    private signedCredentials;
    private root;
    constructor(config: DriverAzureConfig);
    private fullPath;
    read(filepath: string, options?: ReadOptions): Promise<Readable>;
    write(filepath: string, content: Readable, type?: string): Promise<void>;
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
    writeChunk(filepath: string, content: Readable, offset: number, _context: ChunkedUploadContext): Promise<number>;
    finishChunkedUpload(_filepath: string, _context: ChunkedUploadContext): Promise<void>;
    deleteChunkedUpload(filepath: string, _context: ChunkedUploadContext): Promise<void>;
}

export { DriverAzure, type DriverAzureConfig, DriverAzure as default };
