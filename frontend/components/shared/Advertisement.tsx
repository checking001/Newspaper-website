'use client'

import React from 'react'
import Image from 'next/image'

interface AdvertisementProps {
  size: '300x250' | '728x90' | '320x50' | '160x600' | 'responsive'
  imageUrl?: string
  adUrl?: string
  altText?: string
  className?: string
}

export const Advertisement: React.FC<AdvertisementProps> = ({
  size = '300x250',
  imageUrl,
  adUrl,
  altText = 'Advertisement',
  className = ''
}) => {
  const sizeStyles = {
    '300x250': 'w-[300px] h-[250px]',
    '728x90': 'w-[728px] h-[90px]',
    '320x50': 'w-[320px] h-[50px]',
    '160x600': 'w-[160px] h-[600px]',
    responsive: 'w-full h-auto'
  }

  const adContent = (
    <div
      className={`${sizeStyles[size]} relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center ${className}`}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt={altText} fill className='object-cover' />
      ) : (
        <div className='text-center p-[var(--padding-md)]'>
          <p className='text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mb-[var(--spacing-2)]'>
            বিজ্ঞাপন স্থান
          </p>
          <p className='text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]'>
            আপনার বিজ্ঞাপন এখানে
          </p>
        </div>
      )}
    </div>
  )

  if (adUrl) {
    return (
      <a
        href={adUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-block'
      >
        {adContent}
      </a>
    )
  }

  return adContent
}

export default Advertisement
