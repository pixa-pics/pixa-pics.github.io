const SuperMasterMeta = {
    _build_state: function(super_state, super_canvas, super_blend, sraf) {

        return {
            super_state,
            super_canvas,
            super_blend,
            sraf
        };

    },
    new: function(super_state, super_canvas, super_blend, sraf){
        "use strict";
        const builder = this._build_state;
        const meta = builder(super_state, super_canvas, super_blend, sraf);
        let running = false;

        return {
            update_canvas(force_update = false, callback_function = function () {
            }, requested_at = Date.now()) {

                // Only operate on canvas context if existing
                if (Boolean(meta.super_canvas)) {

                    // Importing state variables
                    let {
                        has_shown_canvas_once,
                        _s_pxl_colors,
                        _s_pxls,
                        _layer_index,
                        _layers,
                        _old_layers,
                        select_mode,
                        _last_paint_timestamp,
                        hide_canvas_content,
                        _did_hide_canvas_content,
                        _old_full_pxls,
                        _old_pxl_width,
                        _old_pxl_height,
                        pxl_width,
                        pxl_height,
                        _old_pxls_hovered,
                        _pxls_hovered,
                        tool,
                        _is_there_new_dimension,
                        _shape_index_a,
                        _select_shape_index_a,
                        _pxl_indexes_of_selection,
                        _pxl_indexes_of_selection_drawn,
                        _paint_or_select_hover_pxl_indexes,
                        _selection_pair_highlight,
                        _pxl_indexes_of_old_shape,
                        _previous_imported_image_pxls_positioned_keyset,
                    } = meta.super_state.get_state();

                    if (_last_paint_timestamp > requested_at) {
                        return;
                    }
                    const _layers_simplified = _layers.map(function (l) {
                        return {
                            id: parseInt(l.id),
                            hash: String(l.hash),
                            name: String(l.name),
                            hidden: Boolean(l.hidden),
                            opacity: parseInt(l.opacity),
                        };
                    });

                    // This is a list of color index that we explore
                    const full_pxls = Uint32Array.from(_s_pxls[_layer_index].map(function(pci){ return _s_pxl_colors[_layer_index][pci] | 0}));
                    const is_there_new_dimension = Boolean(_old_pxl_width !== pxl_width || _old_pxl_height !== pxl_height || _is_there_new_dimension);
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
                        return String(l.hidden ? "h" : "v").concat(String(l.opacity))
                    }).join("") !== _layers_simplified.map(function (l) {
                        return String(l.hidden ? "h" : "v").concat(String(l.opacity))
                    }).join(""));

                    const clear_canvas = Boolean(_did_hide_canvas_content && !hide_canvas_content) || Boolean(!_did_hide_canvas_content && hide_canvas_content) || !has_shown_canvas_once || hide_canvas_content || has_layers_visibility_or_opacity_changed || is_there_new_dimension;
                    const layers_length = _layers_simplified.length | 0;

                    const {imported_image_pxls_positioned, imported_image_pxl_colors, imported_image_pxls_positioned_keyset} = meta.super_state.get_imported_image_data();
                    meta.super_blend.update(_layers.length + 1, full_pxls.length);
                    let number_to_paint = 0;
                    let full_pxls_length = full_pxls.length | 0;
                    let pos_x = 0;
                    let pos_y = 0;
                    let opacity = 0;
                    let b = new DataView(new ArrayBuffer(9));

                    for (let index = 0; index < full_pxls_length; index = index + 1 | 0) {

                        b.setUint8(0, _pxls_hovered === index | 0);
                        b.setUint8(1, _old_pxls_hovered.has(index) | 0);
                        b.setUint8(2, _pxl_indexes_of_current_shape.has(index)| 0);
                        b.setUint8(3, _pxl_indexes_of_old_shape.has(index)| 0);
                        b.setUint8(4, _pxl_indexes_of_selection.has(index)| 0);
                        b.setUint8(5, _pxl_indexes_of_selection_drawn.has(index) | 0);
                        b.setUint8(6, _previous_imported_image_pxls_positioned_keyset.has(index) | 0);
                        b.setUint8(7, imported_image_pxls_positioned_keyset.has(index) | 0);
                        b.setUint8(8, full_pxls[index] !== _old_full_pxls[index] | 0);

                        if (
                            !hide_canvas_content &&
                            Boolean(
                                clear_canvas ||
                                b.getUint8(0) !== 0 ||
                                b.getUint8(1) !== 0 ||
                                b.getUint8(2) !== b.getUint8(3) ||
                                b.getUint8(4) !== b.getUint8(5) ||
                                b.getUint8(6) !== 0 ||
                                b.getUint8(7) !== 0 ||
                                b.getUint8(8) !== 0
                            )) {

                            number_to_paint++;
                            meta.super_blend.for(index);

                            for (let i = 0; i < layers_length; i = i + 1 | 0) {

                                meta.super_blend.stack(i, _s_pxl_colors[i][_s_pxls[i][index]], _layers_simplified[i].hidden ? 0 : _layers_simplified[i].opacity, 0);
                            }

                            if(b.getUint8(1) !== 0 && b.getUint8(0) === 0){_old_pxls_hovered.delete(index);}
                            if (b.getUint8(2) === 0 && b.getUint8(3) !== 0) {_pxl_indexes_of_old_shape.delete(index);}
                            else if(b.getUint8(2) !== 0 && b.getUint8(3) === 0) {_pxl_indexes_of_old_shape.add(index)}
                            if (b.getUint8(4) === 0 && b.getUint8(5) !== 0) {_pxl_indexes_of_selection_drawn.delete(index);}
                            else if(b.getUint8(4) !== 0 && b.getUint8(5) === 0) {_pxl_indexes_of_selection_drawn.add(index);}
                            if(b.getUint8(0) !== 0) {_old_pxls_hovered.add(index);}


                            if (b.getUint8(7) !== 0) {

                                meta.super_blend.stack(layers_length, imported_image_pxl_colors[imported_image_pxls_positioned[index]], 1, 0);
                            } else if (b.getUint8(2) !== 0 || b.getUint8(0) !== 0) {


                                if (b.getUint8(0) !== 0) {

                                    meta.super_blend.stack(layers_length, 0, 2 / 3, 1);
                                } else {

                                    meta.super_blend.stack(layers_length, 0, 1 / 3, 1);
                                }

                            } else if (b.getUint8(4) !== 0) {

                                pos_x = index % pxl_width | 0;
                                pos_y = (index - pos_x) / pxl_width | 0;

                                opacity = 1 / 3 + ((0 + ((pos_x + pos_y + (_selection_pair_highlight ? 1 : 0) | 0) % 2) | 0) / 3);
                                meta.super_blend.stack(layers_length, 0, opacity, 1);
                            }
                        }
                    }

                    const indexed_changes = meta.super_blend.blend(false, false);
                    if (indexed_changes.size > 0 || hide_canvas_content) {

                        force_update = Boolean(indexed_changes.size * 1.05 > pxl_width * pxl_height || force_update || clear_canvas);

                        meta.super_canvas.pile(indexed_changes).then(function () {
                            meta.super_canvas.unpile().then(function () {
                                meta.super_canvas.prender().then(function () {
                                    meta.sraf.run_frame(function () {

                                            meta.super_state.set_state({
                                                _pxl_indexes_of_selection_drawn: _pxl_indexes_of_selection_drawn,
                                                _pxl_indexes_of_old_shape: _pxl_indexes_of_old_shape,
                                                _old_selection_pair_highlight: Boolean(_selection_pair_highlight),
                                                _old_layers: _layers_simplified,
                                                _old_full_pxls: new Uint32Array(full_pxls.buffer),
                                                _old_pxl_width: pxl_width | 0,
                                                _old_pxl_height: pxl_height | 0,
                                                _old_pxls_hovered: _old_pxls_hovered,
                                                _last_paint_timestamp: requested_at | 0,
                                                has_shown_canvas_once: true,
                                                _is_there_new_dimension: false,
                                                _did_hide_canvas_content: Boolean(hide_canvas_content),
                                                _previous_imported_image_pxls_positioned_keyset: imported_image_pxls_positioned_keyset
                                            }, callback_function);

                                            if(hide_canvas_content) {

                                                meta.super_canvas.clear();
                                            }else {

                                                meta.super_canvas.render();
                                            }

                                    }, false, force_update, Date.now())
                                });
                            });
                        });
                    }
                }
            }
        }
    }
}

module.exports = SuperMasterMeta;