import { type Knex } from 'knex';
export interface FilesizeSum {
    total: number;
}
export declare const getFilesizeSum: (db: Knex) => Promise<FilesizeSum>;
