import type { ApiExtensionType, HybridExtensionType } from '@directus/extensions';
import type { Router } from 'express';
/**
 * Generate the JS to run in the isolate to create the extension's entrypoint to the host
 *
 * @param type - Extension type to generate the entrypoint for
 * @param name - Unique name of the extension
 * @param endpointRouter - Scoped express router to register endpoint extension in
 */
export declare function generateApiExtensionsSandboxEntrypoint(type: ApiExtensionType | HybridExtensionType, name: string, endpointRouter: Router): {
    code: string;
    hostFunctions: ((event: import("isolated-vm").Reference<string>, cb: import("isolated-vm").Reference<(payload: unknown) => void | Promise<void>>) => void)[];
    unregisterFunction: () => Promise<void>;
} | {
    code: string;
    hostFunctions: ((path: import("isolated-vm").Reference<string>, method: import("isolated-vm").Reference<"GET" | "POST" | "PUT" | "PATCH" | "DELETE">, cb: import("isolated-vm").Reference<(req: {
        url: string;
        headers: import("http").IncomingHttpHeaders;
        body: string;
    }) => {
        status: number;
        body: string;
    } | Promise<{
        status: number;
        body: string;
    }>>) => void)[];
    unregisterFunction: () => void;
};
