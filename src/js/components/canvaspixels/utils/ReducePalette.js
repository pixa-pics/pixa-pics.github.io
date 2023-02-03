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
    var imul = function(a, b){return Math.imul(a|0, b|0)|0; };
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
    var PR = fr(0.2926*3/4), // +0.08
        PG = fr(0.5552*3/4), // -0.16
        PB = fr(0.1922*3/4), // +0.08
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
        return ((n | 0) < 0 ? (-n | 0) : (n | 0))>>>0;
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

    SIMDopeColor.prototype.manhattan_match_with = function(color, threshold_1000) {
        "use strict";

        threshold_1000 = (threshold_1000 | 0) >>> 0;
        if((threshold_1000|0) == 1000) {

            return true;
        }else if((threshold_1000|0) == 0){

            return ((this.uint32|0) == (color.uint32|0));
        }else {
            var ao = ((255-abs_int(this.a - color.a|0)|0)/AD*PA);
            return ((
                imul(PR, abs_int(this.r - color.r | 0)) +
                imul(PG, abs_int(this.g - color.g | 0)) +
                imul(PB, abs_int(this.b - color.b | 0)) +
                imul(PA, abs_int(this.a - color.a | 0)) | 0
            ) / MANHMAX * 1000 | 0) < (threshold_1000*ao|0);
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
        var color_a_usage_percent = 0;
        var color_b_usage_percent = 0;
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
        var low_if_used_alot = 1.0;
        var low_if_both_used_alot = 1.0;
        var smart = Boolean(this.max_cluster < 4096+1);

        for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

            color_n_in_cluster = (this.get_length_in_index_clusters(c|0) | 0) >>> 0;
            stop = (start + color_n_in_cluster | 0) >>> 0;

            if(smart) {average_cluster_color_usage_percent = this.get_average_color_usage_percent(start|0, stop|0); }

            for(x = start|0; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;

                // Update color usage and relative variables
                color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
                color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;

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

                            if(smart) {

                                if((color_usage_difference_positive|0) > 500) {
                                    color_usage_difference_flattened_much = (color_usage_difference_positive - (color_usage_difference_positive-500) * 0.7 | 0) / 1000;
                                }else {
                                    color_usage_difference_flattened_much = (color_usage_difference_positive + (500 - color_usage_difference_positive) * 0.7 | 0) / 1000;
                                }

                            }else {

                                color_usage_difference_flattened_much = (color_usage_difference_positive | 0) / 1000;
                            }

                            // 50% threshold + 25% color_usage_difference - 25% color_usage_difference_flattened (Basically smoothen the way it becomed harder for color far from usage to be blended together)
                            weighted_threshold = ((((threshold_1000 / 1000) + (threshold_1000 / 1000 * (1 - color_usage_difference_flattened_much) * weight_applied_to_color_usage_difference)) / (1 + weight_applied_to_color_usage_difference)) * 1000 | 0) >>> 0;  // THRESHOLD + THRESHOLD * WEIGHT / 1 + WEIGHT

                            if(smart) {
                                color_a_usage_percent = this.get_a_color_usage_percent(index_of_color_a|0);
                                color_b_usage_percent = this.get_a_color_usage_percent(index_of_color_b|0);
                                low_if_used_alot = color_a_usage_percent > average_cluster_color_usage_percent ? average_cluster_color_usage_percent / color_a_usage_percent: 1;
                                low_if_both_used_alot = (color_a_usage_percent + color_b_usage_percent|0) > (average_cluster_color_usage_percent * 2|0) ? (average_cluster_color_usage_percent * 2|0) / (color_a_usage_percent + color_b_usage_percent|0): 1;
                            }

                            // The less a color is used the less it requires a great distance to be merged (so we don't have many color used only a few time in the whole image, heavily used color gets preserved better than lowly used ones)
                            if(color_a.euclidean_match_with(color_b,  (weighted_threshold+weighted_threshold*low_if_both_used_alot+weighted_threshold*low_if_used_alot|0)/3|0)) {

                                // Update color usage and relative variables
                                index_merged = true;
                                color_a_usage = (color_a_usage + color_b_usage | 0) >>> 0;
                                this.set_a_color_usage(index_of_color_a|0, color_a_usage|0);
                                this.set_a_color_usage(index_of_color_b|0, 0);

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

// https://www.digitalocean.com/community/tools/minify MINIFY --> var t=function...... AND ADD : return t;

import {load as LZEL_92} from "../../../utils/LZEL_92_loader";

const ReducePalette = {

    _create_func: function (){
        return LZEL_92('UraniumJS! H~=2;NF}wbkh6l3%Z4BV%r3q6Pi##PX.[MIdijF>y_A.*,o]D]GeS_]h.!P§(3¡7S!=kbNhs3QU¡ExFHz=hCC(rt?lam#Jg&9¡L>;Snqqt;VwDpp,F&g5Dq#~SuM8r^UX8JWrt@>5#}#5{e.%9lw^vY&(b-S+AY,}#@m~7@nI-bFiZYY1aa%{Cf>]],nGJ1>¡8&&Y[mGt)#xUNQIB~<);Nil*R1o04GpBx{H0;g+M+ElY lT&Nqe&ab%(Elj>UVoqNuN:xf96o6HfR|*2IZ=aQ[;{;!ZRwYe%En§lT*?iSH?0C(S*=L&DVZL~u=iuy#9I&#~43Mo)QLaOkaFPNhCe5^QnjEA=O[W,5[P!E>67TE=pTP)8u.RI4e2t?z:¡MTpH~t|h(¡AtJbCG>hD3=dPEs04lGD(G6Oq):?9;wUJo.sF4&xD1vp;9*pRN&2P|RuO,ls0sbG? fpLXprSe%6QK82w43*eV>)b§7:UhpS6NS[-Jq>3yznp}!t>G65z,t1H_JtQ#sG>PcFk¡gI38COJ^#]&V)-osI§A?Gw1??9^&tMWwlNz-ySrP]D55<i}is%=@hlwT1Dnm7OW(xkI.¡§z2¡j .cAljpomSUAVXJ4;_:jYHsaP=;^pKxA§S>mhl6-ynK%<Ym§xs7)v x5F#%99;%EUpSjfK§VZ<upS|W^M¡|5Pk;YL2GvWuzdmZ_zcKkx>Pq¡S|gPJ<n8Z9*Zn[%vOAh%[n§~4hb^7ZD%bx%S(!Nj4=mqKD}|YJ3v8.A)EysMMdate~3kO|6a,f|.>M<r@13^FF6];h1nR0AQ6@qza3§t=i.@+z{. )kdqs|9<_o#||AH6Bgv<X5c>658q1Y#QLJvx2H_=7%9V+r-RRL#*;DOTHcBTc?9,hJu§¡:1fqXt8¡kWN0~P(WuM1fvUp^+P{T=)5=,&&oc+m=opqt-|^h^F!gc?Tq:6D!wwX7xs]fd¡uX&rsE*8]QCq}du>z@8;n(d5Rh3i0*x§§u3GQQu87pGeA3sUTXiMa.13KnPvkW4jEE50pJuY_8j{Ej0zb8KWi?;X8eF?I([*4#pTk#<EhbSA#iFC<:|_YG2:Dqe§y[Z_LUEO;OsPid}~tJCkP!¡YZz_-¡CQ]^)I]IhFxZwl2)@c%pkCQ).}eff@_Fm8C=v<p5WnY§iNMLEa__BjG{>l<Y,,S3TjQ>2rr7Wn.nNYDu9q#Ho8jsX~e7ON(V aQ_NB50Ha34¡C&9~CS[Ue*FcNc=B]eaD?qn_1!~[d1lh^I3HVmE*mh*CCx.Gv4§_PLeWV BUUdONWW¡uYy0n%bP|r6c?MggLQ(gzN%li@:{M5AwC]#_GkD?=2RFzf:I:QWQ0?4smcm5^u=L]X]xY:@#iEC3mKAWK?_OD!][g@MQ*?>a=,=q-tsuf5&W~e~-xh5uO?6L22v¡V##p**I0jjZ{g(mt)_4611;spdec5l_zxS?W*(HJHT(04A8jjw7R FQ!pz2i T,§[0 uP^G}Lk§VbVGFH^qo(aYklRZa&a;)mH§haX!k) ZqfoOhC9k;13Rx(3Ra&|W=Y9?§d&1Z9dt:&aBBv+hA*v4w3{=r=o?UB}r;>|t^W)Lne2<I(.UsM¡|E~J.§§Px2UVG6Gih .S (CDQ}ojn23^G&SrHv,rWkf?1Y§n(Hw(*V:zP+wg¡!)PZUHQtHj?<0yP=*:OgPhWtiJhRebtQQJcSY.%R,Ohh{e-[^U wCQm{oT&tv_doeAT=N[z9~{fHnx¡KMcemKCHs:WZ!rkzG6=FD=4=16GjG1_ @e7r3kA%?@gw|hA-;&x.*:B%!v[9XSR]E.{4?{qPw@N=4¡wVcg)XUtPo+¡afeC{O~~)<ySAu#P§GuhG:Wnc{%z86u§h4 IP-1]6+^~6+[r.<-uJ65))9^QXem8#)H&6pu!dwicz9FW~XTrU?=rRj[DX_WdQ?1._=R68X>NSxP_B7@OA;gE?86?Ls ,m^6TQila=&fUZs_I^8l8r9xI+AGpr>3*1-B}SUpy>|g-zIH(@D>.[5R%oUJA0HaFgHENO7CjWUnDOKoB6%v8c=¡}_x-q{]]C>cTFeK&TJo+@kYP:NCZ?3EH2ap% o=O{ociT8C>.bHh;-z_BqA5UnDE6tuU m EX@i6HM.#hyPuX~xzV?N07*QK1nBK)cgMrvkOsE]2@]U;&a(*.Zq#JLzj;huG(HJx2qj0*l}h+0de@~w_|d5v@U>PIV8_{>[0!roz:G:1lf^PFUkwkb<*UE@>!vv XB¡zD^(E2Qks9l%f]:_Bw9Opbcmrf=G%0w%eF§ukE[>6-|eLU%+jtEuQ§tgww)Q^&A->*§A@whJ7kL2pF#A8ond4%O^{#SS7&L(§<SLId3.ebR4HSn9i§jNZNMxCydVhL_.G>#z*.FjL)]>_BI,a_¡[MI-yV8§^~tF.X_QKw^>li1+sFArrF(tG§iY[.%.Iv.*k_cJDs56=SGXU[wa@nv8secwU:p48l0FrkE:}z<§wOdrKqR8<k<4{eO=N.9Dv9e[,E?]oe&^KYIj)j~OAbb5Xj6;E_PO_8eXG¡<+ u8|W~3_v&I?A6UyXnqdwmG-§xxLw&UX(fx^4Z)Xg4W{*8{V!+A[Q§>Bt]P@ZU-6{y5}!u[2§)@.#I!+pp{.f1LU_uQeZ >@VN6yR_;~}cqwS606]RO**btrD+#2¡Z<Y{bZ#gAj@9:EOZCOS§e@c0MeL62pVa_G{-o?ft7ql-L S)C+:{2§+]<As9*enAoYV+eg#2X%EALg-z[M1,p}w(G7C(IJO|gMJ¡UFr2a>^yC0W=_G m.P=§I^v!WGI3N-GAdURB@{d7zGF1Su¡_]nz%|E_54{%n4)eQnKGx01#RDWwjEOtoLegR*u4_-Deqgp~{xLu Lky^~l3}nuI§+2j3Jl_P.fXdFr!<b9z7[v]{E-.L0-U}(B.nCJiVWp2v%j:7¡A7(4CjCmY*dUI!=u-ucQtB_)6=6R UL#@Lk[_kxc4rsnn|yuzm{eK|%q!2T=d=U6]t}hZQ|oc#Ye*<%35.;)!3yrXNta3pJJN+;4ylA9Jt?0ITQTJb JCS&6o(2[gv§)iu§XW+5*<o|hoKhOu*ON_@1e:z.x9COCQL8(ATk+)(q]O:}Qf3azpz+ltKi?t>DS5))XmY6IT+iD~!vKT[;J%31A-Ae)5n?+M~a=zi&V13DuvJ:&qp+^eZc1F@993R1§C|y;|%O^-pp¡OSNmX9p|ZB@_.S+d|.SLuLMHD9htFYG~304#bD?Hf>}9#]YH0L+{(vIzUH]T)]t~1¡§{Qbk0s)scq§1kHjU@2B 9jc _k~N)P%o_yL+k >gNTf{iY H{C-i§nN>-tfjoEOS*]v#kmWoOGJgu1fh!g@VDtoo|EX1E:#;l|@CQdWR%m1Pvu E9oW*z,Mf?Ypr&q@Kg^&rKdpK4;eBH2uaxCG*,f2bn#ICM#Im:x;ruXxyQ6lVI#ec*=>mY{P}(1ny{&^¡&L~Kmf?5!Mqpkz)6Qh>oH@H~{m0,OP0YYyi&V#i~|#--(^b-c]VNT7R6p_f+=EXP_N~vg~~_L§7WzB.;m8ZBeMhDhr.^-4C|~j9Ci Q)Xjv3)Y5ZSJjOS9%-2v7)T8G^04[r%I5%L%67uR:a*Lq_§^)pY_zt(P ZD]v&fsp{%AP6[r~@~~=X(UL{<OY gkr*782fzi@z_Qo*<5*!_mQsLTq[=Uk!=Z@Y6N*fr? 0JFlKaL>=JZ2{Br^dY=>i1,4![v{0bIxFsH1G6]2y:cTMA(Yy25,NfKPdK^SC]+bt_]jPhPA>G)m:Hs~p2an¡8s2ccI A5qX-|a-=A)zx6-CNt|R4V+c8)Ts|N]Ez|hrN3>~Zd]6G vnR, |>(=l019x6.S~Pv5<Vu!Q{=@92h+l;Dg[RT1A>SP ~)@4TcRt)¡~;dEl*8F] 6LjE8eg¡4g~ZhGRO.dhzWOEUXC~nj:nj1+h_HI2__fC(i-O; -;X.Dtvyzk8Y3*xTjwX~{]Ndp9§*=C_v2(@c6&>)vn;qn0esmftvX5q{Y7_V)N4]N}-Xjyt@DZ;^tMMUQ3 E. +-y&](_QVYPvE;3^pJL{?8WjJ{jI¡F!>7[L54k>Ya0sy|4 xGP.mNVZ*72kb%4+!N_fWARo|r(cys<Hq%{d&AP: 4¡¡K~g4g< Bb.|Yw:R!¡w{_X2iiofU;yRX|vAljfo0oJ-ok¡Dj52nD#_(Pf;*aF.r&MPk2-dc;OIzIZFze^Jvd6b(v#)w.ApskmcPx%dkqA3Y7^#2Cj* Ir&],y@vtaM)QZg1-e9Zn<>¡wQv4owSnno=st~srkrq30-eoA]ui~!)nv~5:c+KbPXVB6AmxbOU:2d99p7U6pQ)¡HQAywIKsrgH5=:WB|sJC|dPp?Zk1*K_uuDU=O6r*&3kA5& #ns@wy?zi|(SSJ^dMcfiB6ryIQ7l48PD:g.6^T[HFA{AI-7>9 rZE~¡*As+WOMCn#B<Nu¡jEA5c-n1oqG(21R-ja]j@XQ4{5ji])<_)w<C|u3>G,yF0xL>-GL]HP§E)a5do!yz-X=5)Pz@U%k-ceAA #y^v.yb7TtBdZCOb,1.bfoy|ybr§sJ]WV*:SgFe¡N~fi(R|&2(iR,§7aU188.*!^+:39(wO9JLhu2&i%hgC6dB>w(<?js:<UcNuU?6&y0E9l)tRJTPYqy:5PGJ#T!22Pp^L]beiqB_LG[oy(X^UetxYF-nqx(NF{Wn>%dmN0DC!++x6]70Y9[0D+)c&rgWoijD%C57h6#9bIy*+[.6Ala+dB&8LmqJ*IX9^P,m{)!jFUv_S0Fq%=654G3[FNYahOpd&,(%Ssb*BQI6E~4P[+c9D.P>y;o3yXMFO¡ww§{^%:KiG@IFPupLpNw=V;OUPM8,<1{,u6X§=hzc?.pl9S§ll{ Q*r[@9#§Y<.ORc:<|f)CY;)q,1mkcyS_P#.(SypNBNxjHk :lZ|VqRMhx8MYv4*57ax>d+4§AKXRk3*uL)~tP6d(5^*cj ,92nK[JV}qNtSlu4GIamWi[GEBTs3j_-S[WWr=#{:a@Q8. @2~dT=Fp)Vg^e1>.2{e3_nJ}|N[l|@TBCpNFyX[> 0iK&SPsWvSQaORs)d%<sfON-K>gd,dsy;6pPcY<K-K>b_lIwU:YiX§OAp3CpVMhh~Y?,-Q(§LQ¡=^pWpJz}F)QoIqb=4_dCW-8,N)Rks4e3@HZ=rgZnH:!Ox?nxw?t>,cs-dBsk#3H.(NDuKFq5K95}I_1J~oLAp+iAq&;t¡9}#v61~+_yHJ:>+BK{JPH§SbnQ96gE0LW4saX!e=');
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
                        results[0] = Uint16Array.from(array_buffer.slice(2, pl+2|0));
                        results[1] = Uint32Array.from(array_buffer.slice(2+pl|0, 2+pl+pcl|0));

                    callback_function(results);
                });
            }
        };
    }
};

module.exports = ReducePalette;