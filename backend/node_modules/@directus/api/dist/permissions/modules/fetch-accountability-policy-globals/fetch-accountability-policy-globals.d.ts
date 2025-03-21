import type { Accountability, Globals } from '@directus/types';
import type { Context } from '../../types.js';
export declare function fetchAccountabilityPolicyGlobals(accountability: Pick<Accountability, 'user' | 'roles' | 'ip' | 'admin' | 'app'>, context: Context): Promise<Globals>;
