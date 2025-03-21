import type { Query } from '@directus/types';
export declare function validateQuery(query: Query): Query;
export declare function validateBoolean(value: any, key: string): boolean;
export declare function validateGeometry(value: any, key: string): boolean;
