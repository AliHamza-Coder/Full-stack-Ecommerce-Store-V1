import type { Reference } from 'isolated-vm';
type Args<T> = T extends (...args: infer Args) => unknown ? Args : any[];
type Result<T> = T extends (...args: any) => infer Result ? Result : unknown;
export declare function callReference<T extends (...args: any[]) => unknown | Promise<unknown>>(fn: Reference<T>, args: Args<T>): Promise<Reference<Result<T>>>;
export {};
