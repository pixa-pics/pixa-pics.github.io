import SIMDope from "../../../utils/SIMDope";
const simdops = SIMDope.simdops
const {
    plus_int,
    minus_int,
    plus_uint,
    minus_uint,
    multiply_uint,
    divide_uint,
    abs_int,
    clamp_uint8,
    clamp_uint32,
    int_equal,
    int_not_equal,
    int_less,
    int_less_equal,
    int_greater_equal,
    uint_equal,
    uint_not_equal,
    uint_less,
    uint_less_equal,
} = simdops;

const SIMDope_color = SIMDope.SIMDope_color;
const SIMDope_colors = SIMDope.SIMDope_colors;
const SuperBlend = {
    _build_state(layer_number, max_length) {
        "use strict";
        layer_number = layer_number | 0;
        max_length = max_length | 0;

        const state = {
            layer_number: layer_number | 0,
            max_length: max_length | 0,
            current_index: 0,
            indexes_data_for_layers: new Uint32Array(max_length),
            colors_data_in_layers_buffers: new Array(),
            colors_data_in_layers_uint32: new Array(),
            amount_data_in_layers_buffers: new Array(),
            amount_data_in_layers: new Array(),
            hover_data_in_layers_buffers: new Array(),
            hover_data_in_layers: new Array(),
        };

        for(let i= 0; i < layer_number; i = i+1|0) {

            let colors_data_in_layers_buffers = new ArrayBuffer((max_length*4|0)>>>0);
            state.colors_data_in_layers_uint32.push(new Uint32Array(colors_data_in_layers_buffers));
            state.colors_data_in_layers_buffers.push(colors_data_in_layers_buffers);

            let amount_data_in_layers_buffers = new ArrayBuffer(max_length);
            state.amount_data_in_layers.push(new Uint8ClampedArray(amount_data_in_layers_buffers));
            state.amount_data_in_layers_buffers.push(amount_data_in_layers_buffers);

            let hover_data_in_layers_buffers = new ArrayBuffer(max_length);
            state.hover_data_in_layers.push(new Uint8ClampedArray(hover_data_in_layers_buffers));
            state.hover_data_in_layers_buffers.push(hover_data_in_layers_buffers);
        }

        return Object.assign({}, state);
    },
    _build_shadow_state (state, old_shadow_state) {
        "use strict";
        if(typeof old_shadow_state !== "undefined") {

            delete old_shadow_state.base_rgba_colors_for_blending;
            for(let i = 0; i < old_shadow_state.uint32_rgba_colors_data_in_layers.length; i = (i+1 | 0)>>>0) {
                delete old_shadow_state.uint32_rgba_colors_data_in_layers[(i|0)>>>0];
            }
            delete old_shadow_state.uint32_rgba_colors_data_in_layers;
        }

        // Create a shadow state for computation
        let shadow_state = {
            base_rgba_colors_for_blending: new Uint32Array(0),
            uint32_rgba_colors_data_in_layers: new Array(state.layer_number),
            start_layer_indexes: new Uint8ClampedArray(0),
            all_layers_length: 0,
            used_colors_length: 0,
            bv: {}
        };

        shadow_state.bv.color_less_uint8x4 = SIMDope_color.new_of(255, 255, 255, 255);
        shadow_state.bv.color_full_uint8x4 = SIMDope_color.new_of(0, 0, 0, 255);
        shadow_state.bv.base_uint8x4 = SIMDope_color.new_zero();
        shadow_state.bv.temp_uint8x4 = SIMDope_color.new_zero();
        shadow_state.bv.start_layer = 0;

        // Slice uint32 colors and give them as uint8
        let layer_n = 0;
        for(layer_n = 0; layer_n < state.layer_number; layer_n = (layer_n + 1 | 0)>>>0) {
            shadow_state.uint32_rgba_colors_data_in_layers[layer_n] = new Uint32Array(0);
        }

        return shadow_state;
    },
    _update_state(state, layer_number, max_length, _build_state) {
        "use strict";
        layer_number = layer_number | 0;
        max_length = max_length | 0;

        if(typeof state === "undefined") {

            return _build_state(layer_number, max_length);
        } if(state === null){

            return _build_state(layer_number, max_length);
        } else {

            let layer_number_difference = minus_int(layer_number, state.layer_number);
            let redefine_it_up_to_layer_n = state.layer_number | 0;

            // Add or remove layers
            if(uint_not_equal(layer_number_difference, 0)) {

                if(layer_number_difference > 0) { // Must add some layers

                    // Add layers within data array
                    for(let i = 1; int_less_equal(i, abs_int(layer_number_difference)); i = plus_uint(i, 1)) {

                        let colors_data_in_layers_buffers = new ArrayBuffer(multiply_uint(max_length, 4));
                        state.colors_data_in_layers_uint32.push(new Uint32Array(colors_data_in_layers_buffers));
                        state.colors_data_in_layers_buffers.push(colors_data_in_layers_buffers);

                        let amount_data_in_layers_buffers = new ArrayBuffer(max_length);
                        state.amount_data_in_layers.push(new Uint8ClampedArray(amount_data_in_layers_buffers));
                        state.amount_data_in_layers_buffers.push(amount_data_in_layers_buffers);

                        let hover_data_in_layers_buffers = new ArrayBuffer(max_length);
                        state.hover_data_in_layers.push(new Uint8ClampedArray(hover_data_in_layers_buffers));
                        state.hover_data_in_layers_buffers.push(hover_data_in_layers_buffers);
                    }

                }else if(int_less(layer_number_difference, 0)){ // Must remove some layers

                    // Delete layers within data array
                    for(let i = 1; i <= uint_less_equal(i, abs_int(layer_number_difference)); i = plus_uint(i, 1)) {

                        let index = minus_uint(state.layer_number,i);
                        delete state.colors_data_in_layers_uint32[index];
                        delete state.colors_data_in_layers_buffers[index];
                        delete state.amount_data_in_layers[index];
                        delete state.amount_data_in_layers_buffers[index];
                        delete state.hover_data_in_layers[index];
                        delete state.hover_data_in_layers_buffers[index];
                    }
                }
                layer_number_difference = 0;
            }

            // Flooding or recreate existing layers
            if (int_not_equal(layer_number_difference, 0) || int_not_equal(state.max_length, max_length)) {

                if (int_not_equal(state.max_length, max_length) || typeof state.colors_data_in_layers_uint32[minus_int(redefine_it_up_to_layer_n, 1)] === "undefined") {

                    state.indexes_data_for_layers = new Uint32Array(max_length);
                    for (let i = 0; uint_less(i, redefine_it_up_to_layer_n); i = plus_uint(i, 1)) {

                        state.colors_data_in_layers_buffers[i] = new ArrayBuffer(multiply_uint(max_length,4));
                        state.colors_data_in_layers_uint32[i] = new Uint32Array(state.colors_data_in_layers_buffers[i]);
                        state.amount_data_in_layers_buffers[i] = new ArrayBuffer(max_length);
                        state.amount_data_in_layers[i] = new Uint8ClampedArray(state.amount_data_in_layers_buffers[i]);
                        state.hover_data_in_layers_buffers[i] = new ArrayBuffer(max_length);
                        state.hover_data_in_layers[i] = new Uint8ClampedArray(state.hover_data_in_layers_buffers[i]);
                    }
                } else {

                    state.indexes_data_for_layers.fill(0);
                    for (let i = 0; uint_less(i, redefine_it_up_to_layer_n); i = plus_uint(i, 1)) {

                        state.colors_data_in_layers_uint32[i].fill(0);
                        state.amount_data_in_layers[i].fill(0);
                        state.hover_data_in_layers[i].fill(0);
                    }
                }
            }

            state.layer_number = layer_number | 0;
            state.max_length = max_length | 0;
            state.current_index = 0;
            return Object.assign({}, state);
        }
    },
    _update_shadow_state (shadow_state, state) {
        "use strict";
        // Create a shadow state for computation
        shadow_state.all_layers_length = state.layer_number | 0;
        shadow_state.used_colors_length = state.current_index | 0;
        shadow_state.base_rgba_colors_for_blending = new Uint32Array(shadow_state.used_colors_length);
        shadow_state.start_layer_indexes = new Uint8ClampedArray(shadow_state.used_colors_length);

        // Slice uint32 colors and give them as uint8
        for(let layer_n = 0; uint_less(layer_n, state.layer_number); layer_n = plus_uint(layer_n, 1)) {
            shadow_state.uint32_rgba_colors_data_in_layers[layer_n] = state.colors_data_in_layers_uint32[layer_n].subarray(0, shadow_state.used_colors_length);
        }

        return shadow_state;
    },
    init(lay_n, pxl_len){
        "use strict";
        const builder = this._build_state;
        const shadow_builder = this._build_shadow_state;
        const updater = this._update_state;
        const shadow_updater = this._update_shadow_state;

        let state = builder(lay_n || 1, pxl_len || 1);
        let shadow_state = shadow_builder(state);

        let bytes_index = -1;

        return {
            for: function(pixel_index) {
                "use strict";

                pixel_index = (pixel_index|0)>>>0;
                state.indexes_data_for_layers[state.current_index|0] = (pixel_index | 0) >>> 0;
                state.current_index = plus_uint(state.current_index, 1);
                bytes_index = plus_int(bytes_index,1);
            },
            stack: function(for_layer_index, ui32color, amount, is_hover) {
                "use strict";

                for_layer_index = (for_layer_index | 0) >>> 0;
                ui32color = clamp_uint32(ui32color);
                amount = clamp_uint8(amount);
                is_hover = clamp_uint8(is_hover);

                state.colors_data_in_layers_uint32[for_layer_index][bytes_index] = ui32color;
                state.amount_data_in_layers[for_layer_index][bytes_index] = amount;
                state.hover_data_in_layers[for_layer_index][bytes_index] = is_hover;
            },
            blend: function(should_return_transparent, alpha_addition) {
                "use strict";

                should_return_transparent = should_return_transparent | 0;
                alpha_addition = alpha_addition | 0;

                shadow_state = shadow_updater(shadow_state, state);
                let {hover_data_in_layers, amount_data_in_layers, indexes_data_for_layers} = state;
                let {base_rgba_colors_for_blending, uint32_rgba_colors_data_in_layers, start_layer_indexes, all_layers_length, used_colors_length, bv} = shadow_state;
                let {color_less_uint8x4, color_full_uint8x4, base_uint8x4, temp_uint8x4, start_layer} = bv;

                let SIMDope_layers_with_colors = uint32_rgba_colors_data_in_layers.map(function (uint32_array){ return SIMDope_colors(uint32_array.buffer); });
                let SIMDope_final_with_colors = SIMDope_colors(base_rgba_colors_for_blending);
                let i = 0;
                
                // Browse the full list of pixel colors encoded within 32 bytes of data
                for(i = 0; int_less(i, used_colors_length); i = plus_uint(i,1)) {

                    // Compute the layer to start the color addition
                    start_layer = 0;
                    for (let layer_n = minus_uint(all_layers_length, 1); int_greater_equal(layer_n, 0); layer_n = minus_uint(layer_n, 1)) {

                        if (int_equal(start_layer, 0)) {

                            if (uint_equal(SIMDope_layers_with_colors[layer_n].buffer_getUint8(plus_uint(multiply_uint(i, 4), 3)), 255) && int_equal(amount_data_in_layers[layer_n][i], 255)) {

                                start_layer = layer_n | 0;
                            }
                        }
                    }
                    start_layer_indexes[i] = plus_int(start_layer, 1);
                }
                
                for(i = 0; uint_less_equal(i, used_colors_length); i = plus_uint(i,1)) {

                    start_layer = start_layer_indexes[i];

                    // Get the first base color to sum up with colors atop of it
                    base_uint8x4.set(uint_not_equal(start_layer, 0) ?
                        SIMDope_layers_with_colors[minus_uint(start_layer, 1)].get_element(i):
                        SIMDope_final_with_colors.get_element(i)
                    );

                    // Sum up all colors above
                    for(let layer_n = minus_uint(start_layer, 1); int_less(layer_n, all_layers_length); layer_n = plus_int(layer_n, 1)) {

                        // Compute hover if hover color
                        // Get the color below current layer and compute hover color
                        base_uint8x4.blend_with(
                            uint_equal(hover_data_in_layers[layer_n][i], 0) ?
                                SIMDope_layers_with_colors[layer_n].get_element(i)
                                : SIMDope_color.with_a(SIMDope_color.average(base_uint8x4, (base_uint8x4.is_dark() ? color_less_uint8x4: color_full_uint8x4)), plus_uint(192, divide_uint(amount_data_in_layers[layer_n][i], 4)))
                        , amount_data_in_layers[layer_n][i], should_return_transparent, alpha_addition);
                    }

                    SIMDope_final_with_colors.set_element(i, base_uint8x4);
                }

                return Array.of(indexes_data_for_layers.slice(0, SIMDope_final_with_colors.length), SIMDope_final_with_colors.subarray_uint32(0, SIMDope_final_with_colors.length));
            },
            build: function(layer_number, max_length) {
                "use strict";
                layer_number = (layer_number | 0) >>> 0;
                max_length = (max_length | 0) >>> 0;

                bytes_index = -1;
                state = builder(layer_number, max_length);
                shadow_state = shadow_builder(state, shadow_state);
            },
            update: function(layer_number, max_length) {
                "use strict";
                layer_number = (layer_number | 0) >>> 0;
                max_length = (max_length | 0) >>> 0;

                bytes_index = -1;
                const changed_layer_number = (state.layer_number !== layer_number);
                state = updater(state, layer_number, max_length, builder);
                if(changed_layer_number) { shadow_state = shadow_builder(state, shadow_state); }
            },
            clear: function() {
                "use strict";
                state = updater(state, 1, 1, builder);
            }
        };
    }
};

module.exports = SuperBlend;