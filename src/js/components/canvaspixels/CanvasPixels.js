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
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

"use strict";

import React from "react";
import pool from "../../utils/worker-pool";
import B64PngCanvas from "../canvaspixels/utils/B64PngCanvas";
import B64PngLayer from "../canvaspixels/utils/B64PngLayer";
import ReducePalette from "../canvaspixels/utils/ReducePalette";
import SuperCanvas from "../canvaspixels/utils/SuperCanvas";
import ColorConversion from "../canvaspixels/utils/ColorConversion";
import SmartRequestAnimationFrame from "../canvaspixels/utils/SmartRequestAnimationFrame";
import XXHash from "../canvaspixels/utils/XXHash";
const xxhash = Object.create(XXHash).new();
import CanvasPos from "../canvaspixels/utils/CanvasPos"

class CanvasPixels extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: xxhash.base58_that(new TextEncoder("utf-8").encode(Math.random().toString(16))).concat("_w-" + parseInt(props.width || 32) + "_h-" + parseInt(props.height || 32)),
            className: props.className || null,
            perspective: props.perspective || 0,
            shadow_size: props.shadow_size || 0,
            shadow_color: props.shadow_color || "#575757",
            light: props.light || 2,
            perspective_coordinate: [0, 0],
            perspective_coordinate_last_change: 0,
            perspective_coordinate_notify_after_ms: 1000 / 20,
            perspective_coordinate_last_notify: 0,
            animation: props.animation || true,
            animation_duration: props.animation_duration || 60,
            move_using_full_container: props.move_using_full_container,
            no_actions: props.no_actions || false,
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
            _layers_defined_at: Date.now(),
            _layer_index: 0,
            _s_pxl_colors: [Uint32Array.of(0)],
            _old_pxl_colors: Uint32Array.of(0),
            _s_pxls: [new Array((props.pxl_width || 32) * (props.pxl_height || 32)).fill(0)],
            _old_pxls: new Array((props.pxl_width || 32) * (props.pxl_height || 32)).fill(0),
            _json_state_history: {previous_history_position: 0, history_position: 0, state_history: []},
            _saved_json_state_history_timestamp_from_drawing: 0,
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
            _select_hover_old_pxls_snapshot: [],
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
            _pxls_explosion: [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,3,0,0,0,2,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,2,1,2,1,0,1,0,0,0,0,0,0,0,1,2,3,1,1,0,0,0,1,0,0,0,0,1,1,3,2,0,0,1,2,3,1,1,0,0,0,0,1,0,2,2,1,0,1,2,0,1,0,0,0,0,0,0,1,1,0,1,2,0,2,0,0,0,0,0,0,0,0,0,0,1,1,3,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,2,1,2,2,0,0,0,0,0,0,0,0,0,1,2,0,1,3,2,1,1,0,0,0,0,0,0,0,1,3,3,4,3,3,2,0,1,0,0,0,0,0,1,1,2,3,3,1,1,4,1,1,1,1,0,0,1,0,2,3,3,1,3,1,3,3,2,0,1,0,0,1,1,2,2,3,3,4,3,3,3,2,1,0,0,0,0,0,1,3,2,2,2,3,3,2,2,0,0,0,0,0,0,0,3,3,1,1,2,3,3,1,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,1,1,0,0,0,0,0,0,0,0,1,2,2,3,4,2,1,0,0,0,0,0,1,1,1,1,3,3,3,4,4,3,1,1,0,0,0,1,1,2,2,4,4,3,4,3,3,3,1,0,0,0,1,2,3,3,4,3,3,3,4,4,3,1,1,0,1,2,2,3,3,3,3,3,4,4,2,1,2,1,1,1,2,3,3,4,5,4,3,4,2,3,3,2,1,1,1,2,3,4,4,5,5,3,3,2,3,4,2,1,1,0,1,2,4,4,3,2,3,4,3,4,5,4,1,0,0,0,0,1,2,3,2,3,4,4,4,4,3,1,0,0,0,0,1,1,1,1,4,5,3,1,2,3,1,0,0,0,0,0,1,2,3,2,3,2,1,1,1,1,0,0,0,0,0,1,1,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,1,1,0,0,0,0,0,0,0,0,1,2,2,3,4,2,1,0,0,0,0,0,1,1,1,1,3,3,3,4,4,3,1,1,0,0,0,1,1,2,2,4,4,3,4,3,3,3,1,0,0,0,1,2,3,3,4,3,3,3,4,4,3,1,1,0,1,2,2,3,3,3,3,3,4,4,2,1,2,1,1,1,2,3,3,4,5,4,3,4,2,3,3,2,1,1,1,2,3,4,4,5,5,3,3,2,3,4,2,1,1,0,1,2,4,4,3,2,3,4,3,4,5,4,1,0,0,0,0,1,2,3,2,3,4,4,4,4,3,1,0,0,0,0,1,1,1,1,4,5,3,1,2,3,1,0,0,0,0,0,1,2,3,2,3,2,1,1,1,1,0,0,0,0,0,1,1,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
                [0,0,0,1,1,1,0,2,1,1,1,0,0,0,0,1,1,0,1,3,0,2,2,2,3,1,0,1,1,0,1,3,0,2,2,2,2,0,2,2,2,2,3,1,0,0,2,2,2,0,0,0,0,2,2,0,0,2,2,0,0,2,1,1,0,0,0,0,0,0,0,0,2,0,0,2,0,1,4,0,0,0,0,0,0,0,0,2,1,1,2,2,2,0,0,0,0,0,0,0,0,0,2,3,1,0,2,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,2,0,0,0,0,0,0,5,1,0,0,0,0,1,3,2,0,0,0,0,0,0,1,1,0,2,2,0,1,1,2,2,0,0,0,0,0,0,0,0,2,2,0,0,2,0,2,0,0,0,0,0,0,0,2,2,3,1,0,2,2,2,0,0,2,2,2,2,2,2,0,1,1,0,0,2,1,3,2,0,2,2,2,3,1,2,0,0,2,0,0,1,1,0,2,2,0,0,1,1,0,0,0],
                [0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,1,1,0,1,2,0,0,0,0,2,1,0,1,1,0,1,2,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1,0,0,0,0,1,2,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,2,0,0,0,0,0,2,1,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0],
                [0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],            ],
            _pxl_colors_explosion: [
                ["#00000000","#ff0000ff","#ff3a00ff","#ff8200ff"],
                ["#00000000","#ff0000ff","#ff3a00ff","#ff8200ff"],
                ["#00000000","#ff0000ff","#ff3a00ff","#ff8200ff","#ffc900ff"],
                ["#00000000","#ff0000ff","#ff3a00ff","#ff8200ff","#ffc900ff","#ffe900ff"],
                ["#00000000","#8a0000ff","#1a1a1aff","#ff0000ff","#808080ff","#ff8200ff","#ff3a00ff"],
                ["#00000000","#8a0000ff","#1a1a1aff","#ff0000ff","#ff8200ff","#ff3a00ff"],
                ["#00000000","#8a0000ff","#ff0000ff","#ff8200ff","#ff3a0099"],
                ["#00000000","#8a000066"],
            ],
            _explosion_started_timestamp: 0,
            _explosion_width: 15,
            _explosion_height: 15,
            _previous_explosion_pxls_positioned_keyset: new Set(),
            _explosion_time: 750,
            _explosion_index: -1,
            _selection_pair_highlight: true,
            _old_selection_pair_highlight: true,
            _pointer_events: [],
            _latest_pointers_distance: 0,
            _latest_pointers_client_x_center: 0,
            _latest_pointers_client_y_center: 0,
            _previous_single_pointer_down_timestamp: 0,
            _previous_double_pointer_down_timestamp: 0,
            _previous_double_pointer_move_timestamp: 0,
            _image_move_from: [-1, -1],
            _updated_at: Date.now(),
            _notified_position_at: 0,
            _force_updated_timestamp: 0,
            _loading_base64_img: "",
            _loading_base64_img_changed: 0,
            _intervals: [],
            _kb: 0,
            _device_motion: true,
            export_state_every_ms: props.export_state_every_ms || 60 * 1000,
            _last_filters_hash: "",
        };
        if(!this.hasnt_been_mount) {
            this.xxhash = xxhash;
            this.color_conversion = Object.create(ColorConversion).new();
            this.super_canvas = Object.create(SuperCanvas).from(null, 32, 32);
            this.canvas_pos = Object.create(CanvasPos).from(32,  32,  0.9,  32, 0);
            this.sraf =  Object.create(SmartRequestAnimationFrame).new();
            this.sraf.start_timer();
            this.hasnt_been_mount = true;
        }
    };

    componentDidMount() {

        window.addEventListener("resize", this._update_canvas_container_size);
        this._update_canvas_container_size();
        if(this.sraf.get_state().is_mobile_or_tablet && this.state._device_motion === true){
            window.addEventListener("devicemotion", this._handle_motion_changes);
        }

        if(Boolean(this.props.on_fps_change)) {

            this.sraf.set_notify_fps_callback(this.props.on_fps_change);
        }

        let _intervals = [];

        _intervals[0] = setInterval(this._maybe_save_state, parseInt(this.state._undo_buffer_time_ms * 1.05));

        _intervals[1] = setInterval(this._maybe_update_mine_player, 1000 / 30);

        _intervals[2] = setInterval(this._maybe_update_selection_highlight, this.sraf.get_state().is_mobile_or_tablet ? 2500: 1250);

        _intervals[3] = setInterval(this._notify_export_state, this.state.export_state_every_ms);

        _intervals[4] = setInterval(this._maybe_update_canvas, parseInt(this.state._undo_buffer_time_ms * 1));

        const body_css =
            "body {" +
                "touch-action:none;" +
            "}";

        const pixelated_css =
            ".Canvas-Pixels, .Canvas-Wrapper-Overflow, .Canvas-Wrapper, .Canvas-Pixels-Cover {" +
                "image-rendering: optimizeSpeed;" +
                "image-rendering: -moz-crisp-edges;" +
                "image-rendering: -webkit-crisp-edges;" +
                "image-rendering: -webkit-optimize-contrast;" +
                "image-rendering: -o-pixelated;" +
                "image-rendering: crisp-edges;" +
                "-ms-interpolation-mode: nearest-neighbor;" +
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
                animation-fill-mode: both;
                animation-duration: 240ms;
                animation-delay: 0ms;
                animation-timing-function: linear;
                opacity: 1 !important,
            }
            .Canvas-Wrapper-Overflow {
                opacity: 0 !important,
                transform-origin: center center !important;
            }
            @keyframes canvanimation { 
                  0% { transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: .0; }
                  4.3% { transform: matrix3d(0.271, 0, 0, 0, 0, 0.271, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: .2; }
                  8.61% { transform: matrix3d(.818, 0, 0, 0, 0, .818, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: .8; }
                  12.91% { transform: matrix3d(1.078, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: .9; }
                  17.22% { transform: matrix3d(1.11, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: 1; }
                  28.33% { transform: matrix3d(1.031, 0, 0, 0, 0, 1.031, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: 1; }
                  39.44% { transform: matrix3d(.991, 0, 0, 0, 0, .991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: 1; }
                  61.66% { transform: matrix3d(1.001, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: 1; }
                  83.98% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: 1; }
                  100% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: 1; } 
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
        this.setState({_intervals});
    }

    xxhashthat = (array) => {

        return this.xxhash.base58_that(array);
    };

    _set_size = (width = null, height = null) => {

        width = width || this.state.pxl_width;
        height = height || this.state.pxl_height;

        this.canvas_pos.set_sizes(width, height);
        this.super_canvas.set_dimensions(width, height);
        this.canvas_pos.set_current_scale_default();
        this.setState({
            id: Date.now(),
            pxl_width: width,
            pxl_height: height,
            _pxl_indexes_of_selection: new Set(),
            _layers: [{id: Date.now(), name: "Layer 0", hidden: false, opacity: 1}],
            _layer_index: 0,
            _s_pxls: Array.of(new Array((width || 32) * (height || 32)).fill(0)),
            _old_pxls: new Array((width || 32) * (height || 32)).fill(0),
            _s_pxl_colors: Array.of(Uint32Array.of(0)),
            _old_pxl_colors: ["#00000000"],
            has_shown_canvas_once: false,
            _is_there_new_dimension: true,
        }, () => {

            this._update_canvas();
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
    }

    _maybe_update_mine_player = () => {

        const { tool } = this.state;

        if(tool === "MINE") {

            const {pxl_width, pxl_height} = this.state;
            let {_mine_index, _mine_player_index, mine_player_direction} = this.state;

            if(_mine_player_index === null) {

                _mine_player_index = Math.floor(Math.random() * ((pxl_width * pxl_height)-1));
                _mine_index = -1;

            }else {

                let mine_player_x = _mine_player_index % pxl_width;
                let mine_player_y = (_mine_player_index - mine_player_x) / pxl_width;

                switch (mine_player_direction) {

                    case "UP":
                        mine_player_y--;
                        break;
                    case "RIGHT":
                        mine_player_x++;
                        break;
                    case "DOWN":
                        mine_player_y++;
                        break;
                    case "LEFT":
                        mine_player_x--;
                        break;
                }

                mine_player_x = mine_player_x % pxl_width;
                mine_player_x = mine_player_x < 0 ? pxl_width + mine_player_x: mine_player_x;
                mine_player_y = mine_player_y % pxl_height;
                mine_player_y = mine_player_y < 0 ? pxl_height + mine_player_y: mine_player_y;

                _mine_player_index = mine_player_x + mine_player_y * pxl_width;

                if(_mine_index === _mine_player_index) {

                    this.setState({_explosion_started_timestamp: Date.now(), _explosion_index: _mine_index});
                    this._notify_game_end();
                }
            }

            this.setState({
                _mine_player_index,
                _mine_index
            }, () => {

                this._update_canvas();
            });

        }

    };

    _maybe_update_selection_highlight = () => {

        const { tool, _moves_speed_average_now, _select_shape_index_a, _selection_pair_highlight, no_actions } = this.state;

        if(no_actions === false && _moves_speed_average_now <= -16 && tool.toUpperCase().includes("SELECT") && parseInt(_select_shape_index_a) < 0) {

            this.setState({_selection_pair_highlight: !_selection_pair_highlight}, () => {

                this._update_canvas();
            });
        }
    };

    _maybe_update_canvas = () => {

        const { _moves_speed_average_now, _select_shape_index_a } = this.state;

        if(_moves_speed_average_now <= -16 && parseInt(_select_shape_index_a) < 0) {

            this._update_canvas();
        }
    };

    componentWillReceiveProps(new_props) {

        if(new_props.tool === "MOVE" || this.state._imported_image_pxl_colors.length !== 0) {

            this.canvas_pos.set_boolean_move_on_click(true);
        }else {

            this.canvas_pos.set_boolean_move_on_click(false);
        }

        if(this.state.perspective !== new_props.perspective) {

            if(this.sraf.get_state().is_mobile_or_tablet && this.state._device_motion === true){

                if(new_props.perspective > 0) {

                    window.addEventListener("devicemotion", this._handle_motion_changes);
                }else {

                    window.removeEventListener("devicemotion", this._handle_motion_changes);
                }
            }
        }

        if(this.state.tool === "MINE" && new_props.tool !== "MINE") {

            this.setState({_mine_player_index: null, _mine_index: null});
        }

        if(this.state.pencil_mirror_mode !== "NONE" && new_props.pencil_mirror_mode === "NONE" || (this.state.tool.includes("PENCIL") && !new_props.tool.includes("PENCIL"))) {

            this.setState({_pencil_mirror_index: -1});
        }

        if(this.state.tool !== new_props.tool && !new_props.tool.includes("SELECT")) {

            this.setState({_pxl_indexes_of_selection: new Set(), _pxl_indexes_of_selection_drawn: new Set(this.state._pxl_indexes_of_selection)}, () => {

                this._request_force_update();
                this._notify_is_something_selected();
            });
        }

        if(
            this.state.hide_canvas_content !== new_props.hide_canvas_content ||
            this.state.show_original_image_in_background !== new_props.show_original_image_in_background ||
            this.state.show_transparent_image_in_background !== new_props.show_transparent_image_in_background ||
            this.state.pencil_mirror_mode !== new_props.pencil_mirror_mode ||
            this.state.tool !== new_props.tool ||
            this.state.select_mode !== new_props.select_mode
        ) {

            this.setState(new_props, () =>{

                    this._request_force_update(false, false, () => {

                        this._update_canvas();
                    });
            });

        }else {

            this.setState(new_props);
        }
    }

    _handle_motion_changes = (event) => {

        let screen = window.screen;
        let orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

        let x = event.accelerationIncludingGravity.x - event.acceleration.x;
        x = Math.max(-10, Math.min(10, x));
        let previous_x = x;

        let y = event.accelerationIncludingGravity.y - event.acceleration.y;
        y = Math.max(-10, Math.min(10, y));

        switch(orientation) {

            case "portrait-primary":
                x = x;
                y = y;
                break;
            case "portrait-secondary":
                x = -x;
                y = -y;
                break;
            case "landscape-primary":

                x = -y;
                y = previous_x;
                break;
            case "landscape-secondary":

                x = y;
                y = -previous_x;
                break;
        }

        if(this.sraf.get_state().is_mobile_or_tablet && this.state.perspective && this.state.has_shown_canvas_once) {

            this.setState({_device_motion: true, perspective_coordinate: [x, y], perspective_coordinate_last_change: Date.now()}, () => {

                if(this.state._moves_speed_average_now === -24) {

                    this._request_force_update(true, true, () => {

                        //this._notify_perspective_coordinate_changes([x, y, this.state.scale]);
                    });
                }
            });
        }
    };

    set_perspective_coordinate = (array) => {

        if((!this.sraf.get_state().is_mobile_or_tablet || !this.state._device_motion) && this.state.perspective && this.state.has_shown_canvas_once) {

            this.setState({perspective_coordinate: array, perspective_coordinate_last_change: Date.now()}, () => {

                this._request_force_update(true, true, () => {

                    if(!this.sraf.get_state().is_mobile_or_tablet) {

                        this._notify_perspective_coordinate_changes(array.concat([this.state.scale]));
                    }
                });
            });
        }
    };

    _notify_perspective_coordinate_changes = (array) => {

        if(this.props.onPerspectiveCoordinateChanges) {

            const {perspective_coordinate_last_notify, perspective_coordinate_notify_after_ms} = this.state;
            const now = Date.now();

            if(perspective_coordinate_last_notify + perspective_coordinate_notify_after_ms < now){

                this.setState({perspective_coordinate_last_notify: now})
                this.props.onPerspectiveCoordinateChanges(array);
            }
        }
    };

    shouldComponentUpdate() {

        return false;
    }

    current_layer_up = () => {

        let { _layers, _layer_index, _s_pxl_colors, _s_pxls, pxl_width, pxl_height } = this.state;

        if(_layer_index < _layers.length-1) {

            _layers.splice(_layer_index+1, 0, _layers.splice(_layer_index, 1)[0]);
            _s_pxl_colors.splice(_layer_index+1, 0, _s_pxl_colors.splice(_layer_index, 1)[0]);
            _s_pxls.splice(_layer_index+1, 0, _s_pxls.splice(_layer_index, 1)[0]);


            this.setState({
                _layers,
                _layer_index: parseInt(_layer_index + 1),
                _s_pxl_colors,
                _old_pxl_colors: Uint32Array.of(0),
                _s_pxls,
                _old_pxls: new Array(pxl_width * pxl_height).fill(0),
                _last_action_timestamp: Date.now()
            }, () => {

                this._notify_layers_and_compute_thumbnails_change(null, Date.now(), true);
            });
        }
    };

    current_layer_down = () => {

        let { _layers, _layer_index, _s_pxl_colors, _s_pxls, pxl_width, pxl_height } = this.state;

        if(_layer_index > 0) {

            _layers.splice(_layer_index-1, 0, _layers.splice(_layer_index, 1)[0]);
            _s_pxl_colors.splice(_layer_index-1, 0, _s_pxl_colors.splice(_layer_index, 1)[0]);
            _s_pxls.splice(_layer_index-1, 0, _s_pxls.splice(_layer_index, 1)[0]);


            this.setState({
                _layers,
                _layer_index: parseInt(_layer_index - 1),
                _s_pxl_colors,
                _old_pxl_colors: Uint32Array.of(0),
                _s_pxls,
                _old_pxls: new Array(pxl_width * pxl_height).fill(0),
                _last_action_timestamp: Date.now()
            }, () => {

                this._notify_layers_and_compute_thumbnails_change(null, Date.now(), true);
            });
        }
    };

    new_layer = (at_index) => {

        const {pxl_width, pxl_height} = this.state;
        let { _layers, _s_pxl_colors, _s_pxls } = this.state;
        at_index = typeof at_index === "undefined" ? _s_pxl_colors.length: at_index;

        _s_pxl_colors.splice(at_index+1, 0, Uint32Array.of(0));
        _s_pxls.splice(at_index+1, 0, new Array(pxl_width * pxl_height).fill(0));
        _layers.splice(at_index+1, 0, {id: Date.now(), name: `Layer ${at_index}`, hidden: false, opacity: 1});

        this.setState({
            _layers,
            _layer_index: at_index,
            _s_pxl_colors,
            _old_pxl_colors: Uint32Array.of(0),
            _s_pxls,
            _old_pxls: new Array(pxl_width * pxl_height).fill(0),
            _last_action_timestamp: Date.now(),
        }, () => {

            this._notify_layers_and_compute_thumbnails_change(null, Date.now(), true);
        });
    };

    duplicate_layer = (at_index) => {

        const {pxl_width, pxl_height} = this.state;
        let { _layers, _s_pxl_colors, _s_pxls } = this.state;
        at_index = typeof at_index === "undefined" ? _s_pxl_colors.length: at_index;

        _s_pxl_colors.splice(at_index + 1, 0, Uint32Array.from(_s_pxl_colors[at_index]));
        _s_pxls.splice(at_index + 1, 0, [..._s_pxls[at_index]]);
        _layers.splice(at_index + 1, 0, {
            id: Date.now(),
            hash: String(_layers[at_index].hash),
            name: `${_layers[at_index].name} (copy)`,
            hidden: Boolean(_layers[at_index].hidden),
            opacity: parseFloat(_layers[at_index].opacity),
            colors: Array.from(_layers[at_index].colors),
            number_of_colors: parseInt(_layers[at_index].number_of_colors),
            thumbnail: String(_layers[at_index].thumbnail),
        });

        this.setState({
            _layers,
            _layer_index: at_index + 1,
            _s_pxl_colors,
            _old_pxl_colors: Uint32Array.of(0),
            _s_pxls,
            _old_pxls: new Array(pxl_width * pxl_height).fill(0),
            _last_action_timestamp: Date.now(),
        }, () => {

            this._notify_layers_and_compute_thumbnails_change(null, Date.now(), true);
        });

    };

    delete_layer = (at_index) => {

        let { _layers, _s_pxl_colors, _s_pxls, _layer_index } = this.state;

        if(_layers.length > 1) {

            _s_pxl_colors.splice(at_index, 1);
            _s_pxls.splice(at_index, 1);
            _layers.splice(at_index, 1);

            _layer_index = at_index-1;
            _layer_index = _layer_index < 0 ? 0: _layer_index;

            this.setState({
                _layers,
                _layer_index,
                _s_pxl_colors,
                _old_pxl_colors: _s_pxl_colors[_layer_index],
                _s_pxls,
                _old_pxls: _s_pxls[_layer_index],
                _last_action_timestamp: Date.now(),
            }, () => {

                this._notify_layers_and_compute_thumbnails_change(null, Date.now(), true);
            });
        }

    };

    change_active_layer = (at_index) => {

        const {  _s_pxl_colors, _s_pxls } = this.state;

        if(this.state._s_pxls.length > at_index && 0 <= at_index) {

            this.setState({
                _layer_index: at_index,
                _old_pxl_colors: Uint32Array.from(_s_pxl_colors[at_index]),
                _old_pxls: Array.from(_s_pxls[at_index]),
                _last_action_timestamp: Date.now(),
            }, () => {

                this._notify_layers_and_compute_thumbnails_change(null, Date.now(), true);
            });
        }else {

            this._notify_layers_and_compute_thumbnails_change();
        }
    };

    toggle_layer_visibility = (at_index) => {

        let _layers = Array.from(this.state._layers);
        _layers[at_index].hidden = !_layers[at_index].hidden;

        this.setState({
            _layers,
            _last_action_timestamp: Date.now(),
        }, () => {

            this._notify_layers_and_compute_thumbnails_change(null, Date.now(), true);
        });
    };

    change_layer_opacity = (at_index, opacity) => {

        let _layers = Array.from(this.state._layers);
        _layers[at_index].opacity = parseFloat(opacity);

        this.setState({
            _layers,
            _last_action_timestamp: Date.now(),
        }, () => {

            this._notify_layers_and_compute_thumbnails_change(null, Date.now(), true);
        });
    };

    merge_down_layer = (at_index) => {

        let { _layers, _s_pxls, _s_pxl_colors } = this.state;

        _layers = Array.from(_layers);
        _s_pxls = _s_pxls.map((a) => Array.from(a));
        _s_pxl_colors = _s_pxl_colors.map((a) => Uint32Array.from(a));

        const { pxl_width, pxl_height } = this.state;

        if(typeof _layers[at_index] !== "undefined" && typeof _layers[at_index - 1] !== "undefined") {

            let new_layer_pxls = new Array(pxl_width * pxl_height).fill(0);
            let new_layer_pxl_colors = new Array();

            const top_layer_pxls = _s_pxls[at_index];
            const bottom_layer_pxls = _s_pxls[at_index - 1];

            const top_layer_pxl_colors = _s_pxl_colors[at_index];
            const top_layer_opacity = parseFloat(_layers[at_index].opacity);
            const bottom_layer_pxl_colors = _s_pxl_colors[at_index - 1];
            const bottom_layer_opacity = parseFloat(_layers[at_index - 1].opacity);

            const new_layer = {
                id: Date.now(),
                name: `Merged layers ${at_index}+${at_index-1}`,
                hidden: Boolean(_layers[at_index].hidden &&  _layers[at_index-1].hidden),
                opacity: parseInt(bottom_layer_opacity),
            };

            bottom_layer_pxls.forEach((pxl, pxl_index) => {

                const top_layer_pxl_color = top_layer_pxl_colors[top_layer_pxls[pxl_index]];
                const bottom_layer_pxl_color = bottom_layer_pxl_colors[pxl];

                let new_layer_pxl_color = this.color_conversion.blend_colors(bottom_layer_pxl_color, top_layer_pxl_color, top_layer_opacity, false, false);
                let new_layer_pxl_color_index = null;

                if(!new_layer_pxl_colors.includes(new_layer_pxl_color)) {

                    new_layer_pxl_color_index = new_layer_pxl_colors.push(new_layer_pxl_color);
                }else {

                    new_layer_pxl_color_index = new_layer_pxl_colors.indexOf(new_layer_pxl_color);
                }
                new_layer_pxls[pxl_index] = new_layer_pxl_color_index;
            });

            _layers.splice(at_index-1, 2, new_layer);
            _s_pxls.splice(at_index-1, 2, Array.from(new_layer_pxls));
            _s_pxl_colors.splice(at_index-1, 2, Uint32Array.from(new_layer_pxl_colors));

            this.setState({
                _layer_index: at_index-1,
                _layers,
                _s_pxls,
                _old_pxls: new Array(pxl_width * pxl_height).fill(0),
                _s_pxl_colors,
                _old_pxl_colors: new Uint32Array(0),
                _last_action_timestamp: Date.now(),
            }, () => {

                this._notify_layers_and_compute_thumbnails_change(null, Date.now(), true);
            });

        }
    };

    _notify_game_end = () => {

        if(this.props.onGameEnd) {

            this.props.onGameEnd();
        }

    };

    compute_filters_preview = () => {

        this._notify_filters_change(1);
    };

    _notify_filters_change = (force = 1) => {

        if(this.props.onFiltersThumbnailChange) {

            const { _layers, _layer_index, _last_filters_hash, pxl_width, pxl_height, _s_pxls, _s_pxl_colors } = this.state;
            const hash = String(Object.assign({}, _layers[_layer_index]).hash || "");
            if(_last_filters_hash === hash) { return; } else if(hash === "") {setTimeout(() => {this._notify_filters_change(force)}, 50)}

            let thumbnails = new Map();
            let progression = 0;
            this.setState({_last_filters_hash: hash}, () => {

                this.get_filter_names().forEach((name, index, filter_names) => {

                    this.get_layer_base64_png_data_url(
                        pxl_width,
                        pxl_height,
                        ...this._filter_pixels(name, force, _s_pxls[_layer_index], _s_pxl_colors[_layer_index], true),
                        (result) => {
                            thumbnails.set(name, result);
                            progression = String(Math.round(parseFloat(thumbnails.size / filter_names.length)*100));
                            this.props.onFiltersThumbnailChange(thumbnails, hash, progression);
                        }, 80
                    );
                });

            });
        }
    };

    _notify_layers_and_compute_thumbnails_change = (callback_function = null, start = Date.now(), layers_index_changed = false) => {

        const maybe_set_layers = (lyrs, lyrs_length, lyrs_changed, lyrs_hash) => {

            if(callback_function !== null) {

                callback_function(lyrs, lyrs_length, lyrs_changed, lyrs_hash);
            }
            if(lyrs_changed) {

                this.setState({_layers: lyrs, _layers_defined_at: Date.now()}, () => {

                    if(this.props.onLayersChange) {

                        this.props.onLayersChange(this.state._layer_index, this.state._layers);
                    }

                });
            }
        }

        const { _layers, pxl_width, pxl_height, _s_pxls, _s_pxl_colors } = this.state;

        if(!Boolean(_s_pxls.length === _s_pxl_colors.length && _s_pxl_colors.length === _layers.length)) {

            setTimeout(() => {

                this._notify_layers_and_compute_thumbnails_change(callback_function, start, layers_index_changed);
            }, 20);
            return false;
        }

        let all_layers = [];
        let all_layers_length = 0;

        for(let index = 0; index < _layers.length; index++){

            const l = _layers[index];
            all_layers[index] = Object.assign({}, l);
            const p = Array.from(_s_pxls[index]);
            const pc = Uint32Array.from(_s_pxl_colors[index])
            const hash = BigInt(this.xxhash.bigint_that(p) + this.xxhash.bigint_that(pc)).toString(16);

            if(hash !== all_layers[index].hash  || !Boolean(all_layers[index].thumbnail)) {

                this.get_layer_base64_png_data_url(pxl_width, pxl_height, p, pc, (result) => {

                    all_layers[index].hash = hash;
                    all_layers[index].colors = Array.from(pc.slice(0, 128) || []).map((c) => this.color_conversion.to_hex_from_uint32(c));
                    all_layers[index].number_of_colors = pc.length;
                    all_layers[index].thumbnail = result;
                    all_layers_length++;

                    if(all_layers_length === _layers.length) {

                        const all_new_layers_hash = all_layers.map((l) => {return l.hash || ""}).join("+");
                        const has_changed = Boolean(layers_index_changed || String(_layers.map((l) => {return l.hash || ""}).join("+") + _layers.map((l) => {return l.id.toString() + String(l.hidden ? "hidden": "visible") + l.opacity.toString()}).join("-")) !== String(all_layers.map((l) => {return l.hash || ""}).join("+") + all_layers.map((l) => {return l.id.toString() + String(l.hidden ? "hidden": "visible") + l.opacity.toString()}).join("-")));
                        maybe_set_layers(all_layers, all_layers_length, has_changed, all_new_layers_hash);
                    }
                }, 120);

            }else {

                all_layers_length++;

                if(all_layers_length === _layers.length) {

                    const all_new_layers_hash = all_layers.map((l) => {return l.hash || ""}).join("+");
                    const has_changed = Boolean(layers_index_changed || String(_layers.map((l) => {return l.hash || ""}).join("+") + _layers.map((l) => {return l.id.toString() + String(l.hidden ? "hidden": "visible") + l.opacity.toString()}).join("-")) !== String(all_layers.map((l) => {return l.hash || ""}).join("+") + all_layers.map((l) => {return l.id.toString() + String(l.hidden ? "hidden": "visible") + l.opacity.toString()}).join("-")));
                    maybe_set_layers(all_layers, all_layers_length, has_changed, all_new_layers_hash);
                }
            }
        }
    };

    get_layer_base64_png_data_url = (pxl_width, pxl_height, pxls, pxl_colors, callback_function, resize_width) => {

        const scale = 1;
        const resize_w = resize_width || pxl_width;
        const b64pnglayer = Object.create(B64PngLayer).from(pool, pxl_width, pxl_height, pxls, pxl_colors, scale, resize_w);
        b64pnglayer.render(function(r){callback_function(r); b64pnglayer.destroy()});
    };

    get_base64_png_data_url = (scale = 1, callback_function = () => {}, with_palette = false, with_compression_speed = 0, with_compression_quality_min = 30, with_compression_quality_max = 35) => {

        this._get_base64_png_data_url(scale, callback_function, with_palette, with_compression_speed, with_compression_quality_min, with_compression_quality_max);
    };

    _get_base64_png_data_url = (scale = 1, callback_function = () => {}, with_palette = false, with_compression_speed = 0, with_compression_quality_min = 30, with_compression_quality_max = 35) => {

        const { pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers } = this.state;

        const b64pngcanvas = Object.create(B64PngCanvas).from(pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette);
        b64pngcanvas.render(function(result) {

            b64pngcanvas.destroy();
            if(with_compression_speed !== 0) {

                import("../../utils/png_quant").then(({png_quant}) => {

                    png_quant(Object.values(result)[0], with_compression_quality_min, with_compression_quality_max, with_compression_speed, pool).then((base_64_out) => {

                        callback_function(with_palette ? Array.of(base_64_out, Object.values(result)[1]): Array.of(base_64_out));
                        base_64_out = null;
                    });
                });
            }else {

                callback_function(with_palette ? Array.of(Object.values(result)[0], Object.values(result)[1]): Array.of(Object.values(result)[0]));
            }
        });
    };

    _get_pixels_palette_and_list_from_image_data = (image_data, force_full_compute = false) => {

        const { max_size, _lazy_lazy_compute_time_ms } = this.state;

        const too_much_pixel_cpu_would_go_brrrrr = image_data.data.length / 4 > (max_size * max_size); // Can be three time bigger than the default max convert size

        let new_pxl_colors = [];
        let new_pxl_colors_set = new Set();
        let new_pxls;

        if(!too_much_pixel_cpu_would_go_brrrrr || force_full_compute) { // We can parse all pixel

            new_pxls = new Uint32Array(image_data.width * image_data.height).fill(0);
            for (let i = 0; i < image_data.data.length; i += 4) {

                const color_uint32 = this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(image_data.data[i+0], image_data.data[i+1], image_data.data[i+2], image_data.data[i+3]));

                const deja_vu_color_hex = new_pxl_colors_set.has(color_uint32);
                let color_uint32_index = deja_vu_color_hex ? new_pxl_colors.indexOf(color_uint32): -1;

                if (color_uint32_index === -1) {

                    color_uint32_index = new_pxl_colors.push(color_uint32)-1;
                    new_pxl_colors_set.add(color_uint32);
                }
                new_pxls[i / 4] = color_uint32_index;
            }

        }else { // We will only compute n LEVEL lines of pixel

            let start = Date.now();
            new_pxls = [];

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
            new_pxls: Array.from(new_pxls),
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

        let { _s_pxls, _s_pxl_colors, _layer_index, _pxl_indexes_of_selection, pxl_width, pxl_height } = this.state;

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

            this.setState({
                _s_pxls,
                _s_pxl_colors,
                _last_action_timestamp: Date.now()
            }, () => {

                this._update_canvas();
            });
        }
    };

    import_image_on_canvas_from_selection = () => {

        let { _s_pxls, _s_pxl_colors, _layer_index, _pxl_indexes_of_selection, pxl_width, pxl_height } = this.state;

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
            let new_pxls =  new Uint32Array(new_width * new_height);
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

            [ new_pxls, new_pxl_colors ] = this.color_conversion.clean_duplicate_colors(new_pxls, new_pxl_colors);

            this.setState({
                _imported_image_start_x: top_left[0],
                _imported_image_start_y: top_left[1],
                _imported_image_scale_delta_x: 0,
                _imported_image_scale_delta_y: 0,
                _imported_image_pxls: new_pxls,
                _imported_image_width: new_width,
                _imported_image_height: new_height,
                _imported_image_pxl_colors: new_pxl_colors,

            }, () => {

                this._notify_image_import_complete();
                this._notify_is_image_import_mode();
                this._update_canvas();
            });
        }

    };

    import_image_on_canvas = (image_obj) => {

        if(this.props.onImageImport) {

            this.props.onImageImport();
        }

        setTimeout(() => {

            const { pxl_width, pxl_height } = this.state;

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

                this.setState({
                    _imported_image_start_x: 0,
                    _imported_image_start_y: 0,
                    _imported_image_scale_delta_x: 0,
                    _imported_image_scale_delta_y: 0,
                    _imported_image_pxls: new_pxls,
                    _imported_image_width: width,
                    _imported_image_height: height,
                    _imported_image_pxl_colors: new_pxl_colors,

                }, () => {
                    this._notify_image_import_complete();
                    this._notify_is_image_import_mode();
                    this._update_canvas();
                });

            }

        }, 50);

    };

    _get_imported_image_scaled = (_imported_image_pxls, _imported_image_pxl_colors, _imported_image_width, _imported_image_height, _imported_image_scale_delta_x, _imported_image_scale_delta_y) => {


        if(_imported_image_pxls.length) {

            let [canvas_ctx, canvas] = this._get_new_ctx_from_canvas(_imported_image_width, _imported_image_height, true);


            _imported_image_pxls.forEach((pxl, index) => {

                const pos_x = index % _imported_image_width;
                const pos_y = (index - pos_x) / _imported_image_width;

                const color = this.color_conversion.to_hex_from_uint32(_imported_image_pxl_colors[pxl]);
                canvas_ctx.fillStyle = color;
                canvas_ctx.fillRect(pos_x, pos_y, 1, 1);
            });

            const scaled_width = _imported_image_width + _imported_image_scale_delta_x;
            const scaled_height = _imported_image_height + _imported_image_scale_delta_y;

            let [canvas_resized_ctx, canvas_resized] = this._get_new_ctx_from_canvas(scaled_width, scaled_height, true);
            canvas_resized_ctx.drawImage(canvas, 0, 0, _imported_image_width, _imported_image_height, 0, 0, scaled_width, scaled_height);
            canvas_ctx = null;
            canvas = null;
            let resized_image_data = canvas_resized_ctx.getImageData(0, 0, scaled_width, scaled_height);
            canvas_resized_ctx = null;
            canvas_resized = null;
            const { new_pxls, new_pxl_colors } = this._get_pixels_palette_and_list_from_image_data(resized_image_data, true);
            resized_image_data = null;
            return [ new_pxls, new_pxl_colors, scaled_width, scaled_height ];

        }else {

            return [_imported_image_pxls, _imported_image_pxl_colors, _imported_image_width, _imported_image_height];
        }
    };

    set_canvas_from_image = (image_obj = null, loading_base64_img = "", img_d = {}, dont_smart_resize = false) => {

        if(this.props.onLoad) {this.props.onLoad("image_load");}

        if(img_d.id) {

            const _layer_index = 0;
            const ns_pxl_colors = Array.of(Uint32Array.from(img_d.pxl_colors));
            const ns_pxls = Array.of(Array.from(img_d.pxls));

            this.canvas_pos.set_sizes(img_d.width, img_d.height);
            this.super_canvas.set_dimensions(img_d.width, img_d.height);
            this.canvas_pos.set_current_scale_default();
            this.setState({
                _id: this.xxhash.base58_that(new TextEncoder("utf-8").encode(loading_base64_img)).concat("_w-" + img_d.width + "_h-" + img_d.height + "_s-"+Math.random().toString(16)),
                pxl_width: img_d.width,
                pxl_height: img_d.height,
                _pxl_indexes_of_selection: new Set(),
                _base64_original_images: [loading_base64_img],
                _s_pxl_colors: ns_pxl_colors,
                _s_pxls: ns_pxls,
                _layers: [{id: Date.now(), name: "Layer 0", hidden: false, opacity: 1}],
                _layer_index,
                _old_pxls_hovered: -1,
                _pxls_hovered: -1,
                _old_pxl_colors: Uint32Array.of(0),
                _old_pxls: new Array(img_d.pxls.length).fill(0),
                has_shown_canvas_once: false,
                _is_there_new_dimension: true,
                _original_image_index: 0,
                _last_action_timestamp: Date.now(),
                _json_state_history: {previous_history_position: 0, history_position: 0, state_history: []},
                _saved_json_state_history_timestamp_from_drawing: 0,
            }, () => {

                this._notify_image_load_complete();
                this._notify_export_state();
                this._update_canvas();
            });

        }else {

            setTimeout( () => {

                const { default_size, max_size, ideal_size, _base64_original_images, dont_change_img_size_onload, dont_compute_base64_original_image } = this.state;

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
                let ns_pxls = Array.of(Uint32Array.from(new_pxl_data.new_pxls));
                new_pxl_data = null;

                this.canvas_pos.set_sizes(width, height);
                this.super_canvas.set_dimensions(width, height);
                this.canvas_pos.set_current_scale_default();
                this.setState({
                    _id: this.xxhash.base58_that(new TextEncoder("utf-8").encode(base64_original_image)).concat("_w-" + width + "_h-" + height + "_s-" + Math.random().toString(16)),
                    pxl_width: width,
                    pxl_height: height,
                    _pxl_indexes_of_selection: new Set(),
                    _base64_original_images: new_base64_original_images,
                    _layers: [{id: Date.now(), name: "Layer 0", hidden: false, opacity: 1}],
                    _json_state_history: {previous_history_position: 0, history_position: 0, state_history: []},
                    _saved_json_state_history_timestamp_from_drawing: 0,
                    _s_pxl_colors: ns_pxl_colors,
                    _s_pxls: ns_pxls,
                    _layer_index: 0,
                    _old_pxls_hovered: -1,
                    _pxls_hovered: -1,
                    _old_pxl_colors: Uint32Array.of(0),
                    _old_pxls: new Array(ns_pxls[0].length).fill(0),
                    has_shown_canvas_once: false,
                    _is_there_new_dimension: true,
                    _original_image_index: new_base64_original_images.indexOf(base64_original_image),
                    _last_action_timestamp: Date.now(),
                }, () => {

                    this._notify_image_load_complete();
                    this._notify_export_state();
                    this._update_canvas();
                });

            }, 50);
        }
    };

    _set_canvas_ref = (can) => {

        if(typeof can === "undefined") {return}
        if(can === null) {return}
        if(typeof can.width === "undefined") {return}
        if(can.width === null) {return}

        let { pxl_width, pxl_height } = this.state;
        this.super_canvas.new(can, pxl_width, pxl_height);

        this.setState({has_shown_canvas_once: false, _is_there_new_dimension: true}, () => {

            this._request_force_update(false, false, () => {

                this._update_canvas(true, true);
            });
        });
    };

    _set_canvas_container_ref = (element) => {

        if(element === null) {return}

        this.setState({_canvas_container: element}, () => {

            this._update_canvas_container_size();
        });
    };

    _set_canvas_wrapper_ref = (element) => {

        if(element === null) {return}

        this.setState({_canvas_wrapper: element});
    };

    _set_canvas_wrapper_overflow_ref = (element) => {

        if(element === null) {return}

        this.canvas_pos.set_notifiers(this._request_force_update, this._handle_canvas_wrapper_overflow_context_menu, this._handle_canvas_mouse_move, this._handle_canvas_mouse_up, this._handle_canvas_mouse_down, this._handle_canvas_middle);
        this.canvas_pos.init_speed_interval();
        element.addEventListener("wheel", this._handle_wheel, {capture: true});
        element.addEventListener("pointerdown", this._handle_pointer_down, {capture: true});
        element.addEventListener("pointermove", this._handle_pointer_move, {capture: true});
        element.addEventListener("pointerup", this._handle_pointer_up, {capture: true});
        element.addEventListener("pointercancel", this._handle_pointer_up, {capture: true});
        element.addEventListener("pointerout", this._handle_pointer_up, {capture: true});
        element.addEventListener("pointerleave", this._handle_pointer_up, {capture: true});

        this.setState({_canvas_wrapper_overflow: element});
    };

    componentWillUnmount() {

        try {
            window.removeEventListener("resize", this._update_canvas_container_size);

            if(this.sraf.get_state().is_mobile_or_tablet && this.state._device_motion === true){
                window.removeEventListener("devicemotion", this._handle_motion_changes);
            }
        }catch (e) {}

        try {
            const { _canvas_wrapper_overflow } = this.state;
            _canvas_wrapper_overflow.removeEventListener("wheel", this._handle_wheel);
            _canvas_wrapper_overflow.removeEventListener("pointerdown", this._handle_pointer_down);
            _canvas_wrapper_overflow.removeEventListener("pointermove", this._handle_pointer_move);
            _canvas_wrapper_overflow.removeEventListener("pointerup", this._handle_pointer_up);
            _canvas_wrapper_overflow.removeEventListener("pointercancel", this._handle_pointer_up);
            _canvas_wrapper_overflow.removeEventListener("pointerout", this._handle_pointer_up);
            _canvas_wrapper_overflow.removeEventListener("pointerleave", this._handle_pointer_up);
        } catch(e) {}

        this.state._intervals.forEach((i) => {

            clearInterval(i);
        });

        delete this.hasnt_been_mount;
    }
    
    _handle_wheel = (event) => {

        this.canvas_pos.handle_wheel(event);
    };
    _handle_pointer_down = (event) => {

        this.canvas_pos.handle_pointer_down(event);
    };
    _handle_pointer_move = (event) => {

        this.canvas_pos.handle_pointer_move(event);
    };
    _handle_pointer_up = (event) => {

        this.canvas_pos.handle_pointer_up(event);
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

    exchange_pixel_color = (old_color, new_color) => {

        this._exchange_pixel_color(old_color, new_color);
    };

    _exchange_pixel_color = (old_color, new_color) => {

        const { _s_pxl_colors, _s_pxls, _layer_index } = this.state;


        let pxl_colors_copy = Array.from(_s_pxl_colors[_layer_index]);
        let pxls_copy = Array.from(_s_pxls[_layer_index]);

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

        [pxls_copy, pxl_colors_copy] = this.color_conversion.clean_duplicate_colors(pxls_copy, pxl_colors_copy);

        let ns_pxl_colors = this.state._s_pxl_colors;
        ns_pxl_colors[_layer_index] = pxl_colors_copy;

        let ns_pxls = this.state._s_pxls;
        ns_pxls[_layer_index] = pxls_copy;

        this.setState({_s_pxls: ns_pxls, _s_pxl_colors: ns_pxl_colors, _last_action_timestamp: Date.now()}, () => {

            this._update_canvas();
        });

    };

    _handle_canvas_mouse_down = (event) => {

        const { hide_canvas_content, tool, pxl_width, pxl_height, pxl_current_opacity, bucket_threshold, select_mode } = this.state;
        const pxl_current_color = this.color_conversion.to_uint32_from_hex(this.color_conversion.format_hex_color(this.state.pxl_current_color));
        const { event_button } = this.canvas_pos.get_pointer_state();
        const event_which = event_button + 1;

        let [ pos_x, pos_y ] = [ -1, -1 ];

        if(this.state._pxls_hovered !== -1 && event === null) {

            const hover_pos_x = this.state._pxls_hovered % pxl_width;
            const hover_pos_y = (this.state._pxls_hovered - hover_pos_x) / pxl_width;
            [ pos_x, pos_y ] = [hover_pos_x, hover_pos_y];

        }else if(event) {

            [ pos_x, pos_y ] = this.canvas_pos.get_canvas_pos_from_event(event.pageX, event.pageY);
        }

        if(pos_x === -1 || pos_y === -1) { return; }

        let { _shape_index_a, _select_shape_index_a, _shape_index_b, _select_shape_index_b } = this.state;
        let { _pxl_indexes_of_selection } = this.state;
        const pxl_index = (pos_y * pxl_width) + pos_x;
        const { _s_pxls, _s_pxl_colors, _layer_index, hue, _layers } = this.state;
        const pxl_color_index = _s_pxls[_layer_index][pxl_index];

        if (event_which === -1) {

            this.setState({_pxls_hovered: pxl_index}, () => {

                this._update_canvas();
            });
            return;
        }

        if (event_which === 1) {

            // Left mouse button was clicked
            this._request_force_update(true, true);
        }else if(event_which === 3) {

            _shape_index_a = -1;
            _select_shape_index_a = -1;
            _shape_index_b = -1;
            _select_shape_index_b = -1;
        }

        const { _imported_image_pxls } = this.state;

        if(!hide_canvas_content) {

            const pxls_copy_immutable = Array.from(_s_pxls[_layer_index]);
            let pxls_copy = _s_pxls[_layer_index];
            let pxl_colors_copy = Array.from(_s_pxl_colors[_layer_index]);

            const pxl_color = pxl_colors_copy[pxl_color_index];
            const pxl_color_new = this.color_conversion.blend_colors(pxl_color, pxl_current_color, pxl_current_opacity, true, false);

            // Eventually add current color to color list
            if(!pxl_colors_copy.includes(pxl_color_new)){

                pxl_colors_copy.push(pxl_color_new);
            }

            const new_color_index = pxl_colors_copy.indexOf(pxl_color_new);

            if(_imported_image_pxls.length > 0 && event_which === 1){

                this.setState({_imported_image_move_from: [pos_x, pos_y]});

            }else if((event_which === 2) || (tool === "MOVE" && _imported_image_pxls.length <= 0 && (event_which === 1 || event_which === -1))){

                this.setState({_image_move_from: [event.x, event.y]});

            }else if(tool === "MINE" && event_which === 1){

                this.setState({_mine_index: pxl_index});

            }else if(tool === "PICKER" && event_which === 1) {

                const pixel_color_hex = this.get_pixel_color_from_pos(pos_x, pos_y);
                this._notify_current_color_change(pixel_color_hex);
                this._notify_relevant_action_event(event, pixel_color_hex, 1);
            }else if (tool === "EXCHANGE" && event_which === 1) {

                const pixel_color_hex = _s_pxl_colors[_layer_index][pxl_color_index];
                this._exchange_pixel_color(pixel_color_hex, pxl_current_color);
                this._notify_relevant_action_event(event, pxl_current_color, 1);

            }else if(tool === "LINE" || tool === "RECTANGLE" || tool === "ELLIPSE"){

                if(_shape_index_a === -1) {

                    if(event_which === 1) {

                        this.setState({_shape_index_a: pxl_index}, () => {

                            this._update_canvas();
                        });
                    }else {

                        this.setState({_shape_index_a}, () => {

                            this._update_canvas();
                        });
                    }
                }else {

                    let { _s_pxls, _s_pxl_colors } = this.state;
                    [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] =
                        tool === "LINE" ?
                            this._get_pixels_palette_and_list_from_line(pxls_copy, _shape_index_a, pxl_index, pxl_colors_copy, pxl_current_color, pxl_current_opacity):
                            tool === "RECTANGLE" ?
                                this._get_pixels_palette_and_list_from_rectangle(pxls_copy, _shape_index_a, pxl_index, pxl_colors_copy, pxl_current_color, pxl_current_opacity):
                                tool === "ELLIPSE" ?
                                    this._get_pixels_palette_and_list_from_ellipse(pxls_copy, _shape_index_a, pxl_index, pxl_colors_copy, pxl_current_color, pxl_current_opacity):
                                    [pxls_copy, pxl_colors_copy];

                    this.setState({_s_pxls, _s_pxl_colors, _shape_index_a: -1, _last_action_timestamp: Date.now()}, () => {

                        this._update_canvas();
                    });
                    this._notify_relevant_action_event(event, "#ffffffff", .6);
                }


            }else if(tool === "SELECT LINE" || tool === "SELECT RECTANGLE" || tool === "SELECT ELLIPSE"){

                if(_select_shape_index_a === -1) {

                    if(event_which === 1) {

                        this.setState({_select_shape_index_a: pxl_index}, () => {

                            this._update_canvas();
                        });
                    }else {

                        this.setState({_select_shape_index_a}, () => {

                            this._update_canvas();
                        });
                    }
                }else {

                    let pixel_indexes =
                        tool === "SELECT LINE" ?
                            this._get_pixels_palette_and_list_from_line(pxls_copy, _select_shape_index_a, pxl_index)[2]:
                            tool === "SELECT RECTANGLE" ?
                                this._get_pixels_palette_and_list_from_rectangle(pxls_copy, _select_shape_index_a, pxl_index)[2]:
                                tool === "SELECT ELLIPSE" ?
                                    this._get_pixels_palette_and_list_from_ellipse(pxls_copy, _select_shape_index_a, pxl_index)[2]:
                                    this._get_pixels_palette_and_list_from_ellipse(pxls_copy, _select_shape_index_a, pxl_index)[2];

                    if(select_mode === "REPLACE") {

                        _pxl_indexes_of_selection.clear();
                    }

                    if(select_mode === "ADD" || select_mode === "REPLACE") {

                        pixel_indexes.forEach(function(pxl){_pxl_indexes_of_selection.add(pxl)});
                    }else {

                        pixel_indexes.forEach(function(pxl){_pxl_indexes_of_selection.delete(pxl)});
                    }
                    pixel_indexes.clear();

                    this.setState({_pxl_indexes_of_selection, _select_shape_index_a: -1, _last_action_timestamp: Date.now()}, () => {

                        this._update_canvas();
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
                    this.setState({ _pxl_indexes_of_selection, _paint_or_select_hover_actions_latest_index: pxl_index, _last_action_timestamp: Date.now()}, () => {

                        this._update_canvas();
                        this._notify_is_something_selected();
                    });
                }else if(tool === "SELECT PATH") {

                    // Update pixels list and pixel colours
                    this.setState({ _pxl_indexes_of_selection, _paint_or_select_hover_actions_latest_index: pxl_index, _last_action_timestamp: 1 / 0}, () => {

                        this._update_canvas();
                        this._notify_is_something_selected();
                    });
                }


            }else if((tool === "SET PENCIL MIRROR") && event_which === 1) {

                this.setState({ _pencil_mirror_index: pxl_index, _last_action_timestamp: Date.now()}, () => {

                    this._update_canvas();
                });

            }else if((tool === "PENCIL" || tool === "PENCIL PERFECT" || tool === "CONTOUR") && event_which === 1) {

                const { pencil_mirror_mode, _pencil_mirror_index } = this.state;

                const pencil_mirror_x = _pencil_mirror_index % pxl_width;
                const pencil_mirror_y = (_pencil_mirror_index - pencil_mirror_x) / pxl_width;

                let pixel_stack = new Set([[pos_x, pos_y]]);

                if(pencil_mirror_mode === "VERTICAL" || pencil_mirror_mode === "BOTH") {

                    const y = pos_y - (pos_y - pencil_mirror_y) * 2;
                    const x = pos_x;

                    if(x >= 0 && x < pxl_width && y >= 0 && y <= pxl_height) {

                        pixel_stack.add([x, y]);
                        const index = y * pxl_width + x;

                        const v_pxl_color_index = _s_pxls[_layer_index][index];
                        const v_pxl_color = pxl_colors_copy[v_pxl_color_index];
                        const v_pxl_color_new = this.color_conversion.blend_colors(v_pxl_color, pxl_current_color, pxl_current_opacity, true, false);

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
                            const v_pxl_color_new = this.color_conversion.blend_colors(v_pxl_color, pxl_current_color, pxl_current_opacity, true, false);

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

                let ns_pxl_colors = this.state._s_pxl_colors;
                ns_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors_copy);

                let ns_pxls = this.state._s_pxls;
                ns_pxls[_layer_index] = Array.from(pxls_copy);

                // Update pixels list and pixel colours
                this.setState({
                    _s_pxls: ns_pxls,
                    _s_pxl_colors: ns_pxl_colors,
                    _paint_or_select_hover_pxl_indexes: new Set([pxl_index]),
                    _paint_or_select_hover_actions_latest_index: pxl_index,
                    _paint_hover_old_pxls_snapshot: Array.from(this.state._s_pxls[_layer_index]),
                    _last_action_timestamp: Date.now()
                }, () => {

                    this._update_canvas();
                });

            }else if ((tool === "BUCKET" || tool === "HUE BUCKET" || tool === "SELECT COLOR THRESHOLD" || tool === "BORDER") && event_which === 1) {

                const { _old_pxls } = this.state;
                const old_pxls_copy = Array.from(_old_pxls);

                const pixel_start = [pos_x, pos_y];
                const index_color_start = old_pxls_copy[pxl_index];
                const pxl_color_start = pxl_colors_copy[index_color_start];

                let interpolated_colors_hue_bucket = [];

                const [c_s_r, c_s_g, c_s_b, c_s_a] = this.color_conversion.to_rgba_from_uint32(pxl_color_start);
                const [c_s_h, c_s_s, c_s_l, c_s_o] = this.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(c_s_r, c_s_g, c_s_b, c_s_a));
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

                            return this._match_color(color_a, color_b, bucket_threshold);
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

                                    let [r, g, b, a] = this.color_conversion.to_rgba_from_uint32(hue_bucket_old_color);
                                    let [h, s, l, o] = this.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(r, g, b, a));

                                    h = (h + hue_difference_with_color_start) % 360;

                                    [r, g, b, a] = this.color_conversion.to_rgba_from_hsla(Array.of(h, s, l, o));
                                    const hue_bucket_new_color = this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(r, g, b, a));

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

                                const current_pxl_new_color = this.color_conversion.blend_colors(pxl_colors_copy[pxls_copy[index]], pxl_current_color, pxl_current_opacity, false, false);
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

                    this._get_border_from_selection(colored_pxl_indexes).forEach((pxl_index) => {

                        color_pixel(pxl_index, true);
                    });

                    let {_s_pxls, _s_pxl_colors} = this.state;
                    [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = this.color_conversion.clean_duplicate_colors(pxls_copy, pxl_colors_copy);


                    // Update pixels list and pixel colours
                    this.setState({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}, () => {

                        this._update_canvas();
                    });

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

                    this.setState({_pxl_indexes_of_selection, _last_action_timestamp: Date.now()}, () => {

                        this._update_canvas();
                        this._notify_is_something_selected();
                    });

                }else if(tool === "BUCKET" || tool === "HUE BUCKET"){

                    let {_s_pxls, _s_pxl_colors} = this.state;
                    [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = this.color_conversion.clean_duplicate_colors(pxls_copy, pxl_colors_copy);

                    // Update pixels list and pixel colours
                    this.setState({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}, () => {

                        this._update_canvas();
                    });
                    this._notify_relevant_action_event(event, pxl_current_color, 1);
                }

            }else if ((tool === "SELECT COLOR") && event_which === 1) {

                const { _s_pxls } = this.state;
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

                this.setState({_pxl_indexes_of_selection, _last_action_timestamp: Date.now()}, () => {

                    this._update_canvas();
                    this._notify_is_something_selected();
                });

            }
        }
    };

    set_selection_by_colors = (color, threshold) => {

        const { _s_pxl_colors, _s_pxls, _layer_index } = this.state;
        let { _pxl_indexes_of_selection } = this.state;
        const _pxls_copy = Array.from(_s_pxls[_layer_index]);


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

        this.setState({_pxl_indexes_of_selection, _last_action_timestamp: Date.now()}, () => {

            this._update_canvas();
            this._notify_is_something_selected();
        });

    }

    _get_pixels_palette_and_list_from_line = (pxls, index_a, index_b, pxl_colors = [], pxl_color_new = null, pxl_current_opacity = null) => {

        pxls = Array.from(pxls);
        pxl_colors = Array.from(pxl_colors);
        let pxl_indexes = new Set();

        const { pxl_width } = this.state;

        let x_behind = index_a % pxl_width;
        let y_behind = (index_a - x_behind) / pxl_width;

        const last_x_after = index_b % pxl_width;
        const last_y_after = (index_b - last_x_after) / pxl_width;

        // PAINT HACK: compute the pixel between the previous and latest paint by hover pixel (Bresenham???s Line Algorithm)
        let dx = Math.abs(last_x_after - x_behind);
        let dy = Math.abs(last_y_after - y_behind);
        let sx = (x_behind < last_x_after) ? 1 : -1;
        let sy = (y_behind < last_y_after) ? 1 : -1;
        let err = dx - dy;

        while(true){

            const current_pxl_index = y_behind * pxl_width + x_behind;

            if(pxl_colors !== [] && pxl_color_new !== null && pxl_current_opacity !== null) { // We can compute pxls and pxl_colors

                const current_pxl_color_index = pxls[current_pxl_index];
                const current_pxl_color = pxl_colors[current_pxl_color_index];
                const current_pxl_new_color = this.color_conversion.blend_colors(current_pxl_color, pxl_color_new, pxl_current_opacity, false, false);

                // Eventually add current color to color list
                if(!pxl_colors.includes(current_pxl_new_color)){

                    pxl_colors.push(current_pxl_new_color);
                }

                pxls[current_pxl_index] = pxl_colors.indexOf(current_pxl_new_color);
            }

            pxl_indexes.add(current_pxl_index);

            if(x_behind === last_x_after && y_behind === last_y_after) { break; }

            const e2 = 2 * err;

            if (e2 > - dy) {

                err -= dy;
                x_behind  += sx;
            }
            if (e2 < dx) {

                err += dx;
                y_behind  += sy;
            }
        }

        return Array.of( Array.from(pxls), Uint32Array.from(pxl_colors), pxl_indexes );
    }

    _get_pixels_palette_and_list_from_rectangle = (pxls, index_a, index_b, pxl_colors = [], pxl_color_new = null, pxl_current_opacity = null) => {

        pxls = Array.from(pxls);
        pxl_colors = Array.from(pxl_colors);
        let pxl_indexes = new Set();

        const { pxl_width } = this.state;

        const x_behind = index_a % pxl_width;
        const y_behind = (index_a - x_behind) / pxl_width;

        const x_after = index_b % pxl_width;
        const y_after = (index_b - x_after) / pxl_width;

        const rectangle_width = Math.abs(x_behind - x_after) + 1;
        const rectangle_height = Math.abs(y_behind - y_after) + 1;
        const pixel_number_in_rectangle = rectangle_width * rectangle_height;

        const rectangle_top_left_x = Math.max(x_behind, x_after) - (rectangle_width - 1);
        const rectangle_top_left_y = Math.max(y_behind, y_after) - (rectangle_height - 1);

        for(let i = 0; i < pixel_number_in_rectangle; i++){

            const inside_rectangle_x = i % rectangle_width;
            const inside_rectangle_y = (i - inside_rectangle_x) / rectangle_width;

            const current_pxl_index = (rectangle_top_left_y + inside_rectangle_y) * pxl_width + (rectangle_top_left_x + inside_rectangle_x);

            if(pxl_colors !== [] && pxl_color_new !== null && pxl_current_opacity !== null) { // We can compute pxls and pxl_colors

                const current_pxl_color_index = pxls[current_pxl_index];
                const current_pxl_color = pxl_colors[current_pxl_color_index];
                const current_pxl_new_color = this.color_conversion.blend_colors(current_pxl_color, pxl_color_new, pxl_current_opacity, false, false);

                // Eventually add current color to color list
                if(!pxl_colors.includes(current_pxl_new_color)){

                    pxl_colors.push(current_pxl_new_color);
                }

                pxls[current_pxl_index] = pxl_colors.indexOf(current_pxl_new_color);
            }

            pxl_indexes.add(current_pxl_index);

        }

        return Array.of( Array.from(pxls), Uint32Array.from(pxl_colors), new Set(pxl_indexes.keys()) );
    }

    _get_pixels_palette_and_list_from_path = (pxls, path_indexes, pxl_colors = [], pxl_color_new = null, pxl_current_opacity = null) => {

        const { pxl_width, pxl_height } = this.state;
        pxls = Array.from(pxls);
        pxl_colors = Array.from(pxl_colors);
        let pxl_indexes = new Set();

        let [ctx, canvas] = this._get_new_ctx_from_canvas(pxl_width, pxl_height);
        ctx.lineWidth = 0;
        ctx.beginPath();

        path_indexes.forEach((pxl_index, index) => {

            const x = pxl_index % pxl_width;
            const y = (pxl_index - x) / pxl_width

            if(index === 0) {

                ctx.moveTo(x, y);
            }else {

                ctx.lineTo(x, y);
            }

        });

        ctx.strokeStyle = "#ffffffff";
        ctx.fillStyle = "#ffffffff";
        ctx.stroke();
        ctx.fill();

        let {new_pxl_colors, new_pxls} = this._get_pixels_palette_and_list_from_image_data(ctx.getImageData(0, 0, pxl_width, pxl_height), true);

        for(let i = 0; i < new_pxl_colors.length; i++){

            const inside_shape_x = i % pxl_width;
            const inside_shape_y = (i - inside_shape_x) / pxl_width;

            const current_pxl_index = inside_shape_y * pxl_width + inside_shape_x;

            if(new_pxls[current_pxl_index] === new_pxl_colors.indexOf(255*255*255*255) || path_indexes.has(i)) {

                pxl_indexes.add(current_pxl_index);
            }
        }

        for(let i = 0; i < new_pxls.length; i++){

            if(!path_indexes.has(i)) {

                let up, right, bottom, left;

                up = i - pxl_width; up = up < 0 ? -1: up;
                right = i + 1; right = right % pxl_width === 0 ? -1: right;
                bottom = i + pxl_width; bottom = bottom > (pxl_width * pxl_height) ? -1: bottom;
                left = i - 1; left = left % pxl_width === pxl_width - 1 ? -1: left;

                if(pxl_indexes.has(up) && pxl_indexes.has(right) && pxl_indexes.has(bottom) && pxl_indexes.has(left)) {

                    pxl_indexes.add(i);
                }
            }
        }

        new_pxl_colors = null; new_pxls = null;
        if( pxl_colors !== [] && pxl_color_new !== null && pxl_current_opacity !== null) {

            pxl_indexes.forEach((current_pxl_index) => {

                const current_pxl_color_index = pxls[current_pxl_index];
                const current_pxl_color = pxl_colors[current_pxl_color_index];
                const current_pxl_new_color = this.color_conversion.blend_colors(current_pxl_color, pxl_color_new, pxl_current_opacity, false, false);

                // Eventually add current color to color list
                if(!pxl_colors.includes(current_pxl_new_color)){

                    pxl_colors.push(current_pxl_new_color);
                }

                pxls[current_pxl_index] = pxl_colors.indexOf(current_pxl_new_color);

            });
        }

        return Array.of( Array.from(pxls), Uint32Array.from(pxl_colors), new Set(pxl_indexes.keys()) );
    }

    _get_pixels_palette_and_list_from_ellipse = (pxls, index_a, index_b, pxl_colors = [], pxl_color_new = null, pxl_current_opacity = null) => {

        const { pxl_width, pxl_height } = this.state;
        pxls = Array.from(pxls);
        pxl_colors = Array.from(pxl_colors);
        let pxl_indexes = new Set();

        let x_behind = index_a % pxl_width;
        let y_behind = (index_a - x_behind) / pxl_width;
        let x_after = (index_b % pxl_width);
        let y_after = (( index_b - x_after) / pxl_width);

        let ellipse_width = Math.abs(x_behind - x_after) + 1;
        let ellipse_height = Math.abs(y_behind - y_after) + 1;

        const ellipse_top_left_x = Math.max(x_behind, x_after) - (ellipse_width - 1);
        const ellipse_top_left_y = Math.max(y_behind, y_after) - (ellipse_height - 1);

        let ellipse_rayon_x = (ellipse_width) / 2.0;
        let ellipse_rayon_y = (ellipse_height) / 2.0;

        const ellipse_middle_x = ellipse_rayon_x + ellipse_top_left_x;
        const ellipse_middle_y = ellipse_rayon_y + ellipse_top_left_y;

        let [ellipse_context, ellipse_canvas] = this._get_new_ctx_from_canvas(pxl_width, pxl_height);

        ellipse_context.save();
        ellipse_context.translate(ellipse_middle_x, ellipse_middle_y);
        ellipse_context.rotate(0);
        ellipse_context.scale(ellipse_rayon_x, ellipse_rayon_y);
        ellipse_context.arc(0, 0, 1, 0, 2 * Math.PI);
        ellipse_context.restore();

        ellipse_context.fillStyle = "#ffffffff";
        ellipse_context.fill();

        let canvas_image_data = ellipse_context.getImageData(0, 0, pxl_width, pxl_height);
        let {new_pxl_colors, new_pxls} = this._get_pixels_palette_and_list_from_image_data(canvas_image_data, true, 0);
        ellipse_context = null;
        ellipse_canvas = null;
        canvas_image_data = null;

        for(let i = 0; i < new_pxls.length; i++){

            const inside_ellipse_x = i % ellipse_width;
            const inside_ellipse_y = (i - inside_ellipse_x) / ellipse_width;

            const current_pxl_index = (ellipse_top_left_y + inside_ellipse_y) * pxl_width + (ellipse_top_left_x + inside_ellipse_x);

            if(new_pxls[current_pxl_index] === new_pxl_colors.indexOf(255*255*255*255)) {

                const current_pxl_color_index = pxls[current_pxl_index];

                if(pxl_colors !== [] && pxl_color_new !== null && pxl_current_opacity !== null) { // We can compute pxls and pxl_colors

                    const current_pxl_color = pxl_colors[current_pxl_color_index];
                    const current_pxl_new_color = this.color_conversion.blend_colors(current_pxl_color, pxl_color_new, pxl_current_opacity, false, false);

                    // Eventually add current color to color list
                    if(!pxl_colors.includes(current_pxl_new_color)){

                        pxl_colors.push(current_pxl_new_color);
                    }

                    const current_pxl_new_color_index = pxl_colors.indexOf(current_pxl_new_color);
                    pxls[current_pxl_index] = current_pxl_new_color_index;
                }
                pxl_indexes.add(current_pxl_index);
            }
        }

        new_pxl_colors = null;
        new_pxls = null;

        return Array.of( Array.from(pxls), Uint32Array.from(pxl_colors), new Set(pxl_indexes.keys()) );
    }

    _should_remove_not_perfect_second_latest_pixel_from_array = (_paint_or_select_hover_pxl_indexes) => {

        const { pxl_width } = this.state;

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
    };

    get_pixel_color_from_pos = (x, y) => {

        const { pxl_height, pxl_width, _s_pxls, _s_pxl_colors, _layers } = this.state;

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
            const [r, g, b, a] = this.color_conversion.to_rgba_from_uint32(layer_pixel_color);

            if(a === 255) {

                start_i = i;
                break;
            }

        }

        let pixel_color_uint32 = 0;

        for (let i = start_i; i < _s_pxl_colors.length ; i++) {

            if(!_layers[i].hidden) {

                const layer_pixel_color = layer_pixel_colors[i];

                pixel_color_uint32 = this.color_conversion.blend_colors(pixel_color_uint32, layer_pixel_color, parseFloat(_layers[i].opacity), false, false);
            }
        }

        return this.color_conversion.to_hex_from_uint32(pixel_color_uint32);
    };

    _handle_canvas_wrapper_overflow_context_menu = (event) => {

        const [pos_x, pos_y] = this.canvas_pos.get_canvas_pos_from_event(event.pageX, event.pageY);
        const {_s_pxl_colors, _layer_index, _s_pxls, pxl_width} = this.state;
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

    _handle_canvas_middle = () => {

        this._update_canvas();
    };

    _handle_canvas_mouse_move = (event) => {

        const { tool, pxl_width, pxl_height, _pxls_hovered, hide_canvas_content, no_actions } = this.state;
        let { _pxl_indexes_of_selection, _imported_image_pxls } = this.state;
        const { event_button, mouse_down } = this.canvas_pos.get_pointer_state();
        const event_which = event_button+1;

        const [ pos_x, pos_y ] = this.canvas_pos.get_canvas_pos_from_event(event.pageX, event.pageY);

        if(pos_x === -1 || pos_y === -1) {
            this._notify_position_change(event, {x: pos_x, y: pos_y});
            return;
        }

        if(no_actions) {
            this._notify_position_change(event, {x: pos_x, y: pos_y});
            return;
        }

        const pxl_index = (pos_y * pxl_width) + pos_x;

        if(pxl_index !== _pxls_hovered && !hide_canvas_content) {

            if(_imported_image_pxls.length > 0){

                let { _imported_image_scale_delta_x, _imported_image_scale_delta_y, _imported_image_start_x, _imported_image_start_y, _imported_image_width, _imported_image_height } = this.state;
                const _imported_image_final_width = _imported_image_width + _imported_image_scale_delta_x;
                const _imported_image_final_height = _imported_image_height + _imported_image_scale_delta_y;

                const [from_x, from_y] = this.state._imported_image_move_from;
                const old_pxl_index = (from_y * pxl_width) + from_x;

                const image_imported_resizer_index = (_imported_image_start_x + _imported_image_final_width) + (_imported_image_start_y + _imported_image_final_height) * pxl_width;
                const _is_on_resize_element = pxl_index === image_imported_resizer_index || old_pxl_index === image_imported_resizer_index;

                if(event_which === 1 && mouse_down) {

                    const x_difference = pos_x - from_x;
                    const y_difference = pos_y - from_y;
                    let _imported_image_move_from = [pos_x, pos_y];

                    if(!_is_on_resize_element) {

                        _imported_image_start_x += x_difference;
                        _imported_image_start_x = _imported_image_start_x < -_imported_image_final_width ? -_imported_image_final_width: _imported_image_start_x;
                        _imported_image_start_x = _imported_image_start_x >= pxl_width ? pxl_width: _imported_image_start_x;

                        _imported_image_start_y += y_difference;
                        _imported_image_start_y = _imported_image_start_y < -_imported_image_final_height ? -_imported_image_final_height: _imported_image_start_y;
                        _imported_image_start_y = _imported_image_start_y >= pxl_height ? pxl_height: _imported_image_start_y;
                    }else {

                        let _new_imported_image_scale_delta_x = _imported_image_scale_delta_x + x_difference;
                        let _new_imported_image_scale_delta_y = _imported_image_scale_delta_y + y_difference;

                        _new_imported_image_scale_delta_x = Math.max(_new_imported_image_scale_delta_x, -(_imported_image_width - 1));
                        _new_imported_image_scale_delta_y = Math.max(_new_imported_image_scale_delta_y, -(_imported_image_height - 1));

                        _imported_image_move_from = [
                            from_x + (_new_imported_image_scale_delta_x - _imported_image_scale_delta_x),
                            from_y + (_new_imported_image_scale_delta_y - _imported_image_scale_delta_y),
                        ];

                        _imported_image_scale_delta_x = _new_imported_image_scale_delta_x;
                        _imported_image_scale_delta_y = _new_imported_image_scale_delta_y;
                    }

                    this.setState({
                        _pxls_hovered: pxl_index,
                        _is_on_resize_element,
                        _mouse_inside: true,
                        _imported_image_start_x,
                        _imported_image_start_y,
                        _imported_image_scale_delta_x,
                        _imported_image_scale_delta_y,
                        _imported_image_move_from,
                    }, () => {

                        this._update_canvas();
                        this._notify_position_change(event, {x:pos_x, y: pos_y});
                    });
                }else {

                    this.setState({
                        _pxls_hovered: pxl_index,
                        _is_on_resize_element,
                        _mouse_inside: true
                    }, () => {

                        this._notify_position_change(event, {x:pos_x, y: pos_y});
                    });
                }

            }else if((tool === "PENCIL" || tool === "PENCIL PERFECT" || tool === "CONTOUR") && event_which === 1 && mouse_down){

                let { _last_action_timestamp, _paint_or_select_hover_pxl_indexes, _paint_or_select_hover_pxl_indexes_exception, _paint_or_select_hover_actions_latest_index, _s_pxls, _s_pxl_colors, _layer_index, pxl_current_opacity } = this.state;
                const { _paint_hover_old_pxls_snapshot } = this.state;
                const _paint_or_select_hover_pxl_indexes_copy = [..._paint_or_select_hover_pxl_indexes];

                // PAINT HACK: compute the pixel between the previous and latest paint by hover pixel (Bresenham???s Line Algorithm)
                if(_paint_or_select_hover_actions_latest_index === -1) {

                    _paint_or_select_hover_actions_latest_index = pxl_index;
                }

                const pxl_current_color = this.color_conversion.to_uint32_from_hex(this.color_conversion.format_hex_color(this.state.pxl_current_color));
                let new_drawn_pxl_indexes;
                [_s_pxls[_layer_index], _s_pxl_colors[_layer_index], new_drawn_pxl_indexes] = this._get_pixels_palette_and_list_from_line(_s_pxls[_layer_index], _paint_or_select_hover_actions_latest_index, pxl_index, _s_pxl_colors[_layer_index], pxl_current_color, pxl_current_opacity);

                const { pencil_mirror_mode, _pencil_mirror_index } = this.state;

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
                    _paint_or_select_hover_pxl_indexes_exception.forEach((ie) => {

                        _paint_or_select_hover_pxl_indexes.delete(ie);
                    });

                    if(this._should_remove_not_perfect_second_latest_pixel_from_array(_paint_or_select_hover_pxl_indexes)) {

                        const second_latest_pixel_drawn = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size - 2];
                        _paint_or_select_hover_pxl_indexes.delete(second_latest_pixel_drawn);
                        _paint_or_select_hover_pxl_indexes_exception.add(second_latest_pixel_drawn);

                        let pixel_index_stack = new Set(Array.of(second_latest_pixel_drawn));

                        pixel_index_stack.keys().forEach((pixel_stacked) => {

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

                    Array.from(pixel_stack).forEach((pixel_stacked) => {

                        const [s_pos_x, s_pos_y] = pixel_stacked;

                        const y = s_pos_y - (s_pos_y - pencil_mirror_y) * 2;
                        const x = s_pos_x;

                        if(x >= 0 && x < pxl_width && y >= 0 && y <= pxl_height) {

                            pixel_stack.add([x, y]);
                        }
                    });
                }

                if(pencil_mirror_mode === "HORIZONTAL" || pencil_mirror_mode === "BOTH") {

                    Array.from(pixel_stack).forEach((pixel_pos) => {

                        const y = pixel_pos[1];
                        const x = pixel_pos[0] - (pixel_pos[0] - pencil_mirror_x) * 2;

                        if(x >= 0 && x < pxl_width && y >= 0 && y <= pxl_height) {

                            pixel_stack.add([x, y]);
                        }
                    });
                }

                Array.from(pixel_stack).forEach((pixel_pos) => {

                    const y = pixel_pos[1];
                    const x = pixel_pos[0];

                    if(x >= 0 && x < pxl_width && y >= 0 && y <= pxl_height) {

                        const index = y * pxl_width + x;

                        const v_pxl_color_index = _s_pxls[_layer_index][index];
                        const v_pxl_color = _s_pxl_colors[_layer_index][v_pxl_color_index];
                        const v_pxl_color_new = this.color_conversion.blend_colors(v_pxl_color, pxl_current_color, pxl_current_opacity, true, false);

                        // Eventually add current color to color list
                        if (!_s_pxl_colors[_layer_index].includes(v_pxl_color_new)) {

                            let pxl_colors = Array.from(_s_pxl_colors[_layer_index]);
                            pxl_colors.push(v_pxl_color_new);

                            _s_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);
                        }


                        _s_pxls[_layer_index][index] = _s_pxl_colors[_layer_index].indexOf(v_pxl_color_new);
                    }
                });

                // Update pixels list and pixel colours
                this.setState({
                    _pxls_hovered: pxl_index,
                    _mouse_inside: true,
                    _paint_or_select_hover_pxl_indexes,
                    _paint_or_select_hover_pxl_indexes_exception,
                    _s_pxls,
                    _s_pxl_colors,
                    _paint_or_select_hover_actions_latest_index: pxl_index,
                    _last_action_timestamp
                }, () =>{

                    this._update_canvas();
                    this._notify_position_change(event, {x:pos_x, y: pos_y});
                });

            }else if((tool === "SELECT PIXEL" || tool === "SELECT PIXEL PERFECT" || tool === "SELECT PATH") && event_which === 1 && mouse_down) {

                let { _last_action_timestamp, _s_pxls, _paint_or_select_hover_actions_latest_index, _paint_or_select_hover_pxl_indexes, select_mode, _layer_index } = this.state;
                const { _select_hover_old_pxls_snapshot } = this.state;

                // PAINT HACK: compute the pixel between the previous and latest paint by hover pixel (Bresenham???s Line Algorithm)
                if(_paint_or_select_hover_actions_latest_index === -1) {

                    _paint_or_select_hover_actions_latest_index = pxl_index;
                }

                const palette_and_list = this._get_pixels_palette_and_list_from_line(_s_pxls[_layer_index], _paint_or_select_hover_actions_latest_index, pxl_index);
                const new_drawn_pxl_indexes = Array.from(palette_and_list[2]);

                if(tool === "SELECT PATH") {

                    _last_action_timestamp = 1 / 0;
                    _paint_or_select_hover_pxl_indexes = new Set([..._paint_or_select_hover_pxl_indexes, ...new_drawn_pxl_indexes]);

                }else if(tool === "SELECT PIXEL"){

                    _last_action_timestamp = Date.now();

                    _paint_or_select_hover_pxl_indexes = new Set([..._paint_or_select_hover_pxl_indexes, ...new_drawn_pxl_indexes]);

                }else if(tool === "SELECT PIXEL PERFECT") {

                    _last_action_timestamp = Date.now();

                    _paint_or_select_hover_pxl_indexes = new Set([..._paint_or_select_hover_pxl_indexes, ...new_drawn_pxl_indexes]);

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

                this.setState({
                    _pxls_hovered: pxl_index,
                    _mouse_inside: true,
                    _pxl_indexes_of_selection,
                    _paint_or_select_hover_pxl_indexes,
                    _paint_or_select_hover_actions_latest_index: pxl_index,
                    _last_action_timestamp}, () => {

                    this._update_canvas();
                    this._notify_is_something_selected();
                    this._notify_position_change(event, {x:pos_x, y: pos_y});
                });

            }else {

                const { _s_pxls, _layer_index } = this.state;

                this.setState({
                    _pxls_hovered: pxl_index,
                    _mouse_inside: true,
                    _paint_or_select_hover_actions_latest_index: -1,
                    _paint_hover_old_pxls_snapshot: Array.from(_s_pxls[_layer_index]),
                    _select_hover_old_pxls_snapshot: Uint32Array.from(_pxl_indexes_of_selection),
                    _paint_or_select_hover_pxl_indexes: new Set()
                }, () => {

                    this._update_canvas();
                    this._notify_position_change(event, {x:pos_x, y: pos_y});
                });

            }
        }else if(_pxls_hovered !== pxl_index) {

            this.setState({
                _pxls_hovered: pxl_index,
                _mouse_inside: true
            }, () => {

                this._update_canvas();
                this._notify_position_change(event, {x:pos_x, y: pos_y});
            });

        }
    };

    _handle_canvas_mouse_up = (event) => {

        let { _paint_or_select_hover_pxl_indexes, tool, _imported_image_pxls } = this.state;

        if(_imported_image_pxls.length > 0){

            this.setState({_imported_image_move_from: [-1, -1]});

        }else if(_paint_or_select_hover_pxl_indexes.size > 0 && tool === "CONTOUR") {

            let { _s_pxls, _s_pxl_colors, _layer_index, pxl_current_opacity, _paint_hover_old_pxls_snapshot } = this.state;
            let pxl_current_color = this.color_conversion.to_uint32_from_hex(this.color_conversion.format_hex_color(this.state.pxl_current_color));

            const first_drawn_pixel = [..._paint_or_select_hover_pxl_indexes][0];
            const last_drawn_pixel = [..._paint_or_select_hover_pxl_indexes][_paint_or_select_hover_pxl_indexes.size-1];

            const palette_and_list = this._get_pixels_palette_and_list_from_line(_s_pxls[_layer_index], first_drawn_pixel, last_drawn_pixel, _s_pxl_colors[_layer_index], pxl_current_color, pxl_current_opacity);
            const closing_path_line = Array.from(palette_and_list[2]);

            _paint_or_select_hover_pxl_indexes = new Set([..._paint_or_select_hover_pxl_indexes, ...closing_path_line]);

            const [ new_pxls, new_pxl_colors ] = this._get_pixels_palette_and_list_from_path(_paint_hover_old_pxls_snapshot, _paint_or_select_hover_pxl_indexes, _s_pxl_colors[_layer_index], pxl_current_color, pxl_current_opacity);
            _s_pxls[_layer_index] = Array.from(new_pxls);
            _s_pxl_colors[_layer_index] = Uint32Array.from(new_pxl_colors);
            this.setState({
                _s_pxls,
                _s_pxl_colors,
                _paint_or_select_hover_pxl_indexes: new Set(),
                _paint_or_select_hover_pxl_indexes_exception: new Set(),
                _paint_hover_old_pxls_snapshot: [],
                _last_action_timestamp: Date.now()
            }, () => {

                this._update_canvas();
            });

        }else if(_paint_or_select_hover_pxl_indexes.size > 0 && tool === "SELECT PATH") {

            let { _s_pxls, _pxl_indexes_of_selection, select_mode, _layer_index } = this.state;

            const first_drawn_pixel = [..._paint_or_select_hover_pxl_indexes][0];
            const last_drawn_pixel = [..._paint_or_select_hover_pxl_indexes][_paint_or_select_hover_pxl_indexes.size-1];

            const palette_and_list = this._get_pixels_palette_and_list_from_line(_s_pxls[_layer_index], first_drawn_pixel, last_drawn_pixel);
            const closing_path_line = Array.from(palette_and_list[2]);

            _paint_or_select_hover_pxl_indexes = new Set([..._paint_or_select_hover_pxl_indexes, ...closing_path_line]);

            const palette_and_list_from_path = this._get_pixels_palette_and_list_from_path(_s_pxls[_layer_index], _paint_or_select_hover_pxl_indexes);


            if(select_mode === "REPLACE") {

                _pxl_indexes_of_selection.clear();
            }

            palette_and_list_from_path[2].forEach((pxl) => {

                if(select_mode === "ADD" || select_mode === "REPLACE") {

                    _pxl_indexes_of_selection.add(pxl);
                }else {

                    _pxl_indexes_of_selection.delete(pxl);
                }

            });

            this.setState({
                _pxl_indexes_of_selection,
                _paint_or_select_hover_pxl_indexes: new Set(),
                _paint_or_select_hover_pxl_indexes_exception: new Set(),
                _last_action_timestamp: Date.now()
            }, () => {

                this._update_canvas();
                this._notify_is_something_selected();
            });


        }
    };

    _update_canvas = (force_update = false, do_not_cancel_animation = false) => {

        // Potentially cancel the latest animation frame (Clear old) and then request a new one that will maybe be rendered
        const { _loading_base64_img, dont_show_canvas_until_img_set, dont_show_canvas, but_show_canvas_once, has_shown_canvas_once, no_actions } = this.state;
        if(Boolean(_loading_base64_img.length === 0 && dont_show_canvas_until_img_set) || Boolean(dont_show_canvas && !Boolean(but_show_canvas_once && !has_shown_canvas_once))){return;}

        const { _s_pxl_colors, _s_pxls, _layer_index } = this.state;
        const _layers_simplified = this.state._layers.map(function(l) {
                return {
                    id: parseInt(l.id),
                    hash: String(l.hash),
                    name: String(l.name),
                    hidden: Boolean(l.hidden),
                    opacity: parseInt(l.opacity),
                };
            });

        if(!Boolean(_layers_simplified.length === _s_pxl_colors.length && _s_pxl_colors.length === _s_pxls.length)) {

            this._notify_layers_and_compute_thumbnails_change(() => {
                this._update_canvas(force_update, do_not_cancel_animation);
            });
            return;
        }

        _layers_simplified.forEach((l) => {
            if(!Boolean(l.hash)) {

                this._notify_layers_and_compute_thumbnails_change(() => {
                    this._update_canvas(force_update, do_not_cancel_animation);
                });
                return;
            }
        });

        // Only operate on canvas context if existing
        if (Boolean(this.super_canvas)) {

            // Importing state variables
            const {
                select_mode,
                pencil_mirror_mode,
                _pencil_mirror_index,
                _previous_pencil_mirror_axes_indexes,
                _previous_pencil_mirror_axes_hover_indexes,
                hide_canvas_content,
                _did_hide_canvas_content,
                _old_pxls,
                _old_pxl_width,
                _old_pxl_height,
                pxl_width,
                pxl_height,
                _old_layers,
                _old_pxl_colors,
                _old_pxls_hovered,
                _pxls_hovered,
                _mouse_inside,
                tool,
                _is_there_new_dimension,
                _shape_index_a,
                _select_shape_index_a,
                pxl_current_color,
                pxl_current_opacity,
                _pxl_indexes_of_selection,
                _pxl_indexes_of_selection_drawn,
                _paint_or_select_hover_pxl_indexes,
                _previous_mine_player_index,
                _mine_player_index,
                _mine_index,
                _pxls_explosion,
                _pxl_colors_explosion,
                _explosion_started_timestamp,
                _explosion_index,
                _explosion_width,
                _explosion_height,
                _explosion_time,
                _selection_pair_highlight,
                _old_selection_pair_highlight,
                _pxl_indexes_of_old_shape
            } = this.state;


            let {
                _imported_image_start_x,
                _imported_image_start_y,
                _imported_image_scale_delta_x,
                _imported_image_scale_delta_y,
                _imported_image_pxls,
                _imported_image_width,
                _imported_image_height,
                _imported_image_pxl_colors,
                _previous_imported_image_pxls_positioned_keyset,
                _previous_image_imported_resizer_index,
                _previous_explosion_pxls_positioned_keyset
            } = this.state;

            let has_an_image_imported = false;
            let imported_image_pxls_positioned = [];
            let image_imported_resizer_index = -1;
            if(_imported_image_pxls.length > 0) {

                [_imported_image_pxls, _imported_image_pxl_colors, _imported_image_width, _imported_image_height] = this._get_imported_image_scaled(_imported_image_pxls, _imported_image_pxl_colors, _imported_image_width, _imported_image_height, _imported_image_scale_delta_x, _imported_image_scale_delta_y);
                has_an_image_imported = Boolean(_imported_image_pxls.length > 0);
                image_imported_resizer_index = parseInt(_imported_image_start_x + _imported_image_width) + parseInt(_imported_image_start_y + _imported_image_height) * pxl_width;
                _imported_image_pxls.forEach((pxl, index) => {

                    const pos_x = index % _imported_image_width;
                    const pos_y = (index - pos_x) / _imported_image_width;
                    const current_pos_x_positioned = pos_x + _imported_image_start_x;
                    const current_pos_y_positioned = pos_y + _imported_image_start_y;
                    const imported_image_pxl_positioned_index = current_pos_y_positioned * pxl_width + current_pos_x_positioned;

                    if(current_pos_x_positioned >= 0 && current_pos_x_positioned < pxl_width && current_pos_y_positioned >= 0 && current_pos_y_positioned < pxl_height) {

                        imported_image_pxls_positioned[imported_image_pxl_positioned_index] = pxl;
                    }

                });
            }

            let explosion_pxls_positioned = [];
            const has_mine_explosion = _explosion_started_timestamp > Date.now() - _explosion_time;
            const mine_explosion_frame = has_mine_explosion ?
                Math.max(Math.floor(_pxls_explosion.length - Math.floor(_explosion_time / (Date.now() - _explosion_started_timestamp))), 0):
                0;

            if(has_mine_explosion) {

                const explosion_x = _explosion_index % pxl_width;
                const explosion_y = (_explosion_index - explosion_x) / pxl_width;

                const _explosion_start_x = Math.floor(explosion_x - _explosion_width / 2);
                const _explosion_start_y = Math.floor(explosion_y - _explosion_height / 2);

                _pxls_explosion[mine_explosion_frame].forEach((pxl, index) => {

                    const pos_x = index % _explosion_width;
                    const pos_y = (index - pos_x) / _explosion_width;

                    const current_pos_x_positioned = pos_x + _explosion_start_x;
                    const current_pos_y_positioned = pos_y + _explosion_start_y;

                    const explosion_pxl_positioned_index = current_pos_y_positioned * pxl_width + current_pos_x_positioned;

                    if(current_pos_x_positioned >= 0 && current_pos_x_positioned < pxl_width && current_pos_y_positioned >= 0 && current_pos_y_positioned < pxl_height) {

                        explosion_pxls_positioned[explosion_pxl_positioned_index] = pxl;
                    }


                });
            }

            let pencil_mirror_axes_hover_indexes = new Set();
            let pencil_mirror_axes_indexes = new Set();
            const pencil_mirror_x = _pencil_mirror_index % pxl_width;
            const pencil_mirror_y = (_pencil_mirror_index - pencil_mirror_x) / pxl_width;
            const pencil_mirror_hover_x = _pxls_hovered % pxl_width;
            const pencil_mirror_hover_y = (_pxls_hovered - pencil_mirror_hover_x) / pxl_width;

            if((pencil_mirror_mode === "HORIZONTAL" || pencil_mirror_mode === "BOTH") && tool.includes("PENCIL")) {

                for(let i = 0; i < pxl_height; i++) {

                    if(_pencil_mirror_index !== -1) {

                        pencil_mirror_axes_indexes.add(i * pxl_width + pencil_mirror_x);
                    }
                    if(tool === "SET PENCIL MIRROR" && _pxls_hovered !== -1) {

                        pencil_mirror_axes_hover_indexes.add(i * pxl_width + pencil_mirror_hover_x);
                    }
                }

            }
            if((pencil_mirror_mode === "VERTICAL" || pencil_mirror_mode === "BOTH") && tool.includes("PENCIL")) {

                for(let i = 0; i < pxl_width; i++) {

                    if(_pencil_mirror_index !== -1) {

                        pencil_mirror_axes_indexes.add(i + pencil_mirror_y * pxl_width);
                    }
                    if(tool === "SET PENCIL MIRROR" && _pxls_hovered !== -1) {

                        pencil_mirror_axes_hover_indexes.add(i + pencil_mirror_hover_y * pxl_width);
                    }
                }

            }

            // This is a list of color index that we explore
            const _s_pxls_layer_index = Array.from(_s_pxls[_layer_index]);
            const _s_pxl_colors_layer_index = Uint32Array.from(_s_pxl_colors[_layer_index]);

            const is_there_new_dimension = Boolean(_old_pxl_width !== pxl_width || _old_pxl_height !== pxl_height || _is_there_new_dimension);
            const has_new_pixel_hovered = Boolean(_old_pxls_hovered !== _pxls_hovered);
            const has_new_mine_player_index = Boolean(_previous_mine_player_index !== _mine_player_index);
            let pxl_indexes_of_current_shape = new Set();

            if(Boolean(tool === "LINE" || tool === "RECTANGLE" || tool === "ELLIPSE" || tool === "TRIANGLE") && _shape_index_a !== -1) {

                pxl_indexes_of_current_shape =
                    tool === "LINE" ?
                        this._get_pixels_palette_and_list_from_line(_s_pxls[_layer_index], _shape_index_a, _pxls_hovered, _s_pxl_colors_layer_index, pxl_current_color, pxl_current_opacity)[2]:
                        tool === "RECTANGLE" ?
                            this._get_pixels_palette_and_list_from_rectangle(_s_pxls[_layer_index], _shape_index_a, _pxls_hovered, _s_pxl_colors_layer_index, pxl_current_color, pxl_current_opacity)[2]:
                            tool === "ELLIPSE" ?
                                this._get_pixels_palette_and_list_from_ellipse(_s_pxls[_layer_index], _shape_index_a, _pxls_hovered, _s_pxl_colors_layer_index, pxl_current_color, pxl_current_opacity)[2]:
                                pxl_indexes_of_current_shape;

            }else if (Boolean(tool === "SELECT LINE" || tool === "SELECT RECTANGLE" || tool === "SELECT ELLIPSE") && _select_shape_index_a !== -1) {

                pxl_indexes_of_current_shape =
                    tool === "SELECT LINE" ?
                        this._get_pixels_palette_and_list_from_line(_s_pxls[_layer_index], _select_shape_index_a, _pxls_hovered)[2]:
                        tool === "SELECT RECTANGLE" ?
                            this._get_pixels_palette_and_list_from_rectangle(_s_pxls[_layer_index], _select_shape_index_a, _pxls_hovered)[2]:
                            tool === "SELECT ELLIPSE" ?
                                this._get_pixels_palette_and_list_from_ellipse(_s_pxls[_layer_index], _select_shape_index_a, _pxls_hovered)[2]:
                                pxl_indexes_of_current_shape;

            }else if((tool === "SELECT PATH" || tool === "CONTOUR") && _paint_or_select_hover_pxl_indexes.size > 0) {

                const first_drawn_pixel = _paint_or_select_hover_pxl_indexes[0];
                const last_drawn_pixel = _paint_or_select_hover_pxl_indexes[_paint_or_select_hover_pxl_indexes.size-1];
                const closing_path_line = this._get_pixels_palette_and_list_from_line(_s_pxls[_layer_index], first_drawn_pixel, last_drawn_pixel, _s_pxl_colors_layer_index, pxl_current_color, pxl_current_opacity)[2];

                if(select_mode === "REMOVE" && tool === "SELECT PATH") {

                    closing_path_line.forEach((pxl_index) => {

                        _pxl_indexes_of_selection.delete(pxl_index);
                    });
                }else if(tool === "SELECT PATH") {

                        closing_path_line.forEach((pxl_index) => {_pxl_indexes_of_selection.add(pxl_index)});
                }else {
                    closing_path_line.forEach((pxl_index) => {pxl_indexes_of_current_shape.add(pxl_index)});
                }

            }

            const has_layers_visibility_or_opacity_changed = Boolean(JSON.stringify(_old_layers) !== JSON.stringify(_layers_simplified));
            const imported_image_pxls_positioned_keyset = new Set(Object.keys(imported_image_pxls_positioned));
            const explosion_pxls_positioned_keyset = new Set(Object.keys(explosion_pxls_positioned));

            const _s_pxl_colors_a = _s_pxl_colors.map((a) => {return this.color_conversion.to_int_array_from_uint32_array_for_subcolor(a)});
            let indexed_changes = new Map();

            let layer_pixel_colors = new Map();
            let start_i = 0;
            let pixel_color_Uint32 = 0;
            let color = 0;

            let b = {
                is_in_image_imported: false,
                was_in_image_imported: false,
                is_in_image_imported_resizer: false,
                was_in_image_imported_resizer: false,
                is_in_explosion: false,
                was_in_explosion: false,
                is_pixel_hovered: false,
                is_the_old_pixel_hovered_to_paint: false,
                is_mine_player_index: false,
                is_the_old_mine_player_index_to_paint: false,
                is_in_the_old_shape: false,
                is_in_the_current_shape: false,
                is_in_the_current_selection: false,
                is_current_selection_hovered: false,
                was_current_selection_hovered: false,
                is_current_selection_hovered_changes: false,
                is_in_the_old_selection_drawn: false,
                is_selected_and_hovered_recently: false,
                is_selected_and_to_paint_again: false,
                is_ancient_selected_pixel_waiting_to_update: false,
                is_in_pencil_mirror_axes_hover_indexes: false,
                was_in_pencil_mirror_axes_hover_indexes: false,
                is_in_pencil_mirror_axes_indexes: false,
                is_an_old_pencil_mirror_axes_pixel_to_paint: false,
                is_a_new_pixel_to_paint: false,
                pixel_hover_exception: false,
            };

            const clear_canvas = Boolean(_did_hide_canvas_content && !hide_canvas_content) || !has_shown_canvas_once || hide_canvas_content || has_layers_visibility_or_opacity_changed || is_there_new_dimension;

            for(let index = 0; index < _s_pxls_layer_index.length; index++){

                layer_pixel_colors.clear();
                start_i = 0;
                pixel_color_Uint32 = 0;
                color = 0;

                const pxl = _s_pxls_layer_index[index];
                b.is_in_image_imported = has_an_image_imported && imported_image_pxls_positioned_keyset.has(index);
                b.was_in_image_imported = Boolean(_previous_imported_image_pxls_positioned_keyset.has(index));

                b.is_in_image_imported_resizer = Boolean(has_an_image_imported && Boolean(image_imported_resizer_index === index));
                b.was_in_image_imported_resizer = Boolean(_previous_image_imported_resizer_index === index);

                b.is_in_explosion = explosion_pxls_positioned_keyset.has(index);
                b.was_in_explosion = _previous_explosion_pxls_positioned_keyset.has(index);

                b.is_pixel_hovered = Boolean(_pxls_hovered === index && index !== -1);
                b.is_the_old_pixel_hovered_to_paint = Boolean(Boolean(index === _old_pxls_hovered && has_new_pixel_hovered && index !== -1) || Boolean(index === _pxls_hovered && index !== -1));

                b.is_mine_player_index = Boolean(_mine_player_index === index);
                b.is_the_old_mine_player_index_to_paint = Boolean(index === _previous_mine_player_index && has_new_mine_player_index);

                b.is_in_the_old_shape = _pxl_indexes_of_old_shape.has(index);
                b.is_in_the_current_shape = pxl_indexes_of_current_shape.has(index);
                b.is_in_the_current_selection = _pxl_indexes_of_selection.has(index);
                b.is_current_selection_hovered = _pxl_indexes_of_selection.has(_pxls_hovered);
                b.was_current_selection_hovered = _pxl_indexes_of_selection.has(_old_pxls_hovered);
                b.is_current_selection_hovered_changes = Boolean(b.is_current_selection_hovered !== b.was_current_selection_hovered);
                b.is_in_the_old_selection_drawn = _pxl_indexes_of_selection_drawn.has(index);
                b.is_selected_and_hovered_recently = Boolean(b.is_in_the_current_selection && Boolean(b.is_pixel_hovered || b.is_the_old_pixel_hovered_to_paint));
                b.is_selected_and_to_paint_again = Boolean(b.is_in_the_current_selection && _selection_pair_highlight !== _old_selection_pair_highlight);
                b.is_ancient_selected_pixel_waiting_to_update = Boolean(b.is_in_the_old_selection_drawn && !b.is_in_the_current_selection);
                b.is_in_pencil_mirror_axes_hover_indexes = pencil_mirror_axes_hover_indexes.has(index);
                b.was_in_pencil_mirror_axes_hover_indexes = _previous_pencil_mirror_axes_hover_indexes.has(index);
                b.is_in_pencil_mirror_axes_indexes = pencil_mirror_axes_indexes.has(index);
                b.is_an_old_pencil_mirror_axes_pixel_to_paint = Boolean(_previous_pencil_mirror_axes_indexes.has(index) && _previous_pencil_mirror_axes_indexes !== pencil_mirror_axes_indexes);
                b.is_a_new_pixel_to_paint = Boolean( clear_canvas || Boolean(b.was_in_pencil_mirror_axes_hover_indexes && !b.is_in_pencil_mirror_axes_hover_indexes) || b.is_an_old_pencil_mirror_axes_pixel_to_paint || b.was_in_explosion !== b.is_in_explosion || b.is_in_explosion || b.was_in_image_imported || b.is_in_image_imported || Boolean(b.was_in_image_imported_resizer && !b.is_in_image_imported_resizer) || pxl !== _old_pxls[index] || _old_pxl_colors[pxl] !== _s_pxl_colors_layer_index[pxl]);
                b.pixel_hover_exception = Boolean(tool === "ELLIPSE" && pxl_indexes_of_current_shape.size > 0);

                if (
                    !hide_canvas_content &&
                    Boolean(clear_canvas ||
                        Boolean(
                            b.is_in_pencil_mirror_axes_hover_indexes ||
                            b.is_in_pencil_mirror_axes_indexes ||
                            (b.is_current_selection_hovered_changes && b.is_in_the_current_selection) ||
                            b.is_selected_and_to_paint_again ||
                            b.is_ancient_selected_pixel_waiting_to_update ||
                            b.is_the_old_pixel_hovered_to_paint ||
                            b.is_a_new_pixel_to_paint ||
                            Boolean(b.is_pixel_hovered && !b.pixel_hover_exception) ||
                            b.is_mine_player_index ||
                            b.is_in_the_old_shape ||
                            b.is_in_the_current_shape ||
                            Boolean(b.is_in_the_current_selection && !b.is_in_the_old_selection_drawn) ||
                            b.is_selected_and_hovered_recently ||
                            b.is_the_old_mine_player_index_to_paint ||
                            b.is_in_image_imported_resizer && Boolean(_selection_pair_highlight !== _old_selection_pair_highlight)
                    ))) {

                    for (let i = _layers_simplified.length - 1; i >= 0; i--) {

                        const layer_pixel_color = _s_pxl_colors[i][_s_pxls[i][index]];
                        layer_pixel_colors.set(i, layer_pixel_color);

                        if(_s_pxl_colors_a[i][_s_pxls[i][index]] === 255 && parseFloat(_layers_simplified[i].opacity) === parseFloat(1) && !_layers_simplified[i].hidden) {

                            start_i = i;
                            break;
                        }

                    }

                    for (let i = start_i; i < _layers_simplified.length; i++) {

                        if(!_layers_simplified[i].hidden) {

                            const layer_pixel_color = layer_pixel_colors.get(i);

                            pixel_color_Uint32 = this.color_conversion.blend_colors(pixel_color_Uint32, layer_pixel_color, parseFloat(_layers_simplified[i].opacity), false, false);

                            if(b.is_in_image_imported && i === _layer_index) {

                                pixel_color_Uint32 = this.color_conversion.blend_colors(pixel_color_Uint32, _imported_image_pxl_colors[imported_image_pxls_positioned[index]], 1, false, false);
                            }
                        }

                        if(b.is_in_explosion && i === _layers_simplified.length -1) {

                            pixel_color_Uint32 = this.color_conversion.blend_colors(pixel_color_Uint32, _pxl_colors_explosion[mine_explosion_frame][explosion_pxls_positioned[index]], 1, false, false);
                        }
                    }

                    if(Boolean(b.is_in_pencil_mirror_axes_hover_indexes ||
                        b.is_in_pencil_mirror_axes_indexes ||
                        b.is_pixel_hovered ||
                        b.is_mine_player_index ||
                        b.is_in_the_current_shape ||
                        Boolean(b.is_in_the_current_selection && !b.is_in_the_old_selection_drawn) ||
                        Boolean(b.is_a_new_pixel_to_paint && b.is_in_the_current_selection) ||
                        b.is_selected_and_hovered_recently
                        ) && !Boolean(b.is_the_old_mine_player_index_to_paint || b.is_ancient_selected_pixel_waiting_to_update || Boolean(b.is_a_new_pixel_to_paint && !b.is_in_the_current_selection && !b.is_pixel_hovered && !b.is_in_pencil_mirror_axes_indexes))
                    ) {

                        if(b.is_pixel_hovered || b.is_mine_player_index || b.is_in_pencil_mirror_axes_indexes) {

                            color = pixel_color_Uint32 = this.color_conversion.blend_colors(pixel_color_Uint32, "hover", 2/3, false, false);
                        }else {

                            color = pixel_color_Uint32 = this.color_conversion.blend_colors(pixel_color_Uint32, "hover", 1/3, false, false);
                        }
                    }else if(b.is_in_image_imported_resizer || Boolean(b.is_in_the_current_selection && !b.is_in_the_current_shape && !b.is_pixel_hovered)) {

                        const pos_x = index % pxl_width;
                        const pos_y = (index - pos_x) / pxl_width;

                        if(b.is_in_image_imported_resizer) {

                            const opacity = b.is_pixel_hovered ?
                                2/3 + (0 + ((pos_x + pos_y + (_selection_pair_highlight ? 1: 0)) % 2)) / 3:
                                1/3 + (0 + ((pos_x + pos_y + (_selection_pair_highlight ? 1: 0)) % 2)) / 3;
                            color = this.color_conversion.blend_colors(pixel_color_Uint32, "hover", opacity, false, false);
                        }else if(b.is_in_the_current_selection && !b.is_in_the_current_shape && !b.is_pixel_hovered) {

                            const opacity = 1/3 + (0 + ((pos_x + pos_y + (_selection_pair_highlight ? 1: 0)) % 2)) / 3;
                            color = this.color_conversion.blend_colors(pixel_color_Uint32, "hover", opacity, false, false);
                        }
                    } else {

                        color = pixel_color_Uint32;
                    }

                    indexed_changes.set(index, color);
                }
            }

            if(clear_canvas || indexed_changes.size > 0) {

                force_update = Boolean(indexed_changes.size * 2 > pxl_width * pxl_height || force_update || clear_canvas);

                if(clear_canvas) {

                    this.super_canvas.clear();
                }

                if(clear_canvas || indexed_changes.size > 0) {

                    let indexed_by_color_changes = new Map();

                    for (const [index, colorUint32] of indexed_changes) {

                        let array = indexed_by_color_changes.get(colorUint32) || [];
                        array.push(index);
                        indexed_by_color_changes.set(colorUint32, array);
                    }

                    for (const [colorUint32, array] of indexed_by_color_changes) {

                        let alpha = this.color_conversion.to_rgba_from_uint32(colorUint32)[3];
                        let path = new Path2D();

                        if(alpha !== 255){
                            array.forEach((i) => {
                                const x = i % pxl_width, y = (i - x) / pxl_width;
                                path.rect(x, y, 1, 1);
                                if(!clear_canvas) {this.super_canvas.clear_rect(x, y, 1, 1);}
                            });
                        }else {
                            array.forEach((i) => {
                                const x = i % pxl_width, y = (i - x) / pxl_width;
                                path.rect(x, y, 1, 1);
                            });
                        }

                        this.super_canvas.draw_path_with_style(path, this.color_conversion.to_hex_from_uint32(colorUint32));
                    }
                }
                if(no_actions === false || clear_canvas || force_update) {

                    this.setState({
                        _pxl_indexes_of_selection_drawn: new Set(_pxl_indexes_of_selection.keys()),
                        _pxl_indexes_of_old_shape: pxl_indexes_of_current_shape,
                        _imported_image_previous_start_x: parseInt(_imported_image_start_x),
                        _imported_image_previous_start_y: parseInt(_imported_image_start_y),
                        _imported_image_previous_scale_delta_x: parseInt(_imported_image_scale_delta_x),
                        _imported_image_previous_scale_delta_y: parseInt(_imported_image_scale_delta_y),
                        _previous_pencil_mirror_axes_indexes: pencil_mirror_axes_indexes,
                        _previous_pencil_mirror_axes_hover_indexes: pencil_mirror_axes_hover_indexes,
                        _previous_explosion_pxls_positioned_keyset: explosion_pxls_positioned_keyset,
                        _previous_imported_image_pxls_positioned_keyset: imported_image_pxls_positioned_keyset,
                        _previous_image_imported_resizer_index: parseInt(image_imported_resizer_index),
                        _old_selection_pair_highlight: Boolean(_selection_pair_highlight),
                        _old_layers: _layers_simplified,
                        _old_pxls: _s_pxls_layer_index,
                        _old_pxl_colors: _s_pxl_colors_layer_index,
                        _old_pxl_width: parseInt(pxl_width),
                        _old_pxl_height: parseInt(pxl_height),
                        _previous_mine_player_index: parseInt(_mine_player_index),
                        _old_pxls_hovered: parseInt(_pxls_hovered),
                        _last_paint_timestamp: Date.now(),
                        has_shown_canvas_once: true,
                        _is_there_new_dimension: false,
                        _did_hide_canvas_content: Boolean(hide_canvas_content)
                    });
                    this.sraf.run_frame(this.super_canvas.render, Boolean(!force_update && do_not_cancel_animation), Boolean(force_update && !do_not_cancel_animation));
                }else {

                    this.setState({
                        _pxl_indexes_of_selection_drawn: new Set(_pxl_indexes_of_selection.keys()),
                        _pxl_indexes_of_old_shape: pxl_indexes_of_current_shape,
                        _imported_image_previous_start_x: parseInt(_imported_image_start_x),
                        _imported_image_previous_start_y: parseInt(_imported_image_start_y),
                        _imported_image_previous_scale_delta_x: parseInt(_imported_image_scale_delta_x),
                        _imported_image_previous_scale_delta_y: parseInt(_imported_image_scale_delta_y),
                        _previous_pencil_mirror_axes_indexes: pencil_mirror_axes_indexes,
                        _previous_pencil_mirror_axes_hover_indexes: pencil_mirror_axes_hover_indexes,
                        _previous_explosion_pxls_positioned_keyset: explosion_pxls_positioned_keyset,
                        _previous_imported_image_pxls_positioned_keyset: imported_image_pxls_positioned_keyset,
                        _previous_image_imported_resizer_index: parseInt(image_imported_resizer_index),
                        _old_selection_pair_highlight: Boolean(_selection_pair_highlight),
                        _old_layers: _layers_simplified,
                        _old_pxls: _s_pxls_layer_index,
                        _old_pxl_colors: _s_pxl_colors_layer_index,
                        _old_pxl_width: parseInt(pxl_width),
                        _old_pxl_height: parseInt(pxl_height),
                        _previous_mine_player_index: parseInt(_mine_player_index),
                        _old_pxls_hovered: parseInt(_pxls_hovered),
                    });

                }
            }
        }
    };

    _maybe_save_state = (set_anyway_if_changes_callback = null) => {

        let {_layers, _last_action_timestamp, _undo_buffer_time_ms, _state_history_length, _id, pxl_width, pxl_height, _original_image_index, _layer_index, _s_pxls, _s_pxl_colors, _pxl_indexes_of_selection, _pencil_mirror_index } = this.state;

        if(_layers.length !== _s_pxls.length || pxl_width * pxl_height !== (_s_pxls[0] || []).length || (_s_pxls[0] || []).length === 0 || parseInt(_last_action_timestamp + _undo_buffer_time_ms) > Date.now()) {

            if(set_anyway_if_changes_callback) {

                set_anyway_if_changes_callback(this.state._json_state_history, false);
            }
            return false;
        }

        this._notify_layers_and_compute_thumbnails_change((layers, layers_length, layers_changed, layers_hash) => {

            function _get_current_state(_id, pxl_width, pxl_height, _original_image_index, layers, _layer_index, _s_pxls, _s_pxl_colors, _pxl_indexes_of_selection, _pencil_mirror_index) {

                return Object.assign({}, {
                    _id: parseInt(_id),
                    pxl_width: parseInt(pxl_width),
                    pxl_height: parseInt(pxl_height),
                    _original_image_index: parseInt(_original_image_index),
                    _layers: layers.map(function(l) {
                        return {
                            id: parseInt(l.id),
                            hash: String(l.hash),
                            name: String(l.name),
                            hidden: Boolean(l.hidden),
                            opacity: parseInt(l.opacity),
                        };
                    }),
                    _layer_index: parseInt(_layer_index),
                    _s_pxls: _s_pxls.map((a) => Array.from(a)),
                    _s_pxl_colors: _s_pxl_colors.map((a) => Uint32Array.from(a)),
                    _pxl_indexes_of_selection: new Set(_pxl_indexes_of_selection),
                    _pencil_mirror_index: parseInt(_pencil_mirror_index),
                });
            }

            let _json_state_history = this.state._json_state_history;
            if(_json_state_history.state_history.length === 0) { // Fist state

                const current_state = _get_current_state(_id, pxl_width, pxl_height, _original_image_index, layers, _layer_index, _s_pxls, _s_pxl_colors, _pxl_indexes_of_selection, _pencil_mirror_index);
                _json_state_history.state_history = [current_state];
                _json_state_history.previous_history_position = 0;
                _json_state_history.history_position = 1;

                this.setState({_json_state_history, _saved_json_state_history_timestamp_from_drawing: Date.now()}, () => {

                    this._notify_can_undo_redo_change(_json_state_history);
                    if(set_anyway_if_changes_callback !== null) {
                        set_anyway_if_changes_callback(_json_state_history, true);
                    }
                });

            }else if(layers_changed){

                const current_state = _get_current_state(_id, pxl_width, pxl_height, _original_image_index, layers, _layer_index, _s_pxls, _s_pxl_colors, _pxl_indexes_of_selection, _pencil_mirror_index);
                const current_state_length = parseInt(_json_state_history.state_history.length);
                const back_in_history_of = parseInt(current_state_length - _json_state_history.history_position);
                const previous_state = _json_state_history.state_history[_json_state_history.history_position-1] || _json_state_history.state_history[0];

                if(previous_state._layers.map((l) => l.hash).join("+") !== current_state._layers.map((l) => l.hash).join("+")) {

                    // An action must have been performed and the last action must be older of 1 sec
                    if(back_in_history_of) {

                        _json_state_history.state_history.splice(parseInt(_json_state_history.history_position));
                    }

                    _json_state_history.previous_history_position = parseInt(_json_state_history.history_position);
                    if(_json_state_history.state_history.length >= _state_history_length) {

                        _json_state_history.state_history.shift();
                        _json_state_history.state_history.push(current_state);
                    }else {

                        _json_state_history.state_history.push(current_state);
                        _json_state_history.history_position = parseInt(_json_state_history.state_history.length);
                    }

                    this.setState({_json_state_history, _saved_json_state_history_timestamp_from_drawing: Date.now()}, () => {

                        this._notify_can_undo_redo_change(_json_state_history);
                        if(set_anyway_if_changes_callback !== null) {
                            set_anyway_if_changes_callback(_json_state_history, true);
                        }
                    });

                }else  {

                    this._notify_can_undo_redo_change();
                    if(set_anyway_if_changes_callback !== null) {
                        set_anyway_if_changes_callback(_json_state_history, false);
                    }
                }
            }else {

                if(set_anyway_if_changes_callback !== null) {

                    set_anyway_if_changes_callback(_json_state_history, false);
                }
                return false;
            }
        }, Date.now(), true);
    };

    _notify_relevant_action_event = (event, color = "#ffffffff", opacity = 1) => {

        if(this.props.onRelevantActionEvent) {

            this.props.onRelevantActionEvent(event, this.color_conversion.format_hex_color(color), opacity);
        }
    };

    _notify_position_change = (event, position, date = null) => {

        if(this.props.onPositionChange) {

            const { _notified_position_at } = this.state;
            const now = Date.now();

            if((now - _notified_position_at >= 150 && date === null) || date > _notified_position_at && now - date >= 150) {

                position = {
                    x: typeof position.x === "undefined" ? -1: position.x,
                    y: typeof position.y === "undefined" ? -1: position.y,
                };


                this.setState({_notified_position_at: now}, () => {

                    this.props.onPositionChange(position, this.sraf.get_state().previous_cpaf_fps);
                });
            }else if(now < date + 150){

                setTimeout(() => {

                    this._notify_position_change(null, {x: position.x, y: position.y}, now);
                }, 50);
            }
        }
    };

    _notify_current_color_change = (color, event = null) => {

        color = this.color_conversion.format_hex_color(color);
        if(this.props.onCurrentColorChange) {

            this.props.onCurrentColorChange(color, event);
        } else {

            this.setState({pxl_current_color: color});
        }
    };

    _notify_is_something_selected = () => {

        const { _pxl_indexes_of_selection } = this.state;

        if(Boolean(this.state._previous_pxl_indexes_of_selection.size) !== Boolean(_pxl_indexes_of_selection.size)) {

            this.setState({
                _is_something_selected: Boolean(_pxl_indexes_of_selection.size),
                _previous_pxl_indexes_of_selection: new Set(_pxl_indexes_of_selection)
            }, () => {

                if(this.props.onSomethingSelectedChange) {

                    this.props.onSomethingSelectedChange(Boolean(_pxl_indexes_of_selection.size));
                }
            });
        }
    };

    _notify_image_load_complete = () => {

        const { _s_pxl_colors, pxl_width, pxl_height } = this.state;

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

    _notify_can_undo_redo_change = (_json_state_history) => {

        const can_undo = this._can_undo(_json_state_history);
        const can_redo = this._can_redo(_json_state_history);

        if(this.props.onCanUndoRedoChange) { this.props.onCanUndoRedoChange(can_undo, can_redo); }
    };

    _notify_size_change = () => {

        const { width, height } = this.canvas_pos.get_state().sizes;
        if(this.props.onSizeChange) { this.props.onSizeChange(width, height); }
    };

    import_JSON_state = (json) => {

        this.import_JS_state(JSON.parse(json));
    };

    import_JS_state = (js, callback_function) => {

        let _base64_original_images = Array.from(js._base64_original_images);
        let _json_state_history = Object.assign({}, {
            history_position: parseInt(js._json_state_history.history_position),
            previous_history_position: parseInt(js._json_state_history.previous_history_position),
            state_history: js._json_state_history.state_history.map((state) => Object.assign({}, {
                _original_image_index: parseInt(state._original_image_index),
                pxl_width: parseInt(state.pxl_width),
                pxl_height: parseInt(state.pxl_height),
                _pxl_indexes_of_selection: new Set(Boolean(state._pxl_indexes_of_selection.length) ? state._pxl_indexes_of_selection : []),
                _s_pxl_colors: state._s_pxl_colors.map((a) => Uint32Array.from(Object.values(a))),
                _s_pxls: state._s_pxls.map((a) => Array.from(Object.values(a))),
                _layers: state._layers.map((l) => {
                    return {
                        id: parseInt(l.id),
                        hash: String(l.hash),
                        name: String(l.name),
                        hidden: Boolean(l.hidden),
                        opacity: parseInt(l.opacity),
                    };
                }),
                _layer_index: parseInt(state._layer_index),
                _pencil_mirror_index: parseInt(state._pencil_mirror_index),
                _id: parseInt(state._id)
            }))
        });

        js = null;

        let { _original_image_index, pxl_width, pxl_height, _pxl_indexes_of_selection, _s_pxl_colors, _s_pxls, _layers, _layer_index, _pencil_mirror_index, _id } = _json_state_history.state_history[_json_state_history.history_position-1];

        this.canvas_pos.set_sizes(pxl_width, pxl_height);
        this.super_canvas.set_dimensions(pxl_width, pxl_height);
        this.canvas_pos.set_current_scale_default();
        this.setState({
            _id: parseInt(_id),
            pxl_width: parseInt(pxl_width),
            pxl_height: parseInt(pxl_height),
            _base64_original_images: Array.from(_base64_original_images),
            _original_image_index: parseInt(_original_image_index),
            _saved_json_state_history_timestamp_from_drawing: 0,
            _layers: _layers.map((l) => {
                return {
                    id: parseInt(l.id),
                    hash: String(l.hash),
                    name: String(l.name),
                    hidden: Boolean(l.hidden),
                    opacity: parseInt(l.opacity),
                }
            }),
            _layer_index: parseInt(_layer_index),
            _s_pxls: _s_pxls.map((a) => Array.from(Object.values(a))),
            _s_pxl_colors: _s_pxl_colors.map((a) => Uint32Array.from(Object.values(a))),
            _pxl_indexes_of_selection: new Set(_pxl_indexes_of_selection),
            _pencil_mirror_index: parseInt(_pencil_mirror_index),
            _json_state_history: Object.assign({}, _json_state_history),
            _is_there_new_dimension: true,
            has_shown_canvas_once: false,
            _old_pxls_hovered: -1,
            _pxls_hovered: -1,
            _old_pxl_colors: Uint32Array.of(0),
            _old_pxls: new Array(_s_pxls[0].length).fill(0),
            _last_action_timestamp: Date.now(),
        }, () => {

            this._notify_layers_and_compute_thumbnails_change( () => {

                this._notify_image_load_complete();
                this._notify_is_something_selected();
                this._notify_can_undo_redo_change();
                this._update_canvas();
                callback_function();

            }, Date.now(), true);
        });
    };

    export_JS_state = (callback_function) => {

        this._maybe_save_state((_json_state_history, saved) => {

            if(!_json_state_history.state_history.length){

                setTimeout(() => {

                    this.export_JS_state(callback_function);
                }, this.state._undo_buffer_time_ms)

            } else {

                const {_base64_original_images, _id} = this.state;

                this.get_base64_png_data_url(1, ([base_64]) => {

                    const bytes = 3 * Math.ceil((base_64.length/4));
                    callback_function({
                        id: _id,
                        kb: bytes / 1024,
                        preview: base_64,
                        timestamp: Date.now(),
                        _base64_original_images: _base64_original_images,
                        _json_state_history
                    });
                }, false, 1, 100, 100);
            }
        });
    };

    _can_undo = (_json_state_history) => {

        if(typeof _json_state_history === "undefined") {

            _json_state_history = this.state._json_state_history;
        }

        return Boolean(_json_state_history.history_position > 1);
    };

    nothing_happened_undo = () => {

        this._maybe_save_state((data) => {

            if(data) {

                this.undo();
            }
        });
    }

    undo = () => {

        this._maybe_save_state((_json_state_history, saved) => {

            if(this._can_undo(_json_state_history)){

                _json_state_history.previous_history_position = parseInt(_json_state_history.history_position);
                _json_state_history.history_position -= 1;

                const { _original_image_index, pxl_width, pxl_height, _pxl_indexes_of_selection, _s_pxl_colors, _s_pxls, _layers, _layer_index, _pencil_mirror_index, _id } = _json_state_history.state_history[_json_state_history.history_position-1];
                const has_new_dimension = Boolean(pxl_width !== this.state.pxl_width || pxl_height !== this.state.pxl_height);

                if(has_new_dimension) {
                    this.canvas_pos.set_sizes(pxl_width, pxl_height);
                    this.super_canvas.set_dimensions(pxl_width, pxl_height);
                    this.canvas_pos.set_current_scale_default();
                }
                this.setState(Object.assign({}, {
                    _id: parseInt(_id),
                    pxl_width: parseInt(pxl_width),
                    pxl_height: parseInt(pxl_height),
                    _original_image_index: parseInt(_original_image_index),
                    _layers: _layers.map(function(l) {
                        return {
                            id: parseInt(l.id),
                            hash: String(l.hash),
                            name: String(l.name),
                            hidden: Boolean(l.hidden),
                            opacity: parseInt(l.opacity),
                        };
                    }),
                    _layer_index: parseInt(_layer_index),
                    _s_pxls: _s_pxls.map((a) => Array.from(a)),
                    _s_pxl_colors: _s_pxl_colors.map((a) => Uint32Array.from(a)),
                    _pxl_indexes_of_selection: new Set(_pxl_indexes_of_selection),
                    _pencil_mirror_index: parseInt(_pencil_mirror_index),
                    _json_state_history: _json_state_history,
                    _is_there_new_dimension: has_new_dimension,
                    has_shown_canvas_once: !has_new_dimension,
                }), () => {

                    if (has_new_dimension) {

                        this._notify_layers_and_compute_thumbnails_change( () => {

                            this._notify_image_load_complete();
                            this._notify_is_something_selected();
                            this._notify_can_undo_redo_change();
                            this._update_canvas();
                        });
                    }else {

                        this._notify_layers_and_compute_thumbnails_change(() => {

                            this._notify_is_something_selected();
                            this._notify_can_undo_redo_change();
                            this._update_canvas();
                        });
                    }
                });
            }
        });
    };

    _can_redo = (_json_state_history) => {

        if(typeof _json_state_history === "undefined") {

            _json_state_history = this.state._json_state_history;
        }

        return Boolean(_json_state_history.state_history.length > _json_state_history.history_position);
    }

    redo = () => {

        this._maybe_save_state((_json_state_history, saved) => {

            if (this._can_redo(_json_state_history)) {

                _json_state_history.previous_history_position = parseInt(_json_state_history.history_position);
                _json_state_history.history_position += 1;
                const {
                    _original_image_index,
                    pxl_width,
                    pxl_height,
                    _pxl_indexes_of_selection,
                    _s_pxl_colors,
                    _s_pxls,
                    _layers,
                    _layer_index,
                    _pencil_mirror_index,
                    _id
                } = _json_state_history.state_history[_json_state_history.history_position - 1];

                const has_new_dimension = Boolean(pxl_width !== this.state.pxl_width || pxl_height !== this.state.pxl_height);

                if(has_new_dimension) {
                    this.canvas_pos.set_sizes(pxl_width, pxl_height);
                    this.super_canvas.set_dimensions(pxl_width, pxl_height);
                    this.canvas_pos.set_current_scale_default();
                }

                this.setState(Object.assign({}, {
                    _id: parseInt(_id),
                    pxl_width: parseInt(pxl_width),
                    pxl_height: parseInt(pxl_height),
                    _original_image_index: parseInt(_original_image_index),
                    _layers: _layers.map(function(l) {
                        return {
                            id: parseInt(l.id),
                            hash: String(l.hash),
                            name: String(l.name),
                            hidden: Boolean(l.hidden),
                            opacity: parseInt(l.opacity),
                        };
                    }),
                    _layer_index: parseInt(_layer_index),
                    _s_pxls: _s_pxls.map((a) => Array.from(a)),
                    _s_pxl_colors: _s_pxl_colors.map((a) => Uint32Array.from(a)),
                    _pxl_indexes_of_selection: new Set(_pxl_indexes_of_selection),
                    _pencil_mirror_index: parseInt(_pencil_mirror_index),
                    _json_state_history: _json_state_history,
                    _is_there_new_dimension: has_new_dimension,
                    has_shown_canvas_once: !has_new_dimension,
                }), () => {

                    if (has_new_dimension) {

                        this._notify_layers_and_compute_thumbnails_change(() => {

                            this._notify_image_load_complete();
                            this._notify_is_something_selected();
                            this._notify_can_undo_redo_change();
                            this._update_canvas();
                        });
                    }else {

                        this._notify_layers_and_compute_thumbnails_change(() => {

                            this._update_canvas();
                            this._notify_is_something_selected();
                            this._notify_can_undo_redo_change();
                        });
                    }
                });
            }
        });
    }

    to_selection_border = () => {

        const { _s_pxls, pxl_width, pxl_height, _pxl_indexes_of_selection, _s_pxl_colors, _layer_index, pxl_current_opacity } = this.state;
        const pxl_current_color = this.color_conversion.to_uint32_from_hex(this.color_conversion.format_hex_color(this.state.pxl_current_color));

        let pxls = Array.from(_s_pxls[_layer_index]);
        let pxl_colors = Array.from(_s_pxl_colors[_layer_index]);
        let pxls_of_the_border = this._get_border_from_selection(_pxl_indexes_of_selection);

        pxls_of_the_border.forEach((pxl_index) => {

            const current_pxl_color_index = pxls[pxl_index];
            const current_pxl_color = pxl_colors[current_pxl_color_index];
            const current_pxl_new_color = this.color_conversion.blend_colors(current_pxl_color, pxl_current_color, pxl_current_opacity, false, false);

            // Eventually add current color to color list
            if(!pxl_colors.includes(current_pxl_new_color)){

                pxl_colors.push(current_pxl_new_color);
            }

            const current_pxl_new_color_index = pxl_colors.indexOf(current_pxl_new_color);
            pxls[pxl_index] = current_pxl_new_color_index;
        });

        let ns_pxl_colors = this.state._s_pxl_colors;
        ns_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);

        let ns_pxls = this.state._s_pxls;
        ns_pxls[_layer_index] = Array.from(pxls);

        this.setState({_s_pxl_colors: ns_pxl_colors, _s_pxls: ns_pxls, _last_action_timestamp: Date.now()}, () => {

            this._update_canvas();
        });
    }

    to_selection_bucket = () => {

        const { _s_pxls, pxl_width, pxl_height, _pxl_indexes_of_selection, _s_pxl_colors, _layer_index, pxl_current_color, pxl_current_opacity } = this.state;

        let pxls = Array.from(_s_pxls[_layer_index]);
        let pxl_colors = Array.from(_s_pxl_colors[_layer_index])

        let pxl_indexes_of_selection = [..._pxl_indexes_of_selection];
        pxl_indexes_of_selection.forEach((pxl_index) => {

            const current_pxl_color_index = pxls[pxl_index];
            const current_pxl_color = pxl_colors[current_pxl_color_index];
            const current_pxl_new_color = this.color_conversion.blend_colors(current_pxl_color, pxl_current_color, pxl_current_opacity, false, false);

            // Eventually add current color to color list
            if(!pxl_colors.includes(current_pxl_new_color)){

                pxl_colors.push(current_pxl_new_color);
            }

            const current_pxl_new_color_index = pxl_colors.indexOf(current_pxl_new_color);
            pxls[pxl_index] = current_pxl_new_color_index;
        });

        let ns_pxl_colors = this.state._s_pxl_colors;
        ns_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);

        let ns_pxls = this.state._s_pxls;
        ns_pxls[_layer_index] = Array.from(pxls);

        this.setState({_s_pxl_colors: ns_pxl_colors, _s_pxls: ns_pxls, _last_action_timestamp: Date.now()}, () => {

            this._update_canvas();
        });
    }

    to_selection_invert = () => {

        const { _s_pxls, _pxl_indexes_of_selection, _layer_index } = this.state;

        const pxl_indexes_of_selection_set = new Set(_pxl_indexes_of_selection);
        let pxl_indexes_of_selection = new Set();

        for (let i = 0; i < _s_pxls[_layer_index].length; i++) {

            if(!pxl_indexes_of_selection_set.has(i)) {
                pxl_indexes_of_selection.add(i);
            }
        }

        this.setState({_pxl_indexes_of_selection: pxl_indexes_of_selection, _last_action_timestamp: Date.now()}, () => {

            this._update_canvas();
        });
    }

    get_average_color_of_selection = () => {

        return this._get_average_color_of_selection();
    };

    _get_average_color_of_selection = (_pxl_indexes_of_selection, pxls, pxl_colors ) => {

        const { _s_pxls, _s_pxl_colors, _layer_index } = this.state;

        pxls = pxls || Array.from(_s_pxls[_layer_index]);
        pxl_colors = pxl_colors || Uint32Array.from(_s_pxl_colors[_layer_index]);

        const colors_index = [...new Set(pxls)];
        let colors_in_selection_with_occurrence = [];

        colors_index.forEach((ci) => {

            colors_in_selection_with_occurrence[ci] = 1;
        });

        _pxl_indexes_of_selection = _pxl_indexes_of_selection || this.state._pxl_indexes_of_selection;

        [..._pxl_indexes_of_selection].forEach((pxl_index) => {

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

        const { _s_pxls, _pxl_indexes_of_selection, _s_pxl_colors, _layer_index } = this.state;

        let pxls = Array.from(_s_pxls[_layer_index]);
        let pxl_colors = Array.from(_s_pxl_colors[_layer_index]);

        const average_color = this._get_average_color_of_selection();
        const [ac_r, ac_g, ac_b, ac_a] = this.color_conversion.to_rgba_from_uint32(average_color)
        const [ac_h, ac_s, ac_l, ac_o] = this.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(ac_r, ac_g, ac_b, ac_a));
        const global_hue_diff = ac_h - hue;

        [..._pxl_indexes_of_selection].forEach((pxl_index, iteration, array) => {

            const current_pxl_color_index = pxls[pxl_index];
            const current_pxl_color = pxl_colors[current_pxl_color_index];

            const [c_r, c_g, c_b, c_a] = this.color_conversion.to_rgba_from_uint32(current_pxl_color);
            let [c_hue, c_saturation, c_luminosity, c_opacity] = this.color_conversion.to_hsla_from_rgba(Uint8ClampedArray.of(c_r, c_g, c_b, c_a));
            const c_new_hue = Boolean(c_hue + global_hue_diff < 0 ) ? parseInt(parseInt(360 + c_hue + global_hue_diff) % 360): parseInt(parseInt(c_hue + global_hue_diff) % 360);

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

        let ns_pxl_colors = this.state._s_pxl_colors;
        ns_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);

        let ns_pxls = this.state._s_pxls;
        ns_pxls[_layer_index] = Array.from(pxls);

        this.setState({_s_pxl_colors: ns_pxl_colors, _s_pxls: ns_pxls}, () => {

            this.setState(() => {
                _last_action_timestamp: Date.now()
            }, () => {

                this._update_canvas();
            });
        });
    };

    _get_border_from_selection = (selection, inside = true, bold = false) => {

        const { pxl_width, pxl_height } = this.state;

        let pxls_of_the_border = [];

        Array.from(selection).forEach((pxl_index, iteration, array) => {

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

                if(-1 === array.indexOf(up)){
                    pxls_of_the_border.push(up)
                }
                if(-1 === array.indexOf(right)){
                    pxls_of_the_border.push(right)
                }
                if(-1 === array.indexOf(bottom)){
                    pxls_of_the_border.push(bottom)
                }
                if(-1 === array.indexOf(left)){
                    pxls_of_the_border.push(left)
                }

                if(bold) {

                    if(-1 === array.indexOf(up_left)){

                        pxls_of_the_border.push(up_left)
                    }
                    if(-1 === array.indexOf(up_right)){
                        pxls_of_the_border.push(up_right)
                    }
                    if(-1 === array.indexOf(bottom_left)){
                        pxls_of_the_border.push(bottom_left)
                    }
                    if(-1 === array.indexOf(bottom_right)){
                        pxls_of_the_border.push(bottom_right)
                    }
                }

            }else {
                if(
                    -1 === array.indexOf(up) || -1 === up ||
                    -1 === array.indexOf(right) || -1 === right ||
                    -1 === array.indexOf(bottom) || -1 === bottom ||
                    -1 === array.indexOf(left) || -1 === left
                ) {

                    pxls_of_the_border.push(pxl_index);
                }

                if(bold) {

                    if(
                        -1 === array.indexOf(up_left) || -1 === up_left ||
                        -1 === array.indexOf(up_right) || -1 === up_right ||
                        -1 === array.indexOf(bottom_left) || -1 === bottom_left ||
                        -1 === array.indexOf(bottom_right) || -1 === bottom_right
                    ) {

                        pxls_of_the_border.push(pxl_index);
                    }

                }
            }

        });

        return pxls_of_the_border;
    };

    _to_selection_crop = () => {

        let { _s_pxls, _s_pxl_colors, _layer_index, _pxl_indexes_of_selection, pxl_width, pxl_height, _base64_original_images, _original_image_index } = this.state;

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
                let new_pxls = new Array(new_width * new_height).fill(0);
                let new_pxl_colors = [];

                for (let i = 0; i < new_width * new_height; i++) {

                    let x = i % new_width;
                    let y = (i - x) / new_width;

                    x += top_left[0];
                    y += top_left[1];

                    const index = y * pxl_width + x;

                    new_pxls[i] = pxls[index];
                }

                [new_pxls, new_pxl_colors] = this.color_conversion.clean_duplicate_colors(new_pxls, _s_pxl_colors[l]);
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

                    this.canvas_pos.set_sizes(pxl_width, pxl_height);
                    this.super_canvas.set_dimensions(pxl_width, pxl_height);
                    this.canvas_pos.set_current_scale_default();
                    this.setState({
                        _s_pxls: ns_pxls,
                        _s_pxl_colors: ns_pxl_colors,
                        pxl_width: new_width,
                        pxl_height: new_height,
                        _pxl_indexes_of_selection: new Set(),
                        _original_image_index: new_base64_original_images.indexOf(base64_original_image),
                        _last_action_timestamp: Date.now(),
                        _is_there_new_dimension: true,
                        has_shown_canvas_once: false,
                    }, () => {

                        this._update_canvas();
                    })
                };
                image.src = _base64_original_images[_original_image_index];

            }else {

                this.canvas_pos.set_sizes(pxl_width, pxl_height);
                this.super_canvas.set_dimensions(pxl_width, pxl_height);
                this.canvas_pos.set_current_scale_default();
                this.setState({
                    _s_pxls: ns_pxls,
                    _s_pxl_colors: ns_pxl_colors,
                    pxl_width: new_width,
                    pxl_height: new_height,
                    _pxl_indexes_of_selection: new Set(),
                    _last_action_timestamp: Date.now(),
                    _is_there_new_dimension: true,
                    has_shown_canvas_once: false,
                }, () => {

                    this._update_canvas();
                });

            }
        }

    };

    to_selection_size = (grow) => {

        let { _pxl_indexes_of_selection } = this.state;

        _pxl_indexes_of_selection = this._to_selection_size(grow, _pxl_indexes_of_selection);

        this.setState({_pxl_indexes_of_selection}, () => {

            this._update_canvas();
        });

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

        this.setState({_pxl_indexes_of_selection: new Set()}, () => {

            this._update_canvas();
        });
    };

    confirm_import = () => {

        this._merge_import();
    };

    _merge_import = () => {

        let {
            pxl_width,
            pxl_height,
            _imported_image_start_x,
            _imported_image_start_y,
            _imported_image_pxls,
            _imported_image_width,
            _imported_image_height,
            _imported_image_pxl_colors,
            _imported_image_scale_delta_x,
            _imported_image_scale_delta_y,
        } = this.state;

        [_imported_image_pxls, _imported_image_pxl_colors, _imported_image_width, _imported_image_height] = this._get_imported_image_scaled(_imported_image_pxls, _imported_image_pxl_colors, _imported_image_width, _imported_image_height, _imported_image_scale_delta_x, _imported_image_scale_delta_y);

        let imported_image_pxls_positioned = [];
        const has_an_image_imported = _imported_image_pxls.length > 0;

        if(has_an_image_imported) {

            _imported_image_pxls.forEach((pxl, index) => {

                const pos_x = index % _imported_image_width;
                const pos_y = (index - pos_x) / _imported_image_width;

                const current_pos_x_positioned = pos_x + _imported_image_start_x;
                const current_pos_y_positioned = pos_y + _imported_image_start_y;

                const imported_image_pxl_positioned_index = current_pos_y_positioned * pxl_width + current_pos_x_positioned;

                if(current_pos_x_positioned >= 0 && current_pos_x_positioned < pxl_width && current_pos_y_positioned >= 0 && current_pos_y_positioned < pxl_height) {

                    imported_image_pxls_positioned[imported_image_pxl_positioned_index] = pxl;
                }

            });

            let { _s_pxls, _s_pxl_colors, _layer_index } = this.state;

            Object.entries(imported_image_pxls_positioned).forEach((entry) => {

                const [pixel_index, color_index] = entry;

                const old_pixel_color_index = _s_pxls[_layer_index][pixel_index];
                const old_pixel_color_hex = _s_pxl_colors[_layer_index][old_pixel_color_index];
                const top_pixel_color_hex = _imported_image_pxl_colors[color_index];
                const new_pixel_color_hex = this.color_conversion.blend_colors(old_pixel_color_hex, top_pixel_color_hex, 1, false, false);

                if(!_s_pxl_colors[_layer_index].includes(new_pixel_color_hex)) {

                    let pxl_colors = Array.from(_s_pxl_colors[_layer_index]);
                    pxl_colors.push(new_pixel_color_hex);

                    _s_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);
                }

                const new_pixel_color_index = _s_pxl_colors[_layer_index].indexOf(new_pixel_color_hex);
                _s_pxls[_layer_index][pixel_index] = new_pixel_color_index;

            });

            [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = this.color_conversion.clean_duplicate_colors(_s_pxls[_layer_index], _s_pxl_colors[_layer_index]);

            this.setState({
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
            }, () => {

                this._update_canvas();
                this._notify_is_image_import_mode();
            });
        }
    };

    _notify_is_image_import_mode = () => {

        const { _imported_image_pxls } = this.state
        const is_image_import_mode = _imported_image_pxls.length > 0;

        this.setState({_is_image_import_mode: is_image_import_mode});

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

    to_filter = (name = "1997", intensity = 1) => {

        this._to_filter(name, intensity);
    }

    to_mirror = (horizontal = true) => {

        this._invert_pixel(horizontal ? "HORIZONTAL": "VERTICAL");
    };

    to_dutone = (contrast = 0.8, color_a = "#ffffffff", color_b = "#000000ff") => {

        this._to_dutone(contrast, this.color_conversion.to_uint32_from_hex(this.color_conversion.format_hex_color(color_a)), this.color_conversion.to_uint32_from_hex(this.color_conversion.format_hex_color(color_b)));
    };

    _invert_pixel = (direction) => {

        const { _s_pxls, pxl_width, pxl_height, _base64_original_images, _original_image_index, _pxl_indexes_of_selection, _shape_index_a, _select_shape_index_a, _layer_index } = this.state;
        let {_imported_image_pxls, _imported_image_width, _imported_image_height} = this.state;

        let pxls = Array.from(_s_pxls[_layer_index]);

        let new_pxl_indexes_of_selection = new Set();

        let new_shape_index_a = _shape_index_a;
        let new_select_shape_index_a = _select_shape_index_a;

        let ns_pxls = [..._s_pxls];
        let x_scale = 1;
        let y_scale = 1;

        if(direction === "HORIZONTAL") {

            if(_imported_image_pxls.length) {

                let n_imported_image_pxls = new Array(_imported_image_pxls.length);

                _imported_image_pxls.forEach((pxl, index) => {

                    let x = index % _imported_image_width;
                    let y = (index - x) / _imported_image_width;
                    x = (_imported_image_width - 1) - x;
                    let new_index = y * _imported_image_width + x;

                    n_imported_image_pxls[new_index] = pxl;
                });

                _imported_image_pxls = n_imported_image_pxls;
            }else {

                _s_pxls[_layer_index].forEach((pxl, index) => {

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

                let n_imported_image_pxls = new Array(_imported_image_pxls.length);

                _imported_image_pxls.forEach((pxl, index) => {

                    let x = index % _imported_image_width;
                    let y = (index - x) / _imported_image_width;
                    y = (_imported_image_height - 1) - y;
                    let new_index = y * _imported_image_width + x;

                    n_imported_image_pxls[new_index] = pxl;
                });

                _imported_image_pxls = n_imported_image_pxls;
            }else {

                _s_pxls[_layer_index].forEach((pxl, index) => {

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


                this.setState({
                    _shape_index_a: new_shape_index_a,
                    _select_shape_index_a: new_select_shape_index_a,
                    _pxl_indexes_of_selection: new_pxl_indexes_of_selection,
                    _s_pxls: ns_pxls,
                    _base64_original_images: new_base64_original_images,
                    _original_image_index: -1,
                    _is_there_new_dimension: true,
                    _imported_image_pxls
                }, () => {

                    this.setState({_original_image_index: new_base64_original_images.indexOf(base64_original_image), _last_action_timestamp: Date.now()});
                    this._update_canvas();
                })

            };
            image.src = _base64_original_images[_original_image_index];

        }else {


            this.setState({
                _shape_index_a: new_shape_index_a,
                _select_shape_index_a: new_select_shape_index_a,
                _pxl_indexes_of_selection: new_pxl_indexes_of_selection,
                _s_pxls: ns_pxls,
                _last_action_timestamp: Date.now(),
                _imported_image_pxls
            }, () => {

                this._update_canvas();
            });
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

        const { _s_pxls, _s_pxl_colors, _layer_index } = this.state;
        const [ new_pxls, new_pxl_colors ] = this._pxl_colors_to_alpha(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], color, intensity);

        let ns_pxl_colors = this.state._s_pxl_colors;
        ns_pxl_colors[_layer_index] = new_pxl_colors;

        let ns_pxls = this.state._s_pxls;
        ns_pxls[_layer_index] = new_pxls;

        this.setState({_s_pxls: ns_pxls, _s_pxl_colors: ns_pxl_colors, _last_action_timestamp: Date.now()}, () => {

            this._update_canvas();
        });
    }

    _to_less_color = (threshold, callback_function = () => {}) => {

        const { _layer_index } = this.state;
        let { _s_pxls, _s_pxl_colors } = this.state;

        const color_number = _s_pxl_colors[_layer_index].length;
        this._remove_close_pxl_colors(Array.from(_s_pxls[_layer_index]), Uint32Array.from(_s_pxl_colors[_layer_index]), threshold).then(([pxls, pxl_colors]) => {

            _s_pxls[_layer_index] = Array.from(pxls);
            _s_pxl_colors[_layer_index] = Uint32Array.from(pxl_colors);

            const color_remaining_number = _s_pxl_colors[_layer_index].length;
            let results = {
                colors_removed: color_number - color_remaining_number,
                colors_remaining: color_remaining_number,
            };

            this.setState({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}, () => {

                this._update_canvas();
                callback_function(results);
            });
        });
    };

    _auto_adjust_contrast = (intensity = 1) => {

        const { _layer_index } = this.state;
        let { _s_pxls, _s_pxl_colors } = this.state;

        [ _s_pxls[_layer_index], _s_pxl_colors[_layer_index] ] = this._pxl_adjust_contrast(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], intensity);


        this.setState({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}, () => {

            this._update_canvas();
        });
    };

    _auto_adjust_saturation = (intensity = 1) => {

        const { _layer_index } = this.state;
        let { _s_pxls, _s_pxl_colors } = this.state;

        [ _s_pxls[_layer_index], _s_pxl_colors[_layer_index] ] = this._pxl_adjust_saturation(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], intensity);

        this.setState({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}, () => {

            this._update_canvas();
        });
    };

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

        pxl_colors = Uint32Array.from(Array.from(pxl_colors).map((uint32) => {

            const [h, s, l, o] = this.color_conversion.to_hsla_from_rgba(this.color_conversion.to_rgba_from_uint32(uint32));

            const saturation = Math.min(100, Math.max(0, s * alpha + beta));
            const new_saturation = intensity * saturation + (1-intensity) * s;

            return this.color_conversion.to_uint32_from_rgba(this.color_conversion.to_rgba_from_hsla(Array.of(h, new_saturation, l, o)));
        }));

        return Array.of(pxls, pxl_colors);
    };

    _auto_adjust_smoothness = () => {

        const { _layer_index } = this.state;
        let { _s_pxls, _s_pxl_colors } = this.state;

        [ _s_pxls[_layer_index], _s_pxl_colors[_layer_index] ] = this._pxl_adjust_smoothness(_s_pxls[_layer_index], _s_pxl_colors[_layer_index]);


        this.setState({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}, () => {

            this._update_canvas();
        });
    };

    _pxl_to_vignette = (pxls, pxl_colors, color, intensity, callback_function) => {

        const {pxl_width, pxl_height } = this.state;

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
            new_pxls = new_pxls.map((pxl, index) => {

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

            const {_layer_index} = this.state;
            let {_s_pxls, _s_pxl_colors} = this.state;

            this._pxl_to_vignette(_s_pxls[_layer_index], _s_pxl_colors[_layer_index], color, intensity, (result) => {

                [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = result;

                this.setState({_s_pxls, _s_pxl_colors, _last_action_timestamp: Date.now()}, () => {

                    this._update_canvas();
                });

            });
        }
    };


    _to_colorized = (hue = null, opacity = null, blend_with_a_saturation_of = null, blend_with_a_luminosity_of = null) => {

        const { _s_pxl_colors, _layer_index } = this.state;
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

        let ns_pxl_colors = this.state._s_pxl_colors;
        ns_pxl_colors[_layer_index] = _new_pxl_colors;

        this.setState({_s_pxl_colors: ns_pxl_colors, _last_action_timestamp: Date.now()}, () => {

            this._update_canvas();
        });
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

        pxls = Array.from(pxls);
        pxl_colors = Uint32Array.from(pxl_colors);

        pxl_colors = pxl_colors.map((pxl_color) => {

            const [r, g, b, a] = this.color_conversion.to_rgba_from_uint32(pxl_color);
            const [h, s, l] = this.rgb_to_hsl(r, g, b);

            return this.color_conversion.blend_colors(color_a, color_b, (l/100) / contrast, false, false);

        });

        return this.color_conversion.clean_duplicate_colors(pxls, pxl_colors);
    };

    _filter_pixels = (name, intensity = 1, pxls, pxl_colors, remove_duplicate_pxl_colors = true) => {

        pxls = Array.from(pxls);
        const pxl_colors_copy = Uint32Array.from(pxl_colors);

        if(name.toLowerCase() === "greyscale") {

            pxl_colors = pxl_colors.map((color) => {

                let [r, g, b, a] = this.color_conversion.to_rgba_from_uint32(color);
                const average = (r + g + b) / 3;
                return this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(average, average, average, a))
            });

        }else if(name.toLowerCase() === "sepia"){

            pxl_colors = pxl_colors.map((c) => {

                let [r, g, b, a] = this.color_conversion.to_rgba_from_uint32(c);
                function limit_to(n, l) { return n > l ? l: n;}
                const s_r = limit_to((r * .393) + (g *.769) + (b * .189), 255);
                const s_g = limit_to((r * .349) + (g *.686) + (b * .168), 255);
                const s_b = limit_to((r * .272) + (g *.534) + (b * .131), 255);
                return this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(s_r, s_g, s_b, a));
            });
        }else {

            const filters = this._get_filters();
            const filter = filters[name] || filters["1997"];

            pxl_colors = pxl_colors.map((c) => {

                const rgba = this.color_conversion.to_rgba_from_uint32(c);
                return this.color_conversion.to_uint32_from_rgba(Uint8ClampedArray.of(
                    filter["a"][
                        filter["r"][rgba[0]]],
                    filter["a"][
                        filter["g"][rgba[1]]],
                    filter["a"][
                        filter["b"][rgba[2]]],
                    rgba[3]
                ));
            });
        }

        if(intensity !== 1) {

            pxl_colors = pxl_colors.map((hex, index) => {

                return this.color_conversion.blend_colors(pxl_colors_copy[index], hex, intensity, false, false);
            });
        }

        return remove_duplicate_pxl_colors ? this.color_conversion.clean_duplicate_colors(pxls, pxl_colors): [pxls, pxl_colors];
    };

    _to_dutone = (contrast = 0.8, color_a = "#ffffffff", color_b = "#000000ff") => {

        const { _s_pxls, _s_pxl_colors, _layer_index } = this.state;

        [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = this._dutone_pixels(contrast, color_a, color_b, _s_pxls[_layer_index], _s_pxl_colors[_layer_index]);

        this.setState({_s_pxls, _s_pxl_colors, _old_pxls_hovered: -1, _pxls_hovered: -1}, () => {

            this._update_canvas();
        });

    };

    _to_filter = (name, intensity = 1) => {

        const { _s_pxls, _s_pxl_colors, _layer_index } = this.state;

        [_s_pxls[_layer_index], _s_pxl_colors[_layer_index]] = this._filter_pixels(name, intensity, _s_pxls[_layer_index], _s_pxl_colors[_layer_index]);

        this.setState({_s_pxls, _s_pxl_colors, _old_pxls_hovered: -1, _pxls_hovered: -1, _last_action_timestamp: Date.now(), }, () => {

            this._update_canvas();
        });

    }

    _to_rotation = (right = true) => {

        const { pxl_width, pxl_height, _s_pxls, _pxl_indexes_of_selection, _select_shape_index_a, _shape_index_a, _base64_original_images, _original_image_index, _layer_index } = this.state;
        const {_imported_image_pxls, _imported_image_width, _imported_image_height} = this.state;
        let { _is_there_new_dimension } = this.state;

        const new_imported_image_width = _imported_image_height;
        const new_imported_image_height = _imported_image_width;
        let n_imported_image_pxls =  new Array(new_imported_image_width * new_imported_image_height);

        const new_pxl_width = pxl_height;
        const new_pxl_height = pxl_width;
        let ns_pxls = this.state._s_pxls;

        let new_pxl_indexes_of_selection = new Set();
        let new_select_shape_index_a = _select_shape_index_a;
        let new_shape_index_a = _shape_index_a;

        if(_imported_image_pxls.length) {

            _imported_image_pxls.forEach((pxl, index) => {

                const x = index % _imported_image_width;
                const y = (index - x) / _imported_image_width;

                const new_y = right ? x: (new_imported_image_height - 1) - x;
                const new_x = right ? (new_imported_image_width - 1) - y: y;
                const new_index = new_x + new_y * new_imported_image_width;

                n_imported_image_pxls[new_index] = pxl;

            });

        }else {

            _is_there_new_dimension = true;

            for (let i = 0; i < _s_pxls.length; i++) {

                let new_pxls = new Array(new_pxl_width * new_pxl_height).fill(0);

                _s_pxls[i].forEach((pxl, index) => {

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

                let [ ctx, canvas ] = this._get_new_ctx_from_canvas(image.naturalHeight, image.naturalWidth);

                ctx.clearRect(0,0, canvas.width, canvas.height);
                ctx.save();
                ctx.translate(canvas.width / 2,canvas.height / 2);
                ctx.rotate(degrees * Math.PI / 180);
                ctx.drawImage(image,-image.naturalWidth / 2, -image.naturalHeight / 2);
                ctx.restore();

                let base64_original_image = image.src.includes("image/png") ?
                    canvas.toDataURL("image/png"):
                    canvas.toDataURL("image/jpeg");

                ctx = null;
                canvas = null;

                const new_base64_original_images = !_base64_original_images.includes(base64_original_image) ?
                    _base64_original_images.concat([base64_original_image]):
                    _base64_original_images;

                base64_original_image = null;

                this.canvas_pos.set_sizes(pxl_width, pxl_height);
                this.super_canvas.set_dimensions(pxl_width, pxl_height);
                this.canvas_pos.set_current_scale_default();
                this.setState({
                    pxl_width: new_pxl_width,
                    pxl_height: new_pxl_height,
                    _s_pxls: ns_pxls,
                    _pxl_indexes_of_selection: new_pxl_indexes_of_selection,
                    _select_shape_index_a: new_select_shape_index_a,
                    _shape_index_a: new_shape_index_a,
                    _base64_original_images: new_base64_original_images,
                    _original_image_index: new_base64_original_images.indexOf(base64_original_image),
                    _last_action_timestamp: Date.now(),
                    _is_there_new_dimension: true,
                    has_shown_canvas_once: false,
                }, () => {

                    this._update_canvas();
                });

            };
            image.src = _base64_original_images[_original_image_index];

        }else {

            this.canvas_pos.set_sizes(pxl_width, pxl_height);
            this.super_canvas.set_dimensions(pxl_width, pxl_height);
            this.canvas_pos.set_current_scale_default();

            this.setState({
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
                _is_there_new_dimension: true,
                has_shown_canvas_once: false,
            }, () => {

                this._update_canvas();
            });
        }
    };

    _pxl_colors_to_alpha = (pxls, pxl_colors, color, intensity) => {

        pxls = Array.from(pxls);
        pxl_colors = Uint32Array.from(pxl_colors);

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

        const {pxl_width, pxl_height} = this.state;

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

        const state_bucket_threshold = this.state.bucket_threshold;

        return new Promise(function(resolve){

            Object.create(ReducePalette).from(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold).compute(resolve);
        });
    };

    _get_cursor = (_is_on_resize_element, _is_image_import_mode, mouse_down, tool, select_mode, canvas_event_target) => {

        let cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAq0lEQVRYR+1WQQrAIAxb///oDmUOkc3W2kEG2XHQGpPURg6wTzLwqKr2fUQk3Ddc2AMogBqGgo2ARpkhGaKHZtMIKRmnjJLtrBBIU0O9QzvsjrUpyzUd0BgfvAdYWz3StzLUm7KBuWLEKzZPzHjqO8SWElXuX7UnLCCvTCvTFJYsAuarGswp270tQ77FIOQuY0BjQLOM+zuGVlbK7HIpLzXH3vIXGfIwlGXqE9034xUtxdxDAAAAAElFTkSuQmCC") 18 18, auto';

        if(_is_image_import_mode) {

            if(!mouse_down) {

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABFUlEQVRYR+2Y2w6EIAxEl///aDYYa7C2dFqryyb4qsBhOr3E8kl4aq2Vb1NKKZGtQ4v4QQ2oP7/xTQckqYNAuhTSQiMp1IAiqrmBpEMWEPlBMy+qEOKrV0OG+GoBWZm3FFoKtUyiXsvV+P8sk3rVfqvN/BmF0eUhfiDJT136J0BSnEklrUUM1hzdQvMVH0kudWikkvQuMhV2vfEyyMFAtElwMhW5pclSBOIhYDe6I8ppLQQkZdMUQJpKafLsBdQ0tTaMZYK4TD010NNhg039lkohoKdU6ir3qfSYE2N2dR4Zeru8lT1TAmWHTQsXpBBV7iyoEQwMlAVlwbiA7kIhMG6gHsoTQhQmBNQXTStD+/fIz6r2/RftLsg0XDwDiAAAAABJRU5ErkJggg==") 20 18, auto';
            }else {

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVRYR+3X4Q6DIAwEYHn/h2bBQIJNoXcVHEb2c3PZx11hGo7FXmExz7FBViM7oe8lFGOMctUhBPcouL4oEfXvK77TiyJpUMEURALIQOR7DJICSUxaOQLSritImRwNstJwIC+G94K0uhxpXDZkrptPqIX5C6iHsU7d+vPO8OMJjcK04FRlszFV3XZCT2Bo0I2/I3i04MpSQhuUc1VP6uVmKA/c9NrgGVoWlG+s4F3DXkgl9ERKLtCslNw3aLPOJC2dc/FW70uCRtfWqgtKqAz3KFQPA4NGoSwMBbqLQjA0qEYxFaIYF6jsSu2Zvrdj0UfpHwMA+yX+QNKuAAAAAElFTkSuQmCC") 20 24, auto';
            }

            if(_is_on_resize_element) {

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA9ElEQVRYR+3X0Q6FIAgGYDjn/R/5xBmtmjMTmIBd2G3WvsE/VISXPfgyDyyQ1JFbhYiIpI/q94joVukmyPJ/9i+Q1MUpFTpa8wWAzZoxy/puhg7E9b8MlAhiTRnyaJQIQsQPEW1ZKA2I12AWSgvaO5eBsoBSUFZQOErcyx6GHgf9FxH0kU0xJFMjoJD2jYIYZWpffbypI+EBMlWKQWf2WkcXL5AalQlSobJBImoGqIsq51d0hm5n/9beVx5nskG9kbDjZ4Ca7TtLGQ6S7nT19SoFNHqn8xyMnIlrCmtuGikV0kDKNVF7mdXxuN61ZR6qBZKq+Aeqdig0aelV6gAAAABJRU5ErkJggg==") 18 18, auto'
            }

        }else if ((tool === "MOVE" || canvas_event_target.includes("CANVAS_WRAPPER")) && !mouse_down) {

            cursor = "grab";
        }else if((tool === "MOVE" || canvas_event_target.includes("CANVAS_WRAPPER")) && mouse_down){

            cursor = "grabbing";
        }else if (tool === "RECTANGLE") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAv0lEQVRYR+2X3Q6AIAiF5f0fmuaFG6OSH9F00a0IX+dAKZTNHtiMpySQ5Mg/FUJEpMoAwKsQSxSqQI2hsiUQb9whhbjf0lS0dWrDUw5qGc9J9956iL6NFob3hSUH33sWEJvWrmBLLJNG1GCpf+wtE5FAkZa5fx0zLNNaW+O6Yx+lUAJJCgwdP2b0kCXnkh5KIE0PuU+MXF6pmHY9BEhbzBInfdtCzkPTgSwFPLGf3zos0EvuZQlkUUCKTcuOU+gCTnb3JcS3RYIAAAAASUVORK5CYII=") 27 12, auto';
        }else if (tool === "ELLIPSE") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABH0lEQVRYR+2X4Q7CIAyEy0x8//c1WoNhCWOFawvo1PnTAf24HqUEOtgvzORhZs7XDyHAeHBAD3AEWhki2wlUqvmfCpVGRR7LPSSNLX1lMnWeAiE90bSIb/NdMrp6hRZMjJIWfw+QBFOUmCrI8JTVYDQ1Zfgp64FJaRxbGEsgbbVd8zdaoYWZ79bSn5tpKJCw2JWIbpZjNPRy9ezOAlsbW61DPwl0uJR5VJ6ashMInapToY8plPU77v5Jew+2AnTdZYJ/ltjHIVWbO/be9t55ERYCvQalXjnJfiGiR22nvT0U9IS02wS5m9sLAxWSGq3sv51I5atDa+TN+x+ZrAXVmuuBUStkhfLCmIHWxh2pqnmRmBs0FHTWd3jKZgX+GoWe1olaNCjYBWEAAAAASUVORK5CYII=") 25 9, auto';
        }else if (tool === "LINE") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA+klEQVRYR+3Y0Q6DIAwFUOr+/5NdTY1dkJS1YIsmstexcLhArYP0sA88zJN+IERECw4AQhdxAmlzkXmCaNvK3ePkbkson5jO1gQd23RKIr9xtydUu/7HVn5SSl9LiegZ03Tt+cADwEJnv2dC7TfmwpjXqMikrFV3QcRVQLknZQVR0kNQLaAhqFZQOKoHFIrqBYWhroBCUFdB7igPUBX1ryrXGj0vkIhSnoni3J4gM4r7rbKPp9S8QdRtmtsYqfkLB/GipcknSHtZGJ6QdsveC9LaVPqeDvuQhCwYHjMU1PDnxe7jYuleh6TVW1J7J8iSTPGG7P8sa0WU4zdwA0Y04iTpEgAAAABJRU5ErkJggg==") 32 32, auto';
        }else if (tool === "PENCIL") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA7UlEQVRYR+3X2w6EIAwEUPv/H82GRDYE6dUO8KCvEntSBgG6DnvoMM/1gbQZWdKhUkppECISa8JBFdMbqk1CQUEjpnVJQsFAHEZDwUC1cASVDmoBbjmRULOpSwX1xftiniylgWZFJRQX7BSQdVraOOgq04J7h/v/77nHs4141SELRlvm41YSBnkwY5ek/SwEQmEq1A1CYtwgNMYFWoExg1ZhTKCVGBW0GiOCdmBY0C7MFLQT8xqkHdi1K8/s/eNPbe0QAhPuEAoTAiExbhAaw4K4MGrX4EiI0w5oGcVNqwxVyPpd9wHN+uHouONAP0LJ2yWtxGVEAAAAAElFTkSuQmCC") 5 32, auto';
        }else if (tool === "PENCIL PERFECT") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA/0lEQVRYR+3XSw7DIAwE0Pj+h6ZCqiNE/cHAGBbttg1+GagBei770GWe5w/yZiQloVJKYQgRmTXhoIppDdVmoaCgHsMpWSgYSMN4KBioFp5BbQfxAuZ1YqGkqdsKaou3xSJraRtIKmqhtIW9BTQ6Lfw76L/MSOZtykJSahBLCVnTFG2Ibyf39hbt+wjm2wLMDr0EQmEqKjxlSEwYhMaEQBmYYVAWZgiUiXFB2RgTdAKjgk5hRNBJzBCIN0bveDG7BfXP/XRq6ZCVhXET4utUf5XyrjIraZkJSQMjMW5CPQiNUUFa5N41eGWqls5DOwqrL40cfGbs8AFtpkjkmetAH9mVQzQQt8P4AAAAAElFTkSuQmCC") 5 32, auto';
        }else if (tool === "PICKER") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABTUlEQVRYR+2W4RKEIAiEpd7/kS9ubLQxFCGUq5upv5X7uYsghIc98DCe8AJJifzEIUTEDAIAXU13oAhTMkS2HtQUoCS6hhC2MhIKk9/1oIaBsmgSOaA4GAlqCIiJY0XEj1AqO1fLqSGgEMJCxZOIdJjcgOLCFZSKxsmhqA2IuGkiIgXfPG2jkU2F2Xentbfxnal+vPpQ5UwSipBsfBKM1SHOmSXWaTrOp+5cHPGqeVLnr0YmwiSBZm3R5tkqlytAXEx0191Cl6C0QGZn8qDXDlgNkNmZwo04ZfZilwpbAhpyBgDKOPNa5vvQDGdO1xFNz+Nob4Hh+tBtME0g7o5DboNcbYmNT4qtiqwEYnqGG8wVhzK4Nk7JCPZ91yFy/60Gp9R1LVQqoGI4HhoeMKrIWrv0gjEBecKwQL3syTiwlEn3H2mWTReUFnyB/s6hL1JSZjT7s1UhAAAAAElFTkSuQmCC") 5 32, auto';
        }else if (tool === "EXCHANGE") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABoklEQVRYR+2Y61IDMQiFoa2+//tqxdmdJAMJ5JBMR6tTf7ob9gMOl5Tpyf74yXjoXwBdReQzG1lm1k5fiOhrdjYdIRGRash+Y46mjg0vdrDn8xTQAbMCkY3eAdtDIaCLiNx7mJnXGgY5sQoUwjDzjYjuIBI3EfnQUAWgHVsC6tNUo+LlPQLTNurHnf+9EVErEjdlHgwzX1GF9GCBnbUIPQrm+CoqhlTKAiAk/ihrg470ixmgs+lVIXoHqkHdlzwapbUTCrzTHhvPHcG51YRSUdI19JhMf0JAQ6oyMCqKy1AvoBI9oyvd234lQl7DbIO7K8NziJbqeieioToeoaElILVimJauyx0NTSTqNFCmLH80Qn8SKDOjQGM046SfBuG0D1p909XC6DCmHP2YLWKpExdvXLHvpDszXLdWhgwMEQ0b6BZQZu1MAKVgDjt9ylzBzfoGgqlac3ZrV79QQ0GEMjpyl7NiL1yHIZAXgd1rEILxUgZFjVIUPZ9tn/rMUh86PTBX9TmejmT2+pRZ3s0PBKghGm83rk4ZoN0sbZ17AaGwfQNzJa40/U9w+QAAAABJRU5ErkJggg==") 18 18, auto';
        }else if (tool === "BUCKET") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABMklEQVRYR+2XwRLDIAhEpen/f3FTOmaajrUgC5jpxVyD+lwXUCoXfszM5/RERMhSUBAyUR9TYVqGyoZAXQLUw1TYvwFlYCr4VIWyMFOBZsBMA5JgTpOj3vlkYySD2jEjmAhUykPaMR3Sd2UHVSoMZHnG+q+dTAgIXQyNa+HcQN5FvPEuIO/kjam/2siocsNAURgvFAQ0yiZv2bCyLwzkBdHi+3IAAb3P/McHWSipNo2Absy8E9FWSnnOhtIKpQp0+qYfiLQKS7lR1RaBrNteBspqIRLQxswP4fp5L6XsozTOKKN2e2330s48SlnKTAFCjY7CiBc0j0LI8Xlg1BujZWrJK9nWYt4YI4+8FsqrjAlkZcygFRyvVeRRKM0Bt44ooHfcArIUWwothSwFrP/LQ5ZCL65vGzRTMXdZAAAAAElFTkSuQmCC") 6 25, auto';
        }else if (tool === "HUE BUCKET") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABMklEQVRYR+2XwRLDIAhEpen/f3FTOmaajrUgC5jpxVyD+lwXUCoXfszM5/RERMhSUBAyUR9TYVqGyoZAXQLUw1TYvwFlYCr4VIWyMFOBZsBMA5JgTpOj3vlkYySD2jEjmAhUykPaMR3Sd2UHVSoMZHnG+q+dTAgIXQyNa+HcQN5FvPEuIO/kjam/2siocsNAURgvFAQ0yiZv2bCyLwzkBdHi+3IAAb3P/McHWSipNo2Absy8E9FWSnnOhtIKpQp0+qYfiLQKS7lR1RaBrNteBspqIRLQxswP4fp5L6XsozTOKKN2e2330s48SlnKTAFCjY7CiBc0j0LI8Xlg1BujZWrJK9nWYt4YI4+8FsqrjAlkZcygFRyvVeRRKM0Bt44ooHfcArIUWwothSwFrP/LQ5ZCL65vGzRTMXdZAAAAAElFTkSuQmCC") 6 25, auto';
        }else if (tool === "CONTOUR") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA/klEQVRYR+XX7Q6FIAgG4Lz/i/bMlo2ZIB++zO30t1xPgEjlOuwqh3mu/wPVWuuYhVIKGwhohBpm9u5m5FAwEIfp0eJQENAM0zNHIzZDbQdxmJ4ieh8O0tRMGkiqGbrRUlK2KmCu+UJSthPT4KGi3o0JgRAYNwiFcYGQGDMIjTGBMjBqUBbGBLof5seYT++TRgxpSjX1oT5srWBejCpCBPHiJVgEswSNJ3MPNR0laCqjGBOI5p0MW3fUZlH0/s2INbTaXSPMi6DrwiDpD8IDdIN21MsM7AKhMK6iRmLMIDTGBMrAqEFZGBXo6cSmM8+z3d9TILIYsTbty7X440A/uhPvJTjQhwcAAAAASUVORK5CYII=") 8 33, auto';
        }else if (tool === "BORDER") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAk0lEQVRYR+2YwQ6AIAxD2f9/9AgHDyixrs5kxHotHeVtB9Basc+K5WkKhDpyIeTujkyZuplNGZaBTmsy959qjbPvHeir7h0dCBNaGd72b8yoAt1RFCE0YyIkQogA0jVDIoQIIF0zJEKIANI1Q/8jhE7M6PSdmtks4gm/OiLFmbWPAzHFWQ98ubKFs3z6HYNIliPUAQ/FUDSiymd+AAAAAElFTkSuQmCC") 18 18, auto';
        }else if (tool === "SET PENCIL MIRROR") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABR0lEQVRYR+3X3Q6CMAwF4DUY3v91NeIxEGYGbv1jXbzQW2R8nI5uo/RjP/J4AEBzHxGZxzffsGK0z1ndVpQJZMHkBK0oNeiMkapWpmhBqUA1jFCKGcDdgxJBDkyulgvFgi5g3KgmqAPGhVKBLJOy0Z8O5ePG6wGaADylflMmHgnKmAeAmUONAGXMViWprNEgFrM/fEopvYqO/VlyepdMg8mJfVBhCXEDV67Fg/b5sm0/yknMYfI9eSnpXbKvViNhhoI0mGGgCuaWUlpq3TpsUjOfcRMTnpC2TGVSoQntgy8AJiJikxnRGPNSsXZeFSa8ZJoj0Pk/oSX7g84112wvuNQs2+HoTf666h9OutK+KfIYZMZsC7Zmglrf8krJVaDWA7iX8Zxa1QnVuq0mWc/HoE7Ig5ImcO2lzKByxyilJJ3VuoEkyJXrb6IrI0OmlalfAAAAAElFTkSuQmCC") 18 18, auto';
        }else if (tool === "SELECT COLOR THRESHOLD") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABeklEQVRYR82W2w7DIAxDQfv/P57GREWqNM3FlAh1j2trDokdqOVlv/oynnICtdZah6u13iC9Z3JDqzoXoM7SuThUX0D736qs9T6qc6kG/4gWnIGhbyyd/lxuWG5MbY/sWiSiVYug+DNEJwRCRBAgVAcF+pRSfjOJlBUaQKGO6iHq9Uhd2HctadT2Ed4eFEhHTRmL/6e19rXERhXMKrM2uTp8Q/AcklBejK1ZhMwzeFJzMcMfsJbnxWkRDjNacuijKYqCMQWkwFTtv2jRlAp5C2dCQRVCFkTeQSoHAQ2PHIes5Zcso8NAHpR2bj01+hSQBkXT3LmOqHcs6/1pIAmF+GJmJMCTmh0n5KPTU5lQSzdGyzsr7YNujJ5Bs6HC+xCSlkyoEAg1ZBYUChTe9LLSl35jXK3ULWXCM/BNjydrBSqMPW8F6qeV9kGDkRaQwzEaiI8qFYmuPkehqPqPzrJZyAiKW2ELkOcp6cttQBqUFpKtQEhitwMxKHXtP/Eo9zDGipjdAAAAAElFTkSuQmCC") 7 7, auto';
        }else if (tool === "SELECT PATH") {

            cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA/klEQVRYR+XX7Q6FIAgG4Lz/i/bMlo2ZIB++zO30t1xPgEjlOuwqh3mu/wPVWuuYhVIKGwhohBpm9u5m5FAwEIfp0eJQENAM0zNHIzZDbQdxmJ4ieh8O0tRMGkiqGbrRUlK2KmCu+UJSthPT4KGi3o0JgRAYNwiFcYGQGDMIjTGBMjBqUBbGBLof5seYT++TRgxpSjX1oT5srWBejCpCBPHiJVgEswSNJ3MPNR0laCqjGBOI5p0MW3fUZlH0/s2INbTaXSPMi6DrwiDpD8IDdIN21MsM7AKhMK6iRmLMIDTGBMrAqEFZGBXo6cSmM8+z3d9TILIYsTbty7X440A/uhPvJTjQhwcAAAAASUVORK5CYII=") 8 33, auto';
        }else if (tool === "SELECT PIXEL") {

            if(select_mode === "ADD" || select_mode === "REPLACE") {

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABBElEQVRYR+3XyxLCIAwF0PL/H43DIk7EvG5KoOPoGuVwk1jarod92sM8lwnqvXcObq2VH8AFkWHYfgbEk/YOVZ7QwPBKe0mXgmYM9aOFeoPmBqYv8x6SJlIrgYbxUB8gdIi8+DOo5SBKmpKzUNKBlpaMb843Q3ppWVNLm1oordxLQNGy0LrQlEkTpJWAr/Uad6wVklKDuJVQBOON+RyEC9IerghmTsm6YaSe3lWYAYVBlRgYVI2BQDswYdAuTAi0E+OCdmNM0AmMCjqFEUEnMbdB3o0x8xL69U8dTagCk06oCpMCVWJgUDVGBWnN6L0GZ5oYuqCt2AD9Dfg+hG6Arv+DvMReyBw3NCzTf+YAAAAASUVORK5CYII=") 5 32, auto';
            }else if(select_mode === "REMOVE"){

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA9klEQVRYR+3XQRKDMAgFUHP/Q6eTBR2MgQ8I0YXdmpHnh2jajpf92ss8xwdCHdmSUO+9E6S1ptYsBw0MNwybhioFzRhKSUP9QTxW1Gd+XXpaCYNQJxBo78WJ4o+g0kGUNCWnoVYPlNoyXpwX88xS2lCvimooqd0pIGtbaJ1pl3l2Fl+LBnesXSQlBnErIQsGbfM5iDDIg5lT0roRAlVhBtQNqsS4QdUYF2gHxgzahTGBdmIgaDdGBT2BEUFPYZagJzG3QejEGPlgX97U1oQqMOGEqjAhUCXGDarGiCBpGNHf4MgQpx3QMoqv7uE+D1VB6L4fCCX8A+VV8SWc4ctzAAAAAElFTkSuQmCC") 5 32, auto';
            }else if(select_mode === "REPLACE") {

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABNUlEQVRYR+3X4Q6EIAgAYLn3f+a42aIZgYCFddv165aXfiKYQXnZBS/zlN8AISICwKeUgiyCgIgLAKRN5NTxhimIWBiKMNTmRtU+aWLWZA6dEoYeblAVUSOzB2xrM1FKn+pzvGGPQouqvwWMtKSHFeYYNlERJd08odpRhKUUC1XDWCgtdCLKi2kGrcWh7izSst8OogSm5O1FygsaXrJ28HawSC7dltTSoD2UVqW3lL13Wdge56uy6MZoVVPNaCFS7n1orQjvq8ODscqcl6C502o1G8HwKPVOGEOgLMz6RoiehzIxYVA2JgSagXGDZmFcoJkYEzQb0wU9gVFBT2FE0JOYyyDvQT+y+aqfQVYnGZjhCGVhhkCZmDAoG6OCtPyxPoOtvPO0h48fnk6v/OcPsqL3ugh9ATjCXTQqEhJmAAAAAElFTkSuQmCC") 18 18, auto';
            }
        }else if (tool === "SELECT PIXEL PERFECT") {

            if(select_mode === "ADD") {

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABFUlEQVRYR+3XWQ7DIAwE0HD/QxNRycil3oZigqrmm4jHmLVch33lMM9lgmqtlYNLKekDcEFkaLafAfGkvUGlJ9QwvNJe0qmgEUPz0UJ10DiB6Wc+h6QVqZVAw3ioNxC6iLz4Z1DLQZQ0JWehpAEtLRnvnHeGzKVlk1rq1EJp5V4CipaF2oVWmbSCtBLwtkYyvZmQlBrEVwlZZUI3xL7NWKe9dbgimNaHt0WEQBo2C9P6g68TmRgYlI2BQDswYdAuTAi0E+OCdmNM0BMYFfQURgQ9iQmBaMv3rherHpwfO7V0wu/CuAnRw3W8a0cPypnUzISUO1LqCxYCZSajXj+099mrvug7aaJm8PVjog/olz/Ii+u4hG5e9580PRb9NQAAAABJRU5ErkJggg==") 5 32, auto';
            }else if(select_mode === "REMOVE"){

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABBklEQVRYR+3Xyw6EMAgFUPn/j+6kCwwqj14t1Emc7TRyvFSqtL3sRy/zbB8o6khJQq21xhAicmumgzpGGrrNQ6WCzhhOyUPtIBlr1Gf5v3W3FiZCHUBBey/OKP47qOkgTpqT81DaDU1tmSwuiyF7adqm1op6KKvdU0CjbeF1Q08Z8mTJtU4y+zIlKTOIRwl5bUIH4j7JE5KhaD95NW8lhCTTi0fz6jBo0YQyMd0CJZSNgUAVmGFQFWYIVIkJQdUYF7QCY4JWYVTQSswQiKfsk+MAGb6Xwai9ZFVhwoT4c+r8ro2cTUg6IUi7WCYGBmVjTJAVc/QZjLZHWw+d9jMKRtf4QH+X0A98MFk0IsucOwAAAABJRU5ErkJggg==") 5 32, auto';
            }else if(select_mode === "REPLACE"){

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABUklEQVRYR9WX7RKEIAhFZd//mZcdG2mIQMDS2v3VbAbHi3wI5WU/eBlP+Q8gREQA+JRSUCgIiPgFgGkbORluMAURi4AiGHoXhqo2aWPeZg5GCYY+ZlAVoiqzC9beuVCGTfM7+WJXgUPVZwVGC+khwhJGbFSF0v48QXEvSijVRLVgPChLOhUqCsOc1uQwK4sW9tuB6ADT4e0pFQUaDhl3zp1lztJth1pz2oOysvSWtI+GRdS4WJZlC2NHGbVmtfXhOrQZibaOXpiyBXGv5KPdPgPTNlmLq1vZ3QUa8CyYrSNkFZoJkwaaDZMCWgETBloFEwJaCeMCrYbpAj0BYwI9BaMCPQkTAqIxwRsvsgXWWm9eg3j/WQXjKkTXKdkTo1egEdW6ChmNNdS1R2BchaTRmcqY8xC/9kqgyDwzqszlAe2q43CWzXIUtZse0KKGR9e9DugHz47FNAGTbH0AAAAASUVORK5CYII=") 5 32, auto';
            }
        }else if(tool.includes("SELECT")) {

            if(select_mode === "ADD") {

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAkElEQVRYR+2XQQqAMAwEm/8/OpKDUApmUwoScbwmpdNpXNRGs8ea8QyA1I1g6H+G3N3nU5vZ0RgcLQ6QALoZgg2gdSgxpF5TDGEoM7CG3lPvnEPKaNSzrEqDcR7YykaVHhWe3wOqnPq1K6vAkEPKEoYwpAyoOjNUMdTqI18B79aP/zp2N1T9AGFIGVD1djN0AfXGlCWHImsNAAAAAElFTkSuQmCC") 18 18, auto';
            }else if(select_mode === "REMOVE") {

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAb0lEQVRYR+2UQQrAIBDEdv7/6C0+oAYWClriNbiOcTB12MphecpA9CIa0hAZIG6HNEQGiNshDZEB4tsOdXfTgAlP8nouBtrsnWSpdcd/BRppgE1jQ1+EoZl+jBoiA8TtkIbIAHE7pCEyQNwOXWfoAYpLFiWYvOCxAAAAAElFTkSuQmCC") 18 18, auto';
            }else if(select_mode === "REPLACE") {

                cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABCElEQVRYR+2X3Q6DMAiFwb3/I8+zYFbj5ixwmixsqTdeWNqPw09RpdijxXhkAnkRmQr9p0IAoKo3EVk9Dy++LwDuquqmiLvgCbMCWEgoBbCq2sv86kN1gRqMiCzmOQBJQjVlmnDNsctzPYWad3skElCUrQdkIMzGjM3mdAQoC0XDZICiUEMwWSAPymrAqonJt90mGrJje3mvnK36NtpBGEahBnYKzZE4UYmnPsoo1IUagRlR6GM+kc3zRSVWoVIhK5XUvT7z9bKPNL3Imu4EE82hzEGZtVTZMwcwNqHLld6YnBL6t33FAc3uKZs7a4ywLeNKDfnkXwZtFi17+oCs4QTyFJsK/ZxCD73aLDSws54nAAAAAElFTkSuQmCC") 18 18, auto';
            }
        }

        return cursor;
    };
    
    _request_force_update = (can_be_cancelable = false, especially_dont_force = false, callback_function = () => {}) => {

        const {_force_updated_timestamp } = this.state;
        const now = Date.now();

        const min_fps = this.sraf.get_state().is_mobile_or_tablet ? 25: 75;
        const nevertheless_force = Boolean((_force_updated_timestamp + 1000 / min_fps) < now);
        const nevertheless_for_sure_force = Boolean((_force_updated_timestamp + 1000 / (min_fps / 10)) < now);

        if(can_be_cancelable && !nevertheless_force && !nevertheless_for_sure_force) {

            return;
        }

        this.sraf.run_frame(() => {

            this.forceUpdate(() => {

                this.setState({_force_updated_timestamp: now});
                callback_function();
            });
        }, Boolean(!can_be_cancelable || nevertheless_force), Boolean(!especially_dont_force || nevertheless_force));
    }

    _update_canvas_container_size = () => {

        const rect = this.state._canvas_container ? this.state._canvas_container.getBoundingClientRect(): null;

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
            _loading_base64_img,
            show_image_only_before_canvas_set,
            has_shown_canvas_once,
            _is_there_new_dimension,
            perspective,
            light,
            _kb,
            _base64_original_images
        } = this.state;

        const {canvas_wrapper, device_pixel_ratio, scale, sizes, canvas_event_target} = this.canvas_pos.get_state();
        const {mouse_down} = this.canvas_pos.get_pointer_state();
        const screen_zoom_ratio = this.canvas_pos.get_screen_zoom_ratio();
        const {box_shadow} = this.canvas_pos.get_style();
        let { perspective_coordinate } = this.state;

        const is_mobile_or_tablet = this.sraf.get_state().is_mobile_or_tablet;
        const p = is_mobile_or_tablet ? 0: perspective / 4;

        let background_image_style_props = show_original_image_in_background && typeof _base64_original_images[_original_image_index] !== "undefined" ?
            {
                background: `center / cover no-repeat url("${_base64_original_images[_original_image_index]}")`,
            }:
            show_transparent_image_in_background ?
                {
                    background: `repeating-conic-gradient(rgb(248 248 248 / 100%) 0% 25%, rgb(235 235 235 / 100%) 0% 50%) left top 50% / calc(200% / ${sizes.width}) calc(200% / ${sizes.height})`,
                }: {};

        background_image_style_props = show_original_image_in_background && _loading_base64_img.length ?
            {
                background: `center / cover no-repeat url("${_loading_base64_img}")`
            }: background_image_style_props;

        background_image_style_props = (show_image_only_before_canvas_set && !has_shown_canvas_once) || !show_image_only_before_canvas_set ?
            background_image_style_props: {};

        const canvas_wrapper_width = Math.round(sizes.width * screen_zoom_ratio * scale.current);
        const canvas_wrapper_height = Math.round(sizes.height * screen_zoom_ratio * scale.current);

        const l = is_mobile_or_tablet ? 0: light * p * 2;

        const filter_force = (1 - (p/200) * l) + (
                                    (
                                        l * (3*p - Math.floor((perspective_coordinate[0]+p)*10) / (p*3*10)) / 2 +
                                        l * (Math.floor((perspective_coordinate[1]+p)*10) / (p*3*10)) / 2
                                    ) / (3*p) * (p/100));

        const padding = Math.floor(canvas_wrapper.padding / device_pixel_ratio * scale.current);

        const rotate_x = Math.round((perspective_coordinate[1] * p / scale.current) * 1000) / 1000;
        const rotate_y = Math.round((perspective_coordinate[0] * p / scale.current) * 1000) / 1000;

        const cursor = this._get_cursor(_is_on_resize_element, _is_image_import_mode, mouse_down, tool, select_mode, canvas_event_target);

        return (
            <div onContextMenu={(e) => {e.preventDefault()}} ref={this._set_canvas_container_ref} draggable={"false"} style={{zIndex: 11, boxSizing: "border-box", position: "relative", overflow: "visible", touchAction: "none", userSelect: "none", contain: "paint"}} className={className}>
                <div ref={this._set_canvas_wrapper_overflow_ref}
                     className={"Canvas-Wrapper-Overflow" + (Boolean(has_shown_canvas_once || !_is_there_new_dimension) ? " Shown ": " Not-Shown ")}
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
                         perspective: `${Math.round(Math.max(canvas_wrapper.width, canvas_wrapper.height))}px`,
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
                             boxShadow: `${box_shadow}`,
                             filter: `opacity(${Boolean(has_shown_canvas_once || !_is_there_new_dimension) ? "1": "0"})`,
                             webkitFilter: `opacity(${Boolean(has_shown_canvas_once || !_is_there_new_dimension) ? "1": "0"})`,
                             transform: `translate(${Math.round(scale.move_x * 100) / 100}px, ${Math.round(scale.move_y * 100) / 100}px) ${(rotate_x || rotate_y) ? `rotateX(${rotate_x}deg) rotateY(${rotate_y}deg)`: ``}`,
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
                                width: Math.floor(sizes.width),
                                height: Math.floor(sizes.height),
                                transform: `scale(${(screen_zoom_ratio * scale.current).toFixed(3)})`,
                                transformOrigin: "left top",
                                boxSizing: "content-box",
                                borderWidth: 0,
                                ...background_image_style_props,
                            }}
                            className={"Canvas-Pixels"}
                            ref={this._set_canvas_ref}
                            width={Math.floor(sizes.width)}
                            height={Math.floor(sizes.height)}/>
                        {
                            Boolean(p) &&
                            <div className={"Canvas-Pixels-Cover"}
                                 datatexttop={`D[${sizes.width}, ${sizes.height}]px // S[${_kb.toFixed(2)}]Kb`}
                                 datatextbottom={`??Z[${screen_zoom_ratio.toFixed(2)}, ${scale.current.toFixed(2)}]x // ??R[${(perspective_coordinate[1] * p / scale.current).toFixed(2)}, ${(perspective_coordinate[0] * p / scale.current).toFixed(2)}]??`}
                                 draggable={"false"}
                                 style={{
                                     backgroundImage: p ? `linear-gradient(to left, rgba(
                            ${255 - Math.floor((perspective_coordinate[0]+p) / (p*2) * 255)},
                            ${255 - Math.floor((perspective_coordinate[0]+p) / (p*2) * 255)},
                            ${255 - Math.floor((perspective_coordinate[0]+p) / (p*2) * 255)}, 
                            ${(Math.abs(perspective_coordinate[0]) / p / 6 * 0.3 * (p*l/100)).toFixed(2)}
                            ), rgba(
                            ${255 - Math.floor((perspective_coordinate[0]+p) / (p*2) * 255)},
                            ${255 - Math.floor((perspective_coordinate[0]+p) / (p*2) * 255)},
                            ${255 - Math.floor((perspective_coordinate[0]+p) / (p*2) * 255)}, 
                            ${(Math.abs(perspective_coordinate[0]) / p / 6 * 3 * (p*l/100)).toFixed(2)}
                            )), linear-gradient(to top, rgba(
                            ${Math.floor((perspective_coordinate[1]+p) / (p*2) * 255)},
                            ${Math.floor((perspective_coordinate[1]+p) / (p*2) * 255)},
                            ${Math.floor((perspective_coordinate[1]+p) / (p*2) * 255)}, 
                            ${(Math.abs(perspective_coordinate[1]) / p / 6 * 2 * (p*l/100)).toFixed(2)}
                            ), rgba(
                            ${Math.floor((perspective_coordinate[1]+p) / (p*2) * 255)},
                            ${Math.floor((perspective_coordinate[1]+p) / (p*2) * 255)},
                            ${Math.floor((perspective_coordinate[1]+p) / (p*2) * 255)}, 
                            ${(Math.abs(perspective_coordinate[1]) / p / 6 * 1 * (p*l/100)).toFixed(2)}
                            ))`: "none",
                                     zIndex: 3,
                                     borderRadius: canvas_wrapper_border_radius,
                                     padding: 0,
                                     left: 0,
                                     top: 0,
                                     borderWidth: 0,
                                     position: "absolute",
                                     width: Math.ceil(canvas_wrapper.width + 2 * padding),
                                     height: Math.ceil(canvas_wrapper.height + 2 * padding),
                                     boxSizing: "content-box",
                                     touchAction: "none",
                                     pointerEvents: "none",
                                     userSelect: "none",
                                     willChange: (perspective && (rotate_x || rotate_y)) ? "filter, background-image": "",
                                     filter: Boolean(p) && `brightness(${filter_force}) contrast(${filter_force})`,
                                     webkitFilter: Boolean(p) && `brightness(${filter_force}) contrast(${filter_force})`,
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
