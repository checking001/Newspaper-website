'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import {
  Container,
  Grid,
  ArticleCard,
  LoadingSpinner,
  EmptyState,
  Breadcrumb
} from '@/components/shared'

interface Author {
  id: number
  name: string
  slug: string
  bio?: string
  profile_image?: string
  email?: string
}

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

export default function AuthorPage () {
  const params = useParams()
  const slug = params.slug as string

  const [author, setAuthor] = useState<Author | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const loadData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`${API_URL}/authors/${slug}`)
        if (!res.ok) throw new Error('Author not found')
        const data = await res.json()
        setAuthor(data.data)

        const articlesRes = await fetch(
          `${API_URL}/articles?author=${slug}&limit=12&status=published`
        )
        if (articlesRes.ok) {
          const articlesData: ApiResponse = await articlesRes.json()
          setArticles(articlesData.data || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [slug])

  if (isLoading) return <LoadingSpinner fullScreen text='লেখক লোড হচ্ছে...' />

  if (error || !author) {
    return (
      <Container maxWidth='2xl' padding='md' className='py-[var(--padding-xl)]'>
        <EmptyState
          icon='❌'
          title='লেখক খুঁজে পাওয়া যায়নি'
          description={error || ''}
          actionLabel='হোম পেজে ফিরুন'
          onAction={() => (window.location.href = '/')}
        />
      </Container>
    )
  }

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      <Container maxWidth='2xl' padding='md' className='pt-[var(--margin-md)]'>
        <Breadcrumb
          items={[
            { label: 'হোম', href: '/' },
            { label: 'লেখক' },
            { label: author.name }
          ]}
        />
      </Container>

      <Container maxWidth='2xl' padding='md' className='mb-[var(--margin-xl)]'>
        <div className='bg-[var(--color-bg-secondary)] rounded-[var(--radius-lg)] p-[var(--padding-lg)]'>
          <div className='flex flex-col md:flex-row gap-[var(--spacing-6)] items-start'>
            {author.profile_image && (
              <div className='relative w-32 h-32 flex-shrink-0 rounded-full overflow-hidden'>
                <Image
                  src={author.profile_image}
                  alt={author.name}
                  fill
                  className='object-cover'
                />
              </div>
            )}
            <div className='flex-1'>
              <h1 className='text-[var(--h2-size-mobile)] md:text-[var(--h1-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
                {author.name}
              </h1>
              {author.bio && (
                <p className='text-[var(--font-size-lg)] text-[var(--color-text-secondary)] mb-[var(--spacing-2)]'>
                  {author.bio}
                </p>
              )}
              <div className='text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
                {articles.length} টি নিবন্ধ প্রকাশিত
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container maxWidth='2xl' padding='md'>
        {articles.length > 0 ? (
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
            icon='📝'
            title='কোনো নিবন্ধ নেই'
            description='এই লেখক এখনো কোনো নিবন্ধ প্রকাশ করেননি।'
          />
        )}
      </Container>
    </main>
  )
}
