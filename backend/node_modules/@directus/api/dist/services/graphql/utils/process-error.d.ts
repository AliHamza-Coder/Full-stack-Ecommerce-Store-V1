import { type DirectusError } from '@directus/errors';
import type { Accountability } from '@directus/types';
import type { GraphQLError, GraphQLFormattedError } from 'graphql';
declare const processError: (accountability: Accountability | null, error: Readonly<GraphQLError & {
    originalError: GraphQLError | DirectusError | Error | undefined;
}>) => GraphQLFormattedError;
export default processError;
