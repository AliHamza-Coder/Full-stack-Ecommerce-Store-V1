import ms, {} from 'ms';
/**
 * Safely parse human readable time format into milliseconds
 */
export function getMilliseconds(value, fallback) {
    if ((typeof value !== 'string' && typeof value !== 'number') || value === '') {
        return fallback;
    }
    return ms(String(value)) ?? fallback;
}
