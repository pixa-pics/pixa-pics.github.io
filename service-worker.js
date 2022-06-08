var REQUIRED_CACHE = "unless-update-cache-v211-required";
var USEFUL_CACHE = "unless-update-cache-v211-useful";
var STATIC_CACHE = "unless-update-cache-v211-static";
var MAIN_CHILD_CHUNK_REGEX = /child\-chunk\.(main\~[a-z0-9]+)\.min.js/i;
var CHILD_CHUNK_REGEX = /child\-chunk\.([0-9]+)\.min.js/i;

var required_cache_object = {};
var required_cache = new Promise(function(resolve, reject){

    if(typeof required_cache_object.addAll !== "undefined") {

        return required_cache_object;
    }else {

        caches.open(REQUIRED_CACHE).then(function(cache){required_cache_object = cache;resolve(required_cache_object);}).catch(function(reason){reject(reason)});
    }
});

var useful_cache_object = {};
var useful_cache = new Promise(function(resolve, reject){

    if(typeof useful_cache_object.addAll !== "undefined") {

        return useful_cache_object;
    }else {

        caches.open(USEFUL_CACHE).then(function(cache){useful_cache_object = cache;resolve(useful_cache_object);}).catch(function(reason){reject(reason)});
    }
});

var static_cache_object = {};
var static_cache = new Promise(function(resolve, reject){

    if(typeof static_cache_object.addAll !== "undefined") {

        return static_cache_object;
    }else {

        caches.open(STATIC_CACHE).then(function(cache){static_cache_object = cache;resolve(static_cache_object);}).catch(function(reason){reject(reason)});
    }
});


// On install, cache some resource.
self.addEventListener("install", function(event) {

    if (!navigator.onLine) {

        return true;
    }

    const first_required = Promise.all([
        useful_cache.then(function (cache) {
            return cache.addAll([
                "/src/images/manifest/icon-white.png",
                "/src/images/favicon.ico",
                "/src/images/logo-transparent.png",
                "/src/images/infographics/HelmetSpart.svg",
                "/src/images/infographics/Leana.svg",
                "/src/images/illustrations/ChemicalScientist.svg",
                "/src/images/illustrations/China-night.svg",
                "/src/images/illustrations/Egypt-day.svg",
                "/src/images/infographics/Lucky.svg",
                "/src/images/infographics/Wardenclyffe.svg",
                "/src/images/infographics/HappyLucky.svg",
            ]);
        }),
        required_cache.then(function (cache) {
            return cache.addAll([
                "/",
                "/src/fonts/Jura.css",
                "/child-chunk.main~0d5ee630.min.js",
                "/child-chunk.main~1f20a385.min.js",
                "/child-chunk.main~5a2dc592.min.js",
                "/child-chunk.main~9acc357d.min.js",
                "/child-chunk.main~253ae210.min.js",
                "/child-chunk.main~748942c6.min.js",
                "/child-chunk.main~af9f4ef7.min.js",
                "/child-chunk.main~c1dd23ef.min.js",
                "/child-chunk.main~c3be6df1.min.js",
                "/child-chunk.main~d939e436.min.js",
                "/child-chunk.main~f9ca8911.min.js",
                "/father-chunk.norris.min.js",
            ])
        })
    ]);

    event.waitUntil(first_required);
});

