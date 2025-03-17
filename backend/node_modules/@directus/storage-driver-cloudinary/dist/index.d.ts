import { TusDriver, ReadOptions, ChunkedUploadContext } from '@directus/storage';
import { Readable } from 'node:stream';

type DriverCloudinaryConfig = {
    root?: string;
    cloudName: string;
    apiKey: string;
    apiSecret: string;
    accessMode: 'public' | 'authenticated';
    tus?: {
        enabled: boolean;
        chunkSize?: number;
    };
};
declare class DriverCloudinary implements TusDriver {
    private root;
    private apiKey;
    private apiSecret;
    private cloudName;
    private accessMode;
    constructor(config: DriverCloudinaryConfig);
    private fullPath;
    private toFormUrlEncoded;
    /**
     * Generate the Cloudinary sha256 signature for the given payload
     * @see https://cloudinary.com/documentation/signatures
     */
    private getFullSignature;
    /**
     * Creates inline URL signature for use with the image reading API
     * @see https://cloudinary.com/documentation/advanced_url_delivery_options#generating_delivery_url_signatures
     */
    private getParameterSignature;
    private getTimestamp;
    /**
     * Used to guess what resource type is appropriate for a given filepath
     * @see https://cloudinary.com/documentation/image_transformations#image_upload_note
     */
    private getResourceType;
    /**
     * For Cloudinary Admin APIs, the file extension needs to be omitted for images and videos. Raw
     * on the other hand requires the extension to be present.
     */
    private getPublicId;
    /**
     * Cloudinary sometimes treats the folder path leading up to the file ID as a separate request
     * entity. This method will return the folder path without the filename for those uses. The
     * leading slash is removed.
     */
    private getFolderPath;
    /**
     * Generates the Authorization header value for Cloudinary's basic auth endpoints
     */
    private getBasicAuth;
    read(filepath: string, options?: ReadOptions): Promise<Readable>;
    stat(filepath: string): Promise<{
        size: number;
        modified: Date;
    }>;
    exists(filepath: string): Promise<boolean>;
    move(src: string, dest: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    write(filepath: string, content: Readable): Promise<void>;
    private uploadChunk;
    delete(filepath: string): Promise<void>;
    list(prefix?: string): AsyncGenerator<string, void, unknown>;
    get tusExtensions(): string[];
    createChunkedUpload(_filepath: string, context: ChunkedUploadContext): Promise<ChunkedUploadContext>;
    writeChunk(filepath: string, content: Readable, offset: number, context: ChunkedUploadContext): Promise<number>;
    finishChunkedUpload(_filepath: string, _context: ChunkedUploadContext): Promise<void>;
    deleteChunkedUpload(filepath: string, _context: ChunkedUploadContext): Promise<void>;
}

export { DriverCloudinary, type DriverCloudinaryConfig, DriverCloudinary as default };
