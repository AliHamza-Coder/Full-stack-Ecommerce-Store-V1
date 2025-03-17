import type { Accountability, PermissionsAction } from '@directus/types';
import type { Context } from '../../types.js';
export type FieldMap = Record<string, string[]>;
export interface FetchAllowedFieldMapOptions {
    accountability: Pick<Accountability, 'user' | 'role' | 'roles' | 'ip' | 'admin' | 'app'>;
    action: PermissionsAction;
}
export declare function fetchAllowedFieldMap({ accountability, action }: FetchAllowedFieldMapOptions, { knex, schema }: Context): Promise<FieldMap>;
