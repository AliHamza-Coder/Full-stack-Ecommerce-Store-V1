interface AuthProvider {
    name: string;
    driver: string;
    icon?: string;
    label?: string;
}
export declare function getAuthProviders({ sessionOnly }?: {
    sessionOnly: boolean;
}): AuthProvider[];
export {};
