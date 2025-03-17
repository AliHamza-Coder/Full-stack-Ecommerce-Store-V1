import type { Accountability } from '@directus/types';
import type { Knex } from 'knex';
import type { GlobalAccess } from '../types.js';
export declare const fetchGlobalAccessForRoles: typeof _fetchGlobalAccessForRoles;
export declare function _fetchGlobalAccessForRoles(accountability: Pick<Accountability, 'roles' | 'ip'>, knex: Knex): Promise<GlobalAccess>;
