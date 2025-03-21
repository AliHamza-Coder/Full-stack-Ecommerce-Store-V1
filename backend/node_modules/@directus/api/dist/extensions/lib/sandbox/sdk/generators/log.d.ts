import type { ExtensionSandboxRequestedScopes } from '@directus/extensions';
import type { Reference } from 'isolated-vm';
export declare function logGenerator(requestedScopes: ExtensionSandboxRequestedScopes): (message: Reference<string>) => void;
