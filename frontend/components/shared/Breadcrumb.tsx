'use client'

import React from 'react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = ''
}) => {
  return (
    <nav
      aria-label='Breadcrumb'
      className={`flex items-center gap-[var(--spacing-2)] text-[var(--font-size-sm)] text-[var(--color-text-secondary)] overflow-x-auto ${className}`}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className='text-[var(--color-text-tertiary)] flex-shrink-0'>
              /
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className='text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors flex-shrink-0'
            >
              {item.label}
            </Link>
          ) : (
            <span className='text-[var(--color-text-primary)] font-semibold flex-shrink-0'>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumb
