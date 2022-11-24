"use strict";
/*
var fu = async function(
    pxls,
    pxl_colors,
    bucket_threshold,
    threshold_steps,
    color_number_bonus,
    best_color_number,
    this_state_bucket_threshold
) {

    "use strict";

    var CONFIG_UINT8X4 = "rgba";

    var operators = {
        plus_uint(a, b) {
            return (a + b | 0) >>> 0;
        },
        multiply_uint(a, b) {
            return (a * b | 0) >>> 0;
        },
        multiply_uint_4(a) {
            return a << 2;
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
            return ((n|0)>>>0) & 0xFFFFFFFF;
        },
    };

    var {
        plus_uint,
        multiply_uint,
        multiply_uint_4,
        divide_uint,
        divide_four_uint,
        abs_int,
        clamp_uint8,
        divide_255,
        inverse_255,
        clamp_uint32,
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

    SIMDopeColor.prototype.simplify = function(of) {
        var temp = Uint8ClampedArray.of(
            multiply_uint(divide_uint(this.a, of), of),
            multiply_uint(divide_uint(this.b, of), of),
            multiply_uint(divide_uint(this.g, of), of),
            multiply_uint(divide_uint(this.r, of), of),
        );
        this.set(temp);
        return this;
    }

    SIMDopeColor.prototype.blend_with = function(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

        amount_alpha = clamp_uint8(amount_alpha);
        alpha_addition = alpha_addition | 0;
        added_uint8x4.multiply_a_255(amount_alpha);
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
        if(threshold_255 === 255) {

            return true;
        }else if(threshold_255 === 0){

            return (this.uint32 == color.uint32);
        }else {

            return (
                abs_int(this.r - color.r | 0) < (threshold_255|0) &&
                abs_int(this.g - color.g | 0) < (threshold_255|0) &&
                abs_int(this.b - color.b | 0) < (threshold_255|0) &&
                abs_int(this.a - color.a | 0) < (threshold_255|0));
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

    function clean_duplicate_colors(_pxls, _pxl_colors) {
        "use strict";
        // Work with Hashtables and Typed Array so it is fast
        var new_pxl_colors_map = new Map();
        var _pxls_length = _pxls.length | 0;
        var new_pxls = new Uint16Array(_pxls_length);

        var new_pxl_color_index = 0;
        var pxl_color_index = 0;
        var color = 0;

        for(var i = 0; (i|0) < (_pxls_length|0); i = (i + 1 | 0)>>>0) {

            pxl_color_index = (_pxls[(i|0)>>>0]|0)>>>0;
            color = (_pxl_colors[pxl_color_index]|0) & 0xFFFFFFFF;
            new_pxl_color_index = new_pxl_colors_map.get((color|0) & 0xFFFFFFFF);

            if(typeof new_pxl_color_index === "undefined") {

                new_pxl_color_index = (new_pxl_colors_map.size|0) >>> 0;
                new_pxl_colors_map.set((color|0) & 0xFFFFFFFF, (new_pxl_color_index|0)>>>0);
            }

            new_pxls[i] = (new_pxl_color_index | 0) >>> 0;
        }

        var new_pxl_colors = new Uint32Array(new_pxl_colors_map.size);
        for (var e of new_pxl_colors_map) {

            new_pxl_colors[e[1]] = (e[0]|0) & 0xFFFFFFFF;
        }

        return Array.of(new_pxls, new_pxl_colors);
    }


    return new Promise(function(resolve, reject){
        "use strict";
        var is_bucket_threshold_auto = bucket_threshold === "auto";
        var is_bucket_threshold_auto_goal_reached = !is_bucket_threshold_auto;
        var bucket_threshold_auto_goal_target = 15;
        var bucket_threshold_auto_goal_attempt = new Set();
        best_color_number = best_color_number !== null ? best_color_number: Math.max(Math.sqrt(pxl_colors.length) + color_number_bonus, 100);

        if(best_color_number < 2 || best_color_number + 12 > pxl_colors.length) {

            is_bucket_threshold_auto_goal_reached = true;
        }

        var attempt = 1;
        var new_pxls;
        var new_pxls_length;
        var new_pxl_colors;
        var new_pxl_colors_length;

        while (!is_bucket_threshold_auto_goal_reached || attempt === 1) {
            attempt++;

            bucket_threshold = is_bucket_threshold_auto ?
                1/(bucket_threshold_auto_goal_target - 2):
                bucket_threshold || this_state_bucket_threshold;

            threshold_steps = threshold_steps || parseInt(bucket_threshold * 255);

            new_pxls = pxls;
            new_pxls_length = new_pxls.length | 0;
            new_pxl_colors = SIMDopeColors(pxl_colors);
            new_pxl_colors_length = new_pxl_colors.length | 0;
            var r;
            var max_cluster = new_pxl_colors_length > 2000 ? 4096+1: new_pxl_colors_length > 200 ? 256+1: 1;
            var pxl_colors_usage = new Uint32Array(new_pxl_colors_length);
            var color_index = 0;
            var index_clusters = new Array(max_cluster);
            var all_index_clusters = [];
            var length_clusters;
            var modified = true;

            for (var i = 1; i <= threshold_steps; i += 1) {


                var threshold = bucket_threshold * i / threshold_steps;
                var weight_applied_to_color_usage_difference = i / threshold_steps;

                if(modified) {

                    pxl_colors_usage = new Uint32Array(new_pxl_colors_length);
                    for(var l = 0; (l|0) < (new_pxls_length|0); l = (l+1|0)>>>0) {

                        color_index = (new_pxls[l]|0)>>>0;
                        pxl_colors_usage[color_index] = (pxl_colors_usage[color_index]+1|0)>>>0;
                    }

                    length_clusters = new Array(max_cluster);
                    for(var c = 0; (c|0) < (max_cluster|0); c=(c+1|0)>>>0){ index_clusters[c|0] = new Array();}

                    if(new_pxl_colors_length > 2000) {

                        for(var l = 0; (l|0) < (new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                            index_clusters[(new_pxl_colors.get_element((l|0)>>>0).rgbaon12bits|0)>>>0].push((l|0)>>>0);
                        }

                    }else if( new_pxl_colors_length > 200) {

                        for(var l = 0; (l|0) < (new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                            index_clusters[(new_pxl_colors.get_element((l|0)>>>0).rgbaon8bits|0)>>>0].push((l|0)>>>0);
                        }

                    }else {

                        for(var l = 0; (l|0) < (new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                            index_clusters[0].push((l|0)>>>0);
                        }
                    }

                    for(var c = 0; (c|0) < (max_cluster|0); c=(c+1|0)>>>0){
                        length_clusters[c|0] = index_clusters[c|0].length | 0;
                    }

                    all_index_clusters = Uint32Array.from(new Array().concat.apply(new Array(), index_clusters));
                    modified = false;
                }

                var start = 0;
                for(var c = 0; (c|0) < (max_cluster|0); c=(c+1|0)>>>0){

                    var stop = start + length_clusters[c|0];
                    var color_a;
                    var color_a_usage = 0;
                    var color_b;
                    var color_b_usage = 0;
                    var color;
                    var first_color_more_used = false;
                    var color_usage_difference = 0.0;
                    var weighted_threshold = 0.0;

                    var index_of_color_a = 0;
                    var index_of_color_b = 0;

                    var x = 0, y = 0;

                    for(x = start; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                        index_of_color_a = (all_index_clusters[(x|0)>>>0]|0)>>>0;
                        color_a = new_pxl_colors.get_element((index_of_color_a|0)>>>0);
                        color_a_usage = (pxl_colors_usage[(index_of_color_a|0)>>>0] | 0) >>> 0;

                        for(y = (x|0)>>>0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                            index_of_color_b = (all_index_clusters[(y|0)>>>0]|0)>>>0;
                            color_b = new_pxl_colors.get_element((index_of_color_b|0)>>>0);
                            color_b_usage = (pxl_colors_usage[(index_of_color_b|0)>>>0] | 0) >>> 0;

                            first_color_more_used = (color_a_usage|0) > (color_b_usage|0);
                            color_usage_difference = first_color_more_used ? color_a_usage / color_b_usage: color_b_usage / color_a_usage;
                            weighted_threshold = (((threshold + (threshold * (1 - color_usage_difference) * weight_applied_to_color_usage_difference)) / (1 + weight_applied_to_color_usage_difference)) * 255 | 0)>>>0;

                            if(color_a.match_with(color_b, weighted_threshold)) {

                                if(first_color_more_used){

                                    color_a.blend_with(color_b, (color_usage_difference*255|0)>>>0, true, false);
                                }else {

                                    color_b.blend_with(color_a, (color_usage_difference*255|0)>>>0, true, false);
                                }

                                modified = true;
                            }
                        }
                    }

                    start = stop | 0;
                }

                r = clean_duplicate_colors(new_pxls, new_pxl_colors.slice_uint32(0, new_pxl_colors.length));
                new_pxls = r[0];
                new_pxl_colors = SIMDopeColors(r[1]);
                new_pxl_colors_length = new_pxl_colors.length | 0;
            }

            if((new_pxl_colors.length + 25 > best_color_number && new_pxl_colors.length - 25 < best_color_number) || !is_bucket_threshold_auto || bucket_threshold_auto_goal_attempt.has(bucket_threshold_auto_goal_target)) {

                is_bucket_threshold_auto_goal_reached = true;
            }else if(new_pxl_colors.length > best_color_number){

                bucket_threshold_auto_goal_attempt.add(bucket_threshold_auto_goal_target);
                bucket_threshold_auto_goal_target --;
            }else {

                bucket_threshold_auto_goal_attempt.add(bucket_threshold_auto_goal_target);
                bucket_threshold_auto_goal_target ++;
            }
        }

        resolve(clean_duplicate_colors(new_pxls, new_pxl_colors.slice_uint32(0, new_pxl_colors.length)));
    })};*/

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

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const asyncs = `var t=async function(t,e,r,n,i,o,u){"use strict";var a={plus_uint:(t,e)=>(t+e|0)>>>0,multiply_uint:(t,e)=>(t*e|0)>>>0,multiply_uint_4:t=>t<<2,divide_uint:(t,e)=>(t/e|0)>>>0,divide_four_uint:t=>(t>>2|0)>>>0,abs_int:t=>(0|t)<0?(0|-t)>>>0:(0|t)>>>0,clamp_uint8:t=>255&(0|t),inverse_255:t=>255&(255-t|0),divide_255:t=>255&(t/255|0),clamp_uint32:t=>(0|t)>>>0&4294967295},{plus_uint:_,multiply_uint:s,multiply_uint_4:f,divide_uint:g,divide_four_uint:c,abs_int:p,clamp_uint8:y,divide_255:h,inverse_255:b,clamp_uint32:l}=a,d=function(t,e){if(e=e||0,!(this instanceof d))return new d(t,e);t instanceof Uint8ClampedArray?this.storage_uint8_=t:this.storage_uint8_=new Uint8ClampedArray("buffer"in t?t.buffer:t,s(e,4))};d.new_of=function(t,e,r,n){var i=new Uint8ClampedArray(4);return i[3]=y(t),i[2]=y(e),i[1]=y(r),i[0]=y(n),d(i)},Object.defineProperty(d.prototype,"r",{get:function(){return y(this.storage_uint8_[3])}}),Object.defineProperty(d.prototype,"g",{get:function(){return y(this.storage_uint8_[2])}}),Object.defineProperty(d.prototype,"b",{get:function(){return y(this.storage_uint8_[1])}}),Object.defineProperty(d.prototype,"a",{get:function(){return y(this.storage_uint8_[0])}}),Object.defineProperty(d.prototype,"uint32",{get:function(){return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(d.prototype,"rgbaon8bits",{get:function(){return(c(c(c(this.storage_uint8_[3])))<<6|c(c(c(this.storage_uint8_[2])))<<4|c(c(c(this.storage_uint8_[1])))<<2|c(c(c(this.storage_uint8_[0])))<<0|0)>>>0}}),Object.defineProperty(d.prototype,"rgbaon12bits",{get:function(){return(g(c(c(this.storage_uint8_[3])),2)<<9|g(c(c(this.storage_uint8_[2])),2)<<6|g(c(c(this.storage_uint8_[1])),2)<<3|g(c(c(this.storage_uint8_[0])),2)<<0|0)>>>0}}),Object.defineProperty(d.prototype,"offset",{get:function(){return c(this.storage_uint8_.byteOffset)}}),Object.defineProperty(d.prototype,"buffer",{get:function(){return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,_(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(d.prototype,"set",{get:function(){return function(t){t instanceof d?(this.storage_uint8_[3]=y(t.r),this.storage_uint8_[2]=y(t.g),this.storage_uint8_[1]=y(t.b),this.storage_uint8_[0]=y(t.a)):"subarray"in t?(this.storage_uint8_[3]=y(t[3]),this.storage_uint8_[2]=y(t[2]),this.storage_uint8_[1]=y(t[1]),this.storage_uint8_[0]=y(t[0])):"slice"in t?this.storage_uint8_.set(t.slice(0,4)):this.storage_uint8_.set(t)}}}),Object.defineProperty(d.prototype,"subarray",{get:function(){return function(t,e){return this.storage_uint8_.subarray(t,e)}}}),Object.defineProperty(d.prototype,"slice",{get:function(){return function(t,e){return this.storage_uint8_.slice(t,e)}}}),d.prototype.simplify=function(t){var e=Uint8ClampedArray.of(s(g(this.a,t),t),s(g(this.b,t),t),s(g(this.g,t),t),s(g(this.r,t),t));return this.set(e),this},d.prototype.blend_with=function(t,e,r,n){e=y(e),n|=0,t.multiply_a_255(e);var i=(0|n)>0?g(_(this.a,e),2):b(h(s(b(t.a),b(this.a))));return this.set(d.merge_scale_of_255_a_fixed(t,g(s(t.a,255),i),this,h(s(this.a,g(s(b(t.a),255),i))),i)),t.set(this),this},d.prototype.match_with=function(t,e){return 255===(e=(0|e)>>>0)||(0===e?this.uint32==t.uint32:p(this.r-t.r|0)<(0|e)&&p(this.g-t.g|0)<(0|e)&&p(this.b-t.b|0)<(0|e)&&p(this.a-t.a|0)<(0|e))},d.prototype.multiply_a_255=function(t){var e=this.subarray();return e[0]=y(h(s(e[0],t))),this},d.prototype.copy=function(){return d(this.slice(0,4))},d.with_a=function(t,e){var r=t.slice(0,4);return r[0]=y(e),d(r)},d.merge_scale_of_255=function(t,e,r,n){return d.merge(d.scale_of_on_255(t,e,e,e,e),d.scale_of_on_255(r,n,n,n,n))},d.merge_scale_of_255_a_fixed=function(t,e,r,n,i){return e=y(e),n=y(n),i=y(i),d.merge_with_a_fixed(d.scale_rgb_of_on_255(t,e,e,e),d.scale_rgb_of_on_255(r,n,n,n),i)},d.scale_of_on_255=function(t,e,r,n,i){return d(Uint8ClampedArray.of(h(s(t.a,i)),h(s(t.b,n)),h(s(t.g,r)),h(s(t.r,e))))},d.scale_rgb_of_on_255=function(t,e,r,n){return d(Uint8ClampedArray.of(0,h(s(t.b,n)),h(s(t.g,r)),h(s(t.r,e))))},d.merge=function(t,e){return d(Uint8ClampedArray.of(_(t.a,e.a),_(t.b,e.b),_(t.g,e.g),_(t.r,e.r)))},d.merge_with_a_fixed=function(t,e,r){return d(Uint8ClampedArray.of(y(r),_(t.b,e.b),_(t.g,e.g),_(t.r,e.r)))};var m=function(t){if(!(this instanceof m))return new m(t);this.storage_="buffer"in t?t.buffer:t,this.storage_uint8_array_=new Uint8Array(this.storage_),this.storage_uint32_array_=new Uint32Array(this.storage_)};function v(t,e){for(var r=new Map,n=0|t.length,i=new Uint16Array(n),o=0,u=0,a=0;(0|a)<(0|n);a=(a+1|0)>>>0)u=4294967295&(0|e[(0|t[(0|a)>>>0])>>>0]),void 0===(o=r.get(4294967295&(0|u)))&&(o=(0|r.size)>>>0,r.set(4294967295&(0|u),(0|o)>>>0)),i[a]=(0|o)>>>0;var _=new Uint32Array(r.size);for(var s of r)_[s[1]]=4294967295&(0|s[0]);return Array.of(i,_)}return Object.defineProperty(m.prototype,"length",{get:function(){return this.storage_uint32_array_.length}}),Object.defineProperty(m.prototype,"buffer",{get:function(){return this.storage_uint8_array_.buffer}}),Object.defineProperty(m.prototype,"buffer_setUint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_[t]=y(e)}}}),Object.defineProperty(m.prototype,"buffer_getUint8",{get:function(){return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(m.prototype,"buffer_getUint8a",{get:function(){return function(t,e){return e=_(t|=0,f(e=(e|=0)||1)),this.storage_uint8_array_.subarray(t,e)}}}),Object.defineProperty(m.prototype,"buffer_setUint32",{get:function(){return function(t,e){this.storage_uint32_array_[0|t]=l(e)}}}),Object.defineProperty(m.prototype,"buffer_getUint32",{get:function(){return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(m.prototype,"subarray_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.subarray(t,e)}}}),Object.defineProperty(m.prototype,"slice_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.slice(t,e)}}}),Object.defineProperty(m.prototype,"subarray_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.subarray(f(t),f(e))}}}),Object.defineProperty(m.prototype,"slice_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.slice(f(t),f(e))}}}),m.prototype.get_element=function(t){return d(this.buffer,0|t)},m.prototype.subarray=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(t,e)},new Promise((function(a){var _="auto"===r,s=!_,f=15,g=new Set;((o=null!==o?o:Math.max(Math.sqrt(e.length)+i,100))<2||o+12>e.length)&&(s=!0);for(var c,p,y,h,b=1;!s||1===b;){var l;b++,r=_?1/(f-2):r||u,n=n||parseInt(255*r),p=0|(c=t).length;for(var d,w=(h=0|(y=m(e)).length)>2e3?4097:h>200?257:1,O=new Uint32Array(h),P=0,j=new Array(w),A=[],U=!0,C=1;C<=n;C+=1){var x=r*C/n,M=C/n;if(U){O=new Uint32Array(h);for(var z=0;(0|z)<(0|p);z=(z+1|0)>>>0)O[P=(0|c[z])>>>0]=(O[P]+1|0)>>>0;d=new Array(w);for(var q=0;(0|q)<(0|w);q=(q+1|0)>>>0)j[0|q]=new Array;if(h>2e3)for(z=0;(0|z)<(0|h);z=(z+1|0)>>>0)j[(0|y.get_element((0|z)>>>0).rgbaon12bits)>>>0].push((0|z)>>>0);else if(h>200)for(z=0;(0|z)<(0|h);z=(z+1|0)>>>0)j[(0|y.get_element((0|z)>>>0).rgbaon8bits)>>>0].push((0|z)>>>0);else for(z=0;(0|z)<(0|h);z=(z+1|0)>>>0)j[0].push((0|z)>>>0);for(q=0;(0|q)<(0|w);q=(q+1|0)>>>0)d[0|q]=0|j[0|q].length;A=Uint32Array.from((new Array).concat.apply(new Array,j)),U=!1}var I=0;for(q=0;(0|q)<(0|w);q=(q+1|0)>>>0){var S,k,B=I+d[0|q],D=0,E=0,F=!1,G=0,H=0,J=0,K=0,L=0,N=0;for(L=I;(0|L)<(0|B);L=(L+1|0)>>>0)for(J=(0|A[(0|L)>>>0])>>>0,S=y.get_element((0|J)>>>0),D=(0|O[(0|J)>>>0])>>>0,N=(0|L)>>>0;(0|N)<(0|B);N=(N+1|0)>>>0)K=(0|A[(0|N)>>>0])>>>0,k=y.get_element((0|K)>>>0),H=((x+x*(1-(G=(F=(0|D)>(0|(E=(0|O[(0|K)>>>0])>>>0)))?D/E:E/D))*M)/(1+M)*255|0)>>>0,S.match_with(k,H)&&(F?S.blend_with(k,(255*G|0)>>>0,!0,!1):k.blend_with(S,(255*G|0)>>>0,!0,!1),U=!0);I=0|B}c=(l=v(c,y.slice_uint32(0,y.length)))[0],h=0|(y=m(l[1])).length}y.length+25>o&&y.length-25<o||!_||g.has(f)?s=!0:y.length>o?(g.add(f),f--):(g.add(f),f++)}a(v(c,y.slice_uint32(0,y.length)))}))};`
            + "return t;";

        return Object.assign({}, {
            // Compute properties
            asyncf: new AsyncFunction(asyncs)(),
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

                    callback_function([]);
                }
            },
        };
    }
};

module.exports = ReducePalette;