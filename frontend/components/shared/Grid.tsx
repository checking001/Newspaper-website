'use client'

import React from 'react'

interface GridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  gap = 'md',
  className = ''
}) => {
  const columnStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }

  const gapStyles = {
    sm: 'gap-[var(--spacing-3)]',
    md: 'gap-[var(--spacing-4)]',
    lg: 'gap-[var(--spacing-6)]'
  }

  return (
    <div
      className={`grid ${columnStyles[columns]} ${gapStyles[gap]} ${className}`}
    >
      {children}
    </div>
  )
}

export default Grid
