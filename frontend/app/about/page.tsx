'use client'

import React from 'react'
import { Container, Breadcrumb, Card, Grid } from '@/components/shared'

export default function AboutPage () {
  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      <Container maxWidth='2xl' padding='md' className='pt-[var(--margin-md)]'>
        <Breadcrumb
          items={[{ label: 'হোম', href: '/' }, { label: 'সম্পর্কে' }]}
        />
      </Container>

      <Container maxWidth='2xl' padding='md' className='mb-[var(--margin-xl)]'>
        <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--spacing-4)]'>
          আমাদের সম্পর্কে
        </h1>

        <Card padding='lg' variant='elevated' className='mb-[var(--margin-lg)]'>
          <h2 className='text-[var(--h3-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-3)]'>
            খবরের কাগজ
          </h2>
          <p className='text-[var(--font-size-lg)] text-[var(--color-text-secondary)] mb-[var(--spacing-3)]'>
            খবরের কাগজ বাংলাদেশের একটি অগ্রণী ডিজিটাল সংবাদপত্র যা দেশের সবচেয়ে
            গুরুত্বপূর্ণ খবর, বিশ্লেষণ এবং মতামত প্রদান করে।
          </p>
          <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)]'>
            আমরা বিশ্বাস করি সঠিক তথ্য এবং স্বচ্ছতায়। আমাদের সম্পাদকীয় টিম
            ক্রমাগত মান নিয়ন্ত্রণ বজায় রেখে সর্বোত্তম সাংবাদিকতা প্রদান করে।
          </p>
        </Card>

        <h2 className='text-[var(--h3-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--margin-lg)]'>
          আমাদের মূল্যবোধ
        </h2>

        <Grid columns={3} gap='lg' className='mb-[var(--margin-xl)]'>
          <Card padding='md' variant='outlined'>
            <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
              সততা
            </h3>
            <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)]'>
              আমরা সর্বদা সত্যিকারের এবং যাচাইকৃত তথ্য প্রদান করি।
            </p>
          </Card>

          <Card padding='md' variant='outlined'>
            <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
              স্বাধীনতা
            </h3>
            <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)]'>
              আমাদের সম্পাদকীয় সিদ্ধান্ত সম্পূর্ণ স্বাধীন এবং নিরপেক্ষ।
            </p>
          </Card>

          <Card padding='md' variant='outlined'>
            <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
              দায়বদ্ধতা
            </h3>
            <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)]'>
              আমরা আমাদের পাঠকদের কাছে সম্পূর্ণ দায়বদ্ধ।
            </p>
          </Card>
        </Grid>

        <Card padding='lg' variant='elevated'>
          <h2 className='text-[var(--h3-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-3)]'>
            যোগাযোগ করুন
          </h2>
          <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)] mb-[var(--spacing-2)]'>
            📧 ইমেইল: info@khoborer-kagoj.local
          </p>
          <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)] mb-[var(--spacing-2)]'>
            📱 ফোন: +88 01700 000000
          </p>
          <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)]'>
            📍 ঠিকানা: ঢাকা, বাংলাদেশ
          </p>
        </Card>
      </Container>
    </main>
  )
}
