import { SchemaHelper } from '../types.js';
export declare class SchemaHelperSQLite extends SchemaHelper {
    generateIndexName(type: 'unique' | 'foreign' | 'index', collection: string, fields: string | string[]): string;
    preColumnChange(): Promise<boolean>;
    postColumnChange(): Promise<void>;
    getDatabaseSize(): Promise<number | null>;
    addInnerSortFieldsToGroupBy(): void;
}
