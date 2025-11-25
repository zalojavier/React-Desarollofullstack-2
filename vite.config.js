import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000, 
    // 👇 AQUÍ ESTÁ LA INTEGRACIÓN DEL PROXY
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Tu Backend Spring Boot
        changeOrigin: true,
        secure: false,
      }
    }
  },
  // ---------------------------------------------
  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})