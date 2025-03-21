import { getHelpers } from '../helpers/index.js';
import { createInspector } from '@directus/schema';
export async function up(knex) {
    const inspector = createInspector(knex);
    const helper = getHelpers(knex).schema;
    const csvFields = await knex.select('collection', 'field').from('directus_fields').where('special', '=', 'cast-csv');
    const updates = [];
    for (const { collection, field } of csvFields) {
        updates.push(inspector.columnInfo(collection, field).then((column) => {
            if (column.data_type === 'text')
                return;
            return helper.changeToType(collection, field, 'text', {
                default: column.default_value,
                nullable: column.is_nullable,
            });
        }));
    }
    return checkPromises(updates);
}
export async function down(knex) {
    const inspector = createInspector(knex);
    const helper = getHelpers(knex).schema;
    const csvFields = await knex.select('collection', 'field').from('directus_fields').where('special', '=', 'cast-csv');
    const updates = [];
    for (const { collection, field } of csvFields) {
        updates.push(inspector.columnInfo(collection, field).then((column) => {
            return helper.changeToType(collection, field, 'string', {
                default: column.default_value,
                nullable: column.is_nullable,
            });
        }));
    }
    return checkPromises(updates);
}
async function checkPromises(promises) {
    const result = await Promise.allSettled(promises);
    const errors = result.filter(isRejectedPromise).map((promise) => promise.reason);
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
}
function isRejectedPromise(promise) {
    return promise.status === 'rejected';
}
