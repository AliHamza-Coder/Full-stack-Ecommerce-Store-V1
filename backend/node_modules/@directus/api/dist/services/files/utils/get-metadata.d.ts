import type { File } from '@directus/types';
import type { Readable } from 'node:stream';
export type Metadata = Partial<Pick<File, 'height' | 'width' | 'description' | 'title' | 'tags' | 'metadata'>>;
export declare function getMetadata(stream: Readable, allowList?: string | string[]): Promise<Metadata>;
