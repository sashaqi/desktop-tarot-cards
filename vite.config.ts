import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Standalone web build of the renderer.
 *
 * The renderer has no Electron or Node dependencies, and every call through the
 * preload bridge is already guarded — so the same source runs in a browser, with
 * the AI panel hiding itself when `window.api` is absent. That is deliberate:
 * an Anthropic key must never be entered into a web page.
 *
 * BASE_PATH is set per host — GitHub Pages serves from a repo subpath while
 * Cloudflare Pages serves from the root.
 */
export default defineConfig({
  root: resolve('src/renderer'),
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@renderer': resolve('src/renderer/src')
    }
  },
  build: {
    outDir: resolve('dist-web'),
    emptyOutDir: true
  }
})
