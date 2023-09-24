import SIMDope, {SIMDopeColors, SIMDopeColor} from "simdope";
const {clamp_uint32, modulo_uint, divide_uint, minus_uint, uint_greater, uint_less, uint_greater_equal, uint_less_equal, plus_uint, minus_int, int_greater, int_less, int_greater_equal, int_less_equal, plus_int, max_int, min_int} = SIMDope.simdops;

function draw_2d(ctx2d, _state) {
    "use strict";
    let s_width = _state.s.width | 0;
    let pr_width = _state.pr.width | 0;
    let pr_height = _state.pr.height | 0;
    let pr_top_left_x = _state.pr.top_left.x | 0;
    let pr_top_left_y = _state.pr.top_left.y | 0;
    let pr_uint8a = _state.pr_uint8a;

    var imul = Math.imul;
    let fp_square = ctx2d.getImageData(pr_top_left_x, pr_top_left_y, pr_width, pr_height);
    let fp_square_data = fp_square.data;
    let current_offset_start_index = 0;
    for (var i = 0; (i | 0) < (pr_height | 0); i = (i + 1 | 0) >>> 0) {
        current_offset_start_index = (imul(s_width, (i + pr_top_left_y | 0)) + pr_top_left_x | 0) >>> 0;
        fp_square_data.set(pr_uint8a.subarray((current_offset_start_index << 2 | 0) >>> 0, ((current_offset_start_index + pr_width | 0) << 2 | 0) >>> 0), (imul(i, pr_width) << 2 | 0) >>> 0);
    }

    _state.pr.top_left.x = _state.s.width - 1 | 0;
    _state.pr.top_left.y = _state.s.height - 1 | 0;
    _state.pr.bottom_right.x = 0;
    _state.pr.bottom_right.y = 0;

    ctx2d.putImageData(fp_square, pr_top_left_x, pr_top_left_y, 0, 0, pr_width, pr_height);
    return Promise.resolve();
}

const AFunction = Object.getPrototypeOf( function(){}).constructor;
const bpro = AFunction(
    `var bpro = function(s_width, pr_width, pr_height, pr_top_left_x, pr_top_left_y, fp){
            
                "use strict";
                var imul = Math.imul;
                var fp_square = new Uint8Array(imul(pr_width, pr_height) << 4);
                var current_offset_start_index = 0;
                for(var i = 0; (i|0) < (pr_height|0) ; i = (i + 1 | 0)>>>0) {
                    current_offset_start_index = (imul(s_width, (i + pr_top_left_y | 0)) + pr_top_left_x | 0) >>> 0;
                    fp_square.set(fp.subarray((current_offset_start_index << 2|0)>>>0, ((current_offset_start_index + pr_width | 0)<<2|0)>>>0), (imul(i,pr_width)<<2|0)>>>0);
                }
                
                return createImageBitmap(new ImageData(new Uint8ClampedArray(fp_square.buffer), pr_width|0, pr_height|0));                
              
            }; return bpro;`)();

