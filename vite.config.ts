import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import dts from 'vite-plugin-dts'
import { rmSync } from 'fs'
import { visualizer } from 'rollup-plugin-visualizer'

// 自定义插件：构建完成后删除不需要的文件
const deleteFilesPlugin = () => {
  return {
    name: 'delete-files',
    closeBundle() {
      try {
        // 删除 facio.png 文件
        rmSync(resolve(__dirname, 'dist/facio.png'), { force: true });
        console.log('✅ 已删除 dist/facio.png');
      } catch (error) {
        // 文件不存在时忽略错误
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/components/vue3-tiptap/**/*.ts', 'src/components/vue3-tiptap/**/*.vue'],
      exclude: ['src/components/vue3-tiptap/**/*.test.ts']
    }),
    deleteFilesPlugin(),
    // visualizer({
    //   filename: 'dist/stats.html', // 输出分析报告文件
    //   open: true,                  // 构建后自动打开浏览器
    //   gzipSize: true,
    //   brotliSize: true
    // })
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
      external: [
        "vue",
        "ant-design-vue",
        "vue-router",
        // "@tiptap/vue-3",
        // "@tiptap/starter-kit",
        // "@tiptap/pm"
      ],
      output: {
        globals: {
          vue: "Vue",
          "ant-design-vue": "antd",
          // "@tiptap/vue-3": "TiptapVue3",
          // "@tiptap/starter-kit": "StarterKit",
          // "@tiptap/pm": "TiptapPm",
        }
      }
    }
  }
})
