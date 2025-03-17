import type { SchemaOverview } from '@directus/types';
export declare function freezeSchema(schema: SchemaOverview): Readonly<SchemaOverview>;
export declare function unfreezeSchema(schema: Readonly<SchemaOverview>): SchemaOverview;
