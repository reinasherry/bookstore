import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        const file = id.split('?')[0]
        if (!/[\\/]src[\\/].*\.js$/.test(file)) return null
        return transformWithOxc(code, file, {
          lang: 'jsx',
          jsx: { runtime: 'automatic' },
        })
      },
    },
    react(),
  ],
})