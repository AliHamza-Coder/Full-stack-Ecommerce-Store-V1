import type { DirectusError } from '@directus/errors';
import type { WebSocket } from 'ws';
import { ZodError } from 'zod';
import type { WebSocketResponse } from './messages.js';
import type { WebSocketClient } from './types.js';
export declare class WebSocketError extends Error {
    type: string;
    code: string;
    uid: string | number | undefined;
    constructor(type: string, code: string, message: string, uid?: string | number);
    toJSON(): WebSocketResponse;
    toMessage(): string;
    static fromError(error: DirectusError<unknown>, type?: string): WebSocketError;
    static fromZodError(error: ZodError, type?: string): WebSocketError;
}
export declare function handleWebSocketError(client: WebSocketClient | WebSocket, error: unknown, type?: string): void;
