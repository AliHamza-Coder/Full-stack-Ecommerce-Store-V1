import type { File } from '@directus/types';
import type { Transformation, TransformationSet } from '../types/index.js';
export declare function resolvePreset({ transformationParams, acceptFormat }: TransformationSet, file: File): Transformation[];
/**
 * Try to extract a file format from an array of `Transformation`'s.
 */
export declare function maybeExtractFormat(transforms: Transformation[]): string | undefined;
