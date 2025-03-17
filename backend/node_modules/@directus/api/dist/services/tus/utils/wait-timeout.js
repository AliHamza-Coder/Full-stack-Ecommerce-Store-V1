export function waitTimeout(timeout, signal) {
    return new Promise((resolve) => {
        const handler = setTimeout(() => {
            resolve(false);
        }, timeout);
        const abortListener = () => {
            clearTimeout(handler);
            signal.removeEventListener('abort', abortListener);
            resolve(false);
        };
        signal.addEventListener('abort', abortListener);
    });
}
