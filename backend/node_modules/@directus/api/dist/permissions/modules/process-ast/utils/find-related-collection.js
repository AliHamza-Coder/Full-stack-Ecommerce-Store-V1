import { getRelationInfo } from '../../../../utils/get-relation-info.js';
export function findRelatedCollection(collection, field, schema) {
    const { relation } = getRelationInfo(schema.relations, collection, field);
    if (!relation)
        return null;
    const isO2m = relation.related_collection === collection;
    const relatedCollectionName = isO2m ? relation.collection : relation.related_collection;
    return relatedCollectionName;
}
