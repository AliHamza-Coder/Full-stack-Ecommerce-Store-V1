import { isDirectusError } from '@directus/errors';
import { useLogger } from '../../../logger/index.js';
const processError = (accountability, error) => {
    const logger = useLogger();
    logger.error(error);
    let originalError = error.originalError;
    if (originalError && 'originalError' in originalError) {
        originalError = originalError.originalError;
    }
    if (isDirectusError(originalError)) {
        return {
            message: originalError.message,
            extensions: {
                code: originalError.code,
                ...(originalError.extensions ?? {}),
            },
            ...(error.locations && { locations: error.locations }),
            ...(error.path && { path: error.path }),
        };
    }
    else {
        if (accountability?.admin === true) {
            const graphqlFormattedError = {
                message: error.message,
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                },
                ...(error.locations && { locations: error.locations }),
                ...(error.path && { path: error.path }),
            };
            return graphqlFormattedError;
        }
        else {
            return {
                message: 'An unexpected error occurred.',
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                },
            };
        }
    }
};
export default processError;
