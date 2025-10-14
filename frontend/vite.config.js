import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    port: 5000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      clientPort: 5000
    }
  }
})
