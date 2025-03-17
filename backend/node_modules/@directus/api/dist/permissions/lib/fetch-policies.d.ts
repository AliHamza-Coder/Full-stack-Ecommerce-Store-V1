import type { Accountability } from '@directus/types';
import type { Context } from '../types.js';
export interface AccessRow {
    policy: {
        id: string;
        ip_access: string[] | null;
    };
    role: string | null;
}
export declare const fetchPolicies: typeof _fetchPolicies;
/**
 * Fetch the policies associated with the current user accountability
 */
export declare function _fetchPolicies({ roles, user, ip }: Pick<Accountability, 'user' | 'roles' | 'ip'>, context: Context): Promise<string[]>;
