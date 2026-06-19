import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion'))  return 'vendor-framer'
          if (id.includes('lucide-react'))   return 'vendor-lucide'
          if (
            id.includes('react-dom') ||
            id.includes('react-router') ||
            id.includes('scheduler')
          )                                  return 'vendor-react'
        },
      },
    },
  },
})
