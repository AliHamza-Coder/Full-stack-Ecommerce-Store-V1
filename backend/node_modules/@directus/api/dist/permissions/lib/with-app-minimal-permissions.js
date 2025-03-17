import { appAccessMinimalPermissions } from '@directus/system-data';
import { cloneDeep } from 'lodash-es';
import { filterItems } from '../../utils/filter-items.js';
export function withAppMinimalPermissions(accountability, permissions, filter) {
    if (accountability?.app === true) {
        const filteredAppMinimalPermissions = cloneDeep(filterItems(appAccessMinimalPermissions, filter));
        return [...permissions, ...filteredAppMinimalPermissions];
    }
    return permissions;
}
