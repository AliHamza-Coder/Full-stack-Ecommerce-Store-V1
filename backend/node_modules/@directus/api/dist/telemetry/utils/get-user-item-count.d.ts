import { type Knex } from 'knex';
export interface UserItemCount {
    collections: number;
    items: number;
}
/**
 * Sum all passed values together. Meant to be used with .reduce()
 */
export declare const sum: (acc: number, val: number) => number;
/**
 * Count all the items in the non-system tables
 */
export declare const getUserItemCount: (db: Knex) => Promise<UserItemCount>;
