'use client'

import React, { SelectHTMLAttributes, ReactNode } from 'react'

interface MobileSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  children: ReactNode
}

export default function MobileSelect ({
  label,
  error,
  className = '',
  children,
  ...props
}: MobileSelectProps) {
  return (
    <div className='mb-[var(--spacing-4)]'>
      {label && (
        <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
          {label}
          {props.required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}

      <select
        {...props}
        className={`
          w-full
          px-[var(--spacing-3)]
          py-[var(--spacing-3)]
          text-base
          border-2
          rounded-lg
          text-[var(--color-text-primary)]
          bg-[var(--color-bg-primary)]
          focus:outline-none
          focus:border-[var(--color-primary)]
          transition-colors
          appearance-none
          ${error ? 'border-red-500' : 'border-[var(--color-border)]'}
          ${className}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
          paddingRight: '32px'
        }}
      >
        {children}
      </select>

      {error && (
        <p className='text-[var(--font-size-xs)] text-red-500 mt-[var(--spacing-1)]'>
          ⚠️ {error}
        </p>
      )}
    </div>
  )
}
