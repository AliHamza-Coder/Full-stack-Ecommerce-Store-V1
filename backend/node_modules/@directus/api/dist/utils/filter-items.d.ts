import type { Item, Query } from '@directus/types';
export declare function filterItems<T extends Item[]>(items: T, filter: Query['filter']): T;
