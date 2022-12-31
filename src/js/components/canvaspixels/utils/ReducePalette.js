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


import bltf from "../../../utils/b64lz_to_function";


const ReducePalette = {

    _create_func: function (){
        return bltf(`RTRVd0xncnNCMkFFQm1Gb0dNd0VzRDJjQ0dBS0FpZ0pRRGVBNUJBTTRpd1ZqQnFxa0RjaUs2V3NhdTJBTkFFWWxRa0dOd0RVZkFENEFHUWdENTVVZ0w2dFVtT01HNzlCNEtORndCWmJHQUFXQU9qUUJiQ0FCdGMzYVlRQmtBRmdCTUFUbWZ1QWJBSFlQQUt3OHVKSXlMaDVlZm9HRUR1R2VQdjd1QWNwSXFod0FWdHphd2pnQVBMbXVLV3hxTkpvQ3hFSzYzQUQwb1U1dThWRkpSV2x3QUdKWkZUb2kyUEt1c1EyUmlja3E3SEJnblpVOThnRURFUW1CTFdPd0VKUGRlcjJ5M25PTncwc2xBRzVyT1RVQUhBRUF0S1pTQUl6OVlZTUx6YU1sQU83SFZadStPME9MTHh3Z0Q0OVdLdUFJalZMTEFBZVFMMG9NdTJCQllQMkhBQTFqQ2FuREVlRGlod0FFcm9oRXllU3lLUnhYN1BDRWxBREtaV3lWWHNEM21UUUNoQUF2S3k3SFV5VThXY2k0QUJQQWtPWEpTQUQ4dUF1aFBxVE9HQUM0R2RMZG9zRHRoZ0FoV2Y4Y0NFZU1nNlRCWUlZVE9ZckxZUWo4ZWNGa09ibVlyeWNrZUFCelZtR3N6d1lBWUpBQUV4NDFnMWxJNGVIS1V6MHBnQzRtdGV4NEZqOU9LMVFmV3NFa3JLa3dYZ1pwVGRRaml4NEFGRVk2MVlJR1NHZzAzd09WekhzemduVjJWSUpCSjAyeldUZENNSEU5SW1DcTFjaG16eFBjMm1LOWpHaHJJRGNKN2hlV0hJUWU3aGtLSWJsbWtuMk9jZ0FGUld4bEtwSk1ZTnppNkxyZDJ4UThhQ3NoMjRVeXVPN2VRZzhERG55KytHNEJWeDNnQU9qK3UvamZQQUFqbytMWThBQVhxeWNJOEFBZ21CWcQIUXRCUVFBTUlJVHdBRGlISTVyZzBCcnNCT0dpQmdhNFFZUm9qdm11c0ZrYUlmNXJvaDFFT0E0eElwZ0FFaHkySEFmaHhHa2JCbEcwVVNDajhQbXl5QmpxSkRrRlFOQjBBd1lETUNXYzZzbGEwZzhBQWhMZ0pob0JRbkRRTFEyQW9DQUdEd0lXaEN0Z20wQWdLOGhiYXJxVEI4QnBXazZYcHNBQUtwb05BWUNuQkJ3REFOZy9LaXFwRkNtTFFHQ2VRNklBQVBvUU01cmtoYXlmQ3lyNS9sZ0lGMkRCV0ZFV25GRkpsbVU1TGx1UjVYbTRLUWZBUVBBOEFnTUFwRE9ZbW9wOEtZaFhGYVZzcDhEd2FiSUR3emlHWW9WbW1CbElWNlFKYWh6bjJUV09pSmxEVUxROUNNSjJxcUZxeUdXT2FsN21lWUtiVzdnbTJBQU5vQU13QUxxc29DdW84QnRyaTdZQ25wM2h0TnduYmc4RG5ldFVoWFE2ZDU4RmtKNEFQSjhPa0lDb0tZbm9nUEF6a2dBQUN1Njc2bFdBZ3JWZSs3b0plRG9NOEtRWlU4TVF3VmdMS21ybVNOWW5qWkp6QnRvQ2NVQlVGb1hoZGxJVmJkdGhDS0lvZDd2WjkzMi9mOUpuQXhnb1BBT0RJU21GREdBdy95Y09rQTZwQkl5amFQK2xxbU5qUkprMTR5cHc1K1lUU1hFNmxaUEhaVDFNOExUWDFnRDlmMEE4enJQczVEMFBjN3pJRHczd2d2SStBSXV4aGpaQ2plSkUxU2F0T1N3UGpzdnhZbHlVazVGNjJYYXJOTWZacjJ1TTBESU5neERuTkc3RHB1a05nRnZDK2plRGl3N09QTzdvcnN5MnBIdEV5bHBOM1JUVk1CM1RXc003cllkc3hIWE04M3ozdWJhNDhkVzRudURKOWpVdnJKbmNzSlRuM3RwZVQrU3VNNEVnRTEzQ3U1ejd4MzVEYzJ6RDU3aXQ1NWQrU25FUDd2eTE3U3Y1M0lDaUYrcmdmMHpyVFBsd2JrZmM4YuQDKTZmRFlGZ3poOEdnWUFVQTNxTk55M2t0TzEyaWFzdThNL2Qrdk8xM2oyWDhWNGp6WG5uRldLNUFGWjFYblBIMmZzZUFnRS9oM2JPbzhlNWszdW9RTk9JZytENUUyaElaQS9jSkNla25oSUVBK1E2eThSSk52RFdlOFE1NjNEaHpLdXA4WTduMHZsZ2J3dDk3NlAydGdXSk9kc3NhdjJZTy9Nc1J4djdJTi9oVEhVckpoRkFObm1QWHVZRCt4U01nY0E2QnZkWUh3TVVaM0dSS0NONFlMMENFQUFlbFBRZ29nNXo2Tk9NWThjK2kyb21KQVBvbVE5RXQ1cXlvU1hmZW9jV1owTU5pZmFPOE5tRlgyZ0tjZGhEOGhhTjFGcmJVU0V0SFlDT21tV1ZZSWlRRSt6L2hJMkowaWY2Z1BFZjJaSlNpdEhyelVheVRKbWpVayt6UWJva0krUnRoNE55SVBRaEJSaUdrSWNSUXB4dThYRTBNUHBYS09Kc2ZFWHo4WGNRSm5EbjY4SWlhblFScklKaHhKVVdUUkpQWlJrcE5FV2t1OC9acGxaTUthbzhSOERGa0ZObVVVaW1KU3NHNUhjTGdzcEJEc0cxSkZQVXBRalRpN0J6THU0aXU5RDJsOHowdkFLZ1VsZ2xQMUNUdzhKS2MyNHV3NkdNMlJJVWFyOGpBQ0FWNnhWbm4reDNwYzB1QjhibEh3WWQ0Z3FSVVNxSTB0bThtMkh6N2F0eWRtMlA1S0NhcEl0S3Y1YXdEQTNaTE0yV2xRRndMUVZQUEFEd0xndUtsYVVwQldDMmxiVUlYT0t1VEMvV2JTdkVkTklCUUNBbDljcjhqNmU4NXVBeXZuWW9UQXkwbS9sQldxaVdyZ0ZNYlZLRk5NNVc0N2xkemVWODJlYUs5RjRyUGxZdHhnbVRVblJzQTJUQU5wWkF1bDlKOEI4ak0rSkZMbmxZVk12TmJLaTA4cllIeFhWWUFobFpUOHZsY0s4cU9CN1Zrc2RRQzUxWHFCVkNzVmNxdjFNcklyK1hBQzlWVlVMWEcwTnVaNDZ1TWNLREV1dFhxN2hCck1YOE4wUWdVV3RJdWd1d1RVNnZOZ0plQUNDcG1yTE5qRHpBVUJDb2dhdzFoK1FoVG9OcENnNzVWUWdCY24xTEE0cTJ3MGppcndHUUo1bTNSMzhwWWQ4eEw0RDhoSFJzRWd3eXNxdVE5ZnlVd2VsY0FhRnNKTzZvMkJ6cDNnUFlndmd4N1QwOEhQWEZCMFY3RHBudHdJZTkyd0FIMG52UVRpbGV5YUJBOEY4ak80KzJhYXFqbWdKNkVLcnc3N0dGWFpvQjBnMFFERmpUQk9aTWNDSkRJYTlTYWRBaTd1M1lCQ2pjS1ErSGNBT2djTUVDY01oRkxKa0lIRk5TN2FiQmRwN1o1VFNBN1FBdVdicUtLTnlidDJ3UUpSb05sc292WFVZN1hSM3RqSEIwc2FjSTRBbUhIaFZjWjliZ05sVEFRRFdDb01RZCtzNFFBT0hJMktDZ3VCNlh1MTRGNms5UEEzeXltaEdpTk0wSUROM21oSk93eWhrbUNTWW1OVkN3cFZrb1VHUU5nVWNQVjRBaFRoQ0ZIRC8xSVFnRTlKb2JUYVlETkdiQlAvTzh2a2VCbWNRYndVTHVBTE9tRU0zQ0tMaGxoTG5TVGVzMVcvQkFNdHBBQkFaQXhMZnJhUkNoWUl3eUJqRGdjZzlCK3RMOUltbHJMSTJCaTFZSERzaHVDQVRhb3BGSlNIbERXWk00bzRxMTN1RTJiZ3BnUnNPSGxKaGJDRmhFSEFFbEtZWUFEaDJKemJ2WXRvak1nU0pyalcrN1BnaTI2amNWMjFuYkFpMnBRT0dxS2hOY25XY0V5RnlJMkFEOEtUYW1BcTlBWXdSaExYUUhLNVY2ckVHVEIxYTBCS28xVFdwemtKVEkyRHJYV2V0OVloNE54QmsyWkRzbkd3andnOHBycFlSNElLT0tDMnZYTFprTVl0TUdCTWVJSWRCdDZjb2cwenZtSjNGZmJYcTZnRTl3SCthbmVtenZUZ3U0eGE3WFhoUVBieTA5MEdMMmJDWWJvemh2RCtHNnNOZFRnVFFOUzE4NTdWd0lseWRqNmVBM2ZhcnorNUlCVERJQlppdTAxSjZnY2xyYk05QW10YWxXdFZWOVZQNzFYc0RRWmFtZGZYalgzN1crUUVTa2xwdVZwdGcydmRPWFoxK0F2VHk4NTgrb1UzTWVkQ25wSHpZSS9QdHJRSUYvc3ByNENIVWREcVBzZW9jQnk4TXoyZmE4enZkUFJleTUwS2x2SThCYUN4ellQbm5tRmVaNmw5dUUxMEUvNlp6NlgwSzVldzlZSER3RVFqU2VXb0hUT2dCaHZJVW0vZVpiM0NBSHR1NEVwOFRMZ1RkT1VscTdyVENtT0xkUFI5M25uNllXRFowbC9vOXg1bDgzdWZBODFaTUlYNlBRWGgvSjhyZW5aNmsvdDB6OXdLZE84WEFGL085L1hmbGZPb1YrMy9HOEFGL3ZyMnBUVFZMSHNWalZ2UmRSN2RVNFpKbEpmSUxVclViVURJaklYWTVvaXg3TUhWUXBXUkVVZlZnMUtwcXBhcGtVR28reFVNVXdleE54Nncva21VQUFaSWRCMEV3QlNhdFB6WVZkS1YxQy9ZVlJCS0JFS1FhQTZCTk91YWdwYVdnektDS091YmRSZzVSWmc3MERvWFVTbUpnRGxhRkRWT2hUMGZMQkZFRGNnNHdBdFFTSXRQaFJyTDlNTmFCZGdoVkx5QUZPUWt3Vk5JT0NRak5kbWFRdm5HT1RBMHFSUWtvREZGUTFPTlFqWmNOTFE3dGIxWkZmUTZoYTVUVkV3OVhNMmJqRUtaNVNmU3dnTVpRd1piNWRPWFhRSEQzWEEvZ1NJcWd4d3NtYkFLNkJ0Vnc1cGR3cVFtUXZsY3c0QUVLRkdmdzE1TGhKUWlYRUkvVVhYTWZCRVpER0ltZzlhZUl4dEl1QXc5TlZwY2NOSXZtRElySThBU2ZPT1hJL3BRMUEzRTFjdFJxUFhRM1NJMG9sTWEzQkVDUUc0UTZWa0xnUnFUSUQ5UDlSQS81V0l1VkdOUEtQbzFXQzVXb2xwV0ZRVVR3N1ZNd253dnduZyt1RG9zVkFvcVZGMk1JOG9OZzF3RGc3UXlvNlFYYWZFUkk5WXR3cmxWSTB3N3duMUZvc0FUZE91QUlzV1lBd291QVlvMC9mVUs0bTQ3dE80KzZhb3lGRFlsSTI1SFk3TmVHYU5XSWtiUDRzSll0VlFubzJNYlVmb2hNSk1ZWXdZMWtVWXVLWFE0d09ZOVFzZVRRbWdwWXh3bkV0WW1vbDR5UStFeG9uTld0U2tvNDFGUElxd29JeVZZMWM0M294OUVFdUFmRXc2UWs0azkyVWs4ayt3alE2NHhZM05WM1ZZNkU4UXVvcllobzk0Z05aWTd0SHVORTZ3NElzNDBJOHRlcklVd3NTSWtVOG96Z21raGdtWXU4VElBUWVrbUV4a293N1lsa3BFdGs3VTQ0L1ZVNHZrZzA3RW8waUk1RE0wK1lsQk9VazNhMG5nVzA5cWJlQkVsdEZHRUtSVEVBWnpZZFlFdzNDOWJqVVU2ZFBzRmt5MHBhQUhlTUYySVlxSXNvdmJIdzdJMUtQQWVyRHFWVFZkY3ljb0xveHJHU01zU1FDUVlnRThNQTJXQ0F1eWZTRDlOc09Ba0lkQlNHU0Vhd0VLTFhhd1FLQ2dhS1RtUWM0Y2pBVWM0QUNnZXNPYUg0MXdQZ21RWG5RYzhjZ2NwVEJjdWd3NGxjNkxkMmJxZDhkY3FLRkE1Rk5BemNpZ1VVUmMzY2hnaTg1dzBxVkhKY3kvTjBEQU9iQzgvY3JPUThxY2tjc2NrOGpJODh5Y29jbjh1YzBVWUxUYzZjMmN2eURJMUhZTEo4NFZVd0Y4dDh3Q2lDc2NqTEtqTnRRcVpBRkVjQUh0WXdVQUNnWXdHY3NEYkFDQUJLS0tXQ0RBR2NrQWJTRG1UQzdDc0FYQy9Dd2k2d1QwV1FGWFBMT2luQ2t3SmlvaWljemloaTdpa0FBaW9pK3NETWZGTENyaXZDb1M1aS9zV2lvcmVpeGk2U2tTb2tac0txY1NoU3dTNFNsaTZRQnFVd1h5WHd5MVlGRUtmaXhTclNpY1NnNHNpU2dTcVNzeXFLZEM0eStTeVNuaWxpdnpVaWpBRUtVVUc0WFNreXpTbVNxVXZTbXltU2d5a0FkOE50RVpkMmFqSHl3S29pMXlzaXp5MlVUYWZ5dmdJU2hpNENrS2FBQ0FDd1pLekk4S3o4MHlFS0k4b0NtYzM4MHdVazZvVndjUVRYWXF6SWpLckswcVl5ckFTZ0N5ck9DclNFWWM2d1NnWUZIS3VLTDhvcXlDblFzZ2t3Tmk3d1RhVTRad1VVWndLUWR3WHdXS0E4L0t3cWxDdWNnYTZBZVEyUVU0RzRkd1Z3VVVVRUdhbnErYTc4NnF0dFVxd2E0d1dRVndLUVp3VTRVVWJ3QUlXYXZLMTRBcWc2L3E0Nmxhb2FnSU80VHltYThZcWpVREVBTnE0clRxMHFNS3VhUGd1S1ZxOXF3R3pJajh2eVVraUcyZ0lHcmd0MU1BWGdoZ3NHN0FmNmpxK0dxRy95aGE0Q3R0U2dVZVdhSGNseUZHeFZQYWg2M0d3NjVhK1E2R2xMVHRFS1p5WDZER3lHNEc0bTVHNWMxR3VhaW1wNmtxMGsybTRyYWlyN1NtL3FvbTdna21qbXNtcm14NnZxM21rNi9tMGNNcllXMzgwY2pBRkVDQWQ4S0tGc2pxWlV6WXpWWjNkVS9DbkMzNlQwZFd2Tkl3RUFIVW5rNEhOc1lFdXN5WGQyQVd4V25tcOQIBVdqVzFrRnNuRzUyL0dpZ1VlQkNrY1d3Rk1BazFjdUtSMm9XNzJnRmY2VHRVM1lPKzBuV3VFOW1mV3J3NE5KbWl2Tkt5M1p5ZHF3V29MUzJyMDB0VzJqRTJ3OXVVT2hXOE9tV2wyeWl0MnNtQlVCaWJhQndBOGFRSlV0VlF3K29wTzNZcEVuQ3NPb0xhV3hhb0pUa3pvd3V3RXN0WDB3SE8yeWFFdXdXbnV2RzZ1cVVXdTBIVGVFa2Z5c09xZXFtMTI5VzZ1dW9PZXNRUThCZTg1WjQ1STE0MjVOdXhFNE5aQVVBYkFLZ1Jhc0tYMjRLWE9nRS9Vb293MHZPdUtKV3BhZ201S2RhR3VoUVhhUkJWK24yMGVUKzJlNytoY001SnV0TlhXdWhZK3hoRHVoaTNxdnVoT0U0Kys3MHgra2Uyc3dlcDJjbTZXdHRRQnM1SCt6ZXh4ZmU5VkowdWNGMC9sSEMzcTN1dStzZWgrb0VwK3BCaEErNmxla1c0TENlcDI4dW82aklsM2ExVTNHWTZjT081dWxVdlcwaDJNbkRDaHRLeENudXhtdjZ1K20ydWh1d3JxZmE5aGdGWm8wczhXeEJPQnVJKzQyMEhrTUIyRXcreE8waHcyMUt6R3JxcWg5QjVCMmg3RTUrOTJjR2dHckd1eXFXdis2bW9hcWVVYThheWE2YXU2dnlNUnFtbDYxYTlhemE3YWdJWGF4eGlPdnhvYTg2eTY2NjI2ekJweDhKMDY5NnJhbTRMNi95Mkd1eHJxbzZxT3dPbmdGTU5HNW1yR2h3RmdRS1hBUjNaTUpnQlVlN1BKdUdycXdwNjNiZXM1U2pDSzM2L0pqSnpScjNkYWJhWFJ4MDF1MGg3QVQwTURUT3FSd0xOdGRKaXdqMHd0UE8yUjFCNnhyT0laNnBoR25Cc0hiYVRtU2dZd1RrQnBycGcrcGtneDlVNTVQemVtMFp6SW9ab1NzeG13b2UwMVBPMHBqTU1wK0FZcDYzS1FjcHFVU3BteDlHK1p2SGRCT3A3QUVCc0hScGs3ZW11Wnc1bzY1MUg2MU93Rm1lM0J0ckg1L2lFSVVRTzlIQzJHd1o1cHQ1N1RjN01IVFpvaG5wOVUyTWhGcjdBRmt4b0cwNXZVaXg0ZTFvVG9haGl4eEJQRmxtOEZwWitKMEJwSWpGMVVxQmhGV016T3c1a0tVaytCa0pUMCtocVowbHZYY+QHm2trNjVGbWwzZXV1dEZobGx1cGw0Um5Dc3JPWnRsL0Z1Y21SckUvbGxQZUxmNXBGc0Z5RWlWM2U5RjZWb1JyRnVWcSs5K2kyOFovSTQwNU00dTkySngwMXRwM1ZoaWZWd1J5QjBodlpuRE5LMDFsVi9rNlo0MGwraU91MW5WK2V4MXFWNTFvKzJWaGk5MTZxNiswZVZtYTFGeUwxbjB0VjMxbTEvMW0rMEtIVjZvV0o0OCtKcDFpQnNObzFpTmc0VXFVZUQxdE5ncTBxT05sNWZ1eEJ2bHNZY2NVZkZUYUpORFpESHNCNTI1alFhM1QwUjU3bmRUR1FKZ1Q1NzUzZW1jRGtPRmlOM0ZwRnhWbG11d0lCa2tHSU1IZmdVUVhLdnlXMXN0OWFUY2JhVE4wSnBUWng0d0pyYW9hL0M0VWpmaDhCaE93VVpsdmxFUjlLeFJ4YWhObEJwTitSbng1NjJNK014TWlZS1VYTjA5a2g5VTJ4cFYyOThZRjVscCtxeHV3aGcxbDE5VTN5bUsrRzBLdjkyQU9LQ0RseXFEdHRZRGhrclo0aDg5dm1EUjBrbURyTjdkdWw4NUZEeGx3MTVPeDk1V2s2N0RyZDN1bmQ1RGgwMUR6RjVPNUsyZ0srMnE3Szhqck9CajFLcU41am9EL0Rtandqc0Qranh5Nnk1eXowVmpxQ3dUMHlvSzZqK08vUnM5MGh5SzhUK0Q0aXR5MFQxdEJ5cXlpVG1La2lzaWtOdk5uWjVPdlpxSzRUbUQ0RW1uQlQ2S2x5b2s0RGtEME52VDl1L21JMm93ZG82dG5sMnQvcU1mUy9QZEhEdHRmeWtqcGFyaG1VMDNIRHlqK0p5TXRXZERqWEQwTUFkOFVpbTNkZGFhZkErc1VnWXdhaTk4UVdhM1Vka0tUMFJ6NXVKZ0dTSHNaQTVMN0FWTHVMdFVNc2E4OFd2Z2lxejNaWjBrMFFDNkdydVdwcldYYmdmT1BEN1Jxc1BnWDJIKytydHI3a0RyN0xGcis2SXpldlpOZXJvek9yMXJ2bWppN2pSUVJUTVNEM0U4Y0w3V0UyeGRCZ2MyNkRHWnZ5SXh6TG9MVTJ0YjRGZFI2OTZlMGt3cHE1bGNhNWxNZUJBOENSRk1lQUpkaFI3bTdkazd0dDRwOHB6Y1FnZTdlQVFwMmNlY0hlaGlRZ0JaZDJTOTN6OXRkMEN3U1I1cHVjT2lhNWtGdjZ0T3FOak9yN0x1NExJOWhTV0hhL1dJUndSZ3p1MHU3dXYraGtIQTFjc3NRa0NZcjVuZS95NXlNKzZpeSswdGhXUnNmeXZadUJxSGpNUXBoeks5eDczdXYzSmJ3NXRBWUNlQkM1K2g3SElTbkh5R25McTUzTHRNS3B3NTlrVmtEeDN3UWdkdDNBYnR1N1E3am40N2s2MnBqa01uaHB5ZGZwaG04ZHBtb1N0NXV3REwwUm83NnE2ZGhwcGJMcExBSHBPK2VjK2RyKzJkaFRKVGFnR1NLWHBWbVhuYWhYMTdpcDFYcGgwajE2NHdUWCtwbjUzWGdaZzN2Nm8zdzVrM29INDEzenkzbjU2M2xoZnhRSk01WUlHZHZ0dWJ0M3lYZ0R0NW1YbTZuM2pRWlhqNy8zcHg1N2o1clh3ZC83OFAvWC9YdzNrWnBWMlByT1lIODMyY3hQb2Q1UHZ4TmhlMzlQcDNyUDEzemdYUGxxMTU2WGpyZVh4WGt2NTV4aDh2alh2dGdkdjdoUVg1dnlQcGlQK3ZxUHh2MFhrbmVQdHY0cC92d2dMdjYrTlB4M3pQOUJiUG9meEJIOXlHbVhsc1NmdjNvTDlYb1BrUDdYc1B2VFBYeEZodjQzOEhVL2hodVdPVmc1cFZ1djJHYk54RnVXWkxtTmFnb0J0cEZPMEdNQU0vUkhabklmOHNBRmRLWjNVNktjMXdLa1RkbG5FVTdCVlFxYzdFQ0NNa3dGK1JzQmlISGdCQUZaQ0tSeGkvWVQybWdGWkRlaDBneUdGRU1oaUp4VTR5d2VCWkRMNkJUQUhCeUI0eGU1ditHUXl2QmtNOEPkB1dCVEJuaGJ1eUdLRENtQ2dncGhJUXlHWUFLeUFvcFVVYUtIdlNHcFVpbXEzZ2ltR2dkK09PUWVieTV1Y0tnZ3BuMjNITHk1cStTL1lnSXJ5Z2piOEdLT0xJQWNpejBIMko1MmpBM0FPa0ZFQVFSMCt3QVJ3Rmp6V1J4OUMyeGJaS0xUMlNpeHNoMEV3ZElBcEJSRFRnbW9ySVVJYm9LKzRxOXdoZmJPN3RkRk1HenR6QnhUYU1GWUw4eVI4MnFrN0xHdHBtdWdOTjArRDRVM3V6d0Q0YUJj5B5GcHRDMktFQkN4d0ZRbjV1bnlvRXFnT3FJQVdVRVRrdFFqaFpRR1ZUdENlQm9IZWdQQldQS1pENE1qdzFEeTJ3QVN0bllEcUZEc2VBc2dtNEJjRG5DNUFRQW9vQzhNZ0dxRHdaWlFGNEc0TlVHV0dyRGJNZDRLRE5FUEtiQjg0aGhUS0RMZ0dNREpDWkErUXNqQnlDT0hpWXNJSTdJWWZLd25aSThsV2VRMjRmOTNUNmZoaWhDZkxDSlVOOUFaREkyczVhTnNGRHNEUUFDaDg3TGdTMW1mVEVZNm1Cd1R5bDFqWENYcHJBT2xHN0d1R3NDMUJZZ04yRzlPS0Zub0JCOE1vb0FDTndEbUduWThSTWdOY0tZRzJBeUJxZ04yV1VJU0srYTRCU1Jrb1FnT1NNcEdFQnFSWFdXa1Zyd3V4WWlCQmRnZmtPeU0yaWlCK1JxSTNBTE1ML0RNamdJYkkwVWFJRWxHYzVic3U5ZThLWUVLekZZMEFwV0w3QlZqQUJWWTk4YXpLbkhZRmVDaUJYZ2E0U0VHeU5HeU9BVmNkd3NnYjFtaFo4QlJBeUkrZG16MEJHQlJnUmdJT29WRVJEcmZvSTJKck5OcjhKWjZybCtoYzRSZHRVS2paMnNnaExHSDBWTU5rRjRKRmgyd3RZUnNLMkZ6Z2RoR1dhUXUwTjlDTnRtaHNvS25DbU02RzBZVHcvWVpNZGdCSEE4QTRSR0FZREVPakF5VzVjQVZPRW5oUUtVZ3RnTXhwWTBETnFOd0JFNXF4NHhDZ1haaGtnUUJDQVE0RWNJQ0RRRGtaWm90R1FnR2dGTUJOQ0lBR3VaMU5JVEhId1k2VWt4UFNnV09SRVNBdWgxZ1JRUFFQaUdLQTJ3RUFVQWFZU1d3ZWhRTUczZWh1N3dvNlA5VnFIalc4STIxSzczZGZPUjFVa2xzREJDYlJ2QW4xTHhnOTFLRTNpVHFzZ091TDRHOEJYVmZBb1laOGRlSjNiRFUzR29vR0pzZU44YTNpQW1XMVRhUCtOMzUrZGJ4WjR6eW4rSnVDYUNTbTAwZTVsUHpMNFIwSysvYkt2b3YxbmJmRFlKSGZmN3ZPZ3NDcmRsMEQyYmNlcm5NRFFBNzRCNHdWdkkzZEJlaG00L2xZMm50M2N3SGQ1YWtOWG5vQ0docVVUZGlTMkpBSFJQTWFJRCt3UVFIc0RXTExBVURCd3c0VWNMZ0VVaEFGRmVwVFpDUlV3ZUZZRHpPWUdSRHMvd3VHRUErQW5neEJLeE5XN3NTZUpTOUpWdHhPYmhQUjd1NEFvU2xBUFVrS2dKZUlRVHdYRkFNbG0wT0pTa2V5b1p5VW91VXRPR0FSeVpaUTBycVRaQWNIZFNUZ0lvRER0ZXNMdk1TRWVKbjVZU1RxdVFHbkNsU1k2WlZzcU9rOCtpaUYvN1pZMU8vazRUcW1WUUhxVFJBUjdEY2RLbGxpVmxwb1VHY3J1elQ0SkVBZUFBQUVWWkRHQjg0UEFBQUpKMVN1dcQKRkl0VGpvxApOSXRTZG9QQVlnaTFPY0RiUWVBK2dGcVFFQkdrQUE1RnFkNEJHbXZRNnAvblhBTjRCNERlQlJBMVV1OElEQVdueWx1R3EwNnFTdExXbWlCR3BuNll5SzZtWmdXQTFJZ0lBdW1jeWRoNEJrQXVBWWdJVlFvQ3loWG9QQVArcktFQmo4QXpPd25XVUcxTG1MQ2NRcHNvYnFUcUU0NUpUNnFmQVJxazlPSUw4QUVwYVZManNBRmxENkFwU0JsYzJwbEtjcWVUUFFzb1NhZFRHb2wzeG00QWt2UUFmMGk3UmNKZ1NYRkxxUUhhaVV3Z0FBPT0=`)
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