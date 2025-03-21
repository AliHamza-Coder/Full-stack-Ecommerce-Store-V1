import { WebSocketController } from '../controllers/index.js';
import { WebSocketMessage } from '../messages.js';
import type { WebSocketClient } from '../types.js';
export declare class HeartbeatHandler {
    private pulse;
    private controller;
    constructor(controller?: WebSocketController);
    private checkClients;
    onMessage(client: WebSocketClient, message: WebSocketMessage): void;
    pingClients(): void;
}
