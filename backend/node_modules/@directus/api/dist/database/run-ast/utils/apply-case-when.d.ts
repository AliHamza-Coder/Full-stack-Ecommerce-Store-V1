import type { Filter, Permission, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AliasMap } from '../../../utils/get-column-path.js';
export interface ApplyCaseWhenOptions {
    column: Knex.Raw;
    columnCases: Filter[];
    table: string;
    cases: Filter[];
    aliasMap: AliasMap;
    alias?: string;
    permissions: Permission[];
}
export interface ApplyCaseWhenContext {
    knex: Knex;
    schema: SchemaOverview;
}
export declare function applyCaseWhen({ columnCases, table, aliasMap, cases, column, alias, permissions }: ApplyCaseWhenOptions, { knex, schema }: ApplyCaseWhenContext): Knex.Raw;
