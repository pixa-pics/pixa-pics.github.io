const SuperBlend = {
    _blend_state: function(state, should_return_transparent, alpha_addition) {
        "use strict";
        should_return_transparent = should_return_transparent | 0 > 0;
        alpha_addition = alpha_addition | 0 > 0;

        let all_layers_length = state.layer_number | 0;
        let used_colors_length = state.current_index | 0;
        let rgba_colors_length = used_colors_length * 4 | 0;
        let current_mapped_colors_index = 0;

        // Create a shadow state for computation
        let shadow_state = {
            mapped_colors: new Map(),
            indexes_data_for_layers: Uint32Array.from(state.indexes_data_for_layers.slice(0, used_colors_length)),
            base_rgba_colors_for_blending: new Uint8ClampedArray(rgba_colors_length),
            rgba_colors_data_in_layers: new Array(all_layers_length),
            amount_data_in_layers: new Array(all_layers_length),
            hover_data_in_layers: new Array(all_layers_length),
        };

        // Slice and clean state
        for(let layer_n = 0; layer_n < all_layers_length; layer_n = layer_n + 1 | 0) {
            shadow_state.rgba_colors_data_in_layers[layer_n] = new Uint8ClampedArray(Uint32Array.from(Uint32Array.from(state.colors_data_in_layers[layer_n].slice(0, used_colors_length))).reverse().buffer).reverse();
            shadow_state.amount_data_in_layers[layer_n] = Uint16Array.from(state.amount_data_in_layers[layer_n].slice(0, used_colors_length));
            shadow_state.hover_data_in_layers[layer_n] = Uint8ClampedArray.from(state.hover_data_in_layers[layer_n].slice(0, used_colors_length));
        }

        let rgba = new Uint8ClampedArray(4);
        let color_bonus = 64;
        let is_hover = 0;
        let amount_array = Float32Array.of(0);

        // Compute for special colors like hover
        for(let layer_n = 0; layer_n < all_layers_length; layer_n = layer_n + 1 | 0) {

            for (let color_n = 0, n4 = 0; color_n < used_colors_length; color_n = color_n+1|0, n4 = n4+4|0) {

                is_hover = shadow_state.hover_data_in_layers[layer_n][color_n] | 0;

                if(is_hover > 0) {

                    // Get the color below current layer
                    if(color_n === 0) {
                        rgba.set(shadow_state.base_rgba_colors_for_blending.slice(n4, n4+4), 0);
                    }else {
                        rgba.set(shadow_state.rgba_colors_data_in_layers[layer_n-1].slice(n4, n4+4), 0);
                    }

                    if(Math.max.apply(rgba.slice(0, 3)) + Math.min.apply(rgba.slice(0, 3)) > 255) {

                        color_bonus = -64;
                    }else {

                        color_bonus = +64;
                    }

                    amount_array.set(Float32Array.of(shadow_state.amount_data_in_layers[layer_n][color_n] / 65535), 0);
                    shadow_state.rgba_colors_data_in_layers[layer_n].set(Uint8ClampedArray.of(
                        color_bonus + rgba[0] * amount_array[0],
                        color_bonus + rgba[1] * amount_array[0],
                        color_bonus + rgba[2] * amount_array[0],
                        255,
                    ), color_n*4);
                }
            }
        }

        // Blend all color and special ones only starting from the last opaque layer
        let start_layer_indexes = new Uint8ClampedArray(used_colors_length);
        let base = new Uint8ClampedArray(4);
        let added = new Uint8ClampedArray(4);
        let mix = new Uint8ClampedArray(4);
        let float_variables = new Float32Array(6); // ba3, ad3, mi3, ao, bo;

        let start_layer = -1;
        // Browse the full list of pixel colors encoded within 32 bytes of data
        for(let i1 = 0, i4 = 0; i1 < used_colors_length; i1 = i1+1|0, i4 = i4+4|0) {

            // Compute the layer to start the color addition
            start_layer = -1;
            for (let layer_n = all_layers_length - 1; layer_n >= 0; layer_n = layer_n - 1 | 0) {

                if (start_layer === -1) {

                    if (shadow_state.rgba_colors_data_in_layers[layer_n][i4 + 3] >= 255) {

                        start_layer = layer_n | 0;
                    }
                }
            }
            start_layer_indexes[i1] = start_layer | 0;
        }

        for(let i1 = 0, i4 = 0; i1 < used_colors_length; i1 = i1+1|0, i4 = i4+4|0) {

            start_layer = start_layer_indexes[i1] | 0;
            // Get the first base color to sum up with colors atop of it
            if(start_layer === -1) { base.set(shadow_state.base_rgba_colors_for_blending.slice(i4, i4+4), 0);
            }else { base.set(shadow_state.rgba_colors_data_in_layers[start_layer].slice(i4, i4+4), 0);}

            // Sum up all colors above
            for(let layer_n = start_layer+1|0; layer_n < all_layers_length; layer_n = layer_n + 1 | 0) {

                float_variables.fill(shadow_state.amount_data_in_layers[layer_n][i1] / 65535, 5, 6);
                added.set(shadow_state.rgba_colors_data_in_layers[layer_n].slice(i4, i4+4), 0);

                if(should_return_transparent && added[3] === 0 && float_variables[5] === 1) {

                    base.fill( 0);
                }else if(added[3] === 255 && float_variables[5] === 1) {

                    base.set(added, 0);
                }else {

                    float_variables.fill(base[3] / 255, 0, 1);
                    float_variables.fill(added[3] / 255 * float_variables[5], 1, 2);

                    mix.fill(0);
                    float_variables.fill(0, 2, 3);
                    if (float_variables[0] > 0 && float_variables[1] > 0) {
                        if(alpha_addition) { float_variables.fill(float_variables[0] + float_variables[1], 2, 3); } else { float_variables.fill(1 - (1 - float_variables[1]) * (1 - float_variables[0]), 2, 3);}
                        float_variables.fill(float_variables[1] / float_variables[2], 3, 4);
                        float_variables.fill(float_variables[0] * (1 - float_variables[1]) / float_variables[2], 4, 5);
                        mix.set(Uint8ClampedArray.of(
                            added[0] * float_variables[3] + base[0] * float_variables[4] | 0, // red
                            added[1] * float_variables[3] + base[1] * float_variables[4] | 0, // green
                            added[2] * float_variables[3] + base[2] * float_variables[4] | 0
                        ), 0);// blue
                    }else if(float_variables[1] > 0) {
                        float_variables.fill(added[3] / 255, 2, 3);
                        mix.set(added, 0);
                    }else {
                        float_variables.fill(base[3] / 255, 2, 3);
                        mix.set(base, 0);
                    }
                    if(alpha_addition) {
                        float_variables.fill(float_variables[2] / 2, 2, 3);
                    } mix.fill(float_variables[2] * 255, 3, 4);

                    base.set(mix, 0);
                }
            }
            shadow_state.base_rgba_colors_for_blending.set(base, i4);
        }

        // Map index and color as they are converted back in ui32
        new Uint32Array(new Uint8ClampedArray(shadow_state.base_rgba_colors_for_blending.buffer).reverse().buffer).reverse()
            .forEach(function(color, index){

                current_mapped_colors_index = state.indexes_data_for_layers[index | 0] | 0;
                shadow_state.mapped_colors.set(current_mapped_colors_index, color | 0);
        });

        return shadow_state.mapped_colors;
    },
    _build_state: function(layer_number, max_length) {
        "use strict";
        layer_number = layer_number | 0;
        max_length = max_length | 0;

        const state = {
            layer_number: layer_number | 0,
            max_length: max_length | 0,
            current_index: 0,
            indexes_data_for_layers: new Uint32Array(max_length),
            colors_data_in_layers: new Array(),
            amount_data_in_layers: new Array(),
            hover_data_in_layers: new Array(),
        };

        for(let i= 0; i < layer_number-1; i = i+1|0) {

            state.colors_data_in_layers.push(new Uint32Array(max_length));
            state.amount_data_in_layers.push(new Uint16Array(max_length));
            state.hover_data_in_layers.push(new Uint8ClampedArray(max_length));
        }

        return state;
    },
    _update_state: function(state, layer_number, max_length, _build_state) {
        "use strict";
        layer_number = layer_number | 0;
        max_length = max_length | 0;

        if(typeof state === "undefined") {

            return _build_state(layer_number, max_length);
        } if(state === null){

            return _build_state(layer_number, max_length);
        } else {

            let layer_number_difference = (layer_number - state.layer_number) | 0;
            let redefine_it_up_to_layer_n = state.layer_number | 0;

            // Add or remove layers
            if(layer_number_difference !== 0) {

                if(layer_number_difference > 0) { // Must add some layers

                    // Add layers within data array
                    for(let i = 1; i <= Math.abs(layer_number_difference); i = i + 1 | 0) {

                        state.colors_data_in_layers.push(new Uint32Array(max_length));
                        state.amount_data_in_layers.push(new Uint16Array(max_length));
                        state.hover_data_in_layers.push(new Uint8ClampedArray(max_length));
                    }

                }else if(layer_number_difference < 0){ // Must remove some layers

                    // Delete layers within data array
                    for(let i = 1; i <= Math.abs(layer_number_difference); i = i + 1 | 0) {

                        let index = state.layer_number-i|0;
                        delete state.colors_data_in_layers[index];
                        delete state.amount_data_in_layers[index];
                        delete state.hover_data_in_layers[index];
                    }
                }
                layer_number_difference = 0;
            }

            // Flooding or recreate existing layers
            if (redefine_it_up_to_layer_n > 0 || state.max_length !== max_length) {

                if (state.max_length !== max_length || typeof state.colors_data_in_layers[redefine_it_up_to_layer_n-1] === "undefined") {

                    state.indexes_data_for_layers = new Uint32Array(max_length);
                    for (let i = 0; i < redefine_it_up_to_layer_n; i = i + 1 | 0) {

                        state.colors_data_in_layers[i] = new Uint32Array(max_length);
                        state.amount_data_in_layers[i] = new Uint16Array(max_length);
                        state.hover_data_in_layers[i] = new Uint8ClampedArray(max_length);
                    }
                } else {

                    state.indexes_data_for_layers.fill(0);
                    for (let i = 0; i < redefine_it_up_to_layer_n; i = i + 1 | 0) {

                        state.colors_data_in_layers[i].fill(0);
                        state.amount_data_in_layers[i].fill(0);
                        state.hover_data_in_layers[i].fill(0);
                    }
                }
            }

            state.layer_number = layer_number | 0;
            state.max_length = max_length | 0;
            state.current_index = 0;
            return state;
        }
    },
    start: function(){
        "use strict";
        const blender = this._blend_state;
        const builder = this._build_state;
        const updater = this._update_state;

        let state = builder(1, 1);

        return {
            for: function(pixel_index) {
                pixel_index = pixel_index | 0;
                state.current_index = state.current_index + 1 | 0;
                state.indexes_data_for_layers[state.current_index-1] = pixel_index | 0;
            },
            stack: function(for_layer_index, ui32color, amount, is_hover) {

                let sci = state.current_index-1 | 0;
                state.colors_data_in_layers[for_layer_index].set(Uint32Array.of(ui32color), sci);
                state.amount_data_in_layers[for_layer_index].set(Uint16Array.of(amount * 65535), sci);
                state.hover_data_in_layers[for_layer_index].set(Uint8ClampedArray.of(is_hover*2), sci);
            },
            blend: function (should_return_transparent, alpha_addition ) {
                should_return_transparent = should_return_transparent | 0;
                alpha_addition = alpha_addition | 0;
                return blender(state, should_return_transparent, alpha_addition);
            },
            build: function (layer_number, max_length) {
                state = builder(layer_number, max_length);
            },
            update: function (layer_number, max_length) {
                state = updater(state, layer_number, max_length, builder);
            },
            clear: function () {
                state = updater(state, 1, 1, builder);
            }
        };
    }
};

module.exports = SuperBlend;