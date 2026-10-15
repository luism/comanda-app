import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Todo lo que empieza con /api va a la API de Express.
    proxy: { '/api': 'http://localhost:3001' },
  },
})
