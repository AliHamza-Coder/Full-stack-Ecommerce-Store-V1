/**
 * Returns a list of all related collections for a given collection.
 * Or in math terms, returns the [strongly connected component](https://en.wikipedia.org/wiki/Strongly_connected_component) that a given node belongs to.
 */
export declare function getCollectionRelationList(collection: string, collectionRelationTree: Map<string, Set<string>>): Set<string>;
