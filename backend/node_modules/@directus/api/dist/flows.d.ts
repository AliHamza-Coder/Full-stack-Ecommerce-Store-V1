import type { OperationHandler } from '@directus/extensions';
export declare function getFlowManager(): FlowManager;
declare class FlowManager {
    private isLoaded;
    private operations;
    private triggerHandlers;
    private operationFlowHandlers;
    private webhookFlowHandlers;
    private reloadQueue;
    private envs;
    constructor();
    initialize(): Promise<void>;
    reload(): Promise<void>;
    addOperation(id: string, operation: OperationHandler): void;
    removeOperation(id: string): void;
    runOperationFlow(id: string, data: unknown, context: Record<string, unknown>): Promise<unknown>;
    runWebhookFlow(id: string, data: unknown, context: Record<string, unknown>): Promise<{
        result: unknown;
        cacheEnabled?: boolean;
    }>;
    private load;
    private unload;
    private executeFlow;
    private executeOperation;
}
export {};
