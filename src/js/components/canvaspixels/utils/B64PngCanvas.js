"use strict";
/*
The MIT License (MIT)

Copyright (c) 2022 - 2022 Matias Affolter

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

import SuperBlend from "./SuperBlend";
import {Colors, Color} from "simdope";

var fu = function(
            pxl_width,
            pxl_height,
            pxls,
            pxl_colors,
            layers,
            scale,
            with_palette
        ) {
    return new Promise(function (resolve, reject) {

        pxl_width = pxl_width | 0;
        pxl_height = pxl_height | 0;
        scale = scale | 0;
        "use strict";

        function png_encode_id(imagedata, scale) {

            "use strict"
            var type = "image/png";
            try {

                return new Promise(function (resolve, _) {

                    createImageBitmap(imagedata, {
                        premultiplyAlpha: 'premultiply',
                        resizeQuality: 'pixelated',
                        resizeHeight: imagedata.height * scale | 0,
                        resizeWidth: imagedata.width * scale | 0
                    }).then((bmp) => {

                        var canvas = new OffscreenCanvas(bmp.width, bmp.height);
                        var ctx = canvas.getContext("bitmaprenderer");
                        ctx.imageSmoothingEnabled = false;
                        ctx.transferFromImageBitmap(bmp);

                        canvas.convertToBlob({type: type}).then((blb) => {
                            try {
                                resolve(new FileReaderSync().readAsDataURL(blb));
                            } catch (e2) {
                                var reader = new FileReader();
                                reader.onload = function () {
                                    resolve(reader.result)
                                };
                                reader.onerror = function (){
                                  reject();
                                };
                                reader.readAsDataURL(blb);
                            }
                        });
                    });
                });

            } catch (e) {

                return new Promise(function (resolve, _) {
                    var canvas = document.createElement("canvas");
                    var canvas2 = document.createElement("canvas");
                    canvas.width = imagedata.width;
                    canvas.height = imagedata.height;
                    canvas2.width = imagedata.width * scale | 0;
                    canvas2.height = imagedata.height * scale | 0;
                    var ctx = canvas.getContext("2d");
                    ctx.imageSmoothingEnabled = false;
                    var ctx2 = canvas2.getContext("2d");
                    ctx2.imageSmoothingEnabled = false;
                    ctx.putImageData(imagedata, 0, 0);
                    ctx2.drawImage(canvas, 0, 0, canvas2.width, canvas2.height);
                    var base64 = canvas2.toDataURL(type);
                    resolve(base64);
                });
            }

        }

        const pixel_length = pxl_width * pxl_height | 0;
        const layer_length = layers.length | 0;
        const super_blend = SuperBlend.init(layer_length, pixel_length, Uint8Array.from(layers.map(function (l) {
            return l.hidden ? 0: Math.round(parseFloat(l.opacity)*255);
        })));
        let i = 0, j = 0;
        for (; (i | 0) < (pixel_length | 0); i = (i + 1 | 0) >>> 0) {

            super_blend.for(i, 0);
            for (j = 0; (j | 0) < (layer_length | 0); j = (j + 1 | 0) >>> 0) {
                super_blend.stack(j | 0, pxl_colors[j|0][pxls[j|0][i | 0]]);
            }
            super_blend.next();
        }

        super_blend.blend(false, false).then(([index_changes, color_changes]) => {

            let colors = new Colors(color_changes);
            let hex = new Array(0);
            if(with_palette) {
                let palette = new Colors(colors.get_deduplicated_uint32a());
                    hex = new Array(palette.length).fill("");
                let c = new Color(new ArrayBuffer(4));
                for(let i = 0; i < palette.length; i++){
                    hex[i] = palette.get_element(i, c).hex;
                }
            }

            let image_data = new ImageData(new Uint8ClampedArray(colors.get_image_data().buffer), pxl_width, pxl_height);
            png_encode_id(image_data, scale).then(function (url){
                if (with_palette) {
                    resolve(Object.assign({}, {"url": url, "colors": Array.from(hex)}));
                } else {
                    resolve(Object.assign({}, {"url": url}));
                }
            })
        })
    })
};


const B64PngCanvas = {

    _create_state: function (
        pool,
        pxl_width,
        pxl_height,
        _s_pxls,
        _s_pxl_colors,
        _layers,
        scale,
        with_palette
    ) {
        _s_pxls = Array.from(_s_pxls.map(function (a){return Uint16Array.from(a)}));
        _s_pxl_colors = Array.from(_s_pxl_colors.map(function (a){return Uint32Array.from(a)}));
        _layers = Array.from(_layers.map(function (o){return Object.assign({}, o)}));
        pxl_width = pxl_width | 0;
        pxl_height = pxl_height | 0


        return Object.assign({}, {
            // Compute properties
            w: pxl_width,
            h: pxl_height,
            sp: _s_pxls,
            spc: _s_pxl_colors,
            l: _layers,
            s: scale,
            wp: with_palette
        });
    },

    from: function(pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette){

        let cs = this._create_state;
        let s = cs(
            pool,
            pxl_width,
            pxl_height,
            _s_pxls,
            _s_pxl_colors,
            _layers,
            scale,
            with_palette
        );

        return {
            // Methods
            new(pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette) {

                s = cs( pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette);
            },
            destroy(callback_function = function(){}) {
                if(s !== null) {

                    s = null;
                    callback_function();

                }else {
                    callback_function("ok");
                }
            },
            render() {

                if(s !== null) {

                    return fu(s.w, s.h, s.sp, s.spc, s.l, s.s, s.wp);

                }else {

                    return Promise.reject();
                }
            },
        };
    }
};

module.exports = B64PngCanvas;