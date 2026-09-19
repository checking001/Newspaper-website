<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecurityHeadersMiddleware
{
    /**
     * Handle the incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Content Security Policy
        $csp = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' http://localhost:3000 http://127.0.0.1:3000; frame-ancestors 'none';";
        $response->header('Content-Security-Policy', $csp);

        // X-Frame-Options
        $response->header('X-Frame-Options', 'DENY');

        // X-Content-Type-Options
        $response->header('X-Content-Type-Options', 'nosniff');

        // X-XSS-Protection
        $response->header('X-XSS-Protection', '1; mode=block');

        // Referrer-Policy
        $response->header('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Permissions-Policy
        $response->header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

        // HSTS (only in production)
        if (config('app.env') === 'production') {
            $response->header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        // Allow CORS
        $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->header('Access-Control-Allow-Credentials', 'true');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        return $response;
    }
}