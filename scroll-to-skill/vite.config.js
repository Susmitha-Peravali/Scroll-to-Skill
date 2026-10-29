import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  /**
   * Inline the PostCSS config so Vite never walks up to parent directories
   * (e.g. C:\Users\tejap\OneDrive\postcss.config.mjs which requires Tailwind).
   * This project uses plain CSS — no PostCSS plugins needed.
   */
  css: {
    postcss: {
      plugins: [],
    },
  },
})
