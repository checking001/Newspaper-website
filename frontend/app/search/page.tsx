'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import { PublicApiService, Article } from '@/lib/public-api'

export default function SearchPage () {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1')

  const [articles, setArticles] = useState<Article[]>([])
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) {
      setLoading(false)
      return
    }

    const search = async () => {
      try {
        const data = await PublicApiService.searchArticles(query, page)
        setArticles(data.data || [])
        setPagination({
          current_page: data.current_page || 1,
          last_page: data.last_page || 1
        })
      } catch (error) {
        console.error('Search failed:', error)
      } finally {
        setLoading(false)
      }
    }

    search()
  }, [query, page])

  return (
    <main className='space-y-8 max-w-4xl mx-auto'>
      <div>
        <h1 className='text-4xl font-bold text-brand-primary mb-2'>
          অনুসন্ধান ফলাফল
        </h1>
        <p className='text-gray-600'>
          "{query}" এর জন্য {articles.length} টি ফলাফল পাওয়া গেছে
        </p>
      </div>

      {!query ? (
        <div className='text-center py-12 text-gray-500'>
          অনুসন্ধান করতে উপরে কীওয়ার্ড প্রবেশ করুন
        </div>
      ) : loading ? (
        <div className='text-center py-12'>খোঁজা হচ্ছে...</div>
      ) : articles.length === 0 ? (
        <div className='text-center py-12 text-gray-500'>
          কোনো খবর পাওয়া যায়নি। অন্য কীওয়ার্ড চেষ্টা করুন।
        </div>
      ) : (
        <>
          <div className='space-y-4'>
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} layout='list' />
            ))}
          </div>

          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            baseUrl={`/search?q=${encodeURIComponent(query)}`}
          />
        </>
      )}
    </main>
  )
}
