import { createError } from '@directus/errors';
export const GraphQLExecutionError = createError('GRAPHQL_EXECUTION', 'GraphQL execution error.', 400);
