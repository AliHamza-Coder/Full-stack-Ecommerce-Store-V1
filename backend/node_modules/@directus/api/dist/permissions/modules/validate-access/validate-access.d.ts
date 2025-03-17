import type { Accountability, PermissionsAction, PrimaryKey } from '@directus/types';
import type { Context } from '../../types.js';
export interface ValidateAccessOptions {
    accountability: Accountability;
    action: PermissionsAction;
    collection: string;
    primaryKeys?: PrimaryKey[];
    fields?: string[];
    skipCollectionExistsCheck?: boolean;
}
/**
 * Validate if the current user has access to perform action against the given collection and
 * optional primary keys. This is done by reading the item from the database using the access
 * control rules and checking if we got the expected result back
 */
export declare function validateAccess(options: ValidateAccessOptions, context: Context): Promise<void>;
