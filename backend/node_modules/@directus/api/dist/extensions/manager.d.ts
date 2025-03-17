import type { Extension } from '@directus/extensions';
import { Router } from 'express';
import type { ExtensionManagerOptions } from './types.js';
export declare class ExtensionManager {
    private options;
    /**
     * Whether or not the extensions have been read from disk and registered into the system
     */
    private isLoaded;
    private localExtensions;
    private registryExtensions;
    private moduleExtensions;
    /**
     * Settings for the extensions that are loaded within the current process
     */
    private extensionsSettings;
    /**
     * App extensions rolled up into a single bundle. Any chunks from the bundle will be available
     * under appExtensionChunks
     */
    private appExtensionsBundle;
    /**
     * Individual filename chunks from the rollup bundle. Used to improve the performance by allowing
     * extensions to split up their bundle into multiple smaller chunks
     */
    private appExtensionChunks;
    /**
     * Callbacks to be able to unregister extensions
     */
    private unregisterFunctionMap;
    /**
     * A local-to-extensions scoped emitter that can be used to fire and listen to custom events
     * between extensions. These events are completely isolated from the core events that trigger
     * hooks etc
     */
    private localEmitter;
    /**
     * Locally scoped express router used for custom endpoints. Allows extensions to dynamically
     * register and de-register endpoints without affecting the regular global router
     */
    private endpointRouter;
    /**
     * Custom HTML to be injected at the end of the `<head>` tag of the app's index.html
     */
    private hookEmbedsHead;
    /**
     * Custom HTML to be injected at the end of the `<body>` tag of the app's index.html
     */
    private hookEmbedsBody;
    /**
     * Used to prevent race conditions when reloading extensions. Forces each reload to happen in
     * sequence.
     */
    private reloadQueue;
    /**
     * Optional file system watcher to auto-reload extensions when the local file system changes
     */
    private watcher;
    /**
     * installation manager responsible for installing extensions from registries
     */
    private installationManager;
    private messenger;
    /**
     * channel to publish on registering extension from external registry
     */
    private reloadChannel;
    private processId;
    get extensions(): Extension[];
    getExtension(source: string, folder: string): Extension | undefined;
    /**
     * Load and register all extensions
     *
     * @param {ExtensionManagerOptions} options - Extension manager configuration options
     * @param {boolean} options.schedule - Whether or not to allow for scheduled (CRON) hook extensions
     * @param {boolean} options.watch - Whether or not to watch the local extensions folder for changes
     */
    initialize(options?: Partial<ExtensionManagerOptions>): Promise<void>;
    /**
     * Installs an external extension from registry
     */
    install(versionId: string): Promise<void>;
    uninstall(folder: string): Promise<void>;
    broadcastReloadNotification(): Promise<void>;
    /**
     * Load all extensions from disk and register them in their respective places
     */
    private load;
    /**
     * Unregister all extensions from the current process
     */
    private unload;
    /**
     * Reload all the extensions. Will unload if extensions have already been loaded
     */
    reload(options?: {
        forceSync: boolean;
    }): Promise<unknown>;
    /**
     * Return the previously generated app extensions bundle
     */
    getAppExtensionsBundle(): string | null;
    /**
     * Return the previously generated app extension bundle chunk by name
     */
    getAppExtensionChunk(name: string): string | null;
    /**
     * Return the scoped router for custom endpoints
     */
    getEndpointRouter(): Router;
    /**
     * Return the custom HTML head and body embeds wrapped in a marker comment
     */
    getEmbeds(): {
        head: string;
        body: string;
    };
    /**
     * Start the chokidar watcher for extensions on the local filesystem
     */
    private initializeWatcher;
    /**
     * Close and destroy the local filesystem watcher if enabled
     */
    private closeWatcher;
    /**
     * Update the chokidar watcher configuration when new extensions are added or existing ones
     * removed
     */
    private updateWatchedExtensions;
    /**
     * Uses rollup to bundle the app extensions together into a single file the app can download and
     * run.
     */
    private generateExtensionBundle;
    private registerSandboxedApiExtension;
    private registerApiExtensions;
    private registerHookExtension;
    private registerEndpointExtension;
    private registerOperationExtension;
    private registerBundleExtension;
    /**
     * Import the operation module code for all operation extensions, and register them individually through
     * registerOperation
     */
    private registerInternalOperations;
    /**
     * Register a single hook
     */
    private registerHook;
    /**
     * Register an individual endpoint
     */
    private registerEndpoint;
    /**
     * Register an individual operation
     */
    private registerOperation;
    /**
     * Remove the registration for all API extensions
     */
    private unregisterApiExtensions;
    /**
     * If extensions must load successfully, any errors will cause the process to exit.
     * Otherwise, the error will only be logged as a warning.
     */
    private handleExtensionError;
}
