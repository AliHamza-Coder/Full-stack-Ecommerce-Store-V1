import {} from 'knex';
import { SchemaHelper } from '../types.js';
import { useEnv } from '@directus/env';
import { prepQueryParams } from '../utils/prep-query-params.js';
const env = useEnv();
export class SchemaHelperCockroachDb extends SchemaHelper {
    async changeToType(table, column, type, options = {}) {
        await this.changeToTypeByCopy(table, column, type, options);
    }
    constraintName(existingName) {
        const suffix = '_replaced';
        // CockroachDB does not allow for dropping/creating constraints with the same
        // name in a single transaction. reference issue #14873
        if (existingName.endsWith(suffix)) {
            return existingName.substring(0, existingName.length - suffix.length);
        }
        else {
            return existingName + suffix;
        }
    }
    async getDatabaseSize() {
        try {
            const result = await this.knex
                .select(this.knex.raw('round(SUM(range_size_mb) * 1024 * 1024, 0) AS size'))
                .from(this.knex.raw('[SHOW RANGES FROM database ??]', [env['DB_DATABASE']]));
            return result[0]?.['size'] ? Number(result[0]?.['size']) : null;
        }
        catch {
            return null;
        }
    }
    prepQueryParams(queryParams) {
        return prepQueryParams(queryParams, { format: (index) => `$${index + 1}` });
    }
    addInnerSortFieldsToGroupBy(groupByFields, sortRecords, hasRelationalSort) {
        if (hasRelationalSort) {
            /*
            Cockroach allows aliases to be used in the GROUP BY clause and only needs columns in the GROUP BY clause that
            are not functionally dependent on the primary key.

            > You can group columns by an alias (i.e., a label assigned to the column with an AS clause) rather than the column name.

            > If aggregate groups are created on a full primary key, any column in the table can be selected as a target_elem,
              or specified in a HAVING clause.

            https://www.cockroachlabs.com/docs/stable/select-clause#parameters
             */
            groupByFields.push(...sortRecords.map(({ alias }) => alias));
        }
    }
}
