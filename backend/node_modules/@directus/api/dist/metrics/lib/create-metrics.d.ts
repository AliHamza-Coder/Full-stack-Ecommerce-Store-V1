import type { MetricObjectWithValues, MetricValue } from 'prom-client';
import { Counter, Histogram } from 'prom-client';
export declare function createMetrics(): {
    getDatabaseErrorMetric: () => Counter | null;
    getDatabaseResponseMetric: () => Histogram | null;
    getCacheErrorMetric: () => Counter | null;
    getRedisErrorMetric: () => Counter | null;
    getStorageErrorMetric: (location: string) => Counter | null;
    aggregate: (data: {
        pid: number;
        metrics: MetricObjectWithValues<MetricValue<string>>[];
    }) => Promise<void>;
    generate: () => Promise<void>;
    readAll: () => Promise<string>;
};
