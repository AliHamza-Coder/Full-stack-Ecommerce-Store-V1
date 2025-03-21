import { WebSocketItemsMessage } from '../messages.js';
import type { WebSocketClient } from '../types.js';
export declare class ItemsHandler {
    constructor();
    onMessage(client: WebSocketClient, message: WebSocketItemsMessage): Promise<void>;
}
