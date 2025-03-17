import type { Item } from '@directus/types';
import type { GraphQLResolveInfo } from 'graphql';
import type { GraphQLService } from '../index.js';
export declare function resolveMutation(gql: GraphQLService, args: Record<string, any>, info: GraphQLResolveInfo): Promise<Partial<Item> | boolean | undefined>;
