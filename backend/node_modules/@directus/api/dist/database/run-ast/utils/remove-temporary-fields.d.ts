import type { Item, SchemaOverview } from '@directus/types';
import type { AST, NestedCollectionNode } from '../../../types/ast.js';
export declare function removeTemporaryFields(schema: SchemaOverview, rawItem: Item | Item[], ast: AST | NestedCollectionNode, primaryKeyField: string, parentItem?: Item): null | Item | Item[];
