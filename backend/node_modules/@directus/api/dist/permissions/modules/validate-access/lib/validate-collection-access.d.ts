import type { Accountability, PermissionsAction } from '@directus/types';
import type { Context } from '../../../types.js';
export interface ValidateCollectionAccessOptions {
    accountability: Accountability;
    action: PermissionsAction;
    collection: string;
}
/**
 * Check if you have (limited) access to a given collection by making sure there's at least 1
 * permission rule available for the collection and action combo
 */
export declare function validateCollectionAccess(options: ValidateCollectionAccessOptions, context: Context): Promise<boolean>;
