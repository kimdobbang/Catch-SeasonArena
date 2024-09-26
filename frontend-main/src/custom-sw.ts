// src/custom-sw.ts
import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

declare let self: ServiceWorkerGlobalScope;

// Workbox가 빌드 타임에 제공하는 자원을 캐싱합니다.
precacheAndRoute(self.__WB_MANIFEST);

// 특정 경로를 제외하고 모든 탐색 요청에 대해 index.html을 반환합니다.
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("/index.html"), {
    denylist: [/^\/game/], // 제외할 경로 추가
  }),
);
