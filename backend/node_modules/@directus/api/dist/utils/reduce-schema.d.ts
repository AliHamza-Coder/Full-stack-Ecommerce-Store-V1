import type { SchemaOverview } from '@directus/types';
import type { FieldMap } from '../permissions/modules/fetch-allowed-field-map/fetch-allowed-field-map.js';
/**
 * Reduces the schema based on the included permissions. The resulting object is the schema structure, but with only
 * the allowed collections/fields/relations included based on the passed field map.
 */
export declare function reduceSchema(schema: SchemaOverview, fieldMap: FieldMap): SchemaOverview;
