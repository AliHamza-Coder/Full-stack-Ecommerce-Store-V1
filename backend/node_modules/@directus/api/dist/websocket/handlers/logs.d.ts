import type { Bus } from '@directus/memory';
import { LogsController } from '../controllers/index.js';
import { WebSocketLogsMessage } from '../messages.js';
import type { LogsSubscription, WebSocketClient } from '../types.js';
export declare class LogsHandler {
    controller: LogsController;
    messenger: Bus;
    availableLogLevels: string[];
    logLevelValueMap: Record<string, string>;
    subscriptions: LogsSubscription;
    constructor(controller?: LogsController);
    /**
     * Hook into websocket client lifecycle events
     */
    bindWebSocket(): void;
    /**
     * Register a logs subscription
     * @param logLevel
     * @param client
     */
    subscribe(logLevel: string, client: WebSocketClient): void;
    /**
     * Remove a logs subscription
     * @param client WebSocketClient
     */
    unsubscribe(client: WebSocketClient): void;
    /**
     * Handle incoming (un)subscribe requests
     */
    onMessage(client: WebSocketClient, message: WebSocketLogsMessage): Promise<void>;
}
