import type { Accountability, Item, SchemaOverview } from '@directus/types';
import type { AST, NestedCollectionNode } from '../../types/ast.js';
import type { RunASTOptions } from './types.js';
/**
 * Execute a given AST using Knex. Returns array of items based on requested AST.
 */
export declare function runAst(originalAST: AST | NestedCollectionNode, schema: SchemaOverview, accountability: Accountability | null, options?: RunASTOptions): Promise<null | Item | Item[]>;
