// Branding & Configuration
export const SITE_NAME = 'খবরের কাগজ'
export const SITE_TAGLINE = 'Your Daily News Source'
export const SITE_DESCRIPTION = 'Professional digital newspaper platform'
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// These will be configured later by owner
export const BRAND = {
  primary: '#1f2937', // Dark gray (temporary)
  secondary: '#374151', // Medium gray
  accent: '#3b82f6', // Blue
  background: '#ffffff', // White
  text: '#111827', // Almost black
  textMuted: '#6b7280', // Gray
  border: '#e5e7eb', // Light gray
  success: '#10b981', // Green
  warning: '#f59e0b', // Amber
  error: '#ef4444' // Red
}

export const TYPOGRAPHY = {
  fontFamily: {
    sans: 'system-ui, -apple-system, sans-serif',
    serif: 'Georgia, serif'
  }
}

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem'
}

// App timezone (configurable, not hardcoded in calculations)
export const APP_TIMEZONE = 'Asia/Dhaka'

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// News status
export const NEWS_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  PUBLISHED: 'published',
  SCHEDULED: 'scheduled',
  ARCHIVED: 'archived',
  TRASH: 'trash'
} as const

// File upload limits
export const FILE_LIMITS = {
  IMAGE: {
    MAX_SIZE_MB: 10,
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp']
  },
  VIDEO: {
    MAX_SIZE_MB: 100,
    ALLOWED_TYPES: ['video/mp4'],
    ALLOWED_EXTENSIONS: ['mp4']
  },
  PDF: {
    MAX_SIZE_MB: 20,
    ALLOWED_TYPES: ['application/pdf'],
    ALLOWED_EXTENSIONS: ['pdf']
  }
}

// Cache durations (in seconds)
export const CACHE_DURATION = {
  HOMEPAGE: 300, // 5 minutes
  CATEGORY: 600, // 10 minutes
  ARTICLE: 3600, // 1 hour
  MOST_READ: 3600, // 1 hour
  NAVIGATION: 86400 // 24 hours
} as const
