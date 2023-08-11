import {Colors, Color} from "simdope";
import {SetFixed} from "@asaitama/boolean-array";

import {h32} from "./xxhash";

var Layer = function(image_data_or_colors_and_indexes, width, height, with_plain_data, bmp){
    "use strict";

    if (!(this instanceof Layer)) {
        return new Layer(image_data_or_colors_and_indexes, width, height, with_plain_data);
    }

    width = (parseInt(width || 0) | 0) >>> 0;
    height = (parseInt(height || 0) | 0) >>> 0;
    with_plain_data = typeof with_plain_data == "undefined" ? false: Boolean(with_plain_data) && true;

    if(image_data_or_colors_and_indexes.length === 2){

        this.width_ = width | 0;
        this.height_ = height | 0;
        this.bitmap_ = typeof bmp == "undefined" ? {height: this.height_, width: this.width_, destroy: function (){}, hash: ""}: bmp;
        this.changes_ = new SetFixed(this.width_ * this.height_);
        this.changes_.charge();
        this.uint32_colors_ = Uint32Array.from(new Set(image_data_or_colors_and_indexes[0]));
        this.color_indexes_length_ = image_data_or_colors_and_indexes[1].length|0;
        this.color_indexes_ = this.uint32_colors_.length < (1 << 8) ? new Uint8Array(this.color_indexes_length_) : (this.uint32_colors_.length+1|0) < (1 << 16) ? new Uint16Array(this.color_indexes_length_): new Uint32Array(this.color_indexes_length_);
        this.color_indexes_.set(image_data_or_colors_and_indexes[1], 0);
        this.force_update_data(true);

        for(var i = 0, l = this.color_indexes_length_ | 0; (i|0) < (l|0); i = (i + 1 | 0) >>> 0) {
            this.color_indexes_[i|0] = (this.uint32_colors_.indexOf(this.uint32_pixel_color_[i|0]) | 0) >>> 0;
        }

    }else{
        if(typeof image_data_or_colors_and_indexes.data != "undefined") { // image_data

            this.uint32_pixel_color_ = new Uint32Array(image_data_or_colors_and_indexes.data.buffer);
            this.width_ = width | 0;
            this.height_ = height | 0;
        }else if(image_data_or_colors_and_indexes instanceof Uint8Array || image_data_or_colors_and_indexes instanceof Uint8ClampedArray){ // uint32 buffer

            this.uint32_pixel_color_ = new Uint32Array(image_data_or_colors_and_indexes.buffer);
            this.width_ = (width | 0) || image_data_or_colors_and_indexes.width | 0;
            this.height_ = (height | 0) || image_data_or_colors_and_indexes.height | 0;
        }else {

            this.uint32_pixel_color_ = new Uint32Array(image_data_or_colors_and_indexes);
            this.width_ = width | 0;
            this.height_ = height | 0;

        }

        this.simdope_pixel_color_ =  new Colors(this.uint32_pixel_color_);
        this.uint32_colors_ = Uint32Array.from(new Set(this.uint32_pixel_color_));
        this.color_indexes_length_ = this.uint32_pixel_color_.length;
        this.color_indexes_ = this.uint32_colors_.length < (1 << 8) ? new Uint8Array(this.color_indexes_length_) : (this.uint32_colors_.length+1|0) < (1 << 16) ? new Uint16Array(this.color_indexes_length_): new Uint32Array(this.color_indexes_length_);

        for(var i = 0, l = this.color_indexes_length_ | 0; (i|0) < (l|0); i = (i + 1 | 0) >>> 0) {
            this.color_indexes_[i|0] = (this.uint32_colors_.indexOf(this.uint32_pixel_color_[i|0]) | 0) >>> 0;
        }

        this.bitmap_ = typeof bmp == "undefined" ? {height: this.height_, width: this.width_, destroy: function (){}, hash: ""}: bmp;
        this.changes_ = new SetFixed(this.width_ * this.height_);
        this.changes_.charge();
    }

    return this;
};

