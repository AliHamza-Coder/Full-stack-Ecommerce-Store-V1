import { type Lock, type Locker, type RequestRelease } from '@tus/utils';
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
export declare class TusLocker implements Locker {
    lockTimeout: number;
    acquireTimeout: number;
    constructor(options?: {
        acquireLockTimeout: number;
        lockTimeout: number;
    });
    newLock(id: string): KvLock;
}
export declare class KvLock implements Lock {
    private id;
    private lockTimeout;
    private acquireTimeout;
    private kv;
    constructor(id: string, lockTimeout?: number, acquireTimeout?: number);
    lock(cancelReq: RequestRelease): Promise<void>;
    protected acquireLock(id: string, requestRelease: RequestRelease, signal: AbortSignal): Promise<boolean>;
    unlock(): Promise<void>;
}
export declare function getTusLocker(): Locker;
