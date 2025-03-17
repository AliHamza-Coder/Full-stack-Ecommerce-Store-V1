import { getHelpers } from '../../helpers/index.js';
export function withPreprocessBindings(knex, dbQuery) {
    const schemaHelper = getHelpers(knex).schema;
    dbQuery.client = new Proxy(dbQuery.client, {
        get(target, prop, receiver) {
            if (prop === 'query') {
                return (connection, queryParams) => Reflect.get(target, prop, receiver).bind(dbQuery.client)(connection, schemaHelper.prepQueryParams(queryParams));
            }
            if (prop === 'prepBindings') {
                return (bindings) => schemaHelper.prepBindings(Reflect.get(target, prop, receiver).bind(dbQuery.client)(bindings));
            }
            return Reflect.get(target, prop, receiver);
        },
    });
}
