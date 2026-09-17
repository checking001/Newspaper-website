'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import { PublicApiService, Category, Article } from '@/lib/public-api'

export default function CategoryPage () {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const page = parseInt(searchParams.get('page') || '1')

  const [category, setCategory] = useState<Category | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const loadCategory = async () => {
      try {
        setLoading(true)
        const data = await PublicApiService.getCategoryBySlug(slug, page)
        setCategory(data.category)
        setArticles(data.articles?.data || [])
        setPagination({
          current_page: data.articles?.current_page || 1,
          last_page: data.articles?.last_page || 1
        })
      } catch (error) {
        console.error('Failed to load category:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategory()
  }, [slug, page])

  if (loading) {
    return (
      <div className='text-center py-12 text-lg font-medium'>লোড হচ্ছে...</div>
    )
  }

  if (!category) {
    return (
      <div className='text-center py-12 text-gray-500 font-medium'>
        ক্যাটাগরি পাওয়া যায়নি
      </div>
    )
  }

  return (
    <main className='space-y-8 max-w-7xl mx-auto px-4 py-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl md:text-4xl font-bold text-brand-primary mb-2'>
          {category.name}
        </h1>
        {category.description && (
          <p className='text-gray-600 leading-relaxed'>
            {category.description}
          </p>
        )}
      </div>

      {/* Subcategories */}
      {category.children && category.children.length > 0 && (
        <div className='flex gap-2 flex-wrap'>
          {category.children.map(child => (
            <Link
              key={child.id}
              href={`/categories/${child.slug}`}
              className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-brand-accent hover:text-white transition font-medium text-sm'
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}

      {/* Articles */}
      {articles.length === 0 ? (
        <div className='text-center py-12 text-gray-500'>
          এই ক্যাটাগরিতে কোনো খবর নেই
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
            baseUrl={`/categories/${slug}`}
          />
        </>
      )}
    </main>
  )
}
