import type { ExtensionSandboxRequestedScopes } from '@directus/extensions';
import type { Isolate, Module } from 'isolated-vm';
/**
 * Creates a new isolate context, generates the sandbox SDK, and returns an isolate Module with the
 * SDK included in it's global scope
 *
 * @param isolate - Existing isolate in which to inject the SDK globally
 * @param requestedScopes - Permissions as requested by the extension to generate the SDK for
 * @returns Isolate module with SDK available in it's global scope
 */
export declare function instantiateSandboxSdk(isolate: Isolate, requestedScopes: ExtensionSandboxRequestedScopes): Promise<Module>;
