import { useEnv } from '@directus/env';
import emitter from '../../emitter.js';
import { useLogger } from '../../logger/index.js';
import { handleWebSocketError, WebSocketError } from '../errors.js';
import { AuthMode, WebSocketMessage } from '../messages.js';
import SocketController from './base.js';
const logger = useLogger();
export class LogsController extends SocketController {
    constructor(httpServer) {
        super(httpServer, 'WEBSOCKETS_LOGS');
        const env = useEnv();
        this.server.on('connection', (ws, auth) => {
            this.bindEvents(this.createClient(ws, auth));
        });
        logger.info(`Logs WebSocket Server started at ws://${env['HOST']}:${env['PORT']}${this.endpoint}`);
    }
    getEnvironmentConfig(configPrefix) {
        const env = useEnv();
        const endpoint = String(env[`${configPrefix}_PATH`]);
        const maxConnections = `${configPrefix}_CONN_LIMIT` in env ? Number(env[`${configPrefix}_CONN_LIMIT`]) : Number.POSITIVE_INFINITY;
        return {
            endpoint,
            maxConnections,
            authentication: {
                mode: 'strict',
                timeout: 0,
            },
        };
    }
    bindEvents(client) {
        client.on('parsed-message', async (message) => {
            try {
                emitter.emitAction('websocket.logs', { message, client });
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
    checkUserRequirements(accountability) {
        // enforce admin only access for the logs streaming websocket
        if (!accountability?.admin) {
            throw new WebSocketError('auth', 'AUTH_FAILED', 'Unauthorized access.');
        }
    }
}
