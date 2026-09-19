'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  isLoading?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-dark)]',
    secondary:
      'bg-[var(--color-secondary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-secondary-light)]',
    accent:
      'bg-[var(--color-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-dark)]',
    ghost:
      'bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]',
    danger:
      'bg-[var(--color-error)] text-[var(--color-text-inverse)] hover:opacity-90'
  }

  const sizeStyles = {
    sm: 'px-[var(--padding-sm)] py-[var(--padding-xs)] text-[var(--font-size-sm)]',
    md: 'px-[var(--padding-md)] py-[var(--padding-sm)] text-[var(--font-size-base)]',
    lg: 'px-[var(--padding-lg)] py-[var(--padding-md)] text-[var(--font-size-lg)]'
  }

  const baseStyles =
    'font-semibold rounded-[var(--radius-lg)] transition-[var(--transition-base)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-[var(--spacing-2)]'

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className='inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin'></span>
      )}
      {children}
    </button>
  )
}

export default Button
