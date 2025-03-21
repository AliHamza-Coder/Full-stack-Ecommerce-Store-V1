import type { PrimaryKey } from '@directus/types';
type Options = {
    collection: string;
    key?: PrimaryKey | PrimaryKey[] | null;
    query?: Record<string, any> | string | null;
    emitEvents: boolean;
    permissions: string;
};
declare const _default: import("@directus/extensions").OperationApiConfig<Options>;
export default _default;
