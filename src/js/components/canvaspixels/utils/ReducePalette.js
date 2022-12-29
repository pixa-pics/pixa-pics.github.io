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

var t = function(buffer) {
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
        this.new_pxls_ = "buffer" in opts.pxls ? new Uint32Array(opts.pxls.buffer) : Uint32Array.from(opts.pxls);
        this.new_pxl_colors_ = "buffer" in opts.pxl_colors ? SIMDopeColors(opts.pxl_colors.buffer) : SIMDopeColors(Uint32Array.from(opts.pxl_colors));

        this.is_bucket_threshold_auto_ = Boolean(opts.bucket_threshold > 1000);
        opts.bucket_threshold = opts.bucket_threshold || 0;
        opts.bucket_threshold = (opts.bucket_threshold|0) >= 1 ? (opts.bucket_threshold | 0):  opts.this_state_bucket_threshold || 0;

        this.bucket_threshold_ = this.is_bucket_threshold_auto_ ? 1: opts.bucket_threshold;
        this.threshold_steps_ = this.is_bucket_threshold_auto_ ? 1: 3;
        this.best_color_number_ = this.new_pxl_colors_.length / 2 + opts.color_number_bonus | 0;

        this.max_cluster_length_ = 4096+1;
        this.max_cluster_ = 0;
        this.index_clusters_ = new Array(this.max_cluster_length_);
        this.length_clusters_ = new Uint32Array(this.max_cluster_length_);

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
        get: function() {return function(index){return this.pxl_colors_usage_[index|0] / this.new_pxls_.length;}}
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
        var current_color = latest_color;
        var start = 0;
        var stop = 0;
        var color_a, color_b;
        var color_a_usage = 0;
        var color_a_usage_percent = 0;
        var color_b_usage = 0;
        var first_color_more_used = false;
        var color_usage_difference_positive = 0.0;
        var color_usage_difference_flattened_much = 0.0;
        var weighted_threshold = 0.0;
        var average_cluster_color_usage_percent = 0.0;
        var index_of_color_a = 0;
        var index_of_color_b = 0;
        var x = 0, y = 0;
        var color_n_in_cluster = 0;
        var preserve_frequent_color_weight = 0.0;
        var smart = Boolean(this.max_cluster < 4096);

        for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

            color_n_in_cluster = (this.get_length_in_index_clusters(c|0) | 0) >>> 0;
            stop = (start + color_n_in_cluster | 0) >>> 0;

            if(smart) {average_cluster_color_usage_percent = this.get_average_color_usage_percent(start|0, stop|0);}

            for(x = start|0; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;

                // Update color usage and relative variables
                color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
                color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;

                // Start following color snake
                latest_color = {value: color_a, tail: null};
                current_color = latest_color;

                if(smart) {
                    color_a_usage_percent = this.get_a_color_usage_percent((index_of_color_a|0)>>>0);
                    preserve_frequent_color_weight = 1 - ((color_a_usage_percent < average_cluster_color_usage_percent) ? fr(color_a_usage_percent / average_cluster_color_usage_percent): fr(1 / fr(color_a_usage_percent / average_cluster_color_usage_percent)));
                }

                for(y = start|0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                    if((x|0) != (y|0)){

                        index_of_color_b = (this.get_an_index_in_clusters((y|0)>>>0)|0)>>>0;
                        // Update color usage and relative variables
                        color_b = this.get_a_new_pxl_color((index_of_color_b|0)>>>0);
                        color_b_usage = (this.get_a_color_usage((index_of_color_b|0)>>>0) | 0) >>> 0;

                        first_color_more_used = (color_a_usage|0) > (color_b_usage|0);
                        color_usage_difference_positive = (first_color_more_used ? (1000 * color_a_usage / color_b_usage | 0): (1000 * color_b_usage / color_a_usage | 0)) & 1000;

                        if(smart) {

                            if((color_usage_difference_positive|0) > 500) {
                                color_usage_difference_flattened_much = (color_usage_difference_positive - (color_usage_difference_positive-500) * 0.6 | 0) / 1000;
                            }else {
                                color_usage_difference_flattened_much = (color_usage_difference_positive + (500 - color_usage_difference_positive) * 0.6 | 0) / 1000;
                            }
                            
                        }else {

                            color_usage_difference_flattened_much = (color_usage_difference_positive | 0) / 1000;
                        }

                        // 50% threshold + 25% color_usage_difference - 25% color_usage_difference_flattened (Basically smoothen the way it becomed harder for color far from usage to be blended together)
                        weighted_threshold = ((((threshold_1000 / 1000) + (threshold_1000 / 1000 * (1 - color_usage_difference_flattened_much) * weight_applied_to_color_usage_difference)) / (1 + weight_applied_to_color_usage_difference)) * 1000 | 0) >>> 0;  // THRESHOLD + THRESHOLD * WEIGHT / 1 + WEIGHT

                        // The less a color is used the less it requires a great distance to be merged (so we don't have many color used only a few time in the whole image, heavily used color gets preserved better than lowly used ones)
                        if(color_a.euclidean_match_with(color_b,  ((weighted_threshold+weighted_threshold*preserve_frequent_color_weight)/2|0) & 1000)) {

                            // Update color usage and relative variables
                            index_merged = true;
                            color_a_usage = (color_a_usage + color_b_usage | 0) >>> 0;
                            this.set_a_color_usage(index_of_color_a|0, color_a_usage|0);
                            this.set_a_color_usage(index_of_color_b|0, color_a_usage|0);
                            
                            if(smart) {
                                color_a_usage_percent = color_a_usage_percent + this.get_a_color_usage_percent((index_of_color_b|0)>>>0);
                                preserve_frequent_color_weight = (color_a_usage_percent < average_cluster_color_usage_percent) ? fr(color_a_usage_percent / average_cluster_color_usage_percent): fr(1 / fr(color_a_usage_percent / average_cluster_color_usage_percent));
                            }

                            // Adds color to blend to processed colors and stack it to what will be set to be equals with all other color blended
                            latest_color.tail = {value: color_b, tail: null};
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

                if(index_merged) {

                    do {
                        current_color.value.set(latest_color.value);
                        current_color = current_color.tail || null;
                    } while (current_color !== null);
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

        var bucket_threhold_stepover = 5;
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

            if(colors_changed) {
                this.deduplicate();
            }

            if(!this.is_bucket_threshold_auto && this.bucket_threshold > this.threshold_steps){

                is_bucket_threshold_auto_goal_reached = true;
            }else if(this.new_pxl_colors_length < this.best_color_number){

                break;
            }

            this.set_bucket_threshold(this.bucket_threshold+bucket_threhold_stepover|0);
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

// https://www.digitalocean.com/community/tools/minify MINIFY --> var t=function...... AND ADD : return t;
// LZSTRING --> https://codepen.io/Holy-Fire/pen/VNRZme

import bltf from "../../../utils/b64_lzstring_to_function";


const ReducePalette = {

    _create_func: function (){
        return bltf("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");
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
            compute(callback_function, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold) {
                "use strict";

                var array_buffer = new Uint32Array(6+pxls.length+pxl_colors.length);
                    array_buffer[0] = (pxls.length | 0) & 0xFFFFFFFF;
                    array_buffer[1] = (pxl_colors.length | 0) & 0xFFFFFFFF;
                    array_buffer[2] = (((bucket_threshold === "auto") ? 99999: bucket_threshold * 1000) | 0) & 0xFFFFFFFF;
                    array_buffer[3] = (threshold_steps | 0) & 0xFFFFFFFF;
                    array_buffer[4] = 0 & 0xFFFFFFFF;
                    array_buffer[5] = (pxl_colors.length / 2 | 0) & 0xFFFFFFFF;
                    array_buffer[6] = (state_bucket_threshold | 0) & 0xFFFFFFFF;
                    array_buffer.set(Uint32Array.from(pxls), 6);
                    array_buffer.set(Uint32Array.from(pxl_colors), 6+pxls.length|0);

                /*pool.exec(

                    f, [array_buffer.buffer]
                ).catch((e) => {

                    return f(array_buffer.buffer);
                }).timeout(120 * 1000)*/t(array_buffer.buffer).then(function(buffer){

                    var array_buffer = new Uint32Array(buffer);
                    var pl = array_buffer[0] & 0xFFFFFFFF;
                    var pcl = array_buffer[1] & 0xFFFFFFFF;
                    var results = new Array(2);
                        results[0] = Uint16Array.from(array_buffer.subarray(2, pl+2|0));
                        results[1] = Uint32Array.from(array_buffer.subarray(2+pl|0, 2+pl+pcl|0));

                    callback_function(results);
                });
            }
        };
    }
};

module.exports = ReducePalette;