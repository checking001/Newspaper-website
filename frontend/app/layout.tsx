import type { Metadata } from 'next'
import './globals.css'
import './fonts-setup.css'
import { Header, Footer } from '@/components/shared'

export const metadata: Metadata = {
  title: 'খবরের কাগজ - ডিজিটাল সংবাদপত্র',
  description:
    'বাংলাদেশের প্রথম সারির ডিজিটাল সংবাদপত্র। সর্বশেষ খবর, বিশ্লেষণ এবং মতামত।'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const navigationItems = [
    {
      label: '🏛️ রাজনীতি',
      href: '/categories/politics',
      submenu: [
        { label: 'সংসদ', href: '/categories/politics?type=parliament' },
        { label: 'নির্বাচন', href: '/categories/politics?type=elections' }
      ]
    },
    {
      label: '💰 অর্থনীতি',
      href: '/categories/economy',
      submenu: [
        { label: 'ব্যবসা', href: '/categories/economy?type=business' },
        { label: 'শেয়ারবাজার', href: '/categories/economy?type=stock' }
      ]
    },
    {
      label: '⚽ খেলা',
      href: '/categories/sports',
      submenu: [
        { label: 'ক্রিকেট', href: '/categories/sports?type=cricket' },
        { label: 'ফুটবল', href: '/categories/sports?type=football' }
      ]
    },
    {
      label: '💻 প্রযুক্তি',
      href: '/categories/tech',
      submenu: [
        { label: 'প্রযুক্তি সংবাদ', href: '/categories/tech?type=news' },
        { label: 'পর্যালোচনা', href: '/categories/tech?type=reviews' }
      ]
    },
    {
      label: '🌍 আন্তর্জাতিক',
      href: '/categories/international'
    },
    {
      label: '📚 আরও',
      href: '#',
      submenu: [
        { label: 'সর্বশেষ', href: '/articles' },
        { label: 'আর্কাইভ', href: '/archive' },
        { label: 'সম্পর্কে', href: '/about' }
      ]
    }
  ]

  return (
    <html lang='bn'>
      <head />
      <body className='bg-[var(--color-bg-primary)]'>
        <Header
          siteName='খবরের কাগজ'
          tagline='ডিজিটাল সংবাদপত্র'
          navigationItems={navigationItems}
          showSearch={true}
        />

        {children}

        <Footer
          siteName='খবরের কাগজ'
          sections={[
            {
              title: 'বিভাগ সমূহ',
              links: [
                { label: 'রাজনীতি', href: '/categories/politics' },
                { label: 'অর্থনীতি', href: '/categories/economy' },
                { label: 'খেলা', href: '/categories/sports' },
                { label: 'প্রযুক্তি', href: '/categories/tech' }
              ]
            },
            {
              title: 'দ্রুত লিংক',
              links: [
                { label: 'সর্বশেষ খবর', href: '/articles' },
                { label: 'আর্কাইভ', href: '/archive' },
                { label: 'খোঁজ', href: '/search' },
                { label: 'যোগাযোগ', href: '/contact' }
              ]
            },
            {
              title: 'আইনি',
              links: [
                { label: 'সম্পর্কে', href: '/about' },
                { label: 'গোপনীয়তা নীতি', href: '/privacy' },
                { label: 'ব্যবহারের শর্তাবলী', href: '/terms' },
                { label: 'বিজ্ঞাপন', href: '/advertise' }
              ]
            }
          ]}
          copyright={`© ${new Date().getFullYear()} খবরের কাগজ। সকল অধিকার সংরক্ষিত।`}
        />
      </body>
    </html>
  )
}
