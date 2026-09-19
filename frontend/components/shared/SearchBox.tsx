'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from './Button'

interface SearchBoxProps {
  placeholder?: string
  onSearch?: (query: string) => void
  showAdvanced?: boolean
  className?: string
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'খবর খুঁজুন...',
  onSearch,
  showAdvanced = false,
  className = ''
}) => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(showAdvanced)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    if (onSearch) {
      onSearch(query)
    } else {
      const params = new URLSearchParams()
      params.append('q', query)
      if (category) params.append('category', category)
      if (dateRange) params.append('date', dateRange)
      router.push(`/search?${params.toString()}`)
    }
  }

  return (
    <div className={`space-y-[var(--spacing-3)] ${className}`}>
      {/* Main Search */}
      <form onSubmit={handleSubmit} className='flex gap-[var(--spacing-2)]'>
        <input
          type='text'
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className='flex-1 px-[var(--padding-md)] py-[var(--spacing-3)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--font-size-base)] focus:outline-none focus:border-[var(--color-primary)]'
        />
        <Button type='submit' variant='primary'>
          🔍 খুঁজুন
        </Button>
      </form>

      {/* Advanced Filters Toggle */}
      {showAdvanced && (
        <button
          type='button'
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className='text-[var(--font-size-sm)] text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-semibold transition-colors'
        >
          {showAdvancedFilters ? '↑ উন্নত খোঁজ লুকান' : '↓ উন্নত খোঁজ'}
        </button>
      )}

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-3)] p-[var(--padding-md)] bg-[var(--color-bg-secondary)] rounded-[var(--radius-lg)]'>
          <div>
            <label className='block text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-1)]'>
              বিভাগ
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className='w-full px-[var(--padding-md)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--font-size-base)] focus:outline-none focus:border-[var(--color-primary)]'
            >
              <option value=''>সব বিভাগ</option>
              <option value='politics'>রাজনীতি</option>
              <option value='economy'>অর্থনীতি</option>
              <option value='sports'>খেলা</option>
              <option value='entertainment'>বিনোদন</option>
              <option value='tech'>প্রযুক্তি</option>
              <option value='international'>আন্তর্জাতিক</option>
            </select>
          </div>

          <div>
            <label className='block text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-1)]'>
              তারিখ সীমা
            </label>
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className='w-full px-[var(--padding-md)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--font-size-base)] focus:outline-none focus:border-[var(--color-primary)]'
            >
              <option value=''>সব সময়</option>
              <option value='today'>আজ</option>
              <option value='week'>এই সপ্তাহ</option>
              <option value='month'>এই মাস</option>
              <option value='year'>এই বছর</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBox
