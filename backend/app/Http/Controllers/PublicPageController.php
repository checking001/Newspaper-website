<?php

namespace App\Http\Controllers;

use App\Models\HomepageSection;
use App\Models\Category;
use App\Models\Author;
use App\Models\Tag;
use Illuminate\Http\Request;

class PublicPageController extends Controller
{
    /**
     * Get homepage data (dynamic sections)
     */
    public function homepage()
    {
        $sections = HomepageSection::where('is_enabled', true)
            ->orderBy('display_order')
            ->get();

        $sectionData = [];

        foreach ($sections as $section) {
            $query = \App\Models\Article::where('status', 'published')
                ->orderBy('published_at', 'desc');

            if ($section->category_id) {
                $query->where('category_id', $section->category_id);
            }

            $articles = $query->limit($section->article_count)->get();

            $sectionData[] = [
                'id' => $section->id,
                'title' => $section->title,
                'category' => $section->category,
                'layout_type' => $section->layout_type,
                'articles' => $articles,
            ];
        }

        return response()->json($sectionData);
    }

    /**
     * Get author page
     */
    public function author($slug)
    {
        $author = Author::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $articles = \App\Models\Article::where('author_id', $author->id)
            ->where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->paginate(20);

        return response()->json([
            'author' => $author,
            'articles' => $articles,
        ]);
    }

    /**
     * Get tag page
     */
    public function tag($slug)
    {
        $tag = Tag::where('slug', $slug)->firstOrFail();

        $articles = $tag->articles()
            ->where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->paginate(20);

        return response()->json([
            'tag' => $tag,
            'articles' => $articles,
        ]);
    }

    /**
     * Get info page (static content)
     */
    public function page($slug)
    {
        $pages = [
            'about' => [
                'title' => 'আমাদের সম্পর্কে',
                'content' => 'খবরের কাগজ হল বাংলাদেশের শীর্ষস্থানীয় ডিজিটাল সংবাদপত্র। আমরা সত্যিকারের খবর প্রদানে প্রতিশ্রুতিবদ্ধ।',
            ],
            'contact' => [
                'title' => 'যোগাযোগ করুন',
                'content' => 'ইমেইল: contact@khoborer-kagoj.local\nফোন: +880 2 XXXX XXXX\nঠিকানা: ঢাকা, বাংলাদেশ',
            ],
            'privacy' => [
                'title' => 'গোপনীয়তা নীতি',
                'content' => 'আমরা আপনার ব্যক্তিগত তথ্য রক্ষা করি।',
            ],
            'terms' => [
                'title' => 'শর্তাবলী',
                'content' => 'এই ওয়েবসাইট ব্যবহার করে আপনি আমাদের শর্তাবলী স্বীকার করছেন।',
            ],
        ];

        if (!isset($pages[$slug])) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        return response()->json($pages[$slug]);
    }
}