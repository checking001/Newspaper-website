'use client'

import React, { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'warning'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  isLoading?: boolean
  fullWidth?: boolean
}

export default function Button ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClass =
    'font-bold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px] md:min-h-auto'

  const sizeClass = {
    sm: 'px-[var(--spacing-3)] py-[var(--spacing-1)] text-[var(--font-size-xs)] md:text-[var(--font-size-sm)]',
    md: 'px-[var(--spacing-4)] py-[var(--spacing-2)] text-[var(--font-size-sm)] md:text-[var(--font-size-base)]',
    lg: 'px-[var(--spacing-6)] py-[var(--spacing-3)] text-[var(--font-size-base)] md:text-[var(--font-size-lg)]'
  }[size]

  const variantClass = {
    primary:
      'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] focus:ring-[var(--color-primary)]',
    secondary:
      'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)] focus:ring-[var(--color-primary)]',
    accent:
      'bg-[var(--color-accent)] text-white hover:opacity-90 focus:ring-[var(--color-accent)]',
    ghost:
      'bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)] focus:ring-[var(--color-primary)]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    warning:
      'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500'
  }[variant]

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseClass} ${sizeClass} ${variantClass} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {isLoading ? (
        <span className='flex items-center justify-center gap-[var(--spacing-2)]'>
          <span className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin'></span>
          লোডিং...
        </span>
      ) : (
        children
      )}
    </button>
  )
}
