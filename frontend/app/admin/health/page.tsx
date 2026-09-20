'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Card,
  LoadingSpinner,
  Badge,
  Button
} from '@/components/shared'
import { apiTests, TestResult } from '@/lib/utils'

export default function HealthCheckPage () {
  const router = useRouter()
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [testTime, setTestTime] = useState(0)

  useEffect(() => {
    runTests()
  }, [])

  const runTests = async () => {
    setLoading(true)
    const start = performance.now()

    try {
      const testResults = await apiTests.runAllTests()
      setResults(testResults)
      setTestTime(Math.round(performance.now() - start))
    } catch (error) {
      console.error('Error running tests:', error)
    } finally {
      setLoading(false)
    }
  }

  const successCount = results.filter(r => r.success).length
  const failureCount = results.filter(r => !r.success).length
  const avgResponseTime =
    results.length > 0
      ? Math.round(
          results.reduce((sum, r) => sum + r.responseTime, 0) / results.length
        )
      : 0

  if (loading) {
    return <LoadingSpinner fullScreen={true} />
  }

  return (
    <Container maxWidth='2xl' padding='md' className='py-[var(--margin-lg)]'>
      <div className='flex justify-between items-center mb-[var(--margin-lg)]'>
        <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)]'>
          স্বাস্থ্য পরীক্ষা
        </h1>
        <Button variant='primary' size='md' onClick={runTests}>
          পুনরায় চালান
        </Button>
      </div>

      {/* Summary Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-[var(--margin-md)] mb-[var(--margin-lg)]'>
        <Card variant='outlined' padding='lg'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            সফল পরীক্ষা
          </p>
          <h3 className='text-[2.5rem] font-bold text-green-600'>
            {successCount}/{results.length}
          </h3>
        </Card>

        <Card variant='outlined' padding='lg'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            ব্যর্থ পরীক্ষা
          </p>
          <h3 className='text-[2.5rem] font-bold text-red-600'>
            {failureCount}/{results.length}
          </h3>
        </Card>

        <Card variant='outlined' padding='lg'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            গড় সময়
          </p>
          <h3 className='text-[2.5rem] font-bold text-blue-600'>
            {avgResponseTime}ms
          </h3>
        </Card>
      </div>

      {/* Test Results */}
      <Card variant='elevated' padding='lg'>
        <h2 className='text-[var(--h3-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--margin-md)]'>
          পরীক্ষার ফলাফল
        </h2>

        <div className='space-y-[var(--spacing-3)]'>
          {results.map((result, idx) => (
            <div
              key={idx}
              className='flex items-start justify-between p-[var(--spacing-3)] border border-[var(--color-border)] rounded-lg'
            >
              <div className='flex-1'>
                <div className='flex items-center gap-[var(--spacing-2)] mb-[var(--spacing-2)]'>
                  <h4 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-text-primary)]'>
                    {result.endpoint}
                  </h4>
                  <Badge
                    category='default'
                    size='sm'
                    className={result.success ? 'bg-green-600' : 'bg-red-600'}
                  >
                    {result.method}
                  </Badge>
                </div>

                <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)] mb-[var(--spacing-1)]'>
                  {result.message}
                </p>

                <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]'>
                  স্ট্যাটাস: {result.status} | সময়: {result.responseTime}ms
                </p>
              </div>

              <div className='ml-[var(--spacing-4)]'>
                {result.success ? (
                  <span className='text-2xl'>✅</span>
                ) : (
                  <span className='text-2xl'>❌</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] mt-[var(--margin-md)] text-right'>
          মোট পরীক্ষা সময়: {testTime}ms
        </p>
      </Card>
    </Container>
  )
}
