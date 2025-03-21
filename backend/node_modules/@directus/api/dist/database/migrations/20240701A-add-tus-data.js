export async function up(knex) {
    await knex.schema.alterTable('directus_files', (table) => {
        table.string('tus_id', 64).nullable();
        table.json('tus_data').nullable();
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_files', (table) => {
        table.dropColumn('tus_id');
        table.dropColumn('tus_data');
    });
}
