import type { Permission } from '@directus/types';
import type { AST } from '../../../../types/ast.js';
/**
 * Mutates passed AST
 *
 * @param ast - Read query AST
 * @param permissions - Expected to be filtered down for the policies and action already
 */
export declare function injectCases(ast: AST, permissions: Permission[]): void;
