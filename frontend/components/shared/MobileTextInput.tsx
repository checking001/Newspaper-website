'use client'

import React, { InputHTMLAttributes } from 'react'

interface MobileTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
}

export default function MobileTextInput ({
  label,
  error,
  helpText,
  className = '',
  ...props
}: MobileTextInputProps) {
  return (
    <div className='mb-[var(--spacing-4)]'>
      {label && (
        <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
          {label}
          {props.required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}

      <input
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
          ${error ? 'border-red-500' : 'border-[var(--color-border)]'}
          ${className}
        `}
      />

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
