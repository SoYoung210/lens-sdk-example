import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      extend: {
        aspectRatio: {
          '3/4': '3 / 4',
        },
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shakeX: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '10%, 50%, 90%': {
            transform: 'translateX(-1px)',
          },
          '20%, 60%, 80%': {
            transform: 'translateX(1px)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shake-x': 'shakeX 0.3s cubic-bezier(.36,.07,.19,.97)',
      },
      fontSize: {
        '10xl': '10rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('daisyui'),
    function ({ addUtilities, addBase, theme }: PluginAPI) {
      const newUtilities = {
        'page-heading': {
          css: {
            color: 'hsl(var(--primary))',
            fontSize: '2rem',
            lineHeight: '1.2',
            fontWeight: '600',
          },
        },
        'page-description': {
          css: {
            color: 'rgba(19,21,23,0.64)',
            fontSize: '1.25rem',
            lineHeight: '1.2',
          },
        },
        'content-heading-1': {
          css: {
            color: 'hsl(var(--primary))',
            fontSize: '1.25rem',
            lineHeight: '1.2',
            fontWeight: '600',
          },
        },
        'content-description-1': {
          css: {
            color: 'rgba(19,21,23,0.36)',
            fontSize: '1.25rem',
            lineHeight: '1.2',
            fontWeight: '400',
          },
        },
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      };

      const newBase = {
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme('colors.gray.300', '#888')} transparent`,
        },
        '*::-webkit-scrollbar, *::-webkit-scrollbar:hover': {
          width: '8px !important',
          height: '8px !important',
        },
        '*::-webkit-scrollbar-track, *::-webkit-scrollbar-track:hover': {
          backgroundColor: 'transparent !important',
        },
        '*::-webkit-scrollbar-thumb, *::-webkit-scrollbar-thumb:hover': {
          backgroundColor: `${theme('colors.gray.200', '#888')} !important`,
          borderRadius: '50px !important',
        },
        '*::-webkit-scrollbar, *::-webkit-scrollbar-track, *::-webkit-scrollbar-thumb': {
          transition: 'none !important',
        },
      };

      addBase(newBase);
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;

export default config;
