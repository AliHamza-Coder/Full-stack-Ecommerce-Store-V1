import type { Item, SchemaOverview } from '@directus/types';
import type { NestedCollectionNode } from '../../../types/ast.js';
export declare function applyParentFilters(schema: SchemaOverview, nestedCollectionNodes: NestedCollectionNode[], parentItem: Item | Item[]): NestedCollectionNode[];