self.addEventListener("fetch", function(event) {

    const url = event.request.url;

    if(url.includes("data:image") || url.includes("blob:http") || url.includes("data:application")) {

        event.respondWith(fetch(event.request));

    }else if(url.includes("data:,all")) {

        event.respondWith(
            Promise.all([
                useful_cache.then(function (cache) {
                    return cache.addAll([
                        "/src/images/infographics/ShareWho.svg",
                        "/src/images/infographics/Lips.svg",
                        "/src/images/infographics/Pharaon.svg",
                        "/src/images/infographics/NoBombs.svg",
                        "/src/images/infographics/Pyrawoman.svg",
                        "/src/images/infographics/Rambo.svg",
                        "/src/images/infographics/TestBag.svg",
                        "/src/images/infographics/Explosion.svg",
                        "/src/images/REMINDER.svg",
                        "/src/images/Onboarding.svg",
                        "/src/images/Error.svg",
                        "/src/images/abduction.svg",
                        "/src/images/Idea.svg",
                        "/src/images/AI.svg",
                        "/src/images/DNA.svg",
                        "/src/images/CPU.svg",
                        "/src/images/ChromeGreatDownload.svg",
                        "/src/images/EdgeGreatDownload.svg",
                        "/src/images/laboratory.svg",
                        "/src/images/illustrations/Gold.svg",
                        "/src/images/league/Bronze.svg",
                        "/src/images/league/Diamond.svg",
                        "/src/images/league/Gold.svg",
                        "/src/images/league/Silver.svg",
                    ]);
                }),
                required_cache.then(function (cache) {
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
                        "/child-chunk.12.min.js",
                        "/child-chunk.13.min.js",
                    ]);
                }),
                static_cache.then(function (cache) {
                    return cache.addAll([
                        "/src/sounds/sfx/md/FullHorizonThrow.mp3",
                        "/src/sounds/sfx/md/hero_decorative-celebration-02.mp3",
                        "/src/sounds/sfx/md/navigation_selection-complete-celebration.mp3",
                        "/src/sounds/sfx/md/navigation_transition-left.mp3",
                        "/src/sounds/sfx/md/navigation_transition-right.mp3",
                        "/src/sounds/sfx/md/state-change_confirm-down.mp3",
                        "/src/sounds/sfx/md/ui_lock.mp3",
                        "/src/sounds/sfx/md/ui_unlock.mp3",
                        "/src/sounds/sfx/md/alert_high-intensity.mp3",
                        "/src/sounds/music/redeclipse/track_09.mp3",
                    ]);
                })
            ])
                .then(function(){return new Response("all",{status: 200})})
                .catch(function(){return new Response("all", {status: 500})})
        );

    }else if(url.includes(".png") || url.includes(".svg") || url.includes(".jpg") || url.includes(".jpeg") || url.includes(".gif") || url.includes(".ico")) {

        // Serve cached image if doesn't fail
        event.respondWith(
            useful_cache.then(function (cache) {
                return cache.match(event.request.url).then(function (response) {
                    return response.clone();
                }).catch(function() {

                    return fetch(event.request).then(function (response) { // Fetch, clone, and serve
                        return cache.put(event.request, response.clone()).then(function () {return response.clone()});
                    });
                });
            }),
        );

    }else if(url.includes(".wav") || url.includes(".mp3")) {

        event.respondWith(
            static_cache.then(function (cache) {
                return cache.match(event.request.url).then(function (response) {
                    return response.clone();
                }).catch(function (reason) {

                    return fetch(event.request).then(function (response) { // Fetch, clone, and serve
                        return cache.put(event.request, response.clone()).then(function () {return response.clone()});
                    });
                });
            }),
        );

    }else if(url.includes(".woff2") || url.includes(".ttf") || url.includes(".css") || url.includes(".json") ) {

        event.respondWith(
            required_cache.then(function (cache) {
                return cache.match(event.request.url).then(function (response) {
                    return response.clone();
                }).catch(function (reason) {

                    return fetch(event.request).then(function (response) { // Fetch, clone, and serve
                        return cache.put(event.request, response.clone()).then(function () {return response.clone()});
                    });
                });
            }),
        );

    }else if(url.includes("father-chunk.norris.min.js")) {

        event.respondWith(
            required_cache.then(function (cache) {
                return cache.match("/father-chunk.norris.min.js").then(function (response) {
                    return response.clone();
                }).catch(function(reason){

                    return fetch("/father-chunk.norris.min.js").then(function (response) { // Fetch, clone, and serve
                        return cache.put("/father-chunk.norris.min.js", response.clone()).then(function () {return response.clone()});
                    });
                });
            })
        );

    }else if((url.match(MAIN_CHILD_CHUNK_REGEX) || []).length >= 2) {

        const middle_name = url.match(MAIN_CHILD_CHUNK_REGEX)[1];
        event.respondWith(
            required_cache.then(function (cache) {
                return cache.match(`/child-chunk.${middle_name}.min.js`).then(function (response) {
                    return response.clone();
                }).catch(function(reason) {

                    return fetch(`/child-chunk.${middle_name}.min.js`).then(function (response) { // Fetch, clone, and serve
                        return cache.put(`/child-chunk.${middle_name}.min.js`, response.clone()).then(function () {return response.clone()});
                    });
                });
            })
        );

    }else if((url.match(CHILD_CHUNK_REGEX) || []).length >= 2) {

        const middle_name = url.match(CHILD_CHUNK_REGEX)[1];
        event.respondWith(
            required_cache.then(function (cache) {
                return cache.match(`/child-chunk.${middle_name}.min.js`).then(function (response) {
                    return response.clone();
                }).catch(function(reason) {

                    return fetch(`/child-chunk.${middle_name}.min.js`).then(function (response) { // Fetch, clone, and serve
                        return cache.put(`/child-chunk.${middle_name}.min.js`, response.clone()).then(function () {return response.clone()});
                    });
                });
            })
        );

    }else if(event.request.mode === "navigate") {

        event.respondWith(

            required_cache.then(function (cache) {
                return cache.match(`/`).then(function (response) {
                    return response.clone();
                }).catch(function (reason) {

                    return fetch(`/`).then(function (response) { // Fetch, clone, and serve
                        return cache.put(`/`, response.clone()).then(function () {
                            return response.clone();
                        });
                    })
                })
            })
        );

    } else if(event.request.method === "GET") {

        event.respondWith(
            Promise.race([
                required_cache.then(function (cache) {
                    return cache.match(event.request.url).then(function (response) {
                        if(response) { return response.clone()}
                    });
                }),
                useful_cache.then(function (cache) {
                    return cache.match(event.request.url).then(function (response) {
                        if(response) { return response.clone() }
                    });
                }),
                static_cache.then(function (cache) {
                    return cache.match(event.request.url).then(function (response) {
                        if(response) { return response.clone() }
                    });
                }),
                fetch(event.request.url).then(function (response) { // Fetch and serve

                    return response.clone()
                })
            ])
        );
    }else {

        return;
    }
});

self.addEventListener("activate", function(event) {

    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== REQUIRED_CACHE && key !== STATIC_CACHE && key !== USEFUL_CACHE) {
                    return caches.delete(key);
                }
            })
        ))
    );
});