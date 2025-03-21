import { isDirectusError } from '@directus/errors';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { useLogger } from '../logger/index.js';
export class WebSocketError extends Error {
    type;
    code;
    uid;
    constructor(type, code, message, uid) {
        super(message);
        this.type = type;
        this.code = code;
        this.uid = uid;
    }
    toJSON() {
        const message = {
            type: this.type,
            status: 'error',
            error: {
                code: this.code,
                message: this.message,
            },
        };
        if (this.uid !== undefined) {
            message.uid = this.uid;
        }
        return message;
    }
    toMessage() {
        return JSON.stringify(this.toJSON());
    }
    static fromError(error, type = 'unknown') {
        return new WebSocketError(type, error.code, error.message);
    }
    static fromZodError(error, type = 'unknown') {
        const zError = fromZodError(error);
        return new WebSocketError(type, 'INVALID_PAYLOAD', zError.message);
    }
}
export function handleWebSocketError(client, error, type) {
    const logger = useLogger();
    if (isDirectusError(error)) {
        client.send(WebSocketError.fromError(error, type).toMessage());
        return;
    }
    if (error instanceof WebSocketError) {
        client.send(error.toMessage());
        return;
    }
    if (error instanceof ZodError) {
        client.send(WebSocketError.fromZodError(error, type).toMessage());
        return;
    }
    // unhandled exceptions
    logger.error(`WebSocket unhandled exception ${JSON.stringify({ type, error })}`);
}
