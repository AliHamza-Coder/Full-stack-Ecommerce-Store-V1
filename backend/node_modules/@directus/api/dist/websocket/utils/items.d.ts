import type { Accountability, SchemaOverview } from '@directus/types';
import type { WebSocketEvent } from '../messages.js';
import type { Subscription } from '../types.js';
type PSubscription = Omit<Subscription, 'client'>;
/**
 * Get items from a collection using the appropriate service
 *
 * @param subscription Subscription object
 * @param accountability Accountability object
 * @param schema Schema object
 * @param event Event data
 * @returns the fetched items
 */
export declare function getPayload(subscription: PSubscription, accountability: Accountability | null, schema: SchemaOverview, event?: WebSocketEvent): Promise<Record<string, any>>;
/**
 * Get collection items
 *
 * @param accountability Accountability object
 * @param schema Schema object
 * @param event Event data
 * @returns the fetched collection data
 */
export declare function getCollectionPayload(subscription: PSubscription, accountability: Accountability | null, schema: SchemaOverview, event?: WebSocketEvent): Promise<string | number | import("../../types/collection.js").Collection | (string | number)[] | import("../../types/collection.js").Collection[]>;
/**
 * Get fields items
 *
 * @param accountability Accountability object
 * @param schema Schema object
 * @param event Event data
 * @returns the fetched field data
 */
export declare function getFieldsPayload(subscription: PSubscription, accountability: Accountability | null, schema: SchemaOverview, event?: WebSocketEvent): Promise<string | number | Record<string, any> | import("@directus/types").Field[] | (string | number)[]>;
/**
 * Get items from a collection using the appropriate service
 *
 * @param subscription Subscription object
 * @param accountability Accountability object
 * @param schema Schema object
 * @param event Event data
 * @returns the fetched data
 */
export declare function getItemsPayload(subscription: PSubscription, accountability: Accountability | null, schema: SchemaOverview, event?: WebSocketEvent): Promise<string | number | (string | number)[] | import("@directus/types").Item | import("@directus/types").Item[]>;
export {};
