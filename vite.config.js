import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Network erişimini etkinleştir
    port: 5173  // Varsayılan port
  }
})
