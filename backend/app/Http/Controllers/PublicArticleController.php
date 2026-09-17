<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Author;
use Illuminate\Http\Request;

class PublicArticleController extends Controller
{
    /**
     * Get latest articles (public)
     */
    public function index(Request $request)
    {
        $query = Article::where('status', 'published')
            ->with('category', 'author', 'tags')
            ->orderBy('published_at', 'desc');

        // Filter by category
        if ($request->has('category_slug')) {
            $category = Category::where('slug', $request->category_slug)->firstOrFail();
            $query->where('category_id', $category->id);
        }

        // Filter by tag
        if ($request->has('tag_slug')) {
            $tag = Tag::where('slug', $request->tag_slug)->firstOrFail();
            $query->whereHas('tags', function ($q) use ($tag) {
                $q->where('tags.id', $tag->id);
            });
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where('title', 'like', "%$search%")
                  ->orWhere('summary', 'like', "%$search%");
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $articles = $query->paginate(20);

        return response()->json($articles);
    }

    /**
     * Get single article by slug
     */
    public function show($slug)
    {
        $article = Article::where('slug', $slug)
            ->where('status', 'published')
            ->with('category', 'author', 'tags', 'revisions')
            ->firstOrFail();

        // Related articles (same category)
        $related = Article::where('status', 'published')
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->limit(5)
            ->get();

        return response()->json([
            'article' => $article,
            'related' => $related,
        ]);
    }

    /**
     * Get most read articles
     */
    public function mostRead(Request $request)
    {
        $limit = $request->get('limit', 10);

        // For now, return featured + recent articles as "most read"
        // In future: add views tracking
        $articles = Article::where('status', 'published')
            ->orderBy('is_featured', 'desc')
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();

        return response()->json($articles);
    }

    /**
     * Get breaking news
     */
    public function breaking(Request $request)
    {
        $limit = $request->get('limit', 5);

        $articles = Article::where('status', 'published')
            ->where('is_breaking', true)
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();

        return response()->json($articles);
    }

    /**
     * Search articles
     */
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2',
        ]);

        $query = $request->get('q');

        $articles = Article::where('status', 'published')
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%$query%")
                  ->orWhere('summary', 'like', "%$query%")
                  ->orWhere('content', 'like', "%$query%");
            })
            ->with('category', 'author')
            ->orderBy('published_at', 'desc')
            ->paginate(20);

        return response()->json($articles);
    }

    /**
     * Get archive (by date)
     */
    public function archive(Request $request)
    {
        $year = $request->get('year');
        $month = $request->get('month');

        $query = Article::where('status', 'published');

        if ($year) {
            $query->whereYear('published_at', $year);
        }

        if ($month) {
            $query->whereMonth('published_at', $month);
        }

        $articles = $query->orderBy('published_at', 'desc')
            ->paginate(20);

        return response()->json($articles);
    }
}