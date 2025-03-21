import type { FieldNode, FunctionFieldNode, NestedCollectionNode } from '../../types/index.js';
/**
 * Derive the unaliased field key from the given AST node.
 */
export declare function getUnaliasedFieldKey(node: NestedCollectionNode | FieldNode | FunctionFieldNode): string;
