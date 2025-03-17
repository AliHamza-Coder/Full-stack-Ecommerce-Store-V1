import type { DirectusTokenPayload } from '../types/index.js';
/**
 * Verifies the associated session is still available and valid.
 *
 * @throws If session not found.
 */
export declare function verifySessionJWT(payload: DirectusTokenPayload): Promise<void>;
