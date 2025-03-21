import type { Permission } from '@directus/types';
export interface RequiredPermissionContext {
    $CURRENT_USER: Set<string>;
    $CURRENT_ROLE: Set<string>;
    $CURRENT_ROLES: Set<string>;
    $CURRENT_POLICIES: Set<string>;
}
export declare function extractRequiredDynamicVariableContext(permissions: Permission[]): RequiredPermissionContext;
