const SuperState = {
    _build_state: function(props) {

        return {
            _id: String(parseInt(1000 * Math.random() * 1000 ).toString(16)),
            className: props.className || null,
            perspective: props.perspective || 0,
            animation: props.animation || true,
            animation_duration: props.animation_duration || 60,
            move_using_full_container: props.move_using_full_container,
            dont_compute_base64_original_image: props.dont_compute_base64_original_image || false,
            dont_change_img_size_onload: props.dont_change_img_size_onload || false,
            dont_show_canvas_until_img_set: props.dont_show_canvas_until_img_set || false,
            show_image_only_before_canvas_set: props.show_image_only_before_canvas_set || false,
            dont_show_canvas: props.dont_show_canvas || false,
            but_show_canvas_once: props.but_show_canvas_once || false,
            has_shown_canvas_once: false,
            tool: props.tool || "PENCIL",
            select_mode: props.select_mode || "REPLACE",
            pencil_mirror_mode: props.pencil_mirror_mode || "NONE",
            hue: props.hue || 0,
            pxl_width: 32,
            pxl_height: 32,
            pxl_current_color: props.pxl_current_color || "#00000000",
            pxl_current_opacity: props.pxl_current_opacity || 1,
            bucket_threshold: props.bucket_threshold || 0,
            color_loss: props.color_loss || 0.25,
            default_size: props.default_size || 96,
            ideal_size: props.ideal_size || props.default_size || 96,
            max_size: props.max_size || props.default_size * 2 || 192,
            px_per_px: props.px_per_px || 1,
            fast_drawing: props.fast_drawing || false,
            canvas_border_radius: props.canvas_border_radius || 0,
            canvas_wrapper_background_color: props.canvas_wrapper_background_color || "#020529",
            canvas_wrapper_border_radius: props.canvas_wrapper_border_radius || 4,
            show_original_image_in_background: typeof props.show_original_image_in_background === "undefined" ? true: props.show_original_image_in_background,
            show_transparent_image_in_background: typeof props.show_transparent_image_in_background === "undefined" ? true: props.show_transparent_image_in_background,
            hide_canvas_content: props.hide_canvas_content || false,
            _did_hide_canvas_content: false,
            mine_player_direction: props.mine_player_direction || "UP",
            _mine_index: null,
            _previous_mine_player_index: null,
            _mine_player_index: null,
            _pencil_mirror_index: -1,
            _previous_pencil_mirror_axes_indexes: new Set(),
            _previous_pencil_mirror_axes_hover_indexes: new Set(),
            _is_there_new_dimension: true,
            _base64_original_images: [],
            _original_image_index: -1,
            _old_layers: [{id: Date.now(), name: "Layer 0", hidden: false, opacity: 1}],
            _layers: [{id: Date.now(), name: "Layer 0", hidden: false, opacity: 1}],
            _layers_defined_at: 0,
            _layer_index: 0,
            _old_full_pxls: new Array(),
            _s_pxl_colors: [Uint32Array.of(0)],
            _s_pxls: [new Array((props.pxl_width || 32) * (props.pxl_height || 32)).fill(0)],
            _json_state_history: {history_position: 0, state_history: []},
            _saving_json_state_history_running: false,
            _old_pxl_width: 0,
            _old_pxl_height: 0,
            _pxls_hovered: -1,
            _old_pxls_hovered: -1,
            _canvas_container: null,
            _canvas_wrapper: null,
            _canvas_wrapper_overflow: null,
            _state_history_length: 61 - parseInt(0.1 * parseInt(parseInt(props.pxl_width || 32) + parseInt(props.pxl_height || 32)) / 2),
            _last_action_timestamp: Date.now(),
            _last_paint_timestamp: Date.now(),
            _lazy_lazy_compute_time_ms: 10 * 1000,
            _undo_buffer_time_ms: parseInt(parseInt(props.pxl_width || 32) + parseInt(props.pxl_height || 32) + 1000),
            _mouse_inside: false,
            _paint_hover_old_pxls_snapshot: new Array((props.pxl_width || 32) * (props.pxl_height || 32)).fill(0),
            _select_hover_old_pxls_snapshot: new Array(),
            _paint_or_select_hover_actions_latest_index: -1,
            _paint_or_select_hover_pxl_indexes: new Set(),
            _paint_or_select_hover_pxl_indexes_exception: new Set(),
            _shape_index_a: -1,
            _select_shape_index_a: -1,
            _shape_index_b: -1,
            _select_shape_index_b: -1,
           _pxl_indexes_of_old_shape: new Set(),
           _pxl_indexes_of_selection: new Set(),
            _previous_pxl_indexes_of_selection: new Set(),
           _pxl_indexes_of_selection_drawn: new Set(),
            _imported_image_previous_start_x: 0,
            _imported_image_previous_start_y: 0,
            _imported_image_start_x: 0,
            _imported_image_start_y: 0,
            _imported_image_pxls: [],
            _imported_image_width: 0,
            _imported_image_height: 0,
            _imported_image_scale_delta_x: 0,
            _imported_image_scale_delta_y: 0,
            _imported_image_previous_scale_delta_x: 0,
            _imported_image_previous_scale_delta_y: 0,
            _is_on_resize_element: false,
            _imported_image_pxl_colors: [],
            _is_image_import_mode: false,
            _previous_imported_image_pxls_positioned_keyset: new Set(),
            _previous_image_imported_resizer_index: -1,
            _selection_pair_highlight: true,
            _old_selection_pair_highlight: true,
            _image_move_from: [-1, -1],
            _updated_at: Date.now(),
            _notified_position_at: 0,
            _force_updated_timestamp: 0,
            _loading_base64_img: "",
            _loading_base64_img_changed: 0,
            _intervals: [],
            _kb: 0,
            export_state_every_ms: props.export_state_every_ms || 60 * 1000,
            _last_filters_hash: "",
            _saving_json_state_history_ran_timestamp: 0,
        };
    },
    _blend_rgba_colors: function(all_added_in_layers, amount, should_return_transparent = 0, alpha_addition = 0) {

        should_return_transparent = should_return_transparent | 0 ;
        alpha_addition = alpha_addition | 0;
        let used_colors_length = all_added_in_layers[0].length / 4 | 0;
        let all_layers_length = all_added_in_layers.length | 0;
        let all_base = new Uint8ClampedArray(all_added_in_layers[0].length);

        // Blend all color and special ones only starting from the last opaque layer
        let base = new Uint8ClampedArray(4);
        let added = new Uint8ClampedArray(4);
        let mix = new Uint8ClampedArray(4);
        let float_variables = new Float32Array(6); // ba3, ad3, mi3, ao, bo;
        float_variables.fill((amount * 65535 | 0) / 65535, 5, 6);
        let start_layer = 0;

        for(let i1 = 0, i4 = 0; i1 < used_colors_length; i1 = i1+1|0, i4 = i4+4|0) {

            start_layer = 0;
            base.set(all_added_in_layers[0].slice(i4, i4+4), 0);

            // Sum up all colors above
            for(let layer_n = 1; layer_n < all_layers_length; layer_n = layer_n + 1 | 0) {

                added.set(all_added_in_layers[layer_n].slice(i4, i4+4), 0);

                if(should_return_transparent > 0 && added[3] === 0 && float_variables[5] === 1) {

                    base.fill( 0);
                }else if(added[3] === 255 && float_variables[5] === 1) {

                    base.set(added, 0);
                }else {

                    float_variables.fill(base[3] / 255, 0, 1);
                    float_variables.fill(added[3] / 255 * float_variables[5], 1, 2);

                    mix.fill(0);
                    float_variables.fill(0, 2, 3);
                    if (float_variables[0] > 0 && float_variables[1] > 0) {
                        if(alpha_addition > 0) { float_variables.fill(float_variables[0] + float_variables[1], 2, 3); } else { float_variables.fill(1 - (1 - float_variables[1]) * (1 - float_variables[0]), 2, 3);}
                        float_variables.fill(float_variables[1] / float_variables[2], 3, 4);
                        float_variables.fill(float_variables[0] * (1 - float_variables[1]) / float_variables[2], 4, 5);
                        mix.set(Uint8ClampedArray.of(
                            added[0] * float_variables[3] + base[0] * float_variables[4], // red
                            added[1] * float_variables[3] + base[1] * float_variables[4], // green
                            added[2] * float_variables[3] + base[2] * float_variables[4]
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
            all_base.set(base, i4);
        }

        return all_base;
    },
    from: function(props){
        "use strict";
        let _state = this._build_state(props);
        let _pxl_indexes = new Set();
        let blend_rgba_colors = this._blend_rgba_colors;

        return {
            paint_shape: function(pxl_indexes, color, opacity, s = {}, callback_function = function(){}) {

                let state = this.get_state();
                let pxl_colors = Uint32Array.from(state._s_pxl_colors[state._layer_index]);
                let pxls = Array.from(state._s_pxls[state._layer_index]);

                let indexes = Array.from(pxl_indexes);
                let colors = new Array(indexes.length);
                for(let i = 0; i < indexes.length; i = i + 1 | 0) {

                    colors[i] = pxl_colors[pxls[indexes[i]]];
                }

                let new_ui32_colors = new Uint32Array(
                   blend_rgba_colors(
                        Array.of(
                            new Uint8ClampedArray(Uint32Array.from(colors).reverse().buffer).reverse(),
                            new Uint8ClampedArray(new Uint32Array(indexes.length).fill(color).reverse().buffer).reverse(),
                        ),
                       opacity, false, false
                    ).reverse().buffer
                ).reverse();

                pxl_colors = Array.from(pxl_colors);
                Array.from(new Set(new_ui32_colors)).forEach(function(c){
                    if(!pxl_colors.includes(c)){

                        pxl_colors.push(c);
                    }
                });

                for(let i = 0; i < indexes.length; i = i + 1 | 0) {
                    pxls[indexes[i]] = pxl_colors.indexOf(new_ui32_colors[i]) | 0;
                }

                let st = Object.assign(s, {
                    _s_pxl_colors: _state._s_pxl_colors,
                    _s_pxls: _state._s_pxls,
                });

                st._s_pxl_colors[state._layer_index] = Uint32Array.from(pxl_colors);
                st._s_pxls[state._layer_index] = Array.from(pxls);

                this.set_state(st, callback_function);
            },
            set_state: function(new_props, callback = function(){}) {

                Object.entries(new_props).forEach(function(entry){ 
                    
                    delete _state[entry[0]];
                    _state[entry[0]] = entry[1];
                });
                
                callback();
            },
            get_state: function() {

                return _state;
            },
            get_indexes: function() {

                return new Set(_pxl_indexes.keys());
            },
            get_imported_image_data: function() {

                let state = this.get_state();
                let _new_canvas_context_2d = this.new_canvas_context_2d;
                let _get_pixels_palette_and_list_from_image_data = this.get_pixels_palette_and_list_from_image_data;

                function to_hex_from_uint32(uint32){
                    return "#".concat("00000000".concat(uint32.toString(16)).slice(-8));
                }

                if(state._imported_image_pxls.length) {

                    let canvas_ctx = _new_canvas_context_2d(state._imported_image_width, state._imported_image_height);


                    state._imported_image_pxls.forEach((pxl, index) => {

                        const pos_x = index % state._imported_image_width;
                        const pos_y = (index - pos_x) / state._imported_image_width;

                        const color = to_hex_from_uint32(state._imported_image_pxl_colors[pxl]);
                        canvas_ctx.fillStyle = color;
                        canvas_ctx.fillRect(pos_x, pos_y, 1, 1);
                    });

                    const scaled_width = state._imported_image_width + state._imported_image_scale_delta_x;
                    const scaled_height = state._imported_image_height + state._imported_image_scale_delta_y;

                    let canvas_resized_ctx = _new_canvas_context_2d(scaled_width, scaled_height);
                    canvas_resized_ctx.drawImage(canvas_ctx.canvas, 0, 0, state._imported_image_width, state._imported_image_height, 0, 0, scaled_width, scaled_height);
                    canvas_ctx = null;
                    let resized_image_data = canvas_resized_ctx.getImageData(0, 0, scaled_width, scaled_height);
                    const {new_pxls, new_pxl_colors} = _get_pixels_palette_and_list_from_image_data(resized_image_data);
                    resized_image_data = null;
                    canvas_resized_ctx = null;
                    state._imported_image_width = scaled_width;
                    state._imported_image_height = scaled_height;


                    let pxls_positioned = [];
                    let image_imported_resizer_index = -1;
                    if (new_pxls.length > 0) {

                        image_imported_resizer_index = parseInt(state._imported_image_start_x + scaled_width) + parseInt(state._imported_image_start_y + scaled_height) * state.pxl_width;
                        new_pxls.forEach((pxl, index) => {

                            const pos_x = index % scaled_width;
                            const pos_y = (index - pos_x) / scaled_width;
                            const current_pos_x_positioned = pos_x + state._imported_image_start_x;
                            const current_pos_y_positioned = pos_y + state._imported_image_start_y;
                            const imported_image_pxl_positioned_index = current_pos_y_positioned * state.pxl_width + current_pos_x_positioned;

                            if (current_pos_x_positioned >= 0 && current_pos_x_positioned < state.pxl_width && current_pos_y_positioned >= 0 && current_pos_y_positioned < state.pxl_height) {

                                pxls_positioned[imported_image_pxl_positioned_index] = pxl;
                            }

                        });
                    }

                    const imported_image_pxls_positioned_keyset = new Set(Object.entries(pxls_positioned).map(function(entry){

                        return entry[0];
                    }));

                    return [
                        pxls_positioned,
                        new_pxl_colors,
                        image_imported_resizer_index,
                        imported_image_pxls_positioned_keyset,
                    ];
                }else {

                    return [
                        new Array(0),
                        new Uint32Array(0),
                        -1,
                        new Set(),
                    ];
                }
            },
            get_pixels_palette_and_list_from_image_data: function (image_data) {

                function to_uint32_from_rgba(rgba) {
                    return new Uint32Array(rgba.reverse().buffer)[0];
                }

                let new_pxl_colors = [];
                let new_pxl_colors_set = new Set();
                let new_pxls = new Uint32Array(image_data.width * image_data.height).fill(0);

                for (let i = 0; i < image_data.data.length; i += 4) {

                    const color_uint32 = to_uint32_from_rgba(Uint8ClampedArray.of(image_data.data[i+0], image_data.data[i+1], image_data.data[i+2], image_data.data[i+3]));

                    const deja_vu_color_hex = new_pxl_colors_set.has(color_uint32);
                    let color_uint32_index = deja_vu_color_hex ? new_pxl_colors.indexOf(color_uint32): -1;

                    if (color_uint32_index === -1) {

                        color_uint32_index = new_pxl_colors.push(color_uint32)-1;
                        new_pxl_colors_set.add(color_uint32);
                    }
                    new_pxls[i / 4] = color_uint32_index;
                }
                return {
                    ratio_pixel_per_color: new_pxls.length / new_pxl_colors.length,
                    new_pxl_colors: Uint32Array.from(new_pxl_colors),
                    new_pxls: Array.from(new_pxls),
                };
            },
            new_canvas_context_2d: function(width, height) {

                let canvas;
                try {

                    if (typeof OffscreenCanvas === "undefined") {
                        throw new Error("Impossible to create OffscreenCanvas in this web environment.");
                    }

                    canvas = new OffscreenCanvas(width, height);
                }catch(e) {

                    canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                }

                let context = canvas.getContext('2d');
                context.mozImageSmoothingEnabled = false;
                context.webkitImageSmoothingEnabled = false;
                context.msImageSmoothingEnabled = false;
                context.imageSmoothingEnabled = false;


                return context;
            },
            create_shape: function() {

                let _get_indexes = this.get_indexes;
                let _get_state = this.get_state;
                let _new_canvas_context_2d = this.new_canvas_context_2d;

                function get_opposite_coordinates(width, from, to) {

                    width = width | 0;
                    from = from | 0;
                    to = to | 0;

                    let primary = {x:0, y:0};
                    let secondary = {x:0, y:0};

                    secondary.x = to % width | 0;
                    primary.x = from % width | 0;
                    primary.y = (from -  primary.x) / width | 0;
                    secondary.y = (to - secondary.y) / width | 0;
    
                    return {primary, secondary};
                }
    

    
                function get_shadow_indexes_from_canvas_context(context, shadow_indexes) {
    
                    const ui32_colors = new Uint32Array(context.getImageData(0, 0, context.canvas.width, context.canvas.height).data.reverse().buffer).reverse();
                    const ui32_colors_length = ui32_colors.length | 0;
                    for(let i = 0; i < ui32_colors_length; i = i + 1 | 0) {
    
                        if(ui32_colors[i] !== 0) { shadow_indexes.add(i);}
                    }
                }

                // TO DO --> GET PREVIOUS COMMIT OR FINISH THIS
                return {
                    from_line: function(from, to) {

                        from = from | 0;
                        to = to | 0;
                        let pxl_indexes = _get_indexes();
                        let state = _get_state();
                        let width = state.pxl_width | 0;
                        let c = get_opposite_coordinates(width, from, to);

                        let dx = Math.abs(c.secondary.x - c.primary.x);
                        let dy = Math.abs(c.secondary.y - c.primary.y);
                        let sx = (c.primary.x < c.secondary.x) ? 1 : -1;
                        let sy = (c.primary.y < c.secondary.y) ? 1 : -1;
                        let err = dx - dy;

                        while(true){

                            const current_pxl_index = c.primary.y * state.pxl_width + c.primary.x;

                            pxl_indexes.add(current_pxl_index);

                            if(c.primary.x === c.secondary.x && c.primary.y === c.secondary.y) { break; }

                            const e2 = 2 * err;

                            if (e2 > - dy) {

                                err -= dy;
                                c.primary.x  += sx;
                            }
                            if (e2 < dx) {

                                err += dx;
                                c.primary.y  += sy;
                            }
                        }
    
                        return pxl_indexes;
                    },
                    from_rectangle: function(from, to) {

                        from = from | 0;
                        to = to | 0;
                        let pxl_indexes = _get_indexes();
                        let state = _get_state();
                        let width = state.pxl_width | 0;
                        let c = get_opposite_coordinates(width, from, to);

                        const rectangle_width = Math.abs(c.primary.x - c.secondary.x) + 1;
                        const rectangle_height = Math.abs(c.primary.y - c.secondary.y) + 1;
                        const rectangle_top_left_x = Math.max(c.primary.x, c.secondary.x) - (rectangle_width - 1);
                        const rectangle_top_left_y = Math.max(c.primary.y, c.secondary.y) - (rectangle_height - 1);
                        const pixel_number_in_rectangle = rectangle_width * rectangle_height | 0;

                        let inside_rectangle_x = 0;
                        let inside_rectangle_y = 0;
                        for(let i = 0; i < pixel_number_in_rectangle; i = i + 1 | 0) {
    
                            inside_rectangle_x = i % rectangle_width | 0;
                            inside_rectangle_y = (i - inside_rectangle_x) / rectangle_width | 0;
                            pxl_indexes.add((rectangle_top_left_y + inside_rectangle_y) * state.pxl_width + (rectangle_top_left_x + inside_rectangle_x) | 0);
                        }

                        return pxl_indexes;
                    },
                    from_path: function(from, to) {

                        from = from | 0;
                        to = to | 0;
                        let pxl_indexes = _get_indexes();
                        let state = _get_state();
                        let width = state.pxl_width | 0;
                        let c = get_opposite_coordinates(width, from, to);

                        return pxl_indexes;
                    },
                    from_ellipse: function(from, to) {

                        from = from | 0;
                        to = to | 0;
                        let pxl_indexes = _get_indexes();
                        let state = _get_state();
                        let width = state.pxl_width | 0;
                        let height = state.pxl_height | 0;
                        let c = get_opposite_coordinates(width, from, to);
                        let ellipse_width = Math.abs(c.primary.x - c.secondary.x) + 1 | 0;
                        let ellipse_height = Math.abs(c.primary.y - c.secondary.y) + 1 | 0;
                        const ellipse_top_left_x = Math.max(c.primary.x, c.secondary.x) - (ellipse_width - 1) | 0;
                        const ellipse_top_left_y = Math.max(c.primary.y, c.secondary.y) - (ellipse_height - 1) | 0;
    
                        let ellipse_rayon_x = ellipse_width / 2;
                        let ellipse_rayon_y = ellipse_height / 2;
                        const ellipse_middle_x = ellipse_rayon_x + ellipse_top_left_x | 0;
                        const ellipse_middle_y = ellipse_rayon_y + ellipse_top_left_y | 0;
    
                        let ellipse_context = _new_canvas_context_2d(width, height);
                            ellipse_context.save();
                            ellipse_context.translate(ellipse_middle_x, ellipse_middle_y);
                            ellipse_context.rotate(0);
                            ellipse_context.scale(ellipse_rayon_x, ellipse_rayon_y);
                            ellipse_context.arc(0, 0, 1, 0, 2 * Math.PI);
                            ellipse_context.restore();
                            ellipse_context.fillStyle = "#ffffffff";
                            ellipse_context.fill();
    
                        get_shadow_indexes_from_canvas_context(ellipse_context, pxl_indexes);
                        return pxl_indexes;
                    }
                };
            }
        };
    }
};

module.exports = SuperState;