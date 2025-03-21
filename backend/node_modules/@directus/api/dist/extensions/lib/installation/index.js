import { InstallationManager } from './manager.js';
let manager;
export function getInstallationManager() {
    if (manager) {
        return manager;
    }
    manager = new InstallationManager();
    return manager;
}
