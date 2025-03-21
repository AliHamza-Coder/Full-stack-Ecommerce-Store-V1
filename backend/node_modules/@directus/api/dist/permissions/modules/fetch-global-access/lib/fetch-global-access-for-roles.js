import { withCache } from '../../../utils/with-cache.js';
import { fetchGlobalAccessForQuery } from '../utils/fetch-global-access-for-query.js';
export const fetchGlobalAccessForRoles = withCache('global-access-role', _fetchGlobalAccessForRoles, ({ roles, ip }) => ({ roles, ip }));
export async function _fetchGlobalAccessForRoles(accountability, knex) {
    const query = knex.where('role', 'in', accountability.roles);
    return await fetchGlobalAccessForQuery(query, accountability);
}
