'use client'

import React, { useState } from 'react'
import Button from './Button'
import Alert from './Alert'

interface CommentData {
  id: number
  author: string
  email: string
  content: string
  createdAt: string
  replies?: CommentData[]
}

interface CommentProps {
  comments: CommentData[]
  articleId: number
  isLoading?: boolean
  onAddComment?: (comment: {
    author: string
    email: string
    content: string
  }) => Promise<void>
  className?: string
}

export const Comment: React.FC<CommentProps> = ({
  comments,
  articleId,
  isLoading = false,
  onAddComment,
  className = ''
}) => {
  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !email.trim() || !content.trim()) {
      setMessage({ type: 'error', text: 'সব ফিল্ড পূরণ করুন' })
      return
    }

    setSubmitting(true)
    try {
      await onAddComment?.({ author, email, content })
      setAuthor('')
      setEmail('')
      setContent('')
      setMessage({ type: 'success', text: 'মন্তব্য সফলভাবে যোগ করা হয়েছে!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'মন্তব্য যোগ করতে ব্যর্থ হয়েছে' })
    } finally {
      setSubmitting(false)
    }
  }

  const CommentItem: React.FC<{ comment: CommentData; level?: number }> = ({
    comment,
    level = 0
  }) => (
    <div
      className={`mb-[var(--spacing-4)] ${
        level > 0 ? 'ml-[var(--spacing-6)]' : ''
      }`}
    >
      <div className='bg-[var(--color-bg-secondary)] rounded-[var(--radius-lg)] p-[var(--padding-md)]'>
        <div className='flex items-center justify-between mb-[var(--spacing-2)]'>
          <div>
            <p className='font-semibold text-[var(--color-primary)]'>
              {comment.author}
            </p>
            <time className='text-[var(--meta-size)] text-[var(--color-text-tertiary)]'>
              {formatDate(comment.createdAt)}
            </time>
          </div>
        </div>
        <p className='text-[var(--font-size-base)] text-[var(--color-text-secondary)] mb-[var(--spacing-3)]'>
          {comment.content}
        </p>
        <button className='text-[var(--font-size-sm)] text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-semibold transition-colors'>
          জবাব দিন
        </button>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className='mt-[var(--spacing-4)]'>
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className={`space-y-[var(--spacing-6)] ${className}`}>
      {/* Comment Form */}
      {onAddComment && (
        <div className='bg-[var(--color-bg-secondary)] rounded-[var(--radius-lg)] p-[var(--padding-md)]'>
          <h3 className='text-[var(--h4-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-4)]'>
            মন্তব্য যোগ করুন
          </h3>

          {message && (
            <Alert
              type={message.type}
              onClose={() => setMessage(null)}
              className='mb-[var(--spacing-4)]'
            >
              {message.text}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className='space-y-[var(--spacing-3)]'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-3)]'>
              <input
                type='text'
                placeholder='আপনার নাম'
                value={author}
                onChange={e => setAuthor(e.target.value)}
                required
                className='px-[var(--padding-md)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--font-size-base)] focus:outline-none focus:border-[var(--color-primary)]'
              />
              <input
                type='email'
                placeholder='আপনার ইমেইল'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className='px-[var(--padding-md)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--font-size-base)] focus:outline-none focus:border-[var(--color-primary)]'
              />
            </div>

            <textarea
              placeholder='আপনার মন্তব্য...'
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              rows={5}
              className='w-full px-[var(--padding-md)] py-[var(--spacing-2)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--font-size-base)] focus:outline-none focus:border-[var(--color-primary)] resize-none'
            />

            <Button
              type='submit'
              variant='primary'
              isLoading={submitting}
              disabled={submitting || isLoading}
            >
              মন্তব্য জমা দিন
            </Button>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div>
        <h3 className='text-[var(--h4-size-mobile)] font-bold text-[var(--color-primary)] mb-[var(--spacing-4)]'>
          মন্তব্য ({comments.length})
        </h3>

        {comments.length === 0 ? (
          <p className='text-[var(--font-size-base)] text-[var(--color-text-tertiary)] text-center py-[var(--padding-lg)]'>
            এখনো কোনো মন্তব্য নেই। প্রথম জন হন!
          </p>
        ) : (
          <div className='space-y-[var(--spacing-4)]'>
            {comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment
