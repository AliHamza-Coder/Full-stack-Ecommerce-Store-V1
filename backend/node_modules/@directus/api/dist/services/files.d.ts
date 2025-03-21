import type { BusboyFileStream, File, PrimaryKey, Query } from '@directus/types';
import type { Readable } from 'node:stream';
import type { AbstractServiceOptions, MutationOptions } from '../types/index.js';
import { ItemsService, type QueryOptions } from './items.js';
export declare class FilesService extends ItemsService<File> {
    constructor(options: AbstractServiceOptions);
    /**
     * Upload a single new file to the configured storage adapter
     */
    uploadOne(stream: BusboyFileStream | Readable, data: Partial<File> & {
        storage: string;
    }, primaryKey?: PrimaryKey, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Extract metadata from a buffer's content
     */
    /**
     * Import a single file from an external URL
     */
    importOne(importURL: string, body: Partial<File>): Promise<PrimaryKey>;
    /**
     * Create a file (only applicable when it is not a multipart/data POST request)
     * Useful for associating metadata with existing file in storage
     */
    createOne(data: Partial<File>, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Delete multiple files
     */
    deleteMany(keys: PrimaryKey[]): Promise<PrimaryKey[]>;
    readByQuery(query: Query, opts?: QueryOptions | undefined): Promise<File[]>;
}
