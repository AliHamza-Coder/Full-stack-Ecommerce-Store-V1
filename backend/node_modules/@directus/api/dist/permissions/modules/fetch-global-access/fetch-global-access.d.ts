import type { Accountability } from '@directus/types';
import type { Knex } from 'knex';
import type { GlobalAccess } from './types.js';
export declare const fetchGlobalAccess: typeof _fetchGlobalAccess;
/**
 * Fetch the global access (eg admin/app access) rules for the given roles, or roles+user combination
 *
 * Will fetch roles and user info separately so they can be cached and reused individually
 */
export declare function _fetchGlobalAccess(accountability: Pick<Accountability, 'user' | 'roles' | 'ip'>, knex: Knex): Promise<GlobalAccess>;
