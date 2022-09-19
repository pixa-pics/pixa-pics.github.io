const SuperState = {
    _format_hex_color_getUin32(hex) { // Supports #fff (short rgb), #fff0 (short rgba), #e2e2e2 (full rgb) and #e2e2e2ff (full rgba)

        if(typeof hex === "undefined"){

            return 0;
        } else {

            let a, b, c, d = "";
            let formatted = "#00000000";

            switch(hex.length) {

                case 9:
                    formatted = hex;
                    break;
                case 7:
                    formatted = hex.concat("ff");
                    break;
                case 5:
                    a = hex.charAt(1), b = hex.charAt(2), c = hex.charAt(3), d = hex.charAt(4);
                    formatted =  "#".concat(a, a, b, b, c, c, d, d);
                    break;
                case 4:
                    a = hex.charAt(1), b = hex.charAt(2), c = hex.charAt(3);
                    formatted = "#".concat(a, a, b, b, c, c, "ff");
                    break;
            }

            return parseInt(formatted.slice(1), 16);;
        }
    },
    _build_state(props) {
        "use strict";
        let format_hex_color_getUin32 = this._format_hex_color_getUin32;
        let _state = {
            _id: String(parseInt(1000 * Math.random() * 1000).toString(16)),
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
            pxl_current_color_uint32: format_hex_color_getUin32(props.pxl_current_color),
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
            show_original_image_in_background: props.show_original_image_in_background || false,
            show_transparent_image_in_background: props.show_transparent_image_in_background || false,
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
            _old_pxls_hovered: new Set(),
            _canvas_container: null,
            _canvas_wrapper: null,
            _canvas_wrapper_overflow: null,
            _state_history_length: 20,
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
            _imported_image_move_from: [-1, -1],
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
            _processing_filters: false,
        };

        return {
            get() {
                return _state;
            },
            set(new_props) {

                Object.keys(new_props).forEach(function (key) {

                    _state[key] = new_props[key];
                    if (key === "pxl_current_color") {
                        _state["pxl_current_color_uint32"] = format_hex_color_getUin32(new_props[key]);
                    }
                });

                return true;
            }
        };
    },
    _blend_rgba_colors: function(all_added_in_layers, amount, should_return_transparent, alpha_addition) {

        "use strict";
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
        let _pxl_indexes = new Set();

        return {
            paint_shape(pxl_indexes, color, opacity, s = {}, callback_function = function(){}) {

                let state = _state.get();
                let pxl_colors = Uint32Array.from(state._s_pxl_colors[state._layer_index]);
                let pxls = Array.from(state._s_pxls[state._layer_index]);

                let indexes = Array.from(pxl_indexes);
                let colors = new Array(indexes.length);
                for(let i = 0; i < indexes.length; i = i + 1 | 0) {

                    colors[i] = pxl_colors[pxls[indexes[i]]];
                }

                let new_ui32_colors = new Uint32Array(
                    _blend_rgba_colors(
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
                    _s_pxl_colors: state._s_pxl_colors,
                    _s_pxls: state._s_pxls,
                });

                st._s_pxl_colors[state._layer_index] = Uint32Array.from(pxl_colors);
                st._s_pxls[state._layer_index] = Array.from(pxls);

                this.set_state(st).then(callback_function);
            },
            set_state: function(new_props) {
                "use strict";
                return new Promise(function(resolve){
                    resolve(_state.set(new_props));
                });
            },
            get_state: function() {
                "use strict";
                return _state.get();
            },
            get_cursor: function(_is_on_resize_element, _is_image_import_mode, mouse_down, tool, select_mode, canvas_event_target) {
                "use strict";
                _is_on_resize_element = Boolean(_is_on_resize_element);
                _is_image_import_mode = Boolean(_is_image_import_mode);
                mouse_down = Boolean(mouse_down);
                tool = String(tool);
                select_mode = String(select_mode);
                canvas_event_target = String(canvas_event_target);

                if(_is_image_import_mode) {

                    if(!mouse_down) {

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABFUlEQVRYR+2Y2w6EIAxEl///aDYYa7C2dFqryyb4qsBhOr3E8kl4aq2Vb1NKKZGtQ4v4QQ2oP7/xTQckqYNAuhTSQiMp1IAiqrmBpEMWEPlBMy+qEOKrV0OG+GoBWZm3FFoKtUyiXsvV+P8sk3rVfqvN/BmF0eUhfiDJT136J0BSnEklrUUM1hzdQvMVH0kudWikkvQuMhV2vfEyyMFAtElwMhW5pclSBOIhYDe6I8ppLQQkZdMUQJpKafLsBdQ0tTaMZYK4TD010NNhg039lkohoKdU6ir3qfSYE2N2dR4Zeru8lT1TAmWHTQsXpBBV7iyoEQwMlAVlwbiA7kIhMG6gHsoTQhQmBNQXTStD+/fIz6r2/RftLsg0XDwDiAAAAABJRU5ErkJggg==") 20 18, auto';
                    }else {

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVRYR+3X4Q6DIAwEYHn/h2bBQIJNoXcVHEb2c3PZx11hGo7FXmExz7FBViM7oe8lFGOMctUhBPcouL4oEfXvK77TiyJpUMEURALIQOR7DJICSUxaOQLSritImRwNstJwIC+G94K0uhxpXDZkrptPqIX5C6iHsU7d+vPO8OMJjcK04FRlszFV3XZCT2Bo0I2/I3i04MpSQhuUc1VP6uVmKA/c9NrgGVoWlG+s4F3DXkgl9ERKLtCslNw3aLPOJC2dc/FW70uCRtfWqgtKqAz3KFQPA4NGoSwMBbqLQjA0qEYxFaIYF6jsSu2Zvrdj0UfpHwMA+yX+QNKuAAAAAElFTkSuQmCC") 20 24, auto';
                    }

                    if(_is_on_resize_element) {

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA9ElEQVRYR+3X0Q6FIAgGYDjn/R/5xBmtmjMTmIBd2G3WvsE/VISXPfgyDyyQ1JFbhYiIpI/q94joVukmyPJ/9i+Q1MUpFTpa8wWAzZoxy/puhg7E9b8MlAhiTRnyaJQIQsQPEW1ZKA2I12AWSgvaO5eBsoBSUFZQOErcyx6GHgf9FxH0kU0xJFMjoJD2jYIYZWpffbypI+EBMlWKQWf2WkcXL5AalQlSobJBImoGqIsq51d0hm5n/9beVx5nskG9kbDjZ4Ca7TtLGQ6S7nT19SoFNHqn8xyMnIlrCmtuGikV0kDKNVF7mdXxuN61ZR6qBZKq+Aeqdig0aelV6gAAAABJRU5ErkJggg==") 18 18, auto'
                    }

                }else if ((tool === "MOVE" || canvas_event_target.includes("CANVAS_WRAPPER")) && !mouse_down) {

                    return "grab";
                }else if((tool === "MOVE" || canvas_event_target.includes("CANVAS_WRAPPER")) && mouse_down){

                    return "grabbing";
                }else if (tool === "RECTANGLE") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAv0lEQVRYR+2X3Q6AIAiF5f0fmuaFG6OSH9F00a0IX+dAKZTNHtiMpySQ5Mg/FUJEpMoAwKsQSxSqQI2hsiUQb9whhbjf0lS0dWrDUw5qGc9J9956iL6NFob3hSUH33sWEJvWrmBLLJNG1GCpf+wtE5FAkZa5fx0zLNNaW+O6Yx+lUAJJCgwdP2b0kCXnkh5KIE0PuU+MXF6pmHY9BEhbzBInfdtCzkPTgSwFPLGf3zos0EvuZQlkUUCKTcuOU+gCTnb3JcS3RYIAAAAASUVORK5CYII=") 27 12, auto';
                }else if (tool === "ELLIPSE") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABH0lEQVRYR+2X4Q7CIAyEy0x8//c1WoNhCWOFawvo1PnTAf24HqUEOtgvzORhZs7XDyHAeHBAD3AEWhki2wlUqvmfCpVGRR7LPSSNLX1lMnWeAiE90bSIb/NdMrp6hRZMjJIWfw+QBFOUmCrI8JTVYDQ1Zfgp64FJaRxbGEsgbbVd8zdaoYWZ79bSn5tpKJCw2JWIbpZjNPRy9ezOAlsbW61DPwl0uJR5VJ6ashMInapToY8plPU77v5Jew+2AnTdZYJ/ltjHIVWbO/be9t55ERYCvQalXjnJfiGiR22nvT0U9IS02wS5m9sLAxWSGq3sv51I5atDa+TN+x+ZrAXVmuuBUStkhfLCmIHWxh2pqnmRmBs0FHTWd3jKZgX+GoWe1olaNCjYBWEAAAAASUVORK5CYII=") 25 9, auto';
                }else if (tool === "LINE") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA+klEQVRYR+3Y0Q6DIAwFUOr+/5NdTY1dkJS1YIsmstexcLhArYP0sA88zJN+IERECw4AQhdxAmlzkXmCaNvK3ePkbkson5jO1gQd23RKIr9xtydUu/7HVn5SSl9LiegZ03Tt+cADwEJnv2dC7TfmwpjXqMikrFV3QcRVQLknZQVR0kNQLaAhqFZQOKoHFIrqBYWhroBCUFdB7igPUBX1ryrXGj0vkIhSnoni3J4gM4r7rbKPp9S8QdRtmtsYqfkLB/GipcknSHtZGJ6QdsveC9LaVPqeDvuQhCwYHjMU1PDnxe7jYuleh6TVW1J7J8iSTPGG7P8sa0WU4zdwA0Y04iTpEgAAAABJRU5ErkJggg==") 32 32, auto';
                }else if (tool === "PENCIL") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA7UlEQVRYR+3X2w6EIAwEUPv/H82GRDYE6dUO8KCvEntSBgG6DnvoMM/1gbQZWdKhUkppECISa8JBFdMbqk1CQUEjpnVJQsFAHEZDwUC1cASVDmoBbjmRULOpSwX1xftiniylgWZFJRQX7BSQdVraOOgq04J7h/v/77nHs4141SELRlvm41YSBnkwY5ek/SwEQmEq1A1CYtwgNMYFWoExg1ZhTKCVGBW0GiOCdmBY0C7MFLQT8xqkHdi1K8/s/eNPbe0QAhPuEAoTAiExbhAaw4K4MGrX4EiI0w5oGcVNqwxVyPpd9wHN+uHouONAP0LJ2yWtxGVEAAAAAElFTkSuQmCC") 5 32, auto';
                }else if (tool === "PENCIL PERFECT") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA/0lEQVRYR+3XSw7DIAwE0Pj+h6ZCqiNE/cHAGBbttg1+GagBei770GWe5w/yZiQloVJKYQgRmTXhoIppDdVmoaCgHsMpWSgYSMN4KBioFp5BbQfxAuZ1YqGkqdsKaou3xSJraRtIKmqhtIW9BTQ6Lfw76L/MSOZtykJSahBLCVnTFG2Ibyf39hbt+wjm2wLMDr0EQmEqKjxlSEwYhMaEQBmYYVAWZgiUiXFB2RgTdAKjgk5hRNBJzBCIN0bveDG7BfXP/XRq6ZCVhXET4utUf5XyrjIraZkJSQMjMW5CPQiNUUFa5N41eGWqls5DOwqrL40cfGbs8AFtpkjkmetAH9mVQzQQt8P4AAAAAElFTkSuQmCC") 5 32, auto';
                }else if (tool === "PICKER") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABTUlEQVRYR+2W4RKEIAiEpd7/kS9ubLQxFCGUq5upv5X7uYsghIc98DCe8AJJifzEIUTEDAIAXU13oAhTMkS2HtQUoCS6hhC2MhIKk9/1oIaBsmgSOaA4GAlqCIiJY0XEj1AqO1fLqSGgEMJCxZOIdJjcgOLCFZSKxsmhqA2IuGkiIgXfPG2jkU2F2Xentbfxnal+vPpQ5UwSipBsfBKM1SHOmSXWaTrOp+5cHPGqeVLnr0YmwiSBZm3R5tkqlytAXEx0191Cl6C0QGZn8qDXDlgNkNmZwo04ZfZilwpbAhpyBgDKOPNa5vvQDGdO1xFNz+Nob4Hh+tBtME0g7o5DboNcbYmNT4qtiqwEYnqGG8wVhzK4Nk7JCPZ91yFy/60Gp9R1LVQqoGI4HhoeMKrIWrv0gjEBecKwQL3syTiwlEn3H2mWTReUFnyB/s6hL1JSZjT7s1UhAAAAAElFTkSuQmCC") 5 32, auto';
                }else if (tool === "EXCHANGE") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABoklEQVRYR+2Y61IDMQiFoa2+//tqxdmdJAMJ5JBMR6tTf7ob9gMOl5Tpyf74yXjoXwBdReQzG1lm1k5fiOhrdjYdIRGRash+Y46mjg0vdrDn8xTQAbMCkY3eAdtDIaCLiNx7mJnXGgY5sQoUwjDzjYjuIBI3EfnQUAWgHVsC6tNUo+LlPQLTNurHnf+9EVErEjdlHgwzX1GF9GCBnbUIPQrm+CoqhlTKAiAk/ihrg470ixmgs+lVIXoHqkHdlzwapbUTCrzTHhvPHcG51YRSUdI19JhMf0JAQ6oyMCqKy1AvoBI9oyvd234lQl7DbIO7K8NziJbqeieioToeoaElILVimJauyx0NTSTqNFCmLH80Qn8SKDOjQGM046SfBuG0D1p909XC6DCmHP2YLWKpExdvXLHvpDszXLdWhgwMEQ0b6BZQZu1MAKVgDjt9ylzBzfoGgqlac3ZrV79QQ0GEMjpyl7NiL1yHIZAXgd1rEILxUgZFjVIUPZ9tn/rMUh86PTBX9TmejmT2+pRZ3s0PBKghGm83rk4ZoN0sbZ17AaGwfQNzJa40/U9w+QAAAABJRU5ErkJggg==") 18 18, auto';
                }else if (tool === "BUCKET") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABMklEQVRYR+2XwRLDIAhEpen/f3FTOmaajrUgC5jpxVyD+lwXUCoXfszM5/RERMhSUBAyUR9TYVqGyoZAXQLUw1TYvwFlYCr4VIWyMFOBZsBMA5JgTpOj3vlkYySD2jEjmAhUykPaMR3Sd2UHVSoMZHnG+q+dTAgIXQyNa+HcQN5FvPEuIO/kjam/2siocsNAURgvFAQ0yiZv2bCyLwzkBdHi+3IAAb3P/McHWSipNo2Absy8E9FWSnnOhtIKpQp0+qYfiLQKS7lR1RaBrNteBspqIRLQxswP4fp5L6XsozTOKKN2e2330s48SlnKTAFCjY7CiBc0j0LI8Xlg1BujZWrJK9nWYt4YI4+8FsqrjAlkZcygFRyvVeRRKM0Bt44ooHfcArIUWwothSwFrP/LQ5ZCL65vGzRTMXdZAAAAAElFTkSuQmCC") 6 25, auto';
                }else if (tool === "HUE BUCKET") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABMklEQVRYR+2XwRLDIAhEpen/f3FTOmaajrUgC5jpxVyD+lwXUCoXfszM5/RERMhSUBAyUR9TYVqGyoZAXQLUw1TYvwFlYCr4VIWyMFOBZsBMA5JgTpOj3vlkYySD2jEjmAhUykPaMR3Sd2UHVSoMZHnG+q+dTAgIXQyNa+HcQN5FvPEuIO/kjam/2siocsNAURgvFAQ0yiZv2bCyLwzkBdHi+3IAAb3P/McHWSipNo2Absy8E9FWSnnOhtIKpQp0+qYfiLQKS7lR1RaBrNteBspqIRLQxswP4fp5L6XsozTOKKN2e2330s48SlnKTAFCjY7CiBc0j0LI8Xlg1BujZWrJK9nWYt4YI4+8FsqrjAlkZcygFRyvVeRRKM0Bt44ooHfcArIUWwothSwFrP/LQ5ZCL65vGzRTMXdZAAAAAElFTkSuQmCC") 6 25, auto';
                }else if (tool === "CONTOUR") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA/klEQVRYR+XX7Q6FIAgG4Lz/i/bMlo2ZIB++zO30t1xPgEjlOuwqh3mu/wPVWuuYhVIKGwhohBpm9u5m5FAwEIfp0eJQENAM0zNHIzZDbQdxmJ4ieh8O0tRMGkiqGbrRUlK2KmCu+UJSthPT4KGi3o0JgRAYNwiFcYGQGDMIjTGBMjBqUBbGBLof5seYT++TRgxpSjX1oT5srWBejCpCBPHiJVgEswSNJ3MPNR0laCqjGBOI5p0MW3fUZlH0/s2INbTaXSPMi6DrwiDpD8IDdIN21MsM7AKhMK6iRmLMIDTGBMrAqEFZGBXo6cSmM8+z3d9TILIYsTbty7X440A/uhPvJTjQhwcAAAAASUVORK5CYII=") 8 33, auto';
                }else if (tool === "BORDER") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAk0lEQVRYR+2YwQ6AIAxD2f9/9AgHDyixrs5kxHotHeVtB9Basc+K5WkKhDpyIeTujkyZuplNGZaBTmsy959qjbPvHeir7h0dCBNaGd72b8yoAt1RFCE0YyIkQogA0jVDIoQIIF0zJEKIANI1Q/8jhE7M6PSdmtks4gm/OiLFmbWPAzHFWQ98ubKFs3z6HYNIliPUAQ/FUDSiymd+AAAAAElFTkSuQmCC") 18 18, auto';
                }else if (tool === "SET PENCIL MIRROR") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABR0lEQVRYR+3X3Q6CMAwF4DUY3v91NeIxEGYGbv1jXbzQW2R8nI5uo/RjP/J4AEBzHxGZxzffsGK0z1ndVpQJZMHkBK0oNeiMkapWpmhBqUA1jFCKGcDdgxJBDkyulgvFgi5g3KgmqAPGhVKBLJOy0Z8O5ePG6wGaADylflMmHgnKmAeAmUONAGXMViWprNEgFrM/fEopvYqO/VlyepdMg8mJfVBhCXEDV67Fg/b5sm0/yknMYfI9eSnpXbKvViNhhoI0mGGgCuaWUlpq3TpsUjOfcRMTnpC2TGVSoQntgy8AJiJikxnRGPNSsXZeFSa8ZJoj0Pk/oSX7g84112wvuNQs2+HoTf666h9OutK+KfIYZMZsC7Zmglrf8krJVaDWA7iX8Zxa1QnVuq0mWc/HoE7Ig5ImcO2lzKByxyilJJ3VuoEkyJXrb6IrI0OmlalfAAAAAElFTkSuQmCC") 18 18, auto';
                }else if (tool === "SELECT COLOR THRESHOLD") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABeklEQVRYR82W2w7DIAxDQfv/P57GREWqNM3FlAh1j2trDokdqOVlv/oynnICtdZah6u13iC9Z3JDqzoXoM7SuThUX0D736qs9T6qc6kG/4gWnIGhbyyd/lxuWG5MbY/sWiSiVYug+DNEJwRCRBAgVAcF+pRSfjOJlBUaQKGO6iHq9Uhd2HctadT2Ed4eFEhHTRmL/6e19rXERhXMKrM2uTp8Q/AcklBejK1ZhMwzeFJzMcMfsJbnxWkRDjNacuijKYqCMQWkwFTtv2jRlAp5C2dCQRVCFkTeQSoHAQ2PHIes5Zcso8NAHpR2bj01+hSQBkXT3LmOqHcs6/1pIAmF+GJmJMCTmh0n5KPTU5lQSzdGyzsr7YNujJ5Bs6HC+xCSlkyoEAg1ZBYUChTe9LLSl35jXK3ULWXCM/BNjydrBSqMPW8F6qeV9kGDkRaQwzEaiI8qFYmuPkehqPqPzrJZyAiKW2ELkOcp6cttQBqUFpKtQEhitwMxKHXtP/Eo9zDGipjdAAAAAElFTkSuQmCC") 7 7, auto';
                }else if (tool === "SELECT PATH") {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA/klEQVRYR+XX7Q6FIAgG4Lz/i/bMlo2ZIB++zO30t1xPgEjlOuwqh3mu/wPVWuuYhVIKGwhohBpm9u5m5FAwEIfp0eJQENAM0zNHIzZDbQdxmJ4ieh8O0tRMGkiqGbrRUlK2KmCu+UJSthPT4KGi3o0JgRAYNwiFcYGQGDMIjTGBMjBqUBbGBLof5seYT++TRgxpSjX1oT5srWBejCpCBPHiJVgEswSNJ3MPNR0laCqjGBOI5p0MW3fUZlH0/s2INbTaXSPMi6DrwiDpD8IDdIN21MsM7AKhMK6iRmLMIDTGBMrAqEFZGBXo6cSmM8+z3d9TILIYsTbty7X440A/uhPvJTjQhwcAAAAASUVORK5CYII=") 8 33, auto';
                }else if (tool === "SELECT PIXEL") {

                    if(select_mode === "ADD" || select_mode === "REPLACE") {

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABBElEQVRYR+3XyxLCIAwF0PL/H43DIk7EvG5KoOPoGuVwk1jarod92sM8lwnqvXcObq2VH8AFkWHYfgbEk/YOVZ7QwPBKe0mXgmYM9aOFeoPmBqYv8x6SJlIrgYbxUB8gdIi8+DOo5SBKmpKzUNKBlpaMb843Q3ppWVNLm1oordxLQNGy0LrQlEkTpJWAr/Uad6wVklKDuJVQBOON+RyEC9IerghmTsm6YaSe3lWYAYVBlRgYVI2BQDswYdAuTAi0E+OCdmNM0AmMCjqFEUEnMbdB3o0x8xL69U8dTagCk06oCpMCVWJgUDVGBWnN6L0GZ5oYuqCt2AD9Dfg+hG6Arv+DvMReyBw3NCzTf+YAAAAASUVORK5CYII=") 5 32, auto';
                    }else if(select_mode === "REMOVE"){

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA9klEQVRYR+3XQRKDMAgFUHP/Q6eTBR2MgQ8I0YXdmpHnh2jajpf92ss8xwdCHdmSUO+9E6S1ptYsBw0MNwybhioFzRhKSUP9QTxW1Gd+XXpaCYNQJxBo78WJ4o+g0kGUNCWnoVYPlNoyXpwX88xS2lCvimooqd0pIGtbaJ1pl3l2Fl+LBnesXSQlBnErIQsGbfM5iDDIg5lT0roRAlVhBtQNqsS4QdUYF2gHxgzahTGBdmIgaDdGBT2BEUFPYZagJzG3QejEGPlgX97U1oQqMOGEqjAhUCXGDarGiCBpGNHf4MgQpx3QMoqv7uE+D1VB6L4fCCX8A+VV8SWc4ctzAAAAAElFTkSuQmCC") 5 32, auto';
                    }else if(select_mode === "REPLACE") {

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABNUlEQVRYR+3X4Q6EIAgAYLn3f+a42aIZgYCFddv165aXfiKYQXnZBS/zlN8AISICwKeUgiyCgIgLAKRN5NTxhimIWBiKMNTmRtU+aWLWZA6dEoYeblAVUSOzB2xrM1FKn+pzvGGPQouqvwWMtKSHFeYYNlERJd08odpRhKUUC1XDWCgtdCLKi2kGrcWh7izSst8OogSm5O1FygsaXrJ28HawSC7dltTSoD2UVqW3lL13Wdge56uy6MZoVVPNaCFS7n1orQjvq8ODscqcl6C502o1G8HwKPVOGEOgLMz6RoiehzIxYVA2JgSagXGDZmFcoJkYEzQb0wU9gVFBT2FE0JOYyyDvQT+y+aqfQVYnGZjhCGVhhkCZmDAoG6OCtPyxPoOtvPO0h48fnk6v/OcPsqL3ugh9ATjCXTQqEhJmAAAAAElFTkSuQmCC") 18 18, auto';
                    }
                }else if (tool === "SELECT PIXEL PERFECT") {

                    if(select_mode === "ADD") {

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABFUlEQVRYR+3XWQ7DIAwE0HD/QxNRycil3oZigqrmm4jHmLVch33lMM9lgmqtlYNLKekDcEFkaLafAfGkvUGlJ9QwvNJe0qmgEUPz0UJ10DiB6Wc+h6QVqZVAw3ioNxC6iLz4Z1DLQZQ0JWehpAEtLRnvnHeGzKVlk1rq1EJp5V4CipaF2oVWmbSCtBLwtkYyvZmQlBrEVwlZZUI3xL7NWKe9dbgimNaHt0WEQBo2C9P6g68TmRgYlI2BQDswYdAuTAi0E+OCdmNM0BMYFfQURgQ9iQmBaMv3rherHpwfO7V0wu/CuAnRw3W8a0cPypnUzISUO1LqCxYCZSajXj+099mrvug7aaJm8PVjog/olz/Ii+u4hG5e9580PRb9NQAAAABJRU5ErkJggg==") 5 32, auto';
                    }else if(select_mode === "REMOVE"){

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABBklEQVRYR+3Xyw6EMAgFUPn/j+6kCwwqj14t1Emc7TRyvFSqtL3sRy/zbB8o6khJQq21xhAicmumgzpGGrrNQ6WCzhhOyUPtIBlr1Gf5v3W3FiZCHUBBey/OKP47qOkgTpqT81DaDU1tmSwuiyF7adqm1op6KKvdU0CjbeF1Q08Z8mTJtU4y+zIlKTOIRwl5bUIH4j7JE5KhaD95NW8lhCTTi0fz6jBo0YQyMd0CJZSNgUAVmGFQFWYIVIkJQdUYF7QCY4JWYVTQSswQiKfsk+MAGb6Xwai9ZFVhwoT4c+r8ro2cTUg6IUi7WCYGBmVjTJAVc/QZjLZHWw+d9jMKRtf4QH+X0A98MFk0IsucOwAAAABJRU5ErkJggg==") 5 32, auto';
                    }else if(select_mode === "REPLACE"){

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABUklEQVRYR9WX7RKEIAhFZd//mZcdG2mIQMDS2v3VbAbHi3wI5WU/eBlP+Q8gREQA+JRSUCgIiPgFgGkbORluMAURi4AiGHoXhqo2aWPeZg5GCYY+ZlAVoiqzC9beuVCGTfM7+WJXgUPVZwVGC+khwhJGbFSF0v48QXEvSijVRLVgPChLOhUqCsOc1uQwK4sW9tuB6ADT4e0pFQUaDhl3zp1lztJth1pz2oOysvSWtI+GRdS4WJZlC2NHGbVmtfXhOrQZibaOXpiyBXGv5KPdPgPTNlmLq1vZ3QUa8CyYrSNkFZoJkwaaDZMCWgETBloFEwJaCeMCrYbpAj0BYwI9BaMCPQkTAqIxwRsvsgXWWm9eg3j/WQXjKkTXKdkTo1egEdW6ChmNNdS1R2BchaTRmcqY8xC/9kqgyDwzqszlAe2q43CWzXIUtZse0KKGR9e9DugHz47FNAGTbH0AAAAASUVORK5CYII=") 5 32, auto';
                    }
                }else if(tool.includes("SELECT")) {

                    if(select_mode === "ADD") {

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAkElEQVRYR+2XQQqAMAwEm/8/OpKDUApmUwoScbwmpdNpXNRGs8ea8QyA1I1g6H+G3N3nU5vZ0RgcLQ6QALoZgg2gdSgxpF5TDGEoM7CG3lPvnEPKaNSzrEqDcR7YykaVHhWe3wOqnPq1K6vAkEPKEoYwpAyoOjNUMdTqI18B79aP/zp2N1T9AGFIGVD1djN0AfXGlCWHImsNAAAAAElFTkSuQmCC") 18 18, auto';
                    }else if(select_mode === "REMOVE") {

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAb0lEQVRYR+2UQQrAIBDEdv7/6C0+oAYWClriNbiOcTB12MphecpA9CIa0hAZIG6HNEQGiNshDZEB4tsOdXfTgAlP8nouBtrsnWSpdcd/BRppgE1jQ1+EoZl+jBoiA8TtkIbIAHE7pCEyQNwOXWfoAYpLFiWYvOCxAAAAAElFTkSuQmCC") 18 18, auto';
                    }else if(select_mode === "REPLACE") {

                        return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABCElEQVRYR+2X3Q6DMAiFwb3/I8+zYFbj5ixwmixsqTdeWNqPw09RpdijxXhkAnkRmQr9p0IAoKo3EVk9Dy++LwDuquqmiLvgCbMCWEgoBbCq2sv86kN1gRqMiCzmOQBJQjVlmnDNsctzPYWad3skElCUrQdkIMzGjM3mdAQoC0XDZICiUEMwWSAPymrAqonJt90mGrJje3mvnK36NtpBGEahBnYKzZE4UYmnPsoo1IUagRlR6GM+kc3zRSVWoVIhK5XUvT7z9bKPNL3Imu4EE82hzEGZtVTZMwcwNqHLld6YnBL6t33FAc3uKZs7a4ywLeNKDfnkXwZtFi17+oCs4QTyFJsK/ZxCD73aLDSws54nAAAAAElFTkSuQmCC") 18 18, auto';
                    }
                }else {

                    return 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAq0lEQVRYR+1WQQrAIAxb///oDmUOkc3W2kEG2XHQGpPURg6wTzLwqKr2fUQk3Ddc2AMogBqGgo2ARpkhGaKHZtMIKRmnjJLtrBBIU0O9QzvsjrUpyzUd0BgfvAdYWz3StzLUm7KBuWLEKzZPzHjqO8SWElXuX7UnLCCvTCvTFJYsAuarGswp270tQ77FIOQuY0BjQLOM+zuGVlbK7HIpLzXH3vIXGfIwlGXqE9034xUtxdxDAAAAAElFTkSuQmCC") 18 18, auto';
                }
            },
            get_indexes: function() {

                return new Set(_pxl_indexes.keys());
            },
            get_imported_image_data: function() {

                let state = _state.get();
                if(state._imported_image_pxls.length) {

                    let canvas_ctx = this.new_canvas_context_2d(state._imported_image_width, state._imported_image_height);
                    state._imported_image_pxls.forEach((pxl, index) => {

                        const pos_x = index % state._imported_image_width;
                        const pos_y = (index - pos_x) / state._imported_image_width;
                        canvas_ctx.fillStyle = "#".concat("00000000".concat(state._imported_image_pxl_colors[pxl].toString(16)).slice(-8));
                        canvas_ctx.fillRect(pos_x, pos_y, 1, 1);
                    });

                    const scaled_width = state._imported_image_width + state._imported_image_scale_delta_x;
                    const scaled_height = state._imported_image_height + state._imported_image_scale_delta_y;

                    let canvas_resized_ctx = this.new_canvas_context_2d(scaled_width, scaled_height);
                    canvas_resized_ctx.drawImage(canvas_ctx.canvas, 0, 0, state._imported_image_width, state._imported_image_height, 0, 0, scaled_width, scaled_height);
                    let resized_image_data = canvas_resized_ctx.getImageData(0, 0, scaled_width, scaled_height);
                    const {new_pxls, new_pxl_colors} = this.get_pixels_palette_and_list_from_image_data(resized_image_data);
                    state._imported_image_width = scaled_width;
                    state._imported_image_height = scaled_height;


                    let pxls_positioned = new Object();
                    let image_imported_resizer_index = -1;
                    if (new_pxls.length > 0) {

                        image_imported_resizer_index = state._imported_image_start_x + scaled_width + (state._imported_image_start_y + scaled_height) * state.pxl_width | 0;
                        new_pxls.forEach(function(pxl, index) {

                            const pos_x = index % scaled_width;
                            const pos_y = (index - pos_x) / scaled_width;
                            const current_pos_x_positioned = pos_x + state._imported_image_start_x;
                            const current_pos_y_positioned = pos_y + state._imported_image_start_y;
                            const imported_image_pxl_positioned_index = current_pos_y_positioned * state.pxl_width + current_pos_x_positioned;

                            if (current_pos_x_positioned >= 0 && current_pos_x_positioned < state.pxl_width && current_pos_y_positioned >= 0 && current_pos_y_positioned < state.pxl_height) {

                                pxls_positioned[imported_image_pxl_positioned_index] = pxl | 0;
                            }

                        });
                    }

                    return {
                        imported_image_pxls_positioned: pxls_positioned,
                        imported_image_pxl_colors: new_pxl_colors,
                        image_imported_resizer_index: image_imported_resizer_index,
                        imported_image_pxls_positioned_keyset: new Set(Object.entries(pxls_positioned).map(function(e){return e[0] | 0;})),
                    };
                }else {

                    return {
                        imported_image_pxls_positioned: new Array(0),
                        imported_image_pxl_colors: new Uint32Array(0),
                        image_imported_resizer_index: -1,
                        imported_image_pxls_positioned_keyset: new Set()
                    };
                }
            },
            get_pixels_palette_and_list_from_image_data: function(image_data) {

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

                let new_canvas_context_2d = this.new_canvas_context_2d;
                let state = this.get_state();
                let pxl_indexes = this.get_indexes();
                let width = state.pxl_width | 0;
                let height = state.pxl_height | 0;

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
                    from_border: function(selection_indexes, inside = true, bold = false) {

                        const { pxl_width, pxl_height } = state;

                        let pxls_of_the_border = new Set();

                        selection_indexes.forEach((pxl_index, iteration) => {

                            let up, right, bottom, left;

                            up = pxl_index - pxl_width; up = up < 0 ? -1: up;
                            right = pxl_index + 1; right = right % pxl_width === 0 ? -1: right;
                            bottom = pxl_index + pxl_width; bottom = bottom > (pxl_width * pxl_height) ? -1: bottom;
                            left = pxl_index - 1; left = left % pxl_width === pxl_width - 1 ? -1: left;

                            let up_left, up_right, bottom_left, bottom_right;

                            up_left = up - 1; up_left = up === -1 || left === -1 ? -1: up_left;
                            up_right = up + 1; up_right = up === -1 || right === -1 ? -1: up_right;
                            bottom_left = bottom - 1; bottom_left = bottom === -1 || left === -1 ? -1: bottom_left;
                            bottom_right = bottom + 1; bottom_right = bottom === -1 || right === -1 ? -1: bottom_right;

                            if(!inside) {

                                if(!selection_indexes.has(up)){
                                    pxls_of_the_border.add(up)
                                }
                                if(!selection_indexes.has(right)){
                                    pxls_of_the_border.add(right)
                                }
                                if(!selection_indexes.has(bottom)){
                                    pxls_of_the_border.add(bottom)
                                }
                                if(!selection_indexes.has(left)){
                                    pxls_of_the_border.add(left)
                                }

                                if(bold) {

                                    if(!selection_indexes.has(up_left)){
                                        pxls_of_the_border.add(up_left)
                                    }
                                    if(!selection_indexes.has(up_right)){
                                        pxls_of_the_border.add(up_right)
                                    }
                                    if(!selection_indexes.has(bottom_left)){
                                        pxls_of_the_border.add(bottom_left)
                                    }
                                    if(!selection_indexes.has(bottom_right)){
                                        pxls_of_the_border.add(bottom_right)
                                    }
                                }

                            }else {
                                if(
                                    !selection_indexes.has(up) || -1 === up ||
                                    !selection_indexes.has(right) || -1 === right ||
                                    !selection_indexes.has(bottom) || -1 === bottom ||
                                    !selection_indexes.has(left) || -1 === left
                                ) {

                                    pxls_of_the_border.add(pxl_index);
                                }

                                if(bold) {

                                    if(
                                        !selection_indexes.has(up_left) || -1 === up_left ||
                                        !selection_indexes.has(up_right) || -1 === up_right ||
                                        !selection_indexes.has(bottom_left) || -1 === bottom_left ||
                                        !selection_indexes.has(bottom_right) || -1 === bottom_right
                                    ) {

                                        pxls_of_the_border.add(pxl_index);
                                    }

                                }
                            }

                        });

                        return pxls_of_the_border;
                    },
                    from_path: function(path_indexes){

                        let path_context = new_canvas_context_2d(width, height);

                        path_context.lineWidth = 0;
                        path_context.beginPath();

                        path_indexes.forEach((pxl_index, index) => {

                            const x = pxl_index % width;
                            const y = (pxl_index - x) / width

                            if(index === 0) {

                                path_context.moveTo(x, y);
                            }else {

                                path_context.lineTo(x, y);
                            }

                        });

                        path_context.strokeStyle = "#ffffffff";
                        path_context.fillStyle = "#ffffffff";
                        path_context.stroke();
                        path_context.fill();

                        get_shadow_indexes_from_canvas_context(path_context, path_indexes);
                        return path_indexes;
                    },
                    from_line: function(from, to) {

                        from = from | 0;
                        to = to | 0;
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
                        let c = get_opposite_coordinates(width, from, to);

                        const rectangle_width = Math.abs(c.primary.x - c.secondary.x) + 1 | 0;
                        const rectangle_height = Math.abs(c.primary.y - c.secondary.y) + 1 | 0;
                        const rectangle_top_left_x = Math.max(c.primary.x, c.secondary.x) - (rectangle_width - 1) | 0;
                        const rectangle_top_left_y = Math.max(c.primary.y, c.secondary.y) - (rectangle_height - 1) | 0;
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
                    from_ellipse: function(from, to) {

                        from = from | 0;
                        to = to | 0;
                        let c = get_opposite_coordinates(width, from, to);
                        let ellipse_width = Math.abs(c.primary.x - c.secondary.x) + 1 | 0;
                        let ellipse_height = Math.abs(c.primary.y - c.secondary.y) + 1 | 0;
                        const ellipse_top_left_x = Math.max(c.primary.x, c.secondary.x) - (ellipse_width - 1) | 0;
                        const ellipse_top_left_y = Math.max(c.primary.y, c.secondary.y) - (ellipse_height - 1) | 0;
    
                        let ellipse_rayon_x = ellipse_width / 2;
                        let ellipse_rayon_y = ellipse_height / 2;
                        const ellipse_middle_x = ellipse_rayon_x + ellipse_top_left_x | 0;
                        const ellipse_middle_y = ellipse_rayon_y + ellipse_top_left_y | 0;
    
                        let ellipse_context = new_canvas_context_2d(width, height);
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