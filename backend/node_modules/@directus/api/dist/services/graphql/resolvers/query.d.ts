import type { Item } from '@directus/types';
import type { GraphQLResolveInfo } from 'graphql';
import type { GraphQLService } from '../index.js';
/**
 * Generic resolver that's used for every "regular" items/system query. Converts the incoming GraphQL AST / fragments into
 * Directus' query structure which is then executed by the services.
 */
export declare function resolveQuery(gql: GraphQLService, info: GraphQLResolveInfo): Promise<Partial<Item> | null>;
