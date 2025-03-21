import type { TelemetryReport } from '../types/report.js';
/**
 * Create a telemetry report about the anonymous usage of the current installation
 */
export declare const getReport: () => Promise<TelemetryReport>;
