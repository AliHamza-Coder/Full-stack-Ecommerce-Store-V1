import type { TusDriver } from '@directus/storage';
import type { Accountability, File, SchemaOverview } from '@directus/types';
import stream from 'node:stream';
import { DataStore, Upload } from '@tus/utils';
export type TusDataStoreConfig = {
    constants: {
        ENABLED: boolean;
        CHUNK_SIZE: number | null;
        MAX_SIZE: number | null;
        EXPIRATION_TIME: number;
        SCHEDULE: string;
    };
    /** Storage location name **/
    location: string;
    driver: TusDriver;
    schema: SchemaOverview;
    accountability: Accountability | undefined;
};
export declare class TusDataStore extends DataStore {
    protected chunkSize: number | undefined;
    protected maxSize: number | undefined;
    protected expirationTime: number;
    protected location: string;
    protected storageDriver: TusDriver;
    protected schema: SchemaOverview;
    protected accountability: Accountability | undefined;
    constructor(config: TusDataStoreConfig);
    create(upload: Upload): Promise<Upload>;
    write(readable: stream.Readable, tus_id: string, offset: number): Promise<number>;
    remove(tus_id: string): Promise<void>;
    deleteExpired(): Promise<number>;
    getExpiration(): number;
    getUpload(id: string): Promise<Upload>;
    protected getFileById(tus_id: string): Promise<File>;
}
