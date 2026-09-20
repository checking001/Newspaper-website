'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Card,
  Button,
  Alert,
  Badge,
  LoadingSpinner
} from '@/components/shared'
import { adminAPI } from '@/lib/admin-api'

interface ProfileData {
  id: number
  name: string
  email: string
  role: string
  is_active: boolean
  created_at: string
  last_login_at: string
  permissions: string[]
}

export default function ProfilePage () {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const data = await adminAPI.getProfile(token)
      setProfile(data.data)
      setFormData({
        name: data.data.name,
        email: data.data.email,
        password: '',
        password_confirmation: ''
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
      setMessageType('error')
      setMessage('প্রোফাইল লোড করতে ব্যর্থ')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const dataToSend: any = {
        name: formData.name,
        email: formData.email
      }

      if (formData.password) {
        dataToSend.password = formData.password
        dataToSend.password_confirmation = formData.password_confirmation
      }

      const response = await adminAPI.updateProfile(token, dataToSend)
      setMessageType('success')
      setMessage(response.message || 'প্রোফাইল আপডেট হয়েছে')
      setEditing(false)
      setFormData({ ...formData, password: '', password_confirmation: '' })
      fetchProfile()
    } catch (error: any) {
      setMessageType('error')
      setMessage(error.message || 'একটি ত্রুটি ঘটেছে')
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen={true} />
  }

  if (!profile) {
    return (
      <Container maxWidth='2xl' padding='md' className='py-[var(--margin-lg)]'>
        <p className='text-center text-[var(--color-text-secondary)]'>
          প্রোফাইল লোড করতে ব্যর্থ
        </p>
      </Container>
    )
  }

  return (
    <Container maxWidth='2xl' padding='md' className='py-[var(--margin-lg)]'>
      <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--margin-lg)]'>
        আমার প্রোফাইল
      </h1>

      {message && (
        <Alert type={messageType} className='mb-[var(--margin-lg)]'>
          {message}
        </Alert>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-[var(--margin-lg)]'>
        {/* Profile Info */}
        <div className='md:col-span-2'>
          <Card variant='elevated' padding='lg'>
            {!editing ? (
              <div className='space-y-[var(--spacing-4)]'>
                <div>
                  <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-1)]'>
                    নাম
                  </p>
                  <h3 className='text-[var(--h4-size-mobile)] font-bold text-[var(--color-primary)]'>
                    {profile.name}
                  </h3>
                </div>

                <div>
                  <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-1)]'>
                    ইমেইল
                  </p>
                  <p className='text-[var(--font-size-lg)] text-[var(--color-text-primary)]'>
                    {profile.email}
                  </p>
                </div>

                <div>
                  <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-1)]'>
                    ভূমিকা
                  </p>
                  <Badge category='default' size='md' className='bg-blue-600'>
                    {profile.role === 'super_admin'
                      ? '🔐 সুপার এডমিন'
                      : '👤 এডমিন'}
                  </Badge>
                </div>

                <div className='pt-[var(--spacing-4)] border-t border-[var(--color-border)]'>
                  <Button
                    variant='primary'
                    size='md'
                    onClick={() => setEditing(true)}
                  >
                    সম্পাদনা করুন
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className='space-y-[var(--spacing-4)]'
              >
                <div>
                  <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
                    নাম
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
                  />
                </div>

                <div>
                  <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
                    ইমেইল
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
                  />
                </div>

                <div>
                  <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
                    নতুন পাসওয়ার্ড (ঐচ্ছিক)
                  </label>
                  <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
                  />
                </div>

                <div>
                  <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
                    পাসওয়ার্ড নিশ্চিত করুন
                  </label>
                  <input
                    type='password'
                    name='password_confirmation'
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
                  />
                </div>

                <div className='flex gap-[var(--spacing-3)] pt-[var(--spacing-4)]'>
                  <Button variant='primary' size='md' type='submit'>
                    সংরক্ষণ করুন
                  </Button>
                  <Button
                    variant='secondary'
                    size='md'
                    onClick={() => setEditing(false)}
                  >
                    বাতিল করুন
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>

        {/* Stats */}
        <div className='space-y-[var(--spacing-4)]'>
          <Card variant='outlined' padding='lg'>
            <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
              অ্যাকাউন্ট স্থিতি
            </p>
            <Badge
              category='default'
              size='md'
              className={profile.is_active ? 'bg-green-600' : 'bg-red-600'}
            >
              {profile.is_active ? '✅ সক্রিয়' : '❌ নিষ্ক্রিয়'}
            </Badge>
          </Card>

          <Card variant='outlined' padding='lg'>
            <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
              যুক্ত হয়েছে
            </p>
            <p className='text-[var(--font-size-base)] text-[var(--color-text-primary)]'>
              {new Date(profile.created_at).toLocaleDateString('bn-BD')}
            </p>
          </Card>

          <Card variant='outlined' padding='lg'>
            <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
              শেষ লগইন
            </p>
            <p className='text-[var(--font-size-base)] text-[var(--color-text-primary)]'>
              {profile.last_login_at
                ? new Date(profile.last_login_at).toLocaleDateString('bn-BD')
                : 'কখনো নয়'}
            </p>
          </Card>

          {profile.permissions && profile.permissions.length > 0 && (
            <Card variant='outlined' padding='lg'>
              <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
                অনুমতি ({profile.permissions.length})
              </p>
              <div className='space-y-[var(--spacing-1)]'>
                {profile.permissions.slice(0, 5).map(perm => (
                  <p
                    key={perm}
                    className='text-[var(--font-size-xs)] text-[var(--color-text-primary)]'
                  >
                    ✓ {perm}
                  </p>
                ))}
                {profile.permissions.length > 5 && (
                  <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]'>
                    +{profile.permissions.length - 5} more
                  </p>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </Container>
  )
}
