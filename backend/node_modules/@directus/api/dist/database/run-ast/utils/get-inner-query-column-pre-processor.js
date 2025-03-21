import { applyCaseWhen } from './apply-case-when.js';
import { getNodeAlias } from './get-field-alias.js';
export function getInnerQueryColumnPreProcessor(knex, schema, table, cases, permissions, aliasMap, aliasPrefix) {
    return function (fieldNode) {
        const alias = getNodeAlias(fieldNode);
        if (fieldNode.whenCase && fieldNode.whenCase.length > 0) {
            const columnCases = [];
            for (const index of fieldNode.whenCase) {
                columnCases.push(cases[index]);
            }
            // Don't pass in the alias as we need to wrap the whole case/when in a count() an alias that
            const caseWhen = applyCaseWhen({
                column: knex.raw(1),
                columnCases,
                aliasMap,
                cases,
                table,
                permissions,
            }, { knex, schema });
            return knex.raw('COUNT(??) AS ??', [caseWhen, `${aliasPrefix}_${alias}`]);
        }
        return null;
    };
}
