import jwt from 'jsonwebtoken';
import { InvalidTokenError, ServiceUnavailableError, TokenExpiredError } from '@directus/errors';
export function verifyJWT(token, secret) {
    let payload;
    try {
        payload = jwt.verify(token, secret, {
            issuer: 'directus',
        });
    }
    catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            throw new TokenExpiredError();
        }
        else if (err instanceof jwt.JsonWebTokenError) {
            throw new InvalidTokenError();
        }
        else {
            throw new ServiceUnavailableError({ service: 'jwt', reason: `Couldn't verify token.` });
        }
    }
    return payload;
}
export function verifyAccessJWT(token, secret) {
    const payload = verifyJWT(token, secret);
    if (payload.role === undefined || payload.app_access === undefined || payload.admin_access === undefined) {
        throw new InvalidTokenError();
    }
    return payload;
}
