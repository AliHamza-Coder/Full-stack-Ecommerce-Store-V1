import type { Knex } from 'knex';
export declare const fetchRolesTree: typeof _fetchRolesTree;
export declare function _fetchRolesTree(start: string | null, knex: Knex): Promise<string[]>;
