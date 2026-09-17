'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import { PublicApiService, Tag, Article } from '@/lib/public-api'

export default function TagPage () {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const page = parseInt(searchParams.get('page') || '1')

  const [tag, setTag] = useState<Tag | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTag = async () => {
      try {
        const data = await PublicApiService.getTagBySlug(slug, page)
        setTag(data.tag)
        setArticles(data.articles.data || [])
        setPagination({
          current_page: data.articles.current_page || 1,
          last_page: data.articles.last_page || 1
        })
      } catch (error) {
        console.error('Failed to load tag:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTag()
  }, [slug, page])

  if (loading) {
    return <div className='text-center py-12'>লোড হচ্ছে...</div>
  }

  if (!tag) {
    return (
      <div className='text-center py-12 text-gray-500'>ট্যাগ পাওয়া যায়নি</div>
    )
  }

  return (
    <main className='space-y-8'>
      <div>
        <h1 className='text-4xl font-bold text-brand-primary mb-2'>
          #{tag.name}
        </h1>
        <p className='text-gray-600'>{articles.length} টি খবর</p>
      </div>

      {articles.length === 0 ? (
        <div className='text-center py-12 text-gray-500'>
          এই ট্যাগে কোনো খবর নেই
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
            baseUrl={`/tags/${slug}`}
          />
        </>
      )}
    </main>
  )
}
