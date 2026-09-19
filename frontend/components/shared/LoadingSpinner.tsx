'use client'

import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'লোড হচ্ছে...',
  fullScreen = false,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const spinnerContent = (
    <div className='flex flex-col items-center justify-center gap-[var(--spacing-4)]'>
      <div
        className={`${sizeStyles[size]} border-4 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin`}
      ></div>
      {text && (
        <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)]'>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-[var(--color-bg-primary)] bg-opacity-80 z-50 ${className}`}
      >
        {spinnerContent}
      </div>
    )
  }

  return (
    <div
      className={`flex items-center justify-center py-[var(--padding-lg)] ${className}`}
    >
      {spinnerContent}
    </div>
  )
}

export default LoadingSpinner
