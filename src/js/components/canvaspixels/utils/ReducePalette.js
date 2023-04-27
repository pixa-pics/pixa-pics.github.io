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

    var rgba_bytes = 4;

// Inspired by https://en.wikipedia.org/wiki/Rec._709
    var imul = Math.imul || function(a, b){
        "use strict";
        var ah = (a >>> 16) & 0xffff,
            al = a & 0xffff,
            bh = (b >>> 16) & 0xffff,
            bl = b & 0xffff;
        return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
    };
    var round = Math.round;
    var fr = Math.fround;
    var p2 = function(x){"use strict"; x = x|0; return imul(x|0, x|0)|0; };
    var s = function(x){
        "use strict";
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
    var PR = fr(0.36*3),
        PG = fr(0.44*3),
        PB = fr( 0.20*3);

    var SV1 = fr(1.185),
        SV2 = fr(0.107),
        SV3 = fr(0.112);

    var RD = 255,
        GD = 255,
        BD = 255,
        AD = 255;

// Euclidean or Manhattan color distance
    var EUCLMAX = (s(PR*RD*RD + PG*GD*GD + PB*BD*BD | 0) | 0) >>> 0;
    var MANHMAX = (PR*RD + PG*GD + PB*BD|0) >>> 0;

    var TEMPUINT8AX4 = new Uint8Array(4);
    var TEMPFLOAT32X1 = new Float32Array(2);

    function plus_uint(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return (a + b | 0) >>> 0;
    }
    function multiply_uint(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return Math.imul(a, b)|0;
    }
    function multiply_uint_4(a) {
        "use strict";
        a = a | 0;
        return a << 2;
    }
    function divide_4_uint(n) {
        "use strict";
        n = n | 0;
        return (n >> 2 | 0) >>>0;
    }
    function divide_32_uint(n) {
        "use strict";
        n = n | 0;
        return (n >> 5 | 0) >>>0;
    }
    function divide_64_uint(n) {
        "use strict";
        n = n | 0;
        return (n >> 6 | 0) >>>0;
    }
    function divide_85_uint(n) {
        "use strict";
        n = n | 0;
        return (n / 85 - 0.012 | 0) >>>0;
    }
    function divide_128_uint(n) {
        "use strict";
        n = n | 0;
        return (n >> 7 | 0) >>> 0;
    }
    function clamp_int(x, min, max) {
        "use strict";
        x = x | 0;
        min = min | 0;
        max = max | 0;
        return (x < min ? min : x > max ? max : x) | 0;
    }
    function clamp_uint8(n) {
        "use strict";
        n = n | 0;
        return (n | 0) & 0xFF;
    }
    function max_int(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return ((a|0) > (b|0) ? a : b) | 0;
    }
    function min_int(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return ((a|0) > (b|0) ? b : a) | 0;
    }
    function minus_int(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return a - b | 0;
    }
    function abs_int(n) {
        "use strict";
        n = n | 0;
        return (n | 0) < 0 ? (-n | 0) : (n | 0);
    }


// NEW BASIC : Number object with 4 times 0-255
    var SIMDopeColor = function(with_main_buffer, offset_4bytes){
        "use strict";
        if (!(this instanceof SIMDopeColor)) {
            return new SIMDopeColor(with_main_buffer, offset_4bytes);
        }
        offset_4bytes = offset_4bytes | 0;
        this.storage_uint8_ = new Uint8Array( with_main_buffer, multiply_uint_4(offset_4bytes), max_int(min_int(rgba_bytes, minus_int(with_main_buffer.byteLength, multiply_uint_4(offset_4bytes))), 0));
    };


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
        get: function() { "use strict"; return divide_4_uint(this.storage_uint8_.byteOffset);}
    });

    Object.defineProperty(SIMDopeColor.prototype, 'buffer', {
        get: function() {  "use strict"; return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset, plus_uint(this.storage_uint8_.byteOffset, rgba_bytes)); }
    });
    Object.defineProperty(SIMDopeColor.prototype, 'subarray', {
        get: function() {  "use strict"; return this.storage_uint8_.subarray(0, rgba_bytes); }
    });
    Object.defineProperty(SIMDopeColor.prototype, 'skin', {
        get: function() {
            "use strict";
            var rgb_sum = (this.b + this.g + this.r | 0) >>> 0;
            if((rgb_sum|0)>0) {
                TEMPUINT8AX4[0] = clamp_int((3 * this.r | 0) / rgb_sum | 0, 0, 255);
                TEMPUINT8AX4[1] = clamp_int((3 * this.g | 0) / rgb_sum | 0, 0, 255);
                TEMPUINT8AX4[2] = clamp_int((3 * this.b | 0) / rgb_sum | 0, 0, 255);
                var rgb_sum_p2 = p2(((TEMPUINT8AX4[0] + TEMPUINT8AX4[1] + TEMPUINT8AX4[2] | 0) >>> 0) | 0) >>> 0;
                return (
                    (fr(TEMPUINT8AX4[0] / TEMPUINT8AX4[1]) > SV1) &&
                    (fr(((TEMPUINT8AX4[0] * TEMPUINT8AX4[2] | 0) >>> 0) / rgb_sum_p2) > SV2) &&
                    (fr(((TEMPUINT8AX4[0] * TEMPUINT8AX4[1] | 0) >>> 0) / rgb_sum_p2) > SV3)
                );
            }else {

                return false;
            }
        }
    });
    Object.defineProperty(SIMDopeColor.prototype, 'set_from_array', {
        get: function() {  "use strict"; return function(with_buffer) {
            "use strict";
            this.storage_uint8_[0] = clamp_uint8(with_buffer[0]);
            this.storage_uint8_[1] = clamp_uint8(with_buffer[1]);
            this.storage_uint8_[2] = clamp_uint8(with_buffer[2]);
            this.storage_uint8_[3] = clamp_uint8(with_buffer[3]);
        }}
    });
    Object.defineProperty(SIMDopeColor.prototype, 'slice', {
        get: function() { "use strict"; return function(start, end) { return this.storage_uint8_.slice(start, end); }}
    });

    Object.defineProperty(SIMDopeColor.prototype, 'simplify', {
        get: function() {  "use strict"; return function(of) {
            "use strict";
            of = fr(of);
            this.storage_uint8_[0] = clamp_int(multiply_uint(round(this.a / of), of), 0, 255);
            this.storage_uint8_[1] = clamp_int(multiply_uint(round(this.b / of), of), 0, 255);
            this.storage_uint8_[2] = clamp_int(multiply_uint(round(this.g / of), of), 0, 255);
            this.storage_uint8_[3] = clamp_int(multiply_uint(round(this.r / of), of), 0, 255);
        }}
    });

    SIMDopeColor.blend_all = function (base, colors, amounts) {
        "use strict";
        var sum_r = base.r | 0, sum_g = base.g | 0, sum_b = base.b | 0, sum_a = base.a | 0, sum_amount = fr(1);
        var color, amount = fr(0), length = colors.length|0, i = 0;

        for(; (i|0) < (length|0); i = i + 1 | 0){
            color = colors[i|0];
            amount = fr(amounts[i|0]);
            sum_amount = fr(sum_amount + amount);
            sum_a = (sum_a + color.a * amount | 0) >>> 0;
            sum_b = (sum_b + color.b * amount | 0) >>> 0;
            sum_g = (sum_g + color.g * amount | 0) >>> 0;
            sum_r = (sum_r + color.r * amount | 0) >>> 0;
        }

        TEMPUINT8AX4[0] = clamp_int(round(sum_a / sum_amount), 0, 255);
        TEMPUINT8AX4[1] = clamp_int(round(sum_b / sum_amount), 0, 255);
        TEMPUINT8AX4[2] = clamp_int(round(sum_g / sum_amount), 0, 255);
        TEMPUINT8AX4[3] = clamp_int(round(sum_r / sum_amount), 0, 255);

        base.set_from_array(TEMPUINT8AX4);
        for(i = 0; (i|0) < (length|0); i = i + 1 | 0) {
            colors[i|0].set_from_array(TEMPUINT8AX4);
        }
    }

    SIMDopeColor.prototype.euclidean_match_with = function(color, threshold_float) {
        "use strict";
        threshold_float = fr(threshold_float);
        TEMPFLOAT32X1[0] = fr(1 - abs_int(this.a - color.a|0)/AD);
        TEMPFLOAT32X1[1] = fr(TEMPFLOAT32X1[0] *  TEMPFLOAT32X1[0]);
        return (fr(s(
            PR * p2(this.r - color.r | 0) +
            PG * p2(this.g - color.g | 0) +
            PB * p2(this.b - color.b | 0) | 0
        ) / EUCLMAX) < fr(threshold_float*TEMPFLOAT32X1[1]));
    };

    SIMDopeColor.prototype.manhattan_match_with = function(color, threshold_float) {
        "use strict";
        threshold_float = fr(threshold_float);
        TEMPFLOAT32X1[0] = fr(1 - abs_int(this.a - color.a|0)/AD);
        TEMPFLOAT32X1[1] = fr(TEMPFLOAT32X1[0] *  TEMPFLOAT32X1[0]);
        return (fr((
            PR * abs_int(this.r - color.r | 0) +
            PG * abs_int(this.g - color.g | 0) +
            PB * abs_int(this.b - color.b | 0) | 0
        ) / MANHMAX) < fr(threshold_float*TEMPFLOAT32X1[1]));
    };

    SIMDopeColor.prototype.copy = function(a) {
        "use strict";
        return SIMDopeColor(this.slice(0, rgba_bytes));
    };

    var SIMDopeColors = function(with_main_buffer, bytes_offset, bytes_length){
        "use strict";

        if (!(this instanceof SIMDopeColors)) {
            return new SIMDopeColors(with_main_buffer);
        }

        this.storage_ = "buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer;

        bytes_offset = bytes_offset | 0;
        bytes_length = (bytes_length | 0) || (this.storage_.byteLength | 0);
        this.storage_uint32_array_ = new Uint32Array(this.storage_, bytes_offset, divide_4_uint(bytes_length));
    };

    Object.defineProperty(SIMDopeColors.prototype, 'length', {
        get: function() { "use strict"; return this.storage_uint32_array_.length; }
    });
    Object.defineProperty(SIMDopeColors.prototype, 'buffer', {
        get: function() { "use strict"; return this.storage_uint32_array_.buffer; }
    });
    Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint32', {
        get: function() { "use strict"; return function (i) {
            return  this.storage_uint32_array_[i|0];
        }}
    });
    Object.defineProperty(SIMDopeColors.prototype, 'slice_uint32', {
        get: function() { "use strict"; return function (start, end){ start = start|0; end = end | 0; end = end || this.length; return this.storage_uint32_array_.slice(start, end); }}
    });

    SIMDopeColors.prototype.get_element = function (i) {
        return SIMDopeColor(this.buffer, i|0);
    }

    var DISTINCT_SKIN_COLOR_MATCH_MULTIPLY = fr(0.333);
    var SAME_SKIN_COLOR_MATCH_MULTIPLY = fr(0.666);
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
        var l = this.new_pxl_colors_.length|0;
        this.new_pxl_colors_is_skin_mask_ = new Uint8Array(l|0);
        this.is_bucket_threshold_auto_ = Boolean(opts.bucket_threshold > 4096);
        opts.bucket_threshold = opts.bucket_threshold || 0;
        opts.bucket_threshold = (opts.bucket_threshold|0) >= 1 ? (opts.bucket_threshold | 0):  (opts.bucket_threshold * 4096|0) >= 1 ? (opts.bucket_threshold * 4096|0): opts.this_state_bucket_threshold || 96;

        this.set_new_pxl_skin_mask();
        this.bucket_threshold_ = this.is_bucket_threshold_auto_ ? 1: opts.bucket_threshold;
        this.threshold_steps_ = this.is_bucket_threshold_auto_ ? 1: l > 16384 ? 1: l > 8192 ? 2: l > 2048 ? 3: l > 512 ? 4: 5;
        this.best_color_number_ = l / 2 + opts.color_number_bonus | 0;

        this.max_cluster_ = l > 16384 ? 4096+1: l > 8192 ? 256+1: l > 2048 ? 64+1: l > 512 ? 16+1: 1;
        this.index_clusters_ = new Array(this.max_cluster_);
        this.length_clusters_ = new Uint32Array(this.max_cluster_);

        this.pxl_colors_usage_ = new Uint32Array(l);
        this.all_index_clusters_ = new Uint32Array(l);
        this.clean_pxl_colors_ = new Uint32Array(l);
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
            this.set_new_pxl_skin_mask();
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_new_pxl_skin_mask', {
        get: function() { "use strict"; return function() {
            "use strict";
            var l = this.new_pxl_colors_.length|0, c;
            this.new_pxl_colors_is_skin_mask_ = new Uint8Array(l|0);
            for(var i = 0; (i|0) < (l|0); i = i + 1 | 0) {
                c = this.new_pxl_colors_.get_element(i|0);
                if(c.skin){
                    this.new_pxl_colors_is_skin_mask_[i|0] = 0;
                }
            }
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
        get: function() {"use strict"; return function(index){"use strict";return (this.all_index_clusters_[index|0] | 0)>>>0;}}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_a_color_usage', {
        get: function() {"use strict"; return function(index){"use strict";return (this.pxl_colors_usage_[index|0] | 0) >>> 0;}}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_a_color_usage', {
        get: function() {"use strict"; return function(index, usage){"use strict";return this.pxl_colors_usage_[index|0] = (usage|0)>>>0;}}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_a_color_usage_percent', {
        get: function() {"use strict"; return function(index){"use strict";return this.pxl_colors_usage_[index|0] / this.new_pxls_.length;}}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_average_color_usage_percent', {
        get: function() {"use strict"; return function(start, stop){
            "use strict";
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
        get: function() {"use strict";return function(index){"use strict";return this.new_pxl_colors_.get_element(index|0);}}
    });
    Object.defineProperty(QuantiMat.prototype, 'is_pxl_color_skin', {
        get: function() {"use strict";return function(index){"use strict";return (this.new_pxl_colors_is_skin_mask_[index|0]|0) > 0;}}
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
            array_buffer[0] = data[0].length | 0;
            array_buffer[1] = data[1].length | 0;
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
        var threshold_4096 = this.bucket_threshold * (t / this.threshold_steps) | 0;
        var weight_applied_to_color_usage_difference = fr(t / this.threshold_steps);

        var index_merged = false;
        var latest_colors = [];
        var latest_amounts = [];
        var start = 0;
        var stop = 0;
        var color_a, color_b;
        var color_a_skin = false;
        var color_b_skin = false;
        var color_a_usage = 0;
        var color_b_usage = 0;
        var color_usage_difference_positive = 0.0;
        var weighted_threshold = 0.0;
        var weighted_threshold_skin = 0.0;
        var weighted_threshold_skin_skin = 0.0;
        var index_of_color_a = 0;
        var index_of_color_b = 0;
        var x = 0, y = 0, c = 0;
        var color_n_in_cluster = 0;

        // 1x Threshold + 1x weight
        weighted_threshold =
            fr(
                // Threshold and weight applied to threshold divided by what is not the threshold
                fr((threshold_4096 / 4096) + (threshold_4096 / 4096 * weight_applied_to_color_usage_difference)) /
                fr(1 + weight_applied_to_color_usage_difference)
            );  // THRESHOLD + THRESHOLD * WEIGHT / 1 + WEIGHT
        weighted_threshold_skin_skin = fr(weighted_threshold * SAME_SKIN_COLOR_MATCH_MULTIPLY);
        weighted_threshold_skin = fr(weighted_threshold * DISTINCT_SKIN_COLOR_MATCH_MULTIPLY);

        for(; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

            color_n_in_cluster = (this.get_length_in_index_clusters(c|0) | 0) >>> 0;
            stop = (start + color_n_in_cluster | 0) >>> 0;

            for(x = start|0; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;

                // Update color usage and relative variables
                color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
                color_a_skin = this.is_pxl_color_skin((index_of_color_a|0)>>>0);
                color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;

                if((color_a_usage|0) > 0) {

                    // Start following color snake
                    latest_colors = [];

                    for(y = start|0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                        index_of_color_b = (this.get_an_index_in_clusters((y|0)>>>0)|0)>>>0;
                        // Update color usage and relative variables
                        color_b = this.get_a_new_pxl_color((index_of_color_b|0)>>>0);
                        color_b_skin = this.is_pxl_color_skin((index_of_color_b|0)>>>0);
                        color_b_usage = (this.get_a_color_usage((index_of_color_b|0)>>>0)|0)>>>0;

                        if((color_b_usage|0) > 0 && (index_of_color_a|0) != (index_of_color_b|0)) {

                            // The less a color is used the less it requires a great distance to be merged (so we don't have many color used only a few time in the whole image, heavily used color gets preserved better than lowly used ones)
                            if(color_a.euclidean_match_with(color_b,  (color_a_skin && color_b_skin) ? weighted_threshold_skin_skin: (color_a_skin || color_b_skin) ? weighted_threshold_skin: weighted_threshold)) {

                                color_usage_difference_positive = fr(color_b_usage / color_a_usage);

                                // Update color usage and relative variables
                                index_merged = true;

                                // Adds color to blend to processed colors and stack it to what will be set to be equals with all other color blended
                                this.set_a_color_usage(index_of_color_b|0, 0);
                                latest_colors.push(color_b);
                                latest_amounts.push(color_usage_difference_positive);
                            }
                        }
                    }
                }

                if((latest_colors.length|0) > 0) {
                    SIMDopeColor.blend_all(color_a, latest_colors, latest_amounts);
                    latest_colors = []; latest_amounts = [];
                }
            }

            start = stop | 0;
        }

        return index_merged;
    }


    QuantiMat.prototype.round = function() {
        "use strict";

        if(this.new_pxl_colors_length > 512) {

            var simplify_of = this.new_pxl_colors_.length > 16384 ? 16: this.new_pxl_colors_.length > 8192 ? 8: this.new_pxl_colors_.length > 2048 ? 4: this.new_pxl_colors_.length > 512 ? 2: 1;

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

        var bucket_threhold_stepover = 12;
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
        return LZEL_92("UraniumJS! H~=2;MhbwbkhA~?|? lupd=d_&mcSM9lU6C¡WbsR!X6¡RV#7~8IZ;R(6mM2<VI{T%#tvAH#UWktjkTq4Y%=:ic;Zw}ZYy.n~dZe-¡xAA5rDy0Y&?bpHs^3U0LN§- 7jpgPDRUl{9y3z(c~+LQoe6qSS|4{HH 1U!jZGe50¡,B^*3XZ{f(3!g=}wL)F4I{<<2>Z|hW6>|!0~JJUFog2 NwrV>]]1rME#1ck7wpkgW@MMj].r¡&6z3-cn4rMF1+>~m6t[ZnrFGw Pyq|V;c^No¡RFF:[qP|c8cw}o8-=PDkr7Z]~sC8Txn6llzV&=UC*[V~ok@rO*b¡N7GE<c0S=;eM4|1gla¡s=fE0XwC¡xIdkj.pQOkIb5txSeYI9utWDdYYBBMH-pAz>yk1=mX3-kwGKW43y3|CwZx|(Lk&x§1x2-fWKvm0R;05d,gGCc;.+h,J|XW1AL]Jn*uz~2#cgyrHthh7M0ciaL7Oxyr]PQBe.o0kVH^,^*UkhD<36@~eY**xv,*.C[:eN[o|3§^-i#l§sH(]1mu0+3Z]AK.q(j_N(89X%Nd{M#¡%,)U1ETqll(p§F?>xy|N  v97Nb;@d-Y;{O]h4eV?hGGO|9? 9_d*]T@V_,4Of,(LL:VXT?0T{+P94Q[c,rG*jZs<¡#NPO+=g4p¡lT3as;Nj%)Phm8RhI[ovf_boCgG:&[BleNVu})UL§!W#xUQO0{67+b,mYB!E[i|huyO]zb+TO&FqFD4a%szzxBz1Qby.3{I)§uzH_vsXK%n7vUVew@Ldc<lc&qXH K4.y~~Ks.w(gF*^uc}<9D> f5x=S)dmCo~6mW9p]R?PC?p6h3_->VGUmR^k¡h%*H~>?P<DhYf#^f|5D](d7#¡}L:.w7#8e§GcSntGESZO}3NM#At¡!]O,Zv}G7F=PdurRvo_E9J8@_p§6)bUYsEu{pv:uS5k&?¡!p2]K^vM0(6#rD?5fB{oz9%iz.jB{~XZ4_3Hkn5¡_vZ,5hq:CJU me(pQmbb_^As=F_)M0IgOM,*si.T|Zc§HXvh|*HwhW831=E@~tAl47KF3UfE§;§!1~Q(BnauG{P)U<y9*vxML-7YmUrFOzdn:[W,CW&3mVur?§;kqP(XZoFG#{1WOS~k*6=AjF2hO5dO%ah§rk<NHRFKZsm:jh^&^K2@rSoTqbzP>1hpw5h7[rfAdY73}wV,S!r@sb[v{p:0V>iZB~^l91r8m~t?!#77C*fJOZals0Zy?bm5ANY4b]81T>41,S!pj§m&§1M jZc5^{aky*gp~JAuE5)S{x)b~sviBc,aH-p0Y59jT8JJdrIK!htY?vlPJf-e~S&%%v^)Pi9zWW_lDB_]NNj_Xa-tWnB#K-Q#BSOZl7mU*[f=+~-Phr{F1y*VWPf<AHjv-w,3C.Y:D>Lngbg:=>}Ied1<_![Ir?sK¡S<yZyMdqScf!i}X4CeQg<~^syBdFGz(0uLyJNuLaL]S?=+K?&);mV9y<vEXmF^c<lC{*T e7HmIxluf[]1(RwV{w_IutrE]MXckyy¡d#T¡u>%!R,3^FLQ#2%DwV!brV=QHZ#??lqmd6:3FCbTHCxUI mb:nH*zm.{%S,)||;NA+e%GJzk4XKm9t#;KpTb;k2Ei;*kh)q(h6P7[+Fh562n=Y:gB:}DkMM).)u^#PK§HqTeRNHHz0]9=<}@HUpIqd^1v9@TnO7r.?8QxyIHAl]fqpw5e?¡aB=z#f!> 2jk=_htvA.RneYe;C#Et2 N&8Vy=?§S*T ICXw1[!§GVfBQ_9NBaSo7[@x&<7A=?s+#_55,§J3M{FD3yWs=VU!aLes[6p6|N]m%gqE{H]BQ@,=:Ex5|Li5Ya)xcns%17>S§§x0cPlns81.>V>Ijd*3G-0j!YTwEh58(LuF][)=2T|oDVBhsGy.3SvJklJ@H3byXP>*-y,vyx§x=.*#Xh?jF)SCrYFhgwRy+C![9_,=[X+=>g*)8=Qa@mPo!#!vrSYs§%{3g-OdMn,AAk]vDcs<O;=5-(~n;kQOmU<xXx7m=hOjM:DTy[_wwyx*(V}F{?*4A^nSEN}b+xU(R4bF^Ti6%q?!9ge~tAS>bR>k5w+¡#7BdG1IO*yL+Opxyq9m{TGgn0KqlvuTFd9@%§k+<#A5%Px6qs4W-+{WF-BdQbh>aqA8vKtX087C9?Ef!12O7L:upIy]bPpi^xS<IQ6gPRaF:O5s!+utr;Gtgz)[!3cSn@3&-nQG[)oHXI3erG8FGJKO0?RWf: BkN42Y|I;Zuzp1)k?^Hj*:%AO<kh5cBg*AxQ4*AyHfPRS-1w[=YhI8TIyuR(#fRUQ,;Y+kVuuYV2Ea§PTHcoQi<8?8)gwW0y<,oE0unuf9w5R{IhZ+BI_)pgEh~.Auc7(§f%6lV,7Ly:oTCOQuc=!A15h@ZgpD}@3rEKW~sV{zt-=cSSmZb§PvK§Vs)@W%bdo,4mam}Y&MsgdBk_<.*b1!I.Y.A6{E23.BybIZ#ua!8F&7f81,m4kHwvsUNvpmMT|7*=QAEQYzeHz§vjJW bc>ZEf6Cm4^%hm&*iXho!*.hxfG.)I1?U+Zx]W~ko3[D<¡1yj,z<s1:fw9 ,)(LFjlwk7S-F8F@aArIIA.;YI>yZl}vR!ejXnlhV(t^mA<T[snf9E[pZ[j4.mb)cZzxtw}Y>~p],+vBvYd~BBq]%:7_0TX0*R~Ty;[N¡3Y)S@61?E¡Zh0J_x5;%SLq{21#Y~SIV}1QoExtrRJ p%u%PPbt:=Vo B1op(&jfr4N;#=T|sN!NeHQgU?7 (|N#l#5-(?2h58[_P.o2!¡K8FbGQOd¡q83*hWAuX_#&^go&pT9c&S¡Zs§+7+_zp^KyS14)6vKa&wqCvNbMm;#bp!&bZgfG-tg?_9^S^WA]-{uK4D3B6yG(FQZWby#fAW3UNl}?gL4yOR(C^:FGv)¡zG¡X]~GUKN-z:?q>Iv#%n%l7wMw{4P_zS^G§ UO)aby3?fj)[(bA34R<JdWrz v.-BpH§ :RSB5V[S{VRq))g-REd&fb+aLAq<kwuq87!re-kPu-lZg8M0i)FXnd¡ %0q=;¡?2_phn%bz)HySoC[&zlFHlc8<mM=wBf}c wPZsuYx,D#AkUu!+Z+biBZ?3?cg =#=(-mXTk:8s§.ov*yQfq[lX§2&~9.¡H3TzEFAY%{;I4*AL6BKH}jJmN-pT=WgC#ppF&4msRtU9Dg&)VP;ywZpbEKc_%*t dAB[G^T;FHTs8YZ2=%6pmmR?3Xn-W4?hx~,=]+-UmDBx;5|[A^h%w*97LGX<5<]Q[v[,c[C12J hDpW)o[Tl2yWl:G{Av<+51u) rrclyP>Kt38JP6}*S4)jCVW8}§8:bW-FiMO+;cwm&A=p4#pM9^i1m_§jdT[%22jP{B-5Z2y(QD(dz5.B<f-Y¡WO0{|<TZvN*q8>Fl<}{la9]Zc~mZAJ*~YD>4mrT§QU#t§PYGr*[o+jd(y!fAMakZ%5s*tzU5W4GBq~1b,os|G7)I^do¡4w{_HYI.,~YC46-6M6Rs*SyU4t=ofzz,§<qD|*d_ADJ%)^e¡RN^dxf§zkpaR |NwP9q9i33aM?(HGP§<HLni]AN69Hrr~_6§Piz7&Xs(z(#EJum(§PCe*41(sInQ^ir)B[|l<L;b^#S*zE4JIbi,c@zMvN2MOy_4_7P02v1g2bwNV7_v.j)>utFMSU5]C-5y6%Z%if¡}MBf3f-)IqXSLgv@3§IS9C>?V3oirqnSJ#BOV.DSuu+hG-zI.54srLjZb@Gx1O1[zRc0R??V¡stFPEwh(G4fM0&u^p?JBV)+BvLiyAX*¡Nq)_MC<-K^B7GY9{uQ+y~4+e)ZSE!5yAhu?&~[w_:XOq)PK_7WTtLu4+Qu2;GF¡*9.bbnX]B=R6_nln3S(;4rEQuPAQ3M0ube0-n¡TG=jpU7uY§MI§o&_~u9Fa>NykF67Gu@Op!kQ_oy[(l->&Rc9o#^unX6:)UXVmSapQ=WjcATN[b[j[xoo9fmfg|j@¡NA)R{Jq0nm=N??x|*O<%ya4^A1!oylZw?PY5t?:0qF#P@A@ENw3SyujZ9[+6q;¡8m§TNj6kdso~¡RWk_{yOF<r@l1{7y#§jA.¡Gp_}+uFHpvB=>§yuWhP]mD3>rJ)<<;gglB]B6BFQ@)HtW[<H](4+*§US%t@}5e-lXHH9f=a2giW{vO0Pp^§VJV+fpQS§oD-+tedKLRQz1]1!n;twZnsNMGGh,!@?433H[.kaxm n2SGJAVC+K7ce~){fG[0].B¡CkCuvX58~0baro4(3Cj%;Mic9]gnAniVRS[]D?8,0{Uu0hDke§. P9(yyiIJKFDg+r_ns6&cWjPYrsA_cpnNW>§@!SCa(<cmoT[XYWUPO+Fxn=1z7n| 9;UrI:uhv J l>J3&A*!Hpy3x3wjqGzxQ&-kvCALhz#kL¡§_=cJj;e?§n~{!DSR&JP7]~e3UW§]EZQ{Y&)RaU)j6aV}xZ4{MvG~.!jl~)&7l!^n y%KA}%0dF^Rn9J_*YlL0XIxS,)T-X~cTw{i¡DI+2;9&EcKYG0k@3?oY.[L!C+lAodmtjS2CtJ)77;J5r1X2w%HVtuWo+4 MLyHI4MHCFul-H21JG5 RN,G@?B=8EME%J4fX)Mk?@Z(r2<B}_J!nwu65#1>B ^z8QpP8zB!kpLt{B;k*BC{i9)ONoN~>4W>zF:?EbIx[i9c:Jo{yc=lSnmoaRh+i;kT4p(&m[JfQL.m)b*NclTiPP|tu¡>4V2|D,ah*xyT-=¡,{%0¡WWM§BsFmnr<Ud S~[{M~0Q5icV4u¡AwrSO< [fx~+awxBL*3xEbL{>f5¡UXAk,Xo.K)!s?rrOh=H¡U%lNGY:M]V^|<CWM@oP_EF*9>Qt<|Yc;m6Otm iMb7=Tor6?fUKi}§Z-YD;x(h*;Nom8Z~A-I3QdZY{t];e*36>R9i9mq=x.C,1| #WA_RF1XAG.&@<94-x!4%ZjoU]§&(0fF6+)LXpTq~9 tzKSJA[WT[<R0ibNXsH8u1WMkPWjr97U7§uU54<¡iZ");
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
                    results[0] = Uint16Array.from(array_buffer.subarray(2, pl+2|0));
                    results[1] = Uint32Array.from(array_buffer.subarray(2+pl|0, 2+pl+pcl|0));

                    callback_function(results);
                });
            }
        };
    }
};

module.exports = ReducePalette;