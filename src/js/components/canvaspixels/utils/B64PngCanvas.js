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

                        if(a === 255 && !_layers[i].hidden) {

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

                                resolve(Object.assign({}, {"0": String(data_url), "1": Array.from(all_colors)}));

                                data_url = null; all_colors = null;
                            }else {

                                resolve(Object.assign({}, {"0": String(data_url)}));
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

                        if(a === 255 && !_layers[i].hidden) {

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

                    resolve(Object.assign({}, {"0": canvas.toDataURL("image/png"), "1": Array.from(all_colors)}));
                    ctx = null; canvas = null; all_colors = null;
                }else {

                    resolve(Object.assign({}, {"0": canvas.toDataURL("image/png")}));
                    ctx = null; canvas = null;
                }
            }
        })};*/



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
        const asyncs = `var r=async function(r,n,t,e,a,o,i){return new Promise((function(f,s){"use strict";var u={blend_colors:function(r,n,t=1,e=!1,a=!1){if(0===t&&"hover"!==n&&e)return 0;if("hover"===n){var o=this.to_hsla_from_rgba(this.to_rgba_from_uint32(r));o[2]=parseInt(o[2]>=50?o[2]/2:2*o[2]),n=this.to_uint32_from_rgba(this.to_rgba_from_hsla(o))}var i=this.to_rgba_from_uint32(r),f=this.to_rgba_from_uint32(n);if(255===f[3]&&1===t)return n;var s=i[3]/255,u=f[3]/255*t,l=new Uint8ClampedArray(4),c=0;if(s>0&&u>0){var _=u/(c=a?u+s:1-(1-u)*(1-s)),m=s*(1-u)/c;l.set(Array.of(parseInt(f[0]*_+i[0]*m),parseInt(f[1]*_+i[1]*m),parseInt(f[2]*_+i[2]*m)),0)}else u>0?(c=f[3]/255,l.set(f,0)):(c=i[3]/255,l.set(i,0));return a&&(c/=2),l[3]=parseInt(255*c),this.to_uint32_from_rgba(l)},to_hex_from_uint32:function(r){return"#".concat("00000000".concat(r.toString(16)).slice(-8))},to_hex_from_rgba:function(r){return"#".concat("00000000".concat(new Uint32Array(r.reverse().buffer)[0].toString(16)).slice(-8))},to_rgba_from_hex:function(r){return new Uint8ClampedArray(Uint32Array.of(parseInt(r.slice(1),16)).buffer).reverse()},to_rgba_from_uint32:function(r){return new Uint8ClampedArray(Uint32Array.of(r).buffer).reverse()},to_uint32_from_rgba:function(r){return new Uint32Array(r.reverse().buffer)[0]},to_uint32_from_hex:function(r){return parseInt(r.slice(1),16)},to_hsla_from_rgba:function(r){var[n,t,e,a]=r;n/=255,t/=255,e/=255,a/=255;var o,i,f=Math.max(n,t,e),s=Math.min(n,t,e),u=(f+s)/2;if(f==s)o=i=0;else{var l=f-s;switch(i=u>.5?l/(2-f-s):l/(f+s),f){case n:o=(t-e)/l+(t<e?6:0);break;case t:o=(e-n)/l+2;break;case e:o=(n-t)/l+4}o/=6}return Array.of(parseInt(360*o),parseInt(100*i),parseInt(100*u),parseInt(100*a))},to_rgba_from_hsla:function(r){var n,t,e,[a,o,i,f]=r;if(a/=360,i/=100,f/=100,0===(o/=100))n=t=e=i;else{function l(r,n,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(n-r)*t:t<.5?n:t<2/3?r+(n-r)*(2/3-t)*6:r}var s=i<.5?i*(1+o):i+o-i*o,u=2*i-s;n=l(u,s,a+1/3),t=l(u,s,a),e=l(u,s,a-1/3)}return Uint8ClampedArray.of(parseInt(255*n),parseInt(255*t),parseInt(255*e),parseInt(255*f))}};try{if("undefined"==typeof OffscreenCanvas)throw new Error("Impossible to create OffscreenCanvas in this web environment.");var l=(m=new OffscreenCanvas(r*o,n*o)).getContext("2d"),c=new Set;t[0].forEach((function(n,i){var f=[],s=-1;s++;for(var _=e.length-1;_>=0;_--){var m=e[_][t[_][i]];if(f[_]=m,255===u.to_rgba_from_uint32(m)[3]&&!a[_].hidden){s=_;break}}var g=0;for(_=s;_<e.length;_++)a[_].hidden||(g=u.blend_colors(g,f[_],a[_].opacity,!1,!1));var h=i%r,v=(i-h)/r,b=u.to_hex_from_uint32(g);c.add(b),l.fillStyle=b,l.fillRect(h*o,v*o,1*o,1*o)}));var _=l.getImageData(0,0,r*o,n*o);l=null,m=null,createImageBitmap(_).then((function(t){var e=new OffscreenCanvas(r*o,n*o),a=e.getContext("bitmaprenderer");a.transferFromImageBitmap(t),t.close(),e.convertToBlob({type:"image/png"}).then((function(r){return function(r){return new Promise((function(n,t){var e=new FileReader;e.onload=function(){return n(e.result)},e.readAsDataURL(r)}))}(r).then((function(r){i?(f(Object.assign({},{0:String(r),1:Array.from(c)})),r=null,c=null):(f(Object.assign({},{0:String(r)})),r=null,c=null)}))})),a=null,e=null})),_=null}catch(g){var m;c=new Set;(m=document.createElement("canvas")).width=r*o,m.height=n*o;l=m.getContext("2d");t[0].forEach((function(n,i){var f=[],s=-1;s++;for(var _=e.length-1;_>=0;_--){var m=e[_][t[_][i]];if(f[_]=m,255===u.to_rgba_from_uint32(m)[3]&&!a[_].hidden){s=_;break}}var g=0;for(_=s;_<e.length;_++)a[_].hidden||(g=u.blend_colors(g,f[_],a[_].opacity,!1,!1));var h=i%r,v=(i-h)/r,b=u.to_hex_from_uint32(g);c.add(b),l.fillStyle=b,l.fillRect(h*o,v*o,1*o,1*o)})),i?(f(Object.assign({},{0:m.toDataURL("image/png"),1:Array.from(c)})),l=null,m=null,c=null):(f(Object.assign({},{0:m.toDataURL("image/png")})),l=null,m=null)}}))};`
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
            new(pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette) {

                s = cs( pool, pxl_width, pxl_height, _s_pxls, _s_pxl_colors, _layers, scale, with_palette);
            },
            destroy(callback_function = function(){}) {
                if(s !== null) {
                    s.workerp.terminate(function (c){
                        s = null;
                        callback_function(c);
                    });
                }else {
                    callback_function("ok");
                }
            },
            render(callback_function) {

                if(s !== null) {
                    s.workerp.exec(

                        s.asyncf, [s.w, s.h, s.sp, s.spc, s.l, s.s, s.wp]
                    ).catch(function(e) {

                        return s.asyncf(s.w, s.h, s.sp, s.spc, s.l, s.s, s.wp);
                    }).timeout(10 * 1000).then(callback_function);
                }else {

                    callback_function("");
                }
            },
        };
    }
};

module.exports = B64PngCanvas;