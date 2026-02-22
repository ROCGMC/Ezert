const CACHE_NAME = 'nsb-system-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://upload.wikimedia.org/wikipedia/zh/2/24/ROC_National_Security_Bureau_Seal.svg',
  'https://cdn.tailwindcss.com/3.4.17'
];

// 安裝 Service Worker 並快取資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('正在預先快取資產...');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 激活 Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 攔截請求，確保離線時也能運作
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
