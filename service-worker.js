var REQUIRED_CACHE = "unless-update-cache-v14-required";
var USEFUL_CACHE = "unless-update-cache-v14-useful";
var STATIC_CACHE = "unless-update-cache-v14-static";

// On install, cache some resource.
self.addEventListener("install", function(evt) {

    return evt.waitUntil(Promise.allSettled([
        caches.open(REQUIRED_CACHE).then(function (cache) {
            return cache.addAll([
                "/",
                "/404.html",
                "/index.html",
                "/src/fonts/Jura-Medium.woff2",
                "/childchunk.2.min.js",
                "/childchunk.8.min.js",
                "/fatherchunk.norris.min.js", // This is chunck norris, master of all chunk
                "/manifest.json",
            ]);
        }),
        caches.open(USEFUL_CACHE).then(function (cache) {
            return cache.addAll([
                "/src/images/manifest/icon-white.png",
                "/src/images/favicon.ico",
                "/src/images/fun.svg",
                "/src/images/background.svg",
                "/src/images/logo-transparent.png",
                "/src/images/heroes.svg",
                "/src/images/404.svg",
            ]);
        })
    ]).then(() => {

        var waiting = Promise.allSettled([
            caches.open(USEFUL_CACHE).then(function (cache) {
                return cache.addAll([
                    "/src/images/office.svg",
                    "/src/images/travelers.svg",
                    "/src/images/newch.svg",
                    "/src/images/selfie.svg",
                    "/src/images/abduction.svg",
                    "/src/images/AI.svg",
                    "/src/images/DNA.svg",
                    "/src/images/laboratory.svg",
                ]);
            }),
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.addAll([
                    "/childchunk.0.min.js",
                    "/childchunk.3.min.js",
                    "/childchunk.4.min.js",
                    "/childchunk.5.min.js",
                    "/childchunk.6.min.js",
                    "/childchunk.7.min.js",
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


    }else if(url.includes("fatherchunk.norris.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/fatherchunk.norris.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/fatherchunk.norris.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("childchunk.0.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/childchunk.0.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/childchunk.0.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("childchunk.2.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/childchunk.2.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/childchunk.2.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("childchunk.3.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/childchunk.3.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/childchunk.3.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("childchunk.4.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/childchunk.4.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/childchunk.4.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("childchunk.5.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/childchunk.5.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/childchunk.5.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("childchunk.6.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/childchunk.6.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/childchunk.6.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("childchunk.7.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/childchunk.7.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/childchunk.7.min.js", response.clone());
                            return response;
                        })
                    );
                });
            })
        );

    }else if(url.includes("childchunk.8.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/childchunk.8.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/childchunk.8.min.js", response.clone());
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