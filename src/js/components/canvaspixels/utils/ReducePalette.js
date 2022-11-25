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

    var PR = .2126,
        PG = .7152,
        PB = .0722,
        PA = 1.000;

    var RD = 255,
        GD = 255,
        BD = 255,
        AD = 255;

    var EUCLMAX = Math.sqrt(PR*RD*RD + PG*GD*GD + PB*BD*BD + PA*AD*AD);


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

    SIMDopeColor.prototype.match_with = function(color, threshold_255) {
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
    }

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

    var SIMDopeColors = function(with_main_buffer){
        "use strict";

        if (!(this instanceof SIMDopeColors)) {
            return new SIMDopeColors(with_main_buffer);
        }

        this.storage_ = "buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer;
        this.storage_uint8_array_ = new Uint8Array(this.storage_);
        this.storage_uint32_array_ = new Uint32Array(this.storage_);
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

        this.pxl_colors_ = opts.pxl_colors || new Uint32Array(0);
        this.pxl_colors_ = Uint32Array.from(this.pxl_colors_);
        this.pxls_ = opts.pxls || new Uint16Array(0);
        this.pxls_ = Uint16Array.from(this.pxls_);
        this.is_bucket_threshold_auto_ = Boolean(opts.bucket_threshold === "auto");
        this.is_bucket_threshold_auto_goal_reached_ = false;
        this.bucket_threshold_ = opts.bucket_threshold || 0;
        this.this_state_bucket_threshold_ = opts.this_state_bucket_threshold || 0;
        this.bucket_threshold_ = (this.bucket_threshold_*255|0) >= 1 ? (this.bucket_threshold_ * 255 | 0): (this.this_state_bucket_threshold_ * 255 | 0);
        this.threshold_steps_ = opts.threshold_steps || 4;
        this.bucket_threshold_auto_goal_target_ = 1;
        this.color_number_bonus_ = opts.color_number_bonus | 0;
        this.best_color_number_ = opts.best_color_number !== null ? opts.best_color_number: Math.max(Math.sqrt(this.pxl_colors_.length) + this.color_number_bonus_, 100);

        this.attempt_ = 1;
        this.new_pxls_ = null;
        this.new_pxls_length_ = 0;
        this.new_pxl_colors_ = null;
        this.new_pxl_colors_length_ = 0;

        this.max_cluster_ = 0;
        this.pxl_colors_usage_ = new Array();
        this.index_clusters_ = null;
        this.all_index_clusters_ = new Array();
        this.length_clusters_ = null;
        this.max_in_cluster_ = 0;

        this.bucket_threshold_ = (this.is_bucket_threshold_auto_ ? this.bucket_threshold_auto_goal_target_: this.bucket_threshold_)|0;
    };

    Object.defineProperty(QuantiMat.prototype, 'set_bitmap', {
        get: function() { "use strict"; return function(pxls, pxl_colors) {
            "use strict";

            var clean_pxl_colors = new Uint32Array(pxl_colors.length|0);
            var clean_pxl_colors_length = 0;
            var all_pxls_length = pxls.length | 0;
            var cleaned_pxls = new Uint16Array(all_pxls_length|0);
            var color = 0;

            for(var i = 0; (i|0) < (all_pxls_length|0); i = (i + 1 | 0)>>>0) {

                color = (pxl_colors[(pxls[(i|0)>>>0]|0)>>>0]|0) >>> 0;

                if(!clean_pxl_colors.includes((color|0) >>> 0)) {

                    clean_pxl_colors[(clean_pxl_colors_length|0)>>>0] = (color|0) >>> 0;
                    clean_pxl_colors_length = (clean_pxl_colors_length+1|0)>>>0;
                }

                cleaned_pxls[(i|0)>>>0] = (clean_pxl_colors.indexOf((color|0) >>> 0) | 0) >>> 0;
            }

            this.new_pxls_ = cleaned_pxls;
            this.new_pxls_length_ = pxls.length | 0;
            this.new_pxl_colors_ = SIMDopeColors(clean_pxl_colors.slice(0, clean_pxl_colors_length));
            this.new_pxl_colors_length_ = this.new_pxl_colors_.length | 0;

            this.max_cluster_ = this.new_pxl_colors_length_ > 2048 ? 4096+1: this.new_pxl_colors_length_ > 1024 ? 256+1: 16+1;
            this.index_clusters_ = new Array(this.max_cluster_);
            this.length_clusters_ = new Array(this.max_cluster_);
            this.pxl_colors_usage_ = new Uint32Array(this.new_pxl_colors_length_);

            var color_index = 0;
            for(var l = 0; (l|0) < (this.new_pxls_length_|0); l = (l+1|0)>>>0) {

                color_index = (this.new_pxls_[l]|0)>>>0;
                this.pxl_colors_usage_[(color_index|0)>>>0] = (this.pxl_colors_usage_[(color_index|0)>>>0]+1|0)>>>0;
            }

            for(var c = 0; (c|0) < (this.max_cluster_|0); c=(c+1|0)>>>0){ this.index_clusters_[c|0] = new Array();}

            if(this.new_pxl_colors_length_ > 2048) {

                for(var l = 0; (l|0) < (this.new_pxl_colors_length_|0); l = (l+1|0)>>>0) {

                    this.index_clusters_[(this.new_pxl_colors_.get_element((l|0)>>>0).rgbaon12bits|0)>>>0].push((l|0)>>>0);
                }

            }else if( this.new_pxl_colors_length_ > 1024) {

                for(var l = 0; (l|0) < (this.new_pxl_colors_length_|0); l = (l+1|0)>>>0) {

                    this.index_clusters_[(this.new_pxl_colors_.get_element((l|0)>>>0).rgbaon8bits|0)>>>0].push((l|0)>>>0);
                }

            }else {

                for(var l = 0; (l|0) < (this.new_pxl_colors_length_|0); l = (l+1|0)>>>0) {

                    this.index_clusters_[(this.new_pxl_colors_.get_element((l|0)>>>0).rgbaon4bits|0)>>>0].push((l|0)>>>0);
                }
            }

            this.max_in_cluster_ = 0;
            for(var c = 0; (c|0) < (this.max_cluster_|0); c=(c+1|0)>>>0){
                this.length_clusters_[c|0] = this.index_clusters_[c|0].length | 0;
                if((this.max_in_cluster_|0) < (this.length_clusters_[c|0]|0)) {
                    this.max_in_cluster_ = (this.length_clusters_[c|0] | 0) >>> 0;
                }
            }

            this.all_index_clusters_ = Uint32Array.from(new Array().concat.apply(new Array(), this.index_clusters_));
        }}
    });

    Object.defineProperty(QuantiMat.prototype, 'process_threshold', {
        get: function() { "use strict"; return function(t) {
            "use strict";
            t = (t | 0) >>> 0;

            var threshold = (this.bucket_threshold_ / 255) * (t / this.threshold_steps_);
            var weight_applied_to_color_usage_difference = t / this.threshold_steps_;

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

            for(var c = 0; (c|0) < (this.max_cluster_|0); c=(c+1|0)>>>0){

                stop = start + this.length_clusters_[c|0];

                for(x = start; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                    index_of_color_a = (this.all_index_clusters_[(x|0)>>>0]|0)>>>0;
                    color_a = this.new_pxl_colors_.get_element((index_of_color_a|0)>>>0);
                    color_a_usage = (this.pxl_colors_usage_[(index_of_color_a|0)>>>0] | 0) >>> 0;

                    for(y = (x|0)>>>0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                        index_of_color_b = (this.all_index_clusters_[(y|0)>>>0]|0)>>>0;
                        color_b = this.new_pxl_colors_.get_element((index_of_color_b|0)>>>0);
                        color_b_usage = (this.pxl_colors_usage_[(index_of_color_b|0)>>>0] | 0) >>> 0;

                        first_color_more_used = (color_a_usage|0) > (color_b_usage|0);
                        color_usage_difference = first_color_more_used ? color_a_usage / color_b_usage: color_b_usage / color_a_usage;
                        weighted_threshold = (((threshold + (threshold * (1 - color_usage_difference) * weight_applied_to_color_usage_difference)) / (1 + weight_applied_to_color_usage_difference)) * 255 | 0)>>>0;

                        if(color_a.match_with(color_b,  weighted_threshold | 0)) {

                            if(first_color_more_used){

                                color_a.blend_with(color_b, (color_usage_difference*255|0)>>>0, true, false);
                            }else {

                                color_b.blend_with(color_a, (color_usage_difference*255|0)>>>0, true, false);
                            }
                        }
                    }
                }

                start = stop | 0;
            }

            this.set_bitmap(this.new_pxls_, this.new_pxl_colors_.subarray_uint32(0, this.new_pxl_colors_.length))
        }}
    });


    Object.defineProperty(QuantiMat.prototype, 'run', {
        get: function() { "use strict"; return function() {
            "use strict";

            this.set_bitmap(this.pxls_, this.pxl_colors_);

            if(this.new_pxl_colors_length_ > 256) {

                var simplify_of = this.new_pxl_colors_length_ > 1024 ? 8: this.new_pxl_colors_length_ > 512 ? 4: this.new_pxl_colors_length_ > 256 ? 2: 1;
                for(var l = 0; (l|0) < (this.new_pxl_colors_length_|0); l = (l+1|0)>>>0) {

                    this.new_pxl_colors_.get_element((l|0)>>>0).simplify(simplify_of|0);
                }

                this.set_bitmap(this.new_pxls_, this.new_pxl_colors_.subarray_uint32(0, this.new_pxl_colors_.length))
            }

            while (!this.is_bucket_threshold_auto_goal_reached_) {

                this.attempt_ = this.attempt_ + 1 | 0;

                console.log("attempt N°"+this.attempt_)
                console.log("Bucket threshold equals : "+this.bucket_threshold_)
                console.log("Best color number : "+this.best_color_number_)

                for (var t = 1; (t|0) <= (this.threshold_steps_|0); t = (t+1|0)>>>0) {

                    console.log("Threshold N°"+t)
                    this.process_threshold(t|0);
                }

                console.log("Number of color remaining : "+this.new_pxl_colors_length_)
                if(this.new_pxl_colors_length_ < this.best_color_number_ || !this.is_bucket_threshold_auto_){

                    this.is_bucket_threshold_auto_goal_reached_ = true;
                }else if(this.new_pxl_colors_length_ > this.best_color_number_){

                    this.bucket_threshold_ = this.bucket_threshold_+1|0;
                }
            }

            return Array.of(this.new_pxls_, this.new_pxl_colors_.slice_uint32(0, this.new_pxl_colors_length_));
        }}
    });

    return new Promise(function(resolve, reject){
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

        const AFunction = Object.getPrototypeOf( function(){}).constructor;
        const asyncs = `var t=function(t,e,r,_,s,n,i){"use strict";var o=.2126,h=.7152,u=.0722,l=Math.sqrt(130050);function a(t,e){return(t+e|0)>>>0}function c(t,e){return(t*e|0)>>>0}function p(t){return t<<2}function f(t,e){return(t/e|0)>>>0}function g(t){return(t>>2|0)>>>0}function b(t){return 255&(0|t)}function y(t){return 255&(255-t|0)}function d(t){return 255&(t/255|0)}var x=function(t,e){if(e=e||0,!(this instanceof x))return new x(t,e);t instanceof Uint8ClampedArray?this.storage_uint8_=t:this.storage_uint8_=new Uint8ClampedArray("buffer"in t?t.buffer:t,c(e,4))};x.new_of=function(t,e,r,_){var s=new Uint8ClampedArray(4);return s[3]=b(t),s[2]=b(e),s[1]=b(r),s[0]=b(_),x(s)},Object.defineProperty(x.prototype,"r",{get:function(){return b(this.storage_uint8_[3])}}),Object.defineProperty(x.prototype,"g",{get:function(){return b(this.storage_uint8_[2])}}),Object.defineProperty(x.prototype,"b",{get:function(){return b(this.storage_uint8_[1])}}),Object.defineProperty(x.prototype,"a",{get:function(){return b(this.storage_uint8_[0])}}),Object.defineProperty(x.prototype,"uint32",{get:function(){return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(x.prototype,"rgbaon4bits",{get:function(){return(g(g(g(g(this.storage_uint8_[3]))))<<3|g(g(g(g(this.storage_uint8_[2]))))<<2|g(g(g(g(this.storage_uint8_[1]))))<<1|g(g(g(g(this.storage_uint8_[0]))))<<0|0)>>>0}}),Object.defineProperty(x.prototype,"rgbaon8bits",{get:function(){return(g(g(g(this.storage_uint8_[3])))<<6|g(g(g(this.storage_uint8_[2])))<<4|g(g(g(this.storage_uint8_[1])))<<2|g(g(g(this.storage_uint8_[0])))<<0|0)>>>0}}),Object.defineProperty(x.prototype,"rgbaon12bits",{get:function(){return(f(g(g(this.storage_uint8_[3])),2)<<9|f(g(g(this.storage_uint8_[2])),2)<<6|f(g(g(this.storage_uint8_[1])),2)<<3|f(g(g(this.storage_uint8_[0])),2)<<0|0)>>>0}}),Object.defineProperty(x.prototype,"offset",{get:function(){return g(this.storage_uint8_.byteOffset)}}),Object.defineProperty(x.prototype,"buffer",{get:function(){return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,a(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(x.prototype,"set",{get:function(){return function(t){t instanceof x?(this.storage_uint8_[3]=b(t.r),this.storage_uint8_[2]=b(t.g),this.storage_uint8_[1]=b(t.b),this.storage_uint8_[0]=b(t.a)):"subarray"in t?(this.storage_uint8_[3]=b(t[3]),this.storage_uint8_[2]=b(t[2]),this.storage_uint8_[1]=b(t[1]),this.storage_uint8_[0]=b(t[0])):"slice"in t?this.storage_uint8_.set(t.slice(0,4)):this.storage_uint8_.set(t)}}}),Object.defineProperty(x.prototype,"subarray",{get:function(){return function(t,e){return this.storage_uint8_.subarray(t,e)}}}),Object.defineProperty(x.prototype,"slice",{get:function(){return function(t,e){return this.storage_uint8_.slice(t,e)}}}),x.prototype.is_fully_transparent=function(){return(0|this.a)>>>0==(0|0)>>>0},x.prototype.simplify=function(t){var e=Uint8ClampedArray.of(c(Math.round(this.a/t),t),c(Math.round(this.b/t),t),c(Math.round(this.g/t),t),c(Math.round(this.r/t),t));return this.set(e),this},x.prototype.blend_with=function(t,e,r,_){if(e=b(e),_|=0,t.multiply_a_255(e),r){if(this.is_fully_transparent())return t.set(this),this;if(t.is_fully_transparent())return this.set(t),this}var s=(0|_)>0?f(a(this.a,e),2):y(d(c(y(t.a),y(this.a))));return this.set(x.merge_scale_of_255_a_fixed(t,f(c(t.a,255),s),this,d(c(this.a,f(c(y(t.a),255),s))),s)),t.set(this),this},x.prototype.match_with=function(t,e){return 255==(0|(e=(0|e)>>>0))||(0==(0|e)?(0|this.uint32)==(0|t.uint32):(Math.sqrt(o*Math.pow(this.r-t.r|0,2)+h*Math.pow(this.g-t.g|0,2)+u*Math.pow(this.b-t.b|0,2)+1*Math.pow(this.a-t.a|0,2))/l*255|0)<(0|e))},x.prototype.multiply_a_255=function(t){var e=this.subarray();return e[0]=b(d(c(e[0],t))),this},x.prototype.copy=function(){return x(this.slice(0,4))},x.with_a=function(t,e){var r=t.slice(0,4);return r[0]=b(e),x(r)},x.merge_scale_of_255=function(t,e,r,_){return x.merge(x.scale_of_on_255(t,e,e,e,e),x.scale_of_on_255(r,_,_,_,_))},x.merge_scale_of_255_a_fixed=function(t,e,r,_,s){return e=b(e),_=b(_),s=b(s),x.merge_with_a_fixed(x.scale_rgb_of_on_255(t,e,e,e),x.scale_rgb_of_on_255(r,_,_,_),s)},x.scale_of_on_255=function(t,e,r,_,s){return x(Uint8ClampedArray.of(d(c(t.a,s)),d(c(t.b,_)),d(c(t.g,r)),d(c(t.r,e))))},x.scale_rgb_of_on_255=function(t,e,r,_){return x(Uint8ClampedArray.of(0,d(c(t.b,_)),d(c(t.g,r)),d(c(t.r,e))))},x.merge=function(t,e){return x(Uint8ClampedArray.of(a(t.a,e.a),a(t.b,e.b),a(t.g,e.g),a(t.r,e.r)))},x.merge_with_a_fixed=function(t,e,r){return x(Uint8ClampedArray.of(b(r),a(t.b,e.b),a(t.g,e.g),a(t.r,e.r)))};var w=function(t){if(!(this instanceof w))return new w(t);this.storage_="buffer"in t?t.buffer:t,this.storage_uint8_array_=new Uint8Array(this.storage_),this.storage_uint32_array_=new Uint32Array(this.storage_)};Object.defineProperty(w.prototype,"length",{get:function(){return this.storage_uint32_array_.length}}),Object.defineProperty(w.prototype,"buffer",{get:function(){return this.storage_uint8_array_.buffer}}),Object.defineProperty(w.prototype,"buffer_setUint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_[t]=b(e)}}}),Object.defineProperty(w.prototype,"buffer_getUint8",{get:function(){return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(w.prototype,"buffer_getUint8a",{get:function(){return function(t,e){return e=a(t|=0,p(e=(e|=0)||1)),this.storage_uint8_array_.subarray(t,e)}}}),Object.defineProperty(w.prototype,"buffer_setUint32",{get:function(){return function(t,e){this.storage_uint32_array_[0|t]=function(t){return(0|t)>>>0&4294967295}(e)}}}),Object.defineProperty(w.prototype,"buffer_getUint32",{get:function(){return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(w.prototype,"subarray_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.subarray(t,e)}}}),Object.defineProperty(w.prototype,"slice_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.slice(t,e)}}}),Object.defineProperty(w.prototype,"subarray_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.subarray(p(t),p(e))}}}),Object.defineProperty(w.prototype,"slice_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.slice(p(t),p(e))}}}),w.prototype.get_element=function(t){return x(this.buffer,0|t)},w.prototype.subarray=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(t,e)};var m=function(t){if(t=t||{},!(this instanceof m))return new m(t);this.pxl_colors_=t.pxl_colors||new Uint32Array(0),this.pxl_colors_=Uint32Array.from(this.pxl_colors_),this.pxls_=t.pxls||new Uint16Array(0),this.pxls_=Uint16Array.from(this.pxls_),this.is_bucket_threshold_auto_=Boolean("auto"===t.bucket_threshold),this.is_bucket_threshold_auto_goal_reached_=!1,this.bucket_threshold_=t.bucket_threshold||0,this.this_state_bucket_threshold_=t.this_state_bucket_threshold||0,this.bucket_threshold_=(255*this.bucket_threshold_|0)>=1?255*this.bucket_threshold_|0:255*this.this_state_bucket_threshold_|0,this.threshold_steps_=t.threshold_steps||4,this.bucket_threshold_auto_goal_target_=1,this.color_number_bonus_=0|t.color_number_bonus,this.best_color_number_=null!==t.best_color_number?t.best_color_number:Math.max(Math.sqrt(this.pxl_colors_.length)+this.color_number_bonus_,100),this.attempt_=1,this.new_pxls_=null,this.new_pxls_length_=0,this.new_pxl_colors_=null,this.new_pxl_colors_length_=0,this.max_cluster_=0,this.pxl_colors_usage_=new Array,this.index_clusters_=null,this.all_index_clusters_=new Array,this.length_clusters_=null,this.max_in_cluster_=0,this.bucket_threshold_=0|(this.is_bucket_threshold_auto_?this.bucket_threshold_auto_goal_target_:this.bucket_threshold_)};return Object.defineProperty(m.prototype,"set_bitmap",{get:function(){return function(t,e){for(var r=new Uint32Array(0|e.length),_=0,s=0|t.length,n=new Uint16Array(0|s),i=0,o=0;(0|o)<(0|s);o=(o+1|0)>>>0)i=(0|e[(0|t[(0|o)>>>0])>>>0])>>>0,r.includes((0|i)>>>0)||(r[(0|_)>>>0]=(0|i)>>>0,_=(_+1|0)>>>0),n[(0|o)>>>0]=(0|r.indexOf((0|i)>>>0))>>>0;this.new_pxls_=n,this.new_pxls_length_=0|t.length,this.new_pxl_colors_=w(r.slice(0,_)),this.new_pxl_colors_length_=0|this.new_pxl_colors_.length,this.max_cluster_=this.new_pxl_colors_length_>2048?4097:this.new_pxl_colors_length_>1024?257:17,this.index_clusters_=new Array(this.max_cluster_),this.length_clusters_=new Array(this.max_cluster_),this.pxl_colors_usage_=new Uint32Array(this.new_pxl_colors_length_);for(var h=0,u=0;(0|u)<(0|this.new_pxls_length_);u=(u+1|0)>>>0)h=(0|this.new_pxls_[u])>>>0,this.pxl_colors_usage_[(0|h)>>>0]=(this.pxl_colors_usage_[(0|h)>>>0]+1|0)>>>0;for(var l=0;(0|l)<(0|this.max_cluster_);l=(l+1|0)>>>0)this.index_clusters_[0|l]=new Array;if(this.new_pxl_colors_length_>2048)for(u=0;(0|u)<(0|this.new_pxl_colors_length_);u=(u+1|0)>>>0)this.index_clusters_[(0|this.new_pxl_colors_.get_element((0|u)>>>0).rgbaon12bits)>>>0].push((0|u)>>>0);else if(this.new_pxl_colors_length_>1024)for(u=0;(0|u)<(0|this.new_pxl_colors_length_);u=(u+1|0)>>>0)this.index_clusters_[(0|this.new_pxl_colors_.get_element((0|u)>>>0).rgbaon8bits)>>>0].push((0|u)>>>0);else for(u=0;(0|u)<(0|this.new_pxl_colors_length_);u=(u+1|0)>>>0)this.index_clusters_[(0|this.new_pxl_colors_.get_element((0|u)>>>0).rgbaon4bits)>>>0].push((0|u)>>>0);this.max_in_cluster_=0;for(l=0;(0|l)<(0|this.max_cluster_);l=(l+1|0)>>>0)this.length_clusters_[0|l]=0|this.index_clusters_[0|l].length,(0|this.max_in_cluster_)<(0|this.length_clusters_[0|l])&&(this.max_in_cluster_=(0|this.length_clusters_[0|l])>>>0);this.all_index_clusters_=Uint32Array.from((new Array).concat.apply(new Array,this.index_clusters_))}}}),Object.defineProperty(m.prototype,"process_threshold",{get:function(){return function(t){t=(0|t)>>>0;for(var e,r,_=this.bucket_threshold_/255*(t/this.threshold_steps_),s=t/this.threshold_steps_,n=0,i=0,o=0,h=0,u=!1,l=0,a=0,c=0,p=0,f=0,g=0,b=0;(0|b)<(0|this.max_cluster_);b=(b+1|0)>>>0){for(i=n+this.length_clusters_[0|b],f=n;(0|f)<(0|i);f=(f+1|0)>>>0)for(c=(0|this.all_index_clusters_[(0|f)>>>0])>>>0,e=this.new_pxl_colors_.get_element((0|c)>>>0),o=(0|this.pxl_colors_usage_[(0|c)>>>0])>>>0,g=(0|f)>>>0;(0|g)<(0|i);g=(g+1|0)>>>0)p=(0|this.all_index_clusters_[(0|g)>>>0])>>>0,r=this.new_pxl_colors_.get_element((0|p)>>>0),a=((_+_*(1-(l=(u=(0|o)>(0|(h=(0|this.pxl_colors_usage_[(0|p)>>>0])>>>0)))?o/h:h/o))*s)/(1+s)*255|0)>>>0,e.match_with(r,0|a)&&(u?e.blend_with(r,(255*l|0)>>>0,!0,!1):r.blend_with(e,(255*l|0)>>>0,!0,!1));n=0|i}this.set_bitmap(this.new_pxls_,this.new_pxl_colors_.subarray_uint32(0,this.new_pxl_colors_.length))}}}),Object.defineProperty(m.prototype,"run",{get:function(){return function(){if(this.set_bitmap(this.pxls_,this.pxl_colors_),this.new_pxl_colors_length_>256){for(var t=this.new_pxl_colors_length_>1024?8:this.new_pxl_colors_length_>512?4:this.new_pxl_colors_length_>256?2:1,e=0;(0|e)<(0|this.new_pxl_colors_length_);e=(e+1|0)>>>0)this.new_pxl_colors_.get_element((0|e)>>>0).simplify(0|t);this.set_bitmap(this.new_pxls_,this.new_pxl_colors_.subarray_uint32(0,this.new_pxl_colors_.length))}for(;!this.is_bucket_threshold_auto_goal_reached_;){this.attempt_=this.attempt_+1|0;for(var r=1;(0|r)<=(0|this.threshold_steps_);r=(r+1|0)>>>0)this.process_threshold(0|r);this.new_pxl_colors_length_<this.best_color_number_||!this.is_bucket_threshold_auto_?this.is_bucket_threshold_auto_goal_reached_=!0:this.new_pxl_colors_length_>this.best_color_number_&&(this.bucket_threshold_=this.bucket_threshold_+1|0)}return Array.of(this.new_pxls_,this.new_pxl_colors_.slice_uint32(0,this.new_pxl_colors_length_))}}}),new Promise((function(o){o(m({pxls:t,pxl_colors:e,bucket_threshold:r,threshold_steps:_,color_number_bonus:s,best_color_number:n,this_state_bucket_threshold:i}).run())}))};`
            + "return t;";

        return Object.assign({}, {
            // Compute properties
            asyncf: new AFunction(asyncs)(),
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

    from: function(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold){

        let cs = this._create_state;
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

                        s.asyncf, [s.p, s.pc, s.bt, s.ts, s.cnb, s.bcn, s.stb]
                    ).catch((e) => {

                        return s.asyncf(s.p, s.pc, s.bt, s.ts, s.cnb, s.bcn, s.stb);
                    }).timeout(120 * 1000).then(callback_function);

                }else {

                    callback_function(new Array());
                }
            },
        };
    }
};

module.exports = ReducePalette;