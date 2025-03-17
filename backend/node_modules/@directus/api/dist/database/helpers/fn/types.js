import { applyFilter, generateAlias } from '../../../utils/apply-query.js';
import { DatabaseHelper } from '../types.js';
export class FnHelper extends DatabaseHelper {
    schema;
    constructor(knex, schema) {
        super(knex);
        this.schema = schema;
        this.schema = schema;
    }
    _relationalCount(table, column, options) {
        const collectionName = options?.originalCollectionName || table;
        const relation = this.schema.relations.find((relation) => relation.related_collection === collectionName && relation?.meta?.one_field === column);
        const currentPrimary = this.schema.collections[collectionName].primary;
        if (!relation) {
            throw new Error(`Field ${collectionName}.${column} isn't a nested relational collection`);
        }
        // generate a unique alias for the relation collection, to prevent collisions in self referencing relations
        const alias = generateAlias();
        let countQuery = this.knex
            .count('*')
            .from({ [alias]: relation.collection })
            .where(this.knex.raw(`??.??`, [alias, relation.field]), '=', this.knex.raw(`??.??`, [table, currentPrimary]));
        if (options?.relationalCountOptions?.query.filter) {
            // set the newly aliased collection in the alias map as the default parent collection, indicated by '', for any nested filters
            const aliasMap = {
                '': {
                    alias,
                    collection: relation.collection,
                },
            };
            countQuery = applyFilter(this.knex, this.schema, countQuery, options.relationalCountOptions.query.filter, relation.collection, aliasMap, options.relationalCountOptions.cases, options.relationalCountOptions.permissions).query;
        }
        return this.knex.raw('(' + countQuery.toQuery() + ')');
    }
}
