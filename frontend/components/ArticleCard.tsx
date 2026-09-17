import Link from 'next/link'
import { Article } from '@/lib/public-api'
import { formatDate, truncate } from '@/lib/utils'

interface Props {
  article: Article
  layout?: 'grid' | 'list' | 'featured'
}

export default function ArticleCard ({ article, layout = 'grid' }: Props) {
  if (layout === 'featured') {
    return (
      <Link href={`/articles/${article.slug}`}>
        <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer'>
          {article.featured_image && (
            <div className='relative h-64 bg-gray-200'>
              <img
                src={article.featured_image}
                alt={article.featured_image_caption || article.title}
                className='w-full h-full object-cover'
              />
              {article.is_breaking && (
                <div className='absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold'>
                  🔴 ব্রেকিং
                </div>
              )}
            </div>
          )}
          <div className='p-6'>
            <div className='flex gap-2 mb-3'>
              <Link
                href={`/categories/${article.category.slug}`}
                className='text-xs font-bold text-blue-600 hover:underline'
              >
                {article.category.name}
              </Link>
              <span className='text-gray-400 text-xs'>•</span>
              <span className='text-xs text-gray-500'>
                {formatDate(article.published_at, 'short')}
              </span>
            </div>
            <h2 className='text-2xl font-bold text-brand-text mb-2 line-clamp-2'>
              {article.title}
            </h2>
            <p className='text-gray-600 mb-4 line-clamp-2'>{article.summary}</p>
            <div className='flex items-center justify-between'>
              <Link
                href={`/authors/${article.author.slug}`}
                className='text-sm text-blue-600 hover:underline'
              >
                লেখক: {article.author.name}
              </Link>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (layout === 'list') {
    return (
      <Link href={`/articles/${article.slug}`}>
        <div className='bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer border-b'>
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
              <div className='flex gap-2 mb-2'>
                <Link
                  href={`/categories/${article.category.slug}`}
                  className='text-xs font-bold text-blue-600 hover:underline'
                >
                  {article.category.name}
                </Link>
                <span className='text-gray-400 text-xs'>•</span>
                <span className='text-xs text-gray-500'>
                  {formatDate(article.published_at, 'short')}
                </span>
              </div>
              <h3 className='text-lg font-bold text-brand-text mb-2 line-clamp-2'>
                {article.title}
              </h3>
              <p className='text-gray-600 text-sm mb-2 line-clamp-2'>
                {article.summary}
              </p>
              <span className='text-sm text-blue-600'>
                {article.author.name}
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid layout (default)
  return (
    <Link href={`/articles/${article.slug}`}>
      <div className='bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden'>
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
          <div className='flex gap-2 mb-2'>
            <Link
              href={`/categories/${article.category.slug}`}
              className='text-xs font-bold text-blue-600 hover:underline'
            >
              {article.category.name}
            </Link>
            <span className='text-xs text-gray-500'>
              {formatDate(article.published_at, 'short')}
            </span>
          </div>
          <h3 className='text-lg font-bold text-brand-text mb-2 line-clamp-2'>
            {article.title}
          </h3>
          <p className='text-gray-600 text-sm line-clamp-2'>
            {article.summary}
          </p>
        </div>
      </div>
    </Link>
  )
}
