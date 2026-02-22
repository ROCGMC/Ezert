const CACHE_NAME = 'ezert-v1';
const ASSETS = [
  '/Ezert/',
  '/Ezert/index.html',
  '/Ezert/manifest.json',
  '/Ezert/icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
