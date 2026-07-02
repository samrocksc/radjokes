const CACHE_NAME = 'radjokes-v2';

const staticAssets = [
  '/',
  '/index.html',
  '/404.html',
  '/resume/',
  '/blog/',
  '/blog/about-that-interview-i-biffed/',
  '/blog/binary-search-blindspot/',
  '/blog/binary-search-layman/',
  '/blog/developers-right-to-exist/',
  '/blog/intro-to-hri/',
  '/blog/learning-about-ciam/',
  '/blog/post-1/',
  '/blog/post-2/',
  '/blog/predictability-gap/',
  '/assets/styles.css',
  '/assets/blog.css',
  '/assets/homepage.js',
  '/assets/interactive-shadow.js',
  '/assets/prism/prism.css',
  '/assets/prism/prism.js',
  '/assets/favicon.svg',
  '/assets/manifest.json',
  '/assets/1.jpg',
  '/assets/2.jpg',
  '/assets/3.jpg',
  '/assets/4.jpg',
  '/assets/5.jpg',
  '/assets/6.jpg',
  '/assets/7.jpg',
  '/assets/8.jpg',
  '/assets/binary-search-pyramid.svg'
];

// Precache known static pages + assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(staticAssets))
      .then(() => self.skipWaiting())
  );
});

// Claim clients immediately on activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Network-first for pages, cache-first for static assets, fallback to 404 page
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external origins
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  const isPage = request.mode === 'navigate' || request.destination === 'document';
  const isStaticAsset = staticAssets.some(path => url.pathname === path);

  if (isPage) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then(cached => cached || caches.match('/404.html'))
        )
    );
    return;
  }

  if (isStaticAsset || request.destination === 'style' || request.destination === 'script' || request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          // Refresh cache in background
          fetch(request).then(response => {
            if (response.ok) {
              caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
            }
          }).catch(() => {});
          return cached;
        }
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Default: network only
  event.respondWith(fetch(request));
});
