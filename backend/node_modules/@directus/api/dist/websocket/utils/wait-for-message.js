import { parseJSON } from '@directus/utils';
import { WebSocketMessage } from '../messages.js';
import { getMessageType } from './message.js';
export const waitForAnyMessage = (client, timeout) => {
    return new Promise((resolve, reject) => {
        client.on('message', awaitMessage);
        const timer = setTimeout(() => {
            client.off('message', awaitMessage);
            reject();
        }, timeout);
        function awaitMessage(event) {
            try {
                clearTimeout(timer);
                client.off('message', awaitMessage);
                resolve(parseJSON(event.toString()));
            }
            catch (err) {
                reject(err);
            }
        }
    });
};
export const waitForMessageType = (client, type, timeout) => {
    return new Promise((resolve, reject) => {
        client.on('message', awaitMessage);
        const timer = setTimeout(() => {
            client.off('message', awaitMessage);
            reject();
        }, timeout);
        function awaitMessage(event) {
            let msg;
            try {
                msg = WebSocketMessage.parse(parseJSON(event.toString()));
            }
            catch {
                return;
            }
            if (getMessageType(msg) === type) {
                clearTimeout(timer);
                client.off('message', awaitMessage);
                resolve(msg);
            }
        }
    });
};
