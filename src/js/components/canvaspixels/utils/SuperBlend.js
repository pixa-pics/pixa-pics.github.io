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
            colors_data_in_layers: new Array(),
            colors_data_in_layers_views: new Array(),
            amount_data_in_layers_buffers: new Array(),
            amount_data_in_layers: new Array(),
            amount_data_in_layers_views: new Array(),
            hover_data_in_layers_buffers: new Array(),
            hover_data_in_layers: new Array(),
            hover_data_in_layers_views: new Array(),
        };

        for(let i= 0; i < layer_number; i = i+1|0) {

            let colors_data_in_layers_buffers = new ArrayBuffer(max_length*4);
            state.colors_data_in_layers.push(new Uint32Array(colors_data_in_layers_buffers));
            state.colors_data_in_layers_views.push(new DataView(colors_data_in_layers_buffers));
            state.colors_data_in_layers_buffers.push(colors_data_in_layers_buffers);

            let amount_data_in_layers_buffers = new ArrayBuffer(max_length);
            state.amount_data_in_layers.push(new Uint8ClampedArray(amount_data_in_layers_buffers));
            state.amount_data_in_layers_views.push(new DataView(amount_data_in_layers_buffers));
            state.amount_data_in_layers_buffers.push(amount_data_in_layers_buffers);

            let hover_data_in_layers_buffers = new ArrayBuffer(max_length);
            state.hover_data_in_layers.push(new Uint8ClampedArray(hover_data_in_layers_buffers));
            state.hover_data_in_layers_views.push(new DataView(hover_data_in_layers_buffers));
            state.hover_data_in_layers_buffers.push(hover_data_in_layers_buffers);
        }

        return Object.assign({}, state);
    },
    _build_shadow_state (state, old_shadow_state) {
        "use strict";
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
    _update_state(state, layer_number, max_length, _build_state) {
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

                        let colors_data_in_layers_buffers = new ArrayBuffer(max_length*4);
                        state.colors_data_in_layers.push(new Uint32Array(colors_data_in_layers_buffers));
                        state.colors_data_in_layers_views.push(new DataView(colors_data_in_layers_buffers));
                        state.colors_data_in_layers_buffers.push(colors_data_in_layers_buffers);

                        let amount_data_in_layers_buffers = new ArrayBuffer(max_length);
                        state.amount_data_in_layers.push(new Uint8ClampedArray(amount_data_in_layers_buffers));
                        state.amount_data_in_layers_views.push(new DataView(amount_data_in_layers_buffers));
                        state.amount_data_in_layers_buffers.push(amount_data_in_layers_buffers);

                        let hover_data_in_layers_buffers = new ArrayBuffer(max_length);
                        state.hover_data_in_layers.push(new Uint8ClampedArray(hover_data_in_layers_buffers));
                        state.hover_data_in_layers_views.push(new DataView(hover_data_in_layers_buffers));
                        state.hover_data_in_layers_buffers.push(hover_data_in_layers_buffers);
                    }

                }else if(layer_number_difference < 0){ // Must remove some layers

                    // Delete layers within data array
                    for(let i = 1; i <= Math.abs(layer_number_difference); i = i + 1 | 0) {

                        let index = state.layer_number-i|0;
                        delete state.colors_data_in_layers[index];
                        delete state.colors_data_in_layers_views[index];
                        delete state.colors_data_in_layers_buffers[index];
                        delete state.amount_data_in_layers[index];
                        delete state.amount_data_in_layers_views[index];
                        delete state.amount_data_in_layers_buffers[index];
                        delete state.hover_data_in_layers[index];
                        delete state.hover_data_in_layers_views[index];
                        delete state.hover_data_in_layers_buffers[index];
                    }
                }
                layer_number_difference = 0;
            }

            // Flooding or recreate existing layers
            if (redefine_it_up_to_layer_n > 0 || state.max_length !== max_length) {

                if (state.max_length !== max_length || typeof state.colors_data_in_layers[redefine_it_up_to_layer_n-1] === "undefined") {

                    state.indexes_data_for_layers = new Uint32Array(max_length);
                    for (let i = 0; i < redefine_it_up_to_layer_n; i = i + 1 | 0) {

                        state.colors_data_in_layers_buffers[i] = new ArrayBuffer(max_length*4);
                        state.colors_data_in_layers[i] = new Uint32Array(state.colors_data_in_layers_buffers[i]);
                        state.colors_data_in_layers_views[i] = new DataView(state.colors_data_in_layers_buffers[i]);
                        state.amount_data_in_layers_buffers[i] = new ArrayBuffer(max_length);
                        state.amount_data_in_layers[i] = new Uint8ClampedArray(state.amount_data_in_layers_buffers[i]);
                        state.amount_data_in_layers_views[i] = new DataView(state.amount_data_in_layers_buffers[i]);
                        state.hover_data_in_layers_buffers[i] = new ArrayBuffer(max_length);
                        state.hover_data_in_layers[i] = new Uint8ClampedArray(state.hover_data_in_layers_buffers[i]);
                        state.hover_data_in_layers_views[i] = new DataView(state.hover_data_in_layers_buffers[i]);
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
            return Object.assign({}, state);
        }
    },
    _update_shadow_state (shadow_state, state) {
        "use strict";
        // Create a shadow state for computation
        shadow_state.mapped_colors.clear();
        shadow_state.base_rgba_colors_for_blending = new Uint8ClampedArray(state.current_index * 4);

        // Slice uint32 colors and give them as uint8
        for(let layer_n = 0; layer_n < state.layer_number; layer_n = (layer_n + 1 | 0) >>> 0) {
            shadow_state.rgba_colors_data_in_layers[layer_n] = new Uint8ClampedArray(state.colors_data_in_layers[layer_n].slice(0, state.current_index).reverse().buffer).reverse();
        }

        return shadow_state;
    },
    new(lay_n, pxl_len){
        "use strict";
        const builder = this._build_state;
        const shadow_builder = this._build_shadow_state;
        const updater = this._update_state;
        const shadow_updater = this._update_shadow_state;

        let state = builder(lay_n || 1, pxl_len || 1);
        let shadow_state = shadow_builder(state);

        let rgba_buffer = new ArrayBuffer(4);
        let rgba = new Uint8ClampedArray(rgba_buffer);
        let color_bonus = 64;
        let base_buffer = new ArrayBuffer(4);
        let base = new Uint8ClampedArray(base_buffer);
        let added_buffer = new ArrayBuffer(4);
        let added = new Uint8ClampedArray(added_buffer);
        let mix_buffer = new ArrayBuffer(4);
        let mix = new Uint8ClampedArray(mix_buffer);
        let float_variables = new DataView(new ArrayBuffer(6));

        return {
            for: function(pixel_index) {
                "use strict";
                state.current_index = state.current_index + 1 | 0;
                state.indexes_data_for_layers[state.current_index-1] = pixel_index | 0;
            },
            stack: function(for_layer_index, ui32color, amount, is_hover) {
                "use strict";
                for_layer_index = (for_layer_index | 0) >>> 0;
                state.colors_data_in_layers_views[for_layer_index].setUint32(((state.current_index-1 | 0) * 4 | 0) >>> 0, (ui32color | 0) >>> 0, true);
                state.amount_data_in_layers_views[for_layer_index].setUint8((state.current_index-1 | 0) >>> 0,(amount | 0) >>> 0);
                state.hover_data_in_layers_views[for_layer_index].setUint8((state.current_index-1 | 0) >>> 0, is_hover ? 1: 0);
            },
            blend: function(should_return_transparent, alpha_addition ) {
                "use strict";
                shadow_state = shadow_updater(shadow_state, state);
                should_return_transparent = should_return_transparent | 0;
                alpha_addition = alpha_addition | 0;

                let all_layers_length = state.layer_number | 0;
                let used_colors_length = state.current_index | 0;

                let start_layer_indexes_buffer = new ArrayBuffer(used_colors_length);
                let start_layer_indexes = new Uint8ClampedArray(start_layer_indexes_buffer);

                let {base_rgba_colors_for_blending, rgba_colors_data_in_layers, mapped_colors} = shadow_state;
                let {hover_data_in_layers, amount_data_in_layers, indexes_data_for_layers} = state;

                let start_layer = -1;

                // Browse the full list of pixel colors encoded within 32 bytes of data
                for(let i1 = 0, i4 = 0; i1 < used_colors_length; i1 = (i1+1 | 0) >>> 0, i4 = (i4+4|0) >>> 0) {

                    // Compute the layer to start the color addition
                    start_layer = -1;
                    for (let layer_n = all_layers_length - 1; layer_n >= 0; layer_n = layer_n - 1 | 0) {

                        if (start_layer === -1) {

                            if (rgba_colors_data_in_layers[layer_n][i4 + 3] === 255 && amount_data_in_layers[layer_n][i1] === 255) {

                                start_layer = (layer_n | 0) >>> 0;
                            }
                        }
                    }
                    start_layer_indexes.fill((start_layer+1 | 0) >>> 0, i1, i1+1);
                }

                for(let i1 = 0, i4 = 0; i1 < used_colors_length; i1 = (i1+1 | 0) >>> 0, i4 = (i4+4|0) >>> 0) {

                    start_layer = (start_layer_indexes.at(i1) | 0) >>> 0;
                    // Get the first base color to sum up with colors atop of it
                    if(start_layer-1 < 0) { base.set(base_rgba_colors_for_blending.subarray(i4, (i4+4|0)>>>0), 0);
                    }else {base.set(rgba_colors_data_in_layers[start_layer-1].subarray(i4, (i4+4|0)>>>0), 0);}

                    // Sum up all colors above
                    for(let layer_n = start_layer|0; layer_n < all_layers_length; layer_n = (layer_n + 1 | 0) >>> 0) {

                        // Compute hover if hover color
                        if(hover_data_in_layers[layer_n][i1] !== 0) {

                            // Get the color below current layer
                            rgba.set(base, 0);

                            if((Math.max.apply(rgba.subarray(0, 3)) + Math.min.apply(rgba.subarray(0, 3) | 0) >>> 0) > 255) {

                                color_bonus = -96;
                            }else {

                                color_bonus = +96;
                            }

                            rgba.fill((color_bonus + rgba[0] | 0) >>> 0, 0, 1);
                            rgba.fill((color_bonus + rgba[1] | 0) >>> 0, 1, 2);
                            rgba.fill((color_bonus + rgba[2] | 0) >>> 0, 2, 3);
                            rgba.fill(128 + 128 * amount_data_in_layers[layer_n][i1]/255, 3, 4);

                            rgba_colors_data_in_layers[layer_n].set(rgba, i4);
                        }

                        float_variables.setUint8(5, (amount_data_in_layers[layer_n][i1] | 0) >>> 0);
                        added.set(rgba_colors_data_in_layers[layer_n].subarray(i4, (i4+4|0)>>>0), 0);

                        if(should_return_transparent && added.at(3) === 0 && float_variables.getUint8(5) === 255) {

                            base.fill( 0);
                        }else if(added.at(3) === 255 && float_variables.getUint8(5) === 255) {

                            base.set(added, 0);
                        }else {

                            float_variables.setUint8(0, (base.at(3) | 0) >>> 0);
                            float_variables.setUint8(1, ((added.at(3) * float_variables.getUint8(5)/255) | 0) >>> 0);

                            mix.fill(0);
                            float_variables.setUint8(2, 0);

                            if (float_variables.getUint8(0) > 0 && float_variables.getUint8(1) > 0) {

                                if(alpha_addition) { float_variables.setUint8(2, ((float_variables.getUint8(0) + float_variables.getUint8(1))/2 | 0) >>> 0); } else { float_variables.setUint8(2, (255 - (1 - float_variables.getUint8(1)/255) * (1 - float_variables.getUint8(0)/255) * 255 | 0) >>> 0);}
                                float_variables.setUint8(3, (float_variables.getUint8(1) / float_variables.getUint8(2) * 255 | 0) >>> 0);
                                float_variables.setUint8(4, (float_variables.getUint8(0) * (1 - float_variables.getUint8(1)/255) / (float_variables.getUint8(2)/255) | 0) >>> 0);

                                mix.fill((added.at(0) * float_variables.getUint8(3)/255 + base.at(0) * float_variables.getUint8(4)/255 | 0) >>> 0, 0, 1);
                                mix.fill((added.at(1) * float_variables.getUint8(3)/255 + base.at(1) * float_variables.getUint8(4)/255 | 0) >>> 0, 1, 2);
                                mix.fill((added.at(2) * float_variables.getUint8(3)/255 + base.at(2) * float_variables.getUint8(4)/255 | 0) >>> 0, 2, 3);

                            }else if(float_variables.getUint8(1) > 0) {

                                float_variables.setUint8(2, (added.at(3) | 0) >>> 0);
                                mix.set(added, 0);
                            }else {

                                float_variables.setUint8(2, (base.at(3) | 0) >>> 0);
                                mix.set(base, 0);
                            }

                            mix.fill((float_variables.getUint8(2) | 0) >>> 0, 3, 4);
                            base.set(mix, 0);
                        }
                    }
                    base_rgba_colors_for_blending.set(base, i4);
                }

                // Map index and color as they are converted back in ui32
                let colors = new Uint32Array(new Uint8ClampedArray(base_rgba_colors_for_blending.buffer).reverse().buffer).reverse();
                let colors_length = (colors.length | 0) >>> 0;

                for(let i = 0; i < colors_length; i = (i+1 | 0) >>> 0) {
                    mapped_colors.set((indexes_data_for_layers[i] | 0) >>> 0, (colors[i] | 0) >>> 0);
                }

                return mapped_colors;
            },
            build: function(layer_number, max_length) {
                "use strict";
                layer_number = (layer_number | 0) >>> 0;
                max_length = (max_length | 0) >>> 0;

                state = builder(layer_number, max_length);
                shadow_state = shadow_builder(state, shadow_state);
            },
            update: function(layer_number, max_length) {
                "use strict";
                layer_number = (layer_number | 0) >>> 0;
                max_length = (max_length | 0) >>> 0;
                const changed_layer_number = Boolean(state.layer_number !== layer_number);
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