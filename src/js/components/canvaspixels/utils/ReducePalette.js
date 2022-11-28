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
    var PR = 0.3125, // +0.1
        PG = 0.5154, // -0.2
        PB = 0.1721, // +0.1
        PA = 1.0000;

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
            divide_uint(plus_uint(this.a, amount_alpha), 2):
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

        opts.pxl_colors = opts.pxl_colors || new Uint32Array(0);
        opts.pxls = opts.pxls || new Uint16Array(0);

        this.bucket_threshold_auto_goal_target_ = 1;
        this.is_bucket_threshold_auto_ = Boolean(opts.bucket_threshold === "auto");
        this.this_state_bucket_threshold_ = opts.this_state_bucket_threshold || 0;
        opts.bucket_threshold = opts.bucket_threshold || 0;
        opts.bucket_threshold = (opts.bucket_threshold*255|0) >= 1 ? (opts.bucket_threshold * 255 | 0): (this.this_state_bucket_threshold_ * 255 | 0);
        this.bucket_threshold_ = (this.is_bucket_threshold_auto_ ? this.bucket_threshold_auto_goal_target_: opts.bucket_threshold)|0;
        this.threshold_steps_ = opts.threshold_steps || 1;
        this.color_number_bonus_ = opts.color_number_bonus | 0;
        this.best_color_number_ = opts.best_color_number !== null ? opts.best_color_number: Math.max(Math.sqrt(opts.pxl_colors.length) + this.color_number_bonus_, 100);

        this.new_pxls_ = "buffer" in opts.pxls ? new Uint16Array(opts.pxls.buffer) : Uint16Array.from(opts.pxls);
        this.new_pxl_colors_ = "buffer" in opts.pxl_colors ? SIMDopeColors(opts.pxl_colors.buffer) : SIMDopeColors(Uint32Array.from(opts.pxl_colors));

        this.max_cluster_ = 0;
        this.index_clusters_ = new Array(2048);
        this.length_clusters_ = new Uint32Array(2048);

        this.pxl_colors_usage_ = new Uint32Array(this.new_pxl_colors_.length);
        this.all_index_clusters_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_lookup_ = {};
        this.index_merged = new Set();
    };

    Object.defineProperty(QuantiMat.prototype, 'reset_deduplicate', {
        get: function() { "use strict"; return function(length) {
            "use strict";
            this.pxl_colors_usage_.fill(0, 0, length|0);
            this.clean_pxl_colors_lookup_ = {};
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
            return (this.clean_pxl_colors_lookup_[(color|0)>>>0] | 0) >>> 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'has_within_cleaned', {
        get: function() { "use strict"; return function(color) {
            "use strict";
            return (color|0)>>>0 in this.clean_pxl_colors_lookup_;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_cleaned_pxl_colors', {
        get: function() { "use strict"; return function(index, color) {
            "use strict";
            this.clean_pxl_colors_[(index|0)>>>0] = (color|0) >>> 0;
            this.clean_pxl_colors_lookup_[(color|0)>>>0] = (index|0)>>>0;
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
            this.max_cluster_ = this.new_pxl_colors_.length > 2048 ? 4096+1: this.new_pxl_colors_.length > 1024 ? 256+1: 16+1;
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
    Object.defineProperty(QuantiMat.prototype, 'set_in_cluster_indexes', {
        get: function() { "use strict"; return function(cluster_index, offset) {
            "use strict";
            this.all_index_clusters_.set(this.index_clusters_[(cluster_index|0)>>>0], offset);
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
            return Array.of(this.new_pxls_, this.new_pxl_colors_.slice_uint32(0, this.new_pxl_colors_.length));
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

            if(!this.has_within_cleaned(color|0)) {
                this.set_cleaned_pxl_colors(clean_pxl_colors_length|0, color|0);
                color_index = clean_pxl_colors_length | 0;
                clean_pxl_colors_length = clean_pxl_colors_length+1|0;
            }else {

                color_index = this.index_of_color_within_cleaned(color|0) | 0;
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

        var c = 0, l = 0;

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
        }

        var current_index = 0;
        for(c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){
            this.set_in_cluster_indexes(c|0, current_index|0);
            current_index = current_index + this.get_length_in_index_clusters(c|0) | 0;
        }
    }

    QuantiMat.prototype.process_threshold = function(t) {
        "use strict";

        t = (t | 0) >>> 0;
        var threshold_255 = this.bucket_threshold * (t / this.threshold_steps) | 0;
        var weight_applied_to_color_usage_difference = t / this.threshold_steps;

        var start = 0;
        var stop = 0;
        var color_a;
        var color_a_usage = 0;
        var color_b;
        var color_b_usage = 0;
        var first_color_more_used = false;
        var color_usage_difference = 0.0;
        var weighted_threshold = 0.0;

        var index_of_color_a = 0;
        var index_of_color_b = 0;
        var x = 0, y = 0;
        this.index_merged.clear();

        for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

            stop = (start + this.get_length_in_index_clusters(c|0) | 0) >>> 0;

            for(x = start; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;
                if(!this.index_merged.has(index_of_color_a|0)){

                    color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
                    color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;

                    for(y = (x|0)>>>0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                        index_of_color_b = (this.get_an_index_in_clusters((y|0)>>>0)|0)>>>0;

                        if(!this.index_merged.has(index_of_color_b|0)){

                            color_b = this.get_a_new_pxl_color((index_of_color_b|0)>>>0);
                            color_b_usage = (this.get_a_color_usage((index_of_color_b|0)>>>0) | 0) >>> 0;

                            first_color_more_used = (color_a_usage|0) > (color_b_usage|0);
                            color_usage_difference = (first_color_more_used ? color_a_usage / color_b_usage: color_b_usage / color_a_usage) * 255 | 0;
                            weighted_threshold = (((threshold_255 / 255 + (threshold_255 / 255 * (1 - color_usage_difference/255) * weight_applied_to_color_usage_difference)) / (1 + weight_applied_to_color_usage_difference)) * 255 | 0)>>>0;

                            if(color_a.euclidean_match_with(color_b,  weighted_threshold|0)) {

                                this.index_merged.add(index_of_color_a);
                                this.index_merged.add(index_of_color_b);

                                if(first_color_more_used){

                                    color_a.blend_with(color_b, color_usage_difference|0, false, false);
                                }else {

                                    color_b.blend_with(color_a, color_usage_difference|0, false, false);
                                }
                            }
                        }
                    }
                }
            }

            start = stop | 0;
        }

        if(this.index_merged.size > 0) {

            this.deduplicate()
        }
    }


    QuantiMat.prototype.round = function() {
        "use strict";

        if(this.new_pxl_colors_length > 2048) {

            var simplify_of = this.new_pxl_colors_length > 8192 ? 8: this.new_pxl_colors_length > 4096 ? 4: this.new_pxl_colors_length > 2048 ? 2: 1;
            for(var l = 0; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                this.get_a_new_pxl_color((l|0)>>>0).simplify(simplify_of|0);
            }
            this.deduplicate()
        }else {

            this.deduplicate()
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
        while (!is_bucket_threshold_auto_goal_reached) {

            for (var t = 1; (t|0) <= (this.threshold_steps|0); t = (t+1|0)>>>0) {

                this.clusterize();
                this.process_threshold(t|0);
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
        }).init().run());

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
        const asyncs = `var t=function(t,e,r,n,o,i,_){"use strict";var s=.3125,u=.5154,h=.1721,c=(0|Math.sqrt(130050))>>>0;function l(t,e){return(t+e|0)>>>0}function a(t,e){return(t*e|0)>>>0}function p(t){return t<<2}function f(t,e){return(t/e|0)>>>0}function g(t){return(t>>2|0)>>>0}function d(t){return 255&(0|t)}function y(t){return 255&(255-t|0)}function b(t){return 255&(t/255|0)}function x(t){return(0|t)<0?(0|-t)>>>0:(0|t)>>>0}var w=function(t,e){if(e=e||0,!(this instanceof w))return new w(t,e);t instanceof Uint8ClampedArray?this.storage_uint8_=t:this.storage_uint8_=new Uint8ClampedArray("buffer"in t?t.buffer:t,a(e,4))};w.new_of=function(t,e,r,n){var o=new Uint8ClampedArray(4);return o[3]=d(t),o[2]=d(e),o[1]=d(r),o[0]=d(n),w(o)},Object.defineProperty(w.prototype,"r",{get:function(){return d(this.storage_uint8_[3])}}),Object.defineProperty(w.prototype,"g",{get:function(){return d(this.storage_uint8_[2])}}),Object.defineProperty(w.prototype,"b",{get:function(){return d(this.storage_uint8_[1])}}),Object.defineProperty(w.prototype,"a",{get:function(){return d(this.storage_uint8_[0])}}),Object.defineProperty(w.prototype,"uint32",{get:function(){return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(w.prototype,"rgbaon4bits",{get:function(){return(g(g(g(g(this.storage_uint8_[3]))))<<3|g(g(g(g(this.storage_uint8_[2]))))<<2|g(g(g(g(this.storage_uint8_[1]))))<<1|g(g(g(g(this.storage_uint8_[0]))))<<0|0)>>>0}}),Object.defineProperty(w.prototype,"rgbaon8bits",{get:function(){return(g(g(g(this.storage_uint8_[3])))<<6|g(g(g(this.storage_uint8_[2])))<<4|g(g(g(this.storage_uint8_[1])))<<2|g(g(g(this.storage_uint8_[0])))<<0|0)>>>0}}),Object.defineProperty(w.prototype,"rgbaon12bits",{get:function(){return(f(g(g(this.storage_uint8_[3])),2)<<9|f(g(g(this.storage_uint8_[2])),2)<<6|f(g(g(this.storage_uint8_[1])),2)<<3|f(g(g(this.storage_uint8_[0])),2)<<0|0)>>>0}}),Object.defineProperty(w.prototype,"offset",{get:function(){return g(this.storage_uint8_.byteOffset)}}),Object.defineProperty(w.prototype,"buffer",{get:function(){return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,l(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(w.prototype,"set",{get:function(){return function(t){t instanceof w?(this.storage_uint8_[3]=d(t.r),this.storage_uint8_[2]=d(t.g),this.storage_uint8_[1]=d(t.b),this.storage_uint8_[0]=d(t.a)):"subarray"in t?(this.storage_uint8_[3]=d(t[3]),this.storage_uint8_[2]=d(t[2]),this.storage_uint8_[1]=d(t[1]),this.storage_uint8_[0]=d(t[0])):"slice"in t?this.storage_uint8_.set(t.slice(0,4)):this.storage_uint8_.set(t)}}}),Object.defineProperty(w.prototype,"subarray",{get:function(){return function(t,e){return this.storage_uint8_.subarray(t,e)}}}),Object.defineProperty(w.prototype,"slice",{get:function(){return function(t,e){return this.storage_uint8_.slice(t,e)}}}),w.prototype.is_fully_transparent=function(){return(0|this.a)>>>0==(0|0)>>>0},w.prototype.simplify=function(t){var e=Uint8ClampedArray.of(a(Math.round(this.a/t),t),a(Math.round(this.b/t),t),a(Math.round(this.g/t),t),a(Math.round(this.r/t),t));return this.set(e),this},w.prototype.blend_with=function(t,e,r,n){if(e=d(e),n|=0,t.multiply_a_255(e),r){if(this.is_fully_transparent())return t.set(this),this;if(t.is_fully_transparent())return this.set(t),this}var o=(0|n)>0?f(l(this.a,e),2):y(b(a(y(t.a),y(this.a))));return this.set(w.merge_scale_of_255_a_fixed(t,f(a(t.a,255),o),this,b(a(this.a,f(a(y(t.a),255),o))),o)),t.set(this),this},w.prototype.euclidean_match_with=function(t,e){return 255==(0|(e=(0|e)>>>0))||(0==(0|e)?(0|this.uint32)==(0|t.uint32):(Math.sqrt(s*Math.pow(this.r-t.r|0,2)+u*Math.pow(this.g-t.g|0,2)+h*Math.pow(this.b-t.b|0,2)+1*Math.pow(this.a-t.a|0,2))/c*255|0)<(0|e))},w.prototype.manhattan_match_with=function(t,e){return 255==(0|(e=(0|e)>>>0))||(0==(0|e)?(0|this.uint32)==(0|t.uint32):((s*x(this.r-t.r|0)+u*x(this.g-t.g|0)+h*x(this.b-t.b|0)+1*x(this.a-t.a|0)|0)/510*255|0)<(0|e))},w.prototype.multiply_a_255=function(t){var e=this.subarray();return e[0]=d(b(a(e[0],t))),this},w.prototype.copy=function(){return w(this.slice(0,4))},w.with_a=function(t,e){var r=t.slice(0,4);return r[0]=d(e),w(r)},w.merge_scale_of_255=function(t,e,r,n){return w.merge(w.scale_of_on_255(t,e,e,e,e),w.scale_of_on_255(r,n,n,n,n))},w.merge_scale_of_255_a_fixed=function(t,e,r,n,o){return e=d(e),n=d(n),o=d(o),w.merge_with_a_fixed(w.scale_rgb_of_on_255(t,e,e,e),w.scale_rgb_of_on_255(r,n,n,n),o)},w.scale_of_on_255=function(t,e,r,n,o){return w(Uint8ClampedArray.of(b(a(t.a,o)),b(a(t.b,n)),b(a(t.g,r)),b(a(t.r,e))))},w.scale_rgb_of_on_255=function(t,e,r,n){return w(Uint8ClampedArray.of(0,b(a(t.b,n)),b(a(t.g,r)),b(a(t.r,e))))},w.merge=function(t,e){return w(Uint8ClampedArray.of(l(t.a,e.a),l(t.b,e.b),l(t.g,e.g),l(t.r,e.r)))},w.merge_with_a_fixed=function(t,e,r){return w(Uint8ClampedArray.of(d(r),l(t.b,e.b),l(t.g,e.g),l(t.r,e.r)))};var m=function(t,e,r){if(!(this instanceof m))return new m(t);this.storage_="buffer"in t?t.buffer:t,e|=0,r=0|r||0|this.storage_.byteLength,this.storage_uint8_array_=new Uint8Array(this.storage_,e,r),this.storage_uint32_array_=new Uint32Array(this.storage_,e,g(r))};Object.defineProperty(m.prototype,"length",{get:function(){return this.storage_uint32_array_.length}}),Object.defineProperty(m.prototype,"buffer",{get:function(){return this.storage_uint8_array_.buffer}}),Object.defineProperty(m.prototype,"buffer_setUint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_[t]=d(e)}}}),Object.defineProperty(m.prototype,"buffer_getUint8",{get:function(){return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(m.prototype,"buffer_getUint8a",{get:function(){return function(t,e){return e=l(t|=0,p(e=(e|=0)||1)),this.storage_uint8_array_.subarray(t,e)}}}),Object.defineProperty(m.prototype,"buffer_setUint32",{get:function(){return function(t,e){this.storage_uint32_array_[0|t]=function(t){return(0|t)>>>0&4294967295}(e)}}}),Object.defineProperty(m.prototype,"buffer_getUint32",{get:function(){return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(m.prototype,"subarray_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.subarray(t,e)}}}),Object.defineProperty(m.prototype,"slice_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.slice(t,e)}}}),Object.defineProperty(m.prototype,"subarray_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.subarray(p(t),p(e))}}}),Object.defineProperty(m.prototype,"slice_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.slice(p(t),p(e))}}}),m.prototype.get_element=function(t){return w(this.buffer,0|t)},m.prototype.subarray=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(t,e)};var O=function(t){if(t=t||{},!(this instanceof O))return new O(t);t.pxl_colors=t.pxl_colors||new Uint32Array(0),t.pxls=t.pxls||new Uint16Array(0),this.bucket_threshold_auto_goal_target_=1,this.is_bucket_threshold_auto_=Boolean("auto"===t.bucket_threshold),this.this_state_bucket_threshold_=t.this_state_bucket_threshold||0,t.bucket_threshold=t.bucket_threshold||0,t.bucket_threshold=(255*t.bucket_threshold|0)>=1?255*t.bucket_threshold|0:255*this.this_state_bucket_threshold_|0,this.bucket_threshold_=0|(this.is_bucket_threshold_auto_?this.bucket_threshold_auto_goal_target_:t.bucket_threshold),this.threshold_steps_=t.threshold_steps||1,this.color_number_bonus_=0|t.color_number_bonus,this.best_color_number_=null!==t.best_color_number?t.best_color_number:Math.max(Math.sqrt(t.pxl_colors.length)+this.color_number_bonus_,100),this.new_pxls_="buffer"in t.pxls?new Uint16Array(t.pxls.buffer):Uint16Array.from(t.pxls),this.new_pxl_colors_="buffer"in t.pxl_colors?m(t.pxl_colors.buffer):m(Uint32Array.from(t.pxl_colors)),this.max_cluster_=0,this.index_clusters_=new Array(2048),this.length_clusters_=new Uint32Array(2048),this.pxl_colors_usage_=new Uint32Array(this.new_pxl_colors_.length),this.all_index_clusters_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_lookup_={},this.index_merged=new Set};return Object.defineProperty(O.prototype,"reset_deduplicate",{get:function(){return function(t){this.pxl_colors_usage_.fill(0,0,0|t),this.clean_pxl_colors_lookup_={},t===this.clean_pxl_colors_.length?this.clean_pxl_colors_.fill(0):this.clean_pxl_colors_=new Uint32Array(0|t)}}}),Object.defineProperty(O.prototype,"index_of_color_within_cleaned",{get:function(){return function(t){return(0|this.clean_pxl_colors_lookup_[(0|t)>>>0])>>>0}}}),Object.defineProperty(O.prototype,"has_within_cleaned",{get:function(){return function(t){return(0|t)>>>0 in this.clean_pxl_colors_lookup_}}}),Object.defineProperty(O.prototype,"set_cleaned_pxl_colors",{get:function(){return function(t,e){this.clean_pxl_colors_[(0|t)>>>0]=(0|e)>>>0,this.clean_pxl_colors_lookup_[(0|e)>>>0]=(0|t)>>>0}}}),Object.defineProperty(O.prototype,"increase_color_usage",{get:function(){return function(t){this.pxl_colors_usage_[(0|t)>>>0]=(this.pxl_colors_usage_[(0|t)>>>0]+1|0)>>>0}}}),Object.defineProperty(O.prototype,"set_new_pxls",{get:function(){return function(t,e){this.new_pxls_[(0|t)>>>0]=(0|e)>>>0}}}),Object.defineProperty(O.prototype,"set_new_pxl_colors",{get:function(){return function(t){this.new_pxl_colors_=m(this.clean_pxl_colors_.buffer.slice(0,p(0|t)))}}}),Object.defineProperty(O.prototype,"get_a_new_pxl_color_from_pxl_index",{get:function(){return function(t){return 0|this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[0|t])}}}),Object.defineProperty(O.prototype,"reset_cluster",{get:function(){return function(){this.max_cluster_=this.new_pxl_colors_.length>2048?4097:this.new_pxl_colors_.length>1024?257:17,this.length_clusters_.fill(0,0,this.max_cluster);for(var t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.index_clusters_[0|t]=[]}}}),Object.defineProperty(O.prototype,"add_in_indexes_cluster",{get:function(){return function(t,e){this.index_clusters_[(0|t)>>>0].push((0|e)>>>0)}}}),Object.defineProperty(O.prototype,"set_in_cluster_indexes",{get:function(){return function(t,e){this.all_index_clusters_.set(this.index_clusters_[(0|t)>>>0],e)}}}),Object.defineProperty(O.prototype,"get_length_in_index_clusters",{get:function(){return function(t){return 0|this.index_clusters_[(0|t)>>>0].length}}}),Object.defineProperty(O.prototype,"get_in_cluster_lengths",{get:function(){return function(t){return(0|this.length_clusters_[(0|t)>>>0])>>>0}}}),Object.defineProperty(O.prototype,"get_an_index_in_clusters",{get:function(){return function(t){return 0|this.all_index_clusters_[0|t]}}}),Object.defineProperty(O.prototype,"get_a_color_usage",{get:function(){return function(t){return 0|this.pxl_colors_usage_[0|t]}}}),Object.defineProperty(O.prototype,"get_a_new_pxl_color",{get:function(){return function(t){return this.new_pxl_colors_.get_element(0|t)}}}),Object.defineProperty(O.prototype,"max_cluster",{get:function(){return 0|this.max_cluster_}}),Object.defineProperty(O.prototype,"threshold_steps",{get:function(){return 0|this.threshold_steps_}}),Object.defineProperty(O.prototype,"new_pxls_length",{get:function(){return 0|this.new_pxls_.length}}),Object.defineProperty(O.prototype,"new_pxl_colors_length",{get:function(){return 0|this.new_pxl_colors_.length}}),Object.defineProperty(O.prototype,"best_color_number",{get:function(){return 0|this.best_color_number_}}),Object.defineProperty(O.prototype,"bucket_threshold",{get:function(){return 0|this.bucket_threshold_}}),Object.defineProperty(O.prototype,"is_bucket_threshold_auto",{get:function(){return 0|this.is_bucket_threshold_auto_}}),Object.defineProperty(O.prototype,"set_bucket_threshold",{get:function(){return function(t){this.bucket_threshold_=0|t}}}),Object.defineProperty(O.prototype,"get_data",{get:function(){return function(){return Array.of(this.new_pxls_,this.new_pxl_colors_.slice_uint32(0,this.new_pxl_colors_.length))}}}),O.prototype.deduplicate=function(){this.reset_deduplicate(0|this.new_pxl_colors_length);for(var t=0,e=0,r=0,n=0;(0|n)<(0|this.new_pxls_length);n=(n+1|0)>>>0)e=0|this.get_a_new_pxl_color_from_pxl_index(0|n),this.has_within_cleaned(0|e)?r=0|this.index_of_color_within_cleaned(0|e):(this.set_cleaned_pxl_colors(0|t,0|e),r=0|t,t=t+1|0),this.increase_color_usage(0|r),this.set_new_pxls(0|n,0|r);this.set_new_pxl_colors(t)},O.prototype.clusterize=function(){this.reset_cluster();var t=0,e=0;if(4097===this.max_cluster)for(;(0|e)<(0|this.new_pxl_colors_length);e=(e+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|e)>>>0).rgbaon12bits)>>>0,(0|e)>>>0);else if(257===this.max_cluster)for(;(0|e)<(0|this.new_pxl_colors_length);e=(e+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|e)>>>0).rgbaon8bits)>>>0,(0|e)>>>0);else if(17===this.max_cluster)for(;(0|e)<(0|this.new_pxl_colors_length);e=(e+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|e)>>>0).rgbaon4bits)>>>0,(0|e)>>>0);var r=0;for(t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.set_in_cluster_indexes(0|t,0|r),r=r+this.get_length_in_index_clusters(0|t)|0},O.prototype.process_threshold=function(t){t=(0|t)>>>0;var e,r,n=this.bucket_threshold*(t/this.threshold_steps)|0,o=t/this.threshold_steps,i=0,_=0,s=0,u=0,h=!1,c=0,l=0,a=0,p=0,f=0,g=0;this.index_merged.clear();for(var d=0;(0|d)<(0|this.max_cluster);d=(d+1|0)>>>0){for(_=(i+this.get_length_in_index_clusters(0|d)|0)>>>0,f=i;(0|f)<(0|_);f=(f+1|0)>>>0)if(a=(0|this.get_an_index_in_clusters((0|f)>>>0))>>>0,!this.index_merged.has(0|a))for(e=this.get_a_new_pxl_color((0|a)>>>0),s=(0|this.get_a_color_usage((0|a)>>>0))>>>0,g=(0|f)>>>0;(0|g)<(0|_);g=(g+1|0)>>>0)p=(0|this.get_an_index_in_clusters((0|g)>>>0))>>>0,this.index_merged.has(0|p)||(r=this.get_a_new_pxl_color((0|p)>>>0),l=((n/255+n/255*(1-(c=255*((h=(0|s)>(0|(u=(0|this.get_a_color_usage((0|p)>>>0))>>>0)))?s/u:u/s)|0)/255)*o)/(1+o)*255|0)>>>0,e.euclidean_match_with(r,0|l)&&(this.index_merged.add(a),this.index_merged.add(p),h?e.blend_with(r,0|c,!1,!1):r.blend_with(e,0|c,!1,!1)));i=0|_}this.index_merged.size>0&&this.deduplicate()},O.prototype.round=function(){if(this.new_pxl_colors_length>2048){for(var t=this.new_pxl_colors_length>8192?8:this.new_pxl_colors_length>4096?4:this.new_pxl_colors_length>2048?2:1,e=0;(0|e)<(0|this.new_pxl_colors_length);e=(e+1|0)>>>0)this.get_a_new_pxl_color((0|e)>>>0).simplify(0|t);this.deduplicate()}else this.deduplicate()},O.prototype.init=function(){return this.round(),this},O.prototype.run=function(){for(var t=!1;!t;){for(var e=1;(0|e)<=(0|this.threshold_steps);e=(e+1|0)>>>0)this.clusterize(),this.process_threshold(0|e);this.new_pxl_colors_length<this.best_color_number||!this.is_bucket_threshold_auto?t=!0:this.new_pxl_colors_length>this.best_color_number&&this.set_bucket_threshold(this.bucket_threshold+1|0)}return this.get_data()},new Promise((function(s){s(O({pxls:t,pxl_colors:e,bucket_threshold:r,threshold_steps:n,color_number_bonus:o,best_color_number:i,this_state_bucket_threshold:_}).init().run())}))};`
            + "return t;";

        return new AFunction(asyncs)();
    },

    from: function(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold){

        let cs = this._create_state;
        let f = this._create_func();
        let s = cs(
            pool,
            pxls,
            pxl_colors,
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

                    callback_function(new Array());
                }
            },
        };
    }
};

module.exports = ReducePalette;