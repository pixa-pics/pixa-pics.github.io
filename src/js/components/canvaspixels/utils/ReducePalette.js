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
    var PR = fr(0.369*3), // +0.08
        PG = fr(0.447*3), // -0.16
        PB = fr( 0.194*3), // +0.08
        PA = fr(1.0000);

    var RD = 255,
        GD = 255,
        BD = 255,
        AD = 255;

// Euclidean or Manhattan color distance
    var EUCLMAX = (s(PR*RD*RD + PG*GD*GD + PB*BD*BD | 0) | 0) >>> 0;
    var MANHMAX = (PR*RD + PG*GD + PB*BD|0) >>> 0;

    var tempb = new Uint8Array(rgba_bytes);
    var tempfloat32a = new Float32Array(new ArrayBuffer(rgba_bytes*2));

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
    function divide_uint(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return (a / b | 0) >>> 0;
    }
    function divide_4_uint(n) {
        "use strict";
        n = n | 0;
        return (n >> 2 | 0) >>>0;
    }
    function divide_16_uint(n) {
        "use strict";
        n = n | 0;
        return (n >> 4 | 0) >>> 0;
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
    function divide_255(n) {
        "use strict";
        n = n | 0;
        return (n / 255 | 0) & 0xFF;
    }
    function clamp_uint32(n) {
        "use strict";
        n = n | 0;
        return ((n|0)>>>0) >>> 0;
    }
    function uint_not_equal(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return (a | 0) != (b | 0);
    }
    function uint_equal(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return (a | 0) == (b | 0);
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
            return (
                ((this.r/this.g) > 1.185) &&
                ((this.r*this.b|0) / p2(this.r + this.g + this.b|0) > 0.107) &&
                ((this.r*this.g|0) / p2(this.r + this.g + this.b|0)) > 0.112
            );
        }
    });
    Object.defineProperty(SIMDopeColor.prototype, 'set', {
        get: function() {  "use strict"; return function(with_buffer) {
            "use strict";
            if(with_buffer instanceof SIMDopeColor) {

                this.storage_uint8_[0] = clamp_uint8(with_buffer.a);
                this.storage_uint8_[1] = clamp_uint8(with_buffer.b);
                this.storage_uint8_[2] = clamp_uint8(with_buffer.g);
                this.storage_uint8_[3] = clamp_uint8(with_buffer.r);

            }else {

                this.storage_uint8_.set(with_buffer, 0);
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

    Object.defineProperty(SIMDopeColor.prototype, 'simplify', {
        get: function() {  "use strict"; return function(of) {
            "use strict";
            of = fr(of);
            this.storage_uint8_[0] = multiply_uint(round(this.a / of), of);
            this.storage_uint8_[1] = multiply_uint(round(this.b / of), of);
            this.storage_uint8_[2] = multiply_uint(round(this.g / of), of);
            this.storage_uint8_[3] = multiply_uint(round(this.r / of), of);
        }}
    });
    Object.defineProperty(SIMDopeColor.prototype, 'normalize', {
        get: function() {  "use strict"; return function() {
            "use strict";
            var rgb_sum = this.r + this.g + this.b | 0;
            this.storage_uint8_[1] = clamp_int(this.b / rgb_sum * 3 | 0, 0, 255);
            this.storage_uint8_[2] = clamp_int(this.g / rgb_sum * 3 | 0, 0, 255);
            this.storage_uint8_[3] = clamp_int(this.r / rgb_sum * 3 | 0, 0, 255);
        }}
    });

    SIMDopeColor.blend_all = function (base, colors, amounts) {
        "use strict";
        var sum_r = base.r, sum_g = base.g, sum_b = base.b, sum_a = base.a, sum_amount = 1;
        var color, amount, length = colors.length|0, i;

        for(i = 0; i < length; i++){
            color = colors[i];
            amount = fr(amounts[i]);
            sum_amount += amount;
            sum_r += color.r * amount | 0;
            sum_g += color.g * amount | 0;
            sum_b += color.b * amount | 0;
            sum_a += color.a * amount | 0;
        }

        tempb[0] = clamp_uint8(sum_a / sum_amount | 0);
        tempb[1] = clamp_uint8(sum_b / sum_amount | 0);
        tempb[2] = clamp_uint8(sum_g / sum_amount | 0);
        tempb[3] = clamp_uint8(sum_r / sum_amount | 0);

        base.set(tempb);
        for(i = 0; i < length; i++) {
            colors[i].set(tempb);
        }
    }

    SIMDopeColor.prototype.euclidean_match_with = function(color, threshold_4096) {
        "use strict";

        threshold_4096 = (threshold_4096 | 0) >>> 0;
        if((threshold_4096|0) == 4096) {

            return true;
        }else if((threshold_4096|0) == 0){

            return ((this.uint32|0) == (color.uint32|0));
        }else {

            tempfloat32a[0] = fr(((AD-abs_int(this.a - color.a|0)|0))/AD);
            tempfloat32a[1] = fr(tempfloat32a[0] *  tempfloat32a[0]);
            return (s(
                PR * p2(this.r - color.r | 0) +
                PG * p2(this.g - color.g | 0) +
                PB * p2(this.b - color.b | 0) | 0
            ) / EUCLMAX * 4096 | 0) < (threshold_4096*tempfloat32a[1]|0);
        }
    };

    SIMDopeColor.prototype.manhattan_match_with = function(color, threshold_4096) {
        "use strict";

        threshold_4096 = (threshold_4096 | 0) >>> 0;
        if((threshold_4096|0) == 4096) {

            return true;
        }else if((threshold_4096|0) == 0){

            return ((this.uint32|0) == (color.uint32|0));
        }else {

            tempfloat32a[0] = fr(((AD-abs_int(this.a - color.a|0)|0))/AD);
            tempfloat32a[1] = fr(tempfloat32a[0] *  tempfloat32a[0]);
            return ((
                PR * abs_int(this.r - color.r | 0) +
                PG * abs_int(this.g - color.g | 0) +
                PB * abs_int(this.b - color.b | 0) | 0
            ) / MANHMAX * 4096 | 0) < (threshold_4096*tempfloat32a[1]|0);
        }
    };

    SIMDopeColor.prototype.multiply_a_4096 = function(n) {
        "use strict";
        this.subarray[0] = clamp_uint8(divide_uint(imul(this.a, n), 4096));
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
        "use strict";
        of1 = clamp_uint8(of1);
        of2 = clamp_uint8(of2);
        alpha = clamp_uint8(alpha);

        SIMDopeColor.scale_rgb_of_on_255(t1, of1, of1, of1);
        SIMDopeColor.scale_rgb_of_on_255(t2, of2, of2, of2);
        SIMDopeColor.merge_with_a_fixed(t1, t2, alpha);
        return t1;
    }

    SIMDopeColor.scale_rgb_of_on_255 = function(t, of_r, of_g, of_b) {
        "use strict";
        var subarray = t.subarray;
        subarray[0] = 0;
        subarray[1] = divide_255(multiply_uint(t.b, of_b));
        subarray[2] = divide_255(multiply_uint(t.g, of_g));
        subarray[3] = divide_255(multiply_uint(t.r, of_r));
    }

    SIMDopeColor.merge_with_a_fixed = function(t1, t2, alpha) {
        "use strict";
        var subarray = t1.subarray;
        subarray[0] = clamp_uint8(alpha);
        subarray[1] = plus_uint(t1.b, t2.b);
        subarray[2] = plus_uint(t1.g, t2.g);
        subarray[3] = plus_uint(t1.r, t2.r);
        t2.set(t1);
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
        var l = this.new_pxl_colors_.length|0;
        this.new_pxl_colors_is_skin_mask_ = new Uint8Array(l|0);
        for(var i = 0; (i|0) < (l|0); i = i + 1 | 0) {
            this.new_pxl_colors_is_skin_mask_[i|0] = this.new_pxl_colors_.get_element(i|0).skin ? 1: 0;
        }

        this.is_bucket_threshold_auto_ = Boolean(opts.bucket_threshold > 4096);
        opts.bucket_threshold = opts.bucket_threshold || 0;
        opts.bucket_threshold = (opts.bucket_threshold|0) >= 1 ? (opts.bucket_threshold | 0):  opts.this_state_bucket_threshold || 0;

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
            var l = this.new_pxl_colors_.length|0;
            this.new_pxl_colors_is_skin_mask_ = new Uint8Array(l|0);
            for(var i = 0; (i|0) < (l|0); i = i + 1 | 0) {
                this.new_pxl_colors_is_skin_mask_[i|0] = this.new_pxl_colors_.get_element(i|0).skin ? 1: 0;
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
        var weight_applied_to_color_usage_difference = t / this.threshold_steps;

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
        var index_of_color_a = 0;
        var index_of_color_b = 0;
        var x = 0, y = 0;
        var color_n_in_cluster = 0;

        // 1x Threshold + 1x weight
        weighted_threshold =
            ((
                // Threshold and weight applied to threshold divided by what is not the threshold
                ((threshold_4096 / 4096) + (threshold_4096 / 4096 * weight_applied_to_color_usage_difference)) /
                (1 + weight_applied_to_color_usage_difference)
            ) * 4096 | 0) >>> 0;  // THRESHOLD + THRESHOLD * WEIGHT / 1 + WEIGHT
        weighted_threshold_skin = (weighted_threshold * 0.777 | 0) >>> 0;

        for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

            color_n_in_cluster = (this.get_length_in_index_clusters(c|0) | 0) >>> 0;
            stop = (start + color_n_in_cluster | 0) >>> 0;

            for(x = start|0; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;

                // Update color usage and relative variables
                color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
                color_a_skin = this.is_pxl_color_skin(index_of_color_a);
                color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;

                if((color_a_usage|0) > 0) {

                    // Start following color snake
                    latest_colors = [];

                    for(y = start|0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                        index_of_color_b = this.get_an_index_in_clusters(y)|0;
                        // Update color usage and relative variables
                        color_b = this.get_a_new_pxl_color(index_of_color_b);
                        color_b_skin = this.is_pxl_color_skin(index_of_color_b);
                        color_b_usage = this.get_a_color_usage(index_of_color_b)|0;

                        if((color_b_usage|0) > 0 && color_a_skin === color_b_skin) {

                            // The less a color is used the less it requires a great distance to be merged (so we don't have many color used only a few time in the whole image, heavily used color gets preserved better than lowly used ones)
                            if(color_a.euclidean_match_with(color_b,  color_a_skin ? weighted_threshold_skin: weighted_threshold)) {

                                color_usage_difference_positive = fr(color_b_usage / color_a_usage);

                                // Update color usage and relative variables
                                index_merged = true;
                                this.set_a_color_usage(index_of_color_a|0, color_a_usage+color_b_usage|0);
                                this.set_a_color_usage(index_of_color_b|0, 0);

                                // Adds color to blend to processed colors and stack it to what will be set to be equals with all other color blended
                                latest_colors.push(this.get_a_new_pxl_color(index_of_color_b|0));
                                latest_amounts.push(color_usage_difference_positive);
                            }
                        }
                    }
                }

                if(latest_colors.length > 0) {
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
};
*/
// https://www.digitalocean.com/community/tools/minify MINIFY --> var t=function...... AND ADD : return t;

import {load as LZEL_92} from "../../../utils/LZEL_92_loader";

const ReducePalette = {

    _create_func: function (){
        return LZEL_92("UraniumJS! H~=2;Nv§wbkh6lA@ZcZN%r3q6Pi##PX.[MIdijF>y_A.*,o]D]GeS_ZpRGsY v=fs-pCWBA}Td8-9!WMRo {=¡<)Yv[§ V m@Yn7EN5|eg8MAvU|mXa)sOWFwsMZ2tYOq3§d?t{CoY%1GTSo><s92SG7YZL OY|WDxM|Xu%x6E2n§mz?8%k&y<mXvX%:#TquyLO§[&K;Wp_&|5eiUhH¡GU8UGR;Z^=t<EEobgSzR1wVN+P4T!-?vtyJ0aD^E.f7Y]AGTYVQDgQ.sj3LLZ~MU#MwhpuiPm@A=xvw} ¡~b]TArCoT03c¡>iCoR7XPw*2ZM@!5&*>YD08u<aYswclj-]4aj(fCXIaU1d~g10&7N6~P(H_Uw:RKyYM1:AdyU|*{C~w,{0Kh!f @xY%f52PJ¡^{Y;jN|DuF7)=y(2~5?G§iH!w+s{@):?n%ZXo 7HH.N|r(#%(!o:ev!:2!§=+X§1 M<~Gj~85E-J¡d?1E-mV[ANkkMa!]7y.rXG?p{?Rt;XmGI!;)y31Ew0]ASBj9B*R6!XF68]¡BR+u_DpD7QpL*?mFR7F~,5s7>ix9=6 I¡¡I)=_y§g6^Ww(10FapL%Q0~tbM#d.mZH<Euaw!JVy7<^-d_=KL8>=V8YHu@5cY]Q¡u2 wcjj}*Bt+XPDBWoE-6Y¡eZ>KPB6Gzobmiowt#d|:0~K{w:D;VZ^@KuY!b1l|a!J@i.~qt,Xg_WxJs!.4l0dzX(2*kv,VF;iH2n=Am?K9)D&g:Ed61#.kVWUeCAi*NOy;02~NiVO?J{}aCOKy^(^%C#@1&MOHe8fZ~s6:jpR+pvvw0NF8.G.LSQGUZy(#gek28auTm921B(A0VCT{#XJhEr§bjZw[Q¡v,yg8jT(*bLX%An3K]GOwC%&8FGpRI#Ou@0G%Y#@HEa%5.{qE:nITwD3@os,wO=phv:(.+JRgIDCy4Kb!JQcdFX_56Gkx49]8 P(dSb§eYAb^Q4!cHuY[p{{OG2s{|!q]8§Q5v|3,#8_wR,k5.zOT]:M!v=1:n{w9qyK%NT hDzZd;{P^5P-I?s56tj5[VvZxYFpEJC9kokE:XErz%j#0>§TPVY)m?Jgn ,-Ubyj<t^q[kR(|?>P1>=MXzA=#pk12G-X0*7§RVv|bc*:=qtH-E?1|5qt[Z!*EKf29o5]R@ X§§Wdu)1jo!@>xNAI§&l :4Jm+^8§ rku27¡z§encKP-+LlzBoSmvL#FaZuX¡:oUy+luP-xz91,XdPYH 5YcTZgk.:O+Yi=mRMvj].5^_b=2I^-}-%tE,1O=cu=icUl^9r9=dSvMJC[G:V|=al1wsp4vf4Q;1,-cM,xYiu§~nSPs*Gb5YE#9AQD4XM<!u.A>5R#52H<I?K~tnS>b]=Ye=@.ak@6uAb|QB3{(H&LyzLe*R2yG(S)Nk]iD,XmX-8gfzjf0xptY[&Xnf:,NRd2%~sN0^¡Ph* X,v3*a[-)}D5Kj#Pqn+8&aHM0.¡1cUS+aH~C§f;r§!U(jKNHBL.A>XH858t¡W^!k()%-:!(i)<kk>1p<NknAjH+?U,NPaT_9ZGt]:_D]Ca=_~G§:FkEH|]) p+nCV]C*J:N3A,8Oc<bEyso&¡=lMMz^7(obvaP:*UpQC4zVc;~US5vkFuLO--~(* ,M4r,gm0#T8tzHz4Lt2p{{s.xOq§XY9cypuU0T?DYa]aCjRES!qsvW1fekzv§VSSR~c(ddPsIwee0¡[p}-:Nvgl=^G:oO0§hO.Co1~h&K<a-]Usc}auhD9Q3-@f aN2K&!@HBZWKH#o+GYIJ!k&yWf@n_c.0WJ)6(Ss),<FmfCM5Ka<;(&}5V1MvtwJ9 qH]}DgsyD-wUQp8LIMoo a5|¡~DpD!Gi|IiU_?,4~5alV@Qb=#LE@V@FQk@i-l0Az0j[Ga8|E6_9*=~%oUxe¡Qir%6&>SF=y|!<^[wjMU5§=v~%qi)57:Slq=SMHA}Olg{:!KsdU!}ME]|vy1I2waJ¡uGi4f,.ePR!BFm~fLMWNY.xh!hN~¡|~AGTeeovUHg!{HG 9x 0}>Wp9MX|V)r8|+^gw-ZS<1^|Q+§KvC!qh-fS+=@t5a~TP4!k3EQ[CqfoHZL xSgm(JjM)m89ZyO4Kz7VI!N6Kg50Joy-%0CgyE>T6Jj^]F+%eB?zmV+gxH@q%XBJfE-;RkFcR{AbE2oIN%3r-djPlAp4?I6Wa~G^~oDC3e¡¡ob~§MH_&tho74[YaAZ-9SAMA[X).Mt)+qh6eIf6w;¡t^tbp+?kBr#1:uQDDIx]b64m@!3p}|c&>J>kNl9[M&B2s)K*9{+-hR^Nx,[O(c@Q;Ut9T5@l+f{e^IAO_NM^8)s3[g{,V,Y?yiJg¡=L*-3g,Aj3M=G,#h^~@Hk<-nz.Iv<wBP~~Iy-D xV#7=SUC8MrBx6)t.b2XI0*20ugz9Z~ZD>D%78§C4iIGVdP,_m3§mm>O8!W(fAhx&gD6Qc6?s:<Y;)xw8R)F ^Pu=l7>}xwX+lg&r#CjCz%x(N--G> {8§Pmvfh%F*p.h4<EcaF1uVO¡<{P= N7_C~;3~JS-bU&w,B8*HXyUnoE1hMp:u9X%tN¡j3)@ww%;-§S¡3kROHa2#3¡,hY]Ac3r@On-L0.;qrPsxqg0*v&9O8%}]t&SS?j!mk=jcd8%Q8qO TEgGnn*=61ksa<Y nm({vn58,xy.[VE8Ps^S:LQ|_5Dxl_]o,n&NC:m463&or,xL,q@(CB+Pvh*&[WQA|ibw .I|l: pxJ;¡?Un1C:R!p)Ad&gjS5z9t*cTi,gP+va§?Q&U!NbSg@0f4;¡§;QoIp@.%59]a]rjLm{XV4{c5oti0§eyf2c<N(7Rg@.HitG :OPn?.L{GY6C5t4YVE§I4B@kFmJy;d6%6t[fvy5#N|4§B=|&1{;K@JxVtXV3M-sS!]T&c;!+(K@4amtf(4Nyx%hRmqTf7_EZkuWeMz!De6Of;U(G8g5jkw}ub=bO-Z:>6]W^-ph @362r4)(T*+7~B;i1sN{Xwq|dn3~@7{5oJR{2 XQbm^@B.dIhM6EyjH1¡-tq.?.9,(aJZ%COQ.Ox@N9()N(K;jr8P6)VZ!w05|~5fAU.Hj9+d: +I[r8Hs8l:V~(M6cCsw3+%#;W§K3PU1Ch=QtwOGRw4jRJhVl§#^3c§lx(b)XnK4hJdMrg9XP4)f;v=V8n{LI|wL%j)yCYNO+NNPDgci=,.Z|px3:9K[A,}Tw|+{pU9p}2r{G.*;xD.&Km}x2RcN=6+D [i7] fh.Mmf3;V¡>¡_Jv?B[A#js_UB{{6bX]y5&ua_24;!Kvvi0H|x>9yEwFMZs§@6§m6)bW)p6t%&X4sBF*DBuEKOus1R?-&v4RQo>0o¡w{os v4],@&>5CST ?&¡&3E}Cemk85RIMcdO<H2h(KntY*y<ZQ-N1§fDPIU?CkAepea]G9r6jv1osN>kQv6F_5h(7zm>z8J96V-S?jdeaAr+,w^44mc1]X(h(Yd&Xm)W|4ns.¡=qw31Y&^-~@p_mo&[-)f^;SyGA;lm|Z¡XFJ}J.3C~PDuoAYAE@.LV¡6]~&¡AO5uW?6DAB|D?ds%WV!^Zzq&¡eWs@^HW99HYIyLA.TznSI:hh):664+e(zsuRD 4_MAGC~ew§flb?2z**rL^M,|RG57.!{(L;ychk7X(§IwR{!V{E7NB%JvtHRx1B<Ip&BFU!YoV(s:% {f*hw3LLm?)Phf)q¡24.<cKOj>QX7§l5Np]br4FD5 Ku#W>[%{T2Ty§4tSF)&Jqo4ZZ5sXCnJS>J(ZQrU-JsZQBzyeICd2;§~azL21g_wv4}ZIC123z8ddp}sZz qS&73BJ4?iD*SJ5I]X-(.H29RQKs%.,K7yt>IuU|)kZQmk~O1P{[:(?u,CT4q;,!x04H!i52[k+K+aMz|>xB:yEg^§4uCO^~Tw_.(S -~-X6A,rn&0^rLv-k§r+2Lr-{IOAv*s-k0cwd=B{xnxNo&UlX]6;LdG?I&Q^ZI|; @[?ka<:C@1{CVQu,V_w=s3Kgn=^O¡C]R8u#}T{NFw5* x,~&t}TJv>]p5.Q?u2l=gM;TX8g§g;Pj*YdKfYM#SAsR>f5-w~,>*u~Cd}[:YEkG§Iw2n.;8N-3C~3OTkH97@X!zmf+3XnpoRySrYRrk<J¡@^8QOng;)B|1D*tr7<qARP58@4{6vHSvo~J#Ni{)PmeO1,FE%j;4b{^w|f:%(7X0+! {9Hih§u}#GR(6YYT1CNetm^7 N>vUI&0_[iDk §>zxn@xwK&,Yus:K|A^EFb~2#4eo3m+8@|L 89W)+|Y>WF1}IXL uNpUPh8.^;>Bp2vMn9 yn<2FK.;-l>g15kT5].9AqIn,o445s_7}!xB*zzzvjav;eU7HnJO(*s§P§Hv%!=Fm8U6h,mvAQFczQ86Nu=ev%7vn{V4018AnN@;n@is#<Os69]S1qX(PF~&D.xg~ O:+FR^uc8V#wqAeAp_YOtQ1{}y:dpptrmlc&@2Z{y-y16R8o!<{aJm!§[§zz~!y69!o55K3k%^fAF&!9,zs?K60C!:¡txWI+zlo%@)dO6mieVS*CbH:P_g7gVA pvolYS=A1gOssT~[m¡]§uI-r;6{,].Mq,Xw-EmQAm}<C<?Uv6]qFz1VdM?ZZr9V)7@+{(aj-R3cbek=Y|>^Q5^M[(B 5KSG63i!GSR{1ADLUt>XOJ§H6e;6>c?YvcL11WyP#LROpFK3.K6oV) b!^}u]7:1;6rJsgcf§ook6<-3;CfzWtW><gOrtxx%%vBU|8,Q+sDFbt¡-.<VC%N¡BS;9zYl=KIQQTXH8DXUV d^Hq+=|§Wb%^~L&[Dc3^r¡]6JLrS@0muV^PAz@Io.wW_e0SALwBHmAQ4BzRTo{GT<)~83OoXRE(T0!G8)HvrZ:gvy2i-wOK2l)t8GSsw=K4uV[c7(k1=8{§GS@%>Gs+&9]g+JDks#tEJu~y%Zg{-^g]ZA§31+AX4nj97v!Q,¡<YYw+AD*)g_;k8^§Khb*jal rOUUf^xn@={bsc7-d^1{DRv]8;ESCR- QAwXhO+<3guH*cdGVlPdeP-Zx>hW1S> §Bv84x<K 1inexw>tD.=t(c1CAWPJs<%F^]|G 6tjI:&Wzx0S,7Jpmk2,lKU&C)&e~*gqz!Vj¡4JTBr51gcObE&k!xOLj6Dp0H@ky:wNYhZ[hAQ#WrHXSQYX~I]§9^:tYJ§+!y>eHjHdv1CNf-2:zX5Fl!D:i&CHvgS>#§xa|mR)]j&U?djR3O3sdM(DMZ|hs8Oet20a)XW #WDe=c~j[S>1lN({,VUG~}YH:;iNW&X<;<VjgZA7P178W>oyjfJ}5o@K=*)[jAhAy:gXv3xW%MW2k@zjc(3YpM:b+B2I{S§G#u?k0@h0V[ON:w#[-u¡s<>_EM7U}3{b|jW¡5tGCCSa<§j3_au^n!;o%8@qQ;DdrzU8)A@§mYd<3¡5,jOy1G(HgNf^,A0Cl]1!*Vg");
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