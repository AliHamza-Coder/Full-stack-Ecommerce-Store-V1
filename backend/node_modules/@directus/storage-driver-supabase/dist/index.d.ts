import { TusDriver, ReadOptions, ChunkedUploadContext } from '@directus/storage';
import { Readable } from 'node:stream';

type DriverSupabaseConfig = {
    bucket: string;
    serviceRole: string;
    projectId?: string;
    /** Allows a custom Supabase endpoint for self-hosting */
    endpoint?: string;
    root?: string;
    tus?: {
        chunkSize?: number;
    };
};
declare class DriverSupabase implements TusDriver {
    private config;
    private client;
    private bucket;
    private readonly preferredChunkSize;
    constructor(config: DriverSupabaseConfig);
    private get endpoint();
    private getClient;
    private getBucket;
    private fullPath;
    private getAuthenticatedUrl;
    private getResumableUrl;
    read(filepath: string, options?: ReadOptions): Promise<Readable>;
    stat(filepath: string): Promise<{
        size: any;
        modified: Date;
    }>;
    exists(filepath: string): Promise<boolean>;
    move(src: string, dest: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    write(filepath: string, content: Readable, type?: string): Promise<void>;
    delete(filepath: string): Promise<void>;
    list(prefix?: string): AsyncIterable<string>;
    listGenerator(prefix: string): AsyncIterable<string>;
    get tusExtensions(): string[];
    createChunkedUpload(_filepath: string, context: ChunkedUploadContext): Promise<ChunkedUploadContext>;
    writeChunk(filepath: string, content: Readable, offset: number, context: ChunkedUploadContext): Promise<number>;
    finishChunkedUpload(_filepath: string, _context: ChunkedUploadContext): Promise<void>;
    deleteChunkedUpload(filepath: string, _context: ChunkedUploadContext): Promise<void>;
}

export { DriverSupabase, type DriverSupabaseConfig, DriverSupabase as default };
