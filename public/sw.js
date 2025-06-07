
const CACHE_NAME = 'agri-pro-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installation en cours...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache ouvert et initialisé');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Service Worker: Erreur lors de la mise en cache:', error);
      })
  );
  // Force le service worker à devenir actif immédiatement
  self.skipWaiting();
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activation en cours...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Suppression du cache obsolète:', cacheName);
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
  // Permet au service worker de contrôler toutes les pages immédiatement
  self.clients.claim();
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  // Ignore les requêtes non-HTTP
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourne la version en cache si disponible
        if (response) {
          return response;
        }
        
        // Clone la requête car elle ne peut être utilisée qu'une fois
        const fetchRequest = event.request.clone();
        
        // Sinon, fait la requête réseau
        return fetch(fetchRequest)
          .then((response) => {
            // Vérifie si c'est une réponse valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone la réponse
            const responseToCache = response.clone();

            // Mise en cache de la nouvelle ressource
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Retourne une page hors-ligne ou un contenu spécifique
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
          });
      })
  );
});

// Gestion des notifications push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nouvelle notification de AgriPro',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('AgriPro', options)
  );
});
