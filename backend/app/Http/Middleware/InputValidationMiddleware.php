<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class InputValidationMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Only validate POST, PUT, PATCH requests
        if (!in_array($request->method(), ['POST', 'PUT', 'PATCH'])) {
            return $next($request);
        }

        // Sanitize inputs
        if ($request->isJson()) {
            $data = $request->json()->all();
            $data = $this->sanitizeArray($data);
            $request->json()->replace($data);
        } else {
            $data = $request->all();
            $data = $this->sanitizeArray($data);
            $request->merge($data);
        }

        return $next($request);
    }

    private function sanitizeArray(array $data): array
    {
        $sanitized = [];
        
        foreach ($data as $key => $value) {
            // Prevent SQL injection patterns
            if (is_string($value)) {
                $value = $this->sanitizeString($value);
            } elseif (is_array($value)) {
                $value = $this->sanitizeArray($value);
            }
            
            $sanitized[$key] = $value;
        }
        
        return $sanitized;
    }

    private function sanitizeString(string $value): string
    {
        // Remove potential XSS vectors
        $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
        
        // Remove null bytes
        $value = str_replace("\0", '', $value);
        
        // Trim whitespace
        $value = trim($value);
        
        return $value;
    }
}