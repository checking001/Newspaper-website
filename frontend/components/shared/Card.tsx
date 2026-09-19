'use client'

import React from 'react'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = ''
}) => {
  const variantStyles = {
    default: 'bg-[var(--color-bg-primary)] border border-[var(--color-border)]',
    elevated: 'bg-[var(--color-bg-primary)] shadow-[var(--shadow-md)]',
    outlined: 'bg-transparent border-2 border-[var(--color-border)]'
  }

  const paddingStyles = {
    sm: 'p-[var(--padding-sm)]',
    md: 'p-[var(--padding-md)]',
    lg: 'p-[var(--padding-lg)]'
  }

  return (
    <div
      className={`${variantStyles[variant]} ${paddingStyles[padding]} rounded-[var(--radius-lg)] transition-[var(--transition-base)] ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
