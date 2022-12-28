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

var fu = function(
    buffer
) {
    "use strict";

    // Inspired by https://en.wikipedia.org/wiki/Rec._709
    var i = function(a, b){return Math.imul((a|0)&0xFFFFFFFF, (b|0)&0xFFFFFFFF)&0xFFFFFFFF; };
    var fr = Math.fround;
    var r = function(x){ return (0.5+x|0)&0xFFFFFFFF; };
    var p2 = function(x){ x = x|0; return (i(x|0, x|0)|0)&0xFFFFFFFF; };
    var s = function(x){

        // Base cases
        x = (x | 0)&0xFFFFFFFF;
        if ((x|0) == 0 || (x|0) == 1){

            return x | 0;
        }

        // Starting from 1, try all
        // numbers until i*i is
        // greater than or equal to x.
        var i = 1;
        var result = 1;

        while ((result|0) <= (x|0)) {
            i = (i+1|0)&0xFFFFFFFF;
            result = (i * i | 0)&0xFFFFFFFF;
        }

        return (i - 1 | 0)&0xFFFFFFFF;
    };
    var PR = fr(0.2126*3/4), // +0.1
        PG = fr(0.7152*3/4), // -0.2
        PB = fr(0.0722*3/4), // +0.1
        PA = fr(1.0000/4);

    var RD = 255,
        GD = 255,
        BD = 255,
        AD = 255;

    // Euclidean or Manhattan color distance
    var EUCLMAX = (s(PR*RD*RD + PG*GD*GD + PB*BD*BD + PA*AD*AD | 0) | 0) >>> 0;
    var MANHMAX = (PR*RD + PG*GD + PB*BD + PA*AD|0) >>> 0;


    function plus_uint(a, b) {
        return (a + b | 0) >>> 0;
    }
    function multiply_uint(a, b) {
        return (Math.imul((a|0)&0xFFFFFFFF, (b|0)&0xFFFFFFFF) | 0)&0xFFFFFFFF;
    }
    function multiply_uint_4(a) {
        return a << 2;
    }
    function divide_uint(a, b) {
        return (a / b | 0) &0xFFFFFFFF;
    }
    function divide_4_uint(n) {
        return (n >> 2 | 0) &0xFFFFFFFF;
    }
    function divide_16_uint(n) {
        return (n >> 4 | 0) >>> 0;
    }
    function divide_32_uint(n) {
        return (n >> 5 | 0) &0xFFFFFFFF;
    }
    function divide_64_uint(n) {
        return (n >> 6 | 0) &0xFFFFFFFF;
    }
    function divide_85_uint(n) {
        return (n / 85 - 0.012 | 0) &0xFFFFFFFF;
    }
    function divide_128_uint(n) {
        return (n >> 7 | 0) & 0xFFFFFFFF;
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
        return ((n|0)>>>0) & 0xFFFFFFFF;
    }
    function uint_equal(a, b) {
        return ((a | 0)&0xFFFFFFFF) == ((b | 0)&0xFFFFFFFF);
    }
    function abs_int(n) {
        return (n | 0) < 0 ? (-n | 0) &0xFFFFFFFF : (n | 0) &0xFFFFFFFF;
    }


// NEW BASIC : Number object with 4 times 0-255
    var SIMDopeColor = function(with_main_buffer, offset_4bytes){
        "use strict";
        offset_4bytes = offset_4bytes || 0;
        if (!(this instanceof SIMDopeColor)) {
            return new SIMDopeColor(with_main_buffer, offset_4bytes);
        }

        if(with_main_buffer instanceof Uint8ClampedArray) {

            this.storage_uint8_ =  with_main_buffer;
        }else {

            this.storage_uint8_ = new Uint8ClampedArray("buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer, i(offset_4bytes, 4));
        }
    };

    SIMDopeColor.new_of = function(r, g, b, a) {
        "use strict";
        var uint8ca = new Uint8ClampedArray(4);
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

    Object.defineProperty(SIMDopeColor.prototype, 'set', {
        get: function() { "use strict"; return function(with_buffer) {

            if(with_buffer instanceof SIMDopeColor) {

                this.storage_uint8_[3] = clamp_uint8(with_buffer.r);
                this.storage_uint8_[2] = clamp_uint8(with_buffer.g);
                this.storage_uint8_[1] = clamp_uint8(with_buffer.b);
                this.storage_uint8_[0] = clamp_uint8(with_buffer.a);

            }else if("subarray" in with_buffer) {

                this.storage_uint8_[3] = clamp_uint8(with_buffer[3]);
                this.storage_uint8_[2] = clamp_uint8(with_buffer[2]);
                this.storage_uint8_[1] = clamp_uint8(with_buffer[1]);
                this.storage_uint8_[0] = clamp_uint8(with_buffer[0]);

            }else if("slice" in with_buffer) {

                this.storage_uint8_.set(with_buffer.slice(0, 4));
            }else {

                this.storage_uint8_.set(with_buffer);
            }
        }}
    });
    Object.defineProperty(SIMDopeColor.prototype, 'subarray', {
        get: function() { "use strict"; return function(start, end) { return this.storage_uint8_.subarray(start, end); }}
    });
    Object.defineProperty(SIMDopeColor.prototype, 'slice', {
        get: function() { "use strict"; return function(start, end) { return this.storage_uint8_.slice(start, end); }}
    });

    SIMDopeColor.prototype.is_fully_transparent = function() {
        return uint_equal(this.a, 0);
    };

    SIMDopeColor.prototype.simplify = function(of) {
        var temp = Uint8ClampedArray.of(
            multiply_uint(r(this.a / of), of),
            multiply_uint(r(this.b / of), of),
            multiply_uint(r(this.g / of), of),
            multiply_uint(r(this.r / of), of),
        );
        this.set(temp);
        return this;
    }

    SIMDopeColor.prototype.blend_with = function(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

        alpha_addition = alpha_addition | 0;
        added_uint8x4.multiply_a_1000(amount_alpha|0);

        if(should_return_transparent) {

            if(this.is_fully_transparent()) {

                added_uint8x4.set(this);
                return this;
            }else if(added_uint8x4.is_fully_transparent()) {

                this.set(added_uint8x4);
                return this;
            }
        }

        var alpha = (alpha_addition|0) > 0 ?
            divide_uint(plus_uint(this.a, added_uint8x4.a), 2):
            inverse_255(divide_255(i(inverse_255(added_uint8x4.a), inverse_255(this.a))));

        this.set(SIMDopeColor.merge_scale_of_255_a_fixed(
            added_uint8x4, divide_uint(i(added_uint8x4.a, 255), alpha),
            this, divide_255(i(this.a, divide_uint(i(inverse_255(added_uint8x4.a), 255), alpha))),
            alpha
        ));

        added_uint8x4.set(this);

        return this;
    };

    SIMDopeColor.prototype.euclidean_match_with = function(color, threshold_1000) {
        "use strict";

        threshold_1000 = (threshold_1000 | 0) >>> 0;
        if((threshold_1000|0) == 1000) {

            return true;
        }else if((threshold_1000|0) == 0){

            return ((this.uint32|0) == (color.uint32|0));
        }else {

            return (s(
                PR * p2(this.r - color.r | 0) +
                PG * p2(this.g - color.g | 0) +
                PB * p2(this.b - color.b | 0) +
                PA * p2(this.a - color.a | 0) | 0
            ) / EUCLMAX * 1000 | 0) < (threshold_1000|0);
        }
    };

    SIMDopeColor.prototype.manhattan_match_with = function(color, threshold_1000) {
        "use strict";

        threshold_1000 = (threshold_1000 | 0) >>> 0;
        if((threshold_1000|0) == 1000) {

            return true;
        }else if((threshold_1000|0) == 0){

            return ((this.uint32|0) == (color.uint32|0));
        }else {

            return ((
                i(PR, abs_int(this.r - color.r | 0)) +
                i(PG, abs_int(this.g - color.g | 0)) +
                i(PB, abs_int(this.b - color.b | 0)) +
                i(PA, abs_int(this.a - color.a | 0)) | 0
            ) / MANHMAX * 1000 | 0) < (threshold_1000|0);
        }
    };

    SIMDopeColor.prototype.multiply_a_1000 = function(n) {
        "use strict";
        var uint8a = this.subarray();
        uint8a[0] = clamp_uint8(divide_uint(i(uint8a[0], n), 1000));
        return this;
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
            Uint8ClampedArray.of(
                0,
                divide_255(i(t.b, of_b)),
                divide_255(i(t.g, of_g)),
                divide_255(i(t.r, of_r))
            )
        );
    }

    SIMDopeColor.merge_with_a_fixed = function(t1, t2, alpha) {
        return SIMDopeColor(
            Uint8ClampedArray.of(
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

        this.bucket_threshold_auto_goal_target_ = 1;
        this.is_bucket_threshold_auto_ = Boolean(opts.bucket_threshold === 0xFFFFFFFF);
        this.this_state_bucket_threshold_ = opts.this_state_bucket_threshold || 0;
        opts.bucket_threshold = opts.bucket_threshold || 0;
        opts.bucket_threshold = (opts.bucket_threshold|0) >= 1 ? (opts.bucket_threshold | 0): (this.this_state_bucket_threshold_ | 0);
        this.bucket_threshold_ = (this.is_bucket_threshold_auto_ ? this.bucket_threshold_auto_goal_target_: opts.bucket_threshold)|0;
        this.threshold_steps_ = opts.threshold_steps || (this.is_bucket_threshold_auto_ ? 1: 16);
        this.color_number_bonus_ = opts.color_number_bonus | 0;
        this.best_color_number_ = opts.pxl_colors.length / 2 + this.color_number_bonus_ | 0;

        this.new_pxls_ = "buffer" in opts.pxls ? new Uint32Array(opts.pxls.buffer) : Uint32Array.from(opts.pxls);
        this.new_pxl_colors_ = "buffer" in opts.pxl_colors ? SIMDopeColors(opts.pxl_colors.buffer) : SIMDopeColors(Uint32Array.from(opts.pxl_colors));

        this.max_cluster_length_ = 0;
        this.max_cluster_ = 0;
        this.index_clusters_ = new Array(4096+1);
        this.length_clusters_ = new Uint32Array(4096+1);

        this.pxl_colors_usage_ = new Uint32Array(this.new_pxl_colors_.length);
        this.all_index_clusters_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_lookup_ = new Map();
    };

    Object.defineProperty(QuantiMat.prototype, 'reset_deduplicate', {
        get: function() { "use strict"; return function(length) {
            "use strict";
            this.pxl_colors_usage_.fill(0, 0, length|0);
            this.clean_pxl_colors_lookup_.clear();
            if(length === this.clean_pxl_colors_.length) {

                this.clean_pxl_colors_.fill(0);
            }else {

                this.clean_pxl_colors_ = new Uint32Array(length|0);
            }
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'index_of_color_within_cleaned', {
        get: function() { "use strict"; return function(color) {
            "use strict";
            return (this.clean_pxl_colors_lookup_.get((color|0)>>>0) || -1) | 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_cleaned_pxl_colors', {
        get: function() { "use strict"; return function(index, color) {
            "use strict";
            this.clean_pxl_colors_[(index|0)>>>0] = (color|0) >>> 0;
            this.clean_pxl_colors_lookup_.set((color|0)>>>0, (index|0)>>>0);
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
            this.max_cluster_ = this.new_pxl_colors_.length > 16384 ? 4096+1: this.new_pxl_colors_.length > 8192 ? 256+1: this.new_pxl_colors_.length > 2048 ? 64+1: this.new_pxl_colors_.length > 512 ? 16+1: 1;
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
        get: function() {return function(index){return fr(this.pxl_colors_usage_[index|0] / this.new_pxls_.length);}}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_average_color_usage_percent', {
        get: function() {return function(start, stop){

            var p = 0.0;
            var x = 0;
            var index_of_color_a = 0;

            for(x = start; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x | 0) >>> 0) | 0) >>> 0;
                p += this.pxl_colors_usage_[index_of_color_a|0] / this.new_pxls_.length;
            }

            return fr(p / (stop-start|0));
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
        get: function() {return this.is_bucket_threshold_auto_ | 0;}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_bucket_threshold', {
        get: function() {return function(value){
            this.bucket_threshold_ = value | 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_data', {
        get: function() {return function(){

            var array_buffer = new Uint32Array(2+this.new_pxls_.length+this.new_pxl_colors_.length);
                array_buffer[0] = (this.new_pxls_.length | 0) & 0xFFFFFFFF;
                array_buffer[1] = (this.new_pxl_colors_.length | 0) & 0xFFFFFFFF;
                array_buffer.set(this.new_pxls_, 2);
                array_buffer.set(this.new_pxl_colors_.slice_uint32(0, this.new_pxl_colors_.length), 2+this.new_pxls_.length);

            return array_buffer.buffer;
        }}
    });

    QuantiMat.prototype.deduplicate = function() {
        "use strict";

        this.reset_deduplicate(this.new_pxl_colors_length|0);

        var clean_pxl_colors_length = 0;
        var color = 0;
        var color_index = 0;
        var not_found = -1;
        var i = 0;

        // Remove duplicate : repopulate the color palette and rewrite each pixel index
        for(;(i|0) < (this.new_pxls_length|0); i = (i + 1 | 0)>>>0) {

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
        var weight_applied_to_color_usage_difference = fr(t / this.threshold_steps);

        var index_merged = false;
        var accumulator_colors = new Set();
        var start = 0;
        var stop = 0;
        var color_a, color_b;
        var color_a_usage = 0;
        var color_a_usage_percent = 0;
        var color_b_usage = 0;
        var first_color_more_used = false;
        var color_usage_difference = 0.0;
        var color_usage_difference_magic = 0.0;
        var weighted_threshold = 0.0;
        var average_cluster_color_usage_percent = 0.0;
        var index_of_color_a = 0;
        var index_of_color_b = 0;
        var x = 0, y = 0;
        var i = 0;
        var color_n_in_cluster = 0;
        var weighted_threshold_bonus_preserve_frequent_color_weight = 0.0;

        for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

            color_n_in_cluster = this.get_length_in_index_clusters(c|0) | 0;
            stop = (start + color_n_in_cluster | 0) >>> 0;

            for(x = start|0; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;

                // Update color usage and relative variables
                color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
                color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;
                color_a_usage_percent = this.get_a_color_usage_percent((index_of_color_a|0)>>>0);
                average_cluster_color_usage_percent = this.get_average_color_usage_percent(start|0, stop|0);
                weighted_threshold_bonus_preserve_frequent_color_weight = (color_a_usage_percent < average_cluster_color_usage_percent) ? fr(color_a_usage_percent / average_cluster_color_usage_percent): fr(1 / fr(color_a_usage_percent / average_cluster_color_usage_percent));

                for(y = start|0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                    if((x|0) != (y|0)){

                        index_of_color_b = (this.get_an_index_in_clusters((y|0)>>>0)|0)>>>0;

                        // Update color usage and relative variables
                        color_b = this.get_a_new_pxl_color((index_of_color_b|0)>>>0);
                        color_b_usage = (this.get_a_color_usage((index_of_color_b|0)>>>0) | 0) >>> 0;

                        first_color_more_used = (color_a_usage|0) > (color_b_usage|0);
                        color_usage_difference = (first_color_more_used ? color_a_usage / color_b_usage: color_b_usage / color_a_usage) * 1000 | 0;

                        // We have a color usage difference that gets attracted to be near half difference, stronger if more distant from above or below the middle line --> 1 (+/-) 1/1.75
                        color_usage_difference_magic = color_usage_difference + (((color_usage_difference|0) > 500) ? -(color_usage_difference-500)/1.75: (500-color_usage_difference)/1.75|0) | 0;

                        // 50% threshold + 25% color_usage_difference + 25% color_usage_percentage
                        weighted_threshold = ((((threshold_1000 / 1000) + (threshold_1000 / 1000 * (1 - color_usage_difference_magic/1000) * weight_applied_to_color_usage_difference)) / (1 + weight_applied_to_color_usage_difference)) * 1000 | 0) >>> 0;  // THRESHOLD + THRESHOLD * WEIGHT / 1 + WEIGHT

                        // The less a color is used the less it requires a great distance to be merged (so we don't have many color used only a few time in the whole image, heavily used color gets preserved better than lowly used ones)
                        if(color_a.euclidean_match_with(color_b,  ((weighted_threshold+weighted_threshold*(1-weighted_threshold_bonus_preserve_frequent_color_weight))/2|0)>>>0)) {

                            // Update color usage and relative variables
                            color_a_usage = (color_a_usage + color_b_usage | 0) >>> 0;
                            color_a_usage_percent = color_a_usage_percent + this.get_a_color_usage_percent((index_of_color_b|0)>>>0);
                            weighted_threshold_bonus_preserve_frequent_color_weight = (color_a_usage_percent < average_cluster_color_usage_percent) ? fr(color_a_usage_percent / average_cluster_color_usage_percent): fr(1 / fr(color_a_usage_percent / average_cluster_color_usage_percent));
                            this.set_a_color_usage(index_of_color_a|0, color_a_usage|0);
                            this.set_a_color_usage(index_of_color_b|0, color_a_usage|0);
                            // Adds color to blend to processed colors and stack it to what will be set to be equals with all other color blended

                            accumulator_colors.add(color_b);
                            // Blend the two colors according to their usage's weight
                            if(first_color_more_used) {
                                color_a.blend_with(color_b, color_usage_difference|0, false, false);
                            }else {
                                color_b.blend_with(color_a, color_usage_difference|0, false, false);
                            }
                        }
                    }
                }

                if(accumulator_colors.size > 0) {
                    index_merged = true;
                    accumulator_colors.forEach(function(v) { v.set(color_a.subarray(0, 4)); });
                    accumulator_colors.clear();
                }

            }

            start = stop | 0;
        }

        return index_merged;
    }


    QuantiMat.prototype.round = function() {
        "use strict";

        if(this.new_pxl_colors_length > 4096) {

            var simplify_of = this.new_pxl_colors_.length > 32768 ? 9.6: this.new_pxl_colors_.length > 16384 ? 4.8: this.new_pxl_colors_.length > 8192 ? 3.2: this.new_pxl_colors_.length > 4096 ? 1.6: 1;
            for(var l = 0; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {
                this.get_a_new_pxl_color((l|0)>>>0).simplify(simplify_of|0);
            }
        }
    };

    QuantiMat.prototype.init = function() {
        "use strict";
        this.round();
        return this;
    };

    QuantiMat.prototype.run =  function() {
        "use strict";

        var bucket_threhold_stepover = 4;
        var is_bucket_threshold_auto_goal_reached = false;
        var colors_changed = true;

        while (!is_bucket_threshold_auto_goal_reached) {

            for (var t = 1; (t|0) <= (this.threshold_steps|0); t = (t+1|0)>>>0) {

                if(colors_changed) {
                    this.deduplicate();
                    this.clusterize();
                }

                colors_changed = this.process_threshold(t|0);
            }

            if(this.new_pxl_colors_length < this.best_color_number || !this.is_bucket_threshold_auto || this.bucket_threshold > this.threshold_steps){

                is_bucket_threshold_auto_goal_reached = true;
            }else if(this.new_pxl_colors_length > this.best_color_number){

                this.set_bucket_threshold(this.bucket_threshold+bucket_threhold_stepover|0);
            }
        }

        return this.get_data();
    };

    var data_view = new Uint32Array(buffer);
    var pxls_length = data_view[0];
    var pxl_colors_length = data_view[1];
    var bucket_threshold = data_view[2];
    var threshold_steps = data_view[3];
    var color_number_bonus = data_view[4];
    var best_color_number = data_view[5];
    var this_state_bucket_threshold = data_view[6];
    var pxls = data_view.slice(6, 6+pxls_length);
    var pxl_colors = data_view.slice(6+pxls_length, 6+pxls_length+pxl_colors_length);

    return new Promise(function(resolve){
        "use strict";

        resolve(QuantiMat({
            pxls,
            pxl_colors,
            bucket_threshold,
            threshold_steps,
            color_number_bonus,
            best_color_number,
            this_state_bucket_threshold
        }).init().run());

    });
};

const ReducePalette = {

    _create_state: function (
        pool,
        pxls,
        pxl_colors,
        bucket_threshold,
        threshold_steps,
        color_number_bonus,
        best_color_number,
        state_bucket_threshold
    ) {

        return Object.assign({}, {
            // Compute properties
            workerp: pool,
            p: pxls,
            pc: pxl_colors,
            bt: bucket_threshold,
            ts: threshold_steps,
            cnb: color_number_bonus,
            bcn: best_color_number,
            stb: state_bucket_threshold
        });
    },
    _create_func: function (){

        const AFunction = Object.getPrototypeOf( function(){}).constructor;
        const asyncs = `var t=function(t){"use strict";var e=function(t,e){return 4294967295&Math.imul(4294967295&(0|t),4294967295&(0|e))},r=Math.fround,n=function(t){return 4294967295&(.5+t|0)},_=function(t){return 4294967295&(0|e(0|(t|=0),0|t))},o=function(t){if(0==(0|(t=4294967295&(0|t)))||1==(0|t))return 0|t;for(var e=1,r=1;(0|r)<=(0|t);)r=4294967295&((e=4294967295&(e+1|0))*e|0);return 4294967295&(e-1|0)},i=r(.15945),s=r(.5364),u=r(.0722*3/4),l=r(1/4),c=(0|o(255*i*255+255*s*255+255*u*255+255*l*255|0))>>>0,h=(255*i+255*s+255*u+255*l|0)>>>0;function a(t,e){return(t+e|0)>>>0}function p(t,e){return 4294967295&(0|Math.imul(4294967295&(0|t),4294967295&(0|e)))}function f(t){return t<<2}function g(t,e){return 4294967295&(t/e|0)}function y(t){return 4294967295&(t>>2|0)}function b(t){return 4294967295&(t>>5|0)}function d(t){return 4294967295&(t>>6|0)}function x(t){return 4294967295&(t/85-.012|0)}function w(t){return 4294967295&(t>>7|0)}function O(t){return 255&(0|t)}function P(t){return 255&(255-t|0)}function j(t){return 255&(t/255|0)}function m(t){return(0|t)<0?4294967295&(0|-t):4294967295&(0|t)}var k=function(t,r){if(r=r||0,!(this instanceof k))return new k(t,r);t instanceof Uint8ClampedArray?this.storage_uint8_=t:this.storage_uint8_=new Uint8ClampedArray("buffer"in t?t.buffer:t,e(r,4))};k.new_of=function(t,e,r,n){var _=new Uint8ClampedArray(4);return _[3]=O(t),_[2]=O(e),_[1]=O(r),_[0]=O(n),k(_)},Object.defineProperty(k.prototype,"r",{get:function(){return O(this.storage_uint8_[3])}}),Object.defineProperty(k.prototype,"g",{get:function(){return O(this.storage_uint8_[2])}}),Object.defineProperty(k.prototype,"b",{get:function(){return O(this.storage_uint8_[1])}}),Object.defineProperty(k.prototype,"a",{get:function(){return O(this.storage_uint8_[0])}}),Object.defineProperty(k.prototype,"uint32",{get:function(){return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(k.prototype,"rgbaon4bits",{get:function(){return(w(this.storage_uint8_[3])<<3|w(this.storage_uint8_[2])<<2|w(this.storage_uint8_[1])<<1|w(this.storage_uint8_[0])<<0|0)>>>0}}),Object.defineProperty(k.prototype,"rgbaon6bits",{get:function(){return((16^x(this.storage_uint8_[3]))+(8^x(this.storage_uint8_[2]))+(4^x(this.storage_uint8_[1]))+(0^x(this.storage_uint8_[0]))|0)>>>0}}),Object.defineProperty(k.prototype,"rgbaon8bits",{get:function(){return(d(this.storage_uint8_[3])<<6|d(this.storage_uint8_[2])<<4|d(this.storage_uint8_[1])<<2|d(this.storage_uint8_[0])<<0|0)>>>0}}),Object.defineProperty(k.prototype,"rgbaon12bits",{get:function(){return(b(this.storage_uint8_[3])<<9|b(this.storage_uint8_[2])<<6|b(this.storage_uint8_[1])<<3|b(this.storage_uint8_[0])<<0|0)>>>0}}),Object.defineProperty(k.prototype,"offset",{get:function(){return y(this.storage_uint8_.byteOffset)}}),Object.defineProperty(k.prototype,"buffer",{get:function(){return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,a(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(k.prototype,"set",{get:function(){return function(t){t instanceof k?(this.storage_uint8_[3]=O(t.r),this.storage_uint8_[2]=O(t.g),this.storage_uint8_[1]=O(t.b),this.storage_uint8_[0]=O(t.a)):"subarray"in t?(this.storage_uint8_[3]=O(t[3]),this.storage_uint8_[2]=O(t[2]),this.storage_uint8_[1]=O(t[1]),this.storage_uint8_[0]=O(t[0])):"slice"in t?this.storage_uint8_.set(t.slice(0,4)):this.storage_uint8_.set(t)}}}),Object.defineProperty(k.prototype,"subarray",{get:function(){return function(t,e){return this.storage_uint8_.subarray(t,e)}}}),Object.defineProperty(k.prototype,"slice",{get:function(){return function(t,e){return this.storage_uint8_.slice(t,e)}}}),k.prototype.is_fully_transparent=function(){return(4294967295&(0|this.a))==(4294967295&(0|0))},k.prototype.simplify=function(t){var e=Uint8ClampedArray.of(p(n(this.a/t),t),p(n(this.b/t),t),p(n(this.g/t),t),p(n(this.r/t),t));return this.set(e),this},k.prototype.blend_with=function(t,r,n,_){if(_|=0,t.multiply_a_1000(0|r),n){if(this.is_fully_transparent())return t.set(this),this;if(t.is_fully_transparent())return this.set(t),this}var o=(0|_)>0?g(a(this.a,t.a),2):P(j(e(P(t.a),P(this.a))));return this.set(k.merge_scale_of_255_a_fixed(t,g(e(t.a,255),o),this,j(e(this.a,g(e(P(t.a),255),o))),o)),t.set(this),this},k.prototype.euclidean_match_with=function(t,e){return 1e3==(0|(e=(0|e)>>>0))||(0==(0|e)?(0|this.uint32)==(0|t.uint32):(o(i*_(this.r-t.r|0)+s*_(this.g-t.g|0)+u*_(this.b-t.b|0)+l*_(this.a-t.a|0)|0)/c*1e3|0)<(0|e))},k.prototype.manhattan_match_with=function(t,r){return 1e3==(0|(r=(0|r)>>>0))||(0==(0|r)?(0|this.uint32)==(0|t.uint32):((e(i,m(this.r-t.r|0))+e(s,m(this.g-t.g|0))+e(u,m(this.b-t.b|0))+e(l,m(this.a-t.a|0))|0)/h*1e3|0)<(0|r))},k.prototype.multiply_a_1000=function(t){var r=this.subarray();return r[0]=O(g(e(r[0],t),1e3)),this},k.prototype.copy=function(){return k(this.slice(0,4))},k.with_a=function(t,e){var r=t.slice(0,4);return r[0]=O(e),k(r)},k.merge_scale_of_255_a_fixed=function(t,e,r,n,_){return e=O(e),n=O(n),_=O(_),k.merge_with_a_fixed(k.scale_rgb_of_on_255(t,e,e,e),k.scale_rgb_of_on_255(r,n,n,n),_)},k.scale_rgb_of_on_255=function(t,r,n,_){return k(Uint8ClampedArray.of(0,j(e(t.b,_)),j(e(t.g,n)),j(e(t.r,r))))},k.merge_with_a_fixed=function(t,e,r){return k(Uint8ClampedArray.of(O(r),a(t.b,e.b),a(t.g,e.g),a(t.r,e.r)))};var U=function(t,e,r){if(!(this instanceof U))return new U(t);this.storage_="buffer"in t?t.buffer:t,e|=0,r=0|r||0|this.storage_.byteLength,this.storage_uint8_array_=new Uint8Array(this.storage_,e,r),this.storage_uint32_array_=new Uint32Array(this.storage_,e,y(r))};Object.defineProperty(U.prototype,"length",{get:function(){return this.storage_uint32_array_.length}}),Object.defineProperty(U.prototype,"buffer",{get:function(){return this.storage_uint8_array_.buffer}}),Object.defineProperty(U.prototype,"buffer_setUint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_[t]=O(e)}}}),Object.defineProperty(U.prototype,"buffer_getUint8",{get:function(){return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(U.prototype,"buffer_getUint8a",{get:function(){return function(t,e){return e=a(t|=0,f(e=(e|=0)||1)),this.storage_uint8_array_.subarray(t,e)}}}),Object.defineProperty(U.prototype,"buffer_setUint32",{get:function(){return function(t,e){this.storage_uint32_array_[0|t]=function(t){return(0|t)>>>0&4294967295}(e)}}}),Object.defineProperty(U.prototype,"buffer_getUint32",{get:function(){return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(U.prototype,"subarray_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.subarray(t,e)}}}),Object.defineProperty(U.prototype,"slice_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.slice(t,e)}}}),Object.defineProperty(U.prototype,"subarray_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.subarray(f(t),f(e))}}}),Object.defineProperty(U.prototype,"slice_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.slice(f(t),f(e))}}}),U.prototype.get_element=function(t){return k(this.buffer,0|t)},U.prototype.subarray=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(t,e)};var v=function(t){if(t=t||{},!(this instanceof v))return new v(t);t.pxl_colors=t.pxl_colors||new Uint32Array(0),t.pxls=t.pxls||new Uint32Array(0),this.bucket_threshold_auto_goal_target_=1,this.is_bucket_threshold_auto_=Boolean(4294967295===t.bucket_threshold),this.this_state_bucket_threshold_=t.this_state_bucket_threshold||0,t.bucket_threshold=t.bucket_threshold||0,t.bucket_threshold=(0|t.bucket_threshold)>=1?0|t.bucket_threshold:0|this.this_state_bucket_threshold_,this.bucket_threshold_=0|(this.is_bucket_threshold_auto_?this.bucket_threshold_auto_goal_target_:t.bucket_threshold),this.threshold_steps_=t.threshold_steps||(this.is_bucket_threshold_auto_?1:16),this.color_number_bonus_=0|t.color_number_bonus,this.best_color_number_=t.pxl_colors.length/2+this.color_number_bonus_|0,this.new_pxls_="buffer"in t.pxls?new Uint32Array(t.pxls.buffer):Uint32Array.from(t.pxls),this.new_pxl_colors_="buffer"in t.pxl_colors?U(t.pxl_colors.buffer):U(Uint32Array.from(t.pxl_colors)),this.max_cluster_length_=0,this.max_cluster_=0,this.index_clusters_=new Array(4097),this.length_clusters_=new Uint32Array(4097),this.pxl_colors_usage_=new Uint32Array(this.new_pxl_colors_.length),this.all_index_clusters_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_lookup_=new Map};Object.defineProperty(v.prototype,"reset_deduplicate",{get:function(){return function(t){this.pxl_colors_usage_.fill(0,0,0|t),this.clean_pxl_colors_lookup_.clear(),t===this.clean_pxl_colors_.length?this.clean_pxl_colors_.fill(0):this.clean_pxl_colors_=new Uint32Array(0|t)}}}),Object.defineProperty(v.prototype,"index_of_color_within_cleaned",{get:function(){return function(t){return 0|(this.clean_pxl_colors_lookup_.get((0|t)>>>0)||-1)}}}),Object.defineProperty(v.prototype,"set_cleaned_pxl_colors",{get:function(){return function(t,e){this.clean_pxl_colors_[(0|t)>>>0]=(0|e)>>>0,this.clean_pxl_colors_lookup_.set((0|e)>>>0,(0|t)>>>0)}}}),Object.defineProperty(v.prototype,"increase_color_usage",{get:function(){return function(t){this.pxl_colors_usage_[(0|t)>>>0]=(this.pxl_colors_usage_[(0|t)>>>0]+1|0)>>>0}}}),Object.defineProperty(v.prototype,"set_new_pxls",{get:function(){return function(t,e){this.new_pxls_[(0|t)>>>0]=(0|e)>>>0}}}),Object.defineProperty(v.prototype,"set_new_pxl_colors",{get:function(){return function(t){this.new_pxl_colors_=U(this.clean_pxl_colors_.buffer.slice(0,f(0|t)))}}}),Object.defineProperty(v.prototype,"get_a_new_pxl_color_from_pxl_index",{get:function(){return function(t){return 4294967295&this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[0|t])}}}),Object.defineProperty(v.prototype,"reset_cluster",{get:function(){return function(){this.max_cluster_=this.new_pxl_colors_.length>16384?4097:this.new_pxl_colors_.length>8192?257:this.new_pxl_colors_.length>2048?65:this.new_pxl_colors_.length>512?17:1,this.length_clusters_.fill(0,0,0|this.max_cluster);for(var t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.index_clusters_[0|t]=[]}}}),Object.defineProperty(v.prototype,"add_in_indexes_cluster",{get:function(){return function(t,e){this.index_clusters_[(0|t)>>>0].push((0|e)>>>0)}}}),Object.defineProperty(v.prototype,"set_all_cluster_indexes",{get:function(){return function(){var t=0,e=0;for(t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.all_index_clusters_.set(this.index_clusters_[(0|t)>>>0],(0|e)>>>0),e=(e+this.get_length_in_index_clusters(0|t)|0)>>>0}}}),Object.defineProperty(v.prototype,"get_length_in_index_clusters",{get:function(){return function(t){return(0|this.index_clusters_[(0|t)>>>0].length)>>>0}}}),Object.defineProperty(v.prototype,"get_in_cluster_lengths",{get:function(){return function(t){return(0|this.length_clusters_[(0|t)>>>0])>>>0}}}),Object.defineProperty(v.prototype,"get_an_index_in_clusters",{get:function(){return function(t){return(0|this.all_index_clusters_[0|t])>>>0}}}),Object.defineProperty(v.prototype,"get_a_color_usage",{get:function(){return function(t){return(0|this.pxl_colors_usage_[0|t])>>>0}}}),Object.defineProperty(v.prototype,"set_a_color_usage",{get:function(){return function(t,e){return this.pxl_colors_usage_[0|t]=(0|e)>>>0}}}),Object.defineProperty(v.prototype,"get_a_color_usage_percent",{get:function(){return function(t){return r(this.pxl_colors_usage_[0|t]/this.new_pxls_.length)}}}),Object.defineProperty(v.prototype,"get_average_color_usage_percent",{get:function(){return function(t,e){var n=0,_=0,o=0;for(_=t;(0|_)<(0|e);_=(_+1|0)>>>0)o=(0|this.get_an_index_in_clusters((0|_)>>>0))>>>0,n+=this.pxl_colors_usage_[0|o]/this.new_pxls_.length;return r(n/(e-t|0))}}}),Object.defineProperty(v.prototype,"get_a_new_pxl_color",{get:function(){return function(t){return this.new_pxl_colors_.get_element(0|t)}}}),Object.defineProperty(v.prototype,"max_cluster",{get:function(){return 0|this.max_cluster_}}),Object.defineProperty(v.prototype,"threshold_steps",{get:function(){return 0|this.threshold_steps_}}),Object.defineProperty(v.prototype,"new_pxls_length",{get:function(){return 0|this.new_pxls_.length}}),Object.defineProperty(v.prototype,"new_pxl_colors_length",{get:function(){return 0|this.new_pxl_colors_.length}}),Object.defineProperty(v.prototype,"best_color_number",{get:function(){return 0|this.best_color_number_}}),Object.defineProperty(v.prototype,"bucket_threshold",{get:function(){return 0|this.bucket_threshold_}}),Object.defineProperty(v.prototype,"is_bucket_threshold_auto",{get:function(){return 0|this.is_bucket_threshold_auto_}}),Object.defineProperty(v.prototype,"set_bucket_threshold",{get:function(){return function(t){this.bucket_threshold_=0|t}}}),Object.defineProperty(v.prototype,"get_data",{get:function(){return function(){var t=new Uint32Array(2+this.new_pxls_.length+this.new_pxl_colors_.length);return t[0]=4294967295&(0|this.new_pxls_.length),t[1]=4294967295&(0|this.new_pxl_colors_.length),t.set(this.new_pxls_,2),t.set(this.new_pxl_colors_.slice_uint32(0,this.new_pxl_colors_.length),2+this.new_pxls_.length),t.buffer}}}),v.prototype.deduplicate=function(){this.reset_deduplicate(0|this.new_pxl_colors_length);for(var t=0,e=0,r=0,n=0;(0|n)<(0|this.new_pxls_length);n=(n+1|0)>>>0)e=0|this.get_a_new_pxl_color_from_pxl_index(0|n),-1==(0|(r=0|this.index_of_color_within_cleaned(0|e)))&&(this.set_cleaned_pxl_colors(0|t,0|e),r=0|t,t=t+1|0),this.increase_color_usage(0|r),this.set_new_pxls(0|n,0|r);this.set_new_pxl_colors(t)},v.prototype.clusterize=function(){this.reset_cluster();var t=0;if(4097===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon12bits)>>>0,(0|t)>>>0);else if(257===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon8bits)>>>0,(0|t)>>>0);else if(65===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon6bits)>>>0,(0|t)>>>0);else if(17===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon4bits)>>>0,(0|t)>>>0);else if(1===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster(0,(0|t)>>>0);this.set_all_cluster_indexes()},v.prototype.process_threshold=function(t){t=(0|t)>>>0;for(var e,n,_=this.bucket_threshold*(t/this.threshold_steps)|0,o=r(t/this.threshold_steps),i=!1,s=new Set,u=0,l=0,c=0,h=0,a=0,p=!1,f=0,g=0,y=0,b=0,d=0,x=0,w=0,O=0,P=0;(0|P)<(0|this.max_cluster);P=(P+1|0)>>>0){for(l=(u+(0|this.get_length_in_index_clusters(0|P))|0)>>>0,x=0|u;(0|x)<(0|l);x=(x+1|0)>>>0){for(b=(0|this.get_an_index_in_clusters((0|x)>>>0))>>>0,e=this.get_a_new_pxl_color((0|b)>>>0),c=(0|this.get_a_color_usage((0|b)>>>0))>>>0,h=this.get_a_color_usage_percent((0|b)>>>0),y=this.get_average_color_usage_percent(0|u,0|l),O=r(h<y?h/y:1/r(h/y)),w=0|u;(0|w)<(0|l);w=(w+1|0)>>>0)(0|x)!=(0|w)&&(d=(0|this.get_an_index_in_clusters((0|w)>>>0))>>>0,n=this.get_a_new_pxl_color((0|d)>>>0),g=((_/1e3+_/1e3*(1-((f=1e3*((p=(0|c)>(0|(a=(0|this.get_a_color_usage((0|d)>>>0))>>>0)))?c/a:a/c)|0)+((0|f)>500?-(f-500)/1.75:(500-f)/1.75|0)|0)/1e3)*o)/(1+o)*1e3|0)>>>0,e.euclidean_match_with(n,((g+g*(1-O))/2|0)>>>0)&&(c=(c+a|0)>>>0,h+=this.get_a_color_usage_percent((0|d)>>>0),O=r(h<y?h/y:1/r(h/y)),this.set_a_color_usage(0|b,0|c),this.set_a_color_usage(0|d,0|c),s.add(n),p?e.blend_with(n,0|f,!1,!1):n.blend_with(e,0|f,!1,!1)));s.size>0&&(i=!0,s.forEach((function(t){t.set(e.subarray(0,4))})),s.clear())}u=0|l}return i},v.prototype.round=function(){if(this.new_pxl_colors_length>4096)for(var t=this.new_pxl_colors_.length>32768?9.6:this.new_pxl_colors_.length>16384?4.8:this.new_pxl_colors_.length>8192?3.2:this.new_pxl_colors_.length>4096?1.6:1,e=0;(0|e)<(0|this.new_pxl_colors_length);e=(e+1|0)>>>0)this.get_a_new_pxl_color((0|e)>>>0).simplify(0|t)},v.prototype.init=function(){return this.round(),this},v.prototype.run=function(){for(var t=!1,e=!0;!t;){for(var r=1;(0|r)<=(0|this.threshold_steps);r=(r+1|0)>>>0)e&&(this.deduplicate(),this.clusterize()),e=this.process_threshold(0|r);this.new_pxl_colors_length<this.best_color_number||!this.is_bucket_threshold_auto||this.bucket_threshold>this.threshold_steps?t=!0:this.new_pxl_colors_length>this.best_color_number&&this.set_bucket_threshold(this.bucket_threshold+4|0)}return this.get_data()};var A=new Uint32Array(t),C=A[0],M=A[1],z=A[2],B=A[3],E=A[4],L=A[5],S=A[6],q=A.slice(6,6+C),D=A.slice(6+C,6+C+M);return new Promise((function(t){t(v({pxls:q,pxl_colors:D,bucket_threshold:z,threshold_steps:B,color_number_bonus:E,best_color_number:L,this_state_bucket_threshold:S}).init().run())}))};`
            + "return t;";

        return new AFunction(asyncs)();
    },

    from: function(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold){

        let cs = this._create_state;
        let f = this._create_func();
        let s = cs(
            pool,
            Uint32Array.from(pxls),
            Uint32Array.from(pxl_colors),
            bucket_threshold,
            threshold_steps,
            color_number_bonus,
            best_color_number,
            state_bucket_threshold
        );

        return {
            // Methods
            new(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold) {
                "use strict";
                s = cs(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold);
            },
            destroy(callback_function = function(){}) {
                if(s !== null) {
                    s.workerp.terminate(callback_function);
                    s = null;
                }else {
                    callback_function("ok");
                }
            },
            compute(callback_function) {
                "use strict";
                if(s !== null) {

                    var array_buffer = new Uint32Array(6+s.p.length+s.pc.length);
                        array_buffer[0] = (s.p.length | 0) & 0xFFFFFFFF;
                        array_buffer[1] = (s.pc.length | 0) & 0xFFFFFFFF;
                        array_buffer[2] = s.bt === "auto" ? 0xFFFFFFFF: (s.bt * 1000 | 0) & 0xFFFFFFFF;
                        array_buffer[3] = (s.ts | 0) & 0xFFFFFFFF;
                        array_buffer[4] = (s.cnb | 0) & 0xFFFFFFFF;
                        array_buffer[5] = (s.bcn | 0) & 0xFFFFFFFF;
                        array_buffer[6] = (s.stb | 0) & 0xFFFFFFFF;
                        array_buffer.set(s.p, 6);
                        array_buffer.set(s.pc, 6+s.p.length|0);

                    s.workerp.exec(

                        f, [array_buffer.buffer]
                    ).catch((e) => {

                        return f(array_buffer.buffer);
                    }).timeout(120 * 1000).then(function(buffer){

                        var array_buffer = new Uint32Array(buffer);
                        var pl = array_buffer[0] & 0xFFFFFFFF;
                        var pcl = array_buffer[1] & 0xFFFFFFFF;
                        var results = new Array(2);
                            results[0] = Uint16Array.from(array_buffer.subarray(2, pl+2|0));
                            results[1] = array_buffer.slice(2+pl|0, 2+pl+pcl|0);

                        callback_function(results);
                    });

                }else {

                    callback_function([]);
                }
            },
        };
    }
};

module.exports = ReducePalette;