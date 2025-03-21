import type { Column, SchemaInspector } from '@directus/schema';
import type { Accountability, Field, RawField, SchemaOverview, Type } from '@directus/types';
import type Keyv from 'keyv';
import type { Knex } from 'knex';
import type { Helpers } from '../database/helpers/index.js';
import type { AbstractServiceOptions, MutationOptions } from '../types/index.js';
import { ItemsService } from './items.js';
import { PayloadService } from './payload.js';
export declare class FieldsService {
    knex: Knex;
    helpers: Helpers;
    accountability: Accountability | null;
    itemsService: ItemsService;
    payloadService: PayloadService;
    schemaInspector: SchemaInspector;
    schema: SchemaOverview;
    cache: Keyv<any> | null;
    systemCache: Keyv<any>;
    schemaCache: Keyv<any>;
    constructor(options: AbstractServiceOptions);
    columnInfo(collection?: string): Promise<Column[]>;
    columnInfo(collection: string, field: string): Promise<Column>;
    readAll(collection?: string): Promise<Field[]>;
    readOne(collection: string, field: string): Promise<Record<string, any>>;
    createField(collection: string, field: Partial<Field> & {
        field: string;
        type: Type | null;
    }, table?: Knex.CreateTableBuilder, // allows collection creation to
    opts?: MutationOptions): Promise<void>;
    updateField(collection: string, field: RawField, opts?: MutationOptions): Promise<string>;
    updateFields(collection: string, fields: RawField[], opts?: MutationOptions): Promise<string[]>;
    deleteField(collection: string, field: string, opts?: MutationOptions): Promise<void>;
    addColumnToTable(table: Knex.CreateTableBuilder, collection: string, field: RawField | Field, existing?: Column | null): void;
}
