import { createError } from '@directus/errors';
export const GraphQLValidationError = createError('GRAPHQL_VALIDATION', 'GraphQL validation error.', 400);
