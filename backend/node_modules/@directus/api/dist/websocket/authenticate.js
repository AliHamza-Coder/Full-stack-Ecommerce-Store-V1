import { DEFAULT_AUTH_PROVIDER } from '../constants.js';
import { AuthenticationService } from '../services/index.js';
import { getAccountabilityForToken } from '../utils/get-accountability-for-token.js';
import { getSchema } from '../utils/get-schema.js';
import { WebSocketError } from './errors.js';
import { getExpiresAtForToken } from './utils/get-expires-at-for-token.js';
export async function authenticateConnection(message) {
    let access_token, refresh_token;
    try {
        if ('email' in message && 'password' in message) {
            const authenticationService = new AuthenticationService({ schema: await getSchema() });
            const { accessToken, refreshToken } = await authenticationService.login(DEFAULT_AUTH_PROVIDER, message);
            access_token = accessToken;
            refresh_token = refreshToken;
        }
        if ('refresh_token' in message) {
            const authenticationService = new AuthenticationService({ schema: await getSchema() });
            const { accessToken, refreshToken } = await authenticationService.refresh(message.refresh_token);
            access_token = accessToken;
            refresh_token = refreshToken;
        }
        if ('access_token' in message) {
            access_token = message.access_token;
        }
        if (!access_token)
            throw new Error();
        const accountability = await getAccountabilityForToken(access_token);
        const expires_at = getExpiresAtForToken(access_token);
        return { accountability, expires_at, refresh_token };
    }
    catch {
        throw new WebSocketError('auth', 'AUTH_FAILED', 'Authentication failed.', message['uid']);
    }
}
export function authenticationSuccess(uid, refresh_token) {
    const message = {
        type: 'auth',
        status: 'ok',
    };
    if (uid !== undefined) {
        message.uid = uid;
    }
    if (refresh_token !== undefined) {
        message['refresh_token'] = refresh_token;
    }
    return JSON.stringify(message);
}
