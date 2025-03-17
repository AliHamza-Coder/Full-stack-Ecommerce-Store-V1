import type { Query } from '@directus/types';
import type { FieldKey } from '../types.js';
export declare function flattenFilter(paths: FieldKey[][], filter: Query['filter']): void;
