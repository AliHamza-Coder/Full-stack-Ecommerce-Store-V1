import { useEnv } from '@directus/env';
import { toBoolean } from '@directus/utils';
import { getNodeEnv } from '@directus/utils/node';
import { createTerminus } from '@godaddy/terminus';
import * as http from 'http';
import * as https from 'https';
import { once } from 'lodash-es';
import qs from 'qs';
import url from 'url';
import createApp from './app.js';
import getDatabase from './database/index.js';
import emitter from './emitter.js';
import { useLogger } from './logger/index.js';
import { getConfigFromEnv } from './utils/get-config-from-env.js';
import { getIPFromReq } from './utils/get-ip-from-req.js';
import { getAddress } from './utils/get-address.js';
import { createLogsController, createSubscriptionController, createWebSocketController, getLogsController, getSubscriptionController, getWebSocketController, } from './websocket/controllers/index.js';
import { startWebSocketHandlers } from './websocket/handlers/index.js';
export let SERVER_ONLINE = true;
const env = useEnv();
const logger = useLogger();
export async function createServer() {
    const server = http.createServer(await createApp());
    Object.assign(server, getConfigFromEnv('SERVER_'));
    server.on('request', function (req, res) {
        const startTime = process.hrtime();
        const complete = once(function (finished) {
            const elapsedTime = process.hrtime(startTime);
            const elapsedNanoseconds = elapsedTime[0] * 1e9 + elapsedTime[1];
            const elapsedMilliseconds = elapsedNanoseconds / 1e6;
            const previousIn = req.socket._metrics?.in || 0;
            const previousOut = req.socket._metrics?.out || 0;
            const metrics = {
                in: req.socket.bytesRead - previousIn,
                out: req.socket.bytesWritten - previousOut,
            };
            req.socket._metrics = {
                in: req.socket.bytesRead,
                out: req.socket.bytesWritten,
            };
            // Compatibility when supporting serving with certificates
            const protocol = server instanceof https.Server ? 'https' : 'http';
            // Rely on url.parse for path extraction
            // Doesn't break on illegal URLs
            const urlInfo = url.parse(req.originalUrl || req.url);
            const info = {
                finished,
                request: {
                    aborted: req.aborted,
                    completed: req.complete,
                    method: req.method,
                    url: urlInfo.href,
                    path: urlInfo.pathname,
                    protocol,
                    host: req.headers.host,
                    size: metrics.in,
                    query: urlInfo.query ? qs.parse(urlInfo.query) : {},
                    headers: req.headers,
                },
                response: {
                    status: res.statusCode,
                    size: metrics.out,
                    headers: res.getHeaders(),
                },
                ip: getIPFromReq(req),
                duration: elapsedMilliseconds.toFixed(),
            };
            emitter.emitAction('response', info, {
                database: getDatabase(),
                schema: req.schema,
                accountability: req.accountability ?? null,
            });
        });
        res.once('finish', complete.bind(null, true));
        res.once('close', complete.bind(null, false));
    });
    if (toBoolean(env['WEBSOCKETS_ENABLED']) === true) {
        createSubscriptionController(server);
        createWebSocketController(server);
        createLogsController(server);
        startWebSocketHandlers();
    }
    const terminusOptions = {
        timeout: env['SERVER_SHUTDOWN_TIMEOUT'] >= 0 && env['SERVER_SHUTDOWN_TIMEOUT'] < Infinity
            ? env['SERVER_SHUTDOWN_TIMEOUT']
            : 1000,
        signals: ['SIGINT', 'SIGTERM', 'SIGHUP'],
        beforeShutdown,
        onSignal,
        onShutdown,
    };
    createTerminus(server, terminusOptions);
    return server;
    async function beforeShutdown() {
        if (getNodeEnv() !== 'development') {
            logger.info('Shutting down...');
        }
        SERVER_ONLINE = false;
    }
    async function onSignal() {
        getSubscriptionController()?.terminate();
        getWebSocketController()?.terminate();
        getLogsController()?.terminate();
        const database = getDatabase();
        await database.destroy();
        logger.info('Database connections destroyed');
    }
    async function onShutdown() {
        emitter.emitAction('server.stop', { server }, {
            database: getDatabase(),
            schema: null,
            accountability: null,
        });
        if (getNodeEnv() !== 'development') {
            logger.info('Directus shut down OK. Bye bye!');
        }
    }
}
export async function startServer() {
    const server = await createServer();
    const host = env['HOST'];
    const path = env['UNIX_SOCKET_PATH'];
    const port = env['PORT'];
    let listenOptions;
    if (path) {
        listenOptions = { path };
    }
    else {
        listenOptions = {
            host,
            port: parseInt(port),
        };
    }
    server
        .listen(listenOptions, () => {
        const protocol = server instanceof https.Server ? 'https' : 'http';
        logger.info(`Server started at ${listenOptions.port ? `${protocol}://${getAddress(server)}` : getAddress(server)}`);
        process.send?.('ready');
        emitter.emitAction('server.start', { server }, {
            database: getDatabase(),
            schema: null,
            accountability: null,
        });
    })
        .once('error', (err) => {
        if (err?.code === 'EADDRINUSE') {
            logger.error(`${listenOptions.port ? `Port ${listenOptions.port}` : getAddress(server)} is already in use`);
            process.exit(1);
        }
        else {
            throw err;
        }
    });
}
