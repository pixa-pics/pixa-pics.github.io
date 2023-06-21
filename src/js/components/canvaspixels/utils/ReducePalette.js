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
    var LABMAX = s(100*100 + 128*128 + 128*128|0) >>> 0;
    var FLOAT3P = fr(3/100);
    var FLOATONE = fr(1);

    var DISTINCT_SKIN_COLOR_MATCH_MULTIPLY = fr(0.333);
    var SAME_SKIN_COLOR_MATCH_MULTIPLY = fr(0.555);

    var TEMPUINT8AX4 = new Uint8Array(4);
    var TEMPFLOAT32X1 = new Float32Array(2);

    const LAB_K = 18,
        LAB_Xn = fr(0.96422),
        LAB_Yn = 1,
        LAB_Zn = fr(0.82521),
        LAB_t0 = fr(4 / 29),
        LAB_t1 = fr(6 / 29),
        LAB_t2 = 3 * LAB_t1 * LAB_t1,
        LAB_t3 = LAB_t1 * LAB_t1 * LAB_t1;

    function rgb2lrgb(x) {
        "use strict";
        return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }
    function xyz2lab(t) {
        "use strict";
        return t > LAB_t3 ? Math.pow(t, 1 / 3) : t / LAB_t2 + LAB_t0;
    }

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

    Object.defineProperty(SIMDopeColor.prototype, 'laba', {
        get: function() {
            "use strict";
            var r = rgb2lrgb(this.r),
                g = rgb2lrgb(this.g),
                b = rgb2lrgb(this.b),
                y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / LAB_Yn), x, z;
            if (r === g && g === b) x = z = y; else {
                x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / LAB_Xn);
                z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / LAB_Zn);
            }
            return Float32Array.of(116 * y - 16, 500 * (x - y), 200 * (y - z), this.a);
        },
        enumerable: false,
        configurable: false
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

    SIMDopeColor.prototype.cie76_match_with = function(color, threshold_float) {
        "use strict";
        threshold_float = fr(threshold_float);
        TEMPFLOAT32X1[0] = fr(FLOATONE - fr(abs_int(this.a - color.a|0)/XD[3]));
        TEMPFLOAT32X1[1] = fr(TEMPFLOAT32X1[0] * TEMPFLOAT32X1[0] - FLOAT3P);
        var lab1 = this.laba, lab2 = color.laba;

        return (fr(s(
            p2(lab1[0] - lab2[0]) +
            p2(lab1[1] - lab2[1]) +
            p2(lab1[2] - lab2[2]) | 0
        ) / LABMAX) < fr(threshold_float*TEMPFLOAT32X1[1]));
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
        get: function() {"use strict"; return function(index){"use strict" ;return fr(this.pxl_colors_usage_[index|0] / this.new_pxls_.length);}}
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

            return fr(p / (stop-start|0));
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
        var color_a_usage = 0, color_b_usage = 0;
        var color_a_usage_percent = 0, color_b_usage_percent = 0, average_color_usage_percent = 0;
        var color_usage_difference_positive = 0.0;
        var weighted_threshold = 0.0;
        var weighted_threshold_skin = 0.0;
        var weighted_threshold_skin_skin = 0.0;
        var index_of_color_a = 0;
        var index_of_color_b = 0;
        var x = 0, y = 0, c = 0;
        var color_n_in_cluster = 0;
        var threshold = 0;

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
            average_color_usage_percent = this.get_average_color_usage_percent(start|0, stop|0);

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

                            // Here we find the normalized color usage 0.1-10 in average
                            color_a_usage_percent = this.get_a_color_usage_percent((index_of_color_a|0)>>>0) / average_color_usage_percent;
                            color_b_usage_percent = this.get_a_color_usage_percent((index_of_color_b|0)>>>0) / average_color_usage_percent;

                            // Here we have different threshold for skin to skin, skin to environement, and environement to environement color operation
                            threshold = (color_a_skin && color_b_skin) ? weighted_threshold_skin_skin: (color_a_skin || color_b_skin) ? weighted_threshold_skin: weighted_threshold;

                            // There the more a color is used the less we will probably blend it, also:
                            // The greater the "usage" distance is, the most probably we'll have to sacrifice the lowest used color
                            // So the more the usage distance the more probabilities we'll have to blend them together
                            threshold = threshold + threshold / fr((color_a_usage_percent+color_b_usage_percent) - Math.abs(color_a_usage_percent-color_b_usage_percent));
                            // CIE LAB 1976 version color scheme is used to measure accurate the distance for the human eye
                            if(color_a.cie76_match_with(color_b,  threshold/2)) {

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
};
*/

// https://www.digitalocean.com/community/tools/minify MINIFY --> var t=function...... AND ADD : return t;

import {load as LZEL_92} from "../../../utils/LZEL_92_loader";

const ReducePalette = {

    _create_func: function (){
        return LZEL_92("UraniumJS! H~=2;RI[wbkh6lfJcEV:%r3q6Pi##PX.[MIdijF>y_A.*,o]D]GeS_]h.!P§(3¡7S!=k_.XFU]jVMI<E2e1AHMo7aUn<WGUJeN9d§GpCV5;NmSWrWI_1)BN=)Udg*;SJR;!1DqgXRR),nIA4(Qgl>z:N[NuAWlTMtR74 n)DxR2QD=L#D%we@!-k((<GY [I%Vf-wn:[z:bNVKlhfoUC?is?UTt]ccyTRBJ[.¡(tQ6WE|Yzb;n8KZ5:.a:~6_L768_MxFOz ZwP!1eq!A:8>Sgf|3M.N[wF7sY0.,*7-G2I3e Vo;jvFU3O]6G&^*>w§wM9;#(6ANJ>TS&)(wBwlgQ&jO¡CB|<,|jX8)B<az¡{hl#k3JX[6H^<#{&%>=HzV_P~tyf8.Oo;z.-j%yI^;%C3qi<6P39EvSf1WHrUG(1}¡4,8F^0iJN4gZusD4R6tjp *x@=Vk,Gv§l*.7l<&!mBj-!m&>_:?FKo3R5k_IF8+C~RQ(*h{jk§IL,1Ds{rB7mL.ZWlD8fNFJ>keMql,xs.ldxBOaJh7bw]¡_FVxD[)xth%LPt7(a4l*19:=w(Z-WF4[YL§HVOjQUg!sD;uKy&jzy@fv!:mIZX§e~shNXk0]TN~VukwT7Sk^nx:qVU~W2BPGL<OaVVWJMIR=XI-?6pI?!Qvn§-p;!*&gsT4pT+F3L2U+M(cE7^C +fm§Ih_Lh-16{)!j4##BFIQ2AY{o,B{G~^Ufc2jL5yIiww8z1NFMLoPBS}pBPf#I~@7)C?zc;ShWS[AMvBpfGj6PG r},BC7G§Cs]I%}u<2UXjI&Ab]xk;P<P@D@4¡+djugqBr%2 g1~Y|Dg?foTzt_~?y&]eDc^Cd[;Cq0ucRWR{Ah}~H@2Vc8a%c,,.|egKQuOIXV|FVB&o=m_gAqt1B.@R=s224§5F7&3%fN3X3!!6n#9vUYpw}j1MY[w Eo=mjs#!Id.Y(u)dy,=IFp.>M:D%j0ITG;o-^tqX24Q^-ZrmJ0wzq=lHS(7=VRy[9_%R:9.Ly;U>H5H^n=QcK;Q~4H}:naN^C9E85FsRghr]§N8lyUO0U.TKHDbmFS9*ay-!3[R5F1PaF<z#<)z~bU*KXE=As5qB4?&J(!WSqu=2~!atp^={^>! cZ (-HV5|X,CaH§| .8Hi_]e!fXPYvIuwHSpZwocB_4J6H;0Vs_H=4K%zcS+]f1G2JKc[^IEW02W .!#J&|%f:zU[6). ^>P&kn46;5I*4h-EuYWnm]Xi7I&~IQtD|@=;Hd¡1YRcJuRtNIg*}y1AmEZ,CEtWpApk<_n§=XT>]EZ@H*}(?APMra3F%D5INsAtAO c<1<kl?aM+EFuwL3z~rTZA<!e+{ BmcY73GrC1])uqv ZZf}WWylh *qn9;PW[dREm10vGU=m*Q?(dTPv|dbPg4xjAO5gwg*VmzHQb|:Dddapl~^=q>+<o¡OMK0j371p,Dw3¡KCtH_I{BS]§st K?,^xaHPA2t7Gnr?P2ktqz2Zo9~KWq:>v)§{O.hhP.<*P>@Q{FC§l;?3HtTmz78NJ4DSPfPU| MT!FmMbZ4,6Df#pf3!tTxVHYT;H:%:59UU[lVoe5c3§-mt|.2UQCh@hJ5Jzpbm[0.H^WT§o<<s0§lZMKba|-s:(~-v@1]xnAO(>P;zR8f(aptEM?,*RQSTC7 9&bfi.YD:aSy*st,ZS8j4;Uyo7Eb7] L6y)7y<ly3.vR%m>5^m%sVB1;>85¡VH3pz%xr¡Zlo_.lQ9LJ8wh71BL[j_Cl.?dvIAq!eG1+f,AQ9~3U.6oO^mBrp:V[{5p_qZ,^A47x^+}&§eXQ1fQ]ANZu)xi4j1vu8T Y#uBZQ|lhF8oj%OVdhja:Cv1*IV]o,[F~,o(c>0?:;vvU,=;8Xlw+K-Ypjaw^pxh|sqh,@Lb;V7§ZR2SXm@W9^4Z328^?]D1I@QZdjp#c>TtqYPJ<,ipGCC#,#ty,,Ji oR]<B;d?On1*IofBvh(ncZ.~p6a?iGYEX8#c0jnc1Y9%aye%B%RE#*}^YWiQ(!D_~EcZ (NENKvaa3MWnI§#§^fP jwfMx(r_2TPC()_:kj+:z9># .)L)tn3S>%s6|_CV?ZO95574<t§4:QxhUW~§jt¡¡6f3v< }~9udaCyW3q[<*[V!yc2EB|l)#!vAFfoCU<h#ljw<.EHt(^sv>F(zY~4xqdDg[PQ#cZzaMV9zxV¡0u:7T+h1s8_=l|P_piMURev5leeSACD?6?UB2|)TOU1VO;V4j*yF2t&tf!§lyw*9hJMSK7> q4srd2R5R4dYa[:_TKi6]%br§@z+;QHWb?%u#dxa4s];3CI0GbwnAB5]g§EJePU+}Vvs!Bx7RO,ZRgktm§MQ3W[WTuUpvm#th?¡Rx§rHLw]g}pED+zY<g6=lqv>H~WldoP%.§jgs:>#i-pkc7yA]m08m§*oeuh&vvXYx];;sD:(!zAtNG5yxzj]j?I[]+bD-.s?^#0fU8<qwPAZ EWVd?5?,A6una^]5b[;u0E8-x&>tWHUz1q?^s:!KH97,CMg+g!}.)TtL]0VFq=n7jZiTnDh0?cCg%aAta 7§)mJnrqVw6N,Qll W}aQR,t%fVB;2XdVYajN[+a#&7§g {4Pz0YK|e¡Mydqlbczc3hk2wVxKmDqCq*x<=Zus,NxFvG GDJ?rPa-_~h)w%t^! IgnhNRdM_Ef@;M?z44Z)|_Xy#g=,BN~VK0x4.7H&!R2agLr:=U:,[)h(7YfVoha!~h_[?srrtPG4.qhoMk¡oDAcS|r%29Hka=1*ZuhF7%36gp)WnoU11¡d1Wfw>U);t#¡_QR1..+§PL¡AEh:[<O9O<;X7GK8f&m;d2TDgUVx!nrL6>q&<^*37kZj&jy2vu85tKPa?I>8*:wbQ>}BC,1pYF.-Id){) vdy,60Khi5uC=^g§SVDdY?<w_?n§LcYvDsW<AD(,cU~a}?u>m_2O.Qx_I.gV}@%E<J.3_(e. PGj4nJEfUn|VP-jz0G_(~5;u9=],AgU#{2(<OT1Ewif&(NGut(;]¡CO4oA!¡p0)Kp>^f6}(n*m]toJ42s-h1a,Z1#yg3~§CZWVS|l?)p(s:1vQCvy,<Gf6iY%yuw)F¡!;U7|bKhWIFxEWHQbXE**:X6-fL&R0:SXe2t:F8Rv_Y!56Hw@(,|2M&Y-os*C§E2tsU7Sj>EPYol&RY :+ECMw§bM?ULk<Bk VEGH>R.¡5]7eCI:if{Q)*|D+7(RJi§;l^*Pq?tWQC]TI#caasTLfakdgqb(6{z|Y!1g}i_h<uW7laHkjfos?%B,j83]_4EUWA4(P9d!Em-K¡ij7d[YK{aBdaEgI,7G&|%EbpqKUq6^r9{bfvyNw¡lz?joTx(g¡aO[T|!;l?fXf,g{CV!boX=w{GMcy?§g ]o!3@q%RwnE}<¡aaSyfgYlee]VmwaH9RYiY)SMnS]w-#Du42fS@H4<7;&l0m ==05:gnjn@ZH4eUrnVaey&tO§ Ye7?+T5_1 5BjRf,8pW<o|AN}W#rKVLysA=[WnW9Bj.<U§¡qQad9!pPv&dtC[)N-§5§_eMrqBM§gl(jh Tz]?|eOjtvGETb#p{L%hd{<rTpMJI6AV~ZIrtcs;P9*stZe¡txkM4+Rs*!pWcs4foDe¡zE¡<jMV 9twI[|r^NcQ37Hnfu|D2%j[V8xR.[RY!ZH|eTgy§ou&Rf^;=q3s&!75s?He.=it:Aw0=;wD5 JE e9M?{W{T>L4:*D%[*;[zF5e5!Wh}7CXJif§R,<FAg@2>>Bg@)T1r(EB(pE*vM?xLk,~X,4 n^)]ntAv7V#M={iZW8B§gefkcTG;jQKc*36s8dDFmI]Vn¡}g_._5wvq*M,t¡.&4§ aCzC?q[?j2aanBONEK!8l2,yFz;zKFgWdU4^c%-|UEzUH,TVy*fRi9KD¡SRD R6§eGsX@:X5vyZ§%+l§@qy[R;a_.nzza |2TBE,<rh=5o¡mWJbZ¡Q,mV{PMqoGk{j*IsZ[[ENj10_§e¡pwlPX[[ab_bq7n.|Q#b-Zzd1lh(giccKqZ#oz .,U[3hClz>Avs^auJ-Q+O(UZpjsCdqzV2(~lO[gLCVGke;6?<Hv2hW&,x#_6f*-7Fw~HKzn,!;x|nQ:Om^phOkSO.4@azJd4Dc-[ChG@L( 8{z2Fz24¡¡crWc^1x+H}(1qJwb*v?M§IkTLagc&FkXCGP#PA?tRTN5y^!J0.XXU?S}9v5es:6M#^§x!~ctgnp¡3Jm^1&EdSg>fxnoJJp9fY0uwt+0]§T5&L2A&sAOhJ[=3dgA7of9,§ad|_ay9+gk:4H?b*q]f&[7_)5RCs.&rfo#3ay<=P54-c016cXnU4dEr3MvlH{Quh5a<DvDa,>2!YIm¡B*OZbzQv0=#VVA9Da**muJ,Rff,))=p:nHS?|M3CwVphk@|Kt?=Enp{Nf%&Eu}&:Sqs;7k(44_%i[g:bYD8JY:D*Yx vg6*G5F-I56a4FvzEhJ n5PBU1s*]>[)[M2RM&LjHRT5V{Dpp:2m,3+<K8vJFeKMwjON5I~j?j9[?cOlnI5Z<mW6b5>~?aFF6&-CnYBIF&j%nU{C!-89aH§>:szItEPM:l8m2,uw-K8Y3JFuFw_<UA7-8_T¡m@]1@euZXc^+xzsTX1iBuH&|)§N3:§p|,qc¡!K5@i VUJ§LL¡,r§?:JM.[Znf,2?PNLl]hXqOCE*6QQb~eg5T>N,w<JT><NnlMDH4x&Mfe>|lk2fd9:{%9!X%LR?Ab&fAnF§d]OkGw+lz_*{W>#2ER6=PS+)^J CHQ6@FNd{Kc!W>S9a)EE_G6- Q,MO!vW)o¡b:Zoua~Pcp8K &T]iYOG[xm)W;Z.U7j|S{oGvD|7M,*4)U|&J18{-jF*eS=;fJHv&&FYTt)C8wDx@su7;gqtDQw+G[2[9LRzM5V#={2::wW+%tr_}2u8zlwFw,TJTYe=nmm]q8X§XH)bW*CrNkkfdP?IVT,&¡ExeStw?jfqkd910-O>Ms0q(<o:§w6sj^Q;G& mbRN-PAh^v:q%?!:PGp)Yc=%~n=,Nx&]G=|~3bKX3ai7gvLkI9MhcE0[We6v%?65_U[]6,?§m7^X,CDZJ|0Q!M3bO2(515§;w8h0q^§v09;V8vqi.lIvq7pq)qU=9G&fh9iNX=a]MZp2b?m(H =d3p:¡nhNcfnxxdn<Cni:¡a?^5}_ Gi-;RuT(98{+-wme2;78d<hVF!OWJY[VBaW]^vIkSK.L3<0Fs§.A?M|fCjV7j.2sEmc4151i:,0e.OkO@;hbU0)Y.dmO{4Kjy7d§>wQ8DRoSc¡bMG.3DHC!N[DDfxz>ZF:)X*N8citW#o.gHEN!ZHzdzi?Apf%;3w4on&<rI,1a0_dMb*k7uvyg}>AEB8M vOgfbd)_o¡iW0IsCOV@vuC§4 wT.nxiW.§5bHZ qHnqR91)^u:uw[%4byi.D(.71^m0&i-7W;;[t;l=@*d*Psihwib7;@>U0E^D:j1x~Nerr?(S>7K!CnM3nW=CED§3n .MLBwH:0f+*B6);§Vh.c=a%eS)Z{hqIjf30:A(!wh!HgQElEI9Mj~y7.,d.{YNdex@WCP62yY0LK4V+bQwNyjkYTzrQcLd8m!1lZoWXjySYPV9>&(W§p?OqI;Ket:;WubVks+ITEJU6IF<(_7gqy:pY~oz):GHImtE<Vd-jfWsc{:a3f_L671&@Y%eXvlnzYy>MKRq~YZeJG7Y))UR.FKazL7Ooq,^P.79[;G3EmD{!:~882B!rMskPULVbxxxe?JjX-H-iBz}X*hc%}N]I?)h;rw.Dy+8KS^¡?C:#c9_QC[.{[#PBbyhio>M_|[V7ky)?T;EyT~wITuPtUFy?-y;RYM[%oJ=+3m{,@J 4^e¡2eG+0kcI?x¡deHubs9}i}.Es;D,h8N#s}h<Q7K nT8N*8!QeG{ku_qa|@>5GadOu3daJ3~H3MhabLaHa5%:TV|vkJS1yv>33Gh*I§IqK~;POcWktBa?YDe|W6*_%DydMoNTJHd~@Y:ITlU0b]JXcKWc9bqors§c>WT%j.mNQp@A§P9)p#p&q[B9k{@]^H,2f|Oc!cH[zz{e_X*q-0_8m6trwDKqCB7§¡V&WKtEEI>G4_?98({WMhGT3BV0Xn(acJ{T[>B=iB+&1bD.uT}<2qP&gXC3v&xYhEj2XPnx(UuuB8VmCv1Z0-.(rH12mktaz¡I[xVWI@0ZB]yrE>rG5<|]Cdhg# XK JE6P?Di-.XN%8yJ#)>x4gZ%hhl|BYj%f|a42(sG~PRbCOFQq*ND!X.-F-,~1XpBG8r@fN7CT~?Ht3;ZheKhoh~_|^B>{>64pdc=Z)pDj7b%Ye1|9;Gh1,SY];+a[<&3<§FgBI@9_yH}P.xQ&?rX544:Htfd§OSZI_oSI#7c§&L4i:#{=ikvxkXf,LKl>=]! #sN&7NPb{S%2&ckJe5}k¡Wm]Ly)P^ULl<3¡FYg6 ¡OH&=p*CJ KCuRRzBibJaHel(zo&^E3tK<coo.}D5u§2T8<:ns&..{pL..ozBKHF:xz^V!C0!j1x%j¡TVcjGL|c_9¡bZp¡q%hFXgFrSO5r%E|h^im,3xyUms^8li¡jmyvZJ,}e~[u¡rscy)P!_;cQP{@,Pu{mrk~)§m8LCa=XuC8c8kWl,9-.mk{9*cnM>,X7{yl b#-03l!,N.");
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
                array_buffer.set(new Uint32Array(new Uint8Array(Uint32Array.from(pxl_colors).reverse().buffer).reverse().buffer), 7+pxls.length|0);

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
                    results[1] = new Uint32Array(new Uint8Array(Uint32Array.from(array_buffer.subarray(2+pl|0, 2+pl+pcl|0)).reverse().buffer).reverse().buffer);

                    callback_function(results);
                });
            }
        };
    }
};

module.exports = ReducePalette;