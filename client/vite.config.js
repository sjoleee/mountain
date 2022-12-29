import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            MAP_API_KEY: env.VITE_MAP_API_KEY,
          },
        },
      }),
    ],
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
        { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
        { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
        {
          find: "@components",
          replacement: path.resolve(__dirname, "src/components"),
        },
        { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
        { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
        {
          find: "@constants",
          replacement: path.resolve(__dirname, "src/constants"),
        },
      ],
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
          ws: false,
        },
      },
    },
  };
});
