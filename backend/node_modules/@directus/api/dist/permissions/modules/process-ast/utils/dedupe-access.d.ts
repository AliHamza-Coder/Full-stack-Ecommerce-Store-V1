import type { Filter, Permission } from '@directus/types';
/**
 * Deduplicate the permissions sets by merging the field sets based on the access control rules
 * (`permissions` in Permission rows)
 *
 * This allows the cases injection to be more efficient by not having to generate duplicate
 * case/when clauses for permission sets where the rule access is identical
 */
export declare function dedupeAccess(permissions: Permission[]): {
    rule: Filter;
    fields: Set<string>;
}[];
