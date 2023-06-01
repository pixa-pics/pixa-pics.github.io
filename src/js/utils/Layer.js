import {Colors, Color} from "simdope";
import {SetFixed} from "@asaitama/boolean-array";

var Layer = function(image_data, width, height){
    "use strict";

    if (!(this instanceof Layer)) {
        return new Layer(image_data, width, height);
    }

    width = (width | 0) >>> 0;
    height = (height | 0) >>> 0;

    this.uint32_pixel_color_ = new Uint32Array(0);
    if(typeof image_data.data != "undefined") { // image_data

         this.uint32_pixel_color_ = new Uint32Array(image_data.slice(0, image_data.length).reverse().buffer).reverse();
         this.width_ = width | 0;
         this.height_ = height | 0;
    }else if(image_data instanceof Uint8Array || image_data instanceof Uint8ClampedArray){ // uint32 buffer

        this.uint32_pixel_color_ = new Uint32Array(image_data.data.slice(0, image_data.data.length).reverse().buffer).reverse();
        this.width_ = image_data.width | 0;
        this.height_ = image_data.height | 0;
    }else {

        this.uint32_pixel_color_ = new Uint32Array(image_data);
        this.width_ = width | 0;
        this.height_ = height | 0;

    }

    this.uint32_colors_ = Uint32Array.from(new Set(this.uint32_pixel_color_));
    this.simdope_colors_ = new Colors(this.uint32_colors_.buffer);
    this.color_indexes_length_ = this.uint32_pixel_color_.length;
    this.color_indexes_ = this.uint32_colors_.length < (1 << 8) ? new Uint8Array(this.color_indexes_length_) : (this.uint32_colors_.length+1|0) < (1 << 16) ? new Uint16Array(this.color_indexes_length_): new Uint32Array(this.color_indexes_length_);

    for(var i = 0, l = this.color_indexes_length_ | 0; (i|0) < (l|0); i = (i + 1 | 0) >>> 0) {
        this.color_indexes_[i|0] = (this.uint32_colors_.indexOf(this.uint32_pixel_color_[i|0]) | 0) >>> 0;
    }
};

Layer.new_from_colors_and_indexes = function (colors, indexes, width, height) {
    var image_data_uint32_reversed = new Uint32Array(indexes.length);
    for(var i = 0, l = indexes.length | 0; (i|0) < (l|0); i = i + 1 | 0) {
        image_data_uint32_reversed[i|0] = (colors[indexes[i|0]|0] | 0) >>> 0;
    }
    return new Layer(image_data_uint32_reversed, width, height);
};

Object.defineProperty(Layer.prototype, 'force_update_data', {
    get: function() {
        "use strict";
        return function (){
            "use strict";
            for(var i = 0, l = this.color_indexes_length_ | 0; (i|0) < (l|0); i = (i + 1 | 0) >>> 0) {
                this.uint32_pixel_color_[i|0] = (this.uint32_colors_[this.color_indexes_[i|0]|0]|0) >>> 0;
            }
        };
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'image_data', {
    get: function() {
        "use strict";
        return new ImageData(new Uint8ClampedArray(this.uint32_pixel_color_.slice(0, this.uint32_pixel_color_.length).reverse().buffer).reverse(), this.width_, this.height_);
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(Layer.prototype, 'bitmap_async', {
    get: function() {
        "use strict";
        return createImageBitmap(this.image_data);
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

Object.defineProperty(Layer.prototype, 'get_uint32', {
    get: function() {
        "use strict";
        return function (index) {
            "use strict";
            index = (index | 0) >>> 0;
            return this.uint32_pixel_color_[index|0];
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

            // Change the color within data
            this.uint32_pixel_color_[index|0] = (uint32 | 0) >>> 0;

            // Change the color within indexed color pixel matrix
            var pos = this.uint32_colors_.indexOf(uint32 | 0) | 0;
            if((pos|0) >= 0){ // Color already exist
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
                // Add color within the list
                this.uint32_colors_ = this.uint32_colors_.concat(Uint32Array.of(uint32));
                pos = this.uint32_colors_.indexOf(uint32 | 0) | 0;
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
            color = color | 0;
            opacity = opacity * 255 | 0;
            let indexes_length = pxl_indexes.length|0;

            if(indexes_length > 0) {

                let sd_color_a = new Uint32Array(indexes_length);
                let sd_color_a2 = new Uint32Array(indexes_length);
                    sd_color_a2.fill(color | 0);

                let sd_colors = new Colors(sd_color_a);
                let sd_colors2 = new Colors(sd_color_a2);
                let a = new Color(new ArrayBuffer(4)), b = new Color(new ArrayBuffer(4));

                for (let i = 0; (i | 0) < (indexes_length | 0); i = (i + 1 | 0) >>> 0) {
                    sd_color_a[i | 0] = this.uint32_colors_[this.color_indexes_[pxl_indexes[i | 0] | 0]] & 0xFFFFFFFF;
                }

                for (let i = 0; (i | 0) < (indexes_length | 0); i = (i + 1 | 0) >>> 0) {
                    sd_colors.get_element(i | 0, a).blend_with(sd_colors2.get_element(i | 0, b), opacity, false, false);
                }

                let new_ui32_colors = sd_colors.subarray_uint32(0, indexes_length);
                for (let i = 0; (i | 0) < (indexes_length | 0); i = (i + 1 | 0) >>> 0) {
                    this.set_uint32(pxl_indexes[i | 0], new_ui32_colors[i | 0]);
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

    intensity = parseFloat(intensity) * 255 | 0;
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

    this.force_update_data();
}