// Nom du cache pour votre application
const CACHE_NAME = 'smartlocation-v1';

// Liste des fichiers à mettre en cache pour une utilisation hors ligne
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './config.html',
  './gestion.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Installation du Service Worker : mise en cache des fichiers
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SmartLocation : Mise en cache des fichiers système...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activation du Service Worker : nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SmartLocation : Nettoyage de l\'ancien cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Stratégie de récupération : priorité au réseau, secours sur le cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
