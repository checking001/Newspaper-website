/**
 * Performance Monitoring & Analytics
 */

export interface PerformanceMetrics {
  pageLoadTime: number
  domInteractive: number
  domComplete: number
  resourceLoadTime: number
  largestContentfulPaint?: number
  cumulativeLayoutShift?: number
  firstInputDelay?: number
}

export class PerformanceMonitor {
  static getMetrics (): PerformanceMetrics {
    if (typeof window === 'undefined') {
      return {
        pageLoadTime: 0,
        domInteractive: 0,
        domComplete: 0,
        resourceLoadTime: 0
      }
    }

    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming
    const paintEntries = performance.getEntriesByType('paint')

    return {
      pageLoadTime: navigation?.loadEventEnd - navigation?.fetchStart || 0,
      domInteractive: navigation?.domInteractive - navigation?.fetchStart || 0,
      domComplete: navigation?.domComplete - navigation?.fetchStart || 0,
      resourceLoadTime: navigation?.responseEnd - navigation?.requestStart || 0,
      largestContentfulPaint: this.getLCP(),
      cumulativeLayoutShift: this.getCLS(),
      firstInputDelay: this.getFID()
    }
  }

  private static getLCP (): number {
    const entries = performance.getEntriesByType('largest-contentful-paint')
    return entries.length > 0
      ? (entries[entries.length - 1] as any).renderTime ||
          (entries[entries.length - 1] as any).loadTime
      : 0
  }

  private static getCLS (): number {
    const entries = performance.getEntriesByType('layout-shift')
    let totalCLS = 0
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        totalCLS += entry.value
      }
    })
    return totalCLS
  }

  private static getFID (): number {
    const entries = performance.getEntriesByType('first-input')
    return entries.length > 0 ? (entries[0] as any).processingDuration : 0
  }

  static logMetrics (): void {
    const metrics = this.getMetrics()
    console.log('📊 Performance Metrics:', {
      'Page Load Time': `${Math.round(metrics.pageLoadTime)}ms`,
      'DOM Interactive': `${Math.round(metrics.domInteractive)}ms`,
      'DOM Complete': `${Math.round(metrics.domComplete)}ms`,
      'Resource Load Time': `${Math.round(metrics.resourceLoadTime)}ms`,
      LCP: metrics.largestContentfulPaint
        ? `${Math.round(metrics.largestContentfulPaint)}ms`
        : 'N/A',
      CLS: metrics.cumulativeLayoutShift
        ? metrics.cumulativeLayoutShift.toFixed(3)
        : 'N/A',
      FID: metrics.firstInputDelay
        ? `${Math.round(metrics.firstInputDelay)}ms`
        : 'N/A'
    })
  }

  static sendToAnalytics (endpoint: string): void {
    const metrics = this.getMetrics()

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metrics)
    }).catch(error => console.error('Analytics error:', error))
  }
}
