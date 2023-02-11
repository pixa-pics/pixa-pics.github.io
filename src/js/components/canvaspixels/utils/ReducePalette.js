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
    var PR = fr(0.2926*3/4), // +0.08
        PG = fr(0.5552*3/4), // -0.16
        PB = fr(0.1922*3/4), // +0.08
        PA = fr(1.0000/4);

    var RD = 255,
        GD = 255,
        BD = 255,
        AD = 255;

// Euclidean or Manhattan color distance
    var EUCLMAX = (s(PR*RD*RD + PG*GD*GD + PB*BD*BD | 0) | 0) >>> 0;

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
        return (n | 0) < 0 ? (-n | 0) : (n | 0);
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
            this.max_cluster_ = this.new_pxl_colors_.length > 32768 ? 4096+1: this.new_pxl_colors_.length > 16385 ? 256+1: this.new_pxl_colors_.length > 8192 ? 64+1: this.new_pxl_colors_.length > 2048 ? 16+1: 1;
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
        var color_b_usage_percent = 0;
        var color_b_usage = 0;
        var first_color_more_used = false;
        var color_usage_difference_positive = 0.0;
        var weighted_threshold = 0.0;
        var average_cluster_color_usage_percent = 0.0;
        var index_of_color_a = 0;
        var index_of_color_b = 0;
        var x = 0, y = 0;
        var color_n_in_cluster = 0;
        var low_if_used_alot = 1.0;
        var low_if_both_used_alot = 1.0;
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

                // Start following color snake
                latest_color = {value: color_a};

                if((color_a_usage|0) > 0 && color_a.is_not_fully_transparent()) {

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


                            // 1x Threshold + 1x weight
                            weighted_threshold =
                                ((
                                    // Threshold and weight applied to threshold divided by what is not the threshold
                                    ((threshold_1000 / 1000) + (threshold_1000 / 1000 * weight_applied_to_color_usage_difference)) /
                                    (1 + weight_applied_to_color_usage_difference)
                                ) * 1000 | 0) >>> 0;  // THRESHOLD + THRESHOLD * WEIGHT / 1 + WEIGHT

                            if(smart) {
                                color_a_usage_percent = this.get_a_color_usage_percent(index_of_color_a|0);
                                color_b_usage_percent = this.get_a_color_usage_percent(index_of_color_b|0);
                                low_if_used_alot = color_a_usage_percent > average_cluster_color_usage_percent ? average_cluster_color_usage_percent / color_a_usage_percent: 1;
                                low_if_both_used_alot = (color_a_usage_percent + color_b_usage_percent|0) > (average_cluster_color_usage_percent * 2|0) ? (average_cluster_color_usage_percent * 2|0) / (color_a_usage_percent + color_b_usage_percent|0): 1;
                            }

                            // The less a color is used the less it requires a great distance to be merged (so we don't have many color used only a few time in the whole image, heavily used color gets preserved better than lowly used ones)
                            if(color_a.euclidean_match_with(color_b,  (
                                weighted_threshold*6+
                                weighted_threshold*low_if_both_used_alot+
                                weighted_threshold*low_if_used_alot|0
                            )/8|0)) {

                                // Update color usage and relative variables
                                index_merged = true;
                                color_a_usage = (color_a_usage + color_b_usage | 0) >>> 0;
                                this.set_a_color_usage(index_of_color_a|0, color_a_usage|0);
                                this.set_a_color_usage(index_of_color_b|0, 0);

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
                }

                if(index_merged) {
                    while (typeof latest_color != "undefined") {
                        latest_color.value.set(color_a);
                        latest_color = latest_color.tail;
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

import {load as LZEL_92} from "../../../utils/LZEL_92_loader";

const ReducePalette = {

    _create_func: function (){
        return LZEL_92('UraniumJS! H~=2;M|Uwbkh6l+jqymhi4>~PH!R[L#JRHYqELL,DXI+.FaV~+AutxH3bCH]F2:fcAOSXK)cxio|_e(DkDJ!Pfoy0fJ)Dmc:F.s7~ 1~c@cxT~B?]opofl1DW¡yU jEsa2t§x^ [sG(0a..6v<LwD*yKk66o%]>s!FCr^5pf1MtPWxv:§AHb>a&4Zh(O@NSpS:tM0a(awN8BCP_zxV1G¡pay6es9xxVHo6ZV+Tu5%uw|anZj%sy]lf3+WFa xaCxM*R#!SK[SPDps-SX8UJL.Ag+1%[kPxgw6jS <§eOfA+pN2)Lot3[g^HNqdJ-EqH|h.hl!yD[jQ5e*+,d<6{l^ahvk=~K5Ar¡amA9:~XW]f%8[Amgd7:{2-C1{hSv*=3*d>.4DgATfBP;u|I6YA]nm:n;8M0c>rBUmZu.<5.ik nI-jPUH|ntv)tVycJ9Sy~1~]=b{!-py88>.5b3eoUqmq[3CA1M^VY#t,d<Fap§yk.tK[4Zhd;*n51Zj@-U+&5vS&j<s7JNzuZmimlL:f=AI<&tT@zQz!>Cb{_7i0#El8l!QseXMiX~TVKK.ti§n(,{Z6ZsDMCl+CKG!&Aqae§E(Z>vAzbTc9FurEmifK1Q<DWAaO081}jQzDHW|qDsXCbekfPUHdU~<U6hX&QP,9eJ~A[uskZ#x?8V~r=VFt5V|T+ 0+TbFz(j0:?Y#z:rVljqh-DB{HiDRE*o2[z74O^?<L#H+dR}YuOEKKth{fctp~4N#:6m-613?71Mtzz)8rHdTHp@@g scK+[*WNHHr[,d+ 9 H%IWw4.U7Q§+TKy§p&;abQ<*A2b(sj_U8#MUb]Oe?YU7Idg4]{,yx]N[-G*7)LUOrOq_l<v1_C|M_8I68{:7GXMg:]tI^)Ed>uS--C?[p:,UcPpURFG*s*037EYd#UC@1qj|U-;Er(Yp+*?[0<(u!¡o5U§dL<glzW{)6d4wX¡li1x <cKP!em??QFAJf>^-5oYSjF&Hv=O+ Q1j7g|GA{%bf1&y0rb|Jt[Wl3q{K{Cdx:l<!7: njSi1jCt^h7]jflxDHlY2|>Rzm:_GSk=-3b@oIw}Y2(5vytP&IE~5[Q;)lm=66j8PTHx~%|85Y9>Sr1Bk#7K1XimvdEhq(4K^nj0V?y]]BT4(ko%(-YWCBJ>p5f~?yKw,Js[FRs-¡6|yni;nRAMV^R§8(z#2sB*h>Ck2V5OwQwDhm(Ju^fSi!§)&8&2Y:u0SM#&#v%DvR9N|Pw<0QQMGrDQLSU hVZDeN=_%Q=9G+_X1?¡glu;9bs|=3@wL=&¡S(SaU;D?R&KQ8UEw=Gz,bV9rV}H.r:t@yq+A_:9Y4K=Rsp[>K?;2F( {n:1?ioh~i,6]6CCokEPB3[C_cMQHl|Qb0V§RO&?*4|8Ys,)J-~ ;oM*@mg9a.s;pFfhp%&;lRF@.P}§0{9tF68ygRA¡KwXW|y4:0!eHH?Ny@4}M,^MF<WOXdlCJ=|Zd,t4c={?261=S*5CyzOUi§V1]yDmECcar2_s[L|;;T;U&~tr?4)3PfxYQoxxQ~HW:Fa.s(#ccXF}9LmY-FTiXBw~=Ui~ nav]dACBtW9vwe;qt^J<n,Snln~Ds||rP=EY-YZD_&xV§~UO0CGYT]h:2untVf=)3O!z(EqO-.G#,^UJUwiK6P2p&9EZ3f3a ¡A0{rSJ5SR Z(MuistRwkI=h?C;:b}LbN=!DXdKb@q§66r?>=!vzbaQ:;-yp&B{XtSswtNM0{(UJ9&z*rW:Y ¡;,XqgE<m5[#+2cA4Vn!<wk]]27<?Gtda,5nxDYI0%sH6=2 Y?a§+lG n,3LtdF MoA!!r&q(4(-6Oh*?zpV7¡¡MBqr]<fA=-6}fXz&U}aSC8=.;o?^90)h0O¡)oQZH_Edc]<?qTzKm!wA@xK~^G]*kd§,9)TS7,ZQm@#UpMY-e&gfRB[YdJG?Fq435e}RQ3Kilv.Ta;7E~]#gr4v^waPFZ3.6XTSlzJ ZR&#~KJK58(kr[wLQ%8Z[iR:4%*Qtx@eu§zK?3nUSeJv#o[@c,rx1u(¡cUJR2h@bryye)&P8(d+b4.7)P+8*KHdsN4X921wi,evAy§)OiI,NVd&<BFF-QRQ^]yqPP(J2sE*u.rsRP{R}WA ]mJ~u?pG[A^lUosSG.t?f:7An&E+§+zf|l!oWv+qLOU=2wPd~8rjm7puCSN^gU¡{e>X-m:^6HPdXQh(6VP]%#q>3>L8F=o;uKvg,sSAEo6;|sI7M;9c2BvaO72@dltHGkUbmRiw5{4opZ!Rv:*?M*lfH?O§) WWLQ,G,=S@R@aIM* xNixUe6§>|beM4@{G^<.MO>!zJ&^Mr%?:yiLjy&#!-WS(zZ<L0Htbpu2kf%ey+kUa-HMQd;>uQ§!UVzi&+@adCW94E~>3iA§f9Pk9R[sgq*<_-|Id8,0O^D¡K=g+¡ucgev.B3>y1U5NmXPt|A5RUy~(hi{![H-Z!7>]#PQ@ky§T9§MtlU)¡(vjD[^{caJ8bWv:T61{}<y^==i(>hQ%{{4o9(kc&7,#@w9KSGY15t<bl)^H,AyZqwS(BWYi4-.2T%@!<OBq|[mAvH9g{1zbC-IlOCAsw[3K2ML§V]dSI2iIpZ?RM%]IGYe>noiJ§Dxm&y*vH¡>Q)ZJL=OzTcjVBS7+|^+HuNUr%F^hXq.,lz[t?)X1bH#]J2#~*(4UxQ<c%Y§X%¡=lm_eYi^!dP2NO9%%u2-*§f+Bqa#Y5;KpO{wmbP@eSTUjyD|Q)A9PH U]§?4a;wP6=kUzZY&~@z<]pQWt@§22jAbSC~0qcLj!LG¡.Dnl¡TP(#X;g[%=pV]#.v>PBy;1nlD^U¡:@?g¡edM:Y6rgbISMvhK¡§A%9_^4I5]%ORmwR],L}soiitE7TZ19J1^.:(GBoL=I<ZsuVB,ySn84jDAtks]G}B=6¡mCJO+&6(n3zn<VD2HF;}s-6:7F5HrkK.i8~}:?npZ2e&Z_?6A r47@G|pbfMUFy§7huj,@x0iAkE§5->)vLt<{LO:8jf§4kdt*s[3¡&}l.L 245Ylc<~z6bu79Jcmc34w4-Zp.q|r&F>t,GdX3%g:§K>u1G|M[|7=ZP%8QC*FEAPuifm?,Q(.mp#P>tQ+?EW1Pa?b60& Nj^#=pq0~JRV§7T2GJjL]6Z(e ^ScC;CViYDRw§r_Q~psX[Ocg@~eW>+dR§qAJV.CGqk9N6lpg;tjOP,P(f5d!Jy>2sy5PiXmQwE7<;*Ta*2{l2ENa16EWU>(>}fY MnZIW7>!XsyV[2eB0P,{N&t+P;2YdZ!eysYA# 2&XlH*Uc5¡qu§3%yx_On!%WeED1r+^bi¡cH¡QTE?vnQPbX N p>7e P2aCROvsv1l= bO!s¡%KJN6QwCWqwr^6*r|<)ZwNbqdY16DbmD~LB=qu_* P#LvNUoYGx]m8F>Tp@[¡Gqtnmd;y#ya-P[9>oWtQe4<yR_§gpF:4_[^w=[?E&CL!JaP&-vg-:M(KrKgyKd)a.WH!O1LTmAb^ukAftbAP4e S8F|6%Eg#DOd^#<7TkA DmDo#Py)DJ4KgJf<uXRfjCwADXY+;qb07~Jo*p785*Sc Xp&}Cs+8Kb1I0;*}]K8Tje!=7R<A{sUWFyNCU}t5vKZUvbu;v+%rF~m~6R iFVIpM8j+(@-PX¡&1Bs.Y_0PHY§v%iSWQ59cb%(z#xY<&GFE_Kh-v,8Mlo>^IAwWO9BE6m84[0heD49v:AzBYb&}!u3+r.§W¡sy](nJWqn8eo8Vjw1a7Y*-VDE3N+AyRgajI¡ixUl~Y9¡;§z(S6F1=GpDq,Ywq}AjWpX8:Kp?~Ii}MByZnIy0n3&?{PSyG;FnpiY[ys  |LL3Whw,B7_ryuDP)o](^BsKWtmFw¡?#Pa0V&LM089%r_25~F6*|f¡v9db-JnWR¡1Fc.Q>ot_w7D8e~sI{L{5JUA.G#¡o!,[0m--yfTxAl,1#jD?8M@KrWsu FsHvWCQGTUuj-g[sem*n;A_.Sf%I3l}<T>yfvpECW3n6!GWkX_6VVSjhM:u2e#r%[{x!&-%z.uyY#+*z4?mBLHgs6GhZ]_a<*v5F_?f@Hx&BRkf<0aGr?]}krN6K^lW(n -tLIeSs!j{W9n4Kj,Pv4~Va[fNRTQS9w.>:TLaeV§?tBjnrasw|LrmX0~9FftimB.<#K=8V_Dl8_9%8.EB^lan~(7ZT#3 |@B4 9A>=y^2(aY:{a0D§;frC_1sC).ws,gP^Y@Czw.b5#l{}lu[.-%MvPD8W:T[?!(?gg&|I[L.E.5kAc#p§FA§oVMyIZ%dO!GrR1mzREJi:zb[#,~xa_2)r,mJVDg6EGO¡E+vTH[eZG>>cF#iPn24T_Qh&}?xiCZ[..kjEcrb=!Df@,r]1zp9{dD0maOW>Q,TMaZ2(wOqmcU]5qWaRu7obB2gu:xU,5Z6n@rAJ&WGs&?dpx,S80zT;isa¡ aCwmIA5m§XM;bFT%>CC8UF2JT2eS<AtLvzCZ:a@My?Q91ED#dwrPvf Sv,R|xtcC2eXKwvKR%mcO.I5=mXg(-o)_d§^ek|ra,&R+a_P7Nc^?~^.~xf;LFc~6AMS#Z(K )Np5VS:WOzgwS-6(Fn?Rs>+izzpvppxQbLG]26.gZJT0;;Fy9 <29]Es-j-n7[n4c;3ROGF5[N0}-M~lT8z¡kA~3Ax0f%0dA1n.zm,xqxZ2}?@F4MN YVu7M(ht[>EH~+Kr]&_!UfSd-VG¡Zf9§I58<Pjx(=qH{qHw;{~5(Fs7P?qotS!Jr t>MAB! _.KUPi-ylV*¡uZHFni}JNlW?h),@cMXLy.a6<KnEJ¡2~jl9xDZ* OYMYt2rHi~2[I:|XDPg=.4j,pN@r5)={§D:c3_{U.G=0~KaJ)NqCDP7%fl1U;{qF%qJ8>V0C.y2:|11oQ{JK3s0vA1!(OT(32~e?{&licj]Oq7FU(Y(ic>,]r83s33nn=?N=HPJs.OT[!nmvr;bshGGG%TBN5kK2bgC4R{7,OQ,d1paG0j& im|N;1P_a:IdMkd§J,xr&:gOjaVPiL!Q_Vyb~MJTr&D~|9.3R7t¡,vGYHfgxseRVgFWP[lokLAlx<a}!,]w2xy8!0F9Iq&&j@?wbgQk;45aN.d]p9oyMHW;)jc;6z1fxWq#cHlq*3xm&=o!UeTo_o4FDfxUnh^Pw7uY.V!27K');
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
                }).then(function(buffer){

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