'use client'

import React from 'react'

interface AlertProps {
  children: React.ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  onClose?: () => void
  className?: string
}

export const Alert: React.FC<AlertProps> = ({
  children,
  type = 'info',
  title,
  onClose,
  className = ''
}) => {
  const typeStyles = {
    info: 'bg-[var(--color-info)] bg-opacity-10 border border-[var(--color-info)] text-[var(--color-info)]',
    success:
      'bg-[var(--color-success)] bg-opacity-10 border border-[var(--color-success)] text-[var(--color-success)]',
    warning:
      'bg-[var(--color-warning)] bg-opacity-10 border border-[var(--color-warning)] text-[var(--color-warning)]',
    error:
      'bg-[var(--color-error)] bg-opacity-10 border border-[var(--color-error)] text-[var(--color-error)]'
  }

  const typeIconColor = {
    info: '🔵',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  }

  return (
    <div
      className={`${typeStyles[type]} rounded-[var(--radius-lg)] p-[var(--padding-md)] ${className}`}
    >
      <div className='flex items-start justify-between gap-[var(--spacing-4)]'>
        <div className='flex items-start gap-[var(--spacing-3)]'>
          <span className='text-xl mt-1'>{typeIconColor[type]}</span>
          <div className='flex-1'>
            {title && (
              <h4 className='font-semibold mb-[var(--spacing-1)]'>{title}</h4>
            )}
            <div className='text-sm'>{children}</div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className='flex-shrink-0 text-xl hover:opacity-70 transition-opacity'
            aria-label='Close alert'
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert
