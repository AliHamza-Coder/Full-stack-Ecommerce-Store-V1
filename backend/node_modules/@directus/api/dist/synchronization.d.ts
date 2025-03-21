export declare class SynchronizedClock {
    private key;
    private synchronizationManager;
    constructor(id: string);
    set(timestamp: number): Promise<boolean>;
    reset(): Promise<void>;
}
