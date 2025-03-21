import { createMetrics } from './create-metrics.js';
export declare const _cache: {
    metrics: ReturnType<typeof createMetrics> | undefined;
};
export declare const useMetrics: () => {
    getDatabaseErrorMetric: () => import("prom-client").Counter | null;
    getDatabaseResponseMetric: () => import("prom-client").Histogram | null;
    getCacheErrorMetric: () => import("prom-client").Counter | null;
    getRedisErrorMetric: () => import("prom-client").Counter | null;
    getStorageErrorMetric: (location: string) => import("prom-client").Counter | null;
    aggregate: (data: {
        pid: number;
        metrics: import("prom-client").MetricObjectWithValues<import("prom-client").MetricValue<string>>[];
    }) => Promise<void>;
    generate: () => Promise<void>;
    readAll: () => Promise<string>;
} | undefined;
