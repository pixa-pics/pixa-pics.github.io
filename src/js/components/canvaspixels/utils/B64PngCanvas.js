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
        var fu = function(
            pxl_width,
            pxl_height,
            _color_a,
            _color_l,
            _layers,
            scale,
            with_palette
        ) {return new Promise(function(resolve, reject) {

            pxl_width = pxl_width | 0;
            pxl_height = pxl_height | 0;

            scale = scale | 0;
            "use strict";

            function png_encode_id(image_data) {

                var Base64 = {

                    // private property
                    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

                    // public method for encoding
                    encode: function (input) {
                        var output = "";
                        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                        var i = 0;

                        while ((i | 0) < (input.length | 0)) {
                            chr1 = input.charCodeAt(i++);
                            chr2 = input.charCodeAt(i++);
                            chr3 = input.charCodeAt(i++);

                            enc1 = chr1 >> 2;
                            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                            enc4 = chr3 & 63;

                            if (isNaN(chr2)) {
                                enc3 = enc4 = 64;
                            } else if (isNaN(chr3)) {
                                enc4 = 64;
                            }

                            output = output +
                                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
                        }

                        return output;
                    }
                };

                var DEFLATE_METHOD = String.fromCharCode(0x78, 0x01),
                    CRC_TABLE = [],
                    SIGNATURE = String.fromCharCode(137, 80, 78, 71, 13, 10, 26, 10),
                    NO_FILTER = String.fromCharCode(0),

                    make_crc_table = function () {
                        var n, c, k;

                        for (n = 0; n < 256; n++) {
                            c = n;
                            for (k = 0; k < 8; k++) {
                                if (c & 1) {
                                    c = 0xedb88320 ^ (c >>> 1);
                                } else {
                                    c = c >>> 1;
                                }
                            }
                            CRC_TABLE[n] = c;
                        }
                    },

                    inflateStore = function (data) {
                        var MAX_STORE_LENGTH = 65535,
                            storeBuffer = '',
                            i,
                            remaining,
                            blockType;

                        for (i = 0; i < data.length; i += MAX_STORE_LENGTH) {
                            remaining = data.length - i;
                            blockType = '';

                            if (remaining <= MAX_STORE_LENGTH) {
                                blockType = String.fromCharCode(0x01);
                            } else {
                                remaining = MAX_STORE_LENGTH;
                                blockType = String.fromCharCode(0x00);
                            }
                            // little-endian
                            storeBuffer += blockType + String.fromCharCode((remaining & 0xFF), (remaining & 0xFF00) >>> 8);
                            storeBuffer += String.fromCharCode(((~remaining) & 0xFF), ((~remaining) & 0xFF00) >>> 8);

                            storeBuffer += data.substring(i, i + remaining);
                        }

                        return storeBuffer;
                    },

                    adler32 = function (data) {
                        var MOD_ADLER = 65521,
                            a = 1,
                            b = 0,
                            i;

                        for (i = 0; (i | 0) < (data.length | 0); i = (i + 1 | 0) >>> 0) {
                            a = (a + data.charCodeAt(i)) % MOD_ADLER;
                            b = (b + a) % MOD_ADLER;
                        }

                        return (b << 16) | a;
                    },

                    update_crc = function (crc, buf) {
                        var c = crc, n, b;

                        for (n = 0; (n | 0) < (buf.length | 0); n = (n + 1 | 0) >>> 0) {
                            b = buf.charCodeAt(n);
                            c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
                        }
                        return c;
                    },

                    crc = function crc(buf) {
                        return update_crc(0xffffffff, buf) ^ 0xffffffff;
                    },

                    dwordAsString = function (dword) {
                        return String.fromCharCode((dword & 0xFF000000) >>> 24, (dword & 0x00FF0000) >>> 16, (dword & 0x0000FF00) >>> 8, (dword & 0x000000FF));
                    },

                    createChunk = function (length, type, data) {
                        var CRC = crc(type + data);

                        return dwordAsString(length) +
                            type +
                            data +
                            dwordAsString(CRC);
                    },

                    IEND,

                    createIHDR = function (width, height) {
                        var IHDRdata;

                        IHDRdata = dwordAsString(width);
                        IHDRdata += dwordAsString(height);

                        // bit depth
                        IHDRdata += String.fromCharCode(8);
                        // color type: 6=truecolor with alpha
                        IHDRdata += String.fromCharCode(6);
                        // compression method: 0=deflate, only allowed value
                        IHDRdata += String.fromCharCode(0);
                        // filtering: 0=adaptive, only allowed value
                        IHDRdata += String.fromCharCode(0);
                        // interlacing: 0=none
                        IHDRdata += String.fromCharCode(0);

                        return createChunk(13, 'IHDR', IHDRdata);
                    },

                    png = function (width, height, rgba) {
                        var IHDR = createIHDR(width, height),
                            IDAT,
                            scanlines = '',
                            scanline,
                            y,
                            x,
                            compressedScanlines;

                        for (y = 0; (y | 0) < (rgba.length | 0); y = (y + width * 4 | 0) >>> 0) {
                            scanline = NO_FILTER;
                            for (x = 0; (x | 0) < (width * 4 | 0); x = (x + 1 | 0) >>> 0) {
                                scanline += String.fromCharCode(rgba[y + x] & 0xff);
                            }
                            scanlines += scanline;
                        }

                        compressedScanlines = DEFLATE_METHOD + inflateStore(scanlines) + dwordAsString(adler32(scanlines));

                        IDAT = createChunk(compressedScanlines.length, 'IDAT', compressedScanlines);

                        return SIGNATURE + IHDR + IDAT + IEND;
                    };

                make_crc_table();
                IEND = createChunk(0, 'IEND', '');

                return "data:image/png;base64," + Base64.encode(png(image_data.width, image_data.height, image_data.data));
            }


// Order of the color component stored (in order to not meld with endianness when creating a list from a buffer, it is mostly like "reversed")
            var CONFIG_UINT8X4 = "rgba";

            var operators = {
                unary_neg(a) {
                    return -a;
                },
                unary_bitwise_not(a) {
                    return ~a;
                },
                unary_logical_not(a) {
                    return !a;
                },
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
                    return (n | 0) & 0xFFFFFFFF;
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
            var SIMDopeColor = function (with_main_buffer, offset_4bytes) {
                "use strict";
                offset_4bytes = offset_4bytes || 0;
                if (!(this instanceof SIMDopeColor)) {
                    return new SIMDopeColor(with_main_buffer, offset_4bytes);
                }

                if (with_main_buffer instanceof Uint8ClampedArray) {

                    this.storage_uint8_ = with_main_buffer;
                } else {

                    this.storage_uint8_ = new Uint8ClampedArray("buffer" in with_main_buffer ? with_main_buffer.buffer : with_main_buffer, multiply_uint(offset_4bytes, 4));
                }
            };

// NEW PARTICULAR : Number object other means of varruct
            SIMDopeColor.new_zero = function () {
                "use strict";
                return SIMDopeColor(new ArrayBuffer(4));
            };
            SIMDopeColor.new_splat = function (n) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca.fill(clamp_uint8(n));
                return SIMDopeColor(uint8ca);
            };
            SIMDopeColor.new_of = function (r, g, b, a) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[3] = clamp_uint8(r);
                uint8ca[2] = clamp_uint8(g);
                uint8ca[1] = clamp_uint8(b);
                uint8ca[0] = clamp_uint8(a);
                return SIMDopeColor(uint8ca);
            };
            SIMDopeColor.new_safe_of = function (r, g, b, a) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[3] = clamp_int(r, 0, 255);
                uint8ca[2] = clamp_int(g, 0, 255);
                uint8ca[1] = clamp_int(b, 0, 255);
                uint8ca[0] = clamp_int(a, 0, 255);
                return SIMDopeColor(uint8ca);
            };
            SIMDopeColor.new_from = function (other) {
                "use strict";
                return SIMDopeColor(other);
            };

            SIMDopeColor.new_array = function (array) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[3] = clamp_uint8(array[0]);
                uint8ca[2] = clamp_uint8(array[1]);
                uint8ca[1] = clamp_uint8(array[2]);
                uint8ca[0] = clamp_uint8(array[3]);
                return SIMDopeColor(uint8ca);
            };

            SIMDopeColor.new_array_safe = function (array) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[3] = clamp_uint8(clamp_int(array[0], 0, 255));
                uint8ca[2] = clamp_uint8(clamp_int(array[1], 0, 255));
                uint8ca[1] = clamp_uint8(clamp_int(array[2], 0, 255));
                uint8ca[0] = clamp_uint8(clamp_int(array[3], 0, 255));
                return SIMDopeColor(uint8ca);
            };

            SIMDopeColor.new_bool = function (r, g, b, a) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[3] = (r | 0) > 0 ? 0x1 : 0x0;
                uint8ca[2] = (g | 0) > 0 ? 0x1 : 0x0;
                uint8ca[1] = (b | 0) > 0 ? 0x1 : 0x0;
                uint8ca[0] = (a | 0) > 0 ? 0x1 : 0x0;
                return SIMDopeColor(uint8ca);
            };

            SIMDopeColor.new_uint32 = function (n) {
                "use strict";
                var uint8ca = new Uint8ClampedArray(4);
                uint8ca[0] = n & 0xff;
                uint8ca[1] = (n >>> 8) & 0xff;
                uint8ca[2] = (n >>> 16) & 0xff;
                uint8ca[3] = (n >>> 24) & 0xff;
                return SIMDopeColor(uint8ca);
            };

            SIMDopeColor.new_hsla = function (h, s, l, a) {
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
                get: function () {
                    "use strict";
                    return clamp_uint8(this.storage_uint8_[3]);
                },
            });
            Object.defineProperty(SIMDopeColor.prototype, 'g', {
                get: function () {
                    "use strict";
                    return clamp_uint8(this.storage_uint8_[2]);
                },
            });
            Object.defineProperty(SIMDopeColor.prototype, 'b', {
                get: function () {
                    "use strict";
                    return clamp_uint8(this.storage_uint8_[1]);
                },
            });
            Object.defineProperty(SIMDopeColor.prototype, 'a', {
                get: function () {
                    "use strict";
                    return clamp_uint8(this.storage_uint8_[0]);
                },
            });

            Object.defineProperty(SIMDopeColor.prototype, 'uint32', {
                get: function () {
                    "use strict";
                    return ((this.storage_uint8_[3] << 24) | (this.storage_uint8_[2] << 16) | (this.storage_uint8_[1] << 8) | this.storage_uint8_[0] | 0) >>> 0;
                }
            });

            Object.defineProperty(SIMDopeColor.prototype, 'hex', {
                get: function () {
                    "use strict";
                    return "#".concat("00000000".concat(this.uint32.toString(16)).slice(-8));
                }
            });

            Object.defineProperty(SIMDopeColor.prototype, 'hsl', {
                get: function () {
                    "use strict";
                    var r = clamp_uint8(this.storage_uint8_[3]);
                    var g = clamp_uint8(this.storage_uint8_[2]);
                    var b = clamp_uint8(this.storage_uint8_[1]);
                    var a = clamp_uint8(this.storage_uint8_[0]);

                    r = +r / 255, g = +g / 255, b = +b / 255, a = +a / 255;

                    var max = Math.max(r, g, b), min = Math.min(r, g, b);
                    var h, s, l = (max + min) / 2;
                    if (max == min) {
                        h = s = 0; // achromatic
                    } else {
                        var d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch (max) {
                            case r:
                                h = (g - b) / d + (g < b ? 6 : 0);
                                break;
                            case g:
                                h = (b - r) / d + 2;
                                break;
                            case b:
                                h = (r - g) / d + 4;
                                break;
                        }
                        h /= 6;
                    }
                    return Uint16Array.of(multiply_uint(h, 360), multiply_uint(s, 100), multiply_uint(l, 100), multiply_uint(a, 100));
                }
            });

            Object.defineProperty(SIMDopeColor.prototype, 'offset', {
                get: function () {
                    "use strict";
                    return divide_four_uint(this.storage_uint8_.byteOffset);
                }
            });

            Object.defineProperty(SIMDopeColor.prototype, 'buffer', {
                get: function () {
                    "use strict";
                    return this.storage_uint8_.buffer;
                }
            });

            Object.defineProperty(SIMDopeColor.prototype, 'set', {
                get: function () {
                    "use strict";
                    return function (with_buffer) {

                        if (with_buffer instanceof SIMDopeColor) {

                            this.storage_uint8_.set(with_buffer.subarray(0, 4));
                        } else if ("subarray" in with_buffer) {

                            this.storage_uint8_.set(with_buffer);
                        } else if ("buffer" in with_buffer) {

                            this.storage_uint8_.set(with_buffer.buffer);
                        } else {

                            this.storage_uint8_.set(with_buffer);
                        }
                    }
                }
            });
            Object.defineProperty(SIMDopeColor.prototype, 'subarray', {
                get: function () {
                    "use strict";
                    return function (start, end) {
                        return this.storage_uint8_.subarray(start, end);
                    }
                }
            });
            Object.defineProperty(SIMDopeColor.prototype, 'slice', {
                get: function () {
                    "use strict";
                    return function (start, end) {
                        return this.storage_uint8_.slice(start, end);
                    }
                }
            });

            SIMDopeColor.prototype.set_scale_of_on_255 = function (of_r, of_g, of_b, of_a) {
                var temp = Uint8ClampedArray.of(
                    divide_255(multiply_uint(this.r, of_r)),
                    divide_255(multiply_uint(this.g, of_g)),
                    divide_255(multiply_uint(this.b, of_b)),
                    divide_255(multiply_uint(this.a, of_a))
                );
                this.set(temp);
                return this;
            }

            SIMDopeColor.prototype.scale_of_on_255 = function (of_r, of_g, of_b, of_a) {
                var temp = Uint8ClampedArray.of(
                    divide_255(multiply_uint(this.r, of_r)),
                    divide_255(multiply_uint(this.g, of_g)),
                    divide_255(multiply_uint(this.b, of_b)),
                    divide_255(multiply_uint(this.a, of_a))
                );
                return SIMDopeColor(temp);
            }

            SIMDopeColor.prototype.blend_with = function (added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

                amount_alpha = clamp_uint8(amount_alpha);
                should_return_transparent = should_return_transparent || false;
                alpha_addition = alpha_addition || false;

                added_uint8x4.multiply_a_255(amount_alpha);
                if (should_return_transparent && added_uint8x4.is_fully_transparent()) {

                    this.set(new ArrayBuffer(4));
                } else if (this.is_not_fully_transparent() && added_uint8x4.is_not_fully_opaque()) {

                    var alpha = alpha_addition ?
                        divide_uint(plus_uint(this.a, amount_alpha), 2) :
                        inverse_255(divide_255(multiply_uint(inverse_255(added_uint8x4.a), inverse_255(this.a))));

                    this.set(SIMDopeColor.merge_scale_of_255(
                        added_uint8x4, divide_uint(multiply_uint(added_uint8x4.a, 255), alpha),
                        this, divide_255(multiply_uint(this.a, divide_uint(multiply_uint(inverse_255(added_uint8x4.a), 255), alpha)))
                        ).set_a(alpha)
                    );
                } else {

                    this.set(added_uint8x4);
                }

                return this;
            };

            SIMDopeColor.prototype.get_difference_with = function (other) {
                return SIMDopeColor.new_of(
                    abs_int(this.r, other.r),
                    abs_int(this.g, other.g),
                    abs_int(this.b, other.b),
                    abs_int(this.a, other.a),
                );
            };

            SIMDopeColor.prototype.sum_rgba = function () {
                return plus_uint(plus_uint(this.r, this.g), plus_uint(this.b, this.a));
            };

            SIMDopeColor.prototype.sum_rgb = function () {
                return plus_uint(plus_uint(this.r, this.g), this.b);
            };

            SIMDopeColor.prototype.is_dark = function () {
                return uint_less_equal(this.sum_rgb(), 384);
            };
            SIMDopeColor.prototype.is_fully_transparent = function () {
                return uint_equal(this.a, 0);
            };
            SIMDopeColor.prototype.is_fully_opaque = function () {
                return uint_equal(this.a, 255);
            };
            SIMDopeColor.prototype.is_not_fully_transparent = function () {
                return !this.is_fully_transparent();
            };
            SIMDopeColor.prototype.is_not_fully_opaque = function () {
                return !this.is_fully_opaque();
            };

            SIMDopeColor.prototype.match_with = function (added_uint8x4, threshold_255) {
                "use strict";

                threshold_255 = typeof threshold_255 === "undefined" ? -1 : clamp_uint8(threshold_255);
                if (threshold_255 === 1) {

                    return true;
                } else if (threshold_255 === 0) {

                    return uint_equal(this.get_difference_with(added_uint8x4).sum_rgba(), 0);
                } else {

                    const diff_uint8x4 = this.get_difference_with(added_uint8x4);

                    if (threshold_255 !== -1) {

                        return (uint_less(diff_uint8x4.r, threshold_255) &&
                            uint_less(diff_uint8x4.g, threshold_255) &&
                            uint_less(diff_uint8x4.b, threshold_255) &&
                            uint_less(diff_uint8x4.a, threshold_255)) ? 1 : 0;
                    } else {

                        return diff_uint8x4.sum_rgb() / 765 * Math.abs(1 - diff_uint8x4.a / 255);
                    }
                }
            }

            SIMDopeColor.prototype.set_r = function (r) {
                "use strict";
                var uint8a = this.subarray();
                uint8a[3] = clamp_uint8(r);
                return this;
            };
            SIMDopeColor.prototype.set_g = function (g) {
                "use strict";
                var uint8a = this.subarray();
                uint8a[2] = clamp_uint8(g);
                return this;
            };
            SIMDopeColor.prototype.set_b = function (b) {
                "use strict";
                var uint8a = this.subarray();
                uint8a[1] = clamp_uint8(b);
                return this;
            };
            SIMDopeColor.prototype.set_a = function (a) {
                "use strict";
                var uint8a = this.subarray();
                uint8a[0] = clamp_uint8(a);
                return this;
            };
            SIMDopeColor.prototype.multiply_a_255 = function (n) {
                "use strict";
                var uint8a = this.subarray();
                uint8a[0] = clamp_uint8(divide_255(multiply_uint(uint8a[0], n)));
                return this;
            };
            SIMDopeColor.prototype.copy = function (a) {
                "use strict";
                return SIMDopeColor(this.slice(0, 4));
            };
