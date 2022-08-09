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
        let ic = new Array(); // Maps within an array for changes indexed by color in Uint32
        let rt = Date.now();
        let rs = 0;
        let tbf = parseInt(1000 / max_fps);
        let pt = tbf;

        return {
            // Methods
            clear() {
                s.offscreen_canvas_context2d.clearRect(0, 0, s.width, s.height);
            },
            render() {

                function draw(){

                    s.canvas_context2d.drawImage(s.offscreen_canvas_context2d.canvas, 0, 0);
                    const now = Date.now();
                    tbf = now - rt - pt;
                    rt = Date.now();
                }

                function prender(callback, timeout) {

                    const now = Date.now();
                    const indexed_changes = new Map();
                    while (ic.length) {

                        const icm = ic.shift();
                        for (const [index, colorUint32] of icm) {

                            indexed_changes.set(index, colorUint32);
                        }
                    }

                    const indexed_by_color_changes = new Map();
                    for (const [index, colorUint32] of indexed_changes) {

                        if(!indexed_by_color_changes.has(colorUint32)) {

                            indexed_by_color_changes.set(colorUint32, Array.of(index));
                        }else {

                            indexed_by_color_changes.get(colorUint32).push(index);
                        }
                    }

                    const indexed_by_color_paths = new Map();
                    for (const [uint32, array] of indexed_by_color_changes) {

                        const path = new Path2D();
                        const style = "#".concat("00000000".concat(uint32.toString(16)).slice(-8));
                        array.forEach((i) => {
                            const x = i % s.width, y = (i - x) / s.width;
                            path.rect(x, y, 1, 1);
                        });

                        indexed_by_color_paths.set(style, path);
                    }

                    // Clear parts of canvas before
                    const summed_path = new Path2D();
                    indexed_by_color_paths.values(function(p){

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
                    setTimeout(callback, Math.max(1, timeout-pt));
                }

                rs++;
                const now = Date.now();

                if(rs <= 1) {

                    if(rt + tbf < now) {

                        rs--;
                        if(ic.length > 0) {prender(draw, 0)}

                    }else {

                        rs--;
                        if(ic.length > 0) {prender(draw, parseInt(rt + tbf - Date.now()))}
                    }
                }else{

                    rs--;
                }
            },
            push(indexed_changes_map) {

                ic.push(indexed_changes_map);
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