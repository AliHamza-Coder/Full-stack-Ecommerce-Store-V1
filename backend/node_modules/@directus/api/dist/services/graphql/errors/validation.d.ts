import type { GraphQLError } from 'graphql';
interface GraphQLValidationErrorExtensions {
    errors: GraphQLError[];
}
export declare const GraphQLValidationError: import("@directus/errors").DirectusErrorConstructor<GraphQLValidationErrorExtensions>;
export {};
