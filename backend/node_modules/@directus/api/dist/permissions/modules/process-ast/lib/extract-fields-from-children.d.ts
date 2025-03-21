import type { SchemaOverview } from '@directus/types';
import type { FieldNode, FunctionFieldNode, NestedCollectionNode } from '../../../../types/ast.js';
import type { FieldMap, QueryPath } from '../types.js';
export declare function extractFieldsFromChildren(collection: string, children: (NestedCollectionNode | FieldNode | FunctionFieldNode)[], fieldMap: FieldMap, schema: SchemaOverview, path?: QueryPath): void;
