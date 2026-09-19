<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PublicArticleController;
use App\Http\Controllers\PublicCategoryController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\SeoController;

// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'খবরের কাগজ API is running',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Public API Routes (No Auth Required)
Route::get('/articles', [PublicArticleController::class, 'index']);
Route::get('/articles/search', [PublicArticleController::class, 'search']);
Route::get('/articles/breaking', [PublicArticleController::class, 'breaking']);
Route::get('/articles/most-read', [PublicArticleController::class, 'mostRead']);
Route::get('/articles/archive', [PublicArticleController::class, 'archive']);
Route::get('/articles/{slug}', [PublicArticleController::class, 'show']);

Route::get('/categories', [PublicCategoryController::class, 'index']);
Route::get('/categories/{slug}', [PublicCategoryController::class, 'show']);

Route::get('/homepage', [PublicPageController::class, 'homepage']);
Route::get('/authors/{slug}', [PublicPageController::class, 'author']);
Route::get('/tags/{slug}', [PublicPageController::class, 'tag']);
Route::get('/pages/{slug}', [PublicPageController::class, 'page']);

// SEO routes
Route::get('/sitemap.xml', [SeoController::class, 'sitemap']);
Route::get('/feed.rss', [SeoController::class, 'rss']);
Route::get('/schema/article/{slug}', [SeoController::class, 'articleSchema']);
Route::get('/schema/organization', [SeoController::class, 'organizationSchema']);

// Auth routes (Public)
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/test', function () {
    return response()->json(['message' => 'Test works']);
});

// Protected Routes (Require Auth for Admin Operations)
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);

    // Admin dashboard
    Route::get('/dashboard', function () {
        return response()->json([
            'message' => 'Admin dashboard - operational',
        ]);
    });

    // Admin CRUD Operations
    Route::apiResource('articles', ArticleController::class);
    Route::post('articles/{article}/publish', [ArticleController::class, 'publish']);
    Route::post('articles/{article}/restore', [ArticleController::class, 'restore']);

    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('authors', AuthorController::class);
    Route::apiResource('tags', TagController::class);
    Route::apiResource('media', MediaController::class);
});

// Fallback Route
Route::fallback(function () {
    return response()->json([
        'message' => 'Endpoint not found',
    ], 404);
});