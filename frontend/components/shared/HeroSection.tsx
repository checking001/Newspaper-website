'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Badge from './Badge'
import Button from './Button'

interface HeroSectionProps {
  title: string
  excerpt: string
  featuredImage: string
  category: string
  author: string
  publishedAt: string
  articleSlug: string
  className?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  excerpt,
  featuredImage,
  category,
  author,
  publishedAt,
  articleSlug,
  className = ''
}) => {
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

  return (
    <section
      className={`relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-[var(--radius-xl)] ${className}`}
    >
      {/* Background Image */}
      <Image
        src={featuredImage}
        alt={title}
        fill
        priority
        className='object-cover'
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent'></div>

      {/* Content */}
      <div className='absolute inset-0 flex flex-col justify-end p-[var(--padding-md)] md:p-[var(--padding-lg)]'>
        <div className='max-w-[600px]'>
          <Badge
            category={category as any}
            size='md'
            className='mb-[var(--spacing-3)]'
          >
            {category}
          </Badge>

          <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] lg:text-[var(--h1-size-desktop)] font-bold text-white mb-[var(--spacing-3)] leading-tight'>
            {title}
          </h1>

          <p className='text-[var(--body-size)] text-gray-200 mb-[var(--spacing-4)] line-clamp-2'>
            {excerpt}
          </p>

          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[var(--spacing-4)]'>
            <div className='text-[var(--meta-size)] text-gray-300'>
              <div>{author}</div>
              <time>{formatDate(publishedAt)}</time>
            </div>

            <Link href={`/articles/${articleSlug}`}>
              <Button variant='accent' size='md'>
                সম্পূর্ণ খবর পড়ুন →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
