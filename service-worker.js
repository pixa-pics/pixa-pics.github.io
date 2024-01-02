"use strict";
var REQUIRED_CACHE = "unless-update-cache-v906-required";
var USEFUL_CACHE = "unless-update-cache-v906-useful";
var STATIC_CACHE = "unless-update-cache-v906-static";
var MAIN_CHILD_CHUNK_REGEX = /chunk_(main_[a-z0-9]+)\.min\.js$/i;
var CHILD_CHUNK_REGEX = /chunk_([0-9]+)\.min\.js$/i;

var required_cache_object = {};
var required_cache = new Promise(function(resolve, reject){
    "use strict";
    if(typeof required_cache_object.addAll !== "undefined") {

        resolve(required_cache_object);
    }else {

        caches.open(REQUIRED_CACHE).then(function(cache){required_cache_object = cache;resolve(required_cache_object);}).catch(function(reason){reject(reason)});
    }
});

var useful_cache_object = {};
var useful_cache = new Promise(function(resolve, reject){
    "use strict";
    if(typeof useful_cache_object.addAll !== "undefined") {

        resolve(useful_cache_object);
    }else {

        caches.open(USEFUL_CACHE).then(function(cache){useful_cache_object = cache;resolve(useful_cache_object);}).catch(function(reason){reject(reason)});
    }
});

var static_cache_object = {};
var static_cache = new Promise(function(resolve, reject){
    "use strict";
    if(typeof static_cache_object.addAll !== "undefined") {

        resolve(static_cache_object);
    }else {

        caches.open(STATIC_CACHE).then(function(cache){static_cache_object = cache;resolve(static_cache_object);}).catch(function(reason){reject(reason)});
    }
});

var serve_cache = function (cache_origin, url){
    "use strict";
    return cache_origin.then(function (cache) {
        "use strict";
        return cache.match(url).then(function (response) {
            "use strict";
            return !response ? Promise.reject(): response.status === 200 ? response.clone(): fetch(url).then(function (response) { // Fetch, clone, and serve
                "use strict";
                if(response.status === 200) { cache.put(url, response.clone()); return Promise.resolve(response.clone()); } else { return Promise.reject(); }
            });
        }).catch(function(){
            "use strict";
            return fetch(url).then(function (response) { // Fetch, clone, and serve
                "use strict";
                if(response.status === 200) { cache.put(url, response.clone()); return Promise.resolve(response.clone()); } else { return Promise.reject(); }
            });
        });
    })
};

var either_ends_with = function (possibilities, onto){
    "use strict";
    var result = false;
    possibilities.forEach(function (possibility){
        "use strict";
        if(onto.endsWith(possibility)){result = true;}
    });
    return result;
};
var either_starts_with = function (possibilities, onto){
    "use strict";
    var result = false;
    possibilities.forEach(function (possibility){
        "use strict";
        if(onto.startsWith(possibility)){result = true;}
    });
    return result;
};

var F_IMG = function (n){return `/src/images/${n}`;};
var F_CNK = function (n,i){return `/client/chunk_${typeof n == "undefined" ? (i|0): (n|0)}.min.js`;};
var F_SND = function (n){return `/src/sounds/${n}.mp3`;};
var F_VID = function (n){return `/src/videos/${n}.mp4`;};

var INSTALL_FILES_REQUIRED = ["/client/chunk_main_5a2dc592.min.js","/client/chunk_main_7a2ee6b6.min.js","/client/chunk_main_8afe242f.min.js","/client/chunk_main_253ae210.min.js","/client/chunk_main_678f84af.min.js","/client/chunk_main_690b702c.min.js","/client/chunk_main_748942c6.min.js","/client/chunk_main_af9f4ef7.min.js","/client/chunk_main_d939e436.min.js","/client/chunk_main_df0f15aa.min.js", "/client/chunk_norris.min.js", "/"];
var INSTALL_FILES_USEFUL = ["/src/images/favicon.ico", "/src/images/manifest/logo-white.png", "/src/fonts/industry/index.css"];
var LOAD_FILES_REQUIRED = ["/"].concat(new Array(45).map(F_CNK));
var LOAD_FILES_USEFUL = ["/src/fonts/normative/index.css"].concat(["illusion.jpg", "adaragon.png", "gallery/Ban.png", "gallery/Ban.svg", "gallery/sco.png", "gallery/Sco.svg", "gallery/Bud.png", "gallery/Bud.svg", "demo/Beast.jpg", "demo/Disney.jpg", "demo/Man.jpg", "demo/Masterc.jpg", "demo/Redstar.jpg",  "demo/Tower.jpg", "infographics/Rambo.svg", "infographics/TestBag.svg", "infographics/Explosion.svg", "labostration/ABDUCTION.svg", "labostration/CHEMISTRY.svg", "labostration/COMPUTING.svg", "labostration/DOWNLOAD.svg", "labostration/GENOMA.svg", "labostration/MOLECULE.svg", "labostration/NUCLEAR.svg", "labostration/SCIENCE.svg", "REMINDER.svg", "Error.svg", "laboratory.svg", "illustrations/Camo.svg", "league/Bronze.png", "league/Diamond.png", "league/Gold.png", "league/Silver.png"].map(F_IMG));
var LOAD_FILES_STATIC = ["sfx/md/hero_decorative-celebration-02", "sfx/md/navigation_selection-complete-celebration", "sfx/md/navigation_transition-left", "sfx/md/state-change_confirm-down", "sfx/md/ui_lock", "sfx/md/ui_unlock", "sfx/md/ui_scan", "sfx/md/alert_high-intensity", "sfx/md/navigation_transition-right", "voice/cn/accessing_memory", "voice/cn/complete", "voice/cn/please_wait", "voice/cn/data_upload", "voice/cn/processing", "voice/cn/enhanced", "voice/cn/rewriting_deep_layer_protocols", "voice/cn/vision_activated", "voice/cn/vision_deactivated", "voice/cn/filtering", "music/redeclipse/track_09"].map(F_SND).concat(["presentation", "tutorial", "create", "enhanced", "pixelated", "upload", "share1", "joke1", "create", "enhanced", "pixelated", "presentation", "presentation2", "sponsors", "tutorial", "upload", "labintro", "share2", "share3", "share4", "share5", "share6", "share7", "joke2", "joke3", "joke4", "joke5", "joke6", "joke7", "joke8", "joke9", "joke10", "joke11"].map(F_VID));

