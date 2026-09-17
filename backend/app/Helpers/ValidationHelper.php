<?php

namespace App\Helpers;

class ValidationHelper
{
    /**
     * Validate email
     */
    public static function validateEmail(string $email): bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * Validate URL
     */
    public static function validateUrl(string $url): bool
    {
        return filter_var($url, FILTER_VALIDATE_URL) !== false;
    }

    /**
     * Validate slug format
     */
    public static function validateSlug(string $slug): bool
    {
        return preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug) === 1;
    }

    /**
     * Sanitize text input
     */
    public static function sanitizeText(string $text, int $maxLength = 1000): string
    {
        // Remove tags
        $text = strip_tags($text);
        
        // HTML entities
        $text = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
        
        // Trim to max length
        $text = mb_substr($text, 0, $maxLength);
        
        return trim($text);
    }

    /**
     * Sanitize HTML (for rich text editors)
     */
    public static function sanitizeHtml(string $html): string
    {
        // Allow only safe tags
        $allowedTags = '<p><br><strong><em><u><h1><h2><h3><ul><ol><li><blockquote><a><img>';
        $html = strip_tags($html, $allowedTags);
        
        // Remove onclick, onerror, etc.
        $html = preg_replace('/\s*on\w+\s*=\s*["\']?[^"\']*["\']?/i', '', $html);
        
        return $html;
    }

    /**
     * Check for SQL injection patterns
     */
    public static function hasSqlInjectionPattern(string $input): bool
    {
        $patterns = [
            '/(\bunion\b.*\bselect\b)/i',
            '/(\bor\b.*\b1\s*=\s*1\b)/i',
            '/(\bdrop\b.*\b(table|database)\b)/i',
            '/(\binsert\b.*\binto\b)/i',
            '/(\bdelete\b.*\bfrom\b)/i',
            '/(\bupdate\b.*\bset\b)/i',
        ];
        
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $input)) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Check for XSS patterns
     */
    public static function hasXssPattern(string $input): bool
    {
        $patterns = [
            '/<script[^>]*>.*?<\/script>/i',
            '/on\w+\s*=\s*["\']?[^"\']*["\']?/i',
            '/<iframe[^>]*>/i',
            '/<embed[^>]*>/i',
            '/<object[^>]*>/i',
            '/javascript:/i',
            '/vbscript:/i',
        ];
        
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $input)) {
                return true;
            }
        }
        
        return false;
    }
}