import type { PromiseCallback } from '@directus/types';
import type { Reference } from 'isolated-vm';
export declare function registerOperationGenerator(): {
    register: (id: Reference<string>, cb: Reference<(options: Record<string, unknown>) => unknown | Promise<unknown> | void>) => void;
    unregisterFunctions: PromiseCallback[];
};
