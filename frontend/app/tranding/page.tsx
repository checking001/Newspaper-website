'use client'

import React, { useEffect, useState } from 'react'
import {
  Container,
  Breadcrumb,
  Grid,
  ArticleCard,
  LoadingSpinner,
  Badge
} from '@/components/shared'

interface TrendingArticle {
  id: number
  title: string
  slug: string
  excerpt: string
  featured_image: string
  category: { id: number; name: string; slug: string }
  author: { id: number; name: string }
  published_at: string
  views: number
  position: number
}

export default function TrendingPage () {
  const [articles, setArticles] = useState<TrendingArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          'http://localhost:8000/api/articles?sort=views&order=desc&limit=30&status=published'
        )
        const data = await res.json()
        setArticles(
          (data.data || []).map((article: any, index: number) => ({
            ...article,
            position: index + 1
          }))
        )
      } catch (error) {
        console.error('Error fetching trending articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrending()
  }, [])

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      <Container maxWidth='2xl' padding='md' className='pt-[var(--margin-md)]'>
        <Breadcrumb
          items={[{ label: 'হোম', href: '/' }, { label: 'ট্রেন্ডিং' }]}
        />
      </Container>

      <Container maxWidth='2xl' padding='md'>
        <div className='mb-[var(--margin-lg)]'>
          <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--spacing-4)]'>
            🔥 জনপ্রিয় খবর
          </h1>
          <p className='text-[var(--font-size-lg)] text-[var(--color-text-secondary)]'>
            সবচেয়ে বেশি পড়া হওয়া খবরগুলো
          </p>
        </div>

        {loading ? (
          <LoadingSpinner fullScreen={false} />
        ) : articles.length > 0 ? (
          <Grid columns={2} gap='lg' className='mb-[var(--margin-xl)]'>
            {articles.map(article => (
              <div key={article.id} className='relative'>
                <Badge
                  category='default'
                  size='md'
                  className='absolute top-[var(--spacing-2)] left-[var(--spacing-2)] z-10'
                >
                  #{article.position}
                </Badge>
                <ArticleCard
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
              </div>
            ))}
          </Grid>
        ) : (
          <div className='text-center py-[var(--spacing-8)]'>
            <p className='text-[var(--font-size-lg)] text-[var(--color-text-secondary)]'>
              কোনো খবর পাওয়া যায়নি
            </p>
          </div>
        )}
      </Container>
    </main>
  )
}
