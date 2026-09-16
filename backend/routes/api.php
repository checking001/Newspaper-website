<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

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
});

Route::fallback(function () {
    return response()->json([
        'message' => 'Endpoint not found',
    ], 404);
});