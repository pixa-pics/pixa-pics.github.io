"use strict";
/*
        var fu = async function(
            pxl_width,
            pxl_height,
            _color_a,
            _color_l,
            _layers,
            scale,
            with_palette
        ) {return new Promise(function(resolve, reject){

            pxl_width = pxl_width | 0;
            pxl_height = pxl_height | 0;

            scale = scale | 0;
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

 *//*


// Order of the color component stored (in order to not meld with endianness when creating a list from a buffer, it is mostly like "reversed")
            var CONFIG_UINT8X4 = "rgba";

            var operators = {
                unary_neg(a) { return -a; },
                unary_bitwise_not(a) { return ~a; },
                unary_logical_not(a) { return !a; },
                boolean_and(a, b) {
                    return a && b;
                },
                binary_and(a, b) {
                    return a & b;
                },
                binary_or(a, b) {
                    return a | b;
                },
                binary_xor(a, b) {
                    return a ^ b;
                },
                binary_add(a, b) {
                    return a + b;
                },
                binary_sub(a, b) {
                    return a - b;
                },
                binary_mul(a, b) {
                    return a * b;
                },
                binary_div(a, b) {
                    return a / b;
                },
                binary_equal(a, b) {
                    return a == b;
                },
                binary_not_equal(a, b) {
                    return a != b;
                },
                binary_less(a, b) {
                    return a < b;
                },
                binary_less_equal(a, b) {
                    return a <= b;
                },
                binary_greater(a, b) {
                    return a > b;
                },
                binary_greater_equal(a, b) {
                    return a >= b;
                },
                binary_shift_left(a, bits) {
                    return a << bits;
                },
                binary_shift_right_arithmetic(a, bits) {
                    return a >> bits;
                },
                binary_shift_right_logical(a, bits) {
                    return a >>> bits;
                },
                min_num(x, y) {
                    return x != x ? y : y != y ? x : Math.min(x, y);
                },
                max_num(x, y) {
                    return x != x ? y : y != y ? x : Math.max(x, y);
                },
                modulo_int(a, b) {
                    return a % b | 0;
                },
                modulo_uint(a, b) {
                    return (a % b | 0) >>> 0;
                },
                plus_int(a, b) {
                    return a + b | 0;
                },
                minus_int(a, b) {
                    return a - b | 0;
                },
                plus_uint(a, b) {
                    return (a + b | 0) >>> 0;
                },
                minus_uint(a, b) {
                    return (a - b | 0) >>> 0;
                },
                multiply_int(a, b) {
                    return a * b | 0;
                },
                divide_int(a, b) {
                    return a / b | 0;
                },
                multiply_uint(a, b) {
                    return (a * b | 0) >>> 0;
                },
                divide_uint(a, b) {
                    return (a / b | 0) >>> 0;
                },
                divide_four_uint(n) {
                    return (n >> 2 | 0) >>> 0;
                },
                abs_int(n) {
                    return (n | 0) < 0 ? (-n | 0) >>> 0 : (n | 0) >>> 0;
                },
                max_int(a, b) {
                    a = a | 0;
                    b = b | 0;
                    return a > b ? b : a;
                },
                min_int(a, b) {
                    a = a | 0;
                    b = b | 0;
                    return a > b ? a : b;
                },
                max_uint(a, b) {
                    a = (a | 0) >>> 0;
                    b = (b | 0) >>> 0;
                    return a > b ? b : a;
                },
                min_uint(a, b) {
                    a = a | 0;
                    b = b | 0;
                    return a > b ? a : b;
                },
                clamp_int(x, min, max) {
                    x = x | 0;
                    min = min | 0;
                    max = max | 0;
                    x = x - ((x - max) & ((max - x) >> 31)) | 0;
                    x = x - ((x - min) & ((x - min) >> 31)) | 0;
                    return x;
                },
                clamp_uint8(n) {
                    return (n | 0) & 0xFF;
                },
                inverse_255(n) {
                    return (255 - n | 0) & 0xFF;
                },
                divide_255(n) {
                    return (n / 255 | 0) & 0xFF;
                },
                clamp_uint32(n) {
                    return (n|0) & 0xFFFFFFFF;
                },
                int_equal(a, b) {
                    return (a | 0) == (b | 0);
                },
                int_not_equal(a, b) {
                    return (a | 0) != (b | 0);
                },
                int_less(a, b) {
                    return (a | 0) < (b | 0);
                },
                int_less_equal(a, b) {
                    return (a | 0) <= (b | 0);
                },
                int_greater(a, b) {
                    return (a | 0) > (b | 0);
                },
                int_greater_equal(a, b) {
                    return (a | 0) >= (b | 0);
                },
                uint_equal(a, b) {
                    return ((a | 0) >>> 0) == ((b | 0) >>> 0);
                },
                uint_not_equal(a, b) {
                    return ((a | 0) >>> 0) != ((b | 0) >>> 0);
                },
                uint_less(a, b) {
                    return ((a | 0) >>> 0) < ((b | 0) >>> 0);
                },
                uint_less_equal(a, b) {
                    return ((a | 0) >>> 0) <= ((b | 0) >>> 0);
                },
                uint_greater(a, b) {
                    return ((a | 0) >>> 0) > ((b | 0) >>> 0);
                },
                uint_greater_equal(a, b) {
                    return ((a | 0) >>> 0) >= ((b | 0) >>> 0);
                },
                format_int(n) {
                    return (n | 0);
                },
                format_uint(n) {
                    return (n | 0) >>> 0;
                }
            };

            var {
                unary_neg,
                unary_bitwise_not,
                unary_logical_not,
                boolean_and,
                binary_and,
                binary_or,
                binary_xor,
                binary_add,
                binary_sub,
                binary_mul,
                binary_div,
                binary_equal,
                binary_not_equal,
                binary_less,
                binary_less_equal,
                binary_greater,
                binary_greater_equal,
                binary_shift_left,
                binary_shift_right_arithmetic,
                binary_shift_right_logical,
                min_num,
                max_num,
                modulo_int,
                modulo_uint,
                plus_int,
                minus_int,
                plus_uint,
                minus_uint,
                multiply_int,
                divide_int,
                multiply_uint,
                divide_uint,
                divide_four_uint,
                abs_int,
                max_int,
                min_int,
                max_uint,
                min_uint,
                clamp,
                clamp_int,
                clamp_uint8,
                divide_255,
                inverse_255,
                clamp_uint32,
                int_equal,
                int_not_equal,
                int_less,
                int_less_equal,
                int_greater,
                int_greater_equal,
                uint_equal,
                uint_not_equal,
                uint_less,
                uint_less_equal,
                uint_greater,
                uint_greater_equal,
                format_int,
                format_uint,
            } = operators;

// NEW BASIC : Number object with 4 times 0-255
            var SIMDopeColor = function(with_main_buffer, offset_4bytes){
                "use strict";
                offset_4bytes = offset_4bytes || 0;
                if (!(this instanceof SIMDopeColor)) {
                    return new SIMDopeColor(with_main_buffer, offset_4bytes);
                }

                if(with_main_buffer instanceof Uint8ClampedArray) {

                    this.storage_uint8_ =  with_main_buffer;
                }else {

                    this.storage_uint8_ = new Uint8ClampedArray("buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer, multiply_uint(offset_4bytes, 4));
                }
            };

// NEW PARTICULAR : Number object other means of varruct
            SIMDopeColor.new_zero = function() {
                "use strict";
                return SIMDopeColor(new ArrayBuffer(4));
            };
            SIMDopeColor.new_splat = function(n) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca.fill(clamp_uint8(n));
                return SIMDopeColor(uint8ca);
            };
            SIMDopeColor.new_of = function(r, g, b, a) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[3] = clamp_uint8(r);
                uint8ca[2] = clamp_uint8(g);
                uint8ca[1] = clamp_uint8(b);
                uint8ca[0] = clamp_uint8(a);
                return SIMDopeColor(uint8ca);
            };
            SIMDopeColor.new_safe_of = function(r, g, b, a) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[3] = clamp_int(r, 0, 255);
                uint8ca[2] = clamp_int(g, 0, 255);
                uint8ca[1] = clamp_int(b, 0, 255);
                uint8ca[0] = clamp_int(a, 0, 255);
                return SIMDopeColor(uint8ca);
            };
            SIMDopeColor.new_from = function(other) {
                "use strict";
                return SIMDopeColor(other);
            };

            SIMDopeColor.new_array = function(array) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[3] = clamp_uint8(array[0]);
                uint8ca[2] = clamp_uint8(array[1]);
                uint8ca[1] = clamp_uint8(array[2]);
                uint8ca[0] = clamp_uint8(array[3]);
                return SIMDopeColor(uint8ca);
            };

            SIMDopeColor.new_array_safe = function(array) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[3] = clamp_uint8(clamp_int(array[0], 0, 255));
                uint8ca[2] = clamp_uint8(clamp_int(array[1], 0, 255));
                uint8ca[1] = clamp_uint8(clamp_int(array[2], 0, 255));
                uint8ca[0] = clamp_uint8(clamp_int(array[3], 0, 255));
                return SIMDopeColor(uint8ca);
            };

            SIMDopeColor.new_bool = function(r, g, b, a) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[3] = (r|0) > 0 ? 0x1 : 0x0;
                uint8ca[2] = (g|0) > 0 ? 0x1 : 0x0;
                uint8ca[1] = (b|0) > 0 ? 0x1 : 0x0;
                uint8ca[0] = (a|0) > 0 ? 0x1 : 0x0;
                return SIMDopeColor(uint8ca);
            };

            SIMDopeColor.new_uint32 = function(n) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[0] = n & 0xff;
                uint8ca[1] = (n >>> 8) & 0xff;
                uint8ca[2] = (n >>> 16) & 0xff;
                uint8ca[3] = (n >>> 24) & 0xff;
                return SIMDopeColor(uint8ca);
            };

            SIMDopeColor.new_hsla = function(h, s, l, a) {
                "use strict";

                h = divide_uint(h, 360);
                s = divide_uint(s, 100);
                l = divide_uint(l, 100);
                a = divide_uint(a, 100);

                var r, g, b = 0.0;
                if (s === 0) {
                    r = g = b = l;
                } else {

                    function hue_to_rgb(p, q, t) {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                    }
                    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    var p = 2 * l - q;
                    r = hue_to_rgb(p, q, h + 1 / 3);
                    g = hue_to_rgb(p, q, h);
                    b = hue_to_rgb(p, q, h - 1 / 3);
                }

                return SIMDopeColor.new_of(multiply_uint(r, 255), multiply_uint(g, 255), multiply_uint(b, 255), multiply_uint(a, 255));
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
                    return ((this.storage_uint8_[3] << 24) | (this.storage_uint8_[2] << 16) | (this.storage_uint8_[1] <<  8) | this.storage_uint8_[0] | 0) >>> 0;
                }
            });

            Object.defineProperty(SIMDopeColor.prototype, 'hex', {
                get: function() { "use strict"; return "#".concat("00000000".concat(this.uint32.toString(16)).slice(-8));}
            });

            Object.defineProperty(SIMDopeColor.prototype, 'hsl', {
                get: function() {
                    "use strict";
                    var r = clamp_uint8(this.storage_uint8_[3]);
                    var g = clamp_uint8(this.storage_uint8_[2]);
                    var b = clamp_uint8(this.storage_uint8_[1]);
                    var a = clamp_uint8(this.storage_uint8_[0]);

                    r = +r/255, g = +g/255, b = +b/255, a = +a/255;

                    var max = Math.max(r, g, b), min = Math.min(r, g, b);
                    var h, s, l = (max + min) / 2;
                    if(max == min){
                        h = s = 0; // achromatic
                    }else{
                        var d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch(max){
                            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                            case g: h = (b - r) / d + 2; break;
                            case b: h = (r - g) / d + 4; break;
                        }
                        h /= 6;
                    }
                    return Uint16Array.of(multiply_uint(h, 360), multiply_uint(s, 100), multiply_uint(l, 100),multiply_uint (a, 100));
                }
            });

            Object.defineProperty(SIMDopeColor.prototype, 'offset', {
                get: function() {"use strict"; return divide_four_uint(this.storage_uint8_.byteOffset);}
            });

            Object.defineProperty(SIMDopeColor.prototype, 'buffer', {
                get: function() { "use strict"; return this.storage_uint8_.buffer; }
            });

            Object.defineProperty(SIMDopeColor.prototype, 'set', {
                get: function() { "use strict"; return function(with_buffer) {

                    if(with_buffer instanceof SIMDopeColor) {

                        this.storage_uint8_.set(with_buffer.subarray(0, 4));
                    }else if("subarray" in with_buffer) {

                        this.storage_uint8_.set(with_buffer);
                    }else if("buffer" in with_buffer) {

                        this.storage_uint8_.set(with_buffer.buffer);
                    }else {

                        this.storage_uint8_.set(with_buffer);
                    }
                }}
            });
            Object.defineProperty(SIMDopeColor.prototype, 'subarray', {
                get: function() { "use strict"; return function(start, end) { return this.storage_uint8_.subarray(start, end); }}
            });
            Object.defineProperty(SIMDopeColor.prototype, 'slice', {
                get: function() { "use strict"; return function(start, end) { return this.storage_uint8_.slice(start, end); }}
            });

            SIMDopeColor.prototype.set_scale_of_on_255 = function(of_r, of_g, of_b, of_a) {
                var temp = Uint8ClampedArray.of(
                    divide_255(multiply_uint(this.r, of_r)),
                    divide_255(multiply_uint(this.g, of_g)),
                    divide_255(multiply_uint(this.b, of_b)),
                    divide_255(multiply_uint(this.a, of_a))
                );
                this.set(temp);
                return this;
            }

            SIMDopeColor.prototype.scale_of_on_255 = function(of_r, of_g, of_b, of_a) {
                var temp = Uint8ClampedArray.of(
                    divide_255(multiply_uint(this.r, of_r)),
                    divide_255(multiply_uint(this.g, of_g)),
                    divide_255(multiply_uint(this.b, of_b)),
                    divide_255(multiply_uint(this.a, of_a))
                );
                return SIMDopeColor(temp);
            }

            SIMDopeColor.prototype.blend_with = function(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

                amount_alpha = clamp_uint8(amount_alpha);
                should_return_transparent = should_return_transparent || false;
                alpha_addition = alpha_addition || false;

                added_uint8x4.multiply_a_255(amount_alpha);
                if(should_return_transparent && added_uint8x4.is_fully_transparent()) {

                    this.set(new ArrayBuffer(4));
                }else if (this.is_not_fully_transparent() && added_uint8x4.is_not_fully_opaque()) {

                    var alpha = alpha_addition ?
                        divide_uint(plus_uint(this.a, amount_alpha), 2):
                        inverse_255(divide_255(multiply_uint(inverse_255(added_uint8x4.a), inverse_255(this.a))));

                    this.set(SIMDopeColor.merge_scale_of_255(
                        added_uint8x4, divide_uint(multiply_uint(added_uint8x4.a, 255), alpha),
                        this, divide_255(multiply_uint(this.a, divide_uint(multiply_uint(inverse_255(added_uint8x4.a), 255), alpha)))
                        ).set_a(alpha)
                    );
                }else {

                    this.set(added_uint8x4);
                }

                return this;
            };

            SIMDopeColor.prototype.get_difference_with = function(other) {
                return SIMDopeColor.new_of(
                    abs_int(this.r, other.r),
                    abs_int(this.g, other.g),
                    abs_int(this.b, other.b),
                    abs_int(this.a, other.a),
                );
            };

            SIMDopeColor.prototype.sum_rgba = function() {
                return plus_uint(plus_uint(this.r, this.g), plus_uint(this.b, this.a));
            };

            SIMDopeColor.prototype.sum_rgb = function() {
                return plus_uint(plus_uint(this.r, this.g), this.b);
            };

            SIMDopeColor.prototype.is_dark = function() {
                return uint_less_equal(this.sum_rgb(), 384);
            };
            SIMDopeColor.prototype.is_fully_transparent = function() {
                return uint_equal(this.a, 0);
            };
            SIMDopeColor.prototype.is_fully_opaque = function() {
                return uint_equal(this.a, 255);
            };
            SIMDopeColor.prototype.is_not_fully_transparent = function() {
                return !this.is_fully_transparent();
            };
            SIMDopeColor.prototype.is_not_fully_opaque = function() {
                return !this.is_fully_opaque();
            };

            SIMDopeColor.prototype.match_with = function(added_uint8x4, threshold_255) {
                "use strict";

                threshold_255 = typeof threshold_255 === "undefined" ? -1: clamp_uint8(threshold_255);
                if(threshold_255 === 1) {

                    return true;
                }else if(threshold_255 === 0){

                    return uint_equal(this.get_difference_with(added_uint8x4).sum_rgba(), 0);
                }else {

                    const diff_uint8x4 = this.get_difference_with(added_uint8x4);

                    if(threshold_255 !== -1) {

                        return (uint_less(diff_uint8x4.r, threshold_255) &&
                            uint_less(diff_uint8x4.g, threshold_255) &&
                            uint_less(diff_uint8x4.b, threshold_255) &&
                            uint_less(diff_uint8x4.a, threshold_255)) ? 1: 0;
                    }else {

                        return diff_uint8x4.sum_rgb() / 765 * Math.abs(1 - diff_uint8x4.a / 255);
                    }
                }
            }

            SIMDopeColor.prototype.set_r = function(r) {
                "use strict";
                var uint8a = this.subarray();
                uint8a[3] = clamp_uint8(r);
                return this;
            };
            SIMDopeColor.prototype.set_g = function(g) {
                "use strict";
                var uint8a = this.subarray();
                uint8a[2] = clamp_uint8(g);
                return this;
            };
            SIMDopeColor.prototype.set_b = function(b) {
                "use strict";
                var uint8a = this.subarray();
                uint8a[1] = clamp_uint8(b);
                return this;
            };
            SIMDopeColor.prototype.set_a = function(a) {
                "use strict";
                var uint8a = this.subarray();
                uint8a[0] = clamp_uint8(a);
                return this;
            };
            SIMDopeColor.prototype.multiply_a_255 = function(n) {
                "use strict";
                var uint8a = this.subarray();
                uint8a[0] = clamp_uint8(divide_255(multiply_uint(uint8a[0], n)));
                return this;
            };
            SIMDopeColor.prototype.copy = function(a) {
                "use strict";
                return SIMDopeColor(this.slice(0, 4));
            };
// get a the number object wile modifying property values
            SIMDopeColor.with_r = function(t, r) {
                "use strict";
                var ta = t.slice(0, 4);
                ta[3] = clamp_uint8(r);
                return SIMDopeColor(ta);
            };
            SIMDopeColor.with_g = function(t, g) {
                "use strict";
                var ta = t.slice(0, 4);
                ta[2] = clamp_uint8(g);
                return SIMDopeColor(ta);
            };
            SIMDopeColor.with_b = function(t, b) {
                "use strict";
                var ta = t.slice(0, 4);
                ta[1] = clamp_uint8(b);
                return SIMDopeColor(ta);
            };
            SIMDopeColor.with_a = function(t, a) {
                "use strict";
                var ta = t.slice(0, 4);
                ta[0] = clamp_uint8(a);
                return SIMDopeColor(ta);
            };
            SIMDopeColor.with_inverse = function(t) {
                "use strict";
                var ta = t.slice(0, 4);
                ta[3] = minus_uint(255 - ta[3]);
                ta[2] = minus_uint(255 - ta[2]);
                ta[1] = minus_uint(255 - ta[1]);
                ta[0] = minus_uint(255 - ta[0]);
                return SIMDopeColor(ta);
            };

// Get various operation on number object
            SIMDopeColor.sumarray = function(other, start, end) {
                "use strict";
                start = start | 0;
                start = min_uint(start, 3);
                end = end | 0; end = end || 4;
                end = min_uint(end, 4);

                var sum = 0;
                for(var i = start; uint_less(i, end); i = plus_uint(i, 1)) {
                    sum = plus_uint(sum, other[CONFIG_UINT8X4.charAt(i)]);
                }
                return sum;
            };

// from a given number object and a second one, test values and return boolean
            SIMDopeColor.row_is_equal = function(t, other) {
                return SIMDopeColor.new_bool(
                    uint_equal(t.r, other.r),
                    uint_equal(t.g, other.g),
                    uint_equal(t.b, other.b),
                    uint_equal(t.a, other.a),
                );
            };
            SIMDopeColor.row_is_greater = function(t, other) {
                return SIMDopeColor.new_bool(
                    uint_greater(t.r, other.r),
                    uint_greater(t.g, other.g),
                    uint_greater(t.b, other.b),
                    uint_greater(t.a, other.a),
                );
            };
            SIMDopeColor.row_is_less = function(t, other) {
                return SIMDopeColor.new_bool(
                    uint_less(t.r, other.r),
                    uint_less(t.g, other.g),
                    uint_less(t.b, other.b),
                    uint_less(t.a, other.a),
                );
            };
            SIMDopeColor.row_is_greater_equal = function(t, other) {
                return SIMDopeColor.new_bool(
                    uint_greater_equal(t.r, other.r),
                    uint_greater_equal(t.g, other.g),
                    uint_greater_equal(t.b, other.b),
                    uint_greater_equal(t.a, other.a),
                );
            };
            SIMDopeColor.row_is_less_equal = function(t, other) {
                return SIMDopeColor.new_bool(
                    uint_less_equal(t.r, other.r),
                    uint_less_equal(t.g, other.g),
                    uint_less_equal(t.b, other.b),
                    uint_less_equal(t.a, other.a),
                );
            };

            SIMDopeColor.row_get_difference = function(t, other) {
                return SIMDopeColor.new_of(
                    abs_int(t.r, other.r),
                    abs_int(t.g, other.g),
                    abs_int(t.b, other.b),
                    abs_int(t.a, other.a),
                );
            };

            SIMDopeColor.match = function(base_uint8x4, added_uint8x4, threshold_255) {
                "use strict";

                return base_uint8x4.match_with(added_uint8x4, threshold_255);
            }

            SIMDopeColor.blend = function(base_uint8x4, added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

                return base_uint8x4.copy().blend_with(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition);
            };

// From a given operation and number object perform the operation and return a the number object
            SIMDopeColor.plus = function(t, other) {
                var temp = new Uint8ClampedArray(4);
                temp[3] = clamp_uint8(min_int(255, plus_int(t.r, other.r)));
                temp[2] = clamp_uint8(min_int(255, plus_int(t.g, other.g)));
                temp[1] = clamp_uint8(min_int(255, plus_int(t.b, other.b)));
                temp[0] = clamp_uint8(min_int(255, plus_int(t.a, other.a)));
                return SIMDopeColor(temp);
            }
            SIMDopeColor.minus = function(t, other) {
                var temp = new Uint8ClampedArray(4);
                temp[3] = clamp_uint8(max_int(0, minus_int(t.r, other.r)));
                temp[2] = clamp_uint8(max_int(0, minus_int(t.g, other.g)));
                temp[1] = clamp_uint8(max_int(0, minus_int(t.b, other.b)));
                temp[0] = clamp_uint8(max_int(0, minus_int(t.a, other.a)));
                return SIMDopeColor(temp);
            }
            SIMDopeColor.average = function(t, other) {
                var temp = new Uint8ClampedArray(4);
                temp[3] = clamp_uint8(divide_uint(plus_int(t.r, other.r), 2));
                temp[2] = clamp_uint8(divide_uint(plus_int(t.g, other.g), 2));
                temp[1] = clamp_uint8(divide_uint(plus_int(t.b, other.b), 2));
                temp[0] = clamp_uint8(divide_uint(plus_int(t.a, other.a), 2));
                return SIMDopeColor(temp);
            }
            SIMDopeColor.merge_scale_of_255 = function(t1, of1, t2, of2) {

                return SIMDopeColor.merge(SIMDopeColor.scale_of_on_255(t1, of1, of1, of1, of1), SIMDopeColor.scale_of_on_255(t2, of2, of2, of2, of2));
            }

            SIMDopeColor.scale_of_on_255 = function(t, of_r, of_g, of_b, of_a) {
                var temp = new Uint8ClampedArray(4);
                temp[3] = clamp_int(divide_255(multiply_uint(t.r, of_r)), 0, 255);
                temp[2] = clamp_int(divide_255(multiply_uint(t.g, of_g)), 0, 255);
                temp[1] = clamp_int(divide_255(multiply_uint(t.b, of_b)), 0, 255);
                temp[0] = clamp_int(divide_255(multiply_uint(t.a, of_a)), 0, 255);
                return SIMDopeColor(temp);
            }

            SIMDopeColor.merge = function(t1, t2) {
                var temp = new Uint8ClampedArray(4);
                temp[3] = clamp_int(plus_uint(t1.r, t2.r), 0, 255);
                temp[2] = clamp_int(plus_uint(t1.g, t2.g), 0, 255);
                temp[1] = clamp_int(plus_uint(t1.b, t2.b),  0, 255);
                temp[0] = clamp_int(plus_uint(t1.a, t2.a),  0, 255);
                return SIMDopeColor(temp);
            }

            var SIMDopeColors = function(with_main_buffer){
                "use strict";

                if (!(this instanceof SIMDopeColors)) {
                    return new SIMDopeColors(with_main_buffer);
                }

                this.storage_uint8_array_ = new Uint8ClampedArray(("buffer" in with_main_buffer) ? with_main_buffer.buffer: with_main_buffer);
                this.storage_uint32_array_ = new Uint32Array(("buffer" in with_main_buffer) ? with_main_buffer.buffer: with_main_buffer);
            };

            Object.defineProperty(SIMDopeColors.prototype, 'length', {
                get: function() { "use strict"; return divide_four_uint(this.storage_uint8_array_.length); }
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
                    n = plus_uint(i, multiply_uint(n, 4));
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
                get: function() { "use strict"; return function (start, end){ start = start | 0; end = end | 0; return this.storage_uint8_array_.subarray(multiply_uint(start, 4), multiply_uint(end, 4)); }}
            });
            Object.defineProperty(SIMDopeColors.prototype, 'slice_uint8', {
                get: function() { "use strict"; return function (start, end){ start = start | 0; end = end | 0; return this.storage_uint8_array_.slice(multiply_uint(start, 4), multiply_uint(end, 4)); }}
            });

            SIMDopeColors.prototype.get_element = function (i) {
                i = i | 0;
                return SIMDopeColor(this.buffer, i);
            }
            SIMDopeColors.prototype.subarray = function (i, n) {
                i = i | 0;
                n = n | 0;
                return this.buffer_getUint8a(i, n);
            }

            SIMDopeColors.prototype.set_element = function (i, el) {
                i = i | 0;
                this.buffer_setUint32(i, el.uint32);
            }
            SIMDopeColors.prototype.set_uint32_element = function (i, uint32) {
                i = i | 0;
                uint32 = clamp_uint32(uint32);
                this.buffer_setUint32(i, uint32);
            }
            SIMDopeColors.prototype.get_uint32_element = function (i) {
                i = i | 0;
                return this.buffer_getUint32(i);
            }
            SIMDopeColors.prototype.get_sub_uint8a = function (i, n) {
                i = i | 0;
                n = n | 0;
                return this.buffer_getUint8a(multiply_uint(i, 4), n);
            }
            SIMDopeColors.prototype.get_slice_uint8a = function (i, n) {
                i = i | 0;
                n = n | 0;
                return this.buffer_getUint8a(multiply_uint(i, 4), n).slice(0, multiply_uint(n||1, 4));
            }
            SIMDopeColors.prototype.get_buffer = function (i, n) {
                i = i | 0;
                n = n | 0;
                return this.buffer_getUint8a(multiply_uint(i, 4), n).buffer;
            }

            var all_colors = new Set();

            var layers_pxls_colors = SIMDopeColors(_color_a);
            var pxl_layers_length = _layers.length | 0;
            var pxl_colors = SIMDopeColors(new ArrayBuffer(_color_l*4));
            var color = SIMDopeColor.new_zero();
            var big_scale = scale > 1;
            var compute_hex = big_scale || with_palette;

            try {

                if (typeof OffscreenCanvas === "undefined") {
                    throw new Error("Impossible to create OffscreenCanvas in this web environment.");
                }

                var canvas, ctx;
                if(scale > 1) {
                    canvas = new OffscreenCanvas(pxl_width * scale, pxl_height * scale);
                    ctx = canvas.getContext('2d');
                }

                for (var i = 0; (i|0) < (_color_l|0); i = (i+1)>>>0) {

                    color.set(pxl_colors.get_element(i));

                    for (var l = 0; (l|0) < (pxl_layers_length|0) ; l = (l+1)>>>0) {

                        if(!_layers[l].hidden) {

                            color.blend_with(layers_pxls_colors.get_element(l*_color_l+i|0), clamp_uint8(multiply_uint(_layers[l].opacity, 255)), false, false);
                        }
                    }

                    var color_hex = compute_hex ? color.hex: "";
                    all_colors.add(color_hex);
                    pxl_colors.set_element(i, color);

                    if(big_scale) {

                        var pos_x = i % pxl_width | 0;
                        var pos_y = (i - pos_x) / pxl_width | 0;
                        ctx.fillStyle = color_hex;
                        ctx.fillRect(pos_x * scale | 0, pos_y * scale | 0, 1 * scale | 0, 1 * scale | 0);
                    }
                }

                var image_data;

                if(big_scale) {

                    image_data = ctx.getImageData(0, 0, pxl_width * scale | 0, pxl_height * scale | 0);
                }else {

                    image_data = new ImageData(new Uint8ClampedArray(pxl_colors.slice_uint32(0, _color_l).reverse().buffer).reverse(), pxl_width, pxl_height);
                }

                ctx = null; canvas = null;

                createImageBitmap(image_data).then(function(btmp_i) {

                    var canvas2 = new OffscreenCanvas(pxl_width * scale, pxl_height * scale);
                    var ctx2 = canvas2.getContext("bitmaprenderer");
                    ctx2.transferFromImageBitmap(btmp_i);
                    btmp_i.close();

                    canvas2.convertToBlob({type: "image/png"}).then(function(blob) {

                        var data_url = new FileReaderSync().readAsDataURL(blob);
                        if(with_palette) {

                            resolve(Object.assign({}, {"url": data_url.toString(), "colors": Array.from(all_colors)}));
                        }else {
                            resolve(Object.assign({}, {"url": data_url.toString()}));
                        }

                        data_url = null; all_colors = null; blob = null;

                    });
                    ctx2 = null; canvas2 = null;
                });
                image_data = null;

            }catch (e) {

                var canvas = document.createElement("canvas");
                canvas.width = pxl_width * scale;
                canvas.height = pxl_height * scale;
                var ctx = canvas.getContext('2d');

                for (var i = 0; (i|0) < (_color_l|0); i = (i+1)>>>0) {

                    color.set(pxl_colors.get_element(i));

                    for (var l = 0; (l|0) < (pxl_layers_length|0) ; l = (l+1)>>>0) {

                        if(!_layers[l].hidden) {

                            color.blend_with(layers_pxls_colors.get_element(l*_color_l + i), clamp_uint8(multiply_uint(_layers[l].opacity, 255)), false, false);
                        }
                    }

                    var color_hex = compute_hex ? color.hex: "";
                    all_colors.add(color_hex);
                    pxl_colors.set_element(i, color);

                    if(big_scale) {

                        var pos_x = i % pxl_width | 0;
                        var pos_y = (i - pos_x) / pxl_width | 0;
                        ctx.fillStyle = color_hex;
                        ctx.fillRect(pos_x * scale | 0, pos_y * scale | 0, 1 * scale | 0, 1 * scale | 0);
                    }
                }

                if(scale === 1) {

                    ctx.putImageData(new ImageData(new Uint8ClampedArray(pxl_colors.slice_uint32(0, _color_l).reverse().buffer).reverse(), pxl_width, pxl_height), 0, 0);
                }

                if(with_palette) {

                    resolve(Object.assign({}, {"url": canvas.toDataURL("image/png"), "colors": Array.from(all_colors)}));
                    ctx = null; canvas = null; all_colors = null;
                }else {

                    resolve(Object.assign({}, {"url": canvas.toDataURL("image/png")}));
                    ctx = null; canvas = null;
                }
            }
        })};*/



