import { Metadata } from 'next'
import { PublicApiService } from '@/lib/public-api'
import { generateArticleMetadata } from '@/lib/seo-utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata ({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const data = await PublicApiService.getArticleBySlug(slug)
    const article = data.article
    const meta = generateArticleMetadata(article)

    return {
      title: meta.title,
      description: meta.description,
      keywords: article.tags?.map((t: { name: string }) => t.name).join(', '),
      openGraph: {
        type: 'article',
        title: meta.title,
        description: meta.description,
        url: meta.url,
        images: meta.image ? [{ url: meta.image }] : [],
        authors: [meta.author || SITE_NAME],
        publishedTime: meta.publishedDate
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.description,
        images: meta.image ? [meta.image] : []
      },
      alternates: {
        canonical: meta.url
      }
    }
  } catch (error) {
    return {
      title: 'খবর | খবরের কাগজ'
    }
  }
}

const SITE_NAME = 'খবরের কাগজ'

export default function Layout ({ children }: { children: React.ReactNode }) {
  return children
}
