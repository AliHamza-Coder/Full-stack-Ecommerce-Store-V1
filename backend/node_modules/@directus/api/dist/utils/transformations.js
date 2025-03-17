import { clamp } from 'lodash-es';
export function resolvePreset({ transformationParams, acceptFormat }, file) {
    const transforms = transformationParams.transforms ? [...transformationParams.transforms] : [];
    if (transformationParams.format || transformationParams.quality) {
        transforms.push([
            'toFormat',
            getFormat(file, transformationParams.format, acceptFormat),
            {
                quality: transformationParams.quality ? Number(transformationParams.quality) : undefined,
            },
        ]);
    }
    if ((transformationParams.width || transformationParams.height) && file.width && file.height) {
        const toWidth = transformationParams.width ? Number(transformationParams.width) : undefined;
        const toHeight = transformationParams.height ? Number(transformationParams.height) : undefined;
        const toFocalPointX = transformationParams.focal_point_x
            ? Number(transformationParams.focal_point_x)
            : file.focal_point_x;
        const toFocalPointY = transformationParams.focal_point_y
            ? Number(transformationParams.focal_point_y)
            : file.focal_point_y;
        /*
         * Focal point cropping only works with a fixed size (width x height) when `cover`ing,
         * since the other modes show the whole image. Sharp by default also simply scales up/down
         * when only supplied with one dimension, so we **must** check, else we break existing behaviour.
         * See: https://sharp.pixelplumbing.com/api-resize#resize
         * Also only crop to focal point when explicitly defined so that users can still `cover` with
         * other parameters like `position` and `gravity` - Else fall back to regular behaviour
         */
        if ((transformationParams.fit === undefined || transformationParams.fit === 'cover') &&
            toWidth &&
            toHeight &&
            toFocalPointX !== null &&
            toFocalPointY !== null) {
            const transformArgs = getResizeArguments({ w: file.width, h: file.height }, { w: toWidth, h: toHeight }, { x: toFocalPointX, y: toFocalPointY });
            transforms.push([
                'resize',
                {
                    width: transformArgs.width,
                    height: transformArgs.height,
                    fit: transformationParams.fit,
                    withoutEnlargement: transformationParams.withoutEnlargement
                        ? Boolean(transformationParams.withoutEnlargement)
                        : undefined,
                },
            ], ['extract', transformArgs.region]);
        }
        else {
            transforms.push([
                'resize',
                {
                    width: toWidth,
                    height: toHeight,
                    fit: transformationParams.fit,
                    withoutEnlargement: transformationParams.withoutEnlargement
                        ? Boolean(transformationParams.withoutEnlargement)
                        : undefined,
                },
            ]);
        }
    }
    return transforms;
}
function getFormat(file, format, acceptFormat) {
    const fileType = file.type?.split('/')[1];
    if (format) {
        if (format !== 'auto') {
            return format;
        }
        if (acceptFormat) {
            return acceptFormat;
        }
        if (fileType && ['avif', 'webp', 'tiff'].includes(fileType)) {
            return 'png';
        }
    }
    return fileType || 'jpg';
}
/**
 * Try to extract a file format from an array of `Transformation`'s.
 */
export function maybeExtractFormat(transforms) {
    const toFormats = transforms.filter((t) => t[0] === 'toFormat');
    const lastToFormat = toFormats[toFormats.length - 1];
    return lastToFormat ? lastToFormat[1]?.toString() : undefined;
}
/**
 * Resize an image but keep it centered on the focal point.
 * Based on the method outlined in https://github.com/lovell/sharp/issues/1198#issuecomment-384591756
 */
function getResizeArguments(original, target, focalPoint) {
    const { width, height, factor } = getIntermediateDimensions(original, target);
    const region = getExtractionRegion(factor, focalPoint ?? { x: original.w / 2, y: original.h / 2 }, target, {
        w: width,
        h: height,
    });
    return { width, height, region };
}
/**
 * Calculates the dimensions of the intermediate (resized) image.
 */
function getIntermediateDimensions(original, target) {
    const hRatio = original.h / target.h;
    const wRatio = original.w / target.w;
    let factor;
    let width;
    let height;
    if (hRatio < wRatio) {
        factor = hRatio;
        height = Math.round(target.h);
        width = Math.round(original.w / factor);
    }
    else {
        factor = wRatio;
        width = Math.round(target.w);
        height = Math.round(original.h / factor);
    }
    return { width, height, factor };
}
/**
 * Calculates the Region to extract from the intermediate image.
 */
function getExtractionRegion(factor, focalPoint, target, intermediate) {
    const newXCenter = focalPoint.x / factor;
    const newYCenter = focalPoint.y / factor;
    return {
        left: clamp(Math.round(newXCenter - target.w / 2), 0, intermediate.w - target.w),
        top: clamp(Math.round(newYCenter - target.h / 2), 0, intermediate.h - target.h),
        width: target.w,
        height: target.h,
    };
}
