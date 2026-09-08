const CACHE_NAME = "kfy-begena-v3";

const APP_SHELL = [
    "./",
    "./index.html",
    "./styles.css",
    "./manifest.webmanifest"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(APP_SHELL);
        })
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    const request = event.request;

    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    /*
     * NEVER cache JavaScript.
     */
    if (
        url.pathname.endsWith("/app.js")
    ) {
        event.respondWith(
            fetch(request, {
                cache: "no-store"
            })
        );

        return;
    }

    /*
     * NEVER use a cached index.html for navigation.
     *
     * Always try the network first so the newest
     * application shell is loaded.
     */
    if (
        request.mode === "navigate" ||
        url.pathname.endsWith("/index.html")
    ) {
        event.respondWith(
            fetch(request, {
                cache: "no-store"
            })
                .then(response => {
                    return response;
                })
                .catch(() => {
                    return caches.match("./index.html");
                })
        );

        return;
    }

    /*
     * Other static files:
     * cache first, then network.
     */
    event.respondWith(
        caches.match(request).then(cachedResponse => {

            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request)
                .then(response => {

                    if (
                        !response ||
                        !response.ok
                    ) {
                        return response;
                    }

                    const responseClone =
                        response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(
                                request,
                                responseClone
                            );
                        });

                    return response;
                })
                .catch(() => {
                    return caches.match(
                        "./index.html"
                    );
                });
        })
    );
});