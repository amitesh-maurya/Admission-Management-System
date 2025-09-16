// Performance monitoring utilities
export class PerformanceMonitor {
  private static measurements = new Map<string, number>();

  static startMeasurement(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      this.measurements.set(name, performance.now());
    }
  }

  static endMeasurement(name: string): number | null {
    if (typeof window !== 'undefined' && window.performance) {
      const startTime = this.measurements.get(name);
      if (startTime !== undefined) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Log performance in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
        }
        
        // Report to analytics in production
        if (process.env.NODE_ENV === 'production') {
          this.reportMetric(name, duration);
        }
        
        this.measurements.delete(name);
        return duration;
      }
    }
    return null;
  }

  private static reportMetric(name: string, duration: number): void {
    // Report to web vitals or analytics service
    // Example: gtag('event', 'timing_complete', { name, value: duration });
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as { gtag: (event: string, action: string, params: Record<string, unknown>) => void }).gtag('event', 'timing_complete', {
        name: name,
        value: Math.round(duration)
      });
    }
  }

  static measureAsyncOperation<T>(
    name: string,
    operation: () => Promise<T>
  ): Promise<T> {
    this.startMeasurement(name);
    
    return operation()
      .finally(() => {
        this.endMeasurement(name);
      });
  }

  static measureComponent(name: string) {
    return function<T extends React.JSXElementConstructor<unknown>>(Component: T): T {
      const MeasuredComponent = (props: React.ComponentProps<T>) => {
        React.useEffect(() => {
          PerformanceMonitor.startMeasurement(`${name}_mount`);
          return () => {
            PerformanceMonitor.endMeasurement(`${name}_mount`);
          };
        }, []);

        return React.createElement(Component, props);
      };

      MeasuredComponent.displayName = `Measured(${name})`;
      return MeasuredComponent as unknown as T;
    };
  }
}

// Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
        reportWebVital('LCP', entry.startTime);
      }
      
      if (entry.entryType === 'first-input') {
        const firstInputEntry = entry as PerformanceEventTiming;
        console.log('FID:', firstInputEntry.processingStart - firstInputEntry.startTime);
        reportWebVital('FID', firstInputEntry.processingStart - firstInputEntry.startTime);
      }
      
      if (entry.entryType === 'layout-shift') {
        const layoutShiftEntry = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
        if (!layoutShiftEntry.hadRecentInput) {
          console.log('CLS:', layoutShiftEntry.value);
          reportWebVital('CLS', layoutShiftEntry.value);
        }
      }
    });
  });

  // Observe Core Web Vitals
  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch {
    // Fallback for older browsers
    console.log('Performance Observer not supported');
  }

  // Track Time to First Byte (TTFB)
  if (window.performance && window.performance.timing) {
    const ttfb = window.performance.timing.responseStart - window.performance.timing.navigationStart;
    console.log('TTFB:', ttfb);
    reportWebVital('TTFB', ttfb);
  }
};

function reportWebVital(name: string, value: number) {
  if (process.env.NODE_ENV === 'production') {
    // Report to analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as { gtag: (event: string, action: string, params: Record<string, unknown>) => void }).gtag('event', name, {
        value: Math.round(value),
        metric_id: name,
        metric_value: value,
        metric_delta: value
      });
    }
  }
}

// Custom hook for tracking component performance
import React from 'react';

export function usePerformanceTracking(componentName: string) {
  React.useEffect(() => {
    PerformanceMonitor.startMeasurement(`${componentName}_render`);
    
    return () => {
      PerformanceMonitor.endMeasurement(`${componentName}_render`);
    };
  }, [componentName]);
}