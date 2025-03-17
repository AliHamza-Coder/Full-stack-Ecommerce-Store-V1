import type { Accountability, PermissionsAction, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AST } from '../../../types/ast.js';
type FetchPermittedAstRootFieldsOptions = {
    schema: SchemaOverview;
    accountability: Accountability;
    knex: Knex;
    action: PermissionsAction;
};
/**
 * Fetch the permitted top level fields of a given root type AST using a case/when query that is constructed the
 * same way as `runAst` but only returns flags (1/null) instead of actual field values.
 */
export declare function fetchPermittedAstRootFields(originalAST: AST, { schema, accountability, knex, action }: FetchPermittedAstRootFieldsOptions): Promise<any>;
export {};
