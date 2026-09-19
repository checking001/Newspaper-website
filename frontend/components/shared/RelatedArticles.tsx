'use client'

import React from 'react'
import ArticleCard from './ArticleCard'
import Grid from './Grid'
import LoadingSpinner from './LoadingSpinner'
import EmptyState from './EmptyState'

interface Article {
  id: number
  title: string
  slug: string
  excerpt?: string
  featured_image?: string
  category?: { name: string }
  author?: { name: string }
  published_at?: string
}

interface RelatedArticlesProps {
  articles: Article[]
  isLoading?: boolean
  title?: string
  className?: string
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articles,
  isLoading = false,
  title = 'সম্পর্কিত খবর',
  className = ''
}) => {
  if (isLoading) {
    return <LoadingSpinner text='লোড হচ্ছে...' />
  }

  if (articles.length === 0) {
    return (
      <EmptyState
        icon='📰'
        title='কোনো সম্পর্কিত খবর নেই'
        description='এই বিভাগে আরও খবর শীঘ্রই আসবে'
      />
    )
  }

  // Determine grid columns based on article count
  const getGridColumns = (): 1 | 2 | 3 | 4 => {
    if (articles.length === 1) return 1
    if (articles.length === 2) return 2
    return 3
  }

  return (
    <div className={className}>
      <h2 className='text-[var(--h3-size-mobile)] md:text-[var(--h2-size-tablet)] font-bold text-[var(--color-primary)] mb-[var(--margin-lg)] pb-[var(--padding-md)] border-b-2 border-[var(--color-primary)]'>
        {title}
      </h2>

      <Grid columns={getGridColumns()} gap='lg'>
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            slug={article.slug}
            excerpt={article.excerpt}
            featuredImage={article.featured_image}
            category={article.category?.name || 'সংবাদ'}
            author={article.author?.name}
            publishedAt={article.published_at}
            variant='secondary'
          />
        ))}
      </Grid>
    </div>
  )
}

export default RelatedArticles
