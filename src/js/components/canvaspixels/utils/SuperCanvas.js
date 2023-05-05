import pool from "../../../utils/worker-pool";
import SIMDope from "simdope/index";
const {clamp_uint32, modulo_uint, divide_int, minus_int, int_greater, int_less, int_greater_equal, int_less_equal, plus_uint, plus_int, max_int, min_int} = SIMDope.simdops;

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
    draw_2d: function (ctx2d, _state) {
        "use strict";
        return new Promise(function (resolve){

            "use strict";

            let s_width = _state.s.width | 0;
            let pr_width = _state.pr.width | 0;
            let pr_height = _state.pr.height | 0;
            let pr_top_left_x = _state.pr.top_left.x | 0;
            let pr_top_left_y = _state.pr.top_left.y | 0;
            let pr_uint8a = new Uint8Array(_state.fp.buffer);

            let fp_square = new Uint8ClampedArray((pr_width * pr_height * 4 | 0)>>>0);
            let current_offset_start_index = 0;
            for(let i = 0; (i|0) < (pr_height|0) ; i = (i + 1 | 0)>>>0) {
                current_offset_start_index = s_width * (i + pr_top_left_y) + pr_top_left_x | 0;
                fp_square.set(pr_uint8a.subarray((current_offset_start_index*4|0)>>>0, ((current_offset_start_index + pr_width)*4|0)>>>0), (4*i*pr_width|0)>>>0);
            }

            _state.pr.top_left.x = _state.s.width | 0;
            _state.pr.top_left.y = _state.s.height | 0;
            _state.pr.bottom_right.x = 0;
            _state.pr.bottom_right.y = 0;

            let image_data = new ImageData(fp_square, pr_width|0, pr_height|0)
            ctx2d.putImageData(image_data, pr_top_left_x, pr_top_left_y, 0, 0, pr_width, pr_height);
            resolve();
        });
    },
    from: function(c, pxl_width, pxl_height){
        "use strict";
        const AFunction = Object.getPrototypeOf( function(){}).constructor;
        const bpro = AFunction(
            `var bpro = function(s_width, pr_width, pr_height, pr_top_left_x, pr_top_left_y, fp){
            
                "use strict";
                var fp_square = new Uint8ClampedArray((pr_width * pr_height * 4 | 0)>>>0);
                var current_offset_start_index = 0;
                for(var i = 0; (i|0) < (pr_height|0) ; i = (i + 1 | 0)>>>0) {
                    current_offset_start_index = s_width * (i + pr_top_left_y) + pr_top_left_x | 0;
                    fp_square.set(fp.subarray((current_offset_start_index*4|0)>>>0, ((current_offset_start_index + pr_width)*4|0)>>>0), (4*i*pr_width|0)>>>0);
                }
                
                return createImageBitmap(new ImageData(fp_square, pr_width|0, pr_height|0));                
              
            }; return bpro;`)();

        //const pool = workerpool.pool({minWorkers: 1, maxWorkers: 1});
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
                let is_offscreen = Boolean('OffscreenCanvas' in window);
                let cc2d;
                let occ2d;
                if (is_offscreen) {

                    occ2d = new OffscreenCanvas(pxl_width, pxl_height).getContext("2d", {willReadFrequently: true});
                    occ2d.imageSmoothingEnabled = false;
                    occ2d.webkitImageSmoothingEnabled = false;
                    occ2d.mozImageSmoothingEnabled = false;
                    occ2d.msImageSmoothingEnabled = false;

                }

                cc2d = c.getContext('2d', {desynchronized: false, willReadFrequently: true} );

                cc2d.mozImageSmoothingEnabled = false;
                cc2d.webkitImageSmoothingEnabled = false;
                cc2d.msImageSmoothingEnabled = false;
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

            let state = {
                s: cs(c, pxl_width, pxl_height),
                enable_paint_type: "",
                fp_buffer: new ArrayBuffer(pxl_height * pxl_width * 4),
                ic: new Map(),
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

            state.fp = new Uint32Array(state.fp_buffer)
            state.fp_dataview = new DataView(state.fp_buffer);
            state.pr_uint8a = new Uint8Array(state.fp.buffer);

            return state;
        };

        let _state = template(c, pxl_width, pxl_height);

        return {
            // Methods
            ok: function (){
                "use strict";
                return Boolean(_state.s.canvas_context.canvas);
            },
            clear: function() {
                "use strict";
                return new Promise(function (resolve){

                    "use strict";

                    _state.s.canvas_context.clearRect(0, 0, _state.s.width, _state.s.height);
                    resolve();
                });
            },
            render: function(b2) {
                "use strict";
                _state.pr.top_left.x = _state.s.width | 0;
                _state.pr.top_left.y = _state.s.height | 0;
                _state.pr.bottom_right.x = 0;
                _state.pr.bottom_right.y = 0;

                if (typeof b2 !== "undefined" && _state.enable_paint_type === "bitmap") {


                    _state.b.old_bmp.close();
                    if(b2.clear_behind) {_state.s.canvas_context.clearRect(b2.bmp_x, b2.bmp_y, b2.bmp.width, b2.bmp.height);}
                    _state.s.canvas_context.globalCompositeOperation = "source-over";
                    _state.s.canvas_context.drawImage(b2.bmp, b2.bmp_x, b2.bmp_y, b2.bmp.width, b2.bmp.height);
                    _state.b = b2;

                } else if (_state.enable_paint_type === "offscreen") {

                    _state.s.canvas_context.globalCompositeOperation = "copy";
                    _state.s.canvas_context.drawImage(_state.s.offscreen_canvas_context.canvas, 0, 0, _state.s.width, _state.s.height);

                }else {

                    d2d(_state.s.canvas_context, _state);
                }
            },
            prender: function(){
                "use strict";

                if (_state.enable_paint_type === "bitmap") {

                    if((_state.b.old_bmp.width|0) === 0) {

                        let new_bmp_t = Date.now();
                        let new_bmp_x = _state.pr.top_left.x | 0;
                        let new_bmp_y = _state.pr.top_left.y | 0;
                        let s_width = _state.s.width | 0;
                        let pr_width = _state.pr.width | 0;
                        let pr_height = _state.pr.height | 0;
                        let pr_top_left_x = _state.pr.top_left.x | 0;
                        let pr_top_left_y = _state.pr.top_left.y | 0;
                        let pr_uint8a = _state.pr_uint8a;
                        let pr_uint8a_length = pr_uint8a.length | 0;
                        let not_fully_opaque = false;
                        for(let i = 3; (i|0)<(pr_uint8a_length|0); i = (i+4|0)>>>0) {
                            if((pr_uint8a[i]|0) != 0xFF) {
                                not_fully_opaque = true;
                                i = pr_uint8a_length | 0;
                            }
                        }

                        return bpro(s_width, pr_width, pr_height, pr_top_left_x, pr_top_left_y, pr_uint8a).then(function(bitmap){

                            if(_state.b.bmp_t < new_bmp_t) {

                                let b2 = {};
                                b2.old_bmp = _state.b.bmp;
                                b2.bmp = bitmap;
                                b2.bmp_t = new_bmp_t | 0;
                                b2.bmp_x = new_bmp_x | 0;
                                b2.bmp_y = new_bmp_y | 0;
                                b2.clear_behind = not_fully_opaque;

                                return Promise.resolve(b2);
                            }else {

                                return Promise.resolve(_state.b);
                            }

                        });

                    }else {

                        _state.b.old_bmp.close();

                        if(_state.bmp.width !== 0){

                            return Promise.resolve(_state.b);
                        }else {

                            return Promise.reject();
                        }
                    }


                }else if (_state.enable_paint_type === "offscreen") {

                    return d2d(_state.s.offscreen_canvas_context, _state);

                }else {

                    return Promise.resolve();
                }
            },
            unpile: function(w, h){
                "use strict";
                return new Promise(function (resolve, reject){

                    "use strict";

                    let width = _state.s.width | 0;
                    let height = _state.s.height | 0;

                    if(width !== w || height !== h){

                        reject();
                    }else {

                        let x, y;
                        let pr = _state.pr;
                        let pr_top_left_x = pr.top_left.x | 0;
                        let pr_top_left_y = pr.top_left.y | 0;
                        let pr_bottom_right_x = pr.bottom_right.x | 0;
                        let pr_bottom_right_y = pr.bottom_right.y | 0;
                        const fp_last_index = _state.fp.length-1|0;

                        _state.ic.forEach(function (value, index) {

                            "use strict";

                            value = (value|0) >>> 0;
                            index = (index|0) >>> 0;

                            x = modulo_uint(index, width);
                            y = divide_int(minus_int(index, x), width);

                            if(int_greater_equal(pr_top_left_x, minus_int(x, 0))) {pr_top_left_x = max_int(0, minus_int(x, 32));}
                            else if(int_less_equal(pr_bottom_right_x, plus_int(x, 0))) {pr_bottom_right_x = min_int(width,  plus_int(x, 32)); }
                            if(int_greater_equal(pr_top_left_y, minus_int(y, 0))) {pr_top_left_y = max_int(0, minus_int(y, 32));}
                            else if(int_less_equal(pr_bottom_right_y, plus_int(y, 0))) {pr_bottom_right_y = min_int(height, plus_int(y,32)); }

                            _state.fp_dataview.setUint32((index|0) << 2, (value|0)>>>0, false);
                        });

                        pr.width = 1 + pr_bottom_right_x - pr_top_left_x | 0;
                        pr.height = 1 + pr_bottom_right_y - pr_top_left_y | 0;

                        pr.top_left.x = pr_top_left_x | 0;
                        pr.top_left.y = pr_top_left_y | 0;
                        pr.bottom_right.x = pr_bottom_right_x | 0;
                        pr.bottom_right.y = pr_bottom_right_y | 0;
                        _state.pr = pr;

                        _state.ic.clear();
                        _state.enable_paint_type = _state.s.is_bitmap ? "bitmap": _state.s.is_offscreen ? "offscreen": "";

                        resolve();
                    }
                });
            },
            pile: function(index_changes, color_changes) {
                "use strict";
                return new Promise(function(resolve){

                    "use strict";

                    let length = index_changes.length|0;
                    for(let i = 0; int_less(i, length); i = plus_uint(i, 1)) {
                        _state.ic.set(clamp_uint32(index_changes[i]), clamp_uint32(color_changes[i]));
                    }

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

                    let cc2d = _state.s.canvas_context.canvas.getContext('2d', {desynchronized: false, willReadFrequently: false});
                    cc2d.imageSmoothingEnabled = false;
                    cc2d.webkitImageSmoothingEnabled = false;
                    cc2d.globalCompositeOperation = "copy";
                    _state.s.canvas_context = cc2d;
                });
                _state.s.offscreen_canvas_context.canvas.addEventListener("contextlost", function(){

                    let occ2d = _state.s.offscreen_canvas_context.canvas.getContext("2d", {willReadFrequently: false});
                    occ2d.imageSmoothingEnabled = false;
                    occ2d.webkitImageSmoothingEnabled = false;
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