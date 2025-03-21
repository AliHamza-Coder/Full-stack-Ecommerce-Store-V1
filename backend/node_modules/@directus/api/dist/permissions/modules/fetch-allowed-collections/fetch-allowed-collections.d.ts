import type { Accountability, PermissionsAction } from '@directus/types';
import type { Context } from '../../types.js';
export interface FetchAllowedCollectionsOptions {
    action: PermissionsAction;
    accountability: Pick<Accountability, 'user' | 'role' | 'roles' | 'ip' | 'admin' | 'app'>;
}
export declare function fetchAllowedCollections({ action, accountability }: FetchAllowedCollectionsOptions, { knex, schema }: Context): Promise<string[]>;
