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
    var PR = fr(0.2126), // +0.1
        PG = fr(0.7152), // -0.2
        PB = fr(0.0722), // +0.1
        PA = fr(1.0000);

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

        if(with_main_buffer instanceof Uint8Array) {

            this.storage_uint8_ =  with_main_buffer;
        }else {

            this.storage_uint8_ = new Uint8Array("buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer, i(offset_4bytes, 4));
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

    SIMDopeColor.prototype.simplify = function(of) {
        var temp = Uint8Array.of(
            multiply_uint(r(this.a / of), of),
            multiply_uint(r(this.b / of), of),
            multiply_uint(r(this.g / of), of),
            multiply_uint(r(this.r / of), of),
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
                added_uint8x4.set(ArrayBuffer(4));
            }else if(added_uint8x4.is_fully_transparent()) {
                this.set(ArrayBuffer(4));
            }
        }else {

            var alpha = (alpha_addition|0) != 0 ?
                divide_uint(plus_uint(this.a, added_uint8x4.a), 2):
                inverse_255(divide_255(i(inverse_255(added_uint8x4.a), inverse_255(this.a))));

            this.set(SIMDopeColor.merge_scale_of_255_a_fixed(
                added_uint8x4, divide_uint(i(added_uint8x4.a, 255), alpha),
                this, divide_255(i(this.a, divide_uint(i(inverse_255(added_uint8x4.a), 255), alpha))),
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
        this.subarray[0] = clamp_uint8(divide_uint(i(this.a, n), 1000));
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
                divide_255(i(t.b, of_b)),
                divide_255(i(t.g, of_g)),
                divide_255(i(t.r, of_r))
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
        this.threshold_steps_ = this.is_bucket_threshold_auto_ ? 1: 3;
        this.best_color_number_ = this.new_pxl_colors_.length / 2 + opts.color_number_bonus | 0;

        this.max_cluster_ = this.new_pxl_colors_.length > 16384 ? 4096+1: this.new_pxl_colors_.length > 8192 ? 256+1: this.new_pxl_colors_.length > 2048 ? 64+1: this.new_pxl_colors_.length > 512 ? 16+1: 1;
        this.index_clusters_ = new Array(this.max_cluster_);
        this.length_clusters_ = new Uint32Array(this.max_cluster_);

        this.pxl_colors_usage_ = new Uint32Array(this.new_pxl_colors_.length);
        this.all_index_clusters_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_lookup_ = {};
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

                    while (current_color !== null) {
                        current_color.value.set(latest_color.value);
                        current_color = current_color.tail || null;
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

            var simplify_of = this.new_pxl_colors_.length > 65536 ? 17: this.new_pxl_colors_.length > 32768 ? 7.5: this.new_pxl_colors_.length > 16384 ? 5: this.new_pxl_colors_.length > 8192 ? 3: this.new_pxl_colors_.length > 4096 ? 1.5: 1;
            for(var l = 0; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {
                this.get_a_new_pxl_color((l|0)>>>0).simplify(simplify_of|0);
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
        var colors_changed = false;

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
        }).init().run().output("heap"));
    });
};
*/
// return function(t){"use strict";var e=function(t,e){return 4294967295&Math.imul(4294967295&(0|t),4294967295&(0|e))},r=Math.fround,n=function(t){return 4294967295&(.5+t|0)},o=function(t){return 4294967295&(0|e(0|(t|=0),0|t))},_=function(t){if(0==(0|(t=4294967295&(0|t)))||1==(0|t))return 0|t;for(var e=1,r=1;(0|r)<=(0|t);)r=4294967295&((e=4294967295&(e+1|0))*e|0);return 4294967295&(e-1|0)},i=r(.2126),s=r(.7152),u=r(.0722),l=r(1),c=(0|_(255*i*255+255*s*255+255*u*255+255*l*255|0))>>>0,h=(255*i+255*s+255*u+255*l|0)>>>0;function a(t,e){return(t+e|0)>>>0}function p(t,e){return 4294967295&(0|Math.imul(4294967295&(0|t),4294967295&(0|e)))}function f(t){return t<<2}function g(t,e){return 4294967295&(t/e|0)}function y(t){return 4294967295&(t>>2|0)}function b(t){return 4294967295&(t>>5|0)}function d(t){return 4294967295&(t>>6|0)}function x(t){return 4294967295&(t/85-.012|0)}function w(t){return 4294967295&(t>>7|0)}function O(t){return 255&(0|t)}function P(t){return 255&(255-t|0)}function j(t){return 255&(t/255|0)}function m(t){return(0|t)<0?4294967295&(0|-t):4294967295&(0|t)}var k=function t(r,n){if(n=n||0,!(this instanceof t))return new t(r,n);r instanceof Uint8Array?this.storage_uint8_=r:this.storage_uint8_=new Uint8Array("buffer"in r?r.buffer:r,e(n,4))};k.new_of=function(t,e,r,n){var o=new Uint8Array(4);return o[3]=O(t),o[2]=O(e),o[1]=O(r),o[0]=O(n),k(o)},Object.defineProperty(k.prototype,"r",{get:function(){return O(this.storage_uint8_[3])}}),Object.defineProperty(k.prototype,"g",{get:function(){return O(this.storage_uint8_[2])}}),Object.defineProperty(k.prototype,"b",{get:function(){return O(this.storage_uint8_[1])}}),Object.defineProperty(k.prototype,"a",{get:function(){return O(this.storage_uint8_[0])}}),Object.defineProperty(k.prototype,"uint32",{get:function(){return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(k.prototype,"rgbaon4bits",{get:function(){return(w(this.storage_uint8_[3])<<3|w(this.storage_uint8_[2])<<2|w(this.storage_uint8_[1])<<1|w(this.storage_uint8_[0])<<0|0)>>>0}}),Object.defineProperty(k.prototype,"rgbaon6bits",{get:function(){return((16^x(this.storage_uint8_[3]))+(8^x(this.storage_uint8_[2]))+(4^x(this.storage_uint8_[1]))+(0^x(this.storage_uint8_[0]))|0)>>>0}}),Object.defineProperty(k.prototype,"rgbaon8bits",{get:function(){return(d(this.storage_uint8_[3])<<6|d(this.storage_uint8_[2])<<4|d(this.storage_uint8_[1])<<2|d(this.storage_uint8_[0])<<0|0)>>>0}}),Object.defineProperty(k.prototype,"rgbaon12bits",{get:function(){return(b(this.storage_uint8_[3])<<9|b(this.storage_uint8_[2])<<6|b(this.storage_uint8_[1])<<3|b(this.storage_uint8_[0])<<0|0)>>>0}}),Object.defineProperty(k.prototype,"offset",{get:function(){return y(this.storage_uint8_.byteOffset)}}),Object.defineProperty(k.prototype,"buffer",{get:function(){return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,a(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(k.prototype,"subarray",{get:function(){return this.storage_uint8_.subarray(0,4)}}),Object.defineProperty(k.prototype,"set",{get:function(){return function(t){t instanceof k?this.storage_uint8_.set(new Uint8Array(t.buffer)):"subarray"in t?this.storage_uint8_.set(t.subarray(0,4)):this.storage_uint8_.set(t)}}}),Object.defineProperty(k.prototype,"slice",{get:function(){return function(t,e){return this.storage_uint8_.slice(t,e)}}}),k.prototype.is_fully_transparent=function(){return(4294967295&(0|this.a))==(4294967295&(0|0))},k.prototype.simplify=function(t){var e=Uint8Array.of(p(n(this.a/t),t),p(n(this.b/t),t),p(n(this.g/t),t),p(n(this.r/t),t));return this.set(e),this},k.prototype.blend_with=function(t,r,n,o){if(n|=0,o|=0,t.multiply_a_1000(0|r),0!=(0|n))this.is_fully_transparent()?t.set(ArrayBuffer(4)):t.is_fully_transparent()&&this.set(ArrayBuffer(4));else{var _=0!=(0|o)?g(a(this.a,t.a),2):P(j(e(P(t.a),P(this.a))));this.set(k.merge_scale_of_255_a_fixed(t,g(e(t.a,255),_),this,j(e(this.a,g(e(P(t.a),255),_))),_)),t.set(this)}},k.prototype.euclidean_match_with=function(t,e){return 1e3==(0|(e=(0|e)>>>0))||(0==(0|e)?(0|this.uint32)==(0|t.uint32):(_(i*o(this.r-t.r|0)+s*o(this.g-t.g|0)+u*o(this.b-t.b|0)+l*o(this.a-t.a|0)|0)/c*1e3|0)<(0|e))},k.prototype.manhattan_match_with=function(t,r){return 1e3==(0|(r=(0|r)>>>0))||(0==(0|r)?(0|this.uint32)==(0|t.uint32):((e(i,m(this.r-t.r|0))+e(s,m(this.g-t.g|0))+e(u,m(this.b-t.b|0))+e(l,m(this.a-t.a|0))|0)/h*1e3|0)<(0|r))},k.prototype.multiply_a_1000=function(t){this.subarray[0]=O(g(e(this.a,t),1e3))},k.prototype.copy=function(){return k(this.slice(0,4))},k.with_a=function(t,e){var r=t.slice(0,4);return r[0]=O(e),k(r)},k.merge_scale_of_255_a_fixed=function(t,e,r,n,o){return e=O(e),n=O(n),o=O(o),k.merge_with_a_fixed(k.scale_rgb_of_on_255(t,e,e,e),k.scale_rgb_of_on_255(r,n,n,n),o)},k.scale_rgb_of_on_255=function(t,r,n,o){return k(Uint8Array.of(0,j(e(t.b,o)),j(e(t.g,n)),j(e(t.r,r))))},k.merge_with_a_fixed=function(t,e,r){return k(Uint8Array.of(O(r),a(t.b,e.b),a(t.g,e.g),a(t.r,e.r)))};var v=function t(e,r,n){if(!(this instanceof t))return new t(e);this.storage_="buffer"in e?e.buffer:e,r|=0,n=0|n||0|this.storage_.byteLength,this.storage_uint8_array_=new Uint8Array(this.storage_,r,n),this.storage_uint32_array_=new Uint32Array(this.storage_,r,y(n))};Object.defineProperty(v.prototype,"length",{get:function(){return this.storage_uint32_array_.length}}),Object.defineProperty(v.prototype,"buffer",{get:function(){return this.storage_uint8_array_.buffer}}),Object.defineProperty(v.prototype,"buffer_setUint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_[t]=O(e)}}}),Object.defineProperty(v.prototype,"buffer_getUint8",{get:function(){return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(v.prototype,"buffer_getUint8a",{get:function(){return function(t,e){return e=a(t|=0,f(e=(e|=0)||1)),this.storage_uint8_array_.subarray(t,e)}}}),Object.defineProperty(v.prototype,"buffer_setUint32",{get:function(){return function(t,e){this.storage_uint32_array_[0|t]=function(t){return(0|t)>>>0&4294967295}(e)}}}),Object.defineProperty(v.prototype,"buffer_getUint32",{get:function(){return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(v.prototype,"subarray_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.subarray(t,e)}}}),Object.defineProperty(v.prototype,"slice_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.slice(t,e)}}}),Object.defineProperty(v.prototype,"subarray_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.subarray(f(t),f(e))}}}),Object.defineProperty(v.prototype,"slice_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.slice(f(t),f(e))}}}),v.prototype.get_element=function(t){return k(this.buffer,0|t)},v.prototype.subarray=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(t,e)};var U=function t(e){if(e=e||{},!(this instanceof t))return new t(e);e.pxl_colors=e.pxl_colors||new Uint32Array(0),e.pxls=e.pxls||new Uint32Array(0),this.new_pxls_="buffer"in e.pxls?new Uint32Array(e.pxls.buffer):Uint32Array.from(e.pxls),this.new_pxl_colors_="buffer"in e.pxl_colors?v(e.pxl_colors.buffer):v(Uint32Array.from(e.pxl_colors)),this.is_bucket_threshold_auto_=!!(e.bucket_threshold>1e3),e.bucket_threshold=e.bucket_threshold||0,e.bucket_threshold=(0|e.bucket_threshold)>=1?0|e.bucket_threshold:e.this_state_bucket_threshold||0,this.bucket_threshold_=this.is_bucket_threshold_auto_?1:e.bucket_threshold,this.threshold_steps_=this.is_bucket_threshold_auto_?1:3,this.best_color_number_=this.new_pxl_colors_.length/2+e.color_number_bonus|0,this.max_cluster_=this.new_pxl_colors_.length>16384?4097:this.new_pxl_colors_.length>8192?257:this.new_pxl_colors_.length>2048?65:this.new_pxl_colors_.length>512?17:1,this.index_clusters_=Array(this.max_cluster_),this.length_clusters_=new Uint32Array(this.max_cluster_),this.pxl_colors_usage_=new Uint32Array(this.new_pxl_colors_.length),this.all_index_clusters_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_lookup_={}};Object.defineProperty(U.prototype,"reset_deduplicate",{get:function(){return function(t){this.clean_pxl_colors_lookup_={},this.pxl_colors_usage_.fill(0,0,0|t),this.clean_pxl_colors_.fill(0,0,0|t)}}}),Object.defineProperty(U.prototype,"index_of_color_within_cleaned",{get:function(){return function(t){return(0|this.clean_pxl_colors_lookup_[(0|t)>>>0])-1|0}}}),Object.defineProperty(U.prototype,"set_cleaned_pxl_colors",{get:function(){return function(t,e){this.clean_pxl_colors_[(0|t)>>>0]=(0|e)>>>0,this.clean_pxl_colors_lookup_[(0|e)>>>0]=(t+1|0)>>>0}}}),Object.defineProperty(U.prototype,"increase_color_usage",{get:function(){return function(t){this.pxl_colors_usage_[(0|t)>>>0]=(this.pxl_colors_usage_[(0|t)>>>0]+1|0)>>>0}}}),Object.defineProperty(U.prototype,"set_new_pxls",{get:function(){return function(t,e){this.new_pxls_[(0|t)>>>0]=(0|e)>>>0}}}),Object.defineProperty(U.prototype,"set_new_pxl_colors",{get:function(){return function(t){this.new_pxl_colors_=v(this.clean_pxl_colors_.buffer.slice(0,f(0|t)))}}}),Object.defineProperty(U.prototype,"get_a_new_pxl_color_from_pxl_index",{get:function(){return function(t){return 4294967295&this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[0|t])}}}),Object.defineProperty(U.prototype,"reset_cluster",{get:function(){return function(){this.max_cluster_=this.new_pxl_colors_.length>16384?4097:this.new_pxl_colors_.length>8192?257:this.new_pxl_colors_.length>2048?65:this.new_pxl_colors_.length>512?17:1,this.length_clusters_.fill(0,0,0|this.max_cluster);for(var t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.index_clusters_[0|t]=[]}}}),Object.defineProperty(U.prototype,"add_in_indexes_cluster",{get:function(){return function(t,e){this.index_clusters_[(0|t)>>>0].push((0|e)>>>0)}}}),Object.defineProperty(U.prototype,"set_all_cluster_indexes",{get:function(){return function(){var t=0,e=0;for(t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.all_index_clusters_.set(this.index_clusters_[(0|t)>>>0],(0|e)>>>0),e=(e+this.get_length_in_index_clusters(0|t)|0)>>>0}}}),Object.defineProperty(U.prototype,"get_length_in_index_clusters",{get:function(){return function(t){return(0|this.index_clusters_[(0|t)>>>0].length)>>>0}}}),Object.defineProperty(U.prototype,"get_in_cluster_lengths",{get:function(){return function(t){return(0|this.length_clusters_[(0|t)>>>0])>>>0}}}),Object.defineProperty(U.prototype,"get_an_index_in_clusters",{get:function(){return function(t){return(0|this.all_index_clusters_[0|t])>>>0}}}),Object.defineProperty(U.prototype,"get_a_color_usage",{get:function(){return function(t){return(0|this.pxl_colors_usage_[0|t])>>>0}}}),Object.defineProperty(U.prototype,"set_a_color_usage",{get:function(){return function(t,e){return this.pxl_colors_usage_[0|t]=(0|e)>>>0}}}),Object.defineProperty(U.prototype,"get_a_color_usage_percent",{get:function(){return function(t){return this.pxl_colors_usage_[0|t]/this.new_pxls_.length}}}),Object.defineProperty(U.prototype,"get_average_color_usage_percent",{get:function(){return function(t,e){var r=0,n=0,o=0;for(n=t;(0|n)<(0|e);n=(n+1|0)>>>0)o=(0|this.get_an_index_in_clusters((0|n)>>>0))>>>0,r+=this.pxl_colors_usage_[0|o]/this.new_pxls_.length;return r/(e-t|0)}}}),Object.defineProperty(U.prototype,"get_a_new_pxl_color",{get:function(){return function(t){return this.new_pxl_colors_.get_element(0|t)}}}),Object.defineProperty(U.prototype,"max_cluster",{get:function(){return 0|this.max_cluster_}}),Object.defineProperty(U.prototype,"threshold_steps",{get:function(){return 0|this.threshold_steps_}}),Object.defineProperty(U.prototype,"new_pxls_length",{get:function(){return 0|this.new_pxls_.length}}),Object.defineProperty(U.prototype,"new_pxl_colors_length",{get:function(){return 0|this.new_pxl_colors_.length}}),Object.defineProperty(U.prototype,"best_color_number",{get:function(){return 0|this.best_color_number_}}),Object.defineProperty(U.prototype,"bucket_threshold",{get:function(){return 0|this.bucket_threshold_}}),Object.defineProperty(U.prototype,"is_bucket_threshold_auto",{get:function(){return this.is_bucket_threshold_auto_}}),Object.defineProperty(U.prototype,"set_bucket_threshold",{get:function(){return function(t){this.bucket_threshold_=0|t}}}),Object.defineProperty(U.prototype,"get_data",{get:function(){return function(){return Array.of(this.new_pxls_,this.new_pxl_colors_.slice_uint32(0,this.new_pxl_colors_.length))}}}),U.prototype.output=function(t){t=t||"heap";var e=this.get_data();if("heap"==t){var r=new Uint32Array(2+e[0].length+e[1].length);return r[0]=4294967295&(0|e[0].length),r[1]=4294967295&(0|e[1].length),r.set(e[0],2),r.set(e[1],2+e[0].length),r.buffer}return e},U.prototype.deduplicate=function(){this.reset_deduplicate(0|this.new_pxl_colors_length);for(var t=0,e=0,r=0,n=0,o=0|this.new_pxls_length;(0|n)<(0|o);n=(n+1|0)>>>0)e=0|this.get_a_new_pxl_color_from_pxl_index(0|n),-1==(0|(r=0|this.index_of_color_within_cleaned(0|e)))&&(this.set_cleaned_pxl_colors(0|t,0|e),r=0|t,t=t+1|0),this.increase_color_usage(0|r),this.set_new_pxls(0|n,0|r);this.set_new_pxl_colors(t)},U.prototype.clusterize=function(){this.reset_cluster();var t=0;if(4097===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon12bits)>>>0,(0|t)>>>0);else if(257===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon8bits)>>>0,(0|t)>>>0);else if(65===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon6bits)>>>0,(0|t)>>>0);else if(17===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon4bits)>>>0,(0|t)>>>0);else if(1===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster(0,(0|t)>>>0);this.set_all_cluster_indexes()},U.prototype.process_threshold=function(t){t=(0|t)>>>0;for(var e,n,o=this.bucket_threshold*(t/this.threshold_steps)|0,_=t/this.threshold_steps,i=!1,s={},u=s,l=0,c=0,h=0,a=0,p=0,f=!1,g=0,y=0,b=0,d=0,x=0,w=0,O=0,P=0,j=!!(this.max_cluster<4096),m=0;(0|m)<(0|this.max_cluster);m=(m+1|0)>>>0){for(c=(l+((0|this.get_length_in_index_clusters(0|m))>>>0)|0)>>>0,j&&(b=this.get_average_color_usage_percent(0|l,0|c)),w=0|l;(0|w)<(0|c);w=(w+1|0)>>>0){for(d=(0|this.get_an_index_in_clusters((0|w)>>>0))>>>0,e=this.get_a_new_pxl_color((0|d)>>>0),h=(0|this.get_a_color_usage((0|d)>>>0))>>>0,u=s={value:e,tail:null},j&&(a=this.get_a_color_usage_percent((0|d)>>>0),P=1-r(a<b?a/b:1/r(a/b))),O=0|l;(0|O)<(0|c);O=(O+1|0)>>>0)(0|w)!=(0|O)&&(x=(0|this.get_an_index_in_clusters((0|O)>>>0))>>>0,n=this.get_a_new_pxl_color((0|x)>>>0),g=1e3&((f=(0|h)>(0|(p=(0|this.get_a_color_usage((0|x)>>>0))>>>0)))?1e3*h/p|0:1e3*p/h|0),y=((o/1e3+o/1e3*(1-(j?(0|g)>500?(g-.6*(g-500)|0)/1e3:(g+.6*(500-g)|0)/1e3:(0|g)/1e3))*_)/(1+_)*1e3|0)>>>0,e.euclidean_match_with(n,1e3&((y+y*P)/2|0))&&(i=!0,h=(h+p|0)>>>0,this.set_a_color_usage(0|d,0|h),this.set_a_color_usage(0|x,0|h),j&&(a+=this.get_a_color_usage_percent((0|x)>>>0),P=r(a<b?a/b:1/r(a/b))),s.tail={value:n,tail:null},s=s.tail,f?e.blend_with(n,0|g,!1,!1):n.blend_with(e,0|g,!1,!1)));if(i)for(;null!==u;)u.value.set(s.value),u=u.tail||null}l=0|c}return i},U.prototype.round=function(){if(this.new_pxl_colors_length>4096)for(var t=this.new_pxl_colors_.length>65536?17:this.new_pxl_colors_.length>32768?7.5:this.new_pxl_colors_.length>16384?5:this.new_pxl_colors_.length>8192?3:this.new_pxl_colors_.length>4096?1.5:1,e=0;(0|e)<(0|this.new_pxl_colors_length);e=(e+1|0)>>>0)this.get_a_new_pxl_color((0|e)>>>0).simplify(0|t)},U.prototype.init=function(){return this.round(),this.deduplicate(),this.clusterize(),this},U.prototype.run=function(){for(var t=!1,e=!1;!t;){for(var r=1;(0|r)<=(0|this.threshold_steps);r=(r+1|0)>>>0)e&&(this.deduplicate(),this.clusterize()),e=this.process_threshold(0|r);if(e&&this.deduplicate(),!this.is_bucket_threshold_auto&&this.bucket_threshold>this.threshold_steps)t=!0;else if(this.new_pxl_colors_length<this.best_color_number)break;this.set_bucket_threshold(this.bucket_threshold+5|0)}return this};var A=new Uint32Array(t),z=A[0],M=A[1],B=A[2],L=A[3],q=A[4],C=A[5],D=A[6],E=A.slice(6,6+z),F=A.slice(6+z,6+z+M);return new Promise((function(t){t(U({pxls:E,pxl_colors:F,bucket_threshold:B,threshold_steps:L,color_number_bonus:q,best_color_number:C,this_state_bucket_threshold:D}).init().run().output("heap"))}))}
// https://www.digitalocean.com/community/tools/minify MINIFY --> var t=function...... AND ADD : return t;


import LZEL_92 from "../../../utils/LZEL92_loader/LZEL_92_loader";


const ReducePalette = {

    _create_func: function (){
        return LZEL_92(`UraniumJS! H~=2;NJPwbkh6l5rN,P %r3q6Pi##PX.[MIdijF>y_A.*,o]D]GeS_]h.!P§(3¡7S!=kbNhs3QU¡ExFJymlSD{Q_jDxcS:_,F#MI0%gDXRYMJpj8F@99mE|Ho0!H2>B§[!a8Ka-lLmDY~JC;MzC>cG~EBk]#iM|.F?dAW^Uf.{4.>Lf~]XABr-tsoL)M_:  arua3|ki§vbk,U¡D3LuHkBk-q3ud:^]qK-Q,Ka¡G>!&nzpM[4&0E{vJ(EAOHVtW%¡.pvrCpvT¡s|^2y!-i.=_-{dXkSF-:S%,6T?bbu@¡lH&:gr6A~C,rpikvTEz<7Y8T*3H_o_St+]:(=hwVoD9LN(~#!lJBW=cQG*uD8o3A^0ch]cyGxg;gDv@7gZfPY)6A.qqi*J 1ox.Om<{@@-:#Q=Dp1i3>AsW#~<Z+MV8&u!EK{§(P )+!:-OFOUI|_HV>^>h7Gz¡_-IZ%8;AX,]0 p30~§H,LhLZyLDS1#=2rJBBR<x0§¡9?9JKQ0fDc¡fd;Okjc?Yl=e&t!KgFO!n5fekQYu8g<a(hC+o|Qbe:+:~]2L+{!zfcK093!=#NH~R.]X,tn5#==8aTsbo.:EzgGqbiahjE(a!q&Wk s0j]<MjV+?!Q7#CCY§LcX<(@mirHFYkW^5:ESv§Hm_S?4I9Pji<1T¡j2]{78.>_¡.B§:OlL^^<^UM%w.zjmYLaFrs >Ibm72giR?p¡9E WGe[3K:0b-qveY?~pOUpuV:ck{bF,omyADRuqm]9pXLnM>Hr1C||gMH&S#4D_N-¡J_{^7#p&.8BtdzD)%dwD.¡1)x(VEg!v7.0noz.Ia,k=xcr|(rlz§1yaZNRsL9~h^L[D)y?RIJHfumfUbF&0Hib%XOEY§e{%C1x5_pcKPDh^b=qg7G~>b GY:7Rj}c!I*(Flz @Z{qVSU_Li0X;?O>I&RT^Hcxpdf9v5BQez 6 lU3hXC%zef§99#8p-WGrlf4|W^6XnlL0QvP11jUNEsI}^#0ga~RrCw§<i7SV{C|gu¡ :m_5n9nayhLQ&k83>QE~b*_bt;o39bh{E!;VU^x!h1a*y§}^x§gmERN<rzyc5PfYA_z4hg4+(X,j{uI7DuhXqLbh*LjVJe§j0MB5[x<R^ZC¡.=pc[FOlQMo^KfaZ[2cR¡^}Jk,j>aR;?C+a.UP9DLH94]V29_YDX2E78zQz(h45d3Y, 60f~}+{r(VBJus(¡A~z#zeK§)W)XIpYKPVCij92z1EZu<1rs-+C7jW:Us08e<I.+Aw3ul5R<|r(-7?F1l>aN(FIW#AanG^bxioH*-opH=o~6L~eTo!?NuR=U}8AU2!VsD[BAbQ0Fpl my]l3JV97|O!>x3IY)+p0&=RQq9ugII3ggO]T§Z*%*-2e]@mb7#Rr56x_Uecb3d=unDX§z!AYK_dC75*dZ~J;%aoe7ZrUYG%ses VBo(Fy%Ddv{KwoN|[Zg§.;jEtBQr.EZrG:H#Z¡Nt5#quUPMK=AF,+iIm +x[(Htd9Iev!s]U*Ogyl9F-#¡N%yzicsJt0.,{]hV#DAFp_0@*#a6yZH0#)akT|=r6PAvOK%-MLTDDnJG=u.mDn{-:@tb_hT6B#)r;d85Nw;10kh;5#B4 Ys!?SA§;Hiuwz6+!MQ|#[§bwtR>w;QHyJwl@.b(x0tEyw+be§wc{9a5e,mUrLN>Q:§AIP8RorV<>&Aq1ybK)YctL#§cL§&¡),jh>}j4WET6%9FpG;Z4Gmp*M@0n{ks-LN5h<[d8iy Vvu4 D*H3{E cN9¡np§I0 FsWt(6gkjZY9=iSSEh)<2T}V}OF]#U{iC;.1I¡#]JeqQ5,Hob^%Q% Jj§TulVfhM+c^ho] kji§FDPk¡]VfD@rRaWDS=DriG§Ic§wy8wTjV8Ut:u+BHYSe:X0A%xw[}15zuW1=8stL#KXMH<l¡G.Enj e.r[}q^o.k=],S6RCmUeI5NNlHu-AJ5%<N}&] -z[~-7J^LzJO2*)8|Cp|k~-+IMFC>a1XGQkz^ .71|^;8-yq]Xa_:l#:!:uZ;tT2Wz7cIorz:i^j YV otR*[5}effI5Y{?4n=¡2g2u=e]q0_{P,z6e=np<]_wN@0G@Exqn1L=n<;8#>-MW,z~:%=Ub_bcz*H-d%VE{r^60CQeN[xn;tc64Nzy# NK.NFOc3N!=]iTU%1Uj~&XC%I+rOeEUMb-:tBkfL]R{WwQ,z&.Sq*owVBi¡s~6o?)y]P~|>txCup(8@§(:q>&6CsetBR^[xJ!7XF;37YeS:5&^reEUE10*6&is22#tT^¡A{A33*{+*rP]IIm%K¡5YuWlG<y{OH4vs3Q]Rw-a[#h<x¡UWgB>sY2GZQBKpas)d_CF*,:pDH=Z|S!h4KZp2G7¡d=Rl cCd4}wRHq[*0QjFRp4_Hw*=@Nyq|8oBM*E3+0Pcrwih76WN4T.~JNuPq-u7,UEitb)~=)0x<a[F xT,7CYx>k#YxAbAfU38B|?7uUQ!Ti)CYMe#Fl*n8g-¡WvnwK¡*EZ&eA>SJ<JI:9%Y§+{MZF;Q.?I<57mnhs+J5c[=:Ix2^T8Fr=b-BCEBp4;:SS*DcS0;_V3PzUsoC@rjG4q@U[)EsP:u,Xc8B^Of2WA_cZ#Qjw&x;?5AXT)bFP tjzCcn9{{OHU.@1jJ^|fhK@@FamiGlsGKksfqIj8HdrD_wXO¡2c¡.E*~Ma=d-hF,yY*zc^8h2tb Dk7BrJ§vl-gTu]n+g456Q+4)SFo5F?(WdmRrov?+8:rR<C{f)kZashXdMH[BtRn§_m!AV8%yO3hOkNKSsw|inc_s+EX3ngJib@sihHNAhG5:[0+lBw>§M9m+_=]-o1?Aba:E+?DmOy3E>3[¡^¡EsY¡*J{F9v@xnf}AbI!A#Kntm{R~WGrruyw-k=hbY~<#yAyd<&vU]¡§8z!S[?s=G!.]W?7^¡#~#H@{3~W~yzo!Lf}|CGX_w?O& c[-k-~Yvo;6{8lcNNRtu_wU<w?yM§R;~Y3NMiTuxC¡Du)4 ofhd1##!¡ynfDve=7_F_WR§<yiTUACwSa_g0}?_kwA5AxZB!~tjU>9T3@ItG%! X5D<BNWTwBAF:s[TLt;Nhx:v{8fVi&o !~SaDm>[4me,?7(T|8<ff+4YPeU8K4]¡q,F4P3?fUqUNa§v~h3N-NMOyJap~x%]4&BoC)+ g>uB_3:]r?B!>+|j7{tTNdcs[le: fSx?Df>L%¡§[?A~)A:A*A8QcIL:.:Pc16 !oEdp19¡Uk_IqyKi%yWf0fti~c_|[-pE0Q?hpGACWXoOFZ7yW,Vyj:w[<wr?S9CLp|jqFvG~GP*.&)BDTCvR!&DOz-26t@ZgF)oyMhFx§R%qNM(lWYcT3|8pQ=IwkfMFU(D4)f2 d==5m§^1x& @{o;Zh},z=eHM2=QBi@7|5]u=A5^*A&^d#§;=§+8mG9[¡{GJj~pZ?sV^aYlK9qo&IO1f!{<yih7)f5i;Ah|P5[c!MIsj=SzrjbU;mL%Q=,a5*MP:xFXp#d*D#CCI7m{pdmZ6?Lh|U_3?}~0L:FB5c^C_d5)<4^§#gT! |x(IG3DW}s>DdrPYPD!au 498ll#:!f1}6S%5@?kNYfO§,=ntd{xth,dF47{6IH2§^lc^CZ#|Ppjq5)afd7o¡,PKM-;6q(FKgJN¡Bct^<5oBsZJP§0R|tcWkYwrwXQ:;N=2P[NF)¡;qL*kJk1vp -vAH=@QlL4sl[j<xbiO¡{_4:EQA?RRrWaGO.L§I8*R0WkO4AL%%J1UNMId1Yi1QGp;wy%>U[#sNVTPEg;)%^;hVo9WZ{8|K;{i2x+X¡zJz-%nf%@-IOpZjCh0[mGyjP3VUu>{[O§>cx,14hqrzkU&FF*xJ<QAM=Yp_us6IC7sBZh={¡3&EDT,gTqXVo<Bn[qy;xp1WNskxYYDXe<wcUo1LHbMYuPoW=¡f4u5W63(W.NnG-fkbKpo|m5m?Dj_SWKTAShM=2:,1n9O%¡F>{e<H0ycZA-z_v!?FgW0Z1m;HWE2zUCb)QCQU?7Gtg_pn)|RJR>%NQpB?H.<zR*,PsE^Jsvn5§Wp?P8H-,@h?[C]7?@+V}0§tByQU47+n12raLZy;bl3^u;E+yFaoOMvu{!_:SW[&)yplqI8k_v~O^P[9cjhH1-Dx7,(TYB)z#(.7yKEce#{{E&L§UV_p8DDhjE=§C{N1fA.<5z%(h_=yc(k k0E>j.z:yC*M{:yEhubRhg)j> ^E:2A!S2(¡9NK@{[&jC;aje-CJ§hEcq3hFw?&;W7FTn+i.C-_~Z5sahqql&^}Mqz#S9R+HH>Y**_CwAY&kvpIQs0OeO~ %67>v5o@bs<-DdE%1~!1y.TPE;O%&7@6LuLbE<6NNx#x-6blji).Dw^C 9;t!cue^ngC@h31-BgUu¡gAfgtq J9qYawf^¡ZN;dq§X)u7lg.t¡jIK5wXQMs5a>§G1v§QPaeo@=7k}X<Z:h^2bM~C[cQ=Ao>CSr{-V#H }S1(vt~)=D<;iD}^WkG.S1B_Qwxk>%§?YvRA%tVC5&so^tMqTZbN[=L+CYC~=w1W3N M>1yh0j% Wqgx6JuD~30:RPS(s~_#+%VbXN^Jc~53fA;&;@hc>YBHlmTu+^DPem;9}1p^Y]}1LS{C*#df1KZy+9a?,RO:B#(1l*dwOyv+UdUjNQJ]%Kx9~sY@,Y531qB!^Q4*_d2maW%LdechW#J5TB¡#Y3yfSSmhgFr2Q0E9(8%I3:},Pk @Tj!;^%BT2:xJ=OI7?RT)pn4k&66L:yBu-ChP5mmoZh7f4NB:^~Ti*X#{VES%t?xeiYMzS¡v L(Zb8K[%Bw!#nP~kV9[flEG;3;yDUVf§1e%o5:@*3#wFXIp_8cA<>SZt3bSh%;16}¡1#T{e?<mDrQwaV26wtR]i1iF|4<VSa~-e2)Dxu|3tt,4t_4DcU%gR(-YFq*bxBO%]qR|fZ@K>g(sHt?:j#b~mb-¡GRh[43YrV8XCXX|%DL>J3G F-Lk%I#O8+XSyGnAaMut K]{;S4(1|b+B5bvMr§X¡CyfKb¡0% B4c[Cx§1^}|c(]SU2vB!4Z1 >6Pp]*ki-1{L<z|D:m(¡v¡x6O]4{).Eyl-ZA)Xx vJw]WsSZ^c>^N%x^88w%bba,4uU?xPc^polvYrxp4dNu_ E0y;P85)I:f[MeE8s-hG7KA+^r0&F]jY3]dnhz§k7~2p|s(f¡0vqzN(p¡0Wtm,] WO.TRL1xP.@()of&y.%J8*l1m)B{Q)%0Esk@aUCvl3H-Q8QbklyPDxdn*=&)Kz7fwC2rnBglGw+}qZ;7A,LY:)lM|%;2BoCs6M1~ZQKui=7Ch#I@e,¡xB`);
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

                pool.exec(

                    f, [array_buffer.buffer]
                ).catch((e) => {

                    return f(array_buffer.buffer);
                }).timeout(12 * 1000).then(function(buffer){

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