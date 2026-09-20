'use client'

import React, { useState } from 'react'
import { Container, Breadcrumb, Card, Button, Alert } from '@/components/shared'

export default function ContactPage () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Send to API endpoint
      const res = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      <Container maxWidth='2xl' padding='md' className='pt-[var(--margin-md)]'>
        <Breadcrumb
          items={[{ label: 'হোম', href: '/' }, { label: 'যোগাযোগ' }]}
        />
      </Container>

      <Container maxWidth='2xl' padding='md' className='mb-[var(--margin-xl)]'>
        <h1 className='text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--margin-lg)]'>
          যোগাযোগ করুন
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-[var(--margin-lg)]'>
          {/* Contact Form */}
          <Card variant='elevated' padding='lg'>
            {submitted && (
              <Alert type='success' className='mb-[var(--margin-md)]'>
                আপনার বার্তা সফলভাবে পাঠানো হয়েছে। শীঘ্রই আমরা যোগাযোগ করব।
              </Alert>
            )}

            <form
              onSubmit={handleSubmit}
              className='space-y-[var(--spacing-4)]'
            >
              <div>
                <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-1)]'>
                  নাম
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
                  placeholder='আপনার নাম'
                />
              </div>

              <div>
                <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-1)]'>
                  ইমেইল
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
                  placeholder='আপনার ইমেইল'
                />
              </div>

              <div>
                <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-1)]'>
                  বিষয়
                </label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
                  placeholder='বিষয় লিখুন'
                />
              </div>

              <div>
                <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-1)]'>
                  বার্তা
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className='w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]'
                  placeholder='আপনার বার্তা লিখুন'
                />
              </div>

              <Button
                variant='primary'
                size='md'
                disabled={loading}
                className='w-full'
              >
                {loading ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className='space-y-[var(--margin-md)]'>
            <Card variant='outlined' padding='lg'>
              <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-3)]'>
                আমাদের অফিস
              </h3>
              <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)]'>
                📍 ঢাকা, বাংলাদেশ
              </p>
            </Card>

            <Card variant='outlined' padding='lg'>
              <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-3)]'>
                ইমেইল
              </h3>

              <a
                href='mailto:info@khoborer-kagoj.local'
                className='text-[var(--color-primary)] hover:underline text-[var(--font-size-base)]'
              >
                📧 info@khoborer-kagoj.local
              </a>
            </Card>

            <Card variant='outlined' padding='lg'>
              <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-3)]'>
                ফোন
              </h3>

              <a
                href='tel:+8801700000000'
                className='text-[var(--color-primary)] hover:underline text-[var(--font-size-base)]'
              >
                📱 +৮৮ ০১৭০০ ০০০০০০
              </a>
            </Card>

            <Card variant='outlined' padding='lg'>
              <h3 className='text-[var(--h5-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-3)]'>
                সোশ্যাল মিডিয়া
              </h3>
              <div className='space-y-[var(--spacing-2)]'>
                <a
                  href='#'
                  className='block text-[var(--color-primary)] hover:underline'
                >
                  📘 ফেসবুক
                </a>
                <a
                  href='#'
                  className='block text-[var(--color-primary)] hover:underline'
                >
                  🐦 টুইটার
                </a>
                <a
                  href='#'
                  className='block text-[var(--color-primary)] hover:underline'
                >
                  📷 ইনস্টাগ্রাম
                </a>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  )
}
