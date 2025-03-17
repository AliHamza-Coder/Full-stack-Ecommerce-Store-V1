import type { RequestHandler } from 'express';
/**
 * Extract access token from
 *
 * - 'access_token' query parameter
 * - 'Authorization' header
 * - Session cookie
 *
 * and store it under req.token
 */
declare const extractToken: RequestHandler;
export default extractToken;