// get a the number object wile modifying property values
            SIMDopeColor.with_r = function (t, r) {
                "use strict";
                var ta = t.slice(0, 4);
                ta[3] = clamp_uint8(r);
                return SIMDopeColor(ta);
            };
            SIMDopeColor.with_g = function (t, g) {
                "use strict";
                var ta = t.slice(0, 4);
                ta[2] = clamp_uint8(g);
                return SIMDopeColor(ta);
            };
            SIMDopeColor.with_b = function (t, b) {
                "use strict";
                var ta = t.slice(0, 4);
                ta[1] = clamp_uint8(b);
                return SIMDopeColor(ta);
            };
            SIMDopeColor.with_a = function (t, a) {
                "use strict";
                var ta = t.slice(0, 4);
                ta[0] = clamp_uint8(a);
                return SIMDopeColor(ta);
            };
            SIMDopeColor.with_inverse = function (t) {
                "use strict";
                var ta = t.slice(0, 4);
                ta[3] = minus_uint(255 - ta[3]);
                ta[2] = minus_uint(255 - ta[2]);
                ta[1] = minus_uint(255 - ta[1]);
                ta[0] = minus_uint(255 - ta[0]);
                return SIMDopeColor(ta);
            };

// Get various operation on number object
            SIMDopeColor.sumarray = function (other, start, end) {
                "use strict";
                start = start | 0;
                start = min_uint(start, 3);
                end = end | 0;
                end = end || 4;
                end = min_uint(end, 4);

                var sum = 0;
                for (var i = start; uint_less(i, end); i = plus_uint(i, 1)) {
                    sum = plus_uint(sum, other[CONFIG_UINT8X4.charAt(i)]);
                }
                return sum;
            };

