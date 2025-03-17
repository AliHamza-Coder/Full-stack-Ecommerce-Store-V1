import type { Item, SchemaOverview } from '@directus/types';
import type { NestedCollectionNode } from '../../../types/ast.js';
export declare function mergeWithParentItems(schema: SchemaOverview, nestedItem: Item | Item[], parentItem: Item | Item[], nestedNode: NestedCollectionNode, fieldAllowed: boolean | boolean[]): Item | Item[] | undefined;
