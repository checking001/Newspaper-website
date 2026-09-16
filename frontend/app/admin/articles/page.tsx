'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { API_URL } from '@/lib/constants'

interface Article {
  id: number
  title: string
  slug: string
  status: string
  published_at: string
  category: { name: string }
  author: { name: string }
}

export default function ArticlesPage () {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const url = new URL(`${API_URL}/articles`)
        if (filter) url.searchParams.set('status', filter)

        const response = await fetch(url, { credentials: 'include' })
        const data = await response.json()
        setArticles(data.data || [])
      } catch (error) {
        console.error('Failed to load articles:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [filter])

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-brand-primary'>খবর পরিচালনা</h1>
        <Link
          href='/admin/articles/create'
          className='px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-blue-700 transition'
        >
          নতুন খবর
        </Link>
      </div>

      {/* Filter */}
      <div className='bg-white p-4 rounded-lg shadow'>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg'
        >
          <option value=''>সব স্ট্যাটাস</option>
          <option value='draft'>ড্রাফট</option>
          <option value='published'>প্রকাশিত</option>
          <option value='scheduled'>নির্ধারিত</option>
        </select>
      </div>

      {/* Articles Table */}
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        {loading ? (
          <div className='p-8 text-center'>লোড হচ্ছে...</div>
        ) : articles.length === 0 ? (
          <div className='p-8 text-center text-gray-500'>
            কোনো খবর পাওয়া যায়নি
          </div>
        ) : (
          <table className='w-full'>
            <thead className='bg-gray-50 border-b'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-semibold'>
                  শিরোনাম
                </th>
                <th className='px-6 py-3 text-left text-sm font-semibold'>
                  লেখক
                </th>
                <th className='px-6 py-3 text-left text-sm font-semibold'>
                  ক্যাটাগরি
                </th>
                <th className='px-6 py-3 text-left text-sm font-semibold'>
                  স্ট্যাটাস
                </th>
                <th className='px-6 py-3 text-left text-sm font-semibold'>
                  অ্যাকশন
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article.id} className='border-b hover:bg-gray-50'>
                  <td className='px-6 py-4'>{article.title}</td>
                  <td className='px-6 py-4'>{article.author.name}</td>
                  <td className='px-6 py-4'>{article.category.name}</td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        article.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {article.status === 'published' ? 'প্রকাশিত' : 'ড্রাফট'}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className='text-blue-600 hover:underline'
                    >
                      সম্পাদনা
                    </Link>
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
