import { useLogger } from '../../../../../logger/index.js';
export function logGenerator(requestedScopes) {
    const logger = useLogger();
    return (message) => {
        if (requestedScopes.log === undefined)
            throw new Error('No permission to access "log"');
        if (message.typeof !== 'string')
            throw new TypeError('Log message has to be of type string');
        const messageCopied = message.copySync();
        logger.info(messageCopied);
    };
}
