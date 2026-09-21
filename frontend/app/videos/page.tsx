'use client'

import React, { useEffect, useState } from 'react'
import {
  Container,
  Breadcrumb,
  Grid,
  Card,
  LoadingSpinner,
  VideoEmbed
} from '@/components/shared'

interface Video {
  id: number
  title: string
  slug: string
  description: string
  video_url: string
  thumbnail: string
  created_at: string
  views: number
}

export default function VideosPage () {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Placeholder endpoint - adjust based on your API
        const res = await fetch(
          'http://localhost:8000/api/videos?limit=20&status=published'
        )
        const data = await res.json()
        setVideos(data.data || [])
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      <Container maxWidth='2xl' padding='md' className='pt-[var(--margin-md)]'>
        <Breadcrumb items={[{ label: 'হোম', href: '/' }, { label: 'ভিডিও' }]} />
      </Container>

      <Container maxWidth='2xl' padding='md'>
        <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--margin-lg)]'>
          📹 ভিডিও গ্যালারি
        </h1>

        {loading ? (
          <LoadingSpinner fullScreen={false} />
        ) : videos.length > 0 ? (
          <Grid columns={2} gap='lg' className='mb-[var(--margin-xl)]'>
            {videos.map(video => (
              <Card key={video.id} variant='elevated' padding='sm'>
                <div className='aspect-video bg-gray-900 relative overflow-hidden'>
                  <VideoEmbed url={video.video_url} title={video.title} />
                </div>
                <div className='p-[var(--spacing-4)]'>
                  <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
                    {video.title}
                  </h3>
                  <p className='text-[var(--font-size-sm)] text-[var(--color-text-secondary)] mb-[var(--spacing-2)]'>
                    {video.description}
                  </p>
                  <div className='flex justify-between items-center text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]'>
                    <span>
                      {new Date(video.created_at).toLocaleDateString('bn-BD')}
                    </span>
                    <span>👁️ {(video.views || 0).toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        ) : (
          <div className='text-center py-[var(--spacing-8)]'>
            <p className='text-[var(--font-size-lg)] text-[var(--color-text-secondary)]'>
              কোনো ভিডিও পাওয়া যায়নি
            </p>
          </div>
        )}
      </Container>
    </main>
  )
}
