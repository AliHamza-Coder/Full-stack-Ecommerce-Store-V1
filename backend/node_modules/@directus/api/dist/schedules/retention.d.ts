import type { Knex } from 'knex';
export interface RetentionTask {
    collection: string;
    where?: readonly [string, string, Knex.Value | null];
    join?: readonly [string, string, string];
    timeframe: number | undefined;
}
export declare function handleRetentionJob(): Promise<void>;
/**
 * Schedule the retention tracking
 *
 * @returns Whether or not retention has been initialized
 */
export default function schedule(): Promise<boolean>;
