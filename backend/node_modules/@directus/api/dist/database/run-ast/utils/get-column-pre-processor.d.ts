import type { Filter, Permission, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { FieldNode, FunctionFieldNode, M2ONode } from '../../../types/ast.js';
import type { AliasMap } from '../../../utils/get-column-path.js';
interface NodePreProcessOptions {
    /** Don't assign an alias to the column but instead return the column as is */
    noAlias?: boolean;
}
export declare function getColumnPreprocessor(knex: Knex, schema: SchemaOverview, table: string, cases: Filter[], permissions: Permission[], aliasMap: AliasMap, permissionsOnly?: boolean): (fieldNode: FieldNode | FunctionFieldNode | M2ONode, options?: NodePreProcessOptions) => Knex.Raw<string>;
export {};
