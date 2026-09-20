'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Container,
  Grid,
  ArticleCard,
  SearchBox,
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

export default function SearchPage () {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    if (!query) {
      setIsLoading(false)
      return
    }

    const loadResults = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(
          `${API_URL}/articles?search=${encodeURIComponent(
            query
          )}&limit=20&status=published`
        )
        if (res.ok) {
          const data: ApiResponse = await res.json()
          setArticles(data.data || [])
        }
      } catch (err) {
        console.error('Search failed:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadResults()
  }, [query])

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery)
    const params = new URLSearchParams()
    params.append('q', newQuery)
    window.history.pushState(null, '', `/search?${params.toString()}`)
  }

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      <Container maxWidth='2xl' padding='md' className='pt-[var(--margin-md)]'>
        <Breadcrumb items={[{ label: 'হোম', href: '/' }, { label: 'খোঁজ' }]} />
      </Container>

      <Container maxWidth='2xl' padding='md' className='mb-[var(--margin-xl)]'>
        <h1 className='text-[var(--h2-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--spacing-4)]'>
          🔍 খোঁজ ফলাফল
        </h1>
        <SearchBox onSearch={handleSearch} placeholder='খবর খুঁজুন...' />
      </Container>

      <Container maxWidth='2xl' padding='md'>
        {isLoading ? (
          <LoadingSpinner text='খোঁজ হচ্ছে...' />
        ) : query ? (
          articles.length > 0 ? (
            <>
              <p className='text-[var(--meta-size)] text-[var(--color-text-tertiary)] mb-[var(--margin-lg)]'>
                "{query}" এর জন্য {articles.length} টি ফলাফল পাওয়া গেছে
              </p>
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
            </>
          ) : (
            <EmptyState
              icon='🔍'
              title='কোনো ফলাফল পাওয়া যায়নি'
              description={`"${query}" এর জন্য কোনো খবর খুঁজে পাওয়া যায়নি।`}
            />
          )
        ) : (
          <EmptyState
            icon='🔍'
            title='খোঁজ করুন'
            description='উপরে সার্চ বক্সে একটি প্রশ্ন লিখুন।'
          />
        )}
      </Container>
    </main>
  )
}
