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

            // Inspired by https://en.wikipedia.org/wiki/Rec._709
            var imul = function(a, b){return Math.imul((a|0)&0xFFFFFFFF, (b|0)&0xFFFFFFFF)&0xFFFFFFFF; };
            var fr = Math.fround;
            var r = function(x){ return (0.5+x|0)&0xFFFFFFFF; };
            var p2 = function(x){ x = x|0; return (imul(x|0, x|0)|0)&0xFFFFFFFF; };
            var s = function(x){

                // Base cases
                x = (x | 0)&0xFFFFFFFF;
                if ((x|0) == 0 || (x|0) == 1){

                    return x | 0;
                }

                // Starting from 1, try all
                // numbers until i*i is
                // greater than or equal to x.
                var i = 1;
                var result = 1;

                while ((result|0) <= (x|0)) {
                    i = (i+1|0)&0xFFFFFFFF;
                    result = (i * i | 0)&0xFFFFFFFF;
                }

                return (i - 1 | 0)&0xFFFFFFFF;
            };
            var PR = fr(0.2126), // +0.1
                PG = fr(0.7152), // -0.2
                PB = fr(0.0722), // +0.1
                PA = fr(1.0000);

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
                return (Math.imul((a|0)&0xFFFFFFFF, (b|0)&0xFFFFFFFF) | 0)&0xFFFFFFFF;
            }
            function multiply_uint_4(a) {
                return a << 2;
            }
            function divide_uint(a, b) {
                return (a / b | 0) &0xFFFFFFFF;
            }
            function divide_4_uint(n) {
                return (n >> 2 | 0) &0xFFFFFFFF;
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
                return ((n|0)>>>0) & 0xFFFFFFFF;
            }
            function uint_equal(a, b) {
                return ((a | 0)&0xFFFFFFFF) == ((b | 0)&0xFFFFFFFF);
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

            Object.defineProperty(SIMDopeColor.prototype, 'hex', {
                get: function() { "use strict"; return "#".concat("00000000".concat(this.uint32.toString(16)).slice(-8));}
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

            SIMDopeColor.prototype.simplify = function(of) {
                var temp = Uint8Array.of(
                    multiply_uint(r(this.a / of), of),
                    multiply_uint(r(this.b / of), of),
                    multiply_uint(r(this.g / of), of),
                    multiply_uint(r(this.r / of), of),
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
                        added_uint8x4.set(ArrayBuffer(4));
                    }else if(added_uint8x4.is_fully_transparent()) {
                        this.set(ArrayBuffer(4));
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

            var all_colors = new Set();

            var layers_pxls_colors = SIMDopeColors(_color_a);
            var pxl_layers_length = _layers.length | 0;
            var pxl_colors = SIMDopeColors(new ArrayBuffer(_color_l * 4));
            var big_scale = scale > 1;
            var compute_hex = with_palette;

            for (var i = 0; (i | 0) < (_color_l | 0); i = (i + 1) >>> 0) {

                for (var l = 0; (l | 0) < (pxl_layers_length | 0); l = (l + 1) >>> 0) {

                    if (!_layers[l|0].hidden) {

                        pxl_colors.get_element(i|0).blend_with(layers_pxls_colors.get_element(l * _color_l + i | 0), _layers[l|0].opacity*1000|0, false, false);
                    }
                }

                all_colors.add(compute_hex ? pxl_colors.get_element(i|0).hex : "");
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
                var top_left = 0;
                var y = 0;

                for(index = 0; (index|0) < (image_data_data32_length | 0); index = (index+1|0)>>>0) {

                    pos_x = index % pxl_width | 0;
                    pos_y = (index - pos_x) / pxl_width | 0;
                    pos_x_final = pos_x*scale|0;
                    index_y_final = pos_y*scale*width|0;
                    top_left = index_y_final+pos_x_final|0;

                    for(y = 0;(y|0)<(scale|0); y = (y+1|0)>>>0) {

                        index_final = top_left+width*y|0;
                        image_data_data32_final.fill( image_data_data32[index] & 0xFFFFFFFF, index_final|0, index_final+scale|0);
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
        })};
 */

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
        const asyncs = `return function(t,r,e,n,i,o,u){return new Promise((function(s){function a(t){var r,e={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(t){for(var r,e,n,i,o,u,s,a="",f=0;(0|f)<(0|t.length);)i=(r=t.charCodeAt(f++))>>2,o=(3&r)<<4|(e=t.charCodeAt(f++))>>4,u=(15&e)<<2|(n=t.charCodeAt(f++))>>6,s=63&n,isNaN(e)?u=s=64:isNaN(n)&&(s=64),a=a+this._keyStr.charAt(i)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(s);return a}},n=String.fromCharCode(120,1),i=[],o=String.fromCharCode(137,80,78,71,13,10,26,10),u=String.fromCharCode(0),s=function(t){return 4294967295^function(t,r){var e,n,o=t;for(e=0;(0|e)<(0|r.length);e=(e+1|0)>>>0)n=r.charCodeAt(e),o=i[255&(o^n)]^o>>>8;return o}(4294967295,t)},a=function(t){return String.fromCharCode((4278190080&t)>>>24,(16711680&t)>>>16,(65280&t)>>>8,255&t)},f=function(t,r,e){var n=s(r+e);return a(t)+r+e+a(n)};return function(){var t,r,e;for(t=0;t<256;t++){for(r=t,e=0;e<8;e++)1&r?r=3988292384^r>>>1:r>>>=1;i[t]=r}}(),r=f(0,"IEND",""),"data:image/png;base64,"+e.encode(function(t,e,i){var s,c,_,h,g,y=function(t,r){var e;return e=a(t),e+=a(r),e+=String.fromCharCode(8),e+=String.fromCharCode(6),e+=String.fromCharCode(0),e+=String.fromCharCode(0),e+=String.fromCharCode(0),f(13,"IHDR",e)}(t,e),p="";for(_=0;(0|_)<(0|i.length);_=(_+4*t|0)>>>0){for(c=u,h=0;(0|h)<(4*t|0);h=(h+1|0)>>>0)c+=String.fromCharCode(255&i[_+h]);p+=c}return g=n+function(t){var r,e,n,i=65535,o="";for(r=0;r<t.length;r+=i)n="",(e=t.length-r)<=i?n=String.fromCharCode(1):(e=i,n=String.fromCharCode(0)),o+=n+String.fromCharCode(255&e,(65280&e)>>>8),o+=String.fromCharCode(255&~e,(65280&~e)>>>8),o+=t.substring(r,r+e);return o}(p)+a(function(t){var r,e=1,n=0;for(r=0;(0|r)<(0|t.length);r=(r+1|0)>>>0)n=(n+(e=(e+t.charCodeAt(r))%65521))%65521;return n<<16|e}(p)),s=f(g.length,"IDAT",g),o+y+s+r}(t.width,t.height,t.data))}t|=0,r|=0,o|=0;var f=function(t,r){return 4294967295&Math.imul(4294967295&(0|t),4294967295&(0|r))},c=Math.fround,_=function(t){return 4294967295&(.5+t|0)},h=c(.2126),g=c(.7152),y=c(.0722),p=c(1);!function(t){if(0==(0|(t=4294967295&(0|t)))||1==(0|t))return 0|t;for(var r=1,e=1;(0|e)<=(0|t);)e=4294967295&((r=4294967295&(r+1|0))*r|0)}(255*h*255+255*g*255+255*y*255+255*p*255|0);function b(t,r){return(t+r|0)>>>0}function d(t,r){return 4294967295&(0|Math.imul(4294967295&(0|t),4294967295&(0|r)))}function l(t){return t<<2}function C(t,r){return 4294967295&(t/r|0)}function m(t){return 4294967295&(t>>2|0)}function O(t){return 255&(0|t)}function A(t){return 255&(255-t|0)}function v(t){return 255&(t/255|0)}var j=function(t,r){"use strict";if(r=r||0,!(this instanceof j))return new j(t,r);t instanceof Uint8Array?this.storage_uint8_=t:this.storage_uint8_=new Uint8Array("buffer"in t?t.buffer:t,f(r,4))};j.new_of=function(t,r,e,n){"use strict";var i=new Uint8Array(4);return i[3]=O(t),i[2]=O(r),i[1]=O(e),i[0]=O(n),j(i)},Object.defineProperty(j.prototype,"r",{get:function(){"use strict";return O(this.storage_uint8_[3])}}),Object.defineProperty(j.prototype,"g",{get:function(){"use strict";return O(this.storage_uint8_[2])}}),Object.defineProperty(j.prototype,"b",{get:function(){"use strict";return O(this.storage_uint8_[1])}}),Object.defineProperty(j.prototype,"a",{get:function(){"use strict";return O(this.storage_uint8_[0])}}),Object.defineProperty(j.prototype,"uint32",{get:function(){"use strict";return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(j.prototype,"hex",{get:function(){"use strict";return"#".concat("00000000".concat(this.uint32.toString(16)).slice(-8))}}),Object.defineProperty(j.prototype,"offset",{get:function(){"use strict";return m(this.storage_uint8_.byteOffset)}}),Object.defineProperty(j.prototype,"buffer",{get:function(){"use strict";return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,b(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(j.prototype,"subarray",{get:function(){"use strict";return this.storage_uint8_.subarray(0,4)}}),Object.defineProperty(j.prototype,"set",{get:function(){"use strict";return function(t){t instanceof j?this.storage_uint8_.set(new Uint8Array(t.buffer)):"subarray"in t?this.storage_uint8_.set(t.subarray(0,4)):this.storage_uint8_.set(t)}}}),Object.defineProperty(j.prototype,"slice",{get:function(){"use strict";return function(t,r){return this.storage_uint8_.slice(t,r)}}}),j.prototype.is_fully_transparent=function(){return(4294967295&(0|this.a))==(4294967295&(0|0))},j.prototype.simplify=function(t){var r=Uint8Array.of(d(_(this.a/t),t),d(_(this.b/t),t),d(_(this.g/t),t),d(_(this.r/t),t));return this.set(r),this},j.prototype.blend_with=function(t,r,e,n){if(e|=0,n|=0,t.multiply_a_1000(0|r),0!=(0|e))this.is_fully_transparent()?t.set(ArrayBuffer(4)):t.is_fully_transparent()&&this.set(ArrayBuffer(4));else{var i=0!=(0|n)?C(b(this.a,t.a),2):A(v(f(A(t.a),A(this.a))));this.set(j.merge_scale_of_255_a_fixed(t,C(f(t.a,255),i),this,v(f(this.a,C(f(A(t.a),255),i))),i)),t.set(this)}},j.prototype.multiply_a_1000=function(t){"use strict";this.subarray[0]=O(C(f(this.a,t),1e3))},j.prototype.copy=function(){"use strict";return j(this.slice(0,4))},j.with_a=function(t,r){"use strict";var e=t.slice(0,4);return e[0]=O(r),j(e)},j.merge_scale_of_255_a_fixed=function(t,r,e,n,i){return r=O(r),n=O(n),i=O(i),j.merge_with_a_fixed(j.scale_rgb_of_on_255(t,r,r,r),j.scale_rgb_of_on_255(e,n,n,n),i)},j.scale_rgb_of_on_255=function(t,r,e,n){return j(Uint8Array.of(0,v(f(t.b,n)),v(f(t.g,e)),v(f(t.r,r))))},j.merge_with_a_fixed=function(t,r,e){return j(Uint8Array.of(O(e),b(t.b,r.b),b(t.g,r.g),b(t.r,r.r)))};var P=function(t,r,e){"use strict";if(!(this instanceof P))return new P(t);this.storage_="buffer"in t?t.buffer:t,r|=0,e=0|e||0|this.storage_.byteLength,this.storage_uint8_array_=new Uint8Array(this.storage_,r,e),this.storage_uint32_array_=new Uint32Array(this.storage_,r,m(e))};Object.defineProperty(P.prototype,"length",{get:function(){"use strict";return this.storage_uint32_array_.length}}),Object.defineProperty(P.prototype,"buffer",{get:function(){"use strict";return this.storage_uint8_array_.buffer}}),Object.defineProperty(P.prototype,"buffer_setUint8",{get:function(){"use strict";return function(t,r){return t|=0,r|=0,this.storage_uint8_array_[t]=O(r)}}}),Object.defineProperty(P.prototype,"buffer_getUint8",{get:function(){"use strict";return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(P.prototype,"buffer_getUint8a",{get:function(){"use strict";return function(t,r){return r=b(t|=0,l(r=(r|=0)||1)),this.storage_uint8_array_.subarray(t,r)}}}),Object.defineProperty(P.prototype,"buffer_setUint32",{get:function(){"use strict";return function(t,r){this.storage_uint32_array_[0|t]=function(t){return(0|t)>>>0&4294967295}(r)}}}),Object.defineProperty(P.prototype,"buffer_getUint32",{get:function(){"use strict";return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(P.prototype,"subarray_uint32",{get:function(){"use strict";return function(t,r){return t|=0,r=(r|=0)||this.length,this.storage_uint32_array_.subarray(t,r)}}}),Object.defineProperty(P.prototype,"slice_uint32",{get:function(){"use strict";return function(t,r){return t|=0,r=(r|=0)||this.length,this.storage_uint32_array_.slice(t,r)}}}),Object.defineProperty(P.prototype,"subarray_uint8",{get:function(){"use strict";return function(t,r){return t|=0,r|=0,this.storage_uint8_array_.subarray(l(t),l(r))}}}),Object.defineProperty(P.prototype,"slice_uint8",{get:function(){"use strict";return function(t,r){return t|=0,r|=0,this.storage_uint8_array_.slice(l(t),l(r))}}}),P.prototype.get_element=function(t){return j(this.buffer,0|t)},P.prototype.subarray=function(t,r){return t|=0,r|=0,this.buffer_getUint8a(t,r)};for(var w,S=new Set,U=P(e),x=0|i.length,k=P(new ArrayBuffer(4*n)),D=o>1,I=u,N=0;(0|N)<(0|n);N=N+1>>>0){for(var B=0;(0|B)<(0|x);B=B+1>>>0)i[0|B].hidden||k.get_element(0|N).blend_with(U.get_element(B*n+N|0),1e3*i[0|B].opacity|0,!1,!1);S.add(I?k.get_element(0|N).hex:"")}if(D){var M=k.subarray_uint32(),E=M.length,H=new Uint32Array(E*o*o),L=0,R=t*o|0,T=0,q=0,z=0,F=0;for(L=0;(0|L)<(0|E);L=(L+1|0)>>>0)for(z=(((L-(T=L%t|0))/t|0)*o*R|0)+(T*o|0)|0,F=0;(0|F)<(0|o);F=(F+1|0)>>>0)q=z+R*F|0,H.fill(4294967295&M[L],0|q,q+o|0);w=new ImageData(new Uint8ClampedArray(H.reverse().buffer).reverse(),t*o|0,r*o|0)}else w=new ImageData(new Uint8ClampedArray(k.subarray_uint32(0,n).reverse().buffer).reverse(),t,r);s(u?Object.assign({},{url:a(w),colors:Array.from(S)}):Object.assign({},{url:a(w)})),w=null}))};`;

        var layers_pxls_colors_length = pxl_width * pxl_height | 0;
        var layers_pxls_colors = new Uint32Array(_s_pxls.length * layers_pxls_colors_length | 0);

        for(var i = 0; i < _s_pxls.length; i++) {

            const p =  Uint32Array.from(_s_pxls[i]);
            const pc = Uint32Array.from(_s_pxl_colors[i]);

            layers_pxls_colors.set(p.map(function(pci){ return( (pc[pci|0]|0)>>>0) & 0xFFFFFFFF; }), layers_pxls_colors_length * i);
        }

        return Object.assign({}, {
            // Compute properties
            asyncf: new AsyncFunction(asyncs+" return fu;")(),
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