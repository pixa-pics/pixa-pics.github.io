import {simdops, SIMDopeColor, SIMDopeColors} from "simdope";
const {
    minus_int,
    int_not_equal,
    plus_int,
    plus_uint,
    minus_uint,
    multiply_uint,
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


function _build_state(layer_number, max_length, layers_opacity_255) {
    "use strict";
    layer_number = layer_number | 0;
    max_length = max_length | 0;
    var layer_o = new Uint8Array(layer_number);
    if(typeof layers_opacity_255 != "undefined") {
        layer_o.fill(255);
        layer_o.set(layers_opacity_255);
    }else {
        layer_o.fill(255);
    }

    let state = {
        number_length_index: Uint32Array.of(layer_number, max_length, 0),
        hover_data_in_layer: new Uint8Array(new ArrayBuffer(max_length)),
        indexes_data_for_layers: new Uint32Array(max_length),
        colors_data_in_layers_uint32: new Uint32Array(max_length*layer_number),
        layers_opacity_255: layer_o,
    };

    state.colors_data_in_layers_uint32_SIMDope = new SIMDopeColors(state.colors_data_in_layers_uint32.buffer);
    return state;
}
function _build_shadow_state (old_shadow_state) {
    "use strict";
    // Create a shadow state for computation
    old_shadow_state = old_shadow_state || {
        base_rgba_colors_for_blending: new Uint32Array(0),
        color_less_uint8x4: SIMDopeColor.new_of(255, 255, 255, 255),
        color_full_uint8x4: SIMDopeColor.new_of(0, 0, 0, 255),
        all_layers_length: 0,
        used_colors_length: 0,
    };

    old_shadow_state.base_rgba_colors_for_blending_SIMDope = new SIMDopeColors(old_shadow_state.base_rgba_colors_for_blending.buffer);
    return old_shadow_state;
}
function _update_state(state, layer_number, max_length, layers_opacity_255) {
    "use strict";
    layer_number = layer_number | 0;
    max_length = max_length | 0;

    if(typeof state === "undefined") {

        return _build_state(layer_number, max_length, layers_opacity_255);
    } if(state === null){

        return _build_state(layer_number, max_length, layers_opacity_255);
    } else {

        let layer_number_difference = minus_int(layer_number, state.layer_number);

        // Flooding or recreate existing layers
        if (uint_not_equal(layer_number_difference, 0) || uint_less(state.max_length, max_length)) {

            return _build_state(layer_number, max_length, layers_opacity_255);
        }else {

            state.number_length_index[0] = layer_number | 0;
            state.number_length_index[1] = max_length | 0;
            state.number_length_index[2] = 0;
            if(typeof layers_opacity_255 != "undefined") {
                state.layers_opacity_255.fill(255);
                state.layers_opacity_255.set(layers_opacity_255);
            }else {
                state.layers_opacity_255.fill(255);
            }
            return state;
        }
    }
}

var SuperBlend = function(opts) {
    "use strict";
    opts = opts || {};

    if (!(this instanceof SuperBlend)) {
        return new SuperBlend(opts);
    }

    this.state_ = _build_state(opts.layer_number || 1, opts.max_length || 1, opts.layers_opacity_255 || new Uint8Array(0));
    this.number_length_index_ = this.state_.number_length_index;
    this.hover_data_in_layer_ = this.state_.hover_data_in_layer;
    this.indexes_data_for_layers_ = this.state_.indexes_data_for_layers;
    this.colors_data_in_layers_uint32_ = this.state_.colors_data_in_layers_uint32;
    this.shadow_state_ = _build_shadow_state();
    this.bytes_index_ = 0;

    return this;
}

Object.defineProperty(SuperBlend.prototype, 'state', {
    get: function() { "use strict"; return this.state_;}
});

Object.defineProperty(SuperBlend.prototype, 'set_state', {
    get: function() { "use strict"; return function (s) {
        "use strict";
        this.state_ = s;
        this.number_length_index_ = this.state_.number_length_index;
        this.hover_data_in_layer_ = this.state_.hover_data_in_layer;
        this.indexes_data_for_layers_ = this.state_.indexes_data_for_layers;
        this.colors_data_in_layers_uint32_ = this.state_.colors_data_in_layers_uint32;
        return this.state_;
    }}
});

Object.defineProperty(SuperBlend.prototype, 'set_shadow_state', {
    get: function() { "use strict"; return function (ss) {
        "use strict";
        return  this.shadow_state_  = ss;
    }}
});

Object.defineProperty(SuperBlend.prototype, 'get_updated_shadow_state', {
    get: function() { "use strict"; return function() {
        "use strict";
        // Create a shadow state for computation
        this.shadow_state_.all_layers_length = this.number_length_index_[0] | 0;
        this.shadow_state_.layers_colors = new Array(this.number_length_index_[0] + 1 | 0).fill(null).map(function (){return new SIMDopeColor(new ArrayBuffer(4))});
        this.shadow_state_.max_used_colors_length = this.number_length_index_[1] | 0;
        this.shadow_state_.used_colors_length = this.number_length_index_[2] | 0;

        if(this.shadow_state_.base_rgba_colors_for_blending.length >= this.shadow_state_.used_colors_length) {

            this.shadow_state_.base_rgba_colors_for_blending.fill(0, 0, this.shadow_state_.used_colors_length);
        }else {
            this.shadow_state_.base_rgba_colors_for_blending = new Uint32Array(this.shadow_state_.used_colors_length);
            this.shadow_state_.base_rgba_colors_for_blending_SIMDope = new SIMDopeColors(this.shadow_state_.base_rgba_colors_for_blending.buffer);
        }

        return this.shadow_state_;
    }}
});

Object.defineProperty(SuperBlend.prototype, 'shadow_state', {
    get: function() { "use strict"; return this.shadow_state_;}
});

Object.defineProperty(SuperBlend.prototype, 'set_bytes_index', {
    get: function() { "use strict"; return function (i) {
        "use strict";
        return  this.bytes_index_  = i | 0;
    }}
});
Object.defineProperty(SuperBlend.prototype, 'bytes_index', {
    get: function() { "use strict"; return function () {
        "use strict";
        return  this.bytes_index_ | 0;
    }}
});

SuperBlend.init = function (lay_n, pxl_len, layers_opacity_255) {
    "use strict";
    return SuperBlend({layer_number: lay_n, max_length: pxl_len, layers_opacity_255: layers_opacity_255});
}

Object.defineProperty(SuperBlend.prototype, 'for', {
    get: function() { "use strict"; return function (pixel_index, amount_hover) {
        "use strict";
        this.indexes_data_for_layers_[this.number_length_index_[2]] = clamp_uint32(pixel_index);
        this.hover_data_in_layer_[this.number_length_index_[2]] = clamp_uint8(amount_hover);
        this.number_length_index_[2] = plus_uint(this.number_length_index_[2], 1);
    }}
});

Object.defineProperty(SuperBlend.prototype, 'next', {
    get: function() { "use strict"; return function () {
        "use strict";
        this.bytes_index_ = plus_uint(this.bytes_index_,1);
    }}
});

Object.defineProperty(SuperBlend.prototype, 'stack', {
    get: function() { "use strict"; return function (for_layer_index, ui32color) {
        "use strict";
        this.colors_data_in_layers_uint32_[plus_uint(multiply_uint(this.bytes_index_, this.number_length_index_[0]), clamp_uint8(for_layer_index))] = clamp_uint32(ui32color);
    }}
});

SuperBlend.prototype.blend = function(should_return_transparent, alpha_addition) {
    "use strict";

    should_return_transparent = should_return_transparent | 0;
    alpha_addition = alpha_addition | 0;

    let {
        base_rgba_colors_for_blending,
        base_rgba_colors_for_blending_SIMDope,
        all_layers_length,
        used_colors_length,
        layers_colors,
        color_less_uint8x4,
        color_full_uint8x4
    } = this.get_updated_shadow_state();

    let {
        colors_data_in_layers_uint32_SIMDope,
        hover_data_in_layer,
        layers_opacity_255,
        indexes_data_for_layers
    } = this.state;

    let i = 0, offs = 0, roffs = 0, layer_n = 0;

    return new Promise(function (resolve) {

        for (i  = 0; uint_less(i | 0, used_colors_length); i = plus_uint(i, 1)) {

            layers_colors[0] = base_rgba_colors_for_blending_SIMDope.get_element(i | 0, layers_colors[0]);
            roffs = multiply_uint(i, all_layers_length);
            // Sum up all colors above
            for (layer_n = 0; uint_less(layer_n, all_layers_length); layer_n = plus_int(layer_n, 1)) {

                offs = plus_uint(roffs, layer_n);
                layers_colors[layer_n+1|0] = colors_data_in_layers_uint32_SIMDope.get_element(offs | 0, layers_colors[layer_n+1|0]);
                layers_colors[layer_n|0].set_tail(layers_colors[layer_n+1|0], layers_opacity_255[layer_n|0]);
            }

            if((hover_data_in_layer[i | 0]|0) > 0) {
                layers_colors[0].blend_first_with_tails(alpha_addition)
                layers_colors[0].blend_first_with(layers_colors[0].is_dark() ? color_less_uint8x4 : color_full_uint8x4, hover_data_in_layer[i | 0], false, alpha_addition);
            }else {
                layers_colors[0].blend_first_with_tails(alpha_addition);
            }
        }

        resolve(Array.of(indexes_data_for_layers.subarray(0, used_colors_length), base_rgba_colors_for_blending.subarray(0, used_colors_length)));
    });
};

SuperBlend.prototype.build = function(layer_number, max_length, layers_opacity_255) {
    "use strict";
    layer_number = (layer_number | 0) >>> 0;
    max_length = (max_length | 0) >>> 0;

    this.set_bytes_index(0);
    this.set_state(_build_state(layer_number, max_length, layers_opacity_255));
}
SuperBlend.prototype.update = function(layer_number, max_length, layers_opacity_255) {
    "use strict";

    layer_number = (layer_number | 0) >>> 0;
    max_length = (max_length | 0) >>> 0;

    this.set_bytes_index(0);
    this.set_state(_update_state(this.state, layer_number, max_length, layers_opacity_255));
}
SuperBlend.prototype.clear = function() {
    "use strict";
    this.set_state(_update_state(this.state, 1, 1));
}

module.exports = SuperBlend;