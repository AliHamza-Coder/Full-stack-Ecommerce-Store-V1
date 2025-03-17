import type { PromiseCallback } from '@directus/types';
import type { Reference } from 'isolated-vm';
export declare function registerActionGenerator(): {
    register: (event: Reference<string>, cb: Reference<(payload: unknown) => void | Promise<void>>) => void;
    unregisterFunctions: PromiseCallback[];
};
