import type { Relation } from '@directus/types';
/**
 * Builds two maps where collectionRelationTree is a map of collection to related collections
 * and fieldToCollectionList is a map of field:collection to related collection.
 *
 * @example
 * returns {
 * 		collectionRelationTree: new Map([
 * 			['B', new Set(['A'])],
 * 			['A', new Set(['B'])],
 * 		]),
 * 		fieldToCollectionList: new Map([
 * 			['B:b', 'A'],
 * 			['A:a', 'B'],
 * 		]),
 * }
 */
export declare function buildCollectionAndFieldRelations(relations: Relation[]): {
    collectionRelationTree: Map<string, Set<string>>;
    fieldToCollectionList: Map<string, string>;
};
