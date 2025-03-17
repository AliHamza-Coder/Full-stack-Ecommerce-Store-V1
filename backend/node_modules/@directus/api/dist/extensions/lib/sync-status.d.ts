export declare enum SyncStatus {
    UNKNOWN = "UNKNOWN",
    SYNCING = "SYNCING",
    DONE = "DONE"
}
/**
 * Retrieves the sync status from the `.status` file in the local extensions folder
 */
export declare const getSyncStatus: () => Promise<string>;
export declare const setSyncStatus: (status: SyncStatus) => Promise<void>;
