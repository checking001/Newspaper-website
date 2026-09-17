<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class PublicCategoryController extends Controller
{
    /**
     * Get all categories (public tree structure)
     */
    public function index()
    {
        $categories = Category::where('is_active', true)
            ->with('children')
            ->orderBy('display_order')
            ->whereNull('parent_id')
            ->get();

        return response()->json($categories);
    }

    /**
     * Get category with articles
     */
    public function show($slug, Request $request)
    {
        $category = Category::where('slug', $slug)
            ->where('is_active', true)
            ->with('children')
            ->firstOrFail();

        // Get articles in category (and subcategories)
        $categoryIds = [$category->id];
        $categoryIds = array_merge($categoryIds, $category->children()->pluck('id')->toArray());

        $articles = \App\Models\Article::whereIn('category_id', $categoryIds)
            ->where('status', 'published')
            ->with('category', 'author')
            ->orderBy('published_at', 'desc')
            ->paginate(20);

        return response()->json([
            'category' => $category,
            'articles' => $articles,
        ]);
    }
}