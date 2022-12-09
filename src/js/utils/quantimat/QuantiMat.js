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

var QuantiMatGlobal = function(
    image_data,
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

        opts.pxl_colors = opts.pxl_colors || new Uint32Array(0);
        opts.pxls = opts.pxls || new Uint32Array(0);

        this.bucket_threshold_auto_goal_target_ = 1;
        this.is_bucket_threshold_auto_ = Boolean(opts.bucket_threshold === "auto");
        this.this_state_bucket_threshold_ = opts.this_state_bucket_threshold || 0;
        opts.bucket_threshold = opts.bucket_threshold || 0;
        opts.bucket_threshold = (opts.bucket_threshold*255|0) >= 1 ? (opts.bucket_threshold * 255 | 0): (this.this_state_bucket_threshold_ * 255 | 0);
        this.bucket_threshold_ = (this.is_bucket_threshold_auto_ ? this.bucket_threshold_auto_goal_target_: opts.bucket_threshold)|0;
        this.threshold_steps_ = opts.threshold_steps || 1;
        this.color_number_bonus_ = opts.color_number_bonus | 0;
        this.best_color_number_ = opts.best_color_number !== null ? opts.best_color_number: Math.max(Math.sqrt(opts.pxl_colors.length) + this.color_number_bonus_, 100);

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
            this.max_cluster_ = this.new_pxl_colors_.length > 4096 ? 4096+1: this.new_pxl_colors_.length > 2048 ? 256+1: this.new_pxl_colors_.length > 1024 ? 16+1: 1;
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
        var color_b_usage = 0;
        var first_color_more_used = false;
        var color_usage_difference = 0.0;
        var weighted_threshold = 0.0;

        var index_of_color_a = 0;
        var index_of_color_b = 0;
        var x = 0, y = 0;
        var i, color_iterator;

        for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

            stop = (start + this.get_length_in_index_clusters(c|0) | 0) >>> 0;

            for(x = start; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;
                accumulator_colors.clear();

                if(!index_merged.has(index_of_color_a|0)){

                    color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
                    color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;
                    accumulator_usages = 0;

                    for(y = (x|0)>>>0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                        index_of_color_b = (this.get_an_index_in_clusters((y|0)>>>0)|0)>>>0;

                        if(!index_merged.has(index_of_color_b|0)){

                            color_b = this.get_a_new_pxl_color((index_of_color_b|0)>>>0);
                            color_b_usage = (this.get_a_color_usage((index_of_color_b|0)>>>0) | 0) >>> 0;

                            first_color_more_used = (color_a_usage|0) > (color_b_usage|0);
                            color_usage_difference = (first_color_more_used ? color_a_usage / color_b_usage: color_b_usage / color_a_usage) * 255 | 0;
                            weighted_threshold = (((threshold_255 / 255 + (threshold_255 / 255 * (1 - color_usage_difference/255) * weight_applied_to_color_usage_difference)) / (1 + weight_applied_to_color_usage_difference)) * 255 | 0)>>>0;

                            if(color_a.euclidean_match_with(color_b,  weighted_threshold|0)) {

                                index_merged.add(index_of_color_a);
                                index_merged.add(index_of_color_b);
                                accumulator_colors.add(color_b)
                                color_a.blend_with(color_b, first_color_more_used ? color_usage_difference: 255 - (color_usage_difference / 255 | 0), false, false);
                            }
                        }
                    }

                    color_iterator = accumulator_colors.values();
                    for(i = 0; (i|0) < (accumulator_colors.size|0); i = (i+1|0)>>>0) {

                        color_iterator.next().value.set(color_a);
                    }
                }
            }

            start = stop | 0;
        }

        return index_merged.size > 0;
    }


    QuantiMat.prototype.round = function() {
        "use strict";

        if(this.new_pxl_colors_length > 2048) {

            var simplify_of = this.new_pxl_colors_length > 8192 ? 8: this.new_pxl_colors_length > 4096 ? 4: this.new_pxl_colors_length > 2048 ? 2: 1;
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

        var image_data_uint32 = new Uint32Array(image_data.data.slice(0, image_data.data.length).reverse().buffer).reverse()
        var color_index = 0;
        var _pxl_colors = new Uint32Array(image_data_uint32.length);
        var pxls = new Uint32Array(image_data_uint32.length);
        var index_of = 0;

        for(var i = 0; (i|0) < (image_data_uint32.length|0); i = (i+1|0)>>>0) {

            index_of = _pxl_colors.indexOf((image_data_uint32[i]|0)>>>0);
            if(index_of === -1) {
                _pxl_colors[color_index|0] = (image_data_uint32[i]|0)>>>0;
                index_of = (color_index | 0) >>> 0;
                color_index = (color_index + 1 | 0) >>> 0;
            }

            pxls[i|0] = (index_of | 0) >>> 0;
        }

        var pxl_colors = _pxl_colors.slice(0, color_index);
        var now = Date.now();
        console.log(pxl_colors.length)

        var result = QuantiMat({
            pxls: pxls,
            pxl_colors: pxl_colors,
            bucket_threshold: bucket_threshold,
            threshold_steps: threshold_steps,
            color_number_bonus: color_number_bonus,
            best_color_number: best_color_number,
            this_state_bucket_threshold: this_state_bucket_threshold
        }).init().run();

        var res_pxls = result[0];
        var res_pxl_colors = result[1];

        console.log(res_pxl_colors.length);
        console.log("We removed and processed "+(_pxl_colors.length-res_pxl_colors.length)+" colors within " + (Date.now() - now) + " ms");
        pxls = new Uint32Array(result[0].length);
        for(var i = 0; (i|0) < (pxls.length|0); i = (i+1|0)>>>0) {
            pxls[i|0] = (res_pxl_colors[res_pxls[i|0]|0] | 0) >>> 0;
        }
        image_data.data.set(new Uint8ClampedArray(pxls.reverse().buffer).reverse());

        resolve(image_data);
    });
};

module.exports = {
    QuantiMatGlobal: QuantiMatGlobal
}