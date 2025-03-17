import { type Bus } from '@directus/memory';
import type { WebSocketEvent } from '../messages.js';
import { WebSocketSubscribeMessage } from '../messages.js';
import type { Subscription, WebSocketClient } from '../types.js';
/**
 * Handler responsible for subscriptions
 */
export declare class SubscribeHandler {
    subscriptions: Record<string, Set<Subscription>>;
    protected messenger: Bus;
    /**
     * Initialize the handler
     */
    constructor();
    /**
     * Hook into websocket client lifecycle events
     */
    bindWebSocket(): void;
    /**
     * Register a subscription
     * @param subscription
     */
    subscribe(subscription: Subscription): void;
    /**
     * Remove a subscription
     * @param subscription
     */
    unsubscribe(client: WebSocketClient, uid?: string | number): void;
    /**
     * Dispatch event to subscriptions
     */
    dispatch(event: WebSocketEvent): Promise<void>;
    /**
     * Handle incoming (un)subscribe requests
     */
    onMessage(client: WebSocketClient, message: WebSocketSubscribeMessage): Promise<void>;
    private getSubscription;
}
