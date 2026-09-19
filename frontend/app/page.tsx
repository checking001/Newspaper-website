'use client'

import React, { useEffect, useState } from 'react'
import {
  HeroSection,
  Section,
  Grid,
  ArticleCard,
  Container,
  BreakingNewsBanner,
  TrendingBadge,
  NewsletterSignup,
  LoadingSpinner,
  SkeletonLoader,
  RelatedArticles
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
  is_featured: boolean
  is_breaking: boolean
}

interface ApiResponse {
  data: Article[]
  pagination: {
    current_page: number
    total: number
    per_page: number
  }
}

interface SectionData {
  title: string
  href: string
  articles: Article[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getHomepageData () {
  try {
    const response = await fetch(`${API_URL}/homepage`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) throw new Error('Failed to fetch')
    return await response.json()
  } catch (error) {
    console.error('Error fetching homepage:', error)
    return null
  }
}

async function getArticlesByCategory (categorySlug: string, limit: number = 6) {
  try {
    const response = await fetch(
      `${API_URL}/articles?category=${categorySlug}&limit=${limit}&status=published`,
      {
        next: { revalidate: 300 }
      }
    )

    if (!response.ok) throw new Error('Failed to fetch')
    const data: ApiResponse = await response.json()
    return data.data || []
  } catch (error) {
    console.error(`Error fetching ${categorySlug} articles:`, error)
    return []
  }
}

async function getTrendingArticles (limit: number = 5) {
  try {
    const response = await fetch(
      `${API_URL}/articles?sort=views&order=desc&limit=${limit}&status=published`,
      {
        next: { revalidate: 300 }
      }
    )

    if (!response.ok) throw new Error('Failed to fetch')
    const data: ApiResponse = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching trending articles:', error)
    return []
  }
}

async function getBreakingNews (limit: number = 3) {
  try {
    const response = await fetch(
      `${API_URL}/articles?is_breaking=true&limit=${limit}&status=published`,
      {
        next: { revalidate: 60 }
      }
    )

    if (!response.ok) throw new Error('Failed to fetch')
    const data: ApiResponse = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching breaking news:', error)
    return []
  }
}

export default function HomePage () {
  const [homeData, setHomeData] = useState<Article[] | null>(null)
  const [sections, setSections] = useState<SectionData[]>([])
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([])
  const [breakingNews, setBreakingNews] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)

      // Load all data in parallel
      const [home, trending, breaking, politics, economy, sports, tech] =
        await Promise.all([
          getHomepageData(),
          getTrendingArticles(5),
          getBreakingNews(3),
          getArticlesByCategory('politics', 6),
          getArticlesByCategory('economy', 6),
          getArticlesByCategory('sports', 6),
          getArticlesByCategory('tech', 6)
        ])

      setHomeData(home?.data || [])
      setTrendingArticles(trending)
      setBreakingNews(breaking)

      setSections([
        { title: '🏛️ রাজনীতি', href: '/category/politics', articles: politics },
        {
          title: '💰 অর্থনীতি',
          href: '/category/economy',
          articles: economy
        },
        { title: '⚽ খেলা', href: '/category/sports', articles: sports },
        { title: '💻 প্রযুক্তি', href: '/category/tech', articles: tech }
      ])

      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[var(--color-bg-primary)]'>
        <LoadingSpinner fullScreen text='খবর লোড হচ্ছে...' />
      </div>
    )
  }

  // Featured article (first article)
  const featuredArticle = homeData?.[0]

  // Regular articles (after featured)
  const regularArticles = homeData?.slice(1, 13) || []

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      {/* Breaking News Banner */}
      {breakingNews.length > 0 && (
        <BreakingNewsBanner
          news={breakingNews.map(article => ({
            id: article.id,
            title: article.title,
            slug: article.slug
          }))}
          className='sticky top-0 z-30'
        />
      )}

      {/* Hero Section with Featured Article */}
      <Container maxWidth='2xl' padding='md' className='mt-[var(--margin-lg)]'>
        {featuredArticle && (
          <HeroSection
            title={featuredArticle.title}
            excerpt={featuredArticle.excerpt}
            featuredImage={featuredArticle.featured_image}
            category={featuredArticle.category.name}
            author={featuredArticle.author.name}
            publishedAt={featuredArticle.published_at}
            articleSlug={featuredArticle.slug}
            className='mb-[var(--margin-xl)]'
          />
        )}
      </Container>

      {/* Main Content Area with Sidebar */}
      <Container maxWidth='2xl' padding='md'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-[var(--spacing-6)]'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-[var(--margin-xl)]'>
            {/* Latest News Section */}
            <Section
              title='📰 সর্বশেষ খবর'
              href='/latest'
              backgroundColor='secondary'
              padding='lg'
            >
              {regularArticles.length > 0 ? (
                <Grid columns={2} gap='lg'>
                  {regularArticles.map(article => (
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
                <SkeletonLoader variant='article' count={4} />
              )}
            </Section>

            {/* Category Sections */}
            {sections.map(section => (
              <Section
                key={section.href}
                title={section.title}
                href={section.href}
                backgroundColor={
                  sections.indexOf(section) % 2 === 0 ? 'secondary' : 'none'
                }
                padding='lg'
              >
                {section.articles.length > 0 ? (
                  <Grid columns={3} gap='lg'>
                    {section.articles.slice(0, 3).map(article => (
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
                  <SkeletonLoader variant='card' count={3} />
                )}
              </Section>
            ))}

            {/* Newsletter Signup */}
            <NewsletterSignup className='mt-[var(--margin-xl)]' />
          </div>

          {/* Sidebar */}
          <aside className='space-y-[var(--spacing-6)]'>
            {/* Trending Articles */}
            <div className='sticky top-20'>
              {trendingArticles.length > 0 ? (
                <TrendingBadge
                  items={trendingArticles.map((article, index) => ({
                    id: article.id,
                    title: article.title,
                    slug: article.slug,
                    views: article.views,
                    rank: index + 1
                  }))}
                  title='🔥 ট্রেন্ডিং'
                  limit={5}
                />
              ) : (
                <SkeletonLoader variant='card' />
              )}

              {/* Advertisement Placeholder */}
              <div className='mt-[var(--spacing-6)] bg-[var(--color-bg-secondary)] rounded-[var(--radius-lg)] p-[var(--padding-md)] text-center'>
                <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)]'>
                  বিজ্ঞাপন স্থান
                </p>
                <div className='w-full h-[300px] bg-[var(--color-border)] rounded-[var(--radius-md)] mt-[var(--spacing-2)] flex items-center justify-center'>
                  <span className='text-4xl'>📺</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* More News Button */}
      <Container
        maxWidth='2xl'
        padding='md'
        className='text-center py-[var(--padding-lg)]'
      >
        <a
          href='/articles'
          className='inline-block px-[var(--padding-lg)] py-[var(--spacing-3)] bg-[var(--color-primary)] text-white font-bold rounded-[var(--radius-lg)] hover:bg-[var(--color-primary-dark)] transition-colors'
        >
          আরও খবর দেখুন →
        </a>
      </Container>
    </main>
  )
}
