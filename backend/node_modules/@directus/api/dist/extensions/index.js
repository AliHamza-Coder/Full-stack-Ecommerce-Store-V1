import { ExtensionManager } from './manager.js';
let extensionManager;
export function getExtensionManager() {
    if (extensionManager) {
        return extensionManager;
    }
    extensionManager = new ExtensionManager();
    return extensionManager;
}
