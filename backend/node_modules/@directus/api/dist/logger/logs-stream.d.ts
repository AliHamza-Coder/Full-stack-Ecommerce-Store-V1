import type { Bus } from '@directus/memory';
import { Writable } from 'stream';
type PrettyType = 'basic' | 'http' | false;
export declare class LogsStream extends Writable {
    messenger: Bus;
    pretty: PrettyType;
    constructor(pretty: PrettyType);
    _write(chunk: string, _encoding: string, callback: (error?: Error | null) => void): void;
}
export {};
