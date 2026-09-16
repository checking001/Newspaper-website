<?php

use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'খবরের কাগজ API is running',
        'timestamp' => now()->toIso8601String(),
    ]);
});