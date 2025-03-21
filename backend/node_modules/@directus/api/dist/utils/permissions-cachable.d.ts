import type { Accountability, Filter } from '@directus/types';
import type { Context } from '../permissions/types.js';
/**
 * Check if the read permissions for a collection contain the dynamic variable $NOW.
 * If they do, the permissions are not cachable.
 */
export declare function permissionsCachable(collection: string | undefined, context: Context, accountability?: Accountability): Promise<boolean>;
export declare function filter_has_now(filter: Filter): boolean;
