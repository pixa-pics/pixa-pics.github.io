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
};*/

// return function a(Q){'use strict';function i(a,b){return(a+b|0)>>>0}function r(a,b){return(Math.imul((a|0)&4294967295,(b|0)&4294967295)|0)&4294967295}function j(a){return a<<2}function s(a,b){return(a/b|0)&4294967295}function F(a){return(a>>2|0)&4294967295}function t(a){return(a>>5|0)&4294967295}function u(a){return(a>>6|0)&4294967295}function v(a){return(a/85-.012|0)&4294967295}function w(a){return(a>>7|0)&4294967295}function e(a){return(a|0)&255}function x(a){return(255-a|0)&255}function k(a){return(a/255|0)&255}function R(a){return(a|0)>>>0&4294967295}function S(a,b){return((a|0)&4294967295)==((b|0)&4294967295)}function y(a){return(a|0)<0?(-a|0)&4294967295:(a|0)&4294967295}var f=function a(b,c){return Math.imul((b|0)&4294967295,(c|0)&4294967295)&4294967295},g=Math.fround,l=function a(b){return(.5+b|0)&4294967295},m=function a(b){return b|=0,(f(b|0,b|0)|0)&4294967295},E=function a(b){if(b=(b|0)&4294967295,(b|0)==0||(b|0)==1)return b|0;var c=1,d=1;while((d|0)<=(b|0))c=(c+1|0)&4294967295,d=(c*c|0)&4294967295;return(c-1|0)&4294967295},n=g(.2126),o=g(.7152),p=g(.0722),q=g(1),z=255,A=255,B=255,C=255,G=(E(n*z*z+o*A*A+p*B*B+q*C*C|0)|0)>>>0,H=(n*z+o*A+p*B+q*C|0)>>>0,b=function a(b,c){'use strict';if(c=c||0,!(this instanceof a))return new a(b,c);b instanceof Uint8Array?this.storage_uint8_=b:this.storage_uint8_=new Uint8Array('buffer'in b?b.buffer:b,f(c,4))};b.new_of=function(c,d,f,g){'use strict';var a=new Uint8Array(4);return a[3]=e(c),a[2]=e(d),a[1]=e(f),a[0]=e(g),b(a)},Object.defineProperty(b.prototype,'r',{get:function a(){'use strict';return e(this.storage_uint8_[3])}}),Object.defineProperty(b.prototype,'g',{get:function a(){'use strict';return e(this.storage_uint8_[2])}}),Object.defineProperty(b.prototype,'b',{get:function a(){'use strict';return e(this.storage_uint8_[1])}}),Object.defineProperty(b.prototype,'a',{get:function a(){'use strict';return e(this.storage_uint8_[0])}}),Object.defineProperty(b.prototype,'uint32',{get:function a(){'use strict';return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(b.prototype,'rgbaon4bits',{get:function a(){'use strict';var b=w(this.storage_uint8_[3]),c=w(this.storage_uint8_[2]),d=w(this.storage_uint8_[1]),e=w(this.storage_uint8_[0]);return(b<<3|c<<2|d<<1|e<<0|0)>>>0}}),Object.defineProperty(b.prototype,'rgbaon6bits',{get:function a(){'use strict';var b=v(this.storage_uint8_[3]),c=v(this.storage_uint8_[2]),d=v(this.storage_uint8_[1]),e=v(this.storage_uint8_[0]);return((b^16)+(c^8)+(d^4)+(e^0)|0)>>>0}}),Object.defineProperty(b.prototype,'rgbaon8bits',{get:function a(){'use strict';var b=u(this.storage_uint8_[3]),c=u(this.storage_uint8_[2]),d=u(this.storage_uint8_[1]),e=u(this.storage_uint8_[0]);return(b<<6|c<<4|d<<2|e<<0|0)>>>0}}),Object.defineProperty(b.prototype,'rgbaon12bits',{get:function a(){'use strict';var b=t(this.storage_uint8_[3]),c=t(this.storage_uint8_[2]),d=t(this.storage_uint8_[1]),e=t(this.storage_uint8_[0]);return(b<<9|c<<6|d<<3|e<<0|0)>>>0}}),Object.defineProperty(b.prototype,'offset',{get:function a(){'use strict';return F(this.storage_uint8_.byteOffset)}}),Object.defineProperty(b.prototype,'buffer',{get:function a(){'use strict';return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,i(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(b.prototype,'subarray',{get:function a(){'use strict';return this.storage_uint8_.subarray(0,4)}}),Object.defineProperty(b.prototype,'set',{get:function a(){'use strict';return function(a){a instanceof b?this.storage_uint8_.set(new Uint8Array(a.buffer)):'subarray'in a?this.storage_uint8_.set(a.subarray(0,4)):this.storage_uint8_.set(a)}}}),Object.defineProperty(b.prototype,'slice',{get:function a(){'use strict';return function(a,b){return this.storage_uint8_.slice(a,b)}}}),b.prototype.is_fully_transparent=function(){return S(this.a,0)},b.prototype.simplify=function(a){var b=Uint8Array.of(r(l(this.a/a),a),r(l(this.b/a),a),r(l(this.g/a),a),r(l(this.r/a),a));return this.set(b),this},b.prototype.blend_with=function(a,g,d,e){if(d|=0,e|=0,a.multiply_a_1000(g|0),(d|0)!=0)this.is_fully_transparent()?a.set(ArrayBuffer(4)):a.is_fully_transparent()&&this.set(ArrayBuffer(4));else{var c=(e|0)!=0?s(i(this.a,a.a),2):x(k(f(x(a.a),x(this.a))));this.set(b.merge_scale_of_255_a_fixed(a,s(f(a.a,255),c),this,k(f(this.a,s(f(x(a.a),255),c))),c)),a.set(this)}},b.prototype.euclidean_match_with=function(a,b){'use strict';return b=(b|0)>>>0,(b|0)==1e3?!0:(b|0)==0?(this.uint32|0)==(a.uint32|0):(E(n*m(this.r-a.r|0)+o*m(this.g-a.g|0)+p*m(this.b-a.b|0)+q*m(this.a-a.a|0)|0)/G*1e3|0)<(b|0)},b.prototype.manhattan_match_with=function(a,b){'use strict';return b=(b|0)>>>0,(b|0)==1e3?!0:(b|0)==0?(this.uint32|0)==(a.uint32|0):((f(n,y(this.r-a.r|0))+f(o,y(this.g-a.g|0))+f(p,y(this.b-a.b|0))+f(q,y(this.a-a.a|0))|0)/H*1e3|0)<(b|0)},b.prototype.multiply_a_1000=function(a){'use strict';this.subarray[0]=e(s(f(this.a,a),1e3))},b.prototype.copy=function(a){'use strict';return b(this.slice(0,4))},b.with_a=function(c,d){'use strict';var a=c.slice(0,4);return a[0]=e(d),b(a)},b.merge_scale_of_255_a_fixed=function(f,a,g,c,d){return a=e(a),c=e(c),d=e(d),b.merge_with_a_fixed(b.scale_rgb_of_on_255(f,a,a,a),b.scale_rgb_of_on_255(g,c,c,c),d)},b.scale_rgb_of_on_255=function(a,c,d,e){return b(Uint8Array.of(0,k(f(a.b,e)),k(f(a.g,d)),k(f(a.r,c))))},b.merge_with_a_fixed=function(a,c,d){return b(Uint8Array.of(e(d),i(a.b,c.b),i(a.g,c.g),i(a.r,c.r)))};var d=function a(b,d,c){'use strict';if(!(this instanceof a))return new a(b);this.storage_='buffer'in b?b.buffer:b,d|=0,c=c|0||this.storage_.byteLength|0,this.storage_uint8_array_=new Uint8Array(this.storage_,d,c),this.storage_uint32_array_=new Uint32Array(this.storage_,d,F(c))};Object.defineProperty(d.prototype,'length',{get:function a(){'use strict';return this.storage_uint32_array_.length}}),Object.defineProperty(d.prototype,'buffer',{get:function a(){'use strict';return this.storage_uint8_array_.buffer}}),Object.defineProperty(d.prototype,'buffer_setUint8',{get:function a(){'use strict';return function(a,b){return a|=0,b|=0,this.storage_uint8_array_[a]=e(b)}}}),Object.defineProperty(d.prototype,'buffer_getUint8',{get:function a(){'use strict';return function(a){return a|=0,this.storage_uint8_array_[a]}}}),Object.defineProperty(d.prototype,'buffer_getUint8a',{get:function a(){'use strict';return function(b,a){return b|=0,a|=0,a=a||1,a=i(b,j(a)),this.storage_uint8_array_.subarray(b,a)}}}),Object.defineProperty(d.prototype,'buffer_setUint32',{get:function a(){'use strict';return function(a,b){this.storage_uint32_array_[a|0]=R(b)}}}),Object.defineProperty(d.prototype,'buffer_getUint32',{get:function a(){'use strict';return function(a){return this.storage_uint32_array_[a|0]}}}),Object.defineProperty(d.prototype,'subarray_uint32',{get:function a(){'use strict';return function(b,a){return b|=0,a|=0,a=a||this.length,this.storage_uint32_array_.subarray(b,a)}}}),Object.defineProperty(d.prototype,'slice_uint32',{get:function a(){'use strict';return function(b,a){return b|=0,a|=0,a=a||this.length,this.storage_uint32_array_.slice(b,a)}}}),Object.defineProperty(d.prototype,'subarray_uint8',{get:function a(){'use strict';return function(a,b){return a|=0,b|=0,this.storage_uint8_array_.subarray(j(a),j(b))}}}),Object.defineProperty(d.prototype,'slice_uint8',{get:function a(){'use strict';return function(a,b){return a|=0,b|=0,this.storage_uint8_array_.slice(j(a),j(b))}}}),d.prototype.get_element=function(a){return b(this.buffer,a|0)},d.prototype.subarray=function(a,b){return a|=0,b|=0,this.buffer_getUint8a(a,b)};var c=function a(b){'use strict';if(b=b||{},!(this instanceof a))return new a(b);b.pxl_colors=b.pxl_colors||new Uint32Array(0),b.pxls=b.pxls||new Uint32Array(0),this.new_pxls_='buffer'in b.pxls?new Uint32Array(b.pxls.buffer):Uint32Array.from(b.pxls),this.new_pxl_colors_='buffer'in b.pxl_colors?d(b.pxl_colors.buffer):d(Uint32Array.from(b.pxl_colors)),this.is_bucket_threshold_auto_=Boolean(b.bucket_threshold>1e3),b.bucket_threshold=b.bucket_threshold||0,b.bucket_threshold=(b.bucket_threshold|0)>=1?b.bucket_threshold|0:b.this_state_bucket_threshold||0,this.bucket_threshold_=this.is_bucket_threshold_auto_?1:b.bucket_threshold,this.threshold_steps_=this.is_bucket_threshold_auto_?1:3,this.best_color_number_=this.new_pxl_colors_.length/2+b.color_number_bonus|0,this.max_cluster_=this.new_pxl_colors_.length>16384?4097:this.new_pxl_colors_.length>8192?257:this.new_pxl_colors_.length>2048?65:this.new_pxl_colors_.length>512?17:1,this.index_clusters_=new Array(this.max_cluster_),this.length_clusters_=new Uint32Array(this.max_cluster_),this.pxl_colors_usage_=new Uint32Array(this.new_pxl_colors_.length),this.all_index_clusters_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_lookup_={}};Object.defineProperty(c.prototype,'reset_deduplicate',{get:function a(){'use strict';return function(a){'use strict';this.clean_pxl_colors_lookup_={},this.pxl_colors_usage_.fill(0,0,a|0),this.clean_pxl_colors_.fill(0,0,a|0)}}}),Object.defineProperty(c.prototype,'index_of_color_within_cleaned',{get:function a(){'use strict';return function(a){'use strict';return(this.clean_pxl_colors_lookup_[(a|0)>>>0]|0)-1|0}}}),Object.defineProperty(c.prototype,'set_cleaned_pxl_colors',{get:function a(){'use strict';return function(a,b){'use strict';this.clean_pxl_colors_[(a|0)>>>0]=(b|0)>>>0,this.clean_pxl_colors_lookup_[(b|0)>>>0]=(a+1|0)>>>0}}}),Object.defineProperty(c.prototype,'increase_color_usage',{get:function a(){'use strict';return function(a){'use strict';this.pxl_colors_usage_[(a|0)>>>0]=(this.pxl_colors_usage_[(a|0)>>>0]+1|0)>>>0}}}),Object.defineProperty(c.prototype,'set_new_pxls',{get:function a(){'use strict';return function(a,b){'use strict';this.new_pxls_[(a|0)>>>0]=(b|0)>>>0}}}),Object.defineProperty(c.prototype,'set_new_pxl_colors',{get:function a(){'use strict';return function(a){'use strict';this.new_pxl_colors_=d(this.clean_pxl_colors_.buffer.slice(0,j(a|0)))}}}),Object.defineProperty(c.prototype,'get_a_new_pxl_color_from_pxl_index',{get:function a(){return function(a){return this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[a|0])&4294967295}}}),Object.defineProperty(c.prototype,'reset_cluster',{get:function a(){'use strict';return function(){'use strict';this.max_cluster_=this.new_pxl_colors_.length>16384?4097:this.new_pxl_colors_.length>8192?257:this.new_pxl_colors_.length>2048?65:this.new_pxl_colors_.length>512?17:1,this.length_clusters_.fill(0,0,this.max_cluster|0);for(var a=0;(a|0)<(this.max_cluster|0);a=(a+1|0)>>>0)this.index_clusters_[a|0]=[]}}}),Object.defineProperty(c.prototype,'add_in_indexes_cluster',{get:function a(){'use strict';return function(a,b){'use strict';this.index_clusters_[(a|0)>>>0].push((b|0)>>>0)}}}),Object.defineProperty(c.prototype,'set_all_cluster_indexes',{get:function a(){'use strict';return function(){'use strict';var a=0,b=0;for(a=0;(a|0)<(this.max_cluster|0);a=(a+1|0)>>>0)this.all_index_clusters_.set(this.index_clusters_[(a|0)>>>0],(b|0)>>>0),b=(b+this.get_length_in_index_clusters(a|0)|0)>>>0}}}),Object.defineProperty(c.prototype,'get_length_in_index_clusters',{get:function a(){'use strict';return function(a){'use strict';return(this.index_clusters_[(a|0)>>>0].length|0)>>>0}}}),Object.defineProperty(c.prototype,'get_in_cluster_lengths',{get:function a(){'use strict';return function(a){'use strict';return(this.length_clusters_[(a|0)>>>0]|0)>>>0}}}),Object.defineProperty(c.prototype,'get_an_index_in_clusters',{get:function a(){return function(a){return(this.all_index_clusters_[a|0]|0)>>>0}}}),Object.defineProperty(c.prototype,'get_a_color_usage',{get:function a(){return function(a){return(this.pxl_colors_usage_[a|0]|0)>>>0}}}),Object.defineProperty(c.prototype,'set_a_color_usage',{get:function a(){return function(a,b){return this.pxl_colors_usage_[a|0]=(b|0)>>>0}}}),Object.defineProperty(c.prototype,'get_a_color_usage_percent',{get:function a(){return function(a){return this.pxl_colors_usage_[a|0]/this.new_pxls_.length}}}),Object.defineProperty(c.prototype,'get_average_color_usage_percent',{get:function a(){return function(d,e){var b=0,a=0,c=0;for(a=d;(a|0)<(e|0);a=(a+1|0)>>>0)c=(this.get_an_index_in_clusters((a|0)>>>0)|0)>>>0,b+=this.pxl_colors_usage_[c|0]/this.new_pxls_.length;return b/(e-d|0)}}}),Object.defineProperty(c.prototype,'get_a_new_pxl_color',{get:function a(){return function(a){return this.new_pxl_colors_.get_element(a|0)}}}),Object.defineProperty(c.prototype,'max_cluster',{get:function a(){return this.max_cluster_|0}}),Object.defineProperty(c.prototype,'threshold_steps',{get:function a(){return this.threshold_steps_|0}}),Object.defineProperty(c.prototype,'new_pxls_length',{get:function a(){return this.new_pxls_.length|0}}),Object.defineProperty(c.prototype,'new_pxl_colors_length',{get:function a(){return this.new_pxl_colors_.length|0}}),Object.defineProperty(c.prototype,'best_color_number',{get:function a(){return this.best_color_number_|0}}),Object.defineProperty(c.prototype,'bucket_threshold',{get:function a(){return this.bucket_threshold_|0}}),Object.defineProperty(c.prototype,'is_bucket_threshold_auto',{get:function a(){return this.is_bucket_threshold_auto_}}),Object.defineProperty(c.prototype,'set_bucket_threshold',{get:function a(){return function(a){this.bucket_threshold_=a|0}}}),Object.defineProperty(c.prototype,'get_data',{get:function a(){return function(){return Array.of(this.new_pxls_,this.new_pxl_colors_.slice_uint32(0,this.new_pxl_colors_.length))}}}),c.prototype.output=function(c){var c=c||'heap',a=this.get_data();if(c=='heap'){var b=new Uint32Array(2+a[0].length+a[1].length);return b[0]=(a[0].length|0)&4294967295,b[1]=(a[1].length|0)&4294967295,b.set(a[0],2),b.set(a[1],2+a[0].length),b.buffer}else return a},c.prototype.deduplicate=function(){'use strict';this.reset_deduplicate(this.new_pxl_colors_length|0);var a=0,d=0,b=0,e=-1,c=0,f=this.new_pxls_length|0;for(;(c|0)<(f|0);c=(c+1|0)>>>0)d=this.get_a_new_pxl_color_from_pxl_index(c|0)|0,b=this.index_of_color_within_cleaned(d|0)|0,(b|0)==(e|0)&&(this.set_cleaned_pxl_colors(a|0,d|0),b=a|0,a=a+1|0),this.increase_color_usage(b|0),this.set_new_pxls(c|0,b|0);this.set_new_pxl_colors(a)},c.prototype.clusterize=function(){'use strict';this.reset_cluster();var a=0;if(this.max_cluster===4097)for(;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.add_in_indexes_cluster((this.get_a_new_pxl_color((a|0)>>>0).rgbaon12bits|0)>>>0,(a|0)>>>0);else if(this.max_cluster===257)for(;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.add_in_indexes_cluster((this.get_a_new_pxl_color((a|0)>>>0).rgbaon8bits|0)>>>0,(a|0)>>>0);else if(this.max_cluster===65)for(;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.add_in_indexes_cluster((this.get_a_new_pxl_color((a|0)>>>0).rgbaon6bits|0)>>>0,(a|0)>>>0);else if(this.max_cluster===17)for(;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.add_in_indexes_cluster((this.get_a_new_pxl_color((a|0)>>>0).rgbaon4bits|0)>>>0,(a|0)>>>0);else if(this.max_cluster===1)for(;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.add_in_indexes_cluster(0,(a|0)>>>0);this.set_all_cluster_indexes()},c.prototype.process_threshold=function(t){'use strict';t=(t|0)>>>0;var y=this.bucket_threshold*(t/this.threshold_steps)|0,z=t/this.threshold_steps,u=!1,d={},i=d,j=0,k=0,o,p,b=0,c=0,l=0,v=!1,a=0,q=0,w=0,e=0,m=0,n=0,f=0,h=0,A=0,x=0,r=Boolean(this.max_cluster<4096);for(var s=0;(s|0)<(this.max_cluster|0);s=(s+1|0)>>>0){for(A=(this.get_length_in_index_clusters(s|0)|0)>>>0,k=(j+A|0)>>>0,r&&(e=this.get_average_color_usage_percent(j|0,k|0)),f=j|0;(f|0)<(k|0);f=(f+1|0)>>>0){for(m=(this.get_an_index_in_clusters((f|0)>>>0)|0)>>>0,o=this.get_a_new_pxl_color((m|0)>>>0),b=(this.get_a_color_usage((m|0)>>>0)|0)>>>0,d={value:o,tail:null},i=d,r&&(c=this.get_a_color_usage_percent((m|0)>>>0),x=1-(c<e?g(c/e):g(1/g(c/e)))),h=j|0;(h|0)<(k|0);h=(h+1|0)>>>0)(f|0)!=(h|0)&&(n=(this.get_an_index_in_clusters((h|0)>>>0)|0)>>>0,p=this.get_a_new_pxl_color((n|0)>>>0),l=(this.get_a_color_usage((n|0)>>>0)|0)>>>0,v=(b|0)>(l|0),a=(v?1e3*b/l|0:1e3*l/b|0)&1e3,r?(a|0)>500?q=(a-(a-500)*.6|0)/1e3:q=(a+(500-a)*.6|0)/1e3:q=(a|0)/1e3,w=((y/1e3+y/1e3*(1-q)*z)/(1+z)*1e3|0)>>>0,o.euclidean_match_with(p,((w+w*x)/2|0)&1e3))&&(u=!0,b=(b+l|0)>>>0,this.set_a_color_usage(m|0,b|0),this.set_a_color_usage(n|0,b|0),r&&(c+=this.get_a_color_usage_percent((n|0)>>>0),x=c<e?g(c/e):g(1/g(c/e))),d.tail={value:p,tail:null},d=d.tail,v?o.blend_with(p,a|0,!1,!1):p.blend_with(o,a|0,!1,!1));if(u)while(i!==null)i.value.set(d.value),i=i.tail||null}j=k|0}return u},c.prototype.round=function(){'use strict';if(this.new_pxl_colors_length>4096){var b=this.new_pxl_colors_.length>65536?17:this.new_pxl_colors_.length>32768?7.5:this.new_pxl_colors_.length>16384?5:this.new_pxl_colors_.length>8192?3:this.new_pxl_colors_.length>4096?1.5:1;for(var a=0;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.get_a_new_pxl_color((a|0)>>>0).simplify(b|0)}},c.prototype.init=function(){'use strict';return this.round(),this.deduplicate(),this.clusterize(),this},c.prototype.run=function(){'use strict';var d=5,c=!1,b=!1;while(!c){for(var a=1;(a|0)<=(this.threshold_steps|0);a=(a+1|0)>>>0)b&&(this.deduplicate(),this.clusterize()),b=this.process_threshold(a|0);if(b&&this.deduplicate(),!this.is_bucket_threshold_auto&&this.bucket_threshold>this.threshold_steps)c=!0;else if(this.new_pxl_colors_length<this.best_color_number)break;this.set_bucket_threshold(this.bucket_threshold+d|0)}return this};var h=new Uint32Array(Q),D=h[0],I=h[1],J=h[2],K=h[3],L=h[4],M=h[5],N=h[6],O=h.slice(6,6+D),P=h.slice(6+D,6+D+I);return new Promise(function(a){'use strict';a(c({pxls:O,pxl_colors:P,bucket_threshold:J,threshold_steps:K,color_number_bonus:L,best_color_number:M,this_state_bucket_threshold:N}).init().run().output('heap'))})}
// https://www.digitalocean.com/community/tools/minify MINIFY --> var t=function...... AND ADD : return t;
// LZSTRING --> https://codepen.io/Holy-Fire/pen/VNRZme


