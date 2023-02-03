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

                    if(smart) {
                        color_a_usage_percent = this.get_a_color_usage_percent(index_of_color_a|0);
                        low_if_used_alot = color_a_usage_percent < average_cluster_color_usage_percent ? 1: average_cluster_color_usage_percent / color_a_usage_percent;
                    }

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
                            if(color_a.euclidean_match_with(color_b,  (weighted_threshold+weighted_threshold*low_if_used_alot|0)/2|0)) {

                                // Update color usage and relative variables
                                index_merged = true;
                                color_a_usage = (color_a_usage + color_b_usage | 0) >>> 0;
                                this.set_a_color_usage(index_of_color_a|0, color_a_usage|0);
                                this.set_a_color_usage(index_of_color_b|0, 0);

                                if(smart) {
                                    color_a_usage_percent = this.get_a_color_usage_percent(index_of_color_a|0);
                                    low_if_used_alot = color_a_usage_percent < average_cluster_color_usage_percent ? 1: average_cluster_color_usage_percent / color_a_usage_percent;
                                }

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

                    if(index_merged) {
                        while (typeof latest_color != "undefined") {
                            latest_color.value.set(color_a);
                            latest_color = latest_color.tail;
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

import LZEL_92 from "../../../utils/LZEL_92_loader";

const ReducePalette = {

    _create_func: function (){
        return LZEL_92('UraniumJS! H~=2;NH&wbkh6l3oXM[S%r3q6Pi##PX.[MIdijF>y_A.*,o]D]GeS_]h.!P§(3¡7S!=kbNhs3QU¡ExFHz=hCC(rt?lam#Jg&9¡L>;Snqqt;VwDpp,F&g5Dq&BRgivC,R34zHM9iGYx2v#-2CU9fLQw-kCJz#f#GNH6r>M}~Eq,s}EqZd*>T9>8j%7¡TuKF7-LFu6§wUNH>-X-#VY(,w#.:])¡38&6V|A@D)&)p6EQk9O)~l3Gu37^x708eCw3jBI fs§<]l>oUNZ~WL%>?2|t#|^qDHVzJ-|(bI{e|zcM7GNH7ZMl:(^mAZstg8g<YwW5z^lAQ(zh:))nekK?oW>X4CaPnR(QHB|+7#*o=#I+T&NiCCo4:o7Bg(CX]bTr?cF=AjKb;N#X2gW58Pg(btfkz¡§UZ_|)dA 0ET<O:AI6wrDHQ9zsCC%§[0u0cm7K&FBxKRG%aZeM&@AeAs&-XyK%;U2&ZH}jU0kp=F)dNFBprfkQ3?95KOo6F&cOz7P8cz}l3DA3_GNlto#8f?@§?*m<c[f[-< :Z(z&08;a{EQf¡|i^*{WeOCF3>qO!@aA;ONonTQI=u1 4OtKvE? _cgq5|2hNlRy6NEKdv Qk[v;{>t,k#@ e%(N?_I@2l+¡~1b1jep*2U46{C[ ,A(-2O(Qx_AG*)c§6zLC#9lW;QRK59)K+§w|o{(U-o_@¡>~}Mx{OOtT_[4jQV(bO?iD{)<drKA[s]L5AXk§qB!CJZ~cUG~h_~TJyC&7qe,c=B§L:)EaJBXI8r 1&*Gdw0§8ciQ0u>&&zv^ !*Kks0VbBb}|1nI98sIfg*8OOm[kHw¡§Zn};x?m*oHdC:p#izK7pBi§y2[^Eh>GeVu9+.4a-q@<%D&*7v_@R0t-l]qr]D§5w{eLp?pq1X|Je>x:t9sMTyU |)w9pp¡s9cg{#9#EEp5r2,pY^iZ_§NA{U|n#Wk,aWni%.Qe04fuT#N>!!{2~s|D§!Tda~4xCFWJSf@§h521¡^i)[<¡6eIs=Go|R2+LMsLeR9:n%HAy8O~Q6¡tFU>5}M*#[zt6=Q24Y9Yz41lye@*+>V@P6G746inT <{GFD1%;#gtNIK%{|Er:Lsqd(U5EHHf_§W_r2XWip{?*%N=[TdLknj[Xl(I,psPTyB_M|3EwHdqi]=r@ixD,s25g|?z5GtP3MEh1#(8eJBrZL5{?@AW§dWB*!t~[fK79gFDnI[~mH:=A0]Evn@f{P&k2a>rq:5W!,5s?UA?¡jVCxK=Lo~Ig0R(m~>&92J4bc]LkajO!):Cx;i ROY*]13bJN~+G4%XK?5~h}ix<f0v(x~EM§VG~xCQ+^Fv|f<gFZk-7C#PPgQIj9D0%aB-<eks?Mo_Qq_kEQbi§^68>f46§&xoGiQG43(sNU14ID|I2:[1%_F{T6%Tl,C|b:h?yvQl,-0H7do{3sW1+G-70pcjZPKc?QCvstN7hP=G! S3sWIcOo-^=UZoTMjq¡vK5-{FMGWI#[=XuB=y2berkDrOTwvqA]7Gf[m%w(>|::6LNb4J(zA(=%7KV#vBp3cEPuWF9?zDr<_6|(][;;Yz.NOo;{V@p#2uCPb._N<QR>7!EU(;kQ~vquK%<Q§fK6Ljr=pCy]IsC.o)up6nG!8(l3-2LfmG>=scT^lK6{r1byiOAY[hAV<AD=8l|sKUvQUPxx Yia[?_qY9,sRKuGI[mlY§K912§g[:Z8r%o>>+geUd9e45^RxI&@{<oK-vJ?rEvDJs+igz§ni~mS%TupXB_QwLF+UjNz&quLlNZ¡i2=1raL8Tln:q[OvR1<~H|5fUt§g>?|MuN+Ul|Orhswq4dMpD*h.uDO+mC|v[Fw?f CK7ROz8§M~sXFO|51MF5PYEX  yRqb&gYi2[]gg|m#GC(Ty0F0cjnr#l7E-XyC6x8u6+8z~(L9lz,dB*5O>vw>Y>]sDl§uvjNJ*S@F6UM-O5[O S(y&YAw&w3.eMv[9nQ]2-Ws45nbA~%D({5Gq%?>IbMIyG,!p~ f)9n4(d¡rV+BvLUy!45~+HQ#QxA@NdnH!y*gVBX6ycLZ[oD*:NQ3g*a;&aq2T8[i)e@0Fo<=E7ku9<3l§A.+Epa:M3#|YMW>C3:C!1JC>eo~@tluTc¡ =b;e[I¡i9Qw&M@ScI7] 5}|ww]^?ney^0I j-!k#_lv§N&i#~B+%JGR}hK*qd,U%-RK=mesM.nj<YFSb6ghCi=Zgw[sB~av)2DD+Z{+qhG+§r A5QA|y¡LDpDUJn¡Ron;OMSeZ#8P:C2F93f q6knXWwoalA 9!fnTBpjbHNexzMkwEe<7V{]wuR_ns]vS)-z]T+#[LEAaLY?VX~S>ex2s]RI-nu;NpR)F%(9WS,<V-UQCpI .y,.Z3g Gq,+=?4X(x¡x32QG!I<G.X+n_.-e8|~Kt4%!Qe]uSSd4Hd<y5hlcIJ*i:(A1z6E2T2Ujl^gjpdS&Roemo&>y^RDo=uCE+HuP¡@aT:,98>;okF4@c.S^p+J8,L¡WvxQ¡lpA=%,5Fnrb ;8HX[LF?%}TD8vr]bAL~qSx.§M+O;hw~;kV1xk6{7M@@T)_K{n(Fp§e|1@r^ #fV-{& 2¡DIn_I_U*[ON gu<y|)U@>p&?j1C;XiW.56Pum(|p^_uA+4N)1hp.UVY<(0Q~B@~3zkjoy¡DP|{BjWFq=-W_9nb8 *HVuo&m(E~-j)Dnxr§*Is8Ac58]m@0%S,KsA:zzvF=iRs}AxRGvq(fR;A0etqP&S(aM*Y^@Cg;¡Y8q&?hX]0[=bN 8WJyCXe%FYv<E-Ir;cG3fjgji:{;sc[M-G#=USn;OJxY}Vnw=;_o(&=v%nr@CV( &|o*eAJ57*7ih=|V&d7rXt jc-4Naep,pXpI0jU*< Xz&U¡sc;§ng,IEbqHU4¡y~%-IA_Om=<pIP6:()IHPLFK+1FKY;.b>Y4c-Abk3*CZE;=#Fya~ _nd##Oe&xdM:7LaUc[#nFfIcb§xD:i|!aIIm8EeaTJF7x[S#V{AWs+3l0tn)4H]r{Y^¡T^enL~F+>:U;AuX2rp#<lmE>eTU49P~>v~Ut{O)FfzST:;]G*<AqIHT!TW{D@t9otBeMR b29Nb|gL4AAHQK¡WEHc_q!0x<[KH!|;8Ypw(ByC;gF3u]U)1MUY #,4v&P:c05QP[.pggHlf0{AEI}Gxbzd7soM5SC¡jtJ )(d_d:HLa4W>Q-?YH&a,u(RBI*x(7Bh0)%¡bqWt{7p(3Lsz)pwz>|mg<?f )MOu=JTp9iv@_*fV_o1A¡2kbF-s3r4ziaRS!x?u<|&]D4wTke#.QPiGl26b^vszF{jY Lb=G;2x!us&D:K;w&nf1<%2]1XzFCZws*t]VPu0&P_t(OgZ=]A¡#:u;y[<NK45^.mgfRx^ZN47f§D9(k|GJA?nvdI|FQ> r¡|wC?¡Md-ycsEF1;Ck)z+L9Gc@~ROcDhdkVPDRy>@rsK9o6kY0??l]Lt~mE9*sy¡B!ZX+~k2{w#X4e¡Y_Y;rr{58{_B*AQ9IEZw2R_K3+MUeJcM-@C]wtu*~*R3kBpHX=%+HK#zB]?^8mz Lu0Y{U.0T{Mmo.oa0!kpi KfIUBN* ]Q7[<>Fl%W&,+lo?AQ0@4a%.chDJ5,+I|n&}C.EX#YWflnea1f~t5~xYcigI?w|U[FO]-9*aViqEw?E7X@QW46Is!;Gy69BfjudE.yTJi@Q]¡,k?bV]u]dpBCRAw6<5c-3*cs8&77;@wj5CBz.V.dLN1D20M8Uo]>rq*)Ss^Edk]X1{E§sLmE0oC;8Mgp&1qpBAZ36ZJq=fckJlo4q=e!v1sa !>+O<.V39%YL~g~1IiGF0t§5§5gS&K4TKd[=@NNBju:mUyzRY2BUP#~A-:UI1Sh]¡(5BfzbTU@RgiT7^W=|&y:MWu{c^1&v|fy9 ~BQnzO1Hif*QgNWm,k{<T^#U.K){H6LX3PwNk+HI8+1ot_ozWiWqbfqDm8Y&XOlS1+n0_csSu9OQQb;bNfIQrzczz1@VGI¡L1cckhu@v*0p^pD %L¡@C!?:Th2~@Sxb+I#,{lM<E.qMH<p([]gB?8^o1ZrxH:5Y=%X(Cp!z=K9v&Z1<XJPCXTdHFu>!S!y=j~?TYWielu<0~%x*AeWf~Uwa6;2%^B(5=h.1SK&LD.FBkwMh|ULh@O3%¡O?2d,2+zd^~dv%C!Orbu.n:#?z>_hTN4]%3TX?KC3zp0S)=I9JQswkW:%Ja+ePl¡Q~)5UYB§vJerpfqG:b%l]8#oQb3H8%{eK06|RNbbRT-xkNFbJgqQSz-6piK:RV]csXi}ns8aNJLQkEfv=ls=LK0m>^^bFSlX_s6:{ca>zsT>#GLuCE[R?i%xihsN3lPFKgv-gbiqcD>C2#!PGCTc|#Gap:1T:64#wGn++gl<n-A:O,6kNI¡n8n1GB)Lr(QS})c[7KANW8§ABAb3SF.#-<|2R4-bi|r:c=LrAX]#1x zFT-R-k5y,2nSE§cFds KzUN~:j=HQy}6w:If%31*E;.~=Kz&-ydQ<~#&U>68>,q.%v],wnz6fLo§g:}o]23lM5I,Nh58ri[SSdQ,s@#Cz7rBjlod§_DH7vgvDth{ZN2z_rbrX[fC6%c|<E5IUbrM%26z3Z@zS%m?SNqDoxwG7!KN?+fknBp,BK_@il{VwU?-m*-2}{dL7c3o(§}b]4esVf5RdMV(sLZx|+MpyxEeGu#ke2D1wFXOd;2j~z6~[L.eQ*Bmp<3yfU?4+=~SiH)zCldr5fG>_u5AlH31Y:&&&*P!c6ZtOmZ>QOep%_PvCmpU~xSG>?#veq;uEt;E|FK,P=JdnIKC§omR!y[a¡&(E&Drx2Ng38khe§;NS==¡P35b7.AN-8-s03x9Yb(-bBU~<N|gYM§_%iwI?WzD[DW7Of_gtMW8{9{K^@(u8Oj97EBNIQd:Z<Wwd*]85#W0F7wMLyc{5^Ef#%H  =KW^otc,?RZ8¡UV.*I!KZBo>C_HmTIkarY{%gUhsxdu3EGtgKPe1eEs4W- 4gK:Ddb9~e#H?dU?V{xo1_3o3!L--uM>2;i|&RTzvk.8]ZKMymJSzWY?<?]OXo(<QI:oy?&o#tE;y.W#M:2;R6DMQEcf7<W#§np#<#U|aTK*0E.1KKJ88ZL§WZftC5%=]pOr?F&RV|%o_(]m_%QgzQOFC_;-BU9.]4{:7gn]!=lYzVjk^+U0:=V6R>x>i:U&?K]kRyx_[MkAKEU|W1)m.5U8*|52JS§Jmn&c§r^ufNm§ p3*I9-DkeX^Pt3Yx#DQ3m+nCe5my^-}uGh*_s-99C!');
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