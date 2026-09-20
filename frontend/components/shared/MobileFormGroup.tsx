'use client'

import React, { ReactNode } from 'react'

interface MobileFormGroupProps {
  label: string
  children: ReactNode
  error?: string
  required?: boolean
  helpText?: string
}

export default function MobileFormGroup ({
  label,
  children,
  error,
  required = false,
  helpText
}: MobileFormGroupProps) {
  return (
    <div className='mb-[var(--spacing-4)]'>
      <label className='block text-[var(--font-size-sm)] md:text-[var(--font-size-base)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>

      <div className='relative'>{children}</div>

      {error && (
        <p className='text-[var(--font-size-xs)] text-red-500 mt-[var(--spacing-1)]'>
          ⚠️ {error}
        </p>
      )}

      {helpText && (
        <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] mt-[var(--spacing-1)]'>
          {helpText}
        </p>
      )}
    </div>
  )
}
