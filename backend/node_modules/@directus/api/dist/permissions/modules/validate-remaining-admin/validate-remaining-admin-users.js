import { fetchUserCount } from '../../../utils/fetch-user-count/fetch-user-count.js';
import { validateRemainingAdminCount } from './validate-remaining-admin-count.js';
export async function validateRemainingAdminUsers(options, context) {
    const { admin } = await fetchUserCount({
        ...options,
        adminOnly: true,
        knex: context.knex,
    });
    validateRemainingAdminCount(admin);
}
