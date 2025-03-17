import { type FetchUserCountOptions } from './fetch-user-count/fetch-user-count.js';
export declare enum UserIntegrityCheckFlag {
    None = 0,
    /** Check if the number of remaining admin users is greater than 0 */
    RemainingAdmins = 1,
    /** Check if the number of users is within the limits */
    UserLimits = 2,
    All = 3
}
export interface ValidateUserCountIntegrityOptions extends Omit<FetchUserCountOptions, 'adminOnly'> {
    flags: UserIntegrityCheckFlag;
}
export declare function validateUserCountIntegrity(options: ValidateUserCountIntegrityOptions): Promise<void>;
