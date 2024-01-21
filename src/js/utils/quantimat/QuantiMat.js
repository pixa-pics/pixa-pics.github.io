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
import {BitArray, SetFixed} from "@asaitama/boolean-array";
import {SIMDopeCreate, SIMDopeCreateConfAdd} from "simdope";
var MODE = SIMDopeCreateConfAdd({
    "create": {
        "new_of": true
    },
    "properties": {
        "uint32": true,
        "laba": true,
        "rgbaon4bits": true,
        "rgbaon6bits": true,
        "rgbaon8bits": true,
        "rgbaon12bits": true,
        "rgbaon16bits": true,
        "skin": true
    },
    "methods": {
        "simplify": true,
        "get_new_element": true,
        "get_use_element": true,
        "set_tail": true,
        "is_dark": true,
        "blend_first_with": true,
        "blend_first_with_tails": true,
        "blend_all": true,
        "euclidean_match_with": true,
        "manhattan_match_with": true,
        "cie76_match_with": true,
        "copy": true
    }
});

var fr = Math.fround;
var DISTINCT_SKIN_COLOR_MATCH_MULTIPLY = fr(.90);
var SAME_SKIN_COLOR_MATCH_MULTIPLY = fr(.95);

const {simdops, Color, Colors} = SIMDopeCreate(MODE);
const {
    minus_int,
    int_not_equal,
    plus_int,
    plus_uint,
    minus_uint,
    multiply_int,
    multiply_uint,
    multiply_uint_4,
    divide_uint,
    clamp_uint8,
    clamp_uint32,
    int_equal,
    uint_less,
    int_less,
    int_greater_equal,
    uint_not_equal,
    uint_less_equal,
    min_uint,
} = simdops;



var QuantiMat = function(opts) {
    "use strict";
    opts = opts || {};

    if (!(this instanceof QuantiMat)) {
        return new QuantiMat(opts);
    }

    opts.pxl_colors = opts.pxl_colors || new Uint32Array(0);
    opts.pxls = opts.pxls || new Uint32Array(0);
    this.new_pxls_ = "buffer" in opts.pxls ? new Uint32Array(opts.pxls.buffer) : Uint32Array.from(opts.pxls);
    this.new_pxl_colors_ = "buffer" in opts.pxl_colors ? new Colors(opts.pxl_colors.buffer) : new Colors(Uint32Array.from(opts.pxl_colors).buffer);
    var l = this.new_pxl_colors_.length|0;
    this.new_pxl_colors_is_skin_mask_ = new SetFixed(l|0);
    this.set_new_pxl_skin_mask();
    this.best_color_number_ = opts.number_of_color;

    this.max_cluster_ = l > 65536 ? 65536+1: l > 16384 ? 4096+1: l > 8192 ? 256+1: l > 512 ? 16+1: 1;
    this.index_clusters_ = new Array(this.max_cluster_);
    this.length_clusters_ = new Uint32Array(this.max_cluster_);

    this.pxl_colors_usage_ = new Uint32Array(l);
    this.all_index_clusters_ = new Uint32Array(l);
    this.clean_pxl_colors_ = new Uint32Array(l);
    this.clean_pxl_colors_lookup_ = {};

    this.is_skin_ops_ = 0;
    this.match_ops_ = 0;
    this.blend_ops_ = 0;
    this.remove_duplicate_ops_ = 0;
    this.simplify_ops_ = 0;
    this.classify_on_x_bits_ops_ = 0;
};

