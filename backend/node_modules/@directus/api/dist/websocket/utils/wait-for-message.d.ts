import type { WebSocket } from 'ws';
import { WebSocketMessage } from '../messages.js';
export declare const waitForAnyMessage: (client: WebSocket, timeout: number) => Promise<Record<string, any>>;
export declare const waitForMessageType: (client: WebSocket, type: string, timeout: number) => Promise<WebSocketMessage>;
