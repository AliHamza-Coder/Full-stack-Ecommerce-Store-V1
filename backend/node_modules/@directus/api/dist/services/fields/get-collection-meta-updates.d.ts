import type { CollectionsOverview } from '@directus/types';
import type { Knex } from 'knex';
export declare function getCollectionMetaUpdates(collection: string, field: string, collectionMetas: {
    archive_field?: null | string;
    sort_field?: null | string;
    item_duplication_fields?: null | string | string[];
    collection: string;
}[], collections: CollectionsOverview, fieldToCollectionList: Map<string, string>): {
    collection: string;
    updates: Record<string, Knex.Value>;
}[];
