'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/lib/auth'

export default function LoginForm () {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [totpCode, setTotpCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [requires2fa, setRequires2fa] = useState(false)

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await AuthService.login(email, password, totpCode)

      if (response.requires_2fa) {
        setRequires2fa(true)
        setError('')
        return
      }

      if (response.user) {
        // Redirect to admin dashboard
        router.push('/admin/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md p-8'>
        <h1 className='text-3xl font-bold text-center mb-2 text-brand-primary'>
          খবরের কাগজ
        </h1>
        <p className='text-center text-brand-text-muted mb-8'>
          সম্পাদক প্যানেল
        </p>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {error && (
            <div className='bg-brand-error text-white p-4 rounded-lg'>
              {error}
            </div>
          )}

          {!requires2fa ? (
            <>
              <div>
                <label className='block text-sm font-semibold text-brand-text mb-2'>
                  ইমেইল
                </label>
                <input
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='your@email.com'
                  required
                  disabled={loading}
                  className='w-full px-4 py-2 border border-brand-border rounded-lg focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 disabled:opacity-50'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-brand-text mb-2'>
                  পাসওয়ার্ড
                </label>
                <input
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='••••••••'
                  required
                  disabled={loading}
                  className='w-full px-4 py-2 border border-brand-border rounded-lg focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 disabled:opacity-50'
                />
              </div>
            </>
          ) : (
            <div>
              <label className='block text-sm font-semibold text-brand-text mb-2'>
                দুই-ফ্যাক্টর কোড
              </label>
              <input
                type='text'
                value={totpCode}
                onChange={e => setTotpCode(e.target.value.slice(0, 6))}
                placeholder='000000'
                maxLength={6}
                required
                disabled={loading}
                className='w-full px-4 py-2 border border-brand-border rounded-lg focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 disabled:opacity-50 text-center text-2xl tracking-widest'
              />
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-brand-accent hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading
              ? 'লোড হচ্ছে...'
              : requires2fa
              ? 'যাচাই করুন'
              : 'লগইন করুন'}
          </button>
        </form>

        <div className='mt-8 pt-6 border-t border-brand-border'>
          <p className='text-center text-sm text-brand-text-muted mb-4'>
            পরীক্ষার জন্য অনুমানিক শংসাপত্র:
          </p>
          <div className='bg-gray-100 p-4 rounded-lg text-sm text-gray-700 space-y-2'>
            <div>
              <strong>ইমেইল:</strong> superadmin@newspaper.local
            </div>
            <div>
              <strong>পাসওয়ার্ড:</strong> password123
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
