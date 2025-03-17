import type { ActionHandler, EventContext, FilterHandler, InitHandler } from '@directus/types';
export declare class Emitter {
    private filterEmitter;
    private actionEmitter;
    private initEmitter;
    constructor();
    private getDefaultContext;
    emitFilter<T>(event: string | string[], payload: T, meta: Record<string, any>, context?: EventContext | null): Promise<T>;
    emitAction(event: string | string[], meta: Record<string, any>, context?: EventContext | null): void;
    emitInit(event: string, meta: Record<string, any>): Promise<void>;
    onFilter<T = unknown>(event: string, handler: FilterHandler<T>): void;
    onAction(event: string, handler: ActionHandler): void;
    onInit(event: string, handler: InitHandler): void;
    offFilter<T = unknown>(event: string, handler: FilterHandler<T>): void;
    offAction(event: string, handler: ActionHandler): void;
    offInit(event: string, handler: InitHandler): void;
    offAll(): void;
}
declare const emitter: Emitter;
export declare const useEmitter: () => Emitter;
export default emitter;
