import { parseFilter, parsePreset } from '@directus/utils';
export function processPermissions({ permissions, accountability, permissionsContext }) {
    return permissions.map((permission) => {
        return {
            ...permission,
            permissions: parseFilter(permission.permissions, accountability, permissionsContext),
            validation: parseFilter(permission.validation, accountability, permissionsContext),
            presets: parsePreset(permission.presets, accountability, permissionsContext),
        };
    });
}
