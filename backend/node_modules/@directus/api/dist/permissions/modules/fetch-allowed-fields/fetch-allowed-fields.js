import { uniq } from 'lodash-es';
import { fetchPermissions } from '../../lib/fetch-permissions.js';
import { fetchPolicies } from '../../lib/fetch-policies.js';
/**
 * Look up all fields that are allowed to be used for the given collection and action for the given
 * accountability object
 *
 * Done by looking up all available policies for the current accountability object, and reading all
 * permissions that exist for the collection+action+policy combination
 */
export async function fetchAllowedFields({ accountability, action, collection }, { knex, schema }) {
    const policies = await fetchPolicies(accountability, { knex, schema });
    const permissions = await fetchPermissions({ action, collections: [collection], policies, accountability }, { knex, schema });
    const allowedFields = [];
    for (const { fields } of permissions) {
        if (!fields)
            continue;
        allowedFields.push(...fields);
    }
    return uniq(allowedFields).filter((field) => field === '*' || field in (schema.collections[collection]?.fields ?? {}));
}
