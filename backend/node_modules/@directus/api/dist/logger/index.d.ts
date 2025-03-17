import type { RequestHandler } from 'express';
import { type Logger } from 'pino';
import { LogsStream } from './logs-stream.js';
export declare const _cache: {
    logger: Logger<never> | undefined;
    logsStream: LogsStream | undefined;
    httpLogsStream: LogsStream | undefined;
};
export declare const useLogger: () => Logger<never>;
export declare const getLogsStream: (pretty: boolean) => LogsStream;
export declare const getHttpLogsStream: (pretty: boolean) => LogsStream;
export declare const getLoggerLevelValue: (level: string) => number;
export declare const createLogger: () => Logger<never, boolean>;
export declare const createExpressLogger: () => RequestHandler;
