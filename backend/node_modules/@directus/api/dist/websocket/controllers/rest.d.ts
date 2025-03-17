import type { Server as httpServer } from 'http';
import { WebSocketMessage } from '../messages.js';
import SocketController from './base.js';
export declare class WebSocketController extends SocketController {
    constructor(httpServer: httpServer);
    private bindEvents;
    protected parseMessage(data: string): WebSocketMessage;
}
