'use client'

import React, { useState } from 'react'
import Button from './Button'
import Alert from './Alert'

interface NewsletterSignupProps {
  className?: string
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  className = ''
}) => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setMessage({
          type: 'success',
          text: '✅ আপনি সফলভাবে সাবস্ক্রাইব করেছেন!'
        })
        setEmail('')
      } else {
        setMessage({
          type: 'error',
          text: '❌ সাবস্ক্রাইবশনে ত্রুটি হয়েছে। আবার চেষ্টা করুন।'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: '❌ কোন সমস্যা হয়েছে। আবার চেষ্টা করুন।'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      className={`bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-[var(--radius-lg)] p-[var(--padding-lg)] ${className}`}
    >
      <div className='max-w-[600px] mx-auto text-center'>
        <h3 className='text-[var(--h3-size-mobile)] md:text-[var(--h3-size-tablet)] font-bold mb-[var(--spacing-2)]'>
          📰 আমাদের নিউজলেটার সাবস্ক্রাইব করুন
        </h3>

        <p className='text-[var(--font-size-base)] text-gray-100 mb-[var(--spacing-6)]'>
          প্রতিদিন সকালে সরাসরি আপনার ইনবক্সে সেরা খবর পান। কোনো স্প্যাম নেই,
          শুধু গুণমানের সংবাদ।
        </p>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col sm:flex-row gap-[var(--spacing-3)] mb-[var(--spacing-4)]'
        >
          <input
            type='email'
            placeholder='আপনার ইমেইল'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className='flex-1 px-[var(--padding-md)] py-[var(--spacing-3)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] focus:outline-none'
          />
          <Button
            type='submit'
            variant='accent'
            size='md'
            isLoading={isLoading}
            disabled={isLoading}
            className='sm:flex-shrink-0'
          >
            সাবস্ক্রাইব করুন
          </Button>
        </form>

        {message && (
          <Alert type={message.type} onClose={() => setMessage(null)}>
            {message.text}
          </Alert>
        )}

        <p className='text-[var(--font-size-xs)] text-gray-200'>
          আমরা আপনার ইমেইল সুরক্ষিত রাখি। যেকোনো সময় আনসাবস্ক্রাইব করতে পারবেন।
        </p>
      </div>
    </section>
  )
}

export default NewsletterSignup
