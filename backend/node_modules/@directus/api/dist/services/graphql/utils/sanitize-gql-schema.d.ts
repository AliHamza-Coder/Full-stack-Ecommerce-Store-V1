import type { SchemaOverview } from '@directus/types';
/**
 * Filters out invalid collections to prevent graphql from errorring on schema generation
 *
 * @param schema
 * @returns sanitized schema
 */
export declare function sanitizeGraphqlSchema(schema: Readonly<SchemaOverview>): SchemaOverview;