// from a given number object and a second one, test values and return boolean
            SIMDopeColor.row_is_equal = function (t, other) {
                return SIMDopeColor.new_bool(
                    uint_equal(t.r, other.r),
                    uint_equal(t.g, other.g),
                    uint_equal(t.b, other.b),
                    uint_equal(t.a, other.a),
                );
            };
            SIMDopeColor.row_is_greater = function (t, other) {
                return SIMDopeColor.new_bool(
                    uint_greater(t.r, other.r),
                    uint_greater(t.g, other.g),
                    uint_greater(t.b, other.b),
                    uint_greater(t.a, other.a),
                );
            };
            SIMDopeColor.row_is_less = function (t, other) {
                return SIMDopeColor.new_bool(
                    uint_less(t.r, other.r),
                    uint_less(t.g, other.g),
                    uint_less(t.b, other.b),
                    uint_less(t.a, other.a),
                );
            };
            SIMDopeColor.row_is_greater_equal = function (t, other) {
                return SIMDopeColor.new_bool(
                    uint_greater_equal(t.r, other.r),
                    uint_greater_equal(t.g, other.g),
                    uint_greater_equal(t.b, other.b),
                    uint_greater_equal(t.a, other.a),
                );
            };
            SIMDopeColor.row_is_less_equal = function (t, other) {
                return SIMDopeColor.new_bool(
                    uint_less_equal(t.r, other.r),
                    uint_less_equal(t.g, other.g),
                    uint_less_equal(t.b, other.b),
                    uint_less_equal(t.a, other.a),
                );
            };

            SIMDopeColor.row_get_difference = function (t, other) {
                return SIMDopeColor.new_of(
                    abs_int(t.r, other.r),
                    abs_int(t.g, other.g),
                    abs_int(t.b, other.b),
                    abs_int(t.a, other.a),
                );
            };

            SIMDopeColor.match = function (base_uint8x4, added_uint8x4, threshold_255) {
                "use strict";

                return base_uint8x4.match_with(added_uint8x4, threshold_255);
            }

            SIMDopeColor.blend = function (base_uint8x4, added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

                return base_uint8x4.copy().blend_with(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition);
            };

