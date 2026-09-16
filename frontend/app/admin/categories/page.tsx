'use client'

import { useEffect, useState } from 'react'
import { API_URL } from '@/lib/constants'

interface Category {
  id: number
  name: string
  slug: string
  is_active: boolean
  _count?: { articles: number }
}

export default function CategoriesPage () {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', parent_id: '' })

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories () {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        credentials: 'include'
      })
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      })

      if (response.ok) {
        setForm({ name: '', parent_id: '' })
        await loadCategories()
      }
    } catch (error) {
      console.error('Failed to create category:', error)
    }
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold text-brand-primary'>
        ক্যাটাগরি পরিচালনা
      </h1>

      {/* Create Form */}
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-lg shadow space-y-4'
      >
        <h2 className='text-lg font-semibold'>নতুন ক্যাটাগরি যোগ করুন</h2>
        <div className='flex gap-4'>
          <input
            type='text'
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder='ক্যাটাগরির নাম'
            required
            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg'
          />
          <button
            type='submit'
            className='px-6 py-2 bg-brand-accent text-white rounded-lg hover:bg-blue-700'
          >
            যোগ করুন
          </button>
        </div>
      </form>

      {/* Categories List */}
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        {loading ? (
          <div className='p-8 text-center'>লোড হচ্ছে...</div>
        ) : categories.length === 0 ? (
          <div className='p-8 text-center text-gray-500'>
            কোনো ক্যাটাগরি নেই
          </div>
        ) : (
          <table className='w-full'>
            <thead className='bg-gray-50 border-b'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-semibold'>
                  নাম
                </th>
                <th className='px-6 py-3 text-left text-sm font-semibold'>
                  স্লাগ
                </th>
                <th className='px-6 py-3 text-left text-sm font-semibold'>
                  খবর সংখ্যা
                </th>
                <th className='px-6 py-3 text-left text-sm font-semibold'>
                  অ্যাকশন
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id} className='border-b hover:bg-gray-50'>
                  <td className='px-6 py-4 font-semibold'>{cat.name}</td>
                  <td className='px-6 py-4 text-gray-600'>{cat.slug}</td>
                  <td className='px-6 py-4'>{cat._count?.articles || 0}</td>
                  <td className='px-6 py-4'>
                    <button className='text-blue-600 hover:underline mr-4'>
                      সম্পাদনা
                    </button>
                    <button className='text-red-600 hover:underline'>
                      মুছুন
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
