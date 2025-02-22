/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync, statSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

function getHtmlInputs(srcPath: string) {
  const entries = readdirSync(srcPath, { withFileTypes: true })
  const inputs: Record<string, string> = {}

  // Check for all the child folders and add index.html if exists
  for (const entry of entries) {
    const fullPath = resolve(srcPath, entry.name)
    // Ignores the files at the root of the apps folder, and the main folder
    // Technically, the check for main folder is not needed since, it doesn't have the index.html file
    if (entry.isDirectory() && entry.name !== 'main') {
      const indexPath = resolve(fullPath, 'index.html')
      if (statSync(indexPath, { throwIfNoEntry: false })?.isFile()) {
        inputs[entry.name] = indexPath
      }
    }
  }
  return inputs
}

const htmlInputs = getHtmlInputs(resolve(__dirname, 'apps'))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    base: env.VITE_SITE_BASE,
    appType: 'mpa',
    // ssr: {},
    // root:
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          ...htmlInputs,
          main: resolve(__dirname, 'index.html'), // Override the path for main app
        },
        output: {},
      },
    },
    test: {
      environment: 'jsdom',
    },
  }
})
