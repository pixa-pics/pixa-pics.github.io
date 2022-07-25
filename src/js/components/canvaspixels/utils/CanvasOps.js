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
            pointer_events: new Array(),
            previous_single_pointer_down_timestamp: 0,
            previous_double_pointer_down_timestamp: 0,
            latest_pointers_distance: 0,
            latest_pointers_client_x_center: 0,
            latest_pointers_client_y_center: 0,
            previous_double_pointer_move_timestamp: 0
        });
    },

    from: function(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width){


        let notifiers = {
            update: function(){},
            menu: function(){},
        };
        let intervals = [];

        return {
            // Methods
            init_speed_interval() {

                if(intervals[0]) { clearInterval(intervals[0]); }
                intervals[0] = setInterval(this.set_move_speed_average_now,  31);
            },
            set_notifiers(callback_function_update = function(){}, callback_function_menu = function(){}) {

                notifiers = {
                    update: callback_function_update,
                    menu: callback_function_menu,
                };
            },
            notify_moved(callback_function) {
                notifiers.update(true, false, callback_function);
            },
            notify_menu(event) {
                notifiers.menu(event);
            },
            new(pxl_width, pxl_height, default_scale, canvas_wrapper_padding, canvas_wrapper_border_width) {

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
                this.init_speed_interval();

            },
            destroy() {
                move_on_click = null;
                ps = null;
                s = null;
                p = null;
                notifiers = null;
                intervals.forEach(function(interval){clearInterval(interval)});
            }
        };
    }
};

module.exports = CanvasOps;