'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import {
  Container,
  Breadcrumb,
  Grid,
  ArticleCard,
  CategoryFilter,
  Pagination,
  LoadingSpinner,
  SkeletonLoader,
  EmptyState,
  Section
} from '@/components/shared'

interface Article {
  id: number
  title: string
  slug: string
  excerpt: string
  featured_image: string
  category: { id: number; name: string; slug: string }
  author: { id: number; name: string }
  published_at: string
  views: number
}

interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

interface ApiResponse {
  data: Article[]
  pagination: {
    current_page: number
    last_page: number
    total: number
    per_page: number
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

function CategoryPageContent () {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const page = searchParams.get('page') || '1'

  const [articles, setArticles] = useState<Article[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 12
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch articles by category
        const articlesRes = await fetch(
          `${API_URL}/articles?category=${slug}&page=${page}&limit=12&status=published`
        )
        if (!articlesRes.ok) throw new Error('Failed to fetch articles')

        const articlesData: ApiResponse = await articlesRes.json()
        setArticles(articlesData.data || [])
        setPagination(articlesData.pagination)

        // Fetch all categories for filter
        try {
          const categoriesRes = await fetch(`${API_URL}/categories`)
          if (categoriesRes.ok) {
            const categoriesData = await categoriesRes.json()
            setCategories(categoriesData.data || [])

            // Find current category
            const currentCat = categoriesData.data?.find(
              (c: Category) => c.slug === slug
            )
            setCategory(currentCat || null)
          }
        } catch (err) {
          console.error('Error fetching categories:', err)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load articles')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [slug, page])

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[var(--color-bg-primary)]'>
        <LoadingSpinner fullScreen text='খবর লোড হচ্ছে...' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-[var(--font-size-lg)] text-[var(--color-error)] mb-[var(--spacing-4)]'>
            ❌ {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='px-[var(--padding-md)] py-[var(--spacing-2)] bg-[var(--color-primary)] text-white rounded-[var(--radius-md)]'
          >
            পুনরায় চেষ্টা করুন
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      {/* Breadcrumb */}
      <Container maxWidth='2xl' padding='md' className='pt-[var(--margin-md)]'>
        <Breadcrumb
          items={[
            { label: 'হোম', href: '/' },
            { label: category?.name || 'বিভাগ' }
          ]}
        />
      </Container>

      {/* Category Header */}
      <Container maxWidth='2xl' padding='md' className='mb-[var(--margin-xl)]'>
        <div className='text-center'>
          <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
            {category?.name || 'বিভাগ'}
          </h1>
          {category?.description && (
            <p className='text-[var(--font-size-lg)] text-[var(--color-text-secondary)] max-w-2xl mx-auto'>
              {category.description}
            </p>
          )}
          <div className='mt-[var(--spacing-4)] text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
            মোট {pagination?.total || 0} টি খবর
          </div>
        </div>
      </Container>

      {/* Main Content */}
      <Container maxWidth='2xl' padding='md'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-[var(--spacing-6)]'>
          {/* Sidebar: Category Filter */}
          <aside className='lg:col-span-1'>
            <div className='sticky top-20'>
              <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-3)]'>
                বিভাগ সমূহ
              </h3>
              <CategoryFilter
                categories={categories}
                activeCategory={slug}
                variant='list'
              />
            </div>
          </aside>

          {/* Main: Articles */}
          <div className='lg:col-span-3'>
            {articles.length > 0 ? (
              <>
                {/* Articles Grid */}
                <Grid columns={2} gap='lg' className='mb-[var(--margin-xl)]'>
                  {articles.map(article => (
                    <ArticleCard
                      key={article.id}
                      id={article.id}
                      title={article.title}
                      slug={article.slug}
                      excerpt={article.excerpt}
                      featuredImage={article.featured_image}
                      category={article.category.name}
                      author={article.author.name}
                      publishedAt={article.published_at}
                      variant='secondary'
                    />
                  ))}
                </Grid>

                {/* Pagination */}
                {pagination?.last_page && pagination.last_page > 1 && (
                  <Pagination
                    currentPage={pagination.current_page || 1}
                    totalPages={pagination.last_page}
                    baseUrl={`/category/${slug}`}
                  />
                )}
              </>
            ) : (
              <EmptyState
                icon='📰'
                title='কোনো খবর নেই'
                description={`এই বিভাগে এখনো কোনো খবর যোগ করা হয়নি।`}
                actionLabel='হোম পেজে ফিরুন'
                onAction={() => (window.location.href = '/')}
              />
            )}
          </div>
        </div>
      </Container>

      {/* Related Categories Section */}
      {categories.length > 1 && (
        <Container
          maxWidth='2xl'
          padding='md'
          className='mt-[var(--margin-xl)]'
        >
          <Section
            title='অন্যান্য বিভাগ'
            backgroundColor='secondary'
            padding='lg'
          >
            <CategoryFilter
              categories={categories}
              activeCategory={slug}
              variant='pills'
            />
          </Section>
        </Container>
      )}
    </main>
  )
}

export default function CategoryPage () {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen text='লোড হচ্ছে...' />}>
      <CategoryPageContent />
    </Suspense>
  )
}
