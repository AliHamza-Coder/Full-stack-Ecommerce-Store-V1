import type { GraphQLError } from 'graphql';
interface GraphQLExecutionErrorExtensions {
    errors: GraphQLError[];
}
export declare const GraphQLExecutionError: import("@directus/errors").DirectusErrorConstructor<GraphQLExecutionErrorExtensions>;
export {};
