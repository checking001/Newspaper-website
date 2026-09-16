import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1f2937', // Dark gray
          secondary: '#374151', // Medium gray
          accent: '#3b82f6', // Blue
          bg: '#ffffff', // White
          text: '#111827', // Almost black
          'text-muted': '#6b7280', // Gray
          border: '#e5e7eb', // Light gray
          success: '#10b981', // Green
          warning: '#f59e0b', // Amber
          error: '#ef4444' // Red
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'serif']
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#111827',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#1f2937'
              }
            },
            'h1, h2, h3, h4': {
              color: '#1f2937',
              fontWeight: '700'
            },
            code: {
              color: '#ef4444',
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem'
            }
          }
        }
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem'
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    }
  },
  plugins: [typography]
}

export default config
