import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    wasm(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // 캐싱할 파일 패턴 설정
        globIgnores: ["**/*.html"], // .html 파일을 캐싱에서 제외
      },
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Vite PWA Project",
        short_name: "Vite PWA Project",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
      "@app": "/src/app",
      "@assets": "/src/assets",
      "@featrues": "/src/featrues",
      "@atoms": "/src/shared/components/atoms",
      "@entities": "/src/shared/components/entities",
      "@pages": "/src/pages",
      "@ui": "/src/shared/ui",
    },
  },
  base: "/", // base 경로를 절대 경로로 수정. 배포시 base는 아래주석 예시처럼 .env로 관리
  // base: process.env.VITE_BASE_URL || "/",
  // base: import.meta.env.VITE_BASE_URL || "/",
  server: {
    host: "0.0.0.0", // 외부 네트워크에서 접근 가능하도록 설정(배포시 보안상 검토필요)
    port: 3000, // 포트를 명시적으로 설정
    strictPort: true, // 사용하려는 포트를 고정 (다른 포트로 변경되지 않도록)
  },
  optimizeDeps: {
    exclude: ["onnxruntime-web"],
  },
  build: {
    target: ["esnext"],
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
});