const B64PngCanvas = {

    _create_state: function (
        pool,
        pxl_width,
        pxl_height,
        _s_pxls,
        _s_pxl_colors,
        _layers,
        scale,
        with_palette
    ) {
        _s_pxls = Array.from(_s_pxls);
        _s_pxl_colors = Array.from(_s_pxl_colors);
        _layers = Array.from(_layers);
        pxl_width = pxl_width | 0;
        pxl_height = pxl_height | 0

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const asyncs = `var t=async function(t,e,r,n,i,u,a){return new Promise((function(s){t|=0,e|=0,u|=0;var o={unary_neg:t=>-t,unary_bitwise_not:t=>~t,unary_logical_not:t=>!t,boolean_and:(t,e)=>t&&e,binary_and:(t,e)=>t&e,binary_or:(t,e)=>t|e,binary_xor:(t,e)=>t^e,binary_add:(t,e)=>t+e,binary_sub:(t,e)=>t-e,binary_mul:(t,e)=>t*e,binary_div:(t,e)=>t/e,binary_equal:(t,e)=>t==e,binary_not_equal:(t,e)=>t!=e,binary_less:(t,e)=>t<e,binary_less_equal:(t,e)=>t<=e,binary_greater:(t,e)=>t>e,binary_greater_equal:(t,e)=>t>=e,binary_shift_left:(t,e)=>t<<e,binary_shift_right_arithmetic:(t,e)=>t>>e,binary_shift_right_logical:(t,e)=>t>>>e,min_num:(t,e)=>t!=t?e:e!=e?t:Math.min(t,e),max_num:(t,e)=>t!=t?e:e!=e?t:Math.max(t,e),modulo_int:(t,e)=>t%e|0,modulo_uint:(t,e)=>(t%e|0)>>>0,plus_int:(t,e)=>t+e|0,minus_int:(t,e)=>t-e|0,plus_uint:(t,e)=>(t+e|0)>>>0,minus_uint:(t,e)=>(t-e|0)>>>0,multiply_int:(t,e)=>t*e|0,divide_int:(t,e)=>t/e|0,multiply_uint:(t,e)=>(t*e|0)>>>0,divide_uint:(t,e)=>(t/e|0)>>>0,divide_four_uint:t=>(t>>2|0)>>>0,abs_int:t=>(0|t)<0?(0|-t)>>>0:(0|t)>>>0,max_int:(t,e)=>(t|=0)>(e|=0)?e:t,min_int:(t,e)=>(t|=0)>(e|=0)?t:e,max_uint:(t,e)=>(t=(0|t)>>>0)>(e=(0|e)>>>0)?e:t,min_uint:(t,e)=>(t|=0)>(e|=0)?t:e,clamp_int:(t,e,r)=>t=(t=(t|=0)-(t-(r|=0)&r-t>>31)|0)-(t-(e|=0)&t-e>>31)|0,clamp_uint8:t=>255&(0|t),inverse_255:t=>255&(255-t|0),divide_255:t=>255&(t/255|0),clamp_uint32:t=>4294967295&(0|t),int_equal:(t,e)=>(0|t)==(0|e),int_not_equal:(t,e)=>(0|t)!=(0|e),int_less:(t,e)=>(0|t)<(0|e),int_less_equal:(t,e)=>(0|t)<=(0|e),int_greater:(t,e)=>(0|t)>(0|e),int_greater_equal:(t,e)=>(0|t)>=(0|e),uint_equal:(t,e)=>(0|t)>>>0==(0|e)>>>0,uint_not_equal:(t,e)=>(0|t)>>>0!=(0|e)>>>0,uint_less:(t,e)=>(0|t)>>>0<(0|e)>>>0,uint_less_equal:(t,e)=>(0|t)>>>0<=(0|e)>>>0,uint_greater:(t,e)=>(0|t)>>>0>(0|e)>>>0,uint_greater_equal:(t,e)=>(0|t)>>>0>=(0|e)>>>0,format_int:t=>0|t,format_uint:t=>(0|t)>>>0},{unary_neg:_,unary_bitwise_not:f,unary_logical_not:c,boolean_and:l,binary_and:y,binary_or:p,binary_xor:g,binary_add:b,binary_sub:h,binary_mul:m,binary_div:d,binary_equal:w,binary_not_equal:v,binary_less:U,binary_less_equal:O,binary_greater:q,binary_greater_equal:A,binary_shift_left:j,binary_shift_right_arithmetic:C,binary_shift_right_logical:P,min_num:x,max_num:D,modulo_int:I,modulo_uint:S,plus_int:B,minus_int:R,plus_uint:M,minus_uint:k,multiply_int:L,divide_int:z,multiply_uint:E,divide_uint:F,divide_four_uint:T,abs_int:G,max_int:H,min_int:J,max_uint:K,min_uint:N,clamp:Q,clamp_int:V,clamp_uint8:W,divide_255:X,inverse_255:Y,clamp_uint32:Z,int_equal:$,int_not_equal:tt,int_less:et,int_less_equal:rt,int_greater:nt,int_greater_equal:it,uint_equal:ut,uint_not_equal:at,uint_less:st,uint_less_equal:ot,uint_greater:_t,uint_greater_equal:ft,format_int:ct,format_uint:lt}=o,yt=function(t,e){"use strict";if(e=e||0,!(this instanceof yt))return new yt(t,e);t instanceof Uint8ClampedArray?this.storage_uint8_=t:this.storage_uint8_=new Uint8ClampedArray("buffer"in t?t.buffer:t,E(e,4))};yt.new_zero=function(){"use strict";return yt(new ArrayBuffer(4))},yt.new_splat=function(t){"use strict";var e=new Uint8ClampedArray(4);return e.fill(W(t)),yt(e)},yt.new_of=function(t,e,r,n){"use strict";var i=new Uint8ClampedArray(4);return i[3]=W(t),i[2]=W(e),i[1]=W(r),i[0]=W(n),yt(i)},yt.new_safe_of=function(t,e,r,n){"use strict";var i=new Uint8ClampedArray(4);return i[3]=V(t,0,255),i[2]=V(e,0,255),i[1]=V(r,0,255),i[0]=V(n,0,255),yt(i)},yt.new_from=function(t){"use strict";return yt(t)},yt.new_array=function(t){"use strict";var e=new Uint8ClampedArray(4);return e[3]=W(t[0]),e[2]=W(t[1]),e[1]=W(t[2]),e[0]=W(t[3]),yt(e)},yt.new_array_safe=function(t){"use strict";var e=new Uint8ClampedArray(4);return e[3]=W(V(t[0],0,255)),e[2]=W(V(t[1],0,255)),e[1]=W(V(t[2],0,255)),e[0]=W(V(t[3],0,255)),yt(e)},yt.new_bool=function(t,e,r,n){"use strict";var i=new Uint8ClampedArray(4);return i[3]=(0|t)>0?1:0,i[2]=(0|e)>0?1:0,i[1]=(0|r)>0?1:0,i[0]=(0|n)>0?1:0,yt(i)},yt.new_uint32=function(t){"use strict";var e=new Uint8ClampedArray(4);return e[0]=255&t,e[1]=t>>>8&255,e[2]=t>>>16&255,e[3]=t>>>24&255,yt(e)},yt.new_hsla=function(t,e,r,n){"use strict";t=F(t,360),e=F(e,100),r=F(r,100),n=F(n,100);var i,u,a=0;if(0===e)i=u=a=r;else{function _(t,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+6*(e-t)*r:r<.5?e:r<2/3?t+(e-t)*(2/3-r)*6:t}var s=r<.5?r*(1+e):r+e-r*e,o=2*r-s;i=_(o,s,t+1/3),u=_(o,s,t),a=_(o,s,t-1/3)}return yt.new_of(E(i,255),E(u,255),E(a,255),E(n,255))},Object.defineProperty(yt.prototype,"r",{get:function(){"use strict";return W(this.storage_uint8_[3])}}),Object.defineProperty(yt.prototype,"g",{get:function(){"use strict";return W(this.storage_uint8_[2])}}),Object.defineProperty(yt.prototype,"b",{get:function(){"use strict";return W(this.storage_uint8_[1])}}),Object.defineProperty(yt.prototype,"a",{get:function(){"use strict";return W(this.storage_uint8_[0])}}),Object.defineProperty(yt.prototype,"uint32",{get:function(){"use strict";return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0]|0)>>>0}}),Object.defineProperty(yt.prototype,"hex",{get:function(){"use strict";return"#".concat("00000000".concat(this.uint32.toString(16)).slice(-8))}}),Object.defineProperty(yt.prototype,"hsl",{get:function(){"use strict";var t=W(this.storage_uint8_[3]),e=W(this.storage_uint8_[2]),r=W(this.storage_uint8_[1]),n=W(this.storage_uint8_[0]);t=+t/255,e=+e/255,r=+r/255,n=+n/255;var i,u,a=Math.max(t,e,r),s=Math.min(t,e,r),o=(a+s)/2;if(a==s)i=u=0;else{var _=a-s;switch(u=o>.5?_/(2-a-s):_/(a+s),a){case t:i=(e-r)/_+(e<r?6:0);break;case e:i=(r-t)/_+2;break;case r:i=(t-e)/_+4}i/=6}return Uint16Array.of(E(i,360),E(u,100),E(o,100),E(n,100))}}),Object.defineProperty(yt.prototype,"offset",{get:function(){"use strict";return T(this.storage_uint8_.byteOffset)}}),Object.defineProperty(yt.prototype,"buffer",{get:function(){"use strict";return this.storage_uint8_.buffer}}),Object.defineProperty(yt.prototype,"set",{get:function(){"use strict";return function(t){t instanceof yt?this.storage_uint8_.set(t.subarray(0,4)):"subarray"in t?this.storage_uint8_.set(t):"buffer"in t?this.storage_uint8_.set(t.buffer):this.storage_uint8_.set(t)}}}),Object.defineProperty(yt.prototype,"subarray",{get:function(){"use strict";return function(t,e){return this.storage_uint8_.subarray(t,e)}}}),Object.defineProperty(yt.prototype,"slice",{get:function(){"use strict";return function(t,e){return this.storage_uint8_.slice(t,e)}}}),yt.prototype.set_scale_of_on_255=function(t,e,r,n){var i=Uint8ClampedArray.of(X(E(this.r,t)),X(E(this.g,e)),X(E(this.b,r)),X(E(this.a,n)));return this.set(i),this},yt.prototype.scale_of_on_255=function(t,e,r,n){var i=Uint8ClampedArray.of(X(E(this.r,t)),X(E(this.g,e)),X(E(this.b,r)),X(E(this.a,n)));return yt(i)},yt.prototype.blend_with=function(t,e,r,n){if(e=W(e),r=r||!1,n=n||!1,t.multiply_a_255(e),r&&t.is_fully_transparent())this.set(new ArrayBuffer(4));else if(this.is_not_fully_transparent()&&t.is_not_fully_opaque()){var i=n?F(M(this.a,e),2):Y(X(E(Y(t.a),Y(this.a))));this.set(yt.merge_scale_of_255(t,F(E(t.a,255),i),this,X(E(this.a,F(E(Y(t.a),255),i)))).set_a(i))}else this.set(t);return this},yt.prototype.get_difference_with=function(t){return yt.new_of(G(this.r,t.r),G(this.g,t.g),G(this.b,t.b),G(this.a,t.a))},yt.prototype.sum_rgba=function(){return M(M(this.r,this.g),M(this.b,this.a))},yt.prototype.sum_rgb=function(){return M(M(this.r,this.g),this.b)},yt.prototype.is_dark=function(){return ot(this.sum_rgb(),384)},yt.prototype.is_fully_transparent=function(){return ut(this.a,0)},yt.prototype.is_fully_opaque=function(){return ut(this.a,255)},yt.prototype.is_not_fully_transparent=function(){return!this.is_fully_transparent()},yt.prototype.is_not_fully_opaque=function(){return!this.is_fully_opaque()},yt.prototype.match_with=function(t,e){"use strict";if(1===(e=void 0===e?-1:W(e)))return!0;if(0===e)return ut(this.get_difference_with(t).sum_rgba(),0);{const r=this.get_difference_with(t);return-1!==e?st(r.r,e)&&st(r.g,e)&&st(r.b,e)&&st(r.a,e)?1:0:r.sum_rgb()/765*Math.abs(1-r.a/255)}},yt.prototype.set_r=function(t){"use strict";return this.subarray()[3]=W(t),this},yt.prototype.set_g=function(t){"use strict";return this.subarray()[2]=W(t),this},yt.prototype.set_b=function(t){"use strict";return this.subarray()[1]=W(t),this},yt.prototype.set_a=function(t){"use strict";return this.subarray()[0]=W(t),this},yt.prototype.multiply_a_255=function(t){"use strict";var e=this.subarray();return e[0]=W(X(E(e[0],t))),this},yt.prototype.copy=function(){"use strict";return yt(this.slice(0,4))},yt.with_r=function(t,e){"use strict";var r=t.slice(0,4);return r[3]=W(e),yt(r)},yt.with_g=function(t,e){"use strict";var r=t.slice(0,4);return r[2]=W(e),yt(r)},yt.with_b=function(t,e){"use strict";var r=t.slice(0,4);return r[1]=W(e),yt(r)},yt.with_a=function(t,e){"use strict";var r=t.slice(0,4);return r[0]=W(e),yt(r)},yt.with_inverse=function(t){"use strict";var e=t.slice(0,4);return e[3]=k(255-e[3]),e[2]=k(255-e[2]),e[1]=k(255-e[1]),e[0]=k(255-e[0]),yt(e)},yt.sumarray=function(t,e,r){"use strict";e=N(e|=0,3),r=N(r=(r|=0)||4,4);for(var n=0,i=e;st(i,r);i=M(i,1))n=M(n,t["rgba".charAt(i)]);return n},yt.row_is_equal=function(t,e){return yt.new_bool(ut(t.r,e.r),ut(t.g,e.g),ut(t.b,e.b),ut(t.a,e.a))},yt.row_is_greater=function(t,e){return yt.new_bool(_t(t.r,e.r),_t(t.g,e.g),_t(t.b,e.b),_t(t.a,e.a))},yt.row_is_less=function(t,e){return yt.new_bool(st(t.r,e.r),st(t.g,e.g),st(t.b,e.b),st(t.a,e.a))},yt.row_is_greater_equal=function(t,e){return yt.new_bool(ft(t.r,e.r),ft(t.g,e.g),ft(t.b,e.b),ft(t.a,e.a))},yt.row_is_less_equal=function(t,e){return yt.new_bool(ot(t.r,e.r),ot(t.g,e.g),ot(t.b,e.b),ot(t.a,e.a))},yt.row_get_difference=function(t,e){return yt.new_of(G(t.r,e.r),G(t.g,e.g),G(t.b,e.b),G(t.a,e.a))},yt.match=function(t,e,r){"use strict";return t.match_with(e,r)},yt.blend=function(t,e,r,n,i){return t.copy().blend_with(e,r,n,i)},yt.plus=function(t,e){var r=new Uint8ClampedArray(4);return r[3]=W(J(255,B(t.r,e.r))),r[2]=W(J(255,B(t.g,e.g))),r[1]=W(J(255,B(t.b,e.b))),r[0]=W(J(255,B(t.a,e.a))),yt(r)},yt.minus=function(t,e){var r=new Uint8ClampedArray(4);return r[3]=W(H(0,R(t.r,e.r))),r[2]=W(H(0,R(t.g,e.g))),r[1]=W(H(0,R(t.b,e.b))),r[0]=W(H(0,R(t.a,e.a))),yt(r)},yt.average=function(t,e){var r=new Uint8ClampedArray(4);return r[3]=W(F(B(t.r,e.r),2)),r[2]=W(F(B(t.g,e.g),2)),r[1]=W(F(B(t.b,e.b),2)),r[0]=W(F(B(t.a,e.a),2)),yt(r)},yt.merge_scale_of_255=function(t,e,r,n){return yt.merge(yt.scale_of_on_255(t,e,e,e,e),yt.scale_of_on_255(r,n,n,n,n))},yt.scale_of_on_255=function(t,e,r,n,i){var u=new Uint8ClampedArray(4);return u[3]=V(X(E(t.r,e)),0,255),u[2]=V(X(E(t.g,r)),0,255),u[1]=V(X(E(t.b,n)),0,255),u[0]=V(X(E(t.a,i)),0,255),yt(u)},yt.merge=function(t,e){var r=new Uint8ClampedArray(4);return r[3]=V(M(t.r,e.r),0,255),r[2]=V(M(t.g,e.g),0,255),r[1]=V(M(t.b,e.b),0,255),r[0]=V(M(t.a,e.a),0,255),yt(r)};var pt=function(t){"use strict";if(!(this instanceof pt))return new pt(t);this.storage_uint8_array_=new Uint8ClampedArray("buffer"in t?t.buffer:t),this.storage_uint32_array_=new Uint32Array("buffer"in t?t.buffer:t)};Object.defineProperty(pt.prototype,"length",{get:function(){"use strict";return T(this.storage_uint8_array_.length)}}),Object.defineProperty(pt.prototype,"buffer",{get:function(){"use strict";return this.storage_uint8_array_.buffer}}),Object.defineProperty(pt.prototype,"buffer_setUint8",{get:function(){"use strict";return function(t,e){return t|=0,e|=0,this.storage_uint8_array_[t]=W(e)}}}),Object.defineProperty(pt.prototype,"buffer_getUint8",{get:function(){"use strict";return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(pt.prototype,"buffer_getUint8a",{get:function(){"use strict";return function(t,e){return e=M(t|=0,E(e=(e|=0)||1,4)),this.storage_uint8_array_.subarray(t,e)}}}),Object.defineProperty(pt.prototype,"buffer_setUint32",{get:function(){"use strict";return function(t,e){this.storage_uint32_array_[0|t]=Z(e)}}}),Object.defineProperty(pt.prototype,"buffer_getUint32",{get:function(){"use strict";return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(pt.prototype,"subarray_uint32",{get:function(){"use strict";return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.subarray(t,e)}}}),Object.defineProperty(pt.prototype,"slice_uint32",{get:function(){"use strict";return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.slice(t,e)}}}),Object.defineProperty(pt.prototype,"subarray_uint8",{get:function(){"use strict";return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.subarray(E(t,4),E(e,4))}}}),Object.defineProperty(pt.prototype,"slice_uint8",{get:function(){"use strict";return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.slice(E(t,4),E(e,4))}}}),pt.prototype.get_element=function(t){return t|=0,yt(this.buffer,t)},pt.prototype.subarray=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(t,e)},pt.prototype.set_element=function(t,e){t|=0,this.buffer_setUint32(t,e.uint32)},pt.prototype.set_uint32_element=function(t,e){t|=0,e=Z(e),this.buffer_setUint32(t,e)},pt.prototype.get_uint32_element=function(t){return t|=0,this.buffer_getUint32(t)},pt.prototype.get_sub_uint8a=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(E(t,4),e)},pt.prototype.get_slice_uint8a=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(E(t,4),e).slice(0,E(e||1,4))},pt.prototype.get_buffer=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(E(t,4),e).buffer};var gt=new Set,bt=pt(r),ht=0|i.length,mt=pt(new ArrayBuffer(4*n)),dt=yt.new_zero(),wt=u>1,vt=wt||a;try{if("undefined"==typeof OffscreenCanvas)throw new Error("Impossible to create OffscreenCanvas in this web environment.");var Ut;u>1&&(Pt=(Ct=new OffscreenCanvas(t*u,e*u)).getContext("2d"));for(var Ot=0;(0|Ot)<(0|n);Ot=Ot+1>>>0){dt.set(mt.get_element(Ot));for(var qt=0;(0|qt)<(0|ht);qt=qt+1>>>0)i[qt].hidden||dt.blend_with(bt.get_element(qt*n+Ot|0),W(E(i[qt].opacity,255)),!1,!1);var At=vt?dt.hex:"";if(gt.add(At),mt.set_element(Ot,dt),wt){var jt=(Ot-(xt=Ot%t|0))/t|0;Pt.fillStyle=At,Pt.fillRect(xt*u|0,jt*u|0,1*u|0,1*u|0)}}Ut=wt?Pt.getImageData(0,0,t*u|0,e*u|0):new ImageData(new Uint8ClampedArray(mt.slice_uint32(0,n).reverse().buffer).reverse(),t,e),Pt=null,Ct=null,createImageBitmap(Ut).then((function(r){var n=new OffscreenCanvas(t*u,e*u),i=n.getContext("bitmaprenderer");i.transferFromImageBitmap(r),r.close(),n.convertToBlob({type:"image/png"}).then((function(t){var e=(new FileReaderSync).readAsDataURL(t);s(a?Object.assign({},{url:e.toString(),colors:Array.from(gt)}):Object.assign({},{url:e.toString()})),e=null,gt=null,t=null})),i=null,n=null})),Ut=null}catch(Dt){var Ct;(Ct=document.createElement("canvas")).width=t*u,Ct.height=e*u;var Pt=Ct.getContext("2d");for(Ot=0;(0|Ot)<(0|n);Ot=Ot+1>>>0){dt.set(mt.get_element(Ot));for(qt=0;(0|qt)<(0|ht);qt=qt+1>>>0)i[qt].hidden||dt.blend_with(bt.get_element(qt*n+Ot),W(E(i[qt].opacity,255)),!1,!1);At=vt?dt.hex:"";if(gt.add(At),mt.set_element(Ot,dt),wt){var xt;jt=(Ot-(xt=Ot%t|0))/t|0;Pt.fillStyle=At,Pt.fillRect(xt*u|0,jt*u|0,1*u|0,1*u|0)}}1===u&&Pt.putImageData(new ImageData(new Uint8ClampedArray(mt.slice_uint32(0,n).reverse().buffer).reverse(),t,e),0,0),a?(s(Object.assign({},{url:Ct.toDataURL("image/png"),colors:Array.from(gt)})),Pt=null,Ct=null,gt=null):(s(Object.assign({},{url:Ct.toDataURL("image/png")})),Pt=null,Ct=null)}}))};`
            + "return t;";


        var layers_pxls_colors_length = pxl_width * pxl_height | 0;
        var layers_pxls_colors = new Uint32Array(_s_pxls.length * layers_pxls_colors_length);

        for(var i = 0; i < _s_pxls.length; i++) {

            const p =  Uint32Array.from(_s_pxls[i]);
            const pc = Uint32Array.from(_s_pxl_colors[i]);

            layers_pxls_colors.set(p.map(function(pci){ return pc[pci]; }), layers_pxls_colors_length * i);
        }

        return Object.assign({}, {
            // Compute properties
            asyncf: new AsyncFunction(asyncs)(),
            workerp: pool,
            w: pxl_width,
            h: pxl_height,
            sp: layers_pxls_colors.buffer,
            spc: layers_pxls_colors_length,
            l: _layers,
            s: scale,
            wp: with_palette
        });
    },

    from: function(pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette){

        let cs = this._create_state;
        let s = cs(
            pool,
            pxl_width,
            pxl_height,
            _s_pxls,
            _s_pxl_colors,
            _layers,
            scale,
            with_palette
        );

        return {
            // Methods
            new(pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette) {

                s = cs( pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette);
            },
            destroy(callback_function = function(){}) {
                if(s !== null) {

                     s = null;
                     callback_function();

                }else {
                    callback_function("ok");
                }
            },
            render() {

                if(s !== null) {
                    return s.workerp.exec(

                        s.asyncf, [s.w, s.h, s.sp, s.spc, s.l, s.s, s.wp]
                    ).catch(function(e) {

                        return s.asyncf(s.w, s.h, s.sp, s.spc, s.l, s.s, s.wp);

                    }).timeout(15 * 1000);
                }else {

                    return Promise.reject();
                }
            },
        };
    }
};

module.exports = B64PngCanvas;