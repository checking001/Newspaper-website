/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput (input: string): string {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

/**
 * Escape HTML special characters
 */
export function escapeHtml (text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

/**
 * Validate and sanitize URL
 */
export function validateUrl (url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Secure local storage access
 */
export function secureSetItem (key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value)
    }
  } catch (error) {
    console.error('Failed to set localStorage item:', error)
  }
}

export function secureGetItem (key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key)
    }
  } catch (error) {
    console.error('Failed to get localStorage item:', error)
  }
  return null
}

export function secureRemoveItem (key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key)
    }
  } catch (error) {
    console.error('Failed to remove localStorage item:', error)
  }
}

/**
 * Check if string contains potential XSS payload
 */
export function hasXssPayload (input: string): boolean {
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /on\w+\s*=\s*["\']?[^"\']*["\']?/gi,
    /<iframe[^>]*>/gi,
    /<embed[^>]*>/gi,
    /javascript:/gi
  ]

  return xssPatterns.some(pattern => pattern.test(input))
}

/**
 * Validate email format
 */
export function validateEmail (email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generate CSRF token (if needed)
 */
export function generateCsrfToken (): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

/**
 * Add security headers to fetch requests
 */
export function getSecureHeaders (): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}
