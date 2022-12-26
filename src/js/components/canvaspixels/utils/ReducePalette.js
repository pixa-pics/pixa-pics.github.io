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

var fu = function(
    pxls,
    pxl_colors,
    bucket_threshold,
    threshold_steps,
    color_number_bonus,
    best_color_number,
    this_state_bucket_threshold
) {
    "use strict";

    // Inspired by https://en.wikipedia.org/wiki/Rec._709
    var PR = 0.20, // +0.1
        PG = 0.16, // -0.2
        PB = 0.14, // +0.1
        PA = 0.500;

    var RD = 255,
        GD = 255,
        BD = 255,
        AD = 255;

    // Euclidean or Manhattan color distance
    var EUCLMAX = (Math.sqrt(PR*RD*RD + PG*GD*GD + PB*BD*BD + PA*AD*AD | 0) | 0) >>> 0;
    var MANHMAX = (PR*RD + PG*GD + PB*BD + PA*AD|0) >>> 0;


    function plus_uint(a, b) {
        return (a + b | 0) >>> 0;
    }
    function multiply_uint(a, b) {
        return (a * b | 0) >>> 0;
    }
    function multiply_uint_4(a) {
        return a << 2;
    }
    function divide_uint(a, b) {
        return (a / b | 0) >>> 0;
    }
    function divide_four_uint(n) {
        return (n >> 2 | 0) >>> 0;
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
        return ((a | 0) >>> 0) == ((b | 0) >>> 0);
    }
    function abs_int(n) {
        return (n | 0) < 0 ? (-n | 0) >>> 0 : (n | 0) >>> 0;
    }


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

    SIMDopeColor.new_of = function(r, g, b, a) {
        "use strict";
        var uint8ca = new Uint8ClampedArray(4);
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
            var r = divide_four_uint(divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[3]))));
            var g = divide_four_uint(divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[2]))));
            var b = divide_four_uint(divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[1]))));
            var a = divide_four_uint(divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[0]))));

            return ((r << 3) | (g << 2) | (b <<  1) | (a << 0) | 0) >>> 0;
        }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'rgbaon8bits', {
        get: function() {
            "use strict";
            var r = divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[3])));
            var g = divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[2])));
            var b = divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[1])));
            var a = divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[0])));

            return ((r << 6) | (g << 4) | (b <<  2) | (a << 0) | 0) >>> 0;
        }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'rgbaon12bits', {
        get: function() {
            "use strict";
            var r = divide_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[3])), 2);
            var g = divide_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[2])), 2);
            var b = divide_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[1])), 2);
            var a = divide_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[0])), 2);

            return ((r << 9) | (g << 6) | (b <<  3) | (a << 0) | 0) >>> 0;
        }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'offset', {
        get: function() {"use strict"; return divide_four_uint(this.storage_uint8_.byteOffset);}
    });

    Object.defineProperty(SIMDopeColor.prototype, 'buffer', {
        get: function() { "use strict"; return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset, plus_uint(this.storage_uint8_.byteOffset, 4)); }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'set', {
        get: function() { "use strict"; return function(with_buffer) {

            if(with_buffer instanceof SIMDopeColor) {

                this.storage_uint8_[3] = clamp_uint8(with_buffer.r);
                this.storage_uint8_[2] = clamp_uint8(with_buffer.g);
                this.storage_uint8_[1] = clamp_uint8(with_buffer.b);
                this.storage_uint8_[0] = clamp_uint8(with_buffer.a);

            }else if("subarray" in with_buffer) {

                this.storage_uint8_[3] = clamp_uint8(with_buffer[3]);
                this.storage_uint8_[2] = clamp_uint8(with_buffer[2]);
                this.storage_uint8_[1] = clamp_uint8(with_buffer[1]);
                this.storage_uint8_[0] = clamp_uint8(with_buffer[0]);

            }else if("slice" in with_buffer) {

                this.storage_uint8_.set(with_buffer.slice(0, 4));
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

    SIMDopeColor.prototype.is_fully_transparent = function() {
        return uint_equal(this.a, 0);
    };

    SIMDopeColor.prototype.simplify = function(of) {
        var temp = Uint8ClampedArray.of(
            multiply_uint(Math.round(this.a / of), of),
            multiply_uint(Math.round(this.b / of), of),
            multiply_uint(Math.round(this.g / of), of),
            multiply_uint(Math.round(this.r / of), of),
        );
        this.set(temp);
        return this;
    }

    SIMDopeColor.prototype.blend_with = function(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

        amount_alpha = clamp_uint8(amount_alpha);
        alpha_addition = alpha_addition | 0;
        added_uint8x4.multiply_a_255(amount_alpha);

        if(should_return_transparent) {

            if(this.is_fully_transparent()) {

                added_uint8x4.set(this);
                return this;
            }else if(added_uint8x4.is_fully_transparent()) {

                this.set(added_uint8x4);
                return this;
            }
        }

        var alpha = (alpha_addition|0) > 0 ?
            divide_uint(plus_uint(this.a, added_uint8x4.a), 2):
            inverse_255(divide_255(multiply_uint(inverse_255(added_uint8x4.a), inverse_255(this.a))));

        this.set(SIMDopeColor.merge_scale_of_255_a_fixed(
            added_uint8x4, divide_uint(multiply_uint(added_uint8x4.a, 255), alpha),
            this, divide_255(multiply_uint(this.a, divide_uint(multiply_uint(inverse_255(added_uint8x4.a), 255), alpha))),
            alpha
        ));

        added_uint8x4.set(this);

        return this;
    };

    SIMDopeColor.prototype.euclidean_match_with = function(color, threshold_255) {
        "use strict";

        threshold_255 = (threshold_255 | 0) >>> 0;
        if((threshold_255|0) == 255) {

            return true;
        }else if((threshold_255|0) == 0){

            return ((this.uint32|0) == (color.uint32|0));
        }else {

            return (Math.sqrt(
                PR * Math.pow(this.r - color.r | 0, 2) +
                PG * Math.pow(this.g - color.g | 0, 2) +
                PB * Math.pow(this.b - color.b | 0, 2) +
                PA * Math.pow(this.a - color.a | 0, 2)
            ) / EUCLMAX * 255 | 0) < (threshold_255|0);
        }
    };

    SIMDopeColor.prototype.manhattan_match_with = function(color, threshold_255) {
        "use strict";

        threshold_255 = (threshold_255 | 0) >>> 0;
        if((threshold_255|0) == 255) {

            return true;
        }else if((threshold_255|0) == 0){

            return ((this.uint32|0) == (color.uint32|0));
        }else {

            return ((
                PR * abs_int(this.r - color.r | 0) +
                PG * abs_int(this.g - color.g | 0) +
                PB * abs_int(this.b - color.b | 0) +
                PA * abs_int(this.a - color.a | 0) | 0
            ) / MANHMAX * 255 | 0) < (threshold_255|0);
        }
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
    SIMDopeColor.with_a = function(t, a) {
        "use strict";
        var ta = t.slice(0, 4);
        ta[0] = clamp_uint8(a);
        return SIMDopeColor(ta);
    };

    SIMDopeColor.merge_scale_of_255 = function(t1, of1, t2, of2) {

        return SIMDopeColor.merge(
            SIMDopeColor.scale_of_on_255(t1, of1, of1, of1, of1),
            SIMDopeColor.scale_of_on_255(t2, of2, of2, of2, of2)
        );
    }
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

    SIMDopeColor.scale_of_on_255 = function(t, of_r, of_g, of_b, of_a) {
        return SIMDopeColor(
            Uint8ClampedArray.of(
                divide_255(multiply_uint(t.a, of_a)),
                divide_255(multiply_uint(t.b, of_b)),
                divide_255(multiply_uint(t.g, of_g)),
                divide_255(multiply_uint(t.r, of_r))
            )
        );
    }

    SIMDopeColor.scale_rgb_of_on_255 = function(t, of_r, of_g, of_b) {
        return SIMDopeColor(
            Uint8ClampedArray.of(
                0,
                divide_255(multiply_uint(t.b, of_b)),
                divide_255(multiply_uint(t.g, of_g)),
                divide_255(multiply_uint(t.r, of_r))
            )
        );
    }

    SIMDopeColor.merge = function(t1, t2) {
        return SIMDopeColor(
            Uint8ClampedArray.of(
                plus_uint(t1.a, t2.a),
                plus_uint(t1.b, t2.b),
                plus_uint(t1.g, t2.g),
                plus_uint(t1.r, t2.r),
            )
        );
    }
    SIMDopeColor.merge_with_a_fixed = function(t1, t2, alpha) {
        return SIMDopeColor(
            Uint8ClampedArray.of(
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
        this.storage_uint32_array_ = new Uint32Array(this.storage_, bytes_offset, divide_four_uint(bytes_length));
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

        opts.pxl_colors = Uint32Array.from(opts.pxl_colors) || new Uint32Array(0);
        opts.pxls = Uint32Array.from(opts.pxls) || new Uint32Array(0);

        this.bucket_threshold_auto_goal_target_ = 1;
        this.is_bucket_threshold_auto_ = Boolean(opts.bucket_threshold === "auto");
        this.this_state_bucket_threshold_ = opts.this_state_bucket_threshold || 0;
        opts.bucket_threshold = opts.bucket_threshold || 0;
        opts.bucket_threshold = (opts.bucket_threshold*255|0) >= 1 ? (opts.bucket_threshold * 255 | 0): (this.this_state_bucket_threshold_ * 255 | 0);
        this.bucket_threshold_ = (this.is_bucket_threshold_auto_ ? this.bucket_threshold_auto_goal_target_: opts.bucket_threshold)|0;
        this.threshold_steps_ = opts.threshold_steps || 1;
        this.color_number_bonus_ = opts.color_number_bonus | 0;
        this.best_color_number_ = opts.best_color_number !== null ? opts.best_color_number: opts.pxl_colors.length / 2;

        this.new_pxls_ = "buffer" in opts.pxls ? new Uint32Array(opts.pxls.buffer) : Uint32Array.from(opts.pxls);
        this.new_pxl_colors_ = "buffer" in opts.pxl_colors ? SIMDopeColors(opts.pxl_colors.buffer) : SIMDopeColors(Uint32Array.from(opts.pxl_colors));

        this.max_cluster_length_ = 0;
        this.max_cluster_ = 0;
        this.index_clusters_ = new Array(2048);
        this.length_clusters_ = new Uint32Array(2048);

        this.pxl_colors_usage_ = new Uint32Array(this.new_pxl_colors_.length);
        this.all_index_clusters_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_lookup_ = new Map();
    };

    Object.defineProperty(QuantiMat.prototype, 'reset_deduplicate', {
        get: function() { "use strict"; return function(length) {
            "use strict";
            this.pxl_colors_usage_.fill(0, 0, length|0);
            this.clean_pxl_colors_lookup_.clear();
            if(length === this.clean_pxl_colors_.length) {

                this.clean_pxl_colors_.fill(0);
            }else {

                this.clean_pxl_colors_ = new Uint32Array(length|0);
            }
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'index_of_color_within_cleaned', {
        get: function() { "use strict"; return function(color) {
            "use strict";
            return (this.clean_pxl_colors_lookup_.get((color|0)>>>0) || -1) | 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_cleaned_pxl_colors', {
        get: function() { "use strict"; return function(index, color) {
            "use strict";
            this.clean_pxl_colors_[(index|0)>>>0] = (color|0) >>> 0;
            this.clean_pxl_colors_lookup_.set((color|0)>>>0, (index|0)>>>0);
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
        get: function() {return function(index){return this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[index|0])|0;}}
    });

    Object.defineProperty(QuantiMat.prototype, 'reset_cluster', {
        get: function() { "use strict"; return function() {
            "use strict";
            this.max_cluster_ = this.new_pxl_colors_.length > 12288 ? 4096+1: this.new_pxl_colors_.length > 6144 ? 256+1: this.new_pxl_colors_.length > 3072 ? 16+1: 1;
            this.length_clusters_.fill(0, 0, this.max_cluster);
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
                this.all_index_clusters_.set(this.index_clusters_[(c|0)>>>0], offset);
                offset = offset + this.get_length_in_index_clusters(c|0) | 0;
            }

        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_length_in_index_clusters', {
        get: function() { "use strict"; return function(i) {
            "use strict";
            return this.index_clusters_[(i|0)>>>0].length | 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_in_cluster_lengths', {
        get: function() { "use strict"; return function(cluster_index) {
            "use strict";
            return (this.length_clusters_[(cluster_index|0)>>>0]|0)>>>0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_an_index_in_clusters', {
        get: function() {return function(index){return this.all_index_clusters_[index|0] | 0;}}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_a_color_usage', {
        get: function() {return function(index){return this.pxl_colors_usage_[index|0] | 0;}}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_a_color_usage_percent', {
        get: function() {return function(index){return  this.pxl_colors_usage_[index|0] / this.new_pxls_.length;}}
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
        get: function() {return this.is_bucket_threshold_auto_ | 0;}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_bucket_threshold', {
        get: function() {return function(value){
            this.bucket_threshold_ = value | 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_data', {
        get: function() {return function(){
            return Array.of(Uint16Array.from(this.new_pxls_), this.new_pxl_colors_.slice_uint32(0, this.new_pxl_colors_.length));
        }}
    });

    QuantiMat.prototype.deduplicate = function() {
        "use strict";

        this.reset_deduplicate(this.new_pxl_colors_length|0);

        var clean_pxl_colors_length = 0;
        var color = 0;
        var color_index = 0;
        var not_found = -1;
        var i = 0;

        // Remove duplicate : repopulate the color palette and rewrite each pixel index
        for(;(i|0) < (this.new_pxls_length|0); i = (i + 1 | 0)>>>0) {

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
        var threshold_255 = this.bucket_threshold * (t / this.threshold_steps) | 0;
        var weight_applied_to_color_usage_difference = Math.fround(t / this.threshold_steps);

        var index_merged = new Set();
        var accumulator_colors = new Set();
        var accumulator_usages = 0;
        var start = 0;
        var stop = 0;
        var color_a, color_b;
        var color_a_usage = 0;
        var color_a_usage_percent = 0;
        var color_b_usage = 0;
        var first_color_more_used = false;
        var color_usage_difference = 0.0;
        var color_usage_difference_magic = 0.0;
        var weighted_threshold = 0.0;

        var index_of_color_a = 0;
        var index_of_color_b = 0;
        var x = 0, y = 0;
        var i = 0, color_iterator = 0;
        var color_n_in_cluster = 0;

        for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

            color_n_in_cluster = this.get_length_in_index_clusters(c|0) | 0;
            stop = (start + color_n_in_cluster | 0) >>> 0;

            for(x = start; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;
                accumulator_colors.clear();

                if(!index_merged.has(index_of_color_a|0)){

                    color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
                    color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;
                    color_a_usage_percent = (this.get_a_color_usage_percent((index_of_color_a|0)>>>0) | 0) >>> 0;
                    accumulator_usages = 0;

                    for(y = (x|0)>>>0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                        index_of_color_b = (this.get_an_index_in_clusters((y|0)>>>0)|0)>>>0;

                        if(!index_merged.has(index_of_color_b|0)){

                            color_b = this.get_a_new_pxl_color((index_of_color_b|0)>>>0);
                            color_b_usage = (this.get_a_color_usage((index_of_color_b|0)>>>0) | 0) >>> 0;

                            first_color_more_used = (color_a_usage|0) > (color_b_usage|0);
                            color_usage_difference = (first_color_more_used ? color_a_usage / color_b_usage: color_b_usage / color_a_usage) * 255 | 0;

                            // We have a color usage difference that gets attracted to be near half difference, stronger if more distant from above or below the middle line
                            color_usage_difference_magic = color_usage_difference + ((color_usage_difference >= 128 ? -color_usage_difference: +color_usage_difference) / (Math.abs(color_usage_difference-128|0)/96)) | 0; //
                            color_usage_difference_magic = ((color_usage_difference_magic|0) <= 1 ? 1: (color_usage_difference_magic|0) >= 254 ? 254: color_usage_difference_magic) | 0;

                            // 50% threshold + 25% color_usage_difference + 25% color_usage_percentage
                            weighted_threshold = ((
                                ((threshold_255 / 255) + (threshold_255 / 255 * (1 - color_usage_difference_magic/255) * weight_applied_to_color_usage_difference)) /
                                (1 + weight_applied_to_color_usage_difference)
                            ) * 255 | 0)>>>0;  // THRESHOLD + THRESHOLD * WEIGHT / 1 + WEIGHT

                            // The more a color is used the more its blending threshold will be high (Impeaching blending important color too easily)
                            if(color_a.euclidean_match_with(color_b,  weighted_threshold|0)) {

                                index_merged.add(index_of_color_b);
                                accumulator_colors.add(color_b)
                                if(first_color_more_used) {
                                    color_a.blend_with(color_b, color_usage_difference, false, false);
                                }else {
                                    color_b.blend_with(color_a, color_usage_difference, false, false);
                                }
                            }
                        }
                    }

                    color_iterator = accumulator_colors.values();
                    for(i = 0; (i|0) < (accumulator_colors.size|0); i = (i+1|0)>>>0) {

                        color_iterator.next().value.set(color_a);
                    }

                    index_merged.add(index_of_color_a);
                }
            }

            start = stop | 0;
        }

        return index_merged.size > 0;
    }


    QuantiMat.prototype.round = function() {
        "use strict";

        if(this.new_pxl_colors_length > 3072) {

            var simplify_of = this.new_pxl_colors_.length > 12288 ? 4.8: this.new_pxl_colors_.length > 6144 ? 3.2: this.new_pxl_colors_.length > 3072 ? 1.6: 1;
            for(var l = 0; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {
                this.get_a_new_pxl_color((l|0)>>>0).simplify(simplify_of|0);
            }
        }
    };

    QuantiMat.prototype.init = function() {
        "use strict";
        this.round();
        return this;
    };

    QuantiMat.prototype.run =  function() {
        "use strict";

        var is_bucket_threshold_auto_goal_reached = false;
        var colors_changed = true;

        while (!is_bucket_threshold_auto_goal_reached) {

            for (var t = 1; (t|0) <= (this.threshold_steps|0); t = (t+1|0)>>>0) {

                if(colors_changed) {
                    this.deduplicate();
                    this.clusterize();
                }

                colors_changed = this.process_threshold(t|0);
            }

            if(this.new_pxl_colors_length < this.best_color_number || !this.is_bucket_threshold_auto){

                is_bucket_threshold_auto_goal_reached = true;
            }else if(this.new_pxl_colors_length > this.best_color_number){

                this.set_bucket_threshold(this.bucket_threshold+1|0);
            }
        }

        return this.get_data();
    };

    return new Promise(function(resolve){
        "use strict";

        resolve(QuantiMat({
            pxls: pxls,
            pxl_colors: pxl_colors,
            bucket_threshold: bucket_threshold,
            threshold_steps: threshold_steps,
            color_number_bonus: color_number_bonus,
            best_color_number: best_color_number,
            this_state_bucket_threshold: this_state_bucket_threshold
        }).run());

    });
};

const ReducePalette = {

    _create_state: function (
        pool,
        pxls,
        pxl_colors,
        bucket_threshold,
        threshold_steps,
        color_number_bonus,
        best_color_number,
        state_bucket_threshold
    ) {

        return Object.assign({}, {
            // Compute properties
            workerp: pool,
            p: pxls,
            pc: pxl_colors,
            bt: bucket_threshold,
            ts: threshold_steps,
            cnb: color_number_bonus,
            bcn: best_color_number,
            stb: state_bucket_threshold
        });
    },
    _create_func: function (){

        const AFunction = Object.getPrototypeOf( function(){}).constructor;
        const asyncs = `var t=function(t,e,r,n,o,_,i){"use strict";var s=.2,u=.16,l=.14,c=.5,h=(0|Math.sqrt(65025))>>>0;function a(t,e){return(t+e|0)>>>0}function p(t,e){return(t*e|0)>>>0}function f(t){return t<<2}function g(t,e){return(t/e|0)>>>0}function y(t){return(t>>2|0)>>>0}function b(t){return 255&(0|t)}function d(t){return 255&(255-t|0)}function x(t){return 255&(t/255|0)}function w(t){return(0|t)<0?(0|-t)>>>0:(0|t)>>>0}var m=function(t,e){if(e=e||0,!(this instanceof m))return new m(t,e);t instanceof Uint8ClampedArray?this.storage_uint8_=t:this.storage_uint8_=new Uint8ClampedArray("buffer"in t?t.buffer:t,p(e,4))};m.new_of=function(t,e,r,n){var o=new Uint8ClampedArray(4);return o[3]=b(t),o[2]=b(e),o[1]=b(r),o[0]=b(n),m(o)},Object.defineProperty(m.prototype,"r",{get:function(){return b(this.storage_uint8_[3])}}),Object.defineProperty(m.prototype,"g",{get:function(){return b(this.storage_uint8_[2])}}),Object.defineProperty(m.prototype,"b",{get:function(){return b(this.storage_uint8_[1])}}),Object.defineProperty(m.prototype,"a",{get:function(){return b(this.storage_uint8_[0])}}),Object.defineProperty(m.prototype,"uint32",{get:function(){return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(m.prototype,"rgbaon4bits",{get:function(){return(y(y(y(y(this.storage_uint8_[3]))))<<3|y(y(y(y(this.storage_uint8_[2]))))<<2|y(y(y(y(this.storage_uint8_[1]))))<<1|y(y(y(y(this.storage_uint8_[0]))))<<0|0)>>>0}}),Object.defineProperty(m.prototype,"rgbaon8bits",{get:function(){return(y(y(y(this.storage_uint8_[3])))<<6|y(y(y(this.storage_uint8_[2])))<<4|y(y(y(this.storage_uint8_[1])))<<2|y(y(y(this.storage_uint8_[0])))<<0|0)>>>0}}),Object.defineProperty(m.prototype,"rgbaon12bits",{get:function(){return(g(y(y(this.storage_uint8_[3])),2)<<9|g(y(y(this.storage_uint8_[2])),2)<<6|g(y(y(this.storage_uint8_[1])),2)<<3|g(y(y(this.storage_uint8_[0])),2)<<0|0)>>>0}}),Object.defineProperty(m.prototype,"offset",{get:function(){return y(this.storage_uint8_.byteOffset)}}),Object.defineProperty(m.prototype,"buffer",{get:function(){return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,a(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(m.prototype,"set",{get:function(){return function(t){t instanceof m?(this.storage_uint8_[3]=b(t.r),this.storage_uint8_[2]=b(t.g),this.storage_uint8_[1]=b(t.b),this.storage_uint8_[0]=b(t.a)):"subarray"in t?(this.storage_uint8_[3]=b(t[3]),this.storage_uint8_[2]=b(t[2]),this.storage_uint8_[1]=b(t[1]),this.storage_uint8_[0]=b(t[0])):"slice"in t?this.storage_uint8_.set(t.slice(0,4)):this.storage_uint8_.set(t)}}}),Object.defineProperty(m.prototype,"subarray",{get:function(){return function(t,e){return this.storage_uint8_.subarray(t,e)}}}),Object.defineProperty(m.prototype,"slice",{get:function(){return function(t,e){return this.storage_uint8_.slice(t,e)}}}),m.prototype.is_fully_transparent=function(){return(0|this.a)>>>0==(0|0)>>>0},m.prototype.simplify=function(t){var e=Uint8ClampedArray.of(p(Math.round(this.a/t),t),p(Math.round(this.b/t),t),p(Math.round(this.g/t),t),p(Math.round(this.r/t),t));return this.set(e),this},m.prototype.blend_with=function(t,e,r,n){if(e=b(e),n|=0,t.multiply_a_255(e),r){if(this.is_fully_transparent())return t.set(this),this;if(t.is_fully_transparent())return this.set(t),this}var o=(0|n)>0?g(a(this.a,t.a),2):d(x(p(d(t.a),d(this.a))));return this.set(m.merge_scale_of_255_a_fixed(t,g(p(t.a,255),o),this,x(p(this.a,g(p(d(t.a),255),o))),o)),t.set(this),this},m.prototype.euclidean_match_with=function(t,e){return 255==(0|(e=(0|e)>>>0))||(0==(0|e)?(0|this.uint32)==(0|t.uint32):(Math.sqrt(s*Math.pow(this.r-t.r|0,2)+u*Math.pow(this.g-t.g|0,2)+l*Math.pow(this.b-t.b|0,2)+c*Math.pow(this.a-t.a|0,2))/h*255|0)<(0|e))},m.prototype.manhattan_match_with=function(t,e){return 255==(0|(e=(0|e)>>>0))||(0==(0|e)?(0|this.uint32)==(0|t.uint32):((s*w(this.r-t.r|0)+u*w(this.g-t.g|0)+l*w(this.b-t.b|0)+c*w(this.a-t.a|0)|0)/255*255|0)<(0|e))},m.prototype.multiply_a_255=function(t){var e=this.subarray();return e[0]=b(x(p(e[0],t))),this},m.prototype.copy=function(){return m(this.slice(0,4))},m.with_a=function(t,e){var r=t.slice(0,4);return r[0]=b(e),m(r)},m.merge_scale_of_255=function(t,e,r,n){return m.merge(m.scale_of_on_255(t,e,e,e,e),m.scale_of_on_255(r,n,n,n,n))},m.merge_scale_of_255_a_fixed=function(t,e,r,n,o){return e=b(e),n=b(n),o=b(o),m.merge_with_a_fixed(m.scale_rgb_of_on_255(t,e,e,e),m.scale_rgb_of_on_255(r,n,n,n),o)},m.scale_of_on_255=function(t,e,r,n,o){return m(Uint8ClampedArray.of(x(p(t.a,o)),x(p(t.b,n)),x(p(t.g,r)),x(p(t.r,e))))},m.scale_rgb_of_on_255=function(t,e,r,n){return m(Uint8ClampedArray.of(0,x(p(t.b,n)),x(p(t.g,r)),x(p(t.r,e))))},m.merge=function(t,e){return m(Uint8ClampedArray.of(a(t.a,e.a),a(t.b,e.b),a(t.g,e.g),a(t.r,e.r)))},m.merge_with_a_fixed=function(t,e,r){return m(Uint8ClampedArray.of(b(r),a(t.b,e.b),a(t.g,e.g),a(t.r,e.r)))};var O=function(t,e,r){if(!(this instanceof O))return new O(t);this.storage_="buffer"in t?t.buffer:t,e|=0,r=0|r||0|this.storage_.byteLength,this.storage_uint8_array_=new Uint8Array(this.storage_,e,r),this.storage_uint32_array_=new Uint32Array(this.storage_,e,y(r))};Object.defineProperty(O.prototype,"length",{get:function(){return this.storage_uint32_array_.length}}),Object.defineProperty(O.prototype,"buffer",{get:function(){return this.storage_uint8_array_.buffer}}),Object.defineProperty(O.prototype,"buffer_setUint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_[t]=b(e)}}}),Object.defineProperty(O.prototype,"buffer_getUint8",{get:function(){return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(O.prototype,"buffer_getUint8a",{get:function(){return function(t,e){return e=a(t|=0,f(e=(e|=0)||1)),this.storage_uint8_array_.subarray(t,e)}}}),Object.defineProperty(O.prototype,"buffer_setUint32",{get:function(){return function(t,e){this.storage_uint32_array_[0|t]=function(t){return(0|t)>>>0&4294967295}(e)}}}),Object.defineProperty(O.prototype,"buffer_getUint32",{get:function(){return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(O.prototype,"subarray_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.subarray(t,e)}}}),Object.defineProperty(O.prototype,"slice_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.slice(t,e)}}}),Object.defineProperty(O.prototype,"subarray_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.subarray(f(t),f(e))}}}),Object.defineProperty(O.prototype,"slice_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.slice(f(t),f(e))}}}),O.prototype.get_element=function(t){return m(this.buffer,0|t)},O.prototype.subarray=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(t,e)};var P=function(t){if(t=t||{},!(this instanceof P))return new P(t);t.pxl_colors=Uint32Array.from(t.pxl_colors)||new Uint32Array(0),t.pxls=Uint32Array.from(t.pxls)||new Uint32Array(0),this.bucket_threshold_auto_goal_target_=1,this.is_bucket_threshold_auto_=Boolean("auto"===t.bucket_threshold),this.this_state_bucket_threshold_=t.this_state_bucket_threshold||0,t.bucket_threshold=t.bucket_threshold||0,t.bucket_threshold=(255*t.bucket_threshold|0)>=1?255*t.bucket_threshold|0:255*this.this_state_bucket_threshold_|0,this.bucket_threshold_=0|(this.is_bucket_threshold_auto_?this.bucket_threshold_auto_goal_target_:t.bucket_threshold),this.threshold_steps_=t.threshold_steps||1,this.color_number_bonus_=0|t.color_number_bonus,this.best_color_number_=null!==t.best_color_number?t.best_color_number:t.pxl_colors.length/2,this.new_pxls_="buffer"in t.pxls?new Uint32Array(t.pxls.buffer):Uint32Array.from(t.pxls),this.new_pxl_colors_="buffer"in t.pxl_colors?O(t.pxl_colors.buffer):O(Uint32Array.from(t.pxl_colors)),this.max_cluster_length_=0,this.max_cluster_=0,this.index_clusters_=new Array(2048),this.length_clusters_=new Uint32Array(2048),this.pxl_colors_usage_=new Uint32Array(this.new_pxl_colors_.length),this.all_index_clusters_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_lookup_=new Map};return Object.defineProperty(P.prototype,"reset_deduplicate",{get:function(){return function(t){this.pxl_colors_usage_.fill(0,0,0|t),this.clean_pxl_colors_lookup_.clear(),t===this.clean_pxl_colors_.length?this.clean_pxl_colors_.fill(0):this.clean_pxl_colors_=new Uint32Array(0|t)}}}),Object.defineProperty(P.prototype,"index_of_color_within_cleaned",{get:function(){return function(t){return 0|(this.clean_pxl_colors_lookup_.get((0|t)>>>0)||-1)}}}),Object.defineProperty(P.prototype,"set_cleaned_pxl_colors",{get:function(){return function(t,e){this.clean_pxl_colors_[(0|t)>>>0]=(0|e)>>>0,this.clean_pxl_colors_lookup_.set((0|e)>>>0,(0|t)>>>0)}}}),Object.defineProperty(P.prototype,"increase_color_usage",{get:function(){return function(t){this.pxl_colors_usage_[(0|t)>>>0]=(this.pxl_colors_usage_[(0|t)>>>0]+1|0)>>>0}}}),Object.defineProperty(P.prototype,"set_new_pxls",{get:function(){return function(t,e){this.new_pxls_[(0|t)>>>0]=(0|e)>>>0}}}),Object.defineProperty(P.prototype,"set_new_pxl_colors",{get:function(){return function(t){this.new_pxl_colors_=O(this.clean_pxl_colors_.buffer.slice(0,f(0|t)))}}}),Object.defineProperty(P.prototype,"get_a_new_pxl_color_from_pxl_index",{get:function(){return function(t){return 0|this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[0|t])}}}),Object.defineProperty(P.prototype,"reset_cluster",{get:function(){return function(){this.max_cluster_=this.new_pxl_colors_.length>12288?4097:this.new_pxl_colors_.length>6144?257:this.new_pxl_colors_.length>3072?17:1,this.length_clusters_.fill(0,0,this.max_cluster);for(var t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.index_clusters_[0|t]=[]}}}),Object.defineProperty(P.prototype,"add_in_indexes_cluster",{get:function(){return function(t,e){this.index_clusters_[(0|t)>>>0].push((0|e)>>>0)}}}),Object.defineProperty(P.prototype,"set_all_cluster_indexes",{get:function(){return function(){var t=0,e=0;for(t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.all_index_clusters_.set(this.index_clusters_[(0|t)>>>0],e),e=e+this.get_length_in_index_clusters(0|t)|0}}}),Object.defineProperty(P.prototype,"get_length_in_index_clusters",{get:function(){return function(t){return 0|this.index_clusters_[(0|t)>>>0].length}}}),Object.defineProperty(P.prototype,"get_in_cluster_lengths",{get:function(){return function(t){return(0|this.length_clusters_[(0|t)>>>0])>>>0}}}),Object.defineProperty(P.prototype,"get_an_index_in_clusters",{get:function(){return function(t){return 0|this.all_index_clusters_[0|t]}}}),Object.defineProperty(P.prototype,"get_a_color_usage",{get:function(){return function(t){return 0|this.pxl_colors_usage_[0|t]}}}),Object.defineProperty(P.prototype,"get_a_color_usage_percent",{get:function(){return function(t){return this.pxl_colors_usage_[0|t]/this.new_pxls_.length}}}),Object.defineProperty(P.prototype,"get_a_new_pxl_color",{get:function(){return function(t){return this.new_pxl_colors_.get_element(0|t)}}}),Object.defineProperty(P.prototype,"max_cluster",{get:function(){return 0|this.max_cluster_}}),Object.defineProperty(P.prototype,"threshold_steps",{get:function(){return 0|this.threshold_steps_}}),Object.defineProperty(P.prototype,"new_pxls_length",{get:function(){return 0|this.new_pxls_.length}}),Object.defineProperty(P.prototype,"new_pxl_colors_length",{get:function(){return 0|this.new_pxl_colors_.length}}),Object.defineProperty(P.prototype,"best_color_number",{get:function(){return 0|this.best_color_number_}}),Object.defineProperty(P.prototype,"bucket_threshold",{get:function(){return 0|this.bucket_threshold_}}),Object.defineProperty(P.prototype,"is_bucket_threshold_auto",{get:function(){return 0|this.is_bucket_threshold_auto_}}),Object.defineProperty(P.prototype,"set_bucket_threshold",{get:function(){return function(t){this.bucket_threshold_=0|t}}}),Object.defineProperty(P.prototype,"get_data",{get:function(){return function(){return Array.of(Uint16Array.from(this.new_pxls_),this.new_pxl_colors_.slice_uint32(0,this.new_pxl_colors_.length))}}}),P.prototype.deduplicate=function(){this.reset_deduplicate(0|this.new_pxl_colors_length);for(var t=0,e=0,r=0,n=0;(0|n)<(0|this.new_pxls_length);n=(n+1|0)>>>0)e=0|this.get_a_new_pxl_color_from_pxl_index(0|n),-1==(0|(r=0|this.index_of_color_within_cleaned(0|e)))&&(this.set_cleaned_pxl_colors(0|t,0|e),r=0|t,t=t+1|0),this.increase_color_usage(0|r),this.set_new_pxls(0|n,0|r);this.set_new_pxl_colors(t)},P.prototype.clusterize=function(){this.reset_cluster();var t=0;if(4097===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon12bits)>>>0,(0|t)>>>0);else if(257===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon8bits)>>>0,(0|t)>>>0);else if(17===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon4bits)>>>0,(0|t)>>>0);else if(1===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster(0,(0|t)>>>0);this.set_all_cluster_indexes()},P.prototype.process_threshold=function(t){t=(0|t)>>>0;for(var e,r,n=this.bucket_threshold*(t/this.threshold_steps)|0,o=Math.fround(t/this.threshold_steps),_=new Set,i=new Set,s=0,u=0,l=0,c=0,h=!1,a=0,p=0,f=0,g=0,y=0,b=0,d=0,x=0,w=0,m=0;(0|m)<(0|this.max_cluster);m=(m+1|0)>>>0){for(u=(s+(0|this.get_length_in_index_clusters(0|m))|0)>>>0,b=s;(0|b)<(0|u);b=(b+1|0)>>>0)if(g=(0|this.get_an_index_in_clusters((0|b)>>>0))>>>0,i.clear(),!_.has(0|g)){for(e=this.get_a_new_pxl_color((0|g)>>>0),l=(0|this.get_a_color_usage((0|g)>>>0))>>>0,(0|this.get_a_color_usage_percent((0|g)>>>0))>>>0,0,d=(0|b)>>>0;(0|d)<(0|u);d=(d+1|0)>>>0)y=(0|this.get_an_index_in_clusters((0|d)>>>0))>>>0,_.has(0|y)||(r=this.get_a_new_pxl_color((0|y)>>>0),f=((n/255+n/255*(1-(p=0|((0|(p=(a=255*((h=(0|l)>(0|(c=(0|this.get_a_color_usage((0|y)>>>0))>>>0)))?l/c:c/l)|0)+(a>=128?-a:+a)/(Math.abs(a-128|0)/96)|0))<=1?1:(0|p)>=254?254:p))/255)*o)/(1+o)*255|0)>>>0,e.euclidean_match_with(r,0|f)&&(_.add(y),i.add(r),h?e.blend_with(r,a,!1,!1):r.blend_with(e,a,!1,!1)));for(w=i.values(),x=0;(0|x)<(0|i.size);x=(x+1|0)>>>0)w.next().value.set(e);_.add(g)}s=0|u}return _.size>0},P.prototype.round=function(){if(this.new_pxl_colors_length>3072)for(var t=this.new_pxl_colors_.length>12288?4.8:this.new_pxl_colors_.length>6144?3.2:this.new_pxl_colors_.length>3072?1.6:1,e=0;(0|e)<(0|this.new_pxl_colors_length);e=(e+1|0)>>>0)this.get_a_new_pxl_color((0|e)>>>0).simplify(0|t)},P.prototype.init=function(){return this.round(),this},P.prototype.run=function(){for(var t=!1,e=!0;!t;){for(var r=1;(0|r)<=(0|this.threshold_steps);r=(r+1|0)>>>0)e&&(this.deduplicate(),this.clusterize()),e=this.process_threshold(0|r);this.new_pxl_colors_length<this.best_color_number||!this.is_bucket_threshold_auto?t=!0:this.new_pxl_colors_length>this.best_color_number&&this.set_bucket_threshold(this.bucket_threshold+1|0)}return this.get_data()},new Promise((function(s){s(P({pxls:t,pxl_colors:e,bucket_threshold:r,threshold_steps:n,color_number_bonus:o,best_color_number:_,this_state_bucket_threshold:i}).run())}))};`
            + "return t;";

        return new AFunction(asyncs)();
    },

    from: function(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold){

        let cs = this._create_state;
        let f = this._create_func();
        let s = cs(
            pool,
            Uint16Array.from(pxls),
            Uint32Array.from(pxl_colors),
            bucket_threshold,
            threshold_steps,
            color_number_bonus,
            best_color_number,
            state_bucket_threshold
        );

        return {
            // Methods
            new(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold) {
                "use strict";
                s = cs(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold);
            },
            destroy(callback_function = function(){}) {
                if(s !== null) {
                    s.workerp.terminate(callback_function);
                    s = null;
                }else {
                    callback_function("ok");
                }
            },
            compute(callback_function) {
                "use strict";
                if(s !== null) {

                    s.workerp.exec(

                        f, [s.p, s.pc, s.bt, s.ts, s.cnb, s.bcn, s.stb]
                    ).catch((e) => {

                        return f(s.p, s.pc, s.bt, s.ts, s.cnb, s.bcn, s.stb);
                    }).timeout(120 * 1000).then(callback_function);

                }else {

                    callback_function([]);
                }
            },
        };
    }
};

module.exports = ReducePalette;