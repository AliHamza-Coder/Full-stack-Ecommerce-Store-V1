import { useEnv } from '@directus/env';
import { ServiceUnavailableError } from '@directus/errors';
import { toBoolean } from '@directus/utils';
import emitter from '../../emitter.js';
import { WebSocketController, getWebSocketController } from '../controllers/index.js';
import { WebSocketMessage } from '../messages.js';
import { fmtMessage, getMessageType } from '../utils/message.js';
const env = useEnv();
const HEARTBEAT_FREQUENCY = Number(env['WEBSOCKETS_HEARTBEAT_PERIOD']) * 1000;
export class HeartbeatHandler {
    pulse;
    controller;
    constructor(controller) {
        controller = controller ?? getWebSocketController();
        if (!controller) {
            throw new ServiceUnavailableError({ service: 'ws', reason: 'WebSocket server is not initialized' });
        }
        this.controller = controller;
        emitter.onAction('websocket.message', ({ client, message }) => {
            try {
                this.onMessage(client, WebSocketMessage.parse(message));
            }
            catch {
                /* ignore errors */
            }
        });
        if (toBoolean(env['WEBSOCKETS_HEARTBEAT_ENABLED']) === true) {
            emitter.onAction('websocket.connect', () => this.checkClients());
            emitter.onAction('websocket.error', () => this.checkClients());
            emitter.onAction('websocket.close', () => this.checkClients());
        }
    }
    checkClients() {
        const hasClients = this.controller.clients.size > 0;
        if (hasClients && !this.pulse) {
            this.pulse = setInterval(() => {
                this.pingClients();
            }, HEARTBEAT_FREQUENCY);
        }
        if (!hasClients && this.pulse) {
            clearInterval(this.pulse);
            this.pulse = undefined;
        }
    }
    onMessage(client, message) {
        if (getMessageType(message) !== 'ping')
            return;
        // send pong message back as acknowledgement
        const data = 'uid' in message ? { uid: message.uid } : {};
        client.send(fmtMessage('pong', data));
    }
    pingClients() {
        const pendingClients = new Set(this.controller.clients);
        const activeClients = new Set();
        const timeout = setTimeout(() => {
            // close connections that haven't responded
            for (const client of pendingClients) {
                client.close();
            }
        }, HEARTBEAT_FREQUENCY);
        const messageWatcher = ({ client }) => {
            // any message means this connection is still open
            if (!activeClients.has(client)) {
                pendingClients.delete(client);
                activeClients.add(client);
            }
            if (pendingClients.size === 0) {
                clearTimeout(timeout);
                emitter.offAction('websocket.message', messageWatcher);
            }
        };
        emitter.onAction('websocket.message', messageWatcher);
        // ping all the clients
        for (const client of pendingClients) {
            client.send(fmtMessage('ping'));
        }
    }
}
