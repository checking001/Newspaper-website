'use client'

import React from 'react'

interface SectionProps {
  title: string
  children: React.ReactNode
  href?: string
  backgroundColor?: 'primary' | 'secondary' | 'none'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  href,
  backgroundColor = 'none',
  padding = 'md',
  className = ''
}) => {
  const bgStyles = {
    primary: 'bg-[var(--color-bg-secondary)]',
    secondary: 'bg-[var(--color-bg-tertiary)]',
    none: 'bg-transparent'
  }

  const paddingStyles = {
    sm: 'py-[var(--padding-sm)]',
    md: 'py-[var(--padding-md)]',
    lg: 'py-[var(--padding-lg)]'
  }

  return (
    <section
      className={`${bgStyles[backgroundColor]} ${paddingStyles[padding]} border-b border-[var(--color-border)] ${className}`}
    >
      <div className='max-w-[1280px] mx-auto px-[var(--padding-md)]'>
        {/* Section Header */}
        <div className='flex items-center justify-between mb-[var(--margin-lg)] pb-[var(--padding-md)] border-b-2 border-[var(--color-primary)]'>
          <h2 className='text-[var(--h2-size-mobile)] md:text-[var(--h2-size-tablet)] lg:text-[var(--h2-size-desktop)] font-bold text-[var(--color-primary)]'>
            {title}
          </h2>

          {href && (
            <a
              href={href}
              className='text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-semibold text-[var(--font-size-sm)] transition-colors'
            >
              সম্পূর্ণ খবর →
            </a>
          )}
        </div>

        {/* Section Content */}
        <div>{children}</div>
      </div>
    </section>
  )
}

export default Section
