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
        "use strict";
        return new Promise(function (resolve, reject){

            if(indexed_colors.size === 0) {
                resolve();
            }else {

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
            }
        });
    },
    from: function(c, pxl_width, pxl_height){
        "use strict";
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const bpro = AsyncFunction(
            `var bpro = async function(s_width, pr_width, pr_height, pr_top_left_x, pr_top_left_y, fp_buffer){
                "use strict";
                var fp_square = new Uint8ClampedArray(pr_width * pr_height * 4 | 0);
                var current_offset_start_index = 0;
                for(var i = 0; (i|0) < (pr_height|0) ; i = i + 1 | 0) {
                    current_offset_start_index = s_width * (i + pr_top_left_y) + pr_top_left_x | 0;
                    fp_square.set(new Uint8ClampedArray(fp_buffer.slice(current_offset_start_index*4|0, (current_offset_start_index + pr_width)*4|0)), 4*i*pr_width|0);
                }
                
                return createImageBitmap(new ImageData(fp_square, pr_width|0, pr_height|0));
                 
            }; return bpro;`)();

        const pool = workerpool.pool({minWorkers: 1, maxWorkers: 1});
        const d2d = this.draw_2d;
        const template = function(c, pxl_width, pxl_height, fp){

            pxl_width = pxl_width | 0;
            pxl_height = pxl_height | 0;
            fp = fp || null;

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
                enable_paint_type: "",
                fp: fp || new DataView(new ArrayBuffer(pxl_height * pxl_width * 4)),
                ic: new Map(),
                ic2: new Map(),
                b: {
                    bmp_x: 0,
                    bmp_y: 0,
                    bmp_t: 0,
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


        let _state = template(c, pxl_width, pxl_height);

        return {
            // Methods
            ok: function (){
                "use strict";
                return Boolean(_state.s.canvas_context.canvas) && true;
            },
            clear: function() {
                "use strict";
                return new Promise(function (resolve){

                    _state.s.canvas_context.clearRect(0, 0, _state.s.width, _state.s.height);
                    resolve();
                });
            },
            render: function(b2) {
                "use strict";
                return new Promise(function (resolve, reject) {

                    if (_state.enable_paint_type === "bitmap") {

                        b2 = typeof b2 !== "undefined" ? b2: _state.b;

                        _state.s.canvas_context.clearRect(b2.bmp_x, b2.bmp_y, b2.bmp.width, b2.bmp.height);
                        _state.s.canvas_context.globalCompositeOperation = "source-over";
                        _state.s.canvas_context.drawImage(b2.bmp, b2.bmp_x, b2.bmp_y, b2.bmp.width, b2.bmp.height);
                        _state.b = b2;
                        _state.b.old_bmp.close();

                    } else if (_state.enable_paint_type === "offscreen") {

                        _state.s.canvas_context.globalCompositeOperation = "copy";
                        _state.s.canvas_context.drawImage(_state.s.offscreen_canvas_context.canvas, 0, 0, _state.s.width, _state.s.height);
                    }

                    d2d(_state.s.canvas_context, _state.ic2).then(function () {

                        if (!_state.s.is_bitmap && !_state.s.is_offscreen) {
                            _state.ic2.clear();
                        }

                        resolve();
                    });
                });
            },
            prender: function(){
                "use strict";
                return new Promise(function (resolve, reject){

                    if (_state.enable_paint_type === "bitmap") {

                        if(_state.b.old_bmp.width === 0) {
                            let new_bmp_t = Date.now()|0;
                            let new_bmp_x = _state.pr.top_left.x | 0;
                            let new_bmp_y = _state.pr.top_left.y | 0;
                            let s_width = _state.s.width | 0;
                            let pr_width = _state.pr.width | 0;
                            let pr_height = _state.pr.height | 0;
                            let pr_top_left_x = _state.pr.top_left.x | 0;
                            let pr_top_left_y = _state.pr.top_left.y | 0;

                            pool.exec(bpro, [s_width, pr_width, pr_height, pr_top_left_x, pr_top_left_y, _state.fp.buffer]).catch(function () {

                                return b(s_width, pr_width, pr_height, pr_top_left_x, pr_top_left_y, _state.fp.buffer);
                            }).then(function(bitmap){

                                if(_state.b.bmp_t < new_bmp_t) {

                                    let b2 = {};
                                    b2.old_bmp = _state.b.bmp;
                                    b2.bmp = bitmap;
                                    b2.bmp_t = new_bmp_t | 0;
                                    b2.bmp_x = new_bmp_x | 0;
                                    b2.bmp_y = new_bmp_y | 0;

                                    _state.pr.top_left.x = _state.s.width | 0;
                                    _state.pr.top_left.y = _state.s.height | 0;
                                    _state.pr.bottom_right.x = 0;
                                    _state.pr.bottom_right.y = 0;

                                    resolve(b2);
                                }else {

                                    reject(_state.b);
                                }

                            }).catch(reject);
                        }else if(_state.bmp.width !== 0){

                            resolve(_state.b);
                        }else {

                            _state.old_bmp.close();
                            reject();
                        }


                    }else if (_state.s.is_offscreen) {

                        d2d(_state.s.offscreen_canvas_context, _state.ic2).then(function(){

                            _state.ic2.clear();
                            resolve();
                        });

                    }else {

                        resolve();
                    }
                });
            },
            unpile: function(w, h){
                "use strict";
                return new Promise(function (resolve, reject){

                    if (_state.ic.size > 0) {
                        _state.ic2 = new Map(Array.from(_state.ic2).concat(Array.from(_state.ic)));
                    }

                    let width = _state.s.width | 0;
                    let height = _state.s.height | 0;

                    if(width !== w || height !== h){

                        reject();
                    }else if (_state.s.is_bitmap) {

                        let x, y;
                        let pr = _state.pr;
                        let pr_top_left_x = pr.top_left.x | 0;
                        let pr_top_left_y = pr.top_left.y | 0;
                        let pr_bottom_right_x = pr.bottom_right.x | 0;
                        let pr_bottom_right_y = pr.bottom_right.y | 0;
                        _state.ic2.forEach(function (value, index) {

                            x = index % width | 0;
                            y = (index - x) / width | 0;

                            if((pr_top_left_x|0) > (x-24|0)) {pr_top_left_x = Math.max(0, x-24|0)|0 }else if((pr_bottom_right_x|0) < (x+24|0)) { pr_bottom_right_x = Math.min(width|0, x+24|0)|0 }
                            if((pr_top_left_y|0) > (y-24|0)) { pr_top_left_y = Math.max(0, y-24|0)|0 }else if((pr_bottom_right_y|0) < (y+24|0)) { pr_bottom_right_y = Math.min(height|0, y+24|0)|0 }
                            _state.fp.setUint32(index*4|0, value & 0xFFFFFFFF, false);
                        });

                        pr.width = 1 + pr_bottom_right_x - pr_top_left_x | 0;
                        pr.height = 1 + pr_bottom_right_y - pr_top_left_y | 0;

                        pr.top_left.x = pr_top_left_x | 0;
                        pr.top_left.y = pr_top_left_y | 0;
                        pr.bottom_right.x = pr_bottom_right_x | 0;
                        pr.bottom_right.y = pr_bottom_right_y | 0;
                        _state.pr = pr;

                        _state.ic2.clear();
                        _state.ic.clear();
                        _state.enable_paint_type = "bitmap";
                        resolve();

                    } else if (_state.s.is_offscreen) {

                        _state.ic.clear();
                        _state.enable_paint_type = "offscreen";
                        resolve();
                    }else {

                        _state.ic.clear();
                        _state.enable_paint_type = "";
                        resolve();
                    }
                });
            },
            pile: function(indexed_changes) {
                "use strict";
                return new Promise(function(resolve){

                    _state.ic = new Map(Array.from(_state.ic).concat(Array.from(indexed_changes)));
                    resolve();
                });
            },
            set_dimensions: function(w, h) {
                "use strict";
                return new Promise(function (resolve, reject){
                    if(_state.s.width !== w || _state.s.height !== h) {

                        _state = template(_state.s.canvas_context.canvas, w, h);
                        resolve();
                    }else {

                        resolve();
                    }
                });
            },
            new: function(c, w, h) {
                "use strict";
                return new Promise(function (resolve, reject){
                    _state = template(c, w, h);
                    resolve();
                });
            },
            secure_context: function() {
                "use strict";
                _state.s.canvas_context.canvas.addEventListener("contextlost", function(){

                    let cc2d = _state.s.canvas_context.canvas.getContext('2d', {desynchronized: false});
                    cc2d.imageSmoothingEnabled = false;
                    cc2d.globalCompositeOperation = "copy";
                    _state.s.canvas_context = cc2d;
                });
                _state.s.offscreen_canvas_context.canvas.addEventListener("contextlost", function(){

                    let occ2d = _state.s.offscreen_canvas_context.canvas.getContext("2d", {willReadFrenquently: true});
                    occ2d.imageSmoothingEnabled = false;
                    _state.s.offscreen_canvas_context = occ2d;
                });
            },
            destroy: function() {
                Object.keys(_state).forEach(function (key) {delete _state[key];});
                _state = null;
            }
        };
    }
};

module.exports = SuperCanvas;