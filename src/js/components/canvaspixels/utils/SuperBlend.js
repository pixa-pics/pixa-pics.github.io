const SuperBlend = {
    _blend_state: function(shadow_state, state, should_return_transparent, alpha_addition) {
        "use strict";
        should_return_transparent = (should_return_transparent | 0) > 0;
        alpha_addition = (alpha_addition | 0) > 0;

        let all_layers_length = state.layer_number | 0;
        let used_colors_length = state.current_index | 0;
        let current_mapped_colors_index = 0;

        let rgba = new Uint8ClampedArray(4);
        let color_bonus = 64;

        let start_layer_indexes = new Array(used_colors_length);
        let base = new Uint8ClampedArray(4);
        let added = new Uint8ClampedArray(4);
        let mix = new Uint8ClampedArray(4);
        let float_variables = new DataView(new ArrayBuffer(28)); // ba3 -> 0, ad3 -> 8, mi3 -> 12, ao -> 16, bo -> 20, amount -> 24;

        let start_layer = -1;
        // Compute for special colors like hover
        for(let layer_n = 0; layer_n < all_layers_length; layer_n = layer_n + 1 | 0) {

            for (let color_n = 0, n4 = 0; color_n < used_colors_length; color_n = color_n+1|0, n4 = n4+4|0) {

                if(state.hover_data_in_layers[layer_n][color_n] !== 0) {

                    // Get the color below current layer
                    if(color_n === 0) {
                        rgba.set(shadow_state.base_rgba_colors_for_blending.slice(n4, n4+4), 0);
                    }else {
                        rgba.set(shadow_state.rgba_colors_data_in_layers[layer_n-1].slice(n4, n4+4), 0);
                    }

                    if(Math.max.apply(rgba.slice(0, 3)) + Math.min.apply(rgba.slice(0, 3)) > 255) {

                        color_bonus = -96;
                    }else {

                        color_bonus = +96;
                    }

                    float_variables.setFloat32(24, state.amount_data_in_layers[layer_n][color_n] / 255);

                    rgba.fill(color_bonus + rgba[0], 0, 1);
                    rgba.fill(color_bonus + rgba[1], 1, 2);
                    rgba.fill(color_bonus + rgba[2], 2, 3);
                    rgba.fill(128 + 128 * float_variables.getFloat32(24), 3, 4);

                    shadow_state.rgba_colors_data_in_layers[layer_n].set(rgba, color_n*4|0);
                }
            }
        }

        // Browse the full list of pixel colors encoded within 32 bytes of data
        for(let i1 = 0, i4 = 0; i1 < used_colors_length; i1 = i1+1|0, i4 = i4+4|0) {

            // Compute the layer to start the color addition
            start_layer = -1;
            for (let layer_n = all_layers_length - 1; layer_n >= 0; layer_n = layer_n - 1 | 0) {

                if (start_layer === -1) {

                    if (shadow_state.rgba_colors_data_in_layers[layer_n][i4 + 3] >= 255 && state.amount_data_in_layers[layer_n][i1] === 255) {

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

                float_variables.setFloat32(20, state.amount_data_in_layers[layer_n][i1] / 255);
                added.set(shadow_state.rgba_colors_data_in_layers[layer_n].slice(i4, i4+4|0), 0);

                if(should_return_transparent && added.at(3) === 0 && float_variables.getFloat32(20) === 1) {

                    base.fill( 0);
                }else if(added.at(3) === 255 && float_variables.getFloat32(20) === 1) {

                    base.set(added, 0);
                }else {

                    float_variables.setFloat32(0, base.at(3) / 255);
                    float_variables.setFloat32(4, added.at(3) / 255 * float_variables.getFloat32(20));

                    mix.fill(0);
                    float_variables.setFloat32(8, 0);
                    if (float_variables.getFloat32(0) > 0 && float_variables.getFloat32(4) > 0) {
                        if(alpha_addition) { float_variables.setFloat32(8, float_variables.getFloat32(0) + float_variables.getFloat32(4)); } else { float_variables.setFloat32(8, 1 - (1 - float_variables.getFloat32(4)) * (1 - float_variables.getFloat32(0)));}
                        float_variables.setFloat32(12, float_variables.getFloat32(4) / float_variables.getFloat32(8));
                        float_variables.setFloat32(16, float_variables.getFloat32(0) * (1 - float_variables.getFloat32(4)) / float_variables.getFloat32(8));

                        mix.set(Uint8ClampedArray.of(
                            added.at(0) * float_variables.getFloat32(12) + base.at(0) * float_variables.getFloat32(16) | 0, // red
                            added.at(1) * float_variables.getFloat32(12) + base.at(1) * float_variables.getFloat32(16) | 0, // green
                            added.at(2) * float_variables.getFloat32(12) + base.at(2) * float_variables.getFloat32(16) | 0
                        ), 0);// blue
                    }else if(float_variables.getFloat32(4) > 0) {
                        float_variables.setFloat32(8, added.at(3) / 255);
                        mix.set(added, 0);
                    }else {
                        float_variables.setFloat32(8, base.at(3) / 255);
                        mix.set(base, 0);
                    }
                    if(alpha_addition) {
                        float_variables.setFloat32(8, float_variables.getFloat32(8) / 2);
                    }

                    mix.fill(float_variables.getFloat32(8) * 255 | 0, 3, 4);
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

        for(let i= 0; i < layer_number; i = i+1|0) {

            state.colors_data_in_layers.push(new Uint32Array(max_length));
            state.amount_data_in_layers.push(new Uint16Array(max_length));
            state.hover_data_in_layers.push(new Uint8ClampedArray(max_length));
        }

        return state;
    },
    _build_shadow_state: function (state, old_shadow_state) {

        if(typeof old_shadow_state !== "undefined") {

            delete old_shadow_state.mapped_colors;
            delete old_shadow_state.base_rgba_colors_for_blending;
            for(let i = 0; i < old_shadow_state.rgba_colors_data_in_layers.length; i = i+1 | 0) {
                delete old_shadow_state.rgba_colors_data_in_layers[i];
            }
            delete old_shadow_state.rgba_colors_data_in_layers;
        }

        // Create a shadow state for computation
        let shadow_state = {
            mapped_colors: new Map(),
            base_rgba_colors_for_blending: new Uint8ClampedArray(0),
            rgba_colors_data_in_layers: new Array(state.layer_number)
        };

        // Slice uint32 colors and give them as uint8
        for(let layer_n = 0; layer_n < state.layer_number; layer_n = layer_n + 1 | 0) {
            shadow_state.rgba_colors_data_in_layers[layer_n] = new Uint8ClampedArray(0);
        }

        return shadow_state;
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
    _update_shadow_state: function (shadow_state, state) {

        // Create a shadow state for computation
        shadow_state.mapped_colors.clear();
        delete shadow_state.base_rgba_colors_for_blending;
        shadow_state.base_rgba_colors_for_blending = new Uint8ClampedArray(state.current_index * 4);

        // Slice uint32 colors and give them as uint8
        for(let layer_n = 0; layer_n < state.layer_number; layer_n = layer_n + 1 | 0) {
            delete shadow_state.rgba_colors_data_in_layers[layer_n];
            shadow_state.rgba_colors_data_in_layers[layer_n] = new Uint8ClampedArray(Uint32Array.from(Uint32Array.from(state.colors_data_in_layers[layer_n].slice(0, state.current_index))).reverse().buffer).reverse();
        }

        return shadow_state;
    },
    new: function(){
        "use strict";
        const blender = this._blend_state;
        const builder = this._build_state;
        const shadow_builder = this._build_shadow_state;
        const updater = this._update_state;
        const shadow_updater = this._update_shadow_state;

        let state = builder(1, 1);
        let shadow_state = shadow_builder(state);

        return {
            for: function(pixel_index) {

                state.current_index = state.current_index + 1 | 0;
                state.indexes_data_for_layers[state.current_index-1] = pixel_index | 0;
            },
            stack: function(for_layer_index, ui32color, amount, is_hover) {

                for_layer_index = for_layer_index | 0;
                state.colors_data_in_layers[for_layer_index].fill(ui32color | 0, state.current_index-1 | 0, state.current_index | 0);
                state.amount_data_in_layers[for_layer_index].fill(amount * 255 | 0, state.current_index-1 | 0, state.current_index | 0);
                state.hover_data_in_layers[for_layer_index].fill(is_hover | 0, state.current_index-1 | 0, state.current_index | 0);
            },
            blend: function (should_return_transparent, alpha_addition ) {
                should_return_transparent = should_return_transparent | 0;
                alpha_addition = alpha_addition | 0;
                shadow_state = shadow_updater(shadow_state, state);
                return blender(shadow_state, state, should_return_transparent, alpha_addition);
            },
            build: function (layer_number, max_length) {
                state = builder(layer_number, max_length);
                shadow_state = shadow_builder(state, shadow_state);
            },
            update: function (layer_number, max_length) {

                const changed_layer_number = Boolean(state.layer_number !== layer_number);
                state = updater(state, layer_number, max_length, builder);
                if(changed_layer_number) { shadow_state = shadow_builder(state, shadow_state); }
            },
            clear: function () {
                state = updater(state, 1, 1, builder);
            }
        };
    }
};

module.exports = SuperBlend;