import { SITE_NAME } from '@/lib/constants'

export const metadata = {
  title: `হোম | ${SITE_NAME}`,
  description: 'সর্বশেষ খবর এবং আপডেট'
}

export default function HomePage () {
  return (
    <div className='space-y-12'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg p-8 text-white'>
        <h1 className='text-4xl font-bold mb-4'>স্বাগতম</h1>
        <p className='text-lg text-gray-100'>
          {SITE_NAME} এ সর্বশেষ খবর, বিশ্লেষণ এবং গভীর রিপোর্টিং পান।
        </p>
      </section>

      {/* Breaking News (Placeholder) */}
      <section>
        <h2 className='text-2xl font-bold mb-6 border-b-4 border-brand-accent pb-2'>
          🔴 সর্বশেষ খবর
        </h2>
        <div className='bg-gray-100 rounded-lg p-8 text-center text-gray-500'>
          <p>Phase 2 - Database সেটআপের পর খবর যুক্ত হবে</p>
        </div>
      </section>

      {/* Featured Articles (Placeholder) */}
      <section>
        <h2 className='text-2xl font-bold mb-6 border-b-4 border-brand-accent pb-2'>
          বিশেষ নিবন্ধ
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className='bg-gray-100 rounded-lg p-6 text-center text-gray-500'
            >
              <p>নিবন্ধ {i}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories (Placeholder) */}
      <section>
        <h2 className='text-2xl font-bold mb-6 border-b-4 border-brand-accent pb-2'>
          ক্যাটাগরি
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {[
            'বাংলাদেশ',
            'রাজনীতি',
            'অর্থনীতি',
            'আন্তর্জাতিক',
            'ক্রীড়া',
            'বিনোদন',
            'প্রযুক্তি',
            'স্বাস্থ্য'
          ].map(cat => (
            <div
              key={cat}
              className='bg-brand-accent text-white rounded-lg p-4 text-center font-semibold hover:bg-brand-secondary transition'
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Most Read (Placeholder) */}
      <section>
        <h2 className='text-2xl font-bold mb-6 border-b-4 border-brand-accent pb-2'>
          বেশি পড়া হয়েছে
        </h2>
        <div className='space-y-4'>
          {[1, 2, 3].map(i => (
            <div key={i} className='bg-gray-100 rounded-lg p-4 text-gray-500'>
              <p>জনপ্রিয় নিবন্ধ {i}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
