import '../app/design-globals.css'
import '../app/fonts-setup.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'খবরের কাগজ - Digital Newspaper',
  description: 'Professional Bangladeshi online newspaper'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='bn'>
      <head />
      <body>{children}</body>
    </html>
  )
}
