import { withCache } from '../utils/with-cache.js';
export const fetchRolesTree = withCache('roles-tree', _fetchRolesTree);
export async function _fetchRolesTree(start, knex) {
    if (!start)
        return [];
    let parent = start;
    const roles = [];
    while (parent) {
        const role = await knex
            .select('id', 'parent')
            .from('directus_roles')
            .where({ id: parent })
            .first();
        if (!role) {
            break;
        }
        roles.push(role.id);
        // Prevent infinite recursion loops
        if (role.parent && roles.includes(role.parent) === true) {
            roles.reverse();
            const rolesStr = roles.map((role) => `"${role}"`).join('->');
            throw new Error(`Recursion encountered: role "${role.id}" already exists in tree path ${rolesStr}`);
        }
        parent = role.parent;
    }
    roles.reverse();
    return roles;
}
