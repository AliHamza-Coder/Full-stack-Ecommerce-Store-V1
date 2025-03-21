import type { TelemetryReport } from '../types/report.js';
/**
 * Post an anonymous usage report to the centralized intake server
 */
export declare const sendReport: (report: TelemetryReport) => Promise<void>;
