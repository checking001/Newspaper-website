'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Card,
  Grid,
  LoadingSpinner,
  Badge
} from '@/components/shared'
import { adminAPI } from '@/lib/admin-api'

interface DashboardStats {
  total_articles: number
  total_admins: number
  published_articles: number
  draft_articles: number
  total_views: number
  recent_activities: any[]
  admin_info: {
    name: string
    email: string
    role: string
    last_login: string
    is_active: boolean
  }
}

export default function AdminDashboard () {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
          router.push('/admin/login')
          return
        }

        const data = await adminAPI.getDashboardStats(token)
        setStats(data.data)
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [router])

  if (loading) {
    return <LoadingSpinner fullScreen={true} />
  }

  if (!stats) {
    return (
      <Container maxWidth='2xl' padding='md' className='py-[var(--margin-lg)]'>
        <p className='text-center text-[var(--color-text-secondary)]'>
          ড্যাশবোর্ড লোড করতে ব্যর্থ
        </p>
      </Container>
    )
  }

  return (
    <Container maxWidth='2xl' padding='md' className='py-[var(--margin-lg)]'>
      {/* Admin Info Card */}
      <Card variant='elevated' padding='lg' className='mb-[var(--margin-lg)]'>
        <div className='flex justify-between items-start'>
          <div>
            <h2 className='text-[var(--h2-size-mobile)] font-bold text-[var(--color-primary)]'>
              স্বাগতম, {stats.admin_info.name}
            </h2>
            <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)] mt-[var(--spacing-1)]'>
              📧 {stats.admin_info.email}
            </p>
          </div>
          <div className='text-right'>
            <Badge
              category='default'
              size='md'
              className='bg-green-600 text-white'
            >
              {stats.admin_info.role === 'super_admin'
                ? '🔐 সুপার এডমিন'
                : '👤 এডমিন'}
            </Badge>
            <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] mt-[var(--spacing-2)]'>
              শেষ লগইন:{' '}
              {stats.admin_info.last_login
                ? new Date(stats.admin_info.last_login).toLocaleDateString(
                    'bn-BD'
                  )
                : 'কখনো নয়'}
            </p>
          </div>
        </div>
      </Card>

      {/* Statistics Grid */}
      <Grid columns={2} gap='lg' className='mb-[var(--margin-lg)]'>
        <Card variant='outlined' padding='lg'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            মোট নিবন্ধ
          </p>
          <h3 className='text-[2.5rem] font-bold text-[var(--color-primary)]'>
            {stats.total_articles}
          </h3>
        </Card>

        <Card variant='outlined' padding='lg'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            প্রকাশিত
          </p>
          <h3 className='text-[2.5rem] font-bold text-green-600'>
            {stats.published_articles}
          </h3>
        </Card>

        <Card variant='outlined' padding='lg'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            ড্রাফট
          </p>
          <h3 className='text-[2.5rem] font-bold text-yellow-600'>
            {stats.draft_articles}
          </h3>
        </Card>

        <Card variant='outlined' padding='lg'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            মোট প্রশাসক
          </p>
          <h3 className='text-[2.5rem] font-bold text-blue-600'>
            {stats.total_admins}
          </h3>
        </Card>

        <Card variant='outlined' padding='lg' className='col-span-2'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            মোট ভিউ
          </p>
          <h3 className='text-[2.5rem] font-bold text-purple-600'>
            {(stats.total_views || 0).toLocaleString('bn-BD')}
          </h3>
        </Card>
      </Grid>

      {/* Recent Activities */}
      <Card variant='elevated' padding='lg'>
        <h3 className='text-[var(--h4-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--margin-md)]'>
          সাম্প্রতিক কার্যকলাপ
        </h3>

        {stats.recent_activities && stats.recent_activities.length > 0 ? (
          <div className='space-y-[var(--spacing-3)]'>
            {stats.recent_activities.map((activity: any, idx: number) => (
              <div
                key={idx}
                className='flex justify-between items-start pb-[var(--spacing-3)] border-b border-[var(--color-border)] last:border-0'
              >
                <div>
                  <p className='text-[var(--font-size-base)] text-[var(--color-text-primary)] font-medium'>
                    {activity.user?.name} - {activity.action}
                  </p>
                  <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)]'>
                    {activity.model_type} ID: {activity.model_id}
                  </p>
                </div>
                <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]'>
                  {new Date(activity.created_at).toLocaleDateString('bn-BD')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)]'>
            কোনো কার্যকলাপ নেই
          </p>
        )}
      </Card>
    </Container>
  )
}
