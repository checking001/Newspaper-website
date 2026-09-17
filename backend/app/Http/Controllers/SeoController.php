<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    /**
     * Generate sitemap.xml
     */
    public function sitemap()
    {
        $articles = Article::where('status', 'published')
            ->select('slug', 'updated_at')
            ->orderBy('updated_at', 'desc')
            ->get();

        $categories = Category::where('is_active', true)
            ->select('slug', 'updated_at')
            ->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        // Homepage
        $xml .= '  <url>' . "\n";
        $xml .= '    <loc>http://localhost:3000</loc>' . "\n";
        $xml .= '    <lastmod>' . now()->toW3cString() . '</lastmod>' . "\n";
        $xml .= '    <priority>1.0</priority>' . "\n";
        $xml .= '  </url>' . "\n";

        // Articles
        foreach ($articles as $article) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>http://localhost:3000/articles/' . $article->slug . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $article->updated_at->toW3cString() . '</lastmod>' . "\n";
            $xml .= '    <priority>0.8</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        // Categories
        foreach ($categories as $category) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>http://localhost:3000/categories/' . $category->slug . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $category->updated_at->toW3cString() . '</lastmod>' . "\n";
            $xml .= '    <priority>0.7</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        // Info pages
        $pages = ['about', 'contact', 'privacy', 'terms'];
        foreach ($pages as $page) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>http://localhost:3000/' . $page . '</loc>' . "\n";
            $xml .= '    <priority>0.6</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }

    /**
     * Generate RSS feed
     */
    public function rss()
    {
        $articles = Article::where('status', 'published')
            ->with('category', 'author')
            ->orderBy('published_at', 'desc')
            ->limit(50)
            ->get();

        $rss = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $rss .= '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">' . "\n";
        $rss .= '  <channel>' . "\n";
        $rss .= '    <title>খবরের কাগজ</title>' . "\n";
        $rss .= '    <link>http://localhost:3000</link>' . "\n";
        $rss .= '    <description>বাংলাদেশের শীর্ষস্থানীয় ডিজিটাল সংবাদপত্র</description>' . "\n";
        $rss .= '    <language>bn</language>' . "\n";
        $rss .= '    <lastBuildDate>' . now()->toRfc2822String() . '</lastBuildDate>' . "\n";

        foreach ($articles as $article) {
            $rss .= '    <item>' . "\n";
            $rss .= '      <title><![CDATA[' . $article->title . ']]></title>' . "\n";
            $rss .= '      <link>http://localhost:3000/articles/' . $article->slug . '</link>' . "\n";
            $rss .= '      <guid>http://localhost:3000/articles/' . $article->slug . '</guid>' . "\n";
            $rss .= '      <pubDate>' . $article->published_at->toRfc2822String() . '</pubDate>' . "\n";
            $rss .= '      <description><![CDATA[' . $article->summary . ']]></description>' . "\n";
            $rss .= '      <content:encoded><![CDATA[' . $article->content . ']]></content:encoded>' . "\n";
            $rss .= '      <author>' . $article->author->email . ' (' . $article->author->name . ')</author>' . "\n";
            $rss .= '      <category>' . $article->category->name . '</category>' . "\n";
            $rss .= '    </item>' . "\n";
        }

        $rss .= '  </channel>' . "\n";
        $rss .= '</rss>';

        return response($rss, 200)
            ->header('Content-Type', 'application/rss+xml');
    }

    /**
     * Get article structured data (JSON-LD)
     */
    public function articleSchema($slug)
    {
        $article = Article::where('slug', $slug)
            ->where('status', 'published')
            ->with('category', 'author')
            ->firstOrFail();

        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'NewsArticle',
            'headline' => $article->seo_title ?: $article->title,
            'description' => $article->seo_description ?: $article->summary,
            'image' => $article->featured_image ?: 'http://localhost:3000/default-image.jpg',
            'datePublished' => $article->published_at->toIso8601String(),
            'dateModified' => $article->updated_at->toIso8601String(),
            'author' => [
                '@type' => 'Person',
                'name' => $article->author->name,
                'url' => 'http://localhost:3000/authors/' . $article->author->slug,
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => 'খবরের কাগজ',
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => 'http://localhost:3000/logo.png',
                ],
            ],
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => 'http://localhost:3000/articles/' . $article->slug,
            ],
        ];

        return response()->json($schema);
    }

    /**
     * Get organization schema
     */
    public function organizationSchema()
    {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => 'খবরের কাগজ',
            'url' => 'http://localhost:3000',
            'logo' => 'http://localhost:3000/logo.png',
            'description' => 'বাংলাদেশের শীর্ষস্থানীয় ডিজিটাল সংবাদপত্র',
            'sameAs' => [
                'https://www.facebook.com/khoborer-kagoj',
                'https://twitter.com/khoborer_kagoj',
                'https://www.instagram.com/khoborer_kagoj',
            ],
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'telephone' => '+880-2-XXXX-XXXX',
                'contactType' => 'Customer Service',
            ],
        ];

        return response()->json($schema);
    }
}