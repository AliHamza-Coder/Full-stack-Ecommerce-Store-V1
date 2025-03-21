import type { Filter, Permission, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { FieldNode, FunctionFieldNode, M2ONode, O2MNode } from '../../../types/index.js';
import type { AliasMap } from '../../../utils/get-column-path.js';
export declare function getInnerQueryColumnPreProcessor(knex: Knex, schema: SchemaOverview, table: string, cases: Filter[], permissions: Permission[], aliasMap: AliasMap, aliasPrefix: string): (fieldNode: FieldNode | FunctionFieldNode | M2ONode | O2MNode) => Knex.Raw<string> | null;
