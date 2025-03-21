import { marked } from 'marked';
import sanitizeHTML from 'sanitize-html';
/**
 * Render and sanitize a markdown string
 */
export function md(value) {
    const markdown = marked.parse(value); /* Would only be a promise if used with async extensions */
    return sanitizeHTML(markdown);
}
