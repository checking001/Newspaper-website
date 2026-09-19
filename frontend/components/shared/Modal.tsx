'use client'

import React, { useEffect } from 'react'
import Button from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'danger'
  }>
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions = [],
  size = 'md',
  className = ''
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeStyles = {
    sm: 'max-w-[400px]',
    md: 'max-w-[600px]',
    lg: 'max-w-[900px]'
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className={`${sizeStyles[size]} w-[90vw] bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] shadow-[var(--shadow-2xl)] max-h-[90vh] overflow-y-auto ${className}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-[var(--padding-md)] border-b border-[var(--color-border)]'>
          <h2 className='text-[var(--h3-size-mobile)] font-bold text-[var(--color-primary)]'>
            {title}
          </h2>
          <button
            onClick={onClose}
            className='text-[var(--font-size-xl)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors'
            aria-label='Close modal'
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className='p-[var(--padding-md)]'>{children}</div>

        {/* Footer with Actions */}
        {actions.length > 0 && (
          <div className='flex items-center justify-end gap-[var(--spacing-3)] p-[var(--padding-md)] border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]'>
            <Button variant='ghost' onClick={onClose}>
              বাতিল করুন
            </Button>
            {actions.map(action => (
              <Button
                key={action.label}
                variant={action.variant || 'primary'}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
