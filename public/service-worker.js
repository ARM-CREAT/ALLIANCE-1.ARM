
const CACHE_NAME = 'arm-app-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/public/manifest.json',
  '/public/offline.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap'
];

// INSTALL
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // On essaie de mettre en cache les URLs statiques
        // Le catch permet de ne pas faire échouer l'install si une url externe bloque
        return cache.addAll(urlsToCache).catch(err => console.warn('Cache install warning:', err));
      })
  );
});

// ACTIVATE
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', event => {
  // Gestion spécifique pour les requêtes externes (CDN, Images)
  if (event.request.url.startsWith('http')) {
    
    // Stratégie Stale-While-Revalidate pour les assets statiques (JS, CSS, Fonts)
    // Utile pour React, Tailwind, Lucide Icons venant du CDN
    if (event.request.destination === 'script' || 
        event.request.destination === 'style' || 
        event.request.destination === 'font' ||
        event.request.url.includes('aistudiocdn') || 
        event.request.url.includes('cdn-icons-png')) {
        
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic' || networkResponse.type === 'cors') {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                }).catch(() => {
                    // Si réseau échoue, pas grave si on a le cache
                });
                return cachedResponse || fetchPromise;
            })
        );
        return;
    }
  }

  // Stratégie Network-First pour le contenu principal (HTML, API simulée)
  if (event.request.mode === 'navigate' || event.request.method === 'GET') {
      event.respondWith(
        fetch(event.request)
          .then(response => {
            if (response && response.status === 200) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          })
          .catch(() => {
            return caches.match(event.request)
              .then(cachedResponse => {
                 if (cachedResponse) return cachedResponse;
                 if (event.request.mode === 'navigate') {
                     return caches.match('/public/offline.html');
                 }
              });
          })
      );
  }
});
