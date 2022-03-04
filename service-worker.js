var REQUIRED_CACHE = "network-or-cache-v36-required";
var USEFUL_CACHE = "network-or-cache-v36-useful";
var STATIC_CACHE = "network-or-cache-v36-static";

// On install, cache some resource.
self.addEventListener("install", function(evt) {

    return evt.waitUntil(Promise.allSettled([
        caches.open(REQUIRED_CACHE).then(function (cache) {
            return cache.addAll([
                "/",
                "/index.html",
                "/404.html",
                "/client.min.js", // This is chunck norris, master of all chunk
                "/src/fonts/Jura-Medium.woff2",
                "/src/images/favicon.ico",
                "/manifest.json",
            ]);
        }),
        caches.open(USEFUL_CACHE).then(function (cache) {
            return cache.addAll([
                "/src/images/designer.svg",
                "/manifest.json"
            ]);
        }),
        caches.open(STATIC_CACHE).then(function (cache) {
            return cache.addAll([]);
        })
    ]).then(() => {

        const caching = Promise.allSettled([
            caches.open(USEFUL_CACHE).then(function (cache) {
                return cache.addAll([
                    "/src/images/fun.svg",
                    "/src/images/logo-transparent.png",
                    "/src/images/manifest/icon-white.png",
                    "/src/images/404-dark-2.svg",
                    "/src/images/share.svg",
                ]);
            }),
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.addAll([
                    "/chunk.3.min.js", // Second js to be loaded is this one
                    //"/chunk.1.min.js", The compiler doesn't want to create chunk.1.min.js instead he pass from the n°0 to the n°2 directly :[
                    "/chunk.0.min.js",
                    "/chunk.2.min.js",
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

        return self.skipWaiting();
    }));
});

self.addEventListener("fetch", function(event) {

    const url = event.request.url;

    if((url.includes(".png") || url.includes(".jpg") || url.includes(".jpeg") || url.includes(".gif")) && event.request.mode !== "same-origin") {

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

        // Return the same index.html page for all navigation query
        event.respondWith( caches.match("/").then(function (response) {
            return (
                response || fetch(event.request).then(function (response) {return response})
            );
        }));

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

    return self.clients.claim();
});