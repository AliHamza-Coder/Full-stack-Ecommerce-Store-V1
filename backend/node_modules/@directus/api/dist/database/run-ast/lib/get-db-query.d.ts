import type { Filter, Permission, Query } from '@directus/types';
import type { Knex } from 'knex';
import type { Context } from '../../../permissions/types.js';
import type { FieldNode, FunctionFieldNode, O2MNode } from '../../../types/ast.js';
export type DBQueryOptions = {
    table: string;
    fieldNodes: (FieldNode | FunctionFieldNode)[];
    o2mNodes: O2MNode[];
    query: Query;
    cases: Filter[];
    permissions: Permission[];
    permissionsOnly?: boolean;
};
export declare function getDBQuery({ table, fieldNodes, o2mNodes, query, cases, permissions, permissionsOnly }: DBQueryOptions, { knex, schema }: Context): Knex.QueryBuilder;
