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

    from: function(c, pxl_width, pxl_height, max_fps = 60){

        let cs = this._create_state;
        let s = cs(c, pxl_width, pxl_height);
        let ics = new Array(); // Maps within an set for changes indexed by color in Uint32
        let ic = new Map();
        let rt = Date.now();
        let rs = 0;
        let tbf = parseInt(1000 / max_fps);
        let pt = tbf;
        let idle = 0;

        return {
            // Methods
            clear() {
                s.offscreen_canvas_context2d.clearRect(0, 0, s.width, s.height);
            },
            render() {

                function draw(){

                    const now = Date.now();
                    s.canvas_context2d.drawImage(s.offscreen_canvas_context2d.canvas, 0, 0);
                    tbf = now - rt;
                    rt = Date.now();
                }

                function prender(callback, timeout) {

                    const now = Date.now();

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
                                const x = i % s.width, y = (i - x) / s.width;
                                path.rect(x, y, 1, 1);
                            });
                            set.clear();
                            indexed_by_color_paths.set(style, path);
                        } indexed_by_color_changes.clear();

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
                        } indexed_by_color_paths.clear();
                        ic.clear();
                        pt = Date.now() - now;
                        setTimeout(callback, Math.max(0, timeout-pt));
                    }
                }

                rs++;
                const now = Date.now();

                if(rs <= 1) {

                    if(ics.length > 0 && ic.size === 0) {

                        ic = new Map(Object.entries(ics.reduce(function (acc, val) {
                            return Object.assign(acc, Object.fromEntries(val.entries()));
                        }, {}))); ics.length = 0;
                    }

                    if(rt + tbf < now) {

                        rs--;
                        if(ic.size > 0) {prender(draw, 1)}

                    }else {

                        rs--;
                        if(ic.size > 0) {prender(draw, Math.max(1, rt + tbf - now))}
                    }
                }else{

                    rs--;
                }
            },
            push(indexed_changes_map) {

                ics.push(indexed_changes_map);
            },
            uncrowd() {

                function uc() {

                    if(ics.length > 0 && ic.size === 0) {

                        ic = new Map(Object.entries(ics.reduce(function (acc, val) {
                            return Object.assign(acc, Object.fromEntries(val.entries()));
                        }, {}))); ics.length = 0;
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
                                const x = i % s.width, y = (i - x) / s.width;
                                path.rect(x, y, 1, 1);
                            });
                            set.clear();
                            indexed_by_color_paths.set(style, path);
                        } indexed_by_color_changes.clear();

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
                        } indexed_by_color_paths.clear();
                        ic.clear();
                        idle = 0;
                    }
                }

                if(!idle && Date.now() - rt > tbf) {

                    idle = requestIdleCallback(uc);
                }
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