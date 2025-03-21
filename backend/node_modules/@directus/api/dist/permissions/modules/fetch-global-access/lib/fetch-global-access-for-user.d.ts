import type { Accountability } from '@directus/types';
import type { Knex } from 'knex';
import type { GlobalAccess } from '../types.js';
export declare const fetchGlobalAccessForUser: typeof _fetchGlobalAccessForUser;
export declare function _fetchGlobalAccessForUser(accountability: Pick<Accountability, 'user' | 'ip'>, knex: Knex): Promise<GlobalAccess>;
