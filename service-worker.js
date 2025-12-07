
const CACHE_NAME = 'arm-app-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// INSTALL : Mise en cache initiale
self.addEventListener('install', event => {
  // Force l'activation immédiate du nouveau service worker
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ACTIVATE : Nettoyage des anciens caches
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
  // Prend le contrôle des clients immédiatement
  self.clients.claim();
});

// FETCH : Stratégie Network-First (Réseau en priorité, Cache en secours)
self.addEventListener('fetch', event => {
  // On ignore les requêtes non-GET (POST, etc.) et les extensions chrome/etc
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la réponse est valide, on la clone dans le cache pour la prochaine fois
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // En cas d'échec réseau (offline), on cherche dans le cache
        return caches.match(event.request)
          .then(cachedResponse => {
             if (cachedResponse) {
                 return cachedResponse;
             }
             // Fallback optionnel : retourner une page hors-ligne générique si besoin
             // return caches.match('/offline.html');
          });
      })
  );
});
