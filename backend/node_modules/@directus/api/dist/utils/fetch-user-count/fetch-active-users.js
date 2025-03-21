export async function fetchActiveUsers(knex) {
    return await knex.select('id', 'role').from('directus_users').where('status', 'active');
}
