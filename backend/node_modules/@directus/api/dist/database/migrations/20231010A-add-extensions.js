export async function up(knex) {
    await knex.schema.createTable('directus_extensions', (table) => {
        table.string('name').primary().notNullable();
        table.boolean('enabled').defaultTo(true).notNullable();
    });
}
export async function down(knex) {
    await knex.schema.dropTable('directus_extensions');
}