Layer.new_from_colors_and_indexes = function (colors, indexes, width, height, with_plain_data, bmp) {
    return new Layer(Array.of(colors, indexes), parseInt(width), parseInt(height), Boolean(with_plain_data), bmp);
};

Object.defineProperty(Layer.prototype, 'force_update_data', {
    get: function() {
        "use strict";
        return function (must_init){
            "use strict";
            must_init = typeof must_init == "undefined" ? false: Boolean(must_init) && true;

            if(must_init) {
                this.color_indexes_length_ = (this.width_ * this.height_ | 0) >>> 0;
                this.uint32_pixel_color_ =  new Uint32Array((this.color_indexes_length_|0)>>>0);
                this.simdope_pixel_color_ =  new Colors(this.uint32_pixel_color_);
            }

            for(var i = 0, l = this.color_indexes_length_ | 0; (i|0) < (l|0); i = (i + 1 | 0) >>> 0) {
                this.uint32_pixel_color_[(i|0)>>>0] = (this.uint32_colors_[this.color_indexes_[i|0]]|0) >>> 0;
            }

            this.changes_.charge();
        };
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'image_data', {
    get: function() {
        "use strict";
        try {
            return new ImageData(new Uint8ClampedArray(this.uint32_pixel_color_.buffer), this.width_, this.height_);
        } catch(e) {
            console.log(this.uint32_pixel_color_, this.width_, this.height_)
        }
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'set_bitmap', {
    get: function() {
        "use strict";
        return function (bmp){
            "use strict";
            this.bitmap_.destroy();
            this.bitmap_ = bmp;
            return this.get_bitmap();
        }
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'get_bitmap', {
    get: function() {
        "use strict";
        return function (){
            "use strict";
            return this.bitmap_;
        }
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'bitmap_async', {
    get: function() {
        "use strict";
        return function (maybe) {
            "use strict";
            maybe = typeof maybe == "undefined" ? false: Boolean(maybe) && true;
            var hash_hex_async = this.hash_hex_async.bind(this);
            var get_bitmap = this.get_bitmap.bind(this);
            var set_bitmap = this.set_bitmap.bind(this);
            var image_data = this.image_data;

            var compute = function (resolve, reject) {
                Promise.all(
                    [
                        createImageBitmap(image_data),
                        hash_hex_async()
                    ]
                ).then(function (results) {

                    var bmp = results[0];
                        bmp.hash = ""+results[1];
                    resolve(set_bitmap(bmp));
                }).catch(reject);
            };

            if(maybe && this.changes_.size === 0) {
                var b = get_bitmap();
                return hash_hex_async().then(function (h){
                    if(b.hash != "" && (""+h) == (""+b.hash)){
                        return Promise.resolve(b);
                    }else {
                        return new Promise(compute);
                    }
                })
            }else {

                return new Promise(compute);
            }
        }
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'hash_hex_async', {
    get: function() {
        "use strict";
        return function (data){
            "use strict";
            data = typeof data == "undefined" ? this.uint32_pixel_color_: data;
            var uint8a = Boolean(data instanceof Uint8Array || data instanceof Uint8ClampedArray) ?
                data:
                typeof data.buffer != "undefined" ?
                    new Uint8Array(data.buffer):
                    typeof data == "string" ?
                        new TextEncoder().encode(data):
                        Uint8ClampedArray.from(data);

            if(typeof (crypto || {}).subtle !== "undefined"){
                return new Promise(function (resolve, reject){
                    crypto.subtle.digest("SHA-256", uint8a).then(function (buffer){
                        resolve(new Uint8Array(buffer).map(function (byte_value){ return byte_value.toString(16).padStart(2, "0"); }).join(""));
                    }).catch(reject);
                });
            }else {

                return new Promise(function (resolve){
                    var xxhash = new h32(0xFADE);
                        xxhash.init(uint8a);
                    var str = xxhash.digest().toString(16);
                    resolve(str);
                });
            }
        }
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'data', {
    get: function() {
        "use strict";
        return this.uint32_pixel_color_;
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'get_index', {
    get: function() {
        "use strict";
        return function (index) {
            "use strict";
            index = (index | 0) >>> 0;
            return this.color_indexes_[index | 0];
        }
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'indexes', {
    get: function() {
        "use strict";
        return this.color_indexes_;
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'indexes_copy', {
    get: function() {
        "use strict";
        var length = this.color_indexes_.length|0;
        return this.color_indexes_.slice(0, length|0);
    },
    enumerable: false,
    configurable: false
});


Object.defineProperty(Layer.prototype, 'set_indexes', {
    get: function() {
        "use strict";
        return function (indexes){
            "use strict";
            var constructor = this.uint32_colors_.length < (1 << 8) ? Uint8Array : (this.uint32_colors_.length+1|0) < (1 << 16) ? Uint16Array: Uint32Array;
            if(indexes instanceof constructor){
                if(indexes.length !== this.color_indexes_.length) {
                    if(indexes.legend < this.color_indexes_.length) {
                        this.color_indexes_ = this.color_indexes_.slice(0, indexes.length);
                        this.color_indexes_.set(indexes, 0);
                    }else {
                        this.color_indexes_ = constructor.from(indexes);
                    }
                }else {
                    this.color_indexes_.set(indexes, 0);
                }
            }else {
                this.color_indexes_ = constructor.from(indexes);
            }

            this.force_update_data();
        };
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'get_color', {
    get: function() {
        "use strict";
        return function (index) {
            "use strict";
            index = (index | 0) >>> 0;
            return this.uint32_colors_[index | 0];
        }
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'colors', {
    get: function() {
        "use strict";
        return this.uint32_colors_;
    },
    enumerable: false,
    configurable: false
});


Object.defineProperty(Layer.prototype, 'colors_copy', {
    get: function() {
        "use strict";
        var length = this.uint32_colors_.length|0;
        return this.uint32_colors_.slice(0, length|0);
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'set_colors', {
    get: function() {
        "use strict";
        return function (colors){
            "use strict";
            this.uint32_colors_ = colors instanceof Uint32Array ? colors: Uint32Array.from(colors);
            this.force_update_data();
        };
    },
    enumerable: false,
    configurable: false
});


Object.defineProperty(Layer.prototype, 'changes', {
    get: function() {
        "use strict";
        return this.changes_.indexes;
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'changes_has', {
    get: function() {
        "use strict";
        return function (index) {
            "use strict";
            return this.changes_.has((index|0)>>>0);
        }
    },
    enumerable: false,
    configurable: false
});


Object.defineProperty(Layer.prototype, 'clear_changes', {
    get: function() {
        "use strict";
        return function () {
            "use strict";
            return this.changes_.clear();
        }
    },
    enumerable: false,
    configurable: false
});


Object.defineProperty(Layer.prototype, 'get_uint32', {
    get: function() {
        "use strict";
        return function (index) {
            "use strict";
            return (this.uint32_pixel_color_[(index|0)>>>0]|0)>>>0;
        }
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'set_uint32', {
    get: function() {
        "use strict";
        return function (index, uint32){
            "use strict";
            index = (index | 0) >>> 0;
            uint32 = (uint32 | 0) >>> 0;

            // Register change
            this.changes_.add(index|0);
            // Change the color within data
            this.uint32_pixel_color_[index|0] = (uint32 | 0) >>> 0;

            // Change the color within indexed color pixel matrix
            var pos = this.uint32_colors_.indexOf(this.uint32_pixel_color_[index|0]) | 0;
            if((pos|0) >= 0 && (pos|0) < (this.uint32_colors_.length|0)){ // Color already exist
                // Edit the index of the color used by the pixel at a specific position
                this.color_indexes_[index|0] = pos | 0;
                return false; // Didn't add a color
            }else {
                // Increase the index capability (eventually)
                switch (this.uint32_colors_.length | 0) {
                    case 0xFF:
                        this.color_indexes_ = Uint16Array.from(this.color_indexes_);
                        break;
                    case 0xFFFF:
                        this.color_indexes_ = Uint32Array.from(this.color_indexes_);
                        break;
                }

                // Add more space to the colors array
                var new_uint32_colors = new Uint32Array(this.uint32_colors_.length+1|0);
                    new_uint32_colors.set(this.uint32_colors_, 0);
                this.uint32_colors_ = new_uint32_colors;
                // Add color within the list and get its index while it updates
                pos = this.uint32_colors_.length-1|0;
                this.uint32_colors_[pos | 0] = (uint32|0) >>> 0;
                // Edit the index of the color used by the pixel at a specific position
                this.color_indexes_[index|0] = pos | 0;
                return true; // Added a color
            }
        }
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'paint_uint32a', {
    get: function() {
        "use strict";
        return function (pxl_indexes, color, opacity) {
            "use strict";
            color = (color | 0) >>> 0;
            opacity = Math.round(opacity * 255);
            let indexes_length = pxl_indexes.length|0;

            if(indexes_length > 0) {

                let sd_color = Color.new_uint32(color),  a = new Color(new ArrayBuffer(4)), i = 0;
                for (; (i | 0) < (indexes_length | 0); i = (i + 1 | 0) >>> 0) {
                    this.simdope_pixel_color_.get_element(pxl_indexes[i | 0], a).blend_first_with(sd_color, opacity, false, false);
                }
                for (i = 0; (i | 0) < (indexes_length | 0); i = (i + 1 | 0) >>> 0) {
                    this.set_uint32(pxl_indexes[i | 0], this.uint32_pixel_color_[pxl_indexes[i | 0]]);
                }
            }
        }
    },
    enumerable: false,
    configurable: false
});

Layer.prototype.auto_adjust_contrast = function (intensity) {
    "use strict";
    let min_sat = 100;
    let max_sat = 0;

    intensity = Math.round(parseFloat(intensity) * 255) | 0;
    let saturation = 0;
    let color;
    let colors = this.simdope_colors_;
    let length = colors.length;
    let hsla;
    let a = new Color(new ArrayBuffer(4));

    for(let i = 0; (i|0) < (length|0); i = (i+1|0)>>>0) {

        color = colors.get_element(i, a);
        saturation = color.hsla[1];
        if((color.a | 0) > 0) {
            if((saturation|0) > (max_sat|0)) {max_sat = saturation | 0;}
            if((saturation|0) < (min_sat|0)) {min_sat = saturation | 0;}
        }
    }

    const alpha = 100 / Math.max(1, max_sat - min_sat);
    const beta = -min_sat * alpha | 0;

    for(let i = 0; (i|0) < (length|0); i = (i+1|0)>>>0) {

        color = colors.get_element(i, a);
        hsla = color.hsla;
        color.blend_with(
            Color.new_hsla(
                hsla[0],
                hsla[1] * alpha + beta | 0,
                hsla[2],
                hsla[3]
            ), intensity, false, false);
    }

    this.force_update_data(true);
}


var Layers = function(image_data_array, meta_data_array, width, height){
    "use strict";

    if (!(this instanceof Layers)) {
        return new Layers(image_data_array, meta_data_array, width, height);
    }

    width = (width | 0) >>> 0;
    height = (height | 0) >>> 0;

    this.layers_ = new Array(image_data_array.length);
    this.metadata_ = new Array(meta_data_array.length);
    for(var i = 0; i < image_data_array.length; i++) {
        this.layers_[i] = new Layer(image_data_array[i], width, height);
    }
    for(var i = 0; i < meta_data_array.length; i++) {
        this.metadata_[i] = meta_data_array[i];
    }
};

module.exports = {
    Layer, Layers
}