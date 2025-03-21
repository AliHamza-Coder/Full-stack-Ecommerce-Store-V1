import { fetchPermissions } from '../permissions/lib/fetch-permissions.js';
import { fetchPolicies } from '../permissions/lib/fetch-policies.js';
import { createDefaultAccountability } from '../permissions/utils/create-default-accountability.js';
/**
 * Check if the read permissions for a collection contain the dynamic variable $NOW.
 * If they do, the permissions are not cachable.
 */
export async function permissionsCachable(collection, context, accountability) {
    if (!collection) {
        return true;
    }
    if (!accountability) {
        accountability = createDefaultAccountability();
    }
    const policies = await fetchPolicies(accountability, context);
    const permissions = await fetchPermissions({ action: 'read', policies, collections: [collection], accountability, bypassDynamicVariableProcessing: true }, context);
    const has_now = permissions.some((permission) => {
        if (!permission.permissions) {
            return false;
        }
        return filter_has_now(permission.permissions);
    });
    return !has_now;
}
export function filter_has_now(filter) {
    return Object.entries(filter).some(([key, value]) => {
        if (key === '_and' || key === '_or') {
            return value.some((sub_filter) => filter_has_now(sub_filter));
        }
        else if (typeof value === 'object') {
            return filter_has_now(value);
        }
        else if (typeof value === 'string') {
            return value.startsWith('$NOW');
        }
        return false;
    });
}