// On install, cache some resource.
self.addEventListener("install", function(event) {
    "use strict";
    if (!navigator.onLine) {
        return true;
    }
    event.waitUntil(
        Promise.race([
            required_cache.then(function (cache) {
                cache.addAll(INSTALL_FILES_REQUIRED)
            }),
            useful_cache.then(function (cache) {
                return cache.addAll(INSTALL_FILES_USEFUL);
            })
        ])
    );
});

self.addEventListener("fetch", function(event) {
    "use strict";
    const url = event.request.url;
    const same_site = true //event.request.referrer.startsWith(U.hostname);

    if (event.request.headers.get('range')) {

        event.respondWith(fetch(event.request));

    }else if(either_starts_with(["data:image", "blob:http", "data:application"], url)) {

        event.respondWith(fetch(url));

    }else if(either_starts_with(["data:,all"], url)) {

        event.respondWith(
            Promise.allSettled([
                useful_cache.then(function (cache) {
                    return cache.addAll(LOAD_FILES_USEFUL);
                }),
                required_cache.then(function (cache) {
                    return cache.addAll(LOAD_FILES_REQUIRED);
                }),
                static_cache.then(function (cache) {
                    return cache.addAll(LOAD_FILES_STATIC);
                })
            ])
                .then(function(){return new Response("all",{status: 200})})
                .catch(function(){return new Response("all", {status: 500})})
        );

    }else if(same_site && either_ends_with([".wasm", ".png", ".json", ".svg", ".jpg", ".jpeg", ".gif", ".ico"], url)) {

        // Serve cached image if doesn't fail
        event.respondWith(serve_cache(useful_cache, url));

    }else if(same_site && either_ends_with([".wav", ".mp3", ".mp4"], url)) {

        event.respondWith(serve_cache(static_cache, url));

    }else if(same_site && either_ends_with([".woff2", ".ttf", ".css", ".json"], url)) {

        event.respondWith(serve_cache(useful_cache, url));

    }else if(same_site && url.endsWith("chunk_norris.min.js")) {

        event.respondWith(serve_cache(required_cache, "/client/chunk_norris.min.js"));

    }else if(same_site && (url.match(MAIN_CHILD_CHUNK_REGEX) || []).length >= 2) {

        const middle_name = url.match(MAIN_CHILD_CHUNK_REGEX)[1];
        event.respondWith(serve_cache(required_cache, `/client/chunk_${middle_name}.min.js`));

    }else if(same_site && (url.match(CHILD_CHUNK_REGEX) || []).length >= 2) {

        const middle_name = url.match(CHILD_CHUNK_REGEX)[1];
        event.respondWith(serve_cache(required_cache, `/client/chunk_${middle_name}.min.js`));

    }else if(event.request.mode === "navigate") {

        event.respondWith(serve_cache(required_cache, "/"));

    } else if(event.request.method === "GET") {

        event.respondWith(
            Promise.any([
                required_cache.then(function (cache) {
                    return cache.match(url).then(function (response) {
                        return !response ? Promise.reject(): response.status === 200 ? Promise.resolve(response.clone()): Promise.reject();
                    });
                }),
                useful_cache.then(function (cache) {
                    return cache.match(url).then(function (response) {
                        return !response ? Promise.reject(): response.status === 200 ? Promise.resolve(response.clone()): Promise.reject();
                    });
                }),
                static_cache.then(function (cache) {
                    return cache.match(url).then(function (response) {
                        return !response ? Promise.reject(): response.status === 200 ? Promise.resolve(response.clone()): Promise.reject();
                    });
                }),
                fetch(url).then(function (response) { // Fetch and serve
                    return useful_cache.then(function (cache) {
                        if(response.status === 200) { cache.put(url, response.clone()); return Promise.resolve(response.clone()); } else { return Promise.reject(); }
                    });
                })
            ])
        );
    }else {

        return Promise.resolve(new Response(new ArrayBuffer(0), {status: 404, statusText: "Not found"}));
    }
});

self.addEventListener("activate", function(event) {
    "use strict";
    event.waitUntil(
        caches.keys().then(function(keys) { return Promise.allSettled(
            keys.filter(function(key){
                return Boolean(key !== REQUIRED_CACHE && key !== STATIC_CACHE && key !== USEFUL_CACHE);
            }).map(function(key){
                return caches.delete(key);
            })
        )})
    );
});