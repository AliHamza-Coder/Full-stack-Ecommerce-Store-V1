/**
 * Check if URL matches allow list either exactly or by origin (protocol+domain+port) + pathname
 */
export default function isUrlAllowed(url: string, allowList: string | string[]): boolean;
