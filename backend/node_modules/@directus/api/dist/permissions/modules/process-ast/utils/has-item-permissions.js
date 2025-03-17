export function hasItemPermissions(permission) {
    return permission.permissions !== null && Object.keys(permission.permissions).length > 0;
}
