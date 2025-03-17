import type { Accountability } from '@directus/types';
import type { Knex } from 'knex';
export declare const fetchPoliciesIpAccess: typeof _fetchPoliciesIpAccess;
export declare function _fetchPoliciesIpAccess(accountability: Pick<Accountability, 'user' | 'roles'>, knex: Knex): Promise<string[][]>;
