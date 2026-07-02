const CACHE_NAME = 'radjokes-v3';

async function getCacheAssets() {
  try {
    const response = await fetch('/_data/cache.json');
    if (!response.ok) throw new Error('Failed to load cache manifest');
    const data = await response.json();
    return data.assets || [];
  } catch (error) {
    console.error('SW cache manifest error:', error);
    return [];
  }
}

let staticAssets = [];

// Precache known static pages + assets
self.addEventListener('install', event => {
  event.waitUntil(
    getCacheAssets().then(assets => {
      staticAssets = assets;
      return caches.open(CACHE_NAME).then(cache => cache.addAll(assets));
    }).then(() => self.skipWaiting())
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

function isStaticAsset(pathname) {
  return staticAssets.some(path => pathname === path);
}

// Network-first for pages, cache-first for static assets, fallback to 404 page
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external origins
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  const isPage = request.mode === 'navigate' || request.destination === 'document';
  const isStatic = isStaticAsset(url.pathname);

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

  if (isStatic || request.destination === 'style' || request.destination === 'script' || request.destination === 'image') {
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
