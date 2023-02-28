"use strict";
/*
The MIT License (MIT)

Copyright (c) 2022 - 2022 Matias Affolter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

/*
var t = function(buffer) {
    "use strict";

// Inspired by https://en.wikipedia.org/wiki/Rec._709
    var imul = function(a, b){
        var ah = (a >>> 16) & 0xffff,
            al = a & 0xffff,
            bh = (b >>> 16) & 0xffff,
            bl = b & 0xffff;
        return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
    };
    var round = function (n) { return Math.round(n)|0; }
    var fr = Math.fround;
    var p2 = function(x){ x = x|0; return imul(x|0, x|0)|0; };
    var s = function(x){

        // Base cases
        x = (x | 0)>>>0;
        if ((x|0) == 0 || (x|0) == 1){

            return x | 0;
        }

        // Starting from 1, try all
        // numbers until i*i is
        // greater than or equal to x.
        var i = 1;
        var result = 1;

        while ((result|0) <= (x|0)) {
            i = (i+1|0)>>>0;
            result = (i * i | 0)>>>0;
        }

        return (i - 1 | 0)>>>0;
    };
    var PR = fr(0.299), // +0.08
        PG = fr(0.587), // -0.16
        PB = fr( 0.114), // +0.08
        PA = fr(1.0000);

    var RD = 255,
        GD = 255,
        BD = 255,
        AD = 255;

// Euclidean or Manhattan color distance
    var EUCLMAX = (s(PR*RD*RD + PG*GD*GD + PB*BD*BD | 0) | 0) >>> 0;

    function plus_uint(a, b) {
        return (a + b | 0) >>> 0;
    }
    function multiply_uint(a, b) {
        return Math.imul(a|0, b|0)|0;
    }
    function multiply_uint_4(a) {
        return a << 2;
    }
    function divide_uint(a, b) {
        return (a / b | 0) >>> 0;
    }
    function divide_4_uint(n) {
        return (n >> 2 | 0) >>>0;
    }
    function divide_16_uint(n) {
        return (n >> 4 | 0) >>> 0;
    }
    function divide_32_uint(n) {
        return (n >> 5 | 0) >>>0;
    }
    function divide_64_uint(n) {
        return (n >> 6 | 0) >>>0;
    }
    function divide_85_uint(n) {
        return (n / 85 - 0.012 | 0) >>>0;
    }
    function divide_128_uint(n) {
        return (n >> 7 | 0) >>> 0;
    }
    function clamp_int(x, min, max) {
        x = x | 0;
        min = min | 0;
        max = max | 0;
        return (x < min ? min: x > max ? max: x) | 0;
    }
    function clamp_uint8(n) {
        return (n | 0) & 0xFF;
    }
    function inverse_255(n) {
        return (255 - n | 0) & 0xFF;
    }
    function divide_255(n) {
        return (n / 255 | 0) & 0xFF;
    }
    function clamp_uint32(n) {
        return ((n|0)>>>0) >>> 0;
    }
    function uint_not_equal(a, b) {
        return (a | 0) != (b | 0);
    }
    function uint_equal(a, b) {
        return (a | 0) == (b | 0);
    }
    function abs_int(n) {
        return (n | 0) < 0 ? (-n | 0) : (n | 0);
    }


// NEW BASIC : Number object with 4 times 0-255
    var SIMDopeColor = function(with_main_buffer, offset_4bytes){
        "use strict";
        offset_4bytes = offset_4bytes || 0;
        if (!(this instanceof SIMDopeColor)) {
            return new SIMDopeColor(with_main_buffer, offset_4bytes);
        }

        if(with_main_buffer instanceof Uint8Array) {

            this.storage_uint8_ =  with_main_buffer;
        }else {

            this.storage_uint8_ = new Uint8Array("buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer, imul(offset_4bytes, 4));
        }
    };

    SIMDopeColor.new_of = function(r, g, b, a) {
        "use strict";
        var uint8ca = new Uint8Array(4);
        uint8ca[3] = clamp_uint8(r);
        uint8ca[2] = clamp_uint8(g);
        uint8ca[1] = clamp_uint8(b);
        uint8ca[0] = clamp_uint8(a);
        return SIMDopeColor(uint8ca);
    }

    // Properties of number object
    Object.defineProperty(SIMDopeColor.prototype, 'r', {
        get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[3]); },
    });
    Object.defineProperty(SIMDopeColor.prototype, 'g', {
        get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[2]); },
    });
    Object.defineProperty(SIMDopeColor.prototype, 'b', {
        get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[1]); },
    });
    Object.defineProperty(SIMDopeColor.prototype, 'a', {
        get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[0]); },
    });

    Object.defineProperty(SIMDopeColor.prototype, 'uint32', {
        get: function() { "use strict";
            return ((this.storage_uint8_[3] << 24) | (this.storage_uint8_[2] << 16) | (this.storage_uint8_[1] <<  8) | this.storage_uint8_[0]) >>> 0;
        }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'rgbaon4bits', {
        get: function() {
            "use strict";
            var r = divide_128_uint(this.storage_uint8_[3]);
            var g = divide_128_uint(this.storage_uint8_[2]);
            var b = divide_128_uint(this.storage_uint8_[1]);
            var a = divide_128_uint(this.storage_uint8_[0]);

            return ((r << 3) | (g << 2) | (b <<  1) | (a << 0) | 0) >>> 0;
        }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'rgbaon6bits', {
        get: function() {
            "use strict";
            var r = divide_85_uint(this.storage_uint8_[3]);
            var g = divide_85_uint(this.storage_uint8_[2]);
            var b = divide_85_uint(this.storage_uint8_[1]);
            var a = divide_85_uint(this.storage_uint8_[0]);

            return ((r ^ 0b010000) + (g ^ 0b001000) + (b ^ 0b000100) + (a ^ 0b000000) | 0) >>> 0;
        }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'rgbaon8bits', {
        get: function() {
            "use strict";
            var r = divide_64_uint(this.storage_uint8_[3]);
            var g = divide_64_uint(this.storage_uint8_[2]);
            var b = divide_64_uint(this.storage_uint8_[1]);
            var a = divide_64_uint(this.storage_uint8_[0]);

            return ((r << 6) | (g << 4) | (b <<  2) | (a << 0) | 0) >>> 0;
        }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'rgbaon12bits', {
        get: function() {
            "use strict";
            var r = divide_32_uint(this.storage_uint8_[3]);
            var g = divide_32_uint(this.storage_uint8_[2]);
            var b = divide_32_uint(this.storage_uint8_[1]);
            var a = divide_32_uint(this.storage_uint8_[0]);

            return ((r << 9) | (g << 6) | (b <<  3) | (a << 0) | 0) >>> 0;
        }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'offset', {
        get: function() {"use strict"; return divide_4_uint(this.storage_uint8_.byteOffset);}
    });

    Object.defineProperty(SIMDopeColor.prototype, 'buffer', {
        get: function() { "use strict"; return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset, plus_uint(this.storage_uint8_.byteOffset, 4)); }
    });
    Object.defineProperty(SIMDopeColor.prototype, 'subarray', {
        get: function() { "use strict"; return this.storage_uint8_.subarray(0, 4); }
    });
    Object.defineProperty(SIMDopeColor.prototype, 'set', {
        get: function() { "use strict"; return function(with_buffer) {

            if(with_buffer instanceof SIMDopeColor) {

                this.storage_uint8_.set(new Uint8Array(with_buffer.buffer));

            }else if("subarray" in with_buffer) {

                this.storage_uint8_.set(with_buffer.subarray(0, 4));
            }else {

                this.storage_uint8_.set(with_buffer);
            }
        }}
    });
    Object.defineProperty(SIMDopeColor.prototype, 'slice', {
        get: function() { "use strict"; return function(start, end) { return this.storage_uint8_.slice(start, end); }}
    });

    SIMDopeColor.prototype.is_fully_transparent = function() {
        return uint_equal(this.a, 0);
    };

    SIMDopeColor.prototype.is_not_fully_transparent = function() {
        return uint_not_equal(this.a, 0);
    };

    SIMDopeColor.prototype.simplify = function(of) {
        var temp = Uint8Array.of(
            multiply_uint(round(this.a / of), of),
            multiply_uint(round(this.b / of), of),
            multiply_uint(round(this.g / of), of),
            multiply_uint(round(this.r / of), of),
        );
        this.set(temp);
        return this;
    }

    SIMDopeColor.prototype.blend_with = function(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

        should_return_transparent = should_return_transparent | 0;
        alpha_addition = alpha_addition | 0;

        added_uint8x4.multiply_a_1000(amount_alpha|0);

        if((should_return_transparent|0)!=0) {

            if(this.is_fully_transparent()) {
                added_uint8x4.set(new ArrayBuffer(4));
            }else if(added_uint8x4.is_fully_transparent()) {
                this.set(new ArrayBuffer(4));
            }
        }else {

            var alpha = (alpha_addition|0) != 0 ?
                divide_uint(plus_uint(this.a, added_uint8x4.a), 2):
                inverse_255(divide_255(imul(inverse_255(added_uint8x4.a), inverse_255(this.a))));

            this.set(SIMDopeColor.merge_scale_of_255_a_fixed(
                added_uint8x4, divide_uint(imul(added_uint8x4.a, 255), alpha),
                this, divide_255(imul(this.a, divide_uint(imul(inverse_255(added_uint8x4.a), 255), alpha))),
                alpha
            ));

            added_uint8x4.set(this);
        }
    };

    SIMDopeColor.prototype.euclidean_match_with = function(color, threshold_1000) {
        "use strict";

        threshold_1000 = (threshold_1000 | 0) >>> 0;
        if((threshold_1000|0) == 1000) {

            return true;
        }else if((threshold_1000|0) == 0){

            return ((this.uint32|0) == (color.uint32|0));
        }else {

            var ao = ((255-abs_int(this.a - color.a|0)|0)/AD*PA);
            return (s(
                PR * p2(this.r - color.r | 0) +
                PG * p2(this.g - color.g | 0) +
                PB * p2(this.b - color.b | 0)
            ) / EUCLMAX * 1000 | 0) < (threshold_1000*ao|0);
        }
    };

    SIMDopeColor.prototype.multiply_a_1000 = function(n) {
        "use strict";
        this.subarray[0] = clamp_uint8(divide_uint(imul(this.a, n), 1000));
    };
    SIMDopeColor.prototype.copy = function(a) {
        "use strict";
        return SIMDopeColor(this.slice(0, 4));
    };

    // get a the number object wile modifying property values
    SIMDopeColor.with_a = function(t, a) {
        "use strict";
        var ta = t.slice(0, 4);
        ta[0] = clamp_uint8(a);
        return SIMDopeColor(ta);
    };
    SIMDopeColor.merge_scale_of_255_a_fixed = function(t1, of1, t2, of2, alpha) {

        of1 = clamp_uint8(of1);
        of2 = clamp_uint8(of2);
        alpha = clamp_uint8(alpha);

        return SIMDopeColor.merge_with_a_fixed(
            SIMDopeColor.scale_rgb_of_on_255(t1, of1, of1, of1),
            SIMDopeColor.scale_rgb_of_on_255(t2, of2, of2, of2),
            alpha
        );
    }

    SIMDopeColor.scale_rgb_of_on_255 = function(t, of_r, of_g, of_b) {
        return SIMDopeColor(
            Uint8Array.of(
                0,
                divide_255(imul(t.b, of_b)),
                divide_255(imul(t.g, of_g)),
                divide_255(imul(t.r, of_r))
            )
        );
    }

    SIMDopeColor.merge_with_a_fixed = function(t1, t2, alpha) {
        return SIMDopeColor(
            Uint8Array.of(
                clamp_uint8(alpha),
                plus_uint(t1.b, t2.b),
                plus_uint(t1.g, t2.g),
                plus_uint(t1.r, t2.r),
            )
        );
    }

    var SIMDopeColors = function(with_main_buffer, bytes_offset, bytes_length){
        "use strict";

        if (!(this instanceof SIMDopeColors)) {
            return new SIMDopeColors(with_main_buffer);
        }

        this.storage_ = "buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer;

        bytes_offset = bytes_offset | 0;
        bytes_length = (bytes_length | 0) || (this.storage_.byteLength | 0);

        this.storage_uint8_array_ = new Uint8Array(this.storage_, bytes_offset, bytes_length);
        this.storage_uint32_array_ = new Uint32Array(this.storage_, bytes_offset, divide_4_uint(bytes_length));
    };

    Object.defineProperty(SIMDopeColors.prototype, 'length', {
        get: function() { "use strict"; return this.storage_uint32_array_.length; }
    });
    Object.defineProperty(SIMDopeColors.prototype, 'buffer', {
        get: function() { "use strict"; return this.storage_uint8_array_.buffer; }
    });
    Object.defineProperty(SIMDopeColors.prototype, 'buffer_setUint8', {
        get: function() { "use strict"; return function (i, n) {
            i = i | 0;
            n = n | 0;
            return this.storage_uint8_array_[i] = clamp_uint8(n);
        }}
    });
    Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint8', {
        get: function() { "use strict"; return function (i) {
            i = i | 0;
            return this.storage_uint8_array_[i];
        }}
    });
    Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint8a', {
        get: function() { "use strict"; return function (i, n) {
            i = i|0;
            n = n|0; n = n || 1;
            n = plus_uint(i, multiply_uint_4(n));
            return this.storage_uint8_array_.subarray(i, n);
        }}
    });
    Object.defineProperty(SIMDopeColors.prototype, 'buffer_setUint32', {
        get: function() { "use strict"; return function (i, n) {
            this.storage_uint32_array_[i|0] = clamp_uint32(n);
        }}
    });
    Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint32', {
        get: function() { "use strict"; return function (i) {
            return  this.storage_uint32_array_[i|0];
        }}
    });
    Object.defineProperty(SIMDopeColors.prototype, 'subarray_uint32', {
        get: function() { "use strict"; return function (start, end){ start = start|0; end = end | 0; end = end || this.length; return this.storage_uint32_array_.subarray(start, end); }}
    });
    Object.defineProperty(SIMDopeColors.prototype, 'slice_uint32', {
        get: function() { "use strict"; return function (start, end){ start = start|0; end = end | 0; end = end || this.length; return this.storage_uint32_array_.slice(start, end); }}
    });
    Object.defineProperty(SIMDopeColors.prototype, 'subarray_uint8', {
        get: function() { "use strict"; return function (start, end){ start = start | 0; end = end | 0; return this.storage_uint8_array_.subarray(multiply_uint_4(start), multiply_uint_4(end)); }}
    });
    Object.defineProperty(SIMDopeColors.prototype, 'slice_uint8', {
        get: function() { "use strict"; return function (start, end){ start = start | 0; end = end | 0; return this.storage_uint8_array_.slice(multiply_uint_4(start), multiply_uint_4(end)); }}
    });

    SIMDopeColors.prototype.get_element = function (i) {
        return SIMDopeColor(this.buffer, i|0);
    }
    SIMDopeColors.prototype.subarray = function (i, n) {
        i = i | 0;
        n = n | 0;
        return this.buffer_getUint8a(i, n);
    }

    var QuantiMat = function(opts) {
        "use strict";
        opts = opts || {};

        if (!(this instanceof QuantiMat)) {
            return new QuantiMat(opts);
        }

        opts.pxl_colors = opts.pxl_colors || new Uint32Array(0);
        opts.pxls = opts.pxls || new Uint32Array(0);
        this.new_pxls_ = "buffer" in opts.pxls ? new Uint32Array(opts.pxls.buffer) : Uint32Array.from(opts.pxls);
        this.new_pxl_colors_ = "buffer" in opts.pxl_colors ? SIMDopeColors(opts.pxl_colors.buffer) : SIMDopeColors(Uint32Array.from(opts.pxl_colors));

        this.is_bucket_threshold_auto_ = Boolean(opts.bucket_threshold > 1000);
        opts.bucket_threshold = opts.bucket_threshold || 0;
        opts.bucket_threshold = (opts.bucket_threshold|0) >= 1 ? (opts.bucket_threshold | 0):  opts.this_state_bucket_threshold || 0;

        this.bucket_threshold_ = this.is_bucket_threshold_auto_ ? 1: opts.bucket_threshold;
        this.threshold_steps_ = this.is_bucket_threshold_auto_ ? 1: this.new_pxl_colors_.length > 16384 ? 1: this.new_pxl_colors_.length > 8192 ? 2: this.new_pxl_colors_.length > 2048 ? 3: this.new_pxl_colors_.length > 512 ? 4: 5;
        this.best_color_number_ = this.new_pxl_colors_.length / 2 + opts.color_number_bonus | 0;

        this.max_cluster_ = this.new_pxl_colors_.length > 16384 ? 4096+1: this.new_pxl_colors_.length > 8192 ? 256+1: this.new_pxl_colors_.length > 2048 ? 64+1: this.new_pxl_colors_.length > 512 ? 16+1: 1;
        this.index_clusters_ = new Array(this.max_cluster_);
        this.length_clusters_ = new Uint32Array(this.max_cluster_);

        this.pxl_colors_usage_ = new Uint32Array(this.new_pxl_colors_.length);
        this.all_index_clusters_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_lookup_ = {};

        // We will compute how "frequent" the color-set of each cluster is within area of 16x16
        // this.area_size = 16;
        // this.height = opts.height;
        // this.width = opts.width;
        // this.area_x_length = 1+this.width/this.area_size|0;
        // this.area_y_length = 1+this.height/this.area_size|0;
        // this.area_boxes = new Array(this.area_x_length * this.area_y_length).fill(new Uint8Array(this.max_cluster_))

    };

    Object.defineProperty(QuantiMat.prototype, 'reset_deduplicate', {
        get: function() { "use strict"; return function(length) {
            "use strict";
            this.clean_pxl_colors_lookup_ = {};
            this.pxl_colors_usage_.fill(0, 0, length|0);
            this.clean_pxl_colors_.fill(0, 0, length|0);
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'index_of_color_within_cleaned', {
        get: function() { "use strict"; return function(color) {
            "use strict";
            return (this.clean_pxl_colors_lookup_[(color|0)>>>0]|0) - 1 | 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_cleaned_pxl_colors', {
        get: function() { "use strict"; return function(index, color) {
            "use strict";
            this.clean_pxl_colors_[(index|0)>>>0] = (color|0) >>> 0;
            this.clean_pxl_colors_lookup_[(color|0)>>>0] = (index+1|0)>>>0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'increase_color_usage', {
        get: function() { "use strict"; return function(color_index) {
            "use strict";
            this.pxl_colors_usage_[(color_index|0)>>>0] = (this.pxl_colors_usage_[(color_index|0)>>>0]+1|0)>>>0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_new_pxls', {
        get: function() { "use strict"; return function(pixel_index, color_index) {
            "use strict";
            this.new_pxls_[(pixel_index|0)>>>0] = (color_index | 0) >>> 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_new_pxl_colors', {
        get: function() { "use strict"; return function(pxl_colors_length) {
            "use strict";
            this.new_pxl_colors_ = SIMDopeColors(this.clean_pxl_colors_.buffer.slice(0, multiply_uint_4(pxl_colors_length|0)));
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_a_new_pxl_color_from_pxl_index', {
        get: function() {return function(index){return this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[index|0])&0xFFFFFFFF;}}
    });

    Object.defineProperty(QuantiMat.prototype, 'reset_cluster', {
        get: function() { "use strict"; return function() {
            "use strict";
            this.max_cluster_ = this.new_pxl_colors_.length > 32768 ? 4096+1: this.new_pxl_colors_.length > 16385 ? 256+1: this.new_pxl_colors_.length > 8192 ? 64+1: this.new_pxl_colors_.length > 2048 ? 16+1: 1;
            this.length_clusters_.fill(0, 0, this.max_cluster|0);
            for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){ this.index_clusters_[c|0] = [];}
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'add_in_indexes_cluster', {
        get: function() { "use strict"; return function(cluster_index, color_index) {
            "use strict";
            this.index_clusters_[(cluster_index|0)>>>0].push((color_index|0)>>>0);
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_all_cluster_indexes', {
        get: function() { "use strict"; return function() {
            "use strict";
            var c = 0;
            var offset = 0;
            for(c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){
                this.all_index_clusters_.set(this.index_clusters_[(c|0)>>>0], (offset|0)>>>0);
                offset = (offset + this.get_length_in_index_clusters(c|0) | 0) >>> 0;
            }

        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_length_in_index_clusters', {
        get: function() { "use strict"; return function(i) {
            "use strict";
            return (this.index_clusters_[(i|0)>>>0].length | 0) >>> 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_in_cluster_lengths', {
        get: function() { "use strict"; return function(cluster_index) {
            "use strict";
            return (this.length_clusters_[(cluster_index|0)>>>0]|0)>>>0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_an_index_in_clusters', {
        get: function() {return function(index){return (this.all_index_clusters_[index|0] | 0)>>>0;}}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_a_color_usage', {
        get: function() {return function(index){return (this.pxl_colors_usage_[index|0] | 0) >>> 0;}}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_a_color_usage', {
        get: function() {return function(index, usage){return this.pxl_colors_usage_[index|0] = (usage|0)>>>0;}}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_a_color_usage_percent', {
        get: function() {return function(index){return this.pxl_colors_usage_[index|0] / this.new_pxls_.length;}}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_average_color_usage_percent', {
        get: function() {return function(start, stop){

            start = start | 0;
            stop = stop | 0;
            stop = (stop < start ? this.pxl_colors_usage_.length: stop) | 0;

            var p = 0.0;
            var x = 0;
            var index_of_color_a = 0;

            for(x = start|0; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x | 0) >>> 0) | 0) >>> 0;
                p += this.pxl_colors_usage_[index_of_color_a|0] / this.new_pxls_.length;
            }

            return p / (stop-start|0);
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_a_new_pxl_color', {
        get: function() {return function(index){return this.new_pxl_colors_.get_element(index|0);}}
    });
    Object.defineProperty(QuantiMat.prototype, 'max_cluster', {
        get: function() {return this.max_cluster_ | 0;}
    });
    Object.defineProperty(QuantiMat.prototype, 'threshold_steps', {
        get: function() {return this.threshold_steps_ | 0;}
    });
    Object.defineProperty(QuantiMat.prototype, 'new_pxls_length', {
        get: function() {return this.new_pxls_.length | 0;}
    });
    Object.defineProperty(QuantiMat.prototype, 'new_pxl_colors_length', {
        get: function() {return this.new_pxl_colors_.length | 0;}
    });
    Object.defineProperty(QuantiMat.prototype, 'best_color_number', {
        get: function() {return this.best_color_number_ | 0;}
    });
    Object.defineProperty(QuantiMat.prototype, 'bucket_threshold', {
        get: function() {return this.bucket_threshold_ | 0;}
    });
    Object.defineProperty(QuantiMat.prototype, 'is_bucket_threshold_auto', {
        get: function() {return this.is_bucket_threshold_auto_;}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_bucket_threshold', {
        get: function() {return function(value){
            this.bucket_threshold_ = value | 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_data', {
        get: function() {return function(){

            return Array.of(this.new_pxls_, this.new_pxl_colors_.slice_uint32(0, this.new_pxl_colors_.length));
        }}
    });

    QuantiMat.prototype.output = function(format) {

        var format = format || "heap";
        var data = this.get_data();

        if(format == "heap") {

            var array_buffer = new Uint32Array(2+data[0].length+data[1].length);
                array_buffer[0] = (data[0].length | 0) & 0xFFFFFFFF;
                array_buffer[1] = (data[1].length | 0) & 0xFFFFFFFF;
                array_buffer.set(data[0], 2);
                array_buffer.set(data[1], 2+data[0].length);

            return array_buffer.buffer;
        }else {

            return data;
        }
    }

    QuantiMat.prototype.deduplicate = function() {
        "use strict";

        this.reset_deduplicate(this.new_pxl_colors_length|0);

        var clean_pxl_colors_length = 0;
        var color = 0;
        var color_index = 0;
        var not_found = -1;
        var i = 0;
        var npl = this.new_pxls_length | 0;

        // Remove duplicate : repopulate the color palette and rewrite each pixel index
        for(;(i|0) < (npl|0); i = (i + 1 | 0)>>>0) {

            color = this.get_a_new_pxl_color_from_pxl_index(i|0) | 0;
            color_index = this.index_of_color_within_cleaned(color|0) | 0;

            if((color_index|0) == (not_found|0)) {
                this.set_cleaned_pxl_colors(clean_pxl_colors_length|0, color|0);
                color_index = clean_pxl_colors_length | 0;
                clean_pxl_colors_length = clean_pxl_colors_length+1|0;
            }

            this.increase_color_usage(color_index|0);
            this.set_new_pxls(i|0, color_index|0);
        }

        // Set the brand-new colors and length
        this.set_new_pxl_colors(clean_pxl_colors_length);
    }

    QuantiMat.prototype.clusterize = function() {
        "use strict";

        this.reset_cluster();

        var l = 0;

        if(this.max_cluster === 4096+1) {

            for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon12bits|0)>>>0, (l|0)>>>0);
            }
        }else if( this.max_cluster ===  256+1) {

            for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon8bits|0)>>>0, (l|0)>>>0);
            }
        }else if(this.max_cluster === 64+1){

            for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon6bits|0)>>>0, (l|0)>>>0);
            }
        }else if(this.max_cluster === 16+1){

            for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon4bits|0)>>>0, (l|0)>>>0);
            }
        }else if(this.max_cluster === 1){

            for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                this.add_in_indexes_cluster(0, (l|0)>>>0);
            }
        }

        this.set_all_cluster_indexes();
    }

    QuantiMat.prototype.process_threshold = function(t) {
        "use strict";

        t = (t | 0) >>> 0;
        var threshold_1000 = this.bucket_threshold * (t / this.threshold_steps) | 0;
        var weight_applied_to_color_usage_difference = t / this.threshold_steps;

        var index_merged = false;
        var latest_color = {};
        var start = 0;
        var stop = 0;
        var color_a, color_b;
        var color_a_usage = 0;
        var color_b_usage = 0;
        var first_color_more_used = false;
        var color_usage_difference_positive = 0.0;
        var weighted_threshold = 0.0;
        var index_of_color_a = 0;
        var index_of_color_b = 0;
        var x = 0, y = 0;
        var color_n_in_cluster = 0;

        for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

            color_n_in_cluster = (this.get_length_in_index_clusters(c|0) | 0) >>> 0;
            stop = (start + color_n_in_cluster | 0) >>> 0;

            for(x = start|0; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;

                // Update color usage and relative variables
                color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
                color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;

                // Start following color snake
                latest_color = {value: color_a};

                if((color_a_usage|0) > 0 && color_a.is_not_fully_transparent()) {

                    // Start following color snake
                    latest_color = {value: color_a};

                    for(y = start|0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                        index_of_color_b = (this.get_an_index_in_clusters((y|0)>>>0)|0)>>>0;
                        // Update color usage and relative variables
                        color_b = this.get_a_new_pxl_color(index_of_color_b|0);
                        color_b_usage = (this.get_a_color_usage(index_of_color_b|0) | 0) >>> 0;

                        if((color_b_usage|0) > 0 && color_b.is_not_fully_transparent()) {

                            first_color_more_used = (color_a_usage|0) > (color_b_usage|0);
                            color_usage_difference_positive = (first_color_more_used ? (1000 * color_b_usage / color_a_usage | 0): (1000 * color_a_usage / color_b_usage | 0)) & 1000;

                            // 1x Threshold + 1x weight
                            weighted_threshold =
                                ((
                                    // Threshold and weight applied to threshold divided by what is not the threshold
                                    ((threshold_1000 / 1000) + (threshold_1000 / 1000 * weight_applied_to_color_usage_difference)) /
                                    (1 + weight_applied_to_color_usage_difference)
                                ) * 1000 | 0) >>> 0;  // THRESHOLD + THRESHOLD * WEIGHT / 1 + WEIGHT

                            // The less a color is used the less it requires a great distance to be merged (so we don't have many color used only a few time in the whole image, heavily used color gets preserved better than lowly used ones)
                            if(color_a.euclidean_match_with(color_b,  weighted_threshold|0)) {

                                // Update color usage and relative variables
                                index_merged = true;
                                color_a_usage = (color_a_usage + color_b_usage | 0) >>> 0;
                                this.set_a_color_usage(index_of_color_a|0, color_a_usage|0);
                                this.set_a_color_usage(index_of_color_b|0, 0);

                                // Adds color to blend to processed colors and stack it to what will be set to be equals with all other color blended
                                latest_color.tail = {value: this.get_a_new_pxl_color(index_of_color_b|0)};
                                latest_color = latest_color.tail;

                                // Blend the two colors according to their usage's weight
                                if(first_color_more_used) {
                                    color_a.blend_with(color_b, color_usage_difference_positive|0, false, false);
                                }else {
                                    color_b.blend_with(color_a, color_usage_difference_positive|0, false, false);
                                }
                            }
                        }
                    }
                }

                if(index_merged) {
                    while (typeof latest_color != "undefined") {
                        latest_color.value.set(color_a);
                        latest_color = latest_color.tail;
                    }
                }
            }

            start = stop | 0;
        }

        return index_merged;
    }


    QuantiMat.prototype.round = function() {
        "use strict";

        if(this.new_pxl_colors_length > 4096) {

            var simplify_of = this.new_pxl_colors_.length > 65536 ? 8.0: this.new_pxl_colors_.length > 32768 ? 6.4: this.new_pxl_colors_.length > 16384 ? 4.8: this.new_pxl_colors_.length > 8192 ? 3.2: this.new_pxl_colors_.length > 4096 ? 1.6: 1;
            for(var l = 0; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {
                this.get_a_new_pxl_color((l|0)>>>0).simplify(simplify_of);
            }
        }
    };

    QuantiMat.prototype.init = function() {
        "use strict";
        this.round();
        this.deduplicate();
        this.clusterize();
        return this;
    };

    QuantiMat.prototype.run =  function() {
        "use strict";

        var bucket_threhold_stepover = 5;
        var is_bucket_threshold_auto_goal_reached = false;

        while (!is_bucket_threshold_auto_goal_reached) {

            for (var t = 1; (t|0) <= (this.threshold_steps|0); t = (t+1|0)>>>0) {

                if(this.process_threshold(t|0)) {
                    this.deduplicate();
                    this.clusterize();
                }
            }

            if(!this.is_bucket_threshold_auto && this.bucket_threshold > this.threshold_steps){

                is_bucket_threshold_auto_goal_reached = true;
            }else if(this.new_pxl_colors_length < this.best_color_number){

                break;
            }

            this.set_bucket_threshold(this.bucket_threshold+bucket_threhold_stepover|0);
        }

        return this;
    };

    var data_view = new Uint32Array(buffer);
    var pxls_length = data_view[0];
    var pxl_colors_length = data_view[1];
    var bucket_threshold = data_view[2];
    var threshold_steps = data_view[3];
    var color_number_bonus = data_view[4];
    var best_color_number = data_view[5];
    var this_state_bucket_threshold = data_view[6];
    var width = data_view[7];
    var height = pxls_length / width;
    var pxls = data_view.slice(7, 7+pxls_length);
    var pxl_colors = data_view.slice(7+pxls_length, 7+pxls_length+pxl_colors_length);

    return new Promise(function(resolve){
        "use strict";

        resolve(QuantiMat({
            pxls,
            pxl_colors,
            bucket_threshold,
            threshold_steps,
            color_number_bonus,
            best_color_number,
            this_state_bucket_threshold,
            width,
            height
        }).init().run().output("heap"));
    });
};*/

