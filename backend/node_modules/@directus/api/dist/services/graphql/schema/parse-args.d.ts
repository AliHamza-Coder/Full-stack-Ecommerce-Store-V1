import type { ArgumentNode, GraphQLResolveInfo } from 'graphql';
/**
 * GraphQL's regular resolver `args` variable only contains the "top-level" arguments. Seeing that we convert the
 * whole nested tree into one big query using Directus' own query resolver, we want to have a nested structure of
 * arguments for the whole resolving tree, which can later be transformed into Directus' AST using `deep`.
 * In order to do that, we'll parse over all ArgumentNodes and ObjectFieldNodes to manually recreate an object structure
 * of arguments
 */
export declare function parseArgs(args: readonly ArgumentNode[], variableValues: GraphQLResolveInfo['variableValues']): Record<string, any>;
