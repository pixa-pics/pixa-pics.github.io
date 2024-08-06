
var either_ends_with = function (possibilities, onto){
    var result = false;
    possibilities.forEach(function (possibility){
        if(onto.endsWith(possibility)){result = true;}
    });
    return result;
};
var either_starts_with = function (possibilities, onto){
    var result = false;
    possibilities.forEach(function (possibility){
        if(onto.startsWith(possibility)){result = true;}
    });
    return result;
};

// Helper functions
var F_IMG = function (n) { return `/src/images/${n}`; };
var F_CNK = function (n, i) { return `/client/chunk_${typeof n == "undefined" ? (i | 0) : (n | 0)}.min.js`; };
var F_SND = function (n) { return `/src/sounds/${n}.mp3`; };
var F_VID = function (n) { return `/src/videos/${n}.mp4`; };

var INSTALL_FILES_REQUIRED = ["/", "/client/chunk_norris.min.js", "/client/chunk_main_7a2a85ee.min.js", "/client/chunk_main_7a2ee6b6.min.js", "/client/chunk_main_8afe242f.min.js","/client/chunk_main_253ae210.min.js","/client/chunk_main_678f84af.min.js","/client/chunk_main_690b702c.min.js","/client/chunk_main_748942c6.min.js","/client/chunk_main_783709f3.min.js","/client/chunk_main_af9f4ef7.min.js","/client/chunk_main_d939e436.min.js"];
var INSTALL_FILES_USEFUL = ["/src/images/favicon.ico", "/src/images/manifest/logo-white.png", "/src/fonts/industry/index.css"];
var LOAD_FILES_REQUIRED = [].concat(new Array(46).map(F_CNK));
var LOAD_FILES_USEFUL = ["/src/fonts/normative/index.css"].concat(["illusion.jpg", "gallery/Ban.png", "gallery/Ban.svg", "gallery/sco.png", "gallery/Sco.svg", "gallery/Bud.png", "gallery/Bud.svg", "demo/Beast.jpg", "demo/Disney.jpg", "demo/Man.jpg", "demo/Masterc.jpg", "demo/Redstar.jpg",  "demo/Tower.jpg", "infographics/Rambo.svg", "infographics/TestBag.svg", "infographics/Explosion.svg", "labostration/ABDUCTION.svg", "labostration/CHEMISTRY.svg", "labostration/COMPUTING.svg", "labostration/DOWNLOAD.svg", "labostration/GENOMA.svg", "labostration/MOLECULE.svg", "labostration/NUCLEAR.svg", "labostration/SCIENCE.svg", "REMINDER.svg", "Error.svg", "laboratory.svg", "illustrations/Camo.svg", "league/Bronze.png", "league/Diamond.png", "league/Gold.png", "league/Silver.png"].map(F_IMG));
var LOAD_FILES_STATIC = ["sfx/md/hero_decorative-celebration-02", "sfx/md/navigation_selection-complete-celebration", "sfx/md/navigation_transition-left", "sfx/md/state-change_confirm-down", "sfx/md/ui_lock", "sfx/md/ui_unlock", "sfx/md/ui_scan", "sfx/md/alert_high-intensity", "sfx/md/navigation_transition-right", "voice/cn/accessing_memory", "voice/cn/complete", "voice/cn/please_wait", "voice/cn/data_upload", "voice/cn/processing", "voice/cn/enhanced", "voice/cn/rewriting_deep_layer_protocols", "voice/cn/vision_activated", "voice/cn/vision_deactivated", "voice/cn/filtering", "music/redeclipse/track_09"].map(F_SND).concat(["presentation", "tutorial", "create", "enhanced", "pixelated", "upload", "share1", "joke1", "create", "enhanced", "pixelated", "presentation", "presentation2", "sponsors", "tutorial", "upload", "labintro", "share2", "share3", "share4", "share5", "share6", "share7", "joke2", "joke3", "joke4", "joke5", "joke6", "joke7", "joke8", "joke9", "joke10", "joke11"].map(F_VID));

// Cache names
var REQUIRED_CACHE = "unless-update-cache-v1080-required";
var USEFUL_CACHE = "unless-update-cache-v1080-useful";
var STATIC_CACHE = "unless-update-cache-v1080-static";
var OTHER_CACHE = "unless-update-cache-v1080-other";

// Regular expressions for chunk matching
var MAIN_CHILD_CHUNK_REGEX = /chunk_(main_[a-z0-9]+)\.min\.js$/i;
var CHILD_CHUNK_REGEX = /chunk_([0-9]+)\.min\.js$/i;

// Cache objects and their initialization
function initializeCache(cacheName, cacheObject) {
    return caches.open(cacheName).then(function(cache) {
        cacheObject = cache;
        return cacheObject;
    });
}

var required_cache_object, useful_cache_object, static_cache_object, other_cache_object;
var required_cache = initializeCache(REQUIRED_CACHE, required_cache_object);
var useful_cache = initializeCache(USEFUL_CACHE, useful_cache_object);
var static_cache = initializeCache(STATIC_CACHE, static_cache_object);
var other_cache = initializeCache(OTHER_CACHE, other_cache_object);

// Function to serve cache
function serve_cache(cache, url) {
    return cache.then(function (cache) {
        return cache.match(url).then(function (response) {
            if(url === "/" && response.status === 404) {
                var cr = response.clone();
                return cr.text().then(function (body){
                    return new Response(body, {
                        status: 200,
                        statusText: 'OK',
                        headers: cr.headers
                    });
                });
            }else if (response && response.status === 200) {
                return response.clone() || response;
            } else {
                return fetchAndCache(url, cache);
            }
        });
    }).catch(function () {
        return fetch(url);
    });
}

// Fetch and cache utility
function fetchAndCache(url, cache) {
    return fetch(url).then(function (response) {
        if(url === "/"){
            try {
                cache.put(url, response.clone());
            } catch (e){}
            return response.clone() || response;
        }else if (response.status === 200) {
            try {
                cache.put(url, response.clone());
            } catch (e){}
            return response.clone() || response;
        } else {
            return response.clone() || response;
        }
    });
}

// Install event
self.addEventListener("install", function(event) {
    event.waitUntil(
        Promise.allSettled([
            required_cache.then(function(cache) {
                return cache.addAll(INSTALL_FILES_REQUIRED);
            }),
            useful_cache.then(function(cache) {
                return cache.addAll(INSTALL_FILES_USEFUL);
            })
        ])
    );
});

// Fetch event
self.addEventListener("fetch", function(event) {
    "use strict";
    const request = event.request;
    const url = request.url;
    const same_site = event.request.referrer.startsWith(url.hostname);

    if (event.request.headers.get('range') && url.indexOf('http') === 0) {

        event.respondWith(fetch(request));

    }else if(either_starts_with(["data:image", "blob:http", "data:application"], url)) {

        event.respondWith(fetch(request));

    }else if(either_starts_with(["data:,all"], url)) {

        event.respondWith(
            Promise.all([
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

    }else if(same_site && either_ends_with([".wasm", ".png", ".json", ".svg", ".jpg", ".jpeg", ".gif", ".ico", ".onnx"], url)) {

        // Serve cached image if doesn't fail
        event.respondWith(serve_cache(useful_cache, url));

    }else if(same_site && either_ends_with([".wav", ".mp3", ".mp4"], url)) {

        event.respondWith(serve_cache(static_cache, url));

    }else if(same_site && either_ends_with([".woff2", ".ttf", ".css", ".json"], url)) {

        event.respondWith(serve_cache(useful_cache, url));

    }else if(same_site && url.endsWith("chunk_norris.min.js")) {

        event.respondWith(serve_cache(required_cache, "/client/chunk_norris.min.js"));

    }else if(same_site && (url.match(MAIN_CHILD_CHUNK_REGEX) || []).length >= 1) {

        const middle_name = url.match(MAIN_CHILD_CHUNK_REGEX)[1];
        event.respondWith(serve_cache(required_cache, `/client/chunk_${middle_name}.min.js`));

    }else if(same_site && (url.match(CHILD_CHUNK_REGEX) || []).length >= 1) {

        const middle_name = url.match(CHILD_CHUNK_REGEX)[1];
        event.respondWith(serve_cache(required_cache, `/client/chunk_${middle_name}.min.js`));

    }else if(event.request.mode === "navigate") {

        event.respondWith(serve_cache(required_cache, "/"));

    } else if(event.request.method === "GET") {

        event.respondWith(
            Promise.any([
                required_cache.then(function (cache) {
                    return cache.match(url).then(function (response) {
                        return !response ? Promise.reject('Required cache missing') : response.status === 200 ? Promise.resolve(response.clone() || response) : Promise.reject('Required cache error');
                    });
                }),
                useful_cache.then(function (cache) {
                    return cache.match(url).then(function (response) {
                        return !response ? Promise.reject('Useful cache missing') : response.status === 200 ? Promise.resolve(response.clone() || response) : Promise.reject('Useful cache error');
                    });
                }),
                static_cache.then(function (cache) {
                    return cache.match(url).then(function (response) {
                        return !response ? Promise.reject('Static cache missing') : response.status === 200 ? Promise.resolve(response.clone() || response) : Promise.reject('Static cache error');
                    });
                }),
                // Repeat for other caches
                fetch(request)
            ])
        );
    } else if(url.startsWith('https') || url.contains('extension')){

        return;
    }else {
        return;
    }
});

// Activate event
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(key) {
                    return ![REQUIRED_CACHE, STATIC_CACHE, USEFUL_CACHE, OTHER_CACHE].includes(key);
                }).map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});