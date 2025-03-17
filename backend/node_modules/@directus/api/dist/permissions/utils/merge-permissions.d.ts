import type { Permission } from '@directus/types';
/**
 * Merges multiple permission lists into a flat list of unique permissions.
 * @param strategy `and` or `or` deduplicate permissions while `intersection` makes sure only common permissions across all lists are kept and overlapping permissions are merged through `and`.
 * @param permissions List of permission lists to merge.
 * @returns A flat list of unique permissions.
 */
export declare function mergePermissions(strategy: 'and' | 'or' | 'intersection', ...permissions: Permission[][]): Permission[];
export declare function mergePermission(strategy: 'and' | 'or', currentPerm: Permission, newPerm: Permission): Omit<Permission, 'id' | 'system'>;
