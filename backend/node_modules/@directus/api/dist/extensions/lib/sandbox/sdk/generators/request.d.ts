import type { ExtensionSandboxRequestedScopes } from '@directus/extensions';
import type { Reference } from 'isolated-vm';
export declare function requestGenerator(requestedScopes: ExtensionSandboxRequestedScopes): (url: Reference<string>, options: Reference<{
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: Record<string, any> | string;
    headers?: Record<string, string>;
}>) => Promise<{
    status: number;
    statusText: string;
    headers: Record<string, any>;
    data: string;
}>;
