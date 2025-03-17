import cron from 'cron-parser';
import schedule from 'node-schedule';
import { SynchronizedClock } from '../synchronization.js';
export function validateCron(rule) {
    try {
        cron.parseExpression(rule);
    }
    catch {
        return false;
    }
    return true;
}
export function scheduleSynchronizedJob(id, rule, cb) {
    const clock = new SynchronizedClock(`${id}:${rule}`);
    const job = schedule.scheduleJob(rule, async (fireDate) => {
        const nextTimestamp = job.nextInvocation().getTime();
        const wasSet = await clock.set(nextTimestamp);
        if (wasSet) {
            await cb(fireDate);
        }
    });
    const stop = async () => {
        job.cancel();
        await clock.reset();
    };
    return { stop };
}
