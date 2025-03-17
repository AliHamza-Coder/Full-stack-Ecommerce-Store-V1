import type { RequestHandler } from 'express';
import type { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';
declare let checkRateLimit: RequestHandler;
export declare let rateLimiter: RateLimiterRedis | RateLimiterMemory;
export default checkRateLimit;
