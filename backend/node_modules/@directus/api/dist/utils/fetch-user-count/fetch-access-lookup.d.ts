import type { PrimaryKey } from '@directus/types';
import type { Knex } from 'knex';
export interface AccessLookup {
    role: string | null;
    user: string | null;
    app_access: boolean | number;
    admin_access: boolean | number;
    user_status: 'active' | string;
    user_role: string | null;
}
export interface FetchAccessLookupOptions {
    excludeAccessRows?: PrimaryKey[];
    excludePolicies?: PrimaryKey[];
    excludeUsers?: PrimaryKey[];
    excludeRoles?: PrimaryKey[];
    adminOnly?: boolean;
    knex: Knex;
}
export declare function fetchAccessLookup(options: FetchAccessLookupOptions): Promise<AccessLookup[]>;
