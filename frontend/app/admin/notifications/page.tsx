'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Card,
  Button,
  Badge,
  LoadingSpinner,
  Pagination
} from '@/components/shared'
import { adminAPI } from '@/lib/admin-api'

interface Notification {
  id: number
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  is_read: boolean
  created_at: string
  related_model?: string
  related_id?: number
}

export default function NotificationsPage () {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = async (page = 1) => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const data = await adminAPI.getNotifications(token)
      setNotifications(data.data || [])
      setUnreadCount(data.unread_count || 0)
      setCurrentPage(data.pagination?.current_page || 1)
      setTotalPages(data.pagination?.last_page || 1)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications(currentPage)
  }, [currentPage])

  const handleMarkAsRead = async (notificationId: number) => {
    const token = localStorage.getItem('auth_token')
    if (!token) return

    try {
      await adminAPI.markNotificationAsRead(token, notificationId)
      fetchNotifications(currentPage)
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) return

    try {
      await adminAPI.markAllNotificationsAsRead(token)
      fetchNotifications(currentPage)
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const handleDelete = async (notificationId: number) => {
    const token = localStorage.getItem('auth_token')
    if (!token) return

    try {
      await adminAPI.deleteNotification(token, notificationId)
      fetchNotifications(currentPage)
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  const getNotificationColor = (type: string) => {
    const colors: { [key: string]: string } = {
      info: 'bg-blue-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      error: 'bg-red-600'
    }
    return colors[type] || 'bg-blue-600'
  }

  if (loading) {
    return <LoadingSpinner fullScreen={true} />
  }

  return (
    <Container maxWidth='2xl' padding='md' className='py-[var(--margin-lg)]'>
      <div className='flex justify-between items-center mb-[var(--margin-lg)]'>
        <div>
          <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)]'>
            বিজ্ঞপ্তি
          </h1>
          {unreadCount > 0 && (
            <p className='text-[var(--font-size-sm)] text-[var(--color-text-secondary)] mt-[var(--spacing-1)]'>
              {unreadCount} টি অপড়া বার্তা
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant='secondary' size='md' onClick={handleMarkAllAsRead}>
            সব পড়া হিসেবে চিহ্নিত করুন
          </Button>
        )}
      </div>

      {/* Notifications */}
      {notifications.length > 0 ? (
        <div className='space-y-[var(--spacing-3)] mb-[var(--margin-lg)]'>
          {notifications.map(notif => (
            <Card
              key={notif.id}
              variant='outlined'
              padding='md'
              className={!notif.is_read ? 'bg-[var(--color-bg-secondary)]' : ''}
            >
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <div className='flex items-center gap-[var(--spacing-2)] mb-[var(--spacing-2)]'>
                    <h4 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-text-primary)]'>
                      {notif.title}
                    </h4>
                    <Badge
                      category='default'
                      size='sm'
                      className={getNotificationColor(notif.type)}
                    >
                      {notif.type}
                    </Badge>
                    {!notif.is_read && (
                      <div className='w-2 h-2 bg-[var(--color-primary)] rounded-full'></div>
                    )}
                  </div>

                  <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)]'>
                    {notif.message}
                  </p>

                  <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] mt-[var(--spacing-2)]'>
                    {new Date(notif.created_at).toLocaleDateString('bn-BD')}{' '}
                    {new Date(notif.created_at).toLocaleTimeString('bn-BD')}
                  </p>
                </div>

                <div className='flex gap-[var(--spacing-2)] ml-[var(--spacing-4)]'>
                  {!notif.is_read && (
                    <Button
                      variant='secondary'
                      size='sm'
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      পড়া হিসেবে চিহ্নিত
                    </Button>
                  )}
                  <Button
                    variant='danger'
                    size='sm'
                    onClick={() => handleDelete(notif.id)}
                  >
                    মুছুন
                  </Button>
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
            কোনো বিজ্ঞপ্তি নেই
          </p>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl='/admin/notifications'
          onPageChange={setCurrentPage}
        />
      )}
    </Container>
  )
}
