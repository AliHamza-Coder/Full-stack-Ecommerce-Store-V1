import jwt from 'jsonwebtoken';
export function getExpiresAtForToken(token) {
    const decoded = jwt.decode(token);
    if (decoded && typeof decoded === 'object' && decoded.exp) {
        return decoded.exp;
    }
    return null;
}
