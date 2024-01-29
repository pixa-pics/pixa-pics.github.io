import JSLoader from "./JSLoader";
import {scaler} from "./test/doppel";
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const AFunction = Object.getPrototypeOf( function(){}).constructor;

const file_to_imagedata_resized = (file, resize_original_to, callback_function = () => {}, pool = null) => {

    var t1 = Date.now();
    const is_type_png = Boolean(file.type === "image/png");
    const is_type_jpeg = Boolean(file.type === "image/jpg" || file.type === "image/jpeg");
    const is_type_webp = Boolean(file.type === "image/webp");

    imagedfailedcallback();

    function imagedfailedcallback(){
        file_to_base64(file, function (b64a){
            base64_to_bitmap(b64a, function (imgbmp){
                bitmap_to_imagedata(imgbmp, resize_original_to, function (imagedata2){
                    callback_function(imagedata2);
                }, pool)
            }, pool);
        }, pool);
    }
};

window.file_to_base64_process_function = new AFunction(`var t = function(file) {
    "use strict";
    
    try {
        
        return new Promise(function(resolve, _) {
            resolve(new FileReaderSync().readAsDataURL(file));
        });
        
    } catch(error) {
    
        return new Promise(function(resolve, _) {
            var reader = new FileReader();
            reader.onload = function(){ resolve(reader.result)};
            reader.readAsDataURL(file);
        });
    }
    
}; return t;`)();

const file_to_base64 = (file, callback_function = () => {}, pool = null) => {

    if(pool !== null) {

        pool.exec(window.file_to_base64_process_function, [
            file
        ]).catch((e) => {

            return window.file_to_base64_process_function(file);
        }).timeout(5 * 1000).then((r) => {

            callback_function(r);
        });

    }else {

        window.file_to_base64_process_function(file).then((r) => {

            callback_function(r);
        });
    }
};
window.base64_sanitize_process_function = function (base64, scale, resizer) {
   
    resizer = resizer || "pixelize";

    function imgToImgD(imgo, width, height, resizer) {
        
        let ctx;
        if(resizer === "pixelize" || resizer === "normal") {
            let canvas, canvas2;
            try {
                canvas = new OffscreenCanvas(imgo.width, imgo.height);
                canvas2 = new OffscreenCanvas(width, height);
            }catch(e) {
                canvas = document.createElement("canvas");
                canvas2 = document.createElement("canvas");
                canvas.width = imgo.width;
                canvas.height = imgo.height;
                canvas2.width = width;
                canvas2.height = height;
            }
            let context = canvas.getContext("2d");
            let context2 = canvas2.getContext("2d");
                context.imageSmoothingEnabled = Boolean(resizer === "normal");
                context2.imageSmoothingEnabled = Boolean(resizer === "normal");
            context.drawImage(imgo, 0, 0, imgo.width, imgo.height);
            context2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas2.width, canvas2.height);
            ctx = context2;
            
        }else if(resizer === "doppel") {
            ctx = scaler.processImage(imgo, width, height);
        }
        return ctx;
    }

    return new Promise(function(resolve, reject) {
        var img = new Image();
        var is_png = base64.startsWith("data:image/png;");
        img.onload = function() {
    
           var canvas;
           try {
           
                let width = (img.naturalWidth || img.width) * scale;
                let height = (img.naturalHeight || img.height) * scale;
                let imgd = imgToImgD(img, width, height, resizer).getImageData(0, 0, width, height);
                
                createImageBitmap(imgd).then(function(bmp){
                
                    var canvas;
                        canvas = new OffscreenCanvas(bmp.width, bmp.height);
                    var ctx = canvas.getContext("bitmaprenderer");
                        ctx.imageSmoothingEnabled = false;
                        ctx.transferFromImageBitmap(bmp);
                    
                    canvas.convertToBlob({type: is_png ? "image/png": "image/jpeg"}).then(function(blb) {
                        
                        try {
                            resolve(new FileReaderSync().readAsDataURL(blb));
                        } catch(e2) {
                            var reader = new FileReader();
                            reader.onload = function(){ resolve(reader.result)};
                            reader.readAsDataURL(blb);
                        }
                    });
                });
                
            } catch(e){
                let width = (img.naturalWidth || img.width) * scale;
                let height = (img.naturalHeight || img.height) * scale;
                let canvas = imgToImgD(img, width, height, resizer).canvas;
                resolve(canvas.toDataURL(is_png ? "image/png": "image/jpeg")); 
            }
        };
        img.onerror = function() { reject(); };
        img.src = base64;
    });
};

const base64_sanitize = (base64, callback_function = () => {}, pool = null, scale = 1, resizer) => {

    pool = null;
    if(pool !== null) {

        pool.exec(window.base64_sanitize_process_function, [
            base64, scale, resizer
        ]).catch((e) => {

            window.base64_sanitize_process_function(base64, scale, resizer).then((r) => {
                callback_function(r);
            });
        }).timeout(15 * 1000).then((r) => {

            callback_function(r);
        });

    }else {

        window.base64_sanitize_process_function(base64, scale, resizer).then((r) => {

            callback_function(r);
        });
    }
};