// https://www.digitalocean.com/community/tools/minify MINIFY --> var t=function...... AND ADD : return t;

import {load as LZEL_92} from "../../../utils/LZEL_92_loader";

const ReducePalette = {

    _create_func: function (){
        return LZEL_92("UraniumJS! H~=2;M|%wbkh6l,m=mrS QoR?r+e[L#JRHYqELL,DXI+.FaV~+AutxH3bCH]F2:fcAOSXwaQ=L3¡~D5A4}J@mMQ%oTY=>y60(+MDr |X->FQ;,n~!~tLTTZJ6hw;[<7b<9!NC2on[ %}yC[kgNN!§C@@!Z&rJszB>Ku+<7W, QBV)Wreyq1Dlr9m4<)#OiK@8w.KI!wlo5kg)avx,vrQZX9)%vV{78w={@2>7@?74HfB+hH=%!Y4<SF#¡tR%e*-x< t3BV¡Iq3kZ>6@q<%,¡X¡2kEd=!<VFDxP6#fCX[y4r#uI&-BxkF^{Yz[k¡Z4e]kf{{ pG6}{h?(R<Sy.iRv(20Q)V>_[*kJIPG%ekY<jMAE=AcR-gJ<KHdbz§iw2=CrF:s-siv%?K l)6ECNEfps4gi2Wd|HmDh)Z>CU<;2cqt=(-)NJ-k3%lCDgf]W9u4qiqf[X~!(gmsXd;dw5¡0qZI&¡g¡,VK#tX-0#<LAwzS1Mgh§§xdGdFD %iwVtS)#f_%Nt,OPU&UTV+zJX4sW%imXv4Ik{_87bVP7U>§)FP1F&#>&_!o7%*#qe>xg~{4wLM,x9(r&uqIu§ &r[k>,O^[2!|CJPgbHq{#GS#,[XTDDuKJ8yURBaoq3EnCT@UjwaZc5apuEiMcfU~DGd9S?G*FhNB;!Hxo_%Sqm])Fgso+[QAFEAMxG@-+GGCT{1k5LroMI(§ OvYdIWHz|-MZ^vNtEA|[|qb§O7D:yJiJ*af7V7B#F0ZfcOTL^(Eo|d|dH86OYZ)|Pj2DK46KJ9,G7ML<xJcaC^m%]_H93^}&cD~Bv#@:Y7Vx}?WM280opfKLT?]w|:2+T§,( zyeXQrJy?M@.R0UfnJ>+tZ<E-*tMI-[l5cJ?zCML=M2FkU7(FHl@e2dN:_Xspl(*@R.gT.ZzchuJk|,<gb..¡Eon&JY#8dhgHd(pJ|)w*Lk5mxuLqD0yPkJ0)jubA-§DiwW-X?|r8G,YUk5(sDPdVg{GB5Z*s]|9,Hl8UfEIJ%9APE8NVo?%rE4ev2E5dw)oZTnTFcg+f:1^_!:H5>XbM9~D)hG+th7|e6m =~YaBvik<{7^)0GO0yZD9Gz.V0k>ES-S-Pc0Nn0uHfO}gWJ §&.!jZ-Zo~AE0Yn^,htLVYN~|PH7qZkSaq~{FAC5(<Jk%_^zqYA[r;+JOton:]!^*Z1aW(aT5trCd§O!h§)n+GE¡r7YD;U1?).!+L [s7!]Z~1P1¡xaZw¡x@d&WXIR*t(D:?e(RS1IRM<ouy8+*oXB<5W§WNBsAua!4*X|KEdWxF&OD.j(fULuA1zByB]<v V7aCkE%7^t~V0;[No;7DdRtKvHBWM]W3z-E>{1qM?R_Y?IvM7^hwI1tr:c6N:*=tr>.a#~+cbt¡.CtUc~q;HPi4+oQuUk(|_!*xPpH;>g NRIw1MSjALitlIG3-lq*#EX+§i^O8^V VK%K c7~dK7ke6rQ0?F!vV+#ngzT%dAO.6HX[i+yh+n8a%3<p1Do6F#zU.{9]k¡px|0;LMP)T¡rOZVurRune3Rf7hPk_E_-w~§?8@e9.¡mSU=s9#>BCH{FmwcWXXuhGsFesOLG[gdTo]2lmI+0{0uWc,27FtQ^oV[{<o!?!Fz<yS70T6H=WC8h|GXu,CF)?0q@p~Kr++ipZ>¡¡7[jyDueZ32F^iML>5:U k5<_qb>+Ji2#5SBW;b7}1h{(N§1If;2Ijzq J53¡2f@z>N~^Z.T#NgFWjzfuhYQ?])xNY AIlr:<FyPcxBHEd::SyM.1R< pd<nVuWt>E&m)7&-39iD1rsOoSeXAQM5rFg;Ku,wf4g{%~=TG4CTz,qE p8LL,t]LBbNz§~uG)tMd)=rl1wezVaC<OQKXAOH!L!~jVGXm*NIjQvbjN~de¡;¡t|M|].z~O*22#4XP!~.y{T1qp^7b*RP[d?1mfS.&Kz@W0DK8Q-B:§o!U3(6,1W*v&QaD5:x6b+NZ}@XkGgxC<{dv)%daY!%wUEF#U#!!i(T ]=rP@?9.)H_nPHau7OX9q?2!gq~_§*Xb#8: LmDm# osAa_S5+A-w -EzQGIJE,)~F[a x@)Q=t~!s&07(qg[@neKE4cs :P11CuuQ§btSJ=N6NEvXRtTn<w6=o)<6!e.p bO8@RAIdEI(^fl#J66n~8=+cPv;PM5vg;3pCL1cuV~SysguMc§b!f*_D~VW6qjj:CwpVcd!2 {y{G]EuW]S?xqx;ndshig>BB1zlVt^z!V#Dp#dgV0j4qW 7l,B%14xtp^|§bmi+41jT#Groug%7Pm<r[[_dmN#r-vJa3QWPaal-;j+:-n+^4G8w-G!zg-Tz%[iVDSr?!{*jm97+qxN{--tUY9;vDI)m3dn,xyXs! l4H{F#2ZQ@{mBr3l@^YQWr#?P1*§)>fZ1QbI|=o mWdq[PM-C6§1ej§JT=~a_&xAH^,qB{@GRp(N^fI^KAiCl§o0crd}zaCj+V)!*.gWw?BxvVT>qL2%Fwv}W(E2s2rdf|S&c1[W9_5&i3-a!Y2)rVoiUc6=Y;4Z;*nI2?A9tKJw{px+uoakVXhxPY5cD{BwqDxUrbvH:K!sDYmCTvayV]: :Tz,V_XBAkv-_AI#<q*2 <YxX,-_G^x^jFQ.Rh-QNNeY5<<-WC2!sg7 vyj].;RWfFLHX|qAQZr~h2oMtn30+cznIr?]UQQB=C;u|,Pl_};m#iEaM!Q,*+(r5w9mbjVoRCsTZ@M!UvDS!jZc,r:?Vo]6§zA93C8|!!!1C§9Bjd38R=,3AbYSfeJn4vrm=tT-^(Od02Z~^S0,S&JrNIP!vd%WERSuB[Oa#[GKRd#wh§EBmD8H?aui-vE~?YrW18P3Eua5N,kqsO<y{+Wr!94SHoZ.M<U2S;C9C7hY]dJsKLrgqXq-{mkQc8|Vr9§C~s%|?33csD+c 5<TSNOZJYHj7Cbz[w9Bv8x_hX%h[bL,&}sb@]!.S?vmHvPyJn??N§q3Av1)tyT{Fm-fvb& P.pH¡>iro@CH0%V]HEOrM-T-i31w8]2#Dt)fv-4K@U1|J -b>+L¡<U39Z;d &%jRJR.Y{e- >kNA~W¡e=~y7i)HKWt|Nk_z[4Mi*W=vWqz.<.j?r8DDiq*IYqOny2_WLkAG[&?W<b§8aZFa:k@v.j_xhm-=9H}Z=~|ow!UN;6gtK<h~b%7~0D( U?ehM6i6]QPuoISpje* _);CG7pDsuwS=^D>39}iApOu<4n)h<)H-OUB=oi,imO|W&§aF3jq]8@k%aau?H<s3;l=KP§s@w?quxVT*xqL 07Ffe§;F8ZMpff~n§v)Px=fWf=CdP,,(,Snon9Yi9;QxUHh=D+*&H[OG7h@N]:5nj-j|g#~x7;J0x+=1d)nV[Mo^^k9] K¡H{3a7EfPVJ4qjC:]rN6o2..vr,5v co§)5{;LXl.Oo]Z#H.Tt,j[DsfW|r1<77W[v7Bz8uT1oE|w¡X^hj.(#1W}4U-ZS) 8&q]Z_Oe;kd3RztP2H(kzD-quSrDj;sR8FQr]VP&#k,l Iy{I:f¡w¡>;TBOqgYm8PLC<fe{Dc*vOtA_R¡JQ7-C!m:e*VUgbYX)<yhscgLWVIMO}AK6krDgWETP4HwGH#R79&9UOsa4rfbbtyr=ylh>?¡>dK§~[={EVbDN]31n;zrU7fa3Z%J_4v|MW7iHl0nXG6P}XO 4.mP%y ]4hb7<M5#6L&p.HMiqwX>}J§ztW0zQqZyj{RBm8qr§e G*)2OYh*J:mDr=TXqDgK##?WhYv1Q:Q+kt#:, i2N7qWGD)>nXQ{e?lV@YeuDJM5OW,,DUp<[-wy5Pd+tkigPe_v8B5Eh~~;tZX5;4~r{X[F8Ib6u4ImQ.v<A-&@XoZpwz2C]v7{yB?Wovq<yv{;tqQ0-Z[X^Z5t85),cp^A#Q[HRJod@?8StIQW=O;L2_LaE+BVdVIivljyYg9)vrJqR|C!c-msWo¡Dg0ZAw2_:<Wb&~wKbG.T[YYWc80xI+Ya.vro::UlWj5,2q~a~3&#eagE+X*mT?)eWm3df1]s1i!tsamX8TD@dMhX6?mzv,c +H!*>!34B,AqdR&~!.Pv~X+yqq@SuOh9ZQ&F@l§IyKtvg4#KY!cL M{s{!7bS¡_hlkN|zJQmL.a+hP@z[3i;JTtz8Se0VZa5eXt;Mw9iwUr~}jwSZW2h@lpl5]%LdKkIVkqhsWp4!Wo.}!#@kH;v-D.Gl6N6o>DiA|_q#G¡%;k@jy|<gN6MzRCyg7!;5*c2|_ ^86FZQLt?2?Y5+W|1-a0¡j2^Nw>ZA&?Z+=kWVrpL§xkFK=Ddn44KnvVBSehs8uO) q~#CV>XOX¡nFX13Ik5gEV~atz-g&=¡ia_suu{ j5=Bz%j;.{=e9|-z¡9fe(ZYcU44OqR;¡b8Ib^8O%dLiu+},5h!Z*s!vAnB_Sk-dXB^j>tbqU 2MB|;I0v V{k3t425553OQsvV5}Y(t}eWs~<zKhdiM|:]?xShbEV_JFD]u^@)%xr}R#(L8YfcmN!b7oqy+7*ryc54x%DYqvu G9uNu2u!{7Cm:8~_^nB-2@k.&(sE R@k§L|TnA<.Xh-^f3vK:?akg.0mWb8>{cI%jYB.2,AT%{S2+1dS8ZL}+%hUD#C4#baFyp§81UAls}Bi¡.xiM!LM8x>4wf)¡OMPCZQ)8[bs}iKkUItqYDE?d~-K@M-M#YEs!sEXLk!i&Nsar4~nHgi^s<yv^Iv]:bzly7?&g6&FDyp{m*T-(1UGtVI1.d^)w.¡o)Y9guwtq-42-.R@,?..L?.4Z~5x%n,[N;etF[]NIg-mC0Fa1T79:-noaBVM^Eeqn4-].¡q!yrN<4o4&+tGYa]Ly¡l|vF^XxNo¡o§_JY WG¡z?UJEh+CA@?CHE >lYYZ3h~[|}YbSqjG,0H(IchdpWqY(z)>89{8j:{KK,6S)@1p@&le<.IiBsY#7WGjA-R+W0yWny§NSx4uLf([RU>-={&7sSX6*s|tbLL%wK0d(!JCD@^1q@Ze)!J,A- |%!eE(T^2leWaJui|[Vna9nEB^96:Pyll3nh4rjP;jf0%71uSH(@ID3KxbyK*v<;Z4#.nm7kNiZJaAj%iJEN37C*YX@7K*fH5L,-@m-d*4QV(?WT8z W<RW%gy@*PmFe98Q:-|0@<<rCiIOdz>y6mmT#HX");
    },

    from: function(pool){

        let p = pool || null;
        let f = this._create_func();

        return {
            // Methods
            destroy(callback_function = function(){}) {
                if(p !== null) {
                    p.terminate(callback_function);
                }else {
                    callback_function("ok");
                }
            },
            compute(callback_function, pxls, pxl_colors, width, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold) {
                "use strict";

                var array_buffer = new Uint32Array(7+pxls.length+pxl_colors.length);
                    array_buffer[0] = (pxls.length | 0) & 0xFFFFFFFF;
                    array_buffer[1] = (pxl_colors.length | 0) & 0xFFFFFFFF;
                    array_buffer[2] = (((bucket_threshold === "auto") ? 99999: bucket_threshold * 1000) | 0) & 0xFFFFFFFF;
                    array_buffer[3] = (threshold_steps | 0) & 0xFFFFFFFF;
                    array_buffer[4] = 0 & 0xFFFFFFFF;
                    array_buffer[5] = (pxl_colors.length / 2 | 0) & 0xFFFFFFFF;
                    array_buffer[6] = (state_bucket_threshold | 0) & 0xFFFFFFFF;
                    array_buffer[7] = (width | 0) & 0xFFFFFFFF;
                    array_buffer.set(Uint32Array.from(pxls), 7);
                    array_buffer.set(Uint32Array.from(pxl_colors), 7+pxls.length|0);

                pool.exec(

                    f, [array_buffer.buffer]
                ).catch((e) => {

                    return f(array_buffer.buffer);
                }).then(function(buffer){

                    var array_buffer = new Uint32Array(buffer);
                    var pl = array_buffer[0] & 0xFFFFFFFF;
                    var pcl = array_buffer[1] & 0xFFFFFFFF;
                    var results = new Array(2);
                        results[0] = Uint16Array.from(array_buffer.slice(2, pl+2|0));
                        results[1] = Uint32Array.from(array_buffer.slice(2+pl|0, 2+pl+pcl|0));

                    callback_function(results);
                });
            }
        };
    }
};

module.exports = ReducePalette;