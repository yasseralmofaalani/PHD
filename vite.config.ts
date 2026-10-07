import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

/** GitHub Pages project site: https://yasseralmofaalani.github.io/PHD/ */
const GH_PAGES_BASE = '/PHD/'

function githubPagesReady() {
  return {
    name: 'github-pages-ready',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist')
      const index = path.join(dist, 'index.html')
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.join(dist, '404.html'))
      }
      fs.writeFileSync(path.join(dist, '.nojekyll'), '')
    },
  }
}

export default defineConfig(({ command }) => ({
  plugins: [react(), githubPagesReady()],
  // Dev stays at "/", production is built for the PHD GitHub Pages project.
  base: command === 'build' ? GH_PAGES_BASE : './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
  },
}))
