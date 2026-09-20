'use client'

import React, { useEffect, useState } from 'react'
import {
  Container,
  Breadcrumb,
  Grid,
  ArticleCard,
  LoadingSpinner
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

const sportsSubcategories = [
  { label: 'সব খেলা', value: 'all' },
  { label: 'ক্রিকেট', value: 'cricket' },
  { label: 'ফুটবল', value: 'football' },
  { label: 'টেনিস', value: 'tennis' },
  { label: 'ব্যাডমিন্টন', value: 'badminton' }
]

export default function SportsPage () {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchSports = async () => {
      try {
        let url =
          'http://localhost:8000/api/articles?category=sports&limit=20&status=published'
        if (selectedCategory !== 'all') {
          url += `&search=${selectedCategory}`
        }
        const res = await fetch(url)
        const data = await res.json()
        setArticles(data.data || [])
      } catch (error) {
        console.error('Error fetching sports articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSports()
  }, [selectedCategory])

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      <Container maxWidth='2xl' padding='md' className='pt-[var(--margin-md)]'>
        <Breadcrumb items={[{ label: 'হোম', href: '/' }, { label: 'খেলা' }]} />
      </Container>

      <Container maxWidth='2xl' padding='md'>
        <div className='mb-[var(--margin-lg)]'>
          <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--spacing-4)]'>
            ⚽ খেলাধুলা
          </h1>
          <p className='text-[var(--font-size-lg)] text-[var(--color-text-secondary)]'>
            দেশি-বিদেশি সব খেলার সর্বশেষ খবর এবং আপডেট
          </p>
        </div>

        <div className='mb-[var(--margin-lg)] flex flex-wrap gap-[var(--spacing-2)]'>
          {sportsSubcategories.map(category => (
            <button
              key={category.value}
              type='button'
              onClick={() => setSelectedCategory(category.value)}
              className={`rounded-full px-[var(--padding-md)] py-[var(--spacing-2)] font-semibold transition-colors ${
                selectedCategory === category.value
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner fullScreen={false} />
        ) : articles.length > 0 ? (
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
        ) : (
          <div className='text-center py-[var(--spacing-8)]'>
            <p className='text-[var(--font-size-lg)] text-[var(--color-text-secondary)]'>
              কোনো খেলার খবর পাওয়া যায়নি
            </p>
          </div>
        )}
      </Container>
    </main>
  )
}
