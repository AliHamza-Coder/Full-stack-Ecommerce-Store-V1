import { fetchDynamicVariableContext } from '../utils/fetch-dynamic-variable-context.js';
import { fetchRawPermissions } from '../utils/fetch-raw-permissions.js';
import { processPermissions } from '../utils/process-permissions.js';
import { getPermissionsForShare } from '../utils/get-permissions-for-share.js';
export async function fetchPermissions(options, context) {
    const permissions = await fetchRawPermissions({ ...options, bypassMinimalAppPermissions: options.bypassDynamicVariableProcessing ?? false }, context);
    if (options.accountability && !options.bypassDynamicVariableProcessing) {
        const permissionsContext = await fetchDynamicVariableContext({
            accountability: options.accountability,
            policies: options.policies,
            permissions,
        }, context);
        // Replace dynamic variables with their actual values
        const processedPermissions = processPermissions({
            permissions,
            accountability: options.accountability,
            permissionsContext,
        });
        if (options.accountability.share && (options.action === undefined || options.action === 'read')) {
            return await getPermissionsForShare(options.accountability, options.collections, context);
        }
        return processedPermissions;
    }
    return permissions;
}
