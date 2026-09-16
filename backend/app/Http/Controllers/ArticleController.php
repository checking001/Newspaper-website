<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with('category', 'author', 'tags');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('title', 'like', "%$search%")
                  ->orWhere('content', 'like', "%$search%");
        }

        $articles = $query->orderBy('created_at', 'desc')
                         ->paginate(20);

        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Article::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'author_id' => 'required|exists:authors,id',
            'status' => 'in:draft,pending,published,scheduled',
            'published_at' => 'nullable|date',
            'scheduled_at' => 'nullable|date',
            'featured_image' => 'nullable|string',
            'is_breaking' => 'boolean',
            'is_featured' => 'boolean',
            'seo_title' => 'nullable|string|max:60',
            'seo_description' => 'nullable|string|max:160',
        ]);

        $article = Article::create([
            ...$validated,
            'slug' => \Str::slug($validated['title']),
        ]);

        return response()->json($article, 201);
    }

    public function show(Article $article)
    {
        $this->authorize('view', $article);
        return response()->json($article->load('category', 'author', 'tags', 'revisions'));
    }

    public function update(Request $request, Article $article)
    {
        $this->authorize('update', $article);

        $validated = $request->validate([
            'title' => 'string|max:255',
            'summary' => 'string',
            'content' => 'string',
            'category_id' => 'exists:categories,id',
            'author_id' => 'exists:authors,id',
            'status' => 'in:draft,pending,published,scheduled,archived,trash',
            'published_at' => 'nullable|date',
            'scheduled_at' => 'nullable|date',
            'featured_image' => 'nullable|string',
            'is_breaking' => 'boolean',
            'is_featured' => 'boolean',
            'seo_title' => 'nullable|string|max:60',
            'seo_description' => 'nullable|string|max:160',
        ]);

        $article->update($validated);

        return response()->json($article);
    }

    public function destroy(Request $request, Article $article)
    {
        $this->authorize('delete', $article);
        
        $article->deleted_by = $request->user()->id;
        $article->save();
        $article->delete();

        return response()->json(['message' => 'Article deleted']);
    }

    public function publish(Request $request, Article $article)
    {
        $this->authorize('publish', $article);

        $article->update([
            'status' => 'published',
            'published_at' => now(),
        ]);

        return response()->json($article);
    }

    public function restore(Article $article)
    {
        $this->authorize('delete', $article);
        $article->restore();
        return response()->json(['message' => 'Article restored']);
    }
}