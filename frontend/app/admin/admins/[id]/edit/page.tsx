'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Container,
  Card,
  Button,
  LoadingSpinner,
  Alert
} from '@/components/shared'
import { adminAPI } from '@/lib/admin-api'

interface AdminForm {
  name: string
  email: string
  role: string
  password?: string
  password_confirmation?: string
  is_active: boolean
}

export default function EditAdminPage () {
  const router = useRouter()
  const params = useParams()
  const adminId = params.id as string
  const isNew = adminId === 'new'

  const [formData, setFormData] = useState<AdminForm>({
    name: '',
    email: '',
    role: 'admin',
    is_active: true
  })

  const [loading, setLoading] = useState(!isNew)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    if (!isNew) {
      fetchAdmin()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const data = await adminAPI.getAdmin(token, parseInt(adminId))
      setFormData({
        name: data.data.name,
        email: data.data.email,
        role: data.data.role,
        is_active: data.data.is_active
      })
    } catch (error) {
      console.error('Error fetching admin:', error)
      setMessageType('error')
      setMessage('প্রশাসক লোড করতে ব্যর্থ')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as any
    setFormData({
      ...formData,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      let response
      if (isNew) {
        response = await adminAPI.createAdmin(token, formData)
      } else {
        response = await adminAPI.updateAdmin(
          token,
          parseInt(adminId),
          formData
        )
      }

      if (response.data) {
        setMessageType('success')
        setMessage(response.message || 'সফল')
        setTimeout(() => {
          router.push('/admin/admins')
        }, 1500)
      }
    } catch (error: any) {
      setMessageType('error')
      setMessage(error.message || 'একটি ত্রুটি ঘটেছে')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen={true} />
  }

  return (
    <Container maxWidth='2xl' padding='md' className='py-[var(--margin-lg)]'>
      <h1 className='text-[var(--h1-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--margin-lg)]'>
        {isNew ? 'নতুন প্রশাসক তৈরি করুন' : 'প্রশাসক সম্পাদনা করুন'}
      </h1>

      <Card variant='elevated' padding='lg' className='max-w-2xl'>
        {message && (
          <Alert type={messageType} className='mb-[var(--margin-md)]'>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className='space-y-[var(--spacing-4)]'>
          {/* Name */}
          <div>
            <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
              নাম *
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
              placeholder='প্রশাসকের নাম'
            />
          </div>

          {/* Email */}
          <div>
            <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
              ইমেইল *
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
              placeholder='admin@example.com'
            />
          </div>

          {/* Role */}
          <div>
            <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
              ভূমিকা *
            </label>
            <select
              name='role'
              value={formData.role}
              onChange={handleChange}
              className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
            >
              <option value='admin'>এডমিন</option>
              <option value='super_admin'>সুপার এডমিন</option>
            </select>
          </div>

          {/* Password (only for new) */}
          {isNew && (
            <>
              <div>
                <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
                  পাসওয়ার্ড *
                </label>
                <input
                  type='password'
                  name='password'
                  value={formData.password || ''}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
                  placeholder='কমপক্ষে ৮ অক্ষর'
                />
              </div>

              <div>
                <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
                  পাসওয়ার্ড নিশ্চিত করুন *
                </label>
                <input
                  type='password'
                  name='password_confirmation'
                  value={formData.password_confirmation || ''}
                  onChange={handleChange}
                  required
                  className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
                  placeholder='পাসওয়ার্ড পুনরায় প্রবেश করুন'
                />
              </div>
            </>
          )}

          {/* Status */}
          <div className='flex items-center'>
            <input
              type='checkbox'
              id='is_active'
              name='is_active'
              checked={formData.is_active}
              onChange={handleChange}
              className='w-4 h-4 rounded'
            />
            <label
              htmlFor='is_active'
              className='ml-[var(--spacing-2)] text-[var(--font-size-base)] text-[var(--color-text-primary)]'
            >
              সক্রিয় থাকবে
            </label>
          </div>

          {/* Buttons */}
          <div className='flex gap-[var(--spacing-3)] pt-[var(--spacing-4)]'>
            <Button
              variant='primary'
              size='md'
              disabled={submitting}
              type='submit'
            >
              {submitting ? 'সংরক্ষণ করা হচ্ছে...' : 'সংরক্ষণ করুন'}
            </Button>
            <Button
              variant='secondary'
              size='md'
              onClick={() => router.push('/admin/admins')}
              disabled={submitting}
            >
              বাতিল করুন
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  )
}
