import type { Router } from 'express';
import type { Reference } from 'isolated-vm';
import type { IncomingHttpHeaders } from 'node:http';
export declare function registerRouteGenerator(endpointName: string, endpointRouter: Router): {
    register: (path: Reference<string>, method: Reference<"GET" | "POST" | "PUT" | "PATCH" | "DELETE">, cb: Reference<(req: {
        url: string;
        headers: IncomingHttpHeaders;
        body: string;
    }) => {
        status: number;
        body: string;
    } | Promise<{
        status: number;
        body: string;
    }>>) => void;
    unregisterFunction: () => void;
};
