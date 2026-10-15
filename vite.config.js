import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Bundle every dependency into the build-time prerender bundle (see scripts/prerender.js)
  ssr: {
    noExternal: true,
  },
})
