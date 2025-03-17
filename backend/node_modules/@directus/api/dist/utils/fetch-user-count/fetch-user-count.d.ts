import { type FetchAccessLookupOptions } from './fetch-access-lookup.js';
export type FetchUserCountOptions = FetchAccessLookupOptions;
export interface UserCount {
    admin: number;
    app: number;
    api: number;
}
/**
 * Returns counts of all active users in the system grouped by admin, app, and api access
 */
export declare function fetchUserCount(options: FetchUserCountOptions): Promise<UserCount>;
