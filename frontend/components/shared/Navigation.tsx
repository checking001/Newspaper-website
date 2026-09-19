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
  className?: string
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  className = ''
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleSubmenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label)
  }

  return (
    <nav className={`w-full ${className}`}>
      {/* Desktop Navigation */}
      <div className='hidden md:flex items-center gap-[var(--spacing-6)]'>
        {items.map(item => (
          <div
            key={item.label}
            className='relative group'
            onMouseEnter={() => setOpenMenu(item.label)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link
              href={item.href}
              className='text-[var(--color-text-primary)] hover:text-[var(--color-primary)] font-semibold py-[var(--spacing-3)] transition-colors'
            >
              {item.label}
            </Link>

            {/* Submenu */}
            {item.submenu && (
              <div className='absolute left-0 top-full hidden group-hover:block bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] min-w-[200px] z-50'>
                {item.submenu.map(subitem => (
                  <Link
                    key={subitem.label}
                    href={subitem.href}
                    className='block px-[var(--padding-md)] py-[var(--spacing-2)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-primary)] transition-colors first:rounded-t-[var(--radius-lg)] last:rounded-b-[var(--radius-lg)]'
                  >
                    {subitem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Navigation Button */}
      <button
        className='md:hidden flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]'
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label='Toggle mobile menu'
      >
        <span className='text-xl'>☰</span>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] z-50'>
          {items.map(item => (
            <div key={item.label}>
              <Link
                href={item.href}
                className='block px-[var(--padding-md)] py-[var(--spacing-3)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-primary)] border-b border-[var(--color-border)] transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>

              {/* Mobile Submenu */}
              {item.submenu && (
                <div className='bg-[var(--color-bg-secondary)]'>
                  {item.submenu.map(subitem => (
                    <Link
                      key={subitem.label}
                      href={subitem.href}
                      className='block px-[var(--padding-lg)] py-[var(--spacing-2)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] border-b border-[var(--color-border)] last:border-0 transition-colors'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navigation
