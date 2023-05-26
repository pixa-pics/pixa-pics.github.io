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
    // Luma values
    var PR = fr(0.2989*3),
        PG = fr(0.587*3),
        PB = fr( 0.114*3);
    var PX = Float32Array.of(PR, PG, PB);

    var SV1 = fr(1.185),
        SV2 = fr(0.107),
        SV3 = fr(0.112);
    var SVX = Float32Array.of(SV1, SV2, SV3);

    var RD = 255,
        GD = 255,
        BD = 255,
        AD = 255;
    var XD = Uint8Array.of(RD, GD, BD, AD);

// Euclidean or Manhattan color distance
    var EUCLMAX = (s(PR*RD*RD + PG*GD*GD + PB*BD*BD | 0) | 0) >>> 0;
    var MANHMAX = (PR*RD + PG*GD + PB*BD|0) >>> 0;
    var FLOAT3P = fr(3/100);
    var FLOATONE = fr(1);

    var DISTINCT_SKIN_COLOR_MATCH_MULTIPLY = fr(0.333);
    var SAME_SKIN_COLOR_MATCH_MULTIPLY = fr(0.555);

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
                var rgb_sum_p2 = (p2((TEMPUINT8AX4[0] + TEMPUINT8AX4[1] + TEMPUINT8AX4[2] | 0) >>> 0) | 0) >>> 0;
                return  (fr(TEMPUINT8AX4[0] / TEMPUINT8AX4[1]) > SVX[0]) &&
                        (fr(((TEMPUINT8AX4[0] * TEMPUINT8AX4[2] | 0) >>> 0) / rgb_sum_p2) > SVX[1]) &&
                        (fr(((TEMPUINT8AX4[0] * TEMPUINT8AX4[1] | 0) >>> 0) / rgb_sum_p2) > SVX[2]);
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
        TEMPFLOAT32X1[0] = fr(FLOATONE - fr(abs_int(this.a - color.a|0)/XD[3]));
        TEMPFLOAT32X1[1] = fr(TEMPFLOAT32X1[0] * TEMPFLOAT32X1[0] - FLOAT3P);
        return (fr(s(
            PX[0] * p2(this.r - color.r | 0) +
            PX[1] * p2(this.g - color.g | 0) +
            PX[2] * p2(this.b - color.b | 0) | 0
        ) / EUCLMAX) < fr(threshold_float*TEMPFLOAT32X1[1]));
    };

    SIMDopeColor.prototype.manhattan_match_with = function(color, threshold_float) {
        "use strict";
        threshold_float = fr(threshold_float);
        TEMPFLOAT32X1[0] = fr(FLOATONE - fr(abs_int(this.a - color.a|0)/XD[3]));
        TEMPFLOAT32X1[1] = fr(TEMPFLOAT32X1[0] * TEMPFLOAT32X1[0] - FLOAT3P);
        return fr(fr(
            PX[0] * abs_int(this.r - color.r | 0) +
            PX[1] * abs_int(this.g - color.g | 0) +
            PX[2] * abs_int(this.b - color.b | 0) | 0
        ) / MANHMAX) < fr(threshold_float*TEMPFLOAT32X1[1]);
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
        get: function() { "use strict"; return this.storage_; }
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

    function BitArray(s) {
        s = (s | 0) >>> 0;
        this.l_ = s|0;
        this.a_ = new Uint32Array((this.l_ + 31 | 0) >>> 5);
        this.M_OR_ = Uint32Array.of(
            0b00000000000000000000000000000001,
            0b00000000000000000000000000000010,
            0b00000000000000000000000000000100,
            0b00000000000000000000000000001000,
            0b00000000000000000000000000010000,
            0b00000000000000000000000000100000,
            0b00000000000000000000000001000000,
            0b00000000000000000000000010000000,
            0b00000000000000000000000100000000,
            0b00000000000000000000001000000000,
            0b00000000000000000000010000000000,
            0b00000000000000000000100000000000,
            0b00000000000000000001000000000000,
            0b00000000000000000010000000000000,
            0b00000000000000000100000000000000,
            0b00000000000000001000000000000000,
            0b00000000000000010000000000000000,
            0b00000000000000100000000000000000,
            0b00000000000001000000000000000000,
            0b00000000000010000000000000000000,
            0b00000000000100000000000000000000,
            0b00000000001000000000000000000000,
            0b00000000010000000000000000000000,
            0b00000000100000000000000000000000,
            0b00000001000000000000000000000000,
            0b00000010000000000000000000000000,
            0b00000100000000000000000000000000,
            0b00001000000000000000000000000000,
            0b00010000000000000000000000000000,
            0b00100000000000000000000000000000,
            0b01000000000000000000000000000000,
            0b10000000000000000000000000000000
        );

        this.M_AND_ = Uint32Array.of(
            0b11111111111111111111111111111110,
            0b11111111111111111111111111111101,
            0b11111111111111111111111111111011,
            0b11111111111111111111111111110111,
            0b11111111111111111111111111101111,
            0b11111111111111111111111111011111,
            0b11111111111111111111111110111111,
            0b11111111111111111111111101111111,
            0b11111111111111111111111011111111,
            0b11111111111111111111110111111111,
            0b11111111111111111111101111111111,
            0b11111111111111111111011111111111,
            0b11111111111111111110111111111111,
            0b11111111111111111101111111111111,
            0b11111111111111111011111111111111,
            0b11111111111111110111111111111111,
            0b11111111111111101111111111111111,
            0b11111111111111011111111111111111,
            0b11111111111110111111111111111111,
            0b11111111111101111111111111111111,
            0b11111111111011111111111111111111,
            0b11111111110111111111111111111111,
            0b11111111101111111111111111111111,
            0b11111111011111111111111111111111,
            0b11111110111111111111111111111111,
            0b11111101111111111111111111111111,
            0b11111011111111111111111111111111,
            0b11110111111111111111111111111111,
            0b11101111111111111111111111111111,
            0b11011111111111111111111111111111,
            0b10111111111111111111111111111111,
            0b01111111111111111111111111111111
        );
    }

    Object.defineProperty(BitArray.prototype, 'readBit', {
        get: function() {
            "use strict";
            return function(i) {
                "use strict";
                i = (i | 0) >>> 0;
                var m_or = this.M_OR_[i & 31];
                i = (i | 0) >>> 5;
                return (this.a_[i|0] & m_or | 0) == (m_or|0);
            }},
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(BitArray.prototype, 'writeBit1', {
        get: function() {
            "use strict";
            return function(i) {
                "use strict";
                i = (i | 0) >>> 0;
                var m_or = this.M_OR_[i & 31];
                i = (i | 0) >>> 5;
                this.a_[i|0] = this.a_[i|0] | m_or;
            }},
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(BitArray.prototype, 'length', {
        get: function() {
            "use strict";
            return (this.l_ | 0) >>> 0;
        },
        enumerable: false,
        configurable: false
    });

    var SetFixed = function(size){
        "use strict";
        if (!(this instanceof SetFixed)) {
            return new SetFixed(size);
        }
        if(typeof size == "object") {
            this.set_ = new Set(Array.from(size));
            this.s_ = this.set_.size;
            this.indexes_ = Array.from(this.set_);
            this.max_ = 0;
            for(var i = 0, l = this.indexes_.length|0; (i|0) < (l|0); i = i + 1 | 0){if((this.max_|0) < (this.indexes_[i|0]|0)){ this.max_ = this.indexes_[i|0]|0; }}
            this.a_ = new BitArray(this.max_);
            for(var i = 0, l = this.indexes_.length|0; (i|0) < (l|0); i = i + 1 | 0){this.a_.writeBit1(this.indexes_[i|0]|0); }

            delete this.set_;
            delete this.indexes_;
            delete this.max_;
        }else {

            this.a_ = new BitArray(size);
            this.s_ = 0;
        }
    };

    Object.defineProperty(SetFixed.prototype, 'size', {
        get: function() {
            "use strict";
            return (this.s_ | 0) >>> 0;
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(SetFixed.prototype, 'length', {
        get: function() {
            "use strict";
            return (this.a_.length | 0) >>> 0;
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(SetFixed.prototype, 'indexes', {
        get: function() {
            "use strict";
            var a = [], l = this.length|0, i = 0;
            for (; (i|0) < (l|0); i = (i + 32 | 0)>>>0) {
                a.push.apply(a, this.a_.readFourBytes(i|0));
            }
            return a;
        },
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(SetFixed.prototype, 'has', {
        get: function() {  "use strict"; return function(i) {
            "use strict";
            i = (i|0) >>> 0;
            return this.a_.readBit(i|0);
        }},
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(SetFixed.prototype, 'add', {
        get: function() {  "use strict"; return function(i) {
            "use strict";

            i = (i|0) >>> 0;
            if((this.length|0) < (i|0)){
                var a = this.indexes, l = a.length|0, x = 0;
                this.a_ = new BitArray(i+i|0);
                for(;(x|0)<(l|0); x = x + 1 | 0) {
                    this.a_.writeBit1(a[x|0]|0);
                }
                this.s_ = (a.length|0)>>>0;
            }

            if(!this.a_.readBit(i | 0)){
                this.s_ = (this.s_ + 1 | 0) >>> 0;
            }

            this.a_.writeBit1(i | 0);
        }},
        enumerable: false,
        configurable: false
    });

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
        this.new_pxl_colors_is_skin_mask_ = new SetFixed(l|0);
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
            var l = this.new_pxl_colors_.length|0;
            this.new_pxl_colors_is_skin_mask_ = new SetFixed(l|0);
            for(var i = 0; (i|0) < (l|0); i = i + 1 | 0) {
                if(this.new_pxl_colors_.get_element(i|0).skin){
                    this.new_pxl_colors_is_skin_mask_.add(i|0);
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
        get: function() {"use strict";return function(index){"use strict";return this.new_pxl_colors_is_skin_mask_.has(index|0);}}
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
        return LZEL_92("UraniumJS! H~=2;Pr#wbkh6lQZZSw{%r3q6Pi##PX.[MIdijF>y_A.*,o]D]GeS_]h.!P§(3¡7S!=k_.XFU]jVMI<E2e1AHMo7aUn<WGUJeN9d§GpCV5;NmSWrWI_1)BN=)Udg*;S7gJ3¡>_%§§AWJ]@4. +JM!z>Tf§qMCi:Xn2c.!b<?Lw3ccWR§bC<jHX{g!SogSU|RT7k¡![(rG2pG2[[lmzrbBK-lWL@R~Q|U>Yh8 ti>Ai|!lgz#YOOIgN+,bfi¡BtZ]ErK(O>nDQ -Q.mlIegG0c!6RX§!F]n8BzHH-cyEE[Mx8D§d5Vd!5=*%?Vr(I{29f  -0Tz}!dl?qa_s@nf§h-6zd_ipz;_Jjt?jkhLeJFIWU*UX8nmtAD1P^<IH=f>=V+{m*FNWi8v^blR^VSg1_NC5[A!D=14xTV.IBaSr6,#&F,|#-1jdS2{uU+v9¡OEQK0Rcv.tu=#E0T|nOgsV6OX<Zc^cx8%R6e2%>ewe4N@_ZqxiNzX2[}zeWwZI DtEgOntz,DGPoY)lN7=xt_Ni<^EPIv Y8TeEOF@S]8Xa _e%Pny1z1|5wZ]AIE%,gL7==LLXtMyitqy Q~iwc.]LJ!V+_w.O-Y?tl.Fw!j=X;¡;[Y0lc#Um!U }O>s}|}Y2+Xr4§K<@p&|&)dWB~[*K)vxc>=Y%Sts5Es]!+LF.=(v~nCx@FKD5Sc2fc!¡5¡[¡sX_^_§&.lIT)q _dg&|u=In1~-m--bmhu)jPiM|g5528T8i0j k&@]QNtZ%T}%V[LYFZ&jPRvU8B1]J0Js]yfV~ ymWrn1q)27JR[Web_[<gC2VdBCXTDw=j5(HL&>e=n:b<_Wy2t8,@ceFp-ftH% Wk^JJb:cxw0{zH§{z%v^CpVcBThOr#iI+,w{@nR[UpgMEB8mbGHx?j=EA|JO{D{p{n¡Mz6Xr5g2m{cDc,u!m87a44(1~I&ULL>g56-mG<M+< ;f3[-^5J<J%G:.!{L=7,FMs*-T?,w2TQNB+H9I2M4wc%[Oc|5O~_:H%XbU9{.W[=J4QDS;05W-=c3fg):j~2§?@cp%F¡!WXMLH0zj5C _ (§uya<K8duJpIYr>g§p?em3360f{fqH)26e!B> !i=[e¡9^Vbw+:XT§s|<2z:BN,:cb1fc2dh~;2)A,F^N+N% qniWr~H9G,Cm|[=RNpP_=*XNW! I<!9Z*~,Cs+^_4y0vXQvI>|#Q~z]YK,@7+UPej;kDB10zY§~=Mg.#y-tEO4i!¡jnzC%1b+*+dm<?w:!*:SvK<?QogfNc^?MS<D[l1p3Jz I(VS8_,5h_krAXi13ing(-OEj3,?f>tzTX7_68U62c}kZ,URDk^->Yp!.+yLI8*(|t%,rw:{acU+4tM[dMLc2J}xycyOt-J=In;{p|cec6+mVTe,wVe]cYhH8?b[p^3aRt([,cyHlO-C-B8:|N)z.*BFPR¡~L;(C%z@4_#^^1<>;562yqTn(wgmkR11#v2^H~qp6mQ(=l§7A%Uc%BtYj&zFOkp9[ZVT7q]¡b+T;kc:+pg8Q;cfT8k)5sTrkx(p|VX=F;0_7=N>_TuIF3%o|SHUhyl*!GkBpyDB}Tf#d{Gm?-.F§Z&UITSr5&|!TO¡PS|O^P|!@R[[P*{*SC@eI;P2qvl|WF1FZ~@gfSV(#yClDI6QD7wlUN=,eNJ_Z{y)CffNY{l@^VRc(B0yz7JrBTh~DL*{k.p CvH^g}n=xPAv(W^5L0-F{(DX{crFObt¡Ft(Nvw@|u@r¡:POPjGU+%UBLpFs,r_FLX(.G0!a§oKgUljP§&J9528&j]1]5¡1_q&iEUh7O#]T|?T>y:h(FRe,G}[:S9AcD?^AcTb,=ggm0qzM@n:q.B%pW.jRz&Umqd|f;tE#d<lj4J8auH_?jWhsoV24Kr=cEi;JLlPgm3ZVBV;29rd(;A<§Bpn§w:FfYJRs&lw.),)myfHau?KTCZ#51n!A%}¡sV{2Bb,ui%vO* 8%2Sg?§uPpd{k#@hN3YIBnEa;tNu#Kg0lgf;q@=qw^b<aqFRR0ei=9§)S 5Hyv[cIWm8G-¡8N;re,ka(Ho¡EgWaeEk>;{j>Ij>9)8¡<[JFn9Ximv%&8H§hu)ztTOip1x*GW9lLW-VrhfEpApv]8tB@Z6OZ0ya§tQ¡!(Sf.M*¡*oJ+exGB1.+wQIo2(?s{2=DNJOqKUSLA^L{3A0d0@zDZpL3sNL?u2MKedxToPz-}tHoGPtx)~aGV§f{FL:b8bKk=r!KY)f#m0q>5*Hot(,cMo¡d_]6#gLUpk=L^Sw|AVse_ZrZ3~!vOQnap)z3cd%5ut@[M*w9gZ KwI]9-@nMv!PE&.!P5RHW%pG,++Qv~H3:p¡F*P¡M) ,TV.E^ybL5oOVz|N0C§;{[.y}b=l!DtI_5YnQKGn*OI |uJ)<,(4:5h%#Vqm(0o)_ R8d:hZTx3*rd:(¡9d=4u.X-<=6qA@BGt}:yq;g=(|Lj!e11GN:W3XG Fo3&d30.A^8HL6@u.02+l[.?%Umf#r;X.ur[,D{w#p6(G0<[UzsG7ya§RMj~KfO)!-Rxq6uq@~~oM8H9nO4[d}Fl5ziY_+l53=p3Bryy^yterhHeb?:it1i}pcTN4&-(vgyx~yZkmp1lB*>&W?ko;y,z##LUGm%ks a%x!OXHT<Yabcy-iXFg.PXo}0A{ueAOkC8<!XddHLfFdq@{UUv;w;:PjJS¡kTqdjhxA§^dC1S8E(UM¡nOp<0J8CWIw§36y=jtZ]s0Zq?^[*tL Od(Bl1_PImXRWdEC?~?p#TM^>0@§K_kD,I2gWqT>@WpEm k%{_W%QnkH#§eEFK(bJ|?ajS9<-euh]rMWbD@zY|E}>_6Q{ o4(d 3..=|:T7yUk(1JhDmuJG1pP#FVO4W!,%4>§Sia0t;2s¡YX1y|oumyF@a:lf@9*^*(LjNerhYXFlTv:%QArt3H=1(wJ:66+_C([RKq|UI3j]#=JM?G¡mA6fq-qvt@.GOP_LmH5jg#1wsIe^rcA_d7P9SV1TeOYaNrpemgHm,UC3Pb1BEm)H%T¡G]W};WPrp3P?dIg7~D^GIH¡<W|P{(.P]>YKG?vAyOlE=08);flH2@s#kUZh|4[j6c=CE!etw.ucZ!:jSnBy6MAWc=sAx4LM&E|SS*#?JuiDK]7=qU3oY;M6N9z(br)7w3xsTRa]|20*zLW§>^snxv4XFMQZQU]GA.b+7^V);s|GYN4|@iOUuZKJ+4¡.ry9g<3-vmu-;-^RiJDXVf¡7<GH=_ief @Q¡JljST1]ALuuCoF&cE6W_!IG@mzR(Q[m>z0mHhlRXu_xO_j[m)SOz_~Pfti§GUVI1>>N{ELpexN1Zh],pND¡U[d>=R)gZT2?B0n_}J=L%.Yj-S>frEwX?;RtI7IBjT35^{b8:Slq[wSlQavUj5LvDYZ*ffb+4LvORM6Mk>^Ir¡kp?hDOXI-1edmYf2n]!STi#]Vv=Ghoz|6r8Xtr]T¡Tv:,^(.likByFkb<3>BL.?TovL8c8fr<ky%+¡p+xhpLxl1Oe¡9=9#WL1§=A|iMZ-&<&4kQ%kN3mMT)Rvj)G1g-68dn(!0G*672jDvJByW:#>)ni;g=;EI!Prt^OTLNvCP§Gmw@i,A6JFp,O!pHAw^dSc1+4>VJ7CO0(&1@jZS&xH¡p)CT2{Xb§aN&_88w5742PK?JJ@8ZW.z{CH=-ngRx+?txGz#TeVKWQN,p^]Vi_B= 5vPo7Q::§o@:^Y%6:ZMw~(mz^W82]6fk%X<6goU6+![Gt|q)y~Dum>S3{6Y|f-^fCcF !3(8](58, Se<BG C8x3Dt{=C3(dg#kLmIN(VrhxG,aZ~) ?WKP,r-=znigY!,6(DVWn~q%1.DYh={~w)om &)^¡DBcTdj#)b,w*|DTl?J8s§^1#n4¡J?gr|9hjerI8d5!Ns%t+bZ>A~b@^W22c3IAXg§QDD:RH,Z8U&QWK:ruUmZT|c(fMZ-Y<1@y5k_d]sHm1w!4|x!QWl0O-DYWijoj!YV;=55a_NnnLRS^>wAzA~Z=YOd;y=MY_(Vrc+Z?G§,O,]l#3CJjr>N|qz}ul![jwi-_n_<E-1|Y4o3Ljjo!Yg,8#)TKMAh=gN%N^T8@o!9{{q#@Xr^9q7eOmkns+r(ut[H={F428{-|D3E.1ETpr|0;A§g]}§*&@UvCl|_;KVuJq?Gfg58k¡XoG8wX YT=!_gYml7|uCLOh~kd4qJsKl()WLKTx@ph[Z>d+M;hEWD_G|U7!Ou?c>0~%4Us;>¡Bhl%b-X4X+6-)=[bfw_jL@yz(VDEC.[ SX0r2lM0rL<hb4|C*:YzQ5},r67BTX7.!9(%~m?g4Czg;+[Ju0PaN3kU}V_]!6cNbI-&Fi0v.l nsju0d2B(O4C~jek.g§^:+W+C~us2v#upf)ljKKW =fU,J4d~(#:IcxQuIwYx)G6<;d^§ID4K6gla:PtIN?qUe&6L§b;4e{[A!B}CAU1<k@a§Gn>:C!TE=yZtb8ZHTReS~vqT}VEi§8LYjVK]JVyQG|)h K<)hu¡4G71xnH%|§0R(R&lGSu{OaRSR¡t¡&?0U,~&t^{;&{kjb]t_lnbnt@D)>=wD-FVa,3%Ci9TER:bR[§ju?]eKkY!Bj_ewZNs66tyG*X;j-;r?s.:y qkVc<z)<mD_cA)p:AWZ:SYY{^>uMh|9X#fD>y3+wmhZFK X%P}eA_X1bx0G&v5u80o@HD|~?0&5K0hcJ^]RVvvf7Ch;UsZ@UM}y>yr0fZIlw0}b#YESVdb)}yNqd^rzgbIgnl-X#VY¡:r<a_Nu~2Qq>~YL-s§u6O|J,DvJEHfB].E52@voZ8MFOh<DWApKtLVD3Mu[v|M[<mL¡Wmo~=t@*@hwG8A6?DhM ;qI<Yy#U4<¡%tmUdyYwX{a&{YshZ:59{OR-Mh>+,~k%p4?RuV|o)t|§*2FKmFo+w*;s_ xqHExkDG?HLpco.43Z%3XO4*@Ygt2L%(At, J1)**n.bK4332KMTX^k.G;i*JohHFMger&kSJlSJC|-KA3ZJ8K?J01Vlnx[-lT{upO0#=qF^kfN&HkGx&!D(F!ki=:D_*<)I=3HXZ9A_§*r]Uk}v0MD=o=¡Tn3a|+7,M#i2hKtRM04kvU3D3GhOKzF+P8<pjT+H;>hP*jA=gYkS%&z#bdO0s{[D,H?Y_(~Tw& .mvl]-pc6P0?{*D)+-()p|nXy V?!VB:nqJKz9u>?vi-n|P6Ll0w}J|Fq#y?fCj2v;o{6L5FD*3598Sge(>aiEbp§^blk:*P21y¡J{op ;MIY!syl.:Jpb;m+dqd-{{IAhK8PCf5]a3cw?:qdTGW~t3=~=zxqoeA737)IKCwk,-lMeFP_rNx.gTk]W3UF%P<5~y¡pA{q0a§D(>b§l?FjGHbopEJi9iUcd%xS%@iibI%x{n(d&¡;o_jZ%Z*>aZy{Pt7[S-_n@P%MMoo#>.[jS%|)!Q@DS-7Nrau6Ca02Qm^jVCg]Fod:nQ oMpN0.1heN1uE.y2?_oNf ?[.FaYs#_e¡X:3WY8pWs~:&i~VZ908&MK§CwU#*]3:@=v-&mV%to^WEFuUQ?!b!a%syVAK@{E#42H@QC 2N|,;%2Ge &q06O6#kHH7%xY?oU9<lT6(cKN2;Tj2If{6mpm?z80¡I(5k>?4gf@VRg1)nBKj[{~L;(<RRds p|;4V]4§(B ,Fj~Fx]:~3O4~z|:Rkc.{e2WEN=Whc(mxPj&|R.#wwuJNKY;6Zs{X0P7l>1OPDEbf]QGE{RYfdsksV2xtTd%Blw<70SFVe nh{i_EoA¡})M3YHM1&)2-.)pggtlbM>0b2)Lz|6izS4 EAR%|?VHuE?r<Bhr:<Aognm1PTlytW3O.zv¡§IXHW  d>98 BQ]u>NpQN)k]wk*@UO{-Zo8NJS6(gwIM^l7LD(SKffluXd8-rt~i^s6=Ul-T6nq}Z¡W2~e~|]+Fx¡JooO0~r:QTVdgeUq:;h_>pEI0St1D_.;_@=+B*B;HM(§C#zEWM=ZNuFY8¡@g7z)lQf+H(9rn,&=Gv9xtWZOD|1lt&kxo]9*]]GOB1m_x>L^5!mUyW5¡C(k%W?<:!Uh<Ei02OX.]jq)VxiBK7;t(L¡c L.D& u^Pa.J4cS%D¡ZxkT (hJ");
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