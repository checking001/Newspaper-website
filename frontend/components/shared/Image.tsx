'use client'

import React from 'react'
import Image from 'next/image'

interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
  priority?: boolean
  objectFit?: 'cover' | 'contain' | 'fill'
  className?: string
}

export const ResponsiveImage: React.FC<ImageProps> = ({
  src,
  alt,
  width = 800,
  height = 400,
  caption,
  priority = false,
  objectFit = 'cover',
  className = ''
}) => {
  return (
    <figure className={`w-full ${className}`}>
      <div
        className='relative w-full overflow-hidden rounded-[var(--radius-lg)]'
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`object-${objectFit}`}
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px'
        />
      </div>
      {caption && (
        <figcaption className='mt-[var(--spacing-2)] text-[var(--meta-size)] text-[var(--color-text-secondary)] italic'>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default ResponsiveImage
