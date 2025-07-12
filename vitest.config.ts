import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

// Call the function to get config object; pass 'test' or 'development' or '' as mode
const resolvedViteConfig = typeof viteConfig === 'function'
  ? viteConfig({ command: 'serve', mode: 'test' })
  : viteConfig

export default mergeConfig(
  resolvedViteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
