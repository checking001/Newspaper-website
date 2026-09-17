'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { PublicApiService } from '@/lib/public-api'

interface InfoPage {
  title: string
  content: string
}

export default function InfoPage () {
  const params = useParams()
  const slug = params.slug as string

  const [page, setPage] = useState<InfoPage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await PublicApiService.getPage(slug)
        setPage(data)
      } catch (error) {
        console.error('Failed to load page:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPage()
  }, [slug])

  if (loading) {
    return <div className='text-center py-12'>লোড হচ্ছে...</div>
  }

  if (!page) {
    return (
      <div className='text-center py-12 text-gray-500'>
        পৃষ্ঠা পাওয়া যায়নি
      </div>
    )
  }

  return (
    <main className='max-w-3xl mx-auto'>
      <h1 className='text-4xl font-bold text-brand-primary mb-8'>
        {page.title}
      </h1>

      <div className='prose prose-lg max-w-none'>
        {page.content.split('\n').map((line, index) => (
          <p key={index} className='mb-4 text-gray-700 leading-relaxed'>
            {line}
          </p>
        ))}
      </div>
    </main>
  )
}
