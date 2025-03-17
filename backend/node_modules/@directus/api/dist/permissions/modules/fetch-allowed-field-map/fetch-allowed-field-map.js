import { uniq } from 'lodash-es';
import { fetchPolicies } from '../../lib/fetch-policies.js';
import { fetchPermissions } from '../../lib/fetch-permissions.js';
export async function fetchAllowedFieldMap({ accountability, action }, { knex, schema }) {
    const fieldMap = {};
    if (accountability.admin) {
        for (const [collection, { fields }] of Object.entries(schema.collections)) {
            fieldMap[collection] = Object.keys(fields);
        }
        return fieldMap;
    }
    const policies = await fetchPolicies(accountability, { knex, schema });
    const permissions = await fetchPermissions({ action, policies, accountability }, { knex, schema });
    for (const { collection, fields } of permissions) {
        if (!fieldMap[collection]) {
            fieldMap[collection] = [];
        }
        if (fields) {
            fieldMap[collection].push(...fields);
        }
    }
    for (const [collection, fields] of Object.entries(fieldMap)) {
        fieldMap[collection] = uniq(fields);
    }
    return fieldMap;
}
