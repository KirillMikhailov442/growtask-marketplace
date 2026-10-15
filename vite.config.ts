import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import postcssPxToRem from "postcss-pxtorem";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "https://growtask.ru",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/test-front/api"),
      },
    },
  },
  resolve: {
    alias: {
      "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@widgets": fileURLToPath(new URL("./src/widgets", import.meta.url)),
      "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
      "@entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
      "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
    postcss: {
      plugins: [
        postcssPxToRem({
          rootValue: 16,
          propList: ["*"],
          minPixelValue: 2,
          mediaQuery: false,
        }),
      ],
    },
  },
});
