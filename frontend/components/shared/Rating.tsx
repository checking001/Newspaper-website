'use client'

import React, { useState } from 'react'

interface RatingProps {
  value?: number
  onChange?: (rating: number) => void
  readOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  readOnly = false,
  size = 'md',
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState(0)
  const displayRating = hoverRating || value

  const sizeStyles = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9'
  }

  const gapStyle = {
    sm: 'gap-[var(--spacing-1)]',
    md: 'gap-[var(--spacing-2)]',
    lg: 'gap-[var(--spacing-3)]'
  }

  return (
    <div className={`flex items-center ${gapStyle[size]} ${className}`}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => !readOnly && onChange?.(star)}
          onMouseEnter={() => !readOnly && setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          disabled={readOnly}
          className={`${sizeStyles[size]} cursor-pointer transition-transform hover:scale-110 disabled:cursor-default`}
          aria-label={`Rate ${star} stars`}
        >
          <span
            className={
              star <= displayRating ? 'text-yellow-400' : 'text-gray-300'
            }
          >
            ★
          </span>
        </button>
      ))}
      {value > 0 && (
        <span className='text-[var(--font-size-sm)] text-[var(--color-text-secondary)] ml-[var(--spacing-2)]'>
          {value}/5
        </span>
      )}
    </div>
  )
}

export default Rating
