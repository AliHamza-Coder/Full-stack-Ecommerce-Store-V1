import type { Accountability, Permission, Query } from '@directus/types';
export declare function withAppMinimalPermissions(accountability: Pick<Accountability, 'app'> | null, permissions: Permission[], filter: Query['filter']): Permission[];
