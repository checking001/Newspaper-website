'use client'

import React, { useEffect, useState } from 'react'
import {
  Container,
  Breadcrumb,
  LoadingSpinner,
  Image as ResponsiveImage,
  Card
} from '@/components/shared'

interface PhotoGallery {
  id: number
  title: string
  slug: string
  description: string
  images: Array<{
    id: number
    url: string
    caption: string
  }>
  created_at: string
}

export default function GalleryPage () {
  const [galleries, setGalleries] = useState<PhotoGallery[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  )

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        // Placeholder endpoint - adjust based on your API
        const res = await fetch(
          'http://localhost:8000/api/galleries?limit=20&status=published'
        )
        const data = await res.json()
        setGalleries(data.data || [])
      } catch (error) {
        console.error('Error fetching galleries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleries()
  }, [])

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      <Container maxWidth='2xl' padding='md' className='pt-[var(--margin-md)]'>
        <Breadcrumb
          items={[{ label: 'হোম', href: '/' }, { label: 'ফটো গ্যালারি' }]}
        />
      </Container>

      <Container maxWidth='2xl' padding='md'>
        <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--margin-lg)]'>
          📸 ফটো গ্যালারি
        </h1>

        {loading ? (
          <LoadingSpinner fullScreen={false} />
        ) : galleries.length > 0 ? (
          <div className='space-y-[var(--margin-xl)]'>
            {galleries.map(gallery => (
              <Card key={gallery.id} variant='elevated' padding='lg'>
                <h2 className='text-[var(--h3-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
                  {gallery.title}
                </h2>
                <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)] mb-[var(--margin-md)]'>
                  {gallery.description}
                </p>

                <div className='grid grid-cols-2 md:grid-cols-3 gap-[var(--spacing-4)]'>
                  {gallery.images?.slice(0, 6).map((image, idx) => (
                    <div
                      key={image.id}
                      className='cursor-pointer overflow-hidden rounded-lg'
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      <ResponsiveImage
                        src={image.url}
                        alt={image.caption}
                        caption={image.caption}
                        objectFit='cover'
                        className='hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                  ))}
                </div>

                {gallery.images && gallery.images.length > 6 && (
                  <p className='text-center text-[var(--font-size-sm)] text-[var(--color-text-tertiary)] mt-[var(--spacing-4)]'>
                    +{gallery.images.length - 6} more images
                  </p>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className='text-center py-[var(--spacing-8)]'>
            <p className='text-[var(--font-size-lg)] text-[var(--color-text-secondary)]'>
              কোনো গ্যালারি পাওয়া যায়নি
            </p>
          </div>
        )}
      </Container>
    </main>
  )
}
