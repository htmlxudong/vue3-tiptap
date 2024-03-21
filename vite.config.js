import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import VueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueJsx()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8000,
    open: true,
  },
  build: {
    // lib: {
    //   entry: resolve(__dirname, "src/index.js"),
    //   name: "Vue3TipTap",
    //   fileName: "vue3-tiptap",
    // },
    rollupOptions: {
      //external: ["vue"],
      output: {
        dir:'dist-demo',
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
