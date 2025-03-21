import { getDefaultIndexName } from '../../../../utils/get-default-index-name.js';
import { SchemaHelper } from '../types.js';
export class SchemaHelperSQLite extends SchemaHelper {
    generateIndexName(type, collection, fields) {
        return getDefaultIndexName(type, collection, fields, { maxLength: Infinity });
    }
    async preColumnChange() {
        const foreignCheckStatus = (await this.knex.raw('PRAGMA foreign_keys'))[0].foreign_keys === 1;
        if (foreignCheckStatus) {
            await this.knex.raw('PRAGMA foreign_keys = OFF');
        }
        return foreignCheckStatus;
    }
    async postColumnChange() {
        await this.knex.raw('PRAGMA foreign_keys = ON');
    }
    async getDatabaseSize() {
        try {
            const result = await this.knex.raw('SELECT page_count * page_size as "size" FROM pragma_page_count(), pragma_page_size();');
            return result[0]?.['size'] ? Number(result[0]?.['size']) : null;
        }
        catch {
            return null;
        }
    }
    addInnerSortFieldsToGroupBy() {
        // SQLite does not need any special handling for inner query sort columns
    }
}
