import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Drop console/debugger in production via esbuild (no terser dependency needed)
    minify: 'esbuild',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})
