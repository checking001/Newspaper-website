'use client'

import React from 'react'
import Link from 'next/link'

interface TrendingItem {
  id: number
  title: string
  slug: string
  views: number
  rank: number
}

interface TrendingBadgeProps {
  items: TrendingItem[]
  title?: string
  limit?: number
  className?: string
}

export const TrendingBadge: React.FC<TrendingBadgeProps> = ({
  items,
  title = '🔥 ট্রেন্ডিং',
  limit = 5,
  className = ''
}) => {
  const trendingItems = items.slice(0, limit)

  return (
    <div
      className={`bg-gradient-to-b from-[var(--color-secondary)] to-[var(--color-secondary-light)] text-white rounded-[var(--radius-lg)] p-[var(--padding-md)] ${className}`}
    >
      <h3 className='text-[var(--h5-size-mobile)] font-bold mb-[var(--spacing-3)] text-center'>
        {title}
      </h3>

      <div className='space-y-[var(--spacing-2)]'>
        {trendingItems.map(item => (
          <Link
            key={item.id}
            href={`/articles/${item.slug}`}
            className='group flex items-start gap-[var(--spacing-2)] p-[var(--spacing-2)] rounded-[var(--radius-md)] hover:bg-white hover:bg-opacity-10 transition-colors'
          >
            {/* Rank Badge */}
            <div className='flex-shrink-0 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold text-[var(--font-size-sm)]'>
              {item.rank}
            </div>

            {/* Title */}
            <div className='flex-1 min-w-0'>
              <p className='text-[var(--font-size-sm)] font-semibold group-hover:underline line-clamp-2'>
                {item.title}
              </p>
              <p className='text-[var(--meta-size)] opacity-75'>
                👁️ {item.views.toLocaleString('bn-BD')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TrendingBadge
