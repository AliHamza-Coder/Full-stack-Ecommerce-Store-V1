import type { Accountability, Query, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { FieldNode, FunctionFieldNode, NestedCollectionNode, O2MNode } from '../../../types/index.js';
export interface ParseFieldsOptions {
    accountability: Accountability | null;
    parentCollection: string;
    fields: string[] | null;
    query: Query;
    deep?: Record<string, any>;
}
export interface ParseFieldsContext {
    schema: SchemaOverview;
    knex: Knex;
}
export declare function parseFields(options: ParseFieldsOptions, context: ParseFieldsContext): Promise<[] | (NestedCollectionNode | FieldNode | FunctionFieldNode)[]>;
export declare function isO2MNode(node: NestedCollectionNode | null): node is O2MNode;
