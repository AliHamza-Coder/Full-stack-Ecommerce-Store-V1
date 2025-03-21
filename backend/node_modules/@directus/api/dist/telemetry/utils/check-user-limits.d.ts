import { type UserCount } from '../../utils/fetch-user-count/fetch-user-count.js';
/**
 * Ensure that user limits are not reached
 */
export declare function checkUserLimits(userCounts: UserCount): Promise<void>;
