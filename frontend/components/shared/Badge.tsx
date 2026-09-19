'use client'

import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  category?:
    | 'default'
    | 'politics'
    | 'economy'
    | 'sports'
    | 'entertainment'
    | 'tech'
    | 'international'
    | 'lifestyle'
    | 'breaking'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  category = 'default',
  size = 'sm',
  className = ''
}) => {
  const categoryColors = {
    default: 'bg-[var(--color-category-default)] text-white',
    politics: 'bg-[var(--color-category-politics)] text-white',
    economy: 'bg-[var(--color-category-economy)] text-white',
    sports: 'bg-[var(--color-category-sports)] text-white',
    entertainment: 'bg-[var(--color-category-entertainment)] text-white',
    tech: 'bg-[var(--color-category-tech)] text-white',
    international: 'bg-[var(--color-category-international)] text-white',
    lifestyle: 'bg-[var(--color-category-lifestyle)] text-white',
    breaking: 'bg-[var(--color-breaking)] text-white font-bold'
  }

  const sizeStyles = {
    sm: 'px-[var(--padding-sm)] py-[var(--spacing-1)] text-[var(--font-size-xs)]',
    md: 'px-[var(--padding-md)] py-[var(--spacing-2)] text-[var(--font-size-sm)]'
  }

  return (
    <span
      className={`${categoryColors[category]} ${sizeStyles[size]} rounded-[var(--radius-md)] inline-block font-semibold ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
