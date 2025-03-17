import { applyFilter } from '../../../utils/apply-query.js';
export function applyCaseWhen({ columnCases, table, aliasMap, cases, column, alias, permissions }, { knex, schema }) {
    const caseQuery = knex.queryBuilder();
    applyFilter(knex, schema, caseQuery, { _or: columnCases }, table, aliasMap, cases, permissions);
    const compiler = knex.client.queryCompiler(caseQuery);
    const sqlParts = [];
    // Only empty filters, so no where was generated, skip it
    if (!compiler.grouped.where)
        return column;
    for (const statement of compiler.grouped.where) {
        const val = compiler[statement.type](statement);
        if (val) {
            if (sqlParts.length > 0) {
                sqlParts.push(statement.bool);
            }
            sqlParts.push(val);
        }
    }
    const sql = sqlParts.length > 0 ? sqlParts.join(' ') : '1';
    const bindings = [...caseQuery.toSQL().bindings, column];
    let rawCase = `(CASE WHEN ${sql} THEN ?? END)`;
    if (alias) {
        rawCase += ' AS ??';
        bindings.push(alias);
    }
    return knex.raw(rawCase, bindings);
}
