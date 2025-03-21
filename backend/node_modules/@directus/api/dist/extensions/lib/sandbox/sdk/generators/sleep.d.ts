import type { ExtensionSandboxRequestedScopes } from '@directus/extensions';
import type { Reference } from 'isolated-vm';
export declare function sleepGenerator(requestedScopes: ExtensionSandboxRequestedScopes): (milliseconds: Reference<number>) => Promise<void>;
