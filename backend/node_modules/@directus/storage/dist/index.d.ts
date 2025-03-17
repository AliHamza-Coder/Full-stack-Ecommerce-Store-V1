import { Readable } from 'node:stream';

declare class StorageManager {
    private drivers;
    private locations;
    registerDriver(name: string, driver: typeof Driver): void;
    registerLocation(name: string, config: DriverConfig): void;
    location(name: string): Driver;
}
interface Range {
    start: number | undefined;
    end: number | undefined;
}
type Stat = {
    size: number;
    modified: Date;
};
type ReadOptions = {
    range?: Range | undefined;
    version?: string | undefined;
};
type ChunkedUploadContext = {
    size?: number | undefined;
    metadata: Record<string, string | null> | undefined;
};
declare class Driver {
    constructor(config: Record<string, unknown>);
    read(filepath: string, options?: ReadOptions): Promise<Readable>;
    write(filepath: string, content: Readable, type?: string): Promise<void>;
    delete(filepath: string): Promise<void>;
    stat(filepath: string): Promise<Stat>;
    exists(filepath: string): Promise<boolean>;
    move(src: string, dest: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    list(prefix?: string): AsyncIterable<string>;
}
interface TusDriver extends Driver {
    get tusExtensions(): string[];
    createChunkedUpload(filepath: string, context: ChunkedUploadContext): Promise<ChunkedUploadContext>;
    finishChunkedUpload(filepath: string, context: ChunkedUploadContext): Promise<void>;
    deleteChunkedUpload(filepath: string, context: ChunkedUploadContext): Promise<void>;
    writeChunk(filepath: string, content: Readable, offset: number, context: ChunkedUploadContext): Promise<number>;
}
declare function supportsTus(driver: Driver): driver is TusDriver;
type DriverConfig = {
    driver: string;
    options: Record<string, unknown>;
};

export { type ChunkedUploadContext, Driver, type DriverConfig, type Range, type ReadOptions, type Stat, StorageManager, type TusDriver, supportsTus };
