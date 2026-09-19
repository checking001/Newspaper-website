'use client'

import React from 'react'
import Link from 'next/link'

interface Category {
  id: number
  name: string
  slug: string
  articleCount?: number
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory?: string
  variant?: 'pills' | 'list' | 'dropdown'
  className?: string
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  variant = 'pills',
  className = ''
}) => {
  if (variant === 'list') {
    return (
      <div className={`space-y-[var(--spacing-2)] ${className}`}>
        {categories.map(category => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={`block px-[var(--padding-md)] py-[var(--spacing-2)] rounded-[var(--radius-md)] transition-colors ${
              activeCategory === category.slug
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]'
            }`}
          >
            <span className='flex items-center justify-between'>
              <span>{category.name}</span>
              {category.articleCount && (
                <span className='text-[var(--font-size-xs)] opacity-75'>
                  ({category.articleCount})
                </span>
              )}
            </span>
          </Link>
        ))}
      </div>
    )
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative group ${className}`}>
        <button className='px-[var(--padding-md)] py-[var(--spacing-2)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-[var(--radius-md)] font-semibold hover:bg-[var(--color-border)] transition-colors'>
          বিভাগ ▼
        </button>

        <div className='absolute top-full left-0 mt-2 w-48 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] hidden group-hover:block z-40'>
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`block px-[var(--padding-md)] py-[var(--spacing-2)] border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)] transition-colors first:rounded-t-[var(--radius-lg)] last:rounded-b-[var(--radius-lg)] ${
                activeCategory === category.slug
                  ? 'bg-[var(--color-primary)] text-white'
                  : ''
              }`}
            >
              <span className='flex items-center justify-between'>
                <span>{category.name}</span>
                {category.articleCount && (
                  <span className='text-[var(--font-size-xs)] opacity-75'>
                    {category.articleCount}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Pills variant (default)
  return (
    <div className={`flex flex-wrap gap-[var(--spacing-2)] ${className}`}>
      <Link
        href='/articles'
        className={`px-[var(--padding-md)] py-[var(--spacing-2)] rounded-full font-semibold transition-colors ${
          !activeCategory
            ? 'bg-[var(--color-primary)] text-white'
            : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]'
        }`}
      >
        সব
      </Link>

      {categories.map(category => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className={`px-[var(--padding-md)] py-[var(--spacing-2)] rounded-full font-semibold transition-colors ${
            activeCategory === category.slug
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}

export default CategoryFilter
