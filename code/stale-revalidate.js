importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('.png')) {
    const cacheFirst = new workbox.strategies.StaleWhileRevalidate();
    event.respondWith(cacheFirst.handle({request: event.request}));
  }
});
