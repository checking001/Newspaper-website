'use client'

import React, { useEffect, useState } from 'react'
import { Container, Card, LoadingSpinner } from '@/components/shared'
import {
  PerformanceMonitor,
  PerformanceMetrics
} from '@/lib/performance-monitor'

export default function MonitoringPage () {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Wait for page to fully load
    if (document.readyState === 'complete') {
      setMetrics(PerformanceMonitor.getMetrics())
      setLoading(false)
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          setMetrics(PerformanceMonitor.getMetrics())
          setLoading(false)
        }, 1000)
      })
    }

    PerformanceMonitor.logMetrics()
  }, [])

  if (loading || !metrics) {
    return <LoadingSpinner fullScreen={true} />
  }

  const getStatus = (
    value: number,
    thresholds: { good: number; fair: number }
  ) => {
    if (value <= thresholds.good)
      return { label: 'ভালো', color: 'text-green-600' }
    if (value <= thresholds.fair)
      return { label: 'ফেয়ার', color: 'text-yellow-600' }
    return { label: 'খারাপ', color: 'text-red-600' }
  }

  return (
    <Container maxWidth='2xl' padding='md' className='py-[var(--margin-lg)]'>
      <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--margin-lg)]'>
        পারফরম্যান্স মনিটরিং
      </h1>

      {/* Core Web Vitals */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-[var(--margin-md)] mb-[var(--margin-lg)]'>
        {/* LCP */}
        <Card variant='outlined' padding='lg'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            বৃহত্তম কন্টেন্টপূর্ণ পেইন্ট (LCP)
          </p>
          <h3
            className={`text-[2.5rem] font-bold ${
              getStatus(metrics.largestContentfulPaint || 0, {
                good: 2500,
                fair: 4000
              }).color
            }`}
          >
            {metrics.largestContentfulPaint
              ? `${Math.round(metrics.largestContentfulPaint)}ms`
              : 'N/A'}
          </h3>
          <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] mt-[var(--spacing-2)]'>
            {
              getStatus(metrics.largestContentfulPaint || 0, {
                good: 2500,
                fair: 4000
              }).label
            }
          </p>
        </Card>

        {/* CLS */}
        <Card variant='outlined' padding='lg'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            সঞ্চিত লেআউট পরিবর্তন (CLS)
          </p>
          <h3
            className={`text-[2.5rem] font-bold ${
              getStatus((metrics.cumulativeLayoutShift || 0) * 1000, {
                good: 100,
                fair: 250
              }).color
            }`}
          >
            {metrics.cumulativeLayoutShift?.toFixed(3) || 'N/A'}
          </h3>
          <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] mt-[var(--spacing-2)]'>
            {
              getStatus((metrics.cumulativeLayoutShift || 0) * 1000, {
                good: 100,
                fair: 250
              }).label
            }
          </p>
        </Card>

        {/* FID */}
        <Card variant='outlined' padding='lg'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            প্রথম ইনপুট বিলম্ব (FID)
          </p>
          <h3
            className={`text-[2.5rem] font-bold ${
              getStatus(metrics.firstInputDelay || 0, { good: 100, fair: 300 })
                .color
            }`}
          >
            {metrics.firstInputDelay
              ? `${Math.round(metrics.firstInputDelay)}ms`
              : 'N/A'}
          </h3>
          <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] mt-[var(--spacing-2)]'>
            {
              getStatus(metrics.firstInputDelay || 0, { good: 100, fair: 300 })
                .label
            }
          </p>
        </Card>
      </div>

      {/* Other Metrics */}
      <Card variant='elevated' padding='lg'>
        <h2 className='text-[var(--h3-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--margin-md)]'>
          অন্যান্য মেট্রিক্স
        </h2>

        <div className='space-y-[var(--spacing-4)]'>
          <div className='border-b border-[var(--color-border)] pb-[var(--spacing-3)] last:border-0'>
            <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-1)]'>
              পেজ লোড সময়
            </p>
            <h4 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-text-primary)]'>
              {Math.round(metrics.pageLoadTime)}ms
            </h4>
          </div>

          <div className='border-b border-[var(--color-border)] pb-[var(--spacing-3)] last:border-0'>
            <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-1)]'>
              DOM ইন্টারঅ্যাক্টিভ
            </p>
            <h4 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-text-primary)]'>
              {Math.round(metrics.domInteractive)}ms
            </h4>
          </div>

          <div className='border-b border-[var(--color-border)] pb-[var(--spacing-3)] last:border-0'>
            <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-1)]'>
              DOM সম্পূর্ণ
            </p>
            <h4 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-text-primary)]'>
              {Math.round(metrics.domComplete)}ms
            </h4>
          </div>

          <div className='border-b border-[var(--color-border)] pb-[var(--spacing-3)] last:border-0'>
            <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-1)]'>
              রিসোর্স লোড সময়
            </p>
            <h4 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-text-primary)]'>
              {Math.round(metrics.resourceLoadTime)}ms
            </h4>
          </div>
        </div>
      </Card>
    </Container>
  )
}
