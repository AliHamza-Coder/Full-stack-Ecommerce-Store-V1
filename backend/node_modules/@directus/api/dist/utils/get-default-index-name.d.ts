export type GetDefaultIndexNameOptions = {
    maxLength?: number;
};
/**
 * Generate an index name for a given collection + fields combination.
 *
 * Based on the default index name generation of knex, with the caveat that it limits the index to options.maxLength
 * which defaults to 60 characters.
 *
 * @see
 * https://github.com/knex/knex/blob/fff6eb15d7088d4198650a2c6e673dedaf3b8f36/lib/schema/tablecompiler.js#L282-L297
 */
export declare function getDefaultIndexName(type: 'unique' | 'foreign' | 'index', collection: string, fields: string | string[], options?: GetDefaultIndexNameOptions): string;
