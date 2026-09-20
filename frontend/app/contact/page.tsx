'use client'

import React, { useState } from 'react'
import { Container, Breadcrumb, Card, Button, Alert } from '@/components/shared'
import MobileTextInput from '@/components/shared/MobileTextInput'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactPage () {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = 'নাম প্রয়োজন'
    if (!formData.email.trim()) newErrors.email = 'ইমেইল প্রয়োজন'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'বৈধ ইমেইল প্রবেশ করুন'
    if (!formData.subject.trim()) newErrors.subject = 'বিষয় প্রয়োজন'
    if (!formData.message.trim()) newErrors.message = 'বার্তা প্রয়োজন'
    if (formData.message.length < 10)
      newErrors.message = 'বার্তা কমপক্ষে ১০ অক্ষর হতে হবে'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
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
      setErrors({ subject: 'একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।' })
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
                আপনার বার্তা সফলভাবে পাঠানো হয়েছে।
              </Alert>
            )}

            <form
              onSubmit={handleSubmit}
              className='space-y-[var(--spacing-3)]'
            >
              <MobileTextInput
                label='নাম'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='আপনার নাম'
                error={errors.name}
                required
              />

              <MobileTextInput
                label='ইমেইল'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='your@email.com'
                error={errors.email}
                required
              />

              <MobileTextInput
                label='বিষয়'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                placeholder='বিষয় লিখুন'
                error={errors.subject}
                required
              />

              <div className='mb-[var(--spacing-4)]'>
                <label className='block text-[var(--font-size-sm)] font-bold text-[var(--color-primary)] mb-[var(--spacing-2)]'>
                  বার্তা *
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder='আপনার বার্তা লিখুন'
                  className={`
                    w-full
                    px-[var(--spacing-3)]
                    py-[var(--spacing-3)]
                    text-base
                    border-2
                    rounded-lg
                    text-[var(--color-text-primary)]
                    bg-[var(--color-bg-primary)]
                    focus:outline-none
                    focus:border-[var(--color-primary)]
                    transition-colors
                    resize-vertical
                    min-h-[120px]
                    ${
                      errors.message
                        ? 'border-red-500'
                        : 'border-[var(--color-border)]'
                    }
                  `}
                />
                {errors.message && (
                  <p className='text-[var(--font-size-xs)] text-red-500 mt-[var(--spacing-1)]'>
                    ⚠️ {errors.message}
                  </p>
                )}
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
                className='text-[var(--color-primary)] hover:underline text-[var(--font-size-base)] break-all'
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
          </div>
        </div>
      </Container>
    </main>
  )
}
