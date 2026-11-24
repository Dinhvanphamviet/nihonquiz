import { resolve } from 'node:path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    resolve: { alias: { '@shared': resolve('src/shared') } },
    build: { rollupOptions: { input: resolve('src/main/index.ts') } },
  },
  preload: {
    resolve: { alias: { '@shared': resolve('src/shared') } },
    build: { rollupOptions: { input: resolve('src/preload/index.ts'), output: { format: 'cjs', entryFileNames: 'index.js' } } },
  },
  renderer: {
    root: resolve('src/renderer'),
    resolve: { alias: { '@': resolve('src/renderer'), '@shared': resolve('src/shared') } },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'development-csp',
        apply: 'serve',
        transformIndexHtml(html) {
          // React Fast Refresh injects an inline preamble in development only.
          return html.replace("script-src 'self';", "script-src 'self' 'unsafe-inline';")
        },
      },
    ],
    build: { rollupOptions: { input: resolve('src/renderer/index.html') } },
  },
})
