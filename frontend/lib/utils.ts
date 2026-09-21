/**
 * API Integration Testing Utilities
 */

export interface TestResult {
  endpoint: string
  method: string
  status: number
  success: boolean
  message: string
  responseTime: number
}

const API_BASE = 'http://localhost:8000/api'

const getTestToken = (): string => {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem('auth_token') || ''
}
/**
 * Format date to Bengali locale
 */
export const formatDate = (
  date: string | Date,
  format: 'short' | 'long' = 'long'
): string => {
  if (!date) return ''

  const d = typeof date === 'string' ? new Date(date) : date

  return d.toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: format === 'short' ? 'short' : 'long',
    day: 'numeric'
  })
}

/**
 * Format date and time
 */
export const formatDateTime = (date: string | Date): string => {
  if (!date) return ''

  const d = typeof date === 'string' ? new Date(date) : date

  return d.toLocaleString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Format time only
 */
export const formatTime = (date: string | Date): string => {
  if (!date) return ''

  const d = typeof date === 'string' ? new Date(date) : date

  return d.toLocaleTimeString('bn-BD', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

/**
 * Get relative time (e.g., "२ ঘণ্টা আগে")
 */
export const getRelativeTime = (date: string | Date): string => {
  if (!date) return ''

  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  const intervals: { [key: string]: number } = {
    বছর: 31536000,
    মাস: 2592000,
    সপ্তাহ: 604800,
    দিন: 86400,
    ঘণ্টা: 3600,
    মিনিট: 60
  }

  for (const [key, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value)
    if (interval >= 1) {
      return `${interval} ${key} আগে`
    }
  }

  return 'এখনি'
}

/**
 * Check if date is today
 */
export const isToday = (date: string | Date): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date
  const today = new Date()

  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  )
}

/**
 * Check if date is yesterday
 */
export const isYesterday = (date: string | Date): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  )
}

/**
 * Smart date display
 */
export const smartDateFormat = (date: string | Date): string => {
  if (isToday(date)) return 'আজ'
  if (isYesterday(date)) return 'গতকাল'
  return formatDate(date)
}

/**
 * Truncate text
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Get safe localStorage (client-side only)
 */
export const getFromLocalStorage = (
  key: string,
  defaultValue: string = ''
): string => {
  if (typeof window === 'undefined') return defaultValue
  return localStorage.getItem(key) || defaultValue
}

/**
 * Set safe localStorage (client-side only)
 */
export const setToLocalStorage = (key: string, value: string): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, value)
}

/**
 * Remove from localStorage (client-side only)
 */
export const removeFromLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}
export const apiTests = {
  /**
   * Test public API endpoints
   */
  testPublicArticles: async (): Promise<TestResult> => {
    const start = performance.now()
    try {
      const res = await fetch(`${API_BASE}/articles?limit=10`)
      const responseTime = performance.now() - start
      const data = await res.json()

      return {
        endpoint: '/articles',
        method: 'GET',
        status: res.status,
        success: res.ok && data.data?.length > 0,
        message: res.ok
          ? `✅ ${data.data.length} articles found`
          : '❌ Failed to fetch articles',
        responseTime: Math.round(responseTime)
      }
    } catch (error: any) {
      return {
        endpoint: '/articles',
        method: 'GET',
        status: 0,
        success: false,
        message: `❌ Error: ${error.message}`,
        responseTime: performance.now() - start
      }
    }
  },

  testArticleDetail: async (slug: string): Promise<TestResult> => {
    const start = performance.now()
    try {
      const res = await fetch(`${API_BASE}/articles/${slug}`)
      const responseTime = performance.now() - start

      return {
        endpoint: `/articles/${slug}`,
        method: 'GET',
        status: res.status,
        success: res.ok,
        message: res.ok ? '✅ Article found' : '❌ Article not found',
        responseTime: Math.round(responseTime)
      }
    } catch (error: any) {
      return {
        endpoint: `/articles/${slug}`,
        method: 'GET',
        status: 0,
        success: false,
        message: `❌ Error: ${error.message}`,
        responseTime: performance.now() - start
      }
    }
  },

  testCategories: async (): Promise<TestResult> => {
    const start = performance.now()
    try {
      const res = await fetch(`${API_BASE}/categories`)
      const responseTime = performance.now() - start
      const data = await res.json()

      return {
        endpoint: '/categories',
        method: 'GET',
        status: res.status,
        success: res.ok && data.data?.length > 0,
        message: res.ok
          ? `✅ ${data.data.length} categories found`
          : '❌ Failed to fetch categories',
        responseTime: Math.round(responseTime)
      }
    } catch (error: any) {
      return {
        endpoint: '/categories',
        method: 'GET',
        status: 0,
        success: false,
        message: `❌ Error: ${error.message}`,
        responseTime: performance.now() - start
      }
    }
  },

  /**
   * Test authenticated endpoints
   */
  testAuthenticatedRequest: async (): Promise<TestResult> => {
    const start = performance.now()
    try {
      const res = await fetch(`${API_BASE}/admin/profile`, {
        headers: { Authorization: `Bearer ${getTestToken()}` }
      })
      const responseTime = performance.now() - start

      return {
        endpoint: '/admin/profile',
        method: 'GET',
        status: res.status,
        success: res.ok,
        message: res.ok ? '✅ Authenticated' : '❌ Not authenticated',
        responseTime: Math.round(responseTime)
      }
    } catch (error: any) {
      return {
        endpoint: '/admin/profile',
        method: 'GET',
        status: 0,
        success: false,
        message: `❌ Error: ${error.message}`,
        responseTime: performance.now() - start
      }
    }
  },

  testDashboardStats: async (): Promise<TestResult> => {
    const start = performance.now()
    try {
      const res = await fetch(`${API_BASE}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${getTestToken()}` }
      })
      const responseTime = performance.now() - start

      return {
        endpoint: '/admin/dashboard',
        method: 'GET',
        status: res.status,
        success: res.ok,
        message: res.ok
          ? '✅ Dashboard data loaded'
          : '❌ Failed to load dashboard',
        responseTime: Math.round(responseTime)
      }
    } catch (error: any) {
      return {
        endpoint: '/admin/dashboard',
        method: 'GET',
        status: 0,
        success: false,
        message: `❌ Error: ${error.message}`,
        responseTime: performance.now() - start
      }
    }
  },

  /**
   * Test Search functionality
   */
  testSearch: async (query: string): Promise<TestResult> => {
    const start = performance.now()
    try {
      const res = await fetch(
        `${API_BASE}/articles?search=${encodeURIComponent(query)}`
      )
      const responseTime = performance.now() - start
      const data = await res.json()

      return {
        endpoint: `/articles?search=${query}`,
        method: 'GET',
        status: res.status,
        success: res.ok,
        message: res.ok
          ? `✅ Found ${data.data?.length || 0} results`
          : '❌ Search failed',
        responseTime: Math.round(responseTime)
      }
    } catch (error: any) {
      return {
        endpoint: `/articles?search=${query}`,
        method: 'GET',
        status: 0,
        success: false,
        message: `❌ Error: ${error.message}`,
        responseTime: performance.now() - start
      }
    }
  },

  /**
   * Run all tests
   */
  runAllTests: async (): Promise<TestResult[]> => {
    const results: TestResult[] = []

    results.push(await apiTests.testPublicArticles())
    results.push(await apiTests.testCategories())
    results.push(await apiTests.testSearch('খবর'))
    results.push(await apiTests.testAuthenticatedRequest())
    results.push(await apiTests.testDashboardStats())

    return results
  }
}
