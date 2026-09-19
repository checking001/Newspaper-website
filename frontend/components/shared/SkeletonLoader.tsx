'use client'

import React from 'react'

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'heading' | 'image' | 'article'
  count?: number
  className?: string
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  count = 1,
  className = ''
}) => {
  const animationClass = 'animate-pulse'

  if (variant === 'text') {
    return (
      <div className={`space-y-[var(--spacing-2)] ${className}`}>
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-[var(--color-border)] rounded-[var(--radius-md)] ${animationClass}`}
          />
        ))}
      </div>
    )
  }

  if (variant === 'heading') {
    return (
      <div className={className}>
        <div
          className={`h-8 w-3/4 bg-[var(--color-border)] rounded-[var(--radius-md)] ${animationClass}`}
        />
      </div>
    )
  }

  if (variant === 'image') {
    return (
      <div
        className={`w-full aspect-video bg-[var(--color-border)] rounded-[var(--radius-lg)] ${animationClass} ${className}`}
      />
    )
  }

  if (variant === 'article') {
    return (
      <div className={`space-y-[var(--spacing-4)] ${className}`}>
        <div
          className={`w-full h-64 bg-[var(--color-border)] rounded-[var(--radius-lg)] ${animationClass}`}
        />
        <div className='space-y-[var(--spacing-2)]'>
          <div
            className={`h-6 w-3/4 bg-[var(--color-border)] rounded-[var(--radius-md)] ${animationClass}`}
          />
          <div
            className={`h-4 bg-[var(--color-border)] rounded-[var(--radius-md)] ${animationClass}`}
          />
          <div
            className={`h-4 w-5/6 bg-[var(--color-border)] rounded-[var(--radius-md)] ${animationClass}`}
          />
        </div>
      </div>
    )
  }

  // Card variant
  return (
    <div className={`space-y-[var(--spacing-4)] ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className='bg-[var(--color-bg-secondary)] rounded-[var(--radius-lg)] p-[var(--padding-md)] space-y-[var(--spacing-3)]'
        >
          <div
            className={`h-48 bg-[var(--color-border)] rounded-[var(--radius-md)] ${animationClass}`}
          />
          <div className='space-y-[var(--spacing-2)]'>
            <div
              className={`h-5 w-3/4 bg-[var(--color-border)] rounded-[var(--radius-md)] ${animationClass}`}
            />
            <div
              className={`h-4 bg-[var(--color-border)] rounded-[var(--radius-md)] ${animationClass}`}
            />
            <div
              className={`h-4 w-5/6 bg-[var(--color-border)] rounded-[var(--radius-md)] ${animationClass}`}
            />
          </div>
          <div className='flex gap-[var(--spacing-2)] pt-[var(--spacing-2)]'>
            <div
              className={`h-8 w-20 bg-[var(--color-border)] rounded-[var(--radius-md)] ${animationClass}`}
            />
            <div
              className={`h-8 w-20 bg-[var(--color-border)] rounded-[var(--radius-md)] ${animationClass}`}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
