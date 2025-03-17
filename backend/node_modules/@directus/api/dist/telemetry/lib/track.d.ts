/**
 * Generate and send a report. Will log on error, but not throw. No need to be awaited
 *
 * @param opts Options for the tracking
 * @param opts.wait Whether or not to wait a random amount of time between 0 and 30 minutes
 * @returns whether or not the tracking was successful
 */
export declare const track: (opts?: {
    wait: boolean;
}) => Promise<boolean>;
