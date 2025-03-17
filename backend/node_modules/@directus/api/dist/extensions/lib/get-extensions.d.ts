export declare const getExtensions: () => Promise<{
    local: Map<string, import("@directus/extensions/node").Extension>;
    registry: Map<string, import("@directus/extensions/node").Extension>;
    module: Map<string, import("@directus/extensions/node").Extension>;
}>;
