import workerpool from "workerpool";
import pool from "../../../utils/worker-pool";

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
    from: function(c, pxl_width, pxl_height){

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const bpro = AsyncFunction(
            `var bpro = async function(s_width, pr_width, pr_height, pr_top_left_x, pr_top_left_y, fp_buffer){
                "use strict";
                let fp_square = new Uint32Array(pr_width * pr_height);
                let square_offset_start_length = pr_top_left_x | 0;
                let current_offset_start_index = 0;
                let fpa = new Uint32Array(fp_buffer);
                for(let i = 0; i < pr_height ; i = (i + 1 | 0) >>> 0) {
                    current_offset_start_index = (s_width * (i + pr_top_left_y) + square_offset_start_length | 0) >>> 0;
                    fp_square.set(fpa.subarray(current_offset_start_index, (current_offset_start_index + pr_width|0) >>> 0), (i*pr_width|0) >>> 0);
                }
                
                return createImageBitmap(new ImageData(new Uint8ClampedArray(fp_square.reverse().buffer).reverse(), pr_width, pr_height));
                 
            }; return bpro;`)();

        const pool = workerpool.pool({minWorkers: 1, maxWorkers: 1});
        const d2d = this.draw_2d;
        const template = function(c, pxl_width, pxl_height){

            pxl_width = pxl_width | 0;
            pxl_height = pxl_height | 0;

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

                cc2d = c.getContext('2d', {desynchronized: true} );
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
                enable_paint_type: "",
                fp: new DataView(new ArrayBuffer(pxl_height * pxl_width * 4)),
                ic: new Map(),
                ic2: new Map(),
                b: {
                    bmp_x: 0,
                    bmp_y: 0,
                    bmp: {close(){}, width: 0, height: 0},
                    old_bmp: {close(){}, width: 0, height: 0},
                },
                pr: {
                    top_left: {x:0, y:0},
                    bottom_right: {x:0, y:0},
                    width: 0,
                    height: 0
                }
            };
        };


        let state = template(c, pxl_width, pxl_height);
        let {s, fp, ic, ic2, enable_paint_type, b, pr} = state;

        return {
            // Methods
            ok: function (){
                return s.canvas_context && true;
            },
            clear: function() {
                return new Promise(function (resolve){

                    s.canvas_context.clearRect(0, 0, s.width, s.height);
                    resolve();
                });
            },
            render: function() {
                return new Promise(function (resolve) {
                    if (enable_paint_type === "bitmap") {

                        s.canvas_context.clearRect(b.bmp_x, b.bmp_y, b.bmp.width, b.bmp.height);
                        s.canvas_context.globalCompositeOperation = "source-over";
                        s.canvas_context.drawImage(b.bmp, b.bmp_x, b.bmp_y, b.bmp.width, b.bmp.height);

                        b.old_bmp.close();

                    } else if (enable_paint_type === "offscreen") {

                        s.canvas_context.globalCompositeOperation = "copy";
                        s.canvas_context.drawImage(s.offscreen_canvas_context.canvas, 0, 0, s.width, s.height);
                    }

                    d2d(s.canvas_context, ic2).then(function () {

                        if (!s.is_bitmap && !s.is_offscreen) {
                            ic2.clear();
                        }

                        resolve();
                    });
                });
            },
            prender: function(){

                return new Promise(function (resolve){

                    if (enable_paint_type === "bitmap") {

                        pr.width = 1 + pr.bottom_right.x - pr.top_left.x | 0;
                        pr.height = 1 + pr.bottom_right.y - pr.top_left.y | 0;
                        let new_bmp_x = pr.top_left.x | 0;
                        let new_bmp_y = pr.top_left.y | 0;

                        if(b.old_bmp.width === 0) {

                            pool.exec(bpro, Array.of(s.width | 0, pr.width | 0, pr.height | 0, pr.top_left.x | 0, pr.top_left.y | 0, fp.buffer)).catch(function () {

                                return b(s.width | 0, pr.width | 0, pr.height | 0, pr.top_left.x | 0, pr.top_left.y | 0, fp.buffer);
                            }).then(function(bitmap){

                                pr.top_left.x = s.width | 0;
                                pr.top_left.y = s.height | 0;
                                pr.bottom_right.x = 0;
                                pr.bottom_right.y = 0;

                                b.old_bmp = b.bmp;
                                b.bmp = bitmap;
                                b.bmp_x = new_bmp_x | 0;
                                b.bmp_y = new_bmp_y | 0;

                                resolve();
                            }).catch(resolve);
                        }else {

                            resolve();
                        }

                    }else if (s.is_offscreen) {

                        d2d(s.offscreen_canvas_context, ic2).then(function(){

                            ic2.clear();
                            resolve();
                        });

                    }else {

                        resolve();
                    }
                });
            },
            unpile: function(){

                return new Promise(function (resolve){

                    if (ic.size > 0) {

                        ic2 = new Map(Array.from(ic2).concat(Array.from(ic)));

                        if (s.is_bitmap) {

                            let x, y;
                            let {width, height} = s;
                            let {top_left, bottom_right} = pr;
                            ic2.forEach(function (value, index) {

                                index = index | 0;
                                x = (index % width | 0) >>> 0;
                                y = ((index - x) / width | 0) >>> 0;

                                if(top_left.x > x-4) { top_left.x = Math.max(0, x-4 | 0) }
                                if(top_left.y > y-4) { top_left.y = Math.max(0, y-4 | 0) | 0 }
                                if(bottom_right.x < x+4) { bottom_right.x = Math.min(width, x+4 | 0) }
                                if(bottom_right.y < y+4) { bottom_right.y = Math.min(height, y+4 | 0) }
                                fp.setUint32((index*4|0) >>> 0, (value|0) >>> 0, true);
                            });

                            ic2.clear();
                            ic.clear();
                            enable_paint_type = "bitmap";
                            resolve();

                        } else if (s.is_offscreen) {

                            ic.clear();
                            enable_paint_type = "offscreen";
                            resolve();
                        }else {

                            ic.clear();
                            enable_paint_type = "";
                            resolve();
                        }

                    }else {

                        resolve();
                    }
                });
            },
            pile: function(indexed_changes) {

                return new Promise(function(resolve){

                    ic = new Map(Array.from(ic).concat(Array.from(indexed_changes)));
                    indexed_changes.clear();
                    resolve();
                });
            },
            set_dimensions: function(w, h) {

                if(state.s.width !== w || state.s.height !== h) {

                    state = template(s.canvas_context.canvas, w, h);
                    s = state.s;
                    fp = state.fp;
                    ic = state.ic;
                    ic2 = state.ic2;
                    enable_paint_type = state.enable_paint_type;
                    b = state.b;
                    pr = state.pr;
                }
            },
            new: function(c, w, h) {

                state = template(c, w, h);
                s = state.s;
                fp = state.fp;
                ic = state.ic;
                ic2 = state.ic2;
                enable_paint_type = state.enable_paint_type;
                b = state.b;
                pr = state.pr;
            },
            secure_context: function() {
                s.canvas_context.canvas.addEventListener("contextlost", function(){

                    let cc2d = s.canvas_context.canvas.getContext('2d', {desynchronized: true});
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
            destroy: function() {
                s, fp, ic, ic2, enable_paint_type, b, pr = null;
                Object.keys(state).forEach(function (key) {delete state[key];});
            }
        };
    }
};

module.exports = SuperCanvas;