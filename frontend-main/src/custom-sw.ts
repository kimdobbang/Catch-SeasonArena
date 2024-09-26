// src/custom-sw.ts
import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

declare let self: ServiceWorkerGlobalScope;

// Workbox가 빌드 타임에 제공하는 자원을 캐싱합니다.
precacheAndRoute(self.__WB_MANIFEST);

// 특정 경로만 Service Worker가 가로채도록 설정합니다.
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("/index.html"), {
    allowlist: [/^(?!\/game).*$/], // /game 경로를 제외한 나머지 경로만 포함
  }),
);
