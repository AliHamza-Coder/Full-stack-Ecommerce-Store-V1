import { logGenerator, requestGenerator, sleepGenerator } from './generators/index.js';
/**
 * Create a new SDK context for use in the isolate
 */
export declare function getSdk(): ({
    name: string;
    generator: typeof logGenerator;
    args: string[];
    async: boolean;
} | {
    name: string;
    generator: typeof sleepGenerator;
    args: string[];
    async: boolean;
} | {
    name: string;
    generator: typeof requestGenerator;
    args: string[];
    async: boolean;
})[];
