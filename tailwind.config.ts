import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        'full-12': 'calc(100% - 3rem)',
        'full-16': 'calc(100% - 4rem)',
        'full-20': 'calc(100% - 5rem)',
        'full-64': 'calc(100% - 16rem)',
        'screen-12': 'calc(100vw - 3rem)',
        'screen-16': 'calc(100vw - 4rem)',
        'screen-20': 'calc(100vw - 5rem)',
        'screen-64': 'calc(100vw - 16rem)',
      },
      height: {
        'full-12': 'calc(100% - 3rem)',
        'full-16': 'calc(100% - 4rem)',
        'full-20': 'calc(100% - 5rem)',
        'full-64': 'calc(100% - 16rem)',
      },
      screens: {
        xs: '375px',
        sm: '575px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1600px',
      },
    },
  },
  plugins: [],
};
export default config;
