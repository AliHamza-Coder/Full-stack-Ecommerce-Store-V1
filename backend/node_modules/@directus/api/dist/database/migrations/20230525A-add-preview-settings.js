export async function up(knex) {
    await knex.schema.alterTable('directus_collections', (table) => {
        table.string('preview_url').nullable();
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_collections', (table) => {
        table.dropColumn('preview_url');
    });
}
