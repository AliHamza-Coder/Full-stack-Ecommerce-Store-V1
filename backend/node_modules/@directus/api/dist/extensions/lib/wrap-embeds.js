/**
 * Wraps an array of passed strings in a set of HTML comments with the given label
 */
export const wrapEmbeds = (label, content) => {
    if (content.length === 0)
        return '';
    return `<!-- Start ${label} -->\n${content.join('\n')}\n<!-- End ${label} -->`;
};
