import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // 新增以下配置
  build: {
    lib: {
      entry: "src/index.ts",
      name: "my-components",
      formats: ["es"],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`,
      },
    },
  },
});