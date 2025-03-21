import { useEnv } from '@directus/env';
import sharp, {} from 'sharp';
export function getSharpInstance() {
    const env = useEnv();
    return sharp({
        limitInputPixels: Math.trunc(Math.pow(env['ASSETS_TRANSFORM_IMAGE_MAX_DIMENSION'], 2)),
        sequentialRead: true,
        failOn: env['ASSETS_INVALID_IMAGE_SENSITIVITY_LEVEL'],
    });
}
