'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface FooterSection {
  title: string
  links: Array<{ label: string; href: string }>
}

interface FooterProps {
  siteName: string
  sections: FooterSection[]
  copyright: string
}

export default function Footer ({ siteName, sections, copyright }: FooterProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  return (
    <footer className='bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] py-[var(--margin-lg)]'>
      <div className='max-w-6xl mx-auto px-[var(--margin-md)]'>
        {/* Desktop Grid */}
        <div className='hidden md:grid grid-cols-3 gap-[var(--margin-lg)] mb-[var(--margin-lg)]'>
          {sections.map(section => (
            <div key={section.title}>
              <h4 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-3)]'>
                {section.title}
              </h4>
              <ul className='space-y-[var(--spacing-2)]'>
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='text-[var(--font-size-base)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className='md:hidden space-y-[var(--spacing-2)] mb-[var(--margin-lg)]'>
          {sections.map(section => (
            <div
              key={section.title}
              className='border border-[var(--color-border)] rounded-lg overflow-hidden'
            >
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === section.title ? null : section.title
                  )
                }
                className='w-full flex justify-between items-center px-[var(--spacing-3)] py-[var(--spacing-2)] bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-primary)]'
              >
                <h4 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)]'>
                  {section.title}
                </h4>
                <span className='text-[var(--color-text-secondary)]'>
                  {expandedSection === section.title ? '−' : '+'}
                </span>
              </button>

              {expandedSection === section.title && (
                <ul className='space-y-[var(--spacing-2)] p-[var(--spacing-3)]'>
                  {section.links.map(link => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className='text-[var(--font-size-base)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors'
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='border-t border-[var(--color-border)] pt-[var(--spacing-4)]'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-[var(--spacing-4)] text-[var(--font-size-sm)] text-[var(--color-text-tertiary)]'>
            <p>{copyright}</p>

            <div className='flex gap-[var(--spacing-3)]'>
              <Link
                href='/privacy'
                className='hover:text-[var(--color-primary)]'
              >
                গোপনীয়তা
              </Link>
              <Link href='/terms' className='hover:text-[var(--color-primary)]'>
                শর্তাবলী
              </Link>
              <Link
                href='/contact'
                className='hover:text-[var(--color-primary)]'
              >
                যোগাযোগ
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className='flex justify-center gap-[var(--spacing-3)] mt-[var(--spacing-4)]'>
            <a
              href='#'
              className='text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
            >
              📘
            </a>
            <a
              href='#'
              className='text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
            >
              🐦
            </a>
            <a
              href='#'
              className='text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
            >
              📷
            </a>
            <a
              href='#'
              className='text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
            >
              ▶️
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
