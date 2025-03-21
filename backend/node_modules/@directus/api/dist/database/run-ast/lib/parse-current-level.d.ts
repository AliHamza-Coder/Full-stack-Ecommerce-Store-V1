import type { Query, SchemaOverview } from '@directus/types';
import type { FieldNode, FunctionFieldNode, NestedCollectionNode } from '../../../types/ast.js';
export declare function parseCurrentLevel(schema: SchemaOverview, collection: string, children: (NestedCollectionNode | FieldNode | FunctionFieldNode)[], query: Query): Promise<{
    fieldNodes: FieldNode[];
    nestedCollectionNodes: NestedCollectionNode[];
    primaryKeyField: string;
}>;
