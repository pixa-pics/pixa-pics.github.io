"use strict";
/*
        var fu = async function(
            pxl_width,
            pxl_height,
            _s_pxls,
            _s_pxl_colors,
            _layers,
            scale,
            with_palette
        ) {return new Promise(function(resolve, reject){

            "use strict";

            var coco = {
                blend_colors: function(color_a, color_b, amount = 1, should_return_transparent = false, alpha_addition = false) {

                    if(amount === 0 && color_b !== "hover" && should_return_transparent) {return 0;}

                    if(color_b === "hover") {

                        var hsla = this.to_hsla_from_rgba(this.to_rgba_from_uint32(color_a));
                        hsla[2] = parseInt(hsla[2] >= 50 ? hsla[2]/2: hsla[2]*2);
                        color_b = this.to_uint32_from_rgba(this.to_rgba_from_hsla(hsla));
                    }

                    // If the second color is transparent, return transparent
                    if(should_return_transparent && color_b === 0 && amount === 1) { 0 }

                    // Extract RGBA from both colors
                    var base = this.to_rgba_from_uint32(color_a);
                    var added = this.to_rgba_from_uint32(color_b);

                    if(added[3] === 255 && amount === 1) { return color_b }

                    var ba3 = base[3] / 255;
                    var ad3 = (added[3] / 255) * amount;

                    var mix = new Uint8ClampedArray(4);
                    var mi3 = 0;

                    if (ba3 > 0 && ad3 > 0) {

                        if(alpha_addition) {

                            mi3 = ad3 + ba3;
                        }else {

                            mi3 = 1 - (1 - ad3) * (1 - ba3);
                        }

                        var ao = ad3 / mi3;
                        var bo = ba3 * (1 - ad3) / mi3;

                        mix.set(Array.of(
                            parseInt(added[0] * ao + base[0] * bo), // red
                            parseInt(added[1] * ao + base[1] * bo), // green
                            parseInt(added[2] * ao + base[2] * bo)
                        ), 0);// blue

                    }else if(ad3 > 0) {

                        mi3 = added[3] / 255;
                        mix.set(added, 0);
                    }else {

                        mi3 = base[3] / 255;
                        mix.set(base, 0);
                    }

                    if(alpha_addition) {
                        mi3 /= 2;
                    }

                    mix[3] = parseInt(mi3 * 255);

                    return this.to_uint32_from_rgba(mix);
                },
                to_hex_from_uint32: function(uint32){
                    return "#".concat("00000000".concat(uint32.toString(16)).slice(-8));
                },
                to_hex_from_rgba: function(rgba) {
                    return "#".concat("00000000".concat(new Uint32Array(rgba.reverse().buffer)[0].toString(16)).slice(-8));
                },
                to_rgba_from_hex: function(hex) {
                    return new Uint8ClampedArray(Uint32Array.of(parseInt(hex.slice(1), 16)).buffer).reverse();
                },
                to_rgba_from_uint32: function(uint32) {
                    return new Uint8ClampedArray(Uint32Array.of(uint32).buffer).reverse();
                },
                to_uint32_from_rgba: function(rgba) {
                    return new Uint32Array(rgba.reverse().buffer)[0];
                },
                to_uint32_from_hex: function(hex) {
                    return parseInt(hex.slice(1), 16);
                },
                to_hsla_from_rgba: function(rgba) {
                    var [r, g, b, a] = rgba;
                    r /= 255, g /= 255, b /= 255, a /= 255;
                    var max = Math.max(r, g, b), min = Math.min(r, g, b);
                    var h, s, l = (max + min) / 2;
                    if(max == min){
                        h = s = 0; // achromatic
                    }else{
                        var d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch(max){
                            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                            case g: h = (b - r) / d + 2; break;
                            case b: h = (r - g) / d + 4; break;
                        }
                        h /= 6;
                    }
                    return Array.of(parseInt(h * 360), parseInt(s * 100), parseInt(l * 100), parseInt(a * 100));
                },
                to_rgba_from_hsla: function(hsla) {

                    var [h, s, l, a] = hsla;

                    h /= 360;
                    s /= 100;
                    l /= 100;
                    a /= 100;

                    var r, g, b;
                    if (s === 0) {
                        r = g = b = l;
                    } else {
                        function hue_to_rgb(p, q, t) {
                            if (t < 0) t += 1;
                            if (t > 1) t -= 1;
                            if (t < 1 / 6) return p + (q - p) * 6 * t;
                            if (t < 1 / 2) return q;
                            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                            return p;
                        }
                        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                        var p = 2 * l - q;
                        r = hue_to_rgb(p, q, h + 1 / 3);
                        g = hue_to_rgb(p, q, h);
                        b = hue_to_rgb(p, q, h - 1 / 3);
                    }
                    return Uint8ClampedArray.of(parseInt(r * 255), parseInt(g * 255), parseInt(b * 255), parseInt(a * 255));
                },
            };

            try {

                if (typeof OffscreenCanvas === "undefined") {
                    throw new Error("Impossible to create OffscreenCanvas in this web environment.");
                }

                var canvas = new OffscreenCanvas(pxl_width * scale, pxl_height * scale);
                var ctx = canvas.getContext('2d');
                var all_colors = new Set();

                _s_pxls[0].forEach(function(pxl, index) {

                    var layer_pixel_colors = [];
                    var start_i = -1;
                    start_i++;

                    for (var i = _s_pxl_colors.length - 1; i >= 0; i--) {

                        var layer_pixel_color = _s_pxl_colors[i][_s_pxls[i][index]];
                        layer_pixel_colors[i] = layer_pixel_color;
                        var a = coco.to_rgba_from_uint32(layer_pixel_color)[3];

                        if(a === 255) {

                            start_i = i;
                            break;
                        }

                    }

                    var pixel_color_uint32 = 0;

                    for (var i = start_i; i < _s_pxl_colors.length ; i++) {

                        if(!_layers[i].hidden) {

                            pixel_color_hex = coco.blend_colors(pixel_color_uint32, layer_pixel_colors[i], _layers[i].opacity, false, false);
                        }
                    }

                    var pos_x = index % pxl_width;
                    var pos_y = (index - pos_x) / pxl_width;
                    var pixel_color_hex = coco.to_hex_from_uint32(pixel_color_uint32);
                    all_colors.add(pixel_color_hex);
                    ctx.fillStyle = pixel_color_hex;
                    ctx.fillRect(pos_x * scale, pos_y * scale, 1 * scale, 1 * scale);
                });

                var image_data = ctx.getImageData(0, 0, pxl_width * scale, pxl_height * scale);
                ctx = null; canvas = null;

                createImageBitmap(image_data).then(function(btmp_i) {

                    var canvas2 = new OffscreenCanvas(pxl_width * scale, pxl_height * scale);
                    var ctx2 = canvas2.getContext("bitmaprenderer");
                    ctx2.transferFromImageBitmap(btmp_i);
                    btmp_i.close();

                    canvas2.convertToBlob({type: "image/png"}).then(function(blob) {

                        function blob_to_base64(blob) {
                          return new Promise(function(resolve, _) {
                            var reader = new FileReader();
                            reader.onload = function(){return resolve(reader.result)};
                            reader.readAsDataURL(blob);
                          })
                        }

                        return blob_to_base64(blob).then(function(data_url) {

                            if(with_palette) {

                                resolve(Array.of(data_url, Array.from(all_colors)));
                                data_url = null; all_colors = null;
                            }else {

                                resolve(Array.of(data_url));
                                data_url = null; all_colors = null;
                            }
                        });
                        blob = null;
                    });
                    ctx2 = null; canvas2 = null;
                });
                image_data = null;

            }catch (e) {

                var all_colors = new Set();
                var canvas = document.createElement("canvas");
                canvas.width = pxl_width * scale;
                canvas.height = pxl_height * scale;
                var ctx = canvas.getContext('2d');

                _s_pxls[0].forEach(function(pxl, index){

                    var layer_pixel_colors = [];
                    var start_i = -1;
                    start_i++;

                    for (var i = _s_pxl_colors.length - 1; i >= 0; i--) {

                        var layer_pixel_color = _s_pxl_colors[i][_s_pxls[i][index]];
                        layer_pixel_colors[i] = layer_pixel_color;
                        var a = coco.to_rgba_from_uint32(layer_pixel_color)[3];

                        if(a === 255) {

                            start_i = i;
                            break;
                        }

                    }

                    var pixel_color_uint32 = 0;
                    for (var i = start_i; i < _s_pxl_colors.length ; i++) {

                        if(!_layers[i].hidden) {

                            pixel_color_uint32 = coco.blend_colors(pixel_color_uint32, layer_pixel_colors[i], _layers[i].opacity, false, false);
                        }
                    }

                    var pos_x = index % pxl_width;
                    var pos_y = (index - pos_x) / pxl_width;
                    var pixel_color_hex = coco.to_hex_from_uint32(pixel_color_uint32);
                    all_colors.add(pixel_color_hex);
                    ctx.fillStyle = pixel_color_hex;
                    ctx.fillRect(pos_x * scale, pos_y * scale, 1 * scale, 1 * scale);
                });

                if(with_palette) {

                    resolve(Array.of(canvas.toDataURL(), Array.from(all_colors)));
                    ctx = null; canvas = null; all_colors = null;
                }else {

                    resolve(Array.of(canvas.toDataURL()));
                    ctx = null; canvas = null;
                }
            }
        })};
*/


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

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const asyncs = `var r=async function(r,t,n,e,a,o,f){return new Promise((function(i,u){"use strict";var l={blend_colors:function(r,t,n=1,e=!1,a=!1){if(0===n&&"hover"!==t&&e)return 0;if("hover"===t){var o=this.to_hsla_from_rgba(this.to_rgba_from_uint32(r));o[2]=parseInt(o[2]>=50?o[2]/2:2*o[2]),t=this.to_uint32_from_rgba(this.to_rgba_from_hsla(o))}var f=this.to_rgba_from_uint32(r),i=this.to_rgba_from_uint32(t);if(255===i[3]&&1===n)return t;var u=f[3]/255,l=i[3]/255*n,s=new Uint8ClampedArray(4),c=0;if(u>0&&l>0){var _=l/(c=a?l+u:1-(1-l)*(1-u)),m=u*(1-l)/c;s.set(Array.of(parseInt(i[0]*_+f[0]*m),parseInt(i[1]*_+f[1]*m),parseInt(i[2]*_+f[2]*m)),0)}else l>0?(c=i[3]/255,s.set(i,0)):(c=f[3]/255,s.set(f,0));return a&&(c/=2),s[3]=parseInt(255*c),this.to_uint32_from_rgba(s)},to_hex_from_uint32:function(r){return"#".concat("00000000".concat(r.toString(16)).slice(-8))},to_hex_from_rgba:function(r){return"#".concat("00000000".concat(new Uint32Array(r.reverse().buffer)[0].toString(16)).slice(-8))},to_rgba_from_hex:function(r){return new Uint8ClampedArray(Uint32Array.of(parseInt(r.slice(1),16)).buffer).reverse()},to_rgba_from_uint32:function(r){return new Uint8ClampedArray(Uint32Array.of(r).buffer).reverse()},to_uint32_from_rgba:function(r){return new Uint32Array(r.reverse().buffer)[0]},to_uint32_from_hex:function(r){return parseInt(r.slice(1),16)},to_hsla_from_rgba:function(r){var[t,n,e,a]=r;t/=255,n/=255,e/=255,a/=255;var o,f,i=Math.max(t,n,e),u=Math.min(t,n,e),l=(i+u)/2;if(i==u)o=f=0;else{var s=i-u;switch(f=l>.5?s/(2-i-u):s/(i+u),i){case t:o=(n-e)/s+(n<e?6:0);break;case n:o=(e-t)/s+2;break;case e:o=(t-n)/s+4}o/=6}return Array.of(parseInt(360*o),parseInt(100*f),parseInt(100*l),parseInt(100*a))},to_rgba_from_hsla:function(r){var t,n,e,[a,o,f,i]=r;if(a/=360,f/=100,i/=100,0===(o/=100))t=n=e=f;else{function r(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+6*(t-r)*n:n<.5?t:n<2/3?r+(t-r)*(2/3-n)*6:r}var u=f<.5?f*(1+o):f+o-f*o,l=2*f-u;t=r(l,u,a+1/3),n=r(l,u,a),e=r(l,u,a-1/3)}return Uint8ClampedArray.of(parseInt(255*t),parseInt(255*n),parseInt(255*e),parseInt(255*i))}};try{if("undefined"==typeof OffscreenCanvas)throw new Error("Impossible to create OffscreenCanvas in this web environment.");var s=(m=new OffscreenCanvas(r*o,t*o)).getContext("2d"),c=new Set;n[0].forEach((function(t,f){var i=[],u=-1;u++;for(var _=e.length-1;_>=0;_--){var m=e[_][n[_][f]];if(i[_]=m,255===l.to_rgba_from_uint32(m)[3]){u=_;break}}for(_=u;_<e.length;_++)a[_].hidden||(g=l.blend_colors(0,i[_],a[_].opacity,!1,!1));var h=f%r,v=(f-h)/r,g=l.to_hex_from_uint32(0);c.add(g),s.fillStyle=g,s.fillRect(h*o,v*o,1*o,1*o)}));var _=s.getImageData(0,0,r*o,t*o);s=null,m=null,createImageBitmap(_).then((function(n){var e=new OffscreenCanvas(r*o,t*o),a=e.getContext("bitmaprenderer");a.transferFromImageBitmap(n),n.close(),e.convertToBlob({type:"image/png"}).then((function(r){return function(r){return new Promise((function(t,n){var e=new FileReader;e.onload=function(){return t(e.result)},e.readAsDataURL(r)}))}(r).then((function(r){f?(i(Array.of(r,Array.from(c))),r=null,c=null):(i(Array.of(r)),r=null,c=null)}))})),a=null,e=null})),_=null}catch(h){var m;c=new Set;(m=document.createElement("canvas")).width=r*o,m.height=t*o;s=m.getContext("2d");n[0].forEach((function(t,f){var i=[],u=-1;u++;for(var _=e.length-1;_>=0;_--){var m=e[_][n[_][f]];if(i[_]=m,255===l.to_rgba_from_uint32(m)[3]){u=_;break}}var h=0;for(_=u;_<e.length;_++)a[_].hidden||(h=l.blend_colors(h,i[_],a[_].opacity,!1,!1));var v=f%r,g=(f-v)/r,b=l.to_hex_from_uint32(h);c.add(b),s.fillStyle=b,s.fillRect(v*o,g*o,1*o,1*o)})),f?(i(Array.of(m.toDataURL(),Array.from(c))),s=null,m=null,c=null):(i(Array.of(m.toDataURL())),s=null,m=null)}}))};`
            + "return r;";

        return Object.assign({}, {
            // Compute properties
            asyncf: new AsyncFunction(asyncs)(),
            workerp: pool,
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
            set_data(pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette) {

                s = cs( pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette);
            },
            render(callback_function) {

                s.workerp.exec(

                    s.asyncf, [s.w, s.h, s.sp, s.spc, s.l, s.s, s.wp]
                ).catch((e) => {

                    return s.asyncf(s.w, s.h, s.sp, s.spc, s.l, s.s, s.wp);
                }).timeout(10 * 1000).then(callback_function);
            },
        };
    }
};

module.exports = B64PngCanvas;