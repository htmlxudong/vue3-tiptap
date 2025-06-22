import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/components/vue3-tiptap/**/*.ts', 'src/components/vue3-tiptap/**/*.vue'],
      exclude: ['src/components/vue3-tiptap/**/*.test.ts']
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
    host: "0.0.0.0",
    port: 8888,
    open: true
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/vue3-tiptap/index.ts"),
      name: "Vue3TipTap",
      fileName: (format) => `vue3-tiptap.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    rollupOptions: {
      external: ["vue", "ant-design-vue", "@tiptap/vue-3", "@tiptap/starter-kit"],
      output: {
        globals: {
          vue: "Vue",
          "ant-design-vue": "antd",
          "@tiptap/vue-3": "TiptapVue3",
          "@tiptap/starter-kit": "StarterKit"
        }
      }
    }
  }
})
