'use client'

import React, { useState } from 'react'

interface VideoEmbedProps {
  url: string
  title?: string
  width?: number
  height?: number
  autoplay?: boolean
  className?: string
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({
  url,
  title = 'Video',
  width = 560,
  height = 315,
  autoplay = false,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  // Extract YouTube video ID
  const getYouTubeEmbedUrl = (youtubeUrl: string) => {
    const videoIdMatch = youtubeUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    )
    const videoId = videoIdMatch?.[1]
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}`
      : null
  }

  // Extract Vimeo video ID
  const getVimeoEmbedUrl = (vimeoUrl: string) => {
    const videoIdMatch = vimeoUrl.match(
      /(?:vimeo\.com\/|vimeo\.com\/video\/)([0-9]+)/
    )
    const videoId = videoIdMatch?.[1]
    return videoId
      ? `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}`
      : null
  }

  const embedUrl = getYouTubeEmbedUrl(url) || getVimeoEmbedUrl(url) || url

  const aspectRatio = (height / width) * 100

  return (
    <figure className={`w-full ${className}`}>
      <div
        className='relative w-full bg-[var(--color-bg-secondary)] rounded-[var(--radius-lg)] overflow-hidden'
        style={{ paddingBottom: `${aspectRatio}%` }}
      >
        {!isLoaded && (
          <div className='absolute inset-0 bg-[var(--color-border)] flex items-center justify-center'>
            <span className='text-2xl animate-spin'>⏳</span>
          </div>
        )}
        <iframe
          src={embedUrl}
          title={title}
          className='absolute inset-0 w-full h-full border-0'
          allowFullScreen
          loading='lazy'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      {title && (
        <figcaption className='mt-[var(--spacing-2)] text-[var(--meta-size)] text-[var(--color-text-secondary)] italic'>
          {title}
        </figcaption>
      )}
    </figure>
  )
}

export default VideoEmbed
