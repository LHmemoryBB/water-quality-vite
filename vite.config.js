import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
const host = "0.0.0.0";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "~": resolve(__dirname, "./src/assets"),
    },
  },
  server: {
    https: false, // 是否开启 https
    open: true, // 是否自动在浏览器打开
    port: 7173, // 端口号
    host: host,
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 测试
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, // websocket支持
        pathRewrite: {
          "^/api": ""
      }
      },
    },
  },
});