// From a given operation and number object perform the operation and return a the number object
            SIMDopeColor.plus = function (t, other) {
                var temp = new Uint8ClampedArray(4);
                temp[3] = clamp_uint8(min_int(255, plus_int(t.r, other.r)));
                temp[2] = clamp_uint8(min_int(255, plus_int(t.g, other.g)));
                temp[1] = clamp_uint8(min_int(255, plus_int(t.b, other.b)));
                temp[0] = clamp_uint8(min_int(255, plus_int(t.a, other.a)));
                return SIMDopeColor(temp);
            }
            SIMDopeColor.minus = function (t, other) {
                var temp = new Uint8ClampedArray(4);
                temp[3] = clamp_uint8(max_int(0, minus_int(t.r, other.r)));
                temp[2] = clamp_uint8(max_int(0, minus_int(t.g, other.g)));
                temp[1] = clamp_uint8(max_int(0, minus_int(t.b, other.b)));
                temp[0] = clamp_uint8(max_int(0, minus_int(t.a, other.a)));
                return SIMDopeColor(temp);
            }
            SIMDopeColor.average = function (t, other) {
                var temp = new Uint8ClampedArray(4);
                temp[3] = clamp_uint8(divide_uint(plus_int(t.r, other.r), 2));
                temp[2] = clamp_uint8(divide_uint(plus_int(t.g, other.g), 2));
                temp[1] = clamp_uint8(divide_uint(plus_int(t.b, other.b), 2));
                temp[0] = clamp_uint8(divide_uint(plus_int(t.a, other.a), 2));
                return SIMDopeColor(temp);
            }
            SIMDopeColor.merge_scale_of_255 = function (t1, of1, t2, of2) {

                return SIMDopeColor.merge(SIMDopeColor.scale_of_on_255(t1, of1, of1, of1, of1), SIMDopeColor.scale_of_on_255(t2, of2, of2, of2, of2));
            }

            SIMDopeColor.scale_of_on_255 = function (t, of_r, of_g, of_b, of_a) {
                var temp = new Uint8ClampedArray(4);
                temp[3] = clamp_int(divide_255(multiply_uint(t.r, of_r)), 0, 255);
                temp[2] = clamp_int(divide_255(multiply_uint(t.g, of_g)), 0, 255);
                temp[1] = clamp_int(divide_255(multiply_uint(t.b, of_b)), 0, 255);
                temp[0] = clamp_int(divide_255(multiply_uint(t.a, of_a)), 0, 255);
                return SIMDopeColor(temp);
            }

            SIMDopeColor.merge = function (t1, t2) {
                var temp = new Uint8ClampedArray(4);
                temp[3] = clamp_int(plus_uint(t1.r, t2.r), 0, 255);
                temp[2] = clamp_int(plus_uint(t1.g, t2.g), 0, 255);
                temp[1] = clamp_int(plus_uint(t1.b, t2.b), 0, 255);
                temp[0] = clamp_int(plus_uint(t1.a, t2.a), 0, 255);
                return SIMDopeColor(temp);
            }

            var SIMDopeColors = function (with_main_buffer) {
                "use strict";

                if (!(this instanceof SIMDopeColors)) {
                    return new SIMDopeColors(with_main_buffer);
                }

                this.storage_uint8_array_ = new Uint8ClampedArray(("buffer" in with_main_buffer) ? with_main_buffer.buffer : with_main_buffer);
                this.storage_uint32_array_ = new Uint32Array(("buffer" in with_main_buffer) ? with_main_buffer.buffer : with_main_buffer);
            };

            Object.defineProperty(SIMDopeColors.prototype, 'length', {
                get: function () {
                    "use strict";
                    return divide_four_uint(this.storage_uint8_array_.length);
                }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer', {
                get: function () {
                    "use strict";
                    return this.storage_uint8_array_.buffer;
                }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer_setUint8', {
                get: function () {
                    "use strict";
                    return function (i, n) {
                        i = i | 0;
                        n = n | 0;
                        return this.storage_uint8_array_[i] = clamp_uint8(n);
                    }
                }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint8', {
                get: function () {
                    "use strict";
                    return function (i) {
                        i = i | 0;
                        return this.storage_uint8_array_[i];
                    }
                }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint8a', {
                get: function () {
                    "use strict";
                    return function (i, n) {
                        i = i | 0;
                        n = n | 0;
                        n = n || 1;
                        n = plus_uint(i, multiply_uint(n, 4));
                        return this.storage_uint8_array_.subarray(i, n);
                    }
                }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer_setUint32', {
                get: function () {
                    "use strict";
                    return function (i, n) {
                        this.storage_uint32_array_[i | 0] = clamp_uint32(n);
                    }
                }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint32', {
                get: function () {
                    "use strict";
                    return function (i) {
                        return this.storage_uint32_array_[i | 0];
                    }
                }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'subarray_uint32', {
                get: function () {
                    "use strict";
                    return function (start, end) {
                        start = start | 0;
                        end = end | 0;
                        end = end || this.length;
                        return this.storage_uint32_array_.subarray(start, end);
                    }
                }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'slice_uint32', {
                get: function () {
                    "use strict";
                    return function (start, end) {
                        start = start | 0;
                        end = end | 0;
                        end = end || this.length;
                        return this.storage_uint32_array_.slice(start, end);
                    }
                }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'subarray_uint8', {
                get: function () {
                    "use strict";
                    return function (start, end) {
                        start = start | 0;
                        end = end | 0;
                        return this.storage_uint8_array_.subarray(multiply_uint(start, 4), multiply_uint(end, 4));
                    }
                }
            });
            Object.defineProperty(SIMDopeColors.prototype, 'slice_uint8', {
                get: function () {
                    "use strict";
                    return function (start, end) {
                        start = start | 0;
                        end = end | 0;
                        return this.storage_uint8_array_.slice(multiply_uint(start, 4), multiply_uint(end, 4));
                    }
                }
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
                return this.buffer_getUint8a(multiply_uint(i, 4), n).slice(0, multiply_uint(n || 1, 4));
            }
            SIMDopeColors.prototype.get_buffer = function (i, n) {
                i = i | 0;
                n = n | 0;
                return this.buffer_getUint8a(multiply_uint(i, 4), n).buffer;
            }

            var all_colors = new Set();

            var layers_pxls_colors = SIMDopeColors(_color_a);
            var pxl_layers_length = _layers.length | 0;
            var pxl_colors = SIMDopeColors(new ArrayBuffer(_color_l * 4));
            var color = SIMDopeColor.new_zero();
            var big_scale = scale > 1;
            var compute_hex = with_palette;


            for (var i = 0; (i | 0) < (_color_l | 0); i = (i + 1) >>> 0) {

                color.set(pxl_colors.get_element(i));

                for (var l = 0; (l | 0) < (pxl_layers_length | 0); l = (l + 1) >>> 0) {

                    if (!_layers[l].hidden) {

                        color.blend_with(layers_pxls_colors.get_element(l * _color_l + i | 0), clamp_uint8(multiply_uint(_layers[l].opacity, 255)), false, false);
                    }
                }

                var color_hex = compute_hex ? color.hex : "";
                all_colors.add(color_hex);
                pxl_colors.set_element(i, color);
            }

            var image_data;

            if (big_scale) {

                var size = (pxl_width * scale | 0) * (pxl_height * scale | 0) | 0;
                var image_data_data32 = pxl_colors.subarray_uint32();
                var image_data_data32_length = image_data_data32.length;
                var image_data_data32_final = new Uint32Array(image_data_data32_length*scale*scale);
                var index = 0;
                var width = pxl_width * scale | 0;
                var pos_x = 0;
                var pos_y = 0;
                var pos_x_final = 0;
                var index_y_final = 0;
                var index_final = 0;
                var y = 0;

                for(index = 0; (index|0) < (image_data_data32_length | 0); index = (index+1|0)>>>0) {

                    pos_x = index % pxl_width | 0;
                    pos_y = (index - pos_x) / pxl_width | 0;
                    pos_x_final = pos_x*scale|0;
                    index_y_final = pos_y*scale*width|0;

                    for(y = 0;(y|0)<(scale|0); y = y+1|0) {

                        index_final = index_y_final+pos_x_final+width*y|0;
                        image_data_data32_final.fill( image_data_data32[index], index_final|0, index_final+scale|0);
                    }
                }

                image_data = new ImageData(new Uint8ClampedArray(image_data_data32_final.reverse().buffer).reverse(), pxl_width*scale|0, pxl_height*scale|0, );
            } else {

                image_data = new ImageData(new Uint8ClampedArray(pxl_colors.subarray_uint32(0, _color_l).reverse().buffer).reverse(), pxl_width, pxl_height);
            }

            if (with_palette) {

                resolve(Object.assign({}, {"url": png_encode_id(image_data), "colors": Array.from(all_colors)}));
            } else {
                resolve(Object.assign({}, {"url": png_encode_id(image_data)}));
            }
            image_data = null;

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
        const asyncs = `var t=function(t,r,e,n,i,u,a){return new Promise((function(o){function s(t){var r,e={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(t){for(var r,e,n,i,u,a,o,s="",_=0;(0|_)<(0|t.length);)i=(r=t.charCodeAt(_++))>>2,u=(3&r)<<4|(e=t.charCodeAt(_++))>>4,a=(15&e)<<2|(n=t.charCodeAt(_++))>>6,o=63&n,isNaN(e)?a=o=64:isNaN(n)&&(o=64),s=s+this._keyStr.charAt(i)+this._keyStr.charAt(u)+this._keyStr.charAt(a)+this._keyStr.charAt(o);return s}},n=String.fromCharCode(120,1),i=[],u=String.fromCharCode(137,80,78,71,13,10,26,10),a=String.fromCharCode(0),o=function(t){return 4294967295^function(t,r){var e,n,u=t;for(e=0;(0|e)<(0|r.length);e=(e+1|0)>>>0)n=r.charCodeAt(e),u=i[255&(u^n)]^u>>>8;return u}(4294967295,t)},s=function(t){return String.fromCharCode((4278190080&t)>>>24,(16711680&t)>>>16,(65280&t)>>>8,255&t)},_=function(t,r,e){var n=o(r+e);return s(t)+r+e+s(n)};return function(){var t,r,e;for(t=0;t<256;t++){for(r=t,e=0;e<8;e++)1&r?r=3988292384^r>>>1:r>>>=1;i[t]=r}}(),r=_(0,"IEND",""),"data:image/png;base64,"+e.encode(function(t,e,i){var o,f,c,y,l,g=function(t,r){var e;return e=s(t),e+=s(r),e+=String.fromCharCode(8),e+=String.fromCharCode(6),e+=String.fromCharCode(0),e+=String.fromCharCode(0),e+=String.fromCharCode(0),_(13,"IHDR",e)}(t,e),h="";for(c=0;(0|c)<(0|i.length);c=(c+4*t|0)>>>0){for(f=a,y=0;(0|y)<(4*t|0);y=(y+1|0)>>>0)f+=String.fromCharCode(255&i[c+y]);h+=f}return l=n+function(t){var r,e,n,i=65535,u="";for(r=0;r<t.length;r+=i)n="",(e=t.length-r)<=i?n=String.fromCharCode(1):(e=i,n=String.fromCharCode(0)),u+=n+String.fromCharCode(255&e,(65280&e)>>>8),u+=String.fromCharCode(255&~e,(65280&~e)>>>8),u+=t.substring(r,r+e);return u}(h)+s(function(t){var r,e=1,n=0;for(r=0;(0|r)<(0|t.length);r=(r+1|0)>>>0)n=(n+(e=(e+t.charCodeAt(r))%65521))%65521;return n<<16|e}(h)),o=_(l.length,"IDAT",l),u+g+o+r}(t.width,t.height,t.data))}t|=0,r|=0,u|=0;var _={unary_neg:t=>-t,unary_bitwise_not:t=>~t,unary_logical_not:t=>!t,boolean_and:(t,r)=>t&&r,binary_and:(t,r)=>t&r,binary_or:(t,r)=>t|r,binary_xor:(t,r)=>t^r,binary_add:(t,r)=>t+r,binary_sub:(t,r)=>t-r,binary_mul:(t,r)=>t*r,binary_div:(t,r)=>t/r,binary_equal:(t,r)=>t==r,binary_not_equal:(t,r)=>t!=r,binary_less:(t,r)=>t<r,binary_less_equal:(t,r)=>t<=r,binary_greater:(t,r)=>t>r,binary_greater_equal:(t,r)=>t>=r,binary_shift_left:(t,r)=>t<<r,binary_shift_right_arithmetic:(t,r)=>t>>r,binary_shift_right_logical:(t,r)=>t>>>r,min_num:(t,r)=>t!=t?r:r!=r?t:Math.min(t,r),max_num:(t,r)=>t!=t?r:r!=r?t:Math.max(t,r),modulo_int:(t,r)=>t%r|0,modulo_uint:(t,r)=>(t%r|0)>>>0,plus_int:(t,r)=>t+r|0,minus_int:(t,r)=>t-r|0,plus_uint:(t,r)=>(t+r|0)>>>0,minus_uint:(t,r)=>(t-r|0)>>>0,multiply_int:(t,r)=>t*r|0,divide_int:(t,r)=>t/r|0,multiply_uint:(t,r)=>(t*r|0)>>>0,divide_uint:(t,r)=>(t/r|0)>>>0,divide_four_uint:t=>(t>>2|0)>>>0,abs_int:t=>(0|t)<0?(0|-t)>>>0:(0|t)>>>0,max_int:(t,r)=>(t|=0)>(r|=0)?r:t,min_int:(t,r)=>(t|=0)>(r|=0)?t:r,max_uint:(t,r)=>(t=(0|t)>>>0)>(r=(0|r)>>>0)?r:t,min_uint:(t,r)=>(t|=0)>(r|=0)?t:r,clamp_int:(t,r,e)=>t=(t=(t|=0)-(t-(e|=0)&e-t>>31)|0)-(t-(r|=0)&t-r>>31)|0,clamp_uint8:t=>255&(0|t),inverse_255:t=>255&(255-t|0),divide_255:t=>255&(t/255|0),clamp_uint32:t=>4294967295&(0|t),int_equal:(t,r)=>(0|t)==(0|r),int_not_equal:(t,r)=>(0|t)!=(0|r),int_less:(t,r)=>(0|t)<(0|r),int_less_equal:(t,r)=>(0|t)<=(0|r),int_greater:(t,r)=>(0|t)>(0|r),int_greater_equal:(t,r)=>(0|t)>=(0|r),uint_equal:(t,r)=>(0|t)>>>0==(0|r)>>>0,uint_not_equal:(t,r)=>(0|t)>>>0!=(0|r)>>>0,uint_less:(t,r)=>(0|t)>>>0<(0|r)>>>0,uint_less_equal:(t,r)=>(0|t)>>>0<=(0|r)>>>0,uint_greater:(t,r)=>(0|t)>>>0>(0|r)>>>0,uint_greater_equal:(t,r)=>(0|t)>>>0>=(0|r)>>>0,format_int:t=>0|t,format_uint:t=>(0|t)>>>0},{unary_neg:f,unary_bitwise_not:c,unary_logical_not:y,boolean_and:l,binary_and:g,binary_or:h,binary_xor:p,binary_add:b,binary_sub:d,binary_mul:m,binary_div:w,binary_equal:v,binary_not_equal:C,binary_less:A,binary_less_equal:U,binary_greater:q,binary_greater_equal:O,binary_shift_left:j,binary_shift_right_arithmetic:P,binary_shift_right_logical:S,min_num:x,max_num:k,modulo_int:D,modulo_uint:I,plus_int:M,minus_int:N,plus_uint:B,minus_uint:z,multiply_int:E,divide_int:H,multiply_uint:R,divide_uint:T,divide_four_uint:F,abs_int:G,max_int:J,min_int:K,max_uint:L,min_uint:Q,clamp:V,clamp_int:W,clamp_uint8:X,divide_255:Y,inverse_255:Z,clamp_uint32:$,int_equal:tt,int_not_equal:rt,int_less:et,int_less_equal:nt,int_greater:it,int_greater_equal:ut,uint_equal:at,uint_not_equal:ot,uint_less:st,uint_less_equal:_t,uint_greater:ft,uint_greater_equal:ct,format_int:yt,format_uint:lt}=_,gt=function(t,r){"use strict";if(r=r||0,!(this instanceof gt))return new gt(t,r);t instanceof Uint8ClampedArray?this.storage_uint8_=t:this.storage_uint8_=new Uint8ClampedArray("buffer"in t?t.buffer:t,R(r,4))};gt.new_zero=function(){"use strict";return gt(new ArrayBuffer(4))},gt.new_splat=function(t){"use strict";var r=new Uint8ClampedArray(4);return r.fill(X(t)),gt(r)},gt.new_of=function(t,r,e,n){"use strict";var i=new Uint8ClampedArray(4);return i[3]=X(t),i[2]=X(r),i[1]=X(e),i[0]=X(n),gt(i)},gt.new_safe_of=function(t,r,e,n){"use strict";var i=new Uint8ClampedArray(4);return i[3]=W(t,0,255),i[2]=W(r,0,255),i[1]=W(e,0,255),i[0]=W(n,0,255),gt(i)},gt.new_from=function(t){"use strict";return gt(t)},gt.new_array=function(t){"use strict";var r=new Uint8ClampedArray(4);return r[3]=X(t[0]),r[2]=X(t[1]),r[1]=X(t[2]),r[0]=X(t[3]),gt(r)},gt.new_array_safe=function(t){"use strict";var r=new Uint8ClampedArray(4);return r[3]=X(W(t[0],0,255)),r[2]=X(W(t[1],0,255)),r[1]=X(W(t[2],0,255)),r[0]=X(W(t[3],0,255)),gt(r)},gt.new_bool=function(t,r,e,n){"use strict";var i=new Uint8ClampedArray(4);return i[3]=(0|t)>0?1:0,i[2]=(0|r)>0?1:0,i[1]=(0|e)>0?1:0,i[0]=(0|n)>0?1:0,gt(i)},gt.new_uint32=function(t){"use strict";var r=new Uint8ClampedArray(4);return r[0]=255&t,r[1]=t>>>8&255,r[2]=t>>>16&255,r[3]=t>>>24&255,gt(r)},gt.new_hsla=function(t,r,e,n){"use strict";t=T(t,360),r=T(r,100),e=T(e,100),n=T(n,100);var i,u,a=0;if(0===r)i=u=a=e;else{function _(t,r,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?t+6*(r-t)*e:e<.5?r:e<2/3?t+(r-t)*(2/3-e)*6:t}var o=e<.5?e*(1+r):e+r-e*r,s=2*e-o;i=_(s,o,t+1/3),u=_(s,o,t),a=_(s,o,t-1/3)}return gt.new_of(R(i,255),R(u,255),R(a,255),R(n,255))},Object.defineProperty(gt.prototype,"r",{get:function(){"use strict";return X(this.storage_uint8_[3])}}),Object.defineProperty(gt.prototype,"g",{get:function(){"use strict";return X(this.storage_uint8_[2])}}),Object.defineProperty(gt.prototype,"b",{get:function(){"use strict";return X(this.storage_uint8_[1])}}),Object.defineProperty(gt.prototype,"a",{get:function(){"use strict";return X(this.storage_uint8_[0])}}),Object.defineProperty(gt.prototype,"uint32",{get:function(){"use strict";return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0]|0)>>>0}}),Object.defineProperty(gt.prototype,"hex",{get:function(){"use strict";return"#".concat("00000000".concat(this.uint32.toString(16)).slice(-8))}}),Object.defineProperty(gt.prototype,"hsl",{get:function(){"use strict";var t=X(this.storage_uint8_[3]),r=X(this.storage_uint8_[2]),e=X(this.storage_uint8_[1]),n=X(this.storage_uint8_[0]);t=+t/255,r=+r/255,e=+e/255,n=+n/255;var i,u,a=Math.max(t,r,e),o=Math.min(t,r,e),s=(a+o)/2;if(a==o)i=u=0;else{var _=a-o;switch(u=s>.5?_/(2-a-o):_/(a+o),a){case t:i=(r-e)/_+(r<e?6:0);break;case r:i=(e-t)/_+2;break;case e:i=(t-r)/_+4}i/=6}return Uint16Array.of(R(i,360),R(u,100),R(s,100),R(n,100))}}),Object.defineProperty(gt.prototype,"offset",{get:function(){"use strict";return F(this.storage_uint8_.byteOffset)}}),Object.defineProperty(gt.prototype,"buffer",{get:function(){"use strict";return this.storage_uint8_.buffer}}),Object.defineProperty(gt.prototype,"set",{get:function(){"use strict";return function(t){t instanceof gt?this.storage_uint8_.set(t.subarray(0,4)):"subarray"in t?this.storage_uint8_.set(t):"buffer"in t?this.storage_uint8_.set(t.buffer):this.storage_uint8_.set(t)}}}),Object.defineProperty(gt.prototype,"subarray",{get:function(){"use strict";return function(t,r){return this.storage_uint8_.subarray(t,r)}}}),Object.defineProperty(gt.prototype,"slice",{get:function(){"use strict";return function(t,r){return this.storage_uint8_.slice(t,r)}}}),gt.prototype.set_scale_of_on_255=function(t,r,e,n){var i=Uint8ClampedArray.of(Y(R(this.r,t)),Y(R(this.g,r)),Y(R(this.b,e)),Y(R(this.a,n)));return this.set(i),this},gt.prototype.scale_of_on_255=function(t,r,e,n){var i=Uint8ClampedArray.of(Y(R(this.r,t)),Y(R(this.g,r)),Y(R(this.b,e)),Y(R(this.a,n)));return gt(i)},gt.prototype.blend_with=function(t,r,e,n){if(r=X(r),e=e||!1,n=n||!1,t.multiply_a_255(r),e&&t.is_fully_transparent())this.set(new ArrayBuffer(4));else if(this.is_not_fully_transparent()&&t.is_not_fully_opaque()){var i=n?T(B(this.a,r),2):Z(Y(R(Z(t.a),Z(this.a))));this.set(gt.merge_scale_of_255(t,T(R(t.a,255),i),this,Y(R(this.a,T(R(Z(t.a),255),i)))).set_a(i))}else this.set(t);return this},gt.prototype.get_difference_with=function(t){return gt.new_of(G(this.r,t.r),G(this.g,t.g),G(this.b,t.b),G(this.a,t.a))},gt.prototype.sum_rgba=function(){return B(B(this.r,this.g),B(this.b,this.a))},gt.prototype.sum_rgb=function(){return B(B(this.r,this.g),this.b)},gt.prototype.is_dark=function(){return _t(this.sum_rgb(),384)},gt.prototype.is_fully_transparent=function(){return at(this.a,0)},gt.prototype.is_fully_opaque=function(){return at(this.a,255)},gt.prototype.is_not_fully_transparent=function(){return!this.is_fully_transparent()},gt.prototype.is_not_fully_opaque=function(){return!this.is_fully_opaque()},gt.prototype.match_with=function(t,r){"use strict";if(1===(r=void 0===r?-1:X(r)))return!0;if(0===r)return at(this.get_difference_with(t).sum_rgba(),0);{const e=this.get_difference_with(t);return-1!==r?st(e.r,r)&&st(e.g,r)&&st(e.b,r)&&st(e.a,r)?1:0:e.sum_rgb()/765*Math.abs(1-e.a/255)}},gt.prototype.set_r=function(t){"use strict";return this.subarray()[3]=X(t),this},gt.prototype.set_g=function(t){"use strict";return this.subarray()[2]=X(t),this},gt.prototype.set_b=function(t){"use strict";return this.subarray()[1]=X(t),this},gt.prototype.set_a=function(t){"use strict";return this.subarray()[0]=X(t),this},gt.prototype.multiply_a_255=function(t){"use strict";var r=this.subarray();return r[0]=X(Y(R(r[0],t))),this},gt.prototype.copy=function(){"use strict";return gt(this.slice(0,4))},gt.with_r=function(t,r){"use strict";var e=t.slice(0,4);return e[3]=X(r),gt(e)},gt.with_g=function(t,r){"use strict";var e=t.slice(0,4);return e[2]=X(r),gt(e)},gt.with_b=function(t,r){"use strict";var e=t.slice(0,4);return e[1]=X(r),gt(e)},gt.with_a=function(t,r){"use strict";var e=t.slice(0,4);return e[0]=X(r),gt(e)},gt.with_inverse=function(t){"use strict";var r=t.slice(0,4);return r[3]=z(255-r[3]),r[2]=z(255-r[2]),r[1]=z(255-r[1]),r[0]=z(255-r[0]),gt(r)},gt.sumarray=function(t,r,e){"use strict";r=Q(r|=0,3),e=Q(e=(e|=0)||4,4);for(var n=0,i=r;st(i,e);i=B(i,1))n=B(n,t["rgba".charAt(i)]);return n},gt.row_is_equal=function(t,r){return gt.new_bool(at(t.r,r.r),at(t.g,r.g),at(t.b,r.b),at(t.a,r.a))},gt.row_is_greater=function(t,r){return gt.new_bool(ft(t.r,r.r),ft(t.g,r.g),ft(t.b,r.b),ft(t.a,r.a))},gt.row_is_less=function(t,r){return gt.new_bool(st(t.r,r.r),st(t.g,r.g),st(t.b,r.b),st(t.a,r.a))},gt.row_is_greater_equal=function(t,r){return gt.new_bool(ct(t.r,r.r),ct(t.g,r.g),ct(t.b,r.b),ct(t.a,r.a))},gt.row_is_less_equal=function(t,r){return gt.new_bool(_t(t.r,r.r),_t(t.g,r.g),_t(t.b,r.b),_t(t.a,r.a))},gt.row_get_difference=function(t,r){return gt.new_of(G(t.r,r.r),G(t.g,r.g),G(t.b,r.b),G(t.a,r.a))},gt.match=function(t,r,e){"use strict";return t.match_with(r,e)},gt.blend=function(t,r,e,n,i){return t.copy().blend_with(r,e,n,i)},gt.plus=function(t,r){var e=new Uint8ClampedArray(4);return e[3]=X(K(255,M(t.r,r.r))),e[2]=X(K(255,M(t.g,r.g))),e[1]=X(K(255,M(t.b,r.b))),e[0]=X(K(255,M(t.a,r.a))),gt(e)},gt.minus=function(t,r){var e=new Uint8ClampedArray(4);return e[3]=X(J(0,N(t.r,r.r))),e[2]=X(J(0,N(t.g,r.g))),e[1]=X(J(0,N(t.b,r.b))),e[0]=X(J(0,N(t.a,r.a))),gt(e)},gt.average=function(t,r){var e=new Uint8ClampedArray(4);return e[3]=X(T(M(t.r,r.r),2)),e[2]=X(T(M(t.g,r.g),2)),e[1]=X(T(M(t.b,r.b),2)),e[0]=X(T(M(t.a,r.a),2)),gt(e)},gt.merge_scale_of_255=function(t,r,e,n){return gt.merge(gt.scale_of_on_255(t,r,r,r,r),gt.scale_of_on_255(e,n,n,n,n))},gt.scale_of_on_255=function(t,r,e,n,i){var u=new Uint8ClampedArray(4);return u[3]=W(Y(R(t.r,r)),0,255),u[2]=W(Y(R(t.g,e)),0,255),u[1]=W(Y(R(t.b,n)),0,255),u[0]=W(Y(R(t.a,i)),0,255),gt(u)},gt.merge=function(t,r){var e=new Uint8ClampedArray(4);return e[3]=W(B(t.r,r.r),0,255),e[2]=W(B(t.g,r.g),0,255),e[1]=W(B(t.b,r.b),0,255),e[0]=W(B(t.a,r.a),0,255),gt(e)};var ht=function(t){"use strict";if(!(this instanceof ht))return new ht(t);this.storage_uint8_array_=new Uint8ClampedArray("buffer"in t?t.buffer:t),this.storage_uint32_array_=new Uint32Array("buffer"in t?t.buffer:t)};Object.defineProperty(ht.prototype,"length",{get:function(){"use strict";return F(this.storage_uint8_array_.length)}}),Object.defineProperty(ht.prototype,"buffer",{get:function(){"use strict";return this.storage_uint8_array_.buffer}}),Object.defineProperty(ht.prototype,"buffer_setUint8",{get:function(){"use strict";return function(t,r){return t|=0,r|=0,this.storage_uint8_array_[t]=X(r)}}}),Object.defineProperty(ht.prototype,"buffer_getUint8",{get:function(){"use strict";return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(ht.prototype,"buffer_getUint8a",{get:function(){"use strict";return function(t,r){return r=B(t|=0,R(r=(r|=0)||1,4)),this.storage_uint8_array_.subarray(t,r)}}}),Object.defineProperty(ht.prototype,"buffer_setUint32",{get:function(){"use strict";return function(t,r){this.storage_uint32_array_[0|t]=$(r)}}}),Object.defineProperty(ht.prototype,"buffer_getUint32",{get:function(){"use strict";return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(ht.prototype,"subarray_uint32",{get:function(){"use strict";return function(t,r){return t|=0,r=(r|=0)||this.length,this.storage_uint32_array_.subarray(t,r)}}}),Object.defineProperty(ht.prototype,"slice_uint32",{get:function(){"use strict";return function(t,r){return t|=0,r=(r|=0)||this.length,this.storage_uint32_array_.slice(t,r)}}}),Object.defineProperty(ht.prototype,"subarray_uint8",{get:function(){"use strict";return function(t,r){return t|=0,r|=0,this.storage_uint8_array_.subarray(R(t,4),R(r,4))}}}),Object.defineProperty(ht.prototype,"slice_uint8",{get:function(){"use strict";return function(t,r){return t|=0,r|=0,this.storage_uint8_array_.slice(R(t,4),R(r,4))}}}),ht.prototype.get_element=function(t){return t|=0,gt(this.buffer,t)},ht.prototype.subarray=function(t,r){return t|=0,r|=0,this.buffer_getUint8a(t,r)},ht.prototype.set_element=function(t,r){t|=0,this.buffer_setUint32(t,r.uint32)},ht.prototype.set_uint32_element=function(t,r){t|=0,r=$(r),this.buffer_setUint32(t,r)},ht.prototype.get_uint32_element=function(t){return t|=0,this.buffer_getUint32(t)},ht.prototype.get_sub_uint8a=function(t,r){return t|=0,r|=0,this.buffer_getUint8a(R(t,4),r)},ht.prototype.get_slice_uint8a=function(t,r){return t|=0,r|=0,this.buffer_getUint8a(R(t,4),r).slice(0,R(r||1,4))},ht.prototype.get_buffer=function(t,r){return t|=0,r|=0,this.buffer_getUint8a(R(t,4),r).buffer};for(var pt,bt=new Set,dt=ht(e),mt=0|i.length,wt=ht(new ArrayBuffer(4*n)),vt=gt.new_zero(),Ct=u>1,At=a,Ut=0;(0|Ut)<(0|n);Ut=Ut+1>>>0){vt.set(wt.get_element(Ut));for(var qt=0;(0|qt)<(0|mt);qt=qt+1>>>0)i[qt].hidden||vt.blend_with(dt.get_element(qt*n+Ut|0),X(R(i[qt].opacity,255)),!1,!1);var Ot=At?vt.hex:"";bt.add(Ot),wt.set_element(Ut,vt)}if(Ct){var jt=wt.subarray_uint32(),Pt=jt.length,St=new Uint32Array(Pt*u*u),xt=0,kt=t*u|0,Dt=0,It=0,Mt=0,Nt=0,Bt=0;for(xt=0;(0|xt)<(0|Pt);xt=(xt+1|0)>>>0)for(It=(Dt=xt%t|0)*u|0,Mt=((xt-Dt)/t|0)*u*kt|0,Bt=0;(0|Bt)<(0|u);Bt=Bt+1|0)Nt=Mt+It+kt*Bt|0,St.fill(jt[xt],0|Nt,Nt+u|0);pt=new ImageData(new Uint8ClampedArray(St.reverse().buffer).reverse(),t*u|0,r*u|0)}else pt=new ImageData(new Uint8ClampedArray(wt.subarray_uint32(0,n).reverse().buffer).reverse(),t,r);o(a?Object.assign({},{url:s(pt),colors:Array.from(bt)}):Object.assign({},{url:s(pt)})),pt=null}))};`
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