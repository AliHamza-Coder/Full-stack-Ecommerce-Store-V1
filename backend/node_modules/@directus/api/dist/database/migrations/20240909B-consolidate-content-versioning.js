export async function up(knex) {
    await knex.schema.alterTable('directus_versions', (table) => {
        table.json('delta');
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_versions', (table) => {
        table.dropColumn('delta');
    });
}
