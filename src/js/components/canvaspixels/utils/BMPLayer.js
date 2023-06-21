"use strict";
const BMPLayer = {

    _create_state: function (
        pxl_width,
        pxl_height,
        pxls,
        pxl_colors
    ) {

        return {
            // Compute properties
            w: pxl_width,
            h: pxl_height,
            p: pxls,
            pc: pxl_colors
        };
    },
    _create_func: function() {

        const AFunction = Object.getPrototypeOf( function(){}).constructor;
        const asyncs = `
           return function(
                pxl_width,
                pxl_height,
                pxls,
                pxl_colors,
            ) {
                "use strict";
                pxl_width = pxl_width | 0;
                pxl_height = pxl_height | 0;
                
                const full_pxls_length = pxls.length | 0;
                const full_pxls = new Uint32Array(full_pxls_length|0);
                for(var i = 0; (i|0) < (full_pxls_length|0); i = (i + 1 | 0) >>> 0) { full_pxls[i|0] = (pxl_colors[pxls[i|0]] | 0) >>> 0; }
                let image_data = new ImageData(new Uint8ClampedArray(full_pxls.buffer), pxl_width, pxl_height);
                
                return new Promise(function(resolve, reject) {
                    createImageBitmap(image_data).then(function(r){resolve(r);});
                });
            };
        `;

        return new AFunction(asyncs)();
    },
    from: function(pool){

        let f = this._create_func();
        let cs = this._create_state;
        let p = pool || null;

        return {
            // Methods
            render(pxl_width, pxl_height, pxls, pxl_colors, callback_function) {

                var s = cs(pxl_width, pxl_height, pxls, pxl_colors);
                if(!Boolean(p)) {
                    f(s.w, s.h, s.p, s.pc).then(function(bitmap){

                        callback_function(bitmap);
                    });
                }else {
                    p.exec(f, [s.w, s.h, s.p, s.pc]).catch(function () {

                        return f(s.w, s.h, s.p, s.pc);
                    }).then(function(bitmap){

                        callback_function(bitmap);
                    });
                }
            },
        };
    }
};

module.exports = BMPLayer;