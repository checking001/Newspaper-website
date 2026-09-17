'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import { PublicApiService, Article } from '@/lib/public-api'

const months = [
  { num: 1, name: 'জানুয়ারি' },
  { num: 2, name: 'ফেব্রুয়ারি' },
  { num: 3, name: 'মার্চ' },
  { num: 4, name: 'এপ্রিল' },
  { num: 5, name: 'মে' },
  { num: 6, name: 'জুন' },
  { num: 7, name: 'জুলাই' },
  { num: 8, name: 'আগস্ট' },
  { num: 9, name: 'সেপ্টেম্বর' },
  { num: 10, name: 'অক্টোবর' },
  { num: 11, name: 'নভেম্বর' },
  { num: 12, name: 'ডিসেম্বর' }
]

export default function ArchivePage () {
  const searchParams = useSearchParams()
  const year = searchParams.get('year')
  const month = searchParams.get('month')
  const page = parseInt(searchParams.get('page') || '1')

  const [articles, setArticles] = useState<Article[]>([])
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArchive = async () => {
      try {
        const data = await PublicApiService.getArchive(
          year ? parseInt(year) : undefined,
          month ? parseInt(month) : undefined
        )
        setArticles(data.data || [])
        setPagination({
          current_page: data.current_page || 1,
          last_page: data.last_page || 1
        })
      } catch (error) {
        console.error('Failed to load archive:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArchive()
  }, [year, month, page])

  return (
    <main className='space-y-8'>
      <div>
        <h1 className='text-4xl font-bold text-brand-primary mb-2'>
          সংরক্ষণাগার
        </h1>
        <p className='text-gray-600'>পুরাতন খবর খুঁজে পান</p>
      </div>

      {/* Year Selection */}
      <div className='bg-white p-6 rounded-lg shadow space-y-4'>
        <h3 className='font-semibold text-lg'>বছর নির্বাচন করুন</h3>
        <div className='flex gap-2 flex-wrap'>
          {[2024, 2025, 2026].map(y => (
            <Link
              key={y}
              href={`/archive?year=${y}`}
              className={`px-4 py-2 rounded-lg transition ${
                year === y.toString()
                  ? 'bg-brand-accent text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {y}
            </Link>
          ))}
        </div>

        {year && (
          <>
            <h3 className='font-semibold text-lg mt-4'>মাস নির্বাচন করুন</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
              {months.map(m => (
                <Link
                  key={m.num}
                  href={`/archive?year=${year}&month=${m.num}`}
                  className={`px-3 py-2 rounded-lg text-center transition ${
                    month === m.num.toString()
                      ? 'bg-brand-accent text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {m.name}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Articles */}
      {loading ? (
        <div className='text-center py-12'>লোড হচ্ছে...</div>
      ) : articles.length === 0 ? (
        <div className='text-center py-12 text-gray-500'>
          এই সময়ে কোনো খবর নেই
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            baseUrl={`/archive?${year ? `year=${year}` : ''}${
              month ? `&month=${month}` : ''
            }`}
          />
        </>
      )}
    </main>
  )
}
