import { type Knex } from 'knex';
export interface FieldCount {
    max: number;
    total: number;
}
export declare const getFieldCount: (db: Knex) => Promise<FieldCount>;
