import type { Filter, Permission } from '@directus/types';
export declare function getCases(collection: string, permissions: Permission[], requestedKeys: string[]): {
    cases: Filter[];
    caseMap: Record<string, number[]>;
    allowedFields: Set<string>;
};
