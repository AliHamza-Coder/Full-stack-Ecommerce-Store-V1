import type { Server } from 'graphql-ws';
import type { Server as httpServer } from 'http';
import type { GraphQLSocket, UpgradeContext, WebSocketClient } from '../types.js';
import SocketController from './base.js';
export declare class GraphQLSubscriptionController extends SocketController {
    gql: Server<GraphQLSocket>;
    constructor(httpServer: httpServer);
    private bindEvents;
    setTokenExpireTimer(client: WebSocketClient): void;
    protected handleHandshakeUpgrade({ request, socket, head }: UpgradeContext): Promise<void>;
}
