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
      registerType: "autoUpdate",
      // 사용자 정의 Service Worker 파일을 지정합니다.
      srcDir: "src", // Service Worker 파일을 위치시킬 폴더
      filename: "custom-sw.ts", // 생성할 Service Worker 파일 이름
      strategies: "injectManifest", // injectManifest를 사용하여 직접 만든 Service Worker에 설정을 주입
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "캐치캐치! 시즌아레나 by시즌핑",
        short_name: "캐치! 시즌핑",
        start_url: "/",
        theme_color: "#FFFFFF",
        display: "standalone",
        id: "/",
        icons: [
          {
            src: "/pwa-76x76.png",
            sizes: "76x76",
            type: "image/png",
          },
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/pwa-310x310.png",
            sizes: "310x310",
            type: "image/png",
            purpose: "any maskable",
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
      "@features": "/src/features",
      "@atoms": "/src/shared/components/atoms",
      "@entities": "/src/shared/components/entities",
      "@pages": "/src/pages",
      "@ui": "/src/shared/ui",
      "@widgets": "/src/shared/widgets",

    },
  },
  base: "/", // base 경로를 절대 경로로 수정. 배포시 base는 .env로 관리
  // base: process.env.VITE_BASE_URL || "/",
  // base: import.meta.env.VITE_BASE_URL || "/",
  server: {
    host: "0.0.0.0", // 외부 네트워크에서 접근 가능하도록 설정 (배포시 보안상 검토 필요)
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
