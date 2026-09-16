'use client'

import { useEffect, useState } from 'react'
import { API_URL } from '@/lib/constants'

interface Stats {
  totalArticles: number
  publishedArticles: number
  draftArticles: number
  totalCategories: number
  totalAuthors: number
}

export default function DashboardPage () {
  const [stats, setStats] = useState<Stats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalCategories: 0,
    totalAuthors: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [articles, categories, authors] = await Promise.all([
          fetch(`${API_URL}/articles`, { credentials: 'include' }).then(r =>
            r.json()
          ),
          fetch(`${API_URL}/categories`, { credentials: 'include' }).then(r =>
            r.json()
          ),
          fetch(`${API_URL}/authors`, { credentials: 'include' }).then(r =>
            r.json()
          )
        ])

        const published =
          articles.data?.filter((a: any) => a.status === 'published').length ||
          0
        const draft =
          articles.data?.filter((a: any) => a.status === 'draft').length || 0

        setStats({
          totalArticles: articles.data?.length || 0,
          publishedArticles: published,
          draftArticles: draft,
          totalCategories: categories.length || 0,
          totalAuthors: authors.data?.length || 0
        })
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold text-brand-primary'>ড্যাশবোর্ড</h1>

      {loading ? (
        <div className='text-center py-12'>লোড হচ্ছে...</div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
          {/* Total Articles */}
          <div className='bg-white p-6 rounded-lg shadow border-l-4 border-brand-accent'>
            <div className='text-3xl font-bold text-brand-accent'>
              {stats.totalArticles}
            </div>
            <div className='text-gray-600'>মোট খবর</div>
          </div>

          {/* Published */}
          <div className='bg-white p-6 rounded-lg shadow border-l-4 border-brand-success'>
            <div className='text-3xl font-bold text-brand-success'>
              {stats.publishedArticles}
            </div>
            <div className='text-gray-600'>প্রকাশিত</div>
          </div>

          {/* Draft */}
          <div className='bg-white p-6 rounded-lg shadow border-l-4 border-brand-warning'>
            <div className='text-3xl font-bold text-brand-warning'>
              {stats.draftArticles}
            </div>
            <div className='text-gray-600'>ড্রাফট</div>
          </div>

          {/* Categories */}
          <div className='bg-white p-6 rounded-lg shadow border-l-4 border-blue-500'>
            <div className='text-3xl font-bold text-blue-500'>
              {stats.totalCategories}
            </div>
            <div className='text-gray-600'>ক্যাটাগরি</div>
          </div>

          {/* Authors */}
          <div className='bg-white p-6 rounded-lg shadow border-l-4 border-purple-500'>
            <div className='text-3xl font-bold text-purple-500'>
              {stats.totalAuthors}
            </div>
            <div className='text-gray-600'>লেখক</div>
          </div>
        </div>
      )}
    </div>
  )
}
