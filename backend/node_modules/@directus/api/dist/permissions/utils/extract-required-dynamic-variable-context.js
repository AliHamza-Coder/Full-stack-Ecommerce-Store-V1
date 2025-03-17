import { deepMap } from '@directus/utils';
export function extractRequiredDynamicVariableContext(permissions) {
    const permissionContext = {
        $CURRENT_USER: new Set(),
        $CURRENT_ROLE: new Set(),
        $CURRENT_ROLES: new Set(),
        $CURRENT_POLICIES: new Set(),
    };
    for (const permission of permissions) {
        deepMap(permission.permissions, extractPermissionData);
        deepMap(permission.validation, extractPermissionData);
        deepMap(permission.presets, extractPermissionData);
    }
    return permissionContext;
    function extractPermissionData(val) {
        for (const placeholder of [
            '$CURRENT_USER',
            '$CURRENT_ROLE',
            '$CURRENT_ROLES',
            '$CURRENT_POLICIES',
        ]) {
            if (typeof val === 'string' && val.startsWith(`${placeholder}.`)) {
                permissionContext[placeholder].add(val.replace(`${placeholder}.`, ''));
            }
        }
    }
}
