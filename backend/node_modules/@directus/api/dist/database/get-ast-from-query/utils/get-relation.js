export function getRelation(schema, collection, field) {
    const relation = schema.relations.find((relation) => {
        return ((relation.collection === collection && relation.field === field) ||
            (relation.related_collection === collection && relation.meta?.one_field === field));
    });
    return relation;
}
