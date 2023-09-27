import {SetFixed} from "@asaitama/boolean-array";
import SIMDope from "simdope";
import {Layer} from "../../../utils/Layer";
const simdops = SIMDope.simdops;
const SIMDopeColor = SIMDope.SIMDopeColor;

const SuperMasterMeta = {
    init(super_state, super_canvas, super_blend, canvas_pos, color_conversion, sraf){
        "use strict";

        let {clamp_uint32, plus_uint, int_less, uint_equal, uint_not_equal, clamp_uint8 } = simdops;
        let state = {
            index_changes: new Uint32Array(0),
            color_changes: new Uint32Array(0),
            _pxl_indexes_updated: new SetFixed(0),
            _pxl_indexes_of_selection_drawn: new SetFixed(0),
            _pxl_indexes_of_old_shape: new SetFixed(0),
            _old_pxls_hovered: new SetFixed(0),
            _old_selection_pair_highlight: true,
            _old_layers_string_id: "",
            _old_pxl_width: 0,
            _old_pxl_height: 0,
            _last_paint_timestamp: 0,
            _is_there_new_dimension: true,
            _did_hide_canvas_content: false,
            _previous_imported_image_pxls_positioned_keyset: new SetFixed(0)
        };

        let boolean_work_variables = {
            bool_is_resize: false,
            bool_new_hover: false,
            bool_old_hover: false,
            bool_new_shape: false,
            bool_old_shape: false,
            bool_new_selection: false,
            bool_old_selection: false,
            bool_new_import: false,
            bool_old_import: false,
            bool_new_pixel: false,
            bool_new_highlight: false,
        };

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

        let shape_creator = meta.super_state.create_shape();
        let full_pxls = new Uint32Array(0);
        let old_full_pxls = new Uint32Array(0);

        let key = "";
        let requested_at = 0;
        let requested_a = 0;
        let force_update = true;
        let is_there_new_dimension = false;
        let is_there_different_dimension = false;
        let render_canvas = undefined;
        let sizes = meta.canvas_pos.get_state().sizes;

        let update_canvas_promise = function(resolve0, reject0, force_update, requested_at) {
            "use strict";

            if(state._last_paint_timestamp >= requested_at){
                resolve0();
            }else {

                let {
                    _old_pxl_width,
                    _old_pxl_height,
                } = state;

                // Importing state variables
                let {
                    pxl_width,
                    pxl_height,
                } = meta.super_state.get_state();

                // Only operate on canvas context if existing
                if (meta.super_canvas.ok()) {

                    sizes = meta.canvas_pos.get_state().sizes;
                    let is_there_new_dimension = Boolean(Boolean(parseInt(_old_pxl_width) !== parseInt(pxl_width)) || Boolean(parseInt(_old_pxl_height) !== parseInt(pxl_height)));
                    let is_there_different_dimension = parseInt(sizes.width) !== parseInt(pxl_width) || parseInt(sizes.height) !== parseInt(pxl_height);

                    // If there is different dimension or if there are new dimension now
                    if(is_there_different_dimension || is_there_new_dimension) {

                        // Update dimension
                        meta.super_state.set_state({
                            pxl_width: parseInt(sizes.width),
                            pxl_height: parseInt(sizes.height)
                        });
                        // Tell there were new dimension
                        state._is_there_new_dimension = true;
                        shape_creator.update_state();

                        // Update html for css animation
                        notifiers.update(false, false).then(function () {
                            setTimeout(() => {
                                state._is_there_new_dimension = false;
                                notifiers.update(false, false);
                            }, 500);
                            render_canvas(is_there_new_dimension, is_there_different_dimension, force_update, requested_at).catch(function (){
                                setTimeout(update_canvas_promise, 5, resolve0, reject0, force_update, requested_at);
                            });
                        }).catch(function () {
                            setTimeout(update_canvas_promise, 10, resolve0, reject0, force_update, requested_at);
                        });
                    }else {

                        render_canvas(is_there_new_dimension, is_there_different_dimension, force_update, requested_at).catch(function (){
                            setTimeout(update_canvas_promise, 5, resolve0, reject0, force_update, requested_at);
                        });
                    }


                }else {

                    setTimeout(update_canvas_promise, 15, resolve0, reject0, force_update, requested_at);
                }
            }
        }


        let _pxl_indexes_of_current_shape = new SetFixed(sizes.width*sizes.height);
        let render_binding = meta.super_canvas.render.bind(meta.super_canvas);
        let meta_super_blend = meta.super_blend;
        let {
            bool_is_resize,
            bool_new_hover,
            bool_old_hover,
            bool_new_shape,
            bool_old_shape,
            bool_new_selection,
            bool_old_selection,
            bool_new_import,
            bool_old_import,
            bool_new_pixel,
            bool_new_highlight
        } = boolean_work_variables;

        let render_canvas_promise = function(resolve0, reject0, is_there_new_dimension, is_there_different_dimension, force_update, requested_at) {
            "use strict";
            if(state._last_paint_timestamp >= requested_at){
                resolve0();
            }else {

                let {
                    _is_there_new_dimension,
                    _did_hide_canvas_content,
                    _old_pxls_hovered,
                    _old_layers_string_id,
                    _pxl_indexes_of_old_shape,
                    _pxl_indexes_of_selection_drawn,
                    _previous_imported_image_pxls_positioned_keyset,
                    _old_selection_pair_highlight
                } = state;

                // Importing state variables
                let {
                    _s_layers,
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
                    _paint_or_select_hover_pxl_indexes,
                    _selection_pair_highlight
                } = meta.super_state.get_state();

                const {
                    imported_image_pxls_positioned,
                    imported_image_pxl_colors,
                    imported_image_pxls_positioned_keyset,
                    image_imported_resizer_index
                } = meta.super_state.get_imported_image_data();

                const with_imported_image = imported_image_pxls_positioned_keyset.size > 0;
                const layers_length = _s_layers.length | 0;
                const full_pxls_length = _s_layers[0].indexes.length;
                var length_l = layers_length + (with_imported_image ? 1 : 0);
                var size_l = length_l - 1;

                const old_layers_string_id = "" + Array.from(_layers).map(function (l, i) {
                    return "" + i + "-id-" + l.id + "-v-" + (Boolean(l.hidden || hide_canvas_content) ? "0" : "1") + "-o-" + parseInt(l.opacity * 255).toString(16)+"-w-"+l.width+"-h-"+l.height+"-end";
                }).join("+");

                const has_layers_visibility_or_opacity_changed = (_old_layers_string_id !== old_layers_string_id);
                const clear_canvas = (_did_hide_canvas_content !== hide_canvas_content) || has_layers_visibility_or_opacity_changed || _is_there_new_dimension || is_there_new_dimension || force_update;

                const layers_opacity_255 = Uint8Array.from(_layers.map(function (l) {
                    return parseInt(Boolean(l.hidden || hide_canvas_content) ? 0 : Math.round(parseFloat(l.opacity) * 255));
                }).concat(with_imported_image ? [196]: []));

                if (Boolean(tool === "LINE" || tool === "RECTANGLE" || tool === "ELLIPSE" || tool === "TRIANGLE") && _shape_index_a !== - 1 && _pxls_hovered !== - 1) {

                    _pxl_indexes_of_current_shape =
                        tool === "LINE" ?
                            shape_creator.from_line(_shape_index_a, _pxls_hovered, _pxl_indexes_of_current_shape) :
                            tool === "RECTANGLE" ?
                                shape_creator.from_rectangle(_shape_index_a, _pxls_hovered, _pxl_indexes_of_current_shape) :
                                tool === "ELLIPSE" ?
                                    shape_creator.from_ellipse(_shape_index_a, _pxls_hovered, _pxl_indexes_of_current_shape) :
                                    _pxl_indexes_of_current_shape;

                } else if (Boolean(tool === "SELECT LINE" || tool === "SELECT RECTANGLE" || tool === "SELECT ELLIPSE") && _select_shape_index_a !== - 1 && _pxls_hovered !== - 1) {

                    _pxl_indexes_of_current_shape =
                        tool === "SELECT LINE" ?
                            shape_creator.from_line(_select_shape_index_a, _pxls_hovered, _pxl_indexes_of_current_shape) :
                            tool === "SELECT RECTANGLE" ?
                                shape_creator.from_rectangle(_select_shape_index_a, _pxls_hovered, _pxl_indexes_of_current_shape) :
                                tool === "SELECT ELLIPSE" ?
                                    shape_creator.from_ellipse(_select_shape_index_a, _pxls_hovered, _pxl_indexes_of_current_shape) :
                                    _pxl_indexes_of_current_shape;

                } else if (Boolean(tool === "SELECT PATH" || tool === "CONTOUR") && _paint_or_select_hover_pxl_indexes.size > 0) {

                    const first_drawn_pixel = _paint_or_select_hover_pxl_indexes[0];
                    const last_drawn_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size - 1];
                    const closing_path_line = shape_creator.from_line(first_drawn_pixel, last_drawn_pixel);

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

                let pos_x = 0;
                let pos_y = 0;
                let i = 0;
                let index = 0;
                let _current_layer = _s_layers[_layer_index];

                bool_new_highlight = _selection_pair_highlight !== _old_selection_pair_highlight;

                meta_super_blend.update(length_l|0, full_pxls_length | 0, layers_opacity_255, _s_layers);

                var meta_super_blend_for = meta_super_blend.for.bind(meta_super_blend);
                var meta_super_blend_next = meta_super_blend.next.bind(meta_super_blend);
                var meta_super_blend_stack = meta_super_blend.stack.bind(meta_super_blend);

                var old_pxls_hovered_has = _old_pxls_hovered.has.bind(_old_pxls_hovered);
                var pxl_indexes_of_current_shape_has = _pxl_indexes_of_current_shape.has.bind(_pxl_indexes_of_current_shape);
                var pxl_indexes_of_old_shape_has = _pxl_indexes_of_old_shape.has.bind(_pxl_indexes_of_old_shape);
                var pxl_indexes_of_selection_has = _pxl_indexes_of_selection.has.bind(_pxl_indexes_of_selection);
                var pxl_indexes_of_selection_drawn_has = _pxl_indexes_of_selection_drawn.has.bind(_pxl_indexes_of_selection_drawn);
                var imported_image_pxls_positioned_keyset_has = imported_image_pxls_positioned_keyset.has.bind(imported_image_pxls_positioned_keyset);
                var previous_imported_image_pxls_positioned_keyset_has = _previous_imported_image_pxls_positioned_keyset.has.bind(_previous_imported_image_pxls_positioned_keyset);
                var current_layer_changes_has = _current_layer.changes_has.bind(_current_layer);

                for (; int_less(index, full_pxls_length); index = plus_uint(index, 1)) {

                    bool_is_resize = uint_equal(image_imported_resizer_index, (index | 0) >>> 0);
                    bool_new_hover = uint_equal(_pxls_hovered, (index | 0) >>> 0);
                    bool_old_hover = old_pxls_hovered_has((index | 0) >>> 0);
                    bool_new_shape = pxl_indexes_of_current_shape_has((index | 0) >>> 0);
                    bool_old_shape = pxl_indexes_of_old_shape_has((index | 0) >>> 0);
                    bool_new_selection = pxl_indexes_of_selection_has((index | 0) >>> 0);
                    bool_old_selection = pxl_indexes_of_selection_drawn_has((index | 0) >>> 0);
                    bool_new_import = imported_image_pxls_positioned_keyset_has((index | 0) >>> 0);
                    bool_old_import = previous_imported_image_pxls_positioned_keyset_has((index | 0) >>> 0);
                    bool_new_pixel = current_layer_changes_has((index | 0) >>> 0);

                    if (
                        clear_canvas ||
                        bool_new_pixel ||
                        (bool_old_hover != bool_new_hover) ||
                        (bool_old_shape != bool_new_shape) ||
                        (bool_old_selection != bool_new_selection) ||
                        (bool_old_selection && bool_new_highlight) ||
                        bool_old_import ||
                        bool_new_import ||
                        bool_is_resize
                    ) {

                        if (bool_new_hover) {

                            meta_super_blend_for((index | 0) >>> 0, 96);

                        } else if (bool_new_shape) {

                            meta_super_blend_for((index | 0) >>> 0, 128);
                        } else if (bool_new_selection) {

                            pos_x = (index % pxl_width) | 0;
                            pos_y = ((index - pos_x) / pxl_width) | 0;
                            meta_super_blend_for((index | 0) >>> 0, 72 + ((((pos_x + pos_y + (_selection_pair_highlight ? 1 : 0) | 0) & 1) | 0) * 48) | 0);
                        } else if (bool_is_resize) {

                            meta_super_blend_for((index | 0) >>> 0, 192);
                        } else {

                            meta_super_blend_for((index | 0) >>> 0, 0);

                        }

                        if(bool_new_import){
                            meta_super_blend_stack((size_l | 0) >>> 0, (imported_image_pxl_colors[imported_image_pxls_positioned[(index | 0) >>> 0] | 0] | 0) >>> 0);
                        }

                        meta_super_blend_next();
                    }
                }

                function handle_reject0(){
                    setTimeout(update_canvas_promise, 5, resolve0, reject0, force_update, requested_at);
                }

                meta_super_blend.blend(false, false).then(function (params) {
                    "use strict";
                    if (params[0].length > 0 || clear_canvas || is_there_new_dimension || force_update) {

                        meta.super_canvas.pile(params[0], params[1]).then(function () {
                            "use strict";
                            meta.super_canvas.unpile(pxl_width, pxl_height).then(function () {
                                "use strict";

                                meta.super_canvas.prender().then(function () {
                                    "use strict";
                                    meta.sraf.run_frame(function () {
                                        "use strict";
                                        _old_pxls_hovered.clearAndBulkAdd(Uint32Array.of(image_imported_resizer_index, _pxls_hovered));
                                        _current_layer.clear_changes();
                                        _pxl_indexes_of_selection_drawn.setFromSetFixed(_pxl_indexes_of_selection);
                                        _pxl_indexes_of_old_shape.setFromSetFixed(_pxl_indexes_of_current_shape);
                                        _previous_imported_image_pxls_positioned_keyset.setFromSetFixed(imported_image_pxls_positioned_keyset);
                                        _pxl_indexes_of_current_shape.clear();
                                        state._old_selection_pair_highlight = _selection_pair_highlight;
                                        state._old_layers_string_id = ""+old_layers_string_id;
                                        state._did_hide_canvas_content = Boolean(hide_canvas_content);
                                        state._old_pxl_width = parseInt(pxl_width);
                                        state._old_pxl_height = parseInt(pxl_height);
                                        state._last_paint_timestamp = +requested_at;
                                        return render_binding();
                                    }, false, clear_canvas || is_there_new_dimension || force_update,  Date.now(), "render").then(resolve0).catch(handle_reject0);
                                }).catch(handle_reject0);

                            }).catch(handle_reject0);
                        }).catch(handle_reject0);
                    } else {

                        resolve0();
                    }
                });
            }
        }

        return {
            get: function() {
                return state;
            },
            set: function(new_props) {
                for (key in new_props) {
                    state[key] = new_props[key];
                }
                return Promise.resolve();
            },
            set_notifiers: function(callback_function_position = function(){}, callback_function_selection = function(){}, callback_function_color = function(){}, callback_function_action = function(){}, callback_function_update = function (){}) {

                notifiers = {
                    position: callback_function_position,
                    selection: callback_function_selection,
                    color: callback_function_color,
                    action: callback_function_action,
                    update: callback_function_update
                };
            },
            is_there_new_dimension: function() {
                "use strict";
                return state._is_there_new_dimension && true;
            },
            update_canvas: function(force_update, requested_at) {
                "use strict";
                force_update = force_update || false;
                requested_at = requested_at || Date.now();
                if(typeof render_canvas == "undefined" && Boolean(this)){
                    render_canvas = this.render_canvas;
                }
                return new Promise(update_canvas_promise);
            },
            render_canvas: function (is_there_new_dimension, is_there_different_dimension, force_update, requested_at) {
                "use strict";
                is_there_new_dimension = is_there_new_dimension;
                is_there_different_dimension = is_there_different_dimension;
                force_update = force_update;
                requested_at = requested_at;
                return new Promise(render_canvas_promise);
            },
            _should_remove_not_perfect_second_latest_pixel_from_array(_paint_or_select_hover_pxl_indexes) {
                "use strict";
                const pxl_width = meta.super_state.get_state().pxl_width;

                if(_paint_or_select_hover_pxl_indexes.size >= 3) {

                    const first_latest_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size - 1] | 0;
                    const first_latest_pixel_x = first_latest_pixel % pxl_width | 0;
                    const first_latest_pixel_y = (first_latest_pixel - first_latest_pixel_x) / pxl_width;

                    const second_latest_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size - 2] | 0;
                    const second_latest_pixel_x = second_latest_pixel % pxl_width | 0;
                    const second_latest_pixel_y = (second_latest_pixel - second_latest_pixel_x) / pxl_width;

                    const third_latest_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size - 3] | 0;
                    const third_latest_pixel_x = third_latest_pixel % pxl_width | 0;
                    const third_latest_pixel_y = (third_latest_pixel - third_latest_pixel_x) / pxl_width;

                    const first_third_absolute_difference_x = Math.abs(first_latest_pixel_x - third_latest_pixel_x) | 0;
                    const first_third_absolute_difference_y = Math.abs(first_latest_pixel_y - third_latest_pixel_y) | 0;

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
                let { _pxl_indexes_of_selection, _imported_image_pxls, pxl_current_color_uint32, tool, pxl_width, pxl_height, _pxls_hovered, hide_canvas_content, _is_on_resize_element, _paint_or_select_hover_pxl_indexes, _paint_hover_old_pxls_snapshot, _last_action_timestamp, _paint_or_select_hover_pxl_indexes_exception, _paint_or_select_hover_actions_latest_index, _s_layers, _layer_index, pxl_current_opacity,  _select_hover_old_pxls_snapshot, select_mode  } = meta.super_state.get_state();
                const { event_button, mouse_down } = meta.canvas_pos.get_pointer_state();
                const event_which = event_button+1|0;

                const [ pos_x, pos_y ] = meta.canvas_pos.get_canvas_pos_from_event(event.pageX, event.pageY);
                const pxl_index = (pos_y * pxl_width) + pos_x | 0;

                if((pos_x|0) == -1 || (pos_y|0) == -1) {
                    this._notify_position_change({x: pos_x, y: pos_y});

                }else if((pxl_index|0) != (_pxls_hovered|0) && !hide_canvas_content) {

                    if(_imported_image_pxls.length > 0){

                        let { _imported_image_move_from, _imported_image_scale_delta_x, _imported_image_scale_delta_y, _imported_image_start_x, _imported_image_start_y, _imported_image_width, _imported_image_height } = meta.super_state.get_state();
                        const _imported_image_final_width = _imported_image_width + _imported_image_scale_delta_x;
                        const _imported_image_final_height = _imported_image_height + _imported_image_scale_delta_y;
                        const image_imported_resizer_index = (_imported_image_start_x + _imported_image_final_width) + (_imported_image_start_y + _imported_image_final_height) * pxl_width;
                        const is_on_resize_element = (pxl_index|0) == (image_imported_resizer_index|0) || (_pxls_hovered|0) == (image_imported_resizer_index|0);
                        let _new_imported_image_scale_delta_x = 0;
                        let _new_imported_image_scale_delta_y = 0;

                        const x_difference = pos_x - _imported_image_move_from[0];
                        const y_difference = pos_y - _imported_image_move_from[1];
                        _imported_image_move_from = Array.of(pos_x, pos_y);

                        if(event_which === 1 && mouse_down) {

                            if(!is_on_resize_element && !_is_on_resize_element) {

                                _imported_image_start_x = _imported_image_start_x + x_difference | 0;
                                _imported_image_start_x = (_imported_image_start_x < -_imported_image_final_width) ? -_imported_image_final_width: _imported_image_start_x | 0;
                                _imported_image_start_x = (_imported_image_start_x >= pxl_width) ? pxl_width: _imported_image_start_x  | 0;
                                _imported_image_start_y = _imported_image_start_y + y_difference | 0;
                                _imported_image_start_y = (_imported_image_start_y < -_imported_image_final_height) ? -_imported_image_final_height: _imported_image_start_y  | 0;
                                _imported_image_start_y = (_imported_image_start_y >= pxl_height) ? pxl_height: _imported_image_start_y | 0;

                                meta.super_state.set_state({
                                    _pxls_hovered: pxl_index | 0,
                                    _is_on_resize_element: is_on_resize_element,
                                    _mouse_inside: true,
                                    _imported_image_start_x,
                                    _imported_image_start_y,
                                    _imported_image_move_from: Array.of(
                                        _imported_image_move_from[0],
                                        _imported_image_move_from[1]
                                    )
                                }).then(() => {

                                    this.update_canvas();
                                    this._notify_position_change( {x:pos_x, y: pos_y});
                                });
                            }else{

                                _new_imported_image_scale_delta_x = _imported_image_scale_delta_x + x_difference | 0;
                                _new_imported_image_scale_delta_y = _imported_image_scale_delta_y + y_difference | 0;
                                _new_imported_image_scale_delta_x = Math.max(_new_imported_image_scale_delta_x, -(_imported_image_width - 1)) | 0;
                                _new_imported_image_scale_delta_y = Math.max(_new_imported_image_scale_delta_y, -(_imported_image_height - 1)) | 0;
                                _imported_image_scale_delta_x = _new_imported_image_scale_delta_x | 0;
                                _imported_image_scale_delta_y = _new_imported_image_scale_delta_y | 0;

                                meta.super_state.set_state({
                                    _pxls_hovered: pxl_index | 0,
                                    _is_on_resize_element: is_on_resize_element,
                                    _mouse_inside: true,
                                    _imported_image_scale_delta_x,
                                    _imported_image_scale_delta_y,
                                    _imported_image_move_from: Array.of(
                                        _imported_image_move_from[0],
                                        _imported_image_move_from[1]
                                    )
                                }).then(() => {

                                    this.update_canvas();
                                    this._notify_position_change( {x:pos_x, y: pos_y});
                                });
                            }


                        }else {

                            meta.super_state.set_state({
                                _pxls_hovered: pxl_index | 0,
                                _is_on_resize_element: is_on_resize_element,
                                _mouse_inside: true
                            }).then(() => {

                                this._notify_position_change( {x:pos_x, y: pos_y});
                            });
                        }

                    }else if((tool === "PENCIL" || tool === "PENCIL PERFECT" || tool === "CONTOUR") && event_which === 1 && mouse_down){

                        // PAINT HACK: compute the pixel between the previous and latest paint by hover pixel (Bresenham’s Line Algorithm)
                        if(_paint_or_select_hover_actions_latest_index === -1) {
                            _paint_or_select_hover_actions_latest_index = pxl_index | 0;
                        }

                        _paint_or_select_hover_pxl_indexes = shape_creator.from_line(_paint_or_select_hover_actions_latest_index, pxl_index, _paint_or_select_hover_pxl_indexes);

                        const { pencil_mirror_mode, _pencil_mirror_index } = meta.super_state.get_state();

                        const pencil_mirror_x = _pencil_mirror_index % pxl_width;
                        const pencil_mirror_y = (_pencil_mirror_index - pencil_mirror_x) / pxl_width;

                        if(tool === "CONTOUR") {

                            _last_action_timestamp = 1 / 0;

                        }else if(tool === "PENCIL"){

                            _last_action_timestamp = Date.now();

                        }else if(tool === "PENCIL PERFECT") {

                            _last_action_timestamp = Date.now();

                            _paint_or_select_hover_pxl_indexes_exception.forEach(function(ie) {

                                _paint_or_select_hover_pxl_indexes.delete(ie);
                            });

                            if(this._should_remove_not_perfect_second_latest_pixel_from_array(_paint_or_select_hover_pxl_indexes.indexes)) {

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

                                    _s_layers[_layer_index].set_uint32(second_latest_pixel_drawn, _paint_hover_old_pxls_snapshot[second_latest_pixel_drawn]);
                                });
                            }
                        }

                        if(pencil_mirror_mode !== "NONE") {

                            const _paint_or_select_hover_pxl_indexes_copy = new SetFixed(_paint_or_select_hover_pxl_indexes.indexes);
                            let pixel_stack = new Set(
                                _paint_or_select_hover_pxl_indexes
                                    .filter(function (index){return !_paint_or_select_hover_pxl_indexes_copy.has(index|0) && !_paint_or_select_hover_pxl_indexes_exception.has(index|0);})
                                    .map(function (index){
                                        var x = index % pxl_width|0, y = (index - x) / pxl_width|0;
                                        return [x|0, y|0];
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

                            let pixel_stack_flat = new SetFixed(pxl_width*pxl_height)
                            pixel_stack.forEach((pixel_pos) => {

                                var y = pixel_pos[1], x = pixel_pos[0];
                                pixel_stack_flat.add(y*pxl_width+x|0);
                            });

                            meta.super_state.paint_shape(pixel_stack_flat, pxl_current_color_uint32, pxl_current_opacity, {
                                _pxls_hovered: pxl_index | 0,
                                _mouse_inside: true,
                                _paint_or_select_hover_pxl_indexes,
                                _paint_or_select_hover_pxl_indexes_exception,
                                _paint_or_select_hover_actions_latest_index: pxl_index | 0,
                                _last_action_timestamp
                            },() => {this.update_canvas();});
                        }else {

                            meta.super_state.paint_shape(_paint_or_select_hover_pxl_indexes.indexes, pxl_current_color_uint32, pxl_current_opacity, {
                                _pxls_hovered: pxl_index | 0,
                                _mouse_inside: true,
                                _paint_or_select_hover_pxl_indexes,
                                _paint_or_select_hover_pxl_indexes_exception,
                                _paint_or_select_hover_actions_latest_index: pxl_index | 0,
                                _last_action_timestamp
                            }, () => {this.update_canvas();});
                        }

                        this._notify_position_change({x:pos_x|0, y: pos_y|0});

                    }else if((tool === "SELECT PIXEL" || tool === "SELECT PIXEL PERFECT" || tool === "SELECT PATH") && event_which === 1 && mouse_down) {

                        // PAINT HACK: compute the pixel between the previous and latest paint by hover pixel (Bresenham’s Line Algorithm)
                        if(_paint_or_select_hover_actions_latest_index === -1) {

                            _paint_or_select_hover_actions_latest_index = pxl_index;
                        }

                        const new_drawn_pxl_indexes = shape_creator.from_line(_paint_or_select_hover_actions_latest_index, pxl_index);

                        if(tool === "SELECT PATH") {

                            _last_action_timestamp = 1/0;
                            new_drawn_pxl_indexes.forEach(function (i){
                                _paint_or_select_hover_pxl_indexes.add(i|0);
                            });

                        }else if(tool === "SELECT PIXEL"){

                            _last_action_timestamp = Date.now();
                            new_drawn_pxl_indexes.forEach(function (i){
                                _paint_or_select_hover_pxl_indexes.add(i|0);
                            });

                        }else if(tool === "SELECT PIXEL PERFECT") {

                            _last_action_timestamp = Date.now();

                            new_drawn_pxl_indexes.forEach(function (i){
                                _paint_or_select_hover_pxl_indexes.add(i|0);
                            });

                            const _paint_or_select_hover_pxl_indexes_indexes = _paint_or_select_hover_pxl_indexes.indexes;
                            if(this._should_remove_not_perfect_second_latest_pixel_from_array(_paint_or_select_hover_pxl_indexes_indexes)) {

                                const pixel_index_to_remove = _paint_or_select_hover_pxl_indexes_indexes[_paint_or_select_hover_pxl_indexes_indexes.length - 2];

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

                        const { _s_layers, _layer_index } = meta.super_state.get_state();

                        _paint_or_select_hover_pxl_indexes.clear();
                        meta.super_state.set_state({
                            _pxls_hovered: pxl_index | 0,
                            _mouse_inside: true,
                            _paint_or_select_hover_actions_latest_index: -1,
                            _paint_hover_old_pxls_snapshot: _s_layers[_layer_index].indexes_copy,
                            _select_hover_old_pxls_snapshot: new SetFixed(_pxl_indexes_of_selection.indexes),
                            _paint_or_select_hover_pxl_indexes
                        }).then(() => {

                            this.update_canvas();
                            this._notify_position_change({x:pos_x, y: pos_y});
                        });

                    }
                }else if(_pxls_hovered !== pxl_index) {

                    meta.super_state.set_state({
                        _pxls_hovered: pxl_index | 0,
                        _mouse_inside: true
                    }).then(( ) => {

                        this.update_canvas();
                        this._notify_position_change({x:pos_x, y: pos_y});
                    });

                }
            },
            _notify_position_change (position, date) {
                "use strict";
                date = date || Date.now();
                const _notified_position_at = meta.super_state.get_notified_pos_at() | 0;
                const now = Date.now() | 0;

                if (((now - _notified_position_at|0) >= 100 && date == null) || (date|0) > (_notified_position_at|0) && (now - date|0) >= 100) {

                    position = {
                        x: typeof position.x == "undefined" ? -1 : position.x,
                        y: typeof position.y == "undefined" ? -1 : position.y,
                    };


                    meta.super_state.set_state({_notified_position_at: now}).then(function () {
                        notifiers.position(position, meta.sraf.get_state().previous_cpaf_fps);
                    });
                } else if ((now|0) < (date + 100|0)) {

                    setTimeout(this._notify_position_change, 100-(date-now|0)|0, {x: position.x, y: position.y}, now|0);
                }
            },
            _handle_canvas_mouse_up() {
                "use strict";
                let { _paint_or_select_hover_pxl_indexes, tool, _imported_image_pxls, _pxl_indexes_of_selection, select_mode } = meta.super_state.get_state();

                if(_imported_image_pxls.length > 0){

                    meta.super_state.set_state({_imported_image_move_from: [-1, -1]});

                }else if(_paint_or_select_hover_pxl_indexes.size > 0 && tool === "CONTOUR") {

                    shape_creator.update_state();
                    let { pxl_current_opacity, pxl_current_color_uint32 } = meta.super_state.get_state();
                    const first_drawn_pixel = _paint_or_select_hover_pxl_indexes[0];
                    const last_drawn_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size-1];
                    const closing_path_line =  shape_creator.from_line(first_drawn_pixel, last_drawn_pixel);
                    _paint_or_select_hover_pxl_indexes = new SetFixed(Array.from(_paint_or_select_hover_pxl_indexes.indexes).concat(closing_path_line));
                    _paint_or_select_hover_pxl_indexes = shape_creator.from_path(_paint_or_select_hover_pxl_indexes, _paint_or_select_hover_pxl_indexes);

                    meta.super_state.paint_shape(_paint_or_select_hover_pxl_indexes.indexes, pxl_current_color_uint32, pxl_current_opacity,
                        {
                            _paint_or_select_hover_pxl_indexes: new SetFixed(0),
                            _paint_or_select_hover_pxl_indexes_exception: new SetFixed(0),
                            _paint_hover_old_pxls_snapshot: [],
                            _last_action_timestamp: Date.now()
                        },
                        () => {this.update_canvas();}
                    );

                }else if(_paint_or_select_hover_pxl_indexes.size > 0 && tool === "SELECT PATH") {

                    shape_creator.update_state();
                    const first_drawn_pixel = _paint_or_select_hover_pxl_indexes[0];
                    const last_drawn_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size-1];
                    const closing_path_line =  shape_creator.from_line(first_drawn_pixel, last_drawn_pixel);
                    _paint_or_select_hover_pxl_indexes = new SetFixed(Array.from(_paint_or_select_hover_pxl_indexes.indexes).concat(closing_path_line));
                    _paint_or_select_hover_pxl_indexes = shape_creator.from_path(_paint_or_select_hover_pxl_indexes, _paint_or_select_hover_pxl_indexes);

                    if(select_mode === "REPLACE") {

                        _pxl_indexes_of_selection.clear();
                    }

                    if(select_mode === "ADD" || select_mode === "REPLACE") {

                        _paint_or_select_hover_pxl_indexes.forEach(function(pxl) {

                            _pxl_indexes_of_selection.add(pxl);
                        });

                    }else {

                        _paint_or_select_hover_pxl_indexes.forEach(function(pxl) {

                            _pxl_indexes_of_selection.delete(pxl);
                        });
                    }
                }
            },
            _handle_canvas_mouse_down (event) {
                "use strict";
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

                let { _shape_index_a, _select_shape_index_a, _shape_index_b, _select_shape_index_b, _pxl_indexes_of_selection, _s_layers, _layer_index, hue } = meta.super_state.get_state();
                const pxl_index = (pos_y * pxl_width) + pos_x;
                const pxl_color_index = _s_layers[_layer_index].indexes[pxl_index];

                if (event_which === -1) {

                    meta.super_state.set_state({_pxls_hovered: pxl_index}).then(() => {this.update_canvas();});
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

                    const pxls_copy_immutable = _s_layers[_layer_index].indexes_copy;
                    let pxls_copy = _s_layers[_layer_index].indexes;
                    let pxl_colors_copy = Array.from(_s_layers[_layer_index].colors);

                    if(_imported_image_pxls.length > 0 && event_which === 1){

                        meta.super_state.set_state({_imported_image_move_from: [pos_x, pos_y]});

                    }else if((event_which === 2) || (tool === "MOVE" && _imported_image_pxls.length <= 0 && (event_which === 1 || event_which === -1))){

                        meta.super_state.set_state({_imported_image_move_from: [event.x, event.y]});

                    }else if(tool === "PICKER" && event_which === 1) {

                        const pixel_color_hex = this.get_pixel_color_from_pos(pos_x, pos_y);
                        this._notify_current_color_change(pixel_color_hex);
                        this._notify_relevant_action_event(event, pixel_color_hex, 1);
                    }else if (tool === "EXCHANGE" && event_which === 1) {

                        const pixel_color_uint32 = _s_layers[_layer_index].colors[pxl_color_index];
                        this.exchange_pixel_color(pixel_color_uint32, pxl_current_color_uint32);
                        this._notify_relevant_action_event(event, pxl_current_color_uint32, 1);

                    }else if(tool === "LINE" || tool === "RECTANGLE" || tool === "ELLIPSE"){

                        if(_shape_index_a === -1) {

                            if(event_which === 1) {

                                meta.super_state.set_state({_shape_index_a: pxl_index}).then(() => {this.update_canvas();});
                            }else {

                                meta.super_state.set_state({_shape_index_a}).then(() => {this.update_canvas();});
                            }
                        }else {

                            let pxl_indexes;
                            switch (tool) {

                                case "LINE":
                                    pxl_indexes = shape_creator.from_line(_shape_index_a, pxl_index);
                                    break;
                                case "RECTANGLE":
                                    pxl_indexes = shape_creator.from_rectangle(_shape_index_a, pxl_index);
                                    break;
                                case "ELLIPSE":
                                    pxl_indexes = shape_creator.from_ellipse(_shape_index_a, pxl_index);
                                    break;
                            }

                            meta.super_state.paint_shape(pxl_indexes.indexes, pxl_current_color_uint32, pxl_current_opacity, {_shape_index_a: -1, _last_action_timestamp: Date.now()}, () => {this.update_canvas();});
                            this._notify_relevant_action_event(event, "#ffffffff", .6);
                        }


                    }else if(tool === "SELECT LINE" || tool === "SELECT RECTANGLE" || tool === "SELECT ELLIPSE"){

                        if(_select_shape_index_a === -1) {

                            if(event_which === 1) {

                                meta.super_state.set_state({_select_shape_index_a: pxl_index}).then(() => {this.update_canvas();});
                            }else {

                                meta.super_state.set_state({_select_shape_index_a}).then(() => {this.update_canvas();});
                            }
                        }else {

                            let pixel_indexes =
                                tool === "SELECT LINE" ?
                                    shape_creator.from_line(_select_shape_index_a, pxl_index):
                                    tool === "SELECT RECTANGLE" ?
                                        shape_creator.from_rectangle(_select_shape_index_a, pxl_index):
                                        tool === "SELECT ELLIPSE" ?
                                            shape_creator.from_ellipse(_select_shape_index_a, pxl_index):
                                            shape_creator.from_ellipse(_select_shape_index_a, pxl_index);

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

                        meta.super_state.set_state({ _pencil_mirror_index: pxl_index, _last_action_timestamp: Date.now()}).then(() => {this.update_canvas();});

                    }else if((tool === "PENCIL" || tool === "PENCIL PERFECT" || tool === "CONTOUR") && event_which === 1) {

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

                                const v_pxl_color_index = _s_layers[_layer_index].indexes[index];
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

                                    const v_pxl_color_index = _s_layers[_layer_index].indexes[index];
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
                        meta.super_state.paint_shape([pxl_index], pxl_current_color_uint32, pxl_current_opacity,
                            {
                                _paint_or_select_hover_pxl_indexes: new SetFixed([pxl_index]),
                                _paint_or_select_hover_actions_latest_index: pxl_index,
                                _paint_hover_old_pxls_snapshot: meta.super_state.get_state()._s_layers[_layer_index].indexes_copy,
                                _last_action_timestamp: Date.now()
                            }, () => {this.update_canvas();});

                    }else if ((tool === "BUCKET" || tool === "HUE BUCKET" || tool === "SELECT COLOR THRESHOLD" || tool === "BORDER") && event_which === 1) {

                        const { _s_layers, _layer_index } = meta.super_state.get_state();
                        const old_pxls_copy = _s_layers[_layer_index].indexes;

                        const pixel_start = [pos_x, pos_y];
                        const index_color_start = old_pxls_copy[pxl_index];
                        const pxl_color_start = pxl_colors_copy[index_color_start];

                        let interpolated_colors_hue_bucket = [];

                        const [c_s_r, c_s_g, c_s_b, c_s_a] = meta.color_conversion.to_rgba_from_uint32(pxl_color_start);
                        const [c_s_h, c_s_s, c_s_l, c_s_o] = meta.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(c_s_r, c_s_g, c_s_b, c_s_a));
                        const hue_difference_with_color_start = c_s_h < hue ? hue - c_s_h: 360 - c_s_h + hue;

                        let pixel_stack = [pixel_start];
                        let colored_pxl_indexes = new SetFixed(_s_layers[0].indexes.length);

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

                        const color_pixel = (index, paint) => {
                            "use strict";
                            paint = paint || false;
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

                            shape_creator.from_border(colored_pxl_indexes, true, true).forEach((pxl_index) => {

                                color_pixel(pxl_index, true);
                            });

                            let {_s_layers, pxl_width, pxl_height} = meta.super_state.get_state();
                            let res = meta.color_conversion.clean_duplicate_colors(pxls_copy, pxl_colors_copy);
                            _s_layers[_layer_index] = Layer.new_from_colors_and_indexes(res[1], res[0], pxl_width, pxl_height, true);


                            // Update pixels list and pixel colours
                            meta.super_state.set_state({_s_layers, _last_action_timestamp: Date.now()}).then(() => {this.update_canvas();});

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

                            let {_s_layers, pxl_width, pxl_height} = meta.super_state.get_state();
                            let res = meta.color_conversion.clean_duplicate_colors(pxls_copy, pxl_colors_copy);
                            _s_layers[_layer_index] = Layer.new_from_colors_and_indexes(res[1], res[0], pxl_width, pxl_height, true);

                            // Update pixels list and pixel colours
                            meta.super_state.set_state({_s_layers, _last_action_timestamp: Date.now()}).then(() => {

                                this.update_canvas();
                                this._notify_relevant_action_event(event, pxl_current_color, 1);
                            });

                        }

                    }else if ((tool === "SELECT COLOR") && event_which === 1) {

                        const { _s_layers } = meta.super_state.get_state();
                        const index_color_start = _s_layers[_layer_index].indexes[pxl_index];

                        if(select_mode === "REPLACE") {

                            _pxl_indexes_of_selection.clear();
                        }

                        _s_layers[_layer_index].indexes.forEach((pxl, pxl_index) => {

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
                "use strict";
                const _pxl_indexes_of_selection = meta.super_state.get_state()._pxl_indexes_of_selection;

                if(Boolean(meta.super_state.get_state()._previous_pxl_indexes_of_selection.size) !== Boolean(_pxl_indexes_of_selection.size)) {

                    meta.super_state.set_state({
                        _is_something_selected: Boolean(_pxl_indexes_of_selection.size),
                        _previous_pxl_indexes_of_selection: new SetFixed(_pxl_indexes_of_selection)
                    }).then(() => {

                        notifiers.selection(Boolean(_pxl_indexes_of_selection.size));
                    });
                }
            },
            get_pixel_color_from_pos(x, y) {
                "use strict";
                const { pxl_height, pxl_width, _s_layers, _layers } = meta.super_state.get_state();

                const pxl_index = y * pxl_width + x;

                if(x > pxl_width || y > pxl_height || x < 0 || y < 0) {

                    return "#00000000";
                }

                let layer_pixel_colors = new Uint32Array(_s_layers.length);
                let start_i = 0;

                for (let i = _s_layers.length - 1; i >= 0; i--) {

                    layer_pixel_colors[i] = (_s_layers[i].get_uint32(pxl_index|0) | 0) & 0xFFFFFFFF;
                }

                let pixel_color_uint32 = SIMDopeColor.new_zero();

                for (let i = start_i; i < _s_layers.length ; i++) {

                    if(typeof _layers[i] != "undefined") {
                        if (!_layers[i].hidden) {

                            pixel_color_uint32.blend_first_with(SIMDopeColor.new_uint32(layer_pixel_colors[i]), Math.round(parseFloat(_layers[i].opacity) * 255), false, false);
                        }
                    }
                }

                return pixel_color_uint32.hex;
            },
            _notify_current_color_change (color, event = null) {

                color = meta.color_conversion.format_hex_color(color);
                if(notifiers.color) {

                    notifiers.color(color, event);
                } else {

                    meta.super_state.set_state({pxl_current_color: color});
                }
            },
            _notify_relevant_action_event (event, color, opacity = 1) {

                if(notifiers.action) {

                    if(typeof color == "number") {
                        color = SIMDopeColor.new_uint32(color).hex;
                    }
                    notifiers.action(event, color, opacity);
                }
            },
            exchange_pixel_color (old_color, new_color) {

                const { _s_layers, pxl_width, pxl_height, _layer_index } = meta.super_state.get_state();

                let pxls_copy = _s_layers[_layer_index].indexes;
                const pxl_color_index = _s_layers[_layer_index].colors.indexOf(old_color);

                // Eventually add current color to color list
                if (!_s_layers[_layer_index].colors.includes(new_color)) {

                    let pxl_colors = new Uint32Array(_s_layers[_layer_index].colors.length+1);
                    pxl_colors.set(_s_layers[_layer_index].colors, 0);
                    pxl_colors[pxl_colors.length-1] = (new_color | 0) >>> 0;
                    _s_layers[_layer_index].set_colors(pxl_colors, true);
                }

                const new_color_index = _s_layers[_layer_index].colors.indexOf(new_color);
                pxls_copy = pxls_copy.map((pxl) => {

                    return pxl === pxl_color_index ? new_color_index: pxl;
                });

                const [pxls_c, pxl_colors_c] = meta.color_conversion.clean_duplicate_colors(pxls_copy, _s_layers[_layer_index].colors);
                _s_layers[_layer_index] = Layer.new_from_colors_and_indexes(pxl_colors_c, pxls_c, pxl_width, pxl_height, true);

                meta.super_state.set_state({_s_layers, _last_action_timestamp: Date.now()}).then(() => {this.update_canvas()});
            }
        }
    }
}

module.exports = SuperMasterMeta;