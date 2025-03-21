import { uniq } from 'lodash-es';
import { fetchPolicies } from '../../lib/fetch-policies.js';
import { fetchPermissions } from '../../lib/fetch-permissions.js';
export async function fetchAllowedCollections({ action, accountability }, { knex, schema }) {
    if (accountability.admin) {
        return Object.keys(schema.collections);
    }
    const policies = await fetchPolicies(accountability, { knex, schema });
    const permissions = await fetchPermissions({ action, policies, accountability }, { knex, schema });
    const collections = permissions.map(({ collection }) => collection);
    return uniq(collections);
}
