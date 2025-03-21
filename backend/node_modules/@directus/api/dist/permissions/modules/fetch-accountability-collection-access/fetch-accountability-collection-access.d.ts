import type { Accountability, CollectionAccess } from '@directus/types';
import type { Context } from '../../types.js';
/**
 * Get all permissions + minimal app permissions (if applicable) for the user + role in the current accountability.
 * The permissions will be filtered by IP access.
 */
export declare function fetchAccountabilityCollectionAccess(accountability: Pick<Accountability, 'user' | 'roles' | 'role' | 'ip' | 'admin' | 'app'>, context: Context): Promise<CollectionAccess>;
