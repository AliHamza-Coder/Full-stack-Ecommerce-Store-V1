import type { Column, SchemaOverview } from '@directus/schema';
import type { FieldMeta } from '@directus/types';
export default function getDefaultValue(column: SchemaOverview[string]['columns'][string] | Column, field?: {
    special?: FieldMeta['special'];
}): string | boolean | number | Record<string, any> | any[] | null;
