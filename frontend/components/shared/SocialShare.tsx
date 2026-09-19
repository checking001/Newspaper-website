import Link from 'next/link'
import { Article } from '@/lib/public-api'
import { formatDate } from '@/lib/utils'

interface Props {
  article: Article
  layout?: 'grid' | 'list' | 'featured'
}

export default function ArticleCard ({ article, layout = 'grid' }: Props) {
  // Category Link Guard Component
  const CategoryBadge = () => {
    if (!article?.category) {
      return <span className='text-xs font-bold text-gray-500'>সাধারণ</span>
    }

    if (article.category.slug) {
      return (
        <Link
          href={`/categories/${article.category.slug}`}
          className='text-xs font-bold text-blue-600 hover:underline relative z-10'
          onClick={e => e.stopPropagation()}
        >
          {article.category.name}
        </Link>
      )
    }

    return (
      <span className='text-xs font-bold text-gray-600'>
        {article.category.name || 'সাধারণ'}
      </span>
    )
  }

  // Author Link Guard Component
  const AuthorBadge = () => {
    if (!article?.author) return null

    if (article.author.slug) {
      return (
        <Link
          href={`/authors/${article.author.slug}`}
          className='text-sm text-blue-600 hover:underline relative z-10'
          onClick={e => e.stopPropagation()}
        >
          লেখক: {article.author.name}
        </Link>
      )
    }

    return (
      <span className='text-sm text-gray-600'>লেখক: {article.author.name}</span>
    )
  }

  if (layout === 'featured') {
    return (
      <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition relative group'>
        {article.featured_image && (
          <div className='relative h-64 bg-gray-200'>
            <img
              src={article.featured_image}
              alt={article.featured_image_caption || article.title}
              className='w-full h-full object-cover'
            />
            {article.is_breaking && (
              <div className='absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10'>
                🔴 ব্রেকিং
              </div>
            )}
          </div>
        )}
        <div className='p-6'>
          <div className='flex items-center gap-2 mb-3'>
            <CategoryBadge />
            <span className='text-gray-400 text-xs'>•</span>
            <span className='text-xs text-gray-500'>
              {formatDate(article.published_at, 'short')}
            </span>
          </div>

          <Link href={`/articles/${article.slug}`}>
            <h2 className='text-2xl font-bold text-brand-text mb-2 line-clamp-2 hover:text-blue-600 transition'>
              {article.title}
            </h2>
          </Link>

          <p className='text-gray-600 mb-4 line-clamp-2'>{article.summary}</p>

          <div className='flex items-center justify-between'>
            <AuthorBadge />
          </div>
        </div>
      </div>
    )
  }

  if (layout === 'list') {
    return (
      <div className='bg-white p-4 rounded-lg shadow hover:shadow-lg transition border-b relative group'>
        <div className='flex gap-4'>
          {article.featured_image && (
            <div className='flex-shrink-0 w-32 h-24 bg-gray-200 rounded'>
              <img
                src={article.featured_image}
                alt={article.title}
                className='w-full h-full object-cover rounded'
              />
            </div>
          )}
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <CategoryBadge />
              <span className='text-gray-400 text-xs'>•</span>
              <span className='text-xs text-gray-500'>
                {formatDate(article.published_at, 'short')}
              </span>
            </div>

            <Link href={`/articles/${article.slug}`}>
              <h3 className='text-lg font-bold text-brand-text mb-2 line-clamp-2 hover:text-blue-600 transition'>
                {article.title}
              </h3>
            </Link>

            <p className='text-gray-600 text-sm mb-2 line-clamp-2'>
              {article.summary}
            </p>

            <div className='text-sm text-blue-600'>
              <AuthorBadge />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid layout (default)
  return (
    <div className='bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative group'>
      {article.featured_image && (
        <div className='relative h-48 bg-gray-200'>
          <img
            src={article.featured_image}
            alt={article.title}
            className='w-full h-full object-cover'
          />
        </div>
      )}
      <div className='p-4'>
        <div className='flex items-center gap-2 mb-2'>
          <CategoryBadge />
          <span className='text-gray-400 text-xs'>•</span>
          <span className='text-xs text-gray-500'>
            {formatDate(article.published_at, 'short')}
          </span>
        </div>

        <Link href={`/articles/${article.slug}`}>
          <h3 className='text-lg font-bold text-brand-text mb-2 line-clamp-2 hover:text-blue-600 transition'>
            {article.title}
          </h3>
        </Link>

        <p className='text-gray-600 text-sm line-clamp-2'>{article.summary}</p>
      </div>
    </div>
  )
}
