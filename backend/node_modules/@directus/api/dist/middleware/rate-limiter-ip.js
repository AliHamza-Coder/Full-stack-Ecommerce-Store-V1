import { useEnv } from '@directus/env';
import { HitRateLimitError } from '@directus/errors';
import { createRateLimiter } from '../rate-limiter.js';
import asyncHandler from '../utils/async-handler.js';
import { getIPFromReq } from '../utils/get-ip-from-req.js';
import { validateEnv } from '../utils/validate-env.js';
let checkRateLimit = (_req, _res, next) => next();
export let rateLimiter;
const env = useEnv();
if (env['RATE_LIMITER_ENABLED'] === true) {
    validateEnv(['RATE_LIMITER_STORE', 'RATE_LIMITER_DURATION', 'RATE_LIMITER_POINTS']);
    rateLimiter = createRateLimiter('RATE_LIMITER');
    checkRateLimit = asyncHandler(async (req, res, next) => {
        const ip = getIPFromReq(req);
        if (ip) {
            try {
                await rateLimiter.consume(ip, 1);
            }
            catch (rateLimiterRes) {
                if (rateLimiterRes instanceof Error)
                    throw rateLimiterRes;
                res.set('Retry-After', String(Math.round(rateLimiterRes.msBeforeNext / 1000)));
                throw new HitRateLimitError({
                    limit: +env['RATE_LIMITER_POINTS'],
                    reset: new Date(Date.now() + rateLimiterRes.msBeforeNext),
                });
            }
        }
        next();
    });
}
export default checkRateLimit;
