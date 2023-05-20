"use strict";
var REQUIRED_CACHE = "unless-update-cache-v693-required";
var USEFUL_CACHE = "unless-update-cache-v693-useful";
var STATIC_CACHE = "unless-update-cache-v693-static";
var MAIN_CHILD_CHUNK_REGEX = /chunk_(main_[a-z0-9]+)\.min\.js$/i;
var CHILD_CHUNK_REGEX = /chunk_([0-9]+)\.min\.js$/i;

var required_cache_object = {};
var required_cache = new Promise(function(resolve, reject){

    if(typeof required_cache_object.addAll !== "undefined") {

        resolve(required_cache_object);
    }else {

        caches.open(REQUIRED_CACHE).then(function(cache){required_cache_object = cache;resolve(required_cache_object);}).catch(function(reason){reject(reason)});
    }
});

var useful_cache_object = {};
var useful_cache = new Promise(function(resolve, reject){

    if(typeof useful_cache_object.addAll !== "undefined") {

        resolve(useful_cache_object);
    }else {

        caches.open(USEFUL_CACHE).then(function(cache){useful_cache_object = cache;resolve(useful_cache_object);}).catch(function(reason){reject(reason)});
    }
});

var static_cache_object = {};
var static_cache = new Promise(function(resolve, reject){

    if(typeof static_cache_object.addAll !== "undefined") {

        resolve(static_cache_object);
    }else {

        caches.open(STATIC_CACHE).then(function(cache){static_cache_object = cache;resolve(static_cache_object);}).catch(function(reason){reject(reason)});
    }
});


// On install, cache some resource.
self.addEventListener("install", function(event) {

    if (!navigator.onLine) {

        return true;
    }

    event.waitUntil(useful_cache.then(function (cache) {
        return cache.addAll([
            "/src/images/favicon.ico",
            "/src/images/manifest/logo-white.png",
            "/src/fonts/jura/index.css",
        ]);
    }));

    required_cache.then(function (cache) {
        cache.addAll([
            "/client/chunk_main_690b702c.min.js",
            "/client/chunk_main_748942c6.min.js",
            "/client/chunk_norris.min.js",
            "/",
        ])
    });
    static_cache.then(function (cache) {
        cache.addAll([
            "/src/videos/presentation.mp4",
            "/src/videos/tutorial.mp4",
            "/src/videos/create.mp4",
            "/src/videos/enhanced.mp4",
            "/src/videos/pixelated.mp4",
            "/src/videos/upload.mp4",
            "/src/videos/share1.mp4",
            "/src/videos/joke1.mp4"
        ])
    });
});

