'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface NavItem {
  label: string
  href: string
  submenu?: NavItem[]
}

interface NavigationProps {
  items: NavItem[]
  showSearch?: boolean
}

export default function Navigation ({
  items,
  showSearch = false
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label)
  }

  return (
    <nav className='bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]'>
      {/* Desktop Navigation */}
      <div className='hidden md:flex items-center justify-between px-[var(--margin-md)] py-[var(--spacing-3)]'>
        <div className='flex items-center gap-[var(--spacing-4)]'>
          {items.map(item => (
            <div key={item.label} className='group relative'>
              <Link
                href={item.href}
                className='text-[var(--font-size-base)] font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors'
              >
                {item.label}
              </Link>

              {/* Submenu */}
              {item.submenu && (
                <div className='absolute left-0 top-full hidden group-hover:block bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg shadow-lg min-w-max z-50'>
                  {item.submenu.map(subitem => (
                    <Link
                      key={subitem.label}
                      href={subitem.href}
                      className='block px-[var(--spacing-4)] py-[var(--spacing-2)] text-[var(--font-size-sm)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-primary)] first:rounded-t-lg last:rounded-b-lg transition-colors'
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {showSearch && (
          <input
            type='text'
            placeholder='খুঁজুন...'
            className='px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--font-size-base)] text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)]'
          />
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='md:hidden'>
        <div className='flex items-center justify-between px-[var(--margin-md)] py-[var(--spacing-3)]'>
          <h2 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)]'>
            খবরের কাগজ
          </h2>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='p-[var(--spacing-2)] rounded-lg hover:bg-[var(--color-bg-secondary)]'
            aria-label='মেনু'
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]'>
            {items.map(item => (
              <div key={item.label}>
                <div className='flex items-center justify-between px-[var(--margin-md)] py-[var(--spacing-3)] border-b border-[var(--color-border)]'>
                  <Link
                    href={item.href}
                    className='text-[var(--font-size-base)] font-medium text-[var(--color-text-primary)] flex-1'
                    onClick={() => item.submenu && toggleSubmenu(item.label)}
                  >
                    {item.label}
                  </Link>

                  {item.submenu && (
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className='ml-[var(--spacing-2)] text-[var(--color-primary)]'
                    >
                      {openSubmenu === item.label ? '−' : '+'}
                    </button>
                  )}
                </div>

                {/* Mobile Submenu */}
                {item.submenu && openSubmenu === item.label && (
                  <div className='bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]'>
                    {item.submenu.map(subitem => (
                      <Link
                        key={subitem.label}
                        href={subitem.href}
                        className='block px-[var(--spacing-4)] py-[var(--spacing-2)] text-[var(--font-size-sm)] text-[var(--color-text-secondary)] border-b border-[var(--color-border)] last:border-0'
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {showSearch && (
              <div className='p-[var(--margin-md)] border-t border-[var(--color-border)]'>
                <input
                  type='text'
                  placeholder='খুঁজুন...'
                  className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--font-size-base)] text-[var(--color-text-primary)] bg-[var(--color-bg-tertiary)]'
                />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
