import type { Accountability, PermissionsAction } from '@directus/types';
import type { Context } from '../../types.js';
export type FieldMap = Record<string, string[]>;
export interface FetchInconsistentFieldMapOptions {
    accountability: Pick<Accountability, 'user' | 'role' | 'roles' | 'ip' | 'admin' | 'app'> | null;
    action: PermissionsAction;
}
/**
 * Fetch a field map for fields that may or may not be null based on item-by-item permissions.
 */
export declare function fetchInconsistentFieldMap({ accountability, action }: FetchInconsistentFieldMapOptions, { knex, schema }: Context): Promise<FieldMap>;
