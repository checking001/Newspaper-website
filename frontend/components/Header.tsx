'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { SITE_NAME } from '@/lib/constants'
import { PublicApiService, Category } from '@/lib/public-api'

export default function Header () {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await PublicApiService.getCategories()
        setCategories(data.slice(0, 8)) // Show top 8 categories
      } catch (error) {
        console.error('Failed to load categories:', error)
      }
    }

    loadCategories()
  }, [])

  function handleSearch (e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className='bg-white border-b-2 border-brand-primary sticky top-0 z-50 shadow-sm'>
      {/* Top Bar */}
      <div className='bg-brand-primary text-white py-2 px-4'>
        <div className='max-w-7xl mx-auto flex justify-between items-center text-sm'>
          <div className='space-x-4'>
            <Link href='/about' className='hover:underline'>
              আমাদের সম্পর্কে
            </Link>
            <Link href='/contact' className='hover:underline'>
              যোগাযোগ
            </Link>
            <Link href='/privacy' className='hover:underline'>
              গোপনীয়তা
            </Link>
          </div>
          <div className='space-x-4'>
            <Link href='/admin/login' className='hover:underline'>
              সম্পাদক লগইন
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className='max-w-7xl mx-auto px-4 py-4'>
        <div className='flex justify-between items-center mb-6'>
          {/* Logo */}
          <Link
            href='/'
            className='text-3xl font-bold text-brand-primary hover:text-brand-accent transition'
          >
            {SITE_NAME}
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className='flex-1 mx-8'>
            <div className='flex'>
              <input
                type='text'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='খবর খুঁজুন...'
                className='flex-1 px-4 py-2 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:border-brand-accent'
              />
              <button
                type='submit'
                className='px-6 py-2 bg-brand-accent text-white rounded-r-lg hover:bg-blue-700 transition'
              >
                🔍
              </button>
            </div>
          </form>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden px-4 py-2 bg-gray-100 rounded-lg'
          >
            ☰
          </button>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <div className='flex flex-col md:flex-row gap-2 md:gap-4 overflow-x-auto pb-2'>
            <Link
              href='/articles'
              className='px-4 py-2 bg-gray-100 rounded-lg hover:bg-brand-accent hover:text-white transition whitespace-nowrap'
            >
              সর্বশেষ
            </Link>
            <Link
              href='/archive'
              className='px-4 py-2 bg-gray-100 rounded-lg hover:bg-brand-accent hover:text-white transition whitespace-nowrap'
            >
              সংরক্ষণাগার
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className='px-4 py-2 bg-gray-100 rounded-lg hover:bg-brand-accent hover:text-white transition whitespace-nowrap'
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
