import { GraphQLSchema } from 'graphql';
import LRUMapDefault from 'mnemonist/lru-map.js';
export declare const cache: LRUMapDefault.default<string, string | GraphQLSchema>;
