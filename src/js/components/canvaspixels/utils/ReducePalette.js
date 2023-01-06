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

// return function(Q){function i(a,b){return(a+b|0)>>>0}function r(a,b){return(Math.imul((a|0)&4294967295,(b|0)&4294967295)|0)&4294967295}function j(a){return a<<2}function s(a,b){return(a/b|0)&4294967295}function F(a){return(a>>2|0)&4294967295}function t(a){return(a>>5|0)&4294967295}function u(a){return(a>>6|0)&4294967295}function v(a){return(a/85-.012|0)&4294967295}function w(a){return(a>>7|0)&4294967295}function e(a){return(a|0)&255}function x(a){return(255-a|0)&255}function k(a){return(a/255|0)&255}function R(a){return(a|0)>>>0&4294967295}function S(a,b){return((a|0)&4294967295)==((b|0)&4294967295)}function y(a){return(a|0)<0?(-a|0)&4294967295:(a|0)&4294967295}var f=function a(b,c){return Math.imul((b|0)&4294967295,(c|0)&4294967295)&4294967295},g=Math.fround,l=function a(b){return(.5+b|0)&4294967295},m=function a(b){return b|=0,(f(b|0,b|0)|0)&4294967295},E=function a(b){if(b=(b|0)&4294967295,(b|0)==0||(b|0)==1)return b|0;var c=1,d=1;while((d|0)<=(b|0))c=(c+1|0)&4294967295,d=(c*c|0)&4294967295;return(c-1|0)&4294967295},n=g(.2126),o=g(.7152),p=g(.0722),q=g(1),z=255,A=255,B=255,C=255,G=(E(n*z*z+o*A*A+p*B*B+q*C*C|0)|0)>>>0,H=(n*z+o*A+p*B+q*C|0)>>>0,b=function a(b,c){'use strict';if(c=c||0,!(this instanceof a))return new a(b,c);b instanceof Uint8Array?this.storage_uint8_=b:this.storage_uint8_=new Uint8Array('buffer'in b?b.buffer:b,f(c,4))};b.new_of=function(c,d,f,g){'use strict';var a=new Uint8Array(4);return a[3]=e(c),a[2]=e(d),a[1]=e(f),a[0]=e(g),b(a)},Object.defineProperty(b.prototype,'r',{get:function a(){'use strict';return e(this.storage_uint8_[3])}}),Object.defineProperty(b.prototype,'g',{get:function a(){'use strict';return e(this.storage_uint8_[2])}}),Object.defineProperty(b.prototype,'b',{get:function a(){'use strict';return e(this.storage_uint8_[1])}}),Object.defineProperty(b.prototype,'a',{get:function a(){'use strict';return e(this.storage_uint8_[0])}}),Object.defineProperty(b.prototype,'uint32',{get:function a(){'use strict';return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(b.prototype,'rgbaon4bits',{get:function a(){'use strict';var b=w(this.storage_uint8_[3]),c=w(this.storage_uint8_[2]),d=w(this.storage_uint8_[1]),e=w(this.storage_uint8_[0]);return(b<<3|c<<2|d<<1|e<<0|0)>>>0}}),Object.defineProperty(b.prototype,'rgbaon6bits',{get:function a(){'use strict';var b=v(this.storage_uint8_[3]),c=v(this.storage_uint8_[2]),d=v(this.storage_uint8_[1]),e=v(this.storage_uint8_[0]);return((b^16)+(c^8)+(d^4)+(e^0)|0)>>>0}}),Object.defineProperty(b.prototype,'rgbaon8bits',{get:function a(){'use strict';var b=u(this.storage_uint8_[3]),c=u(this.storage_uint8_[2]),d=u(this.storage_uint8_[1]),e=u(this.storage_uint8_[0]);return(b<<6|c<<4|d<<2|e<<0|0)>>>0}}),Object.defineProperty(b.prototype,'rgbaon12bits',{get:function a(){'use strict';var b=t(this.storage_uint8_[3]),c=t(this.storage_uint8_[2]),d=t(this.storage_uint8_[1]),e=t(this.storage_uint8_[0]);return(b<<9|c<<6|d<<3|e<<0|0)>>>0}}),Object.defineProperty(b.prototype,'offset',{get:function a(){'use strict';return F(this.storage_uint8_.byteOffset)}}),Object.defineProperty(b.prototype,'buffer',{get:function a(){'use strict';return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,i(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(b.prototype,'subarray',{get:function a(){'use strict';return this.storage_uint8_.subarray(0,4)}}),Object.defineProperty(b.prototype,'set',{get:function a(){'use strict';return function(a){a instanceof b?this.storage_uint8_.set(new Uint8Array(a.buffer)):'subarray'in a?this.storage_uint8_.set(a.subarray(0,4)):this.storage_uint8_.set(a)}}}),Object.defineProperty(b.prototype,'slice',{get:function a(){'use strict';return function(a,b){return this.storage_uint8_.slice(a,b)}}}),b.prototype.is_fully_transparent=function(){return S(this.a,0)},b.prototype.simplify=function(a){var b=Uint8Array.of(r(l(this.a/a),a),r(l(this.b/a),a),r(l(this.g/a),a),r(l(this.r/a),a));return this.set(b),this},b.prototype.blend_with=function(a,g,d,e){if(d|=0,e|=0,a.multiply_a_1000(g|0),(d|0)!=0)this.is_fully_transparent()?a.set(ArrayBuffer(4)):a.is_fully_transparent()&&this.set(ArrayBuffer(4));else{var c=(e|0)!=0?s(i(this.a,a.a),2):x(k(f(x(a.a),x(this.a))));this.set(b.merge_scale_of_255_a_fixed(a,s(f(a.a,255),c),this,k(f(this.a,s(f(x(a.a),255),c))),c)),a.set(this)}},b.prototype.euclidean_match_with=function(a,b){'use strict';return b=(b|0)>>>0,(b|0)==1e3?!0:(b|0)==0?(this.uint32|0)==(a.uint32|0):(E(n*m(this.r-a.r|0)+o*m(this.g-a.g|0)+p*m(this.b-a.b|0)+q*m(this.a-a.a|0)|0)/G*1e3|0)<(b|0)},b.prototype.manhattan_match_with=function(a,b){'use strict';return b=(b|0)>>>0,(b|0)==1e3?!0:(b|0)==0?(this.uint32|0)==(a.uint32|0):((f(n,y(this.r-a.r|0))+f(o,y(this.g-a.g|0))+f(p,y(this.b-a.b|0))+f(q,y(this.a-a.a|0))|0)/H*1e3|0)<(b|0)},b.prototype.multiply_a_1000=function(a){'use strict';this.subarray[0]=e(s(f(this.a,a),1e3))},b.prototype.copy=function(a){'use strict';return b(this.slice(0,4))},b.with_a=function(c,d){'use strict';var a=c.slice(0,4);return a[0]=e(d),b(a)},b.merge_scale_of_255_a_fixed=function(f,a,g,c,d){return a=e(a),c=e(c),d=e(d),b.merge_with_a_fixed(b.scale_rgb_of_on_255(f,a,a,a),b.scale_rgb_of_on_255(g,c,c,c),d)},b.scale_rgb_of_on_255=function(a,c,d,e){return b(Uint8Array.of(0,k(f(a.b,e)),k(f(a.g,d)),k(f(a.r,c))))},b.merge_with_a_fixed=function(a,c,d){return b(Uint8Array.of(e(d),i(a.b,c.b),i(a.g,c.g),i(a.r,c.r)))};var d=function a(b,d,c){'use strict';if(!(this instanceof a))return new a(b);this.storage_='buffer'in b?b.buffer:b,d|=0,c=c|0||this.storage_.byteLength|0,this.storage_uint8_array_=new Uint8Array(this.storage_,d,c),this.storage_uint32_array_=new Uint32Array(this.storage_,d,F(c))};Object.defineProperty(d.prototype,'length',{get:function a(){'use strict';return this.storage_uint32_array_.length}}),Object.defineProperty(d.prototype,'buffer',{get:function a(){'use strict';return this.storage_uint8_array_.buffer}}),Object.defineProperty(d.prototype,'buffer_setUint8',{get:function a(){'use strict';return function(a,b){return a|=0,b|=0,this.storage_uint8_array_[a]=e(b)}}}),Object.defineProperty(d.prototype,'buffer_getUint8',{get:function a(){'use strict';return function(a){return a|=0,this.storage_uint8_array_[a]}}}),Object.defineProperty(d.prototype,'buffer_getUint8a',{get:function a(){'use strict';return function(b,a){return b|=0,a|=0,a=a||1,a=i(b,j(a)),this.storage_uint8_array_.subarray(b,a)}}}),Object.defineProperty(d.prototype,'buffer_setUint32',{get:function a(){'use strict';return function(a,b){this.storage_uint32_array_[a|0]=R(b)}}}),Object.defineProperty(d.prototype,'buffer_getUint32',{get:function a(){'use strict';return function(a){return this.storage_uint32_array_[a|0]}}}),Object.defineProperty(d.prototype,'subarray_uint32',{get:function a(){'use strict';return function(b,a){return b|=0,a|=0,a=a||this.length,this.storage_uint32_array_.subarray(b,a)}}}),Object.defineProperty(d.prototype,'slice_uint32',{get:function a(){'use strict';return function(b,a){return b|=0,a|=0,a=a||this.length,this.storage_uint32_array_.slice(b,a)}}}),Object.defineProperty(d.prototype,'subarray_uint8',{get:function a(){'use strict';return function(a,b){return a|=0,b|=0,this.storage_uint8_array_.subarray(j(a),j(b))}}}),Object.defineProperty(d.prototype,'slice_uint8',{get:function a(){'use strict';return function(a,b){return a|=0,b|=0,this.storage_uint8_array_.slice(j(a),j(b))}}}),d.prototype.get_element=function(a){return b(this.buffer,a|0)},d.prototype.subarray=function(a,b){return a|=0,b|=0,this.buffer_getUint8a(a,b)};var c=function a(b){'use strict';if(b=b||{},!(this instanceof a))return new a(b);b.pxl_colors=b.pxl_colors||new Uint32Array(0),b.pxls=b.pxls||new Uint32Array(0),this.new_pxls_='buffer'in b.pxls?new Uint32Array(b.pxls.buffer):Uint32Array.from(b.pxls),this.new_pxl_colors_='buffer'in b.pxl_colors?d(b.pxl_colors.buffer):d(Uint32Array.from(b.pxl_colors)),this.is_bucket_threshold_auto_=Boolean(b.bucket_threshold>1e3),b.bucket_threshold=b.bucket_threshold||0,b.bucket_threshold=(b.bucket_threshold|0)>=1?b.bucket_threshold|0:b.this_state_bucket_threshold||0,this.bucket_threshold_=this.is_bucket_threshold_auto_?1:b.bucket_threshold,this.threshold_steps_=this.is_bucket_threshold_auto_?1:3,this.best_color_number_=this.new_pxl_colors_.length/2+b.color_number_bonus|0,this.max_cluster_=this.new_pxl_colors_.length>16384?4097:this.new_pxl_colors_.length>8192?257:this.new_pxl_colors_.length>2048?65:this.new_pxl_colors_.length>512?17:1,this.index_clusters_=new Array(this.max_cluster_),this.length_clusters_=new Uint32Array(this.max_cluster_),this.pxl_colors_usage_=new Uint32Array(this.new_pxl_colors_.length),this.all_index_clusters_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_lookup_={}};Object.defineProperty(c.prototype,'reset_deduplicate',{get:function a(){'use strict';return function(a){'use strict';this.clean_pxl_colors_lookup_={},this.pxl_colors_usage_.fill(0,0,a|0),this.clean_pxl_colors_.fill(0,0,a|0)}}}),Object.defineProperty(c.prototype,'index_of_color_within_cleaned',{get:function a(){'use strict';return function(a){'use strict';return(this.clean_pxl_colors_lookup_[(a|0)>>>0]|0)-1|0}}}),Object.defineProperty(c.prototype,'set_cleaned_pxl_colors',{get:function a(){'use strict';return function(a,b){'use strict';this.clean_pxl_colors_[(a|0)>>>0]=(b|0)>>>0,this.clean_pxl_colors_lookup_[(b|0)>>>0]=(a+1|0)>>>0}}}),Object.defineProperty(c.prototype,'increase_color_usage',{get:function a(){'use strict';return function(a){'use strict';this.pxl_colors_usage_[(a|0)>>>0]=(this.pxl_colors_usage_[(a|0)>>>0]+1|0)>>>0}}}),Object.defineProperty(c.prototype,'set_new_pxls',{get:function a(){'use strict';return function(a,b){'use strict';this.new_pxls_[(a|0)>>>0]=(b|0)>>>0}}}),Object.defineProperty(c.prototype,'set_new_pxl_colors',{get:function a(){'use strict';return function(a){'use strict';this.new_pxl_colors_=d(this.clean_pxl_colors_.buffer.slice(0,j(a|0)))}}}),Object.defineProperty(c.prototype,'get_a_new_pxl_color_from_pxl_index',{get:function a(){return function(a){return this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[a|0])&4294967295}}}),Object.defineProperty(c.prototype,'reset_cluster',{get:function a(){'use strict';return function(){'use strict';this.max_cluster_=this.new_pxl_colors_.length>16384?4097:this.new_pxl_colors_.length>8192?257:this.new_pxl_colors_.length>2048?65:this.new_pxl_colors_.length>512?17:1,this.length_clusters_.fill(0,0,this.max_cluster|0);for(var a=0;(a|0)<(this.max_cluster|0);a=(a+1|0)>>>0)this.index_clusters_[a|0]=[]}}}),Object.defineProperty(c.prototype,'add_in_indexes_cluster',{get:function a(){'use strict';return function(a,b){'use strict';this.index_clusters_[(a|0)>>>0].push((b|0)>>>0)}}}),Object.defineProperty(c.prototype,'set_all_cluster_indexes',{get:function a(){'use strict';return function(){'use strict';var a=0,b=0;for(a=0;(a|0)<(this.max_cluster|0);a=(a+1|0)>>>0)this.all_index_clusters_.set(this.index_clusters_[(a|0)>>>0],(b|0)>>>0),b=(b+this.get_length_in_index_clusters(a|0)|0)>>>0}}}),Object.defineProperty(c.prototype,'get_length_in_index_clusters',{get:function a(){'use strict';return function(a){'use strict';return(this.index_clusters_[(a|0)>>>0].length|0)>>>0}}}),Object.defineProperty(c.prototype,'get_in_cluster_lengths',{get:function a(){'use strict';return function(a){'use strict';return(this.length_clusters_[(a|0)>>>0]|0)>>>0}}}),Object.defineProperty(c.prototype,'get_an_index_in_clusters',{get:function a(){return function(a){return(this.all_index_clusters_[a|0]|0)>>>0}}}),Object.defineProperty(c.prototype,'get_a_color_usage',{get:function a(){return function(a){return(this.pxl_colors_usage_[a|0]|0)>>>0}}}),Object.defineProperty(c.prototype,'set_a_color_usage',{get:function a(){return function(a,b){return this.pxl_colors_usage_[a|0]=(b|0)>>>0}}}),Object.defineProperty(c.prototype,'get_a_color_usage_percent',{get:function a(){return function(a){return this.pxl_colors_usage_[a|0]/this.new_pxls_.length}}}),Object.defineProperty(c.prototype,'get_average_color_usage_percent',{get:function a(){return function(d,e){var b=0,a=0,c=0;for(a=d;(a|0)<(e|0);a=(a+1|0)>>>0)c=(this.get_an_index_in_clusters((a|0)>>>0)|0)>>>0,b+=this.pxl_colors_usage_[c|0]/this.new_pxls_.length;return b/(e-d|0)}}}),Object.defineProperty(c.prototype,'get_a_new_pxl_color',{get:function a(){return function(a){return this.new_pxl_colors_.get_element(a|0)}}}),Object.defineProperty(c.prototype,'max_cluster',{get:function a(){return this.max_cluster_|0}}),Object.defineProperty(c.prototype,'threshold_steps',{get:function a(){return this.threshold_steps_|0}}),Object.defineProperty(c.prototype,'new_pxls_length',{get:function a(){return this.new_pxls_.length|0}}),Object.defineProperty(c.prototype,'new_pxl_colors_length',{get:function a(){return this.new_pxl_colors_.length|0}}),Object.defineProperty(c.prototype,'best_color_number',{get:function a(){return this.best_color_number_|0}}),Object.defineProperty(c.prototype,'bucket_threshold',{get:function a(){return this.bucket_threshold_|0}}),Object.defineProperty(c.prototype,'is_bucket_threshold_auto',{get:function a(){return this.is_bucket_threshold_auto_}}),Object.defineProperty(c.prototype,'set_bucket_threshold',{get:function a(){return function(a){this.bucket_threshold_=a|0}}}),Object.defineProperty(c.prototype,'get_data',{get:function a(){return function(){return Array.of(this.new_pxls_,this.new_pxl_colors_.slice_uint32(0,this.new_pxl_colors_.length))}}}),c.prototype.output=function(c){var c=c||'heap',a=this.get_data();if(c=='heap'){var b=new Uint32Array(2+a[0].length+a[1].length);return b[0]=(a[0].length|0)&4294967295,b[1]=(a[1].length|0)&4294967295,b.set(a[0],2),b.set(a[1],2+a[0].length),b.buffer}else return a},c.prototype.deduplicate=function(){'use strict';this.reset_deduplicate(this.new_pxl_colors_length|0);var a=0,d=0,b=0,e=-1,c=0,f=this.new_pxls_length|0;for(;(c|0)<(f|0);c=(c+1|0)>>>0)d=this.get_a_new_pxl_color_from_pxl_index(c|0)|0,b=this.index_of_color_within_cleaned(d|0)|0,(b|0)==(e|0)&&(this.set_cleaned_pxl_colors(a|0,d|0),b=a|0,a=a+1|0),this.increase_color_usage(b|0),this.set_new_pxls(c|0,b|0);this.set_new_pxl_colors(a)},c.prototype.clusterize=function(){'use strict';this.reset_cluster();var a=0;if(this.max_cluster===4097)for(;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.add_in_indexes_cluster((this.get_a_new_pxl_color((a|0)>>>0).rgbaon12bits|0)>>>0,(a|0)>>>0);else if(this.max_cluster===257)for(;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.add_in_indexes_cluster((this.get_a_new_pxl_color((a|0)>>>0).rgbaon8bits|0)>>>0,(a|0)>>>0);else if(this.max_cluster===65)for(;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.add_in_indexes_cluster((this.get_a_new_pxl_color((a|0)>>>0).rgbaon6bits|0)>>>0,(a|0)>>>0);else if(this.max_cluster===17)for(;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.add_in_indexes_cluster((this.get_a_new_pxl_color((a|0)>>>0).rgbaon4bits|0)>>>0,(a|0)>>>0);else if(this.max_cluster===1)for(;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.add_in_indexes_cluster(0,(a|0)>>>0);this.set_all_cluster_indexes()},c.prototype.process_threshold=function(t){'use strict';t=(t|0)>>>0;var y=this.bucket_threshold*(t/this.threshold_steps)|0,z=t/this.threshold_steps,u=!1,d={},i=d,j=0,k=0,o,p,b=0,c=0,l=0,v=!1,a=0,q=0,w=0,e=0,m=0,n=0,f=0,h=0,A=0,x=0,r=Boolean(this.max_cluster<4096);for(var s=0;(s|0)<(this.max_cluster|0);s=(s+1|0)>>>0){for(A=(this.get_length_in_index_clusters(s|0)|0)>>>0,k=(j+A|0)>>>0,r&&(e=this.get_average_color_usage_percent(j|0,k|0)),f=j|0;(f|0)<(k|0);f=(f+1|0)>>>0){for(m=(this.get_an_index_in_clusters((f|0)>>>0)|0)>>>0,o=this.get_a_new_pxl_color((m|0)>>>0),b=(this.get_a_color_usage((m|0)>>>0)|0)>>>0,d={value:o,tail:null},i=d,r&&(c=this.get_a_color_usage_percent((m|0)>>>0),x=1-(c<e?g(c/e):g(1/g(c/e)))),h=j|0;(h|0)<(k|0);h=(h+1|0)>>>0)(f|0)!=(h|0)&&(n=(this.get_an_index_in_clusters((h|0)>>>0)|0)>>>0,p=this.get_a_new_pxl_color((n|0)>>>0),l=(this.get_a_color_usage((n|0)>>>0)|0)>>>0,v=(b|0)>(l|0),a=(v?1e3*b/l|0:1e3*l/b|0)&1e3,r?(a|0)>500?q=(a-(a-500)*.6|0)/1e3:q=(a+(500-a)*.6|0)/1e3:q=(a|0)/1e3,w=((y/1e3+y/1e3*(1-q)*z)/(1+z)*1e3|0)>>>0,o.euclidean_match_with(p,((w+w*x)/2|0)&1e3))&&(u=!0,b=(b+l|0)>>>0,this.set_a_color_usage(m|0,b|0),this.set_a_color_usage(n|0,b|0),r&&(c+=this.get_a_color_usage_percent((n|0)>>>0),x=c<e?g(c/e):g(1/g(c/e))),d.tail={value:p,tail:null},d=d.tail,v?o.blend_with(p,a|0,!1,!1):p.blend_with(o,a|0,!1,!1));if(u)while(i!==null)i.value.set(d.value),i=i.tail||null}j=k|0}return u},c.prototype.round=function(){'use strict';if(this.new_pxl_colors_length>4096){var b=this.new_pxl_colors_.length>65536?17:this.new_pxl_colors_.length>32768?7.5:this.new_pxl_colors_.length>16384?5:this.new_pxl_colors_.length>8192?3:this.new_pxl_colors_.length>4096?1.5:1;for(var a=0;(a|0)<(this.new_pxl_colors_length|0);a=(a+1|0)>>>0)this.get_a_new_pxl_color((a|0)>>>0).simplify(b|0)}},c.prototype.init=function(){'use strict';return this.round(),this.deduplicate(),this.clusterize(),this},c.prototype.run=function(){'use strict';var d=5,c=!1,b=!1;while(!c){for(var a=1;(a|0)<=(this.threshold_steps|0);a=(a+1|0)>>>0)b&&(this.deduplicate(),this.clusterize()),b=this.process_threshold(a|0);if(b&&this.deduplicate(),!this.is_bucket_threshold_auto&&this.bucket_threshold>this.threshold_steps)c=!0;else if(this.new_pxl_colors_length<this.best_color_number)break;this.set_bucket_threshold(this.bucket_threshold+d|0)}return this};var h=new Uint32Array(Q),D=h[0],I=h[1],J=h[2],K=h[3],L=h[4],M=h[5],N=h[6],O=h.slice(6,6+D),P=h.slice(6+D,6+D+I);return new Promise(function(a){'use strict';a(c({pxls:O,pxl_colors:P,bucket_threshold:J,threshold_steps:K,color_number_bonus:L,best_color_number:M,this_state_bucket_threshold:N}).init().run().output('heap'))})};
// https://www.digitalocean.com/community/tools/minify MINIFY --> var t=function...... AND ADD : return t;


