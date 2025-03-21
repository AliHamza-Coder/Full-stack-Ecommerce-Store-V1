import type { Accountability, SchemaOverview } from '@directus/types';
import { Server } from '@tus/server';
type Context = {
    schema: SchemaOverview;
    accountability?: Accountability | undefined;
};
export declare function createTusServer(context: Context): Promise<[Server, () => void]>;
export {};
