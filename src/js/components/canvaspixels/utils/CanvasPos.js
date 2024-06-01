const tempInt32 = new Int32Array(15);
const CanvasPos = {
    _get_init_state(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width, perspective) {
        "use strict";
        return {
            canvas_event_target: "CANVAS_WRAPPER_OVERFLOW",
            canvas_container: {
                top: 0,
                left: 0,
                height: 0,
                width: 0
            },
            sizes: {
                width: pxl_width | 0,
                height: pxl_height | 0
            },
            screen_zoom_ratio: 1,
            canvas_wrapper: {
                padding: canvas_wrapper_padding | 0,
                border_width: canvas_wrapper_border_width | 0
            },
            scale: {
                default: default_scale,
                current: default_scale,
                move_x: 0,
                move_y: 0,
                moves_speeds: new Array(),
                move_speed_timestamp: Date.now() | 0,
                moves_speed_average_now: 16,
            },
            device_pixel_ratio: window.devicePixelRatio,
            perspective: perspective
        };
    },
    _get_screen_zoom_ratio(s) {
        "use strict";
        if(s.canvas_container.width > s.canvas_container.height) {

            return (s.canvas_container.height - s.canvas_wrapper.padding / s.device_pixel_ratio * 2) / s.sizes.height;
        }else {

            return (s.canvas_container.width - s.canvas_wrapper.padding / s.device_pixel_ratio * 2) / s.sizes.width;
        }
    },
    _get_pos(s, szr, o){
        "use strict";
        // canvas_wrapper_border_box_extra_size
        tempInt32[0] = Math.round(s.canvas_wrapper.padding / s.device_pixel_ratio * s.scale.current + s.canvas_wrapper.border_width) * 2 | 0;
        // canvas_wrapper_width
        tempInt32[1] = Math.round(s.sizes.width * szr * s.scale.current) + tempInt32[0] | 0;
        // canvas_wrapper_height
        tempInt32[2] = Math.round(s.sizes.height * szr * s.scale.current) + tempInt32[0] | 0;
        // canvas_wrapper_offset_left
        tempInt32[3] = s.scale.move_x | 0;
        // canvas_wrapper_offset_top
        tempInt32[4] = s.scale.move_y | 0;
        // canvas_wrapper_left
        tempInt32[5] = s.canvas_container.left + tempInt32[3] | 0;
        // canvas_wrapper_top
        tempInt32[6] = s.canvas_container.top + tempInt32[4] | 0;
        // canvas_wrapper_right
        tempInt32[7] = tempInt32[5] + tempInt32[1] | 0;
        // canvas_wrapper_bottom
        tempInt32[8] = tempInt32[6] + tempInt32[2] | 0;
        // canvas_offset_left
        tempInt32[9] = tempInt32[0] / 2 | 0;
        // canvas_offset_top
        tempInt32[10] = tempInt32[0] / 2 | 0;
        // canvas_left
        tempInt32[11] = tempInt32[5] + tempInt32[9] | 0;
        // canvas_top
        tempInt32[12] = tempInt32[6] + tempInt32[10] | 0;
        // canvas_right
        tempInt32[13] = tempInt32[7] - tempInt32[0] / 2 | 0;
        // canvas_bottom
        tempInt32[14] = tempInt32[8] - tempInt32[0] / 2 | 0;

        if (typeof o === 'undefined'){ o = {}};

        if (typeof o.canvas === 'undefined') {
            o.canvas = {};
        }
        o.canvas.offset_left = tempInt32[9];
        o.canvas.offset_top = tempInt32[10];
        o.canvas.left = tempInt32[11];
        o.canvas.top = tempInt32[12];
        o.canvas.right = tempInt32[13];
        o.canvas.bottom = tempInt32[14];
        o.canvas.width = tempInt32[13] - tempInt32[11] | 0;
        o.canvas.height = tempInt32[14] - tempInt32[12] | 0;

        if (typeof o.canvas_wrapper === 'undefined') {
            o.canvas_wrapper = {};
        }
        o.canvas_wrapper.offset_left = tempInt32[3];
        o.canvas_wrapper.offset_top = tempInt32[4];
        o.canvas_wrapper.left = tempInt32[5];
        o.canvas_wrapper.top = tempInt32[6];
        o.canvas_wrapper.right = tempInt32[7];
        o.canvas_wrapper.bottom = tempInt32[8];
        o.canvas_wrapper.width = tempInt32[7] - tempInt32[5]| 0;
        o.canvas_wrapper.height = tempInt32[8] - tempInt32[6]| 0;

        if (typeof o.canvas_container === 'undefined') {
            o.canvas_container = {};
        }
        o.canvas_container.offset_left = s.canvas_container.left | 0;
        o.canvas_container.offset_top = s.canvas_container.top | 0;
        o.canvas_container.left = s.canvas_container.left | 0;
        o.canvas_container.top = s.canvas_container.top | 0;
        o.canvas_container.right = s.canvas_container.left + s.canvas_container.width | 0;
        o.canvas_container.bottom = s.canvas_container.top + s.canvas_container.height | 0;
        o.canvas_container.width = s.canvas_container.width | 0;
        o.canvas_container.height = s.canvas_container.height | 0;

        return o;
    },
    _get_init_pointer_state() {
        "use strict";
        return {
            event_button: null,
            mouse_down: false,
            pointer_events: new Map(),
            previous_single_pointer_down_timestamp: 0,
            previous_double_pointer_down_timestamp: 0,
            latest_pointers_distance: 0,
            latest_pointers_client_x_center: 0,
            latest_pointers_client_y_center: 0,
            previous_double_pointer_move_timestamp: 0
        };
    },
    _copy_event(event) {
        "use strict";
        return {
            pointerId: event.pointerId | 0,
            clientX: event.clientX | 0,
            clientY: event.clientY | 0,
            pageX: event.pageX | 0,
            pageY: event.pageY | 0,
            button: event.button | 0
        };
    },
    _get_shadows(hex){

        const color_conversion = {
            format_hex_color(hex) { // Supports #fff (short rgb), #fff0 (short rgba), #e2e2e2 (full rgb) and #e2e2e2ff (full rgba)
                "use strict";
                const l = hex.length | 0;
                if(typeof hex === "undefined"){

                    return "#00000000";
                } else {

                    let a = "", b = "", c = "", d = "";
                    let formatted = "#12345678";

                    switch(l) {

                        case 9:
                            formatted = hex;
                            break;
                        case 7:
                            formatted = hex.concat("ff");
                            break;
                        case 5:
                            a = hex.charAt(1); b = hex.charAt(2); c = hex.charAt(3); d = hex.charAt(4);
                            formatted =  "#".concat(a, a, b, b, c, c, d, d);
                            break;
                        case 4:
                            a = hex.charAt(1); b = hex.charAt(2); c = hex.charAt(3);
                            formatted = "#".concat(a, a, b, b, c, c, "ff");
                            break;
                    }

                    return formatted;
                }
            },
            to_hex_from_rgba(rgba) {
                "use strict";
                return "#".concat("00000000".concat(new Uint32Array(rgba.reverse().buffer)[0].toString(16)).slice(-8));
            },
            to_rgba_from_hex(hex) {
                "use strict";
                return new Uint8ClampedArray(Uint32Array.of(parseInt(hex.slice(1), 16)).buffer).reverse();
            }
        };

        function create_shadow(px){
            "use strict";
            const RGBA = color_conversion.to_rgba_from_hex(color_conversion.format_hex_color(hex));
            let hex_umbra = color_conversion.to_hex_from_rgba(Uint8ClampedArray.of(RGBA[0], RGBA[1], RGBA[2], parseInt(0.56 * 255)));
            let hex_penumbra = color_conversion.to_hex_from_rgba(Uint8ClampedArray.of(RGBA[0], RGBA[1], RGBA[2], parseInt(0.36 * 255)));
            let hex_ambiant = color_conversion.to_hex_from_rgba(Uint8ClampedArray.of(RGBA[0], RGBA[1], RGBA[2], parseInt(0.24 * 255)));

            return Array.of(
                `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px ${hex_umbra}`,
                `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px ${hex_penumbra}`,
                `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px ${hex_ambiant}`,
            ).join(',')        }

        return Array.of(
            '',
            create_shadow([0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0]),
            create_shadow([0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0]),
            create_shadow([0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0]),
            create_shadow([0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0]),
            create_shadow([0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0]),
            create_shadow([0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0]),
            create_shadow([0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1]),
            create_shadow([0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2]),
            create_shadow([0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2]),
            create_shadow([0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3]),
            create_shadow([0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3]),
            create_shadow([0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4]),
            create_shadow([0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4]),
            create_shadow([0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4]),
            create_shadow([0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5]),
            create_shadow([0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5]),
            create_shadow([0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5]),
            create_shadow([0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6]),
            create_shadow([0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6]),
            create_shadow([0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7]),
            create_shadow([0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7]),
            create_shadow([0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7]),
            create_shadow([0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8]),
            create_shadow([0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8]),
        );
    },


    from(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width, perspective){
        "use strict";
        const gszr = this._get_screen_zoom_ratio;
        const cis = this._get_init_state;
        const gips = this._get_init_pointer_state;
        const gp = this._get_pos;
        const gsh = this._get_shadows;
        const ce = this._copy_event;

        let move_on_click = false;
        let sh = gsh("#020529");
        let ps = gips();
        let s = cis(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width, perspective);
        let szr = gszr(s);
        let p = gp(s, szr);
        let notifiers = {
            update(){},
            menu(){},
            move(){},
            up(){},
            down(){},
            middle(){},
            ripple(){}
        };

        let msi = null;
        let pe = null;
        let style = {box_shadow: "", will_change: false};

        return {
            // Methods
            init_speed_interval: function() {
                "use strict";
                if(msi !== null){

                    setTimeout(this.set_move_speed_average_now, 5)

                }else {

                    msi = setInterval(this.set_move_speed_average_now, 20);
                }
            },
            set_canvas_wrapper: function(padding, border_width){
                "use strict";
                s.canvas_wrapper = {padding, border_width};
                szr = gszr(s);
                p = gp(s, szr);
                this.set_current_scale_default();
            },
            set_canvas_container: function(top, left, height, width){
                "use strict";
                s.canvas_container = {top, left, height, width};
                szr = gszr(s);
                p = gp(s, szr);
                this.set_current_scale_default();
            },
            set_sizes: function(width, height) {
                "use strict";
                s.sizes = {width, height};
                s.scale.moves_speed_average_now = 16;
                szr = gszr(s);
                p = gp(s, szr);
            },
            set_perspective: function(perspective) {
                "use strict";
                s.perspective = perspective;
            },
            get_pointer_state: function() {
                "use strict";
                return ps; // Warning
            },
            get_perspective_state: function() {
                "use strict";
                return pe || {};
            },
            get_screen_zoom_ratio: function() {
                "use strict";
                return Math.fround(parseFloat(szr)).toFixed(2);
            },
            compute_perspective_from_pointer_event: function(pageX, pageY) {
                "use strict";
                pageX = pageX | 0;
                pageY = pageY | 0;

                if(!Boolean(s.perspective > 0)) { return; }

                const pos_x_in_canvas_container = pageX - p.canvas_container.left | 0;
                const pos_y_in_canvas_container = pageY - p.canvas_container.top | 0;

                const x = s.perspective * (pos_x_in_canvas_container - p.canvas_container.width / 2) / (p.canvas_container.width / 2);
                const y = -s.perspective * (pos_y_in_canvas_container - p.canvas_container.height / 2) / (p.canvas_container.height / 2);
                const p_x = x > s.perspective ? x : x * 2;
                const p_y = y < 0 ? y : 2 * y;
                const p_x_things = 255 - p_x / 2 * 255;
                const p_y_things = p_y / 2 * 255;

                const rotate_y = (p_x * 1.25 / s.scale.current * 1000 | 0) / 1000;
                const rotate_x = (p_y * 1.25 / s.scale.current * 1000 | 0) / 1000;
                const any_rotation = Boolean(rotate_x || rotate_y);

                const transform_rotate = any_rotation ? `rotateX(${rotate_x}deg) rotateY(${rotate_y}deg)`: ``
                const background_image = any_rotation ? `linear-gradient(to right, rgba(
                            ${p_x_things.toFixed(3)},
                            ${p_x_things.toFixed(3)},
                            ${p_x_things.toFixed(3)}, 
                            ${(Math.abs(p_x * 0.1) / (s.perspective*2)).toFixed(2)}
                            ), rgba(
                            ${p_x_things.toFixed(3)},
                            ${p_x_things.toFixed(3)},
                            ${p_x_things.toFixed(3)}, 
                            ${(Math.abs(p_x * 0.6) / (s.perspective*2)).toFixed(2)}
                            )), linear-gradient(to top, rgba(
                            ${p_y_things.toFixed(3)},
                            ${p_y_things.toFixed(3)},
                            ${p_y_things.toFixed(3)}, 
                            ${(Math.abs(p_y * 0.75) / (s.perspective*2)).toFixed(2)}
                            ), rgba(
                            ${p_y_things.toFixed(3)},
                            ${p_y_things.toFixed(3)},
                            ${p_y_things.toFixed(3)}, 
                            ${(Math.abs(p_y  * 0.25) / (s.perspective*2)).toFixed(2)}
                            ))`: ``;
                const filter_force = (1 + (-rotate_y + rotate_x) / 80).toFixed(2);
                const filter = any_rotation ? `brightness(${filter_force}) contrast(${filter_force})`: "";

                pe = {
                    transform_rotate,
                    background_image,
                    filter
                };
            },
            set_pointer_state: function(new_props) {
                "use strict";
                var key = "", notify_cursor = false;
                if("mouse_down" in new_props){
                    if(ps.mouse_down !== new_props.mouse_down) {
                        notify_cursor = true;
                    }
                }
                for (key in new_props) {

                    ps[key] = new_props[key];
                }
                if(notify_cursor) {
                    this.notify_cursor();
                }
            },
            set_moves: function(new_scale_move_x, new_scale_move_y,  new_scale, callback_function) {
                "use strict";
                new_scale = new_scale || null;
                callback_function = callback_function || function(){};
                let new_scale_move_speed_timestamp = Date.now();

                const {scale, canvas_event_target} = s;
                const max_move_speed = Boolean(canvas_event_target !== "CANVAS_WRAPPER_OVERFLOW") ? 18: 24;

                let {
                    move_x,
                    move_y,
                    moves_speeds,
                    move_speed_timestamp,
                    current
                } = scale;

                const time_difference_moves = new_scale_move_speed_timestamp - move_speed_timestamp | 0;
                const x_diff = move_x - new_scale_move_x | 0;
                const y_diff = move_y - new_scale_move_y | 0;
                const space_difference_moves = Math.sqrt((x_diff * x_diff) + (y_diff * y_diff)) | 0;
                const move_speed = Math.min(Math.round((space_difference_moves / time_difference_moves) * 200), 200) | 0;

                moves_speeds.push(move_speed);

                if(moves_speeds.length >= max_move_speed) {

                    moves_speeds.shift();
                }

                let moves_speed_average = moves_speeds.slice(-max_move_speed).reduce((p,c,i,a) => p+(c/a.length), 0);
                moves_speed_average = Math.max(1, Math.round(Math.floor(moves_speed_average * max_move_speed/200 )))
                const is_new_scale = Boolean(new_scale !== null);
                s.scale.default = Math.fround(parseFloat(scale.default));
                s.scale.current = Math.fround(parseFloat(!is_new_scale ? current: new_scale));
                s.scale.move_x = new_scale_move_x | 0;
                s.scale.move_y = new_scale_move_y | 0;
                s.scale.move_speed_timestamp = Date.now();
                s.scale.moves_speeds = moves_speeds;
                s.scale.moves_speed_average_now = Boolean(new_scale !== null && new_scale > current) ? max_move_speed: Boolean(new_scale !== null && new_scale < current) ? 0: parseInt(moves_speed_average);

                szr = gszr(s);
                p = gp(s, szr, p);
                this.notify_moved(callback_function);
            },
            set_notifiers: function(callback_function_update = function(){}, callback_function_menu = function(){}, callback_function_move = function(){}, callback_function_up = function(){}, callback_function_down = function(){}, callback_function_middle = function(){}, callback_function_cursor = function(){}, callback_function_ripple = function(){}) {

                notifiers = {
                    update: callback_function_update,
                    menu: callback_function_menu,
                    move: callback_function_move,
                    up: callback_function_up,
                    down: callback_function_down,
                    middle: callback_function_middle,
                    cursor: callback_function_cursor,
                    ripple: callback_function_ripple

                };
            },
            notify_moved: function(callback_function) {
                "use strict";
                notifiers.update(false, false, callback_function);
            },
            notify_menu: function(event, timeout ) {
                "use strict";
                timeout = timeout|0;
                setTimeout(function(){

                    notifiers.menu(event);
                }, timeout);
            },
            notify_move: function(event) {
                notifiers.move(event);
            },
            notify_up: function(event) {
                notifiers.up(event);
            },
            notify_down: function(event) {
                notifiers.down(event);
            },
            notify_ripple: function(event) {
                notifiers.ripple(event);
            },
            notify_middle: function() {
                notifiers.middle(false, false);
            },
            notify_cursor: function () {
                notifiers.cursor(ps.mouse_down, s.canvas_event_target);
            },
            set_shadow_color: function(hex) {

                sh = gsh(hex);
            },
            set_zoom: function(of = 1, page_x, page_y , new_move_x = 0, new_move_y = 0, callback_function = function(){}){

                const { scale, canvas_container, canvas_wrapper } = s;
                const {current, move_y, move_x} = scale;
                let new_scale = current * of;

                if(!(new_scale > 6) && !(new_scale < 1/6)) {

                    let ratio = 1 - current / new_scale;
                    let ratio2 = new_scale / current;
                    let pos_x_in_canvas_container, pos_y_in_canvas_container;

                    if(Boolean(page_x) && Boolean(page_y)) {

                        pos_x_in_canvas_container = page_x - canvas_container.left | 0;
                        pos_y_in_canvas_container = page_y - canvas_container.top | 0;
                    }else {

                        pos_x_in_canvas_container = canvas_container.width / 2 | 0;
                        pos_y_in_canvas_container = canvas_container.height / 2 | 0;
                    }

                    if(new_move_x === 0 && new_move_y === 0) {

                        this.set_moves(move_x, move_y, new_scale, callback_function);

                    }else {

                        let new_scale_move_x = (move_x - (pos_x_in_canvas_container * ratio)) * ratio2 + new_move_x | 0;
                        let new_scale_move_y = (move_y - (pos_y_in_canvas_container * ratio)) * ratio2 + new_move_y | 0;

                        const for_middle_x = (canvas_container.width - canvas_wrapper.width) / 2 | 0;
                        const for_middle_y = (canvas_container.height - canvas_wrapper.height) / 2 | 0;

                        const scale_move_x_max = 3/4 * canvas_wrapper.width + for_middle_x;
                        const scale_move_y_max = 3/4 * canvas_wrapper.height + for_middle_y;

                        new_scale_move_y -= for_middle_y;
                        new_scale_move_x -= for_middle_x;

                        let new_scale_move_x_rigged = Math.min(Math.abs(new_scale_move_x), scale_move_x_max) * (new_scale_move_x < 0 ? -1: 1) + for_middle_x;
                        let new_scale_move_y_rigged = Math.min(Math.abs(new_scale_move_y), scale_move_y_max) * (new_scale_move_y < 0 ? -1: 1) + for_middle_y;

                        this.set_moves(new_scale_move_x_rigged, new_scale_move_y_rigged, new_scale, callback_function);
                    }
                }
            },
            handle_wheel: function({deltaY, pageY, pageX, movementX = 0, movementY = 0}) {

                const { canvas_container, canvas_wrapper } = this.get_pos();
                const { move_x, move_y, current } = s.scale;

                let delta = Math.max(Math.min(0.125, Math.abs(deltaY * -0.01)), 0.25);
                delta = deltaY * -0.01 > 0 ? delta: -delta;

                const scale_change_ratio_on_one = Math.pow(current < 1 ? 1 / current: current, 1.6);
                let new_scale = current + delta *  current * ( 0.9 / scale_change_ratio_on_one );

                if(!(new_scale > 6) && !(new_scale < 1/6)) {

                    let ratio = 1 - current / new_scale;
                    let ratio2 = new_scale / current;
                    let pos_x_in_canvas_container, pos_y_in_canvas_container;

                    if(Boolean(pageX) && Boolean(pageY)) {

                        pos_x_in_canvas_container = pageX - canvas_container.left | 0;
                        pos_y_in_canvas_container = pageY - canvas_container.top | 0;
                    }else {

                        pos_x_in_canvas_container = canvas_container.width / 2 | 0;
                        pos_y_in_canvas_container = canvas_container.height / 2 | 0;
                    }

                    let new_scale_move_x = (move_x - (pos_x_in_canvas_container * ratio)) * ratio2 + movementX | 0;
                    let new_scale_move_y = (move_y - (pos_y_in_canvas_container * ratio)) * ratio2 + movementY | 0;

                    const for_middle_x = (canvas_container.width - canvas_wrapper.width) / 2 | 0;
                    const for_middle_y = (canvas_container.height - canvas_wrapper.height) / 2 | 0;

                    const scale_move_x_max = 3/4 * canvas_wrapper.width + for_middle_x;
                    const scale_move_y_max = 3/4 * canvas_wrapper.height + for_middle_y;

                    new_scale_move_y -= for_middle_y;
                    new_scale_move_x -= for_middle_x;

                    let new_scale_move_x_rigged = Math.min(Math.abs(new_scale_move_x), scale_move_x_max) * (new_scale_move_x < 0 ? -1: 1) + for_middle_x;
                    let new_scale_move_y_rigged = Math.min(Math.abs(new_scale_move_y), scale_move_y_max) * (new_scale_move_y < 0 ? -1: 1) + for_middle_y;

                    this.set_moves(new_scale_move_x_rigged, new_scale_move_y_rigged, new_scale);
                }
            },
            handle_move: function(latest_pointers_client_x_center, latest_pointers_client_y_center, to_x, to_y){
                "use strict";
                const {canvas_container, canvas_wrapper} = this.get_pos();
                const {move_x, move_y} = s.scale;

                const for_middle_x = (canvas_container.width - canvas_wrapper.width) / 2 | 0;
                const for_middle_y = (canvas_container.height - canvas_wrapper.height) / 2 | 0;

                const scale_move_x_max = 3/4 * canvas_wrapper.width + for_middle_x | 0;
                const scale_move_y_max = 3/4 * canvas_wrapper.height + for_middle_y | 0;

                const diff_scale_move_x = to_x - latest_pointers_client_x_center | 0;
                const diff_scale_move_y = to_y - latest_pointers_client_y_center | 0;

                const new_scale_move_x = move_x + diff_scale_move_x - for_middle_y | 0;
                const new_scale_move_y = move_y + diff_scale_move_y - for_middle_x | 0;

                const invertor =new_scale_move_x < 0 ? -1: 1;
                const new_scale_move_x_rigged = Math.min(Math.abs(new_scale_move_x), scale_move_x_max) * invertor + for_middle_x | 0;
                const new_scale_move_y_rigged = Math.min(Math.abs(new_scale_move_y), scale_move_y_max) * invertor + for_middle_y | 0;

                this.set_moves(new_scale_move_x_rigged, new_scale_move_y_rigged);
            },
            set_boolean_move_on_click: function(boolean) {
                "use strict";
                move_on_click = boolean;
            },
            handle_pointer_down: function(event) {
                "use strict";
                event.preventDefault();

                const {canvas_event_target} = s;
                let {
                    latest_pointers_distance,
                    latest_pointers_client_x_center,
                    latest_pointers_client_y_center,
                    previous_single_pointer_down_timestamp,
                    previous_double_pointer_down_timestamp,
                    pointer_events,
                } = this.get_pointer_state();

                const old_previous_single_pointer_down_timestamp = parseInt(previous_single_pointer_down_timestamp);
                const old_previous_double_pointer_down_timestamp = parseInt(previous_double_pointer_down_timestamp);
                pointer_events.set(""+event.pointerId, event);
                const one_pointer = Boolean(pointer_events.size === 1);
                const two_pointer = Boolean(pointer_events.size === 2);
                previous_single_pointer_down_timestamp = one_pointer ? Date.now(): old_previous_single_pointer_down_timestamp;
                previous_double_pointer_down_timestamp = two_pointer ? Date.now(): old_previous_double_pointer_down_timestamp;
                const mouse_down = true;

                this.set_pointer_state({
                    pointer_events,
                    mouse_down: mouse_down,
                    event_button: parseInt(event.button),
                    latest_pointers_distance: two_pointer ? 0: parseFloat(latest_pointers_distance),
                    previous_single_pointer_down_timestamp: parseInt(previous_single_pointer_down_timestamp),
                    previous_double_pointer_down_timestamp: parseInt(previous_double_pointer_down_timestamp),
                    latest_pointers_client_x_center: parseInt(event.clientX),
                    latest_pointers_client_y_center: parseInt(event.clientY),
                });

                if(Boolean(parseInt(event.button || 0) === 2) || Boolean(Boolean(Math.abs(previous_single_pointer_down_timestamp - old_previous_single_pointer_down_timestamp) < 200 ) && Math.abs(latest_pointers_client_x_center - event.clientX) < 20 && Math.abs(latest_pointers_client_y_center - event.clientY) < 20)) {

                   this.notify_menu(event, 180);
                }else if(one_pointer && old_previous_double_pointer_down_timestamp + 200 > Date.now()) {


                }else if(Boolean(one_pointer || event.pointerType === "mouse") && canvas_event_target === "CANVAS" ) {

                    this.notify_down(event)
                }

                if(canvas_event_target === "CANVAS_WRAPPER_OVERFLOW"){
                    this.notify_ripple(event);
                }
            },
            handle_pointer_up: function(event){
                "use strict";
                event.preventDefault();

                const {canvas_event_target} = s;
                let {
                    pointer_events,
                } = this.get_pointer_state();

                pointer_events.delete(""+event.pointerId);

                this.set_pointer_state({
                    pointer_events: pointer_events,
                    mouse_down: Boolean(pointer_events.size !== 0),
                });

                this.notify_up(event);
                if(canvas_event_target === "CANVAS_WRAPPER_OVERFLOW" && event.which === 1){

                    this.notify_moved();
                }else if(canvas_event_target !== "CANVAS"){

                    this.notify_moved();
                }
            },
            handle_pointer_move: function(event){
                "use strict";
                event.preventDefault();

                const canvas_event_target = ""+s.canvas_event_target;
                this.compute_canvas_event_target(parseInt(event.pageX), parseInt(event.pageY));
                const new_canvas_event_target = ""+s.canvas_event_target;

                let {
                    mouse_down,
                    event_button,
                    pointer_events,
                    latest_pointers_distance,
                    latest_pointers_client_x_center,
                    latest_pointers_client_y_center,
                    previous_double_pointer_move_timestamp,
                    previous_single_pointer_down_timestamp,
                } = this.get_pointer_state();

                pointer_events.set(""+event.pointerId, {clientX: event.clientX, clientY: event.clientY, pageX: event.pageX, pageY: event.pageY, which: event.which, button: event.button, pointerId: event.pointerId});

                if (pointer_events.size === 2) {

                    const pointer_events_array = Array.from(pointer_events.values());
                    const x_diff = pointer_events_array[0].clientX - pointer_events_array[1].clientX;
                    const y_diff = pointer_events_array[0].clientY - pointer_events_array[1].clientY;
                    const anchor_diff = Math.sqrt((x_diff * x_diff) + (y_diff * y_diff));
                    const client_x_center = parseInt(pointer_events_array[0].clientX + pointer_events_array[1].clientX) / 2;
                    const client_y_center = parseInt(pointer_events_array[0].clientY + pointer_events_array[1].clientY) / 2;
                    const client_x_page = parseInt(pointer_events_array[0].pageX + pointer_events_array[1].pageX) / 2;
                    const client_y_page = parseInt(pointer_events_array[0].pageY + pointer_events_array[1].pageY) / 2;
                    const movement_x = client_x_center - latest_pointers_client_x_center;
                    const movement_y = client_y_center - latest_pointers_client_y_center;
                    const move_x = s.scale.move_x + movement_x;
                    const move_y = s.scale.move_y + movement_y;

                    const of = Boolean(latest_pointers_distance > 0) ? parseFloat(anchor_diff / latest_pointers_distance) : 1;

                    const pointer_state_object = {
                        latest_pointers_distance: parseFloat(anchor_diff),
                        latest_pointers_client_x_center: parseInt(client_x_center),
                        latest_pointers_client_y_center: parseInt(client_y_center),
                        previous_double_pointer_move_timestamp: Date.now(),
                    };

                    if(previous_single_pointer_down_timestamp + 30 < Date.now()) {

                        const { canvas_container, canvas_wrapper } = this.get_pos();
                        const { current } = s.scale;

                        let new_scale = current * of;

                        if(!(new_scale > 6) && !(new_scale < 1/6)) {

                            let ratio = 1 - current / new_scale;
                            let ratio2 = new_scale / current;
                            let pos_x_in_canvas_container, pos_y_in_canvas_container;

                            pos_x_in_canvas_container = client_x_page - canvas_container.left | 0;
                            pos_y_in_canvas_container = client_y_page - canvas_container.top | 0;

                            let new_scale_move_x = (move_x - (pos_x_in_canvas_container * ratio)) * ratio2 + movement_x | 0;
                            let new_scale_move_y = (move_y - (pos_y_in_canvas_container * ratio)) * ratio2 + movement_y | 0;

                            const for_middle_x = (canvas_container.width - canvas_wrapper.width) / 2 | 0;
                            const for_middle_y = (canvas_container.height - canvas_wrapper.height) / 2 | 0;

                            const scale_move_x_max = 3 / 4 * canvas_wrapper.width + for_middle_x;
                            const scale_move_y_max = 3 / 4 * canvas_wrapper.height + for_middle_y;

                            new_scale_move_y -= for_middle_y;
                            new_scale_move_x -= for_middle_x;

                            let new_scale_move_x_rigged = Math.min(Math.abs(new_scale_move_x), scale_move_x_max) * (new_scale_move_x < 0 ? - 1 : 1) + for_middle_x;
                            let new_scale_move_y_rigged = Math.min(Math.abs(new_scale_move_y), scale_move_y_max) * (new_scale_move_y < 0 ? - 1 : 1) + for_middle_y;

                            this.set_moves(new_scale_move_x_rigged, new_scale_move_y_rigged, new_scale);
                        }

                        this.set_pointer_state(pointer_state_object);
                    }else {

                        this.set_pointer_state(pointer_state_object);
                    }

                }else if(mouse_down && pointer_events.size === 1) {

                    const pointer_state_object = {
                        latest_pointers_client_x_center: parseInt(event.clientX),
                        latest_pointers_client_y_center: parseInt(event.clientY),
                        previous_double_pointer_move_timestamp: parseInt(previous_double_pointer_move_timestamp),
                    };

                    if(new_canvas_event_target !== "CANVAS" || Boolean(new_canvas_event_target === "CANVAS" && event_button === 0 && move_on_click) || event_button === 1) {

                        if(previous_double_pointer_move_timestamp + 200 < Date.now() || event_button === 1){

                            this.set_pointer_state(pointer_state_object);
                            this._handle_canvas_move( parseInt(event.clientX - latest_pointers_client_x_center), parseInt(event.clientY - latest_pointers_client_y_center));

                        }else {

                            this.set_pointer_state(pointer_state_object);
                        }
                    }else {

                        this.set_pointer_state(pointer_state_object);
                        this.notify_move(event);
                    }

                }else if(canvas_event_target !== new_canvas_event_target){

                    this.notify_move(event); this.notify_moved();
                } else if(new_canvas_event_target === "CANVAS") {

                    this.notify_move(event);
                }
            },
            _handle_canvas_move: function(diff_scale_move_x, diff_scale_move_y) {
                "use strict";
                const {canvas_container, canvas_wrapper} = this.get_pos();
                const {move_x, move_y} = s.scale;

                const for_middle_x = (canvas_container.width - canvas_wrapper.width) / 2;
                const for_middle_y = (canvas_container.height - canvas_wrapper.height) / 2;

                const scale_move_x_max = 3/4 * canvas_wrapper.width + for_middle_x;
                const scale_move_y_max = 3/4 * canvas_wrapper.height + for_middle_y;

                let new_scale_move_x = move_x + diff_scale_move_x;
                let new_scale_move_y = move_y + diff_scale_move_y;

                new_scale_move_y -= for_middle_y;
                new_scale_move_x -= for_middle_x;

                const new_scale_move_x_rigged = (Math.min(Math.abs(new_scale_move_x), scale_move_x_max)) * (new_scale_move_x < 0 ? -1: 1) + for_middle_x;
                const new_scale_move_y_rigged = (Math.min(Math.abs(new_scale_move_y), scale_move_y_max)) * (new_scale_move_y < 0 ? -1: 1) + for_middle_y;

                this.set_moves(new_scale_move_x_rigged, new_scale_move_y_rigged);
            },
            new: function(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width, perspective) {
                "use strict";
                sh = gsh("#020529");
                ps = gips();
                s = cis(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width, perspective);
                szr = gszr(s);
                p = gp(s, szr);
                notifiers = {
                    moved(){},
                    menu(){},
                    canvas(){},
                    up(){}
                };
            },
            destroy: function() {
                "use strict";
                sh = null;
                move_on_click = null;
                ps = null;
                s = null;
                p = null;
                notifiers = null;
            },
            get_pos: function() {
                "use strict";
                return p;
            },
            get_state: function() {
                "use strict";
                return s;
            },
            get_style: function() {
                "use strict";
                style.msan = s.scale.moves_speed_average_now;
                style.box_shadow = sh[style.msan < 0 ? Math.round(Math.abs(style.msan) / 2): style.msan];
                return  style;
            },
            get_canvas_pos_from_event: function(pageX, pageY) {
                "use strict";
                const {canvas} = this.get_pos();
                const {width, height} = s.sizes;

                const pos_x_in_canvas = parseInt(pageX) - canvas.left;
                const pos_y_in_canvas = parseInt(pageY) - canvas.top;

                let pos_x = Math.floor(width * (pos_x_in_canvas / canvas.width));
                let pos_y = Math.floor(height * (pos_y_in_canvas / canvas.height));

                pos_x = Boolean(pos_x !== Math.max(Math.min(pos_x, width - 1), 0)) ? -1: pos_x;
                pos_y = Boolean(pos_y !== Math.max(Math.min(pos_y, height - 1), 0)) ? -1: pos_y;

                if(pos_x === -1 || pos_y === -1) {

                    pos_x = -1;
                    pos_y = -1;
                }

                return [ pos_x, pos_y ];
            },
            set_current_scale_default: function() {
                "use strict";
                s.scale.current = parseFloat(s.scale.default);
                szr = gszr(s);
                p = gp(s, szr, p);
                this.set_canvas_moves_middle();
            },
            set_canvas_moves_middle: function() {
                "use strict";
                const {canvas_container, canvas_wrapper} = this.get_pos();
                const for_middle_x = parseInt(parseInt(canvas_container.width - canvas_wrapper.width) / 2);
                const for_middle_y = parseInt(parseInt(canvas_container.height - canvas_wrapper.height) / 2);
                this.set_moves(for_middle_x, for_middle_y, null, this.notify_middle);
            },
            compute_canvas_event_target: function(pageX, pageY){
                "use strict";
                pageX = pageX | 0;
                pageY = pageY | 0;
                this.compute_perspective_from_pointer_event(pageX, pageY);
                const {canvas, canvas_wrapper} = p;
                let new_canvas_event_target = "CANVAS_WRAPPER_OVERFLOW",notify_cursor = false;
                if(pageX >= canvas.left && pageY >= canvas.top && pageX <= canvas.right && pageY <= canvas.bottom) { // Canvas
                    new_canvas_event_target = "CANVAS";
                }else if(pageX >= canvas_wrapper.left && pageY >= canvas_wrapper.top && pageX <= canvas_wrapper.right && pageY <= canvas_wrapper.bottom) { // Canvas wrapper
                    new_canvas_event_target = "CANVAS_WRAPPER";
                }
                if(s.canvas_event_target !== new_canvas_event_target) {notify_cursor = true;s.canvas_event_target = new_canvas_event_target;}
                if(notify_cursor){ this.notify_cursor(); }
            },
            set_move_speed_average_now: function() {
                "use strict";
                if(!Boolean(s)){ return; }

                const max_move_speed = Boolean(s.canvas_event_target !== "CANVAS_WRAPPER_OVERFLOW") ? 18: 24;

                const now = Date.now();

                if(now - s.scale.move_speed_timestamp >= 20 && s.scale.moves_speed_average_now > -max_move_speed)  {

                    const new_moves_speed_average_now = Math.max(s.scale.moves_speed_average_now - 1, -max_move_speed);

                    s.scale.moves_speed_average_now = new_moves_speed_average_now;
                    s.scale.move_speed_timestamp = now | 0;

                    notifiers.update(true, true);

                }else if(now - s.scale.move_speed_timestamp >= 20 && s.scale.moves_speed_average_now < -max_move_speed && max_move_speed < 24) {

                    s.scale.moves_speed_average_now = Math.max(s.scale.moves_speed_average_now + 1, -max_move_speed) | 0;
                    s.scale.move_speed_timestamp = now | 0;

                    notifiers.update(true, true);
                }else if(s.perspective > 0) {

                    notifiers.update(true, true);
                }
            }
        };
    }
};

module.exports = CanvasPos;