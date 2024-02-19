import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const __dirname = process.cwd()

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, ''),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(resolve(__dirname, './tailwind.config.js')),
        autoprefixer,
      ],
    },
  },
})
