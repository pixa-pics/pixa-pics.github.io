const SuperCanvas = {

    _create_state: function(c, pxl_width, pxl_height) {

        let occ2d;
        try {
            occ2d = Object.assign(
                new OffscreenCanvas(pxl_width, pxl_height).getContext("2d", {willReadFrequently: false, desynchronized: false}), {
                    globalCompositeOperation: "source-over",
                    imageSmoothingEnabled: false
                });
        } catch (e) {
            occ2d = Object.assign(
                Object.assign( document.createElement("canvas"), {
                    width: pxl_width,
                    height: pxl_height
                }).getContext("2d", {willReadFrequently: false, desynchronized: false}), {
                    globalCompositeOperation: "source-over",
                    imageSmoothingEnabled: false
                });
        }

        if(c === null) {

            c = Object.assign(document.createElement("canvas"), {
                    width: pxl_width,
                    height: pxl_height
                });
        }

        return Object.assign({}, {
            // Compute properties
            width: pxl_width,
            height: pxl_height,
            canvas_context2d: Object.assign( Object.assign( c, {
                width: pxl_width,
                height: pxl_height
            }).getContext('2d', {desynchronized: false}), {
                globalCompositeOperation: "copy",
                imageSmoothingEnabled: false,
            }),
            offscreen_canvas_context2d: occ2d
        });
    },

    from: function(c, pxl_width, pxl_height){

        let cs = this._create_state;
        let s = cs(c, pxl_width, pxl_height);

        return {
            // Methods
            clear_rect(x, y) {
                s.offscreen_canvas_context2d.clearRect(0, 0, x, y);
            },
            clear() {
                s.offscreen_canvas_context2d.clearRect(0, 0, s.width, s.height);
            },
            render() {

                s.canvas_context2d.drawImage(s.offscreen_canvas_context2d.canvas, 0, 0);
            },
            draw_path_with_style(path, style) {

                s.offscreen_canvas_context2d.fillStyle = style;
                s.offscreen_canvas_context2d.fill(path);
            },
            set_dimensions(w, h) {

                if(s !== null) {

                    s = cs(s.canvas_context2d.canvas, w, h);
                    return true;
                }else {

                    return false;
                }
            },
            new(c, pxl_width, pxl_height) {

                s = cs(c, pxl_width, pxl_height);
            },
            destroy(callback_function) {

                if(s !== null) {
                    s.workerp.terminate(callback_function);
                    s = null;
                }else {
                    callback_function("ok");
                }
            },
        };
    }
};

module.exports = SuperCanvas;