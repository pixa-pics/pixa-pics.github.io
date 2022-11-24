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

    return new Promise(function(resolve, reject){
        "use strict";

        var CONFIG_UINT8X4 = "rgba";
        var PR = .2126,
            PG = .7152,
            PB = .0722,
            PA = .4180;

        var RD = 255,
            GD = 255,
            BD = 255,
            AD = 255;

        var EUCLMAX = Math.sqrt(PR*RD*RD + PG*GD*GD + PB*BD*BD + PA*AD*AD);

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

        function clean_duplicate_colors(_pxls, _pxl_colors) {
            "use strict";
            // Work with Hashtables and Typed Array so it is fast
            var clean_pxl_colors = new Uint32Array(_pxl_colors.length);
            var clean_pxl_colors_length = 0;
            var all_pxls_length = _pxls.length | 0;
            var cleaned_pxls = new Uint16Array(all_pxls_length);

            var color = 0;

            for(var i = 0; (i|0) < (all_pxls_length|0); i = (i + 1 | 0)>>>0) {

                color = (_pxl_colors[(_pxls[(i|0)>>>0]|0)>>>0]|0) >>> 0;

                if(!clean_pxl_colors.includes((color|0) >>> 0)) {

                    clean_pxl_colors[(clean_pxl_colors_length|0)>>>0] = (color|0) >>> 0;
                    clean_pxl_colors_length = (clean_pxl_colors_length+1|0)>>>0;
                }

                cleaned_pxls[(i|0)>>>0] = (clean_pxl_colors.indexOf((color|0) >>> 0) | 0) >>> 0;
            }

            return Array.of(cleaned_pxls, clean_pxl_colors.slice(0, clean_pxl_colors_length));
        }

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
        var r;

        var max_cluster;
        var pxl_colors_usage;
        var color_index = 0;
        var index_clusters;
        var all_index_clusters = [];
        var length_clusters;
        var modified = true;
        var max_in_cluster = 0;
        var threshold = 0;
        var weight_applied_to_color_usage_difference = 0;

        while (!is_bucket_threshold_auto_goal_reached || attempt === 1) {
            attempt++;

            bucket_threshold = is_bucket_threshold_auto ?
                1/(bucket_threshold_auto_goal_target - 2):
                bucket_threshold || this_state_bucket_threshold;

            threshold_steps = threshold_steps || parseInt(bucket_threshold * 255);

            new_pxls = pxls;
            new_pxls_length = pxls.length | 0;
            new_pxl_colors = SIMDopeColors(pxl_colors);
            new_pxl_colors_length = new_pxl_colors.length | 0;

            max_cluster = new_pxl_colors_length > 2048 ? 4096+1: new_pxl_colors_length > 1024 ? 256+1: 16+1;
            index_clusters = new Array(max_cluster);
            pxl_colors_usage = new Uint32Array(new_pxl_colors_length);

            if(new_pxl_colors_length > 1024) {

                for(var l = 0; (l|0) < (new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                    new_pxl_colors.get_element((l|0)>>>0).simplify(new_pxl_colors_length > 2048 ? 9.6: new_pxl_colors_length > 1024 ? 6.4: new_pxl_colors_length > 512 ? 3.2: 1);
                }

                r = clean_duplicate_colors(new_pxls, new_pxl_colors.slice_uint32(0, new_pxl_colors.length));
                new_pxls = r[0];
                new_pxl_colors = SIMDopeColors(r[1]);
                new_pxl_colors_length = new_pxl_colors.length | 0;
            }

            for (var i = 1; (i|0) <= (threshold_steps|0); i = (i+1|0)>>>0) {

                threshold = bucket_threshold * i / threshold_steps;
                weight_applied_to_color_usage_difference = i / threshold_steps;

                if(modified) {

                    for(var l = 0; (l|0) < (new_pxls_length|0); l = (l+1|0)>>>0) {

                        color_index = (new_pxls[l]|0)>>>0;
                        pxl_colors_usage[color_index] = (pxl_colors_usage[color_index]+1|0)>>>0;
                    }

                    length_clusters = new Array(max_cluster);
                    for(var c = 0; (c|0) < (max_cluster|0); c=(c+1|0)>>>0){ index_clusters[c|0] = new Array();}

                    if(new_pxl_colors_length > 2048) {

                        for(var l = 0; (l|0) < (new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                            index_clusters[(new_pxl_colors.get_element((l|0)>>>0).rgbaon12bits|0)>>>0].push((l|0)>>>0);
                        }

                    }else if( new_pxl_colors_length > 1024) {

                        for(var l = 0; (l|0) < (new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                            index_clusters[(new_pxl_colors.get_element((l|0)>>>0).rgbaon8bits|0)>>>0].push((l|0)>>>0);
                        }

                    }else {

                        for(var l = 0; (l|0) < (new_pxl_colors_length|0); l = (l+1|0)>>>0) {

                            index_clusters[(new_pxl_colors.get_element((l|0)>>>0).rgbaon4bits|0)>>>0].push((l|0)>>>0);
                        }
                    }

                    max_in_cluster = 0;
                    for(var c = 0; (c|0) < (max_cluster|0); c=(c+1|0)>>>0){
                        length_clusters[c|0] = index_clusters[c|0].length | 0;
                        if((max_in_cluster|0) < (length_clusters[c|0]|0)) {
                            max_in_cluster = (length_clusters[c|0] | 0) >>> 0;
                        }
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
                    var first_color_more_used = false;
                    var color_usage_difference = 0.0;
                    var weighted_threshold = 0.0;
                    var weighted_cluster = length_clusters[c|0] / max_in_cluster * 255;

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

                            if(color_a.match_with(color_b,  weighted_threshold | 0)) {

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

                if(modified) {

                    r = clean_duplicate_colors(new_pxls, new_pxl_colors.slice_uint32(0, new_pxl_colors.length));
                    new_pxls = r[0];
                    new_pxl_colors = SIMDopeColors(r[1]);
                    new_pxl_colors_length = new_pxl_colors.length | 0;
                }
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

        const AFunction = Object.getPrototypeOf( function(){}).constructor;
        const asyncs = `var t = function(t,e,r,n,i,o,u){return new Promise((function(a){"use strict";var s=.2126,_=.7152,f=.0722,g=Math.sqrt(92205.45),h={plus_uint:(t,e)=>(t+e|0)>>>0,multiply_uint:(t,e)=>(t*e|0)>>>0,multiply_uint_4:t=>t<<2,divide_uint:(t,e)=>(t/e|0)>>>0,divide_four_uint:t=>(t>>2|0)>>>0,abs_int:t=>(0|t)<0?(0|-t)>>>0:(0|t)>>>0,clamp_uint8:t=>255&(0|t),inverse_255:t=>255&(255-t|0),divide_255:t=>255&(t/255|0),clamp_uint32:t=>(0|t)>>>0&4294967295},{plus_uint:c,multiply_uint:p,multiply_uint_4:y,divide_uint:l,divide_four_uint:b,abs_int:d,clamp_uint8:m,divide_255:w,inverse_255:O,clamp_uint32:P}=h,j=function(t,e){if(e=e||0,!(this instanceof j))return new j(t,e);t instanceof Uint8ClampedArray?this.storage_uint8_=t:this.storage_uint8_=new Uint8ClampedArray("buffer"in t?t.buffer:t,p(e,4))};j.new_of=function(t,e,r,n){var i=new Uint8ClampedArray(4);return i[3]=m(t),i[2]=m(e),i[1]=m(r),i[0]=m(n),j(i)},Object.defineProperty(j.prototype,"r",{get:function(){return m(this.storage_uint8_[3])}}),Object.defineProperty(j.prototype,"g",{get:function(){return m(this.storage_uint8_[2])}}),Object.defineProperty(j.prototype,"b",{get:function(){return m(this.storage_uint8_[1])}}),Object.defineProperty(j.prototype,"a",{get:function(){return m(this.storage_uint8_[0])}}),Object.defineProperty(j.prototype,"uint32",{get:function(){return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(j.prototype,"rgbaon4bits",{get:function(){return(b(b(b(b(this.storage_uint8_[3]))))<<3|b(b(b(b(this.storage_uint8_[2]))))<<2|b(b(b(b(this.storage_uint8_[1]))))<<1|b(b(b(b(this.storage_uint8_[0]))))<<0|0)>>>0}}),Object.defineProperty(j.prototype,"rgbaon8bits",{get:function(){return(b(b(b(this.storage_uint8_[3])))<<6|b(b(b(this.storage_uint8_[2])))<<4|b(b(b(this.storage_uint8_[1])))<<2|b(b(b(this.storage_uint8_[0])))<<0|0)>>>0}}),Object.defineProperty(j.prototype,"rgbaon12bits",{get:function(){return(l(b(b(this.storage_uint8_[3])),2)<<9|l(b(b(this.storage_uint8_[2])),2)<<6|l(b(b(this.storage_uint8_[1])),2)<<3|l(b(b(this.storage_uint8_[0])),2)<<0|0)>>>0}}),Object.defineProperty(j.prototype,"offset",{get:function(){return b(this.storage_uint8_.byteOffset)}}),Object.defineProperty(j.prototype,"buffer",{get:function(){return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,c(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(j.prototype,"set",{get:function(){return function(t){t instanceof j?(this.storage_uint8_[3]=m(t.r),this.storage_uint8_[2]=m(t.g),this.storage_uint8_[1]=m(t.b),this.storage_uint8_[0]=m(t.a)):"subarray"in t?(this.storage_uint8_[3]=m(t[3]),this.storage_uint8_[2]=m(t[2]),this.storage_uint8_[1]=m(t[1]),this.storage_uint8_[0]=m(t[0])):"slice"in t?this.storage_uint8_.set(t.slice(0,4)):this.storage_uint8_.set(t)}}}),Object.defineProperty(j.prototype,"subarray",{get:function(){return function(t,e){return this.storage_uint8_.subarray(t,e)}}}),Object.defineProperty(j.prototype,"slice",{get:function(){return function(t,e){return this.storage_uint8_.slice(t,e)}}}),j.prototype.simplify=function(t){var e=Uint8ClampedArray.of(p(Math.round(this.a/t),t),p(Math.round(this.b/t),t),p(Math.round(this.g/t),t),p(Math.round(this.r/t),t));return this.set(e),this},j.prototype.blend_with=function(t,e,r,n){e=m(e),n|=0,t.multiply_a_255(e);var i=(0|n)>0?l(c(this.a,e),2):O(w(p(O(t.a),O(this.a))));return this.set(j.merge_scale_of_255_a_fixed(t,l(p(t.a,255),i),this,w(p(this.a,l(p(O(t.a),255),i))),i)),t.set(this),this},j.prototype.match_with=function(t,e){return 255==(0|(e=(0|e)>>>0))||(0==(0|e)?(0|this.uint32)==(0|t.uint32):(Math.sqrt(s*Math.pow(this.r-t.r|0,2)+_*Math.pow(this.g-t.g|0,2)+f*Math.pow(this.b-t.b|0,2)+.418*Math.pow(this.a-t.a|0,2))/g*255|0)<(0|e))},j.prototype.multiply_a_255=function(t){var e=this.subarray();return e[0]=m(w(p(e[0],t))),this},j.prototype.copy=function(){return j(this.slice(0,4))},j.with_a=function(t,e){var r=t.slice(0,4);return r[0]=m(e),j(r)},j.merge_scale_of_255=function(t,e,r,n){return j.merge(j.scale_of_on_255(t,e,e,e,e),j.scale_of_on_255(r,n,n,n,n))},j.merge_scale_of_255_a_fixed=function(t,e,r,n,i){return e=m(e),n=m(n),i=m(i),j.merge_with_a_fixed(j.scale_rgb_of_on_255(t,e,e,e),j.scale_rgb_of_on_255(r,n,n,n),i)},j.scale_of_on_255=function(t,e,r,n,i){return j(Uint8ClampedArray.of(w(p(t.a,i)),w(p(t.b,n)),w(p(t.g,r)),w(p(t.r,e))))},j.scale_rgb_of_on_255=function(t,e,r,n){return j(Uint8ClampedArray.of(0,w(p(t.b,n)),w(p(t.g,r)),w(p(t.r,e))))},j.merge=function(t,e){return j(Uint8ClampedArray.of(c(t.a,e.a),c(t.b,e.b),c(t.g,e.g),c(t.r,e.r)))},j.merge_with_a_fixed=function(t,e,r){return j(Uint8ClampedArray.of(m(r),c(t.b,e.b),c(t.g,e.g),c(t.r,e.r)))};var v=function(t){if(!(this instanceof v))return new v(t);this.storage_="buffer"in t?t.buffer:t,this.storage_uint8_array_=new Uint8Array(this.storage_),this.storage_uint32_array_=new Uint32Array(this.storage_)};function A(t,e){for(var r=new Uint32Array(e.length),n=0,i=0|t.length,o=new Uint16Array(i),u=0,a=0;(0|a)<(0|i);a=(a+1|0)>>>0)u=(0|e[(0|t[(0|a)>>>0])>>>0])>>>0,r.includes((0|u)>>>0)||(r[(0|n)>>>0]=(0|u)>>>0,n=(n+1|0)>>>0),o[(0|a)>>>0]=(0|r.indexOf((0|u)>>>0))>>>0;return Array.of(o,r.slice(0,n))}Object.defineProperty(v.prototype,"length",{get:function(){return this.storage_uint32_array_.length}}),Object.defineProperty(v.prototype,"buffer",{get:function(){return this.storage_uint8_array_.buffer}}),Object.defineProperty(v.prototype,"buffer_setUint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_[t]=m(e)}}}),Object.defineProperty(v.prototype,"buffer_getUint8",{get:function(){return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(v.prototype,"buffer_getUint8a",{get:function(){return function(t,e){return e=c(t|=0,y(e=(e|=0)||1)),this.storage_uint8_array_.subarray(t,e)}}}),Object.defineProperty(v.prototype,"buffer_setUint32",{get:function(){return function(t,e){this.storage_uint32_array_[0|t]=P(e)}}}),Object.defineProperty(v.prototype,"buffer_getUint32",{get:function(){return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(v.prototype,"subarray_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.subarray(t,e)}}}),Object.defineProperty(v.prototype,"slice_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.slice(t,e)}}}),Object.defineProperty(v.prototype,"subarray_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.subarray(y(t),y(e))}}}),Object.defineProperty(v.prototype,"slice_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.slice(y(t),y(e))}}}),v.prototype.get_element=function(t){return j(this.buffer,0|t)},v.prototype.subarray=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(t,e)};var U="auto"===r,M=!U,C=15,x=new Set;((o=null!==o?o:Math.max(Math.sqrt(e.length)+i,100))<2||o+12>e.length)&&(M=!0);for(var q,I,S,k,z,B,D,E,F,G=1,H=0,J=[],K=!0,L=0,N=0,Q=0;!M||1===G;){if(G++,r=U?1/(C-2):r||u,n=n||parseInt(255*r),q=t,I=0|t.length,B=(k=0|(S=v(e)).length)>2048?4097:k>1024?257:17,E=new Array(B),D=new Uint32Array(k),k>1024){for(var R=0;(0|R)<(0|k);R=(R+1|0)>>>0)S.get_element((0|R)>>>0).simplify(k>2048?9.6:k>1024?6.4:k>512?3.2:1);q=(z=A(q,S.slice_uint32(0,S.length)))[0],k=0|(S=v(z[1])).length}for(var T=1;(0|T)<=(0|n);T=(T+1|0)>>>0){if(N=r*T/n,Q=T/n,K){for(R=0;(0|R)<(0|I);R=(R+1|0)>>>0)D[H=(0|q[R])>>>0]=(D[H]+1|0)>>>0;F=new Array(B);for(var V=0;(0|V)<(0|B);V=(V+1|0)>>>0)E[0|V]=new Array;if(k>2048)for(R=0;(0|R)<(0|k);R=(R+1|0)>>>0)E[(0|S.get_element((0|R)>>>0).rgbaon12bits)>>>0].push((0|R)>>>0);else if(k>1024)for(R=0;(0|R)<(0|k);R=(R+1|0)>>>0)E[(0|S.get_element((0|R)>>>0).rgbaon8bits)>>>0].push((0|R)>>>0);else for(R=0;(0|R)<(0|k);R=(R+1|0)>>>0)E[(0|S.get_element((0|R)>>>0).rgbaon4bits)>>>0].push((0|R)>>>0);L=0;for(V=0;(0|V)<(0|B);V=(V+1|0)>>>0)F[0|V]=0|E[0|V].length,(0|L)<(0|F[0|V])&&(L=(0|F[0|V])>>>0);J=Uint32Array.from((new Array).concat.apply(new Array,E)),K=!1}var W=0;for(V=0;(0|V)<(0|B);V=(V+1|0)>>>0){var X,Y,Z=W+F[0|V],$=0,tt=0,et=!1,rt=0,nt=0,it=(F[0|V],0),ot=0,ut=0,at=0;for(ut=W;(0|ut)<(0|Z);ut=(ut+1|0)>>>0)for(it=(0|J[(0|ut)>>>0])>>>0,X=S.get_element((0|it)>>>0),$=(0|D[(0|it)>>>0])>>>0,at=(0|ut)>>>0;(0|at)<(0|Z);at=(at+1|0)>>>0)ot=(0|J[(0|at)>>>0])>>>0,Y=S.get_element((0|ot)>>>0),nt=((N+N*(1-(rt=(et=(0|$)>(0|(tt=(0|D[(0|ot)>>>0])>>>0)))?$/tt:tt/$))*Q)/(1+Q)*255|0)>>>0,X.match_with(Y,0|nt)&&(et?X.blend_with(Y,(255*rt|0)>>>0,!0,!1):Y.blend_with(X,(255*rt|0)>>>0,!0,!1),K=!0);W=0|Z}K&&(q=(z=A(q,S.slice_uint32(0,S.length)))[0],k=0|(S=v(z[1])).length)}S.length+25>o&&S.length-25<o||!U||x.has(C)?M=!0:S.length>o?(x.add(C),C--):(x.add(C),C++)}a(A(q,S.slice_uint32(0,S.length)))}))};`
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

                    callback_function([]);
                }
            },
        };
    }
};

module.exports = ReducePalette;