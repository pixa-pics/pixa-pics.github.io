var REQUIRED_CACHE = "unless-update-cache-v10-required";
var USEFUL_CACHE = "unless-update-cache-v10-useful";
var STATIC_CACHE = "unless-update-cache-v10-static";

// On install, cache some resource.
self.addEventListener("install", function(evt) {

    return evt.waitUntil(Promise.allSettled([
        caches.open(REQUIRED_CACHE).then(function (cache) {
            return cache.addAll([
                "/",
                "/404.html",
                "/index.html",
                "/src/images/favicon.ico",
                "/src/fonts/Jura-Medium.woff2",
                "/manifest.json",
                "/client.min.js", // This is chunck norris, master of all chunk
            ]);
        })
    ]).then(() => {

        var waiting = Promise.allSettled([
            caches.open(USEFUL_CACHE).then(function (cache) {
                return cache.addAll([
                    "/src/images/fun.svg",
                    "/src/images/background.svg",
                    "/src/images/logo-transparent.png",
                    "/src/images/manifest/icon-white.png",
                    "/src/images/404.svg",
                    "/src/images/office.svg",
                    "/src/images/heroes.svg",
                    "/src/images/newch.svg",
                    "/src/images/selfie.svg",
                ]);
            }),
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.addAll([
                    "/client.min.js",
                    "/client.2.min.js",
                    "/client.0.min.js",
                    "/client.3.min.js",
                    "/client.4.min.js",
                    "/client.5.min.js",
                    "/client.6.min.js",
                    "/client.7.min.js",
                    "/client.8.min.js",
                    "/client.9.min.js",
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


    }else if(url.includes("client.main.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.main.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.main.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("client.0.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.0.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.0.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("client.1.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.1.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.1.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("client.2.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.2.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.2.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("client.3.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.3.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.3.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("client.4.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.4.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.4.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("client.5.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.5.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.5.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("client.6.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.6.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.6.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("client.7.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.7.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.7.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("client.8.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.8.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.8.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("client.9.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/client.9.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/client.9.min.js", response.clone());
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