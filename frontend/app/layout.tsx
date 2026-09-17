import type { Metadata } from 'next'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: ['বাংলাদেশ', 'খবর', 'সংবাদ', 'নিউজ'],
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: 'http://localhost:3000',
    siteName: SITE_NAME
  },
  twitter: {
    card: 'summary_large_image'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='bn'>
      <body className='bg-gray-50'>
        <Header />
        <div className='min-h-screen max-w-7xl mx-auto px-4 py-8'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
