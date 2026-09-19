'use client'

import React from 'react'
import Link from 'next/link'
import Button from './Button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  onPageChange?: (page: number) => void
  className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
  onPageChange,
  className = ''
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showPages = 5
    const halfShow = Math.floor(showPages / 2)

    let startPage = Math.max(1, currentPage - halfShow)
    let endPage = Math.min(totalPages, currentPage + halfShow)

    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + showPages - 1)
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - showPages + 1)
    }

    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) {
        pages.push('...')
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <nav
      aria-label='Pagination'
      className={`flex items-center justify-center gap-[var(--spacing-2)] my-[var(--margin-xl)] ${className}`}
    >
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link href={`${baseUrl}?page=${currentPage - 1}`}>
          <Button variant='ghost' size='sm'>
            ← আগে
          </Button>
        </Link>
      )}

      {/* Page Numbers */}
      <div className='flex items-center gap-[var(--spacing-1)]'>
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className='px-[var(--spacing-2)] py-[var(--spacing-1)]'
              >
                ...
              </span>
            )
          }

          const isCurrentPage = page === currentPage

          return (
            <Link
              key={page}
              href={`${baseUrl}?page=${page}`}
              onClick={() => onPageChange?.(page as number)}
            >
              <button
                className={`w-10 h-10 rounded-[var(--radius-md)] font-semibold transition-colors ${
                  isCurrentPage
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]'
                }`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {page}
              </button>
            </Link>
          )
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link href={`${baseUrl}?page=${currentPage + 1}`}>
          <Button variant='ghost' size='sm'>
            পরে →
          </Button>
        </Link>
      )}
    </nav>
  )
}

export default Pagination
