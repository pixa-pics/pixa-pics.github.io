"use strict";
/*
var fu = async function(
            pxl_width,
            pxl_height,
            pxls,
            pxl_colors,
            scale,
            resize_width
        ) {return new Promise(function(resolve, reject){

            "use strict";

    var coco = {
        to_hex_from_uint32: function(uint32){
            return "#".concat("00000000".concat(uint32.toString(16)).slice(-8));
        }
    };

            var resize_ratio = parseFloat(resize_width / parseInt(pxl_width * scale));
            var resizeWidth = parseInt(parseFloat(pxl_width * scale) * resize_ratio);
            var resizeHeight = parseInt(parseFloat(pxl_height * scale) * resize_ratio);

            try {

                if (typeof OffscreenCanvas === "undefined") {
                   throw new Error("Impossible to create OffscreenCanvas in this web environment.");
                }

                var image_data = null;
                if(parseInt(scale) === 1){

                    image_data = new ImageData(
                        new Uint8ClampedArray(Uint32Array.from(
                            pxls.map(function(pxl){ return pxl_colors[pxl]})
                                .reverse()).buffer).reverse()
                        , pxl_width, pxl_height);

                } else {

                    var pxl_colors_hex = pxl_colors.map(function(c) { return coco.to_hex_from_uint32(c)});
                    var canvas = new OffscreenCanvas(pxl_width * scale, pxl_height * scale);
                    var ctx = canvas.getContext('2d');
                    ctx.imageSmoothingEnabled = false;

                    pxls.forEach((pxl, index) => {

                        var pixel_color_hex = pxl_colors_hex[pxl];

                        var pos_x = index % pxl_width;
                        var pos_y = (index - pos_x) / pxl_width;

                        ctx.fillStyle = pixel_color_hex;
                        ctx.fillRect(pos_x * scale, pos_y * scale, 1 * scale, 1 * scale);
                    });

                    image_data = ctx.getImageData(0, 0, pxl_width * scale, pxl_height * scale);
                    ctx = null; canvas = null; pxl_colors_hex = null;
                }

                var canvas2 = new OffscreenCanvas(resizeWidth, resizeHeight);
                var ctx2 = canvas2.getContext("bitmaprenderer");
                ctx2.imageSmoothingEnabled = false;

                createImageBitmap(image_data, {
                    resizeWidth: resizeWidth,
                    resizeHeight: resizeHeight
                }).then((btmp_i) => {

                     ctx2.transferFromImageBitmap(btmp_i);
                    btmp_i.close()

                    var blob_params = {type: "image/png"};
                    canvas2.convertToBlob(blob_params).then((blob) => {

                        ctx2 = null; canvas2 = null;
                        try {

                            resolve(FileReaderSync.readAsDataURL(blob));
                            blob = null;
                        } catch(e) {

                            function blob_to_base64(blob) {
                              return new Promise((resolve, _) => {
                                var reader = new FileReader();
                                reader.onload = () => resolve(reader.result);
                                reader.readAsDataURL(blob);
                              })
                            }

                            return blob_to_base64(blob).then((data_url) => {

                                 resolve(data_url);
                                 data_url = null;
                            });
                            blob = null;
                        }
                    });
                });
                image_data = null;

            }catch (e) {

                var canvas = document.createElement("canvas");
                canvas.width = pxl_width * scale;
                canvas.height = pxl_height * scale;
                var ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = false;

                if(parseInt(scale) === 1){

                    ctx.putImageData(new ImageData(
                        new Uint8ClampedArray(Uint32Array.from(
                            pxls.map(function(pxl){ return pxl_colors[pxl]})
                                .reverse()).buffer).reverse()
                        , pxl_width, pxl_height), 0, 0);

                } else {

                    var pxl_colors_hex = pxl_colors.map(function(c) { return coco.to_hex_from_uint32(c)});

                    pxls.forEach((pxl, index) => {

                        var pixel_color_hex = pxl_colors_hex[pxl];
                        var pos_x = index % pxl_width;
                        var pos_y = (index - pos_x) / pxl_width;

                        ctx.fillStyle = pixel_color_hex;
                        ctx.fillRect(pos_x * scale, pos_y * scale, 1 * scale, 1 * scale);
                    });
                    pxl_colors_hex = null;
                }

                var canvas2 = document.createElement("canvas");
                canvas2.width = resizeWidth;
                canvas2.height = resizeHeight;
                var ctx2 = canvas2.getContext("2d");
                ctx2.imageSmoothingEnabled = false;
                ctx2.drawImage(canvas, 0, 0, resizeWidth, resizeHeight);
                ctx = null; canvas = null;

                resolve(canvas2.toDataURL("image/png"));
                ctx2 = null; canvas2 = null;
            }
        })};*/
