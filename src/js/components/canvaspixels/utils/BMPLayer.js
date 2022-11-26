"use strict";
const BMPLayer = {

    _create_state: function (
        pxl_width,
        pxl_height,
        pxls,
        pxl_colors
    ) {

        return Object.assign({}, {
            // Compute properties
            w: pxl_width,
            h: pxl_height,
            p: pxls,
            pc: pxl_colors
        });
    },
    _create_func: function() {

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const asyncs = `
            var fun = async function(
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
                let image_data = new ImageData(pxl_width, pxl_height);
                    image_data.data.set(new Uint8ClampedArray(full_pxls.reverse().buffer).reverse());
                return createImageBitmap(image_data);
            }; return fun;
        `;

        return new AsyncFunction(asyncs)();
    },
    from: function(pool){

        let f = this._create_func();
        let cs = this._create_state;
        let p = pool || null;
        let s;

        return {
            // Methods
            define(pxl_width, pxl_height, pxls, pxl_colors) {

                s = cs(pxl_width, pxl_height, pxls, pxl_colors);
            },
            render(callback_function) {

                if(s !== null) {

                    if(!Boolean(p)) {
                        f(s.w, s.h, s.p, s.pc).then(function(bitmap){

                            callback_function(null, bitmap);
                        });
                    }else {
                        p.exec(f, [s.w, s.h, s.p, s.pc]).catch(function () {

                            return f(s.w, s.h, s.p, s.pc);
                        }).timeout(5 * 1000).then(function(bitmap){

                            callback_function(null, bitmap);
                        });
                    }
                }else {

                    callback_function("state undefined", null);
                }
            },
        };
    }
};

module.exports = BMPLayer;