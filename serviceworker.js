// !====Chache ===========================
const CACHE_NAME = "birthday-remember-app-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/main.jsx?t=1716129792600",
  "/src/index.css?t=1716129792600",
  "/src/assets/bith.png",
  "/src/App.jsx?t=1716129792600",
  "/src/Api/Birthdayevent.jsx?t=1716129792600",
  "/src/Component/Birthday.jsx?t=1716129792600",
  "/src/Component/Main.jsx?t=1716129792600",
  "/src/Component/Datacollect.jsx?t=1716129792600",
  "/src/Component/Form.jsx?t=1716129792600",
  "/vite.svg",
  "/@vite/client",
  "/@react-refresh",
  "/node_modules/react-toastify/dist/ReactToastify.css",
  "/src/assets/news-ting-6832.mp3?import",
  "/node_modules/vite/dist/client/env.mjs",
];

// ! ========2.step Installation Service-Worker=====================
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});


// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});