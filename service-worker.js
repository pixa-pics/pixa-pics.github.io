var REQUIRED_CACHE = "unless-update-cache-v1-required";
var USEFUL_CACHE = "unless-update-cache-v1-useful";
var STATIC_CACHE = "unless-update-cache-v1-static";

// On install, cache some resource.
self.addEventListener("install", function(evt) {

    return evt.waitUntil(Promise.allSettled([
        caches.open(REQUIRED_CACHE).then(function (cache) {
            return cache.addAll([
                "/",
                "/404.html",
                "/index.html",
                "/client.min.js", // This is chunck norris, master of all chunk
                "/chunk.2.min.js",
                "/src/fonts/Jura-Medium.woff2",
                "/manifest.json",
            ]);
        })
    ]).then(() => {

        var waiting = Promise.allSettled([
            caches.open(USEFUL_CACHE).then(function (cache) {
                return cache.addAll([
                    "/src/images/favicon.ico",
                    "/src/images/fun.svg",
                    "/src/images/background.svg",
                    "/src/images/office.svg",
                    "/src/images/logo-transparent.png",
                    "/src/images/manifest/icon-white.png",
                    "/src/images/404.svg",
                    "/src/images/share.svg",
                ]);
            }),
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.addAll([
                    "/client.min.js",
                    "/chunk.2.min.js",
                    "/chunk.0.min.js",
                    "/chunk.3.min.js",
                    "/chunk.4.min.js",
                    "/chunk.5.min.js",
                    "/chunk.6.min.js",
                ]);
            }),
            caches.open(STATIC_CACHE).then(function (cache) {
                return cache.addAll([
                    "/src/sounds/sfx/md/FullHorizonThrow.mp3",
                    "/src/sounds/sfx/md/hero_decorative-celebration-02.mp3",
                    "/src/sounds/sfx/md/navigation_selection-complete-celebration.mp3",
                    "/src/sounds/sfx/md/navigation_transition-left.mp3",
                    "/src/sounds/sfx/md/navigation_transition-right.mp3",
                    "/src/sounds/sfx/md/state-change_confirm-down.mp3",
                    "/src/sounds/sfx/md/ui_lock.mp3",
                    "/src/sounds/sfx/md/ui_unlock.mp3",
                ]);
            }),
            caches.keys().then(keys => Promise.allSettled(
                keys.map(key => {
                    if (key !== REQUIRED_CACHE && key !== STATIC_CACHE && key !== USEFUL_CACHE) {
                        return caches.delete(key);
                    }
                })
            ))
        ]);

        if(navigator.onLine) {

            waiting = self.skipWaiting();
        }

        return waiting;
    }));
});

self.addEventListener("fetch", function(event) {

    const url = event.request.url;

    if((url.includes(".png") || url.includes(".jpg") || url.includes(".jpeg") || url.includes(".gif") || url.includes(".ico")) && event.request.mode === "same-origin") {

        // Serve cached image if doesn't fail
        event.respondWith(
            caches.open(USEFUL_CACHE).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put(event.request, response.clone());
                            return response;
                        })
                    );
                });
            }),
        );

    }else if(url.includes(".png") || url.includes(".jpg") || url.includes(".jpeg") || url.includes(".gif") || url.includes(".ico")) {

        // Serve cached image if doesn't fail
        event.respondWith(
            caches.open(STATIC_CACHE).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put(event.request, response.clone());
                            return response;
                        })
                    );
                });
            }),
        );


    }else if(url.includes("client.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("chunk.0.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/chunk.0.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/chunk.0.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("chunk.1.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/chunk.1.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/chunk.1.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("chunk.2.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/chunk.2.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/chunk.2.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("chunk.3.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/chunk.3.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/chunk.3.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("chunk.4.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/chunk.4.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/chunk.4.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("chunk.5.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/chunk.5.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/chunk.5.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("chunk.6.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/chunk.6.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/chunk.6.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(event.request.mode === "navigate") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/index.html").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/index.html", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else {
        Promise.race([
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    if(response) { return response }
                });
            }),
            caches.open(USEFUL_CACHE).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    if(response) { return response }
                });
            }),
            caches.open(STATIC_CACHE).then(function (cache) {
                return cache.match(event.request).then(function (response) {

                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch and serve
                            return response;
                        })
                    );

                })
            })
        ]).then(function(response){return response})
    }
});

self.addEventListener("activate", function(evt) {

    if(navigator.onLine) {

        return self.clients.claim();
    }else {

        return event.waitUntil(Promise.allSettled([
                caches.keys().then(keys => Promise.allSettled(
                    keys.map(key => {
                        if (key !== REQUIRED_CACHE && key !== STATIC_CACHE && key !== USEFUL_CACHE) {
                            return caches.delete(key);
                        }
                    })
                ))
            ])
        ).then(function(response){return response});
    }
});