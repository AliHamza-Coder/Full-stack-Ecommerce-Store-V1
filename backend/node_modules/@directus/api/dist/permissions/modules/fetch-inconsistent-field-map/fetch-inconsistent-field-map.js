import { uniq, intersection, difference } from 'lodash-es';
import { fetchPolicies } from '../../lib/fetch-policies.js';
import { fetchPermissions } from '../../lib/fetch-permissions.js';
/**
 * Fetch a field map for fields that may or may not be null based on item-by-item permissions.
 */
export async function fetchInconsistentFieldMap({ accountability, action }, { knex, schema }) {
    const fieldMap = {};
    if (!accountability || accountability.admin) {
        for (const collection of Object.keys(schema.collections)) {
            fieldMap[collection] = [];
        }
        return fieldMap;
    }
    const policies = await fetchPolicies(accountability, { knex, schema });
    const permissions = await fetchPermissions({ action, policies, accountability }, { knex, schema });
    const collections = uniq(permissions.map(({ collection }) => collection));
    for (const collection of collections) {
        const fields = permissions
            .filter((permission) => permission.collection === collection)
            .map((permission) => permission.fields ?? []);
        const availableEverywhere = intersection(...fields);
        const availableSomewhere = difference(uniq(fields.flat()), availableEverywhere);
        fieldMap[collection] = availableSomewhere;
    }
    return fieldMap;
}
