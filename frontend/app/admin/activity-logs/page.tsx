'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Card,
  Pagination,
  LoadingSpinner,
  DateRangeFilter,
  Badge
} from '@/components/shared'
import { adminAPI } from '@/lib/admin-api'

interface ActivityLog {
  id: number
  user: { id: number; name: string }
  action: string
  model_type: string
  model_id: number
  old_values: any
  new_values: any
  created_at: string
  ip_address: string
}

export default function ActivityLogsPage () {
  const router = useRouter()
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const fetchLogs = async (page = 1) => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const data = await adminAPI.getActivityLogs(token, page)
      setLogs(data.data || [])
      setCurrentPage(data.pagination?.current_page || 1)
      setTotalPages(data.pagination?.last_page || 1)
    } catch (error) {
      console.error('Error fetching activity logs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs(currentPage)
  }, [currentPage])

  const getActionClassName = (action: string) => {
    switch (action) {
      case 'created':
        return 'bg-green-600'
      case 'updated':
        return 'bg-yellow-600'
      case 'deleted':
        return 'bg-red-600'
      default:
        return 'bg-blue-600'
    }
  }

  const getActionLabel = (action: string) => {
    const labels: { [key: string]: string } = {
      created: 'তৈরি করা হয়েছে',
      updated: 'আপডেট করা হয়েছে',
      deleted: 'মুছে ফেলা হয়েছে'
    }
    return labels[action] || action
  }

  if (loading) {
    return <LoadingSpinner fullScreen={true} />
  }

  return (
    <Container maxWidth='2xl' padding='md' className='py-[var(--margin-lg)]'>
      <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--margin-lg)]'>
        কার্যকলাপ লগ
      </h1>

      {/* Date Filter */}
      <Card variant='outlined' padding='md' className='mb-[var(--margin-lg)]'>
        <DateRangeFilter
          onApply={(start, end) => {
            setStartDate(start)
            setEndDate(end)
            setCurrentPage(1)
          }}
        />
      </Card>

      {/* Activity Logs */}
      {logs.length > 0 ? (
        <div className='space-y-[var(--spacing-3)] mb-[var(--margin-lg)]'>
          {logs.map(log => (
            <Card key={log.id} variant='outlined' padding='md'>
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <div className='flex items-center gap-[var(--spacing-2)] mb-[var(--spacing-2)]'>
                    <h4 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-text-primary)]'>
                      {log.user.name}
                    </h4>
                    <Badge
                      category='default'
                      size='sm'
                      className={getActionClassName(log.action)}
                    >
                      {getActionLabel(log.action)}
                    </Badge>
                  </div>

                  <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)] mb-[var(--spacing-1)]'>
                    {log.model_type} ID: {log.model_id}
                  </p>

                  {log.new_values && (
                    <div className='bg-[var(--color-bg-secondary)] p-[var(--spacing-2)] rounded text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] overflow-auto max-h-20'>
                      <pre>{JSON.stringify(log.new_values, null, 2)}</pre>
                    </div>
                  )}
                </div>

                <div className='text-right ml-[var(--spacing-4)]'>
                  <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)]'>
                    {new Date(log.created_at).toLocaleDateString('bn-BD')}
                  </p>
                  <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]'>
                    {new Date(log.created_at).toLocaleTimeString('bn-BD')}
                  </p>
                  {log.ip_address && (
                    <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] mt-[var(--spacing-1)]'>
                      IP: {log.ip_address}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card
          variant='elevated'
          padding='lg'
          className='text-center mb-[var(--margin-lg)]'
        >
          <p className='text-[var(--font-size-lg)] text-[var(--color-text-secondary)]'>
            কোনো কার্যকলাপ পাওয়া যায়নি
          </p>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl='/admin/activity-logs'
          onPageChange={setCurrentPage}
        />
      )}
    </Container>
  )
}
