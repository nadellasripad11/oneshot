import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0F0E0C',
          secondary: '#1a1815',
          card: '#161411',
        },
        text: {
          primary: '#F5F1E8',
          secondary: '#A89968',
        },
        border: {
          light: '#2D2620',
        },
        accent: '#D4AF37',
        success: '#6EE7B7',
        warning: '#FBBF24',
        error: '#F87171',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        mono: ['Menlo', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      borderRadius: {
        DEFAULT: '3px',
        sm: '2px',
        md: '4px',
        lg: '6px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.4)',
        md: '0 8px 16px rgba(0, 0, 0, 0.5)',
        lg: '0 16px 24px rgba(0, 0, 0, 0.6)',
      },
      spacing: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '32px',
        '2xl': '64px',
        '3xl': '96px',
      },
      letterSpacing: {
        tight: '-0.02em',
        normal: '0em',
        wide: '0.04em',
      },
    },
  },
  plugins: [],
};

export default config;
