/**
 * Format date to readable format
 */
export function formatDate (
  date: string | Date,
  format: 'long' | 'short' = 'long'
): string {
  const d = typeof date === 'string' ? new Date(date) : date

  if (format === 'short') {
    return d.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return d.toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Format time to readable format
 */
export function formatTime (date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('bn-BD', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Format date and time together
 */
export function formatDateTime (
  date: string | Date,
  showTime: boolean = true
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const dateStr = formatDate(d, 'short')
  const timeStr = formatTime(d)
  return showTime ? `${dateStr}, ${timeStr}` : dateStr
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime (date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (seconds < 60) return 'এখনই'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} মিনিট আগে`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} ঘন্টা আগে`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} দিন আগে`

  return formatDate(d, 'short')
}

/**
 * Convert string to URL-friendly slug
 */
export function slugify (text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Convert slug back to readable text
 */
export function unslugify (slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
}

/**
 * Truncate text to specified length
 */
export function truncate (text: string, length: number = 100): string {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

/**
 * Extract plain text from HTML
 */
export function stripHtml (html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

/**
 * Check if URL is external
 */
export function isExternalUrl (url: string): boolean {
  try {
    const urlObj = new URL(url)
    return (urlObj.hostname !== typeof window) !== 'undefined'
      ? window.location.hostname
      : ''
  } catch {
    return false
  }
}

/**
 * Format file size to readable format
 */
export function formatFileSize (bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Check if value is empty
 */
export function isEmpty (value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object')
    return Object.keys(value as Record<string, unknown>).length === 0
  return false
}

/**
 * Merge className strings (utility for Tailwind classes)
 */
export function classNames (
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Get initials from a name
 */
export function getInitials (name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard (text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Generate unique ID
 */
export function generateId (prefix: string = ''): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
