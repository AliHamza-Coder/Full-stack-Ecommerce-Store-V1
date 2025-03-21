import { ERRORS } from '@tus/utils';
import { useLock } from '../../lock/index.js';
import { waitTimeout } from './utils/wait-timeout.js';
/**
 * TusLocker is an implementation of the Locker interface that manages locks in memory or using Redis.
 * This class is designed for exclusive access control over resources, often used in scenarios like upload management.
 *
 * Locking Behavior:
 * - When the `lock` method is invoked for an already locked resource, the `cancelReq` callback is called.
 *   This signals to the current lock holder that another process is requesting the lock, encouraging them to release it as soon as possible.
 * - The lock attempt continues until the specified timeout is reached. If the timeout expires and the lock is still not
 *   available, an error is thrown to indicate lock acquisition failure.
 *
 * Lock Acquisition and Release:
 * - The `lock` method implements a wait mechanism, allowing a lock request to either succeed when the lock becomes available,
 *   or fail after the timeout period.
 * - The `unlock` method releases a lock, making the resource available for other requests.
 */
export class TusLocker {
    lockTimeout;
    acquireTimeout;
    constructor(options) {
        this.acquireTimeout = options?.acquireLockTimeout ?? 1000 * 30;
        this.lockTimeout = options?.lockTimeout ?? 1000 * 60;
    }
    newLock(id) {
        return new KvLock(id, this.lockTimeout, this.acquireTimeout);
    }
}
export class KvLock {
    id;
    lockTimeout;
    acquireTimeout;
    kv;
    constructor(id, lockTimeout = 1000 * 60, acquireTimeout = 1000 * 30) {
        this.id = id;
        this.lockTimeout = lockTimeout;
        this.acquireTimeout = acquireTimeout;
        this.kv = useLock();
    }
    async lock(cancelReq) {
        const abortController = new AbortController();
        const lock = await Promise.race([
            waitTimeout(this.acquireTimeout, abortController.signal),
            this.acquireLock(this.id, cancelReq, abortController.signal),
        ]);
        abortController.abort();
        if (!lock) {
            throw ERRORS.ERR_LOCK_TIMEOUT;
        }
    }
    async acquireLock(id, requestRelease, signal) {
        if (signal.aborted) {
            return false;
        }
        const lockTime = await this.kv.get(id);
        const now = Date.now();
        if (!lockTime || Number(lockTime) < now - this.lockTimeout) {
            await this.kv.set(id, now);
            return true;
        }
        await requestRelease();
        return await new Promise((resolve, reject) => {
            // Using setImmediate to:
            // 1. Prevent stack overflow by deferring recursive calls to the next event loop iteration.
            // 2. Allow event loop to process other pending events, maintaining server responsiveness.
            // 3. Ensure fairness in lock acquisition by giving other requests a chance to acquire the lock.
            setImmediate(() => {
                this.acquireLock(id, requestRelease, signal).then(resolve).catch(reject);
            });
        });
    }
    async unlock() {
        await this.kv.delete(this.id);
    }
}
let _locker = undefined;
export function getTusLocker() {
    if (!_locker) {
        _locker = new TusLocker();
    }
    return _locker;
}
