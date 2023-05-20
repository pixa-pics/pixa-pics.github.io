/*
The MIT License (MIT)

Copyright (c) 2021 - 2022 Vipertech
Copyright (c) 2021 - 2022 Crypto red

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT aOR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

"use strict";
import SetFixed from "../../utils/SetFixed";
import JSLoader from "../../utils/JSLoader";

import React from "react";
import pool from "../../utils/worker-pool";
import B64PngCanvas from "../canvaspixels/utils/B64PngCanvas";
import BMPLayer from "./utils/BMPLayer";
import ReducePalette from "../canvaspixels/utils/ReducePalette";
import SuperMasterMeta from "../canvaspixels/utils/SuperMasterMeta";
import SuperCanvas from "../canvaspixels/utils/SuperCanvas";
import SuperState from "../canvaspixels/utils/SuperState";
import SuperBlend from "../canvaspixels/utils/SuperBlend";
import ColorConversion from "../canvaspixels/utils/ColorConversion";
import SmartRequestAnimationFrame from "../canvaspixels/utils/SmartRequestAnimationFrame";
import XXHash from "../canvaspixels/utils/XXHash";
import CanvasPos from "../canvaspixels/utils/CanvasPos"
import CanvasFilters from "../canvaspixels/utils/CanvasFilters"
import SIMDope from "simdope/index";
import {toBytes, toBase64} from 'fast-base64';
const simdops = SIMDope.simdops;
const SIMDopeColors = SIMDope.SIMDopeColors;
const SIMDopeColor = SIMDope.SIMDopeColor;
class CanvasPixels extends React.PureComponent {

    constructor(props) {
        super(props);
        if(!this.hasnt_been_mount) {
            this.reduce_palette = ReducePalette.from(pool);
            this.super_state = Object.create(SuperState).from(props);
            this.xxhash = Object.create(XXHash).new();
            this.bmp_layer = Object.create(BMPLayer).from(pool);
            this.color_conversion = Object.create(ColorConversion).new();
            this.super_blend = SuperBlend.init(1, 1);
            this.super_canvas = Object.create(SuperCanvas).from(null, 32, 32);
            this.canvas_pos = Object.create(CanvasPos).from(32,  32,  0.9,  32, 0, 0);
            this.sraf = Object.create(SmartRequestAnimationFrame).init();
            this.canvas_filters = Object.create(CanvasFilters).init(SIMDopeColors);
            this.sraf.start_timer();
            this.super_master_meta = Object.create(SuperMasterMeta).init(this.super_state, this.super_canvas, this.super_blend, this.canvas_pos, this.color_conversion, this.sraf);
            this.hasnt_been_mount = true;
            this.uint8 = new Uint8Array(0);
        }
    };

    componentDidMount() {

        window.addEventListener("resize", this._update_canvas_container_size);
        this._update_canvas_container_size();
        this._notify_image_load_complete(true);
        if(Boolean(this.props.on_fps_change)) {

            this.sraf.set_notify_fps_callback(this.props.on_fps_change);
        }

        let _intervals = [];

        _intervals[0] = setInterval(this._maybe_save_state, 1250);
        _intervals[1] = setInterval(this._maybe_update_selection_highlight, this.sraf.get_state().is_mobile_or_tablet ? 2000: 1000);
        _intervals[2] = setInterval(this._notify_export_state, this.super_state.get_state().export_state_every_ms);

        const body_css =
            "body {" +
            "touch-action:none;" +
            "}";

        const pixelated_css =
            ".Canvas-Pixels, .Canvas-Wrapper-Overflow, .Canvas-Wrapper, .Canvas-Pixels-Cover {" +
            `-ms-interpolation-mode: nearest-neighbor;
            image-rendering: optimizeSpeed;
            image-rendering: -o-pixelated;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: -webkit-crisp-edges;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
            image-rendering: pixelated;`+
            "touch-action: none;" +
            "pointer-events: none;" +
            "backface-visibility: hidden;" +
            "mix-blend-mode: normal;" +
            "background-blend-mode: normal;" +
            "transition: none;" +
            "}";

        const canvas_wrapper_css =
            `.Canvas-Wrapper-Overflow.Shown {
                animation-name: canvanimation;
                transform-origin: center center !important;
                animation-fill-mode: both;
                animation-duration: 350ms;
                animation-delay: 0ms;
                animation-timing-function: linear;
            }
            .Canvas-Wrapper-Overflow .Canvas-Wrapper::after {
                content: "";
                position: fixed;
                width: 100%;
                background: linear-gradient(to bottom, #ffffff00 0%, #1700ff14 14%, #1700ff57 21%, transparent);
                height: 50%;
                left: 0;
                z-index: 2;
                top: 100%;
            }
            .Canvas-Wrapper-Overflow.Shown .Canvas-Wrapper::after {
                animation-name: canvanimationscan;
                animation-fill-mode: both;
                animation-duration: 450ms;
                animation-delay: 350ms;
                animation-timing-function: linear;
            }
            .Canvas-Wrapper-Overflow.Not-Shown {
                animation-name: canvanimation;
                transform-origin: center center !important;
                animation-fill-mode: both;
                animation-duration: 300ms;
                animation-delay: 50ms;
                animation-timing-function: linear;
                animation-direction: reverse;
            }
            @keyframes canvanimation { 
                  0% { transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(.0); will-change: transform, filter; }
                  4.3% { transform: matrix3d(0.136, 0, 0, 0, 0, 0.271, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(.2); will-change: transform, filter; }
                  8.61% { transform: matrix3d(.729, 0, 0, 0, 0, .818, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(.8); will-change: transform, filter; }
                  12.91% { transform: matrix3d(1.146, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(.9); will-change: transform, filter; }
                  17.22% { transform: matrix3d(1.22, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  28.33% { transform: matrix3d(1.046, 0, 0, 0, 0, 1.031, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  39.44% { transform: matrix3d(.988, 0, 0, 0, 0, .991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  61.66% { transform: matrix3d(1.002, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  83.98% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: transform, filter; }
                  100% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); filter: opacity(1); will-change: initial; } 
            }
            @keyframes canvanimationscan { 
                  0% { top: -50% }
                  100% { top: 100% } 
            }` +
            ".Canvas-Pixels-Cover::after {" +
                `top: 0;
                left: 0;
                width: calc(60% - 12px);
                content: ""attr(datatexttop)"";
                padding: 0px 0px 8px 12px;
                position: fixed;
                transform: translate(0px, -100%);
                line-height: 20px;
                font-size: 14px;
                font-family: "Jura";
                color: #FAFAFAAA;` +
            "}" +
            ".Canvas-Pixels-Cover::before {" +
            `bottom: 0;
                right: 0;
                width: calc(80% - 12px);
                text-align: right;
                content: ""attr(datatextbottom)"";
                padding: 8px 12px 0px 0px;
                position: fixed;
                transform: translate(0px, 100%);
                line-height: 20px;
                font-size: 14px;
                font-family: "Jura";
                color: #FAFAFAAA;` +
            "}" +
            ".Canvas-Wrapper.MOVE:not(.Canvas-Focused), .Canvas-Wrapper.PICKER:not(.Canvas-Focused) {" +
            "cursor: grab;" +
            "}" +
            ".Canvas-Wrapper.MOVE:active:not(.Canvas-Focused), .Canvas-Wrapper.PICKER:active:not(.Canvas-Focused) {" +
            "cursor: grabbing;" +
            "}";

        var canvas_style = document.createElement("style");
            canvas_style.innerHTML = body_css + pixelated_css + canvas_wrapper_css;
            canvas_style.id = "canvas-style";
        document.head.appendChild(canvas_style);
        this.super_state.set_state({_intervals});
    }

    xxhashthat = (array) => {

        return this.xxhash.base58_that(array);
    };

    _set_size = (width = null, height = null) => {

        width = width || this.super_state.get_state().pxl_width;
        height = height || this.super_state.get_state().pxl_height;

        this.super_state.set_state({
            id: Date.now(),
            pxl_width: width,
            pxl_height: height,
            _pxl_indexes_of_selection: new SetFixed(width*height),
            _layers: [{id: Date.now(), name: "Layer 0", hidden: false, opacity: 1}],
            _layer_index: 0,
            _s_pxls: Array.of(new Uint16Array((width || 32) * (height || 32))),
            _s_pxl_colors: Array.of(Uint32Array.of(0))
        }).then(() => {

            this.canvas_pos.set_sizes(width, height);
            this.canvas_pos.set_current_scale_default();

            this._request_force_update(false, false).then(() => {

                this.super_canvas.set_dimensions(width, height).then(() => this.super_master_meta.update_canvas());
            });
        });
    }

    export_state = () => {

        this._notify_export_state();
    };

    _notify_export_state = () => {

        if(this.props.on_state_export) {

            this.props.on_state_export();
        }

        if(this.props.on_state_exported) {

            this.export_JS_state((state) => {

                this.props.on_state_exported(state);
            });
        }
    };

    _maybe_update_selection_highlight = () => {

        const { tool, _select_shape_index_a, _selection_pair_highlight } = this.super_state.get_state();

        if(tool.toUpperCase().includes("SELECT") && parseInt(_select_shape_index_a) < 0) {

            this.super_state.set_state({_selection_pair_highlight: !_selection_pair_highlight}).then(() => {
                this.super_master_meta.update_canvas(true, Date.now());
            });
        }
    };

    _set_props = (props) => {

        this.componentWillReceiveProps(Object.assign(Object.assign({}, this.props), props));
    };

    componentWillReceiveProps(new_props) {

        var state = this.super_state.get_state();
        if(new_props.tool === "MOVE" && state._imported_image_pxl_colors.length === 0) {

            this.canvas_pos.set_boolean_move_on_click(true);
        }else {

            this.canvas_pos.set_boolean_move_on_click(false);
        }

        if(state.perspective !== new_props.perspective) {

            this.canvas_pos.set_perspective(new_props.perspective || 0);
        }

        if(state.pencil_mirror_mode !== "NONE" && new_props.pencil_mirror_mode === "NONE" || (state.tool.includes("PENCIL") && !new_props.tool.includes("PENCIL"))) {

            this.super_state.set_state({_pencil_mirror_index: -1});
        }

        if(state.tool !== new_props.tool && !new_props.tool.includes("SELECT")) {

            this.super_state.set_state({_pxl_indexes_of_selection: new SetFixed(new_props.width * new_props.height), _pxl_indexes_of_selection_drawn: state._pxl_indexes_of_selection}).then(() => {

                this._request_force_update();
                this._notify_is_something_selected();
            });
        }

        let {hide_canvas_content, show_original_image_in_background, show_transparent_image_in_background, pencil_mirror_mode, tool, select_mode} = state;

        if(
            hide_canvas_content !== new_props.hide_canvas_content ||
            show_original_image_in_background !== new_props.show_original_image_in_background ||
            show_transparent_image_in_background !== new_props.show_transparent_image_in_background ||
            pencil_mirror_mode !== new_props.pencil_mirror_mode ||
            tool !== new_props.tool ||
            select_mode !== new_props.select_mode
        ) {

            this.super_state.set_state(new_props, true).then(() => {

                this._request_force_update(false, false).then(() => this.super_master_meta.update_canvas());
            });

        }else {

            this.super_state.set_state(new_props, true);
        }
    }

    zoom_in = () => {

        this.canvas_pos.set_zoom(1.33);
    };

    zoom_out = () => {

        this.canvas_pos.set_zoom(0.75);
    };

    current_layer_up = () => {

        let { _layers, _layer_index, _s_pxl_colors, _s_pxls } = this.super_state.get_state();

        if(_layer_index < _layers.length-1) {

            _layers.splice(_layer_index+1, 0, _layers.splice(_layer_index, 1)[0]);
            _s_pxl_colors.splice(_layer_index+1, 0, _s_pxl_colors.splice(_layer_index, 1)[0]);
            _s_pxls.splice(_layer_index+1, 0, _s_pxls.splice(_layer_index, 1)[0]);


            this.super_state.set_state({
                _layers,
                _layer_index: parseInt(_layer_index + 1),
                _s_pxl_colors,
                _s_pxls,
                _last_action_timestamp: Date.now()
            }).then(() => {this._maybe_save_state(null, true)});
        }
    };

    current_layer_down = () => {

        let { _layers, _layer_index, _s_pxl_colors, _s_pxls } = this.super_state.get_state();

        if(_layer_index > 0) {

            _layers.splice(_layer_index-1, 0, _layers.splice(_layer_index, 1)[0]);
            _s_pxl_colors.splice(_layer_index-1, 0, _s_pxl_colors.splice(_layer_index, 1)[0]);
            _s_pxls.splice(_layer_index-1, 0, _s_pxls.splice(_layer_index, 1)[0]);


            this.super_state.set_state({
                _layers,
                _layer_index: parseInt(_layer_index - 1),
                _s_pxl_colors,
                _s_pxls,
                _last_action_timestamp: Date.now()
            }).then(() => {this._maybe_save_state(null, true)});
        }
    };

    new_layer = (at_index) => {

        const {pxl_width, pxl_height} = this.super_state.get_state();
        let { _layers, _s_pxl_colors, _s_pxls } = this.super_state.get_state();
        at_index = typeof at_index === "undefined" ? _s_pxl_colors.length: at_index;

        _s_pxl_colors.splice(at_index+1, 0, Uint32Array.of(0));
        _s_pxls.splice(at_index+1, 0, new Uint16Array(pxl_width * pxl_height));
        _layers.splice(at_index+1, 0, {id: Date.now(), name: `Layer ${at_index+1}`, hidden: false, opacity: 1});

        this.super_state.set_state({
            _layers,
            _layer_index: at_index,
            _s_pxl_colors,
            _s_pxls,
            _last_action_timestamp: Date.now(),
        }).then(() => {this._maybe_save_state(null, true)});
    };

    duplicate_layer = (at_index) => {

        let { _layers, _s_pxl_colors, _s_pxls } = this.super_state.get_state();
        at_index = typeof at_index === "undefined" ? _s_pxl_colors.length: at_index;

        _s_pxl_colors.splice(at_index + 1, 0, new Uint32Array(_s_pxl_colors[at_index].buffer));
        _s_pxls.splice(at_index + 1, 0, [..._s_pxls[at_index]]);
        _layers.splice(at_index + 1, 0, {
            id: Date.now(),
            hash: _layers[at_index].hash,
            name: `${_layers[at_index].name} (copy)`,
            hidden: Boolean(_layers[at_index].hidden),
            opacity: parseFloat(_layers[at_index].opacity),
            colors: Array.from(_layers[at_index].colors),
            number_of_colors: parseInt(_layers[at_index].number_of_colors),
            thumbnail: _layers[at_index].thumbnail,
        });

        this.super_state.set_state({
            _layers,
            _layer_index: at_index + 1,
            _s_pxl_colors,
            _s_pxls,
            _last_action_timestamp: Date.now(),
        }).then(() => {this._maybe_save_state(null, true)});

    };

    delete_layer = (at_index) => {

        let { _layers, _s_pxl_colors, _s_pxls, _layer_index } = this.super_state.get_state();

        if(_layers.length > 1) {

            _s_pxl_colors.splice(at_index, 1);
            _s_pxls.splice(at_index, 1);
            _layers.splice(at_index, 1);

            _layer_index = at_index-1;
            _layer_index = _layer_index < 0 ? 0: _layer_index;

            this.super_state.set_state({
                _layers,
                _layer_index,
                _s_pxl_colors,
                _s_pxls,
                _last_action_timestamp: Date.now(),
            }).then(() => {this._maybe_save_state(null, true)});
        }

    };

    change_active_layer = (at_index) => {

        if(this.super_state.get_state()._layers.length > at_index && 0 <= at_index) {

            this.super_state.set_state({
                _layer_index: at_index,
                _last_action_timestamp: 1/0,
            }).then(() => {this._maybe_save_state(null, true)});
        }
    };

    toggle_layer_visibility = (at_index) => {

        let _layers = Array.from(this.super_state.get_state()._layers);
        _layers[at_index].hidden = !_layers[at_index].hidden;

        this.super_state.set_state({
            _layers,
            _last_action_timestamp: Date.now(),
        }).then(() => {this._maybe_save_state(null, true)});
    };

    change_layer_opacity = (at_index, opacity) => {

        let _layers = this.super_state.get_state()._layers;
        _layers[at_index].opacity = parseFloat(opacity);

        this.super_state.set_state({
            _layers,
            _last_action_timestamp: Date.now(),
        }).then(() => {this._maybe_save_state(null, true)});
    };

    merge_down_layer = (at_index) => {

        let { _layers, _s_pxls, _s_pxl_colors, pxl_width, pxl_height } = this.super_state.get_state();

        if(typeof _layers[at_index] !== "undefined" && typeof _layers[at_index - 1] !== "undefined") {

            const top_layer_pxls =  new Uint16Array(_s_pxls[at_index].buffer);
            const bottom_layer_pxls =  new Uint16Array(_s_pxls[at_index - 1].buffer);
            const top_layer_pxl_colors = new Uint32Array(_s_pxl_colors[at_index].buffer);
            const bottom_layer_pxl_colors = new Uint32Array(_s_pxl_colors[at_index - 1].buffer);
            const top_layer_opacity = (parseFloat(_layers[at_index].opacity) * 255 | 0) & 0xFF ;
            const bottom_layer_opacity = (parseFloat(_layers[at_index-1].opacity) * 255 | 0) & 0xFF;

            const pxl_length = top_layer_pxls.length | 0;

            const new_layer = {
                id: Date.now(),
                name: `Merged layers ${at_index}+${at_index-1}`,
                hidden: Boolean(_layers[at_index].hidden && _layers[at_index-1].hidden),
                opacity: parseFloat(1),
            };

            const super_blend = SuperBlend.init(3, pxl_length);
            for(let i = 0 ; i < pxl_length; i = (i+1|0)>>>0) {

                super_blend.for(i);
                super_blend.stack(0, 0, 1, 0);
                super_blend.stack(1, bottom_layer_pxl_colors[bottom_layer_pxls[i]]|0, bottom_layer_opacity, 0);
                super_blend.stack(0, 0, 1, 0);
                super_blend.stack(2, top_layer_pxl_colors[top_layer_pxls[i]]|0, top_layer_opacity, 0);
                super_blend.stack(0, 0, 1, 0);
            }

            super_blend.blend(false, false).then(([index_changes, color_changes]) => {

                const fp = new DataView(new ArrayBuffer(pxl_height * pxl_width * 4));

                let length = index_changes.length|0;
                for(let i = 0; simdops.int_less(i, length); i = simdops.plus_uint(i, 1)) {
                    fp.setUint32(simdops.multiply_uint(index_changes[i], 4), color_changes[i]);
                }

                const image_data = new ImageData(new Uint8ClampedArray(fp.buffer), pxl_width, pxl_height);
                const {new_pxl_colors, new_pxls} = this._get_pixels_palette_and_list_from_image_data(image_data, true);
                super_blend.clear();

                _layers.splice(at_index-1, 2, new_layer);
                _s_pxls.splice(at_index-1, 2, new_pxls);
                _s_pxl_colors.splice(at_index-1, 2, new_pxl_colors);

                this.super_state.set_state({
                    _layer_index: at_index-1,
                    _layers,
                    _s_pxls,
                    _s_pxl_colors,
                    _old_pxl_colors: new Uint32Array(_s_pxl_colors[0].length),
                    _last_action_timestamp: Date.now(),
                }).then(() => {this._maybe_save_state(null, true)});
            });
        }
    };

    compute_filters_preview = () => {

        this._notify_filters_change(1);
    };

    _notify_filters_change = (force = 1) => {

        if(this.props.onFiltersThumbnailChange) {

            const {
                _processing_filters,
                _layer_index,
                _last_filters_hash,
                pxl_width,
                pxl_height,
                _s_pxls,
                _s_pxl_colors,
                _filter_thumbnails
            } = this.super_state.get_state();

            const p = _s_pxls[_layer_index];
            const pc = _s_pxl_colors[_layer_index];

            const p_buffer_length =  p.length * 2 | 0;
            const pc_buffer_length = pc.length * 4 | 0;
            const total_length = p_buffer_length + pc_buffer_length;

            var uint8 = new Uint8Array(p_buffer_length + pc_buffer_length);
            uint8.set(new Uint8Array(p.buffer), 0);
            uint8.set(new Uint8Array(pc.buffer), p_buffer_length);
            const hash = this.xxhash.base58_that(uint8);

            if (_last_filters_hash !== hash || _processing_filters === false) {

                let thumbnails = _filter_thumbnails || new Map()
                let old_thumbnail = new Map();
                let progression = 0.0;
                let n_processed = 0;

                this.super_state.set_state({_last_filters_hash: hash, _processing_filters: true}).then(() => {

                    this.get_filter_names().forEach((name, index, filter_names) => {

                        this.get_layer_bitmap_image(
                            pxl_width,
                            pxl_height,
                            p,
                            this.canvas_filters.filter(name, force, pc), (result) => {
                                n_processed++;
                                old_thumbnail.set(name, thumbnails.get(name));
                                thumbnails.set(name, result);
                                progression = Math.round(n_processed / filter_names.length * 100).toString();
                                this.props.onFiltersThumbnailChange(thumbnails, hash, progression);
                                if (thumbnails.size === filter_names.length) {

                                    this.super_state.set_state({
                                        _filter_thumbnails: thumbnails,
                                        _processing_filters: false
                                    }).then(() => {

                                        Object.values(old_thumbnail).forEach(function (bmp) {
                                            bmp.close();
                                        })
                                    });
                                }
                            }
                        );
                    });

                });
            }
        }
    };

    get_pixel_color_from_pos = (x, y) => {

        return this.super_master_meta.get_pixel_color_from_pos(x, y);
    };

    get_layer_bitmap_image = (pxl_width, pxl_height, pxls, pxl_colors, callback_function) => {

        this.bmp_layer.render(pxl_width, pxl_height, pxls, pxl_colors, callback_function);
    };

    get_base64_png_data_url = (scale = 1, with_palette = false, with_compression_speed = 0, with_compression_quality_min = 30, with_compression_quality_max = 35) => {

        return this._get_base64_png_data_url(scale, with_palette, with_compression_speed, with_compression_quality_min, with_compression_quality_max);
    };

    _get_base64_png_data_url = (scale = 1, with_palette = false, with_compression_speed = 0, with_compression_quality_min = 30, with_compression_quality_max = 35) => {

        const { _json_state_history, pxl_width, pxl_height } = this.super_state.get_state();
        const { _s_pxls, _s_pxl_colors, _layers } = _json_state_history.state_history[_json_state_history.history_position];

        const b64pngcanvas = B64PngCanvas.from(pool, parseInt(pxl_width), parseInt(pxl_height), _s_pxls, _s_pxl_colors, _layers, parseInt(scale), true);

        return new Promise( (resolve, reject) => {
            b64pngcanvas.render().then((result) => {

                if(with_compression_speed !== 0 && result.colors.length <= 256) {

                    JSLoader( () => import("../../utils/png_quant")).then(({png_quant}) => {

                        png_quant(""+result.url, with_compression_quality_min, with_compression_quality_max, with_compression_speed, pool).then((base_64_out) => {

                            result.url = base_64_out;
                            resolve(result);
                        }).catch(function(e){ reject(e);});
                    });
                }else if(with_compression_speed !== 0 && result.colors.length > 256){

                    JSLoader( () => import("../../utils/oxi_png.js")).then(({oxi_png}) => {

                        oxi_png(""+result.url, Math.floor(with_compression_quality_max/30), false, pool).then((base_64_out) => {

                            result.url = base_64_out;
                            resolve(result);
                        }).catch(function(e){

                            JSLoader( () => import("../../utils/png_quant")).then(({png_quant}) => {

                                png_quant(""+result.url, with_compression_quality_min, with_compression_quality_max, with_compression_speed, pool).then((base_64_out) => {

                                    result.url = base_64_out;
                                    resolve(result);
                                }).catch(function(e){ reject(e);});
                            });
                        });
                    });
                }else {

                    resolve(result);
                }
            }).catch(function(e){ reject(e); });
        });
    };

    _get_pixels_palette_and_list_from_image_data = (image_data, force_full_compute = false) => {

        const { max_size, _lazy_lazy_compute_time_ms, pxl_width, pxl_height } = this.super_state.get_state();

        const too_much_pixel_cpu_would_go_brrrrr = image_data.data.length / 4 > (max_size * max_size); // Can be three time bigger than the default max convert size

        let new_pxl_colors = [];
        let new_pxl_colors_set = new Set();
        let new_pxls;

        if(!too_much_pixel_cpu_would_go_brrrrr || force_full_compute) { // We can parse all pixel
            new_pxls = new Uint16Array(image_data.width * image_data.height).fill(0);
            for (let i = 0; i < image_data.data.length; i += 4) {

                const color_uint32 = (this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(image_data.data[i+0], image_data.data[i+1], image_data.data[i+2], image_data.data[i+3]))|0)>>>0;

                const deja_vu_color_hex = new_pxl_colors_set.has((color_uint32|0)>>>0);
                let color_uint32_index = deja_vu_color_hex ? new_pxl_colors.indexOf((color_uint32|0)>>>0): -1;

                if (color_uint32_index === -1) {

                    color_uint32_index = (new_pxl_colors.push((color_uint32|0)>>>0)-1|0)>>>0;
                    new_pxl_colors_set.add((color_uint32|0)>>>0);
                }
                new_pxls[(i / 4 | 0)>>0] = (color_uint32_index|0)>>>0;
            }

        }else { // We will only compute n LEVEL lines of pixel

            let start = Date.now();
            new_pxls = new Uint16Array(image_data.width * (max_size+1)).fill(0);

            let skip_lines = 0;

            for (let line = 0; line <= max_size; line++) {

                if(start + _lazy_lazy_compute_time_ms < Date.now()) { break }

                const first_pixel_in_this_row = Math.round(skip_lines) * image_data.width * 4;

                for (let i = 0; i < image_data.width * 4; i += 4) {

                    let x = i + first_pixel_in_this_row;
                    const color_uint32 = this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(image_data.data[x+0], image_data.data[x+1], image_data.data[x+2], image_data.data[x+3]));

                    // Push color hex in palette if necessary
                    if(!new_pxl_colors.includes(color_uint32)) {

                        new_pxl_colors.push(color_uint32);
                    }
                    const color_uint32_index = new_pxl_colors.indexOf(color_uint32);
                    new_pxls[(line * image_data.width) + (i / 4)] = color_uint32_index;
                }

                skip_lines += image_data.height / max_size;
            }

        }

        const r = this.color_conversion.clean_duplicate_colors(new_pxls, new_pxl_colors);
        return {
            too_much_pixel_cpu_would_go_brrrrr: too_much_pixel_cpu_would_go_brrrrr,
            ratio_pixel_per_color: r[0].length / r[1].length,
            new_pxl_colors: r[1],
            new_pxls: r[0]
        };
    }

    _get_new_ctx_from_canvas = (width, height, pixelated = true, image_smoothing = "high") => {

        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        let context = canvas.getContext('2d');
        //context.clearRect(0, 0, canvas.width, canvas.height);

        if(pixelated) {

            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;

        }else if(image_smoothing.length) {

            context.imageSmoothingQuality = image_smoothing;
        }

        return [context, canvas];
    }

    copy_selection = () => {

        this.import_image_on_canvas_from_selection();
    };

    cut_selection = () => {

        this.import_image_on_canvas_from_selection();
        this.erase_selection();
        this.to_selection_none();
    };

    erase_selection = () => {

        let { _s_pxls, _s_pxl_colors, _layer_index, _pxl_indexes_of_selection, pxl_width, pxl_height } = this.super_state.get_state();

        let pxl_colors = Array.from(_s_pxl_colors[_layer_index]);
        if(_pxl_indexes_of_selection.size > 0) {

            if(!pxl_colors.includes(0)) {

                pxl_colors.push(0);
                _s_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);
            }

            const transparent_color_index = _s_pxl_colors[_layer_index].indexOf(0);

            _pxl_indexes_of_selection.forEach((pxl_index) => {

                const x = pxl_index % pxl_width;
                const y = (pxl_index - x) / pxl_width;

                _s_pxls[_layer_index][pxl_index] = transparent_color_index;
            });

            this.super_state.set_state({
                _s_pxls,
                _s_pxl_colors,
                _last_action_timestamp: Date.now()
            }).then(() => {

                this.super_master_meta.update_canvas();
            });
        }
    };

    import_image_on_canvas_from_selection = () => {

        let { _s_pxls, _s_pxl_colors, _layer_index, _pxl_indexes_of_selection, pxl_width, pxl_height } = this.super_state.get_state();

        if(_pxl_indexes_of_selection.size > 0) {

            let top_left = [pxl_width, pxl_height];
            let bottom_right = [-1, -1];

            _pxl_indexes_of_selection.forEach((pxl_index) => {

                const x = pxl_index % pxl_width;
                const y = (pxl_index - x) / pxl_width;

                if(x < top_left[0]) { top_left[0] = x }
                if(y < top_left[1]) { top_left[1] = y }

                if(x > bottom_right[0]) { bottom_right[0] = x }
                if(y > bottom_right[1]) { bottom_right[1] = y }

            });

            const new_width = 1 + bottom_right[0] - top_left[0];
            const new_height = 1 + bottom_right[1] - top_left[1];

            let pxls = _s_pxls[_layer_index];
            let new_pxls =  new Uint16Array(new_width * new_height);
            let new_pxl_colors = Array.from(_s_pxl_colors[_layer_index]);

            for (let i = 0; i < new_width * new_height; i++) {

                let x = i % new_width;
                let y = (i - x) / new_width;

                x += top_left[0];
                y += top_left[1];

                const index = y * pxl_width + x;

                if(_pxl_indexes_of_selection.has(index)) {

                    new_pxls[i] = pxls[index];
                }else {

                    if(!new_pxl_colors.includes(0)) {

                        new_pxl_colors.push(0);
                    }

                    new_pxls[i] = new_pxl_colors.indexOf(0);
                }
            }

            [ new_pxls, new_pxl_colors ] = this.color_conversion.clean_duplicate_colors(new_pxls, Uint32Array.from(new_pxl_colors));

            this.super_state.set_state({
                _imported_image_start_x: top_left[0],
                _imported_image_start_y: top_left[1],
                _imported_image_scale_delta_x: 0,
                _imported_image_scale_delta_y: 0,
                _imported_image_pxls: new_pxls,
                _imported_image_width: new_width,
                _imported_image_height: new_height,
                _imported_image_pxl_colors: new_pxl_colors,

            }).then(() => {

                this._notify_image_import_complete();
                this._notify_is_image_import_mode();
                this.super_master_meta.update_canvas();
            });
        }

    };

    import_image_on_canvas = (image_obj) => {

        if(this.props.onImageImport) {

            this.props.onImageImport();
        }

        setTimeout(() => {

            const { pxl_width, pxl_height } = this.super_state.get_state();

            // Draw the original image in an invisible canvas
            let width = image_obj.width;
            let height = image_obj.height;

            if(true || pxl_width > width && pxl_height > height) {

                let [canvas_ctx, canvas] = this._get_new_ctx_from_canvas(width, height, true);
                canvas_ctx.drawImage(image_obj, 0, 0, width, height);
                let image_data = canvas_ctx.getImageData(0, 0, width, height);
                canvas_ctx = null;
                canvas = null;
                const { new_pxl_colors, new_pxls } = this._get_pixels_palette_and_list_from_image_data(image_data, true);
                image_data = null;

                this.super_state.set_state({
                    _imported_image_start_x: 0,
                    _imported_image_start_y: 0,
                    _imported_image_scale_delta_x: 0,
                    _imported_image_scale_delta_y: 0,
                    _imported_image_pxls: new_pxls,
                    _imported_image_width: width,
                    _imported_image_height: height,
                    _imported_image_pxl_colors: new_pxl_colors,

                }).then(() => {
                    this._notify_image_import_complete();
                    this._notify_is_image_import_mode();
                    this.super_master_meta.update_canvas();
                });

            }

        }, 50);

    };

    set_canvas_from_image = (image_obj = null, loading_base64_img = "", img_d = {}, dont_smart_resize = false) => {

        if(this.props.onLoad) {this.props.onLoad("image_load");}

        if(img_d.id) {

            const _layer_index = 0;
            const [pxls_copy, pxl_colors_copy] = this.color_conversion.clean_duplicate_colors(img_d.pxls, Uint32Array.from(img_d.pxl_colors));

            this.super_state.set_state({
                _id: Date.now(),
                pxl_width: parseInt(img_d.width),
                pxl_height: parseInt(img_d.height),
                _pxl_indexes_of_selection: new SetFixed(img_d.width * img_d.height),
                _base64_original_images: [loading_base64_img],
                _s_pxl_colors: [pxl_colors_copy],
                _s_pxls: [pxls_copy],
                _layers: [{id: Date.now(), name: "Layer 0", hidden: false, opacity: 1}],
                _layer_index,
                _pxls_hovered: -1,
                _original_image_index: 0,
                _last_action_timestamp: Date.now(),
                _json_state_history: {history_position: 0, state_history: []},
            }).then(() => {

                this.canvas_pos.set_sizes(img_d.width | 0, img_d.height | 0);
                this.canvas_pos.set_current_scale_default();

                this._request_force_update(false, false).then(() => {

                    this.super_canvas.set_dimensions(img_d.width | 0, img_d.height | 0).then(() => {
                        this.super_master_meta.update_canvas();
                    });
                });

                this._notify_image_load_complete();
                this._notify_export_state();
                this.super_master_meta.update_canvas();
            });

        }else {

            setTimeout( () => {

                const { default_size, max_size, ideal_size, _base64_original_images, dont_change_img_size_onload, dont_compute_base64_original_image } = this.super_state.get_state();

                // Draw the original image in an invisible canvas
                let width = image_obj.naturalWidth;
                let height = image_obj.naturalHeight;

                let [canvas_ctx, canvas] = this._get_new_ctx_from_canvas(width, height, true);
                canvas_ctx.drawImage(image_obj, 0, 0, width, height);
                let image_data = canvas_ctx.getImageData(0, 0, width, height);
                const base64_original_image = dont_compute_base64_original_image ? "": loading_base64_img.length > 0 ? loading_base64_img: canvas.toDataURL("image/jpeg");
                canvas_ctx = null;
                canvas = null;

                const merge_color_threshold = 4/16;
                let is_crop_necessary = false;
                let a_better_scale = 1;

                if(dont_change_img_size_onload === false) {

                    // From the result in colors and pixels color index find if the image is resized bigger but from a pixelart image
                    let {new_pxls, new_pxl_colors} = this._get_pixels_palette_and_list_from_image_data(image_data, true);
                    image_data = null;
                    let ratio_pixel_per_color = new_pxls.length / new_pxl_colors.length;
                    let enough_sure = max_size * max_size > height * width;

                    if(!enough_sure) {

                        let best_min_occ = 1/0;
                        let occ_list = [];
                        let occ = 0;
                        let last_occ = -1;

                        occ_list[1] = 0;
                        Uint32Array.from(new_pxls).forEach((value, index) => {

                            // If like the last occurrence increment the min occurrence variable
                            if(last_occ === value || index === 0) {

                                occ++;
                            }else {

                                // If we found a smaller occurrence pattern that finished, the best one is this one
                                if(occ < best_min_occ) {

                                    best_min_occ = occ;
                                }

                                // Reset occurrence to zero since there is a new pattern
                                occ_list[occ] = typeof occ_list[occ] !== "undefined" ? occ_list[occ] + 1 : 1;

                                occ = 1;
                            }

                            // Set the last occurrence the new one
                            last_occ = value;
                        });

                        let most_frequent_following_repetition_number_in_px = 1;
                        let most_frequent_following_repetition_number_in_px_with_bonus = 1;
                        let most_frequent_following_occurrence = 1;
                        let most_frequent_following_repetition_number = 1;
                        const ideal_size_percent_of_than_real_size = Math.sqrt((width * height) / (ideal_size * ideal_size));
                        const occurrence_is_probably_lower_than = 32;

                        Object.entries(occ_list).forEach((value, index) => {

                            let [occurrence, repetition_number] = value;
                            occurrence = parseInt(occurrence);

                            if(occurrence > occurrence_is_probably_lower_than) { return; }
                            // The bonus is computed so it prefer larger occurrence (up to 128px following themselves) because we could have a table with small lines, faded angle or even noise above square representing pixel
                            // The bigger the image is based on one dimension, the bigger the bonus will be since it best encourage big occurrences in big images
                            const occurrence_position_evaluation_on_max_occurrence = occurrence > occurrence_is_probably_lower_than ? 1: (occurrence_is_probably_lower_than+10) / (occurrence+10);
                            const occurrence_position_on_ideal_size_times_smaller = occurrence > occurrence_is_probably_lower_than ? 1: occurrence_position_evaluation_on_max_occurrence * ideal_size_percent_of_than_real_size;
                            const bonus_for_longer_occurrence_in_px = occurrence > occurrence_is_probably_lower_than ? 0: occurrence_position_on_ideal_size_times_smaller * Math.pow(occurrence, 1 + (1 - 1 / occurrence_position_evaluation_on_max_occurrence));

                            const is_better_repetition_number_in_px = most_frequent_following_repetition_number_in_px_with_bonus < (repetition_number * occurrence + bonus_for_longer_occurrence_in_px);

                            if(occurrence !== 1 && is_better_repetition_number_in_px) {

                                most_frequent_following_occurrence = occurrence;
                                most_frequent_following_repetition_number = repetition_number;
                                most_frequent_following_repetition_number_in_px = repetition_number * occurrence;
                                most_frequent_following_repetition_number_in_px_with_bonus = repetition_number * occurrence + bonus_for_longer_occurrence_in_px;

                            }

                        });

                        // We can check if the occurrence of only 1px is less than the most frequent following occurrence in total pixel size.
                        // Yet the problem we face is that the X occurrence of Y pixel might be way smaller in a big image if there is 1px size line or annoying circle shape
                        // So the solution is to multiply the total amount of pixel repeated in the best occurrence by the decrease of size ideally

                        const most_frequent_following_occurrence_intelligent = most_frequent_following_repetition_number_in_px * ideal_size_percent_of_than_real_size * 4 > occ_list[1] ?
                            most_frequent_following_occurrence: 1;

                        // Find if there is a gape: occurrence nearly not existing from the occurrence 1 to the occurrence X of which X is greater than length of occurrence 1
                        let a_better_frequent_following_occurrence_intelligent = most_frequent_following_occurrence_intelligent;

                        // If there is less times occurrence of one pixel than the biggest occurrence
                        // We can deduce the gap if surpassing the number of 1px occurrence, the scale is so
                        if(occ_list[1] < occ_list.length) {

                            let counter = 0;
                            while(true) {

                                if (typeof occ_list[counter] === "undefined" || occ_list[counter] === 0) {

                                    counter++;
                                }else {

                                    if(counter > occ_list[1]) {

                                        a_better_frequent_following_occurrence_intelligent = counter;
                                        enough_sure = true;
                                    }

                                    break;
                                }
                            }
                        }

                        // We have cheated the selection of occurrence with a bonus, now we check if there isn't an occurrence smaller which correlate
                        let adjusted_following_occurrence = a_better_frequent_following_occurrence_intelligent;


                        Object.entries(occ_list).forEach((entry, index) => {

                            let [key, value] = entry; // Key is the occurrence series and value the number of occurrence
                            key = parseInt(key);

                            if(index > 1 && value > occ_list[adjusted_following_occurrence] && key < a_better_frequent_following_occurrence_intelligent) {

                                adjusted_following_occurrence = key;
                            }
                        });

                        // We'll check if there is a near occurrence that match image width
                        if(image_obj.naturalWidth % adjusted_following_occurrence !== 0) {

                            let difference = 1;
                            while(
                                image_obj.naturalWidth % (adjusted_following_occurrence + difference) !== 0 && image_obj.naturalWidth % (adjusted_following_occurrence - difference) !== 0 &&
                                image_obj.naturalHeight % (adjusted_following_occurrence + difference) !== 0 && image_obj.naturalHeight % (adjusted_following_occurrence - difference) !== 0 &&
                                difference < 16
                                ) {

                                if(
                                    image_obj.naturalWidth % (adjusted_following_occurrence - difference) === 0 &&
                                    image_obj.naturalHeight % (adjusted_following_occurrence - difference) === 0) {

                                    adjusted_following_occurrence -= difference;
                                }else if(
                                    image_obj.naturalWidth % (adjusted_following_occurrence + difference) === 0 &&
                                    image_obj.naturalHeight % (adjusted_following_occurrence + difference) === 0
                                ) {

                                    adjusted_following_occurrence += difference;
                                }

                                difference++;

                            }
                        }

                        a_better_scale =  1 / adjusted_following_occurrence;
                    }

                    const a_better_scale_size = (height * a_better_scale) * (width * a_better_scale);
                    const is_low_color_number_xor_small_enough = // Can be either 3 times less color and 3 times bigger or 2 times less color and 2 time bigger
                        (ratio_pixel_per_color > 4 * 4 * Math.sqrt(a_better_scale_size) && a_better_scale_size <= (default_size * default_size) * 4) ||
                        (ratio_pixel_per_color > 3 * 3 * Math.sqrt(a_better_scale_size) && a_better_scale_size <= (default_size * default_size) * 3) ||
                        (ratio_pixel_per_color > 2 * 2 * Math.sqrt(a_better_scale_size) && a_better_scale_size <= (default_size * default_size) * 2) ||
                        (ratio_pixel_per_color > 1 * 1 * Math.sqrt(a_better_scale_size) && a_better_scale_size <= (default_size * default_size) * 1);
                    const is_less_color_enough = a_better_scale_size > new_pxl_colors.length;
                    const is_small_enough = a_better_scale_size < max_size * max_size;

                    if((!is_low_color_number_xor_small_enough && !enough_sure || (!is_small_enough || !is_less_color_enough)) || dont_smart_resize === true) { // The image must be lowered

                        let scale = 1;

                        while (Math.round(width * scale) * Math.round(height * scale) > (default_size * default_size)) { // Decrement the scale until it fits the maximum size (limit)

                            scale -= 0.01;
                        }


                        width = width * scale;
                        height = height * scale;
                    }else {

                        if(height * width > default_size * default_size) {

                            width *= a_better_scale;
                            height *= a_better_scale;
                            is_crop_necessary = true;
                        }
                    }

                }

                let canvas_resized;
                let canvas_resized_ctx;
                let canvas_resized_image_data = null;

                if(is_crop_necessary && dont_change_img_size_onload === false) {

                    let adjusted_following_occurrence = 1 / a_better_scale;

                    const initial_width = width / a_better_scale;
                    const initial_height = height / a_better_scale;

                    const initial_width_cropped = initial_width - initial_width % adjusted_following_occurrence;
                    const initial_height_cropped = initial_height - initial_height % adjusted_following_occurrence;

                    const cropped_width = Math.floor(initial_width_cropped / adjusted_following_occurrence);
                    const cropped_height = Math.floor(initial_height_cropped / adjusted_following_occurrence);

                    const sw = initial_width_cropped;
                    const sh = initial_height_cropped;
                    const sx = Math.floor((initial_width - initial_width_cropped) / 2);
                    const sy = Math.floor((initial_height - initial_height_cropped) / 2);

                    width = Math.floor(cropped_width);
                    height = Math.floor(cropped_height);

                    [canvas_resized_ctx, canvas_resized] = this._get_new_ctx_from_canvas(width, height, true);
                    canvas_resized_ctx.drawImage(image_obj, sx, sy, sw, sh, 0, 0, width, height);
                    canvas_resized_image_data = canvas_resized_ctx.getImageData(0, 0, width, height);

                }else if(dont_change_img_size_onload === false) {

                    width = Math.floor(width);
                    height = Math.floor(height);

                    [canvas_resized_ctx, canvas_resized] = this._get_new_ctx_from_canvas(width, height, true);
                    canvas_resized_ctx.drawImage(image_obj, 0, 0, width, height);
                    canvas_resized_image_data = canvas_resized_ctx.getImageData(0, 0, width, height);

                }else {

                    canvas_resized_image_data = image_data;
                }

                let new_pxl_data = this._get_pixels_palette_and_list_from_image_data(canvas_resized_image_data, true);
                canvas_resized_ctx = null;
                canvas_resized = null;
                image_data = null;
                canvas_resized_image_data = null;

                let new_base64_original_images = _base64_original_images;

                if(!new_base64_original_images.includes(base64_original_image)) {

                    new_base64_original_images.push(base64_original_image);
                }

                const [pxls_copy, pxl_colors_copy] = this.color_conversion.clean_duplicate_colors(new_pxl_data.new_pxls, Uint32Array.from(new_pxl_data.new_pxl_colors));

                this.super_state.set_state({
                    _id: Date.now(),
                    pxl_width: parseInt(width),
                    pxl_height: parseInt(height),
                    _pxl_indexes_of_selection: new SetFixed(img_d.width * img_d.height),
                    _base64_original_images: new_base64_original_images,
                    _layers: [{id: Date.now(), name: "Layer 0", hidden: false, opacity: 1}],
                    _json_state_history: {history_position: 0, state_history: []},
                    _s_pxl_colors: [pxl_colors_copy],
                    _s_pxls: [pxls_copy],
                    _layer_index: 0,
                    _pxls_hovered: -1,
                    _original_image_index: new_base64_original_images.indexOf(base64_original_image),
                    _last_action_timestamp: Date.now(),
                }).then(() => {

                    this.canvas_pos.set_sizes(width | 0, height | 0);
                    this.canvas_pos.set_current_scale_default();

                    this._request_force_update(false, false).then(() => {

                        this.super_canvas.set_dimensions(width | 0, height | 0).then(() => {
                            this.super_master_meta.update_canvas();
                        });
                    });

                    this._notify_image_load_complete();
                    this._notify_export_state();
                });

            }, 50);
        }
    };

    _set_canvas_ref = (can) => {

        if(typeof can === "undefined") {return}
        if(can === null) {return}
        if(typeof can.width === "undefined") {return}
        if(can.width === null) {return}

        let { pxl_width, pxl_height } = this.super_state.get_state();
        this.super_canvas.new(can, pxl_width, pxl_height);
        this.canvas_pos.set_sizes(pxl_width, pxl_height);
        this.canvas_pos.set_current_scale_default();

        this.super_canvas.set_dimensions(pxl_width, pxl_height).then(() => {
            this.super_master_meta.update_canvas();
        });
    };

    _set_canvas_container_ref = (element) => {

        if(element === null) {return}

        this.super_state.set_state({_canvas_container: element}).then(() => {

            this._update_canvas_container_size();
        });
    };

    _set_canvas_wrapper_ref = (element) => {

        if(element === null) {return}

        this.super_state.set_state({_canvas_wrapper: element});
    };

    _set_canvas_wrapper_overflow_ref = (element) => {

        if(element === null) {return}

        let super_master_meta = this.super_master_meta;
        super_master_meta.set_notifiers(
            this.props.onPositionChange,
            this.props.onSomethingSelectedChange,
            this.props.onCurrentColorChange,
            this.props.onRelevantActionEvent,
            this._request_force_update
        );

        let canvas_pos = this.canvas_pos;
        canvas_pos.set_notifiers(
            this._request_force_update,
            this._handle_canvas_wrapper_overflow_context_menu,
            function(event){super_master_meta._handle_canvas_mouse_move(event)},
            function(event){super_master_meta._handle_canvas_mouse_up(event)},
            function(event){super_master_meta._handle_canvas_mouse_down(event)}
        );
        this.canvas_pos.init_speed_interval();
        element.addEventListener("wheel", function(event){canvas_pos.handle_wheel(event)}, {passive: false});
        element.addEventListener("pointerdown", function(event){canvas_pos.handle_pointer_down(event)}, {passive: false});
        element.addEventListener("pointermove", function(event){canvas_pos.handle_pointer_move(event)}, {passive: false});
        element.addEventListener("pointerup", function(event){canvas_pos.handle_pointer_up(event)}, {passive: false});
        //element.addEventListener("pointercancel", function(event){canvas_pos.handle_pointer_up(event)}, {capture: false});
        element.addEventListener("pointerout", function(event){canvas_pos.handle_pointer_up(event)}, {passive: false});
        element.addEventListener("pointerleave", function(event){canvas_pos.handle_pointer_up(event)}, {passive: false});

        this.super_state.set_state({_canvas_wrapper_overflow: element});
    };

    componentWillUnmount() {

        this.export_state();

        document.querySelectorAll('#canvas-style').forEach(function (node) {node.remove();});

        try {
            window.removeEventListener("resize", this._update_canvas_container_size);
        }catch (e) {}

        try {
            const { _canvas_wrapper_overflow } = this.super_state.get_state();
            _canvas_wrapper_overflow.removeEventListener("wheel", this._handle_wheel);
            _canvas_wrapper_overflow.removeEventListener("pointerdown", this._handle_pointer_down);
            _canvas_wrapper_overflow.removeEventListener("pointermove", this._handle_pointer_move);
            _canvas_wrapper_overflow.removeEventListener("pointerup", this._handle_pointer_up);
            _canvas_wrapper_overflow.removeEventListener("pointercancel", this._handle_pointer_up);
            _canvas_wrapper_overflow.removeEventListener("pointerout", this._handle_pointer_up);
            _canvas_wrapper_overflow.removeEventListener("pointerleave", this._handle_pointer_up);
        } catch(e) {}

        this.super_state.get_state()._intervals.forEach((i) => {

            clearInterval(i);
        });

        delete this.hasnt_been_mount;
    }

    write_text = (size, text) => {

        const li = this.super_state.get_state()._layer_index;
        this.new_layer(li);
        this.change_active_layer(li+1)
        const indexes = this.super_state.create_shape().from_text(size, text);
        this.super_state.paint_shape(indexes, this.super_state.get_state().pxl_current_color_uint32);
    };

    _match_color = (color_a, color_b, threshold) => {

        threshold = typeof threshold === "undefined" ? null: threshold;

        if(threshold === 1) {

            return true;
        }else if(threshold === 0){

            return color_a === color_b;
        }else {

            const threshold_256 = Math.round(threshold * 255);
            const [r_a, g_a, b_a, a_a] = this.color_conversion.to_rgba_from_uint32(color_a);
            const [r_b, g_b, b_b, a_b] = this.color_conversion.to_rgba_from_uint32(color_b);

            const a_diff = Math.abs(a_a - a_b);
            const r_diff = Math.abs(r_a - r_b);
            const g_diff = Math.abs(g_a - g_b);
            const b_diff = Math.abs(b_a - b_b);

            const a_diff_ratio = Math.abs(1 - a_diff / 255);

            if(threshold !== null) {

                return Boolean(r_diff < threshold_256 && g_diff < threshold_256 && b_diff < threshold_256 && a_diff < threshold_256);
            }else {

                return parseFloat(parseInt(r_diff + g_diff + b_diff) / parseInt(255 * 3)) * a_diff_ratio;
            }
        }
    };

    exchange_pixel_color = (x, y, new_color) => {

        let { pxl_width, _s_pxls, _s_pxl_colors, _layer_index } = this.super_state.get_state();

        const old_color = _s_pxl_colors[_layer_index][_s_pxls[_layer_index][y*pxl_width+x]];
        if((""+new_color).startsWith("#")) {
            new_color = new SIMDopeColor.new_hex(new_color).uint32;
        }
        this._exchange_pixel_color(old_color, new_color);
    };

    _exchange_pixel_color = (old_color, new_color) => {

        this.super_master_meta.exchange_pixel_color(old_color, new_color);
    };

    set_selection_by_colors = (color, threshold) => {

        const { _s_pxl_colors, _s_pxls, _layer_index } = this.super_state.get_state();
        let { _pxl_indexes_of_selection } = this.super_state.get_state();
        const _pxls_copy =  new Uint16Array(_s_pxls[_layer_index].buffer);


        _pxl_indexes_of_selection.clear();

        _s_pxl_colors[_layer_index].forEach((c, c_i) => {

            if(this._match_color(color, c, threshold)) {

                _pxls_copy.forEach((pxl, pxl_i) => {

                    if(pxl === c_i) {

                        _pxl_indexes_of_selection.add(pxl_i);
                    }
                });
            }
        });

        this.super_state.set_state({_pxl_indexes_of_selection, _last_action_timestamp: Date.now()}).then(() => {

            this.super_master_meta.update_canvas();
            this._notify_is_something_selected();
        });

    }

    _handle_canvas_wrapper_overflow_context_menu = (event) => {
        "use strict";
        const [pos_x, pos_y] = this.canvas_pos.get_canvas_pos_from_event(event.pageX, event.pageY);
        const pxl_color = this.super_master_meta.get_pixel_color_from_pos(pos_x, pos_y);

        if(this.props.onRightClick) {

            this.props.onRightClick(event, {
                pos_x,
                pos_y,
                pxl_color,
            });
        }

        if(this.props.onRelevantActionEvent) {

            this.props.onRelevantActionEvent(event, pxl_color, 1, false);
        }

        if(this.props.setCursorFuckYou) {

            this.props.setCursorFuckYou(true);
            setTimeout(this.props.setCursorFuckYou, 2500, false);
        }
    };

    maybe_set_layers = (new_current_state, callback_function, start, has_updated, has_changed) => {
        "use strict";
        const current_state_not_empty = Boolean(typeof new_current_state._layers !== "undefined");
        const leading_change = Boolean(start > this.super_state.get_state()._layers_defined_at);
        let current_state = Object.assign({}, new_current_state);
        current_state._layers = Array.from(new_current_state._layers.map(function(l) {
            return {
                id: l.id | 0,
                hash: l.hash + "",
                name: l.name + "",
                hidden: l.hidden && true,
                opacity: parseFloat(l.opacity),
                colors: Array.from(l.colors),
                number_of_colors: l.number_of_colors | 0,
            };
        }));

        if(has_changed && leading_change && current_state_not_empty) {

            this.super_state.set_state({_layer_index: parseInt(new_current_state._layer_index), _layers: Array.from(new_current_state._layers), _layers_defined_at: start}).then(() => {
                if(this.props.onLayersChange) {this.props.onLayersChange(this.super_state.get_state()._layer_index, Array.from(new_current_state._layers));}
                if(callback_function !== null) {callback_function(this.super_state.get_state()._layers, this.super_state.get_state()._layer_index, has_changed, current_state);}
            });
        }else {

            if(this.props.onLayersChange) {this.props.onLayersChange(this.super_state.get_state()._layer_index,  Array.from(new_current_state._layers))}

            if(Boolean(has_changed || has_updated) && current_state_not_empty) {

                if (callback_function !== null) {
                    callback_function(this.super_state.get_state()._layers, this.super_state.get_state()._layer_index, has_changed, current_state)
                }
            }else {

                if (callback_function !== null) {callback_function(this.super_state.get_state()._layers, this.super_state.get_state()._layer_index, has_changed, {});}
            }
        }
    };

    _get_most_used_color_sorted = (pxls, pxl_colors, limit) => {

        "use strict";
        limit = Math.min(pxl_colors.length, limit || 256);
        let colors = SIMDopeColors(pxl_colors);
        var hexs = new Array(limit);
        for(var i = 0; i < limit; i++) {
            hexs[i] = colors.get_element(i).hex;
        }

        return hexs;
    };

    _notify_layers_and_compute_thumbnails_change = (old_current_state, new_current_state, callback_function, start) => {

        "use strict";
        start = start || Date.now();
        let current_layers_length = 0;

        const old_timestamp = parseInt(old_current_state._timestamp) || Date.now();
        const new_timestamp = parseInt(new_current_state._timestamp);
        const all_layers_length = new_current_state._layers.length;
        let timestamp = parseInt(old_timestamp);
        let has_changed = false;
        let has_updated = false;

        for(let index = 0; index < all_layers_length; index++){

            const p =  new_current_state._s_pxls[index];
            const p_buffer_length =  p.length * 2 | 0;
            const pc = new_current_state._s_pxl_colors[index];
            const pc_buffer_length = pc.length * 4 | 0;

            var uint8 = new Uint8Array(p_buffer_length + pc_buffer_length);
            uint8.set(new Uint8Array(p.buffer), 0);
            uint8.set(new Uint8Array(pc.buffer), p_buffer_length);

            const new_hash = this.xxhash.base58_that(uint8);
            const old_layer = Object.assign({}, (old_current_state._layers || [])[index]);
            const old_thumbnail = old_layer.thumbnail;
            const old_hash = old_layer.hash;

            if(old_hash !== new_hash || !Boolean(old_hash) || !Boolean(old_thumbnail)) {

                this.get_layer_bitmap_image(new_current_state.pxl_width, new_current_state.pxl_height, p, pc, (new_thumbnail) => {

                    has_updated = true;
                    if(old_hash !== new_hash || !Boolean(old_hash)) {

                        has_changed = true;
                        timestamp = new_timestamp;
                    }
                    new_current_state._layers[index].hash = new_hash;
                    new_current_state._layers[index].thumbnail = new_thumbnail;
                    new_current_state._layers[index].colors = this._get_most_used_color_sorted(p, pc, 256);
                    new_current_state._layers[index].number_of_colors = parseInt(pc.length);
                    current_layers_length++;

                    if(current_layers_length === all_layers_length) {

                        new_current_state._timestamp = parseInt(timestamp);
                        this.maybe_set_layers(new_current_state, callback_function, start, has_updated, has_changed);
                    }
                });

            }else {


                new_current_state._layers[index].hash = new_hash;
                new_current_state._layers[index].thumbnail = old_thumbnail;

                if(
                    new_current_state._layers[index].colors.length === 0 ||
                    Boolean(new_current_state._layers[index].colors.length !== new_current_state._layers[index].number_of_colors)
                ) {

                    new_current_state._layers[index].colors = this._get_most_used_color_sorted(p, pc, 256);
                    new_current_state._layers[index].number_of_colors = parseInt(pc.length);
                }

                current_layers_length++;
                if(current_layers_length === all_layers_length) {

                    new_current_state._timestamp = parseInt(timestamp);
                    this.maybe_set_layers(new_current_state, callback_function, start, has_updated, has_changed);
                }
            }
        }
    };

    _maybe_save_state = (set_anyway_if_changes_callback, force, requested_at) => {
        "use strict";
        force = force || false;
        requested_at = requested_at || Date.now();
        let will_change = this.canvas_pos.get_style().will_change;
        let super_state_object = this.super_state.get_state();
        let _json_state_history = super_state_object._json_state_history;
        if(requested_at > super_state_object._saving_json_state_history_ran_timestamp || force) {

            if(super_state_object._last_action_timestamp + 1250 <= Date.now() || force || _json_state_history.state_history.length === 0){

                if(super_state_object._saving_json_state_history_running || (will_change && !force)) {

                    setTimeout(() => {

                        this._maybe_save_state(set_anyway_if_changes_callback, force, requested_at);
                    }, 250);

                }else {

                    this.super_state.set_state({_saving_json_state_history_running: true});

                    const {
                        _id,
                        _layers,
                        pxl_width,
                        pxl_height,
                        _s_pxls,
                        _s_pxl_colors,
                        _original_image_index,
                        _layer_index,
                        _pxl_indexes_of_selection,
                        _pencil_mirror_index
                    } = super_state_object;
                    const old_current_history_position = parseInt(_json_state_history.history_position);
                    const old_current_state = _json_state_history.state_history.length === 0 ? {} : _json_state_history.state_history[old_current_history_position];// First state let's not save current history timestamp

                    let new_current_state = {};
                    new_current_state._timestamp = parseInt(Date.now());
                    new_current_state._id = _id.toString();
                    new_current_state.pxl_width = parseInt(pxl_width);
                    new_current_state.pxl_height = parseInt(pxl_height);
                    new_current_state._original_image_index = parseInt(_original_image_index);
                    new_current_state._layers = Array.from(_layers.map((l) => {
                        return {
                            id: parseInt(l.id),
                            hash: l.hash + "",
                            name: l.name + "",
                            hidden: Boolean(l.hidden),
                            opacity: parseFloat(l.opacity || 1),
                            thumbnail: l.thumbnail || null,
                            colors: Array.from(l.colors || []),
                            number_of_colors: parseInt(l.number_of_colors || 0),
                        };
                    }));
                    new_current_state._layer_index = parseInt(_layer_index);
                    new_current_state._s_pxls = _s_pxls.map(function (a) {return Uint16Array.from(a);});
                    new_current_state._s_pxl_colors = _s_pxl_colors.map(function (a) {return Uint32Array.from(a);});
                    new_current_state._pxl_indexes_of_selection = _pxl_indexes_of_selection;
                    new_current_state._pencil_mirror_index = parseInt(_pencil_mirror_index);

                    this._notify_layers_and_compute_thumbnails_change(Object.assign({}, old_current_state), Object.assign({}, new_current_state), (layers, layer_index, layers_changed_state) => {

                        let {_state_history_length, _saving_json_state_history_ran_timestamp } = super_state_object;
                        const first_change = Boolean(_json_state_history.state_history.length === 0);
                        const new_current_history_position = parseInt(_json_state_history.history_position);
                        const new_current_state_timestamp = new_current_state._timestamp || 0;
                        const now = Date.now();

                        if(first_change && new_current_state_timestamp !== 0) { // Fist state

                            _json_state_history.state_history = Array.of(Object.assign({}, new_current_state));
                            _json_state_history.history_position = 0;
                            _saving_json_state_history_ran_timestamp = now;

                        }else if(layers_changed_state) {

                            const backward_of = parseInt(_json_state_history.state_history.length - 1) - new_current_history_position;

                            // An action have been performed while being in the past
                            if(backward_of > 0) {

                                let dshi = 0;
                                let dsh = _json_state_history.state_history.splice(-backward_of+1); // Not cutting current state but the next one unless we go in past
                                while(dsh.length) { // Yet inbetween state history get added the reverse order to not break timeline of changes

                                    if(dshi === 0){
                                        _json_state_history.state_history.push(Object.assign({},dsh.pop()));
                                    }else {
                                        _json_state_history.state_history.push(Object.assign({},dsh.shift()));
                                    }
                                    dshi++;

                                }
                            }

                            if(_json_state_history.state_history.length-1 > _state_history_length) { _json_state_history.state_history.shift(); } // As we limit edit history, just delete the first element if it will be above max size
                            _json_state_history.state_history.push(Object.assign({}, new_current_state)); // Then we add the current state history
                            _json_state_history.history_position = parseInt(_json_state_history.state_history.length-1);
                            _saving_json_state_history_ran_timestamp = now;
                        } else {

                            // History states just got shuffled and we need to update the right moment in time (in the not-now-that-is-now)
                            for (let i = 0; i < _json_state_history.state_history.length; i++) {

                                if ((_json_state_history.state_history[i]._timestamp|0) === new_current_state_timestamp) {

                                    _json_state_history.state_history[i] = Object.assign({}, new_current_state);
                                    _saving_json_state_history_ran_timestamp = now;
                                    i = _json_state_history.state_history.length;
                                }
                            }
                        }

                        this.super_state.set_state({_json_state_history: Object.assign({}, _json_state_history), _saving_json_state_history_running: false, _saving_json_state_history_ran_timestamp: _saving_json_state_history_ran_timestamp}).then(() => {

                            this._notify_can_undo_redo_change();

                            if(set_anyway_if_changes_callback) {
                                set_anyway_if_changes_callback(Object.assign({}, _json_state_history), Boolean(_saving_json_state_history_ran_timestamp === now));
                            }
                        });

                    });
                }
            }else {

                if(set_anyway_if_changes_callback) {
                    set_anyway_if_changes_callback(Object.assign({}, _json_state_history), false);
                }
            }
        }else {

            if(set_anyway_if_changes_callback) {
                set_anyway_if_changes_callback(Object.assign({}, _json_state_history), false);
            }
        }
    };

    _notify_is_something_selected = () => {

        const { _pxl_indexes_of_selection, _previous_pxl_indexes_of_selection } = this.super_state.get_state();

        if(Boolean(_previous_pxl_indexes_of_selection.size) !== Boolean(_pxl_indexes_of_selection.size)) {

            this.super_state.set_state({
                _is_something_selected: Boolean(_pxl_indexes_of_selection.size),
                _previous_pxl_indexes_of_selection: new SetFixed(_pxl_indexes_of_selection.indexes)
            }).then(() => {

                if(this.props.onSomethingSelectedChange) {

                    this.props.onSomethingSelectedChange(Boolean(_pxl_indexes_of_selection.size));
                }
            });
        }
    };

    _notify_image_load_complete = (only_scan = false) => {

        const { _s_pxl_colors, pxl_width, pxl_height } = this.super_state.get_state();

        let image_details = {
            width: pxl_width,
            height: pxl_height,
            number_of_colors: _s_pxl_colors[0].length,
            only_scan
        };

        if(this.props.onLoadComplete) { this.props.onLoadComplete("image_load", image_details); }
    };

    _notify_image_import_complete = () => {

        if(this.props.onImageImportComplete) { this.props.onImageImportComplete(); }
    };

    _notify_can_undo_redo_change = () => {

        if(this.props.onCanUndoRedoChange) { this.props.onCanUndoRedoChange(this._can_undo(), this._can_redo()); }
    };

    _notify_size_change = () => {

        const { pxl_width, pxl_height } = this.super_state.get_state();
        if(this.props.onSizeChange) { this.props.onSizeChange(pxl_width, pxl_height); }
    };

    import_JSON_state = (js) => {

        this.import_JS_state(js);
    };

    import_JS_state = (js, callback_function) => {

        var _base64_original_images = Array.from(js._base64_original_images);
        Promise.all(_base64_original_images.map((entry) => {return Promise.resolve(toBase64(entry[1])); }))
            .then((response) => {
                response.forEach((img_1, index) => {
                    _base64_original_images[index] = _base64_original_images[index][0] + "," + img_1;
                });

                let _json_state_history = {
                    history_position: parseInt(js._json_state_history.history_position),
                    state_history: js._json_state_history.state_history.map(function(state){
                        return Object.assign({}, {
                            _original_image_index: parseInt(state._original_image_index),
                            pxl_width: parseInt(state.pxl_width),
                            pxl_height: parseInt(state.pxl_height),
                            _pxl_indexes_of_selection: Boolean(state._pxl_indexes_of_selection.length) ? state._pxl_indexes_of_selection : new SetFixed(state.pxl_width * state.pxl_height),
                            _s_pxls: Array.from(state._s_pxls.map(function(a){return Uint16Array.from(a)})),
                            _s_pxl_colors:  Array.from(state._s_pxl_colors.map(function(a){return Uint32Array.from(a)})),
                            _layers: Array.from(state._layers.map(function(l) {
                                return Object.assign({}, {
                                    id: parseInt(l.id),
                                    hash: l.hash + "",
                                    name: l.name + "",
                                    hidden: Boolean(l.hidden),
                                    opacity: parseInt(l.opacity),
                                });
                            })),
                            _layer_index: parseInt(state._layer_index),
                            _pencil_mirror_index: parseInt(state._pencil_mirror_index),
                            _id: state._id.toString()
                        })
                    })
                };

                js = null;

                let sh = _json_state_history.state_history[_json_state_history.history_position];

                this.super_state.set_state({
                    _id: sh._id.toString(),
                    pxl_width: parseInt(sh.pxl_width),
                    pxl_height: parseInt(sh.pxl_height),
                    _base64_original_images: Array.from(_base64_original_images),
                    _original_image_index: parseInt(sh._original_image_index),
                    _layers: Array.from(sh._layers.map(function(l) {
                        return {
                            id: parseInt(l.id),
                            hash: l.hash + "",
                            name: l.name + "",
                            hidden: Boolean(l.hidden),
                            opacity: parseInt(l.opacity),
                        };
                    })),
                    _layer_index: parseInt(sh._layer_index),
                    _s_pxls: Array.from(sh._s_pxls.map(function(a){return Uint16Array.from(a)})),
                    _s_pxl_colors:  Array.from(sh._s_pxl_colors.map(function(a){return Uint32Array.from(a)})),
                    _pxl_indexes_of_selection: sh._pxl_indexes_of_selection,
                    _pencil_mirror_index: parseInt(sh._pencil_mirror_index),
                    _json_state_history: _json_state_history,
                    _pxls_hovered: -1,
                    _last_action_timestamp: 1/0,
                }).then(() => {

                    this.canvas_pos.set_sizes(parseInt(sh.pxl_width), parseInt(sh.pxl_height));
                    this.canvas_pos.set_current_scale_default();

                    this._request_force_update(false, false).then(() => {

                        this.super_canvas.set_dimensions(parseInt(sh.pxl_width), parseInt(sh.pxl_height)).then(() => {
                            this.super_master_meta.update_canvas().then(() => {
                                this._maybe_save_state( null, true);
                            });
                        });
                    });

                    this._notify_image_load_complete();
                    this._notify_is_something_selected();
                    this._notify_can_undo_redo_change();
                    callback_function();
                });

            });
    };

    export_JS_state = (callback_function) => {

        this._maybe_save_state((_json_state_history) => {

            var base64_o_i = this.super_state.get_state()._base64_original_images.map(function(img){ return img.split(","); });
            Promise.all([
                Promise.all(base64_o_i.map((entry) => {return Promise.resolve(toBytes(entry[1])); })),
                this.get_base64_png_data_url(1, false, 7, 35, 70)
            ]).then((responses) => {

                Array.from(responses[0]).forEach((img_1, index) => {
                    base64_o_i[index][1] = img_1;
                });

                _json_state_history = {
                    history_position: parseInt(_json_state_history.history_position),
                    state_history: _json_state_history.state_history.map(function(state){
                        return Object.assign({}, {
                            _original_image_index: parseInt(state._original_image_index),
                            pxl_width: parseInt(state.pxl_width),
                            pxl_height: parseInt(state.pxl_height),
                            _pxl_indexes_of_selection: Boolean(state._pxl_indexes_of_selection.length) ? state._pxl_indexes_of_selection : new SetFixed(state.pxl_width * state.pxl_height),
                            _s_pxls: Array.from(state._s_pxls.map(function(a){return Uint16Array.from(a)})),
                            _s_pxl_colors:  Array.from(state._s_pxl_colors.map(function(a){return Uint32Array.from(a)})),
                            _layers: Array.from(state._layers.map(function(l) {
                                return Object.assign({}, {
                                    id: parseInt(l.id),
                                    hash: l.hash + "",
                                    name: l.name + "",
                                    hidden: Boolean(l.hidden),
                                    opacity: parseInt(l.opacity),
                                });
                            })),
                            _layer_index: parseInt(state._layer_index),
                            _pencil_mirror_index: parseInt(state._pencil_mirror_index),
                            _id: state._id.toString()
                        })
                    })
                };

                const bytes = 3 * Math.ceil((responses[1].url.length/4));
                callback_function({
                    id: this.super_state.get_state()._id.toString(),
                    kb: bytes / 1024,
                    preview: responses[1].url,
                    timestamp: Date.now(),
                    _base64_original_images: base64_o_i,
                    _json_state_history
                });

            });
        });
    };

    _can_undo = (_json_state_history) => {
        "use strict";
        if(!Boolean(_json_state_history)) {

            _json_state_history = this.super_state.get_state()._json_state_history;
        }

        return parseInt(_json_state_history.history_position);
    };

    undo = () => {

        this._maybe_save_state((_json_state_history) => {

            "use strict";
            if(this._can_undo(_json_state_history) > 0){

                _json_state_history.history_position = parseInt(_json_state_history.history_position-1);

                const sh = _json_state_history.state_history[_json_state_history.history_position];
                const has_new_dimension = Boolean(sh.pxl_width !== this.super_state.get_state().pxl_width || sh.pxl_height !== this.super_state.get_state().pxl_height);

                this.super_state.set_state({
                    _id: sh._id.toString(),
                    pxl_width: parseInt(sh.pxl_width),
                    pxl_height: parseInt(sh.pxl_height),
                    _original_image_index: parseInt(sh._original_image_index),
                    _layers: Array.from(sh._layers.map(function(l) {
                        return {
                            id: parseInt(l.id),
                            hash: l.hash + "",
                            name: l.name + "",
                            hidden: Boolean(l.hidden),
                            opacity: parseInt(l.opacity),
                        };
                    })),
                    _layer_index: parseInt(sh._layer_index),
                    _s_pxls: Array.from(sh._s_pxls.map(function(a){return Uint16Array.from(a);})),
                    _s_pxl_colors: Array.from(sh._s_pxl_colors.map(function(a){return Uint32Array.from(a);})),
                    _pxl_indexes_of_selection: sh._pxl_indexes_of_selection,
                    _pencil_mirror_index: parseInt(sh._pencil_mirror_index),
                    _json_state_history: _json_state_history,
                    _last_action_timestamp: Date.now(),
                }).then(() => {

                    if(has_new_dimension) {
                        this.canvas_pos.set_sizes(sh.pxl_width, sh.pxl_height);
                        this.canvas_pos.set_current_scale_default();
                        this._notify_image_load_complete(true);
                    }

                    this._request_force_update(false, false).then(() => {

                        this.super_canvas.set_dimensions(sh.pxl_width, sh.pxl_height).then(() => this.super_master_meta.update_canvas());
                    });

                    this._notify_is_something_selected();
                    this._notify_can_undo_redo_change();
                });
            }
        }, true);
    };

    _can_redo = (_json_state_history) => {
        "use strict";
        if(!Boolean(_json_state_history)) {

            _json_state_history = this.super_state.get_state()._json_state_history;
        }

        return _json_state_history.state_history.length - parseInt(_json_state_history.history_position) - 1 | 0;
    }

    redo = () => {

        this._maybe_save_state((_json_state_history) => {
            "use strict";
            if (this._can_redo(_json_state_history) > 0) {

                _json_state_history.history_position =  parseInt(_json_state_history.history_position+1);
                const sh = _json_state_history.state_history[_json_state_history.history_position];
                const has_new_dimension = Boolean(sh.pxl_width !== this.super_state.get_state().pxl_width || sh.pxl_height !== this.super_state.get_state().pxl_height);

                this.super_state.set_state({
                    _id: sh._id.toString(),
                    pxl_width: parseInt(sh.pxl_width),
                    pxl_height: parseInt(sh.pxl_height),
                    _original_image_index: parseInt(sh._original_image_index),
                    _layers: Array.from(sh._layers.map(function(l) {
                        return {
                            id: parseInt(l.id),
                            hash: l.hash + "",
                            name: l.name + "",
                            hidden: Boolean(l.hidden),
                            opacity: parseInt(l.opacity),
                        };
                    })),
                    _layer_index: parseInt(sh._layer_index),
                    _s_pxls: Array.from(sh._s_pxls.map(function(a){return Uint16Array.from(a);})),
                    _s_pxl_colors: Array.from(sh._s_pxl_colors.map(function(a){return Uint32Array.from(a);})),
                    _pxl_indexes_of_selection: sh._pxl_indexes_of_selection,
                    _pencil_mirror_index: parseInt(sh._pencil_mirror_index),
                    _json_state_history: _json_state_history,
                    _last_action_timestamp: Date.now(),
                }).then(() => {

                    if(has_new_dimension) {
                        this.canvas_pos.set_sizes(sh.pxl_width, sh.pxl_height);
                        this.canvas_pos.set_current_scale_default();
                        this._notify_image_load_complete(true);
                    }

                    this._request_force_update(false, false).then(() => {

                        this.super_canvas.set_dimensions(sh.pxl_width, sh.pxl_height).then(() => this.super_master_meta.update_canvas());
                    });

                    this._notify_is_something_selected();
                    this._notify_can_undo_redo_change();
                });
            }
        }, true);
    }

    to_selection_border = () => {

        const { pxl_current_color_uint32, _s_pxls,  _pxl_indexes_of_selection, _s_pxl_colors, _layer_index, pxl_current_opacity } = this.super_state.get_state();

        let pxls =  new Uint16Array(_s_pxls[_layer_index].buffer);
        let pxl_colors = Array.from(_s_pxl_colors[_layer_index]);
        let pxls_of_the_border = this._get_border_from_selection(_pxl_indexes_of_selection);

        pxls_of_the_border.forEach((pxl_index) => {

            const current_pxl_color_index = pxls[pxl_index];
            const current_pxl_color = pxl_colors[current_pxl_color_index];
            const current_pxl_new_color = this.color_conversion.blend_colors(current_pxl_color, pxl_current_color_uint32, pxl_current_opacity, false, false);

            // Eventually add current color to color list
            if(!pxl_colors.includes(current_pxl_new_color)){

                pxl_colors.push(current_pxl_new_color);
            }

            const current_pxl_new_color_index = pxl_colors.indexOf(current_pxl_new_color);
            pxls[pxl_index] = current_pxl_new_color_index;
        });

        let ns_pxl_colors = this.super_state.get_state()._s_pxl_colors;
        ns_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);

        let ns_pxls = this.super_state.get_state()._s_pxls;
        ns_pxls[_layer_index] =  new Uint16Array(pxls.buffer);

        this.super_state.set_state({_s_pxl_colors: ns_pxl_colors, _s_pxls: ns_pxls, _last_action_timestamp: Date.now()}).then(() => this.super_master_meta.update_canvas());
    }

    to_selection_bucket = () => {

        const { _s_pxls, _pxl_indexes_of_selection, _s_pxl_colors, _layer_index, pxl_current_opacity, pxl_current_color_uint32 } = this.super_state.get_state();

        let pxls =  new Uint16Array(_s_pxls[_layer_index].buffer);
        let pxl_colors = Array.from(_s_pxl_colors[_layer_index])
        _pxl_indexes_of_selection.forEach((pxl_index) => {

            const current_pxl_color_index = pxls[pxl_index];
            const current_pxl_color = pxl_colors[current_pxl_color_index];
            const current_pxl_new_color = this.color_conversion.blend_colors(current_pxl_color, pxl_current_color_uint32, pxl_current_opacity, false, false);

            // Eventually add current color to color list
            if(!pxl_colors.includes(current_pxl_new_color)){

                pxl_colors.push(current_pxl_new_color);
            }

            const current_pxl_new_color_index = pxl_colors.indexOf(current_pxl_new_color);
            pxls[pxl_index] = current_pxl_new_color_index;
        });

        let ns_pxl_colors = this.super_state.get_state()._s_pxl_colors;
        ns_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);

        let ns_pxls = this.super_state.get_state()._s_pxls;
        ns_pxls[_layer_index] =  new Uint16Array(pxls.buffer);

        this.super_state.set_state({_s_pxl_colors: ns_pxl_colors, _s_pxls: ns_pxls, _last_action_timestamp: Date.now()}).then(() => this.super_master_meta.update_canvas());
    }

    to_selection_invert = () => {

        const { _s_pxls, _pxl_indexes_of_selection, _layer_index, pxl_width, pxl_height } = this.super_state.get_state();

        const pxl_indexes_of_selection_set = _pxl_indexes_of_selection;
        let pxl_indexes_of_selection = new SetFixed(pxl_width * pxl_height);

        for (let i = 0; i < _s_pxls[_layer_index].length; i++) {

            if(!pxl_indexes_of_selection_set.has(i)) {
                pxl_indexes_of_selection.add(i);
            }
        }

        this.super_state.set_state({_pxl_indexes_of_selection: pxl_indexes_of_selection, _last_action_timestamp: Date.now()}).then(() => this.super_master_meta.update_canvas());
    }

    get_average_color_of_selection = () => {

        return this.color_conversion.to_hex_from_uint32(this._get_average_color_of_selection());
    };

    _get_average_color_of_selection = (_pxl_indexes_of_selection, pxls, pxl_colors ) => {

        const { _s_pxls, _s_pxl_colors, _layer_index, pxl_width, pxl_height } = this.super_state.get_state();

        pxls = pxls ||  new Uint16Array(_s_pxls[_layer_index].buffer);
        pxl_colors = pxl_colors || new Uint32Array(_s_pxl_colors[_layer_index].buffer);

        let colors_index = new SetFixed(pxl_width * pxl_height);
        let colors_in_selection_with_occurrence = [];

        colors_index.forEach((ci) => {

            colors_in_selection_with_occurrence[ci] = 1;
        });

        _pxl_indexes_of_selection = _pxl_indexes_of_selection || this.super_state.get_state()._pxl_indexes_of_selection;

        _pxl_indexes_of_selection.forEach((pxl_index) => {

            colors_in_selection_with_occurrence[pxls[pxl_index]] ++;
        });

        let colors_total_occurrence = 0;
        Object.entries(colors_in_selection_with_occurrence).forEach((entry) => {

            colors_total_occurrence += entry[1];
        });

        let average_color = 0;
        Object.entries(colors_in_selection_with_occurrence).forEach((entry) => {

            const [current_color_index, occurrence] = entry;
            average_color = this.color_conversion.blend_colors(average_color, pxl_colors[current_color_index], occurrence / colors_total_occurrence, false, false);
        });

        return average_color;
    };

    to_selection_changes = (color, change_not_only_hue = false) => {

        const [o_r, o_g, o_b, o_a] = this.color_conversion.to_rgba_from_uint32(color);
        let [hue, saturation, luminosity, alpha] = this.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(o_r, o_g, o_b, o_a));

        const { _s_pxls, _pxl_indexes_of_selection, _s_pxl_colors, _layer_index } = this.super_state.get_state();

        let pxls =  new Uint16Array(_s_pxls[_layer_index].buffer);
        let pxl_colors = Array.from(_s_pxl_colors[_layer_index]);

        const average_color = this._get_average_color_of_selection();
        const [ac_r, ac_g, ac_b, ac_a] = this.color_conversion.to_rgba_from_uint32(average_color)
        const [ac_h, ac_s, ac_l, ac_o] = this.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(ac_r, ac_g, ac_b, ac_a));
        const global_hue_diff = ac_h - hue;

        _pxl_indexes_of_selection.forEach((pxl_index, iteration, array) => {

            const current_pxl_color_index = pxls[pxl_index];
            const current_pxl_color = pxl_colors[current_pxl_color_index];

            const [c_r, c_g, c_b, c_a] = this.color_conversion.to_rgba_from_uint32(current_pxl_color);
            let [c_hue, c_saturation, c_luminosity, c_opacity] = this.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(c_r, c_g, c_b, c_a));
            const c_new_hue = Boolean(c_hue + global_hue_diff < 0 ) ? (360 + c_hue + global_hue_diff) % 360: (c_hue + global_hue_diff) % 360;

            let added = [saturation, luminosity, 1];
            let base = [c_saturation, c_luminosity, 1];
            let mix = [];

            if (c_a !== 0 && change_not_only_hue) {

                mix[2] = 1 - (1 - added[2]) * (1 - base[2]);
                mix[0] = Math.round((added[0] * added[2] / mix[2]) + (base[0] * base[2] * (1 - added[2]) / mix[2]));
                mix[1] = Math.round((added[1] * added[2] / mix[2]) + (base[1] * base[2] * (1 - added[2]) / mix[2]));
            }else {

                mix = [c_saturation, c_luminosity];
            }

            const [h_r, h_g, h_b, h_a] = this.color_conversion.to_rgba_from_hsla(Array.of(c_new_hue, mix[0], mix[1], c_opacity));
            let current_pxl_color_new = 0;

            if (c_a !== 0) {

                current_pxl_color_new = this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(h_r, h_g, h_b, h_a));
            }

            // Eventually add current color to color list
            if(!pxl_colors.includes(current_pxl_color_new)){

                pxl_colors.push(current_pxl_color_new);
            }

            pxls[pxl_index] = pxl_colors.indexOf(current_pxl_color_new);

        });

        let ns_pxl_colors = this.super_state.get_state()._s_pxl_colors;
        ns_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);

        let ns_pxls = this.super_state.get_state()._s_pxls;
        ns_pxls[_layer_index] =  new Uint16Array(pxls.buffer);

        this.super_state.set_state( {
            _s_pxl_colors: ns_pxl_colors,
            _s_pxls: ns_pxls,
            _last_action_timestamp: Date.now()
        }).then(() => this.super_master_meta.update_canvas());
    };

    _get_border_from_selection = (selection, inside = true, bold = false) => {

        const { pxl_width, pxl_height } = this.super_state.get_state();

        let pxls_of_the_border = new SetFixed(pxl_width * pxl_height);

        selection.forEach((pxl_index, iteration) => {

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

                if(!selection.has(up)){
                    pxls_of_the_border.add(up)
                }
                if(!selection.has(right)){
                    pxls_of_the_border.add(right)
                }
                if(!selection.has(bottom)){
                    pxls_of_the_border.add(bottom)
                }
                if(!selection.has(left)){
                    pxls_of_the_border.add(left)
                }

                if(bold) {

                    if(!selection.has(up_left)){
                        pxls_of_the_border.add(up_left)
                    }
                    if(!selection.has(up_right)){
                        pxls_of_the_border.add(up_right)
                    }
                    if(!selection.has(bottom_left)){
                        pxls_of_the_border.add(bottom_left)
                    }
                    if(!selection.has(bottom_right)){
                        pxls_of_the_border.add(bottom_right)
                    }
                }

            }else {
                if(
                    !selection.has(up) || -1 === up ||
                    !selection.has(right) || -1 === right ||
                    !selection.has(bottom) || -1 === bottom ||
                    !selection.has(left) || -1 === left
                ) {

                    pxls_of_the_border.add(pxl_index);
                }

                if(bold) {

                    if(
                        !selection.has(up_left) || -1 === up_left ||
                        !selection.has(up_right) || -1 === up_right ||
                        !selection.has(bottom_left) || -1 === bottom_left ||
                        !selection.has(bottom_right) || -1 === bottom_right
                    ) {

                        pxls_of_the_border.add(pxl_index);
                    }

                }
            }

        });

        return pxls_of_the_border;
    };

    _to_selection_crop = () => {

        let { _s_pxls, _s_pxl_colors, _layer_index, _pxl_indexes_of_selection, pxl_width, pxl_height, _base64_original_images, _original_image_index } = this.super_state.get_state();

        if(_pxl_indexes_of_selection.size > 0) {

            let ns_pxls = Array.from(_s_pxls);
            let ns_pxl_colors = Array.from(_s_pxl_colors);

            let top_left = [pxl_width, pxl_height];
            let bottom_right = [-1, -1];

            _pxl_indexes_of_selection.forEach((pxl_index) => {

                const x = pxl_index % pxl_width;
                const y = (pxl_index - x) / pxl_width;

                if (x < top_left[0]) {
                    top_left[0] = x
                }
                if (y < top_left[1]) {
                    top_left[1] = y
                }

                if (x > bottom_right[0]) {
                    bottom_right[0] = x
                }
                if (y > bottom_right[1]) {
                    bottom_right[1] = y
                }

            });

            const new_width = 1 + bottom_right[0] - top_left[0];
            const new_height = 1 + bottom_right[1] - top_left[1];

            for (let l = 0; l < _s_pxls.length; l++) {

                let pxls = _s_pxls[l];
                let new_pxls = new Uint16Array(new_width * new_height);
                let new_pxl_colors = [];

                for (let i = 0; i < new_width * new_height; i++) {

                    let x = i % new_width;
                    let y = (i - x) / new_width;

                    x += top_left[0];
                    y += top_left[1];

                    const index = y * pxl_width + x;

                    new_pxls[i] = pxls[index];
                }

                [new_pxls, new_pxl_colors] = this.color_conversion.clean_duplicate_colors(new_pxls, Uint32Array.from(_s_pxl_colors[l]));
                ns_pxls[l] = new_pxls;
                ns_pxl_colors[l] = new_pxl_colors;
            }

            if (typeof _base64_original_images[_original_image_index] !== "undefined") {


                let image = new Image();
                image.onload = () => {

                    const s_width = image.width * (new_width / pxl_width);
                    const s_height = image.height * (new_height / pxl_height);

                    let [ctx, canvas] = this._get_new_ctx_from_canvas(s_width, s_height);

                    ctx.save();
                    ctx.drawImage(
                        image,
                        image.width * (top_left[0] / pxl_width),
                        image.height * (top_left[1] / pxl_height),
                        s_width,
                        s_height,
                        0,
                        0,
                        s_width,
                        s_height
                    );
                    ctx.restore();

                    let base64_original_image = image.src.includes("image/png") ?
                        canvas.toDataURL("image/png") :
                        canvas.toDataURL("image/jpeg");

                    ctx = null;
                    canvas = null;

                    const new_base64_original_images = !_base64_original_images.includes(base64_original_image) ?
                        _base64_original_images.concat([base64_original_image]) :
                        _base64_original_images;

                    base64_original_image = null;

                    this.super_state.set_state({
                        _s_pxls: ns_pxls,
                        _s_pxl_colors: ns_pxl_colors,
                        pxl_width: new_width,
                        pxl_height: new_height,
                        _pxl_indexes_of_selection: new SetFixed(new_width * new_height),
                        _original_image_index: new_base64_original_images.indexOf(base64_original_image),
                        _last_action_timestamp: Date.now(),
                    }).then(() => {

                        this.canvas_pos.set_sizes(new_width, new_height);
                        this.canvas_pos.set_current_scale_default();

                        this._request_force_update(false, false).then(() => {

                            this.super_canvas.set_dimensions(new_width, new_height).then(() => this.super_master_meta.update_canvas());
                        });

                        this._notify_image_load_complete(true);
                    });
                }
                image.src = _base64_original_images[_original_image_index];

            }else {

                this.super_state.set_state({
                    _s_pxls: ns_pxls,
                    _s_pxl_colors: ns_pxl_colors,
                    pxl_width: new_width,
                    pxl_height: new_height,
                    _pxl_indexes_of_selection: new SetFixed(new_width * new_height),
                    _last_action_timestamp: Date.now(),
                }).then(() => {

                    this.canvas_pos.set_sizes(new_width, new_height);
                    this.canvas_pos.set_current_scale_default();

                    this._request_force_update(false, false).then(() => {

                        this.super_canvas.set_dimensions(new_width, new_height).then(() => this.super_master_meta.update_canvas());
                    });
                });
            }
        }
    };

    to_selection_size = (grow) => {

        let { _pxl_indexes_of_selection } = this.super_state.get_state();

        _pxl_indexes_of_selection = this._to_selection_size(grow, _pxl_indexes_of_selection);

        this.super_state.set_state({_pxl_indexes_of_selection}).then(() => this.super_master_meta.update_canvas());
    };

    _to_selection_size = (grow, _pxl_indexes_of_selection) => {

        _pxl_indexes_of_selection = _pxl_indexes_of_selection;

        for (let si = 1; si <= Math.abs(grow); si++) {

            const pxls_of_the_border = this._get_border_from_selection(_pxl_indexes_of_selection, grow < 0, false);
            if(grow < 0) {
                pxls_of_the_border.forEach(function (pxl){
                    _pxl_indexes_of_selection.delete(pxl);
                });
            }else {
                pxls_of_the_border.forEach(function (pxl){
                    _pxl_indexes_of_selection.add(pxl);
                });
            }
        }

        return _pxl_indexes_of_selection;

    }

    to_selection_none = () => {

        let _pxl_indexes_of_selection = this.super_state.get_state()._pxl_indexes_of_selection;
        _pxl_indexes_of_selection.clear();

        this.super_state.set_state({_pxl_indexes_of_selection}).then(() => {

            this._notify_is_something_selected();
            this.super_master_meta.update_canvas();
        });
    };

    confirm_import = () => {

        this._merge_import();
    };

    _merge_import = () => {

        const {imported_image_pxls_positioned, imported_image_pxl_colors} = this.super_state.get_imported_image_data()
        let { _s_pxls, _s_pxl_colors, _layer_index } = this.super_state.get_state();

        let pxl_colors = Array.from(_s_pxl_colors[_layer_index]);
        Object.entries(imported_image_pxls_positioned).forEach((entry) => {

            const [pixel_index, color_index] = entry;

            const old_pixel_color_index = _s_pxls[_layer_index][pixel_index];
            const old_pixel_color_hex = _s_pxl_colors[_layer_index][old_pixel_color_index];
            const top_pixel_color_hex = imported_image_pxl_colors[color_index];
            const new_pixel_color_hex = this.color_conversion.blend_colors(old_pixel_color_hex, top_pixel_color_hex, 1, false, false);


            if(!pxl_colors.includes(new_pixel_color_hex)) {
                pxl_colors.push(new_pixel_color_hex);
            }

            _s_pxls[_layer_index][pixel_index] = pxl_colors.indexOf(new_pixel_color_hex);
        });
        _s_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);

        this.super_state.set_state({
            _s_pxls,
            _s_pxl_colors,
            _imported_image_start_x: 0,
            _imported_image_start_y: 0,
            _imported_image_scale_delta_x: 0,
            _imported_image_scale_delta_y: 0,
            _imported_image_pxls: [],
            _imported_image_width: 0,
            _imported_image_height: 0,
            _imported_image_pxl_colors: [],
            _imported_image_move_from: [0, 0],
            _last_action_timestamp: Date.now(),
        }).then(() => {

            this.super_master_meta.update_canvas();
            this._notify_is_image_import_mode();
        });
    };

    _notify_is_image_import_mode = () => {

        const { _imported_image_pxls } = this.super_state.get_state();
        const is_image_import_mode = _imported_image_pxls.length > 0;

        this.super_state.set_state({_is_image_import_mode: is_image_import_mode});

        if(this.props.onImageImportModeChange) {

            this.props.onImageImportModeChange(is_image_import_mode);
        }
    }

    to_selection_crop = () => {

        this._to_selection_crop();
    };

    to_rotation = (right = true) => {

        this._to_rotation(right);
    }

    to_greyscale = () => {

        this._to_colorized("greyscale");
    };

    to_sepia = () => {

        this._to_colorized("sepia");
    };

    to_opacity = (opacity = 0) => {

        this._to_colorized(null, opacity);
    }

    to_color = (hue = 0, strength = 0, blend_with_a_saturation_of = null, blend_with_a_luminosity_of = null) => {

        this._to_colorized(hue, strength, blend_with_a_saturation_of, blend_with_a_luminosity_of);
    }

    to_vignette = (color, intensity) => {

        this._to_vignette(color, intensity);
    }

    less_colors_stepped = (increase = 1, callback_function = () => {}) => {

        let colors_removed = 0;
        let less_color_step = increase;
        const try_another = () => {

            this.to_less_color(less_color_step / 64, (result) => {

                colors_removed = result.colors_removed;
                less_color_step += increase;
                increase -= colors_removed > 0 ? 1: 0;
                if(colors_removed < 1) {
                    try_another();
                }else {

                    callback_function(result);
                }
            });
        };

        try_another();
    };

    to_less_color = (threshold = 1/16, callback_function = () => {}) => {


        if(this.props.onLoad) {

            if(threshold === "auto") {

                this.props.onLoad("less_color_auto");
            }else {

                this.props.onLoad("less_color_auto");
            }
        }

        this._to_less_color(threshold, (results) => {

            if(this.props.onLoadComplete) {

                if(threshold === "auto") {

                    if(this.props.onLoadComplete) { this.props.onLoadComplete("less_color_auto", results); }
                }else {

                    if(this.props.onLoadComplete) { this.props.onLoadComplete("less_color_auto", results); }
                }
            }
            callback_function(results);
        });
    }

    auto_adjust_contrast = (intensity = 1) => {

        this._auto_adjust_contrast(intensity);
    }

    auto_adjust_saturation = (intensity = 1.5) => {

        this._auto_adjust_saturation(intensity);
    }

    smooth_adjust = (intensity = 1) => {

        this._auto_adjust_smoothness();
    }

    to_alpha = (color = "#00000000", intensity = 1) => {

        this._to_alpha(this.color_conversion.to_uint32_from_hex(this.color_conversion.format_hex_color(color)), intensity);
    }

    to_filter = (name = "1997", intensity) => {

        this._to_filter(name, parseFloat(intensity));
    }

    to_mirror = (horizontal = true) => {

        this._invert_pixel(horizontal ? "HORIZONTAL": "VERTICAL");
    };

    to_dutone = (contrast = 0.8, color_a = "#ffffffff", color_b = "#000000ff") => {

        this._to_dutone(contrast, this.color_conversion.to_uint32_from_hex(this.color_conversion.format_hex_color(color_a)), this.color_conversion.to_uint32_from_hex(this.color_conversion.format_hex_color(color_b)));
    };

    _invert_pixel = (direction) => {

        const { _s_pxls, pxl_width, pxl_height, _base64_original_images, _original_image_index, _pxl_indexes_of_selection, _shape_index_a, _select_shape_index_a, _layer_index } = this.super_state.get_state();
        let {_imported_image_pxls, _imported_image_width, _imported_image_height} = this.super_state.get_state();

        let pxls =  Uint16Array.from(_s_pxls[_layer_index]);
        let new_pxl_indexes_of_selection = new SetFixed(pxls.length);
        let new_shape_index_a = _shape_index_a;
        let new_select_shape_index_a = _select_shape_index_a;
        let ns_pxls = Array.from(_s_pxls);
        let x_scale = 1;
        let y_scale = 1;

        if(direction === "HORIZONTAL") {

            if(_imported_image_pxls.length) {

                let n_imported_image_pxls = new Uint16Array(_imported_image_pxls.length);

                _imported_image_pxls.forEach(function(pxl, index) {

                    let x = index % _imported_image_width;
                    let y = (index - x) / _imported_image_width;
                    x = (_imported_image_width - 1) - x;
                    let new_index = y * _imported_image_width + x;

                    n_imported_image_pxls[new_index] = pxl;
                });

                _imported_image_pxls = n_imported_image_pxls;
            }else {

                ns_pxls[_layer_index].forEach(function(pxl, index) {

                    let x = index % pxl_width;
                    let y = (index - x) / pxl_width;
                    x = (pxl_width - 1) - x;
                    let new_index = y * pxl_width + x;

                    pxls[new_index] = pxl;

                    if(_pxl_indexes_of_selection.has(index)) {

                        new_pxl_indexes_of_selection.add(new_index);
                    }

                    if(_shape_index_a === index) {

                        new_shape_index_a = new_index;
                    }

                    if(_select_shape_index_a === index) {

                        new_select_shape_index_a = new_index;
                    }

                });


                x_scale = -1;
                ns_pxls[_layer_index] = pxls;

            }

        }else {

            if(_imported_image_pxls.length) {

                let n_imported_image_pxls = new Uint16Array(_imported_image_pxls.length);

                _imported_image_pxls.forEach(function(pxl, index) {

                    let x = index % _imported_image_width;
                    let y = (index - x) / _imported_image_width;
                    y = (_imported_image_height - 1) - y;
                    let new_index = y * _imported_image_width + x;

                    n_imported_image_pxls[new_index] = pxl;
                });

                _imported_image_pxls = n_imported_image_pxls;
            }else {

                ns_pxls[_layer_index].forEach(function(pxl, index) {

                    let x = index % pxl_width;
                    let y = (index - x) / pxl_width;
                    y = (pxl_height - 1) - y;
                    let new_index = y * pxl_width + x;

                    pxls[new_index] = pxl;

                    if(_pxl_indexes_of_selection.has(index)) {

                        new_pxl_indexes_of_selection.add(new_index);
                    }

                    if(_shape_index_a === index) {

                        new_shape_index_a = new_index;
                    }

                    if(_select_shape_index_a === index) {

                        new_select_shape_index_a = new_index;
                    }
                });

                y_scale = -1;
                ns_pxls[_layer_index] = pxls;

            }

        }

        if(typeof _base64_original_images[_original_image_index] !== "undefined" && _layer_index === 0 && !_imported_image_pxls.length) {


            let image = new Image();
            image.onload = () => {

                let [ ctx, canvas ] = this._get_new_ctx_from_canvas(image.naturalWidth, image.naturalHeight);

                ctx.save();
                ctx.scale(x_scale, y_scale);
                ctx.drawImage(image, 0, 0, image.naturalWidth * x_scale, image.naturalHeight * y_scale);
                ctx.restore();

                const base64_original_image = image.src.includes("image/png") ?
                    canvas.toDataURL("image/png"):
                    canvas.toDataURL("image/jpeg");

                const new_base64_original_images = !_base64_original_images.includes(base64_original_image) ?
                    _base64_original_images.concat([base64_original_image]):
                    _base64_original_images;


                this.super_state.set_state({
                    _shape_index_a: new_shape_index_a,
                    _select_shape_index_a: new_select_shape_index_a,
                    _pxl_indexes_of_selection: new_pxl_indexes_of_selection,
                    _s_pxls: ns_pxls,
                    _base64_original_images: new_base64_original_images,
                    _original_image_index: new_base64_original_images.indexOf(base64_original_image),
                    _imported_image_pxls,
                    _last_action_timestamp: Date.now()
                }).then(() => this.super_master_meta.update_canvas())

            };
            image.src = _base64_original_images[_original_image_index];

        }else {


            this.super_state.set_state({
                _shape_index_a: new_shape_index_a,
                _select_shape_index_a: new_select_shape_index_a,
                _pxl_indexes_of_selection: new_pxl_indexes_of_selection,
                _s_pxls: ns_pxls,
                _last_action_timestamp: Date.now(),
                _imported_image_pxls
            }).then(() => this.super_master_meta.update_canvas());
        }
    };

    _get_darkest_color = (pxl_colors) => {

        let darkest_r_g_b_a = this.color_conversion.to_rgba_from_hex(pxl_colors[0]);

        pxl_colors.forEach((pxl_color) => {

            const current_rgba = this.color_conversion.to_rgba_from_hex(pxl_color);
            const current_rgb_sum = current_rgba[0] + current_rgba[1] + current_rgba[2];
            const darkest_rgb_sum = darkest_r_g_b_a[0] + darkest_r_g_b_a[1] + darkest_r_g_b_a[2];

            if(current_rgb_sum < darkest_rgb_sum) {

                darkest_r_g_b_a = current_rgba;
            }
        });

        return this.color_conversion.to_hex_from_rgba(Uint8ClampedArray.of(darkest_r_g_b_a[0], darkest_r_g_b_a[1], darkest_r_g_b_a[2], 255));
    };

    _to_alpha = (color = 0, intensity = 1) => {

        const { _s_pxls, _s_pxl_colors, _layer_index } = this.super_state.get_state();
        const [ new_pxls, new_pxl_colors ] = this._pxl_colors_to_alpha(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], color, intensity);

        let ns_pxl_colors = this.super_state.get_state()._s_pxl_colors;
        ns_pxl_colors[_layer_index] = new_pxl_colors;

        let ns_pxls = this.super_state.get_state()._s_pxls;
        ns_pxls[_layer_index] = new_pxls;

        this.super_state.set_state({_s_pxls: ns_pxls, _s_pxl_colors: ns_pxl_colors, _last_action_timestamp: Date.now()}).then(() => this.super_master_meta.update_canvas());
    }

    _to_less_color = (threshold, callback_function = () => {}) => {

        const { _layer_index } = this.super_state.get_state();
        let { _s_pxls, _s_pxl_colors } = this.super_state.get_state();

        const color_number = _s_pxl_colors[_layer_index].length;
        this._remove_close_pxl_colors(Array.from(_s_pxls[_layer_index]), new Uint32Array(_s_pxl_colors[_layer_index].buffer), threshold).then(([pxls, pxl_colors]) => {

            _s_pxls[_layer_index] =  new Uint16Array(pxls.buffer);
            _s_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);

            const color_remaining_number = _s_pxl_colors[_layer_index].length;
            let results = {
                colors_removed: color_number - color_remaining_number,
                colors_remaining: color_remaining_number,
            };

            this.super_state.set_state({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}).then(() => {

                this.super_master_meta.update_canvas();
                callback_function(results);
            });
        });
    };

    _auto_adjust_contrast = (intensity = 1) => {

        const { _layer_index } = this.super_state.get_state();
        let { _s_pxls, _s_pxl_colors } = this.super_state.get_state();

        [ _s_pxls[_layer_index], _s_pxl_colors[_layer_index] ] = this._pxl_adjust_contrast(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], intensity);


        this.super_state.set_state({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}).then(() => this.super_master_meta.update_canvas());
    };

    _auto_adjust_saturation = (intensity = 1) => {

        const { _layer_index } = this.super_state.get_state();
        let { _s_pxls, _s_pxl_colors } = this.super_state.get_state();

        [ _s_pxls[_layer_index], _s_pxl_colors[_layer_index] ] = this._pxl_adjust_saturation(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], intensity);

        this.super_state.set_state({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}).then(() => this.super_master_meta.update_canvas());
    }

    _pxl_adjust_saturation = (pxls, pxl_colors, intensity) => {

        let min_sat = 100;
        let max_sat = 0;

        intensity = parseFloat(intensity) * 255 | 0;
        let saturation = 0;
        let color;
        let colors = SIMDopeColors(pxl_colors);
        let length = colors.length;
        let hsla;

        for(let i = 0; (i|0) < (length|0); i = (i+1|0)>>>0) {

            color = colors.get_element(i);
            saturation = color.hsla[1];
            if((color.a | 0) > 0) {
                if((saturation|0) > (max_sat|0)) {max_sat = saturation | 0;}
                if((saturation|0) < (min_sat|0)) {min_sat = saturation | 0;}
            }
        }

        const alpha = 100 / Math.max(1, max_sat - min_sat);
        const beta = -min_sat * alpha | 0;

        for(let i = 0; (i|0) < (length|0); i = (i+1|0)>>>0) {

            color = colors.get_element(i);
            hsla = color.hsla;
            color.blend_with(
                SIMDopeColor.new_hsla(
                    hsla[0],
                    hsla[1] * alpha + beta | 0,
                    hsla[2],
                    hsla[3]
                ), intensity, false, false);
        }

        pxl_colors = colors.slice_uint32(0, length);
        return [pxls, pxl_colors, alpha, beta];
    };

    _selection_pxl_adjust_sat_lum = (bonus_malus_sat = 0, bonus_malus_lum = 0) => {

        const { _layer_index } = this.super_state.get_state();
        let { _s_pxls, _s_pxl_colors, _pxl_indexes_of_selection } = this.super_state.get_state();

        let pixels = _s_pxls[_layer_index];
        let colors = Array.from(_s_pxl_colors[_layer_index]);

        _pxl_indexes_of_selection.forEach((pixel_index) => {

            const uint32 = colors[pixels[pixel_index]];
            const [h, s, l, o] = this.color_conversion.to_hsla_from_rgba(this.color_conversion.to_rgba_from_uint32(uint32));

            const saturation = Math.min(100, Math.max(0, s + bonus_malus_sat));
            const luminance = Math.min(100, Math.max(0, l + bonus_malus_lum));
            const new_color = this.color_conversion.to_uint32_from_rgba(this.color_conversion.to_rgba_from_hsla(Array.of(h, saturation, luminance, o)));
            if(colors.indexOf(new_color) === -1) {

                colors.push(new_color);
            }
            pixels[pixel_index] = colors.indexOf(new_color);
        });

        colors = Uint32Array.from(colors);
        _s_pxl_colors[_layer_index] = colors;
        _s_pxls[_layer_index] = pixels;

        this.super_state.set_state({_s_pxl_colors, _s_pxls});
    }

    _auto_adjust_smoothness = () => {

        let { _layer_index,  _s_pxls, _s_pxl_colors, pxl_width, pxl_height } = this.super_state.get_state();

        [ _s_pxls[_layer_index], _s_pxl_colors[_layer_index] ] = this._pxl_adjust_smoothness(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], pxl_width, pxl_height);


        this.super_state.set_state({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}).then(() => this.super_master_meta.update_canvas());
    };

    _pxl_to_vignette = (pxls, pxl_colors, color, intensity, callback_function) => {

        const { pxl_current_color_uint32 } = this.super_state.get_state();
        const {pxl_width, pxl_height } = this.super_state.get_state();
        let [ctx, canvas] = this._get_new_ctx_from_canvas(pxl_width, pxl_height);

        // Create a radial gradient
        // The inner circle is at x=110, y=90, with radius=30
        // The outer circle is at x=100, y=100, with radius=70
        const max_width_height = Math.max(pxl_width, pxl_height);
        const inverted_color_uint32 = this.color_conversion.invert_uint32(pxl_current_color_uint32);

        let gradient = ctx.createRadialGradient(pxl_width / 2,pxl_height / 2,0, pxl_width / 2,pxl_height / 2, max_width_height / 2);

        gradient.addColorStop(1, this.color_conversion.to_hex_from_uint32(pxl_current_color_uint32));
        gradient.addColorStop(0.8, this.color_conversion.to_hex_from_uint32(this.color_conversion.blend_colors(pxl_current_color_uint32, inverted_color_uint32, 0.6)));
        gradient.addColorStop(0, this.color_conversion.to_hex_from_uint32(inverted_color_uint32));

        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, pxl_width, pxl_height);

        let canvas_image_data = ctx.getImageData(0, 0, pxl_width, pxl_height);
        ctx = null;
        canvas = null;
        let {new_pxls, new_pxl_colors} = this._get_pixels_palette_and_list_from_image_data(canvas_image_data, true, 0);
        canvas_image_data = null;

        this._remove_close_pxl_colors(new_pxls, new_pxl_colors, 255/6/255, null, 18).then( ([new_pxls, new_pxl_colors]) => {

            [new_pxls, new_pxl_colors] = this._pxl_colors_to_alpha(new_pxls, new_pxl_colors, inverted_color_uint32, 1);

            const [r, g, b] = this.color_conversion.to_rgba_from_uint32(pxl_current_color_uint32);
            new_pxl_colors = new_pxl_colors.map((pxl_color) => {

                pxl_color = pxl_color|0;
                const p_a = this.color_conversion.to_rgba_from_uint32(pxl_color)[3];
                return this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(r, g, b, p_a)) | 0;
            });

            let brand_new_pxl_colors = [];
            new_pxls = new_pxls.map((pxl, index) => {

                pxl = pxl|0;
                index = index|0;
                const pxl_color = (new_pxl_colors[pxl]|0) | 0;
                const old_pxl_color = (pxl_colors[pxls[index]]|0) | 0;

                const new_color = this.color_conversion.blend_colors(old_pxl_color, pxl_color, intensity, false, false);

                if (brand_new_pxl_colors.indexOf(new_color) === -1) {brand_new_pxl_colors.push(new_color);}
                const new_color_index = brand_new_pxl_colors.indexOf(new_color);

                return new_color_index;
            });

            new_pxl_colors = brand_new_pxl_colors;

            callback_function(Array.of(Uint16Array.from(new_pxls), Uint32Array.from(new_pxl_colors)));
        });
    };

    _to_vignette = (color, intensity) => {

        if(intensity > 0) {

            const {_layer_index} = this.super_state.get_state();
            let {_s_pxls, _s_pxl_colors} = this.super_state.get_state();

            this._pxl_to_vignette(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], color, intensity, (result) => {

                [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = result;

                this.super_state.set_state({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}).then(() => this.super_master_meta.update_canvas());
            });
        }
    };


    _to_colorized = (hue = null, opacity = null, blend_with_a_saturation_of = null, blend_with_a_luminosity_of = null) => {

        const { _s_pxl_colors, _layer_index } = this.super_state.get_state();
        opacity = opacity === null ? 1: opacity;

        const _new_pxl_colors = _s_pxl_colors[_layer_index].map((color) => {

            const [r, g, b, a] = this.color_conversion.to_rgba_from_uint32(color);
            let [hue2, saturation2, luminosity2, op2] = this.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(r, g, b, a));

            let added = [blend_with_a_saturation_of, blend_with_a_luminosity_of, opacity];
            let base = [saturation2, luminosity2, op2/100];
            let mix = [];

            if (opacity !== 0) {

                mix[2] = 1 - (1 - added[2]) * (1 - base[2]); // alpha
                mix[0] = Math.round((added[0] * added[2] / mix[2]) + Math.round(base[0] * base[2] * (1 - added[2]) / mix[2])); // saturation
                mix[1] = Math.round((added[1] * added[2] / mix[2]) + Math.round(base[1] * base[2] * (1 - added[2]) / mix[2])); // luminosity
            }else {

                mix = [saturation2, luminosity2];
            }

            const [h_r, h_g, h_b, h_a] = this.color_conversion.to_rgba_from_hsla(Array.of(hue, mix[0], mix[1], mix[2]*100));

            if (a === 0) {

                color = 0;
            }else {

                color = this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(h_r, h_g, h_b, h_a));
            }

            return color;
        });

        let ns_pxl_colors = this.super_state.get_state()._s_pxl_colors;
        ns_pxl_colors[_layer_index] = _new_pxl_colors;

        this.super_state.set_state({_s_pxl_colors: ns_pxl_colors, _last_action_timestamp: Date.now()}).then(() => this.super_master_meta.update_canvas());
    };

    get_filter_names = () => {

        return this.canvas_filters.get_names();
    };

    _dutone_pixels = (contrast, color_a, color_b, pxls, pxl_colors) => {

        pxls =  new Uint16Array(pxls.buffer);
        pxl_colors = new Uint32Array(pxl_colors.buffer);

        pxl_colors = pxl_colors.map((pxl_color) => {

            const l = this.color_conversion.to_hsla_from_rgba(this.color_conversion.to_rgba_from_uint32(pxl_color))[2];
            return this.color_conversion.blend_colors(color_a, color_b, parseFloat(l/100) / contrast, false, false);

        });

        return this.color_conversion.clean_duplicate_colors(pxls, Uint32Array.from(pxl_colors));
    };

    _to_dutone = (contrast = 0.8, color_a = "#ffffffff", color_b = "#000000ff") => {

        const { _s_pxls, _s_pxl_colors, _layer_index } = this.super_state.get_state();

        [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = this._dutone_pixels(contrast, color_a, color_b, _s_pxls[_layer_index], _s_pxl_colors[_layer_index]);

        this.super_state.set_state({_s_pxls, _s_pxl_colors, _pxls_hovered: -1, _last_action_timestamp: Date.now()}).then(() => this.super_master_meta.update_canvas());

    };

    _to_filter = (name, intensity) => {

        const { _s_pxl_colors, _layer_index } = this.super_state.get_state();

        _s_pxl_colors[_layer_index] = this.canvas_filters.filter(name, intensity, _s_pxl_colors[_layer_index]);

        this.super_state.set_state({_s_pxl_colors, _pxls_hovered: -1, _last_action_timestamp: Date.now() }).then(() => this.super_master_meta.update_canvas());

    }

    _to_rotation = (right = true) => {

        const {_imported_image_pxls, _imported_image_width, _imported_image_height, pxl_width, pxl_height, _s_pxls, _pxl_indexes_of_selection, _select_shape_index_a, _shape_index_a, _base64_original_images, _original_image_index, _layer_index } = this.super_state.get_state();

        const new_imported_image_width = _imported_image_height;
        const new_imported_image_height = _imported_image_width;
        let n_imported_image_pxls =  new Uint16Array(new_imported_image_width * new_imported_image_height);

        const new_pxl_width = pxl_height;
        const new_pxl_height = pxl_width;
        let ns_pxls = Array.from(_s_pxls);

        let new_pxl_indexes_of_selection = new SetFixed(new_pxl_width * new_pxl_height);
        let new_select_shape_index_a = _select_shape_index_a;
        let new_shape_index_a = _shape_index_a;

        if(_imported_image_pxls.length) {

            _imported_image_pxls.forEach(function(pxl, index) {

                const x = index % _imported_image_width;
                const y = (index - x) / _imported_image_width;

                const new_y = right ? x: (new_imported_image_height - 1) - x;
                const new_x = right ? (new_imported_image_width - 1) - y: y;
                const new_index = new_x + new_y * new_imported_image_width;

                n_imported_image_pxls[new_index] = pxl;

            });

        }else {

            for (let i = 0; i < _s_pxls.length; i++) {

                let new_pxls = new Uint16Array(new_pxl_width * new_pxl_height);

                ns_pxls[i].forEach(function(pxl, index) {

                    const x = index % pxl_width;
                    const y = (index - x) / pxl_width;

                    const new_y = right ? x: (new_pxl_height - 1) - x;
                    const new_x = right ? (new_pxl_width - 1) - y: y;
                    const new_index = new_x + new_y * new_pxl_width;


                    new_pxls[new_index] = pxl;

                    if(i === _layer_index) {

                        if(_pxl_indexes_of_selection.has(index)) {

                            new_pxl_indexes_of_selection.add(new_index);
                        }

                        if(_select_shape_index_a === index){

                            new_select_shape_index_a = new_index;
                        }

                        if(_shape_index_a === index) {

                            new_shape_index_a = new_index;
                        }
                    }

                });
                ns_pxls[i] = new_pxls;
            }

        }

        //
        if(typeof _base64_original_images[_original_image_index] !== "undefined" && !_imported_image_pxls.length) {

            const degrees = right ? 90: -90;

            let image = new Image();
            image.onload = () => {

                let [ctx, canvas] = this._get_new_ctx_from_canvas(image.naturalHeight, image.naturalWidth);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(degrees * Math.PI / 180);
                ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
                ctx.restore();

                let base64_original_image = image.src.includes("image/png") ?
                    canvas.toDataURL("image/png") :
                    canvas.toDataURL("image/jpeg");

                ctx = null;
                canvas = null;

                const new_base64_original_images = !_base64_original_images.includes(base64_original_image) ?
                    _base64_original_images.concat([base64_original_image]) :
                    _base64_original_images;

                base64_original_image = null;

                this.super_state.set_state({
                    pxl_width: new_pxl_width,
                    pxl_height: new_pxl_height,
                    _s_pxls: ns_pxls,
                    _pxl_indexes_of_selection: new_pxl_indexes_of_selection,
                    _select_shape_index_a: new_select_shape_index_a,
                    _shape_index_a: new_shape_index_a,
                    _base64_original_images: new_base64_original_images,
                    _original_image_index: new_base64_original_images.indexOf(base64_original_image),
                    _last_action_timestamp: Date.now(),
                }).then(() => {

                    this.canvas_pos.set_sizes(pxl_width, pxl_height);
                    this.canvas_pos.set_current_scale_default();

                    this._request_force_update(false, false).then(() => {

                        this.super_canvas.set_dimensions(new_pxl_width, new_pxl_height).then(() => this.super_master_meta.update_canvas());
                    });
                });
            };

            image.src = _base64_original_images[_original_image_index];

        }else {

            this.super_state.set_state({
                pxl_width: new_pxl_width,
                pxl_height: new_pxl_height,
                _s_pxls: ns_pxls,
                _imported_image_width: new_imported_image_width,
                _imported_image_height: new_imported_image_height,
                _imported_image_pxls: n_imported_image_pxls,
                _pxl_indexes_of_selection: new_pxl_indexes_of_selection,
                _select_shape_index_a: new_select_shape_index_a,
                _shape_index_a: new_shape_index_a,
                _last_action_timestamp: Date.now(),
            }).then(() => {

                this.canvas_pos.set_sizes(pxl_width, pxl_height);
                this.canvas_pos.set_current_scale_default();

                this._request_force_update(false, false).then(() => {

                    this.super_canvas.set_dimensions(new_pxl_width, new_pxl_height).then(() => this.super_master_meta.update_canvas());
                });
            });
        }
    };

    _pxl_colors_to_alpha = (pxls, pxl_colors, color, intensity) => {

        pxls =  new Uint16Array(pxls.buffer);
        pxl_colors = new Uint32Array(pxl_colors.buffer);

        pxl_colors = pxl_colors.map((pxl_color) => {

            const difference = this._match_color(color, pxl_color);
            let [r, g, b, a] = this.color_conversion.to_rgba_from_uint32(pxl_color);
            a -= a * (1 - difference) * intensity;

            return this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(r, g, b, a));
        });

        return [pxls, pxl_colors];
    };

    _pxl_adjust_contrast = (pxls, pxl_colors, intensity = 1) => {

        let min_grey = 255;
        let max_grey = 0;

        intensity = parseFloat(intensity) * 255 | 0;
        let greyscale = 0;
        let color;
        let colors = SIMDopeColors(pxl_colors);
        let {clamp_int} = simdops;
        let length = colors.length;

        for(let i = 0; (i|0) < (length|0); i = (i+1|0)>>>0) {

            color = colors.get_element(i);
            greyscale = color.sum_rgb() / 3 * color.a / 255 | 0;
            if((color.a | 0) > 0) {
                if((greyscale|0) > (max_grey|0)) {max_grey = greyscale | 0;}
                if((greyscale|0) < (min_grey|0)) {min_grey = greyscale | 0;}
            }
        }

        const alpha = 255 / Math.max(1, max_grey - min_grey);
        const beta = -min_grey * alpha | 0;

        for(let i = 0; (i|0) < (length|0); i = (i+1|0)>>>0) {

            color = colors.get_element(i);

            color.blend_with(
                SIMDopeColor.new_of(
                    clamp_int(color.r * alpha + beta | 0, 0, 255),
                    clamp_int(color.g * alpha + beta | 0, 0, 255),
                    clamp_int(color.b * alpha + beta | 0, 0, 255),
                    color.a
                ), intensity, false, false);
            colors.set_element(i, color);
        }

        pxl_colors = colors.subarray_uint32(0, length);
        return [pxls, pxl_colors, alpha, beta];
    };

    _pxl_adjust_smoothness = (pxls, pxl_colors, pxl_width, pxl_height, rounds) => {

        pxl_width = pxl_width | 0;
        pxl_height = pxl_height | 0;
        rounds = rounds || 1;
        for(let round = 0; round < rounds; round++) {

            pxls.forEach((pxl, i, pxls) => {

                let up, right, bottom, left;

                up = i - pxl_width; up = up < 0 ? -1: up;
                right = i + 1; right = right % pxl_width === 0 ? -1: right;
                bottom = i + pxl_width; bottom = bottom > (pxl_width * pxl_height) ? -1: bottom;
                left = i - 1; left = left % pxl_width === pxl_width - 1 ? -1: left;

                let up_left, up_right, bottom_left, bottom_right;

                up_left = up - 1; up_left = up === -1 || left === -1 ? -1: up_left;
                up_right = up + 1; up_right = up === -1 || right === -1 ? -1: up_right;
                bottom_left = bottom - 1; bottom_left = bottom === -1 || left === -1 ? -1: bottom_left;
                bottom_right = bottom + 1; bottom_right = bottom === -1 || right === -1 ? -1: bottom_right;

                const pxl_around = [
                    pxls[up],
                    pxls[right],
                    pxls[bottom],
                    pxls[left],
                    pxls[up_left],
                    pxls[up_right],
                    pxls[bottom_left],
                    pxls[bottom_right],
                ];

                let pxl_around_occurrences = [];
                pxl_around.forEach((pxl_around) => {

                    pxl_around_occurrences[pxl_around] = typeof pxl_around_occurrences[pxl_around] === "undefined" ? 1: pxl_around_occurrences[pxl_around] + 1;
                });

                let bigger_pxl_around_occurrence_color_index = -1;
                let bigger_pxl_around_occurrence_occurrence = -1;

                Object.entries(pxl_around_occurrences).forEach((pxl_around_occurrence) => {
                    const [key, value] = pxl_around_occurrence;
                    if(bigger_pxl_around_occurrence_occurrence < value) {
                        bigger_pxl_around_occurrence_occurrence = value;
                        bigger_pxl_around_occurrence_color_index = key;
                    }
                });

                let second_bigger_pxl_around_occurrence_color_index = -1;
                let second_bigger_pxl_around_occurrence_occurrence = -1;

                Object.entries(pxl_around_occurrences).forEach((pxl_around_occurrence) => {
                    const [key, value] = pxl_around_occurrence;
                    if(second_bigger_pxl_around_occurrence_occurrence < value && key !== bigger_pxl_around_occurrence_color_index) {
                        second_bigger_pxl_around_occurrence_occurrence = value;
                        second_bigger_pxl_around_occurrence_color_index = key;
                    }
                });

                if(bigger_pxl_around_occurrence_occurrence >= 6 && bigger_pxl_around_occurrence_color_index !== -1) {

                    pxls[i] = bigger_pxl_around_occurrence_color_index;
                }else if(
                    bigger_pxl_around_occurrence_occurrence + second_bigger_pxl_around_occurrence_occurrence >= 8
                    && bigger_pxl_around_occurrence_occurrence >= 5 ){

                    if(SIMDopeColor.new_uint32(pxl_colors[pxls[i]]).match_with(
                        SIMDopeColor.new_uint32(pxl_colors[bigger_pxl_around_occurrence_color_index]).blend_with(SIMDopeColor.new_uint32(pxl_colors[second_bigger_pxl_around_occurrence_color_index]), 128, false, false)
                        , 24
                    )){
                        pxls[i] = bigger_pxl_around_occurrence_color_index;
                    }
                }

            });

        }

        return this.color_conversion.clean_duplicate_colors(pxls, pxl_colors);

    };

    _remove_close_pxl_colors = async(pxls = [], pxl_colors  = [], bucket_threshold = null, threshold_steps = null, color_number_bonus = 54, best_color_number = null) => {

        const state_bucket_threshold = this.super_state.get_state().bucket_threshold;
        const rp = this.reduce_palette;
        const width = this.super_state.get_state().pxl_width;

        return new Promise(function(resolve){
            rp.compute(resolve, pxls, pxl_colors, width, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold);
        });
    };

    _request_force_update = (can_be_cancelable = false, especially_dont_force = false) => {

        return this.sraf.run_frame( () => {
                this.forceUpdate()
            }, !can_be_cancelable, !especially_dont_force)
    }

    _update_canvas_container_size = () => {

        const rect = this.super_state.get_state()._canvas_container ? this.super_state.get_state()._canvas_container.getBoundingClientRect(): null;

        if(!Boolean(rect)){

            setTimeout(() => {

                this._update_canvas_container_size();
            }, 50);
        }else {

            const _canvas_container_width = rect.width || 0;
            const _canvas_container_height = rect.height || 0;
            const _canvas_container_left = rect.left || 0;
            const _canvas_container_top = rect.top || 0;

            this.canvas_pos.set_canvas_container(_canvas_container_top, _canvas_container_left, _canvas_container_height, _canvas_container_width);
        }

    };

    render() {

        const {
            show_original_image_in_background,
            show_transparent_image_in_background,
            className,
            _original_image_index,
            canvas_wrapper_background_color,
            canvas_wrapper_background_color_focused,
            canvas_wrapper_border_radius,
            _is_on_resize_element,
            _is_image_import_mode,
            tool,
            select_mode,
            _mouse_inside,
            perspective,
            _base64_original_images,
            pxl_width, pxl_height
        } = this.super_state.get_state();

        const is_there_new_dimension = this.super_master_meta.is_there_new_dimension();
        const {canvas_wrapper, device_pixel_ratio, scale, canvas_event_target} = this.canvas_pos.get_state();
        const {mouse_down} = this.canvas_pos.get_pointer_state();
        const screen_zoom_ratio = this.canvas_pos.get_screen_zoom_ratio();
        const {box_shadow, will_change} = this.canvas_pos.get_style();
        const {background_image, transform_rotate, filter} = perspective ? this.canvas_pos.get_perspective_state(): {};
        const is_mobile_or_tablet = this.sraf.get_state().is_mobile_or_tablet;
        const cursor = this.super_state.get_cursor(_is_on_resize_element, _is_image_import_mode, mouse_down, tool, select_mode, canvas_event_target);

        const canvas_wrapper_width = pxl_width * screen_zoom_ratio * scale.current + 0.5 | 0;
        const canvas_wrapper_height = pxl_height * screen_zoom_ratio * scale.current + 0.5 | 0;
        const padding = canvas_wrapper.padding / device_pixel_ratio * scale.current | 0;

        const background_image_style_props = Boolean(show_original_image_in_background && typeof _base64_original_images[_original_image_index] !== "undefined") ?
            {background: `center / cover no-repeat url("${_base64_original_images[_original_image_index]}")`}:
            show_transparent_image_in_background ?
                {background: `repeating-conic-gradient(rgb(248 248 248 / 100%) 0% 25%, rgb(235 235 235 / 100%) 0% 50%) left top 50% / calc(200% / ${pxl_width}) calc(200% / ${pxl_height})`}: {};

        return (
            <div onContextMenu={function (e){e.preventDefault()}}
                 ref={this._set_canvas_container_ref} draggable={"false"}
                 style={{zIndex: 11, boxSizing: "border-box", position: "relative", overflow: "hidden", touchAction: "none", userSelect: "none", display: "block"}}
                 className={className}>
                <div ref={this._set_canvas_wrapper_overflow_ref}
                     className={"Canvas-Wrapper-Overflow" + ( !is_there_new_dimension ? " Shown ": " Not-Shown ")}
                     draggable={"false"}
                     style={{
                         display: "block",
                         height: "100%",
                         width: "100%",
                         contain: "layout style size paint",
                         overflow: "hidden",
                         position: "absolute",
                         boxSizing: "border-box",
                         touchAction: "manipulation",
                         pointerEvents: "auto",
                         userSelect: "none",
                         perspective: `${Math.round(Math.max(Math.floor(pxl_width), Math.floor(pxl_height)))}px`,
                         zIndex: 9,

                     }}>
                    <div ref={this._set_canvas_wrapper_ref}
                         className={"Canvas-Wrapper " + (_mouse_inside ? " Canvas-Focused ": " " + (tool))}
                         draggable={"false"}
                         style={{
                             display: "inline-block",
                             position: "fixed",
                             contain: "layout style size paint",
                             overflow: "hidden",
                             left: 0,
                             top: 0,
                             borderWidth: canvas_wrapper.border_width,
                             borderStyle: "solid",
                             borderColor: "#fff",
                             background: perspective ? "linear-gradient(115deg,#4fcf70,#fad648,#a767e5,#12bcfe,#44ce7b,#4fcf70,#fad648,#a767e5,#12bcfe,#44ce7b)": (canvas_event_target === "CANVAS") ? canvas_wrapper_background_color_focused: canvas_wrapper_background_color,
                             transition: "background, filter cubic-bezier(0.4, 0, 0.2, 1) 225ms",
                             margin: 0,
                             borderRadius: canvas_wrapper_border_radius,
                             padding: padding,
                             width: canvas_wrapper_width | 0,
                             height: canvas_wrapper_height | 0,
                             boxShadow: box_shadow,
                             filter: `opacity(${!is_there_new_dimension ? "1": "0"}) ${perspective ? filter: ""}`,
                             webkitFilter: `opacity(${!is_there_new_dimension ? "1": "0"}) ${perspective ? filter: ""}`,
                             transform: `translate(${((scale.move_x * 100 | 0) / 100).toFixed(2)}px, ${((scale.move_y * 100 | 0) / 100).toFixed(2)}px) ${perspective ? transform_rotate: ""}`,
                             willChange: will_change ? "transform, box-shadow": "",
                             transformOrigin: "center middle",
                             mixBlendMode: perspective ? "screen": "inherit",
                             boxSizing: "content-box",
                             touchAction: "none",
                             pointerEvents: "none",
                             userSelect: "none",
                             zIndex: 4,
                         }}>
                        <canvas
                            draggable={"false"}
                            style={{
                                display: "block",
                                zIndex: 2,
                                position: "absolute",
                                overflow: "hidden",
                                contain: "layout style size paint",
                                touchAction: "none",
                                pointerEvents: "none",
                                userSelect: "none",
                                width: pxl_width | 0,
                                height: pxl_height | 0,
                                minWidth: screen_zoom_ratio * scale.current * pxl_width | 0,
                                maxWidth: screen_zoom_ratio * scale.current * pxl_width | 0,
                                minHeight: screen_zoom_ratio * scale.current * pxl_height | 0,
                                maxHeight: screen_zoom_ratio * scale.current * pxl_height | 0,
                                transformOrigin: "left top",
                                boxSizing: "content-box",
                                borderWidth: 0,
                                ...background_image_style_props,
                            }}
                            className={"Canvas-Pixels"}
                            ref={this._set_canvas_ref}
                            width={pxl_width | 0}
                            height={pxl_height | 0}/>
                        {
                            Boolean(perspective) &&
                            <div className={"Canvas-Pixels-Cover"}
                                 draggable={"false"}
                                 style={{
                                     display: "block",
                                     backgroundImage: background_image,
                                     zIndex: 3,
                                     borderRadius: canvas_wrapper_border_radius,
                                     padding: 0,
                                     left: 0,
                                     top: 0,
                                     borderWidth: 0,
                                     position: "absolute",
                                     width: ((pxl_width|0) * (screen_zoom_ratio * scale.current) + 2 * padding + 0.5 | 0),
                                     height: ((pxl_height|0) * (screen_zoom_ratio * scale.current) + 2 * padding + 0.5 | 0),
                                     boxSizing: "content-box",
                                     touchAction: "none",
                                     pointerEvents: "none",
                                     userSelect: "none",
                                     willChange: "background-image"
                                 }}/>
                        }
                    </div>
                    <div style={{
                        display: "block",
                        left: 0,
                        top: 0,
                        position: "absolute",
                        cursor: cursor,
                        height: "100%",
                        width: "100%",
                        boxSizing: "border-box",
                        touchAction: "none",
                        pointerEvents: "auto",
                        userSelect: "none",
                        contain: "layout size style paint",
                        zIndex: 10,
                    }} onContextMenu={(e) => {e.preventDefault()}} />
                    {!is_mobile_or_tablet && <div style={{
                        display: "block",
                        zIndex: 1,
                        color: canvas_wrapper_background_color,
                        textAlign: "center",
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "100px",
                        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzU4LjY2NyAyNDAiIHdpZHRoPSI3Njc4LjIyMyIgaGVpZ2h0PSIzMjAiPjxkZWZzPjxjbGlwUGF0aCBpZD0iQSI+PHBhdGggZD0iTTAgMGg1NzU4LjY2N3YyNDBIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjQSkiIGZpbGw9IiM3NzciPjxwYXRoIGQ9Ik05MjEgMTgwaDMwdjYwaC0zMHptLTIzMiAwaDMwdjYwaC0zMHptLTIyOSAwaDMwdjYwaC0zMHptLTIyOSAwaDMwdjYwaC0zMHpNMCAwaDMwdjI0MEgwem0yMDczIDE4MGgzMHY2MGgtMzB6bS0yMzIgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6TTExNTIgMGgzMHYyNDBoLTMwem0yMDczIDE4MGgzMHY2MGgtMzB6bS0yMzIgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6TTIzMDQgMGgzMHYyNDBoLTMwem0yMDczIDE4MGgzMHY2MGgtMzB6bS0yMzIgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6TTM0NTYgMGgzMHYyNDBoLTMwem0yMDczIDE4MGgzMHY2MGgtMzB6bS0yMzIgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6TTQ2MDggMGgzMHYyNDBoLTMweiIvPjwvZz48L3N2Zz4K")`,
                        backgroundPosition: "bottom",
                        backgroundRepeat: "repeat-x",
                        backgroundSize: `${scale.current * screen_zoom_ratio * 5 * 5 | 0}px`,
                        pointerEvents: "none",
                        touchAction: "none",
                    }}><span>[{(scale.current * screen_zoom_ratio * 100 | 0) / 100}x]</span></div>}
                </div>
            </div>
        );
    }
}

export default CanvasPixels;