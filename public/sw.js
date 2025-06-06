
const CACHE_NAME = 'agri-pro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert et initialisé');
        return cache.addAll(urlsToCache);
      })
  );
  // Force le service worker à devenir actif immédiatement
  self.skipWaiting();
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression du cache obsolète:', cacheName);
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
            
            // Pour les ressources d'images manquantes, on peut renvoyer une image par défaut
            if (event.request.destination === 'image') {
              return caches.match('/placeholder.svg');
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
