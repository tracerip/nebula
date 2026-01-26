/*
<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                console.log('SW Registered!');
            });
        });
    }
</script>
*/

const CACHE_NAME = 'game-cache-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);
    const isCDN = url.hostname === 'cdn.jsdelivr.net';
    const isLocal = location.origin === url.origin;

    if (isCDN || isLocal) {
        event.respondWith(
            caches.open(CACHE_NAME).then(async (cache) => {
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                }

                try {
                    const networkResponse = await fetch(event.request);
                    cache.put(event.request, networkResponse.clone());

                    return networkResponse;
                } catch (error) {
                    console.error("Fetch failed:", error);
                    throw error;
                }
            })
        );
    }
});