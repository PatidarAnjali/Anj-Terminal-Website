/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['anjali-c-patidar.onrender.com'],
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
  },
})