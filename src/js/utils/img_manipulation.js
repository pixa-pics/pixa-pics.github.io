const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

var file_to_base64_process_function = new AsyncFunction(`var t = async function(file) {

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
            let reader = new FileReader();
            reader.onload = function(){ resolve(reader.result)};
            reader.onerror = function(){ resolve(URL.createObjectURL(file))};
            reader.readAsDataURL(file);
        });
    }
}; return t;`)();

const file_to_base64 = (file, callback_function = () => {}, pool = null) => {

    (async () => {

        if(pool !== null) {

            const r = pool.exec(file_to_base64_process_function, [
                file
            ]).catch((e) => {

                return file_to_base64_process_function(file);
            }).timeout(60 * 1000);

            callback_function(await r);

        }else {

            const r = file_to_base64_process_function(file);
            callback_function(await r);
        }
    })();

};

var base64_to_bitmap_process_function = new AsyncFunction(`var t = async function(base64) {

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

    (async () => {

        if(pool !== null) {

            const r = pool.exec(base64_to_bitmap_process_function, [
                base64
            ]).catch((e) => {

                return base64_to_bitmap_process_function(base64);
            }).timeout(60 * 1000);

            callback_function(await r);

        }else {

            const r = base64_to_bitmap_process_function(base64);
            callback_function(await r);
        }
    })();

};

const bitmap_to_imagedata = (bitmap, resize_to =  1920*1080, callback_function = () => {}) => {

    (async () => {

        let img_data; // Create image data
        let scale = 1;

        while (bitmap.width * scale * bitmap.height * scale > resize_to) { scale -= 0.01; }

        let canvas = null;

        try {

            canvas = new OffscreenCanvas(Math.floor(bitmap.width * scale), Math.floor(bitmap.height * scale));
        } catch(error) {

            canvas = document.createElement("canvas");
            canvas.width = Math.floor(bitmap.width * scale);
            canvas.height = Math.floor(bitmap.height * scale);
        }

        var ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        img_data = ctx.getImageData(0, 0, canvas.width, canvas.height); // This isn't available in web worker

        callback_function(img_data);
    })();
};

var imagedata_to_base64_process_function = new AsyncFunction(`var t = async function(imagedata) {

    "use strict"
    
    try {
    
        if (typeof OffscreenCanvas === "undefined") {
            throw new Error("Impossible to create OffscreenCanvas in this web environment.");
        }
        
        if (typeof FileReaderSync === "undefined") {
            throw new Error("Impossible to create FileReaderSync in this web environment.");
        }
        
        return new Promise(function(resolve, _) {

            var base64 = createImageBitmap(base64, {
                premultiplyAlpha: 'premultiply',
                resizeQuality: 'pixelated'
            }).then(function(bmp){
            
                var canvas = new OffscreenCanvas(imagedata.width, imagedata.height);
                var ctx = canvas.getContext("bitmaprenderer");
                ctx.imageSmoothingEnabled = false;
                ctx.transferFromImageBitmap(bmp);
    
                return canvas.convertToBlob({type: "image/png"}).then(function(blb) {
                
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
            resolve(base64);
        });
    }

}; return t;`)();

const imagedata_to_base64 = (imagedata, callback_function = () => {}, pool = null) => {

    (async () => {

        if(pool !== null) {

            const r = pool.exec(imagedata_to_base64_process_function, [
                imagedata
            ]).catch((e) => {

                return imagedata_to_base64_process_function(imagedata);
            }).timeout(60 * 1000);

            callback_function(await r);

        }else {

            const r = imagedata_to_base64_process_function(imagedata);
            callback_function(await r);
        }
    })();

};

module.exports = { file_to_base64, base64_to_bitmap, bitmap_to_imagedata, imagedata_to_base64 }