import type { Accountability, Item, PermissionsAction } from '@directus/types';
import type { Context } from '../../types.js';
export interface ProcessPayloadOptions {
    accountability: Accountability;
    action: PermissionsAction;
    collection: string;
    payload: Item;
}
/**
 * @note this only validates the top-level fields. The expectation is that this function is called
 * for each level of nested insert separately
 */
export declare function processPayload(options: ProcessPayloadOptions, context: Context): Promise<any>;
