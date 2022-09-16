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

        return new Promise(function (resolve){

            let indexed_by_color_changes = new Map();
            indexed_colors.forEach(function(colorUint32, index) {

                colorUint32 = colorUint32 | 0;
                index = index | 0;

                if (!indexed_by_color_changes.has(colorUint32)) {

                    let set = new Set();
                    set.add(index);
                    indexed_by_color_changes.set(colorUint32, set);
                } else {

                    indexed_by_color_changes.get(colorUint32).add(index);
                }

            });

            const indexed_by_color_paths = new Map();
            let path = new Path2D();
            let x = 0;
            let y = 0;
            let width = ctx2d.canvas.width | 0;
            indexed_by_color_changes.forEach(function(set, colorUint32){

                path = new Path2D();
                set.forEach(function(i){
                    x = i % width | 0;
                    y = (i - x) / width | 0;
                    path.rect(x, y, 1, 1);
                });
                indexed_by_color_paths.set("#".concat("00000000".concat((colorUint32 | 0).toString(16)).slice(-8)), path);
            })

            indexed_by_color_paths.forEach(function(path, style){

                ctx2d.globalCompositeOperation = "destination-out";
                ctx2d.fillStyle = "#ffffffff";
                ctx2d.fill(path);

                ctx2d.globalCompositeOperation = "source-over";
                ctx2d.fillStyle = style;
                ctx2d.fill(path);
            });

            resolve();
        });
    },
    from: function(c, pxl_width, pxl_height, max_fps = 30){

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const bpro = AsyncFunction(
            `var bpro = async function(width, height, array){
            
                width = width | 0;
                height = height | 0;
                
                var image_data = new ImageData(width, height);
                    image_data.data.set(new Uint8ClampedArray(array.reverse().buffer).reverse());

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

                        occ2d = new OffscreenCanvas(pxl_width, pxl_height).getContext("2d", {willReadFrenquently: true});
                        occ2d.imageSmoothingEnabled = false;
                    }

                    cc2d = c.getContext('2d', {desynchronized: false} );
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
                    ic2: new Map(),
                    v: {
                        rt: Date.now() | 0,
                        rs: 0,
                        tbrt: (1000 / max_fps) | 0,
                        pt: (1000 / max_fps) | 0,
                        enable_paint_type: "",
                        enable_prender: true,
                        enable_paint: true,
                        enable_unpile: true,
                        skip_bitmap_and_offscreen: false,
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
        let ic2 = state.ic2;
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

                return new Promise(function (resolve){
                    if (v.enable_paint_type === "bitmap") {
                        s.canvas_context.clearRect( bmp_x, bmp_y, bmp.width, bmp.height);
                        s.canvas_context.globalCompositeOperation = "source-over";
                        s.canvas_context.drawImage(bmp, bmp_x, bmp_y, bmp.width, bmp.height);
                        if(typeof old_bmp !== "undefined"){old_bmp.close();}
                        old_bmp = bmp;

                        pr.top_left.x = s.width | 0;
                        pr.top_left.y = s.height | 0;
                        pr.bottom_right.x = 0;
                        pr.bottom_right.y = 0;

                        const paint_ended = Date.now();
                        v.tbrt = paint_ended - v.rt;
                        v.rt = paint_ended;
                        v.rs--;
                        resolve();

                    } else if (v.enable_paint_type === "offscreen") {

                        s.canvas_context.globalCompositeOperation = "copy";
                        s.canvas_context.drawImage(s.offscreen_canvas_context.canvas, 0, 0, s.width, s.height);

                        const paint_ended = Date.now();
                        v.tbrt = paint_ended - v.rt;
                        v.rt = paint_ended;
                        v.rs--;
                        resolve();
                    }else {

                        d2d(s.canvas_context, ic2).then(function () {

                            if (!s.is_bitmap && !s.is_offscreen) {
                                ic2.clear();
                            }

                            const paint_ended = Date.now();
                            v.tbrt = paint_ended - v.rt;
                            v.rt = paint_ended;
                            v.rs--;
                            resolve();
                        }).catch(function(){

                            resolve();
                        });
                    }
                });
            },
            prender(){

                return new Promise(function (resolve){

                    const started = Date.now();
                    if (v.enable_paint_type === "bitmap") {

                        pr.width = 1 + pr.bottom_right.x - pr.top_left.x | 0;
                        pr.height = 1 + pr.bottom_right.y - pr.top_left.y | 0;
                        pr.fp_square = new Uint32Array(pr.width * pr.height);

                        let square_offset_start_length = pr.top_left.x | 0;
                        let current_offset_start_index = 0;

                        for(let i = 0; i < pr.height ; i = i + 1 | 0) {
                            current_offset_start_index = s.width * (i + pr.top_left.y) + square_offset_start_length | 0;
                            pr.fp_square.set(fp.slice(current_offset_start_index, current_offset_start_index + pr.width|0), i*pr.width|0);
                        }

                        let new_bmp_x = pr.top_left.x | 0;
                        let new_bmp_y = pr.top_left.y | 0;

                        pool.exec(bpro, Array.of(pr.width, pr.height, pr.fp_square)).catch(function () {

                            return b(pr.width, pr.height, pr.fp_square);
                        }).then(function(bitmap){

                            bmp = bitmap;
                            bmp_x = new_bmp_x | 0;
                            bmp_y = new_bmp_y | 0;
                            v.pt = Date.now() - started;
                            resolve();
                        });

                    }else if (s.is_offscreen) {

                        d2d(s.offscreen_canvas_context, ic2).then(function(){

                            ic2.clear();
                            v.pt = Date.now() - started;
                            resolve();
                        });

                    }else {

                        v.pt = Date.now() - started;
                        resolve();
                    }
                });
            },
            unpile(){

                return new Promise(function (resolve){

                    if (ic.size > 0) {

                        ic2 = new Map(Array.from(ic2).concat(Array.from(ic)));

                        if (s.is_bitmap) {

                            let x, y;
                            ic2.forEach(function (value, index) {

                                index = index | 0;
                                value = value | 0;
                                x = index % s.width | 0;
                                y = (index - x) / s.width | 0;

                                if(pr.top_left.x >= x) { pr.top_left.x = x-1 | 0 }
                                if(pr.top_left.y >= y) { pr.top_left.y = y-1 | 0 }
                                if(pr.bottom_right.x <= x) { pr.bottom_right.x = x+1 | 0 }
                                if(pr.bottom_right.y <= y) { pr.bottom_right.y = y+1 | 0 }
                                fp.fill(value|0, index|0, index+1|0);

                            }); ic2.clear();

                            ic.clear();
                            v.enable_paint_type = "bitmap";
                            resolve();

                        } else if (s.is_offscreen) {

                            ic.clear();
                            v.enable_paint_type = "offscreen";
                            resolve();
                        }else {

                            ic.clear();
                            v.enable_paint_type = "";
                            resolve();
                        }

                    }else {

                        resolve();
                    }
                });
            },
            pile(indexed_changes) {

                return new Promise(function(resolve){

                    ic = new Map(Array.from(ic).concat(Array.from(indexed_changes)));
                    resolve();
                });
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
                s.canvas_context.canvas.addEventListener("contextlost", function(){

                    let cc2d = s.canvas_context.canvas.getContext('2d', {desynchronized: false});
                    cc2d.imageSmoothingEnabled = false;
                    cc2d.globalCompositeOperation = "copy";
                    s.canvas_context = cc2d;
                });
                s.offscreen_canvas_context.canvas.addEventListener("contextlost", function(){

                    let occ2d = s.offscreen_canvas_context.canvas.getContext("2d", {willReadFrenquently: true});
                    occ2d.imageSmoothingEnabled = false;
                    s.offscreen_canvas_context = occ2d;
                });
            },
            destroy() {
                s, bmp, fp, ic, v = null;
            }
        };
    }
};

module.exports = SuperCanvas;