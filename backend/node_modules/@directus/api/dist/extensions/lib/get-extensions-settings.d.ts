import type { Extension, ExtensionSettings } from '@directus/extensions';
/**
 * Loads stored settings for all extensions. Creates empty new rows in extensions tables for
 * extensions that don't have settings yet, and remove any settings for extensions that are no
 * longer installed.
 */
export declare const getExtensionsSettings: ({ local, module, registry, }: {
    local: Map<string, Extension>;
    module: Map<string, Extension>;
    registry: Map<string, Extension>;
}) => Promise<ExtensionSettings[]>;
