import type { Accountability, PermissionsAction } from '@directus/types';
import type { AST } from '../../../types/ast.js';
import type { Context } from '../../types.js';
export interface ProcessAstOptions {
    ast: AST;
    action: PermissionsAction;
    accountability: Accountability | null;
}
export declare function processAst(options: ProcessAstOptions, context: Context): Promise<AST>;
