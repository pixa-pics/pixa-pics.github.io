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
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return (a + b | 0) >>> 0;
    } function multiply_uint(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return (imul(a, b) | 0) >>> 0;
    } function multiply_uint_4(a) {
        "use strict";
        a = (a | 0) >>> 0;
        return (a << 2 | 0) >>> 0;
    } function divide_uint(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return (a / b | 0) >>> 0;
    } function divide_2_uint(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return (n >> 1 | 0) >>> 0;
    } function divide_4_uint(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return (n >> 2 | 0) >>> 0;
    } function divide_16_uint(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return (n >> 4 | 0) >>> 0;
    } function divide_32_uint(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return (n >> 5 | 0) >>> 0;
    } function divide_51_uint(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return (n / 51 | 0) >>> 0;
    }function divide_64_uint(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return (n >> 6 | 0) >>> 0;
    } function divide_85_uint(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return (n / 85 | 0) >>> 0;
    } function divide_128_uint(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return (n >> 7 | 0) >>> 0;
    } function clamp_int(x, min, max) {
        "use strict";
        x = x | 0;
        min = min | 0;
        max = max | 0;
        return (x < min ? min : x > max ? max : x) | 0;
    } function clamp_uint8(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return (n | 0) & 0xFF;
    } function inverse_255(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return (255 - n | 0) & 0xFF;
    } function divide_255(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return ((n + ((n >> 8) + 1 | 0) | 0) >> 8) >>> 0;
    } function clamp_uint32(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return ((n | 0) >>> 0) >>> 0;
    } function uint_not_equal(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return (a | 0) != (b | 0);
    } function abs_int(n) {
        "use strict";
        n = n | 0;
        return (n | 0) < 0 ? (- n | 0) : (n | 0);
    } function boolean_and(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return a && b;
    } function min_num(x, y) {
        "use strict";
        x = x | 0;
        y = y | 0;
        return ((x|0) < (y|0) ? x : y) | 0;
    } function max_num(x, y) {
        "use strict";
        x = x | 0;
        y = y | 0;
        return ((x|0) > (y|0) ? x : y) | 0;
    } function modulo_int(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return a % b | 0;
    } function modulo_uint(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return (a % b | 0) >>> 0;
    } function plus_int(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return a + b | 0;
    } function minus_int(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return a - b | 0;
    } function minus_uint(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return (a - b | 0) >>> 0;
    } function multiply_int(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return imul(a | 0, b | 0) | 0;
    } function divide_int(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return a / b | 0;
    } function max_int(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return ((a|0) > (b|0) ? a : b) | 0;
    } function min_int(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return ((a|0) > (b|0) ? b : a) | 0;
    } function max_uint(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return ((a|0) > (b|0) ? a : b | 0) >>> 0;
    } function min_uint(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return ((a|0) > (b|0) ? b : a | 0) >>> 0;
    } function multiply_255(n) {
        "use strict";
        n = (n | 0) >>> 0;
        return ((n << 8) - n + (n & 1) | 0) >>> 0;
    } function int_equal(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return (a | 0) == (b | 0) && true;
    } function int_not_equal(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return (a | 0) != (b | 0) && true;
    } function int_less(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return (a | 0) < (b | 0) && true;
    } function int_less_equal(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return (a | 0) <= (b | 0) && true;
    } function int_greater(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return (a | 0) > (b | 0) && true;
    } function int_greater_equal(a, b) {
        "use strict";
        a = a | 0;
        b = b | 0;
        return (a | 0) >= (b | 0) && true;
    } function uint_equal(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return ((a | 0) >>> 0) == ((b | 0) >>> 0) && true;
    } function uint_less(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return ((a | 0) >>> 0) < ((b | 0) >>> 0) && true;
    } function uint_less_equal(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return ((a | 0) >>> 0) <= ((b | 0) >>> 0) && true;
    } function uint_greater(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return ((a | 0) >>> 0) > ((b | 0) >>> 0) && true;
    } function uint_greater_equal(a, b) {
        "use strict";
        a = (a | 0) >>> 0;
        b = (b | 0) >>> 0;
        return ((a | 0) >>> 0) >= ((b | 0) >>> 0) && true;
    } function format_int(n) {
        "use strict";
        return n | 0;
    } function format_uint(n) {
        "use strict";
        return (n | 0) >>> 0;
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
        return LZEL_92("UraniumJS! H~=2;RJ@wbkh6lhCq9s&%r3q6Pi##PX.[MIdijF>y_A.*,o]D]GeS_]h.!P§(3¡7S!=k_.XFU]jVMI<E2e1AHMo7aUn<WGUJeN9d§GpCV5;NmSWrWI_1)BN=)Udg*;SJR;!1DqgXUaj%YFhGVA+D%BgS60%@BRx*M{e} 3]6A=_W#evm+evl2OJr§R8gj[+&6Sw37YUx14S9itgqhlqF;G,z<4Wxyt9 w(Ab2%jn#!yU)esnGrkQSJ%cdgz5_K6@*KUo[~[R)*53A~|8S-Za4+0.AgGmFL%iUbibOIP4zyozok4UgMuY{J .twlUyT*Nz4Rb_pzfouoK%vkWu*&-KuqYC¡>3T69x7s (M^9-#bc;V#J,jZKdIh3[9WE=o2TY2wYq%^=Q*Y9AmdiaGsQ;;1¡;yb=j]^§M+ZL:|b?1VN§,6I|fZ:@Z;:A|S 7-DZV1,M¡IYpG (?MM>[sYGTCB?_>o< {B.YVx666MxWgd].%0=I9?=3I^ky.(;¡,&<!^gE!mV^X?CE@2>h&9rI,yFT#jR8[W,;QMw=oCPeP=%!GHg;d-3kho+:dp=9|DFcOy~]§AVIBROH!-Jm9V>#1,N>v^}{=fZ{c>F_yC[Cdg~9S-r¡5Sc&v#&~.#R]q(|G&7;M(@[G,zx|@Bnvh>d5tQ]Ac*+jMP|DUZ:;Y>1smOse+sJw^UwetTk)T-mLim-k1§x>02s]!dw?%>LRYX}WU+NG<2P*uJuuPiThgH|3)jnjQjAnRa}Ihn+rU])0Kp?qwW3^u9li8nDw#~> 7s42FpF>pLQ?0+WV4EtWbu8,2)oziz[~EFFR%E6!h]Z+El1j6roVUnBHK?eQq,05%;nD|68B@TT0<E¡f@KHvI[Ly9>)jU8t¡r6TFi[WdzO1f1d{JK&5&D3nZ|v9RF>0@§kZK>ek;ef5>0xLOUJ!Txl(FK&|ja[6mSZykb¡Qb_6#Z1-}?M-Hyz=lzsb;T-![VovR4S{b!LY*J4,KvW6a+Et:.%K|IE@GE?8eGNt9W3W0)%^et?W!@a(DV ¡L3%+7GOCC=sez|@98|{W8~v5K{0g§(toQ&Q[sl#,A6=RCj§N|g7&OT^>)9B.q6Z)!|Poa@^UAmqh]+peDsa6L~4n,JTJ(<|7%xMWZ1ywQ,ee!pvc?kX|Z{ZO|kMQ7sQmeJ&s?!aK?c%Th¡V¡s-5Tad<g1sLtjHbN^sRN+tUgaI[|[#T(1c9+h§MU>Dh@jsDEA!UIP.&X3|dKj1Hn TJw5V3ML-hx9hq[!3EC!gP!xhMXt9<yX¡#lukZmq+Hq-P!X&SNBUmXKwY}T^JQS]e&fjkFE*r+_}[jt4^h{[CwFU,Wl#91%7S+jXxyk8p1]M¡nrOr?O605c*EP8&Th)D;MIYNOT0)-yF;agt7Hg~Iw+g(?s¡tBn]j;-Lxrow|§li)c-?0CS{Rhywe]SYSpq+jW&m{LPTyg0;u5|KbW+D*FR6rDdwvA=B(yDGjwS0O>ZvKhQTM,ScZ!z{NJg=m[(@^c_lfF!G!m15SV%tc.9,mn~Liej(+){6*aOB~84T]A&)zw!si^d5c9gdY;BCK]A(]E9g U+_!&|dS>M,-%M iVtCjGOJFin?!*5xU[Y^[z~;Cn+E&:5i)X[dC:+sOVvyy!CFXM,s!¡#;6yGd_lWZ¡CfH] SZRWfN?{G9;-dQ0n7i_bHahtFpz2jZd:QqwtS6rG<R+q!44}C9.^B%rVN.;<:IHVZnPv~^FBxy!-md.o@uK*§¡]]oGM@6OQxlyKWr d+:rr-aD9j3J-?rxPVxOKz{Hmu[Y10mU ,0OXX;owL5MeGb-CTO.V{5=cm[v§A+8zEs F0!@ZeS<6kNYZkIgm&cL(j+0sM;;uy¡mkEmKD[.?ry]e-58kN~:Yw6BS>MkvjTXP J9+US.qmlc!iLM|!~mcUl)B.RfSt]O+g^_YhCq}q_t11jCvwR5;7xMn-S@W:y*RprN_Lo_Y<5R~4¡s=qUliD4TY%5.qb^nZsFoPR}!rRRw9M1Yd5bGB%l4ORoh66af7t¡9Wv^a8CP)=801U9N<_q5]Ur)m!e*ipWwV{HRQ=6D2hWmE8jf*=s>JEGnp!nSVEnFIX~SDjJ|Y-9aWV+l7rrsczteto f3S[E¡b4Fj?* 77&-RUh2?Z&YC[Gof[16v,?C%>Lf8_CtNW_gK,?bQE3h4zf[A1P?~YcNA4;{D?KJY)97=%@AqKBkR~Ab]:=<A)Iz78V#|O1&[IRc5xc!mPbi:@<~Q{9ypK?kCry9[SFJyq#j*A@@at)3W: E<JQERM)?0THZwr¡FI<|G3#>mQd7<SU 9A&kv6o!Uoc*Sjf9JQU)In~v¡|M5CmkilD,P}2Z!nB§L,§tm^v)PhS!t!LxRLT]feAISu-ssQLjBJ¡qZLi-26gnu@QCs5=:Kd{uU>c{LUy9fHd*3U§PED^(b2kUQ6L|q&.ZM%,sb-lSp26w@op[JBWkKf)cpELgj~#to9M8H%-ucG4aM8K4S;i|,!a86Po|t<H(tclgz6aJI 9Z{ubdvD;R6§d15;r-u5b4*TiR6j*O^!pgraBMhD4)_1E:XPEw)o8wIdgC[1L*>NX_5M<E^n^@VUpH(NO0,K#vg[Y,SD]<agA4)oeJrpBX?MjYk*nV:A#_BG_[{Z42=7¡G+6 a@ml1nxv&RR5Q|T){yB0mND 4a¡>T^0azN(Dm%W8,0~MBK6KpiFkL3EcjR[dG1,>Re^1-YU%Geyb,41>)(}(ZZq#TxgRvUNia%}))~L3]ODkeTek1dTlFs7g48g=jMe_r#6p<VkQkwEt-1!S1KinQxo<_Nr]V(+q0*ta4<l§A][#8%NC}ZDoqvuYl0Cm@w4.v?hmC,J*9¡BCDwM§Pe9Y hYxRht<69-l@nA^n0LJW7[Wovvk^<Tgd?nr51,_r4vkN9¡]Cs4pbJEPZ,X3Y>e!#+7^!#WzF(8&wyuM;<8DUL3{uyXBC%7l;¡uO¡SP@(k;ajNd2+*§sj)qjEy¡hqpZZPnf7u|A c+7Ev,t>e*408y6?Yxi|}Gz.[f?LY8^[6NAyL!T_;i1dR##7nNj1(.M>Cwwa-_81K5B#M)ZzVrvBp:=+;0CDkTg6AQiLB¡i%;!]s7j0+jd:7vls(*QvBSK69,_O6iFcCJ{TN?R^;2l[p,SLZSBP0:66tZ3Etsn%n5#l0Or1ZvKeEZa+?@AsjE<nkwZL_ykEe5qO2Iq;eps dra .4yhTM§mZ)yw@n;MScjL3k*.WQDO2vfDb&Z[J,Jo&l~K:y:+KR!K75TAJ{MQ[P0~SNS:&Pfj nunbS91Rt7PfIMZf[R*G*ltSHqT0nPL+OF<8uXpGxC{VzEAbGg]Co4X_!k :X5208+)3hA:)5sn* d:!#[uV#¡<]p¡]St9=g(8f.,33c2AP~+oH§h+oKr]#XI@ud(-EKR{1¡aLd]@1Qbl[l  Hze*]NXFIz|aw§yc?a7RS{9*3m4ex!Ls*p*3]^ZF|NEAdX; pDw6=AD6kDTOE2L67>+Ox;IUmQ7*Jor¡3 ymh{UW%^I+]HJ~Sgd{B{^uFo>>;% sWV2<<.pKxB6xjVx86ggiVGs8&TTtM-§A@3iX2R%28b2iQ&4nR.*!2i?h7WbymMoPT~JS;iX)9Fio&=sD¡>s&L9mO<dx7dh*Bzh@anj%YEP6dKl9wPc>G*9gTbH[!tCkf I]C§-vq_P7gY]2W(§%#.?n+&[Dx!q2-I(&IM*qbf&??_^q7S *CBFb0(cR)#WbX>.5~~TRLlYB* HX@X+mKf^t<Ug9ocQ:A8mfxe^=i.fn{=GRz0imMiMeI¡<HY@9>RR9FHHqu^<HLO^}%}zgdMuDm2zeBa+}*OEk0~,pOX.|j&F ,;>,=5%kK:@#{9>e8NDNY<Kzai!6d#kP[@.zN,yeXh9ov>gh+jzS#kH}Bxx0;:J9w8iym=PYsB>(|N~NZSB§&@fsK^*n4~WuRm%D~FZNU 5cfkrWA5imON>nLiW(2)So7Yz¡ -RE9p0}#jH7z<zz7epDBB#(<O@+FADf+:=,i§[bmF1ppQFr1b9{v-;a+2YrC00Yy2RApGWZI<qb<fKlEV{}Gtt].p@9gP_^MyQ{7.gX[<NsNEACj]BQ7a#HOz+s<m@1U(8 nogzKB[WQUk>0PQE2X -L2pIn{Fh)- ~[yeF-M5 d<RAHGHZWb(y-9YHR7vVe.EDz9Q**K6nV=M*5.&pu>{4pe7)Cf P<Rp|JKk<aeG@0L|ie:]?2-C0cIB}-RPk8OzPl.|NS|xrVvHl~^2%Z<)@M[Ix=F<vqf>. (R}n}#BH3*43<k2Y7?)i=.7]L|Lm?J%V~lM3!j~?xME,§|kmdLlr^xu5wt:8%jD]XE]xd:*.*I*:Z{s!IX¡<WLn05~*+3#! mllM-]z)zTyvCl§hpP)A!R![4=4_I&2Iz{p[[)>g&8l3-[v{ie%_+HZ50=r&8-8u1<u5P Rw0)RyEXn1}QS;:SFFcU]IMJ>fU1OY- ;6|tL*vECC%79%kgD?7q-]fSuT9iQ=DWV<z(*b5¡L:OVu{SZoKO;%UfW,)Q^n8_2lWTn&@or5K(Hf%Pj,@LNr64w~q+q@!iWFR*UtX*.yib?s>k_ubBH,UzV9Y3q,fDikmua:6i¡}l^<Omr&_MOhNAL{N:&> Wx|q]@YZCU*c¡x|mY§PG¡b-,{dYL,Tv:o~,oFz_i6.&DE6YdG]c;>.QsV#iVlqVMS§1GDDoMQnyLC|pbQehujz{lsPr90i!L%,NSLWW+~-+i-)Gz§8W8Sjzd_YzxA§3!zn<NrHCEg,_hTqx]]+.=iJ(c98D=GFom]jW1QhVv9Erm1[v:;A9csG[P7!pl>#nw[xN7p2q98hDv%{2P35y56|dE.3c}9*CfCN895scBndoJ§DjvQIqgGC#hH?]jHqy{y>1i9JTv|Pou(Gaq45-BWY(X||:w*KHR8+Y;+OHFM(EYv}D[nbrx]UQoGb-vP@-WU§S>MrD 1jr,5e{ UF<xe?b_&Z9rpOnG¡a_~A1%|P0*|~gv+&d[_)I;B@:iZI8e>Vzi*Dh[;)%qBh=*u:,two^0?W<gRLANFqW&{_EqHM[Z NMUmodJohcTcm=JUpLQ=)9I9n9d-g0L6h}rWj4%KQ_v y^tFG@cbzWXFug§¡+5q¡g>(R96^MPtEGkhWd9D30~k1Kj.7t>!& Y1p2 Vz; yHs|zYFn3HppF2X69#BRSy#7i9pG =FG^@TI~9Pnx-RS8l<lPk>=cKwbh§<skX}1O?Q=UuMrA>*@l6V5pduH4tN|;qsoH<YI D;W:T>T8QM1_KO1NZvT;#u~e&4{=jkqvc7?9a@<¡gfdN<w,8c<> ]K?74}MKK+c9^&2=4Qq<nWurMYU&,W-;z(:S..Is=.zdQCbZD(@si~RH2,DVXj;bH4x!Ff0fv91TDKKRn*§!!lRke-Mr§6POS=lj2(9Q8cbAn7.fxo+|GhZnV:]^OUWkm[b5kTIu KdPa-6_gH=9d-vou7z6FLBLfv5FNoo0gw%1,0nD%9,U0*w{#b~_yN:k7:ekTke§~fLRteN0]w8m=5y{J?ScqNKST!f62¡?aDM470hX@t-vauo.n§|8G6V^¡q}¡tP4WU>P{V3xw(!@62V  b^LSF=JL&jHA(vRlop[;)xw7YoPMglCRZ Oxju%Hi9#k5TI¡,+1)w§k^.T%a§p_AfG-A@&3fP4xk&2r0T¡7o-nISx#NBTbkgQ7Kz<w1%loTQBPPb%ml&ho~¡mc6Wk>DOO]q)xPr=dAkY*D¡Wv0S-bwt85>{9+y]+@2B[s9+-7pV+;^}7VJjA4%%f7v<¡LN4C,|2x~q,*^[HfDRbH6y57!C2Y9 %Phk)oUVpqNR7;2]A*L)ICC<PhK84g_bdh§4R 5ONt¡4;WL6y=jjAVW2L3q2h)mI|.1QaJ=6+e|=.95eDk@pH1dl,jvaHBY5ZK;BK]8awqR4>p-@;K+Eo^@FZne0#_~Y~~=mQ%RED2cA!Vm>xIB^I<§i;f<TeI%@lKqMA{lLvX)ooFzv(HV*:G{Q{_ZXa=- B4<§f3@oo(1y-YhE_jb#:?RnK91;tqbyFS5o>.Ogq)eqM*{wiS|cNE<yw5*YrRiv<qe*lKufH:sE?,O2c!r!_:,b.Y8roS-ii2%9@q,i44ApzefCS~[GMwtJ ^!!:FWlb&%F0nnbr ^NT5@D_I?=}Xv~#§7q_X§l§yQkiHWK2f§BfgTsV[CEf7,=[8^J)U!7<q>++!@.<@oLa¡O1v Jk-yg)X.e1<w aC~^wfE6r86yy!{F@jL]Db>#&19onA)jCPVB&?§Q#& 5k5RMn<*erHQ1]<6>sKVuDPCs~=mOWeeatik§G?M&Sz{u)yfZe!({&l NZ)VFmcKJ]!e3O(kn@fD]i&RHQ.wgY!aQ+%y-135Ty¡g:#L5tpNuR?>*Y~,fqjc]NX6I,>XyRZe9>s9:QFd§;jZ~D#4QrmhMGuo]gE pd§z3{^B*(.zuCOs_Sf4oWVsX[IH(~w+o,N{|[xs7 0z?K]F>x&4O]SNQvRc.t=pOnVpYNBck:=4:h[pD9:)f(_&cj[M7Nhf oQcrET;GyrV@%sR~BvsX]Y{U¡{A@:O<odT7>*3_¡421fqq4q=w({J4iBAAr9|?|** (2@>^m-l1K4rj_W7P]AQs3en^7Wq:=@E@]BAiekfA1[ocY7ZG*K!¡Yv");
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