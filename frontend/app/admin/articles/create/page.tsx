'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { API_URL } from '@/lib/constants'

interface Category {
  id: number
  name: string
}

interface Author {
  id: number
  name: string
}

export default function CreateArticlePage () {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    category_id: '',
    author_id: '',
    status: 'draft',
    seo_title: '',
    seo_description: ''
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catsRes, authsRes] = await Promise.all([
          fetch(`${API_URL}/categories`, { credentials: 'include' }),
          fetch(`${API_URL}/authors`, { credentials: 'include' })
        ])

        const cats = await catsRes.json()
        const auths = await authsRes.json()

        setCategories(cats)
        setAuthors(auths.data || [])
      } catch (error) {
        console.error('Failed to load data:', error)
      }
    }

    loadData()
  }, [])

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      })

      if (!response.ok) {
        throw new Error('Failed to create article')
      }

      router.push('/admin/articles')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-4xl space-y-6'>
      <h1 className='text-3xl font-bold text-brand-primary'>
        নতুন খবর তৈরি করুন
      </h1>

      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow space-y-6'
      >
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg'>
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label className='block text-sm font-semibold mb-2'>শিরোনাম *</label>
          <input
            type='text'
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-accent'
            placeholder='খবরের শিরোনাম'
          />
        </div>

        {/* Summary */}
        <div>
          <label className='block text-sm font-semibold mb-2'>
            সংক্ষিপ্ত বিবরণ *
          </label>
          <textarea
            value={form.summary}
            onChange={e => setForm({ ...form, summary: e.target.value })}
            required
            rows={3}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-accent'
            placeholder='খবরের সংক্ষিপ্ত বর্ণনা'
          />
        </div>

        {/* Content */}
        <div>
          <label className='block text-sm font-semibold mb-2'>
            বিষয়বস্তু *
          </label>
          <textarea
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            required
            rows={8}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-accent font-mono text-sm'
            placeholder='খবরের সম্পূর্ণ বিষয়বস্তু'
          />
        </div>

        {/* Category & Author */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-semibold mb-2'>
              ক্যাটাগরি *
            </label>
            <select
              value={form.category_id}
              onChange={e => setForm({ ...form, category_id: e.target.value })}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-accent'
            >
              <option value=''>নির্বাচন করুন</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2'>লেখক *</label>
            <select
              value={form.author_id}
              onChange={e => setForm({ ...form, author_id: e.target.value })}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-accent'
            >
              <option value=''>নির্বাচন করুন</option>
              {authors.map(auth => (
                <option key={auth.id} value={auth.id}>
                  {auth.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className='block text-sm font-semibold mb-2'>স্ট্যাটাস</label>
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-accent'
          >
            <option value='draft'>ড্রাফট</option>
            <option value='published'>প্রকাশিত</option>
            <option value='scheduled'>নির্ধারিত</option>
          </select>
        </div>

        {/* SEO */}
        <div className='border-t pt-6'>
          <h3 className='text-lg font-semibold mb-4'>এসইও সেটিংস</h3>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-semibold mb-2'>
                এসইও টাইটেল
              </label>
              <input
                type='text'
                value={form.seo_title}
                onChange={e => setForm({ ...form, seo_title: e.target.value })}
                maxLength={60}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-accent'
                placeholder='সার্চ ইঞ্জিনের জন্য টাইটেল (৬০ অক্ষর)'
              />
              <p className='text-sm text-gray-500 mt-1'>
                {form.seo_title.length}/60
              </p>
            </div>

            <div>
              <label className='block text-sm font-semibold mb-2'>
                মেটা ডেসক্রিপশন
              </label>
              <textarea
                value={form.seo_description}
                onChange={e =>
                  setForm({ ...form, seo_description: e.target.value })
                }
                maxLength={160}
                rows={2}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-accent'
                placeholder='সার্চ ফলাফলের জন্য বর্ণনা (১৬০ অক্ষর)'
              />
              <p className='text-sm text-gray-500 mt-1'>
                {form.seo_description.length}/160
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className='flex gap-4'>
          <button
            type='submit'
            disabled={loading}
            className='px-6 py-2 bg-brand-accent text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50'
          >
            {loading ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
          </button>
          <button
            type='button'
            onClick={() => router.back()}
            className='px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition'
          >
            বাতিল করুন
          </button>
        </div>
      </form>
    </div>
  )
}
