export async function up(knex) {
    await knex.schema.alterTable('directus_sessions', (table) => {
        table.string('next_token', 64).nullable();
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_sessions', (table) => {
        table.dropColumn('next_token');
    });
}
