import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { copyFileSync } from 'node:fs'

// GitHub Pages serves 404.html for unknown paths. Mirroring index.html into
// 404.html lets history-mode deep links (e.g. /flag-finder/compare) boot the
// SPA so vue-router can resolve the route client-side instead of hard-404ing.
function spaGithubPages404() {
  let outDir = 'dist'
  return {
    name: 'spa-github-pages-404',
    apply: 'build',
    configResolved(config) { outDir = config.build.outDir },
    closeBundle() { copyFileSync(`${outDir}/index.html`, `${outDir}/404.html`) }
  }
}

export default defineConfig({
  plugins: [vue(), spaGithubPages404()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/flag-finder/',
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
