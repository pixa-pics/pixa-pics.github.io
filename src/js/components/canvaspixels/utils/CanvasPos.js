const CanvasPos = {

    _get_init_state: function(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width) {

        return Object.assign({}, {
            canvas_event_target: "CANVAS_WRAPPER_OVERFLOW",
            canvas_container: {
                top: 0,
                left: 0,
                height: 0,
                width: 0
            },
            sizes: {
                width: parseInt(pxl_width),
                height: parseInt(pxl_height)
            },
            screen_zoom_ratio: 1,
            canvas_wrapper: {
                padding: parseInt(canvas_wrapper_padding),
                border_width: parseInt(canvas_wrapper_border_width)
            },
            scale: {
                default: parseFloat(default_scale),
                current: parseFloat(default_scale),
                move_x: 0,
                move_y: 0,
                moves_speeds: [],
                move_speed_timestamp: Date.now(),
                moves_speed_average_now: 16,
            },
            device_pixel_ratio: parseFloat(window.devicePixelRatio)
        });
    },
    _get_screen_zoom_ratio(s) {
        return Boolean(s.canvas_container.width > s.canvas_container.height) ?
            parseFloat(s.canvas_container.height - s.canvas_wrapper.padding / s.device_pixel_ratio * 2) / s.sizes.height:
            parseFloat(s.canvas_container.width - s.canvas_wrapper.padding / s.device_pixel_ratio * 2) / s.sizes.width;
    },
    _get_pos(s, szr){

        const canvas_wrapper_border_box_extra_size = Math.round(s.canvas_wrapper.padding / s.device_pixel_ratio * s.scale.current + s.canvas_wrapper.border_width) * 2
        const canvas_wrapper_width = Math.round(s.sizes.width * szr * s.scale.current) + canvas_wrapper_border_box_extra_size;
        const canvas_wrapper_height = Math.round(s.sizes.height * szr * s.scale.current) + canvas_wrapper_border_box_extra_size;
        const canvas_wrapper_offset_left = s.scale.move_x;
        const canvas_wrapper_offset_top = s.scale.move_y;
        const canvas_wrapper_left = s.canvas_container.left + canvas_wrapper_offset_left;
        const canvas_wrapper_top = s.canvas_container.top + canvas_wrapper_offset_top;
        const canvas_wrapper_right = canvas_wrapper_left + canvas_wrapper_width;
        const canvas_wrapper_bottom = canvas_wrapper_top + canvas_wrapper_height;

        const canvas_offset_left = canvas_wrapper_border_box_extra_size / 2;
        const canvas_offset_top = canvas_wrapper_border_box_extra_size / 2;
        const canvas_left = canvas_wrapper_left + canvas_offset_left;
        const canvas_top = canvas_wrapper_top + canvas_offset_top;
        const canvas_right = canvas_wrapper_right - canvas_wrapper_border_box_extra_size / 2;
        const canvas_bottom = canvas_wrapper_bottom - canvas_wrapper_border_box_extra_size / 2;

        return Object.assign({}, {
            canvas: {
                offset_left: canvas_offset_left,
                offset_top: canvas_offset_top,
                left: canvas_left,
                top: canvas_top,
                right: canvas_right,
                bottom: canvas_bottom,
                width: canvas_right - canvas_left,
                height: canvas_bottom - canvas_top,
            },
            canvas_wrapper: {
                offset_left: canvas_wrapper_offset_left,
                offset_top: canvas_wrapper_offset_top,
                left: canvas_wrapper_left,
                top: canvas_wrapper_top,
                right: canvas_wrapper_right,
                bottom: canvas_wrapper_bottom,
                width: canvas_wrapper_right - canvas_wrapper_left,
                height: canvas_wrapper_bottom - canvas_wrapper_top,
            },
            canvas_container: {
                offset_left: s.canvas_container.left,
                offset_top: s.canvas_container.top,
                left: s.canvas_container.left,
                top: s.canvas_container.top,
                right: s.canvas_container.left + s.canvas_container.width,
                bottom: s.canvas_container.top + s.canvas_container.height,
                width: s.canvas_container.width,
                height: s.canvas_container.height,
            },
        });
    },
    _get_init_pointer_state() {

        return Object.assign({}, {
            event_button: null,
            mouse_down: false,
            pointer_events: new Map(),
            previous_single_pointer_down_timestamp: 0,
            previous_double_pointer_down_timestamp: 0,
            latest_pointers_distance: 0,
            latest_pointers_client_x_center: 0,
            latest_pointers_client_y_center: 0,
            previous_double_pointer_move_timestamp: 0
        });
    },
    _copy_event(event) {

        return Object.assign({}, {
            pointerId: event.pointerId,
            clientX: event.clientX,
            clientY: event.clientY,
            pageX: event.pageX,
            pageY: event.pageY,
            button: event.button
        });
    },
    _get_shadows(hex){

        const color_conversion = {
            format_hex_color: function(hex) { // Supports #fff (short rgb), #fff0 (short rgba), #e2e2e2 (full rgb) and #e2e2e2ff (full rgba)

                if(typeof hex === "undefined"){

                    return "#00000000";
                } else {

                    let a, b, c, d;
                    let formatted = "";

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

                    return formatted;
                }
            },
            to_hex_from_rgba: function(rgba) {
                return "#".concat("00000000".concat(new Uint32Array(rgba.reverse().buffer)[0].toString(16)).slice(-8));
            },
            to_rgba_from_hex: function(hex) {
                return new Uint8ClampedArray(Uint32Array.of(parseInt(hex.slice(1), 16)).buffer).reverse();
            }
        };

        function create_shadow(...px){

            const RGBA = color_conversion.to_rgba_from_hex(color_conversion.format_hex_color(hex));
            let hex_umbra = color_conversion.to_hex_from_rgba(Uint8ClampedArray.of(RGBA[0], RGBA[1], RGBA[2], parseInt(0.56 * 255)));
            let hex_penumbra = color_conversion.to_hex_from_rgba(Uint8ClampedArray.of(RGBA[0], RGBA[1], RGBA[2], parseInt(0.36 * 255)));
            let hex_ambiant = color_conversion.to_hex_from_rgba(Uint8ClampedArray.of(RGBA[0], RGBA[1], RGBA[2], parseInt(0.24 * 255)));

            return Array.of(
                `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px ${hex_umbra}`,
                `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px ${hex_penumbra}`,
                `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px ${hex_ambiant}`,
            ).join(',')        }

        return  Array.of(
            '',
            create_shadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
            create_shadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
            create_shadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
            create_shadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
            create_shadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
            create_shadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
            create_shadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
            create_shadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
            create_shadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
            create_shadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
            create_shadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
            create_shadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
            create_shadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
            create_shadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
            create_shadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
            create_shadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
            create_shadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
            create_shadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
            create_shadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
            create_shadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
            create_shadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
            create_shadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
            create_shadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
            create_shadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
        );
    },


    from: function(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width){

        const gszr = this._get_screen_zoom_ratio;
        const cis = this._get_init_state;
        const gips = this._get_init_pointer_state;
        const gp = this._get_pos;
        const gsh = this._get_shadows;
        const ce = this._copy_event;

        let move_on_click = false;
        let sh = gsh("#020529");
        let ps = gips();
        let s = cis(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width);
        let szr = gszr(s);
        let p = gp(s, szr);
        let notifiers = {
            update: function(){},
            menu: function(){},
            move: function(){},
            up: function(){},
            down: function(){},
            middle: function(){},
        };

        let msi = null;

        return {
            // Methods
            init_speed_interval() {

                if(msi !== null){

                    setTimeout(this.set_move_speed_average_now, 5)

                }else {

                    msi = setInterval(this.set_move_speed_average_now, 20);
                }
            },
            set_canvas_wrapper(padding, border_width){
                s.canvas_wrapper = {padding, border_width};
                szr = gszr(s);
                p = gp(s, szr);
            },
            set_canvas_container(top, left, height, width){
                s.canvas_container = {top, left, height, width};
                szr = gszr(s);
                p = gp(s, szr);
                this.set_current_scale_default();
            },
            set_sizes(width, height) {
                s.sizes = {width, height};
                s.scale.moves_speed_average_now = 16;
                szr = gszr(s);
                p = gp(s, szr);
            },
            get_pointer_state() {

                return Object.assign({}, ps);
            },
            get_screen_zoom_ratio() {

                return parseFloat(szr);
            },
            set_pointer_state(object) {

                ps = Object.assign(ps, object);
            },
            set_moves(new_scale_move_x, new_scale_move_y,  new_scale = null, callback_function = function(){}) {

                let new_scale_move_speed_timestamp = Date.now();

                const {scale, canvas_event_target} = this.get_state();
                const max_move_speed = Boolean(canvas_event_target !== "CANVAS_WRAPPER_OVERFLOW") ? 18: 24;

                let {
                    move_x,
                    move_y,
                    moves_speeds,
                    move_speed_timestamp,
                    current
                } = scale;

                const time_difference_moves = new_scale_move_speed_timestamp - move_speed_timestamp;
                const x_diff = move_x - new_scale_move_x;
                const y_diff = move_y - new_scale_move_y;
                const space_difference_moves = Math.sqrt((x_diff * x_diff) + (y_diff * y_diff));
                const move_speed = Math.min(Math.round((space_difference_moves / time_difference_moves) * 200), 200);

                moves_speeds.push(move_speed);

                if(moves_speeds.length >= max_move_speed) {

                    moves_speeds.shift();
                }

                let moves_speed_average =  [...moves_speeds].slice(-max_move_speed).reduce((p,c,i,a) => p+(c/a.length), 0);
                moves_speed_average = Math.max(1, Math.round(Math.floor(moves_speed_average * max_move_speed/200 )))

                s = Object.assign(s, {scale: Object.assign(s.scale, {
                    default: parseFloat(scale.default),
                    current: parseFloat(new_scale === null ? current: new_scale),
                    move_x: parseInt(new_scale_move_x),
                    move_y: parseInt(new_scale_move_y),
                    move_speed_timestamp: Date.now(),
                    moves_speeds: moves_speeds,
                    moves_speed_average_now: Boolean(new_scale !== null && new_scale > current) ? max_move_speed: Boolean(new_scale !== null && new_scale < current) ? 0: parseInt(moves_speed_average),
                })});
                szr = gszr(s);
                p = gp(s, szr);
                this.notify_moved(callback_function);
            },
            set_notifiers(callback_function_update = function(){}, callback_function_menu = function(){}, callback_function_move = function(){}, callback_function_up = function(){}, callback_function_down = function(){}, callback_function_middle = function(){}) {

                notifiers = {
                    update: callback_function_update,
                    menu: callback_function_menu,
                    move: callback_function_move,
                    up: callback_function_up,
                    down: callback_function_down,
                    middle: callback_function_middle
                };
            },
            notify_moved(callback_function) {
                notifiers.update(false, false, callback_function);
            },
            notify_menu(event, timeout = 0) {

                setTimeout(function(){

                    notifiers.menu(event);
                }, timeout);
            },
            notify_move(event) {
                notifiers.move(event);
            },
            notify_up(event) {
                notifiers.up(event);
            },
            notify_down(event) {
                notifiers.down(event);
            },
            notify_middle() {
                notifiers.middle();
            },
            set_shadow_color(hex) {

                sh = gsh(hex);
            },
            set_zoom(of = 1, page_x, page_y , new_move_x = 0, new_move_y = 0, callback_function = function(){}){

                const { scale, canvas_container, canvas_wrapper } = this.get_state();
                const {current, move_y, move_x} = scale;
                let new_scale = parseFloat(current * of);

                if(!(new_scale > 6) && !(new_scale < 1/6)) {

                    let ratio = 1 - current / new_scale;
                    let ratio2 = new_scale / current;
                    let pos_x_in_canvas_container, pos_y_in_canvas_container;

                    if(Boolean(page_x) && Boolean(page_y)) {

                        pos_x_in_canvas_container = parseInt(page_x - canvas_container.left);
                        pos_y_in_canvas_container = parseInt(page_y - canvas_container.top);
                    }else {

                        pos_x_in_canvas_container = canvas_container.width / 2;
                        pos_y_in_canvas_container = canvas_container.height / 2;
                    }

                    let new_scale_move_x = parseFloat(move_x - parseFloat(pos_x_in_canvas_container * ratio)) * ratio2 + new_move_x;
                    let new_scale_move_y = parseFloat(move_y - parseFloat(pos_y_in_canvas_container * ratio)) * ratio2 + new_move_y;

                    const for_middle_x = parseInt(canvas_container.width - canvas_wrapper.width) / 2;
                    const for_middle_y = parseInt(canvas_container.height - canvas_wrapper.height) / 2;

                    const scale_move_x_max = 3/4 * canvas_wrapper.width + for_middle_x;
                    const scale_move_y_max = 3/4 * canvas_wrapper.height + for_middle_y;

                    new_scale_move_y -= for_middle_y;
                    new_scale_move_x -= for_middle_x;

                    let new_scale_move_x_rigged = Math.round(Math.min(Math.abs(new_scale_move_x), scale_move_x_max) * parseInt(new_scale_move_x < 0 ? -1: 1) + for_middle_x);
                    let new_scale_move_y_rigged = Math.round(Math.min(Math.abs(new_scale_move_y), scale_move_y_max) * parseInt(new_scale_move_y < 0 ? -1: 1) + for_middle_y);

                    this.set_moves(new_scale_move_x_rigged, new_scale_move_y_rigged, new_scale, callback_function);
                }
            },
            handle_wheel({deltaY, pageY, pageX, movementX = 0, movementY = 0}) {

                const { canvas_container, canvas_wrapper } = this.get_pos();
                const { move_x, move_y, current } = this.get_state().scale;

                let delta = Math.max(Math.min(0.125, Math.abs(deltaY * -0.01)), 0.25);
                delta = deltaY * -0.01 > 0 ? delta: -delta;

                const scale_change_ratio_on_one = Math.pow(current < 1 ? 1 / current: current, 1.6);
                let new_scale = current + delta *  current * ( 0.9 / scale_change_ratio_on_one );

                if(!(new_scale > 6) && !(new_scale < 1/6)) {

                    let ratio = 1 - current / new_scale;
                    let ratio2 = new_scale / current;
                    let pos_x_in_canvas_container, pos_y_in_canvas_container;

                    if(Boolean(pageX) && Boolean(pageY)) {

                        pos_x_in_canvas_container = parseInt(pageX - canvas_container.left);
                        pos_y_in_canvas_container = parseInt(pageY - canvas_container.top);
                    }else {

                        pos_x_in_canvas_container = parseInt(canvas_container.width / 2);
                        pos_y_in_canvas_container = parseInt(canvas_container.height / 2);
                    }

                    let new_scale_move_x = parseInt(parseFloat(move_x - parseFloat(pos_x_in_canvas_container * ratio)) * ratio2 + movementX);
                    let new_scale_move_y = parseInt(parseFloat(move_y - parseFloat(pos_y_in_canvas_container * ratio)) * ratio2 + movementY);

                    const for_middle_x = parseInt(parseInt(canvas_container.width - canvas_wrapper.width) / 2);
                    const for_middle_y = parseInt(parseInt(canvas_container.height - canvas_wrapper.height) / 2);

                    const scale_move_x_max = 3/4 * canvas_wrapper.width + for_middle_x;
                    const scale_move_y_max = 3/4 * canvas_wrapper.height + for_middle_y;

                    new_scale_move_y -= for_middle_y;
                    new_scale_move_x -= for_middle_x;

                    let new_scale_move_x_rigged = Math.min(Math.abs(new_scale_move_x), scale_move_x_max) * parseInt(new_scale_move_x < 0 ? -1: 1) + for_middle_x;
                    let new_scale_move_y_rigged = Math.min(Math.abs(new_scale_move_y), scale_move_y_max) * parseInt(new_scale_move_y < 0 ? -1: 1) + for_middle_y;

                    this.set_moves(new_scale_move_x_rigged, new_scale_move_y_rigged, new_scale);
                }
            },
            handle_move(latest_pointers_client_x_center, latest_pointers_client_y_center, to_x, to_y){

                const {canvas_container, canvas_wrapper} = this.get_pos();
                const {move_x, move_y} = this.get_state().scale;

                const for_middle_x = parseFloat(parseInt(canvas_container.width - canvas_wrapper.width) / 2);
                const for_middle_y = parseFloat(parseInt(canvas_container.height - canvas_wrapper.height) / 2);

                const scale_move_x_max = parseInt(3/4 * canvas_wrapper.width + for_middle_x);
                const scale_move_y_max = parseInt(3/4 * canvas_wrapper.height + for_middle_y);

                const diff_scale_move_x = parseInt(to_x - latest_pointers_client_x_center);
                const diff_scale_move_y = parseInt(to_y - latest_pointers_client_y_center);

                const new_scale_move_x = parseInt(move_x + diff_scale_move_x - for_middle_y);
                const new_scale_move_y = parseInt(move_y + diff_scale_move_y - for_middle_x);

                const invertor =  parseInt(Boolean(new_scale_move_x < 0) ? -1: 1);
                const new_scale_move_x_rigged = parseInt(Math.min(Math.abs(new_scale_move_x), scale_move_x_max) * invertor + for_middle_x);
                const new_scale_move_y_rigged = parseInt(Math.min(Math.abs(new_scale_move_y), scale_move_y_max) * invertor + for_middle_y);

                this.set_moves(new_scale_move_x_rigged, new_scale_move_y_rigged);
            },
            set_boolean_move_on_click(boolean) {
                move_on_click = boolean;
            },
            handle_pointer_down(event) {

                event.preventDefault();
                event.stopImmediatePropagation();
                event = ce(event);

                this.compute_canvas_event_target(parseInt(event.pageX), parseInt(event.pageY));
                const {canvas_event_target} = this.get_state();
                const pointer_state = this.get_pointer_state();
                let {
                    latest_pointers_client_x_center,
                    latest_pointers_client_y_center,
                    previous_single_pointer_down_timestamp,
                    previous_double_pointer_down_timestamp,
                    pointer_events,
                } = pointer_state;

                const old_previous_single_pointer_down_timestamp = parseInt(previous_single_pointer_down_timestamp);
                const old_previous_double_pointer_down_timestamp = parseInt(previous_double_pointer_down_timestamp);
                pointer_events.set(event.pointerId, event);
                const one_pointer = Boolean(pointer_events.size !== 2);
                const two_pointer = Boolean(pointer_events.size === 2);
                previous_single_pointer_down_timestamp = one_pointer ? Date.now(): previous_single_pointer_down_timestamp;
                previous_double_pointer_down_timestamp = two_pointer ? Date.now(): previous_double_pointer_down_timestamp;
                const mouse_down = !Boolean(parseInt(event.button || 0) !== 0);

                this.set_pointer_state({
                    pointer_events,
                    mouse_down: mouse_down,
                    event_button: parseInt(event.button || 0),
                    previous_single_pointer_down_timestamp: parseInt(previous_single_pointer_down_timestamp),
                    previous_double_pointer_down_timestamp: parseInt(previous_double_pointer_down_timestamp),
                    latest_pointers_client_x_center: parseInt(event.clientX),
                    latest_pointers_client_y_center: parseInt(event.clientY),
                });

                if(Boolean(parseInt(event.button || 0) === 2) || Boolean(Boolean(Math.abs(previous_single_pointer_down_timestamp - old_previous_single_pointer_down_timestamp) < 200 ) && Math.abs(latest_pointers_client_x_center - event.clientX) < 20 && Math.abs(latest_pointers_client_y_center - event.clientY) < 20)) {

                   this.notify_menu(event, 180);
                }else if(one_pointer && old_previous_double_pointer_down_timestamp + 200 > Date.now()) {

                    return;
                }else if(Boolean(one_pointer || event.pointerType === "mouse") && canvas_event_target === "CANVAS" ) {

                    this.notify_down(event)
                }
            },
            handle_pointer_up(event){

                event.preventDefault();
                event.stopImmediatePropagation();
                event = ce(event);

                this.compute_canvas_event_target(parseInt(event.pageX), parseInt(event.pageY));
                const {canvas_event_target} = this.get_state();
                let {
                    pointer_events,
                    latest_pointers_distance,
                    latest_pointers_client_x_center,
                    latest_pointers_client_y_center,
                    previous_double_pointer_down_timestamp,
                    previous_single_pointer_down_timestamp,
                } = this.get_pointer_state();

                pointer_events.delete(event.pointerId);

                this.set_pointer_state({
                    pointer_events: pointer_events,
                    mouse_down: Boolean(pointer_events.size !== 0 && Boolean(event.button === 0)),
                    latest_pointers_distance: parseInt(latest_pointers_distance),
                    latest_pointers_client_x_center: parseInt(latest_pointers_client_x_center),
                    latest_pointers_client_y_center: parseInt(latest_pointers_client_y_center),
                    previous_double_pointer_down_timestamp: Boolean(pointer_events.size === 2) ? Date.now(): previous_double_pointer_down_timestamp,
                    previous_single_pointer_down_timestamp: Boolean(pointer_events.size !== 2) ? Date.now(): previous_single_pointer_down_timestamp,
                });

                if(event.pointerType === "mouse") {

                    if(canvas_event_target === "CANVAS") {

                        this.notify_up(event);

                    }else if(canvas_event_target === "CANVAS_WRAPPER_OVERFLOW" && event.which === 1){

                        this.notify_moved();
                    }else {

                        this.notify_moved();
                    }
                }
            },
            handle_pointer_move(event){

                event.preventDefault();
                event.stopImmediatePropagation();
                event = ce(event);

                const {canvas_event_target } = this.get_state();
                this.compute_canvas_event_target(parseInt(event.pageX), parseInt(event.pageY));
                const new_canvas_event_target = this.get_state().canvas_event_target;
                let {
                    mouse_down,
                    event_button,
                    pointer_events,
                    latest_pointers_distance,
                    latest_pointers_client_x_center,
                    latest_pointers_client_y_center,
                    previous_double_pointer_move_timestamp,
                    previous_double_pointer_down_timestamp,
                } = this.get_pointer_state();

                pointer_events.set(event.pointerId, event);

                if (pointer_events.size === 2) {

                    const x_diff = pointer_events[0].clientX - pointer_events[1].clientX;
                    const y_diff = pointer_events[0].clientY - pointer_events[1].clientY;
                    const anchor_diff = Math.sqrt((x_diff * x_diff) + (y_diff * y_diff));
                    const page_x_center = parseInt(pointer_events[0].pageX + pointer_events[1].pageX) / 2;
                    const page_y_center = parseInt(pointer_events[0].pageY + pointer_events[1].pageY) / 2;
                    const client_x_center = parseInt(pointer_events[0].clientX + pointer_events[1].clientX) / 2;
                    const client_y_center = parseInt(pointer_events[0].clientY + pointer_events[1].clientY) / 2;
                    const move_x = latest_pointers_client_x_center > 0 ? latest_pointers_client_x_center - client_x_center: 0;
                    const move_y = latest_pointers_client_y_center > 0 ? latest_pointers_client_y_center - client_y_center: 0;

                    const of = latest_pointers_distance > 0 ? anchor_diff / latest_pointers_distance : 1;

                    const pointer_state_object = {
                        pointer_events,
                        latest_pointers_distance: parseInt(anchor_diff),
                        latest_pointers_client_x_center: parseInt(client_x_center),
                        latest_pointers_client_y_center: parseInt(client_y_center),
                        previous_double_pointer_move_timestamp: Date.now(),
                    };

                    if(previous_double_pointer_down_timestamp + 50 < Date.now()) {
                        this.set_pointer_state(pointer_state_object);
                        this.set_zoom(of, page_x_center, page_y_center, -move_x, -move_y);
                    }else {

                        this.set_pointer_state(pointer_state_object);
                    }

                }else if(mouse_down && pointer_events.size === 1) {

                    const pointer_state_object = {
                        pointer_events,
                        latest_pointers_distance: parseInt(latest_pointers_distance),
                        latest_pointers_client_x_center: parseInt(event.clientX),
                        latest_pointers_client_y_center: parseInt(event.clientY),
                        previous_double_pointer_move_timestamp: parseInt(previous_double_pointer_move_timestamp),
                    };

                    if(new_canvas_event_target !== "CANVAS" || Boolean(new_canvas_event_target === "CANVAS" && event_button === 0 && move_on_click) || event_button === 1) {

                        if(previous_double_pointer_move_timestamp + 200 < Date.now()){

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
            _handle_canvas_move(diff_scale_move_x, diff_scale_move_y) {

                const {canvas_container, canvas_wrapper} = this.get_pos();
                const {move_x, move_y} = this.get_state().scale;

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
            new(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width) {

                sh = gsh("#020529");
                ps = gips();
                s = cis(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width);
                szr = gszr(s);
                p = gp(s, szr);
                notifiers = {
                    moved: function(){},
                    menu: function(){},
                    canvas: function(){},
                    up: function(){}
                };
            },
            destroy() {

                sh = null;
                move_on_click = null;
                ps = null;
                s = null;
                p = null;
                notifiers = null;
            },
            get_pos() {

                return Object.assign({}, p);
            },
            get_state() {

                return Object.assign({}, s);
            },
            get_style() {

                const state = this.get_state();
                const msan = state.scale.moves_speed_average_now;
                const shadow_depth = msan < 0 ? Math.round(Math.abs(msan) / 2): msan;
                return Object.assign({box_shadow: sh[shadow_depth]}, state);
            },
            get_pointer_state() {

                return Object.assign({}, ps);
            },
            get_canvas_pos_from_event(pageX, pageY) {

                const {canvas} = this.get_pos();
                const {width, height} = this.get_state().sizes;

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
            set_current_scale_default() {
                s = Object.assign(s, {scale: Object.assign(s.scale, {
                    current: parseFloat(s.scale.default)
                })});
                szr = gszr(s);
                p = gp(s, szr);
                this.set_canvas_moves_middle();
            },
            set_canvas_moves_middle() {

                const {canvas_container, canvas_wrapper} = this.get_pos();
                const for_middle_x = parseInt(parseInt(canvas_container.width - canvas_wrapper.width) / 2);
                const for_middle_y = parseInt(parseInt(canvas_container.height - canvas_wrapper.height) / 2);
                this.set_moves(for_middle_x, for_middle_y, null, this.notify_middle);
            },
            compute_canvas_event_target(pageX, pageY){

                const {canvas, canvas_wrapper} = this.get_pos();
                if(pageX >= canvas.left && pageY >= canvas.top && pageX <= canvas.right && pageY <= canvas.bottom) { // Canvas

                    s = Object.assign(s, {canvas_event_target: "CANVAS"});
                }else if(pageX >= canvas_wrapper.left && pageY >= canvas_wrapper.top && pageX <= canvas_wrapper.right && pageY <= canvas_wrapper.bottom) { // Canvas wrapper

                    s = Object.assign(s, {canvas_event_target: "CANVAS_WRAPPER"});
                }else {

                    s = Object.assign(s, {canvas_event_target: "CANVAS_WRAPPER_OVERFLOW"});
                }
            },
            set_move_speed_average_now() {

                if(!Boolean(s)){ return; }

                const {scale, canvas_event_target} = s;
                let { moves_speed_average_now, move_speed_timestamp } = scale;
                const max_move_speed = Boolean(canvas_event_target !== "CANVAS_WRAPPER_OVERFLOW") ? 18: 24;

                const now = Date.now();

                if(now - move_speed_timestamp >= 20 && moves_speed_average_now > -max_move_speed)  {

                    const new_moves_speed_average_now = Math.max(moves_speed_average_now - 1, -max_move_speed);

                    s = Object.assign(s, {scale: Object.assign(s.scale, {
                        moves_speed_average_now: new_moves_speed_average_now,
                        move_speed_timestamp: now
                    })});

                    notifiers.update(false, true);

                }else if(now - move_speed_timestamp >= 20 && moves_speed_average_now < -max_move_speed && max_move_speed < 24) {

                    const new_moves_speed_average_now = Math.max(moves_speed_average_now + 1, -max_move_speed);

                    s = Object.assign(s, {scale: Object.assign(s.scale, {
                         moves_speed_average_now: new_moves_speed_average_now,
                            move_speed_timestamp: now
                    })});

                        notifiers.update(false, true);
                }
            }
        };
    }
};

module.exports = CanvasPos;