import { ObjectCannedACL, ServerSideEncryption } from '@aws-sdk/client-s3';
import { TusDriver, ReadOptions, ChunkedUploadContext } from '@directus/storage';
import { Readable } from 'node:stream';

type DriverS3Config = {
    root?: string;
    key?: string;
    secret?: string;
    bucket: string;
    acl?: ObjectCannedACL;
    serverSideEncryption?: ServerSideEncryption;
    endpoint?: string;
    region?: string;
    forcePathStyle?: boolean;
    tus?: {
        chunkSize?: number;
    };
    connectionTimeout?: number;
    socketTimeout?: number;
    maxSockets?: number;
    keepAlive?: boolean;
};
declare class DriverS3 implements TusDriver {
    private config;
    private readonly client;
    private readonly root;
    private partUploadSemaphore;
    private readonly preferredPartSize;
    maxMultipartParts: 10000;
    minPartSize: 5242880;
    maxUploadSize: 5497558138880;
    constructor(config: DriverS3Config);
    private getClient;
    private fullPath;
    read(filepath: string, options?: ReadOptions): Promise<Readable>;
    stat(filepath: string): Promise<{
        size: number;
        modified: Date;
    }>;
    exists(filepath: string): Promise<boolean>;
    move(src: string, dest: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    write(filepath: string, content: Readable, type?: string): Promise<void>;
    delete(filepath: string): Promise<void>;
    list(prefix?: string): AsyncGenerator<string, void, unknown>;
    get tusExtensions(): string[];
    createChunkedUpload(filepath: string, context: ChunkedUploadContext): Promise<ChunkedUploadContext>;
    deleteChunkedUpload(filepath: string, context: ChunkedUploadContext): Promise<void>;
    finishChunkedUpload(filepath: string, context: ChunkedUploadContext): Promise<void>;
    writeChunk(filepath: string, content: Readable, offset: number, context: ChunkedUploadContext): Promise<number>;
    private uploadPart;
    private uploadParts;
    private retrieveParts;
    private finishMultipartUpload;
    private calcOptimalPartSize;
}

export { DriverS3, type DriverS3Config, DriverS3 as default };
