const SuperCanvas = {

    _create_state: function(c, pxl_width, pxl_height) {

        if(!Boolean(c)) { c = document.createElement("canvas"); }
        c.width = pxl_width;
        c.height = pxl_height;
        let cc2d = c.getContext('2d', {willReadFrequently: true, desynchronized: false});
        cc2d.imageSmoothingEnabled = false;
        cc2d.globalCompositeOperation = "copy";

        let occ2d;
        try {
            occ2d = new OffscreenCanvas(pxl_width, pxl_height).getContext("2d", {willReadFrequently: true, desynchronized: true,});
        } catch (e) {
            let occ = document.createElement("canvas");
            occ.width = pxl_width;
            occ.height = pxl_height;
            occ2d = occ.getContext("2d", {willReadFrequently: true, desynchronized: true});
        }
        occ2d.imageSmoothingEnabled = false;

        return {
            width: parseInt(pxl_width),
            height: parseInt(pxl_height),
            canvas_context2d: cc2d,
            offscreen_canvas_context2d: occ2d
        };
    },

    from: function(c, pxl_width, pxl_height){

        let cs = this._create_state;
        let s = cs(c, pxl_width, pxl_height);

        return {
            // Methods
            clear() {
                s.offscreen_canvas_context2d.clearRect(0, 0, s.width, s.height);
            },
            render() {

                s.canvas_context2d.globalCompositeOperation = "copy";
                s.canvas_context2d.drawImage(s.offscreen_canvas_context2d.canvas, 0, 0);
            },
            draw_path_with_style(path, style) {

                if(!style.endsWith("ff")){

                    s.offscreen_canvas_context2d.globalCompositeOperation = "destination-out";
                    s.offscreen_canvas_context2d.fillStyle = "#ffffffff";
                    s.offscreen_canvas_context2d.fill(path);
                }
                s.offscreen_canvas_context2d.globalCompositeOperation = "source-over";
                s.offscreen_canvas_context2d.fillStyle = style;
                s.offscreen_canvas_context2d.fill(path);
            },
            set_dimensions(w, h) {

                if(s !== null) {

                    s = cs(s.canvas_context2d.canvas, w, h);
                }
            },
            new(c, pxl_width, pxl_height) {

                s = cs(c, pxl_width, pxl_height);
            },
            destroy(callback_function) {

                s = null;
                callback_function("ok");
            },
        };
    }
};

module.exports = SuperCanvas;