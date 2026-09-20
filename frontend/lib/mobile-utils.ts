export const getMobileMetaTags = (title: string, description: string) => {
  return {
    title,
    description,
    viewport:
      'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
    themeColor: '#1F2937',
    appleStatus: 'black-translucent',
    formatDetection: 'telephone=no'
  }
}

// Touch detection
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  return navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0
}

// Viewport height detection (mobile keyboard)
export const useViewportHeight = () => {
  if (typeof window === 'undefined') return 0
  return window.innerHeight
}

// Safe area support
export const getSafeAreaInset = (side: 'top' | 'bottom' | 'left' | 'right') => {
  if (typeof window === 'undefined') return 0
  const style = window.getComputedStyle(document.documentElement)
  const value = style.getPropertyValue(`--safe-area-inset-${side}`)
  return parseInt(value) || 0
}
