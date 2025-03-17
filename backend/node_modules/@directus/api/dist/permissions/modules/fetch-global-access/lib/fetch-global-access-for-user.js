import { withCache } from '../../../utils/with-cache.js';
import { fetchGlobalAccessForQuery } from '../utils/fetch-global-access-for-query.js';
export const fetchGlobalAccessForUser = withCache('global-access-user', _fetchGlobalAccessForUser, ({ user, ip }) => ({
    user,
    ip,
}));
export async function _fetchGlobalAccessForUser(accountability, knex) {
    const query = knex.where('user', '=', accountability.user);
    return await fetchGlobalAccessForQuery(query, accountability);
}
