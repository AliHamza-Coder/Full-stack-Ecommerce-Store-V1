import { toBoolean, toArray } from '@directus/utils';
import { ipInNetworks } from '../../../../utils/ip-in-networks.js';
export async function fetchGlobalAccessForQuery(query, accountability) {
    const globalAccess = {
        app: false,
        admin: false,
    };
    const accessRows = await query
        .select('directus_policies.admin_access', 'directus_policies.app_access', 'directus_policies.ip_access')
        .from('directus_access')
        // @NOTE: `where` clause comes from the caller
        .leftJoin('directus_policies', 'directus_policies.id', 'directus_access.policy');
    // Additively merge access permissions
    for (const { admin_access, app_access, ip_access } of accessRows) {
        if (accountability.ip && ip_access) {
            // Skip row if IP is not in the allowed networks
            const networks = toArray(ip_access);
            if (!ipInNetworks(accountability.ip, networks))
                continue;
        }
        globalAccess.admin ||= toBoolean(admin_access);
        globalAccess.app ||= globalAccess.admin || toBoolean(app_access);
        if (globalAccess.admin)
            break;
    }
    return globalAccess;
}
