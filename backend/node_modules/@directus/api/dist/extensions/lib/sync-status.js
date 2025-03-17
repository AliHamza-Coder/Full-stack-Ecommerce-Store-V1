import { exists } from 'fs-extra';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getExtensionsPath } from './get-extensions-path.js';
export var SyncStatus;
(function (SyncStatus) {
    SyncStatus["UNKNOWN"] = "UNKNOWN";
    SyncStatus["SYNCING"] = "SYNCING";
    SyncStatus["DONE"] = "DONE";
})(SyncStatus || (SyncStatus = {}));
/**
 * Retrieves the sync status from the `.status` file in the local extensions folder
 */
export const getSyncStatus = async () => {
    const statusFilePath = join(getExtensionsPath(), '.status');
    if (await exists(statusFilePath)) {
        const status = await readFile(statusFilePath, 'utf8');
        return status;
    }
    else {
        return SyncStatus.UNKNOWN;
    }
};
export const setSyncStatus = async (status) => {
    const statusFilePath = join(getExtensionsPath(), '.status');
    await writeFile(statusFilePath, status);
};
