import { type FetchUserCountOptions } from '../../../utils/fetch-user-count/fetch-user-count.js';
import type { Context } from '../../types.js';
export type ValidateRemainingAdminUsersOptions = Pick<FetchUserCountOptions, 'excludeAccessRows' | 'excludePolicies' | 'excludeUsers' | 'excludeRoles'>;
export declare function validateRemainingAdminUsers(options: ValidateRemainingAdminUsersOptions, context: Context): Promise<void>;
