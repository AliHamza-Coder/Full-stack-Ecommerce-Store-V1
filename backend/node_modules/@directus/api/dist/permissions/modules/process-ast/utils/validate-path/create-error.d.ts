import { type DirectusError } from '@directus/errors';
export declare function createCollectionForbiddenError(path: string, collection: string): DirectusError<any>;
export declare function createFieldsForbiddenError(path: string, collection: string, fields: string[]): DirectusError<any>;
