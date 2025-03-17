export async function up(knex) {
    await knex.schema.alterTable('directus_settings', (table) => {
        table.string('report_error_url').nullable();
        table.string('report_bug_url').nullable();
        table.string('report_feature_url').nullable();
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_settings', (table) => {
        table.dropColumn('report_error_url');
        table.dropColumn('report_bug_url');
        table.dropColumn('report_feature_url');
    });
}
