import type { Accountability } from '@directus/types';
import type { Knex } from 'knex';
import type { GlobalAccess } from '../types.js';
export declare function fetchGlobalAccessForQuery(query: Knex.QueryBuilder<any, any[]>, accountability: Pick<Accountability, 'ip'>): Promise<GlobalAccess>;
