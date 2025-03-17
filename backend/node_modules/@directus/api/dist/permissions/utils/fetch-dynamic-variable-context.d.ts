import type { Accountability, Permission } from '@directus/types';
import type { Context } from '../types.js';
export interface FetchDynamicVariableContext {
    accountability: Pick<Accountability, 'user' | 'role' | 'roles'>;
    policies: string[];
    permissions: Permission[];
}
export declare function fetchDynamicVariableContext(options: FetchDynamicVariableContext, context: Context): Promise<Record<string, any>>;
