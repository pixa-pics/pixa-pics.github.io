const SuperMasterMeta = {
    _get_build_state() {
        "use strict";
        return {
            _pxl_indexes_of_selection_drawn: new Set(),
            _pxl_indexes_of_old_shape: new Set(),
            _old_selection_pair_highlight: true,
            _old_layers: new Array(0),
            _old_full_pxls: new Uint32Array(0),
            _old_pxl_width: 0,
            _old_pxl_height: 0,
            _old_pxls_hovered: new Set(),
            _last_paint_timestamp: 0,
            _is_there_new_dimension: false,
            _did_hide_canvas_content: false,
            _previous_imported_image_pxls_positioned_keyset: new Set()
        };
    },
    new(super_state, super_canvas, super_blend, canvas_pos, color_conversion, sraf){
        "use strict";

        let state = this._get_build_state();
        let meta = {
            super_state,
            super_canvas,
            super_blend,
            canvas_pos,
            color_conversion,
            sraf
        };
        let notifiers = {
            position(){},
            selection(){},
            color(){},
            action(){},
            update(){}
        };

        return {
            get: function() {
                return state;
            },
            set: function(new_props) {
                return new Promise(function(resolve){
                    resolve(
                        Object.keys(new_props).forEach(function (key) {

                            state[key] = new_props[key];
                        })
                    );
                });
            },
            set_notifiers: function(callback_function_position = function(){}, callback_function_selection = function(){}, callback_function_color = function(){}, callback_function_action = function(){}, callback_function_update) {

                notifiers = {
                    position: callback_function_position,
                    selection: callback_function_selection,
                    color: callback_function_color,
                    action: callback_function_action,
                    update: callback_function_update
                };
            },
            is_there_new_dimension: function() {
                return state._is_there_new_dimension && true;
            },
            update_canvas: function(force_update, requested_at) {
                "use strict";

                return new Promise(function (resolve, reject) {

                    force_update = force_update || false;
                    requested_at = requested_at || Date.now();

                    let super_blend = meta.super_blend;
                    // Only operate on canvas context if existing
                    if (meta.super_canvas.ok()) {

                        let {
                            _old_layers,
                            _last_paint_timestamp,
                            _did_hide_canvas_content,
                            _old_full_pxls,
                            _old_pxl_width,
                            _old_pxl_height,
                            _old_pxls_hovered,
                            _selection_pair_highlight,
                            _is_there_new_dimension,
                            _pxl_indexes_of_old_shape,
                            _pxl_indexes_of_selection_drawn,
                            _previous_imported_image_pxls_positioned_keyset,
                        } = state;

                        // Importing state variables
                        let {
                            _s_pxl_colors,
                            _s_pxls,
                            _layer_index,
                            _layers,
                            select_mode,
                            hide_canvas_content,
                            pxl_width,
                            pxl_height,
                            _pxls_hovered,
                            tool,
                            _shape_index_a,
                            _select_shape_index_a,
                            _pxl_indexes_of_selection,
                            _paint_or_select_hover_pxl_indexes
                        } = meta.super_state.get_state();

                        if (_last_paint_timestamp > requested_at) {
                            return;
                        }

                        let indexed_changes = new Set();
                        const _layers_simplified = _layers.map(function (l) {
                            return {
                                id: parseInt(l.id),
                                hash: String(l.hash),
                                name: String(l.name),
                                hidden: Boolean(l.hidden),
                                opacity: (parseFloat(l.opacity) * 255 | 0) >>> 0,
                            };
                        });

                        // This is a list of color index that we explore
                        const full_pxls = Uint32Array.from(_s_pxls[_layer_index].map(function(pci){ return (_s_pxl_colors[_layer_index][pci] | 0) >>> 0}));
                        const is_there_new_dimension = Boolean(_old_pxl_width !== pxl_width || _old_pxl_height !== pxl_height | 0);
                        let _pxl_indexes_of_current_shape = new Set();

                        if (Boolean(tool === "LINE" || tool === "RECTANGLE" || tool === "ELLIPSE" || tool === "TRIANGLE") && _shape_index_a !== -1 && _pxls_hovered !== -1) {

                            _pxl_indexes_of_current_shape =
                                tool === "LINE" ?
                                    meta.super_state.create_shape().from_line(_shape_index_a, _pxls_hovered) :
                                    tool === "RECTANGLE" ?
                                        meta.super_state.create_shape().from_rectangle(_shape_index_a, _pxls_hovered) :
                                        tool === "ELLIPSE" ?
                                            meta.super_state.create_shape().from_ellipse(_shape_index_a, _pxls_hovered) :
                                            _pxl_indexes_of_current_shape;

                        } else if (Boolean(tool === "SELECT LINE" || tool === "SELECT RECTANGLE" || tool === "SELECT ELLIPSE") && _select_shape_index_a !== -1 && _pxls_hovered !== -1) {

                            _pxl_indexes_of_current_shape =
                                tool === "SELECT LINE" ?
                                    meta.super_state.create_shape().from_line(_select_shape_index_a, _pxls_hovered) :
                                    tool === "SELECT RECTANGLE" ?
                                        meta.super_state.create_shape().from_rectangle(_select_shape_index_a, _pxls_hovered) :
                                        tool === "SELECT ELLIPSE" ?
                                            meta.super_state.create_shape().from_ellipse(_select_shape_index_a, _pxls_hovered) :
                                            _pxl_indexes_of_current_shape;

                        } else if (Boolean(tool === "SELECT PATH" || tool === "CONTOUR") && _paint_or_select_hover_pxl_indexes.size > 0) {

                            const first_drawn_pixel = _paint_or_select_hover_pxl_indexes[0];
                            const last_drawn_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size - 1];
                            const closing_path_line = meta.super_state.create_shape().from_line(first_drawn_pixel, last_drawn_pixel);

                            if (select_mode === "REMOVE" && tool === "SELECT PATH") {

                                closing_path_line.forEach((pxl_index) => {

                                    _pxl_indexes_of_selection.delete(pxl_index);
                                });
                            } else if (tool === "SELECT PATH") {

                                closing_path_line.forEach((pxl_index) => {
                                    _pxl_indexes_of_selection.add(pxl_index)
                                });
                            } else {
                                closing_path_line.forEach((pxl_index) => {
                                    _pxl_indexes_of_current_shape.add(pxl_index)
                                });
                            }
                        }

                        const has_layers_visibility_or_opacity_changed = Boolean(_old_layers.map(function (l) {
                            return String(l.id).concat(String(l.hidden ? "h" : "v").concat(String(l.opacity)))
                        }).join("") !== _layers_simplified.map(function (l) {
                            return String(l.id).concat(String(l.hidden ? "h" : "v").concat(String(l.opacity)))
                        }).join(""));

                        const clear_canvas = _did_hide_canvas_content !== hide_canvas_content || has_layers_visibility_or_opacity_changed || is_there_new_dimension || force_update;
                        const layers_length = _layers_simplified.length | 0;

                        const {imported_image_pxls_positioned, imported_image_pxl_colors, imported_image_pxls_positioned_keyset} = meta.super_state.get_imported_image_data();
                        let number_to_paint = 0;
                        let full_pxls_length = full_pxls.length | 0;
                        let pos_x = 0;
                        let pos_y = 0;
                        let opacity = 0;
                        let b = new DataView(new ArrayBuffer(9));

                        if(!hide_canvas_content){

                            super_blend.update(_layers.length + 1, full_pxls.length);

                            for (let index = 0; index < full_pxls_length; index = (index + 1 | 0) >>> 0) {

                                b.setUint8(0, (_pxls_hovered === index && !_pxl_indexes_of_selection.has(index)) | 0);
                                b.setUint8(1, _old_pxls_hovered.has(index) | 0);
                                b.setUint8(2, _pxl_indexes_of_current_shape.has(index)| 0);
                                b.setUint8(3, _pxl_indexes_of_old_shape.has(index)| 0);
                                b.setUint8(4, _pxl_indexes_of_selection.has(index)| 0);
                                b.setUint8(5, _pxl_indexes_of_selection_drawn.has(index) | 0);
                                b.setUint8(6, _previous_imported_image_pxls_positioned_keyset.has(index) | 0);
                                b.setUint8(7, imported_image_pxls_positioned_keyset.has(index) | 0);
                                b.setUint8(8, full_pxls[index] !== _old_full_pxls[index] | 0);

                                if (
                                    clear_canvas ||
                                    b.getUint8(0) !== 0 ||
                                    b.getUint8(1) !== 0 ||
                                    b.getUint8(2) !== b.getUint8(3) ||
                                    b.getUint8(4) !== b.getUint8(5) ||
                                    b.getUint8(6) !== 0 ||
                                    b.getUint8(7) !== 0 ||
                                    b.getUint8(8) !== 0
                                ) {

                                    number_to_paint++;
                                    super_blend.for(index);

                                    for (let i = 0; i < layers_length; i = (i + 1 | 0) >>> 0) {

                                        if(_layers_simplified[i].hidden) {

                                            super_blend.stack(i, _s_pxl_colors[i][_s_pxls[i][index]], 0, 0);
                                        }else {

                                            super_blend.stack(i, _s_pxl_colors[i][_s_pxls[i][index]], _layers_simplified[i].opacity, false);
                                        }
                                    }

                                    if(b.getUint8(1) !== 0 && b.getUint8(0) === 0){_old_pxls_hovered.delete(index);}
                                    if (b.getUint8(2) === 0 && b.getUint8(3) !== 0) {_pxl_indexes_of_old_shape.delete(index);}
                                    else if(b.getUint8(2) !== 0 && b.getUint8(3) === 0) {_pxl_indexes_of_old_shape.add(index)}
                                    if (b.getUint8(4) === 0 && b.getUint8(5) !== 0) {_pxl_indexes_of_selection_drawn.delete(index);}
                                    else if(b.getUint8(4) !== 0 && b.getUint8(5) === 0) {_pxl_indexes_of_selection_drawn.add(index);}
                                    if(b.getUint8(0) !== 0) {_old_pxls_hovered.add(index);}


                                    if (b.getUint8(7) !== 0) {

                                        super_blend.stack(layers_length, imported_image_pxl_colors[imported_image_pxls_positioned[index]], 255, false);
                                    } else if (b.getUint8(2) !== 0 || b.getUint8(0) !== 0) {


                                        if (b.getUint8(0) !== 0) {

                                            super_blend.stack(layers_length, 0, 255, true);
                                        } else {

                                            super_blend.stack(layers_length, 0, 192, true);
                                        }

                                    } else if (b.getUint8(4) !== 0) {

                                        pos_x = (index % pxl_width | 0) >>> 0;
                                        pos_y = ((index - pos_x) / pxl_width | 0) >>> 0;

                                        opacity = 96 + ((0 + ((pos_x + pos_y + (_selection_pair_highlight ? 1 : 0) | 0) % 2) | 0) * 64);
                                        super_blend.stack(layers_length, 0, opacity, 1);

                                    }
                                }
                            }

                            indexed_changes = super_blend.blend(false, false);
                        }

                        if (indexed_changes.size > 0 || clear_canvas || is_there_new_dimension || force_update) {

                            meta.super_canvas.pile(indexed_changes).then(function () {
                                meta.super_canvas.unpile().then(function () {
                                    meta.super_canvas.prender().then(function(b2){

                                        let changed_size = _is_there_new_dimension !== is_there_new_dimension;
                                        meta.sraf.run_frame(function () {
                                            meta.super_canvas.render(b2).then(function(){

                                                state = {
                                                    _pxl_indexes_of_selection_drawn: _pxl_indexes_of_selection_drawn,
                                                    _pxl_indexes_of_old_shape: _pxl_indexes_of_old_shape,
                                                    _old_selection_pair_highlight: _selection_pair_highlight && true,
                                                    _old_layers: _layers_simplified,
                                                    _old_full_pxls: full_pxls,
                                                    _old_pxl_width: pxl_width | 0,
                                                    _old_pxl_height: pxl_height | 0,
                                                    _old_pxls_hovered: _old_pxls_hovered,
                                                    _last_paint_timestamp: requested_at | 0,
                                                    _is_there_new_dimension: is_there_new_dimension && true,
                                                    _did_hide_canvas_content: hide_canvas_content && true,
                                                    _previous_imported_image_pxls_positioned_keyset: imported_image_pxls_positioned_keyset
                                                };

                                                if(changed_size) {
                                                    notifiers.update(false, changed_size || force_update).then(resolve).catch(reject);
                                                }else {

                                                    resolve();
                                                }

                                            }).catch(reject);

                                        }, false, changed_size || force_update);
                                    });
                                });
                            });
                        }else {

                            reject();
                        }
                    }else {

                        reject();
                    }
                });
            },
            _should_remove_not_perfect_second_latest_pixel_from_array(_paint_or_select_hover_pxl_indexes) {
                "use strict";
                const pxl_width = meta.super_state.get_state().pxl_width;

                if(_paint_or_select_hover_pxl_indexes.size >= 3) {

                    const first_latest_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size - 1];
                    const first_latest_pixel_x = first_latest_pixel % pxl_width;
                    const first_latest_pixel_y = (first_latest_pixel - first_latest_pixel_x) / pxl_width;

                    const second_latest_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size - 2];
                    const second_latest_pixel_x = second_latest_pixel % pxl_width;
                    const second_latest_pixel_y = (second_latest_pixel - second_latest_pixel_x) / pxl_width;

                    const third_latest_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size - 3];
                    const third_latest_pixel_x = third_latest_pixel % pxl_width;
                    const third_latest_pixel_y = (third_latest_pixel - third_latest_pixel_x) / pxl_width;

                    const first_third_absolute_difference_x = Math.abs(first_latest_pixel_x - third_latest_pixel_x);
                    const first_third_absolute_difference_y = Math.abs(first_latest_pixel_y - third_latest_pixel_y);

                    if(
                        first_third_absolute_difference_x === 1 &&
                        first_third_absolute_difference_y === 1) {

                        if(
                            (first_latest_pixel_x === second_latest_pixel_x && second_latest_pixel_y === third_latest_pixel_y) ||
                            (first_latest_pixel_y === second_latest_pixel_y && second_latest_pixel_x === third_latest_pixel_x)
                        ) {

                            return true;
                        }
                    }
                }

                return false;
            },
            _handle_canvas_mouse_move(event) {

                "use strict";
                let { _pxl_indexes_of_selection, _imported_image_pxls, pxl_current_color_uint32, tool, pxl_width, pxl_height, _pxls_hovered, hide_canvas_content  } = meta.super_state.get_state();
                const { event_button, mouse_down } = meta.canvas_pos.get_pointer_state();
                const event_which = event_button+1;

                const [ pos_x, pos_y ] = meta.canvas_pos.get_canvas_pos_from_event(event.pageX, event.pageY);

                if(pos_x === -1 || pos_y === -1) {
                    this._notify_position_change({x: pos_x, y: pos_y});
                    return;
                }

                const pxl_index = (pos_y * pxl_width) + pos_x | 0;

                if(pxl_index !== _pxls_hovered && !hide_canvas_content) {

                    if(_imported_image_pxls.length > 0){

                        let { _imported_image_move_from, _imported_image_scale_delta_x, _imported_image_scale_delta_y, _imported_image_start_x, _imported_image_start_y, _imported_image_width, _imported_image_height } = meta.super_state.get_state();
                        const _imported_image_final_width = _imported_image_width + _imported_image_scale_delta_x;
                        const _imported_image_final_height = _imported_image_height + _imported_image_scale_delta_y;
                        const old_pxl_index = (_imported_image_move_from[1] * pxl_width) + _imported_image_move_from[0];
                        const image_imported_resizer_index = (_imported_image_start_x + _imported_image_final_width) + (_imported_image_start_y + _imported_image_final_height) * pxl_width;
                        const _is_on_resize_element = pxl_index === image_imported_resizer_index || old_pxl_index === image_imported_resizer_index;
                        let _new_imported_image_scale_delta_x = 0;
                        let _new_imported_image_scale_delta_y = 0;

                        if(event_which === 1 && mouse_down) {

                            const x_difference = pos_x - _imported_image_move_from[0];
                            const y_difference = pos_y - _imported_image_move_from[1];
                            _imported_image_move_from = Array.of(pos_x, pos_y);

                            if(!_is_on_resize_element) {

                                _imported_image_start_x = _imported_image_start_x + x_difference | 0;
                                _imported_image_start_x = (_imported_image_start_x < -_imported_image_final_width) ? -_imported_image_final_width: _imported_image_start_x | 0;
                                _imported_image_start_x = (_imported_image_start_x >= pxl_width) ? pxl_width: _imported_image_start_x  | 0;
                                _imported_image_start_y = _imported_image_start_y + y_difference | 0;
                                _imported_image_start_y = (_imported_image_start_y < -_imported_image_final_height) ? -_imported_image_final_height: _imported_image_start_y  | 0;
                                _imported_image_start_y = (_imported_image_start_y >= pxl_height) ? pxl_height: _imported_image_start_y | 0;
                            }else {

                                _new_imported_image_scale_delta_x = _imported_image_scale_delta_x + x_difference | 0;
                                _new_imported_image_scale_delta_y = _imported_image_scale_delta_y + y_difference | 0;

                                _new_imported_image_scale_delta_x = Math.max(_new_imported_image_scale_delta_x, -(_imported_image_width - 1)) | 0;
                                _new_imported_image_scale_delta_y = Math.max(_new_imported_image_scale_delta_y, -(_imported_image_height - 1)) | 0;
                                _imported_image_scale_delta_x = _new_imported_image_scale_delta_x | 0;
                                _imported_image_scale_delta_y = _new_imported_image_scale_delta_y | 0;
                            }

                            meta.super_state.set_state({
                                _pxls_hovered: pxl_index | 0,
                                _is_on_resize_element,
                                _mouse_inside: true,
                                _imported_image_start_x,
                                _imported_image_start_y,
                                _imported_image_scale_delta_x,
                                _imported_image_scale_delta_y,
                                _imported_image_move_from: Array.of(
                                    _imported_image_move_from[0] + _new_imported_image_scale_delta_x - _imported_image_scale_delta_x | 0,
                                    _imported_image_move_from[1] + _new_imported_image_scale_delta_y - _imported_image_scale_delta_y | 0
                                ),
                            }).then(() => {

                                this.update_canvas();
                                this._notify_position_change( {x:pos_x, y: pos_y});
                            });
                        }else {

                            meta.super_state.set_state({
                                _pxls_hovered: pxl_index | 0,
                                _is_on_resize_element,
                                _mouse_inside: true
                            }).then(() => {

                                this._notify_position_change( {x:pos_x, y: pos_y});
                            });
                        }

                    }else if((tool === "PENCIL" || tool === "PENCIL PERFECT" || tool === "CONTOUR") && event_which === 1 && mouse_down){

                        let { _paint_hover_old_pxls_snapshot, _last_action_timestamp, _paint_or_select_hover_pxl_indexes, _paint_or_select_hover_pxl_indexes_exception, _paint_or_select_hover_actions_latest_index, _s_pxls, _s_pxl_colors, _layer_index, pxl_current_opacity } = meta.super_state.get_state();
                        const _paint_or_select_hover_pxl_indexes_copy = [..._paint_or_select_hover_pxl_indexes];

                        // PAINT HACK: compute the pixel between the previous and latest paint by hover pixel (Bresenham’s Line Algorithm)
                        if(_paint_or_select_hover_actions_latest_index === -1) {

                            _paint_or_select_hover_actions_latest_index = pxl_index;
                        }

                        let new_drawn_pxl_indexes =  meta.super_state.create_shape().from_line(_paint_or_select_hover_actions_latest_index, pxl_index);
                        meta.super_state.paint_shape(new_drawn_pxl_indexes, pxl_current_color_uint32, pxl_current_opacity);

                        const { pencil_mirror_mode, _pencil_mirror_index } = meta.super_state.get_state();

                        const pencil_mirror_x = _pencil_mirror_index % pxl_width;
                        const pencil_mirror_y = (_pencil_mirror_index - pencil_mirror_x) / pxl_width;

                        if(tool === "CONTOUR") {

                            _paint_or_select_hover_pxl_indexes = new Set(Array.from(_paint_or_select_hover_pxl_indexes).concat(Array.from(new_drawn_pxl_indexes)));
                            _last_action_timestamp = 1 / 0;

                        }else if(tool === "PENCIL"){

                            _paint_or_select_hover_pxl_indexes = new Set(Array.from(_paint_or_select_hover_pxl_indexes).concat(Array.from(new_drawn_pxl_indexes)));
                            _last_action_timestamp = Date.now();

                        }else if(tool === "PENCIL PERFECT") {

                            _last_action_timestamp = Date.now();

                            _paint_or_select_hover_pxl_indexes = new Set(Array.from(_paint_or_select_hover_pxl_indexes).concat(Array.from(new_drawn_pxl_indexes)));
                            _paint_or_select_hover_pxl_indexes_exception.forEach(function(ie) {

                                _paint_or_select_hover_pxl_indexes.delete(ie);
                            });

                            if(this._should_remove_not_perfect_second_latest_pixel_from_array(_paint_or_select_hover_pxl_indexes)) {

                                const second_latest_pixel_drawn = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size - 2];
                                _paint_or_select_hover_pxl_indexes.delete(second_latest_pixel_drawn);
                                _paint_or_select_hover_pxl_indexes_exception.add(second_latest_pixel_drawn);

                                let pixel_index_stack = new Set(Array.of(second_latest_pixel_drawn));

                                pixel_index_stack.forEach((pixel_stacked) => {

                                    const [s_pos_x, s_pos_y] = pixel_stacked;

                                    const y = s_pos_y;
                                    const x = s_pos_x - (s_pos_x - pencil_mirror_x) * 2;

                                    if(x >= 0 && x < pxl_width && y >= 0 && y <= pxl_height) {

                                        pixel_index_stack.add(y * pxl_width + x);
                                    }
                                });

                                pixel_index_stack.forEach((second_latest_pixel_drawn) => {

                                    _s_pxls[_layer_index][second_latest_pixel_drawn] = _paint_hover_old_pxls_snapshot[second_latest_pixel_drawn];
                                });
                            }
                        }

                        let pixel_stack = new Set(Array.of(_paint_or_select_hover_pxl_indexes)
                            .filter((index) => {

                                return Boolean(!_paint_or_select_hover_pxl_indexes_copy.includes(index) && !_paint_or_select_hover_pxl_indexes_exception.has(index));
                            })
                            .map((index) => {

                                const x = index % pxl_width;
                                const y = (index - x) / pxl_width;
                                return [x, y];
                            }));

                        if(pencil_mirror_mode === "VERTICAL" || pencil_mirror_mode === "BOTH") {

                            pixel_stack.forEach((pixel_stacked) => {

                                const [s_pos_x, s_pos_y] = pixel_stacked;

                                const y = s_pos_y - (s_pos_y - pencil_mirror_y) * 2;
                                const x = s_pos_x;

                                if(x >= 0 && x < pxl_width && y >= 0 && y <= pxl_height) {

                                    pixel_stack.add([x, y]);
                                }
                            });
                        }

                        if(pencil_mirror_mode === "HORIZONTAL" || pencil_mirror_mode === "BOTH") {

                            pixel_stack.forEach((pixel_pos) => {

                                const y = pixel_pos[1];
                                const x = pixel_pos[0] - (pixel_pos[0] - pencil_mirror_x) * 2;

                                if(x >= 0 && x < pxl_width && y >= 0 && y <= pxl_height) {

                                    pixel_stack.add([x, y]);
                                }
                            });
                        }

                        let pxl_colors = Array.from(_s_pxl_colors[_layer_index]);
                        pixel_stack.forEach((pixel_pos) => {

                            const y = pixel_pos[1];
                            const x = pixel_pos[0];

                            if(x >= 0 && x < pxl_width && y >= 0 && y <= pxl_height) {

                                const index = y * pxl_width + x;

                                const v_pxl_color_index = _s_pxls[_layer_index][index];
                                const v_pxl_color = _s_pxl_colors[_layer_index][v_pxl_color_index];
                                const v_pxl_color_new = meta.color_conversion.blend_colors(v_pxl_color, pxl_current_color_uint32, pxl_current_opacity, true, false);

                                // Eventually add current color to color list
                                if (!pxl_colors.includes(v_pxl_color_new)) { pxl_colors.push(v_pxl_color_new);}
                                _s_pxls[_layer_index][index] = pxl_colors.indexOf(v_pxl_color_new);
                            }
                        });
                        _s_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);

                        // Update pixels list and pixel colours
                        meta.super_state.set_state({
                            _pxls_hovered: pxl_index | 0,
                            _mouse_inside: true,
                            _paint_or_select_hover_pxl_indexes,
                            _paint_or_select_hover_pxl_indexes_exception,
                            _s_pxls,
                            _s_pxl_colors,
                            _paint_or_select_hover_actions_latest_index: pxl_index,
                            _last_action_timestamp
                        }).then(() => {

                            this.update_canvas();
                            this._notify_position_change({x:pos_x, y: pos_y});
                        });

                    }else if((tool === "SELECT PIXEL" || tool === "SELECT PIXEL PERFECT" || tool === "SELECT PATH") && event_which === 1 && mouse_down) {

                        let { _select_hover_old_pxls_snapshot, _last_action_timestamp, _s_pxls, _paint_or_select_hover_actions_latest_index, _paint_or_select_hover_pxl_indexes, select_mode, _layer_index } = meta.super_state.get_state();

                        // PAINT HACK: compute the pixel between the previous and latest paint by hover pixel (Bresenham’s Line Algorithm)
                        if(_paint_or_select_hover_actions_latest_index === -1) {

                            _paint_or_select_hover_actions_latest_index = pxl_index;
                        }

                        const new_drawn_pxl_indexes = meta.super_state.create_shape().from_line(_paint_or_select_hover_actions_latest_index, pxl_index);

                        if(tool === "SELECT PATH") {

                            _last_action_timestamp = 1/0;
                            _paint_or_select_hover_pxl_indexes = new Set(Array.from(_paint_or_select_hover_pxl_indexes).concat(Array.from(new_drawn_pxl_indexes)));

                        }else if(tool === "SELECT PIXEL"){

                            _last_action_timestamp = Date.now();
                            _paint_or_select_hover_pxl_indexes = new Set(Array.from(_paint_or_select_hover_pxl_indexes).concat(Array.from(new_drawn_pxl_indexes)));

                        }else if(tool === "SELECT PIXEL PERFECT") {

                            _last_action_timestamp = Date.now();
                            _paint_or_select_hover_pxl_indexes = new Set(Array.from(_paint_or_select_hover_pxl_indexes).concat(Array.from(new_drawn_pxl_indexes)));

                            if(this._should_remove_not_perfect_second_latest_pixel_from_array(_paint_or_select_hover_pxl_indexes)) {

                                const pixel_index_to_remove = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size - 2];

                                if(!_select_hover_old_pxls_snapshot.includes(pixel_index_to_remove) && (select_mode === "ADD" || select_mode === "REPLACE")) {

                                    _pxl_indexes_of_selection.delete(pixel_index_to_remove);
                                }

                                _paint_or_select_hover_pxl_indexes.delete(pixel_index_to_remove);
                            }

                        }

                        if(select_mode === "REPLACE") {

                            _pxl_indexes_of_selection.clear();
                        }

                        _paint_or_select_hover_pxl_indexes.forEach((new_drawn_index) => {

                            if(select_mode === "ADD" || select_mode === "REPLACE") {

                                _pxl_indexes_of_selection.add(new_drawn_index);
                            }else {

                                _pxl_indexes_of_selection.delete(new_drawn_index);
                            }

                        });

                        meta.super_state.set_state({
                            _pxls_hovered: pxl_index | 0,
                            _mouse_inside: true,
                            _pxl_indexes_of_selection,
                            _paint_or_select_hover_pxl_indexes,
                            _paint_or_select_hover_actions_latest_index: pxl_index,
                            _last_action_timestamp}).then(() => {

                            this.update_canvas();
                            this._notify_is_something_selected();
                            this._notify_position_change( {x:pos_x, y: pos_y});
                        });

                    }else {

                        const { _s_pxls, _layer_index } = meta.super_state.get_state();

                        meta.super_state.set_state({
                            _pxls_hovered: pxl_index | 0,
                            _mouse_inside: true,
                            _paint_or_select_hover_actions_latest_index: -1,
                            _paint_hover_old_pxls_snapshot: Array.from(_s_pxls[_layer_index]),
                            _select_hover_old_pxls_snapshot: Array.from(_pxl_indexes_of_selection),
                            _paint_or_select_hover_pxl_indexes: new Set()
                        }).then(() => {

                            this.update_canvas();
                            this._notify_position_change({x:pos_x, y: pos_y});
                        });

                    }
                }else if(_pxls_hovered !== pxl_index) {

                    meta.super_state.set_state({
                        _pxls_hovered: pxl_index | 0,
                        _mouse_inside: true
                    }).then(() => {

                        this.update_canvas();
                        this._notify_position_change({x:pos_x, y: pos_y});
                    });

                }
            },
            _notify_position_change (position, date = null) {

                const _notified_position_at = meta.super_state.get_state()._notified_position_at;
                const now = Date.now();

                if ((now - _notified_position_at >= 250 && date === null) || date > _notified_position_at && now - date >= 250) {

                    position = {
                        x: typeof position.x === "undefined" ? -1 : position.x,
                        y: typeof position.y === "undefined" ? -1 : position.y,
                    };


                    meta.super_state.set_state({_notified_position_at: now}).then(() => {

                        notifiers.position(position, meta.sraf.get_state().previous_cpaf_fps);
                    });
                } else if (now < date + 250) {

                    setTimeout(() => {

                        this._notify_position_change({x: position.x, y: position.y}, now);
                    }, 75);
                }
            },
            _handle_canvas_mouse_up(event) {

                let { _paint_or_select_hover_pxl_indexes, tool, _imported_image_pxls, _pxl_indexes_of_selection, select_mode } = meta.super_state.get_state();

                if(_imported_image_pxls.length > 0){

                    meta.super_state.set_state({_imported_image_move_from: [-1, -1]});

                }else if(_paint_or_select_hover_pxl_indexes.size > 0 && tool === "CONTOUR") {

                    let { pxl_current_opacity, pxl_current_color_uint32 } = meta.super_state.get_state();
                    const first_drawn_pixel = [..._paint_or_select_hover_pxl_indexes][0];
                    const last_drawn_pixel = [..._paint_or_select_hover_pxl_indexes][_paint_or_select_hover_pxl_indexes.size-1];
                    const closing_path_line =  meta.super_state.create_shape().from_line(first_drawn_pixel, last_drawn_pixel);
                    _paint_or_select_hover_pxl_indexes = new Set([..._paint_or_select_hover_pxl_indexes, ...closing_path_line]);
                    const pxl_indexes = meta.super_state.create_shape().from_path(_paint_or_select_hover_pxl_indexes);

                    meta.super_state.paint_shape(pxl_indexes, pxl_current_color_uint32, pxl_current_opacity,
                        {
                            _paint_or_select_hover_pxl_indexes: new Set(),
                            _paint_or_select_hover_pxl_indexes_exception: new Set(),
                            _paint_hover_old_pxls_snapshot: [],
                            _last_action_timestamp: Date.now()
                        },
                        this.update_canvas
                    );

                }else if(_paint_or_select_hover_pxl_indexes.size > 0 && tool === "SELECT PATH") {

                    const first_drawn_pixel = _paint_or_select_hover_pxl_indexes[0];
                    const last_drawn_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size-1];
                    const closing_path_line =  meta.super_state.create_shape().from_line(first_drawn_pixel, last_drawn_pixel);
                    _paint_or_select_hover_pxl_indexes = new Set(Array.from(_paint_or_select_hover_pxl_indexes).concat(Array.from(closing_path_line)));
                    const pxl_indexes = meta.super_state.create_shape().from_path(_paint_or_select_hover_pxl_indexes);

                    if(select_mode === "REPLACE") {

                        _pxl_indexes_of_selection.clear();
                    }

                    if(select_mode === "ADD" || select_mode === "REPLACE") {

                        pxl_indexes.forEach(function(pxl) {

                            _pxl_indexes_of_selection.add(pxl);
                        });

                    }else {

                        pxl_indexes.forEach(function(pxl) {

                            _pxl_indexes_of_selection.delete(pxl);
                        });
                    }
                }
            },
            _handle_canvas_mouse_down (event) {

                const { pxl_current_color, pxl_current_color_uint32, hide_canvas_content, tool, pxl_width, pxl_height, pxl_current_opacity, bucket_threshold, select_mode } = meta.super_state.get_state();
                const event_which = event.button + 1;

                let [ pos_x, pos_y ] = [ -1, -1 ];

                if(meta.super_state.get_state()._pxls_hovered !== -1 && event === null) {

                    const hover_pos_x = meta.super_state.get_state()._pxls_hovered % pxl_width;
                    const hover_pos_y = (meta.super_state.get_state()._pxls_hovered - hover_pos_x) / pxl_width;
                    [ pos_x, pos_y ] = [hover_pos_x, hover_pos_y];

                }else if(event) {

                    [ pos_x, pos_y ] = meta.canvas_pos.get_canvas_pos_from_event(event.pageX, event.pageY);
                }

                if(pos_x === -1 || pos_y === -1) { return; }

                let { _shape_index_a, _select_shape_index_a, _shape_index_b, _select_shape_index_b, _pxl_indexes_of_selection, _s_pxls, _s_pxl_colors, _layer_index, hue } = meta.super_state.get_state();
                const pxl_index = (pos_y * pxl_width) + pos_x;
                const pxl_color_index = _s_pxls[_layer_index][pxl_index];

                if (event_which === -1) {

                    meta.super_state.set_state({_pxls_hovered: pxl_index}).then(this.update_canvas);
                    return;
                }

                if(event_which === 3) {

                    _shape_index_a = -1;
                    _select_shape_index_a = -1;
                    _shape_index_b = -1;
                    _select_shape_index_b = -1;
                }

                const { _imported_image_pxls } = meta.super_state.get_state();

                if(!hide_canvas_content) {

                    const pxls_copy_immutable = Array.from(_s_pxls[_layer_index]);
                    let pxls_copy = _s_pxls[_layer_index];
                    let pxl_colors_copy = Array.from(_s_pxl_colors[_layer_index]);
                    const pxl_color = pxl_colors_copy[pxl_color_index];

                    if(_imported_image_pxls.length > 0 && event_which === 1){

                        meta.super_state.set_state({_imported_image_move_from: [pos_x, pos_y]});

                    }else if((event_which === 2) || (tool === "MOVE" && _imported_image_pxls.length <= 0 && (event_which === 1 || event_which === -1))){

                        meta.super_state.set_state({_imported_image_move_from: [event.x, event.y]});

                    }else if(tool === "PICKER" && event_which === 1) {

                        const pixel_color_hex = this.get_pixel_color_from_pos(pos_x, pos_y);
                        this._notify_current_color_change(pixel_color_hex);
                        this._notify_relevant_action_event(event, pixel_color_hex, 1);
                    }else if (tool === "EXCHANGE" && event_which === 1) {

                        const pixel_color_uint32 = _s_pxl_colors[_layer_index][pxl_color_index];
                        this._exchange_pixel_color(pixel_color_uint32, pxl_current_color_uint32);
                        this._notify_relevant_action_event(event, pxl_current_color_uint32, 1);

                    }else if(tool === "LINE" || tool === "RECTANGLE" || tool === "ELLIPSE"){

                        if(_shape_index_a === -1) {

                            if(event_which === 1) {

                                meta.super_state.set_state({_shape_index_a: pxl_index}).then(this.update_canvas);
                            }else {

                                meta.super_state.set_state({_shape_index_a}).then(this.update_canvas);
                            }
                        }else {

                            let pxl_indexes = new Set();
                            switch (tool) {

                                case "LINE":
                                    pxl_indexes = meta.super_state.create_shape().from_line(_shape_index_a, pxl_index);
                                    break;
                                case "RECTANGLE":
                                    pxl_indexes = meta.super_state.create_shape().from_rectangle(_shape_index_a, pxl_index);
                                    break;
                                case "ELLIPSE":
                                    pxl_indexes = meta.super_state.create_shape().from_ellipse(_shape_index_a, pxl_index);
                                    break;
                            }

                            meta.super_state.paint_shape(pxl_indexes, pxl_current_color_uint32, pxl_current_opacity, {_shape_index_a: -1, _last_action_timestamp: Date.now()}, this.update_canvas());
                            this._notify_relevant_action_event(event, "#ffffffff", .6);
                        }


                    }else if(tool === "SELECT LINE" || tool === "SELECT RECTANGLE" || tool === "SELECT ELLIPSE"){

                        if(_select_shape_index_a === -1) {

                            if(event_which === 1) {

                                meta.super_state.set_state({_select_shape_index_a: pxl_index}).then(this.update_canvas);
                            }else {

                                meta.super_state.set_state({_select_shape_index_a}).then(this.update_canvas);
                            }
                        }else {

                            let pixel_indexes =
                                tool === "SELECT LINE" ?
                                    meta.super_state.create_shape().from_line(_select_shape_index_a, pxl_index):
                                    tool === "SELECT RECTANGLE" ?
                                        meta.super_state.create_shape().from_rectangle(_select_shape_index_a, pxl_index):
                                        tool === "SELECT ELLIPSE" ?
                                            meta.super_state.create_shape().from_ellipse(_select_shape_index_a, pxl_index):
                                            meta.super_state.create_shape().from_ellipse(_select_shape_index_a, pxl_index);

                            if(select_mode === "REPLACE") {

                                _pxl_indexes_of_selection.clear();
                            }

                            if(select_mode === "ADD" || select_mode === "REPLACE") {

                                pixel_indexes.forEach(function(pxl){_pxl_indexes_of_selection.add(pxl)});
                            }else {

                                pixel_indexes.forEach(function(pxl){_pxl_indexes_of_selection.delete(pxl)});
                            }
                            pixel_indexes.clear();

                            meta.super_state.set_state({_pxl_indexes_of_selection, _select_shape_index_a: -1, _last_action_timestamp: Date.now()}).then(() => {

                                this.update_canvas();
                                this._notify_is_something_selected();
                            });
                        }


                    }else if((tool === "SELECT PIXEL" || tool === "SELECT PATH") && event_which === 1) {

                        if(select_mode === "REPLACE") {

                            _pxl_indexes_of_selection.clear();
                        }

                        if(select_mode === "ADD" || select_mode === "REPLACE") {

                            _pxl_indexes_of_selection.add(pxl_index);
                        }else {

                            _pxl_indexes_of_selection.delete(pxl_index);
                        }

                        if(tool === "SELECT PIXEL") {

                            // Update pixels list and pixel colours
                            meta.super_state.set_state({ _pxl_indexes_of_selection, _paint_or_select_hover_actions_latest_index: pxl_index, _last_action_timestamp: Date.now()}).then(() => {

                                this.update_canvas();
                                this._notify_is_something_selected();
                            });
                        }else if(tool === "SELECT PATH") {

                            // Update pixels list and pixel colours
                            meta.super_state.set_state({ _pxl_indexes_of_selection, _paint_or_select_hover_actions_latest_index: pxl_index, _last_action_timestamp: 1/0}).then(() => {

                                this.update_canvas();
                                this._notify_is_something_selected();
                            });
                        }


                    }else if((tool === "SET PENCIL MIRROR") && event_which === 1) {

                        meta.super_state.set_state({ _pencil_mirror_index: pxl_index, _last_action_timestamp: Date.now()}).then(() => {

                            this.update_canvas();
                        });

                    }else if((tool === "PENCIL" || tool === "PENCIL PERFECT" || tool === "CONTOUR") && event_which === 1) {

                        const pxl_color_new = meta.color_conversion.blend_colors(pxl_color, pxl_current_color_uint32, pxl_current_opacity, true, false);
                        let new_color_index = pxl_colors_copy.indexOf(pxl_color_new);
                        if(new_color_index === -1){

                            new_color_index = pxl_colors_copy.push(pxl_color_new);
                        }

                        const { pencil_mirror_mode, _pencil_mirror_index } = meta.super_state.get_state();
                        const pencil_mirror_x = _pencil_mirror_index % pxl_width;
                        const pencil_mirror_y = (_pencil_mirror_index - pencil_mirror_x) / pxl_width;

                        let pixel_stack = new Set(Array.of(Array.of(pos_x, pos_y)));

                        if(pencil_mirror_mode === "VERTICAL" || pencil_mirror_mode === "BOTH") {

                            const y = pos_y - (pos_y - pencil_mirror_y) * 2;
                            const x = pos_x;

                            if(x >= 0 && x < pxl_width && y >= 0 && y <= pxl_height) {

                                pixel_stack.add(Array.of(x, y));
                                const index = y * pxl_width + x;

                                const v_pxl_color_index = _s_pxls[_layer_index][index];
                                const v_pxl_color = pxl_colors_copy[v_pxl_color_index];
                                const v_pxl_color_new = meta.color_conversion.blend_colors(v_pxl_color, pxl_current_color_uint32, pxl_current_opacity, true, false);

                                // Eventually add current color to color list
                                let v_pxl_color_new_index = pxl_colors_copy.indexOf(v_pxl_color_new);
                                if(v_pxl_color_new_index === -1){

                                    v_pxl_color_new_index = pxl_colors_copy.push(v_pxl_color_new);
                                }
                                pxls_copy[index] = v_pxl_color_new_index;
                            }
                        }

                        if(pencil_mirror_mode === "HORIZONTAL" || pencil_mirror_mode === "BOTH") {

                            pixel_stack.forEach((pixel_pos) => {

                                const y = pixel_pos[1];
                                const x = pixel_pos[0] - (pixel_pos[0] - pencil_mirror_x) * 2;

                                if(x >= 0 && x < pxl_width && y >= 0 && y <= pxl_height) {

                                    const index = y * pxl_width + x;

                                    const v_pxl_color_index = _s_pxls[_layer_index][index];
                                    const v_pxl_color = pxl_colors_copy[v_pxl_color_index];
                                    const v_pxl_color_new = meta.color_conversion.blend_colors(v_pxl_color, pxl_current_color_uint32, pxl_current_opacity, true, false);

                                    // Eventually add current color to color list
                                    let v_pxl_color_new_index = pxl_colors_copy.indexOf(v_pxl_color_new);
                                    if(v_pxl_color_new_index === -1){

                                        v_pxl_color_new_index = pxl_colors_copy.push(v_pxl_color_new);
                                    }
                                    pxls_copy[index] = v_pxl_color_new_index;
                                }
                            });
                        }

                        // Pixel index Z is of the color index associated
                        pxls_copy[pxl_index] = new_color_index;

                        let ns_pxl_colors = meta.super_state.get_state()._s_pxl_colors;
                        ns_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors_copy);

                        let ns_pxls = meta.super_state.get_state()._s_pxls;
                        ns_pxls[_layer_index] = Array.from(pxls_copy);

                        // Update pixels list and pixel colours
                        meta.super_state.set_state({
                            _s_pxls: ns_pxls,
                            _s_pxl_colors: ns_pxl_colors,
                            _paint_or_select_hover_pxl_indexes: new Set([pxl_index]),
                            _paint_or_select_hover_actions_latest_index: pxl_index,
                            _paint_hover_old_pxls_snapshot: Array.from(meta.super_state.get_state()._s_pxls[_layer_index]),
                            _last_action_timestamp: Date.now()
                        }).then(this.update_canvas);

                    }else if ((tool === "BUCKET" || tool === "HUE BUCKET" || tool === "SELECT COLOR THRESHOLD" || tool === "BORDER") && event_which === 1) {

                        const { _s_pxls, _layer_index } = meta.super_state.get_state();
                        const old_pxls_copy = Array.from(_s_pxls[_layer_index]);

                        const pixel_start = [pos_x, pos_y];
                        const index_color_start = old_pxls_copy[pxl_index];
                        const pxl_color_start = pxl_colors_copy[index_color_start];

                        let interpolated_colors_hue_bucket = [];

                        const [c_s_r, c_s_g, c_s_b, c_s_a] = meta.color_conversion.to_rgba_from_uint32(pxl_color_start);
                        const [c_s_h, c_s_s, c_s_l, c_s_o] = meta.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(c_s_r, c_s_g, c_s_b, c_s_a));
                        const hue_difference_with_color_start = c_s_h < hue ? hue - c_s_h: 360 - c_s_h + hue;

                        let pixel_stack = [pixel_start];
                        let colored_pxl_indexes = new Set();

                        const match_color_start = (index) => {

                            if(bucket_threshold === 0) {

                                return index_color_start === old_pxls_copy[index];
                            }else {

                                if(!colored_pxl_indexes.has(index) && index >= 0 && index < pxl_width * pxl_height) {

                                    const color_a = pxl_color_start || 0;
                                    const color_b = pxl_colors_copy[old_pxls_copy[index]] || 0;

                                    return meta.color_conversion.match_color(color_a, color_b, bucket_threshold);
                                }else {

                                    return false;
                                }
                            }
                        }

                        const color_pixel = (index, paint = true) => {

                            if((!colored_pxl_indexes.has(index) || paint) && index >= 0 && index < pxl_width * pxl_height) {

                                if(tool === "HUE BUCKET") {

                                    if(paint) {

                                        const hue_bucket_old_color = pxl_colors_copy[pxls_copy_immutable[index]];

                                        if(typeof interpolated_colors_hue_bucket[hue_bucket_old_color] === "undefined") {

                                            let [r, g, b, a] = meta.color_conversion.to_rgba_from_uint32(hue_bucket_old_color);
                                            let [h, s, l, o] = meta.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(r, g, b, a));

                                            h = (h + hue_difference_with_color_start) % 360;

                                            [r, g, b, a] = meta.color_conversion.to_rgba_from_hsla(Array.of(h, s, l, o));
                                            const hue_bucket_new_color = meta.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(r, g, b, a));

                                            // Eventually add current color to color list
                                            if(!pxl_colors_copy.includes(hue_bucket_new_color)){

                                                pxl_colors_copy.push(hue_bucket_new_color);
                                            }
                                            let hue_bucket_new_color_index = pxl_colors_copy.indexOf(hue_bucket_new_color);
                                            if(hue_bucket_new_color_index === -1){

                                                hue_bucket_new_color_index = pxl_colors_copy.push(hue_bucket_new_color);
                                            }

                                            interpolated_colors_hue_bucket[hue_bucket_old_color] = hue_bucket_new_color_index;
                                            pxls_copy[index] = hue_bucket_new_color_index;

                                        }else {

                                            pxls_copy[index] = interpolated_colors_hue_bucket[hue_bucket_old_color];
                                        }
                                    }

                                    colored_pxl_indexes.add(index);

                                }else if(tool === "BUCKET" || tool === "BORDER"){

                                    if(paint) {

                                        const current_pxl_new_color = meta.color_conversion.blend_colors(pxl_colors_copy[pxls_copy[index]], pxl_current_color_uint32, pxl_current_opacity, false, false);
                                        let current_pxl_new_color_index = pxl_colors_copy.indexOf(current_pxl_new_color);
                                        if(current_pxl_new_color_index === -1){

                                            current_pxl_new_color_index = pxl_colors_copy.push(current_pxl_new_color);
                                        }
                                        pxls_copy[index] = current_pxl_new_color_index;
                                    }

                                    colored_pxl_indexes.add(index);

                                }else if(tool === "SELECT COLOR THRESHOLD"){

                                    colored_pxl_indexes.add(index);
                                }
                            }
                        };

                        let reach_left = false;
                        let reach_right = false;

                        while(pixel_stack.length) {

                            // Get current pixel position
                            let [x, y] = pixel_stack.pop();

                            let current_pxl_index = (y * pxl_width) + x;

                            // Go up as long as the color matches and are inside the canvas
                            while (y >= 0 && match_color_start(current_pxl_index)) {

                                current_pxl_index -= pxl_width;
                                y--;
                            }

                            current_pxl_index += pxl_width;
                            y++;

                            reach_left = false;
                            reach_right = false;

                            // Go down as long as the color matches and in inside the canvas
                            while (y < pxl_height && match_color_start(current_pxl_index)) {

                                y++;
                                if(tool === "BORDER") {

                                    color_pixel(current_pxl_index, false);
                                }else {

                                    color_pixel(current_pxl_index, true);
                                }

                                if (x > 0) {

                                    if (match_color_start(current_pxl_index - 1)) {

                                        if (!reach_left) {

                                            // Add pixel to stack
                                            pixel_stack.push([x - 1, y - 1]);
                                            reach_left = true;
                                        }

                                    } else if (reach_left) {

                                        reach_left = false;
                                    }
                                }

                                if (x + 1 < pxl_width) {

                                    if (match_color_start(current_pxl_index + 1)) {

                                        if (!reach_right) {

                                            // Add pixel to stack
                                            pixel_stack.push([x + 1, y - 1]);
                                            reach_right = true;
                                        }

                                    } else if (reach_right) {

                                        reach_right = false;
                                    }
                                }

                                current_pxl_index += pxl_width;

                            }

                        }

                        if(tool === "BORDER") {

                            this.super_state.create_shape().from_border(colored_pxl_indexes).forEach((pxl_index) => {

                                color_pixel(pxl_index, true);
                            });

                            let {_s_pxls, _s_pxl_colors} = meta.super_state.get_state();
                            [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = meta.color_conversion.clean_duplicate_colors(pxls_copy, pxl_colors_copy);


                            // Update pixels list and pixel colours
                            meta.super_state.set_state({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}).then(this.update_canvas);

                        }else if(tool === "SELECT COLOR THRESHOLD") {

                            if(select_mode === "REPLACE") {

                                _pxl_indexes_of_selection.clear();
                            }

                            colored_pxl_indexes.forEach((pxl_index) => {

                                if(select_mode === "ADD" || select_mode === "REPLACE") {

                                    _pxl_indexes_of_selection.add(pxl_index);
                                }else {

                                    _pxl_indexes_of_selection.delete(pxl_index);
                                }
                            });

                            meta.super_state.set_state({_pxl_indexes_of_selection, _last_action_timestamp: Date.now()}).then(() => {

                                this.update_canvas();
                                this._notify_is_something_selected();
                            });

                        }else if(tool === "BUCKET" || tool === "HUE BUCKET"){

                            let {_s_pxls, _s_pxl_colors} = this.super_state.get_state();
                            [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = this.color_conversion.clean_duplicate_colors(pxls_copy, pxl_colors_copy);

                            // Update pixels list and pixel colours
                            meta.super_state.set_state({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}).then(() => {

                                this.update_canvas();
                                this._notify_relevant_action_event(event, pxl_current_color, 1);
                            });

                        }

                    }else if ((tool === "SELECT COLOR") && event_which === 1) {

                        const { _s_pxls } = meta.super_state.get_state();
                        const index_color_start = _s_pxls[_layer_index][pxl_index];

                        if(select_mode === "REPLACE") {

                            _pxl_indexes_of_selection.clear();
                        }

                        _s_pxls[_layer_index].forEach((pxl, pxl_index) => {

                            if(pxl === index_color_start) {

                                if(select_mode === "ADD" || select_mode === "REPLACE") {

                                    _pxl_indexes_of_selection.add(pxl_index);
                                }else {

                                    _pxl_indexes_of_selection.delete(pxl_index);
                                }
                            }
                        });

                        meta.super_state.set_state({_pxl_indexes_of_selection, _last_action_timestamp: Date.now()}).then(() => {

                            this.update_canvas();
                            this._notify_is_something_selected();
                        });

                    }
                }
            },
            _notify_is_something_selected() {

                const _pxl_indexes_of_selection = meta.super_state.get_state()._pxl_indexes_of_selection;

                if(Boolean(meta.super_state.get_state()._previous_pxl_indexes_of_selection.size) !== Boolean(_pxl_indexes_of_selection.size)) {

                    meta.super_state.set_state({
                        _is_something_selected: Boolean(_pxl_indexes_of_selection.size),
                        _previous_pxl_indexes_of_selection: new Set(_pxl_indexes_of_selection)
                    }).then(() => {

                        notifiers.selection(Boolean(_pxl_indexes_of_selection.size));
                    });
                }
            },
            get_pixel_color_from_pos(x, y) {

                const { pxl_height, pxl_width, _s_pxls, _s_pxl_colors, _layers } = meta.super_state.get_state();

                const pxl_index = y * pxl_width + x;

                if(x > pxl_width || y > pxl_height || x < 0 || y < 0) {

                    return "#00000000";
                }

                let layer_pixel_colors = [];
                let start_i = -1;
                start_i++;

                for (let i = _s_pxl_colors.length - 1; i >= 0; i--) {

                    const layer_pixel_color = _s_pxl_colors[i][_s_pxls[i][pxl_index]];
                    layer_pixel_colors[i] = layer_pixel_color;
                    const [r, g, b, a] = meta.color_conversion.to_rgba_from_uint32(layer_pixel_color);

                    if(a === 255) {

                        start_i = i;
                        break;
                    }

                }

                let pixel_color_uint32 = 0;

                for (let i = start_i; i < _s_pxl_colors.length ; i++) {

                    if(!_layers[i].hidden) {

                        const layer_pixel_color = layer_pixel_colors[i];

                        pixel_color_uint32 = meta.color_conversion.blend_colors(pixel_color_uint32, layer_pixel_color, parseFloat(_layers[i].opacity), false, false);
                    }
                }

                return meta.color_conversion.to_hex_from_uint32(pixel_color_uint32);
            },
            _notify_current_color_change (color, event = null) {

                color = meta.color_conversion.format_hex_color(color);
                if(notifiers.color) {

                    notifiers.color(color, event);
                } else {

                    meta.super_state.set_state({pxl_current_color: color});
                }
            },
            _notify_relevant_action_event (event, color = "#ffffffff", opacity = 1) {

                if(notifiers.action) {

                    notifiers.action(event, meta.color_conversion.format_hex_color(color), opacity);
                }
            }
        }
    }
}

module.exports = SuperMasterMeta;