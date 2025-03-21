import type { CookieOptions } from 'express';
import type { TransformationParams } from './types/index.js';
export declare const SYSTEM_ASSET_ALLOW_LIST: TransformationParams[];
export declare const ASSET_TRANSFORM_QUERY_KEYS: readonly ["key", "transforms", "width", "height", "format", "fit", "quality", "withoutEnlargement", "focal_point_x", "focal_point_y"];
export declare const FILTER_VARIABLES: string[];
export declare const ALIAS_TYPES: string[];
export declare const DEFAULT_AUTH_PROVIDER = "default";
export declare const COLUMN_TRANSFORMS: string[];
export declare const GENERATE_SPECIAL: readonly ["uuid", "date-created", "role-created", "user-created"];
export declare const UUID_REGEX = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
export declare const REFRESH_COOKIE_OPTIONS: CookieOptions;
export declare const SESSION_COOKIE_OPTIONS: CookieOptions;
export declare const OAS_REQUIRED_SCHEMAS: string[];
/** Formats from which transformation is supported */
export declare const SUPPORTED_IMAGE_TRANSFORM_FORMATS: string[];
/** Formats where metadata extraction is supported */
export declare const SUPPORTED_IMAGE_METADATA_FORMATS: string[];
/** Resumable uploads */
export declare const RESUMABLE_UPLOADS: {
    ENABLED: boolean;
    CHUNK_SIZE: number | null;
    MAX_SIZE: number | null;
    EXPIRATION_TIME: number;
    SCHEDULE: string;
};
export declare const ALLOWED_DB_DEFAULT_FUNCTIONS: string[];
