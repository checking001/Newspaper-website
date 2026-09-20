'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Badge from './Badge'

interface ArticleCardProps {
  id: number
  title: string
  slug: string
  excerpt?: string
  featuredImage?: string
  category?: string
  author?: string
  publishedAt?: string
  variant?: 'featured' | 'secondary' | 'compact' | 'list'
  className?: string
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  slug,
  excerpt,
  featuredImage,
  category = 'সংবাদ',
  author,
  publishedAt,
  variant = 'secondary',
  className = ''
}) => {
  const formatDate = (date: string | undefined) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Featured Variant - Large
  if (variant === 'featured') {
    return (
      <Link href={`/articles/${slug}`}>
        <article className={`group cursor-pointer ${className}`}>
          {featuredImage && (
            <div className='relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-[var(--radius-lg)] mb-[var(--spacing-4)]'>
              <Image
                src={featuredImage}
                alt={title}
                fill
                priority
                className='object-cover group-hover:scale-105 transition-transform duration-300'
              />
            </div>
          )}
          <Badge
            category={category as any}
            size='md'
            className='mb-[var(--spacing-2)]'
          >
            {category}
          </Badge>
          <h3 className='text-[var(--h2-size-mobile)] md:text-[var(--h2-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)] group-hover:text-[var(--color-accent)] transition-colors'>
            {title}
          </h3>
          {excerpt && (
            <p className='text-[var(--body-size)] text-[var(--color-text-secondary)] mb-[var(--spacing-3)] line-clamp-2'>
              {excerpt}
            </p>
          )}
          <div className='flex items-center justify-between text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
            {author && <span>{author}</span>}
            {publishedAt && <time>{formatDate(publishedAt)}</time>}
          </div>
        </article>
      </Link>
    )
  }

  // Secondary Variant - Medium
  if (variant === 'secondary') {
    return (
      <Link href={`/articles/${slug}`}>
        <article
          className={`group cursor-pointer flex gap-[var(--spacing-4)] ${className}`}
        >
          {featuredImage && (
            <div className='relative w-[200px] h-[150px] flex-shrink-0 overflow-hidden rounded-[var(--radius-lg)]'>
              <Image
                src={featuredImage}
                alt={title}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-300'
              />
            </div>
          )}
          <div className='flex-1'>
            <Badge
              category={category as any}
              size='sm'
              className='mb-[var(--spacing-2)]'
            >
              {category}
            </Badge>
            <h4 className='text-[var(--h3-size-mobile)] md:text-[var(--h3-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2'>
              {title}
            </h4>
            {excerpt && (
              <p className='text-[var(--font-size-sm)] md:text-[var(--font-size-base)] text-[var(--color-text-secondary)] mb-[var(--spacing-2)] line-clamp-2 md:line-clamp-3'>
                {excerpt}
              </p>
            )}
            <div className='flex items-center gap-[var(--spacing-4)] text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
              {author && <span>{author}</span>}
              {publishedAt && <time>{formatDate(publishedAt)}</time>}
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Compact Variant - Small
  if (variant === 'compact') {
    return (
      <Link href={`/articles/${slug}`}>
        <article
          className={`group cursor-pointer flex gap-[var(--spacing-2)] ${className}`}
        >
          {featuredImage && (
            <div className='relative w-[80px] h-[80px] flex-shrink-0 overflow-hidden rounded-[var(--radius-md)]'>
              <Image
                src={featuredImage}
                alt={title}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-300'
              />
            </div>
          )}
          <div className='flex-1'>
            <h5 className='text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-1)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2'>
              {title}
            </h5>
            {publishedAt && (
              <time className='text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
                {formatDate(publishedAt)}
              </time>
            )}
          </div>
        </article>
      </Link>
    )
  }
  // List Variant
  return (
    <Link href={`/articles/${slug}`}>
      <article
        className={`group cursor-pointer py-[var(--padding-md)] border-b border-[var(--color-border)] last:border-0 ${className}`}
      >
        <div className='flex items-start justify-between gap-[var(--spacing-3)]'>
          <div className='flex-1'>
            <Badge
              category={category as any}
              size='sm'
              className='mb-[var(--spacing-1)]'
            >
              {category}
            </Badge>
            <h5 className='text-[var(--font-size-lg)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2'>
              {title}
            </h5>
            {excerpt && (
              <p className='text-[var(--font-size-xs)] md:text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)] line-clamp-2'>
                {excerpt?.substring(0, 80)}...
              </p>
            )}
            <time className='text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
              {formatDate(publishedAt)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ArticleCard
