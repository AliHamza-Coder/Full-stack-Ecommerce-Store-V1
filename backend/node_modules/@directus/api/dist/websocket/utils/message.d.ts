import type { WebSocketClient } from '../types.js';
export declare const fmtMessage: (type: string, data?: Record<string, any>, uid?: string | number) => string;
export declare const safeSend: (client: WebSocketClient, data: string, delay?: number) => Promise<unknown>;
export declare const getMessageType: (message: any) => string;