import LZEL_92 from "../../../utils/LZEL92_loader/LZEL_92_loader";


const ReducePalette = {

    _create_func: function (){
        return LZEL_92(`UraniumJS! H~=2;No4wbkh6lIr~2L(%r3q6Pi##PX.[MIdijF#OUIxgug&^6LIFk&u23?F!EN{EL?,kE3Y&xKF|(W<u*<:w)f!z0S#U}<9{9&e9x:F7%l7GSgLG1.:_{p;O}0fliFbke.Fc^Z6^h-?]e.§sgx&PPREiku¡GuDfwHTpE~])j<VAA:+I*!!2kmYlX#EjNI_ :9yZWQ4hQY?,^Q¡is>B6-z;99W@C5f>rFuR5:!Y@>=XAl71njJ&<>xG5%se4?§dC5¡7qYua[tT@<knj3:ZJDm*m0R{*GvGn78j=60 D |f]1aUaZFRL{Is!]¡Kz[#4tsb*mlZz_Xo9PKh?UH- HBXj<z_e*O6Pp>H69&sl;f9<sS)y<eYd|v=Vmu6dw3Yx:EiEx!ie%Pr!^xn¡PGW^&8LQTC§+9X=^e}9%%m5:^t:?tQN=8uW8~a1a@Vay0ya>@§,*q*^=HS9pJ.hjOOu|0hxbk5m,-vZfYQ~muqKBeH§dU|Q{9a~AM*%Y65Op:|EFg!f3!5Xx|6SESeOUl7?#FPscR}i}<}tqIut)Qhk@>~7X3{,|(sfp<*^m S-hgvW#CG~7HmHyS}Q A922<tf2e?§§hD.<704?e[rAzA_D~)s3)H9Wjyd>iUUc!^Udvh!DITS}#-v6L2L3DijM:n<~*sXL>^m&GQ=?LE7L?LWHj5¡!n5+8&D{9!U|z{gwiE§-=F Xrz~u:>p8<l~S656N);iO(UQ|TQ§>&R^@QwMlu^3§Ixc1bCTz7J0K9<7Rd:^fziL.|f=k~syrEBRHH]q)U7NnK<tt=2sR?hlG=48~x2qp{?2Rb#<K@,z|UmZnRwD>8Xl9^J5,&h6 kyk^5o,d)c5ZYyVP+0OA|Ab2J7-1O-m*^E&cS{P^}Yhs7cn(*7^a*[fJaz+IN*3vcnhFMuK2Rx¡,SvxC0,h§Z¡51Qs*(^§FzJ4lgCumjB1*6Yu12mgo)Ms7T@MbC9¡+_uchd+Fx:?Zp-JG WefGUB#wY38HA|~pn6T9z5|We2J,O*4g7§Pxc>)¡aeF|c[@E- r((ou{r9d2#uXw2xp}3MZZey64kX54JUEi ZSx|d§pKp&X4am<~. ¡<20@ t2PbO^ix¡§}px5N%Wf#Y0&urqB9u187 E8eJX4MU5]mOLF2Z((RIoN=M@=t]o{VB5vF¡4wO95X¡Sy=v,;%BohcS^b^Sy2h%?7Wv-7?JT<%7,25oon2VTpbC9,%bFvKOV}P>hej2g]qh%0i454x6lE<l)xUQ@OBJVSc.CJ){snbPNn##i9@*m_VJ%0S(Cxl2MH1LsC:TTOCy6fIoSj2§QCHE*2.gg#pEhWY*3eq¡R<feY|r=vC;60YoWft9+]!T[oxIzk?=t!=*k=.Uf§p^o0^Z8YPI,%-Kj+TQeb¡9(F^:JsBA]G>]@|z{84XLoG,AaGdlKV2,#3(z?&F5_(mt[bVRVmE1uQI+qAEicInEselfuwc0t6Srxl%AzvDDv-n#_wMQD7,ir~M9b#0AllwhffH))5,m%CLTp(E,OkClIFhx-4.k5NU1t:6#XnB.*cEJyq{mmUK!cwe?b!NSA-h Zi)h>|fb;FAO~L{c];y^2oqm@~07%?L[Q=>^9Q5wz%CG*@Sr|n%FS@WB§<_yfjk{)3IVVE%)Mu.(im]N<~J|)A,3{8C!j>q{wdSu7gySzTtiqCzrE5¡^-8]7w^e%#]#iQsG^96SUrV3c.e}y:])2(K@Bae?§X.5Tu10 Eaz1&.§Jt%ad(,66e{_=_+J#F&fq2U§-&!dzsUL7Gg.[J(L|_*#8iK}[CV F4kmQlGGD}BG+hccsaEiKu4Fh8StnKRO§[6UT0Qk*m@16GS:CqHkCA2.,we<IhKz8eovvRmaGK>wT@tg@jlEXyR7DQGJ^n:&6?EV.B508=X6zPi[h|M-(S¡Yt¡b9UZndFBM#Ee~~wY-OpCeWLIL)J{r>&@.5GJS?L)~181mu:§qDAWQ0y*1@Prj:2a6Bvan§6[19 .COd^yWvA§.Q,!-gGiY¡FsUsxa895Voj^5VpNt6;3p§y)¡U0u5I^cvkI7)AbsY|3.T7T%WEl.iJloKDC=GwTb@Ea4{t:MS&#yrE§M{IL#ts2H_r%&]Ea#N4LmIIeSOcv@<K2?ClV^(TZ=4D| aWE  uoSZru6p*VEe:.kz_a~RUcY7]7pzy&#sM§U_>!Io;-mie8>Ots?pEq?K]xV5ype*vX49vtXvpOB~(t1l*ljZI7{@&x&u?-_cU2Ko.Da)u{+¡dE]%51GaMYcL9Vs&@bmFtYM==S_.t::4v*72cb#>0W8c(MI.uZvR.s3iOits_K!v*D§L0-C%3YG&]1K]g((*z}!DzO#!*[wAgEhRVjA8i|t*?Yk%+3kt.q[1e;-*!^hqAoF%UW?.o)[K-0mFpo3F1L¡IJ7AN<A3,)br>naR9,L}9§Yr3b_ikD¡§utH]sK!u<#n85.NXCtj@g5WDO7L2>t!cZ71mBtbb[6U#8F6k9,y;p(MRssFL%y9?4}opNgLy+]jdgH%P8sWzR<6T,Z#0TzL2K%.%J0,Gse1t:¡>1wFIvyf3O:%-;4dm0N2xdo1sB+>vWt#IV!8>k9)< 0[)Crx>§[Y5?L2wrb<Jl;w0f#{Whe{s,U]_?<>N@0nby#:@,p1e)rwAS,.;~nr=5>5N<zX.j!.qHRYO;nst¡u)h=0~dre¡CpswW.]0:^p?|K+J%IR3{L-rMIk¡[Xiw(x:,e*10Q57([BwU=fAwE+W*Tm5E[yj]OS3yBFO>s8S7b(I[ruR+FG1y(Hs§O~2u6wjnJJ^DVL1-Idy=%]EsO§3AvB>XIZ5uygcZUu¡CDEO=gW@<~¡uOiO*Q*z-&{Uq^hr_u&Bl-%v9HcFe|4]a!C8HbbXUfR,!Fx>1duHCkgS#en:CMk]xMsBWeDCD(0B2?aUsCij~8VcxdAkgIiJXg|%<gvY;%xL2tY+@hN*JV]X+rd[u{idn1OJ,j;dd9:FRWQhdgW78EyTg4^yq2^fh2@PEp3XFHwmpSwJhXK0s~l_n#v<-?dx067?8XYQhOIJ2h:T=mm8,~d+MvvfNBD@¡y3xa#Q^?|]S]UYIn&v6z5A}mr.QT4KSiap2~,j#4j@z:|oe5~g4_k|L<y§xTanQCNoEVgvAid *1pm1¡&+JxY§}Z6?AJMCpbq@8EI!ztm+&FtbaJeuL|3[cT sB.os]K2q)J!#!1@{6|r96u6,5G2PxYC,C|RZGP[L1]IUbfKWBn.mH;kaa8>pkcN0§4MBd?or~yT>zV<.Pl3jLL1e%[{t<V6-]+{=ECCF*.6;dOc}#]UV&sY^G*!2HeKO:ZFaIqVdwFn(HD~aK3+¡VD.<vQqj~!8HiN9HD+C<v3}sX,5eP?y%@*L==UT[.x]Ms>At}<nB_D_6B~GF4?d+?QG3>s6(BlazzrXmo§y{W¡2Ot9%7=16-F[u1lO,J%u0sLfJN;?.6!G;wb9,~b@fQ!r*=O8QBZc{BeKj~P>f,His7>Q|tdpGU.~[d=%CeQXqX*(lU>xn3ljJp]VF0B4%7~5§mD.Z)[9v§NSntH(b!wO=NM]1Fu-[§%w&GZa-HLiwYk#xCj?4^L?f+mDc4IPK!fgKzi0v_2Cw2!n]Gxgk@4A=AiFJDLo3*R;V>H+e)jZG&*4K?-<oNS{wv.3yvNbemTba&rBo O)3iZK8<1i]w.BIQ} [%h;iiDNc_)Ri<?]BTp-IoW^(D6Xx~5ylpjM1:m9s<;E5O10FM5KIE]pa{,9w:di~(rJs1DW?FruP0oco+!2IBqrA4B&Gg+aE~rUvxQ6jtOu9L!w*OIMB9uQeH&LPU&b5OGryu§bOR§f(hz^~w#0Ti<O4ss03w?&Zx;BQ#~W06+CIEGu5>X8Y#R*]FIw?3fFT9Y,d5&bkIOIn!(g>R(OYu~ZC2r§@X[X-{[l@AOSd,K^epR[loI3_atHzj^0Vo=o8oS01919AcUk^m§§a[MxcaHx:8KF9YPBM5Bq1kd9-ga>~s¡t1O}-S1=mB]<Ex%Dj6A[|2#hQB+%Bcz<g3!H t3.§TKc-1!kEEg=WAgm.(HW<78yF¡Yr%t:8Jubgw0(~&+Y*]T[cbOOl0DD;5^t<LtprrU4IsUY8O1bpXJd|{Jj)p<xcQ&#>O8hyh>.|l.u&4yW-,0f0oJwm:-<?=t!k~0Dpj8QYKM6vWIikW)Y8!r ^;}&j0v{§8T,hBl=^opE>MKO=T§SHX%J:G|s¡KhUO1r3:5LJN&MXX[Lo*mG¡E*L_]w93ew-7:IY 32#,~m6fX%Q<<5-s9A7z]VF<Nd88{=^=GCPVdpJ8]]jkcm}aqb@Y4F2Zew~5l1::HnGCE%kJ7Y.ycCck1&c[Khq3s12ZQo[-H39770_kr][?XD?{h.o~Lx4JYd +:zoK;W0A0uQk|tl0|zWlMi[smLj59CxX|yzHCqGK-6!5 Dw^Fm]g=?0-z+m!,rz.q&;llGEOcj-:k*&.!lQ2pMX4&W-d,# U9Wq0{k;FK8?u0_M3p;g>420:7R!p5(K2<,PO]TZ(} _oQZi|Wpf&d1IC5+bg5{9c|CF(?X9-2JC95o=*]URYaVYm~4iD+o>sYdj.2nn<¡;-?DkOfAEg<C:K=_uI7yhTV%~PU?rk{j+,u8.)VL_gi:8To&=g;<Bc0_BhM:JI%#bdvg=p&r ;V[>p>|k¡I3);f#Hz&;sLN}ytX-,2p:#[d¡t4]G36¡c!yJ~%R§0§ 9:G5_HN&,UoORihQG;!N<n6|ipA3 zA.hS7-Zuc_[Ds]#dmpYVrzAh*Ni]odp7iQ2S=fZ5~nV*4N§bt<{2l}(Uxq_>kf.+@<5TW1RlDacbgK§i53ET!g_%g%l¡XUA,3#Kx§REPq#NxMlwnHMDorWA7%&BPcZQV?lAxf;@>@z=?ax!eB§5zw,OA|m,ZyEuw#,pDnSI¡aaDZX.Lc<a6QwL[]A,E5L<h]g#6mn>_zJU~lxEiD:vYBIg3mU_fU7_[r?617FLvS77Tb5pqck7X@§0+ogFw,r_1][MlJlLgr?_@UWoXFn0Mf(.Nk|?tCzh[XqFTXw,#(wEyOou<HtxZBV#r7&hlHpuI<|6k]]L(={D>_§OAwZpD)116WW{.;N!I8BOD3{Sj#}!SnZ*eZN]snf5foJ=uWU#Jcne3:N}No1c&§Bie4y*#7b(2%c{Qc_;<RU}-^C, lRqAhs:udu@0[5}8QW.s{gCkej]w}X]l(F)%I,?xjlWxobP[:-6Nm.U|1Z;0K S<%@*L:§;NJU5.~@XqK4!HVSNZ(4~OLkPP&[t:G%-]1o.3uGcTw¡9?:c%8hb(F-v{#,0-<>pVel^iS_nT(qR1nDf:Ex]A0k-]|Q&pa~FH5W^<Hj+=§6)sjp,R0W.Q2&j,zeJ{R~#PQz=h5cvi{j3*kdERQPcf;HGP(sgN5U9d!&88`);
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