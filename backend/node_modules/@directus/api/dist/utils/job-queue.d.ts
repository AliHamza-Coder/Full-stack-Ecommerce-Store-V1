import type { PromiseCallback } from '@directus/types';
export declare class JobQueue {
    private running;
    private jobs;
    constructor();
    enqueue(job: PromiseCallback): void;
    private run;
    get size(): number;
}
