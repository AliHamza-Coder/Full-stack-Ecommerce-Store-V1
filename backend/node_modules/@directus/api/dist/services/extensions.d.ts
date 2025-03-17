import type { ApiOutput, ExtensionSettings } from '@directus/extensions';
import type { Accountability, DeepPartial, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { ExtensionManager } from '../extensions/manager.js';
import type { AbstractServiceOptions } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class ExtensionReadError extends Error {
    originalError: unknown;
    constructor(originalError: unknown);
}
export declare class ExtensionsService {
    knex: Knex;
    accountability: Accountability | null;
    schema: SchemaOverview;
    extensionsItemService: ItemsService<ExtensionSettings>;
    extensionsManager: ExtensionManager;
    constructor(options: AbstractServiceOptions);
    private preInstall;
    install(extensionId: string, versionId: string): Promise<void>;
    uninstall(id: string): Promise<void>;
    reinstall(id: string): Promise<void>;
    readAll(): Promise<ApiOutput[]>;
    readOne(id: string): Promise<ApiOutput>;
    updateOne(id: string, data: DeepPartial<ApiOutput>): Promise<ApiOutput>;
    deleteOne(id: string): Promise<void>;
    /**
     * Sync a bundles enabled status
     *  - If the extension or extensions parent is not a bundle changes are skipped
     *  - If a bundles status is toggled, all children are set to that status
     *  - If an entries status is toggled, then if the:
     *    - Parent bundle is non-partial throws UnprocessableContentError
     *    - Entry status change resulted in all children being disabled then the parent bundle is disabled
     *    - Entry status change resulted in at least one child being enabled then the parent bundle is enabled
     */
    private checkBundleAndSyncStatus;
}
