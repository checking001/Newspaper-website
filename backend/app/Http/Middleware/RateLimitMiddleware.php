<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Cache\RateLimiter;

class RateLimitMiddleware
{
    protected RateLimiter $limiter;

    public function __construct(RateLimiter $limiter)
    {
        $this->limiter = $limiter;
    }

    public function handle(Request $request, Closure $next)
    {
        $key = $this->resolveRequestSignature($request);

        // Login attempts: 5 per minute
        if ($request->path() === 'api/v1/auth/login') {
            if ($this->limiter->tooManyAttempts($key . ':login', 5, 1)) {
                return response()->json([
                    'message' => 'Too many login attempts. Please try again in ' . $this->limiter->availableIn($key . ':login') . ' seconds.',
                ], 429);
            }
            $this->limiter->hit($key . ':login', 1);
        }

        // General API: 60 per minute
        if (str_starts_with($request->path(), 'api/')) {
            if ($this->limiter->tooManyAttempts($key . ':api', 60, 1)) {
                return response()->json([
                    'message' => 'Too many requests. Please try again later.',
                ], 429);
            }
            $this->limiter->hit($key . ':api', 1);
        }

        return $next($request);
    }

    protected function resolveRequestSignature(Request $request): string
    {
        return $request->user()?->id ? 'user_' . $request->user()->id : $request->ip();
    }
}