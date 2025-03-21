import type { Server as httpServer } from 'http';
import { AuthMode } from '../messages.js';
import SocketController from './base.js';
import type { Accountability } from '@directus/types';
export declare class LogsController extends SocketController {
    constructor(httpServer: httpServer);
    getEnvironmentConfig(configPrefix: string): {
        endpoint: string;
        maxConnections: number;
        authentication: {
            mode: AuthMode;
            timeout: number;
        };
    };
    private bindEvents;
    protected checkUserRequirements(accountability: Accountability | null): void;
}
