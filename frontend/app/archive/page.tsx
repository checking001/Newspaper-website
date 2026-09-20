'use client'

import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  ArticleCard,
  DateRangeFilter,
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
  category: { name: string }
  author: { name: string }
  published_at: string
}

interface ApiResponse {
  data: Article[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ArchivePage () {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  useEffect(() => {
    const loadArchive = async () => {
      setIsLoading(true)
      try {
        let url = `${API_URL}/articles?limit=50&status=published&sort=published_at&order=desc`
        if (dateRange.start && dateRange.end) {
          url += `&start_date=${dateRange.start}&end_date=${dateRange.end}`
        }

        const res = await fetch(url)
        if (res.ok) {
          const data: ApiResponse = await res.json()
          setArticles(data.data || [])
        }
      } catch (err) {
        console.error('Archive load failed:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadArchive()
  }, [dateRange])

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      <Container maxWidth='2xl' padding='md' className='pt-[var(--margin-md)]'>
        <Breadcrumb
          items={[{ label: 'হোম', href: '/' }, { label: 'আর্কাইভ' }]}
        />
      </Container>

      <Container maxWidth='2xl' padding='md' className='mb-[var(--margin-xl)]'>
        <h1 className='text-[var(--h2-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--spacing-4)]'>
          📚 নিউজ আর্কাইভ
        </h1>
        <DateRangeFilter
          onApply={(start, end) => setDateRange({ start, end })}
        />
      </Container>

      <Container maxWidth='2xl' padding='md'>
        {isLoading ? (
          <LoadingSpinner text='আর্কাইভ লোড হচ্ছে...' />
        ) : articles.length > 0 ? (
          <Grid columns={2} gap='lg'>
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
        ) : (
          <EmptyState
            icon='📦'
            title='কোনো খবর নেই'
            description='নির্বাচিত সময়কালে কোনো খবর নেই।'
          />
        )}
      </Container>
    </main>
  )
}
