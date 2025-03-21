import type { CollectionKey, FieldMap, QueryPath } from '../types.js';
export declare function getInfoForPath(fieldMap: FieldMap, group: keyof FieldMap, path: QueryPath, collection: CollectionKey): {
    collection: CollectionKey;
    fields: Set<import("../types.js").FieldKey>;
};
