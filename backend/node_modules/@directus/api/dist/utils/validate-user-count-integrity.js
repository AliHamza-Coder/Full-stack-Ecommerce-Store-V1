import { validateRemainingAdminCount } from '../permissions/modules/validate-remaining-admin/validate-remaining-admin-count.js';
import { checkUserLimits } from '../telemetry/utils/check-user-limits.js';
import { shouldCheckUserLimits } from '../telemetry/utils/should-check-user-limits.js';
import { fetchUserCount } from './fetch-user-count/fetch-user-count.js';
export var UserIntegrityCheckFlag;
(function (UserIntegrityCheckFlag) {
    UserIntegrityCheckFlag[UserIntegrityCheckFlag["None"] = 0] = "None";
    /** Check if the number of remaining admin users is greater than 0 */
    UserIntegrityCheckFlag[UserIntegrityCheckFlag["RemainingAdmins"] = 1] = "RemainingAdmins";
    /** Check if the number of users is within the limits */
    UserIntegrityCheckFlag[UserIntegrityCheckFlag["UserLimits"] = 2] = "UserLimits";
    UserIntegrityCheckFlag[UserIntegrityCheckFlag["All"] = 3] = "All";
})(UserIntegrityCheckFlag || (UserIntegrityCheckFlag = {}));
export async function validateUserCountIntegrity(options) {
    const validateUserLimits = (options.flags & UserIntegrityCheckFlag.UserLimits) !== 0;
    const validateRemainingAdminUsers = (options.flags & UserIntegrityCheckFlag.RemainingAdmins) !== 0;
    const limitCheck = validateUserLimits && shouldCheckUserLimits();
    if (!validateRemainingAdminUsers && !limitCheck) {
        return;
    }
    const adminOnly = validateRemainingAdminUsers && !limitCheck;
    const userCounts = await fetchUserCount({ ...options, adminOnly });
    if (limitCheck) {
        await checkUserLimits(userCounts);
    }
    if (validateRemainingAdminUsers) {
        validateRemainingAdminCount(userCounts.admin);
    }
}
