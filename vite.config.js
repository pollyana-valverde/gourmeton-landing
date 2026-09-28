import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Configuração do Vite: plugin do React (JSX) e plugin oficial do Tailwind v4
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
