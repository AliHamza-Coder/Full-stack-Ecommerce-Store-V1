import { type DirectusError } from '@directus/errors';
import { GraphQLError } from 'graphql';
/**
 * Convert Directus-Exception into a GraphQL format, so it can be returned by GraphQL properly.
 */
export declare function formatError(error: DirectusError | DirectusError[]): GraphQLError;
