import type { Accountability, PermissionsAction } from '@directus/types';
import type { Context } from '../types.js';
export interface FetchPermissionsOptions {
    action?: PermissionsAction;
    policies: string[];
    collections?: string[];
    accountability?: Pick<Accountability, 'user' | 'role' | 'roles' | 'app' | 'share' | 'ip'>;
    bypassDynamicVariableProcessing?: boolean;
}
export declare function fetchPermissions(options: FetchPermissionsOptions, context: Context): Promise<{
    permissions: import("@directus/types").Filter | null;
    validation: import("@directus/types").Filter | null;
    presets: any;
    id?: number;
    policy: string | null;
    collection: string;
    action: PermissionsAction;
    fields: string[] | null;
    system?: true;
}[]>;
