import workerpool from "workerpool";

let requestIdleCallback, cancelIdleCallback;
if ('requestIdleCallback' in window) {

    requestIdleCallback = window.requestIdleCallback;
    cancelIdleCallback = window.cancelIdleCallback;
} else {

    requestIdleCallback = function(cb, settings) {
        var start = Date.now() | 0;
        return setTimeout(function() {
            cb({
                didTimeout: false,
                timeRemaining: function() {
                    return Math.max(0, ((settings.timeout || 50) - (Date.now() - start)) | 0);
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

            colorUint32 = colorUint32 | 0;
            index = index | 0;

            if (!indexed_by_color_changes.has(colorUint32)) {

                const set = new Set();
                set.add(index);
                indexed_by_color_changes.set(colorUint32, set);
            } else {

                indexed_by_color_changes.get(colorUint32).add(index);
            }

        }); indexed_colors.clear();

        const indexed_by_color_paths = new Map();
        let s = "00000000";
        for (let [uint32, set] of indexed_by_color_changes) {
            uint32 = uint32 | 0;
            s = uint32.toString(16);
            const path = new Path2D();
            const style = "#".concat(new Array(8-s.length).join("0").concat().slice(-8));
            set.forEach((i) => {
                const x = i % ctx2d.canvas.width | 0, y = (i - x) / ctx2d.canvas.width | 0;
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
            
                width = width | 0;
                height = height | 0;
                
                var image_data = new ImageData(width, height);
                    image_data.data.set(new Uint8ClampedArray(fp.reverse().buffer).reverse());

                return createImageBitmap(image_data);
                 
            }; return bpro;`)();

        const pool = workerpool.pool({minWorkers: 1, maxWorkers: 1});
        const d2d = this.draw_2d;
        const template = {
            init: function(c, pxl_width, pxl_height, max_fps){

                pxl_width = pxl_width | 0;
                pxl_height = pxl_height | 0;
                max_fps = max_fps | 0;

                function cs(c, pxl_width, pxl_height) {

                    pxl_width = pxl_width | 0;
                    pxl_height = pxl_height | 0;
                    if(!Boolean(c)) { c = document.createElement("canvas"); }
                    c.width = pxl_width | 0;
                    c.height = pxl_height | 0;

                    let is_bitmap = Boolean('createImageBitmap' in window);
                    let is_offscreen =  Boolean('OffscreenCanvas' in window);
                    let cc2d;
                    let occ2d;
                    if (is_offscreen) {

                        if(!is_bitmap) {
                            occ2d = new OffscreenCanvas(pxl_width, pxl_height).getContext("2d");
                            occ2d.imageSmoothingEnabled = false;
                        }
                    }

                    cc2d = c.getContext('2d' );
                    cc2d.imageSmoothingEnabled = false;
                    cc2d.globalCompositeOperation = "copy";

                    return {
                        is_bitmap: is_bitmap,
                        is_offscreen: is_offscreen,
                        width: pxl_width | 0,
                        height: pxl_height | 0,
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
                        rt: Date.now() | 0,
                        rs: 0,
                        tbrt: (1000 / max_fps) | 0,
                        pt: (1000 / max_fps) | 0,
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
        let old_bmp;
        let bmp = state.bmp;
        let bmp_x = 0;
        let bmp_y = 0;
        let fp = state.fp;
        let ic = state.ic;
        let v = state.v;
        let pr = {
            top_left: {x:0, y:0},
            bottom_right: {x:0, y:0},
            width: 0,
            height: 0,
            fp_square: new Uint32Array(0)
        };

        return {
            // Methods
            clear() {
                s.offscreen_canvas_context.clearRect(0, 0, s.width, s.height);
            },
            render() {
                if(v.enable_paint) {
                    v.enable_paint = false;
                    v.enable_unpile = true;
                    if (s.is_bitmap) {
                        s.canvas_context.globalCompositeOperation = "copy";
                        s.canvas_context.drawImage(bmp, bmp_x, bmp_y, bmp.width, bmp.height);
                        pr.top_left.x = s.width | 0;
                        pr.top_left.y = s.height | 0;
                        pr.bottom_right.x = 0;
                        pr.bottom_right.y = 0;
                        if(typeof old_bmp !== "undefined"){old_bmp.close();}
                        old_bmp = bmp;

                    } else if (s.is_offscreen) {
                        s.canvas_context.globalCompositeOperation = "copy";
                        s.canvas_context.drawImage(s.offscreen_canvas_context, 0, 0, s.width, s.height);
                    } else if (!s.is_bitmap) {

                        s.canvas_context.globalCompositeOperation = "copy";
                        [s.canvas_context, ic] = d2d(s.canvas_context, ic);
                    }
                    const paint_ended = Date.now();
                    v.tbrt = paint_ended - v.rt;
                    v.rt = paint_ended;
                    v.rs--;
                }
            },
            prender(render_callback = function (){}, render_args = new Array(0)){

                if (v.enable_prender) {
                    v.enable_prender = false;

                    const started = Date.now();
                    if (s.is_bitmap) {

                        let new_bmp_x = pr.top_left.x | 0;
                        let new_bmp_y = pr.top_left.y | 0;
                        let new_bmp_width = pr.width | 0;
                        let new_bmp_height = pr.height | 0;
                        let new_bmp_fp = new Uint32Array(pr.fp_square.buffer);

                        pool.exec(bpro, [new_bmp_width, new_bmp_height, new_bmp_fp]).catch(function () {

                            return b(new_bmp_width, new_bmp_height, new_bmp_fp);
                        }).then(function(bitmap){

                            v.enable_paint = true;
                            v.pt = Date.now() - started;
                            bmp = bitmap;
                            bmp_x = new_bmp_x | 0;
                            bmp_y = new_bmp_y | 0;
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
            unpile(prender_callback = function (){}, render_callback = function (){}, render_args = new Array(0)){

                if(v.enable_unpile) {
                    if (ic.size > 0) {

                        if (s.is_bitmap) {

                            ic.forEach(function (value, index) {
                                index = index | 0;
                                const x = index % s.width | 0;
                                const y = (index - x) / s.width | 0;

                                if(pr.top_left.x > x) { pr.top_left.x = x| 0 }
                                if(pr.top_left.y > y) { pr.top_left.y = y | 0 }
                                if(pr.bottom_right.x < x) { pr.bottom_right.x = x | 0 }
                                if(pr.bottom_right.y < y) { pr.bottom_right.y = y | 0 }

                                fp[index] = value | 0;
                            }); ic.clear();

                            pr.width = pr.bottom_right.x - pr.top_left.x + 1| 0;
                            pr.height = pr.bottom_right.y - pr.top_left.y  + 1 | 0;

                            pr.fp_square = new Uint32Array(pr.width * pr.height);
                            let square_offset_start_length = pr.top_left.x | 0;
                            let current_offset_start_index = 0;
                            for(let i = 0; i < pr.height ; i = i + 1 | 0) {

                                current_offset_start_index = s.width * (i + pr.top_left.y) + square_offset_start_length | 0;
                                pr.fp_square.set(Uint32Array.from(fp.slice(current_offset_start_index, current_offset_start_index + pr.width)), i*pr.width);
                            }

                            v.enable_prender = true;
                            prender_callback(render_callback, render_args);

                        } else if (s.is_offscreen) {

                            [s.offscreen_canvas_context, ic] = d2d(s.offscreen_canvas_context, ic);
                            v.enable_prender = true;
                            prender_callback(render_callback, render_args);
                        }else {

                            v.enable_prender = true;
                            prender_callback(render_callback, render_args);
                        }
                    }else {

                        v.enable_prender = true;
                        prender_callback(render_callback, render_args);
                    }
                }else {

                    v.enable_prender = true;
                    prender_callback(render_callback, render_args);
                }
            },
            pile(indexed_changes, unpile_callback = function(){}, prender_callback = function (){}, render_callback = function (){}, render_args = new Array(0)) {

                indexed_changes.forEach(function(value, index){

                    value = value | 0;
                    index = index | 0;
                    ic.set(index, value);
                });
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

module.exports = SuperCanvas;