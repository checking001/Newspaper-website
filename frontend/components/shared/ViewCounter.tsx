'use client'

import React, { useEffect, useState } from 'react'

interface ViewCounterProps {
  articleId: number
  initialViews?: number
  showLabel?: boolean
  variant?: 'compact' | 'detailed'
  className?: string
}

export const ViewCounter: React.FC<ViewCounterProps> = ({
  articleId,
  initialViews = 0,
  showLabel = true,
  variant = 'compact',
  className = ''
}) => {
  const [views, setViews] = useState(initialViews)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const recordView = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}/view`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          }
        )

        if (response.ok) {
          const data = await response.json()
          setViews(data.views || initialViews)
        }
      } catch (error) {
        console.error('Failed to record view:', error)
      } finally {
        setIsLoading(false)
      }
    }

    recordView()
  }, [articleId, initialViews])

  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  if (isLoading) {
    return (
      <span
        className={`text-[var(--meta-size)] text-[var(--color-text-tertiary)] ${className}`}
      >
        ...
      </span>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className={`flex items-center gap-[var(--spacing-2)] ${className}`}>
        <span className='text-lg'>👁️</span>
        <div>
          {showLabel && (
            <p className='text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
              মোট দেখা হয়েছে
            </p>
          )}
          <p className='text-[var(--font-size-base)] font-bold text-[var(--color-primary)]'>
            {formatViews(views)}
          </p>
        </div>
      </div>
    )
  }

  // Compact variant
  return (
    <span
      className={`inline-flex items-center gap-[var(--spacing-1)] text-[var(--meta-size)] text-[var(--color-text-tertiary)] ${className}`}
    >
      <span>👁️</span>
      <span>
        {formatViews(views)}
        {showLabel && ' দেখা হয়েছে'}
      </span>
    </span>
  )
}

export default ViewCounter
