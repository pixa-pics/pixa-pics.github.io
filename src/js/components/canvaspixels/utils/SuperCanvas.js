import workerpool from "workerpool";

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
    draw_2d: function (ctx2d, indexed_colors) {

        const indexed_by_color_changes = new Map();
        indexed_colors.forEach(function(colorUint32, index) {

            if (!indexed_by_color_changes.has(colorUint32)) {

                const set = new Set();
                set.add(index);
                indexed_by_color_changes.set(colorUint32, set);
            } else {

                indexed_by_color_changes.get(colorUint32).add(index);
            }

        }); indexed_colors.clear();

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
        } indexed_by_color_changes.clear();

        // Draw paths b color
        const sum_path = new Path2D();
        for (const [style, path] of indexed_by_color_paths) {

            if(!style.endsWith("ff")) { sum_path.addPath(path);}
        }

        // Draw paths b color
        ctx2d.globalCompositeOperation = "destination-out";
        ctx2d.fillStyle = "#ffffffff";
        ctx2d.fill(sum_path);
        for (const [style, path] of indexed_by_color_paths) {
            ctx2d.globalCompositeOperation = "source-over";
            ctx2d.fillStyle = style;
            ctx2d.fill(path);
        } indexed_by_color_paths.clear();

        return [ctx2d, indexed_colors];
    },
    from: function(c, pxl_width, pxl_height, max_fps = 30){

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const bpro = AsyncFunction(
            `var bpro = async function(width, height, fp){
            
                var image_data = new ImageData(width, height);
                    image_data.data.set(new Uint8ClampedArray(new Uint32Array(fp.buffer).reverse().buffer).reverse());

                return createImageBitmap(image_data);
                 
            }; return bpro;`)();

        const pool = workerpool.pool({minWorkers: 1, maxWorkers: 1});
        const d2d = this.draw_2d;
        const template = {
            init: function(c, pxl_width, pxl_height, max_fps){

                function cs(c, pxl_width, pxl_height) {

                    if(!Boolean(c)) { c = document.createElement("canvas"); }
                    c.width = parseInt(pxl_width);
                    c.height = parseInt(pxl_height);

                    let is_bitmap = Boolean('createImageBitmap' in window);
                    let is_offscreen =  Boolean('OffscreenCanvas' in window);
                    let cc2d;
                    let occ2d;
                    if (is_offscreen) {

                        if(!is_bitmap) {
                            occ2d = new OffscreenCanvas(parseInt(pxl_width), parseInt(pxl_height)).getContext("2d");
                            occ2d.imageSmoothingEnabled = false;
                        }
                    }

                    cc2d = c.getContext('2d' );
                    cc2d.imageSmoothingEnabled = false;
                    cc2d.globalCompositeOperation = "copy";

                    return {
                        is_bitmap: Boolean(is_bitmap),
                        is_offscreen: Boolean(is_offscreen),
                        width: parseInt(pxl_width),
                        height: parseInt(pxl_height),
                        canvas_context: cc2d,
                        offscreen_canvas_context: occ2d
                    };
                }

                return {
                    s: cs(c, pxl_width, pxl_height),
                    bmp: null,
                    fp: new Uint32Array(pxl_height * pxl_width),
                    ic: new Map(),
                    v: {
                        rt: Date.now(),
                        rs: 0,
                        tbrt: parseInt(1000 / max_fps),
                        pt: parseInt(1000 / max_fps),
                        enable_prender: true,
                        enable_paint: true,
                        enable_unpile: true,
                        idle_id: 0,
                    },
                };
            }
        };

        let state = Object.create(template).init(c, pxl_width, pxl_height, max_fps);
        let s = state.s;
        let bmp = state.bmp;
        let fp = state.fp;
        let ic = state.ic;
        let v = state.v;

        return {
            // Methods
            clear() {
                s.offscreen_canvas_context.clearRect(0, 0, s.width, s.height);
            },
            render() {
                if(v.enable_paint) {
                    v.enable_paint = false;
                    if (s.is_bitmap) {
                        s.canvas_context.drawImage(bmp, 0, 0, s.width, s.height);
                    } else if (s.is_offscreen) {

                        s.canvas_context.drawImage(s.offscreen_canvas_context, 0, 0, s.width, s.height);
                    } else if (!s.is_bitmap) {

                        [s.canvas_context, ic] = d2d(s.canvas_context, ic);
                    }
                    const paint_ended = Date.now();
                    v.tbrt = paint_ended - v.rt;
                    v.rt = paint_ended;
                    v.rs--;

                    v.enable_unpile = true;
                }
            },
            prender(render_callback = function (){}, render_args = []){

                if (v.enable_prender) {
                    v.enable_prender = false;

                    const started = Date.now();
                    if (s.is_bitmap) {

                        pool.exec(bpro, [s.width, s.height, fp]).catch(function () {

                            return b(s.width, s.height, fp);
                        }).then(function(bitmap){

                            v.enable_paint = true;
                            v.pt = Date.now() - started;
                            bmp = bitmap;
                            render_callback(...render_args);
                        });

                    }else if (s.is_offscreen) {

                        [s.offscreen_canvas_context, ic] = d2d(s.offscreen_canvas_context, ic);
                        v.enable_paint = true;
                        v.pt = Date.now() - started;
                        render_callback(...render_args);

                    }else {

                        v.enable_paint = true;
                        v.pt = Date.now() - started;
                        render_callback(...render_args);
                    }
                }else {


                    render_callback(...render_args);
                }
            },
            unpile(prender_callback = function (){}, render_callback = function (){}, render_args = []){

                if(v.enable_unpile) {
                    if (ic.size > 0) {

                        if (s.is_bitmap) {

                            ic.forEach(function (value, index) {
                                fp[index] = value;
                            }); ic.clear();

                        } else if (s.is_offscreen) {

                            [s.offscreen_canvas_context, ic] = d2d(s.offscreen_canvas_context, ic);
                        }

                        v.enable_prender = true;
                    }
                }
                prender_callback(render_callback, render_args);
            },
            pile(indexed_changes, unpile_callback = function(){}, prender_callback = function (){}, render_callback = function (){}, render_args = []) {

                indexed_changes.forEach(function(value, index){ic.set(index, Number(value))});
                unpile_callback(prender_callback, render_callback, render_args);
            },
            set_dimensions(w, h) {

                state = Object.create(template).init(s.canvas_context.canvas, w, h);
                s = state.s;
                bmp = state.bmp;
                fp = state.fp;
                ic = state.ic;
                v = state.v;
            },
            new(c, w, h) {

                state = Object.create(template).init(c, w, h);
                s = state.s;
                bmp = state.bmp;
                fp = state.fp;
                ic = state.ic;
                v = state.v;
            },
            secure_context() {
                /*s.canvas_context.canvas.addEventListener("contextlost", function(){

                    let cc2d = s.canvas_context.canvas.getContext('2d', {});
                    cc2d.imageSmoothingEnabled = false;
                    cc2d.globalCompositeOperation = "copy";
                    s.canvas_context = cc2d;
                });
                s.offscreen_canvas_context.canvas.addEventListener("contextlost", function(){

                    let occ2d = s.offscreen_canvas_context.canvas.getContext("2d", {});
                    occ2d.imageSmoothingEnabled = false;
                    s.offscreen_canvas_context = occ2d;
                });*/
            },
            destroy() {
                s, bmp, fp, ic, v = null;
            }
        };
    }
};

module.exports = Object.create(SuperCanvas);