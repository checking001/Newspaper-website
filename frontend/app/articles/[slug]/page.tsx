'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Container,
  Breadcrumb,
  Badge,
  SocialShare,
  ViewCounter,
  Comment,
  RelatedArticles,
  LoadingSpinner,
  SkeletonLoader
} from '@/components/shared'

interface Article {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  category: { id: number; name: string; slug: string }
  author: { id: number; name: string; slug: string }
  published_at: string
  updated_at: string
  views: number
  is_featured: boolean
  is_breaking: boolean
  tags?: Array<{ id: number; name: string; slug: string }>
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ArticlePage () {
  const params = useParams()
  const slug = params.slug as string

  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const loadArticle = async () => {
      try {
        setIsLoading(true)

        // Fetch article by slug
        const res = await fetch(`${API_URL}/articles/${slug}`)
        if (!res.ok) {
          throw new Error('Article not found')
        }

        const data = await res.json()
        const articleData = data.data || data
        setArticle(articleData)

        // Fetch related articles
        if (articleData.category?.slug) {
          try {
            const relatedRes = await fetch(
              `${API_URL}/articles?category=${articleData.category.slug}&limit=3&status=published`
            )
            if (relatedRes.ok) {
              const relatedData = await relatedRes.json()
              setRelatedArticles(relatedData.data || [])
            }
          } catch (err) {
            console.error('Failed to fetch related articles:', err)
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article')
      } finally {
        setIsLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[var(--color-bg-primary)]'>
        <LoadingSpinner fullScreen text='নিবন্ধ লোড হচ্ছে...' />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className='min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-[var(--h2-size-mobile)] font-bold text-[var(--color-error)] mb-[var(--spacing-4)]'>
            ❌ {error || 'নিবন্ধ খুঁজে পাওয়া যায়নি'}
          </h1>
          <Link
            href='/'
            className='inline-block px-[var(--padding-md)] py-[var(--spacing-2)] bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-primary-dark)]'
          >
            ← হোম পেজে ফিরুন
          </Link>
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
            ...(article.category
              ? [
                  {
                    label: article.category.name,
                    href: `/categories/${article.category.slug}`
                  }
                ]
              : []),
            { label: article.title }
          ]}
        />
      </Container>

      {/* Article */}
      <Container maxWidth='2xl' padding='md'>
        <article className='max-w-4xl mx-auto'>
          {/* Header */}
          <header className='mb-[var(--margin-lg)]'>
            <Badge
              category={article.category.slug as any}
              size='md'
              className='mb-[var(--spacing-2)]'
            >
              {article.category.name}
            </Badge>

            <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] lg:text-[var(--h1-size-desktop)] font-bold text-[var(--color-primary)] mb-[var(--spacing-4)] leading-tight'>
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className='flex flex-wrap items-center gap-[var(--spacing-4)] pb-[var(--spacing-4)] border-b border-[var(--color-border)]'>
              <Link
                href={`/author/${article.author.slug}`}
                className='font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors'
              >
                {article.author.name}
              </Link>
              <time className='text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
                {formatDate(article.published_at)}
              </time>
              <ViewCounter
                articleId={article.id}
                initialViews={article.views}
                showLabel={true}
              />
            </div>
          </header>

          {/* Featured Image */}
          {article.featured_image && (
            <div className='relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-[var(--margin-lg)] rounded-[var(--radius-lg)] overflow-hidden'>
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                priority
                className='object-cover'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px'
              />
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <div className='text-[var(--font-size-lg)] font-semibold text-[var(--color-text-secondary)] mb-[var(--margin-lg)] p-[var(--padding-md)] bg-[var(--color-bg-secondary)] rounded-[var(--radius-lg)] italic border-l-4 border-[var(--color-primary)]'>
              "{article.excerpt}"
            </div>
          )}

          {/* Content */}
          <div className='prose prose-lg max-w-none mb-[var(--margin-lg)]'>
            <div
              className='text-[var(--font-size-lg)] text-[var(--color-text-primary)] leading-[1.8] space-y-[var(--margin-md)]'
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className='mb-[var(--margin-lg)] pb-[var(--margin-lg)] border-b border-[var(--color-border)]'>
              <p className='text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-2)]'>
                ট্যাগ:
              </p>
              <div className='flex flex-wrap gap-[var(--spacing-2)]'>
                {article.tags.map(tag => (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    className='px-[var(--padding-sm)] py-[var(--spacing-1)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--color-primary)] hover:text-white transition-colors text-[var(--font-size-sm)] font-medium'
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Social Share */}
          <div className='mb-[var(--margin-lg)] pb-[var(--margin-lg)] border-b border-[var(--color-border)]'>
            <SocialShare
              url={typeof window !== 'undefined' ? window.location.href : ''}
              title={article.title}
            />
          </div>

          {/* About Author */}
          <div className='bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-[var(--radius-lg)] p-[var(--padding-md)] mb-[var(--margin-lg)]'>
            <h3 className='text-[var(--h5-size-mobile)] font-bold mb-[var(--spacing-2)]'>
              ✍️ লেখক সম্পর্কে
            </h3>
            <p className='text-[var(--font-size-base)] mb-[var(--spacing-2)] opacity-90'>
              {article.author.name} একজন অভিজ্ঞ সাংবাদিক এবং সম্পাদক।
            </p>
            <Link
              href={`/author/${article.author.slug}`}
              className='inline-block text-white font-semibold hover:underline'
            >
              প্রোফাইল দেখুন →
            </Link>
          </div>
        </article>
      </Container>

      {/* Comments */}
      <Container maxWidth='2xl' padding='md' className='mb-[var(--margin-xl)]'>
        <Comment comments={[]} articleId={article.id} />
      </Container>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Container
          maxWidth='2xl'
          padding='md'
          className='mb-[var(--margin-xl)]'
        >
          <RelatedArticles articles={relatedArticles} title='সম্পর্কিত খবর' />
        </Container>
      )}
    </main>
  )
}
