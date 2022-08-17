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
        let _blend_rgba_colors = this._blend_rgba_colors;

        return {
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
            draw_shape: function() {

                let _pxl_indexes = new Set();
                let _coordinates;
                let _set_state = this.set_state;

                function get_opposite_coordinates(from, to) {
    
                    let primary = {x:0, y:0};
                    let secondary = {x:0, y:0};
    
                    primary.x = from % _state.pxl_width | 0;
                    primary.y = (from -  primary.x) / _state.pxl_width | 0;
                    secondary.x = to % _state.pxl_width | 0;
                    secondary.y = (to - secondary.y) / _state.pxl_width | 0;
    
                    return {primary, secondary};
                }
    
                function get_new_canvas_context_2d(width, height) {
    
                    let canvas;
                    try {
    
                        if (typeof OffscreenCanvas === "undefined") {
                            throw new Error("Impossible to create OffscreenCanvas in this web environment.");
                        }
    
                        canvas = new OffscreenCanvas(width, height);
                    }catch(e) {
    
                        canvas = document.createElement("canvas");
                        canvas.width = _state.pxl_width;
                        canvas.height = height;
                    }
    
                    let context = canvas.getContext('2d');
                    context.mozImageSmoothingEnabled = false;
                    context.webkitImageSmoothingEnabled = false;
                    context.msImageSmoothingEnabled = false;
                    context.imageSmoothingEnabled = false;
    
    
                    return context;
                }
    
                function get_shadow_indexes_from_canvas_context(context, shadow_indexes) {
    
                    const ui32_colors = new Uint32Array(context.canvas.getImageData(0, 0, context.canvas.width, context.canvas.height).reverse().buffer).reverse();
                    const ui32_colors_length = ui32_colors.length | 0;
                    for(let i = 0; i < ui32_colors_length; i = i + 1 | 0) {
    
                        if(ui32_colors_length[i] !== 0) { shadow_indexes.add(i);}
                    }
                }

                // TO DO --> GET PREVIOUS COMMIT OR FINISH THIS
                return {
                    paint: function(color, opacity, return_no_write = false) {

                        let _pxl_indexes_values = _pxl_indexes.values();
                        let ui32_colors = new Uint32Array(_pxl_indexes_values.length);
                        let _pxls = Array.from(_state._s_pxls[_state._layer_index]);
                        let _colors = Array.from(_state._s_pxl_colors[_state._layer_index]);

                        for(let i = 0; i < _pxl_indexes_values.length; i = i + 1 | 0) {
                            ui32_colors.fill(_colors[_pxls[_pxl_indexes_values[i]]], i, i+1);
                        }

                        ui32_colors = new Uint32Array(
                            Uint8ClampedArray.from(_blend_rgba_colors(
                                Array.of(
                                    new Uint8ClampedArray(ui32_colors.reverse().buffer).reverse(),
                                    new Uint8ClampedArray(new Uint32Array(_pxl_indexes_values.length).fill(color).buffer).reverse(),
                                ),
                                opacity, false, false
                            )).reverse().buffer
                        ).reverse();

                        let color_index = -1;
                        for(let i = 0; i < _pxl_indexes_values.length; i = i + 1 | 0) {

                            color_index = _colors.indexOf(ui32_colors[i]);
                            if(color_index === -1){ color_index = _colors.push(ui32_colors[i]);}
                            _pxls[_pxl_indexes_values[i]] = color_index | 0;
                        }

                        if(return_no_write) {

                            return Array.of( Array.from(_pxls), Uint32Array.from(_colors), _pxl_indexes );
                        }else {

                            _state._s_pxls[_state._layer_index] = Array.from(_pxls);
                            _state._s_pxl_colors[_state._layer_index] = Uint32Array.from(_colors);

                            _set_state({
                                _s_pxls: _state._s_pxls,
                                _s_pxl_colors: _state._s_pxl_colors
                            });

                            return this;
                        }
                    },
                    get: function() {

                        return _pxl_indexes;
                    },
                    from_line: function(from, to) {
    
                        _coordinates = get_opposite_coordinates(from, to, _state.pxl_width);
                        // PAINT HACK: compute the pixel between the previous and latest paint by hover pixel (Bresenham’s Line Algorithm)
                        let dx = Math.abs(_coordinates.secondary.x - _coordinates.primary.x);
                        let dy = Math.abs(_coordinates.secondary.y - _coordinates.primary.y);
                        let sx = (_coordinates.primary.x < _coordinates.secondary.x) ? 1 : -1;
                        let sy = (_coordinates.secondary.y < _coordinates.primary.y) ? 1 : -1;
                        let err = dx - dy | 0;
                        let e2 = 0;
    
                        while(true){
    
                            _pxl_indexes.add(_coordinates.secondary.y * _state.pxl_width + _coordinates.primary.x | 0);
                            if(_coordinates.primary.x === _coordinates.secondary.x && _coordinates.secondary.y === _coordinates.secondary.y) { break; }
                            e2 = 2 * err | 0;
                            if (e2 > - dy) {
    
                                err = err - dy | 0;
                                _coordinates.primary.x = _coordinates.primary.x + sx | 0;
                            }
                            if (e2 < dx) {
    
                                err = err + dx | 0;
                                _coordinates.secondary.y  = _coordinates.secondary.y + sy | 0;
                            }
                        }
    
                        return this;
                    },
                    from_rectangle: function(from, to) {
    
                        _coordinates = get_opposite_coordinates(from, to, _state.pxl_width);
                        const rectangle_width = Math.abs(_coordinates.primary.x - _coordinates.secondary.x) + 1;
                        const rectangle_height = Math.abs(_coordinates.primary.y - _coordinates.secondary.y) + 1;
                        const rectangle_top_left_x = Math.max(_coordinates.primary.x, _coordinates.secondary.x) - (rectangle_width - 1);
                        const rectangle_top_left_y = Math.max(_coordinates.primary.y, _coordinates.secondary.y) - (rectangle_height - 1);
    
                        let inside_rectangle_x = 0;
                        let inside_rectangle_y = 0;
                        for(let i = 0; i < _pxl_indexes.size; i = i + 1 | 0) {
    
                            inside_rectangle_x = i % rectangle_width | 0;
                            inside_rectangle_y = (i - inside_rectangle_x) / rectangle_width | 0;
                            _pxl_indexes.add((rectangle_top_left_y + inside_rectangle_y) * _state.pxl_width + (rectangle_top_left_x + inside_rectangle_x) | 0);
                        }

                        return this;
                    },
                    from_path: function(from, to) {

                        return this;
                    },
                    from_ellipse: function(from, to) {
    
                        _coordinates = get_opposite_coordinates(from, to, _state.pxl_width);
                        let ellipse_width = Math.abs(_coordinates.primary.x - _coordinates.secondary.x) + 1 | 0;
                        let ellipse_height = Math.abs(_coordinates.primary.y - _coordinates.secondary.y) + 1 | 0;
                        const ellipse_top_left_x = Math.max(_coordinates.primary.x, _coordinates.secondary.x) - (ellipse_width - 1) | 0;
                        const ellipse_top_left_y = Math.max(_coordinates.primary.y, _coordinates.secondary.y) - (ellipse_height - 1) | 0;
    
                        let ellipse_rayon_x = ellipse_width / 2;
                        let ellipse_rayon_y = ellipse_height / 2;
                        const ellipse_middle_x = ellipse_rayon_x + ellipse_top_left_x | 0;
                        const ellipse_middle_y = ellipse_rayon_y + ellipse_top_left_y | 0;
    
                        let ellipse_context = get_new_canvas_context_2d(_state.pxl_width, _state.pxl_height);
                            ellipse_context.save();
                            ellipse_context.translate(ellipse_middle_x, ellipse_middle_y);
                            ellipse_context.rotate(0);
                            ellipse_context.scale(ellipse_rayon_x, ellipse_rayon_y);
                            ellipse_context.arc(0, 0, 1, 0, 2 * Math.PI);
                            ellipse_context.restore();
                            ellipse_context.fillStyle = "#ffffffff";
                            ellipse_context.fill();
    
                        get_shadow_indexes_from_canvas_context(ellipse_context, _pxl_indexes);

                        return this;
                    }
                };
            }
        };
    }
};

module.exports = SuperState;