Object.defineProperty(QuantiMat.prototype, 'set_is_skin_ops', {
    get: function() { "use strict"; return function(n) {
        "use strict";
        this.is_skin_ops_ = (n|0) >>> 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'set_match_ops', {
    get: function() { "use strict"; return function(n) {
        "use strict";
        this.match_ops_ = (n|0) >>> 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'set_blend_ops', {
    get: function() { "use strict"; return function(n) {
        "use strict";
        this.blend_ops_ = (n|0) >>> 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'set_remove_duplicate_ops', {
    get: function() { "use strict"; return function(n) {
        "use strict";
        this.remove_duplicate_ops_ = (n|0) >>> 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'set_simplify_ops', {
    get: function() { "use strict"; return function(n) {
        "use strict";
        this.simplify_ops_ = n;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'set_classify_on_x_bits_ops', {
    get: function() { "use strict"; return function(n) {
        "use strict";
        this.classify_on_x_bits_ops_ = n;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_is_skin_ops', {
    get: function() { "use strict"; return function() {
        "use strict";
        return this.is_skin_ops_ | 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_match_ops', {
    get: function() { "use strict"; return function() {
        "use strict";
        return this.match_ops_ | 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_blend_ops', {
    get: function() { "use strict"; return function() {
        "use strict";
        return this.blend_ops_ | 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_remove_duplicate_ops', {
    get: function() { "use strict"; return function() {
        "use strict";
        return this.remove_duplicate_ops_ | 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_simplify_ops', {
    get: function() { "use strict"; return function() {
        "use strict";
        return this.simplify_ops_;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_classify_on_x_bits_ops', {
    get: function() { "use strict"; return function() {
        "use strict";
        return this.classify_on_x_bits_ops_;
    }}
});
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
        this.new_pxl_colors_ = new Colors(this.clean_pxl_colors_.buffer.slice(0, multiply_uint_4(pxl_colors_length|0)));
        this.set_new_pxl_skin_mask();
    }}
});
Object.defineProperty(QuantiMat.prototype, 'set_new_pxl_skin_mask', {
    get: function() { "use strict"; return function() {
        "use strict";
        var c = new Color(new ArrayBuffer(4)), l = this.new_pxl_colors_.length|0, i = 0;
        this.new_pxl_colors_is_skin_mask_ = new SetFixed(l|0);
        for(; (i|0) < (l|0); i = i + 1 | 0) {
            if(this.new_pxl_colors_.get_use_element(i|0, c).skin){
                this.new_pxl_colors_is_skin_mask_.add(i|0);
            }
        }
        this.set_is_skin_ops(this.get_is_skin_ops() + i|0);
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_a_new_pxl_color_from_pxl_index', {
    get: function() {return function(index){return this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[index|0])&0xFFFFFFFF;}}
});

Object.defineProperty(QuantiMat.prototype, 'reset_cluster', {
    get: function() { "use strict"; return function() {
        "use strict";
        this.max_cluster_ = this.new_pxl_colors_.length > 65536 ? 65536+1: this.new_pxl_colors_.length > 16384 ? 4096+1: this.new_pxl_colors_.length > 8192 ? 256+1: this.new_pxl_colors_.length > 512 ? 16+1: 1;
        this.length_clusters_.fill(0, 0, this.max_cluster|0);
        for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){ this.index_clusters_[c|0] = [];}
    }}
});
Object.defineProperty(QuantiMat.prototype, 'add_in_indexes_cluster', {
    get: function() { "use strict"; return function(cluster_index, color_index) {
        "use strict";
        this.index_clusters_[(cluster_index | 0) >>> 0].push((color_index | 0) >>> 0);
    }}
});
Object.defineProperty(QuantiMat.prototype, 'set_all_cluster_indexes', {
    get: function() { "use strict"; return function() {
        "use strict";
        var c = 0;
        var offset = 0;
        for(; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){
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
    get: function() {"use strict"; return function(index){"use strict";return (this.all_index_clusters_[index|0] | 0)>>>0;}}
});
Object.defineProperty(QuantiMat.prototype, 'get_a_color_usage', {
    get: function() {"use strict"; return function(index){"use strict";return (this.pxl_colors_usage_[index|0] | 0) >>> 0;}}
});
Object.defineProperty(QuantiMat.prototype, 'set_a_color_usage', {
    get: function() {"use strict"; return function(index, usage){"use strict";return this.pxl_colors_usage_[index|0] = (usage|0)>>>0;}}
});
Object.defineProperty(QuantiMat.prototype, 'get_a_color_usage_percent', {
    get: function() {"use strict"; return function(index){"use strict";return this.pxl_colors_usage_[index|0] / this.new_pxls_.length;}}
});
Object.defineProperty(QuantiMat.prototype, 'get_average_color_usage_percent', {
    get: function() {"use strict"; return function(start, stop){
        "use strict";
        start = start | 0;
        stop = stop | 0;
        stop = (stop < start ? this.pxl_colors_usage_.length: stop) | 0;

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
    get: function() {"use strict";return function(index){"use strict";return this.new_pxl_colors_.get_new_element(index|0);}}
});
Object.defineProperty(QuantiMat.prototype, 'is_pxl_color_skin', {
    get: function() {"use strict";return function(index){"use strict";return this.new_pxl_colors_is_skin_mask_.has(index|0);}}
});
Object.defineProperty(QuantiMat.prototype, 'max_cluster', {
    get: function() {return this.max_cluster_ | 0;}
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
Object.defineProperty(QuantiMat.prototype, 'get_data', {
    get: function() {return function(){
        return Array.of(this.new_pxls_, this.new_pxl_colors_.subarray_uint32(0, this.new_pxl_colors_.length), {
            deduplicate: this.get_remove_duplicate_ops(),
            simplify: this.get_simplify_ops(),
            classify: this.get_classify_on_x_bits_ops(),
            skin: this.get_is_skin_ops(),
            blend: this.get_blend_ops(),
            match: this.get_match_ops()
        });
    }}
});

QuantiMat.prototype.output = function(format) {

    var format = format || "heap";
    var data = this.get_data();

    if(format == "heap") {

        var array_buffer = new Uint32Array(2+data[0].length+data[1].length);
        array_buffer[0] = data[0].length | 0;
        array_buffer[1] = data[1].length | 0;
        array_buffer.set(data[0], 2);
        array_buffer.set(data[1], 2+data[0].length);

        return array_buffer.buffer;
    }else {

        return data;
    }
}

QuantiMat.prototype.deduplicate = function() {
    "use strict";

    this.set_remove_duplicate_ops(this.get_remove_duplicate_ops() + 1|0);
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

    if(this.max_cluster === 65536+1){

        for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

            this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon16bits|0)>>>0, (l|0)>>>0);
        }
    }else if(this.max_cluster === 4096+1) {

        for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

            this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon12bits|0)>>>0, (l|0)>>>0);
        }
    }else if( this.max_cluster === 256+1) {

        for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

            this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon8bits|0)>>>0, (l|0)>>>0);
        }
    }else if(this.max_cluster === 16+1){

        for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

            this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon4bits|0)>>>0, (l|0)>>>0);
        }
    }else {

        for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

            this.add_in_indexes_cluster(0, (l|0)>>>0);
        }
    }

    if(this.max_cluster > 1) {

        this.set_classify_on_x_bits_ops(this.get_classify_on_x_bits_ops() + this.new_pxl_colors_length);
    }

    this.set_all_cluster_indexes();
}

QuantiMat.prototype.process_threshold = function(t) {
    "use strict";

    t = (t | 0) >>> 0;

    var weight_applied_to_color_usage_difference = fr(t / 256);
    var index_merged = false;
    var latest_colors = [];
    var latest_amounts = [];
    var start = 0;
    var stop = 0;
    var color_a, color_b;
    var color_a_skin = false;
    var color_b_skin = false;
    var color_a_usage = 0, color_b_usage = 0;
    var color_a_usage_percent = 0, color_b_usage_percent = 0, average_color_usage_percent = 0;
    var color_usage_difference_positive = 0.0;
    var weighted_threshold = 0.0;
    var weighted_threshold_skin = 0.0;
    var weighted_threshold_skin_skin = 0.0;
    var index_of_color_a = 0;
    var index_of_color_b = 0;
    var x = 0, y = 0, c = 0;
    var color_n_in_cluster = 0;
    var threshold = 0;

    // 1x Threshold + 1x weight
    weighted_threshold =
        fr(
            // Threshold and weight applied to threshold divided by what is not the threshold
            fr((t / 256) + (t / 256 * weight_applied_to_color_usage_difference)) /
            fr(1 + weight_applied_to_color_usage_difference)
        );  // THRESHOLD + THRESHOLD * WEIGHT / 1 + WEIGHT
    weighted_threshold_skin_skin = fr(weighted_threshold * SAME_SKIN_COLOR_MATCH_MULTIPLY);
    weighted_threshold_skin = fr(weighted_threshold * DISTINCT_SKIN_COLOR_MATCH_MULTIPLY);

    for(; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

        color_n_in_cluster = (this.get_length_in_index_clusters(c|0) | 0) >>> 0;
        stop = (start + color_n_in_cluster | 0) >>> 0;
        average_color_usage_percent = this.get_average_color_usage_percent(start|0, stop|0);

        for(x = start|0; (x|0) < (stop|0); x = (x+1|0)>>>0) {

            index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;

            // Update color usage and relative variables
            color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
            color_a_skin = this.is_pxl_color_skin((index_of_color_a|0)>>>0);
            color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;

            if((color_a_usage|0) > 0) {

                // Start following color snake
                latest_colors = [];

                for(y = start|0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                    index_of_color_b = (this.get_an_index_in_clusters((y|0)>>>0)|0)>>>0;
                    // Update color usage and relative variables
                    color_b = this.get_a_new_pxl_color((index_of_color_b|0)>>>0);
                    color_b_skin = this.is_pxl_color_skin((index_of_color_b|0)>>>0);
                    color_b_usage = (this.get_a_color_usage((index_of_color_b|0)>>>0)|0)>>>0;

                    if((color_b_usage|0) != 0 && (index_of_color_a|0) != (index_of_color_b|0) && (color_a_skin|0) == (color_b_skin|0)) {

                        // Here we find the normalized color usage 0.1-10 in average
                        color_a_usage_percent = this.get_a_color_usage_percent((index_of_color_a|0)>>>0) / average_color_usage_percent;
                        color_b_usage_percent = this.get_a_color_usage_percent((index_of_color_b|0)>>>0) / average_color_usage_percent;

                        // Here we have different threshold for skin to skin, skin to environement, and environement to environement color operation
                        threshold = (color_a_skin && color_b_skin) ? weighted_threshold_skin_skin: (color_a_skin || color_b_skin) ? weighted_threshold_skin: weighted_threshold;

                        // There the more a color is used the less we will probably blend it, also:
                        // The greater the "usage" distance is, the most probably we'll have to sacrifice the lowest used color
                        // So the more the usage distance the more probabilities we'll have to blend them together
                        threshold = fr(threshold + threshold / fr((color_a_usage_percent+color_b_usage_percent) - Math.abs(color_a_usage_percent-color_b_usage_percent)));
                        // CIE LAB 1976 version color scheme is used to measure accurate the distance for the human eye
                        if(color_a.cie76_match_with(color_b,  fr(threshold/2))) {

                            color_usage_difference_positive = fr(color_b_usage / color_a_usage);

                            // Update color usage and relative variables
                            index_merged = true;

                            // Adds color to blend to processed colors and stack it to what will be set to be equals with all other color blended
                            this.set_a_color_usage(index_of_color_b|0, 0);
                            latest_colors.push(color_b);
                            latest_amounts.push(color_usage_difference_positive);
                        }
                    }
                }
            }

            if((latest_colors.length|0) > 0) {
                Color.blend_all(color_a, latest_colors, latest_amounts);
                latest_colors = []; latest_amounts = [];
            }
        }

        start = stop | 0;
    }

    return index_merged;
}


QuantiMat.prototype.round = function() {
    "use strict";

    if(this.new_pxl_colors_length > 1024) {

        var simplify_of = (this.new_pxl_colors_length > 32768 ? 24: this.new_pxl_colors_length > 32768 ? 20: this.new_pxl_colors_length > 16384 ? 16: this.new_pxl_colors_length > 8192 ? 12: this.new_pxl_colors_length > 2048 ? 8: this.new_pxl_colors_length > 1024 ? 4: 1) | 0;
        for(var l = 0; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {
            this.get_a_new_pxl_color((l|0)>>>0).simplify(simplify_of);
        }
        this.set_simplify_ops(this.get_simplify_ops()+this.new_pxl_colors_length);
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

    var t = (this.new_pxl_colors_length > 60000 ? 60: this.new_pxl_colors_length > 32000 ? 32: this.new_pxl_colors_length > 16000 ? 16: this.new_pxl_colors_length > 8192 ? 8: this.new_pxl_colors_length > 4096 ? 4: this.new_pxl_colors_length > 2048 ? 2: 1) | 0;
    while (this.new_pxl_colors_length > this.best_color_number) {

        if(this.process_threshold(t|0)) {
            this.deduplicate();
            this.clusterize();
        }

        t = t + (this.new_pxl_colors_length > 60000 ? 60: this.new_pxl_colors_length > 32000 ? 32: this.new_pxl_colors_length > 16000 ? 16: this.new_pxl_colors_length > 8192 ? 8: this.new_pxl_colors_length > 4096 ? 4: this.new_pxl_colors_length > 2048 ? 2: 1) | 0;
    }


    return this;
};


var QuantiMatGlobal = function(
    image_data,
    number_of_color
) {

    return new Promise(function(resolve){
        "use strict";

        var image_data_uint32 = new Uint32Array(image_data.data.buffer);
        var color_index = 1;
        var pxl_colors = Uint32Array.from(new Set(image_data_uint32));
        var pxl_colors_map = {};
        var original_color_n = pxl_colors.length;
        var pxls = new Uint32Array(image_data_uint32.length);

        for(var i = 0, l = original_color_n|0; (i|0) < (l|0); i = (i+1|0)>>>0) {
            pxl_colors_map[pxl_colors[i|0]] = (i | 0) >>> 0;
        }

        for(var i = 0, l = image_data_uint32.length|0; (i|0) < (l|0); i = (i+1|0)>>>0) {
            pxls[i|0] = (pxl_colors_map[image_data_uint32[i|0]] | 0) >>> 0;
        }

        var t1 = Date.now();
        var result = QuantiMat({
            pxls: pxls,
            pxl_colors,
            number_of_color: number_of_color === "auto" ? original_color_n/1.618|0: (parseFloat(number_of_color) < 1) ? original_color_n-5: number_of_color,
            width: image_data.width,
            height: image_data.height
        }).init().run().output("split");
        var t2 = Date.now();

        console.log(result[2]);
        var res_pxls = result[0];
        var res_pxl_length = res_pxls.length|0;
        var res_pxl_size = res_pxls.length-1|0;
        var res_pxl_colors = result[1];

        for(var i = 0; (i|0) < (res_pxl_length|0); i = (i+1|0)>>>0) {
            image_data_uint32[i|0] = (res_pxl_colors[(res_pxls[i|0]|0) >>> 0] | 0) >>> 0;
        }

        image_data = new ImageData(new Uint8ClampedArray(image_data_uint32.buffer), image_data.width, image_data.height);

        resolve([image_data, res_pxls, res_pxl_colors, original_color_n - res_pxl_colors.length, res_pxl_colors.length, t2-t1]);
    });
};

module.exports = {
    QuantiMatGlobal: QuantiMatGlobal,
    QuantiMat: QuantiMat
}