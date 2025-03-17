export declare class InstallationManager {
    extensionPath: string;
    install(versionId: string): Promise<void>;
    uninstall(folder: string): Promise<void>;
}
