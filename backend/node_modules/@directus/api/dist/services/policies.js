import { InvalidPayloadError } from '@directus/errors';
import { getMatch } from 'ip-matching';
import { clearSystemCache } from '../cache.js';
import { clearCache as clearPermissionsCache } from '../permissions/cache.js';
import { UserIntegrityCheckFlag } from '../utils/validate-user-count-integrity.js';
import { ItemsService } from './items.js';
export class PoliciesService extends ItemsService {
    constructor(options) {
        super('directus_policies', options);
    }
    async clearCaches(opts) {
        await clearSystemCache({ autoPurgeCache: opts?.autoPurgeCache });
        if (this.cache && opts?.autoPurgeCache !== false) {
            await this.cache.clear();
        }
    }
    isIpAccessValid(value) {
        if (value === undefined)
            return false;
        if (value === null)
            return true;
        if (Array.isArray(value) && value.length === 0)
            return true;
        for (const ip of value) {
            if (typeof ip !== 'string' || ip.includes('*'))
                return false;
            try {
                const match = getMatch(ip);
                if (match.type == 'IPMask')
                    return false;
            }
            catch {
                return false;
            }
        }
        return true;
    }
    assertValidIpAccess(partialItem) {
        if ('ip_access' in partialItem && !this.isIpAccessValid(partialItem['ip_access'])) {
            throw new InvalidPayloadError({
                reason: 'IP Access contains an incorrect value. Valid values are: IP addresses, IP ranges and CIDR blocks',
            });
        }
    }
    async createOne(data, opts = {}) {
        this.assertValidIpAccess(data);
        // A policy has been created, but the attachment to a user/role happens in the AccessService,
        // so no need to check user integrity
        const result = await super.createOne(data, opts);
        // TODO is this necessary? Since the attachment should be handled in the AccessService
        // A new policy has created, clear the permissions cache
        await clearPermissionsCache();
        return result;
    }
    async updateMany(keys, data, opts = {}) {
        this.assertValidIpAccess(data);
        if ('admin_access' in data) {
            let flags = UserIntegrityCheckFlag.RemainingAdmins;
            if (data['admin_access'] === true) {
                // Only need to perform a full user count if the policy allows admin access
                flags |= UserIntegrityCheckFlag.All;
            }
            opts.userIntegrityCheckFlags = (opts.userIntegrityCheckFlags ?? UserIntegrityCheckFlag.None) | flags;
        }
        if ('app_access' in data) {
            opts.userIntegrityCheckFlags =
                (opts.userIntegrityCheckFlags ?? UserIntegrityCheckFlag.None) | UserIntegrityCheckFlag.UserLimits;
        }
        if (opts.userIntegrityCheckFlags)
            opts.onRequireUserIntegrityCheck?.(opts.userIntegrityCheckFlags);
        const result = await super.updateMany(keys, data, opts);
        if ('admin_access' in data || 'app_access' in data || 'ip_access' in data || 'enforce_tfa' in data) {
            // Some relevant properties on policies have been updated, clear the caches
            await this.clearCaches(opts);
        }
        return result;
    }
    async deleteMany(keys, opts = {}) {
        opts.userIntegrityCheckFlags = UserIntegrityCheckFlag.All;
        opts.onRequireUserIntegrityCheck?.(opts.userIntegrityCheckFlags);
        const result = await super.deleteMany(keys, opts);
        // TODO is this necessary? Since the detachment should be handled in the AccessService
        // Some policies have been deleted, clear the permissions cache
        await this.clearCaches(opts);
        return result;
    }
}
