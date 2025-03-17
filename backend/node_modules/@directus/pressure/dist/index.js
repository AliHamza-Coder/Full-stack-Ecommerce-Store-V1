// src/monitor.ts
import { defaults } from "@directus/utils";
import { monitorEventLoopDelay, performance } from "node:perf_hooks";
import { memoryUsage } from "node:process";
import { setTimeout } from "node:timers";
var PressureMonitor = class {
  memoryHeapUsed = 0;
  memoryRss = 0;
  eventLoopDelay = 0;
  eventLoopUtilization = 0;
  options;
  histogram;
  timeout;
  constructor(options = {}) {
    this.options = defaults(options, {
      sampleInterval: 250,
      resolution: 10,
      maxMemoryHeapUsed: false,
      maxMemoryRss: false,
      maxEventLoopDelay: false,
      maxEventLoopUtilization: false
    });
    this.histogram = monitorEventLoopDelay({ resolution: this.options.resolution });
    this.histogram.enable();
    this.updateUsage = this.updateUsage.bind(this);
    this.timeout = setTimeout(this.updateUsage, this.options.sampleInterval);
    this.timeout.unref();
  }
  get overloaded() {
    if (this.options.maxMemoryHeapUsed && this.memoryHeapUsed > this.options.maxMemoryHeapUsed) {
      return true;
    }
    if (this.options.maxMemoryRss && this.memoryRss > this.options.maxMemoryRss) {
      return true;
    }
    if (this.options.maxEventLoopDelay && this.eventLoopDelay > this.options.maxEventLoopDelay) {
      return true;
    }
    if (this.options.maxEventLoopUtilization && this.eventLoopUtilization > this.options.maxEventLoopUtilization) {
      return true;
    }
    return false;
  }
  updateUsage() {
    this.updateMemoryUsage();
    this.updateEventLoopUsage();
    this.timeout.refresh();
  }
  updateMemoryUsage() {
    const { heapUsed, rss } = memoryUsage();
    this.memoryHeapUsed = heapUsed;
    this.memoryRss = rss;
  }
  updateEventLoopUsage() {
    this.eventLoopUtilization = performance.eventLoopUtilization().utilization;
    this.eventLoopDelay = Math.round(this.histogram.mean / 1e6);
    this.histogram.reset();
  }
};

// src/express.ts
var handlePressure = (options) => {
  const monitor = new PressureMonitor(options);
  return (_req, res, next) => {
    if (monitor.overloaded) {
      if (options.retryAfter) {
        res.header("Retry-After", options.retryAfter);
      }
      return next(options?.error ?? new Error("Pressure limit exceeded"));
    }
    return next();
  };
};
export {
  PressureMonitor,
  handlePressure
};
