'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import { PublicApiService, Author, Article } from '@/lib/public-api'

export default function AuthorPage () {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const page = parseInt(searchParams.get('page') || '1')

  const [author, setAuthor] = useState<Author | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAuthor = async () => {
      try {
        const data = await PublicApiService.getAuthorBySlug(slug, page)
        setAuthor(data.author)
        setArticles(data.articles.data || [])
        setPagination({
          current_page: data.articles.current_page || 1,
          last_page: data.articles.last_page || 1
        })
      } catch (error) {
        console.error('Failed to load author:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAuthor()
  }, [slug, page])

  if (loading) {
    return <div className='text-center py-12'>লোড হচ্ছে...</div>
  }

  if (!author) {
    return (
      <div className='text-center py-12 text-gray-500'>লেখক পাওয়া যায়নি</div>
    )
  }

  return (
    <main className='space-y-8'>
      {/* Author Info */}
      <div className='bg-white p-8 rounded-lg shadow'>
        <div className='flex gap-6 items-start'>
          {author.profile_image && (
            <img
              src={author.profile_image}
              alt={author.name}
              className='w-32 h-32 rounded-full object-cover'
            />
          )}
          <div className='flex-1'>
            <h1 className='text-4xl font-bold text-brand-primary mb-2'>
              {author.name}
            </h1>
            <p className='text-lg text-gray-600 mb-2'>{author.designation}</p>
            <p className='text-gray-700'>{author.bio}</p>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div>
        <h2 className='text-3xl font-bold text-brand-primary mb-6'>
          {author.name} এর খবর ({articles.length})
        </h2>

        {articles.length === 0 ? (
          <div className='text-center py-12 text-gray-500'>
            এই লেখকের কোনো খবর নেই
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
              baseUrl={`/authors/${slug}`}
            />
          </>
        )}
      </div>
    </main>
  )
}
