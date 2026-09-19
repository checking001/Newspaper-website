'use client'

import React, { useState } from 'react'
import Button from './Button'

interface DateRangeFilterProps {
  onApply?: (startDate: string, endDate: string) => void
  className?: string
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  onApply,
  className = ''
}) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [preset, setPreset] = useState('')

  const applyPreset = (days: number) => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - days)

    setStartDate(start.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
    setPreset('custom')
  }

  const handleApply = () => {
    if (startDate && endDate) {
      onApply?.(startDate, endDate)
    }
  }

  const handleReset = () => {
    setStartDate('')
    setEndDate('')
    setPreset('')
    onApply?.('', '')
  }

  return (
    <div
      className={`bg-[var(--color-bg-secondary)] rounded-[var(--radius-lg)] p-[var(--padding-md)] space-y-[var(--spacing-3)] ${className}`}
    >
      <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)]'>
        তারিখ পরিসীমা
      </h3>

      {/* Preset Buttons */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-[var(--spacing-2)]'>
        <button
          onClick={() => {
            applyPreset(7)
            setPreset('week')
          }}
          className={`px-[var(--padding-sm)] py-[var(--spacing-1)] rounded-[var(--radius-md)] font-semibold text-[var(--font-size-xs)] transition-colors ${
            preset === 'week'
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-white'
          }`}
        >
          এই সপ্তাহ
        </button>
        <button
          onClick={() => {
            applyPreset(30)
            setPreset('month')
          }}
          className={`px-[var(--padding-sm)] py-[var(--spacing-1)] rounded-[var(--radius-md)] font-semibold text-[var(--font-size-xs)] transition-colors ${
            preset === 'month'
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-white'
          }`}
        >
          এই মাস
        </button>
        <button
          onClick={() => {
            applyPreset(90)
            setPreset('quarter')
          }}
          className={`px-[var(--padding-sm)] py-[var(--spacing-1)] rounded-[var(--radius-md)] font-semibold text-[var(--font-size-xs)] transition-colors ${
            preset === 'quarter'
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-white'
          }`}
        >
          তিন মাস
        </button>
        <button
          onClick={() => {
            applyPreset(365)
            setPreset('year')
          }}
          className={`px-[var(--padding-sm)] py-[var(--spacing-1)] rounded-[var(--radius-md)] font-semibold text-[var(--font-size-xs)] transition-colors ${
            preset === 'year'
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-white'
          }`}
        >
          এক বছর
        </button>
      </div>

      {/* Custom Date Range */}
      <div className='border-t border-[var(--color-border)] pt-[var(--padding-md)]'>
        <p className='text-[var(--font-size-xs)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-2)]'>
          কাস্টম পরিসীমা
        </p>
        <div className='grid grid-cols-2 gap-[var(--spacing-2)] mb-[var(--spacing-3)]'>
          <input
            type='date'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className='px-[var(--padding-sm)] py-[var(--spacing-1)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--font-size-xs)] focus:outline-none focus:border-[var(--color-primary)]'
          />
          <input
            type='date'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className='px-[var(--padding-sm)] py-[var(--spacing-1)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--font-size-xs)] focus:outline-none focus:border-[var(--color-primary)]'
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-[var(--spacing-2)]'>
        <Button
          variant='primary'
          size='sm'
          fullWidth
          onClick={handleApply}
          disabled={!startDate || !endDate}
        >
          প্রয়োগ করুন
        </Button>
        <Button variant='ghost' size='sm' fullWidth onClick={handleReset}>
          রিসেট
        </Button>
      </div>
    </div>
  )
}

export default DateRangeFilter
