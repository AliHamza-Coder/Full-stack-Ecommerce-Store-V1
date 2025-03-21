import type { Accountability, Permission, PermissionsAction } from '@directus/types';
import type { Context } from '../types.js';
export declare const fetchRawPermissions: typeof _fetchRawPermissions;
export interface FetchRawPermissionsOptions {
    action?: PermissionsAction;
    policies: string[];
    collections?: string[];
    accountability?: Pick<Accountability, 'app'>;
    bypassMinimalAppPermissions?: boolean;
}
export declare function _fetchRawPermissions(options: FetchRawPermissionsOptions, context: Context): Promise<Permission[]>;
