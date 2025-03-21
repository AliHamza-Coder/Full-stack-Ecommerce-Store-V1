import type { NextFunction, Request, Response } from 'express';
/**
 * Verify the passed JWT and assign the user ID and role to `req`
 */
export declare const handler: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const _default: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default _default;
