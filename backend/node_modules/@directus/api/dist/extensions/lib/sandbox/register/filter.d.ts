import type { PromiseCallback } from '@directus/types';
import type { Reference } from 'isolated-vm';
export declare function registerFilterGenerator(): {
    register: (event: Reference<string>, cb: Reference<(payload: unknown) => unknown | Promise<unknown>>) => void;
    unregisterFunctions: PromiseCallback[];
};