const B64Layer = {

    _create_state: function (
        pool,
        pxl_width,
        pxl_height,
        pxls,
        pxl_colors,
        scale,
        resize_w
    ) {

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const asyncs = `var e=async function(e,n,t,a,r,l){return new Promise((function(i,o){"use strict";var s=function(e){return"#".concat("00000000".concat(e.toString(16)).slice(-8))},c=parseFloat(l/parseInt(e*r)),u=parseInt(parseFloat(e*r)*c),m=parseInt(parseFloat(n*r)*c);try{if("undefined"==typeof OffscreenCanvas)throw new Error("Impossible to create OffscreenCanvas in this web environment.");var f=null;if(1===parseInt(r))f=new ImageData(new Uint8ClampedArray(Uint32Array.from(t.map((function(e){return a[e]})).reverse()).buffer).reverse(),e,n);else{var g=a.map((function(e){return s(e)})),d=new OffscreenCanvas(e*r,n*r);(h=d.getContext("2d")).imageSmoothingEnabled=!1,t.forEach(((n,t)=>{var a=g[n],l=t%e,i=(t-l)/e;h.fillStyle=a,h.fillRect(l*r,i*r,1*r,1*r)})),f=h.getImageData(0,0,e*r,n*r),h=null,d=null,g=null}var p=new OffscreenCanvas(u,m);(v=p.getContext("bitmaprenderer")).imageSmoothingEnabled=!1,createImageBitmap(f,{resizeWidth:u,resizeHeight:m}).then((e=>{v.transferFromImageBitmap(e),e.close();p.convertToBlob({type:"image/png"}).then((e=>{v=null,p=null;try{i(FileReaderSync.readAsDataURL(e)),e=null}catch(n){function t(e){return new Promise(((n,t)=>{var a=new FileReader;a.onload=()=>n(a.result),a.readAsDataURL(e)}))}return t(e).then((e=>{i(e),e=null}))}}))})),f=null}catch(w){var h,v;if((d=document.createElement("canvas")).width=e*r,d.height=n*r,(h=d.getContext("2d")).imageSmoothingEnabled=!1,1===parseInt(r))h.putImageData(new ImageData(new Uint8ClampedArray(Uint32Array.from(t.map((function(e){return a[e]})).reverse()).buffer).reverse(),e,n),0,0);else{g=a.map((function(e){return s(e)}));t.forEach(((n,t)=>{var a=g[n],l=t%e,i=(t-l)/e;h.fillStyle=a,h.fillRect(l*r,i*r,1*r,1*r)})),g=null}(p=document.createElement("canvas")).width=u,p.height=m,(v=p.getContext("2d")).imageSmoothingEnabled=!1,v.drawImage(d,0,0,u,m),h=null,d=null,i(p.toDataURL("image/png")),v=null,p=null}}))};`
            + "return e;";

        return Object.assign({}, {
            // Compute properties
            asyncf: new AsyncFunction(asyncs)(),
            workerp: pool,
            w: pxl_width,
            h: pxl_height,
            p: pxls,
            pc: pxl_colors,
            s: scale,
            rw: resize_w
        });
    },

    from: function(pool, pxl_width, pxl_height, pxls, pxl_colors, scale, resize_w){

        let cs = this._create_state;
        let s = cs(
            pool,
            pxl_width,
            pxl_height,
            pxls,
            pxl_colors,
            scale,
            resize_w
        );

        return {
            // Methods
            new(pool, pxl_width, pxl_height, pxls, pxl_colors, scale, resize_w) {

                s = cs( pool, pxl_width, pxl_height, pxls, pxl_colors, scale, resize_w);
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

                        s.asyncf, [s.w, s.h, s.p, s.pc, s.s, s.rw]
                    ).catch(function (e) {

                        return s.asyncf(s.w, s.h, s.p, s.pc, s.s, s.rw);
                    }).timeout(5 * 1000).then(callback_function);
                }else {

                    callback_function([]);
                }
            },
        };
    }
};

module.exports = B64Layer;