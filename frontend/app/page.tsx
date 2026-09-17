'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import { PublicApiService, HomepageSection, Article } from '@/lib/public-api'

export default function HomePage () {
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [breaking, setBreaking] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectionsData, breakingData] = await Promise.all([
          PublicApiService.getHomepage(),
          PublicApiService.getBreakingNews(3)
        ])

        setSections(sectionsData)
        setBreaking(breakingData)
      } catch (error) {
        console.error('Failed to load homepage:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <main className='space-y-12'>
      {/* Breaking News Banner */}
      {breaking.length > 0 && (
        <section className='bg-red-50 border-l-4 border-red-600 p-6 rounded-lg'>
          <h2 className='text-2xl font-bold text-red-600 mb-4'>
            🔴 ব্রেকিং নিউজ
          </h2>
          <div className='space-y-3'>
            {breaking.map(article => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className='block p-3 bg-white rounded hover:bg-gray-50 transition'
              >
                <h3 className='font-bold text-brand-text hover:text-brand-accent'>
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Homepage Sections */}
      {loading ? (
        <div className='text-center py-12'>লোড হচ্ছে...</div>
      ) : (
        sections.map(section => (
          <section key={section.id} className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-3xl font-bold border-b-4 border-brand-accent pb-2'>
                {section.title}
              </h2>
              {section.category && (
                <Link
                  href={`/categories/${section.category.slug}`}
                  className='text-brand-accent hover:underline'
                >
                  সবকিছু দেখুন →
                </Link>
              )}
            </div>

            {section.layout_type === 'featured' && section.articles.length > 0 && (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <ArticleCard article={section.articles[0]} layout='featured' />
                <div className='space-y-4'>
                  {section.articles.slice(1, 4).map(article => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      layout='list'
                    />
                  ))}
                </div>
              </div>
            )}

            {section.layout_type === 'grid' && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {section.articles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {section.layout_type === 'list' && (
              <div className='space-y-4'>
                {section.articles.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    layout='list'
                  />
                ))}
              </div>
            )}
          </section>
        ))
      )}
    </main>
  )
}
