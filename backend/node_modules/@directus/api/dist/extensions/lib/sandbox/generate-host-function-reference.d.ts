/**
 * Generate an anonymous function wrapper with the provided arguments that applies the args against a referenced function in the host
 *
 * @param index - Generator function that tracks the indexes used
 * @param args - Named arguments of the host function
 * @param options - Options to modify the output function
 * @param options.async - Whether or not to generate the wrapper function as an async function
 */
export declare function generateHostFunctionReference(index: Generator<number, number, number>, args: string[], options: {
    async: boolean;
}): string;
