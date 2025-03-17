export interface ScheduledJob {
    stop(): Promise<void>;
}
export declare function validateCron(rule: string): boolean;
export declare function scheduleSynchronizedJob(id: string, rule: string, cb: (fireDate: Date) => void | Promise<void>): ScheduledJob;
