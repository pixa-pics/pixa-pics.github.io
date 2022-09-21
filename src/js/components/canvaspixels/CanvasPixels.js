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

import React from "react";
import pool from "../../utils/worker-pool";
import * as base64 from "../../utils/base64";
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

class CanvasPixels extends React.PureComponent {

    constructor(props) {
        super(props);
        if(!this.hasnt_been_mount) {
            this.super_state = Object.create(SuperState).from(props);
            this.xxhash = Object.create(XXHash).new();
            this.bmp_layer = Object.create(BMPLayer).from(pool);
            this.color_conversion = Object.create(ColorConversion).new();
            this.super_blend = Object.create(SuperBlend).new();
            this.super_canvas = Object.create(SuperCanvas).from(null, 32, 32);
            this.canvas_pos = Object.create(CanvasPos).from(32,  32,  0.9,  32, 0, 0);
            this.sraf = Object.create(SmartRequestAnimationFrame).new();
            this.sraf.start_timer();
            this.super_master_meta = Object.create(SuperMasterMeta).new(this.super_state, this.super_canvas, this.super_blend, this.canvas_pos, this.color_conversion, this.sraf);
            this.hasnt_been_mount = true;
        }
    };

    componentDidMount() {

        window.addEventListener("resize", this._update_canvas_container_size);
        this._update_canvas_container_size();

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
            "-ms-interpolation-mode: nearest-neighbor;" +
            "image-rendering: -moz-crisp-edges;" +
            "image-rendering: -webkit-crisp-edges;" +
            "image-rendering: -o-pixelated;" +
            "image-rendering: crisp-edges;" +
            "image-rendering: pixelated;" +
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
                animation-duration: 175ms;
                animation-delay: 25ms;
                animation-timing-function: linear;
            }
            .Canvas-Wrapper-Overflow.Not-Shown {
                animation-name: canvanimation;
                transform-origin: center center !important;
                animation-fill-mode: both;
                animation-duration: 250ms;
                animation-delay: 75ms;
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

        const canvas_style = document.createElement("style");
        canvas_style.innerHTML = body_css + pixelated_css + canvas_wrapper_css;
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
            _pxl_indexes_of_selection: new Set(),
            _layers: [{id: Date.now(), name: "Layer 0", hidden: false, opacity: 1}],
            _layer_index: 0,
            _s_pxls: Array.of(new Uint16Array((width || 32) * (height || 32))),
            _s_pxl_colors: Array.of(Uint32Array.of(0))
        }).then(() => {

            this.canvas_pos.set_sizes(width, height);
            this.canvas_pos.set_current_scale_default();

            this._request_force_update(false, false).then(() => {

                this.super_canvas.set_dimensions(width, height).then(() => {
                    this.super_master_meta.update_canvas(true);
                });
            });
        });
    }

    export_state = () => {

        this._notify_export_state();
    };

    _notify_export_state = () => {

        if(this.props.on_export_state) {

            this.export_JS_state((state) => {

                this.props.on_export_state(state);
            });
        }
    };

    _maybe_update_selection_highlight = () => {

        const { tool, _select_shape_index_a, _selection_pair_highlight } = this.super_state.get_state();

        if(tool.toUpperCase().includes("SELECT") && parseInt(_select_shape_index_a) < 0) {

            this.super_state.set_state({_selection_pair_highlight: !_selection_pair_highlight}).then(this.super_master_meta.update_canvas);
        }
    };

    componentWillReceiveProps(new_props) {

        if(new_props.tool === "MOVE" && this.super_state.get_state()._imported_image_pxl_colors.length === 0) {

            this.canvas_pos.set_boolean_move_on_click(true);
        }else {

            this.canvas_pos.set_boolean_move_on_click(false);
        }

        if(this.super_state.get_state().perspective !== new_props.perspective) {

            this.canvas_pos.set_perspective(new_props.perspective || 0);
        }

        if(this.super_state.get_state().pencil_mirror_mode !== "NONE" && new_props.pencil_mirror_mode === "NONE" || (this.super_state.get_state().tool.includes("PENCIL") && !new_props.tool.includes("PENCIL"))) {

            this.super_state.set_state({_pencil_mirror_index: -1});
        }

        if(this.super_state.get_state().tool !== new_props.tool && !new_props.tool.includes("SELECT")) {

            this.super_state.set_state({_pxl_indexes_of_selection: new Set(), _pxl_indexes_of_selection_drawn: new Set(this.super_state.get_state()._pxl_indexes_of_selection)}).then(() => {

                this._request_force_update();
                this._notify_is_something_selected();
            });
        }

        let {hide_canvas_content, show_original_image_in_background, show_transparent_image_in_background, pencil_mirror_mode, tool, select_mode} = this.super_state.get_state();

        if(
            hide_canvas_content !== new_props.hide_canvas_content ||
            show_original_image_in_background !== new_props.show_original_image_in_background ||
            show_transparent_image_in_background !== new_props.show_transparent_image_in_background ||
            pencil_mirror_mode !== new_props.pencil_mirror_mode ||
            tool !== new_props.tool ||
            select_mode !== new_props.select_mode
        ) {

            this.super_state.set_state(new_props).then(() => {

                this._request_force_update(false, false).then(() => {

                    this.super_master_meta.update_canvas(true);
                });
            });

        }else {

            this.super_state.set_state(new_props);
        }
    }

    current_layer_up = () => {

        let { _layers, _layer_index, _s_pxl_colors, _s_pxls, pxl_width, pxl_height } = this.super_state.get_state();

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

        let { _layers, _layer_index, _s_pxl_colors, _s_pxls, pxl_width, pxl_height } = this.super_state.get_state();

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
        _layers.splice(at_index+1, 0, {id: Date.now(), name: `Layer ${at_index}`, hidden: false, opacity: 1});

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
            const top_layer_opacity = parseFloat(_layers[at_index].opacity) * 255;
            const bottom_layer_pxl_colors = new Uint32Array(_s_pxl_colors[at_index - 1].buffer);
            const bottom_layer_opacity = parseFloat(_layers[at_index-1].opacity) * 255;

            const pxl_length = top_layer_pxls.length | 0;

            const new_layer = {
                id: Date.now(),
                name: `Merged layers ${at_index}+${at_index-1}`,
                hidden: Boolean(_layers[at_index].hidden && _layers[at_index-1].hidden),
                opacity: parseFloat(1),
            };

            const super_blend = Object.create(SuperBlend).new(2, pxl_length);
            for(let i = 0 ; i < pxl_length; i = (i+1|0)>>>0) {

                super_blend.for(i);
                super_blend.stack(0, bottom_layer_pxl_colors[bottom_layer_pxls[i]], bottom_layer_opacity, 0);
                super_blend.stack(1, top_layer_pxl_colors[top_layer_pxls[i]], top_layer_opacity, 0);
            }

            const ic = super_blend.blend(false, true);
            const fp = new DataView(new ArrayBuffer(pxl_height * pxl_width * 4));
            ic.forEach(function (value, index) {

                fp.setUint32((index*4|0) >>> 0, (value|0) >>> 0, true);

            });

            const image_data = new ImageData(new Uint8ClampedArray(new Uint32Array(fp.buffer).reverse().buffer).reverse(), pxl_width, pxl_height);
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
                _old_pxl_colors: new Uint32Array(0),
                _last_action_timestamp: Date.now(),
            }).then(() => {this._maybe_save_state(null, true)});

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
            const hash = this.xxhash.base58_that(Uint32Array.from(p.map(function(pci){ return (pc[(pci|0)>>>0]|0)>>>0; })));
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
                            this._filter_pixels(name, force, pc), (result) => {
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

    get_layer_bitmap_image = (pxl_width, pxl_height, pxls, pxl_colors, callback_function) => {

        this.bmp_layer.define(pxl_width, pxl_height, pxls, pxl_colors);
        this.bmp_layer.render((err, res) => {

            if(!err) { callback_function(res); }else {
                this.bmp_layer.render(function(err, res){if(!err) {callback_function(res);}})
            }
        });
    };

    get_base64_png_data_url = (scale = 1, callback_function = () => {}, with_palette = false, with_compression_speed = 0, with_compression_quality_min = 30, with_compression_quality_max = 35) => {

        this._get_base64_png_data_url(scale, callback_function, with_palette, with_compression_speed, with_compression_quality_min, with_compression_quality_max);
    };

    _get_base64_png_data_url = (scale = 1, callback_function = () => {}, with_palette = false, with_compression_speed = 0, with_compression_quality_min = 30, with_compression_quality_max = 35) => {

        const { pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers } = this.super_state.get_state();

        const b64pngcanvas = B64PngCanvas.from(pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette);
        b64pngcanvas.render((result) => {

            if(with_compression_speed !== 0) {

                import("../../utils/png_quant").then(({png_quant}) => {

                    png_quant(Object.values(result)[0], with_compression_quality_min, with_compression_quality_max, with_compression_speed, pool).then((base_64_out) => {

                        callback_function(with_palette ? Array.of(base_64_out, Object.values(result)[1]): Array.of(base_64_out.toString()));
                        base_64_out = null;
                    });
                });
            }else {

                callback_function(with_palette ? Array.of(Object.values(result)[0], Object.values(result)[1]): Array.of(Object.values(result)[0]));
            }
        });
    };

    _get_pixels_palette_and_list_from_image_data = (image_data, force_full_compute = false) => {

        const { max_size, _lazy_lazy_compute_time_ms } = this.super_state.get_state();

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

        return {
            too_much_pixel_cpu_would_go_brrrrr: too_much_pixel_cpu_would_go_brrrrr,
            ratio_pixel_per_color: new_pxls.length / new_pxl_colors.length,
            new_pxl_colors: Uint32Array.from(new_pxl_colors),
            new_pxls: new_pxls,
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

                this.super_master_meta.update_canvas(true);
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
                this.super_master_meta.update_canvas(true);
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
                    this.super_master_meta.update_canvas(true);
                });

            }

        }, 50);

    };

    set_canvas_from_image = (image_obj = null, loading_base64_img = "", img_d = {}, dont_smart_resize = false) => {

        if(this.props.onLoad) {this.props.onLoad("image_load");}

        if(img_d.id) {

            const _layer_index = 0;
            const ns_pxl_colors = Array.of(Uint32Array.from(img_d.pxl_colors));
            const ns_pxls = Array.of(Uint16Array.from(img_d.pxls));

            this.super_state.set_state({
                _id: this.xxhash.base58_that(new TextEncoder("utf-8").encode(loading_base64_img)).concat("_w-" + img_d.width + "_h-" + img_d.height + "_s-"+Math.random().toString(16)),
                pxl_width: img_d.width,
                pxl_height: img_d.height,
                _pxl_indexes_of_selection: new Set(),
                _base64_original_images: [loading_base64_img],
                _s_pxl_colors: ns_pxl_colors,
                _s_pxls: ns_pxls,
                _layers: [{id: Date.now(), name: "Layer 0", hidden: false, opacity: 1}],
                _layer_index,
                _pxls_hovered: -1,
                _original_image_index: 0,
                _last_action_timestamp: Date.now(),
                _json_state_history: {history_position: 0, state_history: []},
            }).then(() => {

                this.canvas_pos.set_sizes(img_d.width, img_d.height);
                this.canvas_pos.set_current_scale_default();

                this._request_force_update(false, false).then(() => {

                    this.super_canvas.set_dimensions(img_d.width, img_d.height).then(() => {
                        this.super_master_meta.update_canvas(true);
                    });
                });

                this._notify_image_load_complete();
                this._notify_export_state();
                this.super_master_meta.update_canvas(true);
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

                let ns_pxl_colors = Array.of(Uint32Array.from(new_pxl_data.new_pxl_colors));
                let ns_pxls = Array.of(Uint16Array.from(new_pxl_data.new_pxls));
                new_pxl_data = null;

                this.super_state.set_state({
                    _id: this.xxhash.base58_that(new TextEncoder("utf-8").encode(base64_original_image)).concat("_w-" + width + "_h-" + height + "_s-" + Math.random().toString(16)),
                    pxl_width: width,
                    pxl_height: height,
                    _pxl_indexes_of_selection: new Set(),
                    _base64_original_images: new_base64_original_images,
                    _layers: [{id: Date.now(), name: "Layer 0", hidden: false, opacity: 1}],
                    _json_state_history: {history_position: 0, state_history: []},
                    _s_pxl_colors: ns_pxl_colors,
                    _s_pxls: ns_pxls,
                    _layer_index: 0,
                    _pxls_hovered: -1,
                    _original_image_index: new_base64_original_images.indexOf(base64_original_image),
                    _last_action_timestamp: Date.now(),
                }).then(() => {

                    this.canvas_pos.set_sizes(width, height);
                    this.canvas_pos.set_current_scale_default();

                    this._request_force_update(false, false).then(() => {

                        this.super_canvas.set_dimensions(width, height).then(() => {
                            this.super_master_meta.update_canvas(true);
                        });
                    });

                    this._notify_image_load_complete();
                    this._notify_export_state();
                    this.super_master_meta.update_canvas(true);
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
            this.super_master_meta.update_canvas(true);
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
        element.addEventListener("wheel", function(event){canvas_pos.handle_wheel(event)}, {capture: true});
        element.addEventListener("pointerdown", function(event){canvas_pos.handle_pointer_down(event)}, {capture: true});
        element.addEventListener("pointermove", function(event){canvas_pos.handle_pointer_move(event)}, {capture: true});
        element.addEventListener("pointerup", function(event){canvas_pos.handle_pointer_up(event)}, {capture: true});
        element.addEventListener("pointercancel", function(event){canvas_pos.handle_pointer_up(event)}, {capture: true});
        element.addEventListener("pointerout", function(event){canvas_pos.handle_pointer_up(event)}, {capture: true});
        element.addEventListener("pointerleave", function(event){canvas_pos.handle_pointer_up(event)}, {capture: true});

        this.super_state.set_state({_canvas_wrapper_overflow: element});
    };

    componentWillUnmount() {

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

    exchange_pixel_color = (old_color, new_color) => {

        this._exchange_pixel_color(old_color, new_color);
    };

    _exchange_pixel_color = (old_color, new_color) => {

        const { _s_pxl_colors, _s_pxls, _layer_index } = this.super_state.get_state();


        let pxl_colors_copy = Array.from(_s_pxl_colors[_layer_index]);
        let pxls_copy =  new Uint16Array(_s_pxls[_layer_index].buffer);

        const pxl_color_index = pxl_colors_copy.indexOf(this.color_conversion.to_uint32_from_hex(this.color_conversion.format_hex_color(old_color)));

        const pxl_color = pxl_colors_copy[pxl_color_index];
        const pxl_color_new = this.color_conversion.blend_colors(pxl_color, new_color, 1, true, false);

        // Eventually add current color to color list
        if(!pxl_colors_copy.includes(pxl_color_new)){

            pxl_colors_copy.push(pxl_color_new);
        }

        const new_color_index = pxl_colors_copy.indexOf(pxl_color_new);

        pxls_copy = pxls_copy.map((pxl) => {

            return pxl === pxl_color_index ? new_color_index: pxl;
        });

        [pxls_copy, pxl_colors_copy] = this.color_conversion.clean_duplicate_colors(pxls_copy, Uint32Array.from(pxl_colors_copy));

        let ns_pxl_colors = this.super_state.get_state()._s_pxl_colors;
        ns_pxl_colors[_layer_index] = pxl_colors_copy;

        let ns_pxls = this.super_state.get_state()._s_pxls;
        ns_pxls[_layer_index] = pxls_copy;

        this.super_state.set_state({_s_pxls: ns_pxls, _s_pxl_colors: ns_pxl_colors, _last_action_timestamp: Date.now()}).then(this.super_master_meta.update_canvas);
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

            this.super_master_meta.update_canvas(true);
            this._notify_is_something_selected();
        });

    }

    _handle_canvas_wrapper_overflow_context_menu = (event) => {

        const [pos_x, pos_y] = this.canvas_pos.get_canvas_pos_from_event(event.pageX, event.pageY);
        const {_s_pxl_colors, _layer_index, _s_pxls, pxl_width} = this.super_state.get_state();
        const pxl_index = (pos_y * pxl_width) + pos_x;
        const pxl_color_index = pxl_index >= 0 ? _s_pxls[_layer_index][pxl_index]: null
        const c_hex = pxl_color_index === null ? "#ffffffff": this.color_conversion.to_hex_from_uint32(_s_pxl_colors[_layer_index][pxl_color_index]);

        if(this.props.onRightClick) {

            this.props.onRightClick(event, {
                pos_x: pos_x,
                pos_y: pos_y,
                pxl_color: pxl_color_index === null ? null: c_hex,
            });
        }

        if(this.props.onRelevantActionEvent) {

            this.props.onRelevantActionEvent(event, c_hex, pxl_color_index === null ? .25: 0.75, false);
        }

        if(this.props.setCursorFuckYou) {

            this.props.setCursorFuckYou(true);
            setTimeout(() => {

                this.props.setCursorFuckYou(false);

            }, 2500);
        }
    };

    _maybe_save_state = (set_anyway_if_changes_callback = null, force = false, requested_at = Date.now()) => {


        let super_state_object = this.super_state.get_state();
        if(requested_at > super_state_object._saving_json_state_history_ran_timestamp) {

            if(super_state_object._last_action_timestamp + 1250 <= Date.now() || force || super_state_object._json_state_history.state_history.length === 0){

                if(super_state_object._saving_json_state_history_running) {

                    setTimeout(() => {

                        this._maybe_save_state(set_anyway_if_changes_callback, force, requested_at);
                    }, 250);

                }else {

                    const { _id, _layers, pxl_width, pxl_height, _s_pxls, _s_pxl_colors,  _original_image_index, _layer_index, _pxl_indexes_of_selection, _pencil_mirror_index } = super_state_object;
                    const old_current_history_position = parseInt(super_state_object._json_state_history.history_position);
                    const old_current_state = super_state_object._json_state_history.state_history.length === 0 ? {}: super_state_object._json_state_history.state_history[old_current_history_position];// First state let's not save current history timestamp
                    const old_current_state_timestamp = parseInt(old_current_state._timestamp || 0);

                    super_state_object._saving_json_state_history_running = true;

                    let new_current_state = Object.assign({}, {
                        _timestamp: parseInt(Date.now()),
                        _id: _id.toString(),
                        pxl_width: parseInt(pxl_width),
                        pxl_height: parseInt(pxl_height),
                        _original_image_index: parseInt(_original_image_index),
                        _layers: Array.from(_layers).map((l, li) => {
                            return Object.assign({}, {
                                id: parseInt(l.id),
                                hash: l.hash + "",
                                name: l.name + "",
                                hidden: Boolean(l.hidden),
                                opacity: parseFloat(l.opacity || 1),
                                thumbnail: l.thumbnail + "" ,
                                colors: Array.from(l.colors || []),
                                number_of_colors: parseInt(l.number_of_colors || 0),
                            });
                        }),
                        _layer_index: parseInt(_layer_index),
                        _s_pxls: Array.from(_s_pxls.map(function(a){return Uint16Array.from(a);})),
                        _s_pxl_colors: Array.from(_s_pxl_colors.map(function(a){return Uint32Array.from(a);})),
                        _pxl_indexes_of_selection: new Set(_pxl_indexes_of_selection),
                        _pencil_mirror_index: parseInt(_pencil_mirror_index),
                    });

                    let super_state = this.super_state;
                    let _notify_can_undo_redo_change = this._notify_can_undo_redo_change;
                    let xxhash = this.xxhash;
                    let onLayersChange = this.props.onLayersChange;
                    let get_layer_bitmap_image = this.get_layer_bitmap_image;


                    const _notify_layers_and_compute_thumbnails_change = function(old_current_state, new_current_state, callback_function = null, start = Date.now()) {

                        const maybe_set_layers = function(has_updated, has_changed, new_current_state = {}) {

                            const current_state_not_empty = Boolean(typeof new_current_state._layers !== "undefined");
                            const leading_change = Boolean(start > super_state.get_state()._layers_defined_at);
                            let current_state = Object.assign({}, new_current_state);
                            current_state._layers = Array.from(new_current_state._layers.map(function(l) {
                                return Object.assign({},{
                                    id: l.id | 0,
                                    hash: l.hash + "",
                                    name: l.name + "",
                                    hidden: l.hidden && true,
                                    opacity: parseFloat(l.opacity),
                                    colors: Array.from(l.colors),
                                    number_of_colors: l.number_of_colors | 0,
                                });
                            }));

                            if(has_changed && leading_change && current_state_not_empty) {

                                super_state.set_state({_layer_index: parseInt(new_current_state._layer_index), _layers: Array.from(new_current_state._layers), _layers_defined_at: start}).then(() => {
                                    if(onLayersChange) {onLayersChange(super_state.get_state()._layer_index, Array.from(new_current_state._layers));}
                                    if(callback_function !== null) {callback_function(super_state.get_state()._layers, super_state.get_state()._layer_index, has_changed, current_state);}
                                });
                            }else {

                                if(onLayersChange) {onLayersChange(super_state.get_state()._layer_index,  Array.from(new_current_state._layers))}

                                if(Boolean(has_changed || has_updated) && leading_change && current_state_not_empty) {

                                    if (callback_function !== null) {
                                        callback_function(super_state.get_state()._layers, super_state.get_state()._layer_index, has_changed, current_state)
                                    }
                                }else {

                                    if (callback_function !== null) {callback_function(super_state.get_state()._layers, super_state.get_state()._layer_index, false, {});}
                                }
                            }
                        }

                        let all_layers_length = 0;

                        const old_timestamp = parseInt(old_current_state._timestamp) || Date.now();
                        const new_timestamp = parseInt(new_current_state._timestamp);
                        let timestamp = old_timestamp;
                        let has_changed = false;
                        let has_updated = false;

                        for(let index = 0; index < new_current_state._layers.length; index++){

                            const p =  new_current_state._s_pxls[index];
                            const pc = new_current_state._s_pxl_colors[index];
                            const new_hash = xxhash.base58_that(Uint32Array.from(p.map(function(pci){ return (pc[(pci|0)>>>0]|0)>>>0; })));
                            const old_layer = Object.assign({}, (old_current_state._layers || new Array())[index]);
                            const old_thumbnail = old_layer.thumbnail || "";
                            const old_hash = old_layer.hash || "";

                            if(old_hash !== new_hash || !Boolean(old_hash) || !Boolean(old_thumbnail)) {

                                get_layer_bitmap_image(new_current_state.pxl_width, new_current_state.pxl_height, p, pc, (new_thumbnail) => {

                                    has_updated = true;
                                    if(old_hash !== new_hash || !Boolean(old_hash)) {

                                        has_changed = true;
                                        timestamp = new_timestamp;
                                    }
                                    new_current_state._layers[index].hash = new_hash;
                                    new_current_state._layers[index].thumbnail = new_thumbnail;
                                    new_current_state._layers[index].colors = Array.from(pc.subarray(0, 128)).map(function(c){return "#".concat("00000000".concat(((c|0)>>>0).toString(16)).slice(-8))});
                                    new_current_state._layers[index].number_of_colors = parseInt(pc.length);
                                    all_layers_length++;

                                    if(all_layers_length === new_current_state._layers.length) {

                                        new_current_state._timestamp = parseInt(timestamp);
                                        maybe_set_layers(has_updated, has_changed, new_current_state);
                                    }
                                });

                            }else {

                                new_current_state._layers[index].hash = new_hash;
                                new_current_state._layers[index].thumbnail = old_thumbnail;

                                if(
                                    new_current_state._layers[index].colors.length === 0 ||
                                    Boolean(new_current_state._layers[index].colors.length !== new_current_state._layers[index].number_of_colors)
                                ) {

                                    new_current_state._layers[index].colors = Array.from(pc.subarray(0, 128)).map(function(c){return "#".concat("00000000".concat(((c|0)>>>0).toString(16)).slice(-8))});
                                    new_current_state._layers[index].number_of_colors = parseInt(pc.length);
                                }

                                all_layers_length++;

                                if(all_layers_length === new_current_state._layers.length) {

                                    new_current_state._timestamp = parseInt(timestamp);
                                    maybe_set_layers(has_updated, has_changed, new_current_state);
                                }
                            }
                        }
                    };

                    _notify_layers_and_compute_thumbnails_change(old_current_state, new_current_state, function(layers, layer_index, layers_changed_state, new_current_state) {

                        let _json_state_history = super_state_object._json_state_history;
                        let {_state_history_length, _saving_json_state_history_ran_timestamp } = super_state_object;
                        const first_change = Boolean(_json_state_history.state_history.length === 0);
                        const new_current_history_position = parseInt(_json_state_history.history_position);
                        const new_current_state_timestamp = new_current_state._timestamp || 0;
                        const now = Date.now();

                        if(first_change && new_current_state_timestamp !== 0) { // Fist state

                            _json_state_history.state_history = Array.of(new_current_state);
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
                                        _json_state_history.state_history.push(dsh.shift());
                                    }else {
                                        _json_state_history.state_history.push(dsh.shift());
                                    }
                                    dshi++;

                                }
                            }

                            if(_json_state_history.state_history.length-1 > _state_history_length) { _json_state_history.state_history.shift(); } // As we limit edit history, just delete the first element if it will be above max size
                            _json_state_history.state_history.push(new_current_state); // Then we add the current state history
                            _json_state_history.history_position = parseInt(_json_state_history.state_history.length-1);
                            _saving_json_state_history_ran_timestamp = now;
                        } else {

                            // History states just got shuffled and we need to update the right moment in time (in the not-now-that-is-now)
                            for(let i = 0; i < _json_state_history.state_history.length; i++) {

                                if(_json_state_history.state_history[i]._timestamp === new_current_state._timestamp) {

                                    _json_state_history.state_history[i] = new_current_state;
                                    _saving_json_state_history_ran_timestamp = now;
                                    i = _json_state_history.state_history.length;
                                }
                            }
                        }

                        super_state.set_state({_json_state_history, _saving_json_state_history_running: false, _saving_json_state_history_ran_timestamp}).then(function() {

                            _notify_can_undo_redo_change();
                            if(set_anyway_if_changes_callback !== null) {
                                set_anyway_if_changes_callback(Object.assign({}, super_state_object._json_state_history), Boolean(_saving_json_state_history_ran_timestamp === now));
                            }
                        });

                    }, Date.now());
                }
            }else {

                if(set_anyway_if_changes_callback !== null) {
                    set_anyway_if_changes_callback(Object.assign({}, super_state_object._json_state_history), false);
                }
            }
        }else {

            if(set_anyway_if_changes_callback !== null) {
                set_anyway_if_changes_callback(Object.assign({}, super_state_object._json_state_history), false);
            }
        }
    };

    _notify_is_something_selected = () => {

        const { _pxl_indexes_of_selection } = this.super_state.get_state();

        if(Boolean(this.super_state.get_state()._previous_pxl_indexes_of_selection.size) !== Boolean(_pxl_indexes_of_selection.size)) {

            this.super_state.set_state({
                _is_something_selected: Boolean(_pxl_indexes_of_selection.size),
                _previous_pxl_indexes_of_selection: new Set(_pxl_indexes_of_selection)
            }).then(() => {

                if(this.props.onSomethingSelectedChange) {

                    this.props.onSomethingSelectedChange(Boolean(_pxl_indexes_of_selection.size));
                }
            });
        }
    };

    _notify_image_load_complete = () => {

        const { _s_pxl_colors, pxl_width, pxl_height } = this.super_state.get_state();

        let image_details = {
            width: pxl_width,
            height: pxl_height,
            number_of_colors: _s_pxl_colors[0].length,
        };

        if(this.props.onLoadComplete) { this.props.onLoadComplete("image_load", image_details); }
    };

    _notify_image_import_complete = () => {

        if(this.props.onImageImportComplete) { this.props.onImageImportComplete(); }
    };

    _notify_can_undo_redo_change = () => {

        const can_undo = this._can_undo(this.super_state.get_state()._json_state_history);
        const can_redo = this._can_redo(this.super_state.get_state()._json_state_history);

        if(this.props.onCanUndoRedoChange) { this.props.onCanUndoRedoChange(can_undo, can_redo); }
    };

    _notify_size_change = () => {

        const { pxl_width, pxl_height } = this.super_state.get_state();
        if(this.props.onSizeChange) { this.props.onSizeChange(pxl_width, pxl_height); }
    };

    import_JSON_state = (json) => {

        this.import_JS_state(JSON.parse(json));
    };

    import_JS_state = (js, callback_function) => {

        js._json_state_history = this.transform_json_state_history_string_array_buffer(js._json_state_history);

        let _base64_original_images = Array.from(js._base64_original_images);
        let _json_state_history = Object.assign({}, {
            history_position: parseInt(js._json_state_history.history_position),
            state_history: js._json_state_history.state_history.map((state) => Object.assign({}, {
                _original_image_index: parseInt(state._original_image_index),
                pxl_width: parseInt(state.pxl_width),
                pxl_height: parseInt(state.pxl_height),
                _pxl_indexes_of_selection: new Set(Boolean(state._pxl_indexes_of_selection.length) ? state._pxl_indexes_of_selection : []),
                _s_pxls: state._s_pxls,
                _s_pxl_colors: state._s_pxl_colors,
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
            }))
        });

        js = null;

        let sh = Object.assign({}, _json_state_history.state_history[_json_state_history.history_position]);

        this.super_state.set_state({
            _id: sh._id.toString(),
            pxl_width: parseInt(sh.pxl_width),
            pxl_height: parseInt(sh.pxl_height),
            _base64_original_images: Array.from(_base64_original_images),
            _original_image_index: parseInt(sh._original_image_index),
            _layers: Array.from(sh._layers.map(function(l) {
                return Object.assign({}, {
                    id: parseInt(l.id),
                    hash: l.hash + "",
                    name: l.name+"",
                    hidden: Boolean(l.hidden),
                    opacity: parseInt(l.opacity),
                });
            })),
            _layer_index: parseInt(sh._layer_index),
            _s_pxls: sh._s_pxls.map(function(a){return Uint16Array.from(Object.values(a))}),
            _s_pxl_colors: sh._s_pxl_colors.map(function(a){return Uint32Array.from(Object.values(a))}),
            _pxl_indexes_of_selection: new Set(sh._pxl_indexes_of_selection),
            _pencil_mirror_index: parseInt(sh._pencil_mirror_index),
            _json_state_history: _json_state_history,
            _pxls_hovered: -1,
            _last_action_timestamp: Date.now(),
        }).then(() => {

            this.canvas_pos.set_sizes(sh.pxl_width, sh.pxl_height);
            this.canvas_pos.set_current_scale_default();

            this._request_force_update(false, false).then(() => {

                this.super_canvas.set_dimensions(sh.pxl_width, sh.pxl_height).then(() => {
                    this.super_master_meta.update_canvas(true);
                });
            });

            this._notify_image_load_complete();
            this._notify_is_something_selected();
            this._notify_can_undo_redo_change();
            callback_function();
        });
    };

    // https://developer.mozilla.org/en-US/docs/Glossary/Base64#solution_1_%E2%80%93_escaping_the_string_before_encoding_it
    transform_json_state_history_array_buffer_string = (input) => {
        "use strict";

        input.state_history = input.state_history.map(function(sh){

            sh._s_pxls = Array.from(sh._s_pxls).map(function(a){

                return base64.bytesToBase64(new Uint8Array(Uint16Array.from(a).buffer));
            });
            sh._s_pxl_colors = Array.from(sh._s_pxl_colors).map(function(a){

                return base64.bytesToBase64(new Uint8Array(Uint32Array.from(a).buffer));
            });
            return sh;
        });

        return input;
    };

    transform_json_state_history_string_array_buffer = (input) => {
        "use strict";

        input.state_history = input.state_history.map(function(sh){

            sh._s_pxls = Array.from(sh._s_pxls).map(function(a){
                return new Uint16Array(base64.base64ToBytes(a).buffer);
            });
            sh._s_pxl_colors = Array.from(sh._s_pxl_colors).map(function(a){
                return new Uint32Array(base64.base64ToBytes(a).buffer);
            });
            return sh;
        });

        return input;
    };

    export_JS_state = (callback_function) => {

        this._maybe_save_state((_json_state_history) => {

            this.get_base64_png_data_url(1, ([base_64]) => {

                const bytes = 3 * Math.ceil((base_64.length/4));
                callback_function({
                    id: this.super_state.get_state()._id.toString(),
                    kb: bytes / 1024,
                    preview: base_64,
                    timestamp: Date.now(),
                    _base64_original_images: Array.from(this.super_state.get_state()._base64_original_images),
                    _json_state_history: Object.assign({}, this.transform_json_state_history_array_buffer_string(_json_state_history))
                });
            }, false, 5, 50, 75);
        }, true);
    };

    _can_undo = (_json_state_history) => {

        if(!Boolean(_json_state_history)) {

            _json_state_history = this.super_state.get_state()._json_state_history;
        }

        return parseInt(_json_state_history.history_position);
    };

    undo = () => {

        this._maybe_save_state((_json_state_history) => {

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
                        return Object.assign({}, {
                            id: parseInt(l.id),
                            hash: l.hash + "",
                            name: l.name+"",
                            hidden: Boolean(l.hidden),
                            opacity: parseInt(l.opacity),
                        });
                    })),
                    _layer_index: parseInt(sh._layer_index),
                    _s_pxls: Array.from(sh._s_pxls.map(function(a){return Uint16Array.from(a);})),
                    _s_pxl_colors: Array.from(sh._s_pxl_colors.map(function(a){return Uint32Array.from(a);})),
                    _pxl_indexes_of_selection: new Set(sh._pxl_indexes_of_selection),
                    _pencil_mirror_index: parseInt(sh._pencil_mirror_index),
                    _json_state_history: _json_state_history,
                    _last_action_timestamp: Date.now(),
                }).then(() => {

                    if(has_new_dimension) {
                        this.canvas_pos.set_sizes(sh.pxl_width, sh.pxl_height);
                        this.canvas_pos.set_current_scale_default();
                    }

                    this._request_force_update(false, false).then(() => {

                        this.super_canvas.set_dimensions(sh.pxl_width, sh.pxl_height).then(() => {
                            this.super_master_meta.update_canvas(true);
                        });
                    });

                    this._notify_is_something_selected();
                    this._notify_can_undo_redo_change();
                });
            }
        }, true);
    };

    _can_redo = (_json_state_history) => {

        if(!Boolean(_json_state_history)) {

            _json_state_history = this.super_state.get_state()._json_state_history;
        }

        return parseInt(_json_state_history.state_history.length - parseInt(_json_state_history.history_position+1));
    }

    redo = () => {

        this._maybe_save_state((_json_state_history) => {

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
                        return Object.assign({}, {
                            id: parseInt(l.id),
                            hash: l.hash + "",
                            name: l.name+"",
                            hidden: Boolean(l.hidden),
                            opacity: parseInt(l.opacity),
                        });
                    })),
                    _layer_index: parseInt(sh._layer_index),
                    _s_pxls: Array.from(sh._s_pxls.map(function(a){return Uint16Array.from(a);})),
                    _s_pxl_colors: Array.from(sh._s_pxl_colors.map(function(a){return Uint32Array.from(a);})),
                    _pxl_indexes_of_selection: new Set(sh._pxl_indexes_of_selection),
                    _pencil_mirror_index: parseInt(sh._pencil_mirror_index),
                    _json_state_history: _json_state_history,
                    _last_action_timestamp: Date.now(),
                }).then(() => {

                    if(has_new_dimension) {
                        this.canvas_pos.set_sizes(sh.pxl_width, sh.pxl_height);
                        this.canvas_pos.set_current_scale_default();
                    }

                    this._request_force_update(false, false).then(() => {

                        this.super_canvas.set_dimensions(sh.pxl_width, sh.pxl_height).then(() => {
                            this.super_master_meta.update_canvas(true);
                        });
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

        this.super_state.set_state({_s_pxl_colors: ns_pxl_colors, _s_pxls: ns_pxls, _last_action_timestamp: Date.now()}).then(this.super_master_meta.update_canvas);
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

        this.super_state.set_state({_s_pxl_colors: ns_pxl_colors, _s_pxls: ns_pxls, _last_action_timestamp: Date.now()}).then(this.super_master_meta.update_canvas);
    }

    to_selection_invert = () => {

        const { _s_pxls, _pxl_indexes_of_selection, _layer_index } = this.super_state.get_state();

        const pxl_indexes_of_selection_set = new Set(_pxl_indexes_of_selection);
        let pxl_indexes_of_selection = new Set();

        for (let i = 0; i < _s_pxls[_layer_index].length; i++) {

            if(!pxl_indexes_of_selection_set.has(i)) {
                pxl_indexes_of_selection.add(i);
            }
        }

        this.super_state.set_state({_pxl_indexes_of_selection: pxl_indexes_of_selection, _last_action_timestamp: Date.now()}).then(this.super_master_meta.update_canvas);
    }

    get_average_color_of_selection = () => {

        return this._get_average_color_of_selection();
    };

    _get_average_color_of_selection = (_pxl_indexes_of_selection, pxls, pxl_colors ) => {

        const { _s_pxls, _s_pxl_colors, _layer_index } = this.super_state.get_state();

        pxls = pxls ||  new Uint16Array(_s_pxls[_layer_index].buffer);
        pxl_colors = pxl_colors || new Uint32Array(_s_pxl_colors[_layer_index].buffer);

        const colors_index = new Set(pxls);
        let colors_in_selection_with_occurrence = [];

        colors_index.forEach((ci) => {

            colors_in_selection_with_occurrence[ci] = 1;
        });

        _pxl_indexes_of_selection = _pxl_indexes_of_selection || this.super_state.get_state()._pxl_indexes_of_selection;

        _pxl_indexes_of_selection.forEach((pxl_index) => {

            const current_pxl_color_index = pxls[pxl_index];
            colors_in_selection_with_occurrence[current_pxl_color_index] ++;
        });

        let colors_total_occurrence = 0;
        Object.entries(colors_in_selection_with_occurrence).forEach((entry) => {

            colors_total_occurrence += entry[1];
        });

        let average_color = 0;
        Object.entries(colors_in_selection_with_occurrence).forEach((entry) => {

            const [current_color_index, occurrence] = entry;
            average_color = this.color_conversion.blend_colors(average_color, pxl_colors[current_color_index], occurrence / colors_total_occurrence, true, true);
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
            const c_new_hue = (360 + Math.abs( c_hue - global_hue_diff)) % 360; // Boolean(c_hue + global_hue_diff < 0 ) ? parseInt(parseInt(360 + c_hue + global_hue_diff) % 360): parseInt(parseInt(c_hue + global_hue_diff) % 360);

            let added = [saturation, luminosity, 1];
            let base = [c_saturation, c_luminosity, 1];
            let mix = [];

            if (c_a !== 0 && change_not_only_hue) {

                mix[2] = 1 - (1 - added[2]) * (1 - base[2]); // alpha
                mix[0] = Math.round((added[0] * added[2] / mix[2]) + (base[0] * base[2] * (1 - added[2]) / mix[2])); // red
                mix[1] = Math.round((added[1] * added[2] / mix[2]) + (base[1] * base[2] * (1 - added[2]) / mix[2])); // green
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
        }).then(this.super_master_meta.update_canvas);
    };

    _get_border_from_selection = (selection, inside = true, bold = false) => {

        const { pxl_width, pxl_height } = this.super_state.get_state();

        let pxls_of_the_border = new Set();

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
                        _pxl_indexes_of_selection: new Set(),
                        _original_image_index: new_base64_original_images.indexOf(base64_original_image),
                        _last_action_timestamp: Date.now(),
                    }).then(() => {

                        this.canvas_pos.set_sizes(new_width, new_height);
                        this.canvas_pos.set_current_scale_default();

                        this._request_force_update(false, false).then(() => {

                            this.super_canvas.set_dimensions(new_width, new_height).then(() => {
                                this.super_master_meta.update_canvas(true);
                            });
                        });
                    });
                }
                image.src = _base64_original_images[_original_image_index];

            }else {

                this.super_state.set_state({
                    _s_pxls: ns_pxls,
                    _s_pxl_colors: ns_pxl_colors,
                    pxl_width: new_width,
                    pxl_height: new_height,
                    _pxl_indexes_of_selection: new Set(),
                    _last_action_timestamp: Date.now(),
                }).then(() => {

                    this.canvas_pos.set_sizes(new_width, new_height);
                    this.canvas_pos.set_current_scale_default();

                    this._request_force_update(false, false).then(() => {

                        this.super_canvas.set_dimensions(new_width, new_height).then(() => {
                            this.super_master_meta.update_canvas(true);
                        });
                    });
                });
            }
        }
    };

    to_selection_size = (grow) => {

        let { _pxl_indexes_of_selection } = this.super_state.get_state();

        _pxl_indexes_of_selection = this._to_selection_size(grow, _pxl_indexes_of_selection);

        this.super_state.set_state({_pxl_indexes_of_selection}).then(this.super_master_meta.update_canvas);
    };

    _to_selection_size = (grow, _pxl_indexes_of_selection) => {

        _pxl_indexes_of_selection = new Set(_pxl_indexes_of_selection);

        for (let si = 1; si <= Math.abs(grow); si++) {

            const pxls_of_the_border = new Set(this._get_border_from_selection(_pxl_indexes_of_selection, grow < 0, false));

            for (let pxl of pxls_of_the_border) {

                if(grow < 0) {

                    _pxl_indexes_of_selection.delete(pxl);
                }else {

                    _pxl_indexes_of_selection.add(pxl);
                }
            }
        }

        return _pxl_indexes_of_selection;

    }

    to_selection_none = () => {

        this.super_state.set_state({_pxl_indexes_of_selection: new Set()}).then(() => {

            this._notify_is_something_selected();
            this.super_master_meta.update_canvas(true);
        });
    };

    confirm_import = () => {

        this._merge_import();
    };

    _merge_import = () => {

        const {imported_image_pxls_positioned, imported_image_pxl_colors} = this.super_state.get_imported_image_data()
        let { _s_pxls, _s_pxl_colors, _layer_index } = this.super_state.get_state();

        Object.entries(imported_image_pxls_positioned).forEach((entry) => {

            const [pixel_index, color_index] = entry;

            const old_pixel_color_index = _s_pxls[_layer_index][pixel_index];
            const old_pixel_color_hex = _s_pxl_colors[_layer_index][old_pixel_color_index];
            const top_pixel_color_hex = imported_image_pxl_colors[color_index];
            const new_pixel_color_hex = this.color_conversion.blend_colors(old_pixel_color_hex, top_pixel_color_hex, 1, false, false);

            let pxl_colors = Array.from(_s_pxl_colors[_layer_index]);
            if(!_s_pxl_colors[_layer_index].includes(new_pixel_color_hex)) {

                pxl_colors.push(new_pixel_color_hex);
            }
            _s_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);

            const new_pixel_color_index = _s_pxl_colors[_layer_index].indexOf(new_pixel_color_hex);
            _s_pxls[_layer_index][pixel_index] = new_pixel_color_index;

        });

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

            this.super_master_meta.update_canvas(true);
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

    to_color = (hue = 0, strength, blend_with_a_saturation_of = null, blend_with_a_luminosity_of = null) => {

        this._to_colorized(hue, strength, blend_with_a_saturation_of, blend_with_a_luminosity_of);
    }

    to_vignette = (color = "#000000ff", intensity = 0) => {

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
        let new_pxl_indexes_of_selection = new Set();
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
                }).then(this.super_master_meta.update_canvas)

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
            }).then(this.super_master_meta.update_canvas);
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

        this.super_state.set_state({_s_pxls: ns_pxls, _s_pxl_colors: ns_pxl_colors, _last_action_timestamp: Date.now()}).then(this.super_master_meta.update_canvas);
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

                this.super_master_meta.update_canvas(true);
                callback_function(results);
            });
        });
    };

    _auto_adjust_contrast = (intensity = 1) => {

        const { _layer_index } = this.super_state.get_state();
        let { _s_pxls, _s_pxl_colors } = this.super_state.get_state();

        [ _s_pxls[_layer_index], _s_pxl_colors[_layer_index] ] = this._pxl_adjust_contrast(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], intensity);


        this.super_state.set_state({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}).then(this.super_master_meta.update_canvas);
    };

    _auto_adjust_saturation = (intensity = 1) => {

        const { _layer_index } = this.super_state.get_state();
        let { _s_pxls, _s_pxl_colors } = this.super_state.get_state();

        [ _s_pxls[_layer_index], _s_pxl_colors[_layer_index] ] = this._pxl_adjust_saturation(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], intensity);

        this.super_state.set_state({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}).then(this.super_master_meta.update_canvas);
    }

    _pxl_adjust_saturation = (pxls, pxl_colors, intensity) => {

        let min_s = 100;
        let max_s = 0;

        pxl_colors.forEach((uint32) => {

            const s = this.color_conversion.to_hsla_from_rgba(this.color_conversion.to_rgba_from_uint32(uint32))[1];
            if(s > max_s) { max_s = s; }
            if(s < min_s) { min_s = s; }
        });

        const alpha = 100 / Math.max(1, max_s - min_s);
        const beta = -min_s * alpha;

        pxl_colors = Uint32Array.from(pxl_colors.map((uint32) => {

            const [h, s, l, o] = this.color_conversion.to_hsla_from_rgba(this.color_conversion.to_rgba_from_uint32(uint32));

            const saturation = Math.min(100, Math.max(0, s * alpha + beta));
            const new_saturation = intensity * saturation + (1-intensity) * s;

            return this.color_conversion.to_uint32_from_rgba(this.color_conversion.to_rgba_from_hsla(Array.of(h, new_saturation, l, o)));
        }));

        return Array.of(pxls, pxl_colors);
    };

    _auto_adjust_smoothness = () => {

        const { _layer_index } = this.super_state.get_state();
        let { _s_pxls, _s_pxl_colors } = this.super_state.get_state();

        [ _s_pxls[_layer_index], _s_pxl_colors[_layer_index] ] = this._pxl_adjust_smoothness(_s_pxls[_layer_index], _s_pxl_colors[_layer_index]);


        this.super_state.set_state({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}).then(this.super_master_meta.update_canvas);
    };

    _pxl_to_vignette = (pxls, pxl_colors, color, intensity, callback_function) => {

        const {pxl_width, pxl_height } = this.super_state.get_state();

        let [ctx, canvas] = this._get_new_ctx_from_canvas(pxl_width, pxl_height);

        // Create a radial gradient
        // The inner circle is at x=110, y=90, with radius=30
        // The outer circle is at x=100, y=100, with radius=70
        const max_width_height = Math.max(pxl_width, pxl_height);
        const inverted_color = this.color_conversion.invert_uint32(color);

        let gradient = ctx.createRadialGradient(pxl_width / 2,pxl_height / 2,0, pxl_width / 2,pxl_height / 2, max_width_height / 2);

        gradient.addColorStop(1, this.color_conversion.to_hex_from_uint32(color));
        gradient.addColorStop(0.85, this.color_conversion.to_hex_from_uint32(this.color_conversion.blend_colors(color, inverted_color, 0.75)));
        gradient.addColorStop(0, this.color_conversion.to_hex_from_uint32(inverted_color));

        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, pxl_width, pxl_height);

        let canvas_image_data = ctx.getImageData(0, 0, pxl_width, pxl_height);
        ctx = null;
        canvas = null;
        let {new_pxls, new_pxl_colors} = this._get_pixels_palette_and_list_from_image_data(canvas_image_data, true, 0);
        canvas_image_data = null;

        this._remove_close_pxl_colors(new_pxls, new_pxl_colors, 255/6/255, null, 18).then( ([new_pxls, new_pxl_colors]) => {

            [new_pxls, new_pxl_colors] = this._pxl_colors_to_alpha(new_pxls, new_pxl_colors, inverted_color, 1);

            const [r, g, b] = this.color_conversion.to_rgba_from_uint32(color);
            new_pxl_colors = new_pxl_colors.map((pxl_color, color_index) => {

                const p_a = this.color_conversion.to_rgba_from_uint32(pxl_color)[3];
                return this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(r, g, b, p_a));
            });

            let brand_new_pxl_colors = [];
            new_pxls = new_pxls.map(function(pxl, index) {

                const pxl_color = new_pxl_colors[pxl];
                const old_pxl_color = pxl_colors[pxls[index]];

                const new_color = this.color_conversion.blend_colors(old_pxl_color, pxl_color, intensity, false, false);

                if (brand_new_pxl_colors.indexOf(new_color) === -1) {

                    brand_new_pxl_colors.push(new_color);
                }

                const new_color_index = brand_new_pxl_colors.indexOf(new_color);

                return new_color_index;
            });

            new_pxl_colors = brand_new_pxl_colors;

            callback_function(Array.of(Array.from(new_pxls), Uint32Array.from(new_pxl_colors)));
        });
    };

    _to_vignette = (color, intensity) => {

        if(intensity > 0) {

            const {_layer_index} = this.super_state.get_state();
            let {_s_pxls, _s_pxl_colors} = this.super_state.get_state();

            this._pxl_to_vignette(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], color, intensity, (result) => {

                [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = result;

                this.super_state.set_state({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}).then(this.super_master_meta.update_canvas);
            });
        }
    };


    _to_colorized = (hue = null, opacity = null, blend_with_a_saturation_of = null, blend_with_a_luminosity_of = null) => {

        const { _s_pxl_colors, _layer_index } = this.super_state.get_state();
        opacity = opacity === null ? 1: opacity;

        const _new_pxl_colors = _s_pxl_colors[_layer_index].map((color) => {

            const [r, g, b, a] = this.color_conversion.to_rgba_from_uint32(color);
            let [hue, saturation, luminosity, op] = this.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(r, g, b, a));

            let added = [blend_with_a_saturation_of, blend_with_a_luminosity_of, opacity];
            let base = [saturation, luminosity, op];
            let mix = [];

            if (opacity !== 0) {

                mix[2] = 1 - (1 - added[2]) * (1 - base[2]); // alpha
                mix[0] = Math.round((added[0] * added[2] / mix[2]) + (base[0] * base[2] * (1 - added[2]) / mix[2])); // red
                mix[1] = Math.round((added[1] * added[2] / mix[2]) + (base[1] * base[2] * (1 - added[2]) / mix[2])); // green
            }else {

                mix = [saturation, luminosity];
            }

            const [h_r, h_g, h_b, h_a] = this.color_conversion.to_rgba_from_hsla(Array.of(hue, mix[0], mix[1], mix[2]));

            if (a === 0) {

                color = 0;
            }else {

                color = this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(h_r, h_g, h_b, h_a));
            }

            return color;
        });

        let ns_pxl_colors = this.super_state.get_state()._s_pxl_colors;
        ns_pxl_colors[_layer_index] = _new_pxl_colors;

        this.super_state.set_state({_s_pxl_colors: ns_pxl_colors, _last_action_timestamp: Date.now()}).then(this.super_master_meta.update_canvas);
    };

    _get_filters = () => {

        return {
            "...none": {
                "a": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 255),
                "r": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 255),
                "g": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 255),
                "b": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 255)
            },
            ".1997": {
                "a": Uint8ClampedArray.of(0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 14, 16, 17, 19, 20, 22, 23, 25, 26, 28, 29, 31, 32, 34, 35, 37, 38, 39, 41, 42, 44, 45, 46, 48, 49, 50, 52, 53, 54, 55, 57, 58, 59, 60, 61, 62, 64, 65, 66, 67, 68, 69, 70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 146, 147, 148, 149, 150, 151, 152, 153, 153, 154, 155, 156, 157, 158, 159, 160, 160, 161, 162, 163, 164, 165, 166, 166, 167, 168, 169, 170, 171, 172, 172, 173, 174, 175, 176, 177, 178, 178, 179, 180, 181, 182, 183, 183, 184, 185, 186, 187, 188, 188, 189, 190, 191, 192, 193, 193, 194, 195, 196, 197, 198, 199, 199, 200, 201, 202, 203, 204, 204, 205, 206, 207, 208, 209, 209, 210, 211, 212, 213, 214, 215, 215, 216, 217, 218, 219, 220, 221, 221, 222, 223, 224, 225, 226, 227, 227, 228, 229, 230, 231, 232, 233, 233, 234, 235, 236, 237, 238, 239, 240, 241, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 250, 251, 252, 253, 254, 255, 255),
                "r": Uint8ClampedArray.of(58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 59, 60, 60, 61, 62, 62, 63, 63, 64, 64, 65, 66, 66, 67, 67, 68, 69, 69, 70, 70, 71, 72, 72, 73, 74, 74, 75, 76, 77, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 95, 96, 97, 98, 99, 100, 102, 103, 104, 105, 106, 108, 109, 110, 111, 112, 113, 114, 116, 117, 118, 119, 120, 121, 122, 123, 125, 126, 127, 128, 129, 130, 131, 133, 134, 135, 136, 137, 138, 140, 141, 142, 143, 144, 146, 147, 148, 149, 151, 152, 153, 154, 156, 157, 158, 160, 161, 162, 164, 165, 166, 168, 169, 170, 172, 173, 175, 176, 177, 179, 180, 182, 183, 185, 186, 188, 189, 191, 192, 193, 194, 196, 197, 198, 199, 200, 201, 202, 203, 204, 204, 205, 206, 206, 207, 208, 208, 209, 209, 210, 210, 211, 211, 212, 212, 212, 213, 213, 213, 213, 213, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 215, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 213, 213, 213, 213, 213, 213, 213, 212, 212, 212, 212, 212),
                "g": Uint8ClampedArray.of(40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 41, 41, 42, 42, 42, 42, 43, 43, 43, 43, 44, 44, 44, 44, 45, 45, 45, 45, 46, 46, 46, 47, 47, 48, 48, 48, 49, 49, 50, 50, 51, 52, 52, 53, 54, 54, 55, 56, 57, 58, 59, 60, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 153, 154, 155, 156, 157, 158, 160, 161, 162, 163, 164, 166, 167, 168, 169, 171, 172, 173, 174, 175, 176, 178, 179, 180, 181, 182, 183, 185, 186, 187, 188, 189, 190, 191, 192, 193, 195, 196, 197, 198, 199, 200, 201, 202, 203, 205, 206, 207, 208, 209, 210, 211, 212, 214, 215, 216, 217, 218, 220, 221, 222, 223, 225, 226, 227, 228, 230, 231, 232, 233, 235, 236, 237, 239, 240, 241, 242, 244, 245, 246, 247, 249, 250, 251, 252, 254, 255, 255),
                "b": Uint8ClampedArray.of(45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 46, 46, 47, 47, 47, 48, 48, 48, 48, 49, 49, 49, 50, 50, 50, 51, 51, 51, 52, 52, 53, 53, 54, 54, 55, 56, 56, 57, 58, 59, 60, 61, 62, 62, 63, 64, 65, 66, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 90, 91, 92, 93, 94, 96, 97, 98, 99, 100, 102, 103, 104, 105, 107, 108, 109, 110, 112, 113, 114, 115, 117, 118, 119, 120, 122, 123, 124, 126, 127, 128, 130, 131, 133, 134, 135, 137, 138, 140, 141, 143, 144, 145, 147, 148, 149, 151, 152, 153, 155, 156, 157, 159, 160, 161, 162, 164, 165, 166, 167, 168, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 184, 185, 186, 187, 188, 188, 189, 190, 191, 192, 193, 193, 194, 195, 195, 196, 196, 196, 197, 197, 197, 197, 198, 198, 198, 198, 198, 198, 198, 198, 198, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 198, 198, 198, 198, 198, 198, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 198, 198, 198, 198, 198, 198, 198)
            },
            ".Brannan": {
                "a": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 255),
                "r": Uint8ClampedArray.of(50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 51, 51, 51, 51, 51, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 64, 66, 67, 68, 69, 70, 71, 71, 72, 73, 73, 74, 75, 75, 76, 76, 77, 77, 78, 78, 79, 79, 80, 80, 81, 81, 82, 83, 83, 84, 85, 86, 87, 88, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115, 116, 118, 119, 120, 121, 122, 124, 125, 126, 128, 129, 130, 132, 133, 134, 136, 137, 139, 140, 141, 143, 144, 146, 147, 149, 150, 152, 153, 154, 156, 157, 159, 160, 162, 163, 164, 166, 167, 169, 170, 171, 173, 174, 175, 177, 178, 179, 181, 182, 183, 185, 186, 187, 189, 190, 192, 193, 195, 196, 198, 199, 201, 203, 204, 206, 207, 209, 210, 212, 213, 215, 216, 217, 219, 220, 221, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 236, 237, 238, 239, 239, 240, 241, 241, 242, 243, 243, 244, 244, 245, 246, 246, 247, 247, 248, 248, 249, 249, 249, 250, 250, 251, 251, 251, 252, 252, 252, 253, 253, 253, 254, 254, 254, 254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 254, 254, 254, 254, 254),
                "g": Uint8ClampedArray.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 38, 39, 40, 41, 43, 44, 45, 47, 48, 50, 51, 53, 54, 56, 57, 59, 61, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 87, 89, 91, 93, 95, 97, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 161, 163, 165, 167, 168, 170, 172, 173, 175, 176, 178, 179, 181, 182, 183, 184, 186, 187, 188, 189, 190, 191, 192, 193, 193, 194, 195, 196, 196, 197, 198, 198, 199, 200, 200, 201, 202, 202, 203, 203, 204, 204, 205, 205, 206, 207, 207, 208, 208, 209, 210, 210, 211, 212, 212, 213, 214, 214, 215, 216, 217, 217, 218, 219, 219, 220, 221, 221, 222, 222, 223, 224, 224, 225, 225, 226, 226, 227, 228, 228, 229, 229, 229, 230, 230, 231, 231, 232, 232, 233, 233, 233, 234, 234, 234, 235, 235, 236, 236, 236, 237, 237, 237, 238, 238, 239, 239, 239, 240, 240, 240, 241, 241, 241, 242, 242, 242, 243, 243, 243, 244, 244, 244, 245, 245, 245, 246, 246, 247, 247, 247, 248, 248, 249, 249, 250, 250, 251, 251, 252, 252, 252),
                "b": Uint8ClampedArray.of(48, 48, 48, 48, 48, 48, 48, 48, 49, 49, 49, 49, 49, 49, 49, 50, 50, 50, 51, 51, 51, 52, 52, 53, 53, 54, 54, 54, 55, 55, 56, 56, 57, 57, 58, 58, 59, 60, 60, 61, 61, 62, 62, 63, 64, 64, 65, 66, 66, 67, 68, 68, 69, 70, 71, 71, 72, 73, 74, 75, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 92, 93, 94, 95, 96, 98, 99, 100, 101, 102, 103, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 141, 142, 143, 144, 145, 146, 146, 147, 148, 148, 149, 150, 151, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 178, 179, 180, 181, 181, 182, 183, 183, 184, 184, 185, 185, 185, 186, 186, 187, 187, 187, 188, 188, 188, 189, 189, 190, 190, 191, 191, 192, 193, 193, 194, 195, 195, 196, 197, 198, 199, 200, 200, 201, 202, 203, 204, 205, 206, 206, 207, 208, 209, 210, 211, 211, 212, 213, 214, 214, 215, 216, 216, 217, 218, 218, 219, 219, 220, 220, 221, 222, 222, 222, 223, 223, 224, 224, 224, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225)
            },
            ".Gotham": {
                "a": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 255),
                "r": Uint8ClampedArray.of(50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 51, 51, 51, 51, 51, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 64, 66, 67, 68, 69, 70, 71, 71, 72, 73, 73, 74, 75, 75, 76, 76, 77, 77, 78, 78, 79, 79, 80, 80, 81, 81, 82, 83, 83, 84, 85, 86, 87, 88, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115, 116, 118, 119, 120, 121, 122, 124, 125, 126, 128, 129, 130, 132, 133, 134, 136, 137, 139, 140, 141, 143, 144, 146, 147, 149, 150, 152, 153, 154, 156, 157, 159, 160, 162, 163, 164, 166, 167, 169, 170, 171, 173, 174, 175, 177, 178, 179, 181, 182, 183, 185, 186, 187, 189, 190, 192, 193, 195, 196, 198, 199, 201, 203, 204, 206, 207, 209, 210, 212, 213, 215, 216, 217, 219, 220, 221, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 236, 237, 238, 239, 239, 240, 241, 241, 242, 243, 243, 244, 244, 245, 246, 246, 247, 247, 248, 248, 249, 249, 249, 250, 250, 251, 251, 251, 252, 252, 252, 253, 253, 253, 254, 254, 254, 254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 254, 254, 254, 254, 254),
                "g": Uint8ClampedArray.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 38, 39, 40, 41, 43, 44, 45, 47, 48, 50, 51, 53, 54, 56, 57, 59, 61, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 87, 89, 91, 93, 95, 97, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 161, 163, 165, 167, 168, 170, 172, 173, 175, 176, 178, 179, 181, 182, 183, 184, 186, 187, 188, 189, 190, 191, 192, 193, 193, 194, 195, 196, 196, 197, 198, 198, 199, 200, 200, 201, 202, 202, 203, 203, 204, 204, 205, 205, 206, 207, 207, 208, 208, 209, 210, 210, 211, 212, 212, 213, 214, 214, 215, 216, 217, 217, 218, 219, 219, 220, 221, 221, 222, 222, 223, 224, 224, 225, 225, 226, 226, 227, 228, 228, 229, 229, 229, 230, 230, 231, 231, 232, 232, 233, 233, 233, 234, 234, 234, 235, 235, 236, 236, 236, 237, 237, 237, 238, 238, 239, 239, 239, 240, 240, 240, 241, 241, 241, 242, 242, 242, 243, 243, 243, 244, 244, 244, 245, 245, 245, 246, 246, 247, 247, 247, 248, 248, 249, 249, 250, 250, 251, 251, 252, 252, 252),
                "b": Uint8ClampedArray.of(48, 48, 48, 48, 48, 48, 48, 48, 49, 49, 49, 49, 49, 49, 49, 50, 50, 50, 51, 51, 51, 52, 52, 53, 53, 54, 54, 54, 55, 55, 56, 56, 57, 57, 58, 58, 59, 60, 60, 61, 61, 62, 62, 63, 64, 64, 65, 66, 66, 67, 68, 68, 69, 70, 71, 71, 72, 73, 74, 75, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 92, 93, 94, 95, 96, 98, 99, 100, 101, 102, 103, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 141, 142, 143, 144, 145, 146, 146, 147, 148, 148, 149, 150, 151, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 178, 179, 180, 181, 181, 182, 183, 183, 184, 184, 185, 185, 185, 186, 186, 187, 187, 187, 188, 188, 188, 189, 189, 190, 190, 191, 191, 192, 193, 193, 194, 195, 195, 196, 197, 198, 199, 200, 200, 201, 202, 203, 204, 205, 206, 206, 207, 208, 209, 210, 211, 211, 212, 213, 214, 214, 215, 216, 216, 217, 218, 218, 219, 219, 220, 220, 221, 222, 222, 222, 223, 223, 224, 224, 224, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225)
            },
            ".Gingham": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(44,44,44,44,45,45,45,45,45,45,46,46,46,46,46,47,47,47,47,48,48,48,49,49,49,50,50,51,51,52,52,53,54,54,55,56,57,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,74,75,76,78,79,81,82,83,85,86,88,89,90,92,93,95,96,98,99,101,102,104,105,107,109,110,112,113,115,116,118,119,121,122,124,125,127,128,130,131,133,134,136,137,138,140,141,142,143,145,146,147,148,149,150,151,152,153,154,155,156,156,157,158,159,160,160,161,162,163,163,164,165,165,166,167,168,168,169,170,170,171,171,172,173,173,174,175,175,176,176,177,177,178,179,179,180,180,181,181,182,182,183,183,184,184,185,185,186,186,187,187,188,188,189,189,190,190,191,191,192,192,192,193,193,194,194,195,195,195,196,196,197,197,197,198,198,199,199,199,200,200,201,201,201,202,202,203,203,203,204,204,205,205,205,206,206,207,207,207,208,208,209,209,209,210,210,210,211,211,211,212,212,212,213,213,213,213,213,213,213,214,214,214,214,214,214,214,214,214,214,214,214,214,213,213,213,213,213,213,213,213,213,213),
                "g": Uint8ClampedArray.of(44,44,44,44,44,44,44,44,44,44,44,44,44,45,45,45,45,45,45,46,46,46,47,47,47,48,48,49,49,50,51,51,52,53,54,54,55,56,57,58,59,61,62,63,64,65,66,68,69,70,71,73,74,75,77,78,79,81,82,84,85,87,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122,124,125,127,128,130,131,133,134,135,137,138,139,141,142,143,145,146,147,148,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,168,169,170,171,171,172,173,173,174,175,176,176,177,177,178,179,179,180,181,181,182,182,183,183,184,184,185,185,186,186,187,187,188,188,189,189,190,190,191,191,191,192,192,193,193,193,194,194,195,195,195,196,196,196,197,197,198,198,198,199,199,199,200,200,200,201,201,201,202,202,202,203,203,203,204,204,204,205,205,205,206,206,206,207,207,207,208,208,208,209,209,209,210,210,210,211,211,211,212,212,212,212,213,213,213,213,213,213,213,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,213,213,213,213,213,213),
                "b": Uint8ClampedArray.of(45,45,45,45,45,45,46,46,46,46,46,46,47,47,47,47,48,48,48,48,49,49,49,50,50,51,51,52,52,53,53,54,54,55,56,57,57,58,59,60,61,62,63,64,65,66,67,68,70,71,72,73,75,76,77,79,80,82,83,84,86,87,89,90,91,93,94,96,97,98,100,101,102,104,104,106,107,108,109,111,112,113,115,116,117,119,120,121,123,124,125,127,128,129,131,132,134,135,136,138,139,140,142,143,144,146,147,148,150,151,152,153,155,156,157,158,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,179,180,181,181,182,183,183,184,185,185,186,186,187,187,188,188,189,189,190,190,191,191,192,192,193,193,193,194,194,194,195,195,196,196,196,197,197,197,198,198,198,198,199,199,199,200,200,200,200,201,201,201,201,202,202,202,203,203,203,203,203,204,204,204,204,205,205,205,205,206,206,206,206,207,207,207,208,208,208,208,209,209,209,209,209,210,210,210,210,211,211,211,211,211,211,211,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,213,213,213,213,213,213,213,213)
            },
            ".Hefe": {
                "a": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 255),
                "r": Uint8ClampedArray.of(32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 33, 33, 33, 33, 33, 34, 35, 36, 38, 39, 41, 43, 45, 48, 50, 52, 54, 56, 58, 60, 62, 64, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 117, 119, 121, 123, 125, 126, 128, 130, 132, 133, 135, 137, 139, 140, 142, 144, 146, 147, 149, 151, 152, 154, 155, 157, 158, 160, 161, 163, 164, 166, 167, 168, 170, 171, 172, 173, 175, 176, 177, 178, 179, 180, 181, 182, 184, 185, 186, 187, 188, 189, 190, 190, 191, 192, 193, 194, 195, 196, 197, 197, 198, 199, 200, 201, 201, 202, 203, 204, 204, 205, 205, 206, 206, 207, 207, 208, 208, 209, 209, 210, 210, 211, 211, 212, 212, 213, 213, 214, 214, 215, 215, 216, 216, 217, 217, 218, 218, 219, 219, 220, 220, 221, 221, 221, 222, 222, 223, 223, 224, 224, 225, 225, 225, 226, 226, 227, 227, 228, 228, 228, 229, 229, 230, 230, 231, 231, 231, 232, 232, 233, 233, 233, 234, 234, 235, 235, 235, 236, 236, 236, 237, 237, 238, 238, 238, 239, 239, 239, 240, 240, 240, 241, 241, 242, 242, 242, 243, 243, 243, 244, 244, 245, 245, 245, 246, 246, 247, 248, 248, 249, 249, 250, 250, 251, 251, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252),
                "g": Uint8ClampedArray.of(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 23, 24, 25, 27, 28, 30, 31, 33, 34, 36, 37, 39, 40, 42, 44, 45, 47, 49, 50, 52, 54, 56, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 78, 80, 82, 85, 87, 89, 92, 94, 97, 99, 102, 104, 106, 109, 111, 114, 116, 118, 121, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143, 145, 146, 148, 150, 152, 154, 156, 157, 159, 161, 163, 164, 166, 168, 169, 171, 173, 174, 176, 178, 179, 181, 182, 184, 185, 187, 188, 190, 191, 192, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 205, 206, 207, 207, 208, 209, 209, 210, 210, 211, 211, 211, 212, 212, 213, 213, 213, 214, 214, 215, 215, 216, 216, 216, 217, 217, 218, 218, 219, 219, 220, 220, 220, 221, 221, 222, 222, 222, 223, 223, 224, 224, 225, 225, 225, 226, 226, 227, 227, 228, 228, 228, 229, 229, 230, 230, 231, 231, 232, 232, 232, 233, 233, 234, 234, 235, 235, 236, 236, 237, 237, 238, 238, 239, 239, 239, 240, 240, 241, 241, 242, 242, 243, 244, 244, 245, 246, 246, 247, 248, 249, 249, 250, 250, 251, 251, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252),
                "b": Uint8ClampedArray.of(2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 8, 8, 9, 9, 9, 10, 10, 11, 12, 12, 13, 13, 14, 15, 15, 16, 17, 17, 18, 19, 19, 20, 21, 22, 23, 24, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 38, 39, 40, 42, 43, 45, 47, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 87, 89, 91, 93, 95, 96, 98, 100, 101, 103, 105, 107, 108, 110, 112, 113, 115, 117, 118, 120, 122, 123, 125, 127, 128, 130, 131, 133, 135, 136, 138, 140, 141, 143, 145, 146, 148, 149, 151, 153, 154, 156, 158, 159, 161, 163, 164, 166, 167, 169, 170, 171, 173, 174, 175, 177, 178, 179, 180, 182, 183, 184, 185, 186, 187, 189, 190, 191, 192, 193, 194, 195, 195, 196, 197, 198, 198, 199, 200, 200, 201, 201, 202, 202, 203, 203, 204, 204, 204, 205, 205, 205, 206, 206, 206, 207, 207, 207, 207, 208, 208, 209, 209, 209, 210, 210, 211, 211, 211, 212, 212, 213, 213, 214, 214, 214, 215, 215, 216, 216, 216, 217, 217, 218, 218, 218, 219, 219, 220, 220, 220, 221, 221, 222, 222, 222, 223, 223, 224, 224, 225, 225, 226, 226, 227, 227, 227, 228, 228, 228, 228, 228, 228, 228, 228, 228, 228, 228, 228, 228, 228, 228, 228, 228, 228, 228, 228)
            },
            ".Lordkelvin": {
                "a": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 255),
                "r": Uint8ClampedArray.of(43, 44, 46, 47, 49, 50, 52, 53, 55, 56, 58, 59, 61, 62, 64, 65, 67, 69, 70, 72, 73, 75, 77, 78, 80, 81, 83, 85, 86, 88, 90, 91, 93, 95, 96, 98, 100, 102, 103, 105, 107, 109, 111, 112, 114, 116, 118, 120, 121, 123, 125, 127, 129, 130, 132, 134, 136, 137, 139, 141, 142, 144, 146, 147, 149, 151, 152, 154, 155, 157, 158, 160, 162, 163, 165, 166, 168, 169, 171, 172, 174, 175, 176, 178, 179, 180, 182, 183, 184, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 201, 202, 203, 204, 204, 205, 206, 207, 207, 208, 209, 210, 210, 211, 212, 212, 213, 214, 214, 215, 216, 217, 217, 218, 219, 219, 220, 221, 222, 222, 223, 224, 224, 225, 225, 226, 227, 227, 228, 228, 229, 229, 229, 230, 230, 231, 231, 232, 232, 232, 233, 233, 233, 234, 234, 235, 235, 235, 236, 236, 236, 237, 237, 237, 238, 238, 239, 239, 239, 240, 240, 240, 241, 241, 241, 242, 242, 242, 243, 243, 243, 243, 244, 244, 244, 245, 245, 245, 245, 245, 246, 246, 246, 246, 246, 247, 247, 247, 247, 247, 248, 248, 248, 248, 248, 248, 249, 249, 249, 249, 249, 249, 249, 250, 250, 250, 250, 250, 250, 250, 250, 251, 251, 251, 251, 251, 251, 251, 251, 251, 252, 252, 252, 252, 252, 252, 252, 252, 252, 253, 253, 253, 253, 253, 253, 253, 253, 254, 254, 254, 254, 254),
                "g": Uint8ClampedArray.of(36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 37, 37, 37, 37, 37, 37, 38, 38, 38, 39, 39, 40, 40, 41, 41, 42, 43, 43, 44, 45, 46, 47, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 59, 60, 61, 62, 63, 64, 65, 67, 68, 69, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86, 87, 88, 89, 90, 91, 92, 93, 95, 96, 97, 98, 99, 100, 101, 102, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 155, 156, 157, 158, 158, 159, 160, 160, 161, 161, 162, 163, 163, 164, 164, 165, 165, 166, 166, 167, 167, 168, 168, 168, 169, 169, 170, 171, 171, 172, 172, 173, 173, 174, 174, 175, 175, 176, 177, 177, 178, 178, 179, 179, 180, 180, 181, 181, 182, 182, 182, 183, 183, 184, 184, 184, 185, 185, 185, 186, 186, 186, 186, 187, 187, 187, 187, 188, 188, 188, 188, 188, 189, 189, 189, 189, 189, 190, 190, 190, 190, 190, 190, 190, 191, 191, 191, 191, 191, 191, 191, 191, 192, 192, 192, 192, 192, 192, 192, 192, 193, 193, 193, 193, 193, 193, 193, 193, 194, 194, 194, 194, 194, 194, 194, 195, 195, 195, 195),
                "b": Uint8ClampedArray.of(69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 71, 71, 71, 72, 72, 73, 73, 73, 74, 74, 75, 75, 76, 76, 77, 78, 78, 79, 79, 80, 80, 81, 81, 82, 82, 82, 83, 83, 84, 84, 84, 85, 85, 86, 86, 86, 87, 87, 87, 88, 88, 88, 89, 89, 90, 90, 90, 91, 91, 91, 92, 92, 93, 93, 93, 94, 94, 95, 95, 96, 96, 96, 97, 97, 98, 99, 99, 100, 100, 101, 101, 102, 102, 102, 103, 103, 103, 104, 104, 104, 105, 105, 105, 106, 106, 106, 106, 107, 107, 107, 107, 108, 108, 108, 108, 109, 109, 109, 110, 110, 110, 111, 111, 111, 111, 112, 112, 112, 113, 113, 113, 114, 114, 114, 115, 115, 115, 115, 116, 116, 116, 116, 117, 117, 117, 117, 117, 118, 118, 118, 118, 118, 118, 119, 119, 119, 119, 119, 119, 119, 120, 120, 120, 120, 120, 120, 120, 120, 120, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 124, 124, 124, 124, 124, 124)
            },
            ".Nashville": {
                "a": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 255),
                "r": Uint8ClampedArray.of(56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 57, 57, 58, 58, 59, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 75, 76, 78, 79, 81, 82, 84, 85, 87, 88, 90, 91, 93, 95, 96, 98, 100, 102, 104, 106, 108, 110, 113, 115, 117, 120, 122, 124, 127, 129, 131, 133, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 155, 157, 159, 160, 162, 164, 165, 167, 168, 170, 171, 173, 174, 175, 177, 178, 179, 181, 182, 183, 185, 186, 187, 189, 190, 191, 192, 194, 195, 196, 197, 198, 200, 201, 202, 203, 204, 205, 206, 208, 209, 209, 210, 211, 212, 213, 214, 215, 216, 217, 217, 218, 219, 220, 220, 221, 222, 223, 223, 224, 225, 226, 226, 227, 228, 228, 229, 230, 230, 231, 231, 232, 233, 233, 234, 234, 235, 235, 236, 237, 237, 238, 238, 239, 239, 240, 240, 240, 241, 241, 242, 242, 243, 243, 243, 244, 244, 245, 245, 245, 246, 246, 246, 247, 247, 247, 248, 248, 248, 248, 249, 249, 249, 249, 250, 250, 250, 250, 251, 251, 251, 251, 251, 252, 252, 252, 252, 252, 253, 253, 253, 253, 253, 254, 254, 254, 254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255),
                "g": Uint8ClampedArray.of(38, 39, 39, 40, 41, 41, 42, 42, 43, 44, 44, 45, 46, 46, 47, 48, 49, 50, 51, 52, 53, 55, 56, 57, 59, 60, 61, 63, 64, 65, 67, 68, 69, 71, 72, 73, 74, 76, 77, 78, 80, 81, 82, 84, 85, 86, 87, 89, 90, 91, 93, 94, 95, 97, 98, 99, 101, 102, 103, 104, 106, 107, 108, 110, 111, 112, 114, 115, 116, 118, 119, 121, 122, 123, 125, 126, 128, 129, 130, 132, 133, 134, 136, 137, 138, 140, 141, 142, 143, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 158, 159, 160, 161, 162, 163, 163, 164, 165, 166, 166, 167, 168, 169, 169, 170, 171, 172, 172, 173, 174, 175, 176, 176, 177, 178, 179, 180, 181, 181, 182, 183, 184, 185, 186, 187, 187, 188, 189, 189, 190, 191, 191, 192, 193, 193, 194, 194, 195, 195, 196, 197, 197, 198, 198, 199, 199, 200, 200, 201, 201, 202, 202, 202, 203, 203, 204, 204, 205, 205, 205, 206, 206, 207, 207, 207, 208, 208, 208, 209, 209, 209, 210, 210, 210, 211, 211, 211, 212, 212, 212, 213, 213, 213, 213, 214, 214, 214, 214, 215, 215, 215, 215, 216, 216, 216, 216, 216, 217, 217, 217, 217, 217, 218, 218, 218, 218, 218, 218, 219, 219, 219, 219, 219, 220, 220, 220, 220, 220, 220, 220, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221),
                "b": Uint8ClampedArray.of(97, 98, 98, 99, 99, 100, 100, 101, 101, 102, 102, 103, 104, 104, 105, 105, 106, 107, 107, 108, 109, 110, 110, 111, 112, 113, 114, 114, 115, 116, 116, 117, 118, 118, 119, 119, 120, 120, 121, 121, 122, 122, 123, 123, 124, 124, 124, 125, 125, 126, 126, 127, 127, 127, 128, 128, 129, 129, 129, 130, 130, 131, 131, 132, 132, 132, 133, 133, 134, 134, 135, 135, 136, 136, 136, 137, 137, 138, 138, 139, 139, 139, 140, 140, 141, 141, 142, 142, 142, 143, 143, 144, 144, 144, 145, 145, 146, 146, 147, 147, 147, 148, 148, 149, 149, 150, 150, 151, 151, 151, 152, 152, 153, 153, 154, 154, 154, 155, 155, 155, 156, 156, 156, 157, 157, 157, 158, 158, 158, 158, 158, 158, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 160, 160, 160, 160, 160, 161, 161, 161, 162, 162, 162, 162, 163, 163, 163, 163, 164, 164, 164, 164, 165, 165, 165, 165, 165, 165, 166, 166, 166, 166, 166, 166, 166, 166, 166, 166, 166, 166, 166, 166, 166, 166, 166, 166, 167, 167, 167, 167, 167, 167, 167, 167, 167, 168, 168, 168, 168, 168, 168, 169, 169, 169, 169, 169, 170, 170, 170, 170, 171, 171, 171, 171, 171, 172, 172, 172, 172, 172, 173, 173, 173, 173, 173, 173, 173, 174, 174, 174, 174, 174, 174, 174, 174, 175, 175, 175, 175, 175, 175, 175, 175, 175, 175, 175, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176)
            },
            ".Xpro": {
                "a": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 255),
                "r": Uint8ClampedArray.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 7, 7, 8, 8, 9, 9, 10, 11, 11, 12, 13, 14, 14, 15, 16, 17, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 37, 38, 39, 41, 42, 43, 45, 46, 48, 49, 51, 52, 54, 55, 57, 58, 60, 62, 63, 65, 67, 68, 70, 72, 74, 76, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 141, 143, 145, 147, 149, 151, 153, 155, 157, 159, 161, 163, 165, 167, 169, 171, 172, 174, 176, 178, 180, 182, 184, 186, 188, 189, 191, 193, 194, 196, 198, 199, 201, 202, 204, 205, 207, 208, 209, 211, 212, 214, 215, 216, 217, 219, 220, 221, 222, 223, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 239, 240, 241, 242, 243, 243, 244, 245, 246, 246, 247, 248, 248, 249, 249, 250, 250, 251, 251, 252, 252, 252, 253, 253, 253, 253, 253, 253, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255),
                "g": Uint8ClampedArray.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10, 10, 11, 12, 12, 13, 14, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 39, 40, 41, 43, 44, 45, 47, 48, 50, 51, 53, 54, 56, 57, 59, 61, 62, 64, 66, 67, 69, 71, 73, 75, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 161, 163, 165, 167, 169, 171, 173, 175, 176, 178, 180, 182, 183, 185, 187, 189, 190, 192, 193, 195, 197, 198, 200, 201, 203, 204, 206, 207, 209, 210, 211, 213, 214, 216, 217, 218, 219, 221, 222, 223, 224, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 237, 238, 239, 240, 240, 241, 242, 243, 243, 244, 244, 245, 246, 246, 247, 247, 248, 248, 249, 249, 250, 250, 250, 251, 251, 252, 252, 252, 253, 253, 253, 253, 253, 253, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255),
                "b": Uint8ClampedArray.of(24, 25, 26, 27, 28, 28, 29, 30, 31, 32, 33, 34, 35, 35, 36, 37, 38, 39, 40, 41, 41, 42, 43, 44, 45, 45, 46, 47, 48, 49, 49, 50, 51, 52, 53, 53, 54, 55, 56, 56, 57, 58, 59, 59, 60, 61, 62, 62, 63, 64, 64, 65, 66, 67, 67, 68, 69, 70, 70, 71, 72, 73, 73, 74, 75, 76, 77, 77, 78, 79, 80, 81, 81, 82, 83, 84, 85, 86, 86, 87, 88, 89, 90, 91, 91, 92, 93, 94, 95, 96, 96, 97, 98, 99, 100, 101, 101, 102, 103, 104, 105, 106, 107, 107, 108, 109, 110, 111, 112, 113, 114, 114, 115, 116, 117, 118, 119, 119, 120, 121, 122, 123, 124, 124, 125, 126, 127, 127, 128, 129, 129, 130, 130, 131, 131, 132, 132, 133, 134, 134, 135, 136, 137, 138, 138, 139, 140, 141, 142, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 162, 163, 164, 165, 165, 166, 167, 168, 168, 169, 170, 171, 171, 172, 173, 173, 174, 175, 176, 176, 177, 178, 178, 179, 180, 181, 182, 182, 183, 184, 185, 185, 186, 187, 188, 189, 189, 190, 191, 192, 193, 193, 194, 195, 196, 197, 197, 198, 199, 200, 200, 201, 202, 203, 204, 204, 205, 206, 206, 207, 208, 208, 209, 210, 210, 211, 212, 212, 213, 214, 215, 215, 216, 217, 218, 218, 219, 220, 221, 221, 222, 223, 224, 225, 226, 226, 227, 228, 229)
            },
            "XMAT": {
                "a": Uint8ClampedArray.of(0, 0, 1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 11, 11, 12, 13, 13, 14, 15, 15, 16, 17, 18, 18, 19, 20, 21, 21, 22, 23, 24, 24, 25, 26, 27, 27, 28, 29, 30, 31, 31, 32, 33, 34, 35, 36, 36, 37, 38, 39, 40, 41, 42, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 68, 69, 70, 71, 72, 73, 75, 76, 77, 78, 80, 81, 82, 84, 85, 87, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 104, 105, 107, 109, 110, 112, 114, 115, 117, 119, 121, 122, 124, 126, 127, 129, 131, 133, 134, 136, 138, 139, 141, 143, 145, 146, 148, 150, 151, 153, 155, 156, 158, 160, 161, 163, 164, 166, 167, 169, 170, 172, 173, 175, 176, 178, 179, 180, 182, 183, 184, 186, 187, 188, 189, 190, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 207, 208, 209, 210, 211, 212, 213, 213, 214, 215, 216, 217, 217, 218, 219, 220, 220, 221, 222, 223, 223, 224, 225, 225, 226, 227, 228, 228, 229, 229, 230, 231, 231, 232, 233, 233, 234, 234, 235, 236, 236, 237, 237, 238, 239, 239, 240, 240, 241, 241, 242, 242, 243, 243, 244, 245, 245, 246, 246, 247, 247, 248, 248, 249, 249, 250, 250, 251, 251, 252, 252, 253, 253, 254, 254, 255),
                "r": Uint8ClampedArray.of(0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 90, 91, 92, 94, 95, 96, 97, 98, 100, 101, 102, 103, 105, 106, 107, 108, 110, 111, 112, 114, 115, 116, 118, 119, 120, 122, 123, 125, 126, 127, 129, 130, 131, 133, 134, 136, 137, 138, 140, 141, 143, 144, 145, 147, 148, 150, 151, 152, 154, 155, 156, 158, 159, 161, 162, 163, 165, 166, 167, 169, 170, 171, 173, 174, 175, 176, 178, 179, 180, 181, 183, 184, 185, 186, 188, 189, 190, 191, 192, 193, 194, 195, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 207, 208, 209, 210, 211, 212, 213, 214, 215, 215, 216, 217, 218, 219, 219, 220, 221, 222, 222, 223, 224, 225, 225, 226, 227, 228, 228, 229, 230, 230, 231, 232, 232, 233, 234, 234, 235, 235, 236, 237, 237, 238, 239, 239, 240, 240, 241, 241, 242, 243, 243, 244, 244, 245, 245, 246, 247, 247, 248, 248, 249, 249, 250, 250, 251, 251, 252, 253, 253, 254, 254, 255),
                "g": Uint8ClampedArray.of(0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 81, 83, 84, 85, 86, 87, 88, 90, 91, 92, 94, 95, 96, 97, 99, 100, 101, 103, 104, 105, 107, 108, 110, 111, 112, 114, 115, 117, 118, 120, 121, 123, 124, 126, 127, 129, 130, 132, 133, 135, 136, 138, 140, 141, 143, 144, 146, 147, 149, 150, 152, 153, 155, 156, 158, 159, 161, 162, 163, 165, 166, 168, 169, 170, 172, 173, 174, 176, 177, 178, 180, 181, 182, 183, 184, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 198, 199, 200, 201, 202, 203, 204, 205, 206, 206, 207, 208, 209, 210, 210, 211, 212, 213, 214, 214, 215, 216, 217, 217, 218, 219, 219, 220, 221, 222, 222, 223, 224, 224, 225, 226, 226, 227, 228, 228, 229, 229, 230, 231, 231, 232, 233, 233, 234, 234, 235, 235, 236, 237, 237, 238, 238, 239, 239, 240, 240, 241, 242, 242, 243, 243, 244, 244, 245, 245, 246, 246, 247, 247, 248, 248, 249, 249, 250, 250, 251, 251, 252, 253, 253, 254, 254, 255),
                "b": Uint8ClampedArray.of(0, 1, 3, 4, 6, 7, 9, 10, 12, 14, 15, 17, 18, 20, 21, 23, 24, 26, 28, 29, 31, 32, 34, 35, 37, 38, 40, 41, 43, 44, 46, 47, 49, 50, 52, 53, 55, 56, 58, 59, 60, 62, 63, 65, 66, 68, 69, 70, 72, 73, 75, 76, 77, 79, 80, 81, 83, 84, 85, 87, 88, 89, 90, 92, 93, 94, 95, 97, 98, 99, 100, 101, 102, 103, 105, 106, 107, 108, 109, 110, 112, 113, 114, 115, 116, 117, 118, 119, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 177, 178, 179, 180, 181, 182, 183, 183, 184, 185, 186, 187, 188, 189, 189, 191, 192, 192, 193, 194, 195, 196, 196, 197, 198, 199, 200, 200, 201, 202, 203, 203, 204, 205, 206, 206, 207, 208, 209, 209, 210, 211, 212, 212, 213, 214, 214, 215, 216, 217, 217, 218, 219, 219, 220, 221, 221, 222, 223, 223, 224, 225, 225, 226, 227, 227, 228, 229, 229, 230, 231, 231, 232, 233, 233, 234, 234, 235, 236, 236, 237, 238, 238, 239, 239, 240, 241, 241, 242, 243, 243, 244, 244, 245, 246, 246, 247, 247, 248, 249, 249, 250, 250, 251, 252, 252, 253, 253, 254, 255)
            },
            "Contrast megaX": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,7,7,7,8,8,8,9,9,10,10,10,11,11,12,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,23,23,24,25,25,26,27,28,29,29,30,31,32,32,33,34,35,35,36,37,38,39,40,41,42,43,44,45,46,47,48,50,51,52,54,55,57,58,60,62,64,66,68,70,72,74,77,79,81,84,86,89,92,94,97,100,102,105,108,110,113,115,118,121,123,126,128,130,133,135,137,139,141,143,145,148,150,152,154,156,158,160,162,164,166,168,170,172,174,175,177,179,181,183,184,186,187,189,190,192,193,195,196,197,198,200,201,202,203,204,204,205,206,207,207,208,209,209,210,211,211,212,212,213,213,214,214,215,216,216,217,217,218,218,219,220,220,221,221,222,223,223,224,224,225,226,226,227,227,228,228,229,229,230,230,231,232,232,233,233,234,234,235,235,236,236,237,238,238,239,239,240,240,241,242,242,243,243,244,244,245,245,246,247,247,248,248,249,249,250,251,251,252,252,253,253,254,254,255),
                "g": Uint8ClampedArray.of(1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,6,6,7,7,7,8,8,9,9,10,11,11,12,12,13,14,14,15,16,16,17,18,18,19,20,21,22,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,39,40,41,42,43,45,46,47,48,50,51,52,54,55,57,58,60,61,63,64,66,68,69,71,73,75,77,79,81,83,85,88,90,92,95,97,99,102,104,107,109,112,114,117,119,122,124,127,129,132,134,136,139,141,143,145,147,149,151,153,155,157,158,160,162,164,166,167,169,171,173,174,176,177,179,181,182,184,185,187,188,190,191,192,194,195,196,198,199,200,201,203,204,205,206,207,208,209,210,211,212,213,214,214,215,216,217,218,218,219,220,221,221,222,223,224,224,225,226,226,227,228,228,229,230,230,231,231,232,232,233,234,234,235,235,236,236,236,237,237,238,238,239,239,240,240,240,241,241,242,242,243,243,243,244,244,245,245,246,246,246,247,247,247,248,248,249,249,249,250,250,250,251,251,252,252,252,253,253,253,254,254,254,255,255),
                "b": Uint8ClampedArray.of(1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,8,8,8,9,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,17,17,18,18,19,19,20,21,21,22,22,23,24,24,25,26,26,27,28,29,30,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,47,48,49,50,51,53,54,55,57,58,59,61,62,64,65,67,68,70,72,73,75,77,79,81,82,85,87,89,91,93,95,98,100,102,105,107,109,112,114,116,119,121,123,126,128,130,133,135,137,139,141,143,145,147,149,151,153,154,156,158,160,162,163,165,167,169,170,172,174,175,177,179,180,182,183,185,186,188,189,191,192,193,194,196,197,198,199,200,202,203,204,205,206,206,207,208,209,210,211,211,212,213,214,214,215,216,216,217,218,218,219,220,220,221,222,222,223,224,224,225,226,226,227,227,228,228,229,230,230,231,231,232,232,233,233,234,234,235,235,236,236,237,237,238,238,239,239,240,240,240,241,241,242,242,243,243,244,244,245,245,246,246,247,247,248,248,249,249,250,250,250,251,251,252,252,253,253,254,254,255,255)
            },
            "Drawing life 1up": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(19,19,19,19,20,20,20,20,20,20,20,21,21,21,21,21,22,22,22,22,23,23,23,24,24,24,25,25,26,26,26,27,28,28,29,29,30,31,31,32,33,33,34,35,36,36,37,38,39,40,41,41,42,43,44,45,46,47,47,48,49,50,51,52,53,54,55,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,151,152,153,154,155,156,157,158,159,160,161,162,163,164,166,167,168,169,170,171,172,173,174,175,176,177,178,180,181,182,183,184,185,186,187,188,189,190,192,193,194,195,196,197,198,199,200,201,203,204,205,206,207,208,209,210,211,213,214,215,216,217,218,219,220,221,223,224,225,226,227,228,229,230,232,233,234,235,236,237,238,239,240,242,243,244,245,246,247,248,249,251,252,253,254),
                "g": Uint8ClampedArray.of(18,18,18,18,19,19,19,19,19,19,19,20,20,20,20,20,21,21,21,21,22,22,22,23,23,23,24,24,25,25,26,26,27,27,28,29,29,30,31,31,32,33,34,35,35,36,37,38,39,40,41,41,42,43,44,45,46,47,48,49,50,51,52,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,132,133,134,135,136,137,138,139,140,141,142,143,144,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,183,184,185,186,187,188,189,190,191,192,193,194,195,196,198,199,200,201,202,203,204,205,206,207,208,209,211,212,213,214,215,216,217,218,219,220,221,222,224,225,226,227,228,229,230,231,232,233,234,235,237,238,239,240,241,242,243,244,245,246,247,249,250,251,252,253,254),
                "b": Uint8ClampedArray.of(16,16,17,17,17,17,18,18,18,18,19,19,19,20,20,20,21,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,29,29,30,31,32,32,33,34,35,36,37,38,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99,100,101,102,103,105,106,107,108,109,110,111,112,113,114,115,116,118,119,120,121,122,123,124,125,126,127,128,129,131,132,133,134,135,136,137,138,139,140,141,143,144,145,146,147,148,149,150,151,152,153,154,155,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,247,248,249,250,251,252,253,254)
            },
            "Undeadify skin color": {
                "a": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 255),
                "r": Uint8ClampedArray.of(0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 9, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 20, 20, 21, 22, 22, 23, 24, 24, 25, 26, 26, 27, 28, 29, 30, 30, 31, 32, 33, 34, 35, 36, 37, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 49, 50, 52, 53, 54, 56, 57, 59, 60, 62, 63, 65, 66, 68, 70, 72, 74, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 98, 100, 102, 104, 106, 108, 111, 113, 115, 117, 120, 122, 124, 126, 128, 131, 133, 135, 137, 139, 141, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 169, 171, 173, 175, 176, 178, 180, 181, 183, 184, 185, 187, 188, 189, 190, 191, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 213, 214, 215, 216, 217, 218, 218, 219, 220, 221, 221, 222, 223, 224, 224, 225, 226, 226, 227, 228, 228, 229, 230, 230, 231, 231, 232, 233, 233, 234, 234, 235, 235, 236, 237, 237, 238, 238, 239, 239, 240, 240, 241, 241, 242, 242, 242, 243, 243, 244, 244, 245, 245, 246, 246, 246, 247, 247, 248, 248, 249, 249, 249, 250, 250, 251, 251, 251, 252, 252, 253, 253, 253, 254, 254, 255, 255),
                "g": Uint8ClampedArray.of(0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 6, 7, 7, 8, 8, 9, 10, 10, 11, 11, 12, 13, 13, 14, 14, 15, 16, 16, 17, 17, 18, 19, 19, 20, 21, 21, 22, 23, 23, 24, 25, 25, 26, 27, 28, 28, 29, 30, 31, 31, 32, 33, 34, 34, 35, 36, 37, 38, 39, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 65, 66, 67, 68, 70, 71, 72, 74, 75, 77, 78, 79, 81, 82, 84, 85, 87, 88, 90, 91, 93, 95, 96, 98, 99, 101, 103, 104, 106, 108, 109, 111, 112, 114, 116, 117, 119, 121, 122, 124, 126, 127, 129, 130, 132, 134, 135, 137, 138, 140, 142, 143, 145, 146, 148, 149, 151, 152, 154, 155, 156, 158, 159, 160, 162, 163, 164, 166, 167, 168, 169, 170, 171, 172, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 203, 204, 205, 206, 207, 208, 209, 210, 210, 211, 212, 213, 214, 215, 216, 216, 217, 218, 219, 220, 220, 221, 222, 223, 224, 224, 225, 226, 227, 228, 228, 229, 230, 231, 231, 232, 233, 234, 234, 235, 236, 237, 237, 238, 239, 240, 240, 241, 242, 243, 243, 244, 245, 245, 246, 247, 248, 248, 249, 250, 250, 251, 252, 253, 253, 254, 255),
                "b": Uint8ClampedArray.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255)
            },
            "Vitality pro alpha": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,3,3,3,4,4,5,5,6,6,7,7,8,8,9,10,10,11,12,13,14,15,16,16,18,19,20,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,45,46,47,49,50,51,53,54,55,57,58,59,61,62,63,65,66,68,69,70,72,73,75,76,77,79,80,82,83,84,86,87,89,90,92,93,95,96,98,99,100,102,103,105,106,108,109,111,112,114,115,117,118,120,122,123,125,126,128,129,131,132,134,135,137,138,140,142,143,145,146,148,149,151,153,154,156,157,159,160,162,164,165,167,168,170,172,173,175,176,178,180,181,183,185,186,188,189,191,193,194,196,197,199,201,202,204,206,207,209,211,212,214,215,217,219,220,222,224,225,227,229,230,232,234,235,237,239,240,242,243,245,247,248,250,252,253,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255),
                "g": Uint8ClampedArray.of(0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,11,11,12,12,13,14,14,15,15,16,17,17,18,19,19,20,21,22,22,23,24,25,26,27,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,54,55,56,57,58,59,61,62,63,64,65,67,68,69,70,71,73,74,75,76,78,79,80,81,82,84,85,86,87,89,90,91,93,94,95,96,98,99,100,101,103,104,105,107,108,109,110,112,113,114,116,117,118,120,121,122,123,125,126,127,129,130,131,133,134,135,136,138,139,140,142,143,144,146,147,148,149,151,152,153,155,156,157,158,160,161,162,164,165,166,167,169,170,171,173,174,175,176,178,179,180,181,183,184,185,186,188,189,190,191,192,194,195,196,197,198,200,201,202,203,204,206,207,208,209,210,211,213,214,215,216,217,218,219,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,235,236,237,238,239,239,240,241,241,242,243,243,244,244,245,245,246,246,247,247,248,248,249,249,250,250,251,251,251,252,252,253,253,253,254,254,255,255),
                "b": Uint8ClampedArray.of(20,21,22,23,23,24,25,26,27,28,28,29,30,31,32,33,33,34,35,36,37,38,39,39,40,41,42,43,44,44,45,46,47,48,49,50,50,51,52,53,54,55,55,56,57,58,59,60,60,61,62,63,64,65,66,66,67,68,69,70,71,71,72,73,74,75,76,76,77,78,79,80,81,82,82,83,84,85,86,87,87,88,89,90,91,92,93,93,94,95,96,97,98,98,99,100,101,102,103,103,104,105,106,107,108,109,109,110,111,112,113,114,114,115,116,117,118,119,119,120,121,122,123,124,125,125,126,127,128,129,130,130,131,132,133,134,135,136,136,137,138,139,140,141,141,142,143,144,145,146,146,147,148,149,150,151,152,152,153,154,155,156,157,157,158,159,160,161,162,162,163,164,165,166,167,168,168,169,170,171,172,173,173,174,175,176,177,178,179,179,180,181,182,183,184,184,185,186,187,188,189,189,190,191,192,193,194,195,195,196,197,198,199,200,200,201,202,203,204,205,205,206,207,208,209,210,211,211,212,213,214,215,216,216,217,218,219,220,221,222,222,223,224,225,226,227,227,228,229,230,231,232,232,233,234,235)
            },
            "Film": {
                "a": Uint8ClampedArray.of(0, 1, 1, 3, 3, 5, 6, 7, 8, 8, 10, 10, 12, 13, 14, 15, 15, 17, 18, 19, 20, 21, 22, 22, 24, 25, 26, 27, 28, 29, 29, 31, 32, 33, 34, 35, 36, 36, 38, 39, 40, 41, 42, 43, 43, 45, 45, 47, 48, 49, 50, 51, 52, 52, 54, 55, 56, 57, 58, 59, 59, 61, 61, 63, 64, 65, 66, 66, 68, 68, 70, 70, 72, 73, 73, 75, 75, 77, 77, 79, 80, 80, 82, 82, 84, 84, 86, 87, 87, 89, 89, 91, 91, 93, 93, 94, 96, 96, 98, 98, 100, 100, 102, 102, 103, 105, 105, 107, 107, 109, 109, 110, 112, 112, 114, 114, 116, 116, 117, 119, 119, 121, 121, 123, 123, 124, 125, 126, 128, 128, 130, 130, 131, 132, 133, 134, 135, 137, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 153, 153, 154, 155, 156, 157, 158, 160, 160, 161, 162, 163, 165, 165, 167, 167, 168, 169, 170, 172, 172, 174, 174, 175, 177, 177, 179, 180, 181, 182, 182, 184, 184, 186, 187, 188, 189, 189, 191, 192, 193, 194, 195, 196, 196, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 212, 214, 215, 216, 217, 218, 219, 219, 221, 221, 223, 224, 225, 226, 226, 228, 228, 230, 231, 232, 233, 233, 235, 235, 237, 237, 239, 240, 240, 242, 242, 244, 244, 246, 246, 247, 249, 249, 251, 251, 253, 253, 255),
                "r": Uint8ClampedArray.of(26, 25, 25, 25, 25, 25, 25, 25, 25, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 26, 26, 26, 26, 27, 27, 27, 27, 28, 28, 28, 29, 29, 30, 30, 30, 31, 31, 32, 32, 33, 33, 34, 35, 35, 36, 37, 37, 38, 39, 40, 41, 42, 42, 43, 44, 46, 47, 48, 49, 50, 51, 53, 54, 55, 57, 58, 60, 61, 62, 64, 65, 67, 68, 70, 71, 73, 74, 76, 77, 79, 80, 82, 83, 84, 86, 87, 89, 90, 92, 93, 95, 96, 98, 99, 101, 102, 104, 105, 107, 108, 110, 111, 113, 114, 116, 117, 119, 121, 122, 124, 125, 127, 128, 130, 131, 133, 134, 135, 137, 138, 140, 141, 143, 144, 146, 147, 149, 150, 152, 153, 155, 156, 158, 159, 160, 162, 163, 165, 166, 168, 169, 170, 172, 173, 175, 176, 177, 179, 180, 181, 182, 184, 185, 186, 188, 189, 190, 191, 193, 194, 195, 196, 197, 199, 200, 201, 202, 203, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 218, 219, 220, 221, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 233, 234, 235, 236, 237, 237, 238, 239, 240, 240, 241, 242, 242, 243, 244, 244, 245, 245, 246, 246, 247, 247, 248, 248, 248, 249, 249, 250, 250, 250, 251, 251, 251, 251, 252, 252, 252, 252, 253, 253, 253, 253, 254, 254, 254, 254, 255),
                "g": Uint8ClampedArray.of(49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 48, 48, 48, 48, 48, 48, 48, 48, 48, 47, 47, 47, 47, 47, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 47, 47, 47, 48, 48, 49, 49, 50, 50, 51, 52, 53, 54, 54, 55, 56, 57, 58, 60, 61, 62, 63, 64, 65, 67, 68, 69, 70, 72, 73, 74, 76, 77, 78, 80, 81, 82, 84, 85, 86, 88, 89, 90, 92, 93, 95, 96, 98, 99, 101, 102, 104, 105, 107, 108, 110, 112, 113, 115, 116, 118, 119, 121, 122, 124, 126, 127, 129, 130, 131, 133, 134, 136, 137, 139, 140, 142, 143, 145, 146, 148, 149, 151, 152, 154, 155, 157, 158, 159, 161, 162, 164, 165, 167, 168, 169, 171, 172, 173, 175, 176, 177, 179, 180, 181, 183, 184, 185, 187, 188, 189, 191, 192, 193, 194, 196, 197, 198, 199, 201, 202, 203, 204, 205, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 218, 219, 220, 221, 222, 223, 224, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 233, 234, 235, 236, 237, 237, 238, 239, 240, 240, 241, 242, 242, 243, 244, 244, 245, 245, 246, 246, 247, 247, 248, 248, 248, 249, 249, 250, 250, 250, 251, 251, 251, 251, 252, 252, 252, 252, 253, 253, 253, 253, 254, 254, 254, 254, 255),
                "b": Uint8ClampedArray.of(68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 69, 69, 69, 70, 70, 71, 71, 72, 73, 73, 74, 75, 76, 77, 78, 80, 81, 82, 83, 85, 86, 88, 89, 91, 92, 94, 95, 97, 99, 100, 102, 104, 105, 107, 109, 110, 112, 113, 115, 116, 118, 119, 121, 122, 124, 125, 127, 128, 130, 131, 133, 135, 136, 138, 139, 141, 142, 144, 145, 147, 148, 150, 151, 153, 154, 156, 157, 159, 160, 162, 163, 165, 166, 168, 169, 170, 172, 173, 175, 176, 177, 179, 180, 182, 183, 185, 186, 187, 189, 190, 191, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207, 208, 209, 211, 212, 213, 214, 215, 216, 217, 218, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 234, 235, 236, 237, 238, 239, 239, 240, 241, 242, 242, 243, 243, 244, 245, 245, 246, 246, 247, 247, 248, 248, 249, 249, 249, 250, 250, 250, 251, 251, 251, 252, 252, 252, 253, 253, 253, 253, 254, 254, 254, 255),
            },
            "Imperial": {
                "a": Uint8ClampedArray.of(0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 104, 105, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 120, 121, 122, 123, 124, 126, 127, 128, 129, 131, 132, 134, 135, 137, 138, 140, 142, 144, 146, 148, 149, 151, 153, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 189, 191, 193, 194, 196, 197, 198, 200, 201, 202, 203, 204, 205, 206, 206, 207, 208, 209, 210, 211, 212, 212, 213, 214, 215, 216, 216, 217, 218, 218, 219, 220, 221, 221, 222, 223, 223, 224, 225, 225, 226, 227, 227, 228, 228, 229, 230, 230, 231, 231, 232, 232, 233, 234, 234, 235, 235, 236, 236, 237, 237, 238, 238, 239, 239, 240, 240, 241, 241, 241, 242, 242, 243, 243, 244, 244, 245, 245, 245, 246, 246, 247, 247, 247, 248, 248, 249, 249, 249, 250, 250, 251, 251, 251, 252, 252, 253, 253, 253, 254, 254, 255),
                "r": Uint8ClampedArray.of(0, 0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 9, 10, 11, 11, 12, 12, 13, 14, 14, 15, 15, 16, 17, 17, 18, 18, 19, 20, 20, 21, 21, 22, 23, 23, 24, 25, 25, 26, 27, 27, 28, 29, 29, 30, 31, 31, 32, 33, 33, 34, 35, 35, 36, 37, 38, 38, 39, 40, 40, 41, 42, 43, 43, 44, 45, 46, 46, 47, 48, 49, 50, 50, 51, 52, 53, 54, 54, 55, 56, 57, 58, 59, 60, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 73, 74, 75, 76, 77, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 95, 97, 98, 100, 103, 105, 107, 109, 112, 115, 117, 120, 123, 125, 128, 131, 134, 137, 140, 142, 145, 148, 151, 153, 156, 158, 161, 163, 165, 167, 169, 171, 173, 174, 176, 177, 179, 180, 181, 182, 183, 184, 185, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 208, 209, 210, 211, 212, 213, 214, 214, 215, 216, 217, 218, 218, 219, 220, 221, 222, 222, 223, 224, 225, 225, 226, 227, 228, 228, 229, 230, 230, 231, 232, 232, 233, 234, 234, 235, 236, 236, 237, 238, 238, 239, 240, 240, 241, 242, 242, 243, 243, 244, 245, 245, 246, 247, 247, 248, 248, 249, 250, 250, 251, 251, 252, 253, 253, 254, 255),
                "g": Uint8ClampedArray.of(0, 1, 1, 3, 3, 5, 5, 7, 8, 8, 10, 10, 12, 12, 14, 15, 15, 17, 17, 19, 19, 21, 22, 22, 24, 24, 26, 26, 28, 28, 29, 31, 31, 33, 33, 35, 35, 36, 38, 38, 40, 40, 42, 42, 43, 45, 45, 47, 47, 49, 49, 51, 52, 52, 54, 54, 56, 56, 58, 59, 59, 61, 61, 63, 63, 65, 66, 66, 68, 68, 70, 70, 72, 73, 73, 75, 75, 77, 77, 79, 79, 80, 82, 82, 84, 84, 86, 86, 87, 89, 89, 91, 91, 93, 93, 94, 96, 96, 98, 98, 100, 100, 102, 103, 103, 105, 105, 107, 107, 109, 110, 110, 112, 112, 114, 114, 116, 117, 117, 119, 119, 121, 121, 123, 124, 124, 126, 126, 128, 128, 130, 130, 131, 133, 133, 135, 135, 137, 137, 138, 140, 140, 142, 142, 144, 144, 145, 147, 147, 149, 149, 151, 151, 153, 154, 154, 156, 156, 158, 158, 160, 161, 161, 163, 163, 165, 165, 167, 168, 168, 170, 170, 172, 172, 174, 175, 175, 177, 177, 179, 179, 181, 181, 182, 184, 184, 186, 186, 188, 188, 189, 191, 191, 193, 193, 195, 195, 196, 198, 198, 200, 200, 202, 202, 204, 205, 205, 207, 207, 209, 209, 211, 212, 212, 214, 214, 216, 216, 218, 219, 219, 221, 221, 223, 223, 225, 226, 226, 228, 228, 230, 230, 232, 232, 233, 235, 235, 237, 237, 239, 239, 240, 242, 242, 244, 244, 246, 246, 247, 249, 249, 251, 251, 253, 253, 255),
                "b": Uint8ClampedArray.of(0, 1, 1, 3, 3, 5, 5, 7, 8, 8, 10, 10, 12, 12, 14, 15, 15, 17, 17, 19, 19, 21, 22, 22, 24, 24, 26, 26, 28, 28, 29, 31, 31, 33, 33, 35, 35, 36, 38, 38, 40, 40, 42, 42, 43, 45, 45, 47, 47, 49, 49, 51, 52, 52, 54, 54, 56, 56, 58, 59, 59, 61, 61, 63, 63, 65, 66, 66, 68, 68, 70, 70, 72, 73, 73, 75, 75, 77, 77, 79, 79, 80, 82, 82, 84, 84, 86, 86, 87, 89, 89, 91, 91, 93, 93, 94, 96, 96, 98, 98, 100, 100, 102, 103, 103, 105, 105, 107, 107, 109, 110, 110, 112, 112, 114, 114, 116, 117, 117, 119, 119, 121, 121, 123, 124, 124, 126, 126, 128, 128, 130, 130, 131, 133, 133, 135, 135, 137, 137, 138, 140, 140, 142, 142, 144, 144, 145, 147, 147, 149, 149, 151, 151, 153, 154, 154, 156, 156, 158, 158, 160, 161, 161, 163, 163, 165, 165, 167, 168, 168, 170, 170, 172, 172, 174, 175, 175, 177, 177, 179, 179, 181, 181, 182, 184, 184, 186, 186, 188, 188, 189, 191, 191, 193, 193, 195, 195, 196, 198, 198, 200, 200, 202, 202, 204, 205, 205, 207, 207, 209, 209, 211, 212, 212, 214, 214, 216, 216, 218, 219, 219, 221, 221, 223, 223, 225, 226, 226, 228, 228, 230, 230, 232, 232, 233, 235, 235, 237, 237, 239, 239, 240, 242, 242, 244, 244, 246, 246, 247, 249, 249, 251, 251, 253, 253, 255),
            },
            "Inversion": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(255,254,253,252,251,250,249,248,247,246,245,244,243,242,241,240,239,238,237,236,235,234,233,232,231,230,229,228,227,226,225,224,223,222,221,220,219,218,217,216,215,214,213,212,211,210,209,208,207,206,205,204,203,202,201,200,199,198,197,196,195,194,193,192,191,190,189,188,187,186,185,184,183,182,181,180,179,178,177,176,175,174,173,172,171,170,169,168,167,166,165,164,163,162,161,160,159,158,157,156,155,154,153,152,151,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,134,133,132,131,130,129,128,127,126,125,124,123,122,121,120,119,118,117,116,115,114,113,112,111,110,109,108,107,106,105,104,103,102,101,100,99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0),
                "g": Uint8ClampedArray.of(255,254,253,252,251,250,249,248,247,246,245,244,243,242,241,240,239,238,237,236,235,234,233,232,231,230,229,228,227,226,225,224,223,222,221,220,219,218,217,216,215,214,213,212,211,210,209,208,207,206,205,204,203,202,201,200,199,198,197,196,195,194,193,192,191,190,189,188,187,186,185,184,183,182,181,180,179,178,177,176,175,174,173,172,171,170,169,168,167,166,165,164,163,162,161,160,159,158,157,156,155,154,153,152,151,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,134,133,132,131,130,129,128,127,126,125,124,123,122,121,120,119,118,117,116,115,114,113,112,111,110,109,108,107,106,105,104,103,102,101,100,99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0),
                "b": Uint8ClampedArray.of(255,254,253,252,251,250,249,248,247,246,245,244,243,242,241,240,239,238,237,236,235,234,233,232,231,230,229,228,227,226,225,224,223,222,221,220,219,218,217,216,215,214,213,212,211,210,209,208,207,206,205,204,203,202,201,200,199,198,197,196,195,194,193,192,191,190,189,188,187,186,185,184,183,182,181,180,179,178,177,176,175,174,173,172,171,170,169,168,167,166,165,164,163,162,161,160,159,158,157,156,155,154,153,152,151,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,134,133,132,131,130,129,128,127,126,125,124,123,122,121,120,119,118,117,116,115,114,113,112,111,110,109,108,107,106,105,104,103,102,101,100,99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0),
            },
            "Ancient warmth": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(0,1,3,4,5,6,8,9,10,12,13,14,15,17,18,19,21,22,23,24,26,27,28,29,31,32,33,35,36,37,38,40,41,42,43,45,46,47,48,50,51,52,53,55,56,57,58,60,61,62,63,64,66,67,68,69,70,72,73,74,75,76,78,79,80,81,82,84,85,86,87,88,89,90,92,93,94,95,96,97,98,99,101,102,103,104,105,106,107,108,109,110,111,112,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,146,147,148,149,150,151,152,153,154,155,156,157,158,159,159,160,161,162,163,164,165,166,167,168,169,169,170,171,172,173,174,175,176,177,177,178,179,180,181,182,183,183,184,185,186,187,188,189,190,190,191,192,193,194,195,196,196,197,198,199,200,201,201,202,203,204,205,206,206,207,208,209,210,211,211,212,213,214,215,216,216,217,218,219,220,221,221,222,223,224,225,225,226,227,228,229,229,230,231,232,233,234,234,235,236,237,238,238,239,240,241,242,242,243,244,245,246,246,247,248,249,250,250,251,252,253,254,255,255),
                "g": Uint8ClampedArray.of(0,1,2,4,5,6,7,8,10,11,12,13,14,16,17,18,19,20,22,23,24,25,26,28,29,30,31,32,34,35,36,37,38,39,41,42,43,44,45,46,48,49,50,51,52,53,55,56,57,58,59,60,61,63,64,65,66,67,68,69,71,72,73,74,75,76,77,78,79,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,164,165,166,167,168,169,170,171,172,173,174,175,176,176,177,178,179,180,181,182,183,184,185,186,187,187,188,189,190,191,192,193,194,195,196,196,197,198,199,200,201,202,203,204,205,205,206,207,208,209,210,211,212,213,213,214,215,216,217,218,219,220,221,221,222,223,224,225,226,227,228,229,229,230,231,232,233,234,235,236,237,237,238,239,240,241,242,243,244,244,245,246,247,248,249,250,251,252,252,253,254,255),
                "b": Uint8ClampedArray.of(0,1,2,2,3,4,5,5,6,7,8,8,9,10,11,11,12,13,14,14,15,16,17,17,18,19,20,20,21,22,23,23,24,25,26,27,27,28,29,30,30,31,32,33,34,34,35,36,37,37,38,39,40,41,41,42,43,44,45,45,46,47,48,49,49,50,51,52,53,53,54,55,56,57,58,58,59,60,61,62,63,63,64,65,66,67,68,69,69,70,71,72,73,74,75,76,76,77,78,79,80,81,82,83,84,85,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,100,101,102,103,104,105,106,107,108,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,131,132,133,134,135,136,137,138,139,140,141,143,144,145,146,147,148,149,150,152,153,154,155,156,157,158,160,161,162,163,164,165,167,168,169,170,171,173,174,175,176,177,179,180,181,182,183,185,186,187,188,189,191,192,193,194,195,197,198,199,200,202,203,204,205,207,208,209,210,212,213,214,215,216,218,219,220,221,223,224,225,227,228,229,230,232,233,234,235,237,238,239,240,242,243,244,245,247,248,249,250,252,253,254,255)
            },
            "Beam gradient": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,5,5,5,5,6,6,7,7,7,8,8,9,10,10,11,11,12,13,13,14,15,16,16,17,18,19,20,21,22,22,23,24,25,26,27,28,29,30,31,32,33,34,36,37,38,39,40,41,42,43,44,46,47,48,49,50,52,53,54,55,57,58,59,61,62,63,65,66,67,69,70,71,73,74,75,77,78,80,81,82,84,85,87,88,89,91,92,94,95,97,98,99,101,102,104,105,107,108,110,111,113,114,116,117,119,120,122,123,124,126,127,129,130,132,133,135,136,138,139,141,142,144,145,147,148,150,151,153,154,156,157,159,160,162,163,165,166,168,169,170,172,173,175,176,177,179,180,181,183,184,186,187,188,190,191,192,194,195,196,198,199,200,201,203,204,205,206,208,209,210,211,212,213,214,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,234,235,236,237,238,239,239,240,241,242,242,243,244,244,245,245,246,247,247,248,248,248,249,249,250,250,250,251,251,251,252,252,252,252,253,253,253,253,254,254,254,254,254,255,255,255),
                "g": Uint8ClampedArray.of(1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,5,5,5,6,6,6,7,7,8,8,8,9,10,10,11,11,12,13,13,14,15,16,16,17,18,19,20,21,21,22,23,24,25,26,27,28,29,30,31,32,33,34,36,37,38,39,40,41,42,43,44,46,47,48,49,50,52,53,54,55,57,58,59,61,62,63,65,66,67,69,70,71,73,74,75,77,78,79,81,82,84,85,86,88,89,91,92,94,95,96,98,99,101,102,104,105,107,108,110,111,113,114,116,117,119,120,122,123,125,126,127,129,130,132,133,135,136,138,139,141,142,144,145,147,148,150,151,153,154,156,157,159,160,162,163,165,166,168,169,170,172,173,175,176,177,179,180,181,183,184,185,187,188,189,191,192,193,195,196,197,199,200,201,202,204,205,206,207,208,210,211,212,213,214,215,216,217,218,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,234,235,236,237,238,239,239,240,241,242,242,243,244,244,245,246,246,247,247,248,248,249,249,249,250,250,250,251,251,251,252,252,252,252,253,253,253,253,254,254,254,254,254,255,255,255),
                "b": Uint8ClampedArray.of(1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,6,6,6,7,7,7,8,8,9,9,10,11,11,12,12,13,14,15,15,16,17,18,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,51,52,53,54,56,57,58,60,61,62,64,65,66,68,69,70,72,73,74,76,77,78,80,81,83,84,85,87,88,89,91,92,94,95,97,98,100,101,102,104,105,107,108,110,111,113,114,116,117,119,120,121,123,124,126,127,129,130,132,133,135,136,138,139,141,142,144,145,147,148,150,151,153,154,156,157,159,160,162,163,164,166,167,169,170,172,173,174,176,177,179,180,181,183,184,185,187,188,189,191,192,193,195,196,197,199,200,201,202,204,205,206,207,209,210,211,212,213,214,215,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,234,235,236,237,238,239,239,240,241,242,242,243,244,244,245,245,246,246,247,247,248,248,249,249,250,250,250,251,251,251,252,252,252,252,253,253,253,253,254,254,254,254,254,255,255,255)
            },
            "Bright tea party": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(0,1,3,4,5,7,8,9,11,12,13,15,16,17,19,20,21,22,24,25,26,28,29,30,31,33,34,35,37,38,39,40,41,43,44,45,46,48,49,50,51,52,53,55,56,57,58,59,60,61,62,63,65,66,67,68,69,70,71,72,72,73,74,74,75,76,76,77,77,78,78,79,79,80,80,81,81,82,82,83,83,84,85,85,86,87,88,89,90,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,255),
                "g": Uint8ClampedArray.of(0,1,2,2,3,4,5,6,7,7,8,9,10,11,12,12,13,14,15,16,17,17,18,19,20,21,22,23,23,24,25,26,27,28,29,30,30,31,32,33,34,35,36,37,38,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,70,71,72,73,74,75,77,78,79,80,82,83,84,85,87,88,89,90,92,93,94,96,97,98,100,101,103,104,105,107,108,109,111,112,114,116,117,119,121,122,124,126,127,129,131,132,134,136,138,139,141,143,145,146,148,150,151,153,155,156,158,159,161,162,164,165,167,168,169,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,189,190,191,192,193,194,195,196,196,197,198,199,200,201,201,202,203,204,205,205,206,207,208,209,209,210,211,212,213,213,214,215,216,216,217,218,218,219,220,221,221,222,223,224,224,225,226,226,227,228,228,229,230,230,231,232,232,233,234,234,235,236,236,237,238,238,239,240,240,241,242,242,243,244,244,245,246,246,247,248,248,249,249,250,251,251,252,253,253,254,255,255),
                "b": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255)
            },
            "Bronze": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(1,2,2,3,3,4,4,5,5,6,6,7,8,8,9,9,10,10,11,12,12,13,14,14,15,16,16,17,18,18,19,20,21,22,22,23,24,25,26,27,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,59,60,61,62,63,64,66,67,68,69,70,71,73,74,75,76,77,79,80,81,82,83,85,86,87,88,89,91,92,93,94,95,97,98,99,100,101,103,104,105,106,108,109,110,111,112,114,115,116,117,119,120,121,122,124,125,126,127,129,130,131,132,134,135,136,138,139,140,142,143,145,146,147,149,150,151,152,154,155,156,157,159,160,161,162,163,164,165,166,167,168,169,170,170,171,172,173,174,174,175,176,177,177,178,179,179,180,180,181,181,182,182,183,183,184,184,185,185,185,186,186,186,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186),
                "g": Uint8ClampedArray.of(1,2,2,3,3,4,4,5,5,6,6,7,8,8,9,9,10,10,11,12,12,13,14,14,15,16,16,17,18,18,19,20,21,22,22,23,24,25,26,27,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,59,60,61,62,63,64,66,67,68,69,70,71,73,74,75,76,77,79,80,81,82,83,85,86,87,88,89,91,92,93,94,95,97,98,99,100,101,103,104,105,106,108,109,110,111,112,114,115,116,117,119,120,121,122,124,125,126,127,128,130,131,132,133,135,136,137,139,140,141,142,144,145,146,147,149,150,151,153,154,155,156,157,159,160,161,162,164,165,166,167,168,170,171,172,173,174,175,177,178,179,180,181,182,183,185,186,187,188,189,190,191,192,193,195,196,197,198,199,200,201,202,203,204,205,206,207,209,210,211,212,213,214,215,216,217,218,220,221,222,223,224,225,226,226,227,228,229,230,230,231,232,232,233,234,234,234,235,235,235,236,236,236,236,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,236,236,236,236,236),
                "b": Uint8ClampedArray.of(115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,114,114,114,114,114,114,114,114,114,114,114,114,114,114,114,114,115,115,115,115,115,115,115,116,116,116,116,116,116,117,117,117,117,117,118,118,118,119,119,119,120,120,120,121,121,122,123,123,124,124,125,126,127,128,129,130,131,132,133,134,135,136,138,139,140,142,143,144,146,147,149,150,151,153,154,156,157,158,160,161,162,164,165,166,167,168,170,171,172,173,174,175,177,178,179,180,181,182,183,185,186,187,188,189,190,191,192,193,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,230,231,232,233,234,235,235,236,237,238,238,239,240,241,241,242,243,243,244,245,246,246,247,247,248,249,249,250,251,251,252,253,253,254,254,255)
            },
            "Classic HDR": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(14,14,14,13,13,13,13,13,13,13,12,12,12,12,12,12,12,12,13,13,13,13,13,14,14,14,15,15,16,17,17,18,19,20,21,22,23,24,25,26,28,29,30,32,33,35,36,38,39,41,42,44,46,47,49,50,52,53,55,56,58,59,61,62,63,65,66,67,69,70,71,73,74,75,77,78,79,81,82,83,85,86,87,89,90,91,93,94,95,96,98,99,100,102,103,104,105,106,108,109,110,111,113,114,115,116,117,118,120,121,122,123,124,125,127,128,129,130,131,132,133,134,136,137,138,139,140,141,142,143,144,145,146,147,148,149,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,166,167,168,169,170,171,172,173,174,175,176,177,177,178,179,180,181,182,183,183,184,185,186,187,187,188,189,190,191,191,192,193,194,194,195,196,197,197,198,199,200,200,201,202,203,203,204,205,206,206,207,208,208,209,210,210,211,212,212,213,214,214,215,216,216,217,218,218,219,220,220,221,222,222,223,224,224,225,226,226,227,228,228,229,230,230,231,232,232,233,234,234,235,236,236,237,237,238,239,239,240,241,241,242),
                "g": Uint8ClampedArray.of(2,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3,3,4,5,5,6,7,8,9,10,11,12,13,15,16,18,19,21,22,24,25,27,29,30,32,34,35,37,39,40,42,44,45,47,48,50,52,53,54,56,57,59,60,62,63,65,66,68,69,71,72,74,75,77,78,79,81,82,84,85,87,88,89,91,92,94,95,96,98,99,100,102,103,104,106,107,108,109,111,112,113,114,115,117,118,119,120,122,123,124,125,126,127,129,130,131,132,133,134,136,137,138,139,140,142,143,144,145,146,147,149,150,151,152,153,154,155,157,158,159,160,161,162,163,164,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,186,187,188,189,190,191,192,193,194,194,195,196,197,198,199,200,200,201,202,203,204,205,206,206,207,208,209,210,211,211,212,213,214,215,215,216,217,218,219,219,220,221,222,223,223,224,225,226,227,227,228,229,230,231,231,232,233,234,235,235,236,237,238,238,239,240,241,242,242,243,244,245,245,246,247,248,249,249,250,251,252,252,253,254),
                "b": Uint8ClampedArray.of(66,66,66,67,67,67,67,67,68,68,68,68,69,69,69,69,70,70,70,71,71,71,71,72,72,73,73,73,74,74,75,75,75,76,76,77,78,78,79,79,80,80,81,82,82,83,84,84,85,86,86,87,88,88,89,90,90,91,92,92,93,94,94,95,96,96,97,98,98,99,99,100,101,101,102,103,103,104,104,105,106,106,107,108,108,109,110,110,111,111,112,113,113,114,114,115,116,116,117,117,118,118,119,120,120,121,121,122,122,123,124,124,125,125,126,126,127,127,128,129,129,130,130,131,131,132,132,133,134,134,135,135,136,136,137,138,138,139,139,140,140,141,142,142,143,143,144,144,145,146,146,147,147,148,148,149,149,150,150,151,152,152,153,153,154,154,155,155,156,156,157,157,158,158,159,159,160,160,161,161,162,162,163,163,164,164,165,165,166,166,167,167,168,168,169,169,170,170,171,171,172,172,173,173,174,174,175,175,176,176,177,177,178,178,179,179,180,180,181,181,182,182,183,183,183,184,184,185,185,186,186,187,187,188,188,189,189,190,190,191,191,192,192,192,193,193,194,194,195,195,196,196,197,197,198,198)
            },
            "Gothic style": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,14,14,15,15,16,17,18,18,19,20,21,21,22,23,24,25,26,26,27,28,29,30,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,49,50,51,52,53,55,56,57,59,60,61,63,64,66,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,99,100,102,103,105,106,108,110,111,113,114,116,118,119,121,123,124,126,128,129,131,133,134,136,138,139,141,143,144,146,147,149,151,152,154,156,157,159,160,162,164,165,167,169,170,172,174,175,177,179,180,182,183,185,187,188,190,191,193,194,196,197,199,200,201,203,204,206,207,208,210,211,212,214,215,216,217,219,220,221,222,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,240,241,242,243,243,244,245,245,246,246,247,247,248,248,249,249,250,250,251,251,252,252,252,253,253,254,254,254,255,255),
                "g": Uint8ClampedArray.of(1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,6,6,6,7,7,8,8,9,9,10,11,11,12,13,14,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,38,39,40,41,42,43,44,46,47,48,49,50,51,53,54,55,56,58,59,60,61,63,64,65,66,68,69,70,72,73,74,76,77,78,80,81,82,84,85,87,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122,124,125,127,128,129,131,132,134,135,137,138,140,141,143,144,146,147,148,150,151,153,154,156,157,159,160,161,163,164,166,167,168,170,171,173,174,175,177,178,179,181,182,184,185,186,188,189,190,192,193,194,196,197,198,200,201,202,203,205,206,207,208,209,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,233,234,235,236,237,237,238,239,240,240,241,242,242,243,244,244,245,245,246,246,247,247,248,248,249,249,249,250,250,251,251,251,251,252,252,252,253,253,253,253,254,254,254,254,255,255),
                "b": Uint8ClampedArray.of(1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,4,4,4,5,5,5,6,6,6,7,7,8,8,8,9,9,10,10,11,11,12,13,13,14,14,15,16,16,17,18,18,19,20,21,22,22,23,24,25,26,27,27,28,29,30,31,32,33,34,35,36,37,38,40,41,42,43,44,45,46,48,49,50,51,53,54,55,57,58,59,61,62,64,65,66,68,69,71,72,74,75,77,78,80,81,83,84,86,87,89,91,92,94,95,97,98,100,102,103,105,107,108,110,112,113,115,117,118,120,122,123,125,127,128,130,132,134,135,137,139,140,142,144,145,147,149,151,152,154,156,157,159,161,163,165,166,168,170,171,173,175,177,178,180,182,183,185,187,188,190,191,193,195,196,197,199,200,202,203,205,206,208,209,211,212,213,215,216,217,219,220,221,223,224,225,226,228,229,230,231,232,233,234,235,236,237,238,239,240,240,241,242,243,243,244,245,245,246,247,247,248,248,249,249,250,250,251,251,251,252,252,253,253,253,254,254,255,255)
            },
            "Old photo": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(8,8,9,9,9,10,10,11,11,12,12,13,13,13,14,14,15,15,16,16,17,18,18,19,19,20,21,21,22,23,23,24,25,26,26,27,28,29,29,30,31,32,33,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,50,51,52,54,55,56,58,59,61,62,64,66,67,69,71,72,74,76,78,80,82,84,85,87,89,91,93,95,97,99,101,103,106,108,110,112,114,116,118,121,123,125,128,130,133,135,138,141,143,146,149,151,154,156,159,162,164,167,169,172,174,176,178,180,183,185,186,188,190,191,193,194,196,197,198,199,201,202,203,204,205,205,206,207,208,208,209,210,211,211,212,212,213,214,214,215,215,216,217,217,218,219,219,220,220,221,221,222,222,223,223,224,224,225,225,226,226,226,227,227,228,228,228,229,229,229,230,230,230,231,231,232,232,232,233,233,233,234,234,234,235,235,235,236,236,236,237,237,237,238,238,238,239,239,239,239,240,240,240,241,241,241,241,242,242,242,242,243,243,243,243,244,244,244,244,245,245,245,245,245,246,246,246,246,246,247,247,247,247,247,248,248,248,248,248,249,249),
                "g": Uint8ClampedArray.of(28,29,29,29,30,30,31,31,31,32,32,33,33,33,34,34,35,35,36,36,37,37,38,39,39,40,40,41,42,42,43,44,45,46,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,75,76,77,78,79,80,82,83,84,85,87,88,89,91,92,93,94,96,97,98,100,101,102,104,105,106,108,109,110,112,113,114,116,117,118,119,121,122,123,124,126,127,128,129,131,132,133,134,136,137,138,139,141,142,143,144,145,147,148,149,150,151,152,154,155,156,157,158,159,160,161,162,163,164,165,167,168,169,170,171,172,173,174,175,176,177,178,178,179,180,181,182,183,184,185,185,186,187,188,189,189,190,191,191,192,193,193,194,194,195,196,196,197,197,198,198,199,199,200,200,201,201,202,202,203,203,204,204,205,205,206,206,207,208,208,209,209,210,211,211,212,212,213,214,214,215,215,216,216,217,217,218,219,219,220,220,221,221,221,222,222,223,223,223,224,224,224,224,225,225,225,225,226,226,226,226,226,226,226,227,227,227,227,227,227,227,227,227,227,227,227,228,228,228,228),
                "b": Uint8ClampedArray.of(28,29,29,29,30,30,31,31,31,32,32,33,33,33,34,34,35,35,36,36,37,37,38,39,39,40,40,41,42,42,43,44,45,46,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,75,76,77,78,79,80,82,83,84,85,87,88,89,91,92,93,94,96,97,98,100,101,102,104,105,106,108,109,110,112,113,114,116,117,118,119,121,122,123,124,126,127,128,129,131,132,133,134,136,137,138,139,141,142,143,144,145,147,148,149,150,151,152,154,155,156,157,158,159,160,161,162,163,164,165,167,168,169,170,171,172,173,174,175,176,177,178,178,179,180,181,182,183,184,185,185,186,187,188,189,189,190,191,191,192,193,193,194,194,195,196,196,197,197,198,198,199,199,200,200,201,201,202,202,203,203,204,204,205,205,206,206,207,208,208,209,209,210,211,211,212,212,213,214,214,215,215,216,216,217,217,218,219,219,220,220,221,221,221,222,222,223,223,223,224,224,224,224,225,225,225,225,226,226,226,226,226,226,226,227,227,227,227,227,227,227,227,227,227,227,227,228,228,228,228)
            },
            "Pink/blue gradient": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(0,0,0,1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,4,4,4,5,5,6,6,6,7,8,8,9,9,10,11,11,12,13,14,14,15,16,17,18,19,20,21,22,23,24,25,26,27,29,30,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,59,60,61,62,63,64,65,66,67,68,70,71,72,73,74,75,76,77,78,80,81,82,83,84,85,86,87,88,90,91,92,93,94,95,96,97,99,100,101,102,103,104,106,107,108,109,111,112,113,114,115,117,118,119,121,122,123,125,126,127,129,130,131,133,134,135,137,138,140,141,142,144,145,146,148,149,151,152,153,155,156,158,159,160,162,163,165,166,168,169,170,172,173,175,176,178,179,181,182,184,185,186,188,189,191,192,193,195,196,198,199,200,202,203,204,206,207,208,209,211,212,213,215,216,217,219,220,221,222,224,225,226,227,228,230,231,232,233,234,235,236,237,238,239,240,240,241,242,243,243,244,245,245,246,246,247,248,248,249,249,249,250,250,251,251,251,252,252,252,253,253,253,254,254,254,255,255),
                "g": Uint8ClampedArray.of(0,1,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,5,6,6,7,7,7,8,8,9,10,10,11,11,12,13,13,14,15,16,17,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,54,55,56,57,58,59,60,61,62,63,65,66,67,68,69,70,72,73,74,75,77,78,79,80,82,83,84,86,87,89,90,91,93,94,96,97,99,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122,123,125,126,128,129,131,132,134,135,137,138,140,141,143,144,146,147,149,151,152,154,155,156,158,159,161,162,164,165,167,168,169,171,172,174,175,176,178,179,181,182,183,185,186,187,189,190,191,193,194,195,197,198,199,200,202,203,204,205,207,208,209,210,211,212,214,215,216,217,218,219,220,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,240,241,242,243,243,244,245,245,246,246,247,247,248,248,249,249,250,250,250,251,251,251,252,252,252,253,253,253,253,254,254,254,254,254,255,255,255),
                "b": Uint8ClampedArray.of(66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,65,65,65,65,65,65,65,65,65,65,65,66,66,66,66,66,66,67,67,67,68,68,68,69,69,70,70,71,71,71,72,72,73,74,74,75,75,76,77,77,78,78,79,80,81,81,82,83,83,84,85,86,87,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,123,124,125,126,127,128,129,130,131,132,133,135,136,137,138,139,140,142,143,144,145,146,148,149,150,152,153,154,156,157,159,160,162,163,165,166,168,169,171,172,174,175,177,178,180,182,183,185,186,188,189,191,192,194,195,197,198,199,201,202,204,205,207,208,209,211,212,214,215,217,218,219,221,222,223,225,226,227,229,230,231,232,233,235,236,237,238,239,240,240,241,242,243,244,244,245,246,246,247,247,248,248,249,249,250,250,251,251,251,252,252,252,253,253,253,254,254,254,254,255,255)
            },
            "Retro": {
                "a": Uint8ClampedArray.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255),
                "r": Uint8ClampedArray.of(3,3,3,4,4,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,8,8,8,9,9,10,10,11,11,12,12,13,13,14,15,15,16,17,18,19,19,20,21,22,23,24,25,26,26,27,28,29,30,31,32,33,34,35,37,38,39,40,41,42,43,44,45,46,47,48,50,51,52,53,54,55,57,58,59,60,62,63,64,65,67,68,69,70,72,73,74,76,77,78,80,81,82,83,85,86,88,89,90,92,93,94,96,97,99,100,101,103,104,106,107,109,110,111,113,114,116,117,119,120,121,123,124,126,127,129,130,131,133,134,136,137,139,140,142,143,144,146,147,149,150,152,153,154,156,157,159,160,162,163,164,166,167,168,170,171,172,174,175,177,178,179,181,182,183,185,186,187,189,190,191,192,194,195,196,198,199,200,201,202,204,205,206,207,208,209,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,229,230,231,232,233,234,235,235,236,237,238,238,239,240,240,241,241,242,243,243,244,244,245,245,245,246,246,247,247,247,248,248,248,249,249,249,250,250,250,250,251,251,251,251,252,252,252),
                "g": Uint8ClampedArray.of(11,11,12,12,12,12,12,13,13,13,13,13,14,14,14,14,15,15,15,16,16,16,17,17,17,18,18,19,19,20,20,21,21,22,22,23,24,24,25,26,26,27,28,29,29,30,31,32,33,33,34,35,36,37,38,39,40,40,41,42,43,44,45,46,47,48,49,50,51,52,53,55,56,57,58,59,60,61,63,64,65,66,67,69,70,71,72,74,75,76,77,79,80,81,82,83,85,86,87,89,90,91,92,94,95,96,98,99,100,102,103,104,106,107,108,110,111,112,114,115,117,118,119,121,122,123,125,126,127,129,130,131,133,134,135,137,138,139,141,142,143,145,146,147,149,150,151,152,154,155,156,158,159,160,162,163,164,165,167,168,169,171,172,173,174,176,177,178,180,181,182,183,185,186,187,188,190,191,192,193,195,196,197,198,199,200,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,219,220,221,222,223,224,224,225,226,227,228,228,229,230,230,231,232,232,233,233,234,235,235,236,236,237,237,237,238,238,239,239,239,240,240,240,240,241,241,241,242,242,242,242,242,243,243,243,243,243,244,244),
                "b": Uint8ClampedArray.of(63,63,63,63,64,64,64,64,64,64,64,64,64,65,65,65,65,65,65,66,66,66,66,66,67,67,67,67,68,68,68,68,69,69,69,70,70,71,71,71,72,72,73,73,73,74,74,75,75,76,76,77,77,78,78,79,79,80,80,81,81,82,82,83,83,84,85,85,86,86,87,88,88,89,89,90,91,91,92,93,93,94,95,95,96,97,97,98,99,99,100,101,101,102,103,103,104,105,105,106,107,108,108,109,110,110,111,112,113,113,114,115,116,116,117,118,119,119,120,121,122,122,123,124,125,125,126,127,128,128,129,130,131,131,132,133,134,134,135,136,136,137,138,139,139,140,141,142,142,143,144,144,145,146,147,147,148,149,149,150,151,152,152,153,154,154,155,156,157,157,158,159,160,160,161,162,162,163,164,165,165,166,167,167,168,169,169,170,170,171,172,172,173,173,174,174,175,175,176,177,177,178,178,179,179,179,180,180,181,181,182,182,183,183,183,184,184,185,185,185,186,186,186,187,187,187,187,188,188,188,188,189,189,189,189,189,190,190,190,190,190,190,190,191,191,191,191,191,191,191,191,191,192,192,192,192)
            }
        };
    };

    get_filter_names = () => {

        return Object.keys(this._get_filters()).concat(Array.of("Greyscale", "Sepia"));
    };

    _dutone_pixels = (contrast, color_a, color_b, pxls, pxl_colors) => {

        pxls =  new Uint16Array(pxls.buffer);
        pxl_colors = new Uint32Array(pxl_colors.buffer);

        pxl_colors = pxl_colors.map((pxl_color) => {

            const l = this.color_conversion.to_hsla_from_rgba(this.color_conversion.to_rgba_from_uint32(pxl_color))[2];
            return this.color_conversion.blend_colors(color_a, color_b, (l/100) / contrast, false, false);

        });

        return this.color_conversion.clean_duplicate_colors(pxls, Uint32Array.from(pxl_colors));
    };

    _filter_pixels = (name, intensity, pxl_colors) => {

        intensity = parseFloat(intensity);

        const colors_length = pxl_colors.length | 0;
        const rgba_colors_length = colors_length * 4 | 0;

        let old_pxl_colors_rgba = new Uint8Array(Uint32Array.from(pxl_colors).reverse().buffer).reverse();
        let pxl_colors_rgba = new Uint8Array(rgba_colors_length);
        let rgba = new Uint8ClampedArray(4);

        function CLAMP_INT( x, min, max ) {

            x = x|0; min = min|0; max = max|0;
            x = (x - ((x - max) & ((max - x) >> 31))) | 0;
            return (x - ((x - min) & ((x - min) >> 31))) | 0;
        }

        if(name.toLowerCase() === "greyscale") {

            let average = 0;
            for(let i4 = 0; (i4|0) < (rgba_colors_length|0); i4 = (i4 + 4 | 0) >>> 0) {

                rgba.set(old_pxl_colors_rgba.subarray(i4, i4+4|0), 0);
                average = (rgba.subarray(0, 3).reduce(function(base, n){n = n|0; return (base + n) | 0}, 0) / 3) | 0;
                rgba.fill(average, 0, 3);
                pxl_colors_rgba.set(rgba, i4)
            }

        }else if(name.toLowerCase() === "sepia"){

            let rgba = new Uint8ClampedArray(4);
            for(let i4 = 0; (i4|0) < (rgba_colors_length|0); i4 = (i4 + 4 | 0) >>> 0) {

                rgba.set(old_pxl_colors_rgba.subarray(i4, i4+4|0), 0);
                pxl_colors_rgba[i4|0] = CLAMP_INT(((rgba[0] * .393) + (rgba[1]  *.769) + (rgba[2] * .189))|0, 0, 255) & 0xFF;
                pxl_colors_rgba[(i4+1)|0] = CLAMP_INT(((rgba[0]  * .349) + (rgba[1] *.686) + (rgba[2] * .168))|0, 0, 255) & 0xFF;
                pxl_colors_rgba[(i4+2)|0] = CLAMP_INT(((rgba[0]  * .272) + (rgba[1] *.534) + (rgba[2] * .131))|0, 0, 255) & 0xFF;
                pxl_colors_rgba[(i4+3)|0] = rgba[3] & 0xFF;
            }
        }else {

            const filters = this._get_filters();
            const filter = filters[name] || filters["1997"];

            for(let i4 = 0; (i4|0) < (rgba_colors_length|0); i4 = (i4 + 4 | 0) >>> 0) {

                rgba.set(old_pxl_colors_rgba.subarray(i4, i4+4|0), 0);

                pxl_colors_rgba[i4|0] = filter["a"][filter["r"][rgba[0]]] & 0xFF;
                pxl_colors_rgba[(i4+1)|0] = filter["a"][filter["g"][rgba[1]]] & 0xFF;
                pxl_colors_rgba[(i4+2)|0] = filter["a"][filter["b"][rgba[2]]] & 0xFF;
                pxl_colors_rgba[(i4+3)|0] = rgba[3] & 0xFF;
            }
        }

        pxl_colors = new Uint32Array(
                this.color_conversion.blend_rgba_colors(
                    Array.of(old_pxl_colors_rgba, pxl_colors_rgba),
                    intensity,
                    0,
                    0
                ).reverse().buffer
        ).reverse();

        return pxl_colors;
    };

    _to_dutone = (contrast = 0.8, color_a = "#ffffffff", color_b = "#000000ff") => {

        const { _s_pxls, _s_pxl_colors, _layer_index } = this.super_state.get_state();

        [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = this._dutone_pixels(contrast, color_a, color_b, _s_pxls[_layer_index], _s_pxl_colors[_layer_index]);

        this.super_state.set_state({_s_pxls, _s_pxl_colors, _pxls_hovered: -1, _last_action_timestamp: Date.now()}).then(this.super_master_meta.update_canvas);

    };

    _to_filter = (name, intensity) => {

        const { _s_pxl_colors, _layer_index } = this.super_state.get_state();

        _s_pxl_colors[_layer_index] = this._filter_pixels(name, intensity, _s_pxl_colors[_layer_index]);

        this.super_state.set_state({_s_pxl_colors, _pxls_hovered: -1, _last_action_timestamp: Date.now() }).then(this.super_master_meta.update_canvas);

    }

    _to_rotation = (right = true) => {

        const {_imported_image_pxls, _imported_image_width, _imported_image_height, pxl_width, pxl_height, _s_pxls, _pxl_indexes_of_selection, _select_shape_index_a, _shape_index_a, _base64_original_images, _original_image_index, _layer_index } = this.super_state.get_state();

        const new_imported_image_width = _imported_image_height;
        const new_imported_image_height = _imported_image_width;
        let n_imported_image_pxls =  new Uint16Array(new_imported_image_width * new_imported_image_height);

        const new_pxl_width = pxl_height;
        const new_pxl_height = pxl_width;
        let ns_pxls = Array.from(_s_pxls);

        let new_pxl_indexes_of_selection = new Set();
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

                        this.super_canvas.set_dimensions(new_pxl_width, new_pxl_height).then(() =>  {
                            this.super_master_meta.update_canvas(true);
                        });
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

                    this.super_canvas.set_dimensions(new_pxl_width, new_pxl_height).then(() =>  {
                        this.super_master_meta.update_canvas(true);
                    });
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

        pxl_colors.forEach((pxl_color, index) => {

            if(pxls.includes(index)) {

                const [r, g, b, a] = this.color_conversion.to_rgba_from_uint32(pxl_color);
                const greyscale = (r + g + b) / 3 * (a / 255);

                if(a > 0) {

                    if(greyscale > max_grey) {

                        max_grey = greyscale;
                    }
                    if(greyscale < min_grey) {

                        min_grey = greyscale;
                    }
                }
            }
        });

        const alpha = 255 / Math.max(1, max_grey - min_grey);
        const beta = -min_grey * alpha;

        pxl_colors = pxl_colors.map((pxl_color) => {

            let [r, g, b, a] = this.color_conversion.to_rgba_from_uint32(pxl_color);

            r = r * alpha + beta;
            g = g * alpha + beta;
            b = b * alpha + beta;

            r = parseInt(Math.min(255, Math.max(0, r)));
            g = parseInt(Math.min(255, Math.max(0, g)));
            b = parseInt(Math.min(255, Math.max(0, b)));

            return this.color_conversion.blend_colors(pxl_color, this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(r, g, b, a)), intensity, false, false);

        });

        return [pxls, pxl_colors, alpha, beta];

    };

    _pxl_adjust_smoothness = (pxls, pxl_colors, rounds = 1) => {

        const {pxl_width, pxl_height} = this.super_state.get_state();

        for(let round = 0; round < rounds; round++) {

            pxls.forEach((pxl, i) => {

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

                if(bigger_pxl_around_occurrence_occurrence >= 6 && bigger_pxl_around_occurrence_color_index !== -1) {

                    pxls[i] = bigger_pxl_around_occurrence_color_index;
                }

            });

        }

        return this.color_conversion.clean_duplicate_colors(pxls, pxl_colors);

    };

    _remove_close_pxl_colors = async(pxls = [], pxl_colors  = [], bucket_threshold = null, threshold_steps = null, color_number_bonus = 54, best_color_number = null) => {

        const state_bucket_threshold = this.super_state.get_state().bucket_threshold;

        return new Promise(function(resolve){
            ReducePalette.from(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold).compute(resolve);
        });
    };

    _request_force_update = (can_be_cancelable = false, especially_dont_force = false) => {

        return new Promise((resolve, reject) => {
            this.sraf.run_frame(() => {
                this.forceUpdate(resolve)
            }, Boolean(!can_be_cancelable), Boolean(!especially_dont_force)).catch(reject);
        });
    };

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
        const {box_shadow} = this.canvas_pos.get_style();
        const {background_image, transform_rotate, filter} = perspective ? this.canvas_pos.get_perspective_state(): {};
        const is_mobile_or_tablet = this.sraf.get_state().is_mobile_or_tablet;
        const cursor = this.super_state.get_cursor(_is_on_resize_element, _is_image_import_mode, mouse_down, tool, select_mode, canvas_event_target);

        const canvas_wrapper_width = Math.round(pxl_width * screen_zoom_ratio * scale.current);
        const canvas_wrapper_height = Math.round(pxl_height * screen_zoom_ratio * scale.current);
        const padding = Math.floor(canvas_wrapper.padding / device_pixel_ratio * scale.current);

        const background_image_style_props = Boolean(show_original_image_in_background && typeof _base64_original_images[_original_image_index] !== "undefined") ?
            {background: `center / cover no-repeat url("${_base64_original_images[_original_image_index]}")`}:
            show_transparent_image_in_background ?
                {background: `repeating-conic-gradient(rgb(248 248 248 / 100%) 0% 25%, rgb(235 235 235 / 100%) 0% 50%) left top 50% / calc(200% / ${pxl_width}) calc(200% / ${pxl_height})`}: {};

        return (
            <div onContextMenu={(e) => {e.preventDefault()}} ref={this._set_canvas_container_ref} draggable={"false"} style={{zIndex: 11, boxSizing: "border-box", position: "relative", overflow: "visible", touchAction: "none", userSelect: "none", contain: "paint"}} className={className}>
                <div ref={this._set_canvas_wrapper_overflow_ref}
                     className={"Canvas-Wrapper-Overflow" + ( !is_there_new_dimension ? " Shown ": " Not-Shown ")}
                     draggable={"false"}
                     style={{
                         height: "100%",
                         width: "100%",
                         contain: "layout style size paint",
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
                             contain: "layout style size paint",
                             left: 0,
                             top: 0,
                             borderWidth: canvas_wrapper.border_width,
                             borderStyle: "solid",
                             borderColor: "#fff",
                             backgroundColor: canvas_wrapper_background_color,
                             margin: 0,
                             borderRadius: canvas_wrapper_border_radius,
                             padding: padding,
                             width: Math.floor(canvas_wrapper_width),
                             height: Math.floor(canvas_wrapper_height),
                             boxShadow: box_shadow,
                             filter: `opacity(${!is_there_new_dimension ? "1": "0"}) ${perspective ? filter: ""}`,
                             webkitFilter: `opacity(${!is_there_new_dimension ? "1": "0"}) ${perspective ? filter: ""}`,
                             transform: `translate(${Math.round(scale.move_x * 100) / 100}px, ${Math.round(scale.move_y * 100) / 100}px) ${perspective ? transform_rotate: ""}`,
                             willChange: "transform, box-shadow",
                             transformOrigin: "center middle",
                             boxSizing: "content-box",
                             touchAction: "none",
                             pointerEvents: "none",
                             userSelect: "none",
                             zIndex: 4,
                         }}>
                        <canvas
                            draggable={"false"}
                            style={{
                                zIndex: 2,
                                position: "absolute",
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
                            width={Math.floor(pxl_width)}
                            height={Math.floor(pxl_height)}/>
                        {
                            Boolean(perspective) &&
                            <div className={"Canvas-Pixels-Cover"}
                                 draggable={"false"}
                                 style={{
                                     backgroundImage: background_image,
                                     zIndex: 3,
                                     borderRadius: canvas_wrapper_border_radius,
                                     padding: 0,
                                     left: 0,
                                     top: 0,
                                     borderWidth: 0,
                                     position: "absolute",
                                     width: Math.ceil(Math.floor(pxl_width) * (screen_zoom_ratio * scale.current).toFixed(3) + 2 * padding),
                                     height: Math.ceil(Math.floor(pxl_height) * (screen_zoom_ratio * scale.current).toFixed(3) + 2 * padding),
                                     boxSizing: "content-box",
                                     touchAction: "none",
                                     pointerEvents: "none",
                                     userSelect: "none",
                                     willChange: "background-image"
                                 }}/>
                        }
                    </div>
                    <div style={{
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
                        zIndex: 1,
                        color: canvas_wrapper_background_color,
                        textAlign: "center",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "100px",
                        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzU4LjY2NyAyNDAiIHdpZHRoPSI3Njc4LjIyMyIgaGVpZ2h0PSIzMjAiPjxkZWZzPjxjbGlwUGF0aCBpZD0iQSI+PHBhdGggZD0iTTAgMGg1NzU4LjY2N3YyNDBIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjQSkiIGZpbGw9IiM3NzciPjxwYXRoIGQ9Ik05MjEgMTgwaDMwdjYwaC0zMHptLTIzMiAwaDMwdjYwaC0zMHptLTIyOSAwaDMwdjYwaC0zMHptLTIyOSAwaDMwdjYwaC0zMHpNMCAwaDMwdjI0MEgwem0yMDczIDE4MGgzMHY2MGgtMzB6bS0yMzIgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6TTExNTIgMGgzMHYyNDBoLTMwem0yMDczIDE4MGgzMHY2MGgtMzB6bS0yMzIgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6TTIzMDQgMGgzMHYyNDBoLTMwem0yMDczIDE4MGgzMHY2MGgtMzB6bS0yMzIgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6TTM0NTYgMGgzMHYyNDBoLTMwem0yMDczIDE4MGgzMHY2MGgtMzB6bS0yMzIgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6bS0yMjkgMGgzMHY2MGgtMzB6TTQ2MDggMGgzMHYyNDBoLTMweiIvPjwvZz48L3N2Zz4K")`,
                        backgroundPosition: "bottom",
                        backgroundRepeat: "repeat-x",
                        backgroundSize: `${Math.round(scale.current * screen_zoom_ratio * 5 * 5)}px`,
                        pointerEvents: "none",
                        touchAction: "none",
                    }}><span>[{Math.round(scale.current * screen_zoom_ratio * 100) / 100}x]</span></div>}
                </div>
            </div>
        );
    }
}

export default CanvasPixels;