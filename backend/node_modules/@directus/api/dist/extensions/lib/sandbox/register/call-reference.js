import { useEnv } from '@directus/env';
import { useLogger } from '../../../../logger/index.js';
export async function callReference(fn, args) {
    const env = useEnv();
    const logger = useLogger();
    const sandboxTimeout = Number(env['EXTENSIONS_SANDBOX_TIMEOUT']);
    try {
        return await fn.apply(undefined, args, {
            arguments: { copy: true },
            result: { reference: true, promise: true },
            timeout: sandboxTimeout,
        });
    }
    catch (e) {
        if (e instanceof RangeError) {
            logger.error(`Extension sandbox has reached the memory limit`);
            logger.error(e);
            process.abort();
        }
        throw e;
    }
}
