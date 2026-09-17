import { MetadataRoute } from 'next'
import { PublicApiService } from '@/lib/public-api'

export default async function sitemap (): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'http://localhost:3000'
  const lastModified = new Date()

  // Fetch articles and categories
  const [articlesRes, categoriesRes] = await Promise.all([
    PublicApiService.getArticles(1).catch(() => ({ data: [] })),
    PublicApiService.getCategories().catch(() => [])
  ])

  const articles = articlesRes.data || []
  const categories = categoriesRes

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      priority: 1
    },
    {
      url: `${baseUrl}/articles`,
      lastModified,
      priority: 0.9
    },
    {
      url: `${baseUrl}/archive`,
      lastModified,
      priority: 0.7
    }
  ]

  // Add articles
  if (Array.isArray(articles)) {
    articles.forEach((article: any) => {
      routes.push({
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: new Date(article.updated_at),
        priority: 0.8
      })
    })
  }

  // Add categories
  if (Array.isArray(categories)) {
    categories.forEach((category: any) => {
      routes.push({
        url: `${baseUrl}/categories/${category.slug}`,
        lastModified: new Date(category.updated_at),
        priority: 0.7
      })
    })
  }

  // Add info pages
  ;['about', 'contact', 'privacy', 'terms'].forEach(page => {
    routes.push({
      url: `${baseUrl}/${page}`,
      lastModified,
      priority: 0.6
    })
  })

  return routes
}
