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
                                weighted_threshold*2+
                                weighted_threshold*low_if_both_used_alot+
                                weighted_threshold*low_if_used_alot|0
                            )/4|0)) {

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
        return LZEL_92('UraniumJS! H~=2;M|5wbkh6l+itDCZi4>~PH!R[L#JRHYqELL,DXI+.FaV~+AutxH3bCH]F2:fcAOSXK)cxio|_e(DkDJ!Pfoy0fJ)Dmc:F.s7~ 1~c@cxT~B?]opofsFIf*n6P#fg%@tV~VZ!-pc>mtlz9>UAe!q%O+]IAo|}-A0ayk=D^#H[ <pubJ7+;uP:HX-v0LoMkg5oyiFM8VUfZ4]1-.W5AN|(-fcN)z@3PYT%¡nGq(,UCwQ)YbtILhT{_wUg{txrxBkK{yD[AH-¡_@To@M#gCJ8g<?TLgPxgw6jS <§eOfA+pN2)Lot3[g^HNqdJ-EqH|h.hl!yD[jQ5e*+,d<6{l^ahv6eS<AT19z.YjDEmuD%¡DLq7t#Y@.3jaV0]h23+)#SdE^%}^Z¡rHLRFe,SqPA&s|ND~c[~TY@*>4::,w,Jq0u^¡wQ5XKxGA3RdWCoT2>>ogw5!o3-<wO+|5+X+32¡I¡Lfa!n*8@§qLGuOvF.*+En|:![@rkDlz_K];Lkr3q5j((fgs4;{_3LUhxLw~u(Sdj =]03AN_ f1Xx¡c8S3.9vT4)QIDS8v7s7|o_Q%U}g0+6sDQLLjDOV_hqf1PmaEv;^ypah58BQfXO-0J:;54lC!7vohoF@%%SFD0h;j])I(&!wPB%z2&N1uN E0XklAEj-T&]8P,{;YsM5A?_jvY¡T2Rb@@8PP3E¡0S@EV-=bwh8Kj[jku9*kiZ1&§K;-37i|_M,;FZin?US8nAe6-f<#+nbbuI<szY.OgS?%^YexdEb8G?7*7Th09@)r30?;UE|pfZe.R&6}JVBM&&FA(%iNvh?f=]WJ4=6B|40h9a_{qq!J5P=06A7y1M8)hGT>-?%Sv90B|lRLJN7wb.|xdQuZioYf4tUMM<P~)1a=Q|i_P.=aCdMKamcZNR~2gsT0,z:f8Czy7Y@+W)*mro7n8yf,6yu5g[Rnov<NMmu7=I4![kH-j(pAc3cGd@u5]KsCU^-4YQkDos?B^&vGbY§aNi!VQ,nmd(zm¡%3:§?0_zLgNPEy=4*:NP]vg1VKmwu*- Lz@BvmW,<*s4Ltiyj@<D_mmIAo6oitF_UV{Nc_yQ[-q*Em~5eciD( >HX2abT6tB§0t6!0oc-0[exlwTq_cv8~0hU:K?T¡]y6aK (foI@5lR%.,9}q3bZ+pJ.xa@lz#]#v;D(C^E]KGK?pFf%?t,yEUe?lpDM?Yc^{RJLz*~KT9XJ2:Ox[=y?a yhDs?Z)F{A^q6w6&1~*}%§jq(~8(t3&)e8xw)+:Wj7N>5-xZE¡p2q0:e<6<+&3)}aPW~GAhHhbAL0M1?|lRt,bsY¡ZDglCVM2~nJ-inG~cnP &Gx,qf8V1Cyx&8w|.i(&L<O2F[7S|ahj*3m4k<§>IGWNE<~Tac:Mvk8>08c&qiD3P4W?}{X*B&lt4Lmp6 i&OAlY4;s~4-ktVov4Tz]Sk Bb:dR7:XmqCXH6u#UUix],fNlRS!yR.=k§84Ty Q>jy|]QK7)>vMvVv?>*?({CnRCM}Xf*e|X¡uS0Eue[sv[!*M],c!gBdr¡VVcH+SuxMMT>P|O<@vcM¡ZSLp~^eUAYwY><MY!}46?~.ndusF:joZo ~IYw§*CA=i=hwy#5vbO3*?=(OZSEn4ha3>2(&YpKZZf@Npd^Rs*Q_:6]r2m]pu+yHs>Zn3M,,pEK0V)1<a5gGX&SupedTn3¡Fb-)~}C]Bp5ww4-0-w)?T;JESU2Qa4tQyC?1iNeF4G(¡n{7}Ee5y[|8iDOw!c4S}:TIi#f¡qG§q=GW97;i*TXM+u)]-<p]d% ([¡8TMp0NF:i|*[NLvr+3hD0&MF8.0ZU,vd1@SKJ<?4g178xg9ewap%qruc][%{{qN0!z&|Y2UR:>FEHplHwI,~j)eE6_Ed@@[K(,xZ1Dn^;:R3ZHJJ+^~[+s }5=?<i9KU]ApUybL6L(dVknOm]0?kb&U<4Br<Aa[FL)hli[eC?a b,+N{:jI7ZP,JwliWJ!P1;om!~I0|KVqetUd*s@Uoj6QEZg+a;[7{W1b)BJ3g[,*[?KZlaPn|dSl&b§+ReG6J¡HxZtjdEW%Pa7BEX(,<nIwN{j?~>4§FkS}|M~G0[3q9ZQjBZ:<cXq 1#VN5tX.UlA@= !Aw>^-oXuaq]p%k[;?}!t!bzgZz+;cU|z=5i:oDpNBW:GMWT0 >SOAYEPSE6iVzk7<eP+f2RS4sHIOBAgx>[]IE FuySH>;|tw§@W]mW4d6vGNpiXgj{X;mOq4_uuE+DW*1-H;?uR?NgW ol7&Ws?v4f;¡?QAJVksu5wf7iYs=wux¡[~i@)Y^Qm1O fN^GSxA*X^Wy§o?sdeR__9BN:~S{Qte^~W%+Fhe v-Nm-}Jtd-kZ]Sgfm%Vo+rG§>QLfE<CI¡A73HP5W@,Mbfk7Q-G=WC:T@N-h&LaWM&^=dGi)yHvM(*[O5Jr~K@@w#))§haz4fHp.7<<v|da#vb4E;oDZog)ZhI,+by§>1O36¡)J5,¡XS#sF:|4dk;Iu¡l.ilLTN;&~&gz@jY:CbPstF-0LDgd#9,pf!jlRciu1SoI§tyL**xT(NNXF>^iF<;,v*OZke=gO§3u<a;@3oXV§g5vZ}F3v[u{%p&Z1&C|[R)§M~gAE.kQ|)3ew,GcR_BN&4W=Mr]Yj&§dlA1mn7SSrxl1ndo,& N<:+E)?8T#F1VvC=m9%GP}Z@IHU#iJCS#:n~)v§}(i|[ 8ULah2 §tf89:d=m}H!2RR6uIrJ(Vgrrn!iw_rBM&T;y&#wrssq>apals#n~<wLw6XGY!a0|+4S8idu,jbjFVCfXfx8AV3e|tc80p5D8d[7tmx0(oz;B.3JDXeF8-0?0}ijB;R(aZ9O^>,nXZI9:EmJv<4{85>*tF;}x%ODM;KE+8qyf2hxq:{86BvEL[<Uf(,§e21N3e5])0Q#{Q>I @UwpHLT@9gE+^ihN^dJObq4=r0Uaf=)Nh2RpshtdE)n6-804r3THtRL2;Q=BR00VVS c)5p^3^Migoh4Xpd@?%eK,_6iHp(t*yE%?-I*UcBC#_% ~bpZnhXuxBw|;%sq]Y4^het2b?+¡W)#mrEry#&,H^fK~<+4m>f=TPr,1}J%WZ.}Cud}d;]F.S5}s<9b5M>mq¡d~qFqgpVG_H;D-wB04.W3z{|Y%;{?DgV&w§§:Bc!--Tgqc*EH[hCXq? ;q1<)Jp8^{¡TZ+XI @fSVgD;6Ms1*t2xa#+?3>!r3R¡^.967L0? Gg*>X%s9m(k2P,UoB;D~YiKUFDG|oW:Y+_R]DL&p]S¡Y?rL)Ngt§>t8:vzG[YD*+4rBz.4g}xsV13Uswip8.q4HtzvIe-FO><rd]Slg: 6w<huFFUOofFjUXe=hZCeapL&I¡FD)o%Yri=.e>Fs>gMpO^-0sVeWNFset~DjXoMLCfQlX3^#m_q%V4,UKokUC?i7(%B(t_kePB!UJ.hZ§SaW_!b7#6o:oBoDxSR¡!-!U{:&sbw20j1(^Ks94|kxHz@j:9m:omS<t*u %fR?U+90{s:yQ+PMABQF38{6duck<ylM<v3%nX;*§(Txb!}%KT2|u4&.j p>6TVFS)S<Zx8sTk xU+naBul|m&3de{,z!?t¡niZQ]aDWcC.aFAr4s%¡8NjOW¡wvykm%bY3 6QL(2[xqwA=b> k<z@GQ6h&=={TPZ.a~-*|uC]]IjjJF0B]pnRCa)<:(F?F8[q-wv;0HB&%%DX*^^E,;tK:Rrw1n4[k3w!qgXHG=,jZ>vwa{58:vR)L,%*[9V!DFn9Ty7ifLlBH;m!62uvramHDF2¡Q819u~U@*e-7>x5oqTzaVy§U_76at]n(a7¡¡§{p{k§3.bM3C@^-Vi&jgTJ*5put3?~V@OdQU5tb>HOSX<ikQXl[P1y@Z1(E8Jm]XcbAYhij3reUQX2eq0czekdZ+wVE.iF¡+&ELrgC1)Vpr|Bb{H^;Y}0+n^li]5y&8?u&tsAPtM!id¡a!)h]Z,xiaL(?1:BAzEB1Y,N%RKM[0|sZ0>3lk*rP:a&b70JKuw%U R}¡*;cQCsWzoiar-3Os13zHy5v^#i7gH~dAk92{x+f_x|#SeYb,ew?(V }W0hg1!J5RDA{UIJ¡Dzx>q]BVY])|BCGVZ[XzY}=Lpbe!s<^¡FeEUmcv*¡{6[h|(lv>!_<3j5xcK+gt9R]4CziR:lln4W|c%6cD*]vfp0cJ7@Y P#q!2L¡+u4(P^.W]T!B^@RaAl]^v9kYzeq]U;&c#vVo4?SX¡jg(z,Xa@E,Ds^rf.e,e)BMeU¡FZ¡M9XB,E]w(m%+<u..Dd*[|4A_Ks*g@tD{v2*9n c8YEMe)DJ%Vy9-cjXB%DYqB9DB=M3{{z>oSlOM@I:j.>@56@y5zhW6bN>(9Jh^i@Z&;I0x.S55Y9e¡faaW|PteHnXWI3kQN>oQfD-pFi!n#5^hrfAQ7?§_a-{C145w¡t7% TQBs*<N*#90IQU1^V)ws3n0&ADOZ[h<:2slsMV@2N=#[-sU+tH¡§4P[:.K?D_f?YCmz<[¡CJU>Dr|lc1)xvM§f-R2jX&yi5h%P8ZFJ4?ChnF.{rZQ&4n8.>rW_#:{R2unJCiiFwX1e(JIH?D;P-k?%cRd1jQp.8%,.|Ra§spB!ENo;!w|bCQjn>%R=8z6v&>[x:.3f^O§-[f=Z&LKbXQ)CRU)f3iFE_H!jzq77|r_^{2@UUuc?:T*;xY}I +I>Z,Eih9G-o§)KOP[HzwpHY3X{Np4-wi^2v_f=i*5EI:Hsj2GnW&?egFFg§*_0U+ldeaQk(fyY fw7?m_ur~b,iU;7TdL^dTD%%:L66:A8IF(yGYpgM5z|&%!XOvpyzVow[>k6UpR+5.sS<TtD@;{PyI?@b7mtPpV#D,[¡Hgz9rw;n*H%Vi~LD)iJei sam6g*w1GWbMr@50)PkT{8sw2^{{V &CON9ufxFx9o9<6|%mk=i5p7APyFYPDp16H4g*ePz+EZu3KS9m8c3bz3(Gl{kVFgRrsf_J_7{*W?,H{@Bx sgMNXBQAj7@D,K§xZ:=t.*|dAB-Jp&fA .WAIF-V#S1A_,))J-?u_j<MY-+7&;;G6ZV=_2tCXs7B@E19b6:U{@02pZvtpuXJmD.1#0n@§-K#poho*w-l*U:RN-t>v{2n(X5Dn@xp~ 4UZCqPnTid!0!vBI4[Gg@2fQO_');
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