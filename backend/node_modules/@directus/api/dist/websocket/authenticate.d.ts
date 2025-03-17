import type { BasicAuthMessage } from './messages.js';
import type { AuthenticationState } from './types.js';
export declare function authenticateConnection(message: BasicAuthMessage & Record<string, any>): Promise<AuthenticationState>;
export declare function authenticationSuccess(uid?: string | number, refresh_token?: string): string;
