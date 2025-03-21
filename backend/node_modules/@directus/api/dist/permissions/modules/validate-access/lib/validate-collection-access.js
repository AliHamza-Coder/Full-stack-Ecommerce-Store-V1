import { fetchPermissions } from '../../../lib/fetch-permissions.js';
import { fetchPolicies } from '../../../lib/fetch-policies.js';
/**
 * Check if you have (limited) access to a given collection by making sure there's at least 1
 * permission rule available for the collection and action combo
 */
export async function validateCollectionAccess(options, context) {
    const policies = await fetchPolicies(options.accountability, context);
    const permissions = await fetchPermissions({ action: options.action, policies, collections: [options.collection], accountability: options.accountability }, context);
    return permissions.length > 0;
}
