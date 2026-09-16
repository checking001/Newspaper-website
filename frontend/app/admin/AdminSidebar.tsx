'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SITE_NAME } from '@/lib/constants'

const menuItems = [
  { label: 'ড্যাশবোর্ড', href: '/admin/dashboard', icon: '📊' },
  { label: 'খবর', href: '/admin/articles', icon: '📰' },
  { label: 'ক্যাটাগরি', href: '/admin/categories', icon: '📂' },
  { label: 'লেখক', href: '/admin/authors', icon: '✍️' },
  { label: 'ট্যাগ', href: '/admin/tags', icon: '🏷️' },
  { label: 'মিডিয়া', href: '/admin/media', icon: '🖼️' },
  { label: 'বিজ্ঞাপন', href: '/admin/advertisements', icon: '📢' },
  { label: 'হোম সেকশন', href: '/admin/homepage-sections', icon: '🏠' }
]

export default function AdminSidebar () {
  const pathname = usePathname()

  return (
    <aside className='w-64 bg-brand-primary text-white overflow-y-auto'>
      <div className='p-6'>
        <h1 className='text-2xl font-bold'>{SITE_NAME}</h1>
        <p className='text-sm text-gray-300'>সম্পাদক প্যানেল</p>
      </div>

      <nav className='px-4 space-y-2'>
        {menuItems.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-lg transition ${
                isActive
                  ? 'bg-brand-accent text-white'
                  : 'text-gray-200 hover:bg-brand-secondary'
              }`}
            >
              <span className='mr-2'>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className='p-4 border-t border-gray-600 mt-6'>
        <button className='w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition'>
          লগআউট
        </button>
      </div>
    </aside>
  )
}