self.addEventListener("fetch", function(event) {

    const url = event.request.url;
    const same_site = true //event.request.referrer.startsWith(U.hostname);

    if (event.request.headers.get('range')) {

        event.respondWith(fetch(event.request));

    }else if(url.startsWith("data:image") || url.startsWith("blob:http") || url.startsWith("data:application")) {

        event.respondWith(Promise.resolve(fetch(url)));

    }else if(url.startsWith("data:,all")) {

        event.respondWith(
            Promise.allSettled([
                useful_cache.then(function (cache) {
                    return cache.addAll([
                        "/src/fonts/baksheesh/index.css",
                        "/src/images/infographics/ShareWho.svg",
                        "/src/images/gallery/Whohigh.png",
                        "/src/images/gallery/Whohigh.svg",
                        "/src/images/Gallery/Axip.png",
                        "/src/images/Gallery/Axip.svg",
                       "/src/images/gallery/Statue.png",
                        "/src/images/gallery/Statue.svg",
                        "/src/images/Gallery/Astro.png",
                        "/src/images/Gallery/Astro.svg",
                        "/src/images/Gallery/Businesswoman2.png",
                        "/src/images/Gallery/Businesswoman2.svg",
                        "/src/images/Gallery/Businesswoman.png",
                        "/src/images/Gallery/Businesswoman.svg",
                        "/src/images/infographics/Rambo.svg",
                        "/src/images/infographics/TestBag.svg",
                        "/src/images/infographics/Explosion.svg",
                        "/src/images/labostration/ABDUCTION.svg",
                        "/src/images/labostration/CHEMISTRY.svg",
                        "/src/images/labostration/COMPUTING.svg",
                        "/src/images/labostration/DOWNLOAD.svg",
                        "/src/images/labostration/GENOMA.svg",
                        "/src/images/labostration/MOLECULE.svg",
                        "/src/images/labostration/NUCLEAR.svg",
                        "/src/images/labostration/SCIENCE.svg",
                        "/src/images/REMINDER.svg",
                        "/src/images/Error.svg",
                        "/src/images/laboratory.svg",
                        "/src/images/illustrations/Camo.svg",
                        "/src/images/league/Bronze.png",
                        "/src/images/league/Diamond.png",
                        "/src/images/league/Gold.png",
                        "/src/images/league/Silver.png",
                    ]);
                }),
                required_cache.then(function (cache) {
                    return cache.addAll([
                        "/",
                        "/client/chunk_0.min.js",
                        "/client/chunk_1.min.js",
                        "/client/chunk_2.min.js",
                        "/client/chunk_3.min.js",
                        "/client/chunk_4.min.js",
                        "/client/chunk_5.min.js",
                        "/client/chunk_6.min.js",
                        "/client/chunk_7.min.js",
                        "/client/chunk_8.min.js",
                        "/client/chunk_9.min.js",
                        "/client/chunk_10.min.js",
                        "/client/chunk_11.min.js",
                        "/client/chunk_12.min.js",
                        "/client/chunk_13.min.js",
                        "/client/chunk_14.min.js",
                        "/client/chunk_15.min.js",
                        "/client/chunk_16.min.js",
                        "/client/chunk_17.min.js",
                        "/client/chunk_18.min.js",
                        "/client/chunk_19.min.js",
                        "/client/chunk_20.min.js",
                        "/client/chunk_21.min.js",
                        "/client/chunk_22.min.js",
                        "/client/chunk_23.min.js",
                        "/client/chunk_24.min.js",
                        "/client/chunk_25.min.js",
                        "/client/chunk_26.min.js",
                        "/client/chunk_27.min.js",
                        "/client/chunk_28.min.js",
                        "/client/chunk_29.min.js",
                        "/client/chunk_30.min.js",
                    ]);
                }),
                static_cache.then(function (cache) {
                    return cache.addAll([
                        "/src/sounds/sfx/md/hero_decorative-celebration-02.mp3",
                        "/src/sounds/sfx/md/navigation_selection-complete-celebration.mp3",
                        "/src/sounds/sfx/md/navigation_transition-left.mp3",
                        "/src/sounds/sfx/md/state-change_confirm-down.mp3",
                        "/src/sounds/sfx/md/ui_lock.mp3",
                        "/src/sounds/sfx/md/ui_unlock.mp3",
                        "/src/sounds/sfx/md/ui_scan.mp3",
                        "/src/sounds/sfx/md/alert_high-intensity.mp3",
                        "/src/sounds/sfx/md/navigation_transition-right.mp3",
                        "/src/sounds/voice/cn/accessing_memory.mp3",
                        "/src/sounds/voice/cn/complete.mp3",
                        "/src/sounds/voice/cn/please_wait.mp3",
                        "/src/sounds/voice/cn/data_upload.mp3",
                        "/src/sounds/voice/cn/processing.mp3",
                        "/src/sounds/voice/cn/enhanced.mp3",
                        "/src/sounds/voice/cn/rewriting_deep_layer_protocols.mp3",
                        "/src/sounds/voice/cn/vision_activated.mp3",
                        "/src/sounds/voice/cn/vision_deactivated.mp3",
                        "/src/sounds/voice/cn/filtering.mp3",
                        "/src/sounds/music/redeclipse/track_09.mp3",
                        "/src/videos/create.mp4",
                        "/src/videos/enhanced.mp4",
                        "/src/videos/pixelated.mp4",
                        "/src/videos/presentation.mp4",
                        "/src/videos/presentation2.mp4",
                        "/src/videos/sponsors.mp4",
                        "/src/videos/tutorial.mp4",
                        "/src/videos/upload.mp4",
                        "/src/videos/labintro.mp4",
                        "/src/videos/share2.mp4",
                        "/src/videos/share3.mp4",
                        "/src/videos/share4.mp4",
                        "/src/videos/share5.mp4",
                        "/src/videos/share6.mp4",
                        "/src/videos/share7.mp4",
                        "/src/videos/joke2.mp4",
                        "/src/videos/joke3.mp4",
                        "/src/videos/joke4.mp4",
                        "/src/videos/joke5.mp4",
                        "/src/videos/joke6.mp4",
                        "/src/videos/joke7.mp4",
                        "/src/videos/joke8.mp4",
                        "/src/videos/joke9.mp4",
                        "/src/videos/joke10.mp4",
                        "/src/videos/joke11.mp4",
                    ]);
                })
            ])
                .then(function(){return new Response("all",{status: 200})})
                .catch(function(){return new Response("all", {status: 500})})
        );

    }else if(Boolean(url.endsWith(".wasm") || url.endsWith(".png") || url.endsWith(".json") || url.endsWith(".svg") || url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".gif") || url.endsWith(".ico")) && same_site) {

        // Serve cached image if doesn't fail
        event.respondWith(
            useful_cache.then(function (cache) {
                return cache.match(url).then(function (response) {
                    return response.status === 200 ? response.clone(): fetch(url).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(url, response.clone());} return Promise.resolve(response.clone());
                    });
                }).catch(function(){
                    return fetch(url).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(url, response.clone());} return Promise.resolve(response.clone());
                    });
                });
            })
        );

    }else if(Boolean(url.endsWith(".wav") || url.endsWith(".mp3") || url.endsWith(".mp4")) && same_site) {

        event.respondWith(
            static_cache.then(function (cache) {
                return cache.match(url).then(function (response) {
                    return response.status === 200 ? response.clone(): fetch(url).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(url, response.clone());} return Promise.resolve(response.clone());
                    });
                }).catch(function(){
                    return fetch(url).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(url, response.clone());} return Promise.resolve(response.clone());
                    });
                });
            })
        );

    }else if(Boolean(url.endsWith(".woff2") || url.endsWith(".ttf") || url.endsWith(".css") || url.endsWith(".json")) && same_site ) {

        event.respondWith(
            useful_cache.then(function (cache) {
                return cache.match(url).then(function (response) {
                    return response.status === 200 ? response.clone(): fetch(url).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(url, response.clone());} return Promise.resolve(response.clone());
                    });
                }).catch(function(){
                    return fetch(url).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(url, response.clone());} return Promise.resolve(response.clone());
                    });
                });
            })
        );

    }else if(url.endsWith("chunk_norris.min.js") && same_site) {

        event.respondWith(
            required_cache.then(function (cache) {
                return cache.match("/client/chunk_norris.min.js").then(function (response) {
                    return response.status === 200 ? response.clone(): fetch("/client/chunk_norris.min.js").then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put("/client/chunk_norris.min.js", response.clone());} return Promise.resolve(response.clone());
                    });
                }).catch(function(){
                    return fetch(`/client/chunk_norris.min.js`).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put("/client/chunk_norris.min.js", response.clone());} return Promise.resolve(response.clone());
                    });
                });
            })
        );

    }else if((url.match(MAIN_CHILD_CHUNK_REGEX) || []).length >= 2 && same_site) {

        const middle_name = url.match(MAIN_CHILD_CHUNK_REGEX)[1];
        event.respondWith(
            required_cache.then(function (cache) {
                return cache.match(`/client/chunk_${middle_name}.min.js`).then(function (response) {
                    return response.status === 200 ? response.clone(): fetch(`/client/chunk_${middle_name}.min.js`).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(`/client/chunk_${middle_name}.min.js`, response.clone());} return Promise.resolve(response.clone());
                    });
                }).catch(function(){
                    return fetch(`/client/chunk_${middle_name}.min.js`).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(`/client/chunk_${middle_name}.min.js`, response.clone());} return Promise.resolve(response.clone());
                    });
                });
            })
        );

    }else if((url.match(CHILD_CHUNK_REGEX) || []).length >= 2 && same_site) {

        const middle_name = url.match(CHILD_CHUNK_REGEX)[1];
        event.respondWith(
            required_cache.then(function (cache) {
                return cache.match(`/client/chunk_${middle_name}.min.js`).then(function (response) {
                    return response.status === 200 ? response.clone(): fetch(`/client/chunk_${middle_name}.min.js`).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(`/client/chunk_${middle_name}.min.js`, response.clone());} return Promise.resolve(response.clone());
                    });
                }).catch(function(){
                    return fetch(`/client/chunk_${middle_name}.min.js`).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(`/client/chunk_${middle_name}.min.js`, response.clone());} return Promise.resolve(response.clone());
                    });
                });
            })
        );

    }else if(event.request.mode === "navigate") {

        event.respondWith(

            required_cache.then(function (cache) {
                return cache.match(`/`).then(function (response) {
                    return response.status === 200 ? response.clone(): fetch(`/`).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(`/`, response.clone());} return Promise.resolve(response.clone());
                    });
                }).catch(function(){
                    return fetch(`/`).then(function (response) { // Fetch, clone, and serve
                        if(response.status === 200) { cache.put(`/`, response.clone());} return Promise.resolve(response.clone());
                    });
                });
            })
        );

    } else if(event.request.method === "GET") {

        event.respondWith(
            Promise.race([
                required_cache.then(function (cache) {
                    return cache.match(url).then(function (response) {
                        if(response) { return response.clone(); }
                    });
                }),
                useful_cache.then(function (cache) {
                    return cache.match(url).then(function (response) {
                        if(response) { return response.clone(); }
                    });
                }),
                static_cache.then(function (cache) {
                    return cache.match(url).then(function (response) {
                        if(response) { return response.clone(); }
                    });
                }),
                fetch(url).then(function (response) { // Fetch and serve
                    return useful_cache.then(function (cache) {
                        if(response.status === 200) { cache.put(url, response.clone());} return Promise.resolve(response.clone());
                    });
                })
            ])
        );
    }else {

        return Promise.resolve(new Response(new ArrayBuffer(0), {status: 404, statusText: "Not found"}));
    }
});

self.addEventListener("activate", function(event) {

    event.waitUntil(
        caches.keys().then(function(keys) { return Promise.allSettled(
            keys.filter(function(key){
                return Boolean(key !== REQUIRED_CACHE && key !== STATIC_CACHE && key !== USEFUL_CACHE && key.toString().startsWith("unless-update-cache"));
            }).map(function(key){
                return caches.delete(key);
            })
        )})
    );
});