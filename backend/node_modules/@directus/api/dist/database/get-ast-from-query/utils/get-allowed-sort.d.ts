import type { Accountability, Query, Relation } from '@directus/types';
import type { Context } from '../../../permissions/types.js';
export type GetAllowedSortFieldOptions = {
    collection: string;
    accountability: Accountability | null;
    query?: Query;
    relation?: Relation;
};
export declare function getAllowedSort(options: GetAllowedSortFieldOptions, context: Context): Promise<string[] | null>;
