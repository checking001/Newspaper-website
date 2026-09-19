'use client'

import React from 'react'
import Button from './Button'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-[var(--padding-xl)] text-center ${className}`}
    >
      <span className='text-6xl mb-[var(--spacing-4)]'>{icon}</span>

      <h3 className='text-[var(--h4-size-mobile)] md:text-[var(--h3-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
        {title}
      </h3>

      {description && (
        <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)] mb-[var(--spacing-4)] max-w-[400px]'>
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <Button variant='primary' onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
