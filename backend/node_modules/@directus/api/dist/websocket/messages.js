import { z } from 'zod';
const zodStringOrNumber = z.union([z.string(), z.number()]);
export const WebSocketMessage = z
    .object({
    type: z.string(),
    uid: zodStringOrNumber.optional(),
})
    .passthrough();
export const WebSocketResponse = z.discriminatedUnion('status', [
    WebSocketMessage.extend({
        status: z.literal('ok'),
    }),
    WebSocketMessage.extend({
        status: z.literal('error'),
        error: z
            .object({
            code: z.string(),
            message: z.string(),
        })
            .passthrough(),
    }),
]);
export const ConnectionParams = z.object({ access_token: z.string().optional() });
export const BasicAuthMessage = z.union([
    z.object({ email: z.string().email(), password: z.string() }),
    z.object({ access_token: z.string() }),
    z.object({ refresh_token: z.string() }),
]);
export const WebSocketAuthMessage = WebSocketMessage.extend({
    type: z.literal('auth'),
}).and(BasicAuthMessage);
export const WebSocketSubscribeMessage = z.discriminatedUnion('type', [
    WebSocketMessage.extend({
        type: z.literal('subscribe'),
        collection: z.string(),
        event: z.union([z.literal('create'), z.literal('update'), z.literal('delete')]).optional(),
        item: zodStringOrNumber.optional(),
        query: z.custom().optional(),
    }),
    WebSocketMessage.extend({
        type: z.literal('unsubscribe'),
    }),
]);
export const WebSocketLogsMessage = z.union([
    z.object({
        type: z.literal('subscribe'),
        log_level: z.string(),
    }),
    WebSocketMessage.extend({
        type: z.literal('unsubscribe'),
    }),
]);
const ZodItem = z.custom();
const PartialItemsMessage = z.object({
    uid: zodStringOrNumber.optional(),
    type: z.literal('items'),
    collection: z.string(),
});
export const WebSocketItemsMessage = z.union([
    PartialItemsMessage.extend({
        action: z.literal('create'),
        data: z.union([z.array(ZodItem), ZodItem]),
        query: z.custom().optional(),
    }),
    PartialItemsMessage.extend({
        action: z.literal('read'),
        ids: z.array(zodStringOrNumber).optional(),
        id: zodStringOrNumber.optional(),
        query: z.custom().optional(),
    }),
    PartialItemsMessage.extend({
        action: z.literal('update'),
        data: ZodItem,
        ids: z.array(zodStringOrNumber).optional(),
        id: zodStringOrNumber.optional(),
        query: z.custom().optional(),
    }),
    PartialItemsMessage.extend({
        action: z.literal('delete'),
        ids: z.array(zodStringOrNumber).optional(),
        id: zodStringOrNumber.optional(),
        query: z.custom().optional(),
    }),
]);
export const WebSocketEvent = z.discriminatedUnion('action', [
    z.object({
        action: z.literal('create'),
        collection: z.string(),
        payload: z.record(z.any()).optional(),
        key: zodStringOrNumber,
    }),
    z.object({
        action: z.literal('update'),
        collection: z.string(),
        payload: z.record(z.any()).optional(),
        keys: z.array(zodStringOrNumber),
    }),
    z.object({
        action: z.literal('delete'),
        collection: z.string(),
        payload: z.record(z.any()).optional(),
        keys: z.array(zodStringOrNumber),
    }),
]);
export const AuthMode = z.union([z.literal('public'), z.literal('handshake'), z.literal('strict')]);
