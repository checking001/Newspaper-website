'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'

interface AuthorCardProps {
  id: number
  name: string
  slug: string
  bio?: string
  profileImage?: string
  articleCount?: number
  followersCount?: number
  className?: string
}

export const AuthorCard: React.FC<AuthorCardProps> = ({
  id,
  name,
  slug,
  bio,
  profileImage,
  articleCount = 0,
  followersCount = 0,
  className = ''
}) => {
  return (
    <Link href={`/author/${slug}`}>
      <div
        className={`group cursor-pointer bg-[var(--color-bg-secondary)] rounded-[var(--radius-lg)] p-[var(--padding-md)] text-center hover:shadow-[var(--shadow-lg)] transition-shadow ${className}`}
      >
        {/* Profile Image */}
        {profileImage ? (
          <div className='relative w-24 h-24 mx-auto mb-[var(--spacing-3)] rounded-full overflow-hidden'>
            <Image
              src={profileImage}
              alt={name}
              fill
              className='object-cover group-hover:scale-105 transition-transform duration-300'
            />
          </div>
        ) : (
          <div className='w-24 h-24 mx-auto mb-[var(--spacing-3)] rounded-full bg-[var(--color-border)] flex items-center justify-center text-2xl'>
            👤
          </div>
        )}

        {/* Author Info */}
        <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-1)] group-hover:text-[var(--color-accent)] transition-colors'>
          {name}
        </h3>

        {bio && (
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-secondary)] mb-[var(--spacing-3)] line-clamp-2 italic'>
            "{bio}"
          </p>
        )}

        {/* Stats */}
        <div className='grid grid-cols-2 gap-[var(--spacing-3)] mb-[var(--spacing-4)] py-[var(--padding-sm)] border-y border-[var(--color-border)]'>
          <div>
            <p className='text-[var(--font-size-sm)] font-bold text-[var(--color-primary)]'>
              {articleCount}
            </p>
            <p className='text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
              নিবন্ধ
            </p>
          </div>
          <div>
            <p className='text-[var(--font-size-sm)] font-bold text-[var(--color-primary)]'>
              {followersCount}
            </p>
            <p className='text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
              অনুসরণকারী
            </p>
          </div>
        </div>

        {/* Action Button */}
        <Button variant='accent' size='sm' fullWidth>
          প্রোফাইল দেখুন
        </Button>
      </div>
    </Link>
  )
}

export default AuthorCard
