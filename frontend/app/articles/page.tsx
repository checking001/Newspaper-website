'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import { PublicApiService, Article } from '@/lib/public-api'

export default function ArticlesPage () {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')

  const [articles, setArticles] = useState<Article[]>([])
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await PublicApiService.getArticles(page)
        setArticles(data.data || [])
        setPagination({
          current_page: data.current_page || 1,
          last_page: data.last_page || 1
        })
      } catch (error) {
        console.error('Failed to load articles:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [page])

  return (
    <main className='space-y-8'>
      <div>
        <h1 className='text-4xl font-bold text-brand-primary mb-2'>
          সর্বশেষ খবর
        </h1>
        <p className='text-gray-600'>বাংলাদেশ এবং বিশ্বের সর্বশেষ সংবাদ</p>
      </div>

      {loading ? (
        <div className='text-center py-12'>লোড হচ্ছে...</div>
      ) : articles.length === 0 ? (
        <div className='text-center py-12 text-gray-500'>
          কোনো খবর পাওয়া যায়নি
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            baseUrl='/articles'
          />
        </>
      )}
    </main>
  )
}
