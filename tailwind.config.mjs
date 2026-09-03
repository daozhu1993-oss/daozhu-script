/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          'system-ui',
          'sans-serif',
        ],
        serif: [
          '"Source Han Serif SC"',
          '"Noto Serif SC"',
          'Songti SC',
          'SimSun',
          'serif',
        ],
        mono: [
          '"Courier Prime"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      colors: {
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        cinema: {
          950: '#07090c',
          900: '#0c0f14',
          850: '#11151c',
          800: '#171c26',
          700: '#232b38',
          600: '#343f52',
          400: '#73829c',
          300: '#9ba8be',
          200: '#c5cee0',
          100: '#e5e9f2',
          50: '#f4f6fa',
        },
        paper: {
          50: '#fbfaf7',
          100: '#f5f3eb',
          200: '#ebe6d9',
          300: '#ded7c3',
          800: '#262420',
          900: '#1a1815',
        }
      },
    },
  },
  plugins: [],
};
