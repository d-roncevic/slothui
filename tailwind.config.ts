import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        kanban: '0 2px 4px -2px rgba(23,23,23,0.06), 0 4px 8px -2px rgba(23,23,23,0.10)',
      },
      letterSpacing: {
        '-tight-07': '-0.007em',
      },
    },
  },
  plugins: [],
};

export default config;
