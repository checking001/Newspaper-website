import type { Metadata } from 'next'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'bn_BD',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION
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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
}

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
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      </head>
      <body className='bg-brand-bg text-brand-text'>
        <div className='flex flex-col min-h-screen'>
          {/* Header will go here */}
          <header className='bg-white border-b border-brand-border sticky top-0 z-40'>
            <div className='container py-4'>
              <h1 className='text-2xl font-bold text-brand-primary'>
                {SITE_NAME}
              </h1>
            </div>
          </header>

          {/* Main content */}
          <main className='flex-grow container py-8'>{children}</main>

          {/* Footer will go here */}
          <footer className='bg-brand-primary text-white mt-12'>
            <div className='container py-8'>
              <p className='text-center text-sm opacity-80'>
                &copy; 2026 {SITE_NAME}. সর্বস্বত্ব সংরক্ষিত।
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
