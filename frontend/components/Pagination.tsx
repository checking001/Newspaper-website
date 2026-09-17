import Link from 'next/link'

interface Props {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function Pagination ({
  currentPage,
  totalPages,
  baseUrl
}: Props) {
  if (totalPages <= 1) return null

  const pages = []
  const maxPages = 5

  let start = Math.max(1, currentPage - Math.floor(maxPages / 2))
  let end = Math.min(totalPages, start + maxPages - 1)

  if (end - start < maxPages - 1) {
    start = Math.max(1, end - maxPages + 1)
  }

  return (
    <div className='flex justify-center gap-2 mt-8'>
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className='px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-blue-700'
        >
          ← পূর্ববর্তী
        </Link>
      )}

      {start > 1 && (
        <>
          <Link
            href={`${baseUrl}?page=1`}
            className='px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100'
          >
            1
          </Link>
          {start > 2 && <span className='px-2 py-2'>...</span>}
        </>
      )}

      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
        page => (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={`px-3 py-2 rounded-lg ${
              page === currentPage
                ? 'bg-brand-accent text-white'
                : 'border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {page}
          </Link>
        )
      )}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className='px-2 py-2'>...</span>}
          <Link
            href={`${baseUrl}?page=${totalPages}`}
            className='px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100'
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className='px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-blue-700'
        >
          পরবর্তী →
        </Link>
      )}
    </div>
  )
}
