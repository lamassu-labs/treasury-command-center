/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    // Include design system components
    '../../../design-system/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Treasury Command Center Brand Colors
      colors: {
        // Primary brand colors
        'treasury-primary': {
          50: '#f3f0ff',
          100: '#e9e5ff',
          200: '#d6ceff',
          300: '#b8a6ff',
          400: '#9572ff',
          500: '#7C3AED', // Primary Purple
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3c1677',
          950: '#1e0f3d',
        },

        // Secondary accent colors
        'treasury-accent': {
          50: '#fef3e6',
          100: '#fde4c8',
          200: '#fbc58d',
          300: '#f8a052',
          400: '#f57c20',
          500: '#C65D3C', // Secondary accent
          600: '#b5472a',
          700: '#94381d',
          800: '#772e18',
          900: '#612717',
        },

        // Trust/Security colors
        'treasury-trust': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1E40AF', // Trust blue
          600: '#1d4ed8',
          700: '#1e3a8a',
          800: '#1e3a8a',
          900: '#1e3a8a',
        },

        // Neutral colors with warm tone
        'treasury-neutral': {
          50: '#FDFBF6',  // Warm white
          100: '#f9fafb',
          200: '#f3f4f6',
          300: '#e5e7eb',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },

        // Status colors
        success: {
          50: '#ecfdf5',
          500: '#059669',
          600: '#047857',
        },
        warning: {
          50: '#fffbeb',
          500: '#D97706',
          600: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#DC2626',
          600: '#b91c1c',
        },
      },

      // Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      // Spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      // Box shadows
      boxShadow: {
        'treasury-sm': '0 1px 2px 0 rgb(124 58 237 / 0.05)',
        'treasury-md': '0 4px 6px -1px rgb(124 58 237 / 0.1)',
        'treasury-lg': '0 10px 15px -3px rgb(124 58 237 / 0.1)',
        'treasury-xl': '0 20px 25px -5px rgb(124 58 237 / 0.1)',
      },

      // Gradients
      backgroundImage: {
        'treasury-gradient': 'linear-gradient(135deg, #7C3AED 0%, #C65D3C 100%)',
        'treasury-gradient-light': 'linear-gradient(135deg, #f3f0ff 0%, #fef3e6 100%)',
        'trust-gradient': 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
      },

      // Animation
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      // Screen sizes for responsive design
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    // Add custom utilities
    function({ addUtilities }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.treasury-focus': {
          '@apply focus:outline-none focus:ring-2 focus:ring-treasury-primary-500 focus:ring-offset-2': {},
        },
        '.treasury-button-primary': {
          '@apply bg-treasury-primary-500 hover:bg-treasury-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors treasury-focus': {},
        },
        '.treasury-button-secondary': {
          '@apply border border-treasury-primary-200 hover:bg-treasury-primary-50 text-treasury-primary-700 font-medium py-2 px-4 rounded-lg transition-colors treasury-focus': {},
        },
        '.treasury-card': {
          '@apply bg-white rounded-xl shadow-treasury-md border border-treasury-neutral-200 p-6': {},
        },
        '.treasury-input': {
          '@apply border border-treasury-neutral-300 rounded-lg px-3 py-2 text-sm treasury-focus placeholder:text-treasury-neutral-400': {},
        },
      })
    },
  ],
  // Dark mode configuration
  darkMode: 'class',
}
