import type { ResizeOptions, Sharp } from 'sharp';
export declare const TransformationMethods: readonly ["toFormat", "jpeg", "png", "tiff", "webp", "avif", "resize", "extend", "extract", "trim", "rotate", "flip", "flop", "sharpen", "median", "blur", "flatten", "gamma", "negate", "normalise", "normalize", "clahe", "convolve", "threshold", "linear", "recomb", "modulate", "tint", "greyscale", "grayscale", "toColorspace", "toColourspace", "removeAlpha", "ensureAlpha", "extractChannel", "bandbool"];
type AllowedSharpMethods = Pick<Sharp, (typeof TransformationMethods)[number]>;
export type TransformationMap = {
    [M in keyof AllowedSharpMethods]: readonly [M, ...Parameters<AllowedSharpMethods[M]>];
};
export type Transformation = TransformationMap[keyof TransformationMap];
export type TransformationResize = Pick<ResizeOptions, 'width' | 'height' | 'fit' | 'withoutEnlargement'>;
export type TransformationFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'tiff' | 'avif';
export type TransformationParams = {
    key?: string;
    transforms?: Transformation[];
    format?: TransformationFormat | 'auto';
    quality?: number;
    focal_point_x?: number;
    focal_point_y?: number;
} & TransformationResize;
export type TransformationSet = {
    transformationParams: TransformationParams;
    acceptFormat?: TransformationFormat | undefined;
};
export {};
