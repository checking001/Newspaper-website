'use client'

import React, { ReactNode } from 'react'

interface GridProps {
  columns: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  children: ReactNode
  className?: string
}

export default function Grid ({
  columns,
  gap = 'md',
  children,
  className = ''
}: GridProps) {
  const gapClass = {
    sm: 'gap-[var(--spacing-2)]',
    md: 'gap-[var(--spacing-4)]',
    lg: 'gap-[var(--margin-md)]',
    xl: 'gap-[var(--margin-lg)]'
  }[gap]

  // Mobile: 1 column, Tablet: 2 columns, Desktop: columns value
  const gridClass = `grid ${gapClass} ${className}`
  const colClass =
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : columns === 3
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

  return <div className={`${gridClass} ${colClass}`}>{children}</div>
}
