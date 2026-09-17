<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecurityHeadersMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Content Security Policy
        $response->header('Content-Security-Policy', "
            default-src 'self';
            script-src 'self' 'unsafe-inline' cdn.jsdelivr.net cdnjs.cloudflare.com;
            style-src 'self' 'unsafe-inline' fonts.googleapis.com;
            font-src 'self' fonts.gstatic.com;
            img-src 'self' data: https:;
            media-src 'self';
            connect-src 'self' http://localhost:3000 http://localhost:8000;
            frame-ancestors 'none';
            base-uri 'self';
        ");

        // Prevent iframe embedding
        $response->header('X-Frame-Options', 'DENY');

        // Prevent MIME type sniffing
        $response->header('X-Content-Type-Options', 'nosniff');

        // Enable XSS protection
        $response->header('X-XSS-Protection', '1; mode=block');

        // Referrer Policy
        $response->header('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Permissions Policy
        $response->header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

        // HSTS (Strict-Transport-Security)
        if (app()->environment() === 'production') {
            $response->header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        return $response;
    }
}