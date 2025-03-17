import { parseJSON } from '@directus/utils';
import emitter from '../../emitter.js';
import { useLogger } from '../../logger/index.js';
import { getAddress } from '../../utils/get-address.js';
import { WebSocketError, handleWebSocketError } from '../errors.js';
import { WebSocketMessage } from '../messages.js';
import SocketController from './base.js';
import { registerWebSocketEvents } from './hooks.js';
const logger = useLogger();
export class WebSocketController extends SocketController {
    constructor(httpServer) {
        super(httpServer, 'WEBSOCKETS_REST');
        registerWebSocketEvents();
        this.server.on('connection', (ws, auth) => {
            this.bindEvents(this.createClient(ws, auth));
        });
        logger.info(`WebSocket Server started at ${getAddress(httpServer)}${this.endpoint}`);
    }
    bindEvents(client) {
        client.on('parsed-message', async (message) => {
            try {
                message = WebSocketMessage.parse(await emitter.emitFilter('websocket.message', message, { client }));
                emitter.emitAction('websocket.message', { message, client });
            }
            catch (error) {
                handleWebSocketError(client, error, 'server');
                return;
            }
        });
        client.on('error', (event) => {
            emitter.emitAction('websocket.error', { client, event });
        });
        client.on('close', (event) => {
            emitter.emitAction('websocket.close', { client, event });
        });
        emitter.emitAction('websocket.connect', { client });
    }
    parseMessage(data) {
        let message;
        try {
            message = parseJSON(data);
        }
        catch {
            throw new WebSocketError('server', 'INVALID_PAYLOAD', 'Unable to parse the incoming message.');
        }
        return message;
    }
}
