'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface BreakingNews {
  id: number
  title: string
  slug: string
}

interface BreakingNewsBannerProps {
  news: BreakingNews[]
  className?: string
}

export const BreakingNewsBanner: React.FC<BreakingNewsBannerProps> = ({
  news,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedNews, setDisplayedNews] = useState(news[0] || null)

  useEffect(() => {
    if (news.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % news.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [news.length])

  useEffect(() => {
    if (news.length > 0) {
      setDisplayedNews(news[currentIndex])
    }
  }, [currentIndex, news])

  if (!displayedNews || news.length === 0) return null

  return (
    <div
      className={`bg-[var(--color-secondary)] text-white py-[var(--spacing-3)] px-[var(--padding-md)] overflow-hidden ${className}`}
    >
      <div className='max-w-[1280px] mx-auto'>
        <div className='flex items-center gap-[var(--spacing-4)]'>
          {/* Breaking News Badge */}
          <div className='flex-shrink-0 flex items-center gap-[var(--spacing-2)]'>
            <span className='inline-block w-3 h-3 bg-white rounded-full animate-pulse'></span>
            <span className='font-bold text-[var(--font-size-sm)] md:text-[var(--font-size-base)] whitespace-nowrap'>
              🔴 ব্রেকিং নিউজ
            </span>
          </div>

          {/* Ticker Content */}
          <div className='flex-1 overflow-hidden'>
            <div className='flex items-center gap-[var(--spacing-2)]'>
              <span className='text-[var(--font-size-xs)] md:text-[var(--font-size-sm)] text-gray-200'>
                {currentIndex + 1} / {news.length}
              </span>

              <Link
                href={`/articles/${displayedNews.slug}`}
                className='text-[var(--font-size-base)] md:text-[var(--font-size-lg)] font-semibold hover:underline transition-all whitespace-nowrap overflow-hidden text-ellipsis'
              >
                {displayedNews.title}
              </Link>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className='flex-shrink-0 flex items-center gap-[var(--spacing-2)]'>
            <button
              onClick={() =>
                setCurrentIndex(prev => (prev - 1 + news.length) % news.length)
              }
              className='p-[var(--spacing-1)] hover:bg-white hover:bg-opacity-20 rounded-[var(--radius-md)] transition-colors'
              aria-label='Previous news'
            >
              ←
            </button>
            <button
              onClick={() => setCurrentIndex(prev => (prev + 1) % news.length)}
              className='p-[var(--spacing-1)] hover:bg-white hover:bg-opacity-20 rounded-[var(--radius-md)] transition-colors'
              aria-label='Next news'
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreakingNewsBanner
