'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import SchemaScript from '@/components/SchemaScript'
import { PublicApiService, Article } from '@/lib/public-api'
import { formatDate } from '@/lib/utils'
import { generateArticleSchema } from '@/lib/seo-utils'

export default function ArticlePage () {
  const params = useParams()
  const slug = params.slug as string

  const [article, setArticle] = useState<Article | null>(null)
  const [related, setRelated] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [schema, setSchema] = useState<any>(null)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await PublicApiService.getArticleBySlug(slug)
        setArticle(data.article)
        setRelated(data.related || [])

        // Generate and set schema
        const articleSchema = generateArticleSchema(data.article)
        setSchema(articleSchema)

        // Set page title dynamically
        if (data.article) {
          document.title = `${data.article.title} | খবরের কাগজ`
        }
      } catch (error) {
        setError('খবর পাওয়া যায়নি')
        console.error('Failed to load article:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  if (loading) {
    return <div className='text-center py-12'>লোড হচ্ছে...</div>
  }

  if (error || !article) {
    return <div className='text-center py-12 text-gray-500'>{error}</div>
  }

  return (
    <>
      {/* JSON-LD Schema */}
      {schema && <SchemaScript schema={schema} />}

      <main className='space-y-8 max-w-4xl mx-auto'>
        {/* Article Header */}
        <article>
          {/* Category + Date */}
          <div className='flex gap-3 mb-4 flex-wrap'>
            <Link
              href={`/categories/${article.category.slug}`}
              className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold hover:bg-blue-200'
            >
              {article.category.name}
            </Link>
            <span className='text-gray-500 text-sm flex items-center'>
              {formatDate(article.published_at, 'long')}
            </span>
            {article.is_breaking && (
              <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold'>
                🔴 ব্রেকিং
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className='text-4xl md:text-5xl font-bold text-brand-primary mb-4'>
            {article.title}
          </h1>

          {/* Summary */}
          <p className='text-xl text-gray-700 mb-6 italic border-l-4 border-brand-accent pl-4'>
            {article.summary}
          </p>

          {/* Featured Image */}
          {article.featured_image && (
            <div className='mb-8'>
              <img
                src={article.featured_image}
                alt={article.featured_image_caption || article.title}
                className='w-full rounded-lg shadow-lg'
              />
              {article.featured_image_caption && (
                <p className='text-sm text-gray-600 mt-2 italic'>
                  {article.featured_image_caption}
                </p>
              )}
            </div>
          )}

          {/* Author Info */}
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

          {/* Content */}
          <div className='prose prose-lg max-w-none mb-8 text-brand-text leading-relaxed space-y-4'>
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className='text-lg'>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className='flex gap-2 flex-wrap mb-8 pt-6 border-t'>
              <span className='font-semibold text-gray-700'>ট্যাগ:</span>
              {article.tags.map(tag => (
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
            <h2 className='text-3xl font-bold text-brand-primary mb-6'>
              সম্পর্কিত খবর
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {related.slice(0, 3).map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}
