import { getRelation } from './get-relation.js';
export function getRelatedCollection(schema, collection, field) {
    const relation = getRelation(schema, collection, field);
    if (!relation)
        return null;
    if (relation.collection === collection && relation.field === field) {
        return relation.related_collection || null;
    }
    if (relation.related_collection === collection && relation.meta?.one_field === field) {
        return relation.collection || null;
    }
    return null;
}
