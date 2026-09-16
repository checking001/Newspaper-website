<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MediaController;


// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'খবরের কাগজ API is running',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Public routes
Route::get('/articles', function () {
    return response()->json([
        'message' => 'Articles endpoint - coming soon',
        'articles' => [],
    ]);
});

Route::get('/categories', function () {
    return response()->json([
        'message' => 'Categories endpoint - coming soon',
        'categories' => [],
    ]);
});

// Auth routes (public)
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/test', function () {
    return response()->json(['message' => 'Test works']);
});

// Protected routes (require auth)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);

    // Admin routes
    Route::get('/admin/dashboard', function () {
        return response()->json([
            'message' => 'Admin dashboard - coming soon',
        ]);
    });
    // Articles
    Route::apiResource('articles', ArticleController::class);
    Route::post('articles/{article}/publish', [ArticleController::class, 'publish']);
    Route::post('articles/{article}/restore', [ArticleController::class, 'restore']);

    // Categories
    Route::apiResource('categories', CategoryController::class);

    // Authors
    Route::apiResource('authors', AuthorController::class);

    // Tags
    Route::apiResource('tags', TagController::class);

    // Media
    Route::apiResource('media', MediaController::class);
});

Route::fallback(function () {
    return response()->json([
        'message' => 'Endpoint not found',
    ], 404);
});