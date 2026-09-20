'use client'

import Image from 'next/image'
import React, { useState } from 'react'

interface ResponsiveImageProps {
  src: string
  alt: string
  caption?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down'
  className?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
}

export default function ResponsiveImage ({
  src,
  alt,
  caption,
  objectFit = 'cover',
  className = '',
  priority = false,
  loading = 'lazy'
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }

  if (error) {
    return (
      <div
        className={`bg-[var(--color-bg-secondary)] flex items-center justify-center aspect-video ${className}`}
      >
        <p className='text-[var(--color-text-tertiary)]'>ছবি লোড করতে ব্যর্থ</p>
      </div>
    )
  }

  return (
    <figure className={className}>
      <div className='relative w-full aspect-video overflow-hidden rounded-lg bg-[var(--color-bg-secondary)]'>
        {isLoading && (
          <div className='absolute inset-0 bg-[var(--color-bg-secondary)] flex items-center justify-center'>
            <div className='w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}

        <Image
          src={src}
          alt={alt}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px'
          priority={priority}
          loading={loading}
          style={{
            objectFit,
            objectPosition: 'center'
          }}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
          className={isLoading ? 'opacity-0' : 'opacity-100'}
        />
      </div>

      {caption && (
        <figcaption className='text-[var(--font-size-xs)] md:text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mt-[var(--spacing-2)] text-center italic'>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
