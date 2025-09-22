self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  // Simple passthrough fetch
  event.respondWith(fetch(event.request).catch(() => new Response("Fetch failed", { status: 502 })));
});
