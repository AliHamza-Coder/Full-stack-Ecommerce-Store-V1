import type { File } from '@directus/types';
import { type Metadata } from '../utils/get-metadata.js';
export declare function extractMetadata(storageLocation: string, data: Partial<File> & Pick<File, 'type' | 'filename_disk'>): Promise<Metadata>;
