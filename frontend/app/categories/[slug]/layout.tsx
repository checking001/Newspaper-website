import type { Metadata } from 'next'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SchemaScript from '@/components/SchemaScript'
import { generateOrganizationSchema } from '@/lib/seo-utils'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: ['বাংলাদেশ', 'খবর', 'সংবাদ', 'নিউজ', 'ডিজিটাল সংবাদপত্র'],
  authors: [{ name: 'খবরের কাগজ' }],
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: 'http://localhost:3000',
    siteName: SITE_NAME,
    images: [
      {
        url: 'http://localhost:3000/og-image.jpg',
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@khoborer_kagoj'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'http://localhost:3000'
  }
}

const organizationSchema = generateOrganizationSchema()

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='bn'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='canonical' href='http://localhost:3000' />
        <link
          rel='alternate'
          type='application/rss+xml'
          title={SITE_NAME}
          href='http://localhost:8000/api/feed.rss'
        />
        <link
          rel='sitemap'
          type='application/xml'
          href='http://localhost:8000/api/sitemap.xml'
        />
      </head>
      <body className='bg-gray-50'>
        {/* Organization Schema */}
        <SchemaScript schema={organizationSchema} />

        <Header />
        <div className='min-h-screen max-w-7xl mx-auto px-4 py-8'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
