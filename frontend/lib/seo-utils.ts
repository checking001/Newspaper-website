import { SITE_NAME, SITE_DESCRIPTION } from './constants'
import { Article, Author, Category } from './public-api'

export interface ArticleMetadata {
  title: string
  description: string
  image?: string
  url: string
  author?: string
  publishedDate?: string
  modifiedDate?: string
}

/**
 * Generate article metadata
 */
export function generateArticleMetadata (article: Article): ArticleMetadata {
  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.summary,
    image: article.featured_image,
    url: `http://localhost:3000/articles/${article.slug}`,
    author: article.author?.name,
    publishedDate: article.published_at,
    modifiedDate: article.published_at
  }
}

/**
 * Generate category metadata
 */
export function generateCategoryMetadata (category: Category): ArticleMetadata {
  return {
    title: `${category.name} | ${SITE_NAME}`,
    description: category.description || `সব ${category.name} সংবাদ`,
    url: `http://localhost:3000/categories/${category.slug}`
  }
}

/**
 * Generate author metadata
 */
export function generateAuthorMetadata (author: Author): ArticleMetadata {
  return {
    title: `${author.name} | লেখক | ${SITE_NAME}`,
    description: author.bio || `${author.name} এর লেখা সব খবর`,
    image: author.profile_image,
    url: `http://localhost:3000/authors/${author.slug}`
  }
}

/**
 * Generate JSON-LD Article Schema
 */
export function generateArticleSchema (article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.seo_title || article.title,
    description: article.seo_description || article.summary,
    image: article.featured_image || 'http://localhost:3000/default-image.jpg',
    datePublished: article.published_at,
    dateModified: article.published_at,
    author: {
      '@type': 'Person',
      name: article.author?.name,
      url: `http://localhost:3000/authors/${article.author?.slug}`
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: 'http://localhost:3000/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `http://localhost:3000/articles/${article.slug}`
    }
  }
}

/**
 * Generate JSON-LD Organization Schema
 */
export function generateOrganizationSchema () {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: 'http://localhost:3000',
    logo: 'http://localhost:3000/logo.png',
    description: SITE_DESCRIPTION,
    sameAs: [
      'https://www.facebook.com/khoborer-kagoj',
      'https://twitter.com/khoborer_kagoj',
      'https://www.instagram.com/khoborer_kagoj'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+880-2-XXXX-XXXX',
      contactType: 'Customer Service'
    }
  }
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl (path: string): string {
  return `http://localhost:3000${path}`
}
