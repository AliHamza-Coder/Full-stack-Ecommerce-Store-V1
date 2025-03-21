import { setTimeout } from 'node:timers/promises';
export function sleepGenerator(requestedScopes) {
    return async (milliseconds) => {
        if (requestedScopes.sleep === undefined)
            throw new Error('No permission to access "sleep"');
        if (milliseconds.typeof !== 'number')
            throw new TypeError('Sleep milliseconds has to be of type number');
        const millisecondsCopied = await milliseconds.copy();
        await setTimeout(millisecondsCopied);
    };
}
