const CACHE_NAME = 'mdm-cache-v3'; // 更改此版本號可強制更新全體客戶端
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 安裝並快取資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('正在快取國軍 MDM 資源');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // 強制進入 activate 階段
});

// 清理舊版快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) {
          console.log('清理舊快取:', key);
          return caches.delete(key);
        }
      })
    ))
  );
  return self.clients.claim();
});

// 攔截請求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
