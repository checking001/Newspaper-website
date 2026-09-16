import { API_URL } from './constants'

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'super_admin'
  is_2fa_enabled: boolean
}

export interface AuthResponse {
  message: string
  user?: User
  requires_2fa?: boolean
}

// Helper function to extract cookie value
function getCookie (name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export class AuthService {
  static async login (
    email: string,
    password: string,
    totpCode?: string
  ): Promise<AuthResponse> {
    // 1. CSRF Cookie সেট করা
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'include'
    })

    // 2. Cookie থেকে XSRF-TOKEN তুলে নেয়া
    const xsrfToken = getCookie('XSRF-TOKEN')

    const body: any = { email, password }
    if (totpCode) {
      body.totp_code = totpCode
    }

    // 3. Login Request
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken ? { 'X-XSRF-TOKEN': decodeURIComponent(xsrfToken) } : {})
      },
      credentials: 'include',
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    return response.json()
  }

  static async getCurrentUser (): Promise<User | null> {
    try {
      const response = await fetch(`${API_URL}/auth/user`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include'
      })

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return data.user
    } catch {
      return null
    }
  }

  static async logout (): Promise<void> {
    const xsrfToken = getCookie('XSRF-TOKEN')
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken ? { 'X-XSRF-TOKEN': decodeURIComponent(xsrfToken) } : {})
      },
      credentials: 'include'
    })
  }
}
