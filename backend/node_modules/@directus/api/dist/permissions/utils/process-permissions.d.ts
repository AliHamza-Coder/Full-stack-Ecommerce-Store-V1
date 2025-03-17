import type { Accountability, Permission } from '@directus/types';
export interface ProcessPermissionsOptions {
    permissions: Permission[];
    accountability: Pick<Accountability, 'user' | 'role' | 'roles'>;
    permissionsContext: Record<string, any>;
}
export declare function processPermissions({ permissions, accountability, permissionsContext }: ProcessPermissionsOptions): {
    permissions: import("@directus/types").Filter | null;
    validation: import("@directus/types").Filter | null;
    presets: any;
    id?: number;
    policy: string | null;
    collection: string;
    action: import("@directus/types").PermissionsAction;
    fields: string[] | null;
    system?: true;
}[];
