import type { Accountability, PermissionsAction, PrimaryKey } from '@directus/types';
import type { Context } from '../../../types.js';
export interface ValidateItemAccessOptions {
    accountability: Accountability;
    action: PermissionsAction;
    collection: string;
    primaryKeys: PrimaryKey[];
    fields?: string[];
}
export declare function validateItemAccess(options: ValidateItemAccessOptions, context: Context): Promise<any>;
