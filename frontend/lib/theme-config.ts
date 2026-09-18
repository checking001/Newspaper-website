/**
 * THEME CONFIGURATION
 * খবরের কাগজ Newspaper Design System
 * 
 * Central source of truth for all design tokens
 * Easy to customize for different themes/branding
 */

export const theme = {
  // ============================================
  // COLORS
  // ============================================
  colors: {
    // Primary
    primary: '#1a1a1a',
    primaryDark: '#000000',
    
    // Secondary (Breaking News, Badges)
    secondary: '#d32f2f',
    secondaryLight: '#ef5350',
    
    // Accent (Links, CTAs)
    accent: '#1976d2',
    accentDark: '#1565c0',
    accentLight: '#42a5f5',
    
    // Text
    text: {
      primary: '#000000',
      secondary: '#666666',
      tertiary: '#999999',
      muted: '#cccccc',
      inverse: '#ffffff',
    },
    
    // Background
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      tertiary: '#efefef',
      dark: '#1a1a1a',
    },
    
    // Border
    border: {
      default: '#e0e0e0',
      light: '#f0f0f0',
      dark: '#cccccc',
    },
    
    // Semantic
    semantic: {
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3',
      breaking: '#d32f2f',
      featured: '#1976d2',
      trending: '#ff6f00',
      live: '#d32f2f',
    },
    
    // Category Colors
    categories: {
      default: '#757575',
      politics: '#d32f2f',
      economy: '#1976d2',
      sports: '#ff6f00',
      entertainment: '#9c27b0',
      tech: '#00bcd4',
      international: '#4caf50',
      lifestyle: '#e91e63',
    },
  },

  // ============================================
  // TYPOGRAPHY
  // ============================================
  typography: {
    fontFamily: {
      heading: `'Noto Serif Bengali', 'Noto Serif', Georgia, serif`,
      body: `'Noto Sans Bengali', 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
      mono: `'Courier New', 'Monaco', monospace`,
      display: `'Noto Serif Bengali', 'Noto Serif', serif`,
    },
    
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 1.75,
      extraLoose: 1.875,
    },
    
    letterSpacing: {
      tight: '-0.02em',
      normal: '0em',
      wide: '0.02em',
      wider: '0.05em',
    },
    
    // Responsive Heading Sizes
    headings: {
      h1: {
        mobile: '2rem',
        tablet: '2.5rem',
        desktop: '3rem',
        lineHeight: 1.2,
        weight: 700,
      },
      h2: {
        mobile: '1.75rem',
        tablet: '2rem',
        desktop: '2.25rem',
        lineHeight: 1.3,
        weight: 700,
      },
      h3: {
        mobile: '1.5rem',
        tablet: '1.75rem',
        desktop: '1.875rem',
        lineHeight: 1.3,
        weight: 600,
      },
    },
    
    // Body Text Presets
    body: {
      size: '1rem',
      lineHeight: 1.6,
      weight: 400,
    },
    
    // Article Reading Optimized
    article: {
      size: '1.125rem',   // 18px
      lineHeight: 1.8,
      weight: 400,
    },
    
    // Small Text
    small: {
      size: '0.875rem',
      lineHeight: 1.5,
      weight: 400,
    },
    
    // Metadata (timestamps, authors)
    meta: {
      size: '0.8125rem',
      lineHeight: 1.4,
      weight: 400,
    },
  },

  // ============================================
  // SPACING
  // ============================================
  spacing: {
    '0': '0',
    '1': '0.25rem',   // 4px
    '2': '0.5rem',    // 8px
    '3': '0.75rem',   // 12px
    '4': '1rem',      // 16px
    '5': '1.25rem',   // 20px
    '6': '1.5rem',    // 24px
    '8': '2rem',      // 32px
    '10': '2.5rem',   // 40px
    '12': '3rem',     // 48px
    '14': '3.5rem',   // 56px
    '16': '4rem',     // 64px
    '20': '5rem',     // 80px
    '24': '6rem',     // 96px
    '28': '7rem',     // 112px
    '32': '8rem',     // 128px
  },

  // ============================================
  // BREAKPOINTS
  // ============================================
  breakpoints: {
    xs: '320px',    // Extra small
    sm: '640px',    // Small
    md: '768px',    // Medium (tablet)
    lg: '1024px',   // Large
    xl: '1280px',   // Extra large
    '2xl': '1440px', // 2X Large
    '3xl': '1600px', // 3X Large
  },

  // ============================================
  // SHADOWS
  // ============================================
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
    article: '0 2px 8px 0 rgba(0, 0, 0, 0.05)',
    card: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    image: '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
    hover: '0 10px 20px 0 rgba(0, 0, 0, 0.1)',
  },

  // ============================================
  // BORDERS & RADIUS
  // ============================================
  borders: {
    width: {
      '0': '0px',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
    },
    
    radius: {
      none: '0',
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px',
    },
  },

  // ============================================
  // TRANSITIONS
  // ============================================
  transitions: {
    duration: {
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms',
    },
    
    timing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // ============================================
  // Z-INDEX SCALE
  // ============================================
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
    notification: 80,
  },

  // ============================================
  // CONTENT WIDTHS
  // ============================================
  contentWidth: {
    sm: '320px',
    md: '680px',      // Article body optimal width
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    max: '100%',
  },

  // ============================================
  // GAPS (for flex/grid)
  // ============================================
  gap: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
};

// ============================================
// HELPER: Get responsive value
// ============================================
export const getResponsiveValue = (
  mobileValue: string,
  tabletValue?: string,
  desktopValue?: string
) => ({
  mobile: mobileValue,
  tablet: tabletValue || mobileValue,
  desktop: desktopValue || tabletValue || mobileValue,
});

// ============================================
// HELPER: Create CSS variable string
// ============================================
export const getCSSVariableString = (variableName: string): string => {
  return `var(${variableName})`;
};

// ============================================
// EXPORT AS CSS CUSTOM PROPERTIES
// ============================================
export const generateCSSVariables = () => {
  const css: Record<string, string> = {};

  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      css[`--color-${key}`] = value;
    } else {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (typeof subValue === 'string') {
          css[`--color-${key}-${subKey}`] = subValue;
        } else {
          Object.entries(subValue).forEach(([subSubKey, subSubValue]) => {
            css[`--color-${key}-${subKey}-${subSubKey}`] = subSubValue as string;
          });
        }
      });
    }
  });

  return css;
};

export default theme;