window.base64_to_bitmap_process_function = new AsyncFunction(`var t = async function(base64) {

    "use strict";

    return fetch(base64).then(function(res) {

        return res.blob().then(function(blb){

            return createImageBitmap(blb);
        });
    });

}; return t;`)();

const base64_to_bitmap = (base64, callback_function = () => {}, pool = null) => {

        if(pool !== null) {

            pool.exec(window.base64_to_bitmap_process_function, [
                base64
            ]).catch((e) => {

                return window.base64_to_bitmap_process_function(base64);
            }).timeout(5 * 1000).then((r) => {

                callback_function(r);
            });

        }else {

            window.base64_to_bitmap_process_function(base64).then((r) => {

                callback_function(r);
            });
        }

};

const file_to_bitmap = (file_or_blob, callback_function) => {

    createImageBitmap(file_or_blob).then(callback_function);
}

const bitmap_to_imagedata = (bitmap, resize_to =  1920*1080, callback_function = () => {}) => {

    let scale = 1;
    while (Math.round(bitmap.width * scale) * Math.round(bitmap.height * scale) > resize_to) { scale -= 0.01; }

        try {

            createImageBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, {
                resizeWidth: Math.round(bitmap.width * scale),
                resizeHeight: Math.round(bitmap.height * scale),
                resizeQuality: "pixelated"
            }).then(function (bitmap_resized){

                let canvas;
                try {

                    canvas = new OffscreenCanvas(bitmap_resized.width, bitmap_resized.height);
                } catch (e) {

                    canvas = document.createElement("canvas");
                    canvas.width = bitmap_resized.width;
                    canvas.height = bitmap_resized.height;
                }

                let ctx = canvas.getContext("2d");
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(bitmap_resized, 0, 0, bitmap_resized.width, bitmap_resized.height);
                callback_function(ctx.getImageData(0, 0, bitmap_resized.width, bitmap_resized.height));  // "getImageData" isn't available in web worker

            });

        } catch(err) {

            let canvas;
            try {

                canvas = new OffscreenCanvas(Math.round(bitmap.width * scale), Math.round(bitmap.height * scale));
            } catch (e) {

                canvas = document.createElement("canvas");
                canvas.width = Math.round(bitmap.width * scale);
                canvas.height = Math.round(bitmap.height * scale);
            }

            let ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

            callback_function(ctx.getImageData(0, 0, canvas.width, canvas.height));  // "getImageData" isn't available in web worker
        }
};

const imagedata_to_bitmap = (imgd, resize_to =  1920*1080, callback_function = () => {}) => {

        let scale = 1;
        while (Math.round(imgd.width * scale) * Math.round(imgd.height * scale) > resize_to) { scale -= 0.01; }


        try {

            createImageBitmap(imgd, 0, 0, imgd.width, imgd.height, {
                resizeWidth: Math.round(imgd.width * scale),
                resizeHeight: Math.round(imgd.height * scale),
                resizeQuality: "pixelated"
            }).then(function (bitmap_resized){

                callback_function(bitmap_resized);  // "getImageData" isn't available in web worker
            });

        } catch(err) {

            callback_function(null)
        }
};

window.imagedata_to_base64_process_function = new AFunction(`var t = function(imagedata, type) {

    "use strict"
    type = type || "image/png";
    var quality = type.includes("webp") ? 1: type.includes("png") ? undefined: 0.7;
    try {
    
        return new Promise(function(resolve, _) {

            createImageBitmap(imagedata, {
                premultiplyAlpha: 'premultiply',
                resizeQuality: 'pixelated'
            }).then((bmp) => {
            
                var canvas;
                    canvas = new OffscreenCanvas(imagedata.width, imagedata.height);
                var ctx = canvas.getContext("bitmaprenderer");
                    ctx.imageSmoothingEnabled = false;
                    ctx.transferFromImageBitmap(bmp);
                
                canvas.convertToBlob({type: type, quality: quality}).then((blb) => {
                    try {
                        resolve(new FileReaderSync().readAsDataURL(blb));
                    } catch(e2) {
                        var reader = new FileReader();
                        reader.onload = function(){ resolve(reader.result)};
                        reader.readAsDataURL(blb);
                    }
                });
            });
        });
       
    }catch (e) {
    
        return new Promise(function(resolve, _) {
            var canvas = document.createElement("canvas");
            canvas.width = imagedata.width;
            canvas.height = imagedata.height;
            var ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            ctx.putImageData(imagedata, 0, 0);
            
            var base64 = canvas.toDataURL(type, quality);
            canvas = null;
            resolve(base64);
        });
    }

}; return t;`)();

const imagedata_to_base64 = (imagedata, type= "image/png", callback_function = () => {}, pool = null) => {

        if(pool !== null) {

            pool.exec(window.imagedata_to_base64_process_function, [
                imagedata, type
            ]).catch((e) => {

                return window.imagedata_to_base64_process_function(imagedata, type);
            }).timeout(5 * 1000).then((r) => {

                callback_function(r);
            });

        }else {

            window.imagedata_to_base64_process_function(imagedata, type).then((r) => {

                callback_function(r);
            });
        }

};

module.exports = { file_to_imagedata_resized, file_to_base64, base64_to_bitmap, bitmap_to_imagedata, imagedata_to_base64, base64_sanitize, file_to_bitmap }