function template(c, pxl_width, pxl_height){

    pxl_width = pxl_width | 0;
    pxl_height = pxl_height | 0;

    function cs(c, pxl_width, pxl_height) {

        pxl_width = pxl_width | 0;
        pxl_height = pxl_height | 0;
        if(!Boolean(c)) { c = document.createElement("canvas"); }
        c.width = pxl_width | 0;
        c.height = pxl_height | 0;

        let is_mobile = Boolean((/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent||navigator.vendor||window.opera.substr(0,4))));
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

        cc2d = c.getContext('2d', {desynchronized: !is_mobile, willReadFrequently: true} );

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
        ic: {
            indexes: new Uint16Array(0),
            colors: new Uint32Array(0)
        },
        b: {
            bmp_x: 0,
            bmp_y: 0,
            bmp_t: 0,
            bmp: {close(){}, width: 0, height: 0},
            old_bmp: {close(){}, width: 0, height: 0},
        },
        b2: {
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
    state.pr_uint8a = new Uint8Array(state.fp.buffer);

    return state;
};

var SuperCanvas = function(c, pxl_width, pxl_height) {
    "use strict";
    if (!(this instanceof SuperCanvas)) {
        return new SuperCanvas(c, pxl_width, pxl_height);
    }

    this.state_ = template(c, pxl_width, pxl_height)

    return this;
}
Object.defineProperty(SuperCanvas.prototype, 'ok', {
    get: function() { "use strict"; return function () {
        "use strict";
        return Boolean(this.state_.s.canvas_context.canvas);
    }}
});
Object.defineProperty(SuperCanvas.prototype, 'new', {
    get: function() { "use strict"; return function (c, w, h) {
        "use strict";
        this.state_ = template(c, w, h);
        return Promise.resolve();
    }}
});
Object.defineProperty(SuperCanvas.prototype, 'clear', {
    get: function() { "use strict"; return function () {
        "use strict";
        return new Promise(function (resolve){

            "use strict";
            this.state_.s.canvas_context.clearRect(0, 0, this.state_.s.width, this.state_.s.height);
            resolve();
        });
    }}
});
Object.defineProperty(SuperCanvas.prototype, 'render', {
    get: function() { "use strict"; return function () {
        "use strict";
        var b2 = this.state_.b2;
        this.state_.pr.top_left.x = this.state_.s.width - 1 | 0;
        this.state_.pr.top_left.y = this.state_.s.height - 1 | 0;
        this.state_.pr.bottom_right.x = 0;
        this.state_.pr.bottom_right.y = 0;

        "use strict";
        if (typeof b2 !== "undefined" && this.state_.enable_paint_type === "bitmap") {

            this.state_.b.old_bmp.close();
            this.state_.s.canvas_context.clearRect(b2.bmp_x, b2.bmp_y, b2.bmp.width, b2.bmp.height);
            this.state_.s.canvas_context.globalCompositeOperation = "source-over";
            this.state_.s.canvas_context.drawImage(b2.bmp, b2.bmp_x, b2.bmp_y, b2.bmp.width, b2.bmp.height);

            /*this.state_.s.canvas_context.globalCompositeOperation = "copy";
            this.state_.s.canvas_context.drawImage(b2.bmp, 0, 0, b2.bmp.width, b2.bmp.height);*/

            this.state_.b = b2;
            return Promise.resolve();
        } else if (this.state_.enable_paint_type === "offscreen") {

            this.state_.s.canvas_context.globalCompositeOperation = "copy";
            this.state_.s.canvas_context.drawImage(this.state_.s.offscreen_canvas_context.canvas, 0, 0, this.state_.s.width, this.state_.s.height);
            return Promise.resolve();
        }else {

            return Promise.resolve();
        }
    }}
});
Object.defineProperty(SuperCanvas.prototype, 'prender', {
    get: function() { "use strict"; return function () {
        "use strict";
        if (this.state_.enable_paint_type === "bitmap") {

            let new_bmp_t = Date.now();
            let new_bmp_x = this.state_.pr.top_left.x | 0;
            let new_bmp_y = this.state_.pr.top_left.y | 0;
            let pr_width = this.state_.pr.width | 0;
            let pr_height = this.state_.pr.height | 0;
            return new Promise((resolve, reject) => {
                createImageBitmap(new ImageData(new Uint8ClampedArray(this.state_.pr_uint8a.buffer), this.state_.s.width|0, this.state_.s.height|0), new_bmp_x, new_bmp_y, pr_width, pr_height).then((bitmap) => {
                    this.state_.b2.old_bmp = this.state_.b.bmp;
                    this.state_.b2.bmp = bitmap;
                    this.state_.b2.bmp_x = new_bmp_x | 0;
                    this.state_.b2.bmp_y = new_bmp_y | 0;
                    this.state_.b2.bmp_t = new_bmp_t | 0;
                    return resolve();
                });
            });

        }else if (this.state_.enable_paint_type === "offscreen") {

            return draw_2d(this.state_.s.offscreen_canvas_context, this.state_).then(function (){return Promise.resolve()});

        }else {

            return Promise.resolve();
        }
    }}
});
Object.defineProperty(SuperCanvas.prototype, 'unpile', {
    get: function() { "use strict"; return function (w, h) {
        "use strict";

        let width = this.state_.s.width | 0;
        let height = this.state_.s.height | 0;
        let index_changes = this.state_.ic.indexes;
        let color_changes = this.state_.ic.colors;

        this.state_.enable_paint_type =  this.state_.s.is_bitmap ? "bitmap" : this.state_.s.is_offscreen ? "offscreen" : "";

        if (width !== w || height !== h) {

            return Promise.reject();
        } else if(index_changes.length > 0){

            let x, y;
            let uint32a = this.state_.fp;
            let pr = this.state_.pr;
            let pr_top_left_x = pr.top_left.x | 0;
            let pr_top_left_y = pr.top_left.y | 0;
            let pr_bottom_right_x = pr.bottom_right.x | 0;
            let pr_bottom_right_y = pr.bottom_right.y | 0;
            let index = 0;
            let context = this.state_.s.canvas_context;

            if(index_changes.length < 64 || this.state_.enable_paint_type === "") {

                let colors = new SIMDopeColors(color_changes.buffer, color_changes.byteOffset, color_changes.byteLength);
                let color = new SIMDopeColor(new ArrayBuffer(4));
                for (let i = 0, l = index_changes.length | 0; uint_less(i, l); i = plus_uint(i, 1)) {

                    index = (index_changes[i | 0] | 0) >>> 0;
                    uint32a[(index | 0) >>> 0] = (color_changes[i | 0] | 0) >>> 0;

                    x = modulo_uint(index, width);
                    y = divide_uint(minus_uint(index, x), width);
                    context.fillStyle = colors.get_element(i, color).hex;
                    context.clearRect(x, y, 1, 1);
                    context.fillRect(x, y, 1, 1);
                }


                this.state_.enable_paint_type = "";
            }else {

                for (let i = 0, l = index_changes.length | 0; uint_less(i, l); i = plus_uint(i, 1)) {

                    index = (index_changes[i | 0] | 0) >>> 0;
                    uint32a[(index | 0) >>> 0] = (color_changes[i | 0] | 0) >>> 0;

                    x = modulo_uint(index, width);
                    y = divide_uint(minus_uint(index, x), width);

                    if (uint_greater_equal(pr_top_left_x, x)) {
                        pr_top_left_x = x|0;
                    }

                    if (uint_less_equal(pr_bottom_right_x, x)) {
                        pr_bottom_right_x = x|0;
                    }

                    if (uint_greater_equal(pr_top_left_y, y)) {
                        pr_top_left_y = y|0;
                    }

                    if (uint_less_equal(pr_bottom_right_y, y)) {
                        pr_bottom_right_y = y|0;
                    }
                }

                pr.width = pr_bottom_right_x - pr_top_left_x + 1 | 0;
                pr.height = pr_bottom_right_y - pr_top_left_y + 1 | 0;

                pr.top_left.x = pr_top_left_x | 0;
                pr.top_left.y = pr_top_left_y | 0;
                pr.bottom_right.x = pr_bottom_right_x | 0;
                pr.bottom_right.y = pr_bottom_right_y | 0;
                this.state_.pr = pr;
            }

            this.state_.ic.indexes = new Uint32Array(0);
            this.state_.ic.colors = new Uint32Array(0);
            return Promise.resolve();
        }else {
            this.state_.enable_paint_type = "";
            return Promise.resolve();
        }
        /*else {

            let index_changes = this.state_.ic.indexes;
            let color_changes = this.state_.ic.colors;
            let uint32a = this.state_.fp;
            let index = 0;
            for (let i = 0, l = index_changes.length | 0; uint_less(i, l); i = plus_uint(i, 1)) {

                index = (index_changes[i | 0] | 0) >>> 0;
                uint32a[(index | 0) >>> 0] = (color_changes[i | 0] | 0) >>> 0;
            }

            return Promise.resolve();
        }*/
    }}
});
Object.defineProperty(SuperCanvas.prototype, 'pile', {
    get: function() { "use strict"; return function (index_changes, color_changes) {
        "use strict";
        this.state_.ic.indexes = index_changes;
        this.state_.ic.colors = color_changes;

        return Promise.resolve();

    }}
});
Object.defineProperty(SuperCanvas.prototype, 'set_dimensions', {
    get: function() { "use strict"; return function (w, h) {
        "use strict";
        if(this.state_.s.width !== w || this.state_.s.height !== h) {

            this.state_ = template(this.state_.s.canvas_context.canvas, w, h);
            return Promise.resolve();
        }else {

            return Promise.reject();
        }

    }}
});
Object.defineProperty(SuperCanvas.prototype, 'secure_context', {
    get: function() { "use strict"; return function () {
        "use strict";
        this.state_.s.canvas_context.canvas.addEventListener("contextlost", () => {

            let cc2d = this.state_.s.canvas_context.canvas.getContext('2d', {willReadFrequently: true});
            cc2d.imageSmoothingEnabled = false;
            cc2d.webkitImageSmoothingEnabled = false;
            cc2d.globalCompositeOperation = "copy";
            this.state_.s.canvas_context = cc2d;
        });
        this.state_.s.offscreen_canvas_context.canvas.addEventListener("contextlost", () => {

            let occ2d = this.state_.s.offscreen_canvas_context.canvas.getContext("2d", {willReadFrequently: true});
            occ2d.imageSmoothingEnabled = false;
            occ2d.webkitImageSmoothingEnabled = false;
            this.state_.s.offscreen_canvas_context = occ2d;
        });
    }}
});
Object.defineProperty(SuperCanvas.prototype, 'destroy', {
    get: function() { "use strict"; return function () {
        "use strict";
        Object.keys(this.state_).forEach(function (key) {delete this.state_[key];});
        this.state_ = null;
    }}
});

module.exports = SuperCanvas;