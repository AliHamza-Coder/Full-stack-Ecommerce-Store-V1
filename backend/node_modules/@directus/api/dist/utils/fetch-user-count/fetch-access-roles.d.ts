import type { PrimaryKey } from '@directus/types';
import type { Knex } from 'knex';
export interface FetchAccessRolesOptions {
    adminRoles: Set<string>;
    appRoles: Set<string>;
    excludeRoles?: PrimaryKey[];
}
/**
 * Return a set of roles that allow app or admin access, if itself or any of its parents do
 */
export declare function fetchAccessRoles(options: FetchAccessRolesOptions, context: {
    knex: Knex;
}): Promise<{
    adminRoles: Set<string>;
    appRoles: Set<string>;
}>;
