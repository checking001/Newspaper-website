'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Container,
  Grid,
  ArticleCard,
  Pagination,
  LoadingSpinner,
  EmptyState,
  Breadcrumb
} from '@/components/shared'

interface Article {
  id: number
  title: string
  slug: string
  excerpt: string
  featured_image: string
  category: { name: string; slug: string }
  author: { name: string }
  published_at: string
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

export default function LatestPage () {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || '1'

  const [articles, setArticles] = useState<Article[]>([])
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 12
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(
          `${API_URL}/articles?page=${page}&limit=12&status=published&sort=published_at&order=desc`
        )
        if (!res.ok) throw new Error('Failed to fetch')
        const data: ApiResponse = await res.json()
        setArticles(data.data || [])
        setPagination(
          data.pagination || {
            current_page: 1,
            last_page: 1,
            total: 0,
            per_page: 12
          }
        )
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load articles')
      } finally {
        setIsLoading(false)
      }
    }

    loadArticles()
  }, [page])

  if (isLoading) {
    return <LoadingSpinner fullScreen text='খবর লোড হচ্ছে...' />
  }

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      <Container maxWidth='2xl' padding='md' className='pt-[var(--margin-md)]'>
        <Breadcrumb
          items={[{ label: 'হোম', href: '/' }, { label: 'সর্বশেষ খবর' }]}
        />
      </Container>

      <Container maxWidth='2xl' padding='md' className='mb-[var(--margin-xl)]'>
        <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
          📰 সর্বশেষ খবর
        </h1>
        <p className='text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
          মোট {pagination.total || 0} টি খবর
        </p>
      </Container>

      <Container maxWidth='2xl' padding='md'>
        {error ? (
          <EmptyState
            icon='❌'
            title='ত্রুটি'
            description={error}
            actionLabel='পুনরায় চেষ্টা করুন'
            onAction={() => window.location.reload()}
          />
        ) : articles.length > 0 ? (
          <>
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

            {pagination.last_page > 1 && (
              <Pagination
                currentPage={pagination.current_page}
                totalPages={pagination.last_page}
                baseUrl='/articles'
              />
            )}
          </>
        ) : (
          <EmptyState
            icon='📰'
            title='কোনো খবর নেই'
            description='এখনো কোনো খবর প্রকাশিত হয়নি।'
          />
        )}
      </Container>
    </main>
  )
}