import bltf from "../../../utils/b64_lzstring_to_function";


const ReducePalette = {

    _create_func: function (){
        return bltf("bHpwMwE6yQBkblcxZVlLdkpIWzJjbjUAgEaXAjAOaKZq2Xwh/f1IATh4cxYcLCLNt1qOdFjz4NZBroqyLU6K4VZIfa+d5PWYydHowJo99EVAYghVimh5DCmdgwVlzn9zzugYmexHRQUE080aISP/re9X+pz7TVnCsbu9kwyQKpNkjHtmwbKB1lDj5kzY6ho9Kv1x4BV6uyIxbIc8a4zWeCBYz7J8uTmSFEHclzazLuTXrCaxHCkQXKw+d9cD9C+mE5V/GRc+KW3HEDz+IAPDMG3Hw6x2aP2NMWckNoxc29kBCraOVS/4T2PSta0BUVBC9IVBKGdV7JQP2gVFSmp/9dh//RgzO0v3xWA73TrrGoSQlZGCmDJZ9gDlI8MOv9pPwm1rOU9yKAJK8gp0UvFcECbkXeyEsaOlkDr8bYdG4uSUYnSppawWA70Fwy6YKbX8rtQOf4RESekZVX8GTHJW0v4UpD0ifw4ElARSuC+b77wTLXb+grR/dJDx6HxVMgzS3II6kVUpwgoyh3OSkORmLEORYufPM6AI1pEoaSC6mUaIZkD2+d5CdmkH1+xWZ0hBh5D8OF0988A40M/qN79gks1x4pvSDudq6raMJMLB3HbsVF98hTf2VopvaVXcDGa44+db/vnvrxlSOUjUDHVVQq7NSf4FSQMDnn7LI7M65rDYVCUUhM4FtLCqt8R9m7Bau/vOGWn1kKXk+nIKfhsv/moF+FXxflwgJjpJq4hd/B/sWWAEnnghbol7DTUkgCPFl1YNJL9rm9SszBxEhaueJ9AZ45FXeaTKwMJe8qVEImoL9UjHYPocsH5/izWlEXshnldQoE4yo74UAjp82NqwuwyLsERCaUEVy+MCbDfu29TWJejGjfEEOLHx2sy/W9qF6rjGE47J12h0mjjr0J5f9NJWfiokxuxIrAanWOAxTk2/m+XxOhbaK2sTyspf4/EZejI0RjPcH2kIy5qoT7C5RQHM9Nz73nltqI2otn/lY0PKnBYMHHrWg7nHqAju+SHZeKSZakPkxXcyrbooXroB8igoeGu+z/P6eLndFTl/bJhdx21DWh4WLHZySL559NO7Jc000hNEpYBQlOgbBvNypljnF/1hiA5VYClZVLT1/mXCl8KCrz32+e69E0kTdXtZ9FZPytfnXFRfKyyGsJSXazg7HSocGKm44RxFuQs6sQbRR00tOS7zrRa+mvRuOTsuA+5B8ClYeRkClsJ544ke3aIwbXfCTRVNVEA2vur0x0q4dYQDgSkwuebfjbxzNcy0wXZb4ih/74IRZzgv9njqYbokfPkK7gMgJaAmCLLSGmTKMOaiHYHsEBP+hCf/6B0F0fVJ1VYZFipPBG6XvEf58g2OySOaJcKH6vWVrjnRjMfCVFc8Aqt0jpjASKgqCtT8YbENynrthhxRkrInwbRBU2VddLH1hSVsJztS82ybDJ8YwmmFHsHBl/6uETFvvvB8DM5YZkY6h5tWybclHjLYvBC6RLMnzVWWLoqA0yArmgm4tDX1YIW1maM5Wb8LzVZMbDUDPxFKHC+W2m119+gojnN411WObTJa8Bc+GWpGyW4SrXE72dMTyNHbYuKpXy3jnfGTX1ph/Yqs4cJyIXihnVV3aAui3TMX4GBBAhKnjrD4G4tAKiBfeMrGaZyx13xyd7wxgDhOn9LW/5nXygT9L8Qp4m/ZVGJHczjt1dX/00gl2ThGnB7mXDnRfAkeJI56YlBBLGYzOoY2qX48+uVJKWXaYC9CVB7kd18iIS63cammwCMg/6IFGU7PW/3RtKb3EUUMdwKg9CO6TfGJF4bEjdgTULwgt2BdW4d6H1/NUhoG0c5ojSiqs/xBFRZsm1YJMrfsgXCe2erCt8LqzxsyNcEdkRha34Ucefp4Q5zo5E0jsLp+GG+kyrByr2or+6IlKhauWD1uk+4ecWQZ+66WPzBblJn+julTOJp/C7KCM81S1pLLUqlgtkf/yIJLPLCyBPZJ5oIpbeK8Crd/tlFIE/NewJ1O3O1A1H8Tny6NmptQMG9diaiqo1uVXi5U/ZAskRcxEo/+8v2uFuDTJehYW94DzLERzKjZejCOcZsNd7SalqR5sT72BB0F2aGh0Y2k0Upa2/h+d6OuNlCz97PYhY/3xqA8F14SEUmO9TX/tEPIdrFaoO3E0T+ZYqKgtubcqFmIO6LLIHtk6Ci0QSXYP9AOTNaevCkUGFXiF6EsKE1HyGV3e+QitcLDCButZZbLHgZijXyU00R7pWKTx9Ru6F4wWDbWn7SHrUAto1BWCeXOSKEsoobUOZgRtMmQwBDSB5QbuxtAhfvKPNt6tojwYXvfnbsCl5FV0hgp4nEZ4VzRsAMffTEEsDNAucWa+jr3w2morCh3MnW3i3aSl955qiAHhDYinAbc6lsdNuwRK0PfRXVM7WxP/bRJHBaq32DUPDoZYeca1WayZOEpCCKEAKnm1NZ8POzteKQPQ5D+KOhYJeJFYtK6X62ToUEyQxVxb9sYjiHHCjwYx3KEfTwgWaJEx8FCrJy/+70yns7S0+s9m1C1Deqt+z4kmVwaCZloxwi3v7FH5e/9LScDZxbhdyuhJw5NVJlOGIvSNFWDBy28l/D83tPSIsBG87u3RLwSC4JsEJEK15y/1K7yvUtQ9s0L/to9YnFfURVUj0B7Zfc9mUEgEAzaMLPq43vBbUFNv8KswsxFnr/KLKPFhfztGwul5LB4U0vd8gNRtppF8omf3J1rCXy6S5xknKu+Bmau875H4sm9vdS38Xa7w6L/WmKKoBVZTq0tn0uzDf8zBpcK4PttLIi6ApwSoq8KYC7LeaBNAUbmaLbT7LgqkpBHdpDmkDf8K47fHNO+DozhVJySI/qedxfurGcjamvJDXPlTJhhp1pAzJr1j7EGb+FJmg0iZ8IHtIJfnp5xBOR+jFAwWkl8y7+LLJyzPCqzwkd0j72cWS0FNP6TLcKysiE03fc0aar9aYJRcQqiQEXgr5nE/+gIQ1CycVCvfF7/p+Y0Aby6xc+XFZ3aThh7uu6n43t8XOiFovtGB9HksydhpW0oA0GcJ6EQ6D77GuMsKnoxDc11otO4McERJFUe5pfu1Z3/HQjK+nG11ZDQxB4z6pumAGC+1F9xXOyggpI2zKqUrq5s6rkje1h5jwr5nJ7OUn7WR2KsbjsWTAUhOmSgATC1I0HW+z9LNcXzNqKNVwOzZTHN1wvelg3COwpwLpKf6jnORQqxXYuA97sbgFy6aHpBwl5/bsAwBeVJ1yH2O1VRpH/n0kQdD46RdCBv/uIzzudtsgvVdxO4aLMBFOrJWefnb72/yhEkJ3joUi1YWClbqOFHHbOMlL67dAKIE2GKB3dnhsuE7sFCNA0zn6DNsQpXEIOCcjIyazxQLoaQo2cWMHny57FLF+xr+cORuzjAbH4oei+Em0ZkLut3OKzLCoxbEzG3R4KHKi/40wUEaJ60rwUcX20OfU8/mUYXs7qLcamP+9Sypuns+mwsL25+LjkhoerDDLto6XRi5s5lkK8aHoFjkR6tdoHDlWhfTWb/SSJWtbL9nimDM5mxZzksKqQXSGWgY0iNe6jT/mqd2n6zUzglZ7RxMwC0DwQMjXx25K72J/q/upPdDFPDK/3A5F6VlW9dvn8XxfFo3KSkndfIlMKbksP40+1wFdox8SXBT6jSJk2tlMj7Tg8cRuXVkQ+pi7h2tfkgW2I7BjR3xqjChKSHFY5p5CY92YJVogYuQBv4CvzNRQ3eia7Z4oZPJS+3wqsd2T5af+zfnzAT9xHWOe0xsVyiosGUqbm+2ACQ2NGT353cuo1IMwrJ7YqiQLSTDcl8kHJcXN0LI5GW7BL/egWsRG5itxn5ZT9TjxlZW4/kS3BH82X91buXEpILiWSeIY6bxOasNRUIY/mtZwAWUEDLlAwFrVG5JGVvm96pspX1WXy1TykzCh7PtTyKqCNnTFzSQ/hdCy6+ZPaEua3llJoEfzJJoFykXhRYJwS6VJ+cKAvBmX67wko5mldTBjX4z1rLAMedKZmFf8a1naxAhnY8kcFZGmSMzc4fkFwSf6N/W3BIBTjpCe9CwKmzlZd6CPlL/X7AMLejYqA4CIozO1ONY6oc0e3tyLe2NgDB26m1ahSB8EydsExntsgrQxLLw1qrJpx12IaVSSrE6fLWZC30WCI1OKAyjNUpTbs+rF7w4ZIWGBfiK6vp4rx5Sk/La5kjmmhlIGPeEiOQNBVoOEhES6U8PXful5KywnzbZEiC+pEB695Gxl9h/647YhjPaZMDZM4HHyMdEu7gJw8hJsykas4khAAZ1FiTQpHV1SF7dlXyo7tPLDTfIFrORYofYjwXZD+DC8quLNa2HIf9KMsvImHHVnmQJnc5aytQXR/L/GrDIrF3ILoS1lmpOQzdGDb8BvVCqlxL5pR98AduKT6ic6y31xXDUELjeSyUVbkVIAZScbjAvBpMY9btizdUrYgcpm1p7WjQb4JyQDFrd1nwLWikQU09gIKDK2dZ1XVtg+8qtcEWlCqw3Dw3ac9vkMZtrZltkwEwM2Iv0D7DA+30wirMaiveb15WighWox4lkOZizbywGmT8oRLTJZFmWNGDzDsHy10O2xfgqjt1HMKhcQa8oANnMTRDbKj6xAa0TSkiNEAgYK+dvNQmrk7EwTMH8X1UXtgOc5x0LqjDP5dBDes72UKNGRvuJC2l1jY1x0oU7s/YenpG8yi6Qa4kMEe1aO5bpDHDjg4tpevvtOFI169tIsI98I6KSZh/OkufYBqyGtimTxIcmFt/1Qbkts262iiQiWy3kDflrzb1duik3GqEV2YiVIdfE9ODNzzAMGX0NcypeJagwc2o0g1KJ3RPkeejWnKiEYQ++JaTBX4VwavxOxxHXiDyJhmF4EowlWw+P2eJHIMKBh1yxtOKlXYlpKqMf75mhmbVMS62eAVcFNOKKGD6Ika8hwJaYuXcM+mpH7sf1WlzJdCaJDVn89+eTAZucVLn1JEN54cjbkMoEBFJZj7hMm08/j8MCnW0H/Kw6g3gdt/rpJBCNtms1JJ1NWWfTykttM/bSe33CNCu7k5+ZvfD/BqfMc9xuJ3BQ2llN4wTELC88wez2dTeSKz1yc0hfvWzanjNAscDzij9k5oXJoHWVoDPUDe/hp60raWTsGH/NOEZ7AWcFH8NeZcLm2JKPP9r0X1VJD1S+CYEL/F5IX+hNpJ5Q2P1CYuBQVUm7UL/+GHC7Caec4SshELcgCPpxJ8iFS5E8jYzN5p7SbI2332FZpTRMIr2ZtF3hU8MwVNVRl0arddoiH7cZoSAIszPS/48GIV2R+v7E2HxhihvvjLkfiWZgg7mgs17KFd4CMhGiz4aYw2DjbufUAWBAUH7slOn8zmyReIk/sNsw1FXAYVDzLmN2noNa2SgS5V6ptQB+jnR/biSdTmmwG0oLpi9Fo3DA1PG80GtprJuEULw0725ACzOkDAR7qOzQFwIQoAHDtpgFLDZeAKoxo1EzWdecHarGKd0d7AQ/wcdiKy5zC7dS7cXY9OUjJoJCC3Z78zIQCPwaDR1LMD//Iw0+BrWnF2WIZn7coIyNkC/JEE61MJZ4ZcQewQQ/n9QIM6HRFBizxKyWENHXWMfgySkc6RO8iuvGZqICj6zQi9HLgEJMHhsPo6ZML7pi463LWhNl07ABYPy8X3VUlti1brCuMHEpAefv2nF0dqEZ5Qw/3LNVGOmzbtoC7l3IDXj0b4qgrFL528EZVddSZfNPFEVQSYLFRFziFlO9w0p+kYYGePdoWL5AFaGZXppV01wPlJ9ItKPaGCtJppjVHXX//iqDErJh7ftcU9zzNTcW8BV39Z+nwCSL72BwJF2iowlESJOr1eqGB4NcFVOffcu/+sKxp8UaVz126+lSQKYbos9bp4MJlC5lXYFxCc6ioNG9aRL/wdG9hbrPMsEE9J98oVs5s/Qirm3BmTkfvX+jekaciXgOzpF49aqc2qvuwkSRvkOr+Af1wVbxpdEOFilQQfUCHXKCwPBCVMBBayEkrw9IkFDICry17p1DKsOCZ/8XakDXGQ3hSVIJ1Ifk3qHlP9J6JhXDCS3RGgx7bDIQpAoyGNpDb7I50YXHlYsLdQa76K+tlhlgGzizm4ac4uy2BwNTz6NRDKixDRXzKahr8ODNNY9ZQu5zcOlsGii74QQXGg5uJTo14MJ8Bc0cYEj+/CIYYsdGe3sAWJ+DZ5qpC9AjQna3gAZf3wqaxTRGe/ntWL2U7Z5hj7ga160yWwLAlAQeqc7sZsUnBaexPGoHaZjFfkw28KVulP9CUaRD2OHYw2jRc7zIj8tKuxxZknhH7WvMv1SvOtRNre7TFaMyQQssVPaQ6ay6SPD3lG39a2s+dSdqqJQO2Kb2TVjgyijnrs7DT/ekvavYWFsd1U/2JNbPlvOtyypbDPaI50ubtH8Airy/2iwDH31W6ccXtjy+jtJtVWoUNCYBfEV0dAEKTjdbNSsa0NSFvNTu5uuYaMokL8498VWtjYcwfAUkfv4NlcUlDZl2HulcKcV7ETJ6XNeAzNaPy5bntYuJUvt8I1yK3tJPbaUuGHhKe4D6NIvrefuGypexf1iawz3LU5UcVHyY7NQ3DX6JamiGhEu4+VZ2O6uqS9mj37d9wq13/baKPw77W4aONA2GEREiJbDqORTil0kJL5vYLa93rRCvsvyhqjGpAVm29lV6BA8vmzpI1UDG/9fq9s4mr1gWgoEfO8rzOLXN0+pTxF6D5hHRwCgTQ28RU5FW2dcY2d3cW6PVp0BrxOHu2RUuSDeWedZ/2wePj/Ms7KU1LDjSc/DyFN8aW8bfFIyyGxGuLtr9IgVflzLlKrO2dHwoavwWxTiV5qhWZozq1au9cPvj7DhdNJdYnmVEIa06gmkp3IBEuroI4s14rKt3d4hyI9uLyLjYJ/hZAndv3NcbardBaBqrrbkBcwNzhPBKVgRjZzV1Nm1oEdKVfOxR1N+ETGtU63d8ESHd6aRG8CXVPujyG3GvvhmfDUp01SS7ezvmkea8yvwUXZnOgM4OV4HpAFKxZs32g+nMOFMRxVplOJlX7MXfaHaIe5xiIQP1Mt+OphNzOqKTkVfDB3fmuEaClgeHZ9w5PIa6WTUHe7hwcezZ3Dl1IoJa3yQ0t2YMEOxUHwyLIfZPi/ZoGYBvHEyiyQEV5lzioqtkJw3Qn+DJDi6Nv4WE1qrUjqfP0DhB98ze1IvOTIObk6KvEvFHlw2Sqvc7uJXWblBOcFThC791k+OFX7b0GmYU0wtyXYN7j7ujEQ2MXQahCoqXHNuxtP0wYqt4kX39PAFXphRqb35SSET/4l8U0XeyXZN2bts9wNzQB6jHlkkvRQ+774EAhavGfzm2UczR7Z6HtF6qlu0/+BmXQ1hRoF8HybP/QBVQ0D19DdB9InNc4td/TwuGEux4qhhp8W011fxia0Q4RMP5VPaZEIwfSIZtJuF+g6EL0T/vbK8V1S7BU1IbrPAErw7NLFvXrMRBR8QqGh0+izvsBTPGfgfeWxbX2vHH2bz0IoasPAy3VdQWEbR7aJwE+O1Sx3kS4PBngBEg3jtnrJmyi0285dLWzhH5nOXkThcT5924tXj/dDJvlv901UjzRcD3J4YfOZmki7GptNV+ZEQaNdY8pQK3ihulPujEj1J5A4FSOBFQJXHnqWUspqAchwZaxdAQfSjlJ9ykOQ4Wu7gNOcV6qaMqWdP5aM8tvtaFMmHy5yno0UXuzrTm20itLy7LPr9ETZKfQ4ZC/Nfln3VggZUToRe8u3Li+O2jXpv0yY1WhIzW0lepxb85BnPwRmhRts/8dNf+dBrMa28OSgz8hxF2sKU2nHIwVPsqcWwE0ZPiqLXPdMgjR59BvM8z2RktOuE0kBVXJYz89Hn+oqKxLukfgmVq691z9jRwyaPIBye2i29SwsbI/X96dOtIC/J4DDF7c0DvNuCplgfENZWwHh90Frd9dGakXJIBijBC887Xi6E2nZkKFdbh/ZgzGT0toiAqVYYzD+jIzhiXzQKiEfyAq0VM4dZ48Aoi2IfAeEbLpwX9RjaSZZ+cFF9C4crAGrR6bGNW/FhyQY/ekeVt80P5YR3n3UjiYAlVWe12lPTc9NlEpCgG+8YRGBe1dnUFXPm8q+X6LKtHseBt/Cgs/zxf9hI+H2iuH8MeLQWsuDtiXB0ag5DpsqKqBHbsatZylYn5TdiiLQvJOKjX2yRrRFG754Fe1FR78COW40E4wgfj9Fzchwe89lQ7/20C42y6CTD0V+wwMSDYxo1JcPVNJsVNP4hEz/L/ODoXHrn6QnsfH82RFr1y1DDQaJfsxFSRLp03OugXmWIVM4q/p8+8NwkWmAitP9cykDepZw5gp7apGA3OlaGAeQw41mHzh9RlXBUINCY7hFdnjgsaxuO5TTZZuMLtOs6RDU8lbBWU7ZW6JSYg0kdNnZGiLYDK//hQkwewd2T0SsvuFqvU6hEl1/VZs9m4p17iR80SvWBAoYjrpYbiLgKc+U5q4J1fnn6Rq24H7mgQjtmIj68kJ3rERcKE+SmEGeBCE6cNSMb80+Mcvr1k6DCXksSuxpJrKxv0tVskgjfbBgtjWCokMOKxw0YUji/SwN4kRApTZBq8a2jDW7FOhyk5XS++a/TEuuh8SJ6wqzqhpwxf36Kw96AHUtWvATz51p7ABle");
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
                }).timeout(120 * 1000).then(function(buffer){

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