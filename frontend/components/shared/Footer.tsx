'use client'

import React from 'react'
import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  sections?: FooterSection[]
  siteName?: string
  copyright?: string
  className?: string
}

export const Footer: React.FC<FooterProps> = ({
  sections = [],
  siteName = 'খবরের কাগজ',
  copyright = `© ${new Date().getFullYear()} ${siteName}. সকল অধিকার সংরক্ষিত।`,
  className = ''
}) => {
  return (
    <footer
      className={`bg-[var(--color-bg-primary)] border-t border-[var(--color-border)] mt-[var(--margin-xl)] ${className}`}
    >
      {/* Main Footer Content */}
      <div className='px-[var(--padding-md)] py-[var(--padding-lg)] max-w-[1280px] mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[var(--spacing-6)] mb-[var(--margin-lg)]'>
          {/* About Section */}
          <div>
            <h3 className='text-[var(--h4-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-3)]'>
              {siteName}
            </h3>
            <p className='text-[var(--font-size-sm)] text-[var(--color-text-secondary)] leading-relaxed'>
              আমরা বাংলাদেশের প্রথম সারির ডিজিটাল সংবাদপত্র। আপনার বিশ্বস্ত
              সংবাদ উৎস।
            </p>
          </div>

          {/* Footer Sections */}
          {sections.map(section => (
            <div key={section.title}>
              <h4 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-3)]'>
                {section.title}
              </h4>
              <ul className='space-y-[var(--spacing-2)]'>
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-[var(--font-size-sm)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className='border-t border-[var(--color-border)] pt-[var(--padding-md)]'>
          {/* Social Links */}
          <div className='flex items-center justify-center gap-[var(--spacing-4)] mb-[var(--spacing-4)]'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors'
            >
              f
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors'
            >
              𝕏
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors'
            >
              📷
            </a>
            <a
              href='https://youtube.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors'
            >
              ▶️
            </a>
          </div>

          {/* Copyright */}
          <p className='text-center text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]'>
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
