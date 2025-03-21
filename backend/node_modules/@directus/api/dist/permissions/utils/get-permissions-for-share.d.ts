import type { Accountability, Permission, SchemaOverview } from '@directus/types';
import type { Context } from '../types.js';
export declare function getPermissionsForShare(accountability: Pick<Accountability, 'share' | 'ip'>, collections: string[] | undefined, context: Context): Promise<Permission[]>;
export declare function traverse(schema: SchemaOverview, rootItemPrimaryKeyField: string, rootItemPrimaryKey: string, currentCollection: string, parentCollections?: string[], path?: string[]): Partial<Permission>[];
