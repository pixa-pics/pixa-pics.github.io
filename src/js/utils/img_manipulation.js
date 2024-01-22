import JSLoader from "./JSLoader";
import {scaler} from "./test/downscale";
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const AFunction = Object.getPrototypeOf( function(){}).constructor;

const file_to_imagedata_resized = (file, resize_original_to, callback_function = () => {}, pool = null) => {

    var t1 = Date.now();
    const is_type_png = Boolean(file.type === "image/png");
    const is_type_jpeg = Boolean(file.type === "image/jpg" || file.type === "image/jpeg");
    const is_type_webp = Boolean(file.type === "image/webp");

    if(is_type_png) {

        var promise_arraybuffer = file.arrayBuffer();
        var promise_decoder = Promise.resolve();

        if(is_type_png){
            promise_decoder = JSLoader( () => import("./jsquash/decode/png"));
        }else if(is_type_jpeg){
            //promise_decoder = JSLoader( () => import("./jsquash/decode/jpeg"));
        }else if(is_type_webp){
            //promise_decoder = JSLoader( () => import("./jsquash/decode/webp"));
        }

        Promise.allSettled([
            promise_arraybuffer,
            promise_decoder
        ]).then(function (results){
            try {
                var arraybuffer = results[0].value;
                var global = results[1].value;
                    global.default().then(function (funcs){
                        imagedcallback(global.decode(new Uint8Array(arraybuffer)));
                    });

            } catch (e) {
                imagedfailedcallback();
            }
        }).catch(imagedfailedcallback);

    }else {
        imagedfailedcallback();
    }

    function imagedcallback(imgd){
        let scale = 1;
        //var info = sizer.default(imgd, file.type.split("/")[1])
        while (Math.round(imgd.width * scale) * Math.round(imgd.height * scale) > resize_original_to) { scale -= 0.01; }
        let width = Math.round(imgd.width * scale);
        let height = Math.round(imgd.height * scale);
        let imgd2 = scaler.kCenter(imgd, width, height).getImageData(0, 0, width, height);
        callback_function(imgd2);

        /*init().then(function (funcs){
            var imgd2 = resize(new Uint8Array(imgd), { height: Math.round(imgd.width * scale), width: Math.round(imgd.height * scale) });
            arrayBufferToImageData(imgd2).then(callback_function);
        });
         */
    }

    function arrayBufferToImageData(arrayBuffer) {
        return new Promise((resolve, reject) => {
            // Convert ArrayBuffer to Blob
            const blob = new Blob([arrayBuffer], {type: file.type});

            // Create an image element
            const img = new Image();

            // Resolve ImageData once the image is loaded
            img.onload = () => {
                // Create a canvas
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                // Get canvas context
                const ctx = canvas.getContext('2d');

                // Draw the image onto the canvas
                ctx.drawImage(img, 0, 0);

                // Get the ImageData
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                resolve(imageData);
                URL.revokeObjectURL(img.src);
            };

            // Reject on error
            img.onerror = reject;

            // Set the source of the image element
            img.src = URL.createObjectURL(blob);
        });
    }


    function imagedfailedcallback(){
        file_to_base64(file, function (b64a){
            base64_sanitize(b64a, function (b64b){
                base64_to_bitmap(b64b, function (imgbmp){
                    bitmap_to_imagedata(imgbmp, resize_original_to, function (imagedata2){
                        callback_function(imagedata2);
                    }, pool)
                }, pool);
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
window.base64_sanitize_process_function = new AFunction(`var t = function(base64, scale) {
    "use strict";
    class Centroid {
        constructor(r, g, b, a, id, count) {
            this.storage_ = new ArrayBuffer(10);
            this.rgba_ = new Uint8Array(this.storage_, 6, 4);
            this.rgba_[0] = r; this.rgba_[1] = g; this.rgba_[2] = b; this.rgba_[3] = a;
            this.id_ = new Uint16Array(this.storage_, 4, 1);
            this.id_[0] = id;
            this.count_ = new Uint32Array(this.storage_, 0, 1);
            this.count_[0] = count;
        }
        get r(){return this.rgba_[0];}
        get g(){return this.rgba_[1];}
        get b(){return this.rgba_[2];}
        get a(){return this.rgba_[3];}
        get id(){return this.id_[0];}
        set id(v){this.id_[0] = (v|0) & 0xFFFF;}
        get count(){return this.count_[0];}
        set count(v){this.count_[0] = (v|0) >>> 0;}
    }
    class Pixel {
        constructor(r, g, b, a, id) {
            this.storage_ = new ArrayBuffer(6);
            this.rgba_ = new Uint8Array(this.storage_, 0, 4);
            this.rgba_[0] = r; this.rgba_[1] = g; this.rgba_[2] = b; this.rgba_[3] = a;
            this.id_ = new Uint16Array(this.storage_, 4, 1);
            this.id_[0] = id;
        }
        get r(){return this.rgba_[0];}
        get g(){return this.rgba_[1];}
        get b(){return this.rgba_[2];}
        get a(){return this.rgba_[3];}
        get id(){return this.id_[0];}
        set id(v){this.id_[0] = (v|0) & 0xFFFF;}
    }
    
    class Scaler {
        constructor() {
            this.canvas = new OffscreenCanvas(1, 1) || document.createElement('canvas');
            this.context = this.canvas.getContext('2d', {willReadFrequently: true, preserveDrawingBuffer: true, powerPreference: "high-performance", alpha: true, desynchronized: true});
            this.targetCanvas = new OffscreenCanvas(1, 1) || document.createElement('canvas');
            this.targetContext = this.targetCanvas.getContext('2d', {willReadFrequently: true, preserveDrawingBuffer: true, powerPreference: "high-performance", alpha: true, desynchronized: true});
            this.fr = Math.fround;
            this.imul = Math.imul;
            this.abs = Math.abs;
            this.width;
        }
        setCanvas(image, width, height){
            if(image instanceof ImageData){
                this.canvas.width = image.width;
                this.canvas.height = image.height;
                this.context.putImageData(image, 0, 0);
            }else {
                this.canvas.width = image.width;
                this.canvas.height = image.height;
                this.context.drawImage(image, 0, 0);
            }
    
            this.targetCanvas.width = width;
            this.targetCanvas.height = height;
            this.width = width;
        }
        kCenter(image, width, height, colors, accuracy) {
            colors = typeof colors == "undefined" ? (((width+height) / 2) > 512) ? 1: (((width+height) / 2) > 256) ? 2: 4: colors;
            accuracy = typeof accuracy == "undefined" ? (((width+height) / 2) > 512) ? 1: (((width+height) / 2) > 256) ? 3: 6: colors;
            this.setCanvas(image, width, height);
    
            const wFactor = this.fr(this.canvas.width / width);
            const hFactor = this.fr(this.canvas.height / height);
    
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const tileImage = this.context.getImageData(x * wFactor|0, y * hFactor|0, wFactor|0, hFactor|0);
                    this.targetContext.fillStyle = this.colorToRgba(this.kMeans(tileImage, colors, accuracy));
                    this.targetContext.fillRect(x, y, 1, 1);
                }
            }
            return this.targetContext;
        }
        kMeans(imageData, k, accuracy) {
            let centroids = this.initCentroids(imageData, k);
            let clusters;
    
            for (let iter = 0; iter < accuracy; iter++) {
                clusters = this.assignPixelsToCentroids(imageData, centroids);
                centroids = this.recalculateCentroids(imageData, clusters, centroids);
            }
    
            return this.findBiggestCentroid(centroids);
        }
        initCentroids(imageData, k) {
            const centroids = new Array(k);
            const pixels = imageData.data;
            for (let i = 0; i < k; i++) {
                const id = Math.floor(Math.random() * (pixels.length / 4)), idx = id * 4;
                centroids[i] = new Centroid(pixels[idx], pixels[idx + 1], pixels[idx + 2], pixels[i + 3], id, 0);
            }
            return centroids;
        }
        assignPixelsToCentroids(imageData, centroids) {
            const enhancedEuclideanDistance = this.enhancedEuclideanDistance.bind(this);
            const clusters = new Array(centroids.length).fill().map(() => []);
            const pixels = imageData.data;
    
            centroids.forEach(function (centroid){centroid.count = 0;}); // Reset centroid counts
    
            for (let i = 0; i < pixels.length; i += 4) {
                const pixel = new Pixel( pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3], i/4);
                let minDist = Infinity;
                let closestCentroidIndex = -1;
    
                centroids.forEach(function (centroid, index){
                    const dist = enhancedEuclideanDistance(pixel, centroid);
                    if (dist < minDist) {
                        minDist = dist;
                        closestCentroidIndex = index;
                    }
                });
    
                if(closestCentroidIndex >= 0) {
                    clusters[closestCentroidIndex].push(i/4); // Store the index of the pixel in the cluster
                    centroids[closestCentroidIndex].count++;
                }
            }
    
            return clusters;
        }
        recalculateCentroids(imageData, clusters, centroids) {
            const pixels = imageData.data;
            return centroids.map(function (centroid, index) {
                if (clusters[index].length === 0) return centroid;
    
                let sumR = 0, sumG = 0, sumB = 0, sumA = 0;
                clusters[index].forEach(function(pixelIndex) {
                    sumR += pixels[pixelIndex];
                    sumG += pixels[pixelIndex + 1];
                    sumB += pixels[pixelIndex + 2];
                    sumA += pixels[pixelIndex + 3];
                });
    
                const len = clusters[index].length;
                return new Centroid(sumR / len | 0, sumG / len| 0, sumB / len | 0, sumA / len | 0,  0xFFFF,len | 0);
            });
        }
        findBiggestCentroid(centroids) {
            return centroids.reduce(function (max, centroid){ return centroid.count > max.count ? centroid : max}, centroids[0]);
        }
        colorToRgba(color) {
            return "rgba("+color.r+","+color.g+","+color.b+","+color.a+")";
        }
        enhancedEuclideanDistance(color1, color2) {
    
            //const alpha = 0.5; // Adjust as necessary
            const distances = Uint8Array.of(this.abs(color1.r - color2.r), this.abs(color1.g - color2.g), this.abs(color1.b - color2.b));
            // Calculate spatial distance
            /*const coordinates = Uint16Array.of(
                color1.i % this.width,
                    Math.floor(color1.i / this.width),
                    color2.i % this.width,
                    Math.floor(color2.i / this.width)
            );
            const coordinatesDistances = Uint8Array.of(this.abs(coordinates[0] - coordinates[2]), this.abs(coordinates[1] - coordinates[3]));
            const spatialDistance = Math.sqrt(
                this.imul(coordinatesDistances[0], coordinatesDistances[0]) +
                this.imul(coordinatesDistances[1], coordinatesDistances[1])
            ) * 32;*/
            const colorDistance = Math.sqrt(this.imul(distances[0], distances[0])+this.imul(distances[1], distances[1])+this.imul(distances[2], distances[2]));
    
            // Weight the color and spatial distances
            return colorDistance; //alpha * colorDistance + (1 - alpha) * spatialDistance | 0;
        }
    }
    
    // Usage
    const scaler = new Scaler();

    return new Promise(function(resolve, reject) {
        var img = new Image();
        var is_png = base64.startsWith("data:image/png;");
        img.onload = function() {
    
           var canvas;
           try {
           
                let width = (img.naturalWidth || img.width) * scale;
                let height = (img.naturalHeight || img.height) * scale;
                let imgd = scaler.kCenter(img, width, height).getImageData(0, 0, width, height);
                
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
                let canvas = scaler.kCenter(img, width, height).canvas;
                resolve(canvas.toDataURL(is_png ? "image/png": "image/jpeg")); 
            }
        };
        img.onerror = function() { reject(); };
        img.src = base64;
    });
}; return t;`)();

const base64_sanitize = (base64, callback_function = () => {}, pool = null, scale = 1) => {

    if(pool !== null) {

        pool.exec(window.base64_sanitize_process_function, [
            base64, scale
        ]).catch((e) => {

            window.base64_sanitize_process_function(base64, scale).then((r) => {
                callback_function(r);
            });
        }).timeout(15 * 1000).then((r) => {

            callback_function(r);
        });

    }else {

        window.base64_sanitize_process_function(base64, scale).then((r) => {

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