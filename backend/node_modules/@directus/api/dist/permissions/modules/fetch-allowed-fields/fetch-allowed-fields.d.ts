import type { Accountability, PermissionsAction } from '@directus/types';
import type { Context } from '../../types.js';
export interface FetchAllowedFieldsOptions {
    collection: string;
    action: PermissionsAction;
    accountability: Pick<Accountability, 'user' | 'role' | 'roles' | 'ip' | 'app'>;
}
/**
 * Look up all fields that are allowed to be used for the given collection and action for the given
 * accountability object
 *
 * Done by looking up all available policies for the current accountability object, and reading all
 * permissions that exist for the collection+action+policy combination
 */
export declare function fetchAllowedFields({ accountability, action, collection }: FetchAllowedFieldsOptions, { knex, schema }: Context): Promise<string[]>;
