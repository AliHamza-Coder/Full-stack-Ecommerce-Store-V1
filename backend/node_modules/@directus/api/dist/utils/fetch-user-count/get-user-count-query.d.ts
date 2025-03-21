import type { PrimaryKey } from '@directus/types';
import type { Knex } from 'knex';
export interface GetUserCountOptions {
    excludeIds?: PrimaryKey[];
    excludeRoles?: PrimaryKey[];
    includeRoles?: PrimaryKey[];
}
export declare function getUserCountQuery(knex: Knex, options: GetUserCountOptions): Promise<{
    count: number;
}> | Knex.QueryBuilder<any, {
    _base: {};
    _hasSelection: true;
    _keys: never;
    _aliases: {};
    _single: false;
    _intersectProps: {
        count?: string | number;
    };
    _unionProps: undefined;
}>;
