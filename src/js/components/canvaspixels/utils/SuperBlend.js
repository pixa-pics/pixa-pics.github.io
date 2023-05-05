import {simdops, SIMDopeColor, SIMDopeColors} from "simdope/index";
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


function _build_state(layer_number, max_length) {
    "use strict";
    layer_number = layer_number | 0;
    max_length = max_length | 0;

    return {
        layer_number: layer_number | 0,
        max_length: max_length | 0,
        current_index: 0,
        hover_data_in_layer: new Uint8Array(new ArrayBuffer(max_length)),
        indexes_data_for_layers: new Uint32Array(max_length),
        colors_data_in_layers_uint32: new Uint32Array(max_length*layer_number),
        amount_data_in_layers: new Uint8Array(max_length*layer_number),
    };
}
function _build_shadow_state (state, old_shadow_state) {
    "use strict";

    state = state || {};
    // Create a shadow state for computation
    old_shadow_state = old_shadow_state || {
        base_rgba_colors_for_blending: new Uint32Array(0),
        uint32_rgba_colors_data_in_layers_buffer: new ArrayBuffer((state.layer_number | 0) * (state.max_length | 0) * 4),
        start_layer_indexes: new Uint8Array(0),
        all_layers_length: 0,
        used_colors_length: 0,
    };

    old_shadow_state.bv = old_shadow_state.bv || {};

    old_shadow_state.bv.color_less_uint8x4 = SIMDopeColor.new_of(255, 255, 255, 255);
    old_shadow_state.bv.color_full_uint8x4 = SIMDopeColor.new_of(0, 0, 0, 255);
    old_shadow_state.bv.base_uint8x4A = SIMDopeColor.new_zero();
    old_shadow_state.bv.base_uint8x4B = SIMDopeColor.new_zero();
    old_shadow_state.bv.base_uint8x4C = SIMDopeColor.new_zero();
    old_shadow_state.bv.base_uint8x4D = SIMDopeColor.new_zero();
    old_shadow_state.bv.added_uint8x4A = SIMDopeColor.new_zero();
    old_shadow_state.bv.added_uint8x4B = SIMDopeColor.new_zero();
    old_shadow_state.bv.added_uint8x4C = SIMDopeColor.new_zero();
    old_shadow_state.bv.added_uint8x4D = SIMDopeColor.new_zero();
    old_shadow_state.bv.start_layerA = 0;
    old_shadow_state.bv.start_layerB = 0;
    old_shadow_state.bv.start_layerC = 0;
    old_shadow_state.bv.start_layerD = 0;

    return old_shadow_state;
}
function _update_state(state, layer_number, max_length) {
    "use strict";
    layer_number = layer_number | 0;
    max_length = max_length | 0;

    if(typeof state === "undefined") {

        return _build_state(layer_number, max_length);
    } if(state === null){

        return _build_state(layer_number, max_length);
    } else {

        let layer_number_difference = minus_int(layer_number, state.layer_number);

        // Flooding or recreate existing layers
        if (uint_not_equal(layer_number_difference, 0) || uint_less(state.max_length, max_length)) {

            return _build_state(layer_number, max_length);
        }else {

            state.layer_number = layer_number | 0;
            state.max_length = max_length | 0;
            state.current_index = 0;
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

    this.state_ = _build_state(opts.layer_number || 1, opts.max_length || 1);
    this.shadow_state_ = _build_shadow_state(this.state_);
    this.bytes_index_ = -1;

    return this;
}

Object.defineProperty(SuperBlend.prototype, 'state', {
    get: function() { "use strict"; return this.state_;}
});

Object.defineProperty(SuperBlend.prototype, 'set_state', {
    get: function() { "use strict"; return function (s) {
        return  this.state_ = s;
    }}
});

Object.defineProperty(SuperBlend.prototype, 'set_shadow_state', {
    get: function() { "use strict"; return function (ss) {
        return  this.shadow_state_  = ss;
    }}
});

Object.defineProperty(SuperBlend.prototype, 'update_shadow_state', {
    get: function() { "use strict"; return function() {
        "use strict";
        // Create a shadow state for computation
        this.shadow_state_.all_layers_length = this.state_.layer_number | 0;
        this.shadow_state_.max_used_colors_length = this.state_.max_length | 0;
        this.shadow_state_.used_colors_length = this.state_.current_index | 0;

        if(this.shadow_state_.base_rgba_colors_for_blending.length >= this.shadow_state_.used_colors_length) {

            this.shadow_state_.base_rgba_colors_for_blending.fill(0, 0, this.shadow_state_.used_colors_length);
            this.shadow_state_.start_layer_indexes.fill(1, 0, this.shadow_state_.used_colors_length);
        }else {
            this.shadow_state_.base_rgba_colors_for_blending = new Uint32Array(this.shadow_state_.used_colors_length);
            this.shadow_state_.start_layer_indexes = new Uint8Array(this.shadow_state_.used_colors_length);
            this.shadow_state_.start_layer_indexes.fill(1, 0, this.shadow_state_.used_colors_length);
        }
    }}
});

Object.defineProperty(SuperBlend.prototype, 'shadow_state', {
    get: function() { "use strict"; return this.shadow_state_;}
});

Object.defineProperty(SuperBlend.prototype, 'set_bytes_index', {
    get: function() { "use strict"; return function (i) {
        return  this.bytes_index_  = i | 0;
    }}
});
Object.defineProperty(SuperBlend.prototype, 'bytes_index', {
    get: function() { "use strict"; return function () {
        return  this.bytes_index_ | 0;
    }}
});

SuperBlend.init = function (lay_n, pxl_len) {

    return SuperBlend({layer_number: lay_n, max_length: pxl_len});
}

Object.defineProperty(SuperBlend.prototype, 'for', {
    get: function() { "use strict"; return function (pixel_index) {

        this.state_.indexes_data_for_layers[this.state_.current_index|0] = (pixel_index | 0) >>> 0;
        this.state_.current_index = plus_uint(this.state_.current_index, 1);
        this.bytes_index_ = plus_int(this.bytes_index_,1);
    }}
});

Object.defineProperty(SuperBlend.prototype, 'stack', {
    get: function() { "use strict"; return function (for_layer_index, ui32color, amount, is_hover) {

        for_layer_index = (for_layer_index | 0) >>> 0;

        this.state_.colors_data_in_layers_uint32[plus_uint(multiply_uint(this.bytes_index_, this.state_.layer_number), for_layer_index)] = clamp_uint32(ui32color);
        this.state_.amount_data_in_layers[plus_uint(multiply_uint(this.bytes_index_, this.state_.layer_number), for_layer_index)] = clamp_uint8(amount);
        this.state_.hover_data_in_layer[this.bytes_index_|0] = uint_not_equal(clamp_uint8(is_hover), 0) ? plus_uint(for_layer_index, 1): 0;
    }}
});

SuperBlend.prototype.blend = function(should_return_transparent, alpha_addition) {
    "use strict";

    should_return_transparent = should_return_transparent | 0;
    alpha_addition = alpha_addition | 0;

    this.update_shadow_state();

    let {
        colors_data_in_layers_uint32,
        hover_data_in_layer,
        amount_data_in_layers,
        indexes_data_for_layers
    } = this.state;
    let {
        base_rgba_colors_for_blending,
        start_layer_indexes,
        all_layers_length,
        used_colors_length,
        max_used_colors_length,
        bv
    } = this.shadow_state;
    let {color_less_uint8x4, color_full_uint8x4, start_layer} = bv;
    let {
        base_uint8x4A,
        added_uint8x4A,
        start_layerA,
        base_uint8x4B,
        added_uint8x4B,
        start_layerB,
        base_uint8x4C,
        added_uint8x4C,
        start_layerC,
        base_uint8x4D,
        added_uint8x4D,
        start_layerD
    } = bv;

    let SIMDope_layers_with_colors = new SIMDopeColors(colors_data_in_layers_uint32.buffer, 0, (used_colors_length*all_layers_length)<<2);
    let SIMDope_final_with_colors = new SIMDopeColors(base_rgba_colors_for_blending.buffer, 0, used_colors_length<<2);
    let i = 0, offs = 0, roffs = 0;

    return new Promise(function (resolve) {

        // Browse the full list of pixel colors encoded within 32 bytes of data
        /*for (i = 0; int_less(i, used_colors_length); i = plus_uint(i, 1)) {

            // Compute the layer to start the color addition
            start_layer = 0;
            for (let layer_n = minus_uint(all_layers_length, 1); int_greater_equal(layer_n, 0); layer_n = minus_uint(layer_n, 1)) {

                if (int_equal(start_layer, 0)) {

                    if (SIMDope_layers_with_colors.get_element(plus_uint(offs, i)).is_not_fully_opaque() && int_equal(amount_data_in_layers[layer_n][i], 255)) {

                        start_layer = layer_n | 0;
                    }
                }
            }
            start_layer_indexes[i] = plus_int(start_layer, 1);
        }*/

        i = 0, offs = 0, roffs = 0;

        /*for (; uint_less_equal(i + 4 | 0, used_colors_length); i = plus_uint(i, 4)) {

            start_layerA = start_layer_indexes[i | 0];
            start_layerB = start_layer_indexes[i + 1 | 0];
            start_layerC = start_layer_indexes[i + 2 | 0];
            start_layerD = start_layer_indexes[i + 3 | 0];

            // Get the first base color to sum up with colors atop of it
            base_uint8x4A = SIMDope_final_with_colors.get_element(i | 0);
            base_uint8x4B = SIMDope_final_with_colors.get_element(i + 1 | 0);
            base_uint8x4C = SIMDope_final_with_colors.get_element(i + 2 | 0);
            base_uint8x4D = SIMDope_final_with_colors.get_element(i + 3 | 0);

            // Sum up all colors above
            for (let layer_n = minus_uint(min_uint(min_uint(start_layerA, start_layerB), min_uint(start_layerC, start_layerD)), 1); int_less(layer_n, all_layers_length); layer_n = plus_int(layer_n, 1)) {

                offs = multiply_uint(layer_n, max_used_colors_length);
                added_uint8x4A = uint_not_equal(hover_data_in_layer[i | 0], layer_n + 1 | 0) ? SIMDope_layers_with_colors.get_element(plus_uint(offs, i | 0)) : SIMDopeColor.average(base_uint8x4A, (base_uint8x4A.is_dark() ? color_less_uint8x4 : color_full_uint8x4)).set_a(plus_uint(192, divide_uint(amount_data_in_layers[plus_uint(offs, i | 0)], 4)));
                added_uint8x4B = uint_not_equal(hover_data_in_layer[i + 1 | 0], layer_n + 1 | 0) ? SIMDope_layers_with_colors.get_element(plus_uint(offs, i + 1 | 0)) : SIMDopeColor.average(base_uint8x4B, (base_uint8x4B.is_dark() ? color_less_uint8x4 : color_full_uint8x4)).set_a(plus_uint(192, divide_uint(amount_data_in_layers[plus_uint(offs, i + 1 | 0)], 4)));
                added_uint8x4C = uint_not_equal(hover_data_in_layer[i + 2 | 0], layer_n + 1 | 0) ? SIMDope_layers_with_colors.get_element(plus_uint(offs, i + 2 | 0)) : SIMDopeColor.average(base_uint8x4C, (base_uint8x4C.is_dark() ? color_less_uint8x4 : color_full_uint8x4)).set_a(plus_uint(192, divide_uint(amount_data_in_layers[plus_uint(offs, i + 2 | 0)], 4)));
                added_uint8x4D = uint_not_equal(hover_data_in_layer[i + 3 | 0], layer_n + 1 | 0) ? SIMDope_layers_with_colors.get_element(plus_uint(offs, i + 3 | 0)) : SIMDopeColor.average(base_uint8x4D, (base_uint8x4D.is_dark() ? color_less_uint8x4 : color_full_uint8x4)).set_a(plus_uint(192, divide_uint(amount_data_in_layers[plus_uint(offs, i + 3 | 0)], 4)));

                SIMDopeColor.blend_all_four(
                    base_uint8x4A, base_uint8x4B, base_uint8x4C, base_uint8x4D,
                    added_uint8x4A, added_uint8x4B, added_uint8x4C, added_uint8x4D,
                    amount_data_in_layers[plus_uint(multiply_uint(layer_n, max_used_colors_length), i | 0)] | 0,
                    amount_data_in_layers[plus_uint(offs, i + 1 | 0)] | 0,
                    amount_data_in_layers[plus_uint(offs, i + 2 | 0)] | 0,
                    amount_data_in_layers[plus_uint(offs, i + 3 | 0)] | 0,
                    should_return_transparent, alpha_addition);
            }
        }*/

        for (; uint_less(i | 0, used_colors_length); i = plus_uint(i, 1)) {

            start_layerA = start_layer_indexes[i | 0];
            base_uint8x4A = SIMDope_final_with_colors.get_element(i | 0);
            base_uint8x4B = base_uint8x4A;
            roffs = multiply_uint(i, all_layers_length);
            // Sum up all colors above
            for (let layer_n = minus_uint(start_layerA, 1); uint_less(layer_n, all_layers_length); layer_n = plus_int(layer_n, 1)) {

                offs = plus_uint(roffs, layer_n);
                base_uint8x4A.set_tail(
                    uint_not_equal(hover_data_in_layer[i | 0], layer_n + 1 | 0) ? SIMDope_layers_with_colors.get_element(offs | 0) : SIMDopeColor.average(base_uint8x4A, (base_uint8x4A.is_dark() ? color_less_uint8x4 : color_full_uint8x4)).set_a(plus_uint(192, divide_uint(amount_data_in_layers[plus_uint(offs, i | 0)], 4)))
                    , amount_data_in_layers[offs | 0] | 0);
                base_uint8x4A = base_uint8x4A.tail;
            }

            base_uint8x4B.blend_with_tails(alpha_addition)
        }

        resolve(Array.of(indexes_data_for_layers.subarray(0, SIMDope_final_with_colors.length), SIMDope_final_with_colors.subarray_uint32(0, SIMDope_final_with_colors.length)));
    });
};

SuperBlend.prototype.build = function(layer_number, max_length) {
    "use strict";
    layer_number = (layer_number | 0) >>> 0;
    max_length = (max_length | 0) >>> 0;

    this.set_bytes_index(-1);
    this.set_state(_build_state(layer_number, max_length));
    this.set_shadow_state(_build_shadow_state(this.state, this.shadow_state));
}
SuperBlend.prototype.update = function(layer_number, max_length) {
    "use strict";

    layer_number = (layer_number | 0) >>> 0;
    max_length = (max_length | 0) >>> 0;

    let state = this.state;
    this.set_bytes_index(-1);
    const changed_layer_number = (state.layer_number !== layer_number);
    this.set_state(_update_state(state, layer_number, max_length));

    if(changed_layer_number) {
        this.set_shadow_state(_build_shadow_state(this.state, this.shadow_state));
    }
}
SuperBlend.prototype.clear = function() {
    "use strict";
    this.set_state(_update_state(this.state, 1, 1));
}

module.exports = SuperBlend;