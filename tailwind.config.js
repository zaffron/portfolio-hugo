/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./assets/**/*.css",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#6b63ff',
              '&:hover': {
                color: '#5a52e8',
              },
            },
            code: {
              color: '#6b63ff',
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-headings': '#f9fafb',
            '--tw-prose-links': '#8b83ff',
            '--tw-prose-bold': '#f9fafb',
            '--tw-prose-code': '#8b83ff',
            '--tw-prose-quotes': '#d1d5db',
            '--tw-prose-quote-borders': '#6b63ff',
            '--tw-prose-hr': '#374151',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
