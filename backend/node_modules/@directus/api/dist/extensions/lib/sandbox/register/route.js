import express from 'express';
import asyncHandler from '../../../../utils/async-handler.js';
import { callReference } from './call-reference.js';
export function registerRouteGenerator(endpointName, endpointRouter) {
    const router = express.Router();
    endpointRouter.use(`/${endpointName}`, router);
    const registerRoute = (path, method, cb) => {
        if (path.typeof !== 'string')
            throw new TypeError('Route path has to be of type string');
        if (method.typeof !== 'string')
            throw new TypeError('Route method has to be of type string');
        if (cb.typeof !== 'function')
            throw new TypeError('Route handler has to be of type function');
        const pathCopied = path.copySync();
        const methodCopied = method.copySync();
        const handler = asyncHandler(async (req, res) => {
            const request = { url: req.url, headers: req.headers, body: req.body };
            const response = await callReference(cb, [request]);
            const responseCopied = await response.copy();
            res.status(responseCopied.status).send(responseCopied.body);
        });
        switch (methodCopied) {
            case 'GET':
                router.get(pathCopied, handler);
                break;
            case 'POST':
                router.post(pathCopied, handler);
                break;
            case 'PUT':
                router.put(pathCopied, handler);
                break;
            case 'PATCH':
                router.patch(pathCopied, handler);
                break;
            case 'DELETE':
                router.delete(pathCopied, handler);
                break;
        }
    };
    const unregisterFunction = () => {
        endpointRouter.stack = endpointRouter.stack.filter((layer) => router !== layer.handle);
    };
    return { register: registerRoute, unregisterFunction };
}
