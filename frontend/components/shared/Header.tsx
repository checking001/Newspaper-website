'use client'

import React from 'react'
import Link from 'next/link'
import Navigation from './Navigation'
import Button from './Button'

interface HeaderProps {
  siteName?: string
  tagline?: string
  navigationItems?: Array<{
    label: string
    href: string
    submenu?: Array<{ label: string; href: string }>
  }>
  showSearch?: boolean
  className?: string
}

export const Header: React.FC<HeaderProps> = ({
  siteName = 'খবরের কাগজ',
  tagline = 'ডিজিটাল সংবাদপত্র',
  navigationItems = [],
  showSearch = true,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header
      className={`bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] sticky top-0 z-40 ${className}`}
    >
      {/* Top Bar */}
      <div className='bg-[var(--color-secondary)] text-white py-[var(--spacing-2)] px-[var(--padding-md)]'>
        <div className='max-w-[1280px] mx-auto text-center text-[var(--font-size-sm)]'>
          📰 সর্বশেষ খবর সরাসরি আপনার কাছে
        </div>
      </div>

      {/* Main Header */}
      <div className='px-[var(--padding-md)] py-[var(--padding-md)]'>
        <div className='max-w-[1280px] mx-auto'>
          {/* Branding + Search */}
          <div className='flex items-center justify-between mb-[var(--spacing-4)] gap-[var(--spacing-4)]'>
            {/* Logo */}
            <Link href='/' className='flex-shrink-0'>
              <div className='flex flex-col'>
                <h1 className='text-[var(--h2-size-mobile)] md:text-[var(--h1-size-mobile)] font-bold text-[var(--color-primary)]'>
                  {siteName}
                </h1>
                <p className='text-[var(--font-size-xs)] text-[var(--color-text-secondary)]'>
                  {tagline}
                </p>
              </div>
            </Link>

            {/* Search Bar */}
            {showSearch && (
              <form
                onSubmit={handleSearch}
                className='hidden md:flex flex-1 max-w-[400px] gap-[var(--spacing-2)]'
              >
                <input
                  type='text'
                  placeholder='খবর খুঁজুন...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='flex-1 px-[var(--padding-md)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--font-size-base)] focus:outline-none focus:border-[var(--color-primary)]'
                />
                <Button type='submit' variant='primary' size='md'>
                  🔍
                </Button>
              </form>
            )}

            {/* Sign In Button */}
            <Button
              variant='accent'
              size='md'
              className='hidden sm:inline-flex'
            >
              সাইন ইন
            </Button>
          </div>

          {/* Mobile Search */}
          {showSearch && (
            <form
              onSubmit={handleSearch}
              className='md:hidden mb-[var(--spacing-4)] flex gap-[var(--spacing-2)]'
            >
              <input
                type='text'
                placeholder='খবর খুঁজুন...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='flex-1 px-[var(--padding-md)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--font-size-base)] focus:outline-none focus:border-[var(--color-primary)]'
              />
              <Button type='submit' variant='primary' size='md'>
                🔍
              </Button>
            </form>
          )}

          {/* Navigation */}
          <Navigation items={navigationItems} />
        </div>
      </div>
    </header>
  )
}

export default Header
