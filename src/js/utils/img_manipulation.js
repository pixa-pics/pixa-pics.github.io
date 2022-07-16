const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

window.file_to_base64_process_function = new AsyncFunction(`var t = async function(file) {
    "use strict";
    try {
    
        if (typeof FileReaderSync === "undefined") {
            throw new Error("Impossible to create FileReaderSync in this web environment.");
        }
        
        return new Promise(function(resolve, _) {
            resolve(FileReaderSync.readAsDataURL(file));
        });
    } catch(error) {
    
        return new Promise(function(resolve, _) {
            var reader = new FileReader();
            reader.onload = function(){ resolve(reader.result)};
            reader.onerror = function(){ var u = URL.createObjectURL(file); resolve(u); URL.revokeObjectURL(u);};
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

window.base64_sanitize_process_function = new AsyncFunction(`var t = async function(base64) {
    "use strict";
    return new Promise(function(resolve, reject) {
        var img = new Image();
        var is_png = base64.startsWith("data:image/png;base64,");
        img.onload = function() {
    
            var canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL(is_png ? "image/png": "image/jpeg")); 
        };
        img.onerror = function() { reject(); };
        img.src = base64;
    });
}; return t;`)();

const base64_sanitize = (base64, callback_function = () => {}, pool = null) => {

    if(pool !== null) {

        pool.exec(window.base64_sanitize_process_function, [
            base64
        ]).catch((e) => {

            return window.base64_sanitize_process_function(base64);
        }).timeout(5 * 1000).then((r) => {

            callback_function(r);
        });

    }else {

        window.base64_sanitize_process_function(base64).then((r) => {

            callback_function(r);
        });
    }
};

window.base64_to_bitmap_process_function = new AsyncFunction(`var t = async function(base64) {

    "use strict";

    return fetch(base64).then(function(res) {

        return res.blob().then(function(blb){

            return createImageBitmap(blb, {
                premultiplyAlpha: 'premultiply',
                resizeQuality: 'pixelated'
            });
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

const bitmap_to_imagedata = (bitmap, resize_to =  1920*1080, callback_function = () => {}) => {

        let scale = 1;
        while (Math.round(bitmap.width * scale) * Math.round(bitmap.height * scale) > resize_to) { scale -= 0.01; }

        let canvas = document.createElement("canvas");
        canvas.width = Math.round(bitmap.width * scale);
        canvas.height = Math.round(bitmap.height * scale);

        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        callback_function(ctx.getImageData(0, 0, canvas.width, canvas.height));  // "getImageData" isn't available in web worker
        canvas = null;
        ctx = null;
};

window.imagedata_to_base64_process_function = new AsyncFunction(`var t = async function(imagedata, type) {

    "use strict"
    
    try {
    
        if (typeof OffscreenCanvas === "undefined") {
            throw new Error("Impossible to create OffscreenCanvas in this web environment.");
        }
        
        if (typeof FileReaderSync === "undefined") {
            throw new Error("Impossible to create FileReaderSync in this web environment.");
        }
        
        return new Promise(function(resolve, _) {

            var base64 = createImageBitmap(imagedata, {
                premultiplyAlpha: 'premultiply',
                resizeQuality: 'pixelated'
            }).then(function(bmp){
            
                var canvas = new OffscreenCanvas(imagedata.width, imagedata.height);
                var ctx = canvas.getContext("bitmaprenderer");
                ctx.imageSmoothingEnabled = false;
                ctx.transferFromImageBitmap(bmp);
                bmp = null;
                
                return canvas.convertToBlob({type: type}).then(function(blb) {
                    
                    return FileReaderSync.readAsDataURL(blb);
                });
            });
        
            resolve(base64);
        });
       
    }catch (e) {
    
        return new Promise(function(resolve, _) {
            var canvas = document.createElement("canvas");
            canvas.width = imagedata.width;
            canvas.height = imagedata.height;
            var ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            ctx.putImageData(imagedata, 0, 0);
            
            var base64 = canvas.toDataURL("image/png");
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

module.exports = { file_to_base64, base64_to_bitmap, bitmap_to_imagedata, imagedata_to_base64, base64_sanitize }