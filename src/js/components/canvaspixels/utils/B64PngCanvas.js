"use strict";

       /* var fu = async function(
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

 */
/*

// Order of the color component stored (in order to not meld with endianness when creating a list from a buffer, it is mostly like "reversed")
            var CONFIG_UINT8X4 = "rgba";

// X11 color names
            var WX3 = {
                aliceblue: '#f0f8ff',
                antiquewhite: '#faebd7',
                aqua: '#00ffff',
                aquamarine: '#7fffd4',
                azure: '#f0ffff',
                beige: '#f5f5dc',
                bisque: '#ffe4c4',
                black: '#000000',
                blanchedalmond: '#ffebcd',
                blue: '#0000ff',
                blueviolet: '#8a2be2',
                brown: '#a52a2a',
                burlywood: '#deb887',
                cadetblue: '#5f9ea0',
                chartreuse: '#7fff00',
                chocolate: '#d2691e',
                coral: '#ff7f50',
                cornflower: '#6495ed',
                cornflowerblue: '#6495ed',
                cornsilk: '#fff8dc',
                crimson: '#dc143c',
                cyan: '#00ffff',
                darkblue: '#00008b',
                darkcyan: '#008b8b',
                darkgoldenrod: '#b8860b',
                darkgray: '#a9a9a9',
                darkgreen: '#006400',
                darkgrey: '#a9a9a9',
                darkkhaki: '#bdb76b',
                darkmagenta: '#8b008b',
                darkolivegreen: '#556b2f',
                darkorange: '#ff8c00',
                darkorchid: '#9932cc',
                darkred: '#8b0000',
                darksalmon: '#e9967a',
                darkseagreen: '#8fbc8f',
                darkslateblue: '#483d8b',
                darkslategray: '#2f4f4f',
                darkslategrey: '#2f4f4f',
                darkturquoise: '#00ced1',
                darkviolet: '#9400d3',
                deeppink: '#ff1493',
                deepskyblue: '#00bfff',
                dimgray: '#696969',
                dimgrey: '#696969',
                dodgerblue: '#1e90ff',
                firebrick: '#b22222',
                floralwhite: '#fffaf0',
                forestgreen: '#228b22',
                fuchsia: '#ff00ff',
                gainsboro: '#dcdcdc',
                ghostwhite: '#f8f8ff',
                gold: '#ffd700',
                goldenrod: '#daa520',
                gray: '#808080',
                green: '#008000',
                greenyellow: '#adff2f',
                grey: '#808080',
                honeydew: '#f0fff0',
                hotpink: '#ff69b4',
                indianred: '#cd5c5c',
                indigo: '#4b0082',
                ivory: '#fffff0',
                khaki: '#f0e68c',
                laserlemon: '#ffff54',
                lavender: '#e6e6fa',
                lavenderblush: '#fff0f5',
                lawngreen: '#7cfc00',
                lemonchiffon: '#fffacd',
                lightblue: '#add8e6',
                lightcoral: '#f08080',
                lightcyan: '#e0ffff',
                lightgoldenrod: '#fafad2',
                lightgoldenrodyellow: '#fafad2',
                lightgray: '#d3d3d3',
                lightgreen: '#90ee90',
                lightgrey: '#d3d3d3',
                lightpink: '#ffb6c1',
                lightsalmon: '#ffa07a',
                lightseagreen: '#20b2aa',
                lightskyblue: '#87cefa',
                lightslategray: '#778899',
                lightslategrey: '#778899',
                lightsteelblue: '#b0c4de',
                lightyellow: '#ffffe0',
                lime: '#00ff00',
                limegreen: '#32cd32',
                linen: '#faf0e6',
                magenta: '#ff00ff',
                maroon: '#800000',
                maroon2: '#7f0000',
                maroon3: '#b03060',
                mediumaquamarine: '#66cdaa',
                mediumblue: '#0000cd',
                mediumorchid: '#ba55d3',
                mediumpurple: '#9370db',
                mediumseagreen: '#3cb371',
                mediumslateblue: '#7b68ee',
                mediumspringgreen: '#00fa9a',
                mediumturquoise: '#48d1cc',
                mediumvioletred: '#c71585',
                midnightblue: '#191970',
                mintcream: '#f5fffa',
                mistyrose: '#ffe4e1',
                moccasin: '#ffe4b5',
                navajowhite: '#ffdead',
                navy: '#000080',
                oldlace: '#fdf5e6',
                olive: '#808000',
                olivedrab: '#6b8e23',
                orange: '#ffa500',
                orangered: '#ff4500',
                orchid: '#da70d6',
                palegoldenrod: '#eee8aa',
                palegreen: '#98fb98',
                paleturquoise: '#afeeee',
                palevioletred: '#db7093',
                papayawhip: '#ffefd5',
                peachpuff: '#ffdab9',
                peru: '#cd853f',
                pink: '#ffc0cb',
                plum: '#dda0dd',
                powderblue: '#b0e0e6',
                purple: '#800080',
                purple2: '#7f007f',
                purple3: '#a020f0',
                rebeccapurple: '#663399',
                red: '#ff0000',
                rosybrown: '#bc8f8f',
                royalblue: '#4169e1',
                saddlebrown: '#8b4513',
                salmon: '#fa8072',
                sandybrown: '#f4a460',
                seagreen: '#2e8b57',
                seashell: '#fff5ee',
                sienna: '#a0522d',
                silver: '#c0c0c0',
                skyblue: '#87ceeb',
                slateblue: '#6a5acd',
                slategray: '#708090',
                slategrey: '#708090',
                snow: '#fffafa',
                springgreen: '#00ff7f',
                steelblue: '#4682b4',
                tan: '#d2b48c',
                teal: '#008080',
                thistle: '#d8bfd8',
                tomato: '#ff6347',
                turquoise: '#40e0d0',
                violet: '#ee82ee',
                wheat: '#f5deb3',
                white: '#ffffff',
                whitesmoke: '#f5f5f5',
                yellow: '#ffff00',
                yellowgreen: '#9acd32'
            };

// Format hexadecimal
            var F_HEX = function(hex) { // Supports #fff (short rgb), #fff0 (short rgba), #e2e2e2 (full rgb) and #e2e2e2ff (full rgba)
                "use strict";
                const l = hex.length | 0;
                if(typeof hex === "undefined"){

                    return "#00000000";
                } else {

                    if(WX3.hasOwnProperty(hex)){return WX3[hex] + "ff";}
                    let a = "", b = "", c = "", d = "";
                    let formatted = "#12345678";

                    switch(l) {

                        case 9:
                            formatted = hex;
                            break;
                        case 7:
                            formatted = hex.concat("ff");
                            break;
                        case 5:
                            a = hex.charAt(1); b = hex.charAt(2); c = hex.charAt(3); d = hex.charAt(4);
                            formatted =  "#".concat(a, a, b, b, c, c, d, d);
                            break;
                        case 4:
                            a = hex.charAt(1); b = hex.charAt(2); c = hex.charAt(3);
                            formatted = "#".concat(a, a, b, b, c, c, "ff");
                            break;
                    }

                    return formatted;
                }
            };

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

            SIMDopeColor.new_hex = function (hex) {

                hex = F_HEX(hex);
                SIMDopeColor.new_uint32(parseInt(hex.slice(1), 16));
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

                        function blob_to_base64(blob) {
                          return new Promise(function(resolve, _) {
                            var reader = new FileReader();
                            reader.onload = function(){return resolve(reader.result)};
                            reader.readAsDataURL(blob);
                          })
                        }

                        return blob_to_base64(blob).then(function(data_url) {

                            if(with_palette) {

                                resolve(Object.assign({}, {"url": data_url.toString(), "colors": Array.from(all_colors)}));

                                data_url = null; all_colors = null;
                            }else {

                                resolve(Object.assign({}, {"url": data_url.toString()}));
                                data_url = null; all_colors = null;
                            }
                        });
                        blob = null;
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

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const asyncs = `var fu=async function(t,e,r,n,i,a,u){return new Promise((function(f){t|=0,e|=0,a|=0;var s={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflower:"#6495ed",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",laserlemon:"#ffff54",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrod:"#fafad2",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",maroon2:"#7f0000",maroon3:"#b03060",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",purple2:"#7f007f",purple3:"#a020f0",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},o={unary_neg:t=>-t,unary_bitwise_not:t=>~t,unary_logical_not:t=>!t,boolean_and:(t,e)=>t&&e,binary_and:(t,e)=>t&e,binary_or:(t,e)=>t|e,binary_xor:(t,e)=>t^e,binary_add:(t,e)=>t+e,binary_sub:(t,e)=>t-e,binary_mul:(t,e)=>t*e,binary_div:(t,e)=>t/e,binary_equal:(t,e)=>t==e,binary_not_equal:(t,e)=>t!=e,binary_less:(t,e)=>t<e,binary_less_equal:(t,e)=>t<=e,binary_greater:(t,e)=>t>e,binary_greater_equal:(t,e)=>t>=e,binary_shift_left:(t,e)=>t<<e,binary_shift_right_arithmetic:(t,e)=>t>>e,binary_shift_right_logical:(t,e)=>t>>>e,min_num:(t,e)=>t!=t?e:e!=e?t:Math.min(t,e),max_num:(t,e)=>t!=t?e:e!=e?t:Math.max(t,e),modulo_int:(t,e)=>t%e|0,modulo_uint:(t,e)=>(t%e|0)>>>0,plus_int:(t,e)=>t+e|0,minus_int:(t,e)=>t-e|0,plus_uint:(t,e)=>(t+e|0)>>>0,minus_uint:(t,e)=>(t-e|0)>>>0,multiply_int:(t,e)=>t*e|0,divide_int:(t,e)=>t/e|0,multiply_uint:(t,e)=>(t*e|0)>>>0,divide_uint:(t,e)=>(t/e|0)>>>0,divide_four_uint:t=>(t>>2|0)>>>0,abs_int:t=>(0|t)<0?(0|-t)>>>0:(0|t)>>>0,max_int:(t,e)=>(t|=0)>(e|=0)?e:t,min_int:(t,e)=>(t|=0)>(e|=0)?t:e,max_uint:(t,e)=>(t=(0|t)>>>0)>(e=(0|e)>>>0)?e:t,min_uint:(t,e)=>(t|=0)>(e|=0)?t:e,clamp_int:(t,e,r)=>t=(t=(t|=0)-(t-(r|=0)&r-t>>31)|0)-(t-(e|=0)&t-e>>31)|0,clamp_uint8:t=>255&(0|t),inverse_255:t=>255&(255-t|0),divide_255:t=>255&(t/255|0),clamp_uint32:t=>4294967295&(0|t),int_equal:(t,e)=>(0|t)==(0|e),int_not_equal:(t,e)=>(0|t)!=(0|e),int_less:(t,e)=>(0|t)<(0|e),int_less_equal:(t,e)=>(0|t)<=(0|e),int_greater:(t,e)=>(0|t)>(0|e),int_greater_equal:(t,e)=>(0|t)>=(0|e),uint_equal:(t,e)=>(0|t)>>>0==(0|e)>>>0,uint_not_equal:(t,e)=>(0|t)>>>0!=(0|e)>>>0,uint_less:(t,e)=>(0|t)>>>0<(0|e)>>>0,uint_less_equal:(t,e)=>(0|t)>>>0<=(0|e)>>>0,uint_greater:(t,e)=>(0|t)>>>0>(0|e)>>>0,uint_greater_equal:(t,e)=>(0|t)>>>0>=(0|e)>>>0,format_int:t=>0|t,format_uint:t=>(0|t)>>>0},{unary_neg:_,unary_bitwise_not:c,unary_logical_not:l,boolean_and:b,binary_and:g,binary_or:d,binary_xor:y,binary_add:p,binary_sub:h,binary_mul:m,binary_div:w,binary_equal:v,binary_not_equal:k,binary_less:q,binary_less_equal:U,binary_greater:A,binary_greater_equal:O,binary_shift_left:j,binary_shift_right_arithmetic:C,binary_shift_right_logical:P,min_num:x,max_num:I,modulo_int:D,modulo_uint:B,plus_int:R,minus_int:S,plus_uint:M,minus_uint:z,multiply_int:L,divide_int:E,multiply_uint:F,divide_uint:T,divide_four_uint:G,abs_int:H,max_int:J,min_int:K,max_uint:N,min_uint:Q,clamp:V,clamp_int:W,clamp_uint8:X,divide_255:Y,inverse_255:Z,clamp_uint32:$,int_equal:tt,int_not_equal:et,int_less:rt,int_less_equal:nt,int_greater:it,int_greater_equal:at,uint_equal:ut,uint_not_equal:ft,uint_less:st,uint_less_equal:ot,uint_greater:_t,uint_greater_equal:ct,format_int:lt,format_uint:bt}=o,gt=function(t,e){"use strict";if(e=e||0,!(this instanceof gt))return new gt(t,e);t instanceof Uint8ClampedArray?this.storage_uint8_=t:this.storage_uint8_=new Uint8ClampedArray("buffer"in t?t.buffer:t,F(e,4))};gt.new_zero=function(){"use strict";return gt(new ArrayBuffer(4))},gt.new_splat=function(t){"use strict";var e=new Uint8ClampedArray(4);return e.fill(X(t)),gt(e)},gt.new_of=function(t,e,r,n){"use strict";var i=new Uint8ClampedArray(4);return i[3]=X(t),i[2]=X(e),i[1]=X(r),i[0]=X(n),gt(i)},gt.new_safe_of=function(t,e,r,n){"use strict";var i=new Uint8ClampedArray(4);return i[3]=W(t,0,255),i[2]=W(e,0,255),i[1]=W(r,0,255),i[0]=W(n,0,255),gt(i)},gt.new_from=function(t){"use strict";return gt(t)},gt.new_array=function(t){"use strict";var e=new Uint8ClampedArray(4);return e[3]=X(t[0]),e[2]=X(t[1]),e[1]=X(t[2]),e[0]=X(t[3]),gt(e)},gt.new_array_safe=function(t){"use strict";var e=new Uint8ClampedArray(4);return e[3]=X(W(t[0],0,255)),e[2]=X(W(t[1],0,255)),e[1]=X(W(t[2],0,255)),e[0]=X(W(t[3],0,255)),gt(e)},gt.new_bool=function(t,e,r,n){"use strict";var i=new Uint8ClampedArray(4);return i[3]=(0|t)>0?1:0,i[2]=(0|e)>0?1:0,i[1]=(0|r)>0?1:0,i[0]=(0|n)>0?1:0,gt(i)},gt.new_uint32=function(t){"use strict";var e=new Uint8ClampedArray(4);return e[0]=255&t,e[1]=t>>>8&255,e[2]=t>>>16&255,e[3]=t>>>24&255,gt(e)},gt.new_hsla=function(t,e,r,n){"use strict";t=T(t,360),e=T(e,100),r=T(r,100),n=T(n,100);var i,a,u=0;if(0===e)i=a=u=r;else{function o(t,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+6*(e-t)*r:r<.5?e:r<2/3?t+(e-t)*(2/3-r)*6:t}var f=r<.5?r*(1+e):r+e-r*e,s=2*r-f;i=o(s,f,t+1/3),a=o(s,f,t),u=o(s,f,t-1/3)}return gt.new_of(F(i,255),F(a,255),F(u,255),F(n,255))},gt.new_hex=function(t){t=function(t){"use strict";const e=0|t.length;if(void 0===t)return"#00000000";{if(s.hasOwnProperty(t))return s[t]+"ff";let r="",n="",i="",a="",u="#12345678";switch(e){case 9:u=t;break;case 7:u=t.concat("ff");break;case 5:r=t.charAt(1),n=t.charAt(2),i=t.charAt(3),a=t.charAt(4),u="#".concat(r,r,n,n,i,i,a,a);break;case 4:r=t.charAt(1),n=t.charAt(2),i=t.charAt(3),u="#".concat(r,r,n,n,i,i,"ff")}return u}}(t),gt.new_uint32(parseInt(t.slice(1),16))},Object.defineProperty(gt.prototype,"r",{get:function(){"use strict";return X(this.storage_uint8_[3])}}),Object.defineProperty(gt.prototype,"g",{get:function(){"use strict";return X(this.storage_uint8_[2])}}),Object.defineProperty(gt.prototype,"b",{get:function(){"use strict";return X(this.storage_uint8_[1])}}),Object.defineProperty(gt.prototype,"a",{get:function(){"use strict";return X(this.storage_uint8_[0])}}),Object.defineProperty(gt.prototype,"uint32",{get:function(){"use strict";return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0]|0)>>>0}}),Object.defineProperty(gt.prototype,"hex",{get:function(){"use strict";return"#".concat("00000000".concat(this.uint32.toString(16)).slice(-8))}}),Object.defineProperty(gt.prototype,"hsl",{get:function(){"use strict";var t=X(this.storage_uint8_[3]),e=X(this.storage_uint8_[2]),r=X(this.storage_uint8_[1]),n=X(this.storage_uint8_[0]);t=+t/255,e=+e/255,r=+r/255,n=+n/255;var i,a,u=Math.max(t,e,r),f=Math.min(t,e,r),s=(u+f)/2;if(u==f)i=a=0;else{var o=u-f;switch(a=s>.5?o/(2-u-f):o/(u+f),u){case t:i=(e-r)/o+(e<r?6:0);break;case e:i=(r-t)/o+2;break;case r:i=(t-e)/o+4}i/=6}return Uint16Array.of(F(i,360),F(a,100),F(s,100),F(n,100))}}),Object.defineProperty(gt.prototype,"offset",{get:function(){"use strict";return G(this.storage_uint8_.byteOffset)}}),Object.defineProperty(gt.prototype,"buffer",{get:function(){"use strict";return this.storage_uint8_.buffer}}),Object.defineProperty(gt.prototype,"set",{get:function(){"use strict";return function(t){t instanceof gt?this.storage_uint8_.set(t.subarray(0,4)):"subarray"in t?this.storage_uint8_.set(t):"buffer"in t?this.storage_uint8_.set(t.buffer):this.storage_uint8_.set(t)}}}),Object.defineProperty(gt.prototype,"subarray",{get:function(){"use strict";return function(t,e){return this.storage_uint8_.subarray(t,e)}}}),Object.defineProperty(gt.prototype,"slice",{get:function(){"use strict";return function(t,e){return this.storage_uint8_.slice(t,e)}}}),gt.prototype.set_scale_of_on_255=function(t,e,r,n){var i=Uint8ClampedArray.of(Y(F(this.r,t)),Y(F(this.g,e)),Y(F(this.b,r)),Y(F(this.a,n)));return this.set(i),this},gt.prototype.scale_of_on_255=function(t,e,r,n){var i=Uint8ClampedArray.of(Y(F(this.r,t)),Y(F(this.g,e)),Y(F(this.b,r)),Y(F(this.a,n)));return gt(i)},gt.prototype.blend_with=function(t,e,r,n){if(e=X(e),r=r||!1,n=n||!1,t.multiply_a_255(e),r&&t.is_fully_transparent())this.set(new ArrayBuffer(4));else if(this.is_not_fully_transparent()&&t.is_not_fully_opaque()){var i=n?T(M(this.a,e),2):Z(Y(F(Z(t.a),Z(this.a))));this.set(gt.merge_scale_of_255(t,T(F(t.a,255),i),this,Y(F(this.a,T(F(Z(t.a),255),i)))).set_a(i))}else this.set(t);return this},gt.prototype.get_difference_with=function(t){return gt.new_of(H(this.r,t.r),H(this.g,t.g),H(this.b,t.b),H(this.a,t.a))},gt.prototype.sum_rgba=function(){return M(M(this.r,this.g),M(this.b,this.a))},gt.prototype.sum_rgb=function(){return M(M(this.r,this.g),this.b)},gt.prototype.is_dark=function(){return ot(this.sum_rgb(),384)},gt.prototype.is_fully_transparent=function(){return ut(this.a,0)},gt.prototype.is_fully_opaque=function(){return ut(this.a,255)},gt.prototype.is_not_fully_transparent=function(){return!this.is_fully_transparent()},gt.prototype.is_not_fully_opaque=function(){return!this.is_fully_opaque()},gt.prototype.match_with=function(t,e){"use strict";if(1===(e=void 0===e?-1:X(e)))return!0;if(0===e)return ut(this.get_difference_with(t).sum_rgba(),0);{const r=this.get_difference_with(t);return-1!==e?st(r.r,e)&&st(r.g,e)&&st(r.b,e)&&st(r.a,e)?1:0:r.sum_rgb()/765*Math.abs(1-r.a/255)}},gt.prototype.set_r=function(t){"use strict";return this.subarray()[3]=X(t),this},gt.prototype.set_g=function(t){"use strict";return this.subarray()[2]=X(t),this},gt.prototype.set_b=function(t){"use strict";return this.subarray()[1]=X(t),this},gt.prototype.set_a=function(t){"use strict";return this.subarray()[0]=X(t),this},gt.prototype.multiply_a_255=function(t){"use strict";var e=this.subarray();return e[0]=X(Y(F(e[0],t))),this},gt.prototype.copy=function(){"use strict";return gt(this.slice(0,4))},gt.with_r=function(t,e){"use strict";var r=t.slice(0,4);return r[3]=X(e),gt(r)},gt.with_g=function(t,e){"use strict";var r=t.slice(0,4);return r[2]=X(e),gt(r)},gt.with_b=function(t,e){"use strict";var r=t.slice(0,4);return r[1]=X(e),gt(r)},gt.with_a=function(t,e){"use strict";var r=t.slice(0,4);return r[0]=X(e),gt(r)},gt.with_inverse=function(t){"use strict";var e=t.slice(0,4);return e[3]=z(255-e[3]),e[2]=z(255-e[2]),e[1]=z(255-e[1]),e[0]=z(255-e[0]),gt(e)},gt.sumarray=function(t,e,r){"use strict";e=Q(e|=0,3),r=Q(r=(r|=0)||4,4);for(var n=0,i=e;st(i,r);i=M(i,1))n=M(n,t["rgba".charAt(i)]);return n},gt.row_is_equal=function(t,e){return gt.new_bool(ut(t.r,e.r),ut(t.g,e.g),ut(t.b,e.b),ut(t.a,e.a))},gt.row_is_greater=function(t,e){return gt.new_bool(_t(t.r,e.r),_t(t.g,e.g),_t(t.b,e.b),_t(t.a,e.a))},gt.row_is_less=function(t,e){return gt.new_bool(st(t.r,e.r),st(t.g,e.g),st(t.b,e.b),st(t.a,e.a))},gt.row_is_greater_equal=function(t,e){return gt.new_bool(ct(t.r,e.r),ct(t.g,e.g),ct(t.b,e.b),ct(t.a,e.a))},gt.row_is_less_equal=function(t,e){return gt.new_bool(ot(t.r,e.r),ot(t.g,e.g),ot(t.b,e.b),ot(t.a,e.a))},gt.row_get_difference=function(t,e){return gt.new_of(H(t.r,e.r),H(t.g,e.g),H(t.b,e.b),H(t.a,e.a))},gt.match=function(t,e,r){"use strict";return t.match_with(e,r)},gt.blend=function(t,e,r,n,i){return t.copy().blend_with(e,r,n,i)},gt.plus=function(t,e){var r=new Uint8ClampedArray(4);return r[3]=X(K(255,R(t.r,e.r))),r[2]=X(K(255,R(t.g,e.g))),r[1]=X(K(255,R(t.b,e.b))),r[0]=X(K(255,R(t.a,e.a))),gt(r)},gt.minus=function(t,e){var r=new Uint8ClampedArray(4);return r[3]=X(J(0,S(t.r,e.r))),r[2]=X(J(0,S(t.g,e.g))),r[1]=X(J(0,S(t.b,e.b))),r[0]=X(J(0,S(t.a,e.a))),gt(r)},gt.average=function(t,e){var r=new Uint8ClampedArray(4);return r[3]=X(T(R(t.r,e.r),2)),r[2]=X(T(R(t.g,e.g),2)),r[1]=X(T(R(t.b,e.b),2)),r[0]=X(T(R(t.a,e.a),2)),gt(r)},gt.merge_scale_of_255=function(t,e,r,n){return gt.merge(gt.scale_of_on_255(t,e,e,e,e),gt.scale_of_on_255(r,n,n,n,n))},gt.scale_of_on_255=function(t,e,r,n,i){var a=new Uint8ClampedArray(4);return a[3]=W(Y(F(t.r,e)),0,255),a[2]=W(Y(F(t.g,r)),0,255),a[1]=W(Y(F(t.b,n)),0,255),a[0]=W(Y(F(t.a,i)),0,255),gt(a)},gt.merge=function(t,e){var r=new Uint8ClampedArray(4);return r[3]=W(M(t.r,e.r),0,255),r[2]=W(M(t.g,e.g),0,255),r[1]=W(M(t.b,e.b),0,255),r[0]=W(M(t.a,e.a),0,255),gt(r)};var dt=function(t){"use strict";if(!(this instanceof dt))return new dt(t);this.storage_uint8_array_=new Uint8ClampedArray("buffer"in t?t.buffer:t),this.storage_uint32_array_=new Uint32Array("buffer"in t?t.buffer:t)};Object.defineProperty(dt.prototype,"length",{get:function(){"use strict";return G(this.storage_uint8_array_.length)}}),Object.defineProperty(dt.prototype,"buffer",{get:function(){"use strict";return this.storage_uint8_array_.buffer}}),Object.defineProperty(dt.prototype,"buffer_setUint8",{get:function(){"use strict";return function(t,e){return t|=0,e|=0,this.storage_uint8_array_[t]=X(e)}}}),Object.defineProperty(dt.prototype,"buffer_getUint8",{get:function(){"use strict";return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(dt.prototype,"buffer_getUint8a",{get:function(){"use strict";return function(t,e){return e=M(t|=0,F(e=(e|=0)||1,4)),this.storage_uint8_array_.subarray(t,e)}}}),Object.defineProperty(dt.prototype,"buffer_setUint32",{get:function(){"use strict";return function(t,e){this.storage_uint32_array_[0|t]=$(e)}}}),Object.defineProperty(dt.prototype,"buffer_getUint32",{get:function(){"use strict";return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(dt.prototype,"subarray_uint32",{get:function(){"use strict";return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.subarray(t,e)}}}),Object.defineProperty(dt.prototype,"slice_uint32",{get:function(){"use strict";return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.slice(t,e)}}}),Object.defineProperty(dt.prototype,"subarray_uint8",{get:function(){"use strict";return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.subarray(F(t,4),F(e,4))}}}),Object.defineProperty(dt.prototype,"slice_uint8",{get:function(){"use strict";return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.slice(F(t,4),F(e,4))}}}),dt.prototype.get_element=function(t){return t|=0,gt(this.buffer,t)},dt.prototype.subarray=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(t,e)},dt.prototype.set_element=function(t,e){t|=0,this.buffer_setUint32(t,e.uint32)},dt.prototype.set_uint32_element=function(t,e){t|=0,e=$(e),this.buffer_setUint32(t,e)},dt.prototype.get_uint32_element=function(t){return t|=0,this.buffer_getUint32(t)},dt.prototype.get_sub_uint8a=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(F(t,4),e)},dt.prototype.get_slice_uint8a=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(F(t,4),e).slice(0,F(e||1,4))},dt.prototype.get_buffer=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(F(t,4),e).buffer};var yt=new Set,pt=dt(r),ht=0|i.length,mt=dt(new ArrayBuffer(4*n)),wt=gt.new_zero(),vt=a>1,kt=vt||u;try{if("undefined"==typeof OffscreenCanvas)throw new Error("Impossible to create OffscreenCanvas in this web environment.");var qt;a>1&&(Pt=(Ct=new OffscreenCanvas(t*a,e*a)).getContext("2d"));for(var Ut=0;(0|Ut)<(0|n);Ut=Ut+1>>>0){wt.set(mt.get_element(Ut));for(var At=0;(0|At)<(0|ht);At=At+1>>>0)i[At].hidden||wt.blend_with(pt.get_element(At*n+Ut|0),X(F(i[At].opacity,255)),!1,!1);var Ot=kt?wt.hex:"";if(yt.add(Ot),mt.set_element(Ut,wt),vt){var jt=(Ut-(xt=Ut%t|0))/t|0;Pt.fillStyle=Ot,Pt.fillRect(xt*a|0,jt*a|0,1*a|0,1*a|0)}}qt=vt?Pt.getImageData(0,0,t*a|0,e*a|0):new ImageData(new Uint8ClampedArray(mt.slice_uint32(0,n).reverse().buffer).reverse(),t,e),Pt=null,Ct=null,createImageBitmap(qt).then((function(r){var n=new OffscreenCanvas(t*a,e*a),i=n.getContext("bitmaprenderer");i.transferFromImageBitmap(r),r.close(),n.convertToBlob({type:"image/png"}).then((function(t){return function(t){return new Promise((function(e){var r=new FileReader;r.onload=function(){return e(r.result)},r.readAsDataURL(t)}))}(t).then((function(t){u?(f(Object.assign({},{"url":t.toString(),"colors":Array.from(yt)})),t=null,yt=null):(f(Object.assign({},{"url":t.toString()})),t=null,yt=null)}))})),i=null,n=null})),qt=null}catch(It){var Ct;(Ct=document.createElement("canvas")).width=t*a,Ct.height=e*a;var Pt=Ct.getContext("2d");for(Ut=0;(0|Ut)<(0|n);Ut=Ut+1>>>0){wt.set(mt.get_element(Ut));for(At=0;(0|At)<(0|ht);At=At+1>>>0)i[At].hidden||wt.blend_with(pt.get_element(At*n+Ut),X(F(i[At].opacity,255)),!1,!1);Ot=kt?wt.hex:"";if(yt.add(Ot),mt.set_element(Ut,wt),vt){var xt;jt=(Ut-(xt=Ut%t|0))/t|0;Pt.fillStyle=Ot,Pt.fillRect(xt*a|0,jt*a|0,1*a|0,1*a|0)}}1===a&&Pt.putImageData(new ImageData(new Uint8ClampedArray(mt.slice_uint32(0,n).reverse().buffer).reverse(),t,e),0,0),u?(f(Object.assign({},{"url":Ct.toDataURL("image/png"),"colors":Array.from(yt)})),Pt=null,Ct=null,yt=null):(f(Object.assign({},{"url":Ct.toDataURL("image/png")})),Pt=null,Ct=null)}}))};`
            + "return fu;";

        var layers_pxls_colors_length = _s_pxls[0].length;
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