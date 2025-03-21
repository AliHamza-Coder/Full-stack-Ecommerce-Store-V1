import { type Knex } from 'knex';
export interface ExtensionCount {
    /**
     * Total count of enabled extensions excluding Bundle-Parents,
     * meaning a Bundle extensions with one extension inside of it counts as one.
     */
    totalEnabled: number;
}
export declare const getExtensionCount: (db: Knex) => Promise<ExtensionCount>;
