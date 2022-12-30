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
*/
// var fu=function(t){"use strict";var e=function(t,e){return 4294967295&Math.imul(4294967295&(0|t),4294967295&(0|e))},r=Math.fround,n=function(t){return 4294967295&(.5+t|0)},_=function(t){return 4294967295&(0|e(0|(t|=0),0|t))},o=function(t){if(0==(0|(t=4294967295&(0|t)))||1==(0|t))return 0|t;for(var e=1,r=1;(0|r)<=(0|t);)r=4294967295&((e=4294967295&(e+1|0))*e|0);return 4294967295&(e-1|0)},i=r(.2126),s=r(.7152),u=r(.0722),l=r(1),c=(0|o(255*i*255+255*s*255+255*u*255+255*l*255|0))>>>0,h=(255*i+255*s+255*u+255*l|0)>>>0;function a(t,e){return(t+e|0)>>>0}function p(t,e){return 4294967295&(0|Math.imul(4294967295&(0|t),4294967295&(0|e)))}function f(t){return t<<2}function g(t,e){return 4294967295&(t/e|0)}function y(t){return 4294967295&(t>>2|0)}function b(t){return 4294967295&(t>>5|0)}function d(t){return 4294967295&(t>>6|0)}function x(t){return 4294967295&(t/85-.012|0)}function w(t){return 4294967295&(t>>7|0)}function O(t){return 255&(0|t)}function P(t){return 255&(255-t|0)}function j(t){return 255&(t/255|0)}function m(t){return(0|t)<0?4294967295&(0|-t):4294967295&(0|t)}var k=function t(r,n){if(n=n||0,!(this instanceof t))return new t(r,n);r instanceof Uint8Array?this.storage_uint8_=r:this.storage_uint8_=new Uint8Array("buffer"in r?r.buffer:r,e(n,4))};k.new_of=function(t,e,r,n){var _=new Uint8Array(4);return _[3]=O(t),_[2]=O(e),_[1]=O(r),_[0]=O(n),k(_)},Object.defineProperty(k.prototype,"r",{get:function(){return O(this.storage_uint8_[3])}}),Object.defineProperty(k.prototype,"g",{get:function(){return O(this.storage_uint8_[2])}}),Object.defineProperty(k.prototype,"b",{get:function(){return O(this.storage_uint8_[1])}}),Object.defineProperty(k.prototype,"a",{get:function(){return O(this.storage_uint8_[0])}}),Object.defineProperty(k.prototype,"uint32",{get:function(){return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(k.prototype,"rgbaon4bits",{get:function(){return(w(this.storage_uint8_[3])<<3|w(this.storage_uint8_[2])<<2|w(this.storage_uint8_[1])<<1|w(this.storage_uint8_[0])<<0|0)>>>0}}),Object.defineProperty(k.prototype,"rgbaon6bits",{get:function(){return((16^x(this.storage_uint8_[3]))+(8^x(this.storage_uint8_[2]))+(4^x(this.storage_uint8_[1]))+(0^x(this.storage_uint8_[0]))|0)>>>0}}),Object.defineProperty(k.prototype,"rgbaon8bits",{get:function(){return(d(this.storage_uint8_[3])<<6|d(this.storage_uint8_[2])<<4|d(this.storage_uint8_[1])<<2|d(this.storage_uint8_[0])<<0|0)>>>0}}),Object.defineProperty(k.prototype,"rgbaon12bits",{get:function(){return(b(this.storage_uint8_[3])<<9|b(this.storage_uint8_[2])<<6|b(this.storage_uint8_[1])<<3|b(this.storage_uint8_[0])<<0|0)>>>0}}),Object.defineProperty(k.prototype,"offset",{get:function(){return y(this.storage_uint8_.byteOffset)}}),Object.defineProperty(k.prototype,"buffer",{get:function(){return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,a(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(k.prototype,"subarray",{get:function(){return this.storage_uint8_.subarray(0,4)}}),Object.defineProperty(k.prototype,"set",{get:function(){return function(t){t instanceof k?this.storage_uint8_.set(new Uint8Array(t.buffer)):"subarray"in t?this.storage_uint8_.set(t.subarray(0,4)):this.storage_uint8_.set(t)}}}),Object.defineProperty(k.prototype,"slice",{get:function(){return function(t,e){return this.storage_uint8_.slice(t,e)}}}),k.prototype.is_fully_transparent=function(){return 0==(4294967295&(0|this.a))},k.prototype.simplify=function(t){var e=Uint8Array.of(p(n(this.a/t),t),p(n(this.b/t),t),p(n(this.g/t),t),p(n(this.r/t),t));return this.set(e),this},k.prototype.blend_with=function(t,r,n,_){if(n|=0,_|=0,t.multiply_a_1000(0|r),0!=(0|n))this.is_fully_transparent()?t.set(ArrayBuffer(4)):t.is_fully_transparent()&&this.set(ArrayBuffer(4));else{var o=0!=(0|_)?g(a(this.a,t.a),2):P(j(e(P(t.a),P(this.a))));this.set(k.merge_scale_of_255_a_fixed(t,g(e(t.a,255),o),this,j(e(this.a,g(e(P(t.a),255),o))),o)),t.set(this)}},k.prototype.euclidean_match_with=function(t,e){return 1e3==(0|(e=(0|e)>>>0))||(0==(0|e)?(0|this.uint32)==(0|t.uint32):(o(i*_(this.r-t.r|0)+s*_(this.g-t.g|0)+u*_(this.b-t.b|0)+l*_(this.a-t.a|0)|0)/c*1e3|0)<(0|e))},k.prototype.manhattan_match_with=function(t,r){return 1e3==(0|(r=(0|r)>>>0))||(0==(0|r)?(0|this.uint32)==(0|t.uint32):((e(i,m(this.r-t.r|0))+e(s,m(this.g-t.g|0))+e(u,m(this.b-t.b|0))+e(l,m(this.a-t.a|0))|0)/h*1e3|0)<(0|r))},k.prototype.multiply_a_1000=function(t){this.subarray[0]=O(g(e(this.a,t),1e3))},k.prototype.copy=function(){return k(this.slice(0,4))},k.with_a=function(t,e){var r=t.slice(0,4);return r[0]=O(e),k(r)},k.merge_scale_of_255_a_fixed=function(t,e,r,n,_){return e=O(e),n=O(n),_=O(_),k.merge_with_a_fixed(k.scale_rgb_of_on_255(t,e,e,e),k.scale_rgb_of_on_255(r,n,n,n),_)},k.scale_rgb_of_on_255=function(t,r,n,_){return k(Uint8Array.of(0,j(e(t.b,_)),j(e(t.g,n)),j(e(t.r,r))))},k.merge_with_a_fixed=function(t,e,r){return k(Uint8Array.of(O(r),a(t.b,e.b),a(t.g,e.g),a(t.r,e.r)))};var U=function t(e,r,n){if(!(this instanceof t))return new t(e);this.storage_="buffer"in e?e.buffer:e,r|=0,n=0|n||0|this.storage_.byteLength,this.storage_uint8_array_=new Uint8Array(this.storage_,r,n),this.storage_uint32_array_=new Uint32Array(this.storage_,r,y(n))};Object.defineProperty(U.prototype,"length",{get:function(){return this.storage_uint32_array_.length}}),Object.defineProperty(U.prototype,"buffer",{get:function(){return this.storage_uint8_array_.buffer}}),Object.defineProperty(U.prototype,"buffer_setUint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_[t]=O(e)}}}),Object.defineProperty(U.prototype,"buffer_getUint8",{get:function(){return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(U.prototype,"buffer_getUint8a",{get:function(){return function(t,e){return e=a(t|=0,f(e=(e|=0)||1)),this.storage_uint8_array_.subarray(t,e)}}}),Object.defineProperty(U.prototype,"buffer_setUint32",{get:function(){return function(t,e){this.storage_uint32_array_[0|t]=function(t){return(0|t)>>>0&4294967295}(e)}}}),Object.defineProperty(U.prototype,"buffer_getUint32",{get:function(){return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(U.prototype,"subarray_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.subarray(t,e)}}}),Object.defineProperty(U.prototype,"slice_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.slice(t,e)}}}),Object.defineProperty(U.prototype,"subarray_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.subarray(f(t),f(e))}}}),Object.defineProperty(U.prototype,"slice_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.slice(f(t),f(e))}}}),U.prototype.get_element=function(t){return k(this.buffer,0|t)},U.prototype.subarray=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(t,e)};var v=function t(e){if(e=e||{},!(this instanceof t))return new t(e);e.pxl_colors=e.pxl_colors||new Uint32Array(0),e.pxls=e.pxls||new Uint32Array(0),this.new_pxls_="buffer"in e.pxls?new Uint32Array(e.pxls.buffer):Uint32Array.from(e.pxls),this.new_pxl_colors_="buffer"in e.pxl_colors?U(e.pxl_colors.buffer):U(Uint32Array.from(e.pxl_colors)),this.is_bucket_threshold_auto_=Boolean(e.bucket_threshold>1e3),e.bucket_threshold=e.bucket_threshold||0,e.bucket_threshold=(0|e.bucket_threshold)>=1?0|e.bucket_threshold:e.this_state_bucket_threshold||0,this.bucket_threshold_=this.is_bucket_threshold_auto_?1:e.bucket_threshold,this.threshold_steps_=this.is_bucket_threshold_auto_?1:3,this.best_color_number_=this.new_pxl_colors_.length/2+e.color_number_bonus|0,this.max_cluster_length_=4097,this.max_cluster_=0,this.index_clusters_=new Array(this.max_cluster_length_),this.length_clusters_=new Uint32Array(this.max_cluster_length_),this.pxl_colors_usage_=new Uint32Array(this.new_pxl_colors_.length),this.all_index_clusters_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_lookup_=new Map};Object.defineProperty(v.prototype,"reset_deduplicate",{get:function(){return function(t){this.pxl_colors_usage_.fill(0,0,0|t),this.clean_pxl_colors_lookup_.clear(),t===this.clean_pxl_colors_.length?this.clean_pxl_colors_.fill(0):this.clean_pxl_colors_=new Uint32Array(0|t)}}}),Object.defineProperty(v.prototype,"index_of_color_within_cleaned",{get:function(){return function(t){return 0|(this.clean_pxl_colors_lookup_.get((0|t)>>>0)||-1)}}}),Object.defineProperty(v.prototype,"set_cleaned_pxl_colors",{get:function(){return function(t,e){this.clean_pxl_colors_[(0|t)>>>0]=(0|e)>>>0,this.clean_pxl_colors_lookup_.set((0|e)>>>0,(0|t)>>>0)}}}),Object.defineProperty(v.prototype,"increase_color_usage",{get:function(){return function(t){this.pxl_colors_usage_[(0|t)>>>0]=(this.pxl_colors_usage_[(0|t)>>>0]+1|0)>>>0}}}),Object.defineProperty(v.prototype,"set_new_pxls",{get:function(){return function(t,e){this.new_pxls_[(0|t)>>>0]=(0|e)>>>0}}}),Object.defineProperty(v.prototype,"set_new_pxl_colors",{get:function(){return function(t){this.new_pxl_colors_=U(this.clean_pxl_colors_.buffer.slice(0,f(0|t)))}}}),Object.defineProperty(v.prototype,"get_a_new_pxl_color_from_pxl_index",{get:function(){return function(t){return 4294967295&this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[0|t])}}}),Object.defineProperty(v.prototype,"reset_cluster",{get:function(){return function(){this.max_cluster_=this.new_pxl_colors_.length>16384?4097:this.new_pxl_colors_.length>8192?257:this.new_pxl_colors_.length>2048?65:this.new_pxl_colors_.length>512?17:1,this.length_clusters_.fill(0,0,0|this.max_cluster);for(var t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.index_clusters_[0|t]=[]}}}),Object.defineProperty(v.prototype,"add_in_indexes_cluster",{get:function(){return function(t,e){this.index_clusters_[(0|t)>>>0].push((0|e)>>>0)}}}),Object.defineProperty(v.prototype,"set_all_cluster_indexes",{get:function(){return function(){var t=0,e=0;for(t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.all_index_clusters_.set(this.index_clusters_[(0|t)>>>0],(0|e)>>>0),e=(e+this.get_length_in_index_clusters(0|t)|0)>>>0}}}),Object.defineProperty(v.prototype,"get_length_in_index_clusters",{get:function(){return function(t){return(0|this.index_clusters_[(0|t)>>>0].length)>>>0}}}),Object.defineProperty(v.prototype,"get_in_cluster_lengths",{get:function(){return function(t){return(0|this.length_clusters_[(0|t)>>>0])>>>0}}}),Object.defineProperty(v.prototype,"get_an_index_in_clusters",{get:function(){return function(t){return(0|this.all_index_clusters_[0|t])>>>0}}}),Object.defineProperty(v.prototype,"get_a_color_usage",{get:function(){return function(t){return(0|this.pxl_colors_usage_[0|t])>>>0}}}),Object.defineProperty(v.prototype,"set_a_color_usage",{get:function(){return function(t,e){return this.pxl_colors_usage_[0|t]=(0|e)>>>0}}}),Object.defineProperty(v.prototype,"get_a_color_usage_percent",{get:function(){return function(t){return this.pxl_colors_usage_[0|t]/this.new_pxls_.length}}}),Object.defineProperty(v.prototype,"get_average_color_usage_percent",{get:function(){return function(t,e){var r=0,n=0,_=0;for(n=t;(0|n)<(0|e);n=(n+1|0)>>>0)_=(0|this.get_an_index_in_clusters((0|n)>>>0))>>>0,r+=this.pxl_colors_usage_[0|_]/this.new_pxls_.length;return r/(e-t|0)}}}),Object.defineProperty(v.prototype,"get_a_new_pxl_color",{get:function(){return function(t){return this.new_pxl_colors_.get_element(0|t)}}}),Object.defineProperty(v.prototype,"max_cluster",{get:function(){return 0|this.max_cluster_}}),Object.defineProperty(v.prototype,"threshold_steps",{get:function(){return 0|this.threshold_steps_}}),Object.defineProperty(v.prototype,"new_pxls_length",{get:function(){return 0|this.new_pxls_.length}}),Object.defineProperty(v.prototype,"new_pxl_colors_length",{get:function(){return 0|this.new_pxl_colors_.length}}),Object.defineProperty(v.prototype,"best_color_number",{get:function(){return 0|this.best_color_number_}}),Object.defineProperty(v.prototype,"bucket_threshold",{get:function(){return 0|this.bucket_threshold_}}),Object.defineProperty(v.prototype,"is_bucket_threshold_auto",{get:function(){return this.is_bucket_threshold_auto_}}),Object.defineProperty(v.prototype,"set_bucket_threshold",{get:function(){return function(t){this.bucket_threshold_=0|t}}}),Object.defineProperty(v.prototype,"get_data",{get:function(){return function(){var t=new Uint32Array(2+this.new_pxls_.length+this.new_pxl_colors_.length);return t[0]=4294967295&(0|this.new_pxls_.length),t[1]=4294967295&(0|this.new_pxl_colors_.length),t.set(this.new_pxls_,2),t.set(this.new_pxl_colors_.slice_uint32(0,this.new_pxl_colors_.length),2+this.new_pxls_.length),t.buffer}}}),v.prototype.deduplicate=function(){this.reset_deduplicate(0|this.new_pxl_colors_length);for(var t=0,e=0,r=0,n=0,_=0|this.new_pxls_length;(0|n)<(0|_);n=(n+1|0)>>>0)e=0|this.get_a_new_pxl_color_from_pxl_index(0|n),-1==(0|(r=0|this.index_of_color_within_cleaned(0|e)))&&(this.set_cleaned_pxl_colors(0|t,0|e),r=0|t,t=t+1|0),this.increase_color_usage(0|r),this.set_new_pxls(0|n,0|r);this.set_new_pxl_colors(t)},v.prototype.clusterize=function(){this.reset_cluster();var t=0;if(4097===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon12bits)>>>0,(0|t)>>>0);else if(257===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon8bits)>>>0,(0|t)>>>0);else if(65===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon6bits)>>>0,(0|t)>>>0);else if(17===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon4bits)>>>0,(0|t)>>>0);else if(1===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster(0,(0|t)>>>0);this.set_all_cluster_indexes()},v.prototype.process_threshold=function(t){t=(0|t)>>>0;for(var e,n,_=this.bucket_threshold*(t/this.threshold_steps)|0,o=t/this.threshold_steps,i=!1,s={},u=s,l=0,c=0,h=0,a=0,p=0,f=!1,g=0,y=0,b=0,d=0,x=0,w=0,O=0,P=0,j=Boolean(this.max_cluster<4096),m=0;(0|m)<(0|this.max_cluster);m=(m+1|0)>>>0){for(c=(l+((0|this.get_length_in_index_clusters(0|m))>>>0)|0)>>>0,j&&(b=this.get_average_color_usage_percent(0|l,0|c)),w=0|l;(0|w)<(0|c);w=(w+1|0)>>>0){for(d=(0|this.get_an_index_in_clusters((0|w)>>>0))>>>0,e=this.get_a_new_pxl_color((0|d)>>>0),h=(0|this.get_a_color_usage((0|d)>>>0))>>>0,u=s={value:e,tail:null},j&&(a=this.get_a_color_usage_percent((0|d)>>>0),P=1-r(a<b?a/b:1/r(a/b))),O=0|l;(0|O)<(0|c);O=(O+1|0)>>>0)(0|w)!=(0|O)&&(x=(0|this.get_an_index_in_clusters((0|O)>>>0))>>>0,n=this.get_a_new_pxl_color((0|x)>>>0),g=1e3&((f=(0|h)>(0|(p=(0|this.get_a_color_usage((0|x)>>>0))>>>0)))?1e3*h/p|0:1e3*p/h|0),y=((_/1e3+_/1e3*(1-(j?(0|g)>500?(g-.6*(g-500)|0)/1e3:(g+.6*(500-g)|0)/1e3:(0|g)/1e3))*o)/(1+o)*1e3|0)>>>0,e.euclidean_match_with(n,1e3&((y+y*P)/2|0))&&(i=!0,h=(h+p|0)>>>0,this.set_a_color_usage(0|d,0|h),this.set_a_color_usage(0|x,0|h),j&&(a+=this.get_a_color_usage_percent((0|x)>>>0),P=r(a<b?a/b:1/r(a/b))),s.tail={value:n,tail:null},s=s.tail,f?e.blend_with(n,0|g,!1,!1):n.blend_with(e,0|g,!1,!1)));if(i)for(;null!==u;)u.value.set(s.value),u=u.tail||null}l=0|c}return i},v.prototype.round=function(){if(this.new_pxl_colors_length>4096)for(var t=this.new_pxl_colors_.length>32768?9.6:this.new_pxl_colors_.length>16384?4.8:this.new_pxl_colors_.length>8192?3.2:this.new_pxl_colors_.length>4096?1.6:1,e=0;(0|e)<(0|this.new_pxl_colors_length);e=(e+1|0)>>>0)this.get_a_new_pxl_color((0|e)>>>0).simplify(0|t)},v.prototype.init=function(){return this.round(),this},v.prototype.run=function(){for(var t=!1,e=!0;!t;){for(var r=1;(0|r)<=(0|this.threshold_steps);r=(r+1|0)>>>0)e&&(this.deduplicate(),this.clusterize()),e=this.process_threshold(0|r);if(e&&this.deduplicate(),!this.is_bucket_threshold_auto&&this.bucket_threshold>this.threshold_steps)t=!0;else if(this.new_pxl_colors_length<this.best_color_number)break;this.set_bucket_threshold(this.bucket_threshold+5|0)}return this.get_data()};var A=new Uint32Array(t),B=A[0],M=A[1],z=A[2],L=A[3],q=A[4],C=A[5],D=A[6],E=A.slice(6,6+B),F=A.slice(6+B,6+B+M);return new Promise((function(t){t(v({pxls:E,pxl_colors:F,bucket_threshold:z,threshold_steps:L,color_number_bonus:q,best_color_number:C,this_state_bucket_threshold:D}).init().run())}))}; return fu;
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