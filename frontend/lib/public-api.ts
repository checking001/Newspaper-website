import { API_URL } from './constants'

export interface Article {
  id: number
  title: string
  slug: string
  summary: string
  content: string
  featured_image?: string
  featured_image_caption?: string
  status: string
  published_at: string
  is_breaking: boolean
  is_featured: boolean
  seo_title?: string
  seo_description?: string
  category: { id: number; name: string; slug: string }
  author: { id: number; name: string; slug: string }
  tags: Array<{ id: number; name: string; slug: string }>
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  children?: Category[]
}

export interface Author {
  id: number
  name: string
  slug: string
  bio?: string
  profile_image?: string
  designation?: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface HomepageSection {
  id: number
  title: string
  category?: Category
  layout_type: string
  articles: Article[]
}

export class PublicApiService {
  static async getArticles (page = 1, categorySlug?: string, search?: string) {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    if (categorySlug) params.append('category_slug', categorySlug)
    if (search) params.append('search', search)

    const response = await fetch(`${API_URL}/articles?${params}`)
    if (!response.ok) throw new Error('Failed to fetch articles')
    return response.json()
  }

  static async getArticleBySlug (slug: string) {
    const response = await fetch(`${API_URL}/articles/${slug}`)
    if (!response.ok) throw new Error('Article not found')
    return response.json()
  }

  static async getBreakingNews (limit = 5) {
    const response = await fetch(`${API_URL}/articles/breaking?limit=${limit}`)
    if (!response.ok) throw new Error('Failed to fetch breaking news')
    return response.json()
  }

  static async getMostRead (limit = 10) {
    const response = await fetch(`${API_URL}/articles/most-read?limit=${limit}`)
    if (!response.ok) throw new Error('Failed to fetch most read')
    return response.json()
  }

  static async searchArticles (query: string, page = 1) {
    const response = await fetch(
      `${API_URL}/articles/search?q=${encodeURIComponent(query)}&page=${page}`
    )
    if (!response.ok) throw new Error('Search failed')
    return response.json()
  }

  static async getArchive (year?: number, month?: number) {
    const params = new URLSearchParams()
    if (year) params.append('year', year.toString())
    if (month) params.append('month', month.toString())

    const response = await fetch(`${API_URL}/articles/archive?${params}`)
    if (!response.ok) throw new Error('Failed to fetch archive')
    return response.json()
  }

  static async getCategories () {
    const response = await fetch(`${API_URL}/categories`)
    if (!response.ok) throw new Error('Failed to fetch categories')
    return response.json()
  }

  static async getCategoryBySlug (slug: string, page = 1) {
    const response = await fetch(`${API_URL}/categories/${slug}?page=${page}`)
    if (!response.ok) throw new Error('Category not found')
    return response.json()
  }

  static async getHomepage () {
    const response = await fetch(`${API_URL}/homepage`)
    if (!response.ok) throw new Error('Failed to fetch homepage')
    return response.json()
  }

  static async getAuthorBySlug (slug: string, page = 1) {
    const response = await fetch(`${API_URL}/authors/${slug}?page=${page}`)
    if (!response.ok) throw new Error('Author not found')
    return response.json()
  }

  static async getTagBySlug (slug: string, page = 1) {
    const response = await fetch(`${API_URL}/tags/${slug}?page=${page}`)
    if (!response.ok) throw new Error('Tag not found')
    return response.json()
  }

  static async getPage (slug: string) {
    const response = await fetch(`${API_URL}/pages/${slug}`)
    if (!response.ok) throw new Error('Page not found')
    return response.json()
  }
}
