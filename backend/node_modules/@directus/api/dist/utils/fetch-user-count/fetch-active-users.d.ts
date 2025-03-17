import type { Knex } from 'knex';
export interface ActiveUser {
    id: string;
    role: string | null;
}
export declare function fetchActiveUsers(knex: Knex): Promise<ActiveUser[]>;
