'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import { PublicApiService, Article } from '@/lib/public-api'
import { formatDate } from '@/lib/utils'

export default function ArticlePage () {
  const params = useParams()
  const slug = params.slug as string

  const [article, setArticle] = useState<Article | null>(null)
  const [related, setRelated] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return

    const loadArticle = async () => {
      try {
        setLoading(true)
        const data = await PublicApiService.getArticleBySlug(slug)
        setArticle(data.article)
        setRelated(data.related || [])

        // Set page title dynamically
        if (data.article?.title) {
          document.title = `${data.article.title} | খবরের কাগজ`
        }
      } catch (err) {
        setError('খবর পাওয়া যায়নি')
        console.error('Failed to load article:', err)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  if (loading) {
    return (
      <div className='text-center py-12 text-lg font-medium'>লোড হচ্ছে...</div>
    )
  }

  if (error || !article) {
    return (
      <div className='text-center py-12 text-red-500 font-medium'>
        {error || 'খবর পাওয়া যায়নি'}
      </div>
    )
  }

  const tags = article.tags || []

  return (
    <main className='space-y-8 max-w-4xl mx-auto px-4 py-6'>
      {/* Article Header */}
      <article>
        {/* Category + Date */}
        <div className='flex gap-3 mb-4 flex-wrap items-center'>
          {article.category && (
            <Link
              href={`/categories/${article.category.slug}`}
              className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold hover:bg-blue-200 transition'
            >
              {article.category.name}
            </Link>
          )}
          <span className='text-gray-500 text-sm flex items-center'>
            {formatDate(article.published_at, 'long')}
          </span>
          {article.is_breaking && (
            <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold animate-pulse'>
              🔴 ব্রেকিং
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className='text-3xl md:text-5xl font-bold text-brand-primary mb-4 leading-tight'>
          {article.title}
        </h1>

        {/* Summary */}
        {article.summary && (
          <p className='text-xl text-gray-700 mb-6 italic border-l-4 border-brand-accent pl-4 py-1 bg-gray-50/50'>
            {article.summary}
          </p>
        )}

        {/* Featured Image */}
        {article.featured_image && (
          <div className='mb-8 relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-lg shadow-lg'>
            <Image
              src={article.featured_image}
              alt={article.featured_image_caption || article.title}
              fill
              className='object-cover'
              priority
            />
            {article.featured_image_caption && (
              <p className='text-sm text-gray-600 mt-2 italic text-center'>
                {article.featured_image_caption}
              </p>
            )}
          </div>
        )}

        {/* Author Info */}
        {article.author && (
          <div className='bg-gray-50 p-4 rounded-lg mb-8 flex items-center gap-4 border-l-4 border-brand-accent'>
            <div className='flex-1'>
              <Link
                href={`/authors/${article.author.slug}`}
                className='font-semibold text-blue-600 hover:underline'
              >
                লেখক: {article.author.name}
              </Link>
              <p className='text-sm text-gray-600'>
                {formatDate(article.published_at, 'long')}
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className='prose prose-lg max-w-none mb-8 text-brand-text leading-relaxed space-y-4'>
          {article.content?.split('\n\n').map((paragraph, index) => (
            <p key={index} className='text-lg'>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className='flex gap-2 flex-wrap mb-8 pt-6 border-t items-center'>
            <span className='font-semibold text-gray-700'>ট্যাগ:</span>
            {tags.map(tag => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className='px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition'
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className='pt-8 border-t-2 border-gray-300'>
          <h2 className='text-2xl md:text-3xl font-bold text-brand-primary mb-6'>
            সম্পর্কিত খবর
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {related.slice(0, 3).map(relatedArticle => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
