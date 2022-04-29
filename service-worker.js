var REQUIRED_CACHE = "unless-update-cache-v75-required";
var USEFUL_CACHE = "unless-update-cache-v75-useful";
var STATIC_CACHE = "unless-update-cache-v75-static";
var CHILD_CHUNK_REGEX = /child\-chunk\.(main\~[a-z0-9]+|[0-9]+)\.min.js/i;

// On install, cache some resource.
self.addEventListener("install", function(evt) {

    if(!navigator.onLine) {

        return true;
    }

    var not_urgent = Promise.allSettled([
        caches.open(USEFUL_CACHE).then(function (cache) {
            return cache.addAll([
                "/src/images/office.svg",
                "/src/images/travelers.svg",
                "/src/images/painting.svg",
                "/src/images/sane-healthy-memories.svg",
                "/src/images/abduction.svg",
                "/src/images/AI.svg",
                "/src/images/DNA.svg",
                "/src/images/CPU.svg",
                "/src/images/laboratory.svg",
            ]);
        }),
        caches.open(REQUIRED_CACHE).then(function (cache) {
            return cache.addAll([
                "/child-chunk.0.min.js",
                "/child-chunk.1.min.js",
                "/child-chunk.2.min.js",
                "/child-chunk.3.min.js",
                "/child-chunk.4.min.js",
                "/child-chunk.5.min.js",
                "/child-chunk.6.min.js",
                "/child-chunk.7.min.js",
                "/child-chunk.8.min.js",
                "/child-chunk.9.min.js",
                "/child-chunk.10.min.js",
                "/child-chunk.11.min.js",
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
                "/src/sounds/music/redeclipse/track_12.mp3",
            ]);
        })
    ]);

    return evt.waitUntil(Promise.allSettled([
        caches.open(REQUIRED_CACHE).then(function (cache) {
            return cache.addAll([
                "/manifest.json",
                "/",
                "/src/fonts/Jura-Medium.woff2",
                "/father-chunk.norris.min.js", // This is chunk norris, master of all chunk
                "/child-chunk.main~0d5ee630.min.js",
                "/child-chunk.main~1f20a385.min.js",
                "/child-chunk.main~5a2dc592.min.js",
                "/child-chunk.main~9acc357d.min.js",
                "/child-chunk.main~253ae210.min.js",
                "/child-chunk.main~748942c6.min.js",
                "/child-chunk.main~c3be6df1.min.js",
                "/child-chunk.main~af9f4ef7.min.js",
                "/child-chunk.main~c1dd23ef.min.js",
                "/child-chunk.main~d939e436.min.js",
                "/child-chunk.main~f9ca8911.min.js",
            ]);
        }),
        caches.open(USEFUL_CACHE).then(function (cache) {
            return cache.addAll([
                "/src/images/manifest/icon-white.png",
                "/src/images/favicon.ico",
                "/src/images/fun.svg",
                "/src/images/rocket_boy.svg",
                "/src/images/background.svg",
                "/src/images/logo-transparent.png",
                "/src/images/heroes.svg",
                "/src/images/404.svg",
            ]);
        })
    ]));
});

self.addEventListener("fetch", function(event) {

    const url = event.request.url;

    if(event.request.mode === "navigate") {

        event.respondWith(

            caches.open(REQUIRED_CACHE).then(function (cache) {

                return fetch(event.request).then(function (response) { // Fetch, clone, and serve

                    if(response.status === 200) {

                        return cache.put("/", response.clone()).then(() => {return response.clone()});
                    }else {

                        return cache.match("/");
                    }
                }).catch(function(reason){

                    return cache.match("/");
                })
            })
        );

    }else if((url.includes(".png") || url.includes(".jpg") || url.includes(".jpeg") || url.includes(".gif") || url.includes(".ico")) && event.request.mode === "same-origin") {

        // Serve cached image if doesn't fail
        event.respondWith(
            caches.open(USEFUL_CACHE).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put(event.request, response.clone()).then(() => {return response.clone()});
                        })
                    );
                }).catch(function(reason) {

                    return fetch(event.request).then(function (response) { // Fetch, clone, and serve
                        cache.put(event.request, response.clone()).then(() => {return response.clone()});
                    });
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
                            cache.put(event.request, response.clone()).then(() => {return response.clone()});
                        })
                    );
                }).catch(function(reason) {

                    return fetch(event.request).then(function (response) { // Fetch, clone, and serve
                        cache.put(event.request, response.clone()).then(() => {return response.clone()});
                    });
                });
            }),
        );


    }else if((url.includes(".wav") || url.includes(".mp3")) && event.request.mode === "same-origin") {

        // Serve cached sound if doesn't fail
        event.respondWith(
            caches.open(STATIC_CACHE).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put(event.request, response.clone()).then(() => {return response.clone()});
                        })
                    );
                }).catch(function (reason) {

                    return fetch(event.request).then(function (response) { // Fetch, clone, and serve
                        cache.put(event.request, response.clone()).then(() => {return response.clone()});
                    });
                });
            }),
        );

    }else if(url.includes("father-chunk.norris.min.js") && event.request.mode === "same-origin") {

        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match("/father-chunk.norris.min.js").then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put("/father-chunk.norris.min.js", response.clone()).then(() => {return response.clone()});
                        })
                    );
                }).catch(function(reason){

                    return fetch(event.request).then(function (response) { // Fetch, clone, and serve
                        cache.put("/father-chunk.norris.min.js", response.clone()).then(() => {return response.clone()});
                    });
                });
            })
        );

    }else if((url.match(CHILD_CHUNK_REGEX) || []).length >= 2 && event.request.mode === "same-origin") {

        const middle_name = url.match(CHILD_CHUNK_REGEX)[1];
        event.respondWith(
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match(`/child-chunk.${middle_name}.min.js`).then(function (response) {
                    return (
                        response ||
                        fetch(event.request).then(function (response) { // Fetch, clone, and serve
                            cache.put(`/child-chunk.${middle_name}.min.js`, response.clone()).then(() => {return response.clone()});
                        })
                    );
                }).catch(function(reason) {

                    return fetch(event.request).then(function (response) { // Fetch, clone, and serve
                        cache.put(`/child-chunk.${middle_name}.min.js`, response.clone()).then(() => {return response.clone()});
                    });
                });
            })
        );

    }else {
        Promise.race([
            caches.open(REQUIRED_CACHE).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    if(response) { return response}
                });
            }),
            caches.open(USEFUL_CACHE).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    if(response) { return response }
                });
            }),
            caches.open(STATIC_CACHE).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    if(response) { return response }
                });
            }),
            fetch(event.request).then(function (response) { // Fetch and serve

                if(response.ok) { return response }
            })
        ]).then(function(response){return response})
    }
});

self.addEventListener("activate", function(event) {

    return event.waitUntil(Promise.allSettled([
            caches.keys().then(keys => Promise.allSettled(
                keys.map(key => {
                    if (key !== REQUIRED_CACHE && key !== STATIC_CACHE && key !== USEFUL_CACHE) {
                        return caches.delete(key);
                    }
                })
            ))
        ])
    );
});