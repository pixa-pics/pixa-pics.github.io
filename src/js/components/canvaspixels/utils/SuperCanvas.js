let requestIdleCallback, cancelIdleCallback;
if ('requestIdleCallback' in window) {

    requestIdleCallback = window.requestIdleCallback;
    cancelIdleCallback = window.cancelIdleCallback;
} else {

    requestIdleCallback = function(cb, settings) {
        var start = Date.now();
        return setTimeout(function() {
            cb({
                didTimeout: false,
                timeRemaining: function() {
                    return Math.max(0, parseInt(settings.timeout || 50) - parseInt(Date.now() - start));
                },
            });
        }, 1);
    };
    cancelIdleCallback = function(id) {
        clearTimeout(id);
    };
}

const SuperCanvas = {

    _create_state: function(c, pxl_width, pxl_height) {

        if(!Boolean(c)) { c = document.createElement("canvas"); }
        c.width = pxl_width;
        c.height = pxl_height;
        let cc2d = c.getContext('2d', {willReadFrequently: true, desynchronized: true});
        cc2d.imageSmoothingEnabled = false;
        cc2d.globalCompositeOperation = "copy";

        let occ2d;
        try {
            occ2d = new OffscreenCanvas(pxl_width, pxl_height).getContext("2d", {willReadFrequently: true, desynchronized: true});
        } catch (e) {
            let occ = document.createElement("canvas");
            occ.width = pxl_width;
            occ.height = pxl_height;
            occ2d = occ.getContext("2d", {willReadFrequently: true, desynchronized: true});
        }
        occ2d.imageSmoothingEnabled = false;

        return {
            width: parseInt(pxl_width),
            height: parseInt(pxl_height),
            canvas_context2d: cc2d,
            offscreen_canvas_context2d: occ2d
        };
    },
    _uncrowd: function(width, ics, ic, s, pt, refresh, resolve, reject, callback, timeout ) {

        const now = Date.now();

        if(ics.length > 0 && ic.size === 0) {

            ic = new Map(Object.entries(ics.reduce(function (acc, val) {
                return Object.assign(acc, Object.fromEntries(val.entries()));
            }, {}))); ics = new Array();
        }

        if (ic.size > 0) {

            const indexed_by_color_changes = new Map();
            for (const [index, colorUint32] of ic) {

                if (!indexed_by_color_changes.has(colorUint32)) {

                    const set = new Set();
                    set.add(index);
                    indexed_by_color_changes.set(colorUint32, set);
                } else {

                    indexed_by_color_changes.get(colorUint32).add(index);
                }
            }

            const indexed_by_color_paths = new Map();
            for (const [uint32, set] of indexed_by_color_changes) {

                const path = new Path2D();
                const style = "#".concat("00000000".concat(uint32.toString(16)).slice(-8));
                set.forEach((i) => {
                    const x = i % width, y = (i - x) / width;
                    path.rect(x, y, 1, 1);
                });
                set.clear();
                indexed_by_color_paths.set(style, path);
            }

            // Clear parts of canvas before
            const summed_path = new Path2D();
            indexed_by_color_paths.values(function (p) {
                summed_path.addPath(p);
            });

            s.offscreen_canvas_context2d.globalCompositeOperation = "destination-out";
            s.offscreen_canvas_context2d.fillStyle = "#ffffffff";
            s.offscreen_canvas_context2d.fill(summed_path);

            // Draw paths b color
            s.offscreen_canvas_context2d.globalCompositeOperation = "source-over";
            for (const [style, path] of indexed_by_color_paths) {

                s.offscreen_canvas_context2d.fillStyle = style;
                s.offscreen_canvas_context2d.fill(path);
            }


            pt = Date.now() - now;
            refresh = true;
            ic.clear();

            resolve(callback, timeout-pt);

        }else {

            reject(callback, 1);
        }

        return {ics, ic, s, pt, refresh};
    },

    from: function(c, pxl_width, pxl_height, max_fps = 60){

        let uc = this._uncrowd;
        let cs = this._create_state;
        let s = cs(c, pxl_width, pxl_height);
        let ics = new Array(); // Maps within an set for changes indexed by color in Uint32
        let ic = new Map();
        let rt = Date.now();
        let rs = 0;
        let tbf = parseInt(1000 / max_fps);
        let pt = tbf;
        let refresh = false;
        let idle_id = 0;

        return {
            // Methods
            clear() {
                s.offscreen_canvas_context2d.clearRect(0, 0, s.width, s.height);
            },
            render() {

                function prender(callback, timeout) {

                    function prender_resolve(callback, timeout){

                        setTimeout(callback, Math.max(1, timeout));
                    }

                    function prender_reject(callback){

                        setTimeout(callback, 1);
                    }

                    const r = uc(s.width, ics, ic, s, pt, refresh, prender_resolve, prender_reject, callback, timeout);
                    ics = r.ics;
                    ic = r.ic;
                    s = r.s;
                    pt = r.pt;
                    refresh = r.refresh;
                }

                function draw(){

                    if(refresh) {
                        const now = Date.now();
                        s.canvas_context2d.drawImage(s.offscreen_canvas_context2d.canvas, 0, 0);
                        tbf = now - rt;
                        rt = Date.now();
                        refresh = false;
                    }
                }

                rs++;
                const now = Date.now();

                if(rs <= 1) {

                    if(rt + tbf < now) {

                        rs--;

                        cancelIdleCallback(idle_id); idle_id = 0;
                        prender(draw, 1);
                        return true;

                    }else {

                        rs--;

                        prender(draw, Math.max(1, now - rt - tbf - pt));
                        return true;
                    }
                }else{

                    rs--;
                    return false;
                }
            },
            uncrowd(force = false){

                function prender(deadline) {

                    if(typeof deadline === "undefined") {

                        deadline = {will_execute: 1, timeRemaining: function(){return 0;}};
                    }else if(typeof deadline.timeRemaining !== "function") {

                        deadline = {will_execute: 1, timeRemaining: function(){return 0;}};
                    }

                    function prender_resolve(callback, timeout){

                        setTimeout(callback, Math.max(1, timeout));
                    }

                    function prender_reject(callback){

                        setTimeout(callback, 1);
                    }

                    while (Boolean(deadline.will_execute) || deadline.timeRemaining() > 0) {
                        const r = uc(s.width, ics, ic, s, pt, refresh, prender_resolve, prender_reject, function(){}, 1);
                        ics = r.ics;
                        ic = r.ic;
                        s = r.s;
                        pt = r.pt;
                        refresh = r.refresh;
                        deadline.will_execute = Math.max(0, deadline.will_execute-1);
                    }

                    cancelIdleCallback(idle_id); idle_id = 0;
                }

                if(force === false && idle_id === 0) {

                    idle_id = requestIdleCallback(prender, {timeout: 250});
                }else if(force === true) {

                    cancelIdleCallback(idle_id); idle_id = 0;
                    prender();
                }
            },
            putcrowd(indexed_changes_map) {

                ics.push(indexed_changes_map);
            },

            set_dimensions(w, h) {

                if(s !== null) {

                    s = cs(s.canvas_context2d.canvas, w, h);
                }
            },
            new(c, pxl_width, pxl_height) {

                s = cs(c, pxl_width, pxl_height);
            },
            destroy(callback_function) {

                s = null;
                callback_function("ok");
            },
        };
    }
};

module.exports = SuperCanvas;