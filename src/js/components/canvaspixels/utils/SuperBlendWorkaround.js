import {simdops, Color, Colors} from "simdope";
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
        number_length_index_byte: Uint32Array.of(layer_number, max_length, 0, 0),
        hover_data_in_layer: new Uint8Array(new ArrayBuffer(max_length)),
        indexes_data_for_layers: new Uint32Array(max_length),
        colors_data_in_layers_uint32: new Uint32Array(max_length*layer_number),
        layers_opacity_255: layer_o,
    };

    return state;
}
function _build_shadow_state (old_shadow_state) {
    "use strict";
    // Create a shadow state for computation
    old_shadow_state = old_shadow_state || {
        base_rgba_colors_for_blending: new Uint32Array(0),
        color_less_uint8x4: Color.new_of(255, 255, 255, 255),
        color_full_uint8x4: Color.new_of(0, 0, 0, 255),
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

            state.number_length_index_byte[0] = layer_number | 0;
            state.number_length_index_byte[1] = max_length | 0;
            state.number_length_index_byte[2] = 0;
            state.number_length_index_byte[3] = 0;
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
    this.number_length_index_byte_ = this.state_.number_length_index_byte;
    this.hover_data_in_layer_ = this.state_.hover_data_in_layer;
    this.indexes_data_for_layers_ = this.state_.indexes_data_for_layers;
    this.colors_data_in_layers_uint32_ = this.state_.colors_data_in_layers_uint32;
    this.shadow_state_ = _build_shadow_state();

    return this;
}

Object.defineProperty(SuperBlend.prototype, 'state', {
    get: function() { "use strict"; return this.state_;},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SuperBlend.prototype, 'set_state', {
    get: function() { "use strict"; return function (s) {
        "use strict";
        this.state_ = s;
        this.number_length_index_byte_ = this.state_.number_length_index_byte;
        this.hover_data_in_layer_ = this.state_.hover_data_in_layer;
        this.indexes_data_for_layers_ = this.state_.indexes_data_for_layers;
        this.colors_data_in_layers_uint32_ = this.state_.colors_data_in_layers_uint32;
        return this.state_;
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SuperBlend.prototype, 'set_shadow_state', {
    get: function() { "use strict"; return function (ss) {
        "use strict";
        return  this.shadow_state_  = ss;
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SuperBlend.prototype, 'get_updated_shadow_state', {
    get: function() { "use strict"; return function() {
        "use strict";
        // Create a shadow state for computation
        if(this.shadow_state_.all_layers_length < this.number_length_index_byte_[0]) {
            this.shadow_state_.layers_colors = new Array(this.number_length_index_byte_[0] + 1 | 0).fill(null).map(function (){return new SIMDopeColor(new ArrayBuffer(4))});
        }

        this.shadow_state_.all_layers_length = this.number_length_index_byte_[0] | 0;
        this.shadow_state_.max_used_colors_length = this.number_length_index_byte_[1] | 0;
        this.shadow_state_.used_colors_length = this.number_length_index_byte_[2] | 0;

        if(this.shadow_state_.base_rgba_colors_for_blending.length >= this.shadow_state_.used_colors_length) {
            this.shadow_state_.base_rgba_colors_for_blending.fill(0, 0, this.shadow_state_.used_colors_length);
        }else {
            this.shadow_state_.base_rgba_colors_for_blending = new Uint32Array(this.shadow_state_.used_colors_length);
            this.shadow_state_.base_rgba_colors_for_blending_SIMDope = new SIMDopeColors(this.shadow_state_.base_rgba_colors_for_blending.buffer);
        }

        return this.shadow_state_;
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SuperBlend.prototype, 'shadow_state', {
    get: function() { "use strict"; return this.shadow_state_;},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SuperBlend.prototype, 'set_bytes_index', {
    get: function() { "use strict"; return function (i) {
        "use strict";
        return  this.number_length_index_byte_[3]  = i | 0;
    }},
    enumerable: false,
    configurable: false
});
Object.defineProperty(SuperBlend.prototype, 'bytes_index', {
    get: function() { "use strict"; return function () {
        "use strict";
        return  this.number_length_index_byte_[3] | 0;
    }},
    enumerable: false,
    configurable: false
});

SuperBlend.init = function (lay_n, pxl_len, layers_opacity_255) {
    "use strict";
    return new SuperBlend({layer_number: lay_n, max_length: pxl_len, layers_opacity_255: layers_opacity_255});
}

Object.defineProperty(SuperBlend.prototype, 'for', {
    get: function() { "use strict"; return function (pixel_index, amount_hover) {
        "use strict";
        this.indexes_data_for_layers_[this.number_length_index_byte_[2]] = clamp_uint32(pixel_index);
        this.hover_data_in_layer_[this.number_length_index_byte_[2]] = clamp_uint8(amount_hover);
        this.number_length_index_byte_[2] = plus_uint(this.number_length_index_byte_[2], 1);
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SuperBlend.prototype, 'next', {
    get: function() { "use strict"; return function () {
        "use strict";
        this.number_length_index_byte_[3] = plus_uint(this.number_length_index_byte_[3],1);
    }},
    enumerable: false,
    configurable: false
});

Object.defineProperty(SuperBlend.prototype, 'stack', {
    get: function() { "use strict"; return function (for_layer_index, ui32color) {
        "use strict";
        this.colors_data_in_layers_uint32_[plus_uint(multiply_uint(this.number_length_index_byte_[1], clamp_uint8(for_layer_index)), this.number_length_index_byte_[3])] = clamp_uint32(ui32color);
    }},
    enumerable: false,
    configurable: false
});

SuperBlend.prototype.blend = function(should_return_transparent, alpha_addition) {
    "use strict";

    should_return_transparent = should_return_transparent | 0;
    alpha_addition = alpha_addition | 0;

    var {
        base_rgba_colors_for_blending,
        base_rgba_colors_for_blending_SIMDope,
        all_layers_length,
        used_colors_length,
        layers_colors,
        color_less_uint8x4,
        color_full_uint8x4
    } = this.get_updated_shadow_state();

    var {
        colors_data_in_layers_uint32,
        hover_data_in_layer,
        layers_opacity_255,
        indexes_data_for_layers
    } = this.state;

    var number_length_index_byte = this.number_length_index_byte_;

    return new Promise(function (resolve) {
        var uint32a = new Array(all_layers_length).fill(null).map(function (el, i){return colors_data_in_layers_uint32.slice(i*used_colors_length, i*used_colors_length+used_colors_length).buffer});
        var blender = new SIMDopeBlend(uint32a, layers_opacity_255);
        resolve(Array.of(indexes_data_for_layers.slice(0, used_colors_length), blender.blend()));